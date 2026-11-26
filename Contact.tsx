import { GITHUB_URL, LINKEDIN_URL, WHATSAPP_URL } from '@/lib/site';
import ContactForm from './ContactForm';
import ExtLink from './ExtLink';
import { Icon, type IconName } from './Icons';

const DIRECT: { label: string; href: string; icon: IconName }[] = [
  { label: 'WhatsApp', href: WHATSAPP_URL, icon: 'whatsapp' },
  { label: 'GitHub', href: GITHUB_URL, icon: 'github' },
  { label: 'LinkedIn', href: LINKEDIN_URL, icon: 'linkedin' },
];

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div>
          <h2 className="h2">Tell me what you shipped.</h2>
          <p className="mt-5 max-w-md leading-relaxed text-white/70">
            Choose a service, add your website URL if you have one, and describe the app. I reply
            by email. For a 48h audit, the URL is the fastest way to start.
          </p>

          <ul className="mt-8 space-y-3">
            {DIRECT.map((d) => (
              <li key={d.label}>
                <ExtLink
                  href={d.href}
                  className="inline-flex items-center gap-3 text-white/80 transition hover:text-neon"
                >
                  <Icon name={d.icon} className="h-5 w-5" />
                  {d.label}
                </ExtLink>
              </li>
            ))}
          </ul>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
