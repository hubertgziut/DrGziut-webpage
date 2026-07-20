import { useEffect, useRef, useState, ReactNode } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useLang, useT } from './i18n';
import { common, nav, type BiText } from './data';
import { ScrollBackgroundProvider, SectionBackground, assetUrl } from './ScrollBackgrounds';

export const A = ({ children, to, className }: { children: ReactNode; to: string; className?: string }) => (
  <Link className={className} to={to}>{children}</Link>
);

export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { node.classList.add('visible'); obs.unobserve(node); }
    }, { threshold: 0.12 });
    obs.observe(node);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang } = useLang();
  const t = useT();
  const location = useLocation();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll(); window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);
  const links = [
    ['/', nav.home], ['/chirurgia-plastyczna', nav.surgery], ['/medycyna-estetyczna', nav.aesthetic], ['/metoda', nav.method], ['/klinika', nav.clinic], ['/cennik', nav.pricing], ['/kontakt', nav.contact],
  ] as const;
  return <>
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <Link to="/" className="nav-logo"><img src={assetUrl('/assets/brand/logo-light.png')} alt="DrGziut" style={{ height: 40, width: 'auto', display: 'block' }} /></Link>
        <nav className="nav-links">
          {links.slice(1).map(([to, label]) => <NavLink key={to} to={to}>{t(label)}</NavLink>)}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <a className="nav-phone" href={'tel:+48' + '533210115'}>+48 533 210 115</a>
          <div className="lang-switch" aria-label="Language">
            <button className={lang === 'pl' ? 'active' : ''} onClick={() => setLang('pl')}>PL</button>
            <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
          </div>
          <Link to="/konsultacja" className="btn btn-solid nav-cta">{t(nav.book)}</Link>
          <button className="burger" aria-label="Open menu" onClick={() => setMenuOpen(v => !v)}>
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
    <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
      {links.map(([to, label]) => <Link key={to} to={to}>{t(label)}</Link>)}
      <Link to="/konsultacja" className="btn btn-solid">{t(nav.book)}</Link>
    </div>
  </>;
}

export function Footer() {
  const t = useT();
  return <footer className="footer">
    <div className="container">
      <div className="footer-grid">
        <div>
          <div className="footer-logo">Dr<span>Gziut</span></div>
          <p style={{ maxWidth: 310 }}>{t({ pl: 'Hubert Gziut · specjalista chirurgii plastycznej', en: 'Hubert Gziut · plastic surgery specialist' })}</p>
          <p style={{ marginTop: 8 }}>NPWZ 3186517</p>
        </div>
        <div>
          <h4>{t({ pl: 'Zabiegi', en: 'Procedures' })}</h4>
          <ul>
            <li><Link to="/chirurgia-plastyczna">{t(nav.surgery)}</Link></li>
            <li><Link to="/medycyna-estetyczna">{t(nav.aesthetic)}</Link></li>
            <li><Link to="/metoda">{t(nav.method)}</Link></li>
            <li><Link to="/cennik">{t(nav.pricing)}</Link></li>
          </ul>
        </div>
        <div>
          <h4>{t({ pl: 'Kontakt', en: 'Contact' })}</h4>
          <ul>
            <li><a href={'tel:+48' + '533210115'}>+48 533 210 115</a></li>
            <li><a href="mailto:kontakt@marinaclinic.pl">kontakt@marinaclinic.pl</a></li>
            <li><a href="https://www.instagram.com/marinaclinic" target="_blank" rel="noreferrer">Instagram</a></li>
            <li><span>{t({ pl: 'Szczecin Dąbie', en: 'Szczecin Dąbie' })}</span></li>
          </ul>
        </div>
      </div>
      <p className="footer-legal">© {new Date().getFullYear()} DrGziut. {t(common.disclaimer)}</p>
    </div>
  </footer>;
}

export function PageHero({ kicker, title, lead, image = '/assets/precision.jpg' }: { kicker: BiText; title: BiText; lead: BiText; image?: string }) {
  const t = useT();
  return <ScrollBackgroundProvider>
    <SectionBackground id="page-hero" src={image}>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb"><Link to="/">DrGziut</Link> / {t(kicker)}</div>
          <Reveal><p className="kicker">{t(kicker)}</p><h1 className="h-display" style={{ maxWidth: 800 }}>{t(title)}</h1></Reveal>
          <Reveal className="reveal-d1"><p className="lead" style={{ marginTop: 28 }}>{t(lead)}</p></Reveal>
        </div>
      </section>
    </SectionBackground>
  </ScrollBackgroundProvider>;
}

