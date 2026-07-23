import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { spawnSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import {
  categories,
  categoryPath,
  procedurePath,
  procedures,
  siteContent,
  staticPaths,
} from "../src/content/site";

const routes = [
  { path: "/", heading: /Precyzja/ },
  { path: "/chirurgia-plastyczna", heading: /Zmiana planowana/ },
  { path: "/chirurgia-plastyczna/plastyka-powiek", heading: /Plastyka powiek/ },
  { path: "/chirurgia-plastyczna/lifting-twarzy", heading: /Lifting twarzy/ },
  { path: "/chirurgia-plastyczna/rynoplastyka", heading: /Rynoplastyka/ },
  { path: "/chirurgia-plastyczna/chirurgia-piersi", heading: /Chirurgia piersi/ },
  { path: "/chirurgia-plastyczna/abdominoplastyka", heading: /Abdominoplastyka/ },
  { path: "/chirurgia-plastyczna/liposukcja", heading: /Liposukcja/ },
  { path: "/medycyna-estetyczna", heading: /Mniej interwencji/ },
  { path: "/medycyna-estetyczna/toksyna-botulinowa", heading: /Toksyna botulinowa/ },
  { path: "/medycyna-estetyczna/laseroterapia", heading: /Laseroterapia/ },
  { path: "/medycyna-estetyczna/radiofrekwencja-mikroiglowa", heading: /Radiofrekwencja mikroigłowa/ },
  { path: "/medycyna-estetyczna/biostymulacja", heading: /Biostymulacja/ },
  { path: "/medycyna-estetyczna/leczenie-blizn", heading: /Leczenie blizn/ },
  { path: "/medycyna-estetyczna/wolumetria", heading: /Wolumetria/ },
  { path: "/lekarz", heading: /Hubert Gziut/ },
  { path: "/konsultacja", heading: /Spokojna rozmowa/ },
  { path: "/cennik", heading: /Przejrzystość/ },
  { path: "/faq", heading: /Pytania/ },
  { path: "/kontakt", heading: /Wybierz prosty sposób kontaktu/ },
] as const;

const allowedAssetPaths = [
  "bg-aesthetic.jpg",
  "bg-surgery.jpg",
  "bg-tech.jpg",
  "brand/doctor-hubert-faq.jpg",
  "brand/doctor-hubert.jpg",
  "clinic.jpg",
  "hero.jpg",
  "precision.jpg",
] as const;

const allowedAssetNames = new Set(allowedAssetPaths.map((path) => basename(path)));
const assetRoot = fileURLToPath(new URL("../public/assets/", import.meta.url));
const distRoot = fileURLToPath(new URL("../dist/", import.meta.url));
const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const productionBase = "https://hubertgziut.github.io/DrGziut-webpage";
const productionCanonical = (routePath: string) =>
  routePath === "/" ? `${productionBase}/` : `${productionBase}${routePath.replace(/\/$/, "")}/`;

function sitemapPaths() {
  const sitemap = readFileSync(new URL("../public/sitemap.xml", import.meta.url), "utf8");
  return Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g), ([, location]) => {
    const path = new URL(location).pathname.replace(/^\/DrGziut-webpage(?=\/|$)/, "");
    return path || "/";
  });
}

function listAssetFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = join(directory, entry.name);
    return entry.isDirectory() ? listAssetFiles(absolutePath) : [absolutePath];
  });
}

function routeUrl(path: string) {
  return path === "/" ? "./" : path.slice(1);
}

async function assertPageHealth(page: Page, path: string, heading: RegExp) {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  const response = await page.goto(routeUrl(path), { waitUntil: "domcontentloaded" });
  expect(response?.status()).toBe(200);
  await expect(page.getByTestId("hero-title")).toBeVisible();
  await expect(page.getByTestId("hero-title")).toHaveText(heading);
  const description = await page.locator('meta[name="description"]').getAttribute("content");
  expect(description?.length).toBeGreaterThan(40);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(path === "/" ? "DrGziut-webpage/?$" : path));
  expect(pageErrors).toEqual([]);

  const images = page.locator("img");
  for (let index = 0; index < await images.count(); index += 1) {
    await images.nth(index).scrollIntoViewIfNeeded();
  }
  await page.waitForFunction(() =>
    Array.from(document.images).every((image) => image.complete),
  );
  const imageState = await images.evaluateAll((nodes) =>
    nodes.map((node) => {
      const image = node as HTMLImageElement;
      return { src: image.getAttribute("src"), complete: image.complete, width: image.naturalWidth };
    }),
  );
  for (const image of imageState) {
    expect(image.complete, image.src ?? "image").toBe(true);
    expect(image.width, image.src ?? "image").toBeGreaterThan(0);
    if (image.src?.includes("/assets/")) {
      expect(allowedAssetNames.has(image.src.split("/").pop() ?? ""), image.src).toBe(true);
    }
  }

  const html = await page.locator("body").innerHTML();
  expect(html).not.toMatch(/Paulina|woman|couple|panstwo-gziut|doctor\.png|doctor-2|clinic-1|clinic-2/i);
}

