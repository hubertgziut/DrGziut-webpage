# Plan przebudowy DrGziut-webpage v2

## Założenia z briefu marketingowego (docs/brief-struktura-strony.md)
1. Kolejność sekcji: Hero → trust bar → specjalizacje → O doktorze → efekty → opinie → proces → cennik „od" → FAQ → CTA+formularz → stopka.
2. Jeden główny CTA „Umów konsultację" wszędzie; telefon klikalny w headerze.
3. Doktor PRZED efektami; prawdziwe zdjęcia (mamy z drgziut.pl), nie stock.
4. Ceny „od X zł" na homepage; pełny cennik na podstronie.
5. Powściągliwa animacja; premium = spokój; mobile-first (60–70% ruchu).
6. Szybkość: LCP < 2,5 s.

## Efekt wizualny v2: „scroll-driven medical backgrounds"
Koncept: **przyklejone, pełnoekranowe tło zmieniające się płynnie (crossfade) wraz z postępem scrolla** — kolejne warstwy tła odpowiadają sekcjom:
- Hero: portret/esthetic close-up (istniejący hero.jpg)
- Filozofia: abstrakcja organiczna/jedwab (istniejący silk.jpg)
- O doktorze: prawdziwe zdjęcie kliniki z overlayem (brand/clinic-1.jpg)
- Proces/precyzja: instrumenty (istniejący precision.jpg)
- CTA: klinika przy marinie (istniejący clinic.jpg)

Nowe grafiki AI (OpenAI) do dołożenia jako tła sekcji:
- `bg-surgery.jpg` — medyczny vibe: makro skóry/struktury tkanek, chiaroscuro, złoto-grafit
- `bg-aesthetic.jpg` — krople/serum/hialuron, mikro-świat, złote refleksy na czerni
- `bg-tech.jpg` — laser/światło punktowe na ciemnej skórze, frakcja, premium

Implementacja:
- Komponent `ScrollBackgrounds`: fixed full-viewport stack warstw; IntersectionObserver na sekcjach wybiera aktywną warstwę; crossfade 0.8s; parallax ograniczony do `transform: scale/translateY` na tle (bez scroll-jackingu).
- `prefers-reduced-motion`: statyczne tło pierwszej sekcji.
- Mobile: ta sama mechanika, tła `loading="lazy"` + `decoding="async"`, zoptymalizowane JPEG ~200 KB.

## Zmiany struktury (wg briefu)
1. **Header**: + klikalny telefon obok CTA; logo-light.png zamiast tekstu.
2. **Home**: dodać trust bar (specjalista, NPWZ 3186517, lata doświadczenia) pod hero.
3. **Home**: sekcja „O doktorze" ze zdjęciem brand/doctor.png (overlay/duotone) + cytat + NPWZ + link ZnanyLekarz.
4. **Home**: mini-cennik „od X zł" (4–6 pozycji) z linkiem do pełnego cennika.
5. **Home**: proces 4 kroki (skrót z 5), opinie nad formularzem.
6. **Podstrony**: page-hero używa warstw tła tej samej mechaniki.

## Plan agentów
- Agent grafik (3 równoległe): bg-surgery, bg-aesthetic, bg-tech (OpenAI image gen) → public/assets/
- Agent efektów wizualnych: implementuje ScrollBackgrounds + integruje sekcje (Home.tsx)
- Agent sekcji: przebudowa układu wg briefu (trust bar, doktor, mini-cennik)
- Agent rewizji: pełny audyt funkcjonalności (build, routing, i18n, mobile, a11y, wydajność)
