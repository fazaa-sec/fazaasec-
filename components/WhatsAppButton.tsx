import { WHATSAPP_URL } from '@/lib/site';
import ExtLink from './ExtLink';
import { Icon } from './Icons';

export default function WhatsAppButton() {
  return (
    <ExtLink
      href={WHATSAPP_URL}
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-neon text-ink shadow-[0_8px_30px_rgba(0,255,136,0.35)] transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <Icon name="whatsapp" className="h-7 w-7" />
    </ExtLink>
  );
}