test.describe("route matrix", () => {
  for (const route of routes) {
    test(`${route.path} renders as a distinct page`, async ({ page }) => {
      await assertPageHealth(page, route.path, route.heading);
      if (route.path !== "/") await expect(page.getByTestId("breadcrumbs")).toBeVisible();
    });
  }
});

test("sitemap exactly matches all published routes", () => {
  const actualSitemapPaths = sitemapPaths().sort();
  const expectedPaths = [
    ...Object.values(staticPaths),
    ...Object.values(categories).map(categoryPath),
    ...procedures.map(procedurePath),
  ]
    .map((path) => (path === "/" ? "/" : `${path}/`))
    .sort();

  expect(actualSitemapPaths).toEqual(expectedPaths);
  expect(new Set(actualSitemapPaths).size).toBe(actualSitemapPaths.length);
});

test("Hybrid H1 build emits a route-aware static document for every sitemap URL", () => {
  for (const path of sitemapPaths()) {
    const relativePath = path === "/" ? "" : path.replace(/^\//, "");
    const documentPath = join(distRoot, relativePath, "index.html");
    expect(existsSync(documentPath), `${path} should have a static document`).toBe(true);

    const html = readFileSync(documentPath, "utf8");
    const canonical = productionCanonical(path);
    expect(html, `${path} should have route-aware title metadata`).toMatch(/<title>[^<]{8,}<\/title>/i);
    expect(html, `${path} should have route-aware description metadata`).toMatch(/<meta\s+name="description"\s+content="[^"]{40,}"/i);
    expect(html, `${path} should expose its exact production canonical`).toContain(
      `<link rel="canonical" href="${canonical}">`,
    );
  }
});

test("runtime canonical URLs follow GitHub Pages trailing-slash URLs", async ({ page }) => {
  await page.goto("kontakt");
  const canonicalHref = await page.locator('link[rel="canonical"]').getAttribute("href");
  const openGraphUrl = await page.locator('meta[property="og:url"]').getAttribute("content");
  expect(canonicalHref).not.toBeNull();
  expect(openGraphUrl).not.toBeNull();
  expect(new URL(canonicalHref!).pathname).toBe("/DrGziut-webpage/kontakt/");
  expect(new URL(openGraphUrl!).pathname).toBe("/DrGziut-webpage/kontakt/");
  await page.goto("./");
  const rootCanonical = await page.locator('link[rel="canonical"]').getAttribute("href");
  expect(rootCanonical).not.toBeNull();
  expect(new URL(rootCanonical!).pathname).toBe("/DrGziut-webpage/");
});

test("static generator rejects filesystem-normalized duplicate routes", () => {
  const sitemapPath = join(distRoot, "sitemap.xml");
  const originalSitemap = readFileSync(sitemapPath, "utf8");
  const collision = [
    "  <url><loc>https://hubertgziut.github.io/DrGziut-webpage/foo//bar/</loc></url>",
    "  <url><loc>https://hubertgziut.github.io/DrGziut-webpage/foo/bar/</loc></url>",
  ].join("\n");
  writeFileSync(sitemapPath, originalSitemap.replace("</urlset>", `${collision}\n</urlset>`));
  let result: ReturnType<typeof spawnSync> | undefined;
  try {
    result = spawnSync(process.execPath, [join(projectRoot, "scripts/generate-static-routes.mjs")], {
      cwd: projectRoot,
      encoding: "utf8",
      timeout: 30_000,
    });
  } finally {
    writeFileSync(sitemapPath, originalSitemap);
  }
  expect(result).toBeDefined();
  expect(result?.status).not.toBe(0);
  expect(`${result?.stdout ?? ""}${result?.stderr ?? ""}`).toContain("Non-canonical sitemap route");
});

test("static generator rejects a single percent-encoded noncanonical route", () => {
  const sitemapPath = join(distRoot, "sitemap.xml");
  const originalSitemap = readFileSync(sitemapPath, "utf8");
  const encodedRoute = "  <url><loc>https://hubertgziut.github.io/DrGziut-webpage/f%61q/</loc></url>";
  writeFileSync(sitemapPath, originalSitemap.replace("</urlset>", `${encodedRoute}\n</urlset>`));
  let result: ReturnType<typeof spawnSync> | undefined;
  try {
    result = spawnSync(process.execPath, [join(projectRoot, "scripts/generate-static-routes.mjs")], {
      cwd: projectRoot,
      encoding: "utf8",
      timeout: 30_000,
    });
  } finally {
    writeFileSync(sitemapPath, originalSitemap);
  }
  expect(result).toBeDefined();
  expect(result?.status).not.toBe(0);
  expect(`${result?.stdout ?? ""}${result?.stderr ?? ""}`).toContain("Non-canonical sitemap route");
});

test("static generator rejects raw URL aliases before URL normalization", () => {
  const sitemapPath = join(distRoot, "sitemap.xml");
  const originalSitemap = readFileSync(sitemapPath, "utf8");
  const aliases = [
    "https://hubertgziut.github.io/DrGziut-webpage/foo/../bar/",
    "https://hubertgziut.github.io/DrGziut-webpage/foo/%2e%2e/bar/",
    "https://hubertgziut.github.io:443/DrGziut-webpage/faq/",
    "https://HUBERTGZIUT.GITHUB.IO/DrGziut-webpage/faq/",
    "https://user:sensitive-marker@",
  ];
  for (const alias of aliases) {
    const sitemapEntry = `  <url><loc>${alias}</loc></url>`;
    writeFileSync(sitemapPath, originalSitemap.replace("</urlset>", `${sitemapEntry}\n</urlset>`));
    let result: ReturnType<typeof spawnSync> | undefined;
    try {
      result = spawnSync(process.execPath, [join(projectRoot, "scripts/generate-static-routes.mjs")], {
        cwd: projectRoot,
        encoding: "utf8",
        timeout: 30_000,
      });
    } finally {
      writeFileSync(sitemapPath, originalSitemap);
    }
    expect(result).toBeDefined();
    expect(result?.status).not.toBe(0);
    const output = `${result?.stdout ?? ""}${result?.stderr ?? ""}`;
    expect(output).toContain("Invalid sitemap URL for static generation");
    expect(output).not.toContain("sensitive-marker");
  }
});

test("static generator rejects a duplicated canonical sitemap route", () => {
  const sitemapPath = join(distRoot, "sitemap.xml");
  const originalSitemap = readFileSync(sitemapPath, "utf8");
  const duplicateRoute =
    "  <url><loc>https://hubertgziut.github.io/DrGziut-webpage/faq/</loc></url>";
  writeFileSync(sitemapPath, originalSitemap.replace("</urlset>", `${duplicateRoute}\n</urlset>`));
  let result: ReturnType<typeof spawnSync> | undefined;
  try {
    result = spawnSync(process.execPath, [join(projectRoot, "scripts/generate-static-routes.mjs")], {
      cwd: projectRoot,
      encoding: "utf8",
      timeout: 30_000,
    });
  } finally {
    writeFileSync(sitemapPath, originalSitemap);
  }
  expect(result).toBeDefined();
  expect(result?.status).not.toBe(0);
  expect(`${result?.stdout ?? ""}${result?.stderr ?? ""}`).toContain(
    "Duplicate normalized sitemap route",
  );
});

test("public assets exactly match the reviewed allowlist", () => {
  const actualAssets = listAssetFiles(assetRoot)
    .map((path) => relative(assetRoot, path).split("\\").join("/"))
    .sort();

  expect(actualAssets).toEqual([...allowedAssetPaths].sort());
});

test("reviewed physician photos render with stable intrinsic geometry on the doctor page", async ({ page }) => {
  await page.goto("lekarz");
  const portrait = page.getByTestId("doctor-portrait-image");

  await expect(portrait).toBeVisible();
  await expect(portrait).toHaveAttribute("src", /\/assets\/brand\/doctor-hubert\.jpg$/);
  await expect(portrait).toHaveAttribute("alt", "Lekarz Hubert Gziut, specjalista chirurgii plastycznej");
  await expect(portrait).toHaveAttribute("width", "960");
  await expect(portrait).toHaveAttribute("height", "1280");
  await expect(portrait).toHaveAttribute("loading", "lazy");
  await expect(portrait).toHaveCSS("object-fit", "cover");
  expect(await portrait.evaluate((image: HTMLImageElement) => [image.naturalWidth, image.naturalHeight])).toEqual([960, 1280]);

  await page.getByTestId("language-en").click();
  await expect(portrait).toHaveAttribute("alt", "Hubert Gziut, MD, plastic surgery specialist");
});

test("reviewed physician photos add an accessible editorial image to FAQ", async ({ page }) => {
  await page.goto("faq");
  const image = page.getByTestId("faq-physician-image");

  await expect(image).toBeVisible();
  await expect(image).toHaveAttribute("src", /\/assets\/brand\/doctor-hubert-faq\.jpg$/);
  await expect(image).toHaveAttribute("alt", "Lekarz Hubert Gziut w sali operacyjnej");
  await expect(image).toHaveAttribute("width", "960");
  await expect(image).toHaveAttribute("height", "1280");
  await expect(image).toHaveAttribute("loading", "lazy");
  await expect(image).toHaveCSS("object-fit", "cover");
  expect(await image.evaluate((node: HTMLImageElement) => [node.naturalWidth, node.naturalHeight])).toEqual([960, 1280]);

  await page.getByTestId("language-en").click();
  await expect(image).toHaveAttribute("alt", "Hubert Gziut, MD, in an operating room");
  await expect(page.locator(".faq-item")).toHaveCount(6);
});

test("desktop offer menu links to both disciplines", async ({ page }) => {
  await page.goto("./");
  const trigger = page.getByTestId("desktop-offer-trigger");
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#desktop-offer-menu")).toBeVisible();
  await page.getByRole("link", { name: "Chirurgia plastyczna", exact: true }).first().click();
  await expect(page).toHaveURL(/\/chirurgia-plastyczna$/);
  await expect(page.getByTestId("hero-title")).toContainText("Zmiana planowana");
  await expect(page.locator("#main-content")).toBeFocused();
  await expect(page.locator("#main-content")).toHaveCSS("outline-style", "solid");
});

test("desktop header labels share one visual baseline", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("./");
  const labels = page.locator(".desktop-nav > a, .desktop-offer-trigger");
  await expect(labels).toHaveCount(6);
  const textCenters = await labels.evaluateAll((elements) =>
    elements.map((element) => {
      const textNode = Array.from(element.childNodes).find(
        (node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim(),
      );
      if (!textNode) throw new Error(`Missing direct text node in ${element.className}`);
      const range = document.createRange();
      range.selectNode(textNode);
      const box = range.getBoundingClientRect();
      return box.top + box.height / 2;
    }),
  );
  expect(Math.max(...textCenters) - Math.min(...textCenters)).toBeLessThanOrEqual(1);
});

test("Airy iOS uses an ivory canvas and rounded surface hierarchy", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("./");
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(244, 240, 231)");
  await expect(page.locator("main > section").first()).toHaveCSS("border-radius", "42px");
  await page.goto("chirurgia-plastyczna");
  await expect(page.locator(".procedure-card").first()).toHaveCSS("border-radius", "29px");
  await page.goto("chirurgia-plastyczna/plastyka-powiek");
  await expect(page.locator(".procedure-local-nav")).toHaveCSS("background-color", "rgba(255, 253, 248, 0.94)");
  await expect(page.locator(".procedure-local-nav")).toHaveCSS("border-radius", "29px");
});

