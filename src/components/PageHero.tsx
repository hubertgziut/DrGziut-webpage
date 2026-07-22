import type { ReactNode } from "react";
import type { BiText } from "../content/site";
import { useT } from "../i18n";
import Breadcrumbs, { type BreadcrumbItem } from "./Breadcrumbs";

type PageHeroProps = Readonly<{
  eyebrow: BiText;
  title: BiText;
  summary: BiText;
  chapter?: string;
  breadcrumbs?: readonly BreadcrumbItem[];
  actions?: ReactNode;
  aside?: ReactNode;
  compact?: boolean;
}>;

export default function PageHero({
  eyebrow,
  title,
  summary,
  chapter = "01",
  breadcrumbs,
  actions,
  aside,
  compact = true,
}: PageHeroProps) {
  const t = useT();

  return (
    <section
      className={`hero scene-section ${compact ? "page-hero" : "home-hero"}`}
      aria-labelledby="page-title"
    >
      <div className="hero-copy">
        {breadcrumbs ? <Breadcrumbs items={breadcrumbs} /> : null}
        <div className="chapter-label">
          <span>{chapter}</span>
          <span className="chapter-line" aria-hidden="true" />
          {t(eyebrow)}
        </div>
        <h1 id="page-title" data-testid="hero-title">
          {t(title)}
        </h1>
        <p>{t(summary)}</p>
        {actions ? <div className="hero-actions">{actions}</div> : null}
      </div>
      {aside ? <div className="hero-aside">{aside}</div> : null}
    </section>
  );
}
