export type BiText = Readonly<{ pl: string; en: string }>;

export type CategoryId = "surgery" | "aesthetic";

export type ProcedureId =
  | "eyelid-surgery"
  | "facelift"
  | "rhinoplasty"
  | "breast-surgery"
  | "abdominoplasty"
  | "liposuction"
  | "botulinum-toxin"
  | "laser-therapy"
  | "microneedling-radiofrequency"
  | "biostimulation"
  | "scar-treatment"
  | "volumetry";

export type SiteAsset =
  | "/assets/hero.jpg"
  | "/assets/bg-surgery.jpg"
  | "/assets/bg-aesthetic.jpg"
  | "/assets/clinic.jpg"
  | "/assets/precision.jpg"
  | "/assets/bg-tech.jpg"
  | "/assets/brand/doctor-hubert.jpg";

export type SeoCopy = Readonly<{
  title: BiText;
  description: BiText;
}>;

export type ProcedureFact = Readonly<{
  label: BiText;
  text: BiText;
}>;

export type Procedure = Readonly<{
  id: ProcedureId;
  category: CategoryId;
  slug: string;
  title: BiText;
  shortTitle: BiText;
  eyebrow: BiText;
  summary: BiText;
  intro: BiText;
  consultationFocus: readonly BiText[];
  facts: readonly ProcedureFact[];
  price?: BiText;
  related: readonly ProcedureId[];
  consultationCta: BiText;
}>;

export type CategoryGroup = Readonly<{
  title: BiText;
  description: BiText;
  procedureIds: readonly ProcedureId[];
}>;

export type Category = Readonly<{
  id: CategoryId;
  slug: string;
  label: BiText;
  eyebrow: BiText;
  title: BiText;
  summary: BiText;
  positioning: BiText;
  heroImage: SiteAsset;
  seo: SeoCopy;
  groups: readonly CategoryGroup[];
  featuredProcedureIds: readonly ProcedureId[];
  qualificationTitle: BiText;
  qualificationIntro: BiText;
  qualificationSteps: readonly Readonly<{ title: BiText; text: BiText }>[];
}>;

export const siteContent = {
  name: "DrGziut",
  physician: {
    name: { pl: "lek. Hubert Gziut", en: "Hubert Gziut, MD" },
    title: {
      pl: "Specjalista chirurgii plastycznej",
      en: "Plastic surgery specialist",
    },
    licenseLabel: { pl: "NPWZ", en: "Medical licence" },
    licenseNumber: "3186517",
  },
  contact: {
    phoneDisplay: "+48 533 210 115",
    phoneHref: "tel:+48533210115",
    email: "biuro@drgziut.pl",
    emailHref: "mailto:biuro@drgziut.pl",
    address: {
      pl: "Jagiellońska 81 · Szczecin",
      en: "81 Jagiellońska St. · Szczecin",
    },
  },
  navigation: {
    primaryLabel: { pl: "Główna nawigacja", en: "Primary navigation" },
    home: { pl: "Start", en: "Home" },
    offer: { pl: "Zabiegi", en: "Procedures" },
    doctor: { pl: "Lekarz", en: "Physician" },
    consultation: { pl: "Konsultacja", en: "Consultation" },
    pricing: { pl: "Cennik", en: "Pricing" },
    faq: { pl: "FAQ", en: "FAQ" },
    contact: { pl: "Kontakt", en: "Contact" },
    book: { pl: "Umów konsultację", en: "Book a consultation" },
    openOffer: { pl: "Otwórz menu zabiegów", en: "Open procedures menu" },
    closeOffer: { pl: "Zamknij menu zabiegów", en: "Close procedures menu" },
    openMobile: { pl: "Otwórz menu", en: "Open menu" },
    closeMobile: { pl: "Zamknij menu", en: "Close menu" },
    mobileDialog: { pl: "Menu mobilne", en: "Mobile menu" },
    mobileOffer: { pl: "Oferta zabiegowa", en: "Procedure offer" },
    skip: { pl: "Przejdź do treści", en: "Skip to content" },
    language: { pl: "Wybór języka", en: "Language selection" },
    homeAria: {
      pl: "DrGziut — strona główna",
      en: "DrGziut — home page",
    },
  },
  common: {
    learnMore: { pl: "Dowiedz się więcej", en: "Learn more" },
    viewCategory: { pl: "Zobacz wszystkie zabiegi", en: "View all procedures" },
    relatedProcedures: { pl: "Powiązane zabiegi", en: "Related procedures" },
    relatedPages: { pl: "Przydatne informacje", en: "Useful information" },
    beforeDecision: { pl: "Przed podjęciem decyzji", en: "Before deciding" },
    indicativePrice: { pl: "Cena orientacyjna", en: "Indicative price" },
    priceAfterConsultation: {
      pl: "Zakres i koszt są ustalane po badaniu i kwalifikacji. Zobacz cennik orientacyjny.",
      en: "Scope and cost are determined after examination and assessment. View indicative pricing.",
    },
    consultationEvaluates: {
      pl: "Co ocenia lekarz podczas konsultacji",
      en: "What the physician evaluates during consultation",
    },
    safetyNote: {
      pl: "Opis ma charakter edukacyjny i nie zastępuje konsultacji. Nie można zagwarantować określonego efektu ani przebiegu gojenia. Ostateczna kwalifikacja i plan postępowania są ustalane przez lekarza po badaniu i analizie stanu zdrowia.",
      en: "This information is educational and does not replace a consultation. A specific result or healing course cannot be guaranteed. Final eligibility and the care plan are determined by the physician after examination and health assessment.",
    },
    arrowLabel: { pl: "Przejdź do strony", en: "Open page" },
    breadcrumbLabel: { pl: "Okruszki nawigacyjne", en: "Breadcrumbs" },
    currentPage: { pl: "Bieżąca strona", en: "Current page" },
  },
  footer: {
    navigationLabel: { pl: "Nawigacja w stopce", en: "Footer navigation" },
    disclaimer: {
      pl: "Treści na stronie mają charakter informacyjny i nie zastępują indywidualnej konsultacji lekarskiej. O kwalifikacji, zakresie leczenia i rodzaju znieczulenia decyduje lekarz po badaniu oraz analizie stanu zdrowia.",
      en: "This website is for information only and does not replace an individual medical consultation. Eligibility, treatment scope and anaesthesia are determined by the physician after examination and health assessment.",
    },
  },
} as const;

const scopeLabel: BiText = { pl: "Zakres", en: "Scope" };
const qualificationLabel: BiText = { pl: "Kwalifikacja", en: "Assessment" };
const recoveryLabel: BiText = {
  pl: "Rekonwalescencja i opieka",
  en: "Recovery and aftercare",
};