test("skip link is keyboard-only and moves focus to main content", async ({ page }) => {
  await page.goto("./");
  const skipLink = page.getByRole("link", { name: "Przejdź do treści" });
  await expect(skipLink).toHaveCSS("opacity", "0");
  await page.keyboard.press("Tab");
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toHaveCSS("opacity", "1");
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
});

test("language switch persists and changes routed content", async ({ page }) => {
  await page.goto("./");
  await page.getByTestId("language-en").click();
  await expect(page.getByTestId("hero-title")).toContainText("Precision");
  await page.goto("medycyna-estetyczna");
  await expect(page.getByTestId("hero-title")).toContainText("Less intervention");
  await page.reload();
  await expect(page.getByTestId("hero-title")).toContainText("Less intervention");
  expect(await page.evaluate(() => document.documentElement.lang)).toBe("en");
});

test("mobile menu traps focus, closes with Escape, and restores trigger focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("./");
  const trigger = page.getByTestId("menu-trigger");
  await trigger.click();
  const menu = page.getByTestId("mobile-menu");
  await expect(menu).toHaveAttribute("aria-hidden", "false");
  await expect(page.locator("#main-content")).toHaveAttribute("inert", "");
  await expect(menu.locator(":focus")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu).toHaveAttribute("aria-hidden", "true");
  await expect(trigger).toBeFocused();
});

