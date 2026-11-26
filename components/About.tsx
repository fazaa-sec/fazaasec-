import { EXPERIENCE_YEARS, LOCATION, OWNER_NAME } from '@/lib/site';

const STEPS = [
  { title: 'Build', text: 'Ship web and mobile apps with access control and secrets handled in the design, not patched in later.' },
  { title: 'Break', text: 'Attack the result the way a stranger would: open RLS, IDOR, exposed keys, trusting the client.' },
  { title: 'Secure', text: 'Fix what broke, then keep watch with monitoring, updates and a monthly report.' },
];

const CASES = [
  {
    title: 'Case 1 - Exposed API Key',
    text: 'Found a live OpenAI key exposed in a client frontend. Rotated the key, moved it to server-side env, and added key-scanning to CI. Fixed in 2 hours, before any abuse.'
  },
  {
    title: 'Case 2 - Open Database (RLS)',
    text: 'Found a Supabase table with RLS disabled, anyone could read user data. Enabled RLS, wrote secure policies, and re-tested with unauthenticated access. Closed before launch.'
  },
  {
    title: 'Case 3 - AI-Generated App Audit',
    text: 'Audited an AI-built SaaS in 48h. Found 3 IDOR issues + 1 exposed admin route. Delivered PDF report with fix code. Client shipped secure version in 3 days.'
  },
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

          {/* Case Studies */}
          <div className="mt-10">
            <h3 className="text-xl font-bold">Case Studies - Real Work</h3>
            <div className="mt-4 space-y-4">
              {CASES.map((c) => (
                <div key={c.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="font-bold text-white">{c.title}</p>
                  <p className="mt-1 leading-relaxed text-white/70">{c.text}</p>
                </div>
              ))}
            </div>
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