export const procedures: readonly Procedure[] = [
  {
    id: "eyelid-surgery",
    category: "surgery",
    slug: "plastyka-powiek",
    title: { pl: "Plastyka powiek", en: "Eyelid surgery" },
    shortTitle: { pl: "Plastyka powiek", en: "Eyelid surgery" },
    eyebrow: { pl: "Chirurgia okolicy oka", en: "Periocular surgery" },
    summary: {
      pl: "Operacyjne postępowanie w obrębie powiek górnych lub dolnych, planowane indywidualnie po ocenie anatomii i funkcji okolicy oka.",
      en: "Surgical treatment of the upper or lower eyelids, planned individually after assessment of periocular anatomy and function.",
    },
    intro: {
      pl: "Zakres plastyki powiek może dotyczyć powieki górnej, dolnej albo obu okolic. Konsultacja służy rozpoznaniu przyczyny zgłaszanej zmiany, ocenie możliwych metod oraz omówieniu ograniczeń i ryzyka.",
      en: "Eyelid surgery may involve the upper eyelid, lower eyelid or both areas. Consultation identifies the reason for the concern, assesses possible methods and discusses limitations and risks.",
    },
    consultationFocus: [
      { pl: "anatomię powiek i położenie brwi", en: "eyelid anatomy and brow position" },
      { pl: "funkcję powiek oraz stan okolicy oka", en: "eyelid function and the condition of the eye area" },
      { pl: "oczekiwania, stan zdrowia i przebieg wcześniejszych procedur", en: "expectations, health and any previous procedures" },
    ],
    facts: [
      {
        label: scopeLabel,
        text: { pl: "Plan może obejmować powiekę górną, dolną lub obie okolice; szczegóły wynikają z badania.", en: "The plan may involve the upper eyelid, lower eyelid or both areas; details follow examination." },
      },
      {
        label: qualificationLabel,
        text: { pl: "Lekarz ocenia wskazania, funkcję powiek, ogólny stan zdrowia oraz możliwe alternatywy.", en: "The physician assesses indications, eyelid function, general health and possible alternatives." },
      },
      {
        label: recoveryLabel,
        text: { pl: "Przebieg gojenia i terminy kontroli zależą od zakresu operacji i indywidualnej reakcji tkanek.", en: "Healing and follow-up timing depend on surgical scope and individual tissue response." },
      },
    ],
    price: { pl: "Plastyka powiek górnych — od 6 500 zł", en: "Upper eyelid surgery — from PLN 6,500" },
    related: ["facelift", "rhinoplasty", "breast-surgery"],
    consultationCta: { pl: "Umów konsultację dotyczącą plastyki powiek", en: "Book an eyelid surgery consultation" },
  },
  {
    id: "facelift",
    category: "surgery",
    slug: "lifting-twarzy",
    title: { pl: "Lifting twarzy i szyi", en: "Face and neck lift" },
    shortTitle: { pl: "Lifting twarzy", en: "Facelift" },
    eyebrow: { pl: "Chirurgia twarzy", en: "Facial surgery" },
    summary: {
      pl: "Operacyjne postępowanie w obrębie twarzy i szyi, którego technika oraz zakres są dobierane do anatomii i celu leczenia.",
      en: "Surgical treatment of the face and neck, with technique and scope selected for the individual anatomy and treatment goal.",
    },
    intro: {
      pl: "Określenie lifting twarzy obejmuje różne techniki, w tym postępowanie w głębszych warstwach. Nazwa metody nie przesądza o jej przydatności — plan powstaje po badaniu i rozmowie.",
      en: "Facelift is an umbrella term for different techniques, including approaches to deeper layers. A technique name does not determine suitability; the plan follows examination and discussion.",
    },
    consultationFocus: [
      { pl: "proporcje twarzy, jakość tkanek i obszar szyi", en: "facial proportions, tissue quality and the neck area" },
      { pl: "zakres możliwej korekcji oraz jej ograniczenia", en: "the possible scope of correction and its limitations" },
      { pl: "stan zdrowia, bezpieczeństwo operacji i realny przebieg opieki", en: "health, surgical safety and a realistic care pathway" },
    ],
    facts: [
      {
        label: scopeLabel,
        text: { pl: "Zakres może obejmować twarz i szyję, a dobór techniki jest decyzją medyczną po badaniu.", en: "Scope may include the face and neck, and technique selection is a medical decision after examination." },
      },
      {
        label: qualificationLabel,
        text: { pl: "Oceniane są wskazania, jakość tkanek, stan zdrowia, oczekiwania i możliwe alternatywy.", en: "Indications, tissue quality, health, expectations and possible alternatives are assessed." },
      },
      {
        label: recoveryLabel,
        text: { pl: "Operacja wymaga zaplanowanej rekonwalescencji i kontroli; indywidualny przebieg omawia lekarz.", en: "Surgery requires planned recovery and follow-up; the individual course is discussed by the physician." },
      },
    ],
    price: { pl: "Deep Plane Facelift — od 28 000 zł", en: "Deep Plane Facelift — from PLN 28,000" },
    related: ["eyelid-surgery", "rhinoplasty", "breast-surgery"],
    consultationCta: { pl: "Umów konsultację dotyczącą liftingu twarzy", en: "Book a facelift consultation" },
  },
  {
    id: "rhinoplasty",
    category: "surgery",
    slug: "rynoplastyka",
    title: { pl: "Rynoplastyka", en: "Rhinoplasty" },
    shortTitle: { pl: "Rynoplastyka", en: "Rhinoplasty" },
    eyebrow: { pl: "Chirurgia nosa", en: "Nasal surgery" },
    summary: {
      pl: "Chirurgiczna korekcja nosa planowana z uwzględnieniem proporcji, anatomii oraz funkcji oddychania.",
      en: "Surgical correction of the nose planned with regard to proportions, anatomy and breathing function.",
    },
    intro: {
      pl: "Rynoplastyka może dotyczyć wyglądu nosa, jego funkcji lub obu tych zagadnień. Badanie i rozmowa pomagają określić możliwy zakres oraz to, czy potrzebna jest dodatkowa ocena laryngologiczna.",
      en: "Rhinoplasty may address nasal appearance, function or both. Examination and discussion help determine possible scope and whether additional ENT assessment is needed.",
    },
    consultationFocus: [
      { pl: "budowę nosa i jego relację z rysami twarzy", en: "nasal anatomy and its relationship to facial features" },
      { pl: "drożność nosa oraz zgłaszane trudności funkcjonalne", en: "nasal airflow and reported functional concerns" },
      { pl: "możliwości korekcji, ograniczenia i ryzyko", en: "correction options, limitations and risks" },
    ],
    facts: [
      {
        label: scopeLabel,
        text: { pl: "Plan może obejmować elementy estetyczne i funkcjonalne; ich zakres wynika z badania.", en: "The plan may include aesthetic and functional elements; their scope follows examination." },
      },
      {
        label: qualificationLabel,
        text: { pl: "Kwalifikacja uwzględnia anatomię, oddychanie, stan zdrowia, wcześniejsze urazy lub operacje.", en: "Assessment considers anatomy, breathing, health and any previous trauma or surgery." },
      },
      {
        label: recoveryLabel,
        text: { pl: "Zmiany pooperacyjne ustępują stopniowo, a ocena rezultatu wymaga czasu i zaplanowanych kontroli.", en: "Postoperative changes resolve gradually, and assessment of the outcome requires time and planned follow-up." },
      },
    ],
    related: ["eyelid-surgery", "facelift", "breast-surgery"],
    consultationCta: { pl: "Umów konsultację dotyczącą rynoplastyki", en: "Book a rhinoplasty consultation" },
  },
  {
    id: "breast-surgery",
    category: "surgery",
    slug: "chirurgia-piersi",
    title: { pl: "Chirurgia piersi", en: "Breast surgery" },
    shortTitle: { pl: "Chirurgia piersi", en: "Breast surgery" },
    eyebrow: { pl: "Chirurgia plastyczna", en: "Plastic surgery" },
    summary: {
      pl: "Indywidualnie planowane operacje piersi, poprzedzone oceną budowy, stanu zdrowia, wskazań i oczekiwań.",
      en: "Individually planned breast surgery preceded by assessment of anatomy, health, indications and expectations.",
    },
    intro: {
      pl: "Chirurgia piersi obejmuje różne rodzaje postępowania. Właściwa metoda, jej zakres i zasadność mogą zostać określone wyłącznie podczas konsultacji i badania.",
      en: "Breast surgery includes different approaches. The appropriate method, scope and suitability can only be determined during consultation and examination.",
    },
    consultationFocus: [
      { pl: "budowę, proporcje i jakość tkanek", en: "anatomy, proportions and tissue quality" },
      { pl: "cel konsultacji oraz realistyczny możliwy zakres", en: "the consultation goal and realistic possible scope" },
      { pl: "stan zdrowia, badania i czynniki wpływające na bezpieczeństwo", en: "health, investigations and factors affecting safety" },
    ],
    facts: [
      {
        label: scopeLabel,
        text: { pl: "Rodzaj operacji i jej zakres są dobierane indywidualnie; sama nazwa procedury nie stanowi planu leczenia.", en: "The operation type and scope are individual; a procedure name alone is not a treatment plan." },
      },
      {
        label: qualificationLabel,
        text: { pl: "Lekarz omawia wskazania, alternatywy, ryzyko oraz potrzebne badania przedoperacyjne.", en: "The physician discusses indications, alternatives, risks and required preoperative investigations." },
      },
      {
        label: recoveryLabel,
        text: { pl: "Przygotowanie, ograniczenia po operacji i kontrole zależą od ustalonego zakresu.", en: "Preparation, postoperative restrictions and follow-up depend on the agreed scope." },
      },
    ],
    related: ["abdominoplasty", "liposuction", "eyelid-surgery"],
    consultationCta: { pl: "Umów konsultację dotyczącą chirurgii piersi", en: "Book a breast surgery consultation" },
  },
  {
    id: "abdominoplasty",
    category: "surgery",
    slug: "abdominoplastyka",
    title: { pl: "Abdominoplastyka", en: "Abdominoplasty" },
    shortTitle: { pl: "Abdominoplastyka", en: "Abdominoplasty" },
    eyebrow: { pl: "Chirurgia powłok brzucha", en: "Abdominal wall surgery" },
    summary: {
      pl: "Operacja powłok brzucha o zakresie ustalanym po ocenie skóry, tkanek i budowy ściany brzucha.",
      en: "Abdominal wall surgery with scope determined after assessment of the skin, tissues and abdominal wall anatomy.",
    },
    intro: {
      pl: "Abdominoplastyka nie jest jedną identyczną operacją dla każdej osoby. Konsultacja pozwala ocenić, jaki problem wymaga rozwiązania i czy postępowanie operacyjne jest zasadne.",
      en: "Abdominoplasty is not an identical operation for everyone. Consultation assesses the concern and whether surgical treatment is appropriate.",
    },
    consultationFocus: [
      { pl: "stan skóry, tkanek i ściany brzucha", en: "the skin, tissues and abdominal wall" },
      { pl: "ogólny stan zdrowia i stabilność masy ciała", en: "general health and weight stability" },
      { pl: "możliwy zakres, położenie blizny i przebieg rekonwalescencji", en: "possible scope, scar position and the recovery pathway" },
    ],
    facts: [
      {
        label: scopeLabel,
        text: { pl: "Zakres może różnić się zależnie od budowy i wyniku badania; czasem omawiane są procedury łączone.", en: "Scope varies with anatomy and examination; combined procedures may sometimes be discussed." },
      },
      {
        label: qualificationLabel,
        text: { pl: "Ocena obejmuje wskazania, stan zdrowia, ryzyko oraz gotowość do zaplanowanej rekonwalescencji.", en: "Assessment covers indications, health, risks and readiness for planned recovery." },
      },
      {
        label: recoveryLabel,
        text: { pl: "Powrót do aktywności jest stopniowy i zależny od zakresu; szczegółowe zalecenia przekazuje lekarz.", en: "Return to activity is gradual and scope-dependent; detailed instructions are provided by the physician." },
      },
    ],
    related: ["liposuction", "breast-surgery", "eyelid-surgery"],
    consultationCta: { pl: "Umów konsultację dotyczącą abdominoplastyki", en: "Book an abdominoplasty consultation" },
  },
  {
    id: "liposuction",
    category: "surgery",
    slug: "liposukcja",
    title: { pl: "Liposukcja", en: "Liposuction" },
    shortTitle: { pl: "Liposukcja", en: "Liposuction" },
    eyebrow: { pl: "Modelowanie konturu", en: "Contour surgery" },
    summary: {
      pl: "Chirurgiczne modelowanie wybranych okolic, którego zasadność zależy od budowy, jakości tkanek i stanu zdrowia.",
      en: "Surgical contouring of selected areas, with suitability dependent on anatomy, tissue quality and health.",
    },
    intro: {
      pl: "Liposukcja służy modelowaniu wybranych okolic, nie leczeniu otyłości. Możliwy zakres i znaczenie jakości skóry są omawiane indywidualnie podczas konsultacji.",
      en: "Liposuction is intended to contour selected areas, not to treat obesity. Possible scope and the relevance of skin quality are discussed individually during consultation.",
    },
    consultationFocus: [
      { pl: "rozmieszczenie tkanek i jakość skóry", en: "tissue distribution and skin quality" },
      { pl: "stan zdrowia oraz stabilność masy ciała", en: "health and weight stability" },
      { pl: "realistyczny zakres modelowania i ograniczenia metody", en: "realistic contouring scope and method limitations" },
    ],
    facts: [
      {
        label: scopeLabel,
        text: { pl: "Okolica i rozległość procedury są ustalane po badaniu; większy zakres nie zawsze jest właściwy.", en: "Area and extent are determined after examination; a larger scope is not always appropriate." },
      },
      {
        label: qualificationLabel,
        text: { pl: "Lekarz ocenia wskazania, skórę, stan ogólny, ryzyko oraz inne możliwe rozwiązania.", en: "The physician assesses indications, skin, general health, risks and other possible approaches." },
      },
      {
        label: recoveryLabel,
        text: { pl: "Obrzęk i tempo powrotu do aktywności są indywidualne; plan obejmuje kontrole i opiekę pooperacyjną.", en: "Swelling and return to activity vary; the plan includes follow-up and postoperative care." },
      },
    ],
    related: ["abdominoplasty", "breast-surgery", "facelift"],
    consultationCta: { pl: "Umów konsultację dotyczącą liposukcji", en: "Book a liposuction consultation" },
  },
  {
    id: "botulinum-toxin",
    category: "aesthetic",
    slug: "toksyna-botulinowa",
    title: { pl: "Toksyna botulinowa", en: "Botulinum toxin" },
    shortTitle: { pl: "Toksyna botulinowa", en: "Botulinum toxin" },
    eyebrow: { pl: "Medycyna estetyczna", en: "Aesthetic medicine" },
    summary: {
      pl: "Procedura lekarska wykorzystująca toksynę botulinową w indywidualnie dobranym wskazaniu i zakresie.",
      en: "A medical procedure using botulinum toxin for an individually assessed indication and scope.",
    },
    intro: {
      pl: "Toksyna botulinowa ma określone zastosowania medyczne i estetyczne. Kwalifikacja obejmuje ocenę mimiki, anatomii, oczekiwań oraz bezpieczeństwa zastosowania preparatu.",
      en: "Botulinum toxin has defined medical and aesthetic uses. Assessment covers facial movement, anatomy, expectations and safe use of the product.",
    },
    consultationFocus: [
      { pl: "mimikę, anatomię i wzajemną pracę mięśni", en: "facial movement, anatomy and muscle interaction" },
      { pl: "wskazanie, oczekiwany zakres i ograniczenia procedury", en: "the indication, intended scope and procedure limitations" },
      { pl: "stan zdrowia, wcześniejsze zabiegi i bezpieczeństwo", en: "health, previous procedures and safety" },
    ],
    facts: [
      {
        label: scopeLabel,
        text: { pl: "Obszar i dawka są dobierane przez lekarza do wskazania oraz indywidualnej anatomii.", en: "Area and dose are selected by the physician for the indication and individual anatomy." },
      },
      {
        label: qualificationLabel,
        text: { pl: "Konsultacja służy potwierdzeniu wskazania i ocenie, czy procedura jest właściwa w danym momencie.", en: "Consultation confirms the indication and whether the procedure is appropriate at that time." },
      },
      {
        label: recoveryLabel,
        text: { pl: "Lekarz omawia spodziewany przebieg, możliwe działania niepożądane i zasady kontroli.", en: "The physician discusses the expected course, possible adverse effects and follow-up." },
      },
    ],
    price: { pl: "Toksyna botulinowa — od 600 zł", en: "Botulinum toxin — from PLN 600" },
    related: ["volumetry", "biostimulation", "laser-therapy"],
    consultationCta: { pl: "Umów konsultację dotyczącą toksyny botulinowej", en: "Book a botulinum toxin consultation" },
  },
  {
    id: "laser-therapy",
    category: "aesthetic",
    slug: "laseroterapia",
    title: { pl: "Laseroterapia", en: "Laser therapy" },
    shortTitle: { pl: "Laseroterapia", en: "Laser therapy" },
    eyebrow: { pl: "Technologie laserowe", en: "Laser technologies" },
    summary: {
      pl: "Procedury laserowe dobierane do rozpoznanego problemu, cech skóry, wskazań i akceptowalnego czasu regeneracji.",
      en: "Laser procedures selected for the assessed concern, skin characteristics, indications and acceptable recovery time.",
    },
    intro: {
      pl: "Różne lasery, w tym frakcyjny CO₂ i tulowy, mają odmienne zastosowania. Wybór urządzenia i parametrów jest decyzją lekarską po ocenie skóry.",
      en: "Different lasers, including fractional CO₂ and thulium systems, have different uses. Device and parameter selection is a medical decision after skin assessment.",
    },
    consultationFocus: [
      { pl: "rodzaj zmiany i cechy skóry", en: "the type of concern and skin characteristics" },
      { pl: "fototyp, wcześniejsze procedury i reakcje skóry", en: "skin phototype, previous procedures and skin responses" },
      { pl: "możliwy zakres, regenerację i ryzyko przebarwień", en: "possible scope, recovery and pigmentation risk" },
    ],
    facts: [
      {
        label: scopeLabel,
        text: { pl: "Technologia, obszar i intensywność są dobierane do wskazania; nie każdy laser służy temu samemu celowi.", en: "Technology, area and intensity are selected for the indication; lasers are not interchangeable." },
      },
      {
        label: qualificationLabel,
        text: { pl: "Badanie skóry i wywiad pomagają ocenić zasadność procedury, jej termin i bezpieczny plan.", en: "Skin examination and history help assess suitability, timing and a safe plan." },
      },
      {
        label: recoveryLabel,
        text: { pl: "Regeneracja zależy od technologii i parametrów; zasady pielęgnacji przekazuje lekarz po kwalifikacji.", en: "Recovery depends on technology and settings; aftercare is provided by the physician after assessment." },
      },
    ],
    price: { pl: "Laser frakcyjny CO₂ — od 1 600 zł", en: "Fractional CO₂ laser — from PLN 1,600" },
    related: ["scar-treatment", "microneedling-radiofrequency", "biostimulation"],
    consultationCta: { pl: "Umów konsultację dotyczącą laseroterapii", en: "Book a laser therapy consultation" },
  },
  {
    id: "microneedling-radiofrequency",
    category: "aesthetic",
    slug: "radiofrekwencja-mikroiglowa",
    title: { pl: "Radiofrekwencja mikroigłowa", en: "Microneedling radiofrequency" },
    shortTitle: { pl: "Radiofrekwencja mikroigłowa", en: "Microneedling radiofrequency" },
    eyebrow: { pl: "Terapia urządzeniowa", en: "Device-based treatment" },
    summary: {
      pl: "Procedura łącząca mikronakłuwanie z energią fal radiowych, planowana po ocenie wskazań i jakości skóry.",
      en: "A procedure combining microneedling with radiofrequency energy, planned after assessment of indications and skin quality.",
    },
    intro: {
      pl: "Radiofrekwencja mikroigłowa, w tym zabiegi z użyciem systemu Morpheus, wymaga doboru głębokości i parametrów do konkretnego celu. Nie każda zmiana skóry jest wskazaniem do tej procedury.",
      en: "Microneedling radiofrequency, including procedures using the Morpheus system, requires depth and settings to match a defined goal. Not every skin concern is an indication for this procedure.",
    },
    consultationFocus: [
      { pl: "jakość skóry i charakter zgłaszanej zmiany", en: "skin quality and the nature of the concern" },
      { pl: "wcześniejsze leczenie i reakcję na procedury", en: "previous treatment and response to procedures" },
      { pl: "dobór technologii, możliwe etapy i czas regeneracji", en: "technology selection, possible stages and recovery time" },
    ],
    facts: [
      {
        label: scopeLabel,
        text: { pl: "Obszar, głębokość i energia są dobierane indywidualnie przez lekarza.", en: "Area, depth and energy are selected individually by the physician." },
      },
      {
        label: qualificationLabel,
        text: { pl: "Ocena skóry służy potwierdzeniu wskazania i porównaniu procedury z innymi możliwościami.", en: "Skin assessment confirms the indication and compares the procedure with other options." },
      },
      {
        label: recoveryLabel,
        text: { pl: "Reakcja skóry i czas regeneracji zależą od parametrów oraz indywidualnych cech.", en: "Skin response and recovery time depend on settings and individual characteristics." },
      },
    ],
    related: ["laser-therapy", "scar-treatment", "biostimulation"],
    consultationCta: { pl: "Umów konsultację dotyczącą radiofrekwencji mikroigłowej", en: "Book a microneedling radiofrequency consultation" },
  },
  {
    id: "biostimulation",
    category: "aesthetic",
    slug: "biostymulacja",
    title: { pl: "Biostymulacja", en: "Biostimulation" },
    shortTitle: { pl: "Biostymulacja", en: "Biostimulation" },
    eyebrow: { pl: "Medycyna regeneracyjna", en: "Regenerative aesthetics" },
    summary: {
      pl: "Plan procedur ukierunkowanych na jakość tkanek, dobierany do wskazania i obejmujący wyłącznie zasadnie dobrane metody.",
      en: "A procedure plan focused on tissue quality, selected for the indication and limited to appropriately chosen methods.",
    },
    intro: {
      pl: "Pojęcie biostymulacji obejmuje różne metody, w tym osocze bogatopłytkowe (PRP). Nazwa grupy zabiegów nie zastępuje rozpoznania problemu ani indywidualnego planu.",
      en: "Biostimulation includes different methods, including platelet-rich plasma (PRP). A procedure category does not replace assessment of the concern or an individual plan.",
    },
    consultationFocus: [
      { pl: "jakość tkanek i cel konsultacji", en: "tissue quality and the consultation goal" },
      { pl: "zasadność konkretnej metody i możliwe alternatywy", en: "the rationale for a specific method and possible alternatives" },
      { pl: "stan zdrowia, wcześniejsze procedury i plan etapów", en: "health, previous procedures and staging" },
    ],
    facts: [
      {
        label: scopeLabel,
        text: { pl: "Metoda i liczba etapów wynikają ze wskazania; określenie „biostymulacja” obejmuje różne procedury.", en: "Method and number of stages follow the indication; “biostimulation” includes different procedures." },
      },
      {
        label: qualificationLabel,
        text: { pl: "Lekarz ocenia, czy dana technika ma uzasadnienie i czy inna forma postępowania może być właściwsza.", en: "The physician assesses whether a technique is justified or another approach may be more appropriate." },
      },
      {
        label: recoveryLabel,
        text: { pl: "Spodziewana reakcja i zalecenia zależą od wybranej metody i są omawiane przed zabiegiem.", en: "Expected response and aftercare depend on the selected method and are discussed beforehand." },
      },
    ],
    related: ["laser-therapy", "microneedling-radiofrequency", "volumetry"],
    consultationCta: { pl: "Umów konsultację dotyczącą biostymulacji", en: "Book a biostimulation consultation" },
  },
  {
    id: "scar-treatment",
    category: "aesthetic",
    slug: "leczenie-blizn",
    title: { pl: "Leczenie blizn", en: "Scar treatment" },
    shortTitle: { pl: "Leczenie blizn", en: "Scar treatment" },
    eyebrow: { pl: "Terapia skóry", en: "Skin therapy" },
    summary: {
      pl: "Indywidualny plan postępowania dobierany do rodzaju, wieku i lokalizacji blizny oraz stanu otaczających tkanek.",
      en: "An individual care plan selected for scar type, age and location and the condition of surrounding tissues.",
    },
    intro: {
      pl: "Blizny różnią się budową, dojrzałością i objawami, dlatego nie istnieje jedna metoda odpowiednia dla każdej zmiany. Plan może łączyć techniki albo zakładać obserwację.",
      en: "Scars differ in structure, maturity and symptoms, so no single method is appropriate for every concern. A plan may combine techniques or involve observation.",
    },
    consultationFocus: [
      { pl: "rodzaj, wiek, położenie i objawy blizny", en: "scar type, age, location and symptoms" },
      { pl: "przebieg gojenia i wcześniejsze leczenie", en: "healing history and previous treatment" },
      { pl: "realistyczny cel, możliwe metody i ich ograniczenia", en: "a realistic goal, possible methods and their limitations" },
    ],
    facts: [
      {
        label: scopeLabel,
        text: { pl: "Postępowanie może wykorzystywać metody urządzeniowe, iniekcyjne lub chirurgiczne, zależnie od oceny.", en: "Care may use device-based, injectable or surgical methods, depending on assessment." },
      },
      {
        label: qualificationLabel,
        text: { pl: "Kluczowe są badanie blizny, etap dojrzewania tkanek oraz ocena, czy interwencja jest uzasadniona.", en: "Scar examination, tissue maturation stage and whether intervention is justified are key." },
      },
      {
        label: recoveryLabel,
        text: { pl: "Plan bywa etapowy, a odpowiedź tkanek wymaga oceny podczas kolejnych kontroli.", en: "Care may be staged, and tissue response requires review during follow-up." },
      },
    ],
    related: ["laser-therapy", "microneedling-radiofrequency", "biostimulation"],
    consultationCta: { pl: "Umów konsultację dotyczącą leczenia blizn", en: "Book a scar treatment consultation" },
  },
  {
    id: "volumetry",
    category: "aesthetic",
    slug: "wolumetria",
    title: { pl: "Wolumetria", en: "Facial volumetry" },
    shortTitle: { pl: "Wolumetria", en: "Facial volumetry" },
    eyebrow: { pl: "Planowanie proporcji", en: "Proportion planning" },
    summary: {
      pl: "Procedury objętościowe planowane po analizie proporcji, anatomii i jakości tkanek, bez automatycznego założenia o potrzebie zabiegu.",
      en: "Volume procedures planned after analysis of proportions, anatomy and tissue quality, without assuming that treatment is needed.",
    },
    intro: {
      pl: "Wolumetria nie oznacza jednej techniki ani stałej ilości preparatu. Lekarz ocenia proporcje i wskazanie, a także możliwość rezygnacji z procedury lub wyboru innego postępowania.",
      en: "Facial volumetry is not one technique or a fixed product amount. The physician assesses proportions and indication, including whether no procedure or another approach is preferable.",
    },
    consultationFocus: [
      { pl: "proporcje twarzy i jakość tkanek", en: "facial proportions and tissue quality" },
      { pl: "cel konsultacji i zakres, który pozostaje naturalny dla anatomii", en: "the consultation goal and a scope consistent with the anatomy" },
      { pl: "bezpieczeństwo, wcześniejsze procedury i alternatywy", en: "safety, previous procedures and alternatives" },
    ],
    facts: [
      {
        label: scopeLabel,
        text: { pl: "Obszar, metoda i ilość preparatu są dobierane indywidualnie; mniejszy zakres może być właściwszy.", en: "Area, method and product amount are individual; a smaller scope may be more appropriate." },
      },
      {
        label: qualificationLabel,
        text: { pl: "Lekarz analizuje anatomię, wskazanie, stan zdrowia i historię wcześniejszych zabiegów.", en: "The physician reviews anatomy, indication, health and previous procedure history." },
      },
      {
        label: recoveryLabel,
        text: { pl: "Możliwe reakcje i termin oceny omawiane są przed procedurą; efekt nie może być gwarantowany.", en: "Possible responses and review timing are discussed beforehand; an outcome cannot be guaranteed." },
      },
    ],
    related: ["botulinum-toxin", "biostimulation", "laser-therapy"],
    consultationCta: { pl: "Umów konsultację dotyczącą wolumetrii", en: "Book a facial volumetry consultation" },
  },
] as const;

