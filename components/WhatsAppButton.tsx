'use client';

import { useLang } from './LanguageContext';

export default function Templates() {
  const { lang } = useLang();
  const isAr = lang === 'ar';

  const TEMPLATES = [
    {
      id: 1,
      title: isAr ? 'صفحة مطعم' : 'Restaurant Page',
      desc: isAr
        ? 'منيو، صور الأكل، زر طلب واتساب، وموقع المطعم على الخريطة.'
        : 'Menu, food photos, WhatsApp order button, and location on map.',
      price: '50$',
      time: isAr ? 'تسليم 24 ساعة' : 'Delivery in 24h',
      image: '/restaurant.jpg',
      whatsappText: isAr
        ? 'مرحبا، عايز صفحة مطعم زي دي'
        : 'Hello, I want a restaurant page like this',
    },
    {
      id: 2,
      title: isAr ? 'متجر عطور / ملابس' : 'Perfume / Fashion Store',
      desc: isAr
        ? 'عرض المنتجات، أسعار، زر شراء واتساب، وربط انستقرام.'
        : 'Product showcase, prices, WhatsApp buy button, and Instagram link.',
      price: '80$',
      time: isAr ? 'تسليم 48 ساعة' : 'Delivery in 48h',
      image: '/perfume.jpg',
      whatsappText: isAr
        ? 'مرحبا، عايز متجر عطور / ملابس زي ده'
        : 'Hello, I want a store like this',
    },
    {
      id: 3,
      title: isAr ? 'صفحة دكتور / عيادة' : 'Doctor / Clinic Page',
      desc: isAr
        ? 'خدمات العيادة، مواعيد الحجز، تقييمات المرضى، وزر واتساب.'
        : 'Clinic services, booking times, patient reviews, and WhatsApp button.',
      price: '50$',
      time: isAr ? 'تسليم 24 ساعة' : 'Delivery in 24h',
      image: '/clinic.jpg',
      whatsappText: isAr
        ? 'مرحبا، عايز صفحة دكتور / عيادة زي دي'
        : 'Hello, I want a clinic page like this',
    },
  ];

  return (
    <section id="templates" className="py-20 px-4" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold text-white md:text-4xl">
          {isAr ? 'صفحات جاهزة - استلم شغلك بكرة' : 'Ready-Made Pages - Get Your Work Tomorrow.'}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-white/70">
          {isAr
            ? 'اختار قالب، أخصصو ليك لمشروعك في يوم واحد. الدفع بعد تشوف الشغل.'
            : 'Pick a template, I will customize it for your business in one day. Pay after you see the work.'}
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {TEMPLATES.map((t) => (
            <div
              key={t.id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            >
              <img
                src={t.image}
                alt={t.title}
                className="h-48 w-full object-cover"
              />

              <div className="p-5">
                <h3 className="text-xl font-bold text-white">{t.title}</h3>
                <p className="mt-2 min-h-[48px] text-sm leading-relaxed text-white/70">
                  {t.desc}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-2xl font-bold text-emerald-400">
                    {t.price}
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">
                    {t.time}
                  </span>
                </div>

                <a
                  href={`https://wa.me/249000000000?text=${encodeURIComponent(t.whatsappText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block rounded-lg bg-emerald-400 py-2.5 text-center font-bold text-black hover:bg-emerald-300"
                >
                  {isAr ? 'اطلب بالواتساب' : 'Order This on WhatsApp'}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
