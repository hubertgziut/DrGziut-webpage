#!/usr/bin/env node
import { createServer } from "node:http";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright";

const projectRoot = process.cwd();
const distRoot = path.join(projectRoot, "dist");
const basePath = "/DrGziut-webpage/";
const expectedSitemapOrigin = "https://hubertgziut.github.io";
const sourceHtml = await readFile(path.join(distRoot, "index.html"), "utf8");
const sitemap = await readFile(path.join(distRoot, "sitemap.xml"), "utf8");
const sourceUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

if (sourceUrls.length < 2) {
  throw new Error("Static route generation requires the complete sitemap route matrix.");
}

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
};

function safeFilePath(relativePath) {
  const candidate = path.normalize(path.join(distRoot, relativePath));
  const rootWithSeparator = `${path.normalize(distRoot)}${path.sep}`;
  if (candidate !== path.normalize(distRoot) && !candidate.startsWith(rootWithSeparator)) {
    throw new Error(`Unsafe route path: ${relativePath}`);
  }
  return candidate;
}

const routeKeys = new Set();
const routeInputs = sourceUrls.map((sourceUrl) => {
  const productionUrl = new URL(sourceUrl);
  if (
    productionUrl.origin !== expectedSitemapOrigin ||
    productionUrl.username ||
    productionUrl.password ||
    productionUrl.search ||
    productionUrl.hash ||
    !productionUrl.pathname.startsWith(basePath)
  ) {
    throw new Error(`Invalid sitemap URL for static generation: ${sourceUrl}`);
  }

  const decodedRelativePath = decodeURIComponent(productionUrl.pathname.slice(basePath.length));
  const relativePath = decodedRelativePath.replace(/^\/+|\/+$/g, "");
  const normalizedRelativePath = relativePath ? path.posix.normalize(relativePath) : "";
  const canonicalPathname = `${basePath}${normalizedRelativePath}`;
  if (
    productionUrl.pathname !== canonicalPathname ||
    decodedRelativePath !== relativePath ||
    normalizedRelativePath !== relativePath ||
    !/^[a-z0-9/-]*$/.test(relativePath)
  ) {
    throw new Error(`Non-canonical sitemap route: ${sourceUrl}`);
  }
  safeFilePath(normalizedRelativePath);
  const routeKey = normalizedRelativePath.toLocaleLowerCase("en-US");
  if (routeKeys.has(routeKey)) {
    throw new Error(`Duplicate normalized sitemap route: ${sourceUrl}`);
  }
  routeKeys.add(routeKey);
  return { sourceUrl, relativePath: normalizedRelativePath, localPath: productionUrl.pathname };
});

async function existingFile(relativePath) {
  const candidate = safeFilePath(relativePath);
  try {
    const candidateStat = await stat(candidate);
    if (candidateStat.isFile()) return candidate;
    if (candidateStat.isDirectory()) {
      const indexPath = path.join(candidate, "index.html");
      if ((await stat(indexPath)).isFile()) return indexPath;
    }
  } catch {
    return null;
  }
  return null;
}

const server = createServer(async (request, response) => {
  try {
    const requestUrl = new URL(request.url ?? "/", "http://127.0.0.1");
    if (!requestUrl.pathname.startsWith(basePath)) {
      response.writeHead(404).end("Not found");
      return;
    }

    const relativePath = decodeURIComponent(requestUrl.pathname.slice(basePath.length));
    const filePath = (await existingFile(relativePath)) ?? path.join(distRoot, "index.html");
    const body = await readFile(filePath);
    const contentType = contentTypes[path.extname(filePath)] ?? "application/octet-stream";
    response.writeHead(200, { "content-type": contentType });
    response.end(body);
  } catch (error) {
    response.writeHead(500).end(error instanceof Error ? error.message : "Server error");
  }
});

await new Promise((resolve, reject) => {
  server.once("error", reject);
  server.listen(0, "127.0.0.1", resolve);
});
const address = server.address();
if (!address || typeof address === "string") throw new Error("Unable to start static render server.");
const localOrigin = `http://127.0.0.1:${address.port}`;

const removeRouteHead = (html) =>
  html
    .replace(/<title>[\s\S]*?<\/title>\s*/i, "")
    .replace(/<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>\s*/gi, "")
    .replace(
      /<meta\b(?=[^>]*(?:\bname|\bproperty)=["'](?:description|robots|og:title|og:description|og:url|og:locale)["'])[^>]*>\s*/gi,
      "",
    );

const escapeText = (value) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const escapeAttribute = (value) =>
  escapeText(value).replaceAll('"', "&quot;");

let browser;
const routes = [];
try {
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  for (const { sourceUrl, relativePath, localPath } of routeInputs) {
    const localUrl = `${localOrigin}${localPath}`;
    const pageErrors = [];
    const onPageError = (error) => pageErrors.push(error.message);
    page.on("pageerror", onPageError);
    const response = await page.goto(localUrl, { waitUntil: "domcontentloaded" });
    await page.locator("#page-title").waitFor({ state: "visible" });
    await page.waitForFunction(() => document.querySelector('link[rel="canonical"]'));
    const head = await page.evaluate(() => ({
      lang: document.documentElement.lang || "pl",
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.getAttribute("content") ?? "",
      robots: document.querySelector('meta[name="robots"]')?.getAttribute("content") ?? "index, follow",
      ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute("content") ?? document.title,
      ogDescription: document.querySelector('meta[property="og:description"]')?.getAttribute("content") ?? "",
      ogLocale: document.querySelector('meta[property="og:locale"]')?.getAttribute("content") ?? "pl_PL",
      h1: document.querySelector("h1")?.textContent?.trim() ?? "",
    }));
    page.off("pageerror", onPageError);

    if (response?.status() !== 200 || pageErrors.length || !head.title || head.description.length < 40 || !head.h1) {
      throw new Error(`Route render failed for ${sourceUrl}: ${JSON.stringify({ status: response?.status(), pageErrors, head })}`);
    }
    routes.push({ sourceUrl, relativePath, ...head });
  }
  await page.close();
} finally {
  await browser?.close();
  await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
}

for (const route of routes) {
  const routeHead = [
    `<title>${escapeText(route.title)}</title>`,
    `<meta name="description" content="${escapeAttribute(route.description)}">`,
    `<meta name="robots" content="${escapeAttribute(route.robots)}">`,
    `<link rel="canonical" href="${escapeAttribute(route.sourceUrl)}">`,
    `<meta property="og:title" content="${escapeAttribute(route.ogTitle)}">`,
    `<meta property="og:description" content="${escapeAttribute(route.ogDescription)}">`,
    `<meta property="og:url" content="${escapeAttribute(route.sourceUrl)}">`,
    `<meta property="og:locale" content="${escapeAttribute(route.ogLocale)}">`,
  ].join("\n    ");
  const html = removeRouteHead(sourceHtml)
    .replace(/<html\b[^>]*>/i, `<html lang="${escapeAttribute(route.lang)}">`)
    .replace("</head>", `    ${routeHead}\n  </head>`);
  const targetDirectory = route.relativePath
    ? safeFilePath(route.relativePath)
    : distRoot;
  await mkdir(targetDirectory, { recursive: true });
  await writeFile(path.join(targetDirectory, "index.html"), html, "utf8");
}

await writeFile(
  path.join(distRoot, "route-manifest.json"),
  `${JSON.stringify(routes.map(({ sourceUrl, relativePath, title, h1 }) => ({ sourceUrl, relativePath, title, h1 })), null, 2)}\n`,
  "utf8",
);
console.log(`Generated ${routes.length} route-aware static documents.`);
