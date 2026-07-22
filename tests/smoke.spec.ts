import { expect, test, type Page } from "@playwright/test";
import { readdirSync, readFileSync } from "node:fs";
import { basename, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import {
  categories,
  categoryPath,
  procedurePath,
  procedures,
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
  { path: "/kontakt", heading: /Zacznij od spokojnej rozmowy/ },
] as const;

const allowedAssetPaths = [
  "bg-aesthetic.jpg",
  "bg-surgery.jpg",
  "bg-tech.jpg",
  "brand/doctor-hubert.jpg",
  "clinic.jpg",
  "hero.jpg",
  "precision.jpg",
] as const;

const allowedAssetNames = new Set(allowedAssetPaths.map((path) => basename(path)));
const assetRoot = fileURLToPath(new URL("../public/assets/", import.meta.url));

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
  const sitemap = readFileSync(new URL("../public/sitemap.xml", import.meta.url), "utf8");
  const sitemapPaths = Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g), ([, location]) => {
    const path = new URL(location).pathname.replace(/^\/DrGziut-webpage(?=\/|$)/, "");
    return path || "/";
  }).sort();
  const expectedPaths = [
    ...Object.values(staticPaths),
    ...Object.values(categories).map(categoryPath),
    ...procedures.map(procedurePath),
  ].sort();

  expect(sitemapPaths).toEqual(expectedPaths);
  expect(new Set(sitemapPaths).size).toBe(sitemapPaths.length);
});

test("public assets exactly match the reviewed allowlist", () => {
  const actualAssets = listAssetFiles(assetRoot)
    .map((path) => relative(assetRoot, path).split("\\").join("/"))
    .sort();

  expect(actualAssets).toEqual([...allowedAssetPaths].sort());
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

test("FAQ answers visually follow their expanded state", async ({ page }) => {
  await page.goto("faq");
  const items = page.locator(".faq-item");
  expect(await items.count()).toBeGreaterThan(1);

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
});

test("header and footer use text-only wordmarks", async ({ page }) => {
  await page.goto("./");
  await expect(page.locator(".brand-wordmark")).toBeVisible();
  await expect(page.locator(".brand img")).toHaveCount(0);
  await page.locator(".site-footer").scrollIntoViewIfNeeded();
  await expect(page.locator(".footer-wordmark")).toBeVisible();
  await expect(page.locator(".footer-brand img")).toHaveCount(0);
});

test("demonstration form sends no request and exposes privacy warning", async ({ page }) => {
  await page.goto("kontakt");
  await expect(page.locator('a[href="tel:+48533210115"]').first()).toBeVisible();
  let dataRequests = 0;
  page.on("request", (request) => {
    if (["xhr", "fetch"].includes(request.resourceType())) dataRequests += 1;
  });
  const form = page.getByTestId("demo-form");
  await form.getByLabel("Imię i nazwisko").fill("Jan Testowy");
  await form.getByLabel("Telefon lub e-mail").fill("test@example.test");
  await form.getByLabel("Zakres konsultacji").selectOption("surgery");
  await form.getByLabel(/Rozumiem, że formularz/).check();
  await form.getByRole("button", { name: /Pokaż potwierdzenie/ }).click();
  const successHeading = page.getByTestId("form-success").getByRole("heading");
  await expect(successHeading).toBeFocused();
  await expect(successHeading).toHaveCSS("outline-style", "solid");
  expect(dataRequests).toBe(0);
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
