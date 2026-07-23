import { Link } from "react-router-dom";
import ContactBand from "../components/ContactBand";
import PageHero from "../components/PageHero";
import Seo from "../components/Seo";
import {
  categories,
  categoryPath,
  pageContent,
  siteContent,
} from "../content/site";
import { useT } from "../i18n";
import { assetUrl } from "../lib/assets";

export default function DoctorPage() {
  const t = useT();
  const copy = pageContent.doctor;

  return (
    <>
      <Seo {...copy.seo} />
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        summary={copy.summary}
        breadcrumbs={[{ label: siteContent.navigation.doctor }]}
        aside={
          <>
            <span>{t(siteContent.physician.title)}</span>
            <strong>NPWZ {siteContent.physician.licenseNumber}</strong>
          </>
        }
      />

      <section className="doctor editorial-section" aria-labelledby="doctor-biography-title">
        <figure className="doctor-portrait">
          <img
            data-testid="doctor-portrait-image"
            src={assetUrl("/assets/brand/doctor-hubert.jpg")}
            alt={t(copy.portraitAlt)}
            width="960"
            height="1280"
            loading="lazy"
            decoding="async"
          />
        </figure>
        <div className="doctor-copy">
          <div className="chapter-label">
            <span>02</span>
            <span className="chapter-line" aria-hidden="true" />
            {t(siteContent.physician.title)}
          </div>
          <h2 id="doctor-biography-title">{t(siteContent.physician.name)}</h2>
          <p className="doctor-title">{t(siteContent.physician.title)}</p>
          {copy.biography.map((paragraph) => (
            <p key={paragraph.pl}>{t(paragraph)}</p>
          ))}
          <div className="license-line">
            <span>{t(siteContent.physician.licenseLabel)}</span>
            <strong>{siteContent.physician.licenseNumber}</strong>
          </div>
        </div>
      </section>

      <section className="process editorial-section" aria-labelledby="timeline-title">
        <div className="process-heading">
          <div className="chapter-label">
            <span>03</span>
            <span className="chapter-line" aria-hidden="true" />
            {t(copy.timelineTitle)}
          </div>
          <h2 id="timeline-title">{t(copy.timelineTitle)}</h2>
        </div>
        <ol className="process-list">
          {copy.timeline.map((item, index) => (
            <li key={item.title.pl}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <small>{t(item.date)}</small>
                <h3>{t(item.title)}</h3>
              </div>
              <p>{t(item.text)}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="philosophy editorial-section" aria-labelledby="philosophy-title">
        <div className="chapter-label">
          <span>04</span>
          <span className="chapter-line" aria-hidden="true" />
          {t(copy.philosophyTitle)}
        </div>
        <h2 id="philosophy-title">{t(copy.philosophyTitle)}</h2>
        <p>{t(copy.philosophyText)}</p>
      </section>

      <section className="related-pages editorial-section" aria-labelledby="doctor-disciplines-title">
        <div className="chapter-label">
          <span>05</span>
          <span className="chapter-line" aria-hidden="true" />
          {t(copy.disciplinesTitle)}
        </div>
        <h2 id="doctor-disciplines-title">{t(copy.disciplinesTitle)}</h2>
        <div className="related-page-links">
          <Link to={categoryPath("surgery")}>{t(categories.surgery.label)}</Link>
          <Link to={categoryPath("aesthetic")}>{t(categories.aesthetic.label)}</Link>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
