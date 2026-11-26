import { PROJECTS, type Project, type ProjectStatus } from '@/lib/data';
import ExtLink from './ExtLink';
import { Icon } from './Icons';

const GROUPS: { status: ProjectStatus; title: string; blurb: string }[] = [
  { status: 'Secured', title: 'Secured', blurb: 'Detection engineering, threat intel and attack labs.' },
  { status: 'Built', title: 'Built', blurb: 'Apps and bots shipped end to end.' },
  { status: 'Private', title: 'Private', blurb: 'Not public. Details on request.' },
];

function ProjectRow({ p }: { p: Project }) {
  const isPrivate = p.status === 'Private';
  return (
    <li className="grid gap-3 py-5 md:grid-cols-[1.1fr_1fr_1.3fr_auto] md:items-center md:gap-6">
      <h4 className="flex items-center gap-2 text-lg font-semibold">
        {isPrivate && <Icon name="lock" className="h-4 w-4 shrink-0 text-white/50" />}
        {p.name}
      </h4>

      <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
        {p.stack.map((t) => (
          <li key={t} className="rounded border border-white/15 px-2 py-0.5 font-mono text-xs text-white/70">
            {t}
          </li>
        ))}
      </ul>

      <p className={isPrivate ? 'text-sm text-white/50' : 'text-sm text-white/75'}>{p.description}</p>

      <div className="md:text-right">
        {p.repo ? (
          <ExtLink
            href={p.repo}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-neon hover:underline"
            aria-label={`${p.name} on GitHub`}
          >
            <Icon name="github" className="h-4 w-4" /> GitHub
          </ExtLink>
        ) : (
          <a href="#contact" className="text-sm font-medium text-white/60 hover:text-neon">
            Ask for details
          </a>
        )}
      </div>
    </li>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section">
      <h2 className="h2">12 projects across defense, detection and delivery.</h2>

      <img src="/case-studies/case.jpg" className="mt-8 h-64 w-full rounded-2xl object-cover md:h-80" />

      <div className="mt-12 space-y-14">
        {GROUPS.map((g) => {
          const items = PROJECTS.filter((p) => p.status === g.status);
          return (
            <div key={g.status}>
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h3 className="text-xl font-bold text-neon">
                  {g.title} <span className="font-mono text-base text-white/50">({items.length})</span>
                </h3>
                <p className="text-sm text-white/50">{g.blurb}</p>
              </div>
              <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
                {items.map((p) => (
                  <ProjectRow key={p.name} p={p} />
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
