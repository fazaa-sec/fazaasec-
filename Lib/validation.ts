import { z } from 'zod';
import { SERVICE_OPTIONS } from './data';

export type LeadField = 'name' | 'email' | 'service' | 'website' | 'message';

// Control characters except tab / LF / CR.
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

/** Strip control chars and HTML so stored text can never be rendered as markup. */
export function sanitize(input: string): string {
  return input
    .normalize('NFC')
    .replace(CONTROL_CHARS, '')
    .replace(/<[^>]*>/g, '')
    .replace(/[<>]/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

const normalizeUrl = (input: string): string => {
  const v = sanitize(input);
  if (!v) return '';
  return /^https?:\/\//i.test(v) ? v : `https://${v}`;
};

const isValidUrl = (v: string): boolean => {
  if (!v) return true; // optional
  if (v.length > 300) return false;
  try {
    const u = new URL(v);
    return (u.protocol === 'http:' || u.protocol === 'https:') && u.hostname.includes('.');
  } catch {
    return false;
  }
};

export const leadSchema = z.object({
  name: z
    .string()
    .transform(sanitize)
    .pipe(z.string().min(2, 'Enter your name').max(100, 'Name is too long')),
  email: z
    .string()
    .transform((s) => sanitize(s).toLowerCase())
    .pipe(z.string().email('Enter a valid email address').max(254)),
  service: z.enum(SERVICE_OPTIONS, { errorMap: () => ({ message: 'Choose a service' }) }),
  website: z.string().transform(normalizeUrl).refine(isValidUrl, 'Enter a valid website URL'),
  message: z
    .string()
    .transform(sanitize)
    .pipe(
      z
        .string()
        .min(10, 'Tell me a bit more (at least 10 characters)')
        .max(2000, 'Message is too long (2000 characters max)'),
    ),
});

export type LeadInput = z.infer<typeof leadSchema>;
