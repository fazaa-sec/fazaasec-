'use client';

import Script from 'next/script';
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { submitLead, type LeadResult } from '@/app/actions';
import { SERVICE_OPTIONS } from '@/lib/data';
import { Icon } from './Icons';

declare global {
  interface Window {
    turnstile?: { reset: () => void };
  }
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-white/80">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [service, setService] = useState('');
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<LeadResult | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  // Service cards dispatch this event so the form opens with the right option selected.
  useEffect(() => {
    const onSelect = (e: Event) => {
      const value = (e as CustomEvent<string>).detail;
      if ((SERVICE_OPTIONS as readonly string[]).includes(value)) setService(value);
    };
    window.addEventListener('select-service', onSelect);
    return () => window.removeEventListener('select-service', onSelect);
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pending) return;
    const data = new FormData(e.currentTarget);

    setPending(true);
    setResult(null);
    try {
      const res = await submitLead(data);
      setResult(res);
      if (res.ok) {
        formRef.current?.reset();
        setService('');
      }
    } catch {
      setResult({ ok: false, message: 'Network error. Try again, or message me on WhatsApp.' });
    } finally {
      window.turnstile?.reset(); // tokens are single-use
      setPending(false);
    }
  }

  const err = result?.errors ?? {};
  const describe = (id: string, hasError?: string) => (hasError ? `${id}-error` : undefined);

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="panel space-y-5 p-6 sm:p-8">
      {/* Honeypot: hidden from people, irresistible to bots. */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" error={err.name}>
          <input
            id="name" name="name" type="text" required maxLength={100} autoComplete="name"
            className="field" placeholder="Your name"
            aria-invalid={!!err.name} aria-describedby={describe('name', err.name)}
          />
        </Field>
        <Field id="email" label="Email" error={err.email}>
          <input
            id="email" name="email" type="email" required maxLength={254} autoComplete="email"
            className="field" placeholder="you@example.com"
            aria-invalid={!!err.email} aria-describedby={describe('email', err.email)}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="service" label="Service" error={err.service}>
          <select
            id="service" name="service" required value={service}
            onChange={(e) => setService(e.target.value)}
            className="field"
            aria-invalid={!!err.service} aria-describedby={describe('service', err.service)}
          >
            <option value="" disabled className="bg-ink">Choose a service</option>
            <option value="Audit" className="bg-ink">Audit (48h)</option>
            <option value="Build" className="bg-ink">Build</option>
            <option value="Secure" className="bg-ink">Secure (monthly)</option>
          </select>
        </Field>
        <Field id="website" label="Website URL (optional)" error={err.website}>
          <input
            id="website" name="website" type="text" inputMode="url" maxLength={300} autoComplete="url"
            className="field" placeholder="https://yourapp.com"
            aria-invalid={!!err.website} aria-describedby={describe('website', err.website)}
          />
        </Field>
      </div>

      <Field id="message" label="Message" error={err.message}>
        <textarea
          id="message" name="message" required rows={5} maxLength={2000}
          className="field resize-y" placeholder="What are you building, and what worries you?"
          aria-invalid={!!err.message} aria-describedby={describe('message', err.message)}
        />
      </Field>

      {siteKey && (
        <>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            strategy="lazyOnload"
          />
          <div className="cf-turnstile" data-sitekey={siteKey} data-theme="dark" />
        </>
      )}

      <button type="submit" className="btn-primary w-full" disabled={pending}>
        {pending ? 'Sending...' : 'Send request'}
      </button>

      {result && (
        <div
          role={result.ok ? 'status' : 'alert'}
          className={
            result.ok
              ? 'flex items-start gap-3 rounded-md border border-neon/50 bg-neon/10 p-4 text-sm text-neon'
              : 'rounded-md border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-300'
          }
        >
          {result.ok && <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0" />}
          <p>{result.message}</p>
        </div>
      )}
    </form>
  );
}
