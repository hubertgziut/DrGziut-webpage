import { Link } from "react-router-dom";
import ContactBand from "../components/ContactBand";
import PageHero from "../components/PageHero";
import ProcedureCard from "../components/ProcedureCard";
import Seo from "../components/Seo";
import {
  categories,
  pageContent,
  procedureById,
  siteContent,
  staticPaths,
  type CategoryId,
} from "../content/site";
import { useT } from "../i18n";

export default function CategoryPage({ categoryId }: { categoryId: CategoryId }) {
  const t = useT();
  const category = categories[categoryId];
  const copy = pageContent.category;

  return (
    <>
      <Seo {...category.seo} />
      <PageHero
        eyebrow={category.eyebrow}
        title={category.title}
        summary={category.summary}
        breadcrumbs={[{ label: category.label }]}
      />

      <section className="discipline-intro editorial-section" aria-labelledby="category-positioning-title">
        <div className="chapter-label">
          <span>02</span>
          <span className="chapter-line" aria-hidden="true" />
          {t(category.label)}
        </div>
        <div className="intro-grid">
          <h2 id="category-positioning-title">{t(copy.positioningTitle)}</h2>
          <p>{t(category.positioning)}</p>
        </div>
      </section>

      <section className="category-index editorial-section" aria-labelledby="procedure-index-title">
        <div className="chapter-label">
          <span>03</span>
          <span className="chapter-line" aria-hidden="true" />
          {t(copy.indexEyebrow)}
        </div>
        <h2 id="procedure-index-title">{t(copy.indexTitle)}</h2>
        <div className="category-groups">
          {category.groups.map((group, groupIndex) => (
            <section className="category-group" key={group.title.pl} aria-labelledby={`group-${groupIndex}`}>
              <header>
                <span aria-hidden="true">{String(groupIndex + 1).padStart(2, "0")}</span>
                <h3 id={`group-${groupIndex}`}>{t(group.title)}</h3>
                <p>{t(group.description)}</p>
              </header>
              <div className="procedure-card-grid">
                {group.procedureIds.map((procedureId, procedureIndex) => (
                  <ProcedureCard
                    key={procedureId}
                    procedure={procedureById[procedureId]}
                    index={procedureIndex}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="process editorial-section" aria-labelledby="qualification-title">
        <div className="process-heading">
          <div className="chapter-label">
            <span>04</span>
            <span className="chapter-line" aria-hidden="true" />
            {t(copy.qualificationEyebrow)}
          </div>
          <h2 id="qualification-title">{t(category.qualificationTitle)}</h2>
          <p>{t(category.qualificationIntro)}</p>
        </div>
        <ol className="process-list">
          {category.qualificationSteps.map((step, index) => (
            <li key={step.title.pl}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{t(step.title)}</h3>
              <p>{t(step.text)}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="related-pages editorial-section" aria-labelledby="related-pages-title">
        <div className="chapter-label">
          <span>05</span>
          <span className="chapter-line" aria-hidden="true" />
          {t(siteContent.common.relatedPages)}
        </div>
        <h2 id="related-pages-title">{t(copy.nextStepsTitle)}</h2>
        <div className="related-page-links">
          <Link to={staticPaths.consultation}>{t(siteContent.navigation.consultation)}</Link>
          <Link to={staticPaths.pricing}>{t(siteContent.navigation.pricing)}</Link>
          <Link to={staticPaths.faq}>{t(siteContent.navigation.faq)}</Link>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
