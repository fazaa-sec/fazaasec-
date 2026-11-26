export default function Home() {
  return (
    <main className="bg-black min-h-screen">

      {/* 1. HERO */}
      <section className="relative h-screen flex items-center justify-center">
        <img src="/hero/hero.jpg" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white">Muatez Margani</h1>
          <p className="text-green-400 text-xl md:text-2xl mt-4">Ethical Hacker & Penetration Tester</p>
          <p className="text-gray-300 mt-3">بحمي المتاجر والشركات من الاختراق قبل ما يحصل</p>
          <div className="flex gap-4 justify-center mt-8">
            <a href="#case-study" className="bg-green-500 text-black px-6 py-3 rounded-full font-bold">شوف شغلي</a>
            <a href="#about" className="border border-white/30 text-white px-6 py-3 rounded-full">من أنا</a>
          </div>
        </div>
      </section>

      {/* 2. ABOUT */}
      <section id="about" className="py-20 px-6 max-w-6xl mx-auto flex flex-col md:flex-row gap-10 items-center">
        <img src="/about/bg.jpg" className="w-full md:w-1/2 rounded-2xl" />
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-white">About Me</h2>
          <p className="text-gray-400 mt-4 leading-relaxed">
            أنا معتز، مختص في اختبار الاختراق وأمن المواقع.
            بساعد الشركات والمتاجر تكتشف الثغرات قبل ما الهاكرز يلقوها.
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            <span className="bg-zinc-900 text-green-400 px-3 py-1 rounded-full text-sm">Penetration Testing</span>
            <span className="bg-zinc-900 text-green-400 px-3 py-1 rounded-full text-sm">Web Security</span>
            <span className="bg-zinc-900 text-green-400 px-3 py-1 rounded-full text-sm">Bug Bounty</span>
          </div>
        </div>
      </section>

      {/* 3. CASE STUDY */}
      <section id="case-study" className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">Case Study</h2>
        <div className="bg-zinc-900 rounded-2xl overflow-hidden">
          <img src="/case-studies/case.jpg" className="w-full h-64 md:h-80 object-cover" />
          <div className="p-6 md:p-8">
            <span className="text-green-400 text-sm font-bold">E-COMMERCE SECURITY</span>
            <h3 className="text-2xl font-bold text-white mt-2">اختراق متجر إلكتروني</h3>
            <p className="text-gray-400 mt-3 leading-relaxed">
              العميل كان شاكي إنو حسابات العملاء بتتسرق.
              عملت فحص كامل ولقيت ثغرة SQL Injection بتسرب كل قاعدة البيانات،
              وثغرة XSS، وكلمات سر ضعيفة.
              قفلنا كل الثغرات والمتجر ليهو 6 شهور آمن تماما.
            </p>
            <p className="text-green-400 mt-4 text-sm">Burp Suite - Nmap - SQLmap</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-gray-500 border-t border-white/10">
        © 2026 Muatez Margani - All Rights Reserved
      </footer>

    </main>
  );
}
