import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { useLanguage } from "./i18n";

type Copy = { pl: string; en: string };
type SceneId = "hero" | "surgery" | "aesthetic" | "doctor" | "precision" | "contact";

const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

const scenes: { id: SceneId; src: string; width: number; height: number }[] = [
  { id: "hero", src: "/assets/hero.jpg", width: 1600, height: 1066 },
  { id: "surgery", src: "/assets/bg-surgery.jpg", width: 1600, height: 1066 },
  { id: "aesthetic", src: "/assets/bg-aesthetic.jpg", width: 1600, height: 1066 },
  { id: "doctor", src: "/assets/clinic.jpg", width: 1600, height: 1066 },
  { id: "precision", src: "/assets/precision.jpg", width: 1600, height: 1063 },
  { id: "contact", src: "/assets/bg-tech.jpg", width: 1600, height: 1066 },
];

const navItems: { href: string; label: Copy }[] = [
  { href: "#obszary", label: { pl: "Zakres", en: "Expertise" } },
  { href: "#lekarz", label: { pl: "O lekarzu", en: "About" } },
  { href: "#proces", label: { pl: "Konsultacja", en: "Consultation" } },
  { href: "#cennik", label: { pl: "Cennik", en: "Pricing" } },
  { href: "#faq", label: { pl: "FAQ", en: "FAQ" } },
];

const surgeryProcedures: Copy[] = [
  { pl: "Plastyka powiek górnych i dolnych", en: "Upper and lower blepharoplasty" },
  { pl: "Lifting twarzy i szyi · Deep Plane Facelift", en: "Face and neck lift · Deep Plane Facelift" },
  { pl: "Rynoplastyka i septoplastyka", en: "Rhinoplasty and septoplasty" },
  { pl: "Chirurgia piersi", en: "Breast surgery" },
  { pl: "Abdominoplastyka", en: "Abdominoplasty" },
  { pl: "Liposukcja i modelowanie sylwetki", en: "Liposuction and body contouring" },
];

const aestheticProcedures: Copy[] = [
  { pl: "Laser frakcyjny CO₂", en: "Fractional CO₂ laser" },
  { pl: "Laser tulowy", en: "Thulium laser" },
  { pl: "Radiofrekwencja mikroigłowa · Morpheus", en: "Microneedling radiofrequency · Morpheus" },
  { pl: "Biostymulacja i osocze bogatopłytkowe (PRP)", en: "Biostimulation and platelet-rich plasma (PRP)" },
  { pl: "Terapia blizn i rozstępów", en: "Scar and stretch-mark treatment" },
  { pl: "Toksyna botulinowa i wolumetria", en: "Botulinum toxin and facial volumetry" },
];

const processSteps: { title: Copy; text: Copy }[] = [
  {
    title: { pl: "Kontakt", en: "Contact" },
    text: {
      pl: "Ustalamy dogodny termin i zakres konsultacji. Nie musisz wcześniej wybierać konkretnej metody.",
      en: "We arrange a suitable time and consultation scope. You do not need to choose a specific method beforehand.",
    },
  },
  {
    title: { pl: "Konsultacja lekarska", en: "Medical consultation" },
    text: {
      pl: "Rozmowa, badanie i analiza oczekiwań służą ocenie możliwości, ograniczeń oraz ryzyka.",
      en: "Discussion, examination and expectation analysis help assess options, limitations and risks.",
    },
  },
  {
    title: { pl: "Indywidualny plan", en: "Individual plan" },
    text: {
      pl: "Lekarz omawia możliwe metody, przygotowanie, rekonwalescencję i orientacyjny koszt.",
      en: "The physician discusses possible methods, preparation, recovery and indicative cost.",
    },
  },
  {
    title: { pl: "Opieka i kontrole", en: "Care and follow-up" },
    text: {
      pl: "Jeżeli procedura zostanie zakwalifikowana, dalsze etapy i kontrole są planowane adekwatnie do jej zakresu.",
      en: "If a procedure is indicated, subsequent stages and follow-up are planned according to its scope.",
    },
  },
];

