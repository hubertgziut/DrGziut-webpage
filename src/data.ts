export type BiText = { pl: string; en: string };
export type BiArray = { pl: string[]; en: string[] };

export const nav = {
  home: { pl: 'Start', en: 'Home' },
  surgery: { pl: 'Chirurgia plastyczna', en: 'Plastic surgery' },
  aesthetic: { pl: 'Medycyna estetyczna', en: 'Aesthetic medicine' },
  method: { pl: 'Filozofia', en: 'Philosophy' },
  clinic: { pl: 'Klinika', en: 'Clinic' },
  consultation: { pl: 'Konsultacja', en: 'Consultation' },
  pricing: { pl: 'Cennik', en: 'Pricing' },
  contact: { pl: 'Kontakt', en: 'Contact' },
  book: { pl: 'Umów konsultację', en: 'Book a consultation' },
};

export const common = {
  learn: { pl: 'Dowiedz się więcej', en: 'Learn more' },
  explore: { pl: 'Poznaj zabiegi', en: 'Explore procedures' },
  book: { pl: 'Umów konsultację', en: 'Book a consultation' },
  contact: { pl: 'Skontaktuj się', en: 'Get in touch' },
  all: { pl: 'Wszystkie', en: 'All' },
  from: { pl: 'od', en: 'from' },
  readMore: { pl: 'Czytaj więcej', en: 'Read more' },
  disclaimer: {
    pl: 'Treści na stronie mają charakter informacyjny i nie zastępują indywidualnej konsultacji lekarskiej. O kwalifikacji do zabiegu, zakresie leczenia i rodzaju znieczulenia decyduje lekarz po badaniu oraz analizie stanu zdrowia pacjenta.',
    en: 'The content on this website is for information purposes only and does not replace an individual medical consultation. Eligibility for a procedure, the scope of treatment and the type of anaesthesia are decided by the physician after examination and assessment of the patient’s health.'
  },
};

export const surgeryCategories = [
  { id: 'face', label: { pl: 'Twarz i szyja', en: 'Face & neck' } },
  { id: 'eyes', label: { pl: 'Powieki i brwi', en: 'Eyelids & brows' } },
  { id: 'nose', label: { pl: 'Nos i uszy', en: 'Nose & ears' } },
  { id: 'breast', label: { pl: 'Piersi', en: 'Breasts' } },
  { id: 'body', label: { pl: 'Sylwetka', en: 'Body contouring' } },
  { id: 'correction', label: { pl: 'Blizny i korekty', en: 'Scars & corrections' } },
  { id: 'intimate', label: { pl: 'Chirurgia intymna', en: 'Intimate surgery' } },
];

