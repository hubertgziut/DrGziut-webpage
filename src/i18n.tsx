import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Language = "pl" | "en";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
};

const STORAGE_KEY = "drgziut-language";

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLanguage(): Language {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "pl" || saved === "en") return saved;
  } catch {
    // Storage can be unavailable in privacy-restricted browsing contexts.
  }
  return "pl";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title =
      language === "pl"
        ? "lek. Hubert Gziut — chirurgia plastyczna i medycyna estetyczna"
        : "Hubert Gziut, MD — plastic surgery and aesthetic medicine";

    const description = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );
    if (description) {
      description.content =
        language === "pl"
          ? "lek. Hubert Gziut, specjalista chirurgii plastycznej w Szczecinie. Chirurgia plastyczna i medycyna estetyczna z indywidualną kwalifikacją i planem."
          : "Hubert Gziut, MD, plastic surgery specialist in Szczecin. Plastic surgery and aesthetic medicine with individual assessment and planning.";
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // The language still works for the current visit.
    }
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () =>
        setLanguage((current) => (current === "pl" ? "en" : "pl")),
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}
