import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CTA, ContactForm, FAQ, PageHero, Reveal } from './components';
import { aestheticCategories, aestheticProcedures, common, nav, surgeryCategories, surgeryProcedures, type BiText } from './data';
import { useT } from './i18n';

function ProcedureGrid({ kind }: { kind: 'surgery' | 'aesthetic' }) {
  const t = useT();
  const categories = kind === 'surgery' ? surgeryCategories : aestheticCategories;
  const procedures = kind === 'surgery' ? surgeryProcedures : aestheticProcedures;
  const [filter, setFilter] = useState('all');
  const filtered = useMemo(() => filter === 'all' ? procedures : procedures.filter(p => p.cat === filter), [filter, procedures]);
  return <>
    <div className="filter-pills">
      <button className={`filter-pill ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>{t(common.all)}</button>
      {categories.map(c => <button key={c.id} className={`filter-pill ${filter === c.id ? 'active' : ''}`} onClick={() => setFilter(c.id)}>{t(c.label)}</button>)}
    </div>
    <div className="grid grid-3">
      {filtered.map((procedure, i) => <Reveal key={t(procedure.name)} className={`reveal-d${i % 4}`}><article className="card"><div className="card-num">{String(i + 1).padStart(2, '0')}</div><h3>{t(procedure.name)}</h3><p>{t(procedure.desc)}</p><Link className="card-link" to="/konsultacja">{t(common.book)} →</Link></article></Reveal>)}
    </div>
  </>;
}

export function SurgeryPage() {
  const t = useT();
  return <>
    <PageHero kicker={nav.surgery} title={{ pl: 'Chirurgia plastyczna', en: 'Plastic surgery' }} lead={{ pl: 'Precyzyjne procedury chirurgiczne planowane indywidualnie — od chirurgii twarzy, powiek i nosa po chirurgię piersi, sylwetki oraz korektę blizn.', en: 'Precise surgical procedures planned individually — from facial, eyelid and nasal surgery to breast, body contouring and scar revision.' }} />
    <section className="section"><div className="container"><Reveal><div className="section-head"><p className="kicker">{t({ pl: 'Zakres', en: 'Scope of care' })}</p><h2 className="h-section">{t({ pl: 'Chirurgia zaczyna się od właściwej kwalifikacji.', en: 'Surgery begins with the right assessment.' })}</h2><p className="lead" style={{ marginTop: 18 }}>{t({ pl: 'Wybierz obszar, który Cię interesuje. Każda procedura wymaga konsultacji, oceny wskazań i omówienia realnych możliwości leczenia.', en: 'Choose the area that interests you. Every procedure requires a consultation, assessment of indications and a discussion of realistic treatment options.' })}</p></div></Reveal><ProcedureGrid kind="surgery" /></div></section>
    <CTA title={{ pl: 'Nie musisz znać nazwy zabiegu.', en: 'You do not need to know the name of the procedure.' }} copy={{ pl: 'Podczas konsultacji przełożymy problem na bezpieczny i logiczny plan leczenia.', en: 'During consultation, we will translate your concern into a safe and logical treatment plan.' }} />
  </>;
}

export function AestheticPage() {
  const t = useT();
  const pillars = [
    { n: '01', h: { pl: 'Problem, nie narzędzie', en: 'The concern, not the tool' }, p: { pl: 'Dobieramy metodę do jakości skóry, proporcji i konkretnego wskazania — nie odwrotnie.', en: 'We choose the method for skin quality, proportions and a specific indication — never the other way around.' } },
    { n: '02', h: { pl: 'Plan etapowy', en: 'A staged plan' }, p: { pl: 'Efekt może wymagać serii procedur, czasu na regenerację i świadomego ułożenia kolejności.', en: 'The result may require a sequence of procedures, time for recovery and a deliberate order of steps.' } },
    { n: '03', h: { pl: 'Naturalne proporcje', en: 'Natural proportions' }, p: { pl: 'Celem jest wspieranie harmonii twarzy i jakości skóry, nie kopiowanie trendów.', en: 'The goal is to support facial harmony and skin quality, not to follow trends.' } },
  ];
  return <>
    <PageHero kicker={nav.aesthetic} title={{ pl: 'Medycyna estetyczna', en: 'Aesthetic medicine' }} lead={{ pl: 'Praca z jakością skóry, objętością i proporcjami twarzy — z doborem metody do problemu, a nie odwrotnie.', en: 'Working with skin quality, facial volume and proportions — selecting the method for the concern, never the other way around.' }} image="/assets/silk.jpg" />
    <section className="section"><div className="container"><Reveal><div className="section-head"><p className="kicker">{t({ pl: 'Podejście', en: 'Our approach' })}</p><h2 className="h-section">{t({ pl: 'Zacznij od diagnozy problemu.', en: 'Start with understanding the concern.' })}</h2></div></Reveal><div className="grid grid-3">{pillars.map((item, i) => <Reveal key={item.n} className={`reveal-d${i + 1}`}><article className="card"><div className="card-num">{item.n}</div><h3>{t(item.h)}</h3><p>{t(item.p)}</p></article></Reveal>)}</div></div></section>
    <section className="section section-alt"><div className="container"><Reveal><div className="section-head"><p className="kicker">{t({ pl: 'Możliwości', en: 'Treatment options' })}</p><h2 className="h-section">{t({ pl: 'Technologia jest narzędziem. Nie punktem wyjścia.', en: 'Technology is a tool. Not the starting point.' })}</h2><p className="lead" style={{ marginTop: 18 }}>{t({ pl: 'Poniższe zabiegi mogą być rozważane podczas konsultacji, zależnie od wskazań, stanu skóry i celów leczenia.', en: 'The treatments below may be considered during consultation, depending on indications, skin condition and treatment goals.' })}</p></div></Reveal><ProcedureGrid kind="aesthetic" /></div></section>
    <CTA title={{ pl: 'Dobór metody zaczyna się od konsultacji.', en: 'Choosing the method starts with a consultation.' }} copy={{ pl: 'Nie trzeba wybierać zabiegu przed wizytą. Wystarczy powiedzieć, co Cię niepokoi.', en: 'You do not have to choose a procedure before your appointment. It is enough to describe what concerns you.' }} image="/assets/hero.jpg" />
  </>;
}

const methodPillars = [
  { n: '01', title: { pl: 'Strategia zamiast przypadkowych zabiegów', en: 'Strategy over random procedures' }, text: { pl: 'Twarz potrzebuje przemyślanego planu. Najpierw szukamy przyczyny zmian, dopiero potem rozważamy rozwiązania.', en: 'The face needs a considered plan. We first look for the cause of changes, then consider solutions.' } },
  { n: '02', title: { pl: 'Twarz analizowana jako całość', en: 'The face assessed as a whole' }, text: { pl: 'Proporcje, skóra, tkanki, mimika, objętość i owal tworzą jeden układ — nie analizujemy ich w izolacji.', en: 'Proportions, skin, tissue, expression, volume and contour form one system — we do not assess them in isolation.' } },
  { n: '03', title: { pl: 'Synergia metod', en: 'Synergy of methods' }, text: { pl: 'Chirurgia, procedury estetyczne i pielęgnacja mogą się wzajemnie uzupełniać. Każda metoda ma swoje ograniczenia.', en: 'Surgery, aesthetic procedures and skincare can complement each other. Every method has its limitations.' } },
  { n: '04', title: { pl: 'Organizm jest częścią efektu', en: 'The body is part of the outcome' }, text: { pl: 'Gojenie i jakość skóry są związane z ogólną kondycją, odżywieniem, snem i możliwością regeneracji.', en: 'Healing and skin quality are connected with general condition, nutrition, sleep and capacity for recovery.' } },
  { n: '05', title: { pl: 'Naturalność bez utraty tożsamości', en: 'Naturalness without losing identity' }, text: { pl: 'Celem jest świeżość, harmonia i zachowanie indywidualnego charakteru — nie twarz zgodna z chwilowym trendem.', en: 'The goal is freshness, harmony and preservation of individual character — not a face shaped by a passing trend.' } },
];

export function MethodPage() {
  const t = useT();
  const stages = [
    { t: { pl: 'Pogłębiona konsultacja', en: 'In-depth consultation' }, p: { pl: 'Spokojna analiza problemu, oczekiwań, anatomii i możliwych ograniczeń.', en: 'A considered analysis of the concern, expectations, anatomy and possible limitations.' } },
    { t: { pl: 'Rozpoznanie przyczyn', en: 'Understanding causes' }, p: { pl: 'Ocena tkanek, skóry, objętości, mimiki i czynników wpływających na ich kondycję.', en: 'Assessment of tissue, skin, volume, expression and factors affecting their condition.' } },
    { t: { pl: 'Indywidualna mapa zabiegowa', en: 'Individual treatment map' }, p: { pl: 'Plan może łączyć chirurgię, procedury estetyczne i pielęgnację w logicznej kolejności.', en: 'The plan may combine surgery, aesthetic procedures and skincare in a logical sequence.' } },
    { t: { pl: 'Realizacja etapami', en: 'Implementation in stages' }, p: { pl: 'Priorytetem jest bezpieczeństwo, czas na regenerację i zachowanie naturalnych proporcji.', en: 'Safety, time for recovery and preservation of natural proportions are the priority.' } },
  ];
  return <>
    <PageHero kicker={nav.method} title={{ pl: 'Plan. Proporcje. Odpowiedzialność.', en: 'Plan. Proportions. Responsibility.' }} lead={{ pl: 'Lekarska, wieloetapowa strategia łącząca zdrowy rozsądek, estetykę naturalności i świadome dobieranie metod.', en: 'A medical, multi-stage strategy combining common sense, the aesthetics of naturalness and thoughtful method selection.' }} image="/assets/silk.jpg" />
    <section className="section"><div className="container"><Reveal><div className="section-head"><p className="kicker">{t({ pl: 'Filozofia metody', en: 'Method philosophy' })}</p><h2 className="h-section">{t({ pl: 'Naturalny efekt nie powstaje przypadkiem.', en: 'A natural result is never accidental.' })}</h2><p className="lead" style={{ marginTop: 18 }}>{t({ pl: 'Jest wynikiem analizy, strategii i świadomego połączenia metod, kiedy są ku temu wskazania.', en: 'It is the result of analysis, strategy and a conscious combination of methods when indicated.' })}</p></div></Reveal><div className="grid grid-3">{methodPillars.map((item, i) => <Reveal className={`reveal-d${i % 4}`} key={item.n}><article className="card"><div className="card-num">{item.n}</div><h3>{t(item.title)}</h3><p>{t(item.text)}</p></article></Reveal>)}</div></div></section>
    <section className="section section-alt"><div className="container split"><Reveal><div className="img-panel" style={{ aspectRatio: '4 / 5' }}><img src="/assets/precision.jpg" alt="" /></div></Reveal><Reveal className="reveal-d1"><p className="kicker">{t({ pl: 'Proces', en: 'Process' })}</p><h2 className="h-section">{t({ pl: 'Metoda to uporządkowana ścieżka.', en: 'The method is an ordered path.' })}</h2><div className="steps" style={{ marginTop: 26 }}>{stages.map((stage, i) => <div className="step" key={i}><div className="step-num">0{i + 1}</div><div><h3>{t(stage.t)}</h3><p>{t(stage.p)}</p></div></div>)}</div></Reveal></div></section>
    <CTA title={{ pl: 'Zacznij od analizy, nie od wyboru zabiegu.', en: 'Start with analysis, not the choice of a procedure.' }} />
  </>;
}

export function ClinicPage() {
  const t = useT();
  return <>
    <PageHero kicker={nav.clinic} title={{ pl: 'Spokojna, prywatna przestrzeń.', en: 'A calm, private space.' }} lead={{ pl: 'Miejsce dla pacjentów, którzy szukają chirurgii plastycznej i medycyny estetycznej opartej na precyzji, bezpieczeństwie i indywidualnym planie.', en: 'A place for patients looking for plastic surgery and aesthetic medicine grounded in precision, safety and an individual plan.' }} image="/assets/clinic.jpg" />
    <section className="section"><div className="container split"><Reveal><div className="img-panel" style={{ aspectRatio: '1.3 / 1' }}><img src="/assets/clinic.jpg" alt={t({ pl: 'Klinika', en: 'Clinic' })} /></div></Reveal><Reveal className="reveal-d1"><p className="kicker">{t({ pl: 'O nas', en: 'About us' })}</p><h2 className="h-section">{t({ pl: 'Butikowy standard opieki.', en: 'A boutique standard of care.' })}</h2><div className="prose" style={{ marginTop: 24 }}><p>{t({ pl: 'Klinika mieści się w Szczecinie Dąbiu — blisko wody, światła i spokojnego rytmu mariny. Ta lokalizacja została wybrana świadomie: aby rozmowa i decyzja mogły odbywać się bez pośpiechu.', en: 'The clinic is located in Szczecin Dąbie — close to water, light and the calm rhythm of the marina. This setting was chosen deliberately: so that conversation and decisions can happen without rushing.' })}</p><p>{t({ pl: 'Zaczynamy od rozmowy i kwalifikacji. Dopiero potem powstaje indywidualny plan — czasem chirurgiczny, czasem estetyczny, a często łączący kilka metod w odpowiedniej kolejności.', en: 'We begin with conversation and assessment. Only then does an individual plan take shape — sometimes surgical, sometimes aesthetic, often combining several methods in the right sequence.' })}</p></div></Reveal></div></section>
    <section className="section section-alt"><div className="container"><Reveal><div className="section-head"><p className="kicker">{t({ pl: 'Lekarz prowadzący', en: 'Lead physician' })}</p><h2 className="h-section">Hubert Gziut</h2></div></Reveal><Reveal><div className="card" style={{ maxWidth: 780 }}><h3>{t({ pl: 'Specjalista chirurgii plastycznej', en: 'Plastic surgery specialist' })}</h3><p>NPWZ 3186517</p><p style={{ marginTop: 18 }}>{t({ pl: 'Prowadzi konsultacje, kwalifikację i planowanie zabiegowe w zakresie chirurgii plastycznej oraz procedur odmładzających. Pracuje w lekarskim modelu: najpierw analiza problemu i bezpieczeństwa, potem dobór metody.', en: 'He provides consultations, assessment and treatment planning in plastic surgery and rejuvenation procedures. His medical model starts with analysis of the concern and safety, followed by selection of the method.' })}</p><div className="chip-list" style={{ marginTop: 22 }}><span className="chip">{t({ pl: 'Chirurgia twarzy i powiek', en: 'Facial & eyelid surgery' })}</span><span className="chip">{t({ pl: 'Chirurgia nosa i ust', en: 'Nose & lip surgery' })}</span><span className="chip">{t({ pl: 'Chirurgia piersi i sylwetki', en: 'Breast & body surgery' })}</span></div></div></Reveal></div></section>
    <CTA title={{ pl: 'Chirurgia zaczyna się od właściwej kwalifikacji.', en: 'Surgery begins with the right assessment.' }} />
  </>;
}

const consultationFAQ = [
  { q: { pl: 'Czy muszę wiedzieć, jaki zabieg chcę wykonać?', en: 'Do I need to know which procedure I want?' }, a: { pl: 'Nie. Możesz przyjść z problemem, a nie z gotową nazwą zabiegu. Rolą konsultacji jest przełożenie problemu na bezpieczny i logiczny plan leczenia.', en: 'No. You can come with a concern rather than a pre-selected procedure. The role of consultation is to translate that concern into a safe and logical treatment plan.' } },
  { q: { pl: 'Czy konsultacja oznacza automatyczną kwalifikację?', en: 'Does consultation mean automatic eligibility?' }, a: { pl: 'Nie. Lekarz może zaproponować inną metodę, odroczenie zabiegu, dodatkowe badania lub rezygnację z procedury, jeśli byłaby niewłaściwa lub niebezpieczna.', en: 'No. The physician may suggest another method, postponement, additional tests or not proceeding if a procedure would be inappropriate or unsafe.' } },
  { q: { pl: 'Jak przygotować się do konsultacji?', en: 'How should I prepare for consultation?' }, a: { pl: 'Przygotuj informacje o wcześniejszych zabiegach i operacjach, listę leków i suplementów oraz pytania, które chcesz omówić. Nie musisz wykonywać badań przed samą konsultacją, chyba że zostaniesz o to poproszona/y.', en: 'Prepare information about previous procedures and operations, a list of medicines and supplements, and questions you want to discuss. You do not usually need tests before consultation unless asked to arrange them.' } },
];

export function ConsultationPage() {
  const t = useT();
  const steps = [
    { h: { pl: 'Rozmowa o głównym problemie', en: 'Conversation about the main concern' }, p: { pl: 'Oczekiwania, historia problemu i wcześniejsze procedury.', en: 'Expectations, history of the concern and previous procedures.' } },
    { h: { pl: 'Analiza medyczna', en: 'Medical assessment' }, p: { pl: 'Choroby, leki, alergie, operacje, gojenie i czynniki wpływające na bezpieczeństwo.', en: 'Conditions, medicines, allergies, operations, healing and factors affecting safety.' } },
    { h: { pl: 'Badanie i ocena proporcji', en: 'Examination and assessment of proportions' }, p: { pl: 'Ocena obszaru zależna od zgłaszanego problemu.', en: 'Assessment of the relevant area according to the concern presented.' } },
    { h: { pl: 'Omówienie metod', en: 'Discussion of methods' }, p: { pl: 'Chirurgicznych, niechirurgicznych, regeneracyjnych lub łączonych.', en: 'Surgical, non-surgical, regenerative or combined options.' } },
    { h: { pl: 'Dalsze kroki', en: 'Next steps' }, p: { pl: 'Kwalifikacja, przygotowanie, dodatkowe badania lub szerszy plan leczenia.', en: 'Assessment, preparation, further tests or a broader treatment plan.' } },
  ];
  return <>
    <PageHero kicker={nav.consultation} title={{ pl: 'Konsultacja to punkt wyjścia.', en: 'Consultation is the starting point.' }} lead={{ pl: 'Spokojna rozmowa, badanie i analiza problemu są pierwszym etapem bezpiecznego planu leczenia.', en: 'A considered conversation, examination and analysis of the concern are the first stage of a safe treatment plan.' }} />
    <section className="section"><div className="container split"><Reveal><div><p className="kicker">{t({ pl: 'Czas na rozmowę', en: 'Time for conversation' })}</p><h2 className="h-section">{t({ pl: 'Nie musisz znać nazwy zabiegu.', en: 'You do not need to know the name of a procedure.' })}</h2><div className="prose" style={{ marginTop: 22 }}><p>{t({ pl: 'Wystarczy, że wiesz, co Ci przeszkadza. Podczas wizyty analizujemy problem, badamy właściwy obszar, omawiamy możliwe metody, ograniczenia, rekonwalescencję i dalsze kroki.', en: 'It is enough to know what concerns you. During the visit, we analyse the issue, examine the relevant area and discuss possible methods, limitations, recovery and next steps.' })}</p><p>{t({ pl: 'Jeśli chcesz omówić kilka obszarów podczas jednej wizyty, poinformuj o tym wcześniej — pozwoli to zarezerwować odpowiednio więcej czasu.', en: 'If you wish to discuss several areas during one appointment, let us know in advance — it allows us to reserve sufficient time.' })}</p></div></div></Reveal><Reveal className="reveal-d1"><div className="steps">{steps.map((step, i) => <div className="step" key={i}><div className="step-num">0{i + 1}</div><div><h3>{t(step.h)}</h3><p>{t(step.p)}</p></div></div>)}</div></Reveal></div></section>
    <section className="section section-alt"><div className="container split"><Reveal><div><p className="kicker">FAQ</p><h2 className="h-section">{t({ pl: 'Przed wizytą', en: 'Before your appointment' })}</h2></div></Reveal><Reveal className="reveal-d1"><FAQ items={consultationFAQ} /></Reveal></div></section>
    <section className="section"><div className="container split"><Reveal><div><p className="kicker">{t({ pl: 'Rezerwacja', en: 'Booking' })}</p><h2 className="h-section">{t({ pl: 'Umów konsultację.', en: 'Book a consultation.' })}</h2><p className="lead" style={{ marginTop: 18 }}>{t({ pl: 'Napisz lub zadzwoń. Ustalimy dogodny termin i formę kontaktu.', en: 'Write or call us. We will arrange a convenient appointment time and contact preference.' })}</p><div className="chip-list" style={{ marginTop: 26 }}><a className="chip" href="tel:+48533210115">+48 533 210 115</a><a className="chip" href="mailto:kontakt@marinaclinic.pl">kontakt@marinaclinic.pl</a></div></div></Reveal><Reveal className="reveal-d1"><ContactForm /></Reveal></div></section>
  </>;
}

type PriceItem = { name: BiText; value: string };
const surgeryPrices: { title: BiText; items: PriceItem[] }[] = [
  { title: { pl: 'Powieki i brwi', en: 'Eyelids & brows' }, items: [
    { name: { pl: 'Blefaroplastyka powiek górnych', en: 'Upper blepharoplasty' }, value: '6 500 zł' }, { name: { pl: 'Blefaroplastyka powiek dolnych', en: 'Lower blepharoplasty' }, value: '8 500 zł' }, { name: { pl: 'Podniesienie brwi', en: 'Brow lift' }, value: 'od 7 000 zł' }, { name: { pl: 'Lifting brwi i czoła', en: 'Brow & forehead lift' }, value: 'od 18 000 zł' },
  ] },
  { title: { pl: 'Twarz i szyja', en: 'Face & neck' }, items: [
    { name: { pl: 'Podniesienie ust (Lip Lift)', en: 'Lip lift' }, value: 'od 7 000 zł' }, { name: { pl: 'Mały lifting twarzy', en: 'Mini facelift' }, value: 'od 12 000 zł' }, { name: { pl: 'Deep Plane Facelift', en: 'Deep Plane Facelift' }, value: 'od 28 000 zł' }, { name: { pl: 'Liposukcja podbródka', en: 'Submental liposuction' }, value: 'od 8 000 zł' },
  ] },
  { title: { pl: 'Nos i uszy', en: 'Nose & ears' }, items: [
    { name: { pl: 'Korekcja części chrzęstnej nosa', en: 'Tip rhinoplasty' }, value: 'od 12 000 zł' }, { name: { pl: 'Całkowita korekta nosa', en: 'Complete rhinoplasty' }, value: 'od 18 000 zł' }, { name: { pl: 'Korekta odstających uszu', en: 'Otoplasty' }, value: '7 500 zł' },
  ] },
  { title: { pl: 'Piersi i sylwetka', en: 'Breasts & body' }, items: [
    { name: { pl: 'Powiększanie piersi własną tkanką tłuszczową', en: 'Breast augmentation with own fat' }, value: 'od 18 000 zł' }, { name: { pl: 'Podniesienie piersi', en: 'Breast lift' }, value: 'od 18 000 zł' }, { name: { pl: 'Pomniejszenie piersi', en: 'Breast reduction' }, value: 'od 20 000 zł' }, { name: { pl: 'Plastyka brzucha', en: 'Abdominoplasty' }, value: 'od 16 000 zł' }, { name: { pl: 'Labioplastyka', en: 'Labiaplasty' }, value: 'od 7 000 zł' },
  ] },
];
const aestheticPrices: { title: BiText; items: PriceItem[] }[] = [
  { title: { pl: 'Radiofrekwencja mikroigłowa', en: 'Microneedling radiofrequency' }, items: [{ name: { pl: 'Twarz', en: 'Face' }, value: '1 400 zł' }, { name: { pl: 'Twarz + szyja', en: 'Face + neck' }, value: '1 900 zł' }, { name: { pl: 'Twarz + szyja + dekolt', en: 'Face + neck + décolletage' }, value: '2 100 zł' }] },
  { title: { pl: 'Laser frakcyjny', en: 'Fractional laser' }, items: [{ name: { pl: 'Laser tulowy — twarz', en: 'Thulium laser — face' }, value: '1 600 zł' }, { name: { pl: 'Laser CO₂ — twarz', en: 'CO₂ laser — face' }, value: '1 600 zł' }, { name: { pl: 'Laser CO₂ — twarz + szyja', en: 'CO₂ laser — face + neck' }, value: '2 100 zł' }] },
  { title: { pl: 'Toksyna botulinowa', en: 'Botulinum toxin' }, items: [{ name: { pl: 'I okolica', en: 'One area' }, value: '600 zł' }, { name: { pl: 'II okolice', en: 'Two areas' }, value: '1 100 zł' }, { name: { pl: 'III okolice', en: 'Three areas' }, value: '1 500 zł' }, { name: { pl: 'Bruksizm', en: 'Bruxism' }, value: '1 100 zł' }] },
  { title: { pl: 'Mezoterapia i biostymulacja', en: 'Mesotherapy & biostimulation' }, items: [{ name: { pl: 'Mezoterapia — twarz', en: 'Mesotherapy — face' }, value: 'od 750 zł' }, { name: { pl: 'Profhilo', en: 'Profhilo' }, value: '1 100 zł' }, { name: { pl: 'Nucleofill', en: 'Nucleofill' }, value: '1 100 zł' }, { name: { pl: 'Osocze bogatopłytkowe — twarz', en: 'PRP — face' }, value: '1 000 zł' }] },
  { title: { pl: 'Modelowanie kwasem hialuronowym', en: 'Hyaluronic acid contouring' }, items: [{ name: { pl: 'Dolina łez', en: 'Tear trough' }, value: '1 300 zł' }, { name: { pl: 'Usta', en: 'Lips' }, value: '1 200 zł' }, { name: { pl: 'Pełna wolumetria twarzy', en: 'Full facial volumetry' }, value: '4 000 zł' }] },
];

export function PricingPage() {
  const t = useT();
  const [tab, setTab] = useState<'surgery' | 'aesthetic'>('surgery');
  const groups = tab === 'surgery' ? surgeryPrices : aestheticPrices;
  return <>
    <PageHero kicker={nav.pricing} title={{ pl: 'Cennik', en: 'Pricing' }} lead={{ pl: 'Ceny mają charakter orientacyjny. Ostateczny zakres procedury i koszt ustalane są indywidualnie podczas konsultacji lekarskiej.', en: 'Prices are indicative. The final scope and cost of a procedure are determined individually during a medical consultation.' }} image="/assets/precision.jpg" />
    <section className="section"><div className="container"><Reveal><div className="tabs"><button className={`tab ${tab === 'surgery' ? 'active' : ''}`} onClick={() => setTab('surgery')}>{t(nav.surgery)}</button><button className={`tab ${tab === 'aesthetic' ? 'active' : ''}`} onClick={() => setTab('aesthetic')}>{t(nav.aesthetic)}</button></div></Reveal>
      <div className="grid grid-2">{groups.map((group, i) => <Reveal className={`reveal-d${i % 4}`} key={t(group.title)}><div className="price-group"><h3>{t(group.title)}</h3>{group.items.map((item, j) => <div className="price-row" key={j}><span className="price-name">{t(item.name)}</span><span className="price-dots" /><span className="price-val">{item.value}</span></div>)}</div></Reveal>)}</div>
      <Reveal><p className="footer-legal" style={{ border: 0, paddingTop: 0 }}>{t({ pl: 'Ceny mają charakter informacyjny. Ostateczny zakres procedury i koszt ustalane są indywidualnie podczas konsultacji lekarskiej.', en: 'Prices are for information only. The final scope and cost are determined individually during medical consultation.' })}</p></Reveal>
    </div></section>
    <CTA title={{ pl: 'Najlepszy plan zaczyna się od konsultacji.', en: 'The best plan starts with a consultation.' }} />
  </>;
}

export function ContactPage() {
  const t = useT();
  return <>
    <PageHero kicker={nav.contact} title={{ pl: 'Porozmawiajmy.', en: 'Let’s talk.' }} lead={{ pl: 'Umów konsultację, zapytaj o kwalifikację do zabiegu lub zostaw wiadomość — wrócimy z odpowiedzią możliwie szybko.', en: 'Book a consultation, ask about eligibility or leave a message — we will reply as soon as possible.' }} image="/assets/clinic.jpg" />
    <section className="section"><div className="container"><div className="grid grid-3"><Reveal><a className="contact-card" href="tel:+48533210115"><span className="cc-label">{t({ pl: 'Telefon', en: 'Phone' })}</span><span className="cc-value">+48 533 210 115</span><span className="cc-sub">{t({ pl: 'Zadzwoń do kliniki', en: 'Call the clinic' })}</span></a></Reveal><Reveal className="reveal-d1"><a className="contact-card" href="mailto:kontakt@marinaclinic.pl"><span className="cc-label">E-mail</span><span className="cc-value">kontakt@<br />marinaclinic.pl</span><span className="cc-sub">{t({ pl: 'Napisz wiadomość', en: 'Write a message' })}</span></a></Reveal><Reveal className="reveal-d2"><div className="contact-card"><span className="cc-label">{t({ pl: 'Lokalizacja', en: 'Location' })}</span><span className="cc-value">Szczecin<br />Dąbie</span><span className="cc-sub">ul. Przestrzenna 11</span></div></Reveal></div></div></section>
    <section className="section section-alt"><div className="container split"><Reveal><div><p className="kicker">{t({ pl: 'Formularz', en: 'Contact form' })}</p><h2 className="h-section">{t({ pl: 'Napisz do nas.', en: 'Write to us.' })}</h2><div className="prose" style={{ marginTop: 22 }}><p>{t({ pl: 'To formularz pierwszego kontaktu. Nie przesyłaj numeru PESEL, skanów dokumentów ani dokumentacji medycznej.', en: 'This is a first-contact form. Please do not send personal ID numbers, document scans or medical records.' })}</p><p>{t({ pl: 'Jeśli chcesz omówić kilka tematów podczas jednej konsultacji, napisz o tym — zaplanujemy odpowiednio więcej czasu.', en: 'If you want to discuss several topics during one consultation, let us know — we will plan enough time.' })}</p></div></div></Reveal><Reveal className="reveal-d1"><ContactForm /></Reveal></div></section>
  </>;
}