test("Hybrid H1 procedure guide exposes five safe anchors and mobile edge fades", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("chirurgia-plastyczna/plastyka-powiek");

  const guide = page.getByTestId("procedure-local-nav");
  await expect(page.getByTestId("procedure-hero-guide")).toContainText("Konsultacja lekarska");
  await expect(guide.getByRole("link")).toHaveCount(5);
  await expect(guide).toHaveAttribute("data-at-start", "true");

  for (const anchor of ["ocena", "zakres", "opieka", "cena", "konsultacja"]) {
    await expect(guide.locator(`a[href="#${anchor}"]`)).toHaveCount(1);
    await expect(page.locator(`#${anchor}`)).toHaveCount(1);
  }

  const track = page.getByTestId("procedure-local-nav-track");
  await track.evaluate((element) => {
    element.scrollLeft = element.scrollWidth;
  });
  await expect(guide).toHaveAttribute("data-at-end", "true");
  const priceLink = guide.locator('a[href="#cena"]');
  await priceLink.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#cena$/);
  await expect(page.locator("#cena")).toBeFocused();
  await expect
    .poll(async () => (await page.locator("#cena").boundingBox())?.y ?? 999)
    .toBeLessThan(260);
  const priceBox = await page.locator("#cena").boundingBox();
  expect(priceBox?.y ?? 0).toBeGreaterThanOrEqual(64);

  await page.getByTestId("language-en").click();
  await expect(page.getByTestId("procedure-hero-guide")).toContainText("Medical consultation");

  await page.goto("chirurgia-plastyczna/plastyka-powiek#cena");
  await expect(page.locator("#cena")).toBeFocused();
  await expect
    .poll(async () => (await page.locator("#cena").boundingBox())?.y ?? 999)
    .toBeLessThan(260);
});

