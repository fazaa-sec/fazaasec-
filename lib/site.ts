// Single source of truth for site-wide constants.
// The site URL always comes from the environment, never hardcoded.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(
  /\/+$/,
  '',
);

export const BRAND = 'FAZAA SEC';
export const OWNER_NAME = 'Muatez Mhgoub Margani';
export const LOCATION = 'Sudan / Egypt';
export const EXPERIENCE_YEARS = 6;

export const GITHUB_URL = "https://github.com/fazaa-sec"
export const LINKEDIN_URL = 'https://www.linkedin.com/in/muatez-m-57088b2a7';
export const WHATSAPP_URL =
  'https://wa.me/249912405246?text=Hello%20Muatez,%20I%20want%2048h%20Security%20Audit%20for%20my%20website';
