import { expect, test, type Page } from "@playwright/test";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { extname, join, relative, resolve, sep } from "node:path";

const blockedName = new RegExp(["pau", "lina"].join(""), "i");
const forbiddenAssetName = /panstwo-gziut|clinic-[12]|doctor(?:-2)?\.(?:png|jpe?g)|woman|couple/i;
const ignoredDirectories = new Set([".git", "node_modules", "dist", "artifacts", "test-results", "playwright-report"]);
const textExtensions = new Set([".css", ".html", ".json", ".md", ".ts", ".tsx", ".txt", ".yml", ".yaml"]);
const distRoot = resolve(process.cwd(), "dist");
const approvedAssetFiles = [
  "bg-aesthetic.jpg",
  "bg-surgery.jpg",
  "bg-tech.jpg",
  "brand/doctor-hubert.jpg",
  "brand/logo-horizontal.png",
  "brand/logo-light.png",
  "clinic.jpg",
  "hero.jpg",
  "precision.jpg",
];

const contentTypes: Record<string, string> = {
  ".css": "text/css",
  ".html": "text/html",
  ".jpg": "image/jpeg",
  ".js": "text/javascript",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
};

test.beforeEach(async ({ page }) => {
  await page.route("https://fonts.googleapis.com/**", (route) =>
    route.fulfill({ status: 200, contentType: "text/css", body: "" }),
  );
  await page.route("https://fonts.gstatic.com/**", (route) =>
    route.fulfill({ status: 200, contentType: "font/woff2", body: "" }),
  );
  await page.route("http://drgziut.test/**", async (route) => {
    const url = new URL(route.request().url());
    const prefix = "/DrGziut-webpage/";
    if (!url.pathname.startsWith(prefix)) {
      await route.fulfill({ status: 404, body: "Not found" });
      return;
    }

    const requested = decodeURIComponent(url.pathname.slice(prefix.length)) || "index.html";
    const filePath = resolve(distRoot, requested);
    if ((filePath !== distRoot && !filePath.startsWith(`${distRoot}${sep}`)) || !existsSync(filePath)) {
      await route.fulfill({ status: 404, body: "Not found" });
      return;
    }

    await route.fulfill({
      status: 200,
      path: filePath,
      contentType: contentTypes[extname(filePath).toLowerCase()] ?? "application/octet-stream",
    });
  });
});

function listFiles(root: string): string[] {
  return readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) return [];
    const path = join(root, entry.name);
    return entry.isDirectory() ? listFiles(path) : [path];
  });
}

async function activateSections(page: Page) {
  const tops = await page.locator("main section").evaluateAll((sections) =>
    sections.map((section) => Math.max(0, section.getBoundingClientRect().top + window.scrollY)),
  );
  for (const top of tops) {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), top);
    await page.waitForTimeout(35);
  }
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" }));
  await page.waitForTimeout(35);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(100);
}

async function waitForImages(page: Page) {
  await page.waitForFunction(
    () => Array.from(document.images).every((image) => image.complete && image.naturalWidth > 0),
    null,
    { timeout: 15_000 },
  );
}

