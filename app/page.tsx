import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Projects from '@/components/Projects';
import Services from '@/components/Services';
import Templates from '@/components/Templates';
import { LangProvider } from '@/components/LanguageContext';

export default function Home() {
  return (
    <LangProvider>
      <Navbar />
      <main id="main">
        <Hero />
        <Services />
        <Projects />
        <Templates />
        <About />
        <Contact />
      </main>
      <Footer />
    </LangProvider>
  );
}
