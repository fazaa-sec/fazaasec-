const TEMPLATES = [
  {
    title: 'صفحة مطعم',
    desc: 'منيو، صور الأكل، زر طلب واتساب، وموقع المطعم.',
    price: '$50',
    time: 'تسليم 24 ساعة',
    img: '/templates/restaurant.jpg',
  },
  {
    title: 'متجر عطور / ملابس',
    desc: 'عرض المنتجات، أسعار، زر شراء واتساب، وربط انستقرام.',
    price: '$80',
    time: 'تسليم 48 ساعة',
    img: '/templates/shop.jpg',
  },
  {
    title: 'صفحة دكتور / عيادة',
    desc: 'خدمات العيادة، مواعيد الحجز، تقييمات المرضى، وزر واتساب.',
    price: '$50',
    time: 'تسليم 24 ساعة',
    img: '/templates/clinic.jpg',
  },
];

export default function Templates() {
  return (
    <section id="templates" className="section">
      <h2 className="h2">صفحات جاهزة - تستلم شغلك بكرة.</h2>
      <p className="mt-4 text-white/70">ما محتاج تستنى شهر. اختار النموذج، وانا بعدلو ليك على شغلك في يوم واحد. الدفع بعد تشوف الشغل.</p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {TEMPLATES.map((t) => (
          <div key={t.title} className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <div className="flex h-40 items-center justify-center bg-neon/10 text-4xl font-bold text-neon">
              {t.title}
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold">{t.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{t.desc}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-2xl font-bold text-neon">{t.price}</span>
                <span className="text-xs text-white/50">{t.time}</span>
              </div>
              <a href="#contact" className="mt-4 block rounded-lg bg-neon py-2.5 text-center font-bold text-black">
                اطلب دي بالواتساب
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