export const surgeryProcedures = [
  { cat: 'face', name: { pl: 'Lifting twarzy', en: 'Facelift' }, desc: { pl: 'Chirurgiczna poprawa owalu i napięcia tkanek twarzy po indywidualnej kwalifikacji.', en: 'Surgical improvement of facial contour and tissue support following individual assessment.' } },
  { cat: 'face', name: { pl: 'Deep Plane Facelift', en: 'Deep Plane Facelift' }, desc: { pl: 'Zaawansowana technika liftingu ukierunkowana na głębszą repozycję tkanek i naturalny wygląd.', en: 'An advanced facelift technique focused on deeper tissue repositioning and a natural appearance.' } },
  { cat: 'face', name: { pl: 'Lifting szyi', en: 'Neck lift' }, desc: { pl: 'Zabieg ukierunkowany na kontur szyi, linię żuchwy i napięcie tkanek.', en: 'A procedure focused on the neck contour, jawline and tissue support.' } },
  { cat: 'face', name: { pl: 'Lip lift', en: 'Lip lift' }, desc: { pl: 'Chirurgiczna korekta proporcji górnej wargi planowana z zachowaniem naturalnej mimiki.', en: 'Surgical refinement of upper-lip proportions, planned to preserve natural expression.' } },
  { cat: 'face', name: { pl: 'Lipofilling twarzy', en: 'Facial fat transfer' }, desc: { pl: 'Uzupełnianie objętości własną tkanką tłuszczową jako element harmonijnego planu odmładzania.', en: 'Volume restoration with your own adipose tissue as part of a harmonious rejuvenation plan.' } },
  { cat: 'face', name: { pl: 'Liposukcja podbródka', en: 'Submental liposuction' }, desc: { pl: 'Precyzyjne modelowanie okolicy podbródka po ocenie jakości skóry i konturu szyi.', en: 'Precise contouring of the submental area after assessment of skin quality and neck contour.' } },
  { cat: 'eyes', name: { pl: 'Plastyka powiek górnych', en: 'Upper blepharoplasty' }, desc: { pl: 'Usunięcie nadmiaru skóry powiek górnych z uwzględnieniem brwi i naturalnego fałdu powieki.', en: 'Removal of excess upper eyelid skin, considering the brow position and natural crease.' } },
  { cat: 'eyes', name: { pl: 'Plastyka powiek dolnych', en: 'Lower blepharoplasty' }, desc: { pl: 'Leczenie okolicy podoczodołowej zależne od anatomii, przepuklin tłuszczowych i jakości skóry.', en: 'Treatment of the under-eye area tailored to anatomy, fat pads and skin quality.' } },
  { cat: 'eyes', name: { pl: 'Lifting brwi i czoła', en: 'Brow & forehead lift' }, desc: { pl: 'Procedura rozważana przy opadaniu brwi, zmianie wyrazu oka lub napięciu okolicy czoła.', en: 'Considered for brow descent, changes in eye expression or forehead laxity.' } },
  { cat: 'nose', name: { pl: 'Pełna plastyka nosa', en: 'Rhinoplasty' }, desc: { pl: 'Chirurgia nosa obejmująca analizę profilu, proporcji, funkcji i stabilności tkanek.', en: 'Nasal surgery including analysis of profile, proportions, function and tissue stability.' } },
  { cat: 'nose', name: { pl: 'Plastyka koniuszka nosa', en: 'Tip rhinoplasty' }, desc: { pl: 'Precyzyjna korekta koniuszka nosa planowana z uwzględnieniem struktury chrzęstnej.', en: 'Precise tip refinement planned with consideration for cartilaginous structure.' } },
  { cat: 'nose', name: { pl: 'Korekta uszu', en: 'Otoplasty' }, desc: { pl: 'Zabieg korekty uszu planowany po ocenie anatomii, symetrii i oczekiwanego zakresu zmiany.', en: 'Ear correction planned after assessing anatomy, symmetry and desired degree of change.' } },
  { cat: 'breast', name: { pl: 'Powiększanie piersi implantami', en: 'Breast augmentation' }, desc: { pl: 'Dobór implantów, kształtu i zakresu zabiegu odbywa się po badaniu i rozmowie o oczekiwaniach.', en: 'Implant selection, shape and procedure scope follow examination and discussion of expectations.' } },
  { cat: 'breast', name: { pl: 'Mastopeksja – lifting piersi', en: 'Breast lift' }, desc: { pl: 'Podniesienie piersi planowane przy opadaniu tkanek, z oceną skóry i proporcji.', en: 'Breast lifting planned for tissue descent, with skin and proportion assessment.' } },
  { cat: 'breast', name: { pl: 'Redukcja piersi', en: 'Breast reduction' }, desc: { pl: 'Zmniejszenie piersi może poprawiać proporcje i komfort, a zakres leczenia ustala się indywidualnie.', en: 'Breast reduction may improve proportions and comfort; treatment scope is individual.' } },
  { cat: 'body', name: { pl: 'Liposukcja', en: 'Liposuction' }, desc: { pl: 'Modelowanie wybranych okolic ciała; nie zastępuje redukcji masy ciała.', en: 'Contouring of selected body areas; it is not a substitute for weight reduction.' } },
  { cat: 'body', name: { pl: 'Plastyka brzucha', en: 'Abdominoplasty' }, desc: { pl: 'Korekta brzucha planowana indywidualnie w zależności od nadmiaru skóry i zakresu zmian.', en: 'Abdominal contouring planned individually according to excess skin and the extent of changes.' } },
  { cat: 'body', name: { pl: 'Plastyka ramion', en: 'Arm lift' }, desc: { pl: 'Zabieg dotyczący wiotkości i nadmiaru skóry ramion po ocenie tkanek.', en: 'A procedure for arm skin laxity and excess skin following tissue assessment.' } },
  { cat: 'body', name: { pl: 'Modelowanie pośladków', en: 'Buttock contouring' }, desc: { pl: 'Modelowanie pośladków własną tkanką tłuszczową wymaga szczególnie odpowiedzialnej kwalifikacji i omówienia bezpieczeństwa.', en: 'Buttock contouring with autologous fat requires especially responsible assessment and safety discussion.' } },
  { cat: 'correction', name: { pl: 'Chirurgiczne usuwanie blizn', en: 'Surgical scar revision' }, desc: { pl: 'Korekta blizny planowana po ocenie jej typu, lokalizacji i historii gojenia.', en: 'Scar revision planned after assessing its type, location and healing history.' } },
  { cat: 'correction', name: { pl: 'Korekta blizny pooperacyjnej', en: 'Post-operative scar revision' }, desc: { pl: 'Postępowanie zależy od wyglądu blizny, napięcia skóry i czasu od operacji.', en: 'The approach depends on scar appearance, skin tension and time since surgery.' } },
  { cat: 'intimate', name: { pl: 'Labioplastyka', en: 'Labiaplasty' }, desc: { pl: 'Korekta warg sromowych wymaga spokojnej konsultacji, omówienia wskazań i rekonwalescencji.', en: 'Labiaplasty requires a calm consultation, discussion of indications and recovery.' } },
];

