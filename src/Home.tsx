import { Link } from 'react-router-dom';
import { ContactForm, FAQ, Reveal } from './components';
import { homeFAQs, surgeryProcedures } from './data';
import { useT } from './i18n';
import { ScrollBackgroundProvider, SectionBackground, assetUrl } from './ScrollBackgrounds';

const process = [
  { title: { pl: 'Kontakt i wstępna kwalifikacja', en: 'Contact and initial assessment' }, text: { pl: 'Zaczynamy od rozmowy o problemie i organizacji konsultacji w dogodnym terminie.', en: 'We start with a conversation about your concern and arranging a consultation at a convenient time.' } },
  { title: { pl: 'Konsultacja z chirurgiem', en: 'Consultation with the surgeon' }, text: { pl: 'Analizujemy anatomię, skórę, tkanki, oczekiwania i bezpieczeństwo możliwych rozwiązań.', en: 'We assess anatomy, skin, tissue, expectations and the safety of possible solutions.' } },
  { title: { pl: 'Indywidualny plan leczenia', en: 'Individual treatment plan' }, text: { pl: 'Omawiamy metody, kolejność działań, ograniczenia, rekonwalescencję oraz orientacyjny kosztorys.', en: 'We discuss methods, the sequence of care, limitations, recovery and estimated costs.' } },
  { title: { pl: 'Przygotowanie i procedura', en: 'Preparation and procedure' }, text: { pl: 'Każdy etap przygotowujemy zgodnie z kwalifikacją, rodzajem zabiegu i stanem zdrowia.', en: 'Each stage is prepared according to assessment, procedure type and health status.' } },
  { title: { pl: 'Rekonwalescencja i kontrole', en: 'Recovery and follow-up' }, text: { pl: 'Otrzymujesz jasne zalecenia i opiekę kontrolną zaplanowaną dla konkretnej procedury.', en: 'You receive clear instructions and follow-up care tailored to the specific procedure.' } },
];

const reviews = [
  { quote: { pl: '„Świetny specjalista, szczegółowe wyjaśnienia o możliwościach zabiegowych, a przy tym ogromna empatia Doktora.”', en: '“An excellent specialist, with detailed explanations of possible procedures and remarkable empathy.”' }, name: 'Agata', source: 'ZnanyLekarz' },
  { quote: { pl: '„Pełen profesjonalizm od konsultacji do efektu końcowego.”', en: '“Complete professionalism from consultation to the final result.”' }, name: 'NK', source: 'ZnanyLekarz' },
  { quote: { pl: '„Zdecydowanie polecam.”', en: '“I definitely recommend him.”' }, name: 'Bożena', source: 'drgziut.pl' },
];

const trustItems = [
  { pl: 'Specjalista chirurgii plastycznej', en: 'Plastic surgery specialist' },
  { pl: 'NPWZ 3186517', en: 'Medical licence no. 3186517' },
  { pl: 'Indywidualny plan leczenia', en: 'Individual treatment plan' },
  { pl: 'Szczecin · Marina Clinic', en: 'Szczecin · Marina Clinic' },
];

const miniPrices = [
  { name: { pl: 'Blefaroplastyka powiek górnych', en: 'Upper eyelid blepharoplasty' }, value: '6 500 zł' },
  { name: { pl: 'Deep Plane Facelift', en: 'Deep Plane Facelift' }, value: { pl: 'od 28 000 zł', en: 'from 28 000 PLN' } },
  { name: { pl: 'Toksyna botulinowa', en: 'Botulinum toxin' }, value: { pl: 'od 600 zł', en: 'from 600 PLN' } },
  { name: { pl: 'Laser frakcyjny CO₂', en: 'Fractional CO₂ laser' }, value: { pl: 'od 1 600 zł', en: 'from 1 600 PLN' } },
];

