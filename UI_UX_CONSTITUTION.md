# UI/UX Constitution — DrGziut

> This file is authoritative for UI/UX evolution. Agents may read it freely but may modify it only after an explicit user request approving a constitution change.

## Product

- Product name: DrGziut.
- Product purpose: edukacyjna, profesjonalna prezentacja praktyki lek. Huberta Gziuta oraz bezpośrednia ścieżka do konsultacji.
- Target users: osoby dorosłe rozważające konsultację z zakresu chirurgii plastycznej lub medycyny estetycznej; język polski jest podstawowy, angielski równorzędnie dostępny.
- Primary platforms: responsywna strona WWW wdrażana jako Vite SPA na GitHub Pages.
- Supported viewport matrix: 360×800, 390×844, 768×1024, 1024×768 i 1440×1000; dodatkowe szerokości nie mogą powodować poziomego overflow.

## Non-negotiable principles

- Homepage pozostaje krótką bramą do dwóch równorzędnych dziedzin, a nie rozbudowanym landing page'em.
- Nawigacja, breadcrumbs i bezpośrednie wejścia na głębokie trasy muszą być przewidywalne.
- Chirurgia plastyczna i medycyna estetyczna mają równorzędną rangę wizualną i informacyjną.
- Treści medyczne są edukacyjne: bez diagnozowania, gwarancji wyniku, obietnic efektu i bezwarunkowych zapewnień o bezpieczeństwie.
- Konsultacja i kwalifikacja lekarska poprzedzają decyzję o zabiegu; ceny są wyłącznie orientacyjne.
- Nie tworzyć ani nie publikować fałszywych zdjęć before/after.
- Nie używać wizerunku ani fragmentu kobiety, także dłoni, włosów, sylwetki lub postaci w tle. Nie używać Pauliny Gziut ani odniesień do niej.
- Jedyny zatwierdzony portret osobowy to `public/assets/brand/doctor-hubert.jpg`.
- Zakazane assety i wzorce: `woman`, `couple`, `panstwo-gziut`, `doctor.png`, `doctor-2`, `clinic-1`, `clinic-2`, `logo-horizontal`, `logo-light`.
- Logo pozostaje tekstowym wordmarkiem `DR GZIUT`; nie stosować znaków z profilem twarzy.
- Formularz pozostaje demonstracyjny i nie wysyła ani nie zapisuje danych. Nie wolno sugerować działania backendu, którego nie ma.
- Prywatność pacjentów i brak danych wrażliwych mają pierwszeństwo przed konwersją.
- Każda zmiana interfejsu musi poprawiać mierzalny problem, a nie tylko zwiększać dekoracyjność.

## Visual language

- Brand attributes: premium, spokojny, precyzyjny, medyczny, editorial, bez ostentacji.
- Color system: niemal białe tło w odcieniach kremu i kości słoniowej, ciemne teksty oraz oszczędne akcenty sage i brass/gold; kontrast musi pozostać dostępny.
- Typography: Cormorant Garamond dla nagłówków, Inter dla tekstów użytkowych; czytelność ma pierwszeństwo przed ekspresją.
- Spacing: duży oddech w hero i sekcjach editorial, mniejszy w formularzach, FAQ i elementach operacyjnych; zachować spójny rytm.
- Radius: język Airy iOS — wyraźnie zaokrąglone zewnętrzne rogi głównych sekcji, kart, paneli, zdjęć i kontrolek; zachować hierarchię promieni zamiast jednego radiusu wszędzie.
- Surfaces: jasne kremowe wyspy oddzielone od tła oddechem i subtelnym cieniem; karty tylko tam, gdzie wspierają skanowanie informacji, bez monotonnej siatki identycznych kafli.
- Iconography: prosta i neutralna; bez twarzy, profili, sylwetek lub znaków mogących sugerować konkretną osobę.
- Motion: spokojny i funkcjonalny; wymagane pełne wsparcie `prefers-reduced-motion`.
- Density: editorial na stronach wizerunkowych, kompaktowa i zadaniowa w FAQ, cenniku, konsultacji i kontakcie.

## Interaction policy

- Navigation: desktopowe menu i mobilny dialog zachowują te same trasy; mobile wymaga focus trap, `Escape`, przywrócenia fokusu i blokady tła.
- Route changes: po zmianie trasy fokus przechodzi do `#main-content` z widocznym outline; pierwszy mount nie może przejmować fokusu skip linku.
- Selection and disclosure: stan wizualny musi odpowiadać `aria-expanded`/`aria-hidden`; treści zwinięte nie mogą pozostawać widoczne.
- Destructive actions: brak w publicznym interfejsie; przyszłe operacje wymagają potwierdzenia i bezpiecznego cofnięcia.
- Notifications: komunikaty muszą jasno odróżniać demonstrację, sukces, błąd i brak transmisji danych.
- Empty/loading/error/success states: zaprojektować, jeśli dana funkcja je posiada; aplikacyjna 404 musi mieć `noindex`.
- Keyboard: skip link, logiczna kolejność Tab, widoczny fokus, pełna obsługa menu, FAQ i formularza.
- Touch: cele dotykowe minimum 44×44 px tam, gdzie jest to praktyczne; brak hover-only controls.
- Language: przełącznik PL/EN zachowuje bieżącą trasę i nie ukrywa funkcji w żadnym języku.

## Evolution workflow

- Analiza może działać autonomicznie; implementacja zawsze wymaga zatwierdzenia ponumerowanej propozycji.
- Każda zmiana widoczna dla użytkownika wymaga przed implementacją artefaktu wizualnego dla minimum desktopu i mobile, uzasadnienia oraz jawnej akceptacji.
- Zaakceptowany koncept zostaje zapisany jako zamrożona specyfikacja wizualna; implementacja nie może od niej dryfować bez ponownej decyzji.
- Kod powstaje w izolowanym worktree z jednym writerem; autor nie wykonuje końcowego niezależnego review.
- Wymagane bramki: build, pełny Playwright, klawiatura, reduced motion, brak overflow, dokładna allowlista assetów, screenshoty i niezależny review.
- Publikacja produkcyjna jest osobną operacją i wymaga oddzielnej wyraźnej zgody po zakończeniu QA.
- Pętla nie wprowadza zmian wyłącznie po to, aby pozostać aktywna; brak poprawy o dodatniej wartości kończy cykl wynikiem `no-change`.

## Baseline success measures

- Błędy JavaScript i nieudane requesty same-origin: 0 w macierzy QA.
- Poziomy overflow: 0 px w wymaganych viewportach.
- Publiczne obrazy: 100% załadowane i zgodne z zatwierdzoną allowlistą oraz kontrolą wizualną.
- Nawigacja klawiaturą i mobilna: wszystkie wymagane ścieżki przechodzą testy.
- Wszystkie opublikowane trasy odpowiadają modelowi treści, sitemapie, canonicalom i deep-link fallbackowi.
- Proponowana zmiana musi mieć przed implementacją hipotezę, metrykę sukcesu i warunek rollbacku.

## Approval history

- Initial constitution created from the user's explicit request to implement Hermes Evolution for DrGziut UI/UX. It captures already approved production constraints and does not itself approve a new visual redesign or deployment.
