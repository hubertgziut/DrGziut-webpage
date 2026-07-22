import { Link } from "react-router-dom";
import ContactBand from "../components/ContactBand";
import PageHero from "../components/PageHero";
import ProcedureCard from "../components/ProcedureCard";
import Seo from "../components/Seo";
import {
  categories,
  categoryPath,
  consultationSteps,
  pageContent,
  procedureById,
  siteContent,
  staticPaths,
} from "../content/site";
import { useT } from "../i18n";
import { assetUrl } from "../lib/assets";

export default function HomePage() {
  const t = useT();
  const copy = pageContent.home;

  return (
    <>
      <Seo {...copy.seo} />
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        summary={copy.summary}
        compact={false}
        actions={
          <>
            <Link className="primary-button" data-testid="hero-cta" to={staticPaths.contact}>
              {t(siteContent.navigation.book)}
              <span aria-hidden="true">↗</span>
            </Link>
            <a className="secondary-button" href="#obszary">
              {t(copy.explore)}
            </a>
          </>
        }
        aside={
          <>
            <span>{t(siteContent.physician.name)}</span>
            <strong>{t(siteContent.physician.title)}</strong>
            <small>NPWZ {siteContent.physician.licenseNumber}</small>
          </>
        }
      />

      <section className="trust-strip" aria-label={t(copy.trustLabel)}>
        <div>
          <span>01</span>
          {t(siteContent.physician.title)}
        </div>
        <div>
          <span>02</span>
          NPWZ {siteContent.physician.licenseNumber}
        </div>
        <div>
          <span>03</span>
          {t(copy.trustConsultation)}
        </div>
        <div>
          <span>04</span>
          {t(siteContent.contact.address)}
        </div>
      </section>

      <section className="discipline-intro editorial-section" id="obszary" aria-labelledby="areas-title">
        <div className="chapter-label">
          <span>02</span>
          <span className="chapter-line" aria-hidden="true" />
          {t(copy.gatewayEyebrow)}
        </div>
        <div className="intro-grid">
          <h2 id="areas-title">{t(copy.gatewayTitle)}</h2>
          <p>{t(copy.gatewayIntro)}</p>
        </div>
      </section>

      <div className="category-gateways">
        {(["surgery", "aesthetic"] as const).map((categoryId, index) => {
          const category = categories[categoryId];
          return (
            <section
              className={`discipline editorial-section ${index === 1 ? "discipline-reverse" : ""}`}
              key={category.id}
              aria-labelledby={`gateway-${category.id}`}
            >
              <div className="discipline-copy">
                <div className="chapter-label">
                  <span>02.{index + 1}</span>
                  <span className="chapter-line" aria-hidden="true" />
                  {t(category.label)}
                </div>
                <h2 id={`gateway-${category.id}`}>{t(category.title)}</h2>
                <p>{t(category.summary)}</p>
                <Link className="text-link" to={categoryPath(category)}>
                  {t(siteContent.common.viewCategory)}
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>
              <div className="procedure-card-list">
                {category.featuredProcedureIds.map((procedureId, procedureIndex) => (
                  <ProcedureCard
                    key={procedureId}
                    procedure={procedureById[procedureId]}
                    index={procedureIndex}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <section className="featured-procedures editorial-section" aria-labelledby="featured-title">
        <div className="chapter-label">
          <span>03</span>
          <span className="chapter-line" aria-hidden="true" />
          {t(copy.featuredEyebrow)}
        </div>
        <h2 id="featured-title">{t(copy.featuredTitle)}</h2>
        <div className="procedure-card-grid">
          {copy.featuredProcedureIds.map((procedureId, index) => (
            <ProcedureCard key={procedureId} procedure={procedureById[procedureId]} index={index} />
          ))}
        </div>
      </section>

      <section className="doctor editorial-section" aria-labelledby="doctor-teaser-title">
        <figure className="doctor-portrait">
          <img
            src={assetUrl("/assets/brand/doctor-hubert.jpg")}
            alt={t(pageContent.doctor.portraitAlt)}
            width="1160"
            height="1450"
            decoding="async"
          />
        </figure>
        <div className="doctor-copy">
          <div className="chapter-label">
            <span>04</span>
            <span className="chapter-line" aria-hidden="true" />
            {t(copy.doctorEyebrow)}
          </div>
          <h2 id="doctor-teaser-title">{t(copy.doctorTitle)}</h2>
          <p className="doctor-title">{t(siteContent.physician.title)}</p>
          <p>{t(copy.doctorText)}</p>
          <div className="license-line">
            <span>NPWZ</span>
            <strong>{siteContent.physician.licenseNumber}</strong>
          </div>
          <Link className="text-link" to={staticPaths.doctor}>
            {t(copy.doctorLink)}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section className="process editorial-section" aria-labelledby="consultation-teaser-title">
        <div className="process-heading">
          <div className="chapter-label">
            <span>05</span>
            <span className="chapter-line" aria-hidden="true" />
            {t(copy.consultationEyebrow)}
          </div>
          <h2 id="consultation-teaser-title">{t(copy.consultationTitle)}</h2>
          <Link className="text-link" to={staticPaths.consultation}>
            {t(siteContent.common.learnMore)}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <ol className="process-list">
          {consultationSteps.slice(0, 3).map((step, index) => (
            <li key={step.title.pl}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{t(step.title)}</h3>
              <p>{t(step.text)}</p>
            </li>
          ))}
        </ol>
      </section>

      <ContactBand />
    </>
  );
}