export const aestheticCategories = [
  { id: 'skin', label: { pl: 'Jakość skóry', en: 'Skin quality' } },
  { id: 'pigment', label: { pl: 'Przebarwienia', en: 'Pigmentation' } },
  { id: 'scars', label: { pl: 'Blizny', en: 'Scars' } },
  { id: 'contour', label: { pl: 'Modelowanie twarzy', en: 'Facial contouring' } },
  { id: 'lips', label: { pl: 'Usta', en: 'Lips' } },
  { id: 'botox', label: { pl: 'Toksyna botulinowa', en: 'Botulinum toxin' } },
  { id: 'hair', label: { pl: 'Włosy', en: 'Hair' } },
];

export const aestheticProcedures = [
  { cat: 'skin', name: { pl: 'Laser frakcyjny CO₂', en: 'Fractional CO₂ laser' }, desc: { pl: 'Technologia wykorzystywana w pracy z fotostarzeniem, strukturą i przebudową skóry.', en: 'A technology used in treatment plans for photoageing, skin texture and remodelling.' } },
  { cat: 'skin', name: { pl: 'Radiofrekwencja mikroigłowa', en: 'Microneedling radiofrequency' }, desc: { pl: 'Terapia dobierana do wiotkości, jędrności, blizn i konturu dolnej części twarzy.', en: 'Treatment tailored to laxity, firmness, scars and lower-face contour.' } },
  { cat: 'skin', name: { pl: 'Mikronakłuwanie', en: 'Microneedling' }, desc: { pl: 'Metoda wspierająca pracę nad bliznami, rozstępami i jakością skóry.', en: 'A method supporting treatment of scars, stretch marks and skin quality.' } },
  { cat: 'skin', name: { pl: 'Biostymulacja', en: 'Biostimulation' }, desc: { pl: 'Długofalowa praca nad jakością i jędrnością skóry po indywidualnej kwalifikacji.', en: 'Long-term work on skin quality and firmness following individual assessment.' } },
  { cat: 'pigment', name: { pl: 'Terapia przebarwień', en: 'Pigmentation therapy' }, desc: { pl: 'Strategia dobierana po ocenie przyczyny zmian, fototypu i ochrony przeciwsłonecznej.', en: 'A strategy tailored after assessing the cause, skin type and sun protection.' } },
  { cat: 'pigment', name: { pl: 'Laser tulowy', en: 'Thulium laser' }, desc: { pl: 'Nieablacyjna technologia rozważana w pracy nad kolorytem i teksturą skóry.', en: 'A non-ablative technology considered for skin tone and texture.' } },
  { cat: 'scars', name: { pl: 'Terapia blizn potrądzikowych', en: 'Acne scar therapy' }, desc: { pl: 'Plan zależy od rodzaju i głębokości blizn oraz aktywności trądziku.', en: 'The plan depends on scar type, depth and acne activity.' } },
  { cat: 'scars', name: { pl: 'Terapia blizn pooperacyjnych', en: 'Post-operative scar therapy' }, desc: { pl: 'Plan poprawy blizny zależy od czasu gojenia i jakości tkanek.', en: 'Scar improvement planning depends on healing time and tissue quality.' } },
  { cat: 'contour', name: { pl: 'Wolumetria twarzy', en: 'Facial volumetry' }, desc: { pl: 'Uzupełnianie objętości z poszanowaniem proporcji i indywidualnego charakteru twarzy.', en: 'Volume restoration that respects proportions and individual facial character.' } },
  { cat: 'contour', name: { pl: 'Modelowanie żuchwy', en: 'Jawline contouring' }, desc: { pl: 'Planowane z uwzględnieniem anatomii, owalu twarzy i jakości skóry.', en: 'Planned with consideration for anatomy, facial oval and skin quality.' } },
  { cat: 'contour', name: { pl: 'Dolina łez', en: 'Tear trough' }, desc: { pl: 'Okolica pod oczami wymaga szczególnie ostrożnej kwalifikacji i doboru metody.', en: 'The under-eye area requires especially careful assessment and method selection.' } },
  { cat: 'lips', name: { pl: 'Modelowanie ust', en: 'Lip enhancement' }, desc: { pl: 'Subtelne modelowanie planowane z uwzględnieniem proporcji, mimiki i naturalności.', en: 'Subtle enhancement planned with consideration for proportions, expression and naturalness.' } },
  { cat: 'lips', name: { pl: 'Nawilżenie ust', en: 'Lip hydration' }, desc: { pl: 'Terapia ukierunkowana na jakość czerwieni wargowej i subtelne odświeżenie.', en: 'Treatment focused on lip quality and subtle refreshment.' } },
  { cat: 'botox', name: { pl: 'Toksyna botulinowa', en: 'Botulinum toxin' }, desc: { pl: 'Procedury mimiczne planowane po ocenie pracy mięśni i proporcji twarzy.', en: 'Expression-related procedures planned after assessing muscle activity and facial proportions.' } },
  { cat: 'botox', name: { pl: 'Bruksizm', en: 'Bruxism' }, desc: { pl: 'Postępowanie funkcjonalne rozważane po ocenie napięcia mięśni żwaczy i objawów.', en: 'Functional treatment considered after assessing masseter tension and symptoms.' } },
  { cat: 'hair', name: { pl: 'Osocze bogatopłytkowe PRP', en: 'Platelet-rich plasma (PRP)' }, desc: { pl: 'Terapia autologiczna rozważana jako element planu wspierającego kondycję skóry głowy.', en: 'An autologous therapy considered as part of a plan supporting scalp condition.' } },
  { cat: 'hair', name: { pl: 'Mezoterapia skóry głowy', en: 'Scalp mesotherapy' }, desc: { pl: 'Zabieg wspierający skórę głowy dobierany po ocenie wskazań i tolerancji.', en: 'A scalp-supporting procedure selected after assessing indications and tolerance.' } },
];