export function FAQ({ items }: { items: { q: BiText; a: BiText }[] }) {
  const [active, setActive] = useState<number | null>(0);
  const t = useT();
  return <div className="faq">
    {items.map((item, i) => <div className={`faq-item ${active === i ? 'open' : ''}`} key={i}>
      <button className="faq-q" onClick={() => setActive(active === i ? null : i)} aria-expanded={active === i}>
        <span>{t(item.q)}</span><span className="faq-icon">+</span>
      </button>
      <div className="faq-a" style={{ maxHeight: active === i ? 240 : 0 }}><div className="faq-a-inner">{t(item.a)}</div></div>
    </div>)}
  </div>;
}

export function CTA({ title, copy, image = '/assets/clinic.jpg' }: { title: BiText; copy?: BiText; image?: string }) {
  const t = useT();
  return <section className="section" style={{ paddingTop: 0 }}>
    <div className="container"><div className="cta-band">
      <div className="cta-band-bg"><img src={assetUrl(image)} alt="" /></div>
      <p className="kicker">{t({ pl: 'Pierwszy krok', en: 'First step' })}</p>
      <h2 className="h-section">{t(title)}</h2>
      {copy && <p className="lead" style={{ margin: '18px auto 30px' }}>{t(copy)}</p>}
      <Link className="btn btn-solid" to="/konsultacja">{t(common.book)}</Link>
    </div></div>
  </section>;
}

export function ContactForm() {
  const t = useT();
  const [sent, setSent] = useState(false);
  const submit = (e: React.FormEvent) => { e.preventDefault(); setSent(true); };
  if (sent) return <div className="card" style={{ textAlign: 'center', padding: 48 }}><p className="kicker">{t({ pl: 'Dziękujemy', en: 'Thank you' })}</p><h3>{t({ pl: 'Wiadomość została przygotowana', en: 'Your message has been prepared' })}</h3><p>{t({ pl: 'Formularz demonstracyjny — przed publikacją podłączymy bezpieczną obsługę zgłoszeń.', en: 'Demonstration form — before publishing, we will connect secure enquiry handling.' })}</p></div>;
  return <form className="form" onSubmit={submit}>
    <div className="form-row">
      <div className="field"><label>{t({ pl: 'Imię', en: 'First name' })}</label><input name="firstName" required autoComplete="given-name" /></div>
      <div className="field"><label>{t({ pl: 'Nazwisko', en: 'Last name' })}</label><input name="lastName" required autoComplete="family-name" /></div>
    </div>
    <div className="form-row">
      <div className="field"><label>{t({ pl: 'Telefon', en: 'Phone' })}</label><input name="phone" type="tel" autoComplete="tel" /></div>
      <div className="field"><label>E-mail</label><input name="email" type="email" required autoComplete="email" /></div>
    </div>
    <div className="field"><label>{t({ pl: 'Temat', en: 'Subject' })}</label><select name="subject" defaultValue=""><option value="" disabled>{t({ pl: 'Wybierz temat', en: 'Select a subject' })}</option><option>{t(nav.consultation)}</option><option>{t(nav.surgery)}</option><option>{t(nav.aesthetic)}</option><option>{t({ pl: 'Inne', en: 'Other' })}</option></select></div>
    <div className="field"><label>{t({ pl: 'Wiadomość', en: 'Message' })}</label><textarea name="message" placeholder={t({ pl: 'Nie przesyłaj numeru PESEL, dokumentacji ani danych wrażliwych.', en: 'Please do not send personal ID numbers, medical records or sensitive data.' })} /></div>
    <label className="check"><input name="consent" type="checkbox" required /><span>{t({ pl: 'Wyrażam zgodę na kontakt w celu obsługi mojego zapytania.', en: 'I consent to being contacted in order to handle my enquiry.' })}</span></label>
    <button className="btn btn-solid" style={{ justifySelf: 'start' }}>{t({ pl: 'Wyślij zapytanie', en: 'Send enquiry' })}</button>
  </form>;
}
