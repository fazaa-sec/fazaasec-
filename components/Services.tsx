import { SERVICES } from '@/lib/data';
import { Icon } from './Icons';
import ServiceButton from './ServiceButton';

export default function Services() {
  return (
    <section id="services" className="section">
      <h2 className="h2">Pick the job. The price is on the label.</h2>

      <ul className="panel mt-12 grid overflow-hidden md:grid-cols-3 md:divide-x md:divide-white/10 max-md:divide-y max-md:divide-white/10">
        {SERVICES.map((s) => (
          <li key={s.id} className="flex flex-col p-7 sm:p-8">
            <div className="flex items-center justify-between">
              <span className="text-neon">
                <Icon name={s.icon} className="h-7 w-7" />
              </span>
              {s.tag && (
                <span className="rounded border border-neon/40 px-2 py-0.5 font-mono text-xs text-neon">
                  {s.tag}
                </span>
              )}
            </div>
            <h3 className="mt-6 text-2xl font-bold">{s.title}</h3>
            <p className="mt-1 text-3xl font-extrabold text-neon">{s.price}</p>
            <p className="mt-5 flex-1 leading-relaxed text-white/70">{s.description}</p>
            <ServiceButton service={s.id} label={`Request ${s.title}`} />
          </li>
        ))}
      </ul>
    </section>
  );
}
