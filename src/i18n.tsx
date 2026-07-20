import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type Lang = 'pl' | 'en';

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const LanguageContext = createContext<LangCtx>({ lang: 'pl', setLang: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem('drgziut-lang');
    return saved === 'en' ? 'en' : 'pl';
  });
  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem('drgziut-lang', l);
    document.documentElement.lang = l;
  }, []);
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);

/** Pick translation by current language */
export function useT() {
  const { lang } = useLang();
  return useCallback(
    <T,>(pair: { pl: T; en: T }): T => pair[lang],
    [lang]
  );
}
