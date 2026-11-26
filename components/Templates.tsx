const TEMPLATES = [
  {
    title: 'Restaurant Page',
    desc: 'Menu, food photos, WhatsApp order button, and location.',
    price: '$50',
    time: 'Delivery in 24h',
  },
  {
    title: 'Perfume / Fashion Store',
    desc: 'Product showcase, prices, WhatsApp buy button, and Instagram link.',
    price: '$80',
    time: 'Delivery in 48h',
  },
  {
    title: 'Doctor / Clinic Page',
    desc: 'Clinic services, booking times, patient reviews, and WhatsApp button.',
    price: '$50',
    time: 'Delivery in 24h',
  },
];

export default function Templates() {
  return (
    <section id="templates" className="py-20">
      <h2 className="text-3xl font-bold">Ready-Made Pages - Get Your Work Tomorrow.</h2>
      <p className="mt-4 text-white/70">No need to wait a month. Pick a template, I will customize it for your business in one day. Pay after you see the work.</p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {TEMPLATES.map((t) => (
          <div key={t.title} className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <div className="flex h-40 items-center justify-center bg-emerald-400/10 text-2xl font-bold text-emerald-400">
              {t.title}
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold">{t.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{t.desc}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-2xl font-bold text-emerald-400">{t.price}</span>
                <span className="text-xs text-white/50">{t.time}</span>
              </div>
              <a href="#contact" className="mt-4 block rounded-lg bg-emerald-400 py-2.5 text-center font-bold text-black">
                Order This on WhatsApp
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
