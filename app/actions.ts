'use server';

import { createHash } from 'node:crypto';
import { headers } from 'next/headers';
import { getSupabase } from '@/lib/supabase';
import { leadSchema, type LeadField } from '@/lib/validation';

export type LeadResult = {
  ok: boolean;
  message: string;
  errors?: Partial<Record<LeadField, string>>;
};

const SUCCESS = 'Request received. I will reply to your email shortly.';
const GENERIC_ERROR =
  'Something went wrong on my side. Try again, or message me on WhatsApp.';

function clientIp(): string {
  const h = headers();
  return (
    h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || 'unknown'
  );
}

// Raw IPs are never stored: only a salted SHA-256 used for rate limiting.
function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT ?? '';
  return createHash('sha256').update(`${salt}:${ip}`).digest('hex');
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  // Fail closed in production if the secret is missing; allow local dev without it.
  if (!secret) return process.env.NODE_ENV !== 'production';
  if (!token) return false;

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip !== 'unknown') body.set('remoteip', ip);

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
      cache: 'no-store',
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

export async function submitLead(formData: FormData): Promise<LeadResult> {
  // 1. Honeypot: real users never see this field. Pretend success so bots learn nothing.
  if (String(formData.get('company') ?? '').trim() !== '') {
    return { ok: true, message: SUCCESS };
  }

  // 2. Validate + sanitize.
  const parsed = leadSchema.safeParse({
    name: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
    service: String(formData.get('service') ?? ''),
    website: String(formData.get('website') ?? ''),
    message: String(formData.get('message') ?? ''),
  });

  if (!parsed.success) {
    const flat = parsed.error.flatten().fieldErrors as Partial<Record<LeadField, string[]>>;
    const errors: Partial<Record<LeadField, string>> = {};
    (Object.keys(flat) as LeadField[]).forEach((k) => {
      const first = flat[k]?.[0];
      if (first) errors[k] = first;
    });
    return { ok: false, message: 'Please fix the highlighted fields.', errors };
  }

  // 3. CAPTCHA (Cloudflare Turnstile).
  const ip = clientIp();
  const human = await verifyTurnstile(String(formData.get('cf-turnstile-response') ?? ''), ip);
  if (!human) {
    return { ok: false, message: 'Captcha check failed. Reload the challenge and try again.' };
  }

  // 4. Insert via RPC. The database enforces 5 submissions / IP-hash / hour.
  try {
    const { name, email, service, website, message } = parsed.data;
    const { data, error } = await getSupabase().rpc('submit_lead', {
      p_name: name,
      p_email: email,
      p_service: service,
      p_website: website,
      p_message: message,
      p_ip_hash: hashIp(ip),
    });

    if (error) {
      console.error('lead_submit_failed', error.code); // error code only, never user data
      return { ok: false, message: GENERIC_ERROR };
    }
    if (data === 'rate_limited') {
      return {
        ok: false,
        message:
          'Too many requests from your network. Try again in an hour, or message me on WhatsApp.',
      };
    }
    return { ok: true, message: SUCCESS };
  } catch {
    console.error('lead_submit_exception');
    return { ok: false, message: GENERIC_ERROR };
  }
}
