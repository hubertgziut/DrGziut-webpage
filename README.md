# DrGziut — immersive physician website

Dwujęzyczna, jednoekranowa narracja dla lek. Huberta Gziuta, specjalisty chirurgii plastycznej w Szczecinie, oferującego również konsultacje z zakresu medycyny estetycznej.

## Stack i uruchomienie

- React 18 + TypeScript + Vite
- natywna nawigacja kotwicowa, bez routera
- sceny scroll-driven oparte na `IntersectionObserver` i parallax ograniczony przez `requestAnimationFrame`
- Playwright dla QA funkcjonalnego, dostępnościowego i responsywnego
- baza GitHub Pages: `/DrGziut-webpage/`

```bash
npm install
npm run dev
npm run build
npm run test:smoke
```

Pierwsze lokalne uruchomienie Playwright może wymagać:

```bash
npx playwright install chromium
```

`npm run test:smoke` wykonuje build, serwuje gotowy bundle bezpośrednio w kontrolowanym kontekście testowym, sprawdza szerokości 360, 390, 768 i 1440 px oraz zapisuje zrzuty w `artifacts/`.

## Pochodzenie treści i materiałów

- `public/assets/brand/doctor-hubert.jpg` to autentyczny, zweryfikowany wizualnie kadr przedstawiający wyłącznie Huberta Gziuta; pliku nie należy zastępować syntetycznym portretem.
- Dane lekarza, NPWZ, zakres edukacji, telefon, e-mail i adres odpowiadają zaakceptowanej treści projektu.
- `hero.jpg`, `clinic.jpg`, `silk.jpg`, `precision.jpg`, `bg-surgery.jpg`, `bg-aesthetic.jpg` i `bg-tech.jpg` to odziedziczone z przywróconego projektu, filmowe materiały koncepcyjne bez osób. Przed publikacją należy potwierdzić ich ostateczną licencję i zgodę na użycie.
- Logotypy pochodzą z odziedziczonego zestawu marki.
- Pozycje cenowe są ograniczone do zachowanego cennika źródłowego i prezentowane jako orientacyjne „od”; wymagają potwierdzenia przed publikacją.

## Zasada „no women / no before-after”

Projekt nie zawiera wizerunków kobiet, par, pacjentów ani galerii przed/po. Dotyczy to również zasobów nieużywanych, nazw plików, tekstów alternatywnych i teł CSS. Test smoke wymusza zamkniętą listę dozwolonych plików graficznych. Nie należy dodawać fotografii rezultatów leczenia.

## Formularz demonstracyjny

Formularz działa wyłącznie w lokalnym stanie interfejsu: nie wysyła, nie zapisuje i nie przetwarza danych. Komunikaty przed i po zatwierdzeniu wyraźnie informują o trybie demonstracyjnym. Nie należy wpisywać numeru PESEL, dokumentacji medycznej, skanów ani innych danych wrażliwych.

## Lista przed publikacją

- podłączyć zaakceptowany, szyfrowany kanał obsługi zgłoszeń albo pozostawić tylko bezpośredni telefon i e-mail;
- przygotować obowiązek informacyjny, politykę prywatności, podstawę prawną zgód i ewentualny mechanizm cookies zgodny z RODO;
- przeprowadzić przegląd prawny treści medycznych i oznaczeń reklamowych;
- ponownie potwierdzić dane lekarza, adres, zakres procedur i ceny;
- potwierdzić licencje wszystkich grafik i fontów;
- skonfigurować domenę, canonical URL, finalne metadane społecznościowe i analitykę dopiero po uzyskaniu wymaganych zgód;
- podłączyć bezpieczny backend tylko po ustaleniu retencji, kontroli dostępu i procedury obsługi danych;
- wykonać końcowy audyt WCAG 2.1 AA na środowisku produkcyjnym.

Treści strony mają charakter informacyjny i nie zastępują indywidualnej konsultacji lekarskiej.