const priceItems: { name: Copy; value: Copy }[] = [
  {
    name: { pl: "Konsultacja chirurgiczna", en: "Surgical consultation" },
    value: { pl: "od 300 zł", en: "from PLN 300" },
  },
  {
    name: { pl: "Plastyka powiek górnych", en: "Upper blepharoplasty" },
    value: { pl: "od 6 500 zł", en: "from PLN 6,500" },
  },
  {
    name: { pl: "Deep Plane Facelift", en: "Deep Plane Facelift" },
    value: { pl: "od 28 000 zł", en: "from PLN 28,000" },
  },
  {
    name: { pl: "Toksyna botulinowa", en: "Botulinum toxin" },
    value: { pl: "od 600 zł", en: "from PLN 600" },
  },
  {
    name: { pl: "Laser frakcyjny CO₂", en: "Fractional CO₂ laser" },
    value: { pl: "od 1 600 zł", en: "from PLN 1,600" },
  },
];

const faqs: { q: Copy; a: Copy }[] = [
  {
    q: { pl: "Jak wygląda pierwsza konsultacja?", en: "What happens during the first consultation?" },
    a: {
      pl: "Obejmuje rozmowę o oczekiwaniach, badanie, ocenę stanu zdrowia oraz omówienie możliwych metod, ograniczeń, ryzyka, rekonwalescencji i kosztów.",
      en: "It includes a discussion of expectations, examination, health assessment and an explanation of possible methods, limitations, risks, recovery and costs.",
    },
  },
  {
    q: { pl: "Czy muszę wiedzieć, jaki zabieg wybrać?", en: "Do I need to know which procedure to choose?" },
    a: {
      pl: "Nie. Dobór postępowania jest częścią konsultacji. W niektórych sytuacjach właściwe może być leczenie niechirurgiczne, odroczenie procedury albo rezygnacja z niej.",
      en: "No. Selecting an approach is part of the consultation. In some situations, non-surgical care, postponement or no procedure may be appropriate.",
    },
  },
  {
    q: { pl: "Czy można zagwarantować konkretny efekt?", en: "Can a specific result be guaranteed?" },
    a: {
      pl: "Nie. Reakcja tkanek i gojenie są indywidualne. Podczas konsultacji lekarz omawia realistyczne możliwości oraz ograniczenia danej procedury.",
      en: "No. Tissue response and healing vary between individuals. During consultation, the physician explains realistic possibilities and limitations of the procedure.",
    },
  },
  {
    q: { pl: "Ile trwa rekonwalescencja?", en: "How long does recovery take?" },
    a: {
      pl: "Zależy od rodzaju i zakresu procedury oraz indywidualnego gojenia. Orientacyjny przebieg i terminy kontroli są omawiane po kwalifikacji.",
      en: "It depends on the type and scope of the procedure and individual healing. The expected course and follow-up schedule are discussed after assessment.",
    },
  },
  {
    q: { pl: "Jak przygotować się do konsultacji?", en: "How should I prepare for consultation?" },
    a: {
      pl: "Przygotuj listę przyjmowanych leków, istotnych chorób i wcześniejszych procedur. Dokumentację medyczną przekazuj wyłącznie bezpiecznym kanałem wskazanym przez gabinet.",
      en: "Prepare a list of medications, relevant conditions and previous procedures. Share medical records only through a secure channel indicated by the practice.",
    },
  },
];

function BackgroundStack({ active }: { active: SceneId }) {
  return (
    <div className="scene-stack" aria-hidden="true">
      {scenes.map((scene) => (
        <div
          className={`scene-layer ${active === scene.id ? "is-active" : ""}`}
          key={scene.id}
          data-background={scene.id}
        >
          <img
            src={asset(scene.src)}
            alt=""
            width={scene.width}
            height={scene.height}
            loading={scene.id === "hero" ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={scene.id === "hero" ? "high" : "auto"}
          />
        </div>
      ))}
      <div className="scene-shade" />
    </div>
  );
}

function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();
  return (
    <div className="language-switch" aria-label={language === "pl" ? "Wybór języka" : "Language selection"}>
      <button type="button" data-testid="language-pl" onClick={() => setLanguage("pl")} aria-pressed={language === "pl"}>PL</button>
      <span aria-hidden="true">/</span>
      <button type="button" data-testid="language-en" onClick={() => setLanguage("en")} aria-pressed={language === "en"}>EN</button>
    </div>
  );
}

