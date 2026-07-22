import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import Seo from "../components/Seo";
import {
  categories,
  categoryPath,
  pageContent,
  siteContent,
  staticPaths,
} from "../content/site";
import { useT } from "../i18n";

export default function NotFoundPage() {
  const t = useT();
  const copy = pageContent.notFound;

  return (
    <>
      <Seo {...copy.seo} noIndex />
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        summary={copy.summary}
        breadcrumbs={[{ label: copy.eyebrow }]}
        actions={
          <Link className="primary-button" to={staticPaths.home}>
            {t(copy.homeLink)}
            <span aria-hidden="true">↗</span>
          </Link>
        }
      />

      <nav className="not-found-links editorial-section" aria-label={t(siteContent.common.relatedPages)}>
        <Link to={categoryPath("surgery")}>{t(categories.surgery.label)}</Link>
        <Link to={categoryPath("aesthetic")}>{t(categories.aesthetic.label)}</Link>
        <Link to={staticPaths.contact}>{t(siteContent.navigation.contact)}</Link>
      </nav>
    </>
  );
}
