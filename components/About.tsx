import { EXPERIENCE_YEARS, LOCATION, OWNER_NAME } from '@/lib/site';

const STEPS = [
  { title: 'Build', text: 'Ship web and mobile apps with access control and secrets handled in the design, not patched in later.' },
  { title: 'Break', text: 'Attack the result the way a stranger would: open RLS, IDOR, exposed keys, trusting the client.' },
  { title: 'Secure', text: 'Fix what broke, then keep watch with monitoring, updates and a monthly report.' },
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 className="h2">About {OWNER_NAME}</h2>
          <div className="mt-6 space-y-4 leading-relaxed text-white/75">
            <p>
              I work across cybersecurity and web development from {LOCATION}, with{' '}
              {EXPERIENCE_YEARS} years of hands-on experience. FAZAA SEC is the brand I use to
              build apps and to break them before someone else does.
            </p>
            <p>
              AI tools make shipping fast, and they make leaky defaults easy to ship: open
              database tables, API keys in the frontend, endpoints that trust whatever the browser
              sends. I look for those first, show you the proof, and fix them.
            </p>
            <p>
              My lab work covers SOC detections, threat intelligence and privilege escalation. My
              build work covers web apps, Telegram bots and Android and Flutter apps.
            </p>
          </div>
        </div>

        <ol className="relative space-y-8 border-l border-neon/40 pl-8">
          {STEPS.map((s) => (
            <li key={s.title} className="relative">
              <span
                className="absolute -left-[2.45rem] top-1.5 h-3 w-3 rounded-full bg-neon"
                aria-hidden="true"
              />
              <h3 className="text-xl font-bold">{s.title}</h3>
              <p className="mt-1 leading-relaxed text-white/70">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