function Header({ t }: { t: (copy: Copy) => string }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const closeMenu = () => setOpen(false);
  const toggleMenu = () => setOpen((current) => !current);

  useEffect(() => {
    const main = document.querySelector("main") as (HTMLElement & { inert: boolean }) | null;
    const footer = document.querySelector("footer") as (HTMLElement & { inert: boolean }) | null;
    main && (main.inert = open);
    footer && (footer.inert = open);
    document.body.classList.toggle("menu-open", open);

    if (!open) return;
    const focusTimer = window.setTimeout(
      () => firstLinkRef.current?.focus({ preventScroll: true }),
      50,
    );
    const focusable = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((element) => !element.hasAttribute("disabled"));
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        requestAnimationFrame(() => triggerRef.current?.focus());
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
      triggerRef.current?.focus();
    };
  }, [open]);

  useEffect(
    () => () => {
      const main = document.querySelector("main") as (HTMLElement & { inert: boolean }) | null;
      const footer = document.querySelector("footer") as (HTMLElement & { inert: boolean }) | null;
      main && (main.inert = false);
      footer && (footer.inert = false);
      document.body.classList.remove("menu-open");
    },
    [],
  );

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label={t({ pl: "DrGziut — początek strony", en: "DrGziut — page start" })}>
          <img src={asset("/assets/brand/logo-horizontal.png")} width="1791" height="349" alt="Dr Gziut" />
        </a>
        <nav className="desktop-nav" aria-label={t({ pl: "Główna nawigacja", en: "Primary navigation" })}>
          {navItems.map((item) => <a href={item.href} key={item.href}>{t(item.label)}</a>)}
        </nav>
        <div className="header-actions">
          <a className="header-phone" href="tel:+48533210115">+48 533 210 115</a>
          <LanguageSwitch />
          <a className="header-cta" href="#kontakt">{t({ pl: "Umów konsultację", en: "Book a consultation" })}</a>
          <button
            className="menu-trigger"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={t({ pl: open ? "Zamknij menu" : "Otwórz menu", en: open ? "Close menu" : "Open menu" })}
            data-testid="menu-trigger"
            onClick={toggleMenu}
            ref={triggerRef}
          >
            <span /><span />
          </button>
        </div>
      </header>
      <div
        id="mobile-menu"
        className={`mobile-menu ${open ? "is-open" : ""}`}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={t({ pl: "Menu mobilne", en: "Mobile menu" })}
        aria-hidden={!open}
        data-testid="mobile-menu"
      >
        <div className="mobile-menu-meta">DrGziut · Szczecin</div>
        <nav aria-label={t({ pl: "Menu mobilne", en: "Mobile navigation" })}>
          {navItems.map((item, index) => (
            <a ref={index === 0 ? firstLinkRef : undefined} href={item.href} key={item.href} onClick={closeMenu}>
              <span>0{index + 1}</span>{t(item.label)}
            </a>
          ))}
          <a href="#kontakt" className="mobile-menu-cta" onClick={closeMenu}>
            <span>06</span>{t({ pl: "Umów konsultację", en: "Book a consultation" })}
          </a>
        </nav>
        <a className="mobile-phone" href="tel:+48533210115">+48 533 210 115</a>
        <button className="mobile-menu-close" type="button" onClick={closeMenu}>
          {t({ pl: "Zamknij", en: "Close" })}
        </button>
      </div>
    </>
  );
}

function ChapterLabel({ number, children }: { number: string; children: string }) {
  return <div className="chapter-label"><span>{number}</span><span className="chapter-line" />{children}</div>;
}

function ProcedureList({ items, t }: { items: Copy[]; t: (copy: Copy) => string }) {
  return (
    <ol className="procedure-list">
      {items.map((item, index) => (
        <li key={item.pl}>
          <span>0{index + 1}</span>
          <strong>{t(item)}</strong>
          <i aria-hidden="true">↗</i>
        </li>
      ))}
    </ol>
  );
}

