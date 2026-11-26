import { BRAND, GITHUB_URL, LINKEDIN_URL, LOCATION, OWNER_NAME } from '@/lib/site';
import ExtLink from './ExtLink';

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          &copy; {new Date().getFullYear()} {BRAND}. {OWNER_NAME}, {LOCATION}.
        </p>
        <p className="flex gap-6">
          <ExtLink href={GITHUB_URL} className="hover:text-neon">GitHub</ExtLink>
          <ExtLink href={LINKEDIN_URL} className="hover:text-neon">LinkedIn</ExtLink>
        </p>
      </div>
    </footer>
  );
}