export const homeFAQs = [
  { q: { pl: 'Jak wygląda konsultacja?', en: 'What does a consultation involve?' }, a: { pl: 'Konsultacja obejmuje rozmowę o oczekiwaniach, analizę problemu, ocenę możliwości leczenia, omówienie ryzyka, rekonwalescencji, przygotowania oraz orientacyjnych kosztów.', en: 'A consultation includes a discussion of expectations, assessment of the concern and treatment options, as well as recovery, preparation, risks and estimated costs.' } },
  { q: { pl: 'Czy można wykonać kilka zabiegów jednocześnie?', en: 'Can several procedures be performed at once?' }, a: { pl: 'W wybranych przypadkach połączenie procedur jest możliwe. Decyzja zależy od zakresu leczenia, bezpieczeństwa, rodzaju znieczulenia i indywidualnej kwalifikacji.', en: 'In selected cases, procedures may be combined. The decision depends on treatment scope, safety, anaesthesia and individual assessment.' } },
  { q: { pl: 'Ile trwa rekonwalescencja?', en: 'How long is recovery?' }, a: { pl: 'Czas rekonwalescencji zależy od zabiegu, indywidualnego gojenia i zakresu leczenia. Omawiamy go szczegółowo podczas konsultacji.', en: 'Recovery depends on the procedure, individual healing and treatment scope. We discuss it in detail during consultation.' } },
  { q: { pl: 'Czy efekt będzie wyglądał naturalnie?', en: 'Will the result look natural?' }, a: { pl: 'Celem jest zachowanie proporcji, mimiki i indywidualnego charakteru twarzy. Nie możemy jednak zagwarantować konkretnego rezultatu — planujemy go indywidualnie, uczciwie omawiając możliwości i ograniczenia.', en: 'The goal is to preserve proportions, expression and individual facial character. A specific result cannot be guaranteed; we plan individually and discuss possibilities and limitations openly.' } },
  { q: { pl: 'Jak przygotować się do zabiegu?', en: 'How should I prepare for a procedure?' }, a: { pl: 'Zakres przygotowania zależy od planowanej procedury i stanu zdrowia. Po konsultacji otrzymasz indywidualne zalecenia oraz informacje o ewentualnych badaniach.', en: 'Preparation depends on the planned procedure and your health. After consultation, you will receive individual instructions and information on any necessary tests.' } },
];