export const categories: Readonly<Record<CategoryId, Category>> = {
  surgery: {
    id: "surgery",
    slug: "chirurgia-plastyczna",
    label: { pl: "Chirurgia plastyczna", en: "Plastic surgery" },
    eyebrow: { pl: "Operacje planowane indywidualnie", en: "Individually planned surgery" },
    title: { pl: "Zmiana planowana w głębi.", en: "Change planned in depth." },
    summary: {
      pl: "Każda operacja wymaga kwalifikacji, omówienia alternatyw, ryzyka i realnego przebiegu rekonwalescencji.",
      en: "Every operation requires assessment and discussion of alternatives, risks and a realistic recovery course.",
    },
    positioning: {
      pl: "Zakres leczenia jest ustalany po badaniu i rozmowie. Konsultacja może zakończyć się planem operacji, zaleceniem innego postępowania, odroczeniem albo rezygnacją z procedury.",
      en: "Treatment scope is determined after examination and discussion. Consultation may lead to a surgical plan, another approach, postponement or no procedure.",
    },
    heroImage: "/assets/bg-surgery.jpg",
    seo: {
      title: { pl: "Chirurgia plastyczna w Szczecinie", en: "Plastic surgery in Szczecin" },
      description: { pl: "Informacje o chirurgii plastycznej, kwalifikacji i obszarach konsultacji lek. Huberta Gziuta w Szczecinie.", en: "Information about plastic surgery, medical assessment and consultation areas with Hubert Gziut, MD, in Szczecin." },
    },
    groups: [
      {
        title: { pl: "Twarz i okolica oka", en: "Face and eye area" },
        description: { pl: "Operacje planowane z uwzględnieniem proporcji oraz funkcji.", en: "Surgery planned with regard to proportions and function." },
        procedureIds: ["eyelid-surgery", "facelift", "rhinoplasty"],
      },
      {
        title: { pl: "Chirurgia piersi", en: "Breast surgery" },
        description: { pl: "Zakres ustalany indywidualnie po badaniu i ocenie wskazań.", en: "Scope determined individually after examination and assessment of indications." },
        procedureIds: ["breast-surgery"],
      },
      {
        title: { pl: "Brzuch i kontur", en: "Abdomen and contour" },
        description: { pl: "Postępowanie chirurgiczne dobierane do anatomii i jakości tkanek.", en: "Surgical care selected for anatomy and tissue quality." },
        procedureIds: ["abdominoplasty", "liposuction"],
      },
    ],
    featuredProcedureIds: ["eyelid-surgery", "facelift", "rhinoplasty"],
    qualificationTitle: { pl: "Jak przebiega kwalifikacja do operacji", en: "How surgical assessment works" },
    qualificationIntro: { pl: "Kwalifikacja jest procesem medycznym. Jej celem jest ocena zasadności, możliwego zakresu i bezpieczeństwa, a nie potwierdzenie z góry wybranej metody.", en: "Assessment is a medical process. Its purpose is to evaluate rationale, possible scope and safety, not to confirm a preselected method." },
    qualificationSteps: [
      { title: { pl: "Rozmowa", en: "Discussion" }, text: { pl: "Lekarz poznaje cel konsultacji, stan zdrowia i wcześniejsze leczenie.", en: "The physician reviews the consultation goal, health and previous treatment." } },
      { title: { pl: "Badanie", en: "Examination" }, text: { pl: "Ocena anatomii i tkanek pozwala określić możliwości oraz ograniczenia.", en: "Assessment of anatomy and tissues helps define possibilities and limitations." } },
      { title: { pl: "Plan i decyzja", en: "Plan and decision" }, text: { pl: "Omawiane są alternatywy, ryzyko, przygotowanie, rekonwalescencja i koszt.", en: "Alternatives, risks, preparation, recovery and cost are discussed." } },
    ],
  },
  aesthetic: {
    id: "aesthetic",
    slug: "medycyna-estetyczna",
    label: { pl: "Medycyna estetyczna", en: "Aesthetic medicine" },
    eyebrow: { pl: "Procedury dobrane do wskazań", en: "Procedures selected for indications" },
    title: { pl: "Mniej interwencji. Więcej decyzji.", en: "Less intervention. More considered decisions." },
    summary: {
      pl: "Dobór technologii, preparatu i zakresu jest indywidualny oraz zależy od wskazań, anatomii i jakości tkanek.",
      en: "Technology, product and scope are selected individually according to indications, anatomy and tissue quality.",
    },
    positioning: {
      pl: "Nazwa zabiegu nie zastępuje diagnozy problemu. Plan może obejmować jedną procedurę, terapię etapową, inną metodę albo odstąpienie od interwencji.",
      en: "A procedure name does not replace assessment of the concern. A plan may involve one procedure, staged therapy, another method or no intervention.",
    },
    heroImage: "/assets/bg-aesthetic.jpg",
    seo: {
      title: { pl: "Medycyna estetyczna w Szczecinie", en: "Aesthetic medicine in Szczecin" },
      description: { pl: "Odpowiedzialnie kwalifikowane procedury medycyny estetycznej w Szczecinie: technologie, biostymulacja, toksyna botulinowa i wolumetria.", en: "Responsibly assessed aesthetic medicine in Szczecin: device-based care, biostimulation, botulinum toxin and volumetry." },
    },
    groups: [
      {
        title: { pl: "Mimika i proporcje", en: "Movement and proportions" },
        description: { pl: "Procedury dobierane po analizie anatomii i indywidualnego celu.", en: "Procedures selected after analysis of anatomy and the individual goal." },
        procedureIds: ["botulinum-toxin", "volumetry"],
      },
      {
        title: { pl: "Jakość skóry", en: "Skin quality" },
        description: { pl: "Technologie i metody regeneracyjne planowane do konkretnego wskazania.", en: "Technology and regenerative methods planned for a defined indication." },
        procedureIds: ["laser-therapy", "microneedling-radiofrequency", "biostimulation"],
      },
      {
        title: { pl: "Blizny i struktura skóry", en: "Scars and skin texture" },
        description: { pl: "Postępowanie zależne od rodzaju zmiany, jej dojrzałości i wcześniejszego leczenia.", en: "Care dependent on the type of concern, its maturity and previous treatment." },
        procedureIds: ["scar-treatment"],
      },
    ],
    featuredProcedureIds: ["botulinum-toxin", "laser-therapy", "microneedling-radiofrequency"],
    qualificationTitle: { pl: "Jak dobierana jest procedura", en: "How a procedure is selected" },
    qualificationIntro: { pl: "Punktem wyjścia jest ocena problemu, a nie wybór urządzenia lub preparatu. Lekarz omawia, czy procedura ma uzasadnienie i jakie są jej ograniczenia.", en: "Assessment of the concern comes before choosing a device or product. The physician discusses whether a procedure is justified and what its limitations are." },
    qualificationSteps: [
      { title: { pl: "Ocena", en: "Assessment" }, text: { pl: "Rozmowa i badanie służą określeniu wskazania oraz stanu tkanek.", en: "Discussion and examination define the indication and tissue condition." } },
      { title: { pl: "Dobór metody", en: "Method selection" }, text: { pl: "Porównywane są możliwe techniki, ich ograniczenia, ryzyko i czas regeneracji.", en: "Possible techniques, limitations, risks and recovery time are compared." } },
      { title: { pl: "Plan", en: "Plan" }, text: { pl: "Plan może być etapowy i jest korygowany zgodnie z odpowiedzią tkanek.", en: "The plan may be staged and adjusted according to tissue response." } },
    ],
  },
};