test("content, assets, language and local form", async ({ page }) => {
  const pageErrors: string[] = [];
  const failedRequests: string[] = [];
  const mutatingRequests: string[] = [];
  const requestsAfterSubmit: string[] = [];
  let formSubmissionStarted = false;
  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("requestfailed", (request) => {
    failedRequests.push(`${request.url()}: ${request.failure()?.errorText}`);
  });
  page.on("request", (request) => {
    if (formSubmissionStarted) requestsAfterSubmit.push(`${request.method()} ${request.url()}`);
    if (!["GET", "HEAD", "OPTIONS"].includes(request.method())) {
      mutatingRequests.push(`${request.method()} ${request.url()}`);
    }
  });

  await page.goto("./", { waitUntil: "networkidle" });
  await expect(page.locator("h1")).toContainText("Precyzja");
  await expect(page.getByRole("link", { name: "Umów konsultację" }).first()).toBeVisible();
  await expect(page.locator('a[href="tel:+48533210115"]').first()).toBeAttached();
  expect(blockedName.test(await page.content())).toBe(false);
  const blockedSourceFiles = listFiles(process.cwd()).filter((path) => {
    if (blockedName.test(relative(process.cwd(), path))) return true;
    return textExtensions.has(extname(path).toLowerCase()) && blockedName.test(readFileSync(path, "utf8"));
  });
  expect(blockedSourceFiles).toEqual([]);
  const assetRoot = join(process.cwd(), "public", "assets");
  const assetFiles = listFiles(assetRoot)
    .map((path) => relative(assetRoot, path).split(sep).join("/"))
    .sort();
  expect(assetFiles.filter((path) => forbiddenAssetName.test(path))).toEqual([]);
  expect(assetFiles).toEqual([...approvedAssetFiles].sort());

  await page.getByTestId("language-en").click();
  await expect(page.locator("h1")).toContainText("Precision");
  await expect(page.getByRole("link", { name: "Book a consultation" }).first()).toBeVisible();
  await page.reload({ waitUntil: "networkidle" });
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("h1")).toContainText("Precision");
  await page.getByTestId("language-pl").click();
  await expect(page.locator("html")).toHaveAttribute("lang", "pl");

  await activateSections(page);
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" }));
  await waitForImages(page);
  const unloaded = await page.locator("img").evaluateAll((images) =>
    images.filter((image) => !(image as HTMLImageElement).complete || (image as HTMLImageElement).naturalWidth === 0)
      .map((image) => (image as HTMLImageElement).src),
  );
  expect(unloaded).toEqual([]);

  await page.locator("#kontakt").scrollIntoViewIfNeeded();
  await page.getByLabel("Imię i nazwisko").fill("Test QA");
  await page.getByLabel("Telefon lub e-mail").fill("qa@example.test");
  await page.getByLabel("Zakres konsultacji").selectOption({ index: 1 });
  expect(await page.getByTestId("demo-form").locator('input:not([type="checkbox"]), select, textarea').count()).toBeLessThanOrEqual(4);
  const consent = page.locator(".consent input");
  await expect(consent).toHaveAttribute("required", "");
  await consent.check();
  formSubmissionStarted = true;
  await page.locator("form").getByRole("button", { name: "Umów konsultację" }).click();
  await expect(page.getByTestId("form-success")).toContainText("Żadne dane nie zostały wysłane ani zapisane");
  expect(requestsAfterSubmit).toEqual([]);
  expect(mutatingRequests).toEqual([]);
  expect(pageErrors).toEqual([]);
  expect(failedRequests).toEqual([]);
});

for (const width of [360, 390, 768, 1440]) {
  test(`responsive viewport ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width < 600 ? 844 : 980 });
    await page.goto("./", { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    if (width <= 390) {
      const cta = await page.getByTestId("hero-cta").boundingBox();
      expect(cta).not.toBeNull();
      expect((cta?.y ?? 844) + (cta?.height ?? 0)).toBeLessThanOrEqual(844);
    }
    if (width === 390) {
      await activateSections(page);
      await waitForImages(page);
      await page.screenshot({ path: "artifacts/drgziut-mobile-390.png", fullPage: true });
    }
    if (width === 1440) {
      await activateSections(page);
      await waitForImages(page);
      await page.screenshot({ path: "artifacts/drgziut-desktop-1440.png", fullPage: true });
    }
  });
}

test("mobile menu traps focus and restores trigger", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("./");
  const trigger = page.getByRole("button", { name: "Otwórz menu" });
  await trigger.click();
  await expect(page.locator("#mobile-menu nav a").first()).toBeFocused();
  await expect(page.locator("main")).toHaveJSProperty("inert", true);
  await expect(page.locator("footer")).toHaveJSProperty("inert", true);
  await expect.poll(() => page.evaluate(() => getComputedStyle(document.body).overflow)).toBe("hidden");
  await page.keyboard.press("Shift+Tab");
  await expect(page.getByRole("button", { name: "Zamknij", exact: true })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.locator("#mobile-menu nav a").first()).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await expect(page.locator("#mobile-menu")).toHaveAttribute("aria-hidden", "true");
  await expect(page.locator("main")).toHaveJSProperty("inert", false);
  await expect(page.locator("footer")).toHaveJSProperty("inert", false);
  const closedStyles = await page.locator("#mobile-menu").evaluate((element) => {
    const styles = getComputedStyle(element);
    return { visibility: styles.visibility, pointerEvents: styles.pointerEvents };
  });
  expect(closedStyles).toEqual({ visibility: "hidden", pointerEvents: "none" });
});