function FAQ({ t }: { t: (copy: Copy) => string }) {
  const [active, setActive] = useState(0);
  return (
    <div className="faq-list">
      {faqs.map((item, index) => {
        const isOpen = active === index;
        const buttonId = `faq-button-${index}`;
        const answerId = `faq-answer-${index}`;
        return (
          <div className={`faq-item ${isOpen ? "is-open" : ""}`} key={item.q.pl}>
            <button
              id={buttonId}
              type="button"
              aria-controls={answerId}
              aria-expanded={isOpen}
              onClick={() => setActive(isOpen ? -1 : index)}
            >
              <span>{t(item.q)}</span><i aria-hidden="true">+</i>
            </button>
            <div
              id={answerId}
              className="faq-answer"
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
            >
              <p>{t(item.a)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ContactForm({ t }: { t: (copy: Copy) => string }) {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };
  if (sent) {
    return (
      <div className="form-success" role="status" data-testid="form-success">
        <span>✓</span>
        <h3>{t({ pl: "Formularz demonstracyjny", en: "Demonstration form" })}</h3>
        <p>{t({
          pl: "Żadne dane nie zostały wysłane ani zapisane. Aby umówić konsultację, zadzwoń lub napisz bezpośrednio do gabinetu.",
          en: "No data was sent or stored. To book a consultation, please call or email the practice directly.",
        })}</p>
        <button type="button" className="text-button" onClick={() => setSent(false)}>
          {t({ pl: "Wróć do formularza", en: "Return to form" })}
        </button>
      </div>
    );
  }
  return (
    <form className="contact-form" onSubmit={submit} data-testid="demo-form">
      <div className="form-row">
        <label>
          <span>{t({ pl: "Imię i nazwisko", en: "Full name" })}</span>
          <input name="name" autoComplete="name" required />
        </label>
        <label>
          <span>{t({ pl: "Telefon lub e-mail", en: "Phone or email" })}</span>
          <input name="contact" autoComplete="tel" required />
        </label>
      </div>
      <label>
        <span>{t({ pl: "Zakres konsultacji", en: "Consultation area" })}</span>
        <select name="area" defaultValue="" required>
          <option value="" disabled>{t({ pl: "Wybierz", en: "Select" })}</option>
          <option>{t({ pl: "Chirurgia plastyczna", en: "Plastic surgery" })}</option>
          <option>{t({ pl: "Medycyna estetyczna", en: "Aesthetic medicine" })}</option>
          <option>{t({ pl: "Nie wiem — potrzebuję konsultacji", en: "I am unsure — I need a consultation" })}</option>
        </select>
      </label>
      <label>
        <span>{t({ pl: "Krótka wiadomość (opcjonalnie)", en: "Short message (optional)" })}</span>
        <textarea name="message" rows={3} />
      </label>
      <p className="privacy-warning">{t({
        pl: "Nie wpisuj numeru PESEL, danych o zdrowiu, innych danych wrażliwych ani nie przesyłaj dokumentacji medycznej przez ten formularz.",
        en: "Do not enter a national ID number, health information, other sensitive data or medical records in this form.",
      })}</p>
      <label className="consent">
        <input type="checkbox" required />
        <span>{t({
          pl: "Wyrażam zgodę na kontakt w sprawie konsultacji. Formularz ma charakter demonstracyjny.",
          en: "I consent to being contacted about a consultation. This form is demonstrational.",
        })}</span>
      </label>
      <button className="primary-button" type="submit">
        {t({ pl: "Umów konsultację", en: "Book a consultation" })}<span aria-hidden="true">↗</span>
      </button>
    </form>
  );
}

function App() {
  const { language } = useLanguage();
  const t = (copy: Copy) => copy[language];
  const [activeScene, setActiveScene] = useState<SceneId>("hero");

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const target = visible.target as HTMLElement;
          setActiveScene(target.dataset.scene as SceneId);
        }
      },
      { rootMargin: "-34% 0px -34% 0px", threshold: [0, 0.1, 0.35, 0.65] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;
    let ticking = false;
    const update = () => {
      document.documentElement.style.setProperty("--scroll-y", `${window.scrollY * -0.018}px`);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="site-shell">
      <BackgroundStack active={activeScene} />
      <a className="skip-link" href="#main-content">
        {t({ pl: "Przejdź do treści", en: "Skip to content" })}
      </a>
      <Header t={t} />
      <aside className="chapter-rail" aria-label={t({ pl: "Rozdziały strony", en: "Page chapters" })}>
        {[
          ["01", "#top", { pl: "Początek", en: "Start" }],
          ["02", "#chirurgia", { pl: "Chirurgia", en: "Surgery" }],
          ["03", "#estetyka", { pl: "Estetyka", en: "Aesthetics" }],
          ["04", "#lekarz", { pl: "Lekarz", en: "Physician" }],
          ["05", "#kontakt", { pl: "Kontakt", en: "Contact" }],
        ].map(([number, href, label]) => (
          <a href={href as string} key={number as string}>
            <span>{number as string}</span>{t(label as Copy)}
          </a>
        ))}
      </aside>

      <main id="main-content" tabIndex={-1}>
        <section className="hero scene-section" id="top" data-scene="hero">
          <div className="hero-copy">
            <ChapterLabel number="01">{t({ pl: "Chirurgia plastyczna · Szczecin", en: "Plastic surgery · Szczecin" })}</ChapterLabel>
            <h1 data-testid="hero-title">
              {t({ pl: "Precyzja,", en: "Precision," })}<br />
              <em>{t({ pl: "która zachowuje Ciebie.", en: "with respect for identity." })}</em>
            </h1>
            <p>{t({
              pl: "Chirurgia plastyczna i medycyna estetyczna oparte na spokojnej analizie, odpowiedzialnej kwalifikacji i indywidualnym planie.",
              en: "Plastic surgery and aesthetic medicine grounded in careful analysis, responsible assessment and an individual plan.",
            })}</p>
            <div className="hero-actions">
              <a className="primary-button" data-testid="hero-cta" href="#kontakt">{t({ pl: "Umów konsultację", en: "Book a consultation" })}<span aria-hidden="true">↗</span></a>
              <a className="secondary-button" href="#obszary">{t({ pl: "Poznaj zakres", en: "Explore expertise" })}</a>
            </div>
          </div>
          <div className="hero-aside">
            <span>{t({ pl: "lek. Hubert Gziut", en: "Hubert Gziut, MD" })}</span>
            <strong>{t({ pl: "Specjalista chirurgii plastycznej", en: "Plastic surgery specialist" })}</strong>
            <small>NPWZ 3186517</small>
          </div>
          <a className="scroll-cue" href="#obszary" aria-label={t({ pl: "Przewiń do zakresu", en: "Scroll to expertise" })}>
            <span>{t({ pl: "Przewiń", en: "Scroll" })}</span><i />
          </a>
        </section>

        <section className="trust-strip" aria-label={t({ pl: "Najważniejsze informacje", en: "Key information" })}>
          <div><span>01</span>{t({ pl: "Specjalista chirurgii plastycznej", en: "Plastic surgery specialist" })}</div>
          <div><span>02</span>NPWZ 3186517</div>
          <div><span>03</span>{t({ pl: "Konsultacja z lekarzem", en: "Physician consultation" })}</div>
          <div><span>04</span>{t({ pl: "Szczecin · Jagiellońska 81", en: "Szczecin · 81 Jagiellońska St." })}</div>
        </section>

        <section className="discipline-intro editorial-section" id="obszary">
          <ChapterLabel number="02">{t({ pl: "Dwa obszary · jeden standard", en: "Two disciplines · one standard" })}</ChapterLabel>
          <div className="intro-grid">
            <h2>{t({ pl: "Metoda wynika z problemu. Nie odwrotnie.", en: "The method follows the concern. Not the other way around." })}</h2>
            <p>{t({
              pl: "Punktem wyjścia jest konsultacja i ocena, czy właściwe będzie leczenie chirurgiczne, niechirurgiczne, łączone — lub rezygnacja z procedury.",
              en: "The starting point is consultation and assessment of whether surgical, non-surgical, combined care — or no procedure — is appropriate.",
            })}</p>
          </div>
        </section>

        <section className="discipline scene-section editorial-section" id="chirurgia" data-scene="surgery">
          <div className="discipline-copy">
            <ChapterLabel number="02.A">{t({ pl: "Chirurgia plastyczna", en: "Plastic surgery" })}</ChapterLabel>
            <h2>{t({ pl: "Zmiana planowana w głębi.", en: "Change planned in depth." })}</h2>
            <p>{t({
              pl: "Każda operacja wymaga kwalifikacji, omówienia alternatyw, ryzyka i realnego przebiegu rekonwalescencji. Zakres leczenia ustalany jest indywidualnie.",
              en: "Every operation requires assessment and discussion of alternatives, risks and the realistic recovery course. Treatment scope is set individually.",
            })}</p>
            <a className="text-link" href="#kontakt">{t({ pl: "Umów konsultację", en: "Book a consultation" })}<span>↗</span></a>
          </div>
          <ProcedureList items={surgeryProcedures} t={t} />
        </section>

        <section className="discipline scene-section editorial-section discipline-reverse" id="estetyka" data-scene="aesthetic">
          <div className="discipline-copy">
            <ChapterLabel number="02.B">{t({ pl: "Medycyna estetyczna", en: "Aesthetic medicine" })}</ChapterLabel>
            <h2>{t({ pl: "Mniej interwencji. Więcej decyzji.", en: "Less intervention. More considered decisions." })}</h2>
            <p>{t({
              pl: "Kwalifikacja, dobór procedury i plan są indywidualne oraz zależą od wskazań i jakości tkanek. Plan może obejmować terapię etapową albo odstąpienie od zabiegu.",
              en: "Assessment, procedure selection and planning are individual and depend on indications and tissue quality. The plan may be staged or may involve no treatment.",
            })}</p>
            <a className="text-link" href="#kontakt">{t({ pl: "Umów konsultację", en: "Book a consultation" })}<span>↗</span></a>
          </div>
          <ProcedureList items={aestheticProcedures} t={t} />
        </section>

        <section className="doctor scene-section editorial-section" id="lekarz" data-scene="doctor">
          <figure className="doctor-portrait">
            <img
              src={asset("/assets/brand/doctor-hubert.jpg")}
              alt={t({ pl: "Lekarz Hubert Gziut, specjalista chirurgii plastycznej", en: "Hubert Gziut, MD, plastic surgery specialist" })}
              width="1160"
              height="1450"
              loading="lazy"
              decoding="async"
            />
            <figcaption>{t({ pl: "Autentyczny portret · drgziut.pl", en: "Authentic portrait · drgziut.pl" })}</figcaption>
          </figure>
          <div className="doctor-copy">
            <ChapterLabel number="03">{t({ pl: "Lekarz", en: "Physician" })}</ChapterLabel>
            <h2><small>lek.</small> Hubert<br /><em>Gziut</em></h2>
            <p className="doctor-title">{t({ pl: "Specjalista chirurgii plastycznej", en: "Plastic surgery specialist" })}</p>
            <p>{t({
              pl: "Absolwent Wydziału Lekarskiego Pomorskiego Uniwersytetu Medycznego w Szczecinie. Egzamin specjalizacyjny z chirurgii plastycznej zdał w marcu 2022 roku. Jego kształcenie podyplomowe obejmuje również medycynę estetyczną.",
              en: "A graduate of the Faculty of Medicine at Pomeranian Medical University in Szczecin. He completed his specialist examination in plastic surgery in March 2022. His postgraduate education also includes aesthetic medicine.",
            })}</p>
            <p>{t({
              pl: "Konsultuje, kwalifikuje i planuje leczenie w zakresie chirurgii plastycznej oraz procedur estetycznych. Decyzja o metodzie zapada po badaniu i rozmowie o możliwościach, ograniczeniach i bezpieczeństwie.",
              en: "He consults, assesses and plans treatment in plastic surgery and aesthetic procedures. Method selection follows examination and a discussion of possibilities, limitations and safety.",
            })}</p>
            <div className="license-line"><span>NPWZ</span><strong>3186517</strong></div>
          </div>
        </section>

        <section className="philosophy editorial-section" data-scene="precision">
          <ChapterLabel number="04">{t({ pl: "Filozofia", en: "Philosophy" })}</ChapterLabel>
          <blockquote>
            {t({ pl: "Dobra decyzja medyczna nie zaczyna się od obietnicy efektu.", en: "A sound medical decision does not begin with a promise of a result." })}
            <em>{t({ pl: "Zaczyna się od uczciwej kwalifikacji.", en: "It begins with honest assessment." })}</em>
          </blockquote>
          <div className="principles">
            <div><span>01</span><strong>{t({ pl: "Proporcje", en: "Proportion" })}</strong><p>{t({ pl: "Plan dopasowany do anatomii, nie do szablonu.", en: "A plan adapted to anatomy, not a template." })}</p></div>
            <div><span>02</span><strong>{t({ pl: "Odpowiedzialność", en: "Responsibility" })}</strong><p>{t({ pl: "Jasna rozmowa o korzyściach, ograniczeniach i ryzyku.", en: "A clear discussion of benefits, limitations and risks." })}</p></div>
            <div><span>03</span><strong>{t({ pl: "Ciągłość opieki", en: "Continuity of care" })}</strong><p>{t({ pl: "Przygotowanie, procedura i kontrole jako jeden proces.", en: "Preparation, procedure and follow-up as one process." })}</p></div>
          </div>
        </section>

        <section className="process editorial-section" id="proces" data-scene="precision">
          <div className="process-heading">
            <ChapterLabel number="05">{t({ pl: "Ścieżka konsultacji", en: "Consultation path" })}</ChapterLabel>
            <h2>{t({ pl: "Od pytania do świadomej decyzji.", en: "From a question to an informed decision." })}</h2>
          </div>
          <ol className="process-list">
            {processSteps.map((step, index) => (
              <li key={step.title.pl}>
                <span>0{index + 1}</span>
                <h3>{t(step.title)}</h3>
                <p>{t(step.text)}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="pricing editorial-section" id="cennik" data-scene="precision">
          <div className="pricing-heading">
            <ChapterLabel number="06">{t({ pl: "Cennik orientacyjny", en: "Indicative pricing" })}</ChapterLabel>
            <h2>{t({ pl: "Przejrzystość przed konsultacją.", en: "Clarity before consultation." })}</h2>
            <p>{t({
              pl: "Podane kwoty mają charakter orientacyjny. Ostateczny zakres i koszt są ustalane po badaniu oraz indywidualnej kwalifikacji.",
              en: "Prices are indicative. Final scope and cost are determined after examination and individual assessment.",
            })}</p>
          </div>
          <div className="price-list">
            {priceItems.map((item, index) => (
              <div key={item.name.pl}><span>0{index + 1}</span><strong>{t(item.name)}</strong><i /><b>{t(item.value)}</b></div>
            ))}
          </div>
        </section>

        <section className="faq-section editorial-section" id="faq" data-scene="contact">
          <div className="faq-heading">
            <ChapterLabel number="07">{t({ pl: "Przed konsultacją", en: "Before consultation" })}</ChapterLabel>
            <h2>{t({ pl: "Pytania, które warto zadać.", en: "Questions worth asking." })}</h2>
          </div>
          <FAQ t={t} />
        </section>

        <section className="contact scene-section editorial-section" id="kontakt" data-scene="contact">
          <div className="contact-copy">
            <ChapterLabel number="08">{t({ pl: "Kontakt", en: "Contact" })}</ChapterLabel>
            <h2>{t({ pl: "Zacznij od spokojnej rozmowy.", en: "Start with a considered conversation." })}</h2>
            <p>{t({
              pl: "Jeśli nie wiesz, która metoda może być właściwa, umów konsultację z lekarzem.",
              en: "If you are unsure which method may be appropriate, arrange a physician consultation.",
            })}</p>
            <div className="contact-details">
              <a href="tel:+48533210115"><span>{t({ pl: "Telefon", en: "Phone" })}</span><strong>+48 533 210 115</strong></a>
              <a href="mailto:biuro@drgziut.pl"><span>E-mail</span><strong>biuro@drgziut.pl</strong></a>
              <div><span>{t({ pl: "Gabinet", en: "Practice" })}</span><strong>{t({ pl: "Jagiellońska 81 · Szczecin", en: "81 Jagiellońska St. · Szczecin" })}</strong></div>
            </div>
          </div>
          <ContactForm t={t} />
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <img src={asset("/assets/brand/logo-light.png")} width="1080" height="1080" loading="lazy" decoding="async" alt="Dr Gziut" />
        </div>
        <div className="footer-contact">
          <a href="tel:+48533210115">+48 533 210 115</a>
          <a href="mailto:biuro@drgziut.pl">biuro@drgziut.pl</a>
          <span>{t({ pl: "Jagiellońska 81 · Szczecin", en: "81 Jagiellońska St. · Szczecin" })}</span>
        </div>
        <p className="footer-disclaimer">{t({
          pl: "Treści na stronie mają charakter informacyjny i nie zastępują indywidualnej konsultacji lekarskiej. O kwalifikacji, zakresie leczenia i rodzaju znieczulenia decyduje lekarz po badaniu oraz analizie stanu zdrowia.",
          en: "This website is for information only and does not replace an individual medical consultation. Eligibility, treatment scope and anaesthesia are determined by the physician after examination and health assessment.",
        })}</p>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} DrGziut</span><span>NPWZ 3186517</span></div>
      </footer>
    </div>
  );
}

export default App;
