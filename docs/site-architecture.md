# Architektura serwisu DrGziut

## Cel

Serwis nie jest już pojedynczym landing page'em. Strona główna pełni rolę krótkiej bramy do dwóch równorzędnych obszarów, a każda kategoria, procedura i część informacyjna ma własny adres, nagłówek, breadcrumbs i metadane.

## Drzewo informacji

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
├── kontakt/
└── 404
```

## Role podstron

### Strona główna

- pozycjonuje lekarza i sposób podejmowania decyzji medycznych,
- rozdziela chirurgię plastyczną i medycynę estetyczną,
- pokazuje wybrane zagadnienia zamiast całej oferty,
- prowadzi do profilu lekarza, konsultacji i kontaktu,
- nie duplikuje pełnych treści podstron.

### Strona kategorii

- wyjaśnia rolę danej dziedziny,
- grupuje procedury według problemów i zakresu,
- opisuje wspólny proces kwalifikacji,
- prowadzi do konsultacji, FAQ i cennika.

### Strona procedury

Stały kontrakt treści:

1. breadcrumbs i jednoznaczny H1,
2. edukacyjne wprowadzenie,
3. zakres oceny podczas konsultacji,
4. najważniejsze zagadnienia: zakres, kwalifikacja, opieka,
5. informacja o ograniczeniach i braku gwarancji wyniku,
6. wyłącznie zweryfikowana cena orientacyjna albo informacja „po konsultacji”,
7. powiązane procedury,
8. CTA do konsultacji.

### Strony informacyjne

- `lekarz`: kwalifikacje, sposób pracy, NPWZ i autentyczny portret,
- `konsultacja`: przebieg, przygotowanie i bezpieczny sposób przekazywania dokumentacji,
- `cennik`: tylko zweryfikowane kwoty orientacyjne,
- `faq`: edukacyjne odpowiedzi bez indywidualnych zaleceń,
- `kontakt`: dane bezpośrednie i formularz demonstracyjny, który niczego nie wysyła.

## System nawigacji

- desktop: menu główne oraz rozwijany indeks obu kategorii,
- mobile: modalne menu z pułapką fokusu, `Escape`, przywracaniem fokusu i akordeonem oferty,
- breadcrumbs na każdej podstronie,
- stopka jako wtórna mapa strony,
- linkowanie powiązanych procedur i kolejnych kroków.

## Layouty

- `SiteLayout`: globalny header, route backdrop, focus/scroll management, footer,
- `PageHero`: hero podstrony z breadcrumbs i krótszą wysokością niż homepage,
- `CategoryPage`: intro → indeks grup → kwalifikacja → kolejne kroki,
- `ProcedurePage`: overview → konsultacja → fakty → bezpieczeństwo/cena → powiązane zabiegi,
- osobne layouty treści dla lekarza, konsultacji, cennika, FAQ, kontaktu i 404.

## Model treści

Treści znajdują się w `src/content/site.ts` jako dane PL/EN:

- informacje globalne,
- kategorie,
- procedury,
- relacje między procedurami,
- ceny,
- treści stron informacyjnych,
- metadane SEO.

Nową procedurę dodaje się w danych; karta, routing, linkowanie i sitemapę należy następnie objąć testem i aktualizacją pliku XML.

## Zasady medyczne i wizerunkowe

- brak gwarancji wyniku i obietnic efektu,
- konsultacja i kwalifikacja przed decyzją o procedurze,
- język edukacyjny, bez diagnozowania,
- ceny oznaczone jako orientacyjne,
- formularz nie przesyła danych i ostrzega przed podawaniem informacji o zdrowiu,
- jedyny portret osobowy przedstawia lek. Huberta Gziuta,
- brak Pauliny Gziut oraz wizerunków lub fragmentów kobiet.

## Dostępność

- widoczny przy fokusie skip link,
- semantyczne `header`, `nav`, `main`, `footer`, listy i nagłówki,
- focus management po zmianie trasy,
- menu mobilne z focus trap, `Escape` i inert tła,
- `aria-expanded`, `aria-current`, `aria-controls`,
- obsługa `prefers-reduced-motion`,
- brak poziomego overflow w viewportach 360, 768 i 1440 px.

## Routing i GitHub Pages

- `react-router-dom` z `BrowserRouter` i bazą Vite,
- wszystkie ścieżki działają pod `/DrGziut-webpage/`,
- `public/404.html` koduje ścieżkę głęboką i przekierowuje do aplikacji,
- `index.html` odtwarza właściwy URL przed uruchomieniem Reacta,
- dedykowane `robots.txt`, `sitemap.xml`, canonical i metadane per trasa,
- nieznane ścieżki renderują własną stronę 404 z `noindex`.

## Zakres testów

Playwright weryfikuje:

- 20 publicznych tras,
- tytuły i opisy SEO,
- canonicale i breadcrumbs,
- allowlistę obrazów,
- brak zakazanych treści i assetów,
- język PL/EN i jego trwałość,
- menu desktop/mobile i obsługę fokusu,
- demonstracyjny formularz bez requestów,
- 404, sitemapę, robots, reduced motion i overflow.