export function HomePage() {
  const t = useT();
  return <ScrollBackgroundProvider>
    <SectionBackground id="hero" src="/assets/hero.jpg">
      <section className="hero">
        <div className="container hero-content">
          <Reveal><p className="kicker">{t({ pl: 'Chirurgia plastyczna · Szczecin', en: 'Plastic surgery · Szczecin' })}</p></Reveal>
          <Reveal className="reveal-d1"><h1 className="h-display" style={{ maxWidth: 800 }}>{t({ pl: <>Precyzja,<br /><em style={{ color: 'var(--accent-text)' }}>która zachowuje Ciebie.</em></>, en: <>Precision<br /><em style={{ color: 'var(--accent-text)' }}>that preserves you.</em></> })}</h1></Reveal>
          <Reveal className="reveal-d2"><p className="lead" style={{ marginTop: 28 }}>{t({ pl: 'Chirurgia plastyczna i medycyna estetyczna oparte na spokojnej analizie, naturalnych proporcjach i odpowiedzialnym planie leczenia.', en: 'Plastic surgery and aesthetic medicine built on careful analysis, natural proportions and a responsible treatment plan.' })}</p></Reveal>
          <Reveal className="reveal-d3"><div className="hero-cta"><Link className="btn btn-solid" to="/konsultacja">{t({ pl: 'Umów konsultację', en: 'Book a consultation' })}</Link><Link className="btn btn-ghost" to="/chirurgia-plastyczna">{t({ pl: 'Poznaj zabiegi', en: 'Explore procedures' })}</Link></div></Reveal>
        </div>
        <div className="hero-scroll">scroll</div>
      </section>
    </SectionBackground>

    <div className="trust-bar">
      <div className="container trust-bar-inner">
        {trustItems.map((item, i) => <span className="badge" key={i}>{t(item)}</span>)}
      </div>
    </div>

    <div className="marquee"><div className="marquee-track">{Array.from({ length: 2 }).flatMap((_, i) => [
      <span key={`${i}-1`}>{t({ pl: 'Chirurgia twarzy', en: 'Facial surgery' })}</span>, <span key={`${i}-2`}>{t({ pl: 'Medycyna estetyczna', en: 'Aesthetic medicine' })}</span>, <span key={`${i}-3`}>{t({ pl: 'Naturalne proporcje', en: 'Natural proportions' })}</span>, <span key={`${i}-4`}>{t({ pl: 'Spokojna konsultacja', en: 'A considered consultation' })}</span>
    ])}</div></div>

    <SectionBackground id="procedures" src="/assets/bg-surgery.jpg">
      <section className="section section-alt">
        <div className="container">
          <Reveal><div className="section-head"><p className="kicker">{t({ pl: 'Procedury', en: 'Procedures' })}</p><h2 className="h-section">{t({ pl: 'Planowane z chirurgiczną dokładnością.', en: 'Planned with surgical precision.' })}</h2><p className="lead" style={{ marginTop: 18 }}>{t({ pl: 'Chirurgia, która zawsze zaczyna się od kwalifikacji — nie od gotowego rozwiązania.', en: 'Surgery that always begins with assessment — not a ready-made solution.' })}</p></div></Reveal>
          <div className="grid grid-3">
            {surgeryProcedures.slice(0, 6).map((procedure, i) => <Reveal key={i} className={`reveal-d${i % 4}`}><article className="card"><div className="card-num">0{i + 1}</div><h3>{t(procedure.name)}</h3><p>{t(procedure.desc)}</p><Link className="card-link" to="/chirurgia-plastyczna">{t({ pl: 'Dowiedz się więcej', en: 'Learn more' })} →</Link></article></Reveal>)}
          </div>
          <Reveal><div style={{ marginTop: 40 }}><Link className="btn btn-ghost" to="/chirurgia-plastyczna">{t({ pl: 'Zobacz wszystkie procedury', en: 'View all procedures' })}</Link></div></Reveal>
        </div>
      </section>
    </SectionBackground>

    <SectionBackground id="doctor" src="/assets/brand/clinic-1.jpg">
      <section className="section">
        <div className="container split">
          <Reveal><div className="img-panel" style={{ aspectRatio: '4 / 5', maxHeight: 650 }}><img src={assetUrl('/assets/brand/doctor.png')} loading="lazy" decoding="async" alt={t({ pl: 'Portret koncepcyjny — lekarz specjalista chirurgii plastycznej', en: 'Conceptual portrait — plastic surgery specialist' })} /></div></Reveal>
          <Reveal className="reveal-d1"><p className="kicker">{t({ pl: 'O lekarzu', en: 'About the surgeon' })}</p><h2 className="h-section">Hubert Gziut</h2><p style={{ color: 'var(--accent)', fontSize: 13, letterSpacing: '.18em', textTransform: 'uppercase', marginTop: 8 }}>{t({ pl: 'Specjalista chirurgii plastycznej', en: 'Plastic surgery specialist' })}</p>
            <div className="prose" style={{ marginTop: 22 }}><p>{t({ pl: 'Prowadzi konsultacje, kwalifikację i planowanie zabiegowe w zakresie chirurgii plastycznej oraz procedur odmładzających. Najpierw analiza problemu i bezpieczeństwa, potem dobór metody — chirurgicznej, niechirurgicznej lub łączonej.', en: 'He provides consultations, assessment and treatment planning in plastic surgery and rejuvenation procedures. First comes analysis of the concern and safety; then the choice of surgical, non-surgical or combined care.' })}</p></div>
            <blockquote className="prose" style={{ marginTop: 18, borderLeft: '2px solid var(--accent)', paddingLeft: 18, fontStyle: 'italic', color: 'var(--text-dim)' }}>{t({ pl: '„W chirurgii plastycznej twarzy najważniejsze są plan, proporcje i odpowiedzialność.”', en: '“In facial plastic surgery, what matters most is the plan, the proportions and responsibility.”' })}</blockquote>
            <div className="chip-list" style={{ marginTop: 22 }}><span className="chip">NPWZ 3186517</span><span className="chip">{t({ pl: 'Chirurgia twarzy i powiek', en: 'Facial & eyelid surgery' })}</span><span className="chip">{t({ pl: 'Lifting twarzy i szyi', en: 'Face & neck lift' })}</span><a className="chip" href="https://www.znanylekarz.pl" target="_blank" rel="noreferrer">ZnanyLekarz ↗</a></div>
            <Link className="btn btn-ghost" to="/klinika" style={{ marginTop: 26 }}>{t({ pl: 'Poznaj klinikę', en: 'Discover the clinic' })}</Link>
          </Reveal>
        </div>
      </section>
    </SectionBackground>

    <SectionBackground id="philosophy" src="/assets/silk.jpg">
      <section className="section section-alt">
        <div className="container split">
          <Reveal><div className="img-panel" style={{ aspectRatio: '4 / 5', maxHeight: 650 }}><img src={assetUrl('/assets/silk.jpg')} loading="lazy" decoding="async" alt="" /></div></Reveal>
          <Reveal className="reveal-d1"><p className="kicker">{t({ pl: 'Filozofia', en: 'Philosophy' })}</p><h2 className="h-section">{t({ pl: <>Nie chodzi o zmianę twarzy.<br />Chodzi o <em>harmonię.</em></>, en: <>Not about changing your face.<br />About <em>harmony.</em></> })}</h2>
            <div className="prose" style={{ marginTop: 26 }}>
              <p>{t({ pl: 'Dobra chirurgia plastyczna nie powinna dominować twarzy ani odbierać jej charakteru. Jej celem jest równowaga, świeżość i zachowanie własnej tożsamości.', en: 'Good plastic surgery should not dominate the face or take away its character. Its goal is balance, freshness and preservation of your individual identity.' })}</p>
              <p>{t({ pl: 'Decyzje podejmujemy po konsultacji, analizie i realistycznym planowaniu. Standard opieki oznacza czas, bezpieczeństwo, precyzję oraz jasną komunikację.', en: 'Decisions are made after consultation, analysis and realistic planning. A high standard of care means time, safety, precision and clear communication.' })}</p>
            </div>
            <Link className="btn btn-ghost" to="/metoda" style={{ marginTop: 16 }}>{t({ pl: 'Poznaj filozofię', en: 'Explore our philosophy' })}</Link>
          </Reveal>
        </div>
      </section>
    </SectionBackground>

    <SectionBackground id="reviews" src="/assets/bg-aesthetic.jpg">
      <section className="section">
        <div className="container"><Reveal><div className="section-head center"><p className="kicker">{t({ pl: 'Opinie pacjentów', en: 'Patient reviews' })}</p><h2 className="h-section">{t({ pl: 'Zweryfikowane doświadczenia.', en: 'Verified patient experiences.' })}</h2></div></Reveal>
          <div className="review-scroll">{reviews.map((review, i) => <article className="review-card" key={i}><blockquote>{t(review.quote)}</blockquote><div className="review-meta"><strong>{review.name}</strong>{review.source}</div></article>)}</div>
        </div>
      </section>
    </SectionBackground>

    <SectionBackground id="process" src="/assets/precision.jpg">
      <section className="section section-alt">
        <div className="container split">
          <Reveal><div><p className="kicker">{t({ pl: 'Proces', en: 'The process' })}</p><h2 className="h-section">{t({ pl: 'Spokojna ścieżka od decyzji do kontroli.', en: 'A considered path from decision to follow-up.' })}</h2><p className="lead" style={{ marginTop: 20 }}>{t({ pl: 'Każdy etap ma znaczenie. Prowadzimy proces tak, aby decyzja była świadoma, a plan możliwie bezpieczny i zrozumiały.', en: 'Every step matters. We guide the process so that decisions are informed and the plan is as safe and understandable as possible.' })}</p></div></Reveal>
          <Reveal className="reveal-d1"><div className="steps">{process.map((step, i) => <div className="step" key={i}><div className="step-num">0{i + 1}</div><div><h3>{t(step.title)}</h3><p>{t(step.text)}</p></div></div>)}</div></Reveal>
        </div>
      </section>
    </SectionBackground>

    <SectionBackground id="pricing" src="/assets/bg-tech.jpg">
      <section className="section">
        <div className="container split">
          <Reveal><div><p className="kicker">{t({ pl: 'Cennik orientacyjny', en: 'Indicative pricing' })}</p><h2 className="h-section">{t({ pl: 'Przejrzyste widełki przed konsultacją.', en: 'Transparent ranges before your consultation.' })}</h2><p className="lead" style={{ marginTop: 20 }}>{t({ pl: 'Ostateczny zakres i koszt ustalane są indywidualnie podczas konsultacji.', en: 'Final scope and cost are determined individually during consultation.' })}</p>
            <div style={{ marginTop: 28 }}><Link className="btn btn-ghost" to="/cennik">{t({ pl: 'Pełny cennik', en: 'Full pricing' })}</Link></div>
          </div></Reveal>
          <Reveal className="reveal-d1"><div className="price-group">{miniPrices.map((item, i) => <div className="price-row" key={i}><span className="price-name">{t(item.name)}</span><span className="price-dots" /><span className="price-val">{typeof item.value === 'string' ? item.value : t(item.value)}</span></div>)}</div></Reveal>
        </div>
      </section>
    </SectionBackground>

    <SectionBackground id="faq" src="/assets/bg-aesthetic.jpg">
      <section className="section section-alt">
        <div className="container split">
          <Reveal><div><p className="kicker">FAQ</p><h2 className="h-section">{t({ pl: 'Pytania, które warto zadać.', en: 'Questions worth asking.' })}</h2><p className="lead" style={{ marginTop: 20 }}>{t({ pl: 'Dobra decyzja wymaga rzetelnej rozmowy o możliwościach, ograniczeniach i bezpieczeństwie.', en: 'A good decision calls for an honest discussion of possibilities, limitations and safety.' })}</p></div></Reveal>
          <Reveal className="reveal-d1"><FAQ items={homeFAQs} /></Reveal>
        </div>
      </section>
    </SectionBackground>

    <SectionBackground id="contact" src="/assets/clinic.jpg">
      <section className="section">
        <div className="container split"><Reveal><div><p className="kicker">{t({ pl: 'Kontakt', en: 'Contact' })}</p><h2 className="h-section">{t({ pl: 'Zacznij od spokojnej konsultacji.', en: 'Start with a considered consultation.' })}</h2><p className="lead" style={{ marginTop: 20 }}>{t({ pl: 'Jeśli nie wiesz, która metoda będzie właściwa, zacznij od rozmowy z lekarzem.', en: 'If you are unsure which method is appropriate, start with a conversation with the physician.' })}</p>
          <div className="chip-list" style={{ marginTop: 28 }}><a className="chip" href={'tel:+48' + '533210115'}>+48 533 210 115</a><a className="chip" href="mailto:kontakt@marinaclinic.pl">kontakt@marinaclinic.pl</a></div></div></Reveal><Reveal className="reveal-d1"><ContactForm /></Reveal></div>
      </section>
    </SectionBackground>
  </ScrollBackgroundProvider>;
}
