"use client";
import { useState } from 'react';

const WHATSAPP_NUMBER = "249912405246";

const FAQS_AR = [
  { q: "بكام الصفحة؟", a: "عندنا 3 باقات: صفحة مطعم 50$، متجر 80$، عيادة 50$. التسليم في 24 - 48 ساعة، والدفع بعد ما تشوف الشغل." },
  { q: "التسليم في قد ايه؟", a: "صفحة المطعم والعيادة في 24 ساعة، والمتجر في 48 ساعة." },
  { q: "ادفع ازاي؟", a: "بتدفع بعد ما تشوف شغلك وتوافق عليه. بنقبل بنكك، فودافون كاش، انستا باي، وتحويل بنكي." },
  { q: "مكانكم فين؟", a: "احنا في أسوان، وبنشتغل مع كل المحافظات والسودان أونلاين." },
];

const FAQS_EN = [
  { q: "How much?", a: "We have 3 packages: Restaurant page $50, Store $80, Clinic $50. Delivery in 24 - 48 hours, and you pay after you see your work." },
  { q: "Delivery time?", a: "Restaurant and clinic pages in 24 hours, store in 48 hours." },
  { q: "How to pay?", a: "You pay after you approve your page. We accept Bankak, Vodafone Cash, InstaPay, and bank transfer." },
  { q: "Where are you?", a: "We are in Aswan, and we work with all Egypt and Sudan online." },
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'أهلا بيك في Fazzaa 👋 عايز صفحة لمشروعك؟ اسألني بالعربي أو English. / Ask me in Arabic or English.' }
  ]);
  const [input, setInput] = useState('');

  const isArabic = (text: string) => /[\u0600-\u06FF]/.test(text);

  const send = (text: string) => {
    if (!text.trim()) return;
    const arabic = isArabic(text);
    const faqs = arabic ? FAQS_AR : FAQS_EN;
    setLang(arabic ? 'ar' : 'en');

    const userMsg = { from: 'user', text };
    let reply = arabic 
      ? "تمام، فهمتك. عشان أرد عليك صح، كلميني واتساب وهرد عليك بنفسي 👇"
      : "Got it. To help you better, message me on WhatsApp and I'll reply myself 👇";
    
    const lower = text.toLowerCase();
    if (arabic) {
      if (lower.includes('بكام') || lower.includes('سعر') || lower.includes('تكلفة')) reply = FAQS_AR[0].a;
      else if (lower.includes('قد ايه') || lower.includes('وقت') || lower.includes('تسليم')) reply = FAQS_AR[1].a;
      else if (lower.includes('ادفع') || lower.includes('دفع') || lower.includes('فودافون') || lower.includes('بنكك')) reply = FAQS_AR[2].a;
      else if (lower.includes('فين') || lower.includes('مكان') || lower.includes('عنوان')) reply = FAQS_AR[3].a;
    } else {
      if (lower.includes('price') || lower.includes('cost') || lower.includes('much')) reply = FAQS_EN[0].a;
      else if (lower.includes('time') || lower.includes('delivery') || lower.includes('long')) reply = FAQS_EN[1].a;
      else if (lower.includes('pay') || lower.includes('payment')) reply = FAQS_EN[2].a;
      else if (lower.includes('where') || lower.includes('location')) reply = FAQS_EN[3].a;
    }
    setMessages([...messages, userMsg, { from: 'bot', text: reply }]);
    setInput('');
  };

  const currentFaqs = lang === 'ar' ? FAQS_AR : FAQS_EN;

  return (
    <>
      {!open && (
        <button onClick={() => setOpen(true)} className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400 text-2xl shadow-lg shadow-emerald-400/30">
          💬
        </button>
      )}

      {open && (
        <div className="fixed bottom-5 right-5 z-50 flex h-[470px] w-[320px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0f1a15] shadow-2xl">
          <div className="flex items-center justify-between bg-emerald-400 px-4 py-3 text-black">
            <div>
              <p className="font-bold">{lang === 'ar' ? 'مساعد Fazzaa' : 'Fazzaa Assistant'}</p>
              <p className="text-xs">{lang === 'ar' ? 'متصل الآن • بيرد فوراً' : 'Online • Replies instantly'}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} className="rounded-full bg-black px-2.5 py-1 text-xs font-bold text-white">
                {lang === 'ar' ? 'EN' : 'عربي'}
              </button>
              <button onClick={() => setOpen(false)} className="text-xl font-bold">✕</button>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div key={i} className={m.from === 'bot' ? 'mr-auto max-w-[85%] rounded-xl rounded-tl-none bg-white/10 px-3 py-2 text-sm' : 'ml-auto max-w-[85%] rounded-xl rounded-tr-none bg-emerald-400 px-3 py-2 text-sm text-black'}>
                {m.text}
              </div>
            ))}
            <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lang === 'ar' ? 'أهلا، عايز صفحة لمشروعي' : 'Hi, I want a page for my business')}`} target="_blank" className="block rounded-xl bg-[#25D366] py-2.5 text-center text-sm font-bold text-black">
              {lang === 'ar' ? 'كمل على واتساب 📱' : 'Continue on WhatsApp 📱'}
            </a>
          </div>

          <div className="border-t border-white/10 p-3">
            <div className="mb-2 flex flex-wrap gap-1.5">
              {currentFaqs.map((f) => (
                <button key={f.q} onClick={() => send(f.q)} className="rounded-full border border-white/20 px-2.5 py-1 text-xs text-white/80">
                  {f.q}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send(input)} placeholder={lang === 'ar' ? 'اكتب سؤالك...' : 'Type your question...'} className="flex-1 rounded-lg bg-white/10 px-3 py-2 text-sm outline-none" />
              <button onClick={() => send(input)} className="rounded-lg bg-emerald-400 px-3 font-bold text-black">➤</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
  }
