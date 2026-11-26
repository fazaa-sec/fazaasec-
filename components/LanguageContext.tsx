'use client';
import { createContext, useContext, useState } from 'react';

const LangContext = createContext({ lang: 'en', setLang: (l: string) => {} });
export const useLang = () => useContext(LangContext);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState('en');
  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}
