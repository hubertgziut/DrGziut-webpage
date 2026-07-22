import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import type { SeoCopy } from "../content/site";
import { useLanguage, useT } from "../i18n";

type SeoProps = SeoCopy & {
  noIndex?: boolean;
};

function ensureMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    Object.entries(attributes).forEach(([name, value]) => {
      element?.setAttribute(name, value);
    });
    document.head.append(element);
  }
  return element;
}

function ensureCanonical() {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.append(element);
  }
  return element;
}

export default function Seo({ title, description, noIndex = false }: SeoProps) {
  const t = useT();
  const { language } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const resolvedTitle = t(title);
    const resolvedDescription = t(description);
    const routePath = `${import.meta.env.BASE_URL.replace(/\/$/, "")}${location.pathname}`;
    const canonicalUrl = new URL(routePath, window.location.origin).toString();

    document.title = resolvedTitle;
    ensureMeta('meta[name="description"]', { name: "description" }).content =
      resolvedDescription;
    ensureMeta('meta[name="robots"]', { name: "robots" }).content = noIndex
      ? "noindex, nofollow"
      : "index, follow";
    ensureMeta('meta[property="og:title"]', { property: "og:title" }).content =
      resolvedTitle;
    ensureMeta('meta[property="og:description"]', {
      property: "og:description",
    }).content = resolvedDescription;
    ensureMeta('meta[property="og:url"]', { property: "og:url" }).content =
      canonicalUrl;
    ensureMeta('meta[property="og:locale"]', { property: "og:locale" }).content =
      language === "pl" ? "pl_PL" : "en_GB";
    ensureCanonical().href = canonicalUrl;
  }, [description, language, location.pathname, noIndex, t, title]);

  return null;
}