export const consultationSteps = [
  {
    title: { pl: "Kontakt", en: "Contact" },
    text: { pl: "Ustalamy dogodny termin i zakres konsultacji. Nie musisz wcześniej wybierać konkretnej metody.", en: "We arrange a suitable time and consultation scope. You do not need to choose a specific method beforehand." },
  },
  {
    title: { pl: "Konsultacja lekarska", en: "Medical consultation" },
    text: { pl: "Rozmowa, badanie i analiza oczekiwań służą ocenie możliwości, ograniczeń oraz ryzyka.", en: "Discussion, examination and expectation analysis help assess options, limitations and risks." },
  },
  {
    title: { pl: "Indywidualny plan", en: "Individual plan" },
    text: { pl: "Lekarz omawia możliwe metody, przygotowanie, rekonwalescencję i orientacyjny koszt.", en: "The physician discusses possible methods, preparation, recovery and indicative cost." },
  },
  {
    title: { pl: "Opieka i kontrole", en: "Care and follow-up" },
    text: { pl: "Jeżeli procedura zostanie zakwalifikowana, dalsze etapy i kontrole są planowane adekwatnie do jej zakresu.", en: "If a procedure is indicated, subsequent stages and follow-up are planned according to its scope." },
  },
] as const;

export const pageContent = {
  category: {
    positioningTitle: {
      pl: "Konsultacja określa właściwy kierunek.",
      en: "Consultation determines the appropriate direction.",
    },
    indexEyebrow: { pl: "Indeks zabiegów", en: "Procedure index" },
    indexTitle: { pl: "Obszary, które możesz omówić.", en: "Areas you can discuss." },
    qualificationEyebrow: { pl: "Kwalifikacja", en: "Assessment" },
    nextStepsTitle: { pl: "Przygotuj się do świadomej decyzji.", en: "Prepare for an informed decision." },
  },
  procedure: {
    overviewEyebrow: { pl: "Informacje o zabiegu", en: "Procedure information" },
    overviewTitle: { pl: "Punktem wyjścia jest ocena medyczna.", en: "Medical assessment is the starting point." },
    factsEyebrow: { pl: "Zakres · kwalifikacja · opieka", en: "Scope · assessment · care" },
    factsTitle: { pl: "Najważniejsze zagadnienia do omówienia.", en: "Key points to discuss." },
    safetyTitle: { pl: "Bez obietnic i bez decyzji przed badaniem.", en: "No promises and no decision before examination." },
    relatedTitle: { pl: "Pozostań w tym samym obszarze konsultacji.", en: "Explore the same consultation area." },
    guideLabel: { pl: "Na tej stronie", en: "On this page" },
    guideAsideTitle: { pl: "Konsultacja lekarska", en: "Medical consultation" },
    guideAsideText: { pl: "Kwalifikacja przed planem.", en: "Assessment before planning." },
    guideItems: [
      { id: "ocena", label: { pl: "Ocena", en: "Assessment" } },
      { id: "zakres", label: { pl: "Zakres", en: "Scope" } },
      { id: "opieka", label: { pl: "Opieka", en: "Aftercare" } },
      { id: "cena", label: { pl: "Cena", en: "Price" } },
      { id: "konsultacja", label: { pl: "Konsultacja", en: "Consultation" } },
    ],
  },
  home: {
    seo: {
      title: { pl: "lek. Hubert Gziut — chirurgia plastyczna i medycyna estetyczna", en: "Hubert Gziut, MD — plastic surgery and aesthetic medicine" },
      description: { pl: "lek. Hubert Gziut, specjalista chirurgii plastycznej w Szczecinie. Chirurgia plastyczna i medycyna estetyczna z indywidualną kwalifikacją i planem.", en: "Hubert Gziut, MD, plastic surgery specialist in Szczecin. Plastic surgery and aesthetic medicine with individual assessment and planning." },
    },
    eyebrow: { pl: "Chirurgia plastyczna · Szczecin", en: "Plastic surgery · Szczecin" },
    title: { pl: "Precyzja, która zachowuje Ciebie.", en: "Precision, with respect for identity." },
    summary: { pl: "Chirurgia plastyczna i medycyna estetyczna oparte na spokojnej analizie, odpowiedzialnej kwalifikacji i indywidualnym planie.", en: "Plastic surgery and aesthetic medicine grounded in careful analysis, responsible assessment and an individual plan." },
    explore: { pl: "Poznaj zakres", en: "Explore expertise" },
    trustLabel: { pl: "Najważniejsze informacje", en: "Key information" },
    trustConsultation: { pl: "Konsultacja z lekarzem", en: "Physician consultation" },
    gatewayEyebrow: { pl: "Dwa obszary · jeden standard", en: "Two disciplines · one standard" },
    gatewayTitle: { pl: "Metoda wynika z problemu. Nie odwrotnie.", en: "The method follows the concern. Not the other way around." },
    gatewayIntro: { pl: "Punktem wyjścia jest konsultacja i ocena, czy właściwe będzie leczenie chirurgiczne, niechirurgiczne, łączone — lub rezygnacja z procedury.", en: "The starting point is consultation and assessment of whether surgical, non-surgical, combined care — or no procedure — is appropriate." },
    featuredEyebrow: { pl: "Wybrane zagadnienia", en: "Featured concerns" },
    featuredTitle: { pl: "Zacznij od obszaru, który chcesz omówić.", en: "Start with the area you would like to discuss." },
    featuredProcedureIds: ["eyelid-surgery", "facelift", "botulinum-toxin", "laser-therapy"] as readonly ProcedureId[],
    doctorEyebrow: { pl: "Lekarz", en: "Physician" },
    doctorTitle: { pl: "Decyzja medyczna przed metodą.", en: "Medical judgement before method." },
    doctorText: { pl: "Konsultację, kwalifikację i plan prowadzi lek. Hubert Gziut, specjalista chirurgii plastycznej. Rozmowa obejmuje możliwości, ograniczenia, bezpieczeństwo i alternatywy.", en: "Consultation, assessment and planning are led by Hubert Gziut, MD, a plastic surgery specialist. The discussion covers possibilities, limitations, safety and alternatives." },
    doctorLink: { pl: "Poznaj lekarza", en: "Meet the physician" },
    consultationEyebrow: { pl: "Ścieżka konsultacji", en: "Consultation path" },
    consultationTitle: { pl: "Od pytania do świadomej decyzji.", en: "From a question to an informed decision." },
  },
  doctor: {
    seo: {
      title: { pl: "lek. Hubert Gziut — specjalista chirurgii plastycznej", en: "Hubert Gziut, MD — plastic surgery specialist" },
      description: { pl: "Wykształcenie, specjalizacja, numer prawa wykonywania zawodu i sposób prowadzenia konsultacji przez lek. Huberta Gziuta w Szczecinie.", en: "Education, specialisation, medical licence and consultation approach of Hubert Gziut, MD, in Szczecin." },
    },
    eyebrow: { pl: "Lekarz", en: "Physician" },
    title: { pl: "lek. Hubert Gziut", en: "Hubert Gziut, MD" },
    summary: { pl: "Specjalista chirurgii plastycznej prowadzący konsultacje, kwalifikację i planowanie leczenia w Szczecinie.", en: "A plastic surgery specialist providing consultation, assessment and treatment planning in Szczecin." },
    portraitAlt: { pl: "Lekarz Hubert Gziut, specjalista chirurgii plastycznej", en: "Hubert Gziut, MD, plastic surgery specialist" },
    biography: [
      { pl: "Absolwent Wydziału Lekarskiego Pomorskiego Uniwersytetu Medycznego w Szczecinie. Egzamin specjalizacyjny z chirurgii plastycznej zdał w marcu 2022 roku. Jego kształcenie podyplomowe obejmuje również medycynę estetyczną.", en: "A graduate of the Faculty of Medicine at Pomeranian Medical University in Szczecin. He completed his specialist examination in plastic surgery in March 2022. His postgraduate education also includes aesthetic medicine." },
      { pl: "Konsultuje, kwalifikuje i planuje leczenie w zakresie chirurgii plastycznej oraz procedur estetycznych. Decyzja o metodzie zapada po badaniu i rozmowie o możliwościach, ograniczeniach i bezpieczeństwie.", en: "He consults, assesses and plans treatment in plastic surgery and aesthetic procedures. Method selection follows examination and a discussion of possibilities, limitations and safety." },
    ],
    timelineTitle: { pl: "Wykształcenie i specjalizacja", en: "Education and specialisation" },
    timeline: [
      { date: { pl: "Wykształcenie lekarskie", en: "Medical education" }, title: { pl: "Pomorski Uniwersytet Medyczny w Szczecinie", en: "Pomeranian Medical University in Szczecin" }, text: { pl: "Absolwent Wydziału Lekarskiego.", en: "Graduate of the Faculty of Medicine." } },
      { date: { pl: "Marzec 2022", en: "March 2022" }, title: { pl: "Egzamin specjalizacyjny", en: "Specialist examination" }, text: { pl: "Zdany egzamin specjalizacyjny z chirurgii plastycznej.", en: "Completed the specialist examination in plastic surgery." } },
      { date: { pl: "Kształcenie podyplomowe", en: "Postgraduate education" }, title: { pl: "Medycyna estetyczna", en: "Aesthetic medicine" }, text: { pl: "Kształcenie podyplomowe obejmuje również medycynę estetyczną.", en: "Postgraduate education also includes aesthetic medicine." } },
    ],
    philosophyTitle: { pl: "Najpierw uczciwa kwalifikacja", en: "Honest assessment comes first" },
    philosophyText: { pl: "Dobra decyzja medyczna nie zaczyna się od obietnicy efektu. Zaczyna się od oceny wskazań, ograniczeń, alternatyw i gotowości do bezpiecznego procesu leczenia.", en: "A sound medical decision does not begin with a promise of a result. It begins with assessment of indications, limitations, alternatives and readiness for a safe care process." },
    disciplinesTitle: { pl: "Dwa obszary konsultacji", en: "Two consultation disciplines" },
  },
  consultation: {
    seo: {
      title: { pl: "Konsultacja lekarska — DrGziut Szczecin", en: "Medical consultation — DrGziut Szczecin" },
      description: { pl: "Jak przebiega konsultacja z zakresu chirurgii plastycznej i medycyny estetycznej oraz jak się do niej przygotować.", en: "What to expect from a plastic surgery or aesthetic medicine consultation and how to prepare." },
    },
    eyebrow: { pl: "Konsultacja", en: "Consultation" },
    title: { pl: "Spokojna rozmowa przed decyzją.", en: "A considered conversation before a decision." },
    summary: { pl: "Konsultacja służy zrozumieniu problemu, badaniu, ocenie możliwych metod i omówieniu bezpieczeństwa — nie potwierdzeniu z góry wybranego zabiegu.", en: "Consultation is for understanding the concern, examination, assessment of possible methods and discussion of safety — not confirmation of a preselected procedure." },
    processTitle: { pl: "Cztery etapy konsultacji i opieki", en: "Four stages of consultation and care" },
    prepareTitle: { pl: "Jak się przygotować", en: "How to prepare" },
    prepareIntro: { pl: "Nie musisz samodzielnie wybierać metody. Przygotuj informacje, które pomagają lekarzowi ocenić bezpieczeństwo i kontekst medyczny.", en: "You do not need to choose a method yourself. Prepare information that helps the physician assess safety and medical context." },
    preparation: [
      { pl: "lista przyjmowanych leków i suplementów", en: "a list of medicines and supplements" },
      { pl: "informacje o istotnych chorobach, alergiach i wcześniejszych operacjach", en: "information about relevant conditions, allergies and previous surgery" },
      { pl: "pytania o możliwości, ograniczenia, ryzyko, rekonwalescencję i koszt", en: "questions about possibilities, limitations, risks, recovery and cost" },
      { pl: "dokumentacja wyłącznie wtedy i bezpiecznym kanałem, który wskaże gabinet", en: "records only when requested and through a secure channel indicated by the practice" },
    ],
    discussedTitle: { pl: "Co jest omawiane", en: "What is discussed" },
    discussed: [
      { pl: "cel konsultacji i realistyczne możliwości", en: "the consultation goal and realistic possibilities" },
      { pl: "zasadność procedury oraz możliwe alternatywy", en: "procedure rationale and possible alternatives" },
      { pl: "ograniczenia, ryzyko i indywidualne czynniki zdrowotne", en: "limitations, risks and individual health factors" },
      { pl: "przygotowanie, spodziewany przebieg opieki, kontrole i orientacyjny koszt", en: "preparation, expected care pathway, follow-up and indicative cost" },
    ],
    privacyNote: { pl: "Formularz demonstracyjny nie służy do przesyłania dokumentacji medycznej ani danych o zdrowiu. W sprawie bezpiecznego przekazania dokumentów skontaktuj się bezpośrednio z gabinetem.", en: "The demonstration form is not for medical records or health information. Contact the practice directly to arrange secure document transfer." },
  },
  pricing: {
    seo: {
      title: { pl: "Cennik orientacyjny — DrGziut", en: "Indicative pricing — DrGziut" },
      description: { pl: "Orientacyjne ceny konsultacji i wybranych procedur. Ostateczny koszt zależy od zakresu ustalonego po badaniu i kwalifikacji.", en: "Indicative prices for consultation and selected procedures. Final cost depends on scope determined after examination and assessment." },
    },
    eyebrow: { pl: "Cennik", en: "Pricing" },
    title: { pl: "Przejrzystość przed konsultacją.", en: "Clarity before consultation." },
    summary: { pl: "Podane kwoty mają charakter orientacyjny i wymagają potwierdzenia. Ostateczny zakres i koszt są ustalane po badaniu oraz indywidualnej kwalifikacji.", en: "Prices are indicative and require confirmation. Final scope and cost are determined after examination and individual assessment." },
    noteTitle: { pl: "Ważna informacja", en: "Important information" },
    note: { pl: "Cena „od” nie jest ofertą ani obietnicą stałego kosztu. Zakres procedury, rodzaj znieczulenia i potrzeby związane z opieką mogą wpływać na ostateczną wycenę przekazaną po konsultacji.", en: "A “from” price is not an offer or promise of a fixed cost. Procedure scope, anaesthesia and care needs may affect the final quotation provided after consultation." },
    groups: [
      {
        title: { pl: "Chirurgia plastyczna", en: "Plastic surgery" },
        items: [
          { name: { pl: "Konsultacja chirurgiczna", en: "Surgical consultation" }, value: { pl: "od 300 zł", en: "from PLN 300" } },
          { name: { pl: "Plastyka powiek górnych", en: "Upper eyelid surgery" }, value: { pl: "od 6 500 zł", en: "from PLN 6,500" } },
          { name: { pl: "Deep Plane Facelift", en: "Deep Plane Facelift" }, value: { pl: "od 28 000 zł", en: "from PLN 28,000" } },
        ],
      },
      {
        title: { pl: "Medycyna estetyczna", en: "Aesthetic medicine" },
        items: [
          { name: { pl: "Toksyna botulinowa", en: "Botulinum toxin" }, value: { pl: "od 600 zł", en: "from PLN 600" } },
          { name: { pl: "Laser frakcyjny CO₂", en: "Fractional CO₂ laser" }, value: { pl: "od 1 600 zł", en: "from PLN 1,600" } },
        ],
      },
    ],
  },
  faq: {
    seo: {
      title: { pl: "Najczęstsze pytania — DrGziut", en: "Frequently asked questions — DrGziut" },
      description: { pl: "Odpowiedzi na pytania o konsultację, kwalifikację, procedury, rekonwalescencję, bezpieczeństwo i orientacyjne koszty.", en: "Answers about consultation, assessment, procedures, recovery, safety and indicative costs." },
    },
    eyebrow: { pl: "FAQ", en: "FAQ" },
    title: { pl: "Pytania, które warto zadać.", en: "Questions worth asking." },
    summary: { pl: "Odpowiedzi mają charakter edukacyjny. Indywidualne zalecenia i kwalifikacja wymagają konsultacji oraz badania.", en: "Answers are educational. Individual recommendations and assessment require consultation and examination." },
    filterLabel: { pl: "Kategorie pytań", en: "Question categories" },
    allFilter: { pl: "Wszystkie", en: "All" },
    groups: [
      {
        title: { pl: "Konsultacja", en: "Consultation" },
        items: [
          { question: { pl: "Jak wygląda pierwsza konsultacja?", en: "What happens during the first consultation?" }, answer: { pl: "Obejmuje rozmowę o oczekiwaniach, badanie, ocenę stanu zdrowia oraz omówienie możliwych metod, ograniczeń, ryzyka, rekonwalescencji i kosztów.", en: "It includes a discussion of expectations, examination, health assessment and an explanation of possible methods, limitations, risks, recovery and costs." } },
          { question: { pl: "Czy muszę wiedzieć, jaki zabieg wybrać?", en: "Do I need to know which procedure to choose?" }, answer: { pl: "Nie. Dobór postępowania jest częścią konsultacji. W niektórych sytuacjach właściwe może być leczenie niechirurgiczne, odroczenie procedury albo rezygnacja z niej.", en: "No. Selecting an approach is part of the consultation. In some situations, non-surgical care, postponement or no procedure may be appropriate." } },
        ],
      },
      {
        title: { pl: "Procedury", en: "Procedures" },
        items: [
          { question: { pl: "Czy można łączyć różne metody?", en: "Can different methods be combined?" }, answer: { pl: "Czasem plan etapowy lub łączony może być rozważany, ale tylko wtedy, gdy wynika ze wskazań i oceny bezpieczeństwa. Większa liczba procedur nie oznacza lepszego planu.", en: "A staged or combined plan may sometimes be considered when supported by indications and safety assessment. More procedures do not necessarily make a better plan." } },
        ],
      },
      {
        title: { pl: "Rekonwalescencja", en: "Recovery" },
        items: [
          { question: { pl: "Kiedy można wrócić do codziennej aktywności?", en: "When can normal activities resume?" }, answer: { pl: "Nie ma jednego terminu dla wszystkich procedur. Lekarz omawia spodziewane ograniczenia i przekazuje indywidualne zalecenia po ustaleniu zakresu.", en: "There is no single timeframe for every procedure. The physician discusses expected restrictions and provides individual instructions after scope is agreed." } },
        ],
      },
      {
        title: { pl: "Bezpieczeństwo i koszt", en: "Safety and cost" },
        items: [
          { question: { pl: "Czy można zagwarantować konkretny efekt?", en: "Can a specific result be guaranteed?" }, answer: { pl: "Nie. Reakcja tkanek i gojenie są indywidualne. Podczas konsultacji lekarz omawia realistyczne możliwości oraz ograniczenia danej procedury.", en: "No. Tissue response and healing vary between individuals. During consultation, the physician explains realistic possibilities and limitations of the procedure." } },
          { question: { pl: "Dlaczego ostateczna cena powstaje po konsultacji?", en: "Why is the final price provided after consultation?" }, answer: { pl: "Koszt zależy między innymi od rzeczywistego zakresu, rodzaju postępowania, znieczulenia i potrzebnej opieki. Cennik przedstawia wyłącznie zweryfikowane kwoty orientacyjne „od”.", en: "Cost depends on actual scope, approach, anaesthesia and care needs. The price list contains only verified indicative “from” values." } },
        ],
      },
    ],
  },
  contact: {
    seo: {
      title: { pl: "Kontakt i konsultacja — DrGziut Szczecin", en: "Contact and consultation — DrGziut Szczecin" },
      description: { pl: "Telefon, WhatsApp, SMS, e-mail i adres gabinetu DrGziut w Szczecinie. Kontakt służy organizacji konsultacji lekarskiej.", en: "Phone, WhatsApp, SMS, email and practice address for DrGziut in Szczecin. Contact is for arranging a medical consultation." },
    },
    eyebrow: { pl: "Kontakt", en: "Contact" },
    title: { pl: "Wybierz prosty sposób kontaktu.", en: "Choose a simple way to get in touch." },
    summary: { pl: "Kontakt służy organizacji konsultacji z lekarzem. Wybierz telefon, WhatsApp albo SMS — bez formularza i bez podawania danych medycznych.", en: "Contact is for arranging a consultation with the physician. Choose phone, WhatsApp or SMS — without a form or sharing medical information." },
    directTitle: { pl: "Skontaktuj się bezpośrednio", en: "Contact the practice directly" },
    phoneLabel: { pl: "Telefon", en: "Phone" },
    emailLabel: { pl: "E-mail", en: "Email" },
    addressLabel: { pl: "Gabinet", en: "Practice" },
    whatsappLabel: { pl: "WhatsApp", en: "WhatsApp" },
    smsLabel: { pl: "SMS", en: "SMS" },
    channelHint: { pl: "Przejdź do kontaktu", en: "Open contact channel" },
    privacyTitle: { pl: "Zanim napiszesz", en: "Before you message" },
    privacyText: {
      pl: "Nie przesyłaj danych o zdrowiu, zdjęć, numeru PESEL ani dokumentacji medycznej przez WhatsApp lub SMS. W pierwszej wiadomości wystarczy imię i prośba o termin konsultacji.",
      en: "Do not send health information, photographs, a national ID number or medical records through WhatsApp or SMS. Your name and a request for a consultation appointment are enough in the first message.",
    },
    consultationPriceLabel: { pl: "Konsultacja lekarska", en: "Medical consultation" },
    consultationPrice: { pl: "od 300 zł", en: "from PLN 300" },
    availabilityNote: { pl: "Termin ustalany indywidualnie", en: "Appointment arranged individually" },
  },
  notFound: {
    seo: {
      title: { pl: "Nie znaleziono strony — DrGziut", en: "Page not found — DrGziut" },
      description: { pl: "Wybrana strona nie istnieje. Przejdź do strony głównej, kategorii zabiegów lub kontaktu.", en: "The requested page does not exist. Go to the home page, procedure categories or contact." },
    },
    eyebrow: { pl: "Błąd 404", en: "Error 404" },
    title: { pl: "Ta strona nie istnieje.", en: "This page does not exist." },
    summary: { pl: "Adres mógł się zmienić albo zawierać literówkę. Wybierz jeden z głównych obszarów lub przejdź do kontaktu.", en: "The address may have changed or contain a typo. Choose one of the main areas or go to contact." },
    homeLink: { pl: "Wróć na stronę główną", en: "Return to home page" },
  },
  contactBand: {
    eyebrow: { pl: "Konsultacja lekarska", en: "Medical consultation" },
    title: { pl: "Zacznij od rozmowy i badania.", en: "Begin with discussion and examination." },
    text: { pl: "Jeśli nie wiesz, która metoda może być właściwa, nie musisz wybierać jej przed wizytą. Kwalifikacja i plan powstają podczas konsultacji.", en: "If you are unsure which method may be appropriate, you do not need to choose it before the visit. Assessment and planning take place during consultation." },
  },
} as const;

export const procedureById = Object.fromEntries(
  procedures.map((procedure) => [procedure.id, procedure]),
) as Readonly<Record<ProcedureId, Procedure>>;

export const categoryPath = (category: Category | CategoryId) => {
  const item = typeof category === "string" ? categories[category] : category;
  return `/${item.slug}`;
};

export const procedurePath = (procedure: Procedure | ProcedureId) => {
  const item = typeof procedure === "string" ? procedureById[procedure] : procedure;
  return `${categoryPath(item.category)}/${item.slug}`;
};

export const staticPaths = {
  home: "/",
  doctor: "/lekarz",
  consultation: "/konsultacja",
  pricing: "/cennik",
  faq: "/faq",
  contact: "/kontakt",
} as const;