test("Hybrid H1 FAQ has six questions, category filters and accessible accordion state", async ({ page }) => {
  await page.goto("faq");
  const filters = page.getByTestId("faq-filters");
  const items = page.locator(".faq-item");
  await expect(filters.getByRole("button")).toHaveCount(5);
  await expect(items).toHaveCount(6);

  const firstAnswer = items.nth(0).locator(".faq-answer");
  const secondItem = items.nth(1);
  const secondButton = secondItem.getByRole("button");
  const secondAnswer = secondItem.locator(".faq-answer");

  await expect(firstAnswer).toBeVisible();
  await expect(secondButton).toHaveAttribute("aria-expanded", "false");
  await expect(secondAnswer).toBeHidden();
  await secondButton.click();
  await expect(secondButton).toHaveAttribute("aria-expanded", "true");
  await expect(secondAnswer).toBeVisible();
  await secondButton.click();
  await expect(secondAnswer).toBeHidden();

  const procedureFilter = filters.getByRole("button", { name: "Procedury", exact: true });
  await procedureFilter.click();
  await expect(procedureFilter).toHaveAttribute("aria-pressed", "true");
  await expect(items).toHaveCount(1);
  await filters.getByRole("button", { name: "Wszystkie", exact: true }).click();
  await expect(items).toHaveCount(6);
});

test("header and footer use text-only wordmarks", async ({ page }) => {
  await page.goto("./");
  await expect(page.locator(".brand-wordmark")).toBeVisible();
  await expect(page.locator(".brand img")).toHaveCount(0);
  await expect(page.locator(".site-header .header-cta, .site-header .header-phone")).toHaveCount(0);
  await page.locator(".site-footer").scrollIntoViewIfNeeded();
  await expect(page.locator(".footer-wordmark")).toBeVisible();
  await expect(page.locator(".footer-brand img")).toHaveCount(0);
});

