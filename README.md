# DrGziut — wielopodstronowy serwis lekarza

Dwujęzyczny serwis lek. Huberta Gziuta, specjalisty chirurgii plastycznej w Szczecinie. Aplikacja rozdziela chirurgię plastyczną, medycynę estetyczną, procedury oraz strony informacyjne na osobne trasy.

## Stack

- React 18 + TypeScript + Vite
- React Router 6
- Playwright
- GitHub Pages

## Uruchomienie

```bash
npm install
npm run dev
```

Build produkcyjny:

```bash
npm run build
npm run preview
```

Pełna walidacja tras i interakcji:

```bash
npm run test:smoke
```

## Architektura informacji

```text
/
├── chirurgia-plastyczna/
│   ├── plastyka-powiek/
│   ├── lifting-twarzy/
│   ├── rynoplastyka/
│   ├── chirurgia-piersi/
│   ├── abdominoplastyka/
│   └── liposukcja/
├── medycyna-estetyczna/
│   ├── toksyna-botulinowa/
│   ├── laseroterapia/
│   ├── radiofrekwencja-mikroiglowa/
│   ├── biostymulacja/
│   ├── leczenie-blizn/
│   └── wolumetria/
├── lekarz/
├── konsultacja/
├── cennik/
├── faq/
└── kontakt/
```

Szczegółowe decyzje produktowe i techniczne: [`docs/site-architecture.md`](docs/site-architecture.md).

## Struktura kodu

- `src/content/site.ts` — treści PL/EN, procedury, relacje, ceny i SEO,
- `src/app/router.tsx` — mapa tras,
- `src/components/SiteLayout.tsx` — header, menu desktop/mobile, route focus i footer,
- `src/pages/` — layouty strony głównej, kategorii, procedur i stron informacyjnych,
- `src/components/Seo.tsx` — title, description, canonical, Open Graph i robots,
- `public/404.html` — obsługa głębokich linków GitHub Pages,
- `tests/smoke.spec.ts` — macierz tras, dostępność, formularz, SEO i responsive QA.

## Obrazy

Publiczna allowlista obrazów znajduje się w `public/assets/`. Jedyny portret osobowy używany w serwisie przedstawia lek. Huberta Gziuta. Serwis nie wykorzystuje zdjęć before/after ani sztucznie generowanych rezultatów zabiegów.

## Treści medyczne

- mają charakter edukacyjny,
- nie zastępują konsultacji,
- nie gwarantują efektu ani przebiegu gojenia,
- wskazują na konieczność indywidualnej kwalifikacji,
- ceny są orientacyjne,
- formularz kontaktowy jest demonstracyjny i nie wysyła danych.

## GitHub Pages

Vite używa bazy `/DrGziut-webpage/`. Znane trasy obsługuje React Router, a bezpośrednie wejścia są odtwarzane przez `public/404.html` i skrypt w `index.html`. Publikacja odbywa się przez workflow w `.github/workflows/deploy.yml`.
