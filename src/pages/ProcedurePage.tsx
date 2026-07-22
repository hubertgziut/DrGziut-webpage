import { Link } from "react-router-dom";
import ContactBand from "../components/ContactBand";
import PageHero from "../components/PageHero";
import ProcedureCard from "../components/ProcedureCard";
import Seo from "../components/Seo";
import {
  categories,
  categoryPath,
  pageContent,
  procedureById,
  siteContent,
  staticPaths,
  type ProcedureId,
} from "../content/site";
import { useT } from "../i18n";

export default function ProcedurePage({ procedureId }: { procedureId: ProcedureId }) {
  const t = useT();
  const procedure = procedureById[procedureId];
  const category = categories[procedure.category];
  const copy = pageContent.procedure;

  return (
    <>
      <Seo title={procedure.title} description={procedure.summary} />
      <PageHero
        eyebrow={procedure.eyebrow}
        title={procedure.title}
        summary={procedure.summary}
        breadcrumbs={[
          { label: category.label, to: categoryPath(category) },
          { label: procedure.shortTitle },
        ]}
      />

      <section className="procedure-overview editorial-section" aria-labelledby="procedure-overview-title">
        <div className="chapter-label">
          <span>02</span>
          <span className="chapter-line" aria-hidden="true" />
          {t(copy.overviewEyebrow)}
        </div>
        <div className="intro-grid">
          <h2 id="procedure-overview-title">{t(copy.overviewTitle)}</h2>
          <p>{t(procedure.intro)}</p>
        </div>
        <div className="consultation-focus">
          <h3>{t(siteContent.common.consultationEvaluates)}</h3>
          <ul>
            {procedure.consultationFocus.map((item) => (
              <li key={item.pl}>{t(item)}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="procedure-facts editorial-section" aria-labelledby="procedure-facts-title">
        <div className="chapter-label">
          <span>03</span>
          <span className="chapter-line" aria-hidden="true" />
          {t(copy.factsEyebrow)}
        </div>
        <h2 id="procedure-facts-title">{t(copy.factsTitle)}</h2>
        <div className="procedure-fact-list">
          {procedure.facts.map((fact, index) => (
            <article key={fact.label.pl}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h3>{t(fact.label)}</h3>
              <p>{t(fact.text)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="procedure-safety editorial-section" aria-labelledby="safety-title">
        <div>
          <div className="chapter-label">
            <span>04</span>
            <span className="chapter-line" aria-hidden="true" />
            {t(siteContent.common.beforeDecision)}
          </div>
          <h2 id="safety-title">{t(copy.safetyTitle)}</h2>
          <p>{t(siteContent.common.safetyNote)}</p>
        </div>
        <aside className="procedure-price" aria-labelledby="procedure-price-title">
          <h3 id="procedure-price-title">{t(siteContent.common.indicativePrice)}</h3>
          {procedure.price ? (
            <p>{t(procedure.price)}</p>
          ) : (
            <p>{t(siteContent.common.priceAfterConsultation)}</p>
          )}
          <Link className="text-link" to={staticPaths.pricing}>
            {t(siteContent.navigation.pricing)}
            <span aria-hidden="true">↗</span>
          </Link>
        </aside>
      </section>

      <section className="related-procedures editorial-section" aria-labelledby="related-procedures-title">
        <div className="chapter-label">
          <span>05</span>
          <span className="chapter-line" aria-hidden="true" />
          {t(siteContent.common.relatedProcedures)}
        </div>
        <h2 id="related-procedures-title">{t(copy.relatedTitle)}</h2>
        <div className="procedure-card-grid">
          {procedure.related.map((relatedId, index) => (
            <ProcedureCard key={relatedId} procedure={procedureById[relatedId]} index={index} />
          ))}
        </div>
      </section>

      <ContactBand cta={procedure.consultationCta} />
    </>
  );
}
