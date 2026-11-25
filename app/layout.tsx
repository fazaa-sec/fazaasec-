import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import WhatsAppButton from '@/components/WhatsAppButton';
import { BRAND, GITHUB_URL, LINKEDIN_URL, OWNER_NAME, SITE_URL } from '@/lib/site';

const sans = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

const title = `${BRAND} | I Build & Secure AI-Built Apps Before They Leak`;
const description =
  'Security audits in 48 hours, secure app builds and monthly protection. Build, break, secure. By Muatez Mhgoub Margani.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: `%s | ${BRAND}` },
  description,
  alternates: { canonical: '/' },
  openGraph: { title, description, url: '/', siteName: BRAND, type: 'website' },
  twitter: { card: 'summary', title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: OWNER_NAME,
  url: SITE_URL,
  jobTitle: 'Cybersecurity & Web Developer',
  worksFor: { '@type': 'Organization', name: BRAND },
  sameAs: [GITHUB_URL, LINKEDIN_URL],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-neon focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
