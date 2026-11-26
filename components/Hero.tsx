const SCOPE = [
  'RLS policies on every table',
  'IDOR and broken access control',
  'Exposed keys and secrets',
  'PDF report with fixes',
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <img src="/hero/hero.jpg" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-15" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            I Build &amp; Secure AI-Built Apps Before They Leak.
          </h1>

          <p className="mt-7 font-mono text-xl font-medium text-neon sm:text-2xl">
            {'Build -> Break -> Secure'}
          </p>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            FAZAA SEC audits and builds web and mobile apps. I find the open tables, leaked keys
            and broken access checks that AI-generated code ships with, then fix them.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#contact" className="btn-primary">
              Book a 48h audit
            </a>
            <a href="#projects" className="btn-ghost">
              See my projects
            </a>
          </div>
        </div>

        <aside className="panel p-5 font-mono text-sm shadow-[0_0_80px_-30px_rgba(0,255,136,0.45)]">
          <div className="mb-5 flex items-center justify-between text-xs text-white/40">
            <span>48h audit scope</span>
            <span className="flex gap-1.5" aria-hidden="true">
              <i className="h-2 w-2 rounded-full bg-white/20" />
              <i className="h-2 w-2 rounded-full bg-white/20" />
              <i className="h-2 w-2 rounded-full bg-neon" />
            </span>
          </div>
          <ul className="space-y-3.5">
            {SCOPE.map((item, i) => (
              <li
                key={item}
                className="reveal flex items-start gap-3 text-white/90"
                style={{ animationDelay: `${0.25 + i * 0.35}s` }}
              >
                <span className="text-neon" aria-hidden="true">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