test("Hybrid H1 contact is privacy-first and offers direct phone, WhatsApp and SMS channels", async ({ page }) => {
  await page.goto("kontakt");
  await expect(page.getByTestId("demo-form")).toHaveCount(0);

  const privacyNote = page.getByTestId("contact-privacy-note");
  const channels = page.getByTestId("contact-channel-list");
  await expect(privacyNote).toContainText("Nie przesyłaj danych o zdrowiu");
  await expect(page.getByText("od 300 zł", { exact: true })).toBeVisible();
  expect(
    await page.evaluate(() => {
      const note = document.querySelector('[data-testid="contact-privacy-note"]');
      const channelList = document.querySelector('[data-testid="contact-channel-list"]');
      return Boolean(
        note &&
          channelList &&
          note.compareDocumentPosition(channelList) & Node.DOCUMENT_POSITION_FOLLOWING,
      );
    }),
  ).toBe(true);

  await expect(channels.getByRole("link")).toHaveCount(3);
  await expect(page.locator('.contact-page a[href^="mailto:"]')).toHaveCount(0);
  await expect(page.locator(".contact-page")).toContainText(siteContent.contact.email);
  const expectedPhoneHref = siteContent.contact.phoneHref;
  const expectedSmsHref = expectedPhoneHref.replace(/^tel:/, "sms:");
  const expectedWhatsAppHref = `https://wa.me/${expectedPhoneHref.replace(/\D/g, "")}`;
  const displayDigits = siteContent.contact.phoneDisplay.replace(/\D/g, "");
  expect(expectedPhoneHref).toMatch(/^tel:\+48\d{9}$/);
  expect(expectedSmsHref).toMatch(/^sms:\+48\d{9}$/);
  expect(expectedWhatsAppHref).toMatch(/^https:\/\/wa\.me\/48\d{9}$/);
  expect(expectedPhoneHref.replace(/\D/g, "")).toBe(displayDigits);
  await expect(channels.locator('a[href^="tel:"]')).toHaveAttribute("href", expectedPhoneHref);
  await expect(channels.locator('a[href^="https://wa.me/"]')).toHaveAttribute("href", expectedWhatsAppHref);
  await expect(channels.locator('a[href^="sms:"]')).toHaveAttribute("href", expectedSmsHref);

  await page.getByTestId("language-en").click();
  await expect(privacyNote).toContainText("Do not send health information");
});

test("Hybrid H1 representative routes have no serious or critical Axe WCAG violations", async ({ page }) => {
  for (const viewport of [
    { width: 390, height: 844 },
    { width: 1440, height: 1000 },
  ]) {
    await page.setViewportSize(viewport);
    for (const path of ["chirurgia-plastyczna/plastyka-powiek", "kontakt", "faq"]) {
      await page.goto(path);
      await page.locator("#page-title").waitFor({ state: "visible" });
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      const blocking = results.violations
        .filter((violation) => violation.impact === "serious" || violation.impact === "critical")
        .map((violation) => ({
          id: violation.id,
          impact: violation.impact,
          nodes: violation.nodes.map((node) => ({ target: node.target, summary: node.failureSummary })),
        }));
      expect(
        blocking,
        `${path} @ ${viewport.width}px should pass Axe serious/critical checks`,
      ).toEqual([]);
    }
  }
});

test("unknown route renders an in-app noindex 404", async ({ page }) => {
  const response = await page.goto("nie-ma-takiej-strony");
  expect(response?.status()).toBe(200);
  await expect(page.getByTestId("hero-title")).toContainText("Ta strona nie istnieje");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
});

test("selected routes have no horizontal overflow on phone, tablet and desktop", async ({ page }) => {
  for (const viewport of [
    { width: 360, height: 800 },
    { width: 768, height: 1024 },
    { width: 1440, height: 1000 },
  ]) {
    await page.setViewportSize(viewport);
    for (const path of ["/", "/chirurgia-plastyczna", "/chirurgia-plastyczna/plastyka-powiek", "/kontakt"]) {
      await page.goto(routeUrl(path));
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, `${path} @ ${viewport.width}px`).toBeLessThanOrEqual(1);
    }
  }
});

test("reduced motion preference disables multipage transitions", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("./");
  const duration = await page.locator(".procedure-card").first().evaluate((element) =>
    Number.parseFloat(getComputedStyle(element).transitionDuration),
  );
  expect(duration).toBeLessThanOrEqual(0.001);

  await page.goto("faq");
  const faqIconDuration = await page.locator(".faq-item > button i").first().evaluate((element) =>
    Number.parseFloat(getComputedStyle(element).transitionDuration),
  );
  expect(faqIconDuration).toBeLessThanOrEqual(0.001);
});

test("sitemap and robots expose discoverable routes", async ({ request }) => {
  const sitemap = await request.get("sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  expect(xml).toContain("chirurgia-plastyczna/plastyka-powiek");
  expect(xml).toContain("medycyna-estetyczna/toksyna-botulinowa");
  const robots = await request.get("robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain("Sitemap:");
});
