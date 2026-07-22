import { Link } from "react-router-dom";
import ContactBand from "../components/ContactBand";
import PageHero from "../components/PageHero";
import Seo from "../components/Seo";
import {
  consultationSteps,
  pageContent,
  siteContent,
  staticPaths,
} from "../content/site";
import { useT } from "../i18n";

export default function ConsultationPage() {
  const t = useT();
  const copy = pageContent.consultation;
  const contactCopy = pageContent.contact;

  return (
    <>
      <Seo {...copy.seo} />
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        summary={copy.summary}
        breadcrumbs={[{ label: siteContent.navigation.consultation }]}
        actions={
          <Link className="primary-button" to={staticPaths.contact}>
            {t(siteContent.navigation.book)}
            <span aria-hidden="true">↗</span>
          </Link>
        }
      />

      <section className="process editorial-section" aria-labelledby="consultation-process-title">
        <div className="process-heading">
          <div className="chapter-label">
            <span>02</span>
            <span className="chapter-line" aria-hidden="true" />
            {t(copy.processTitle)}
          </div>
          <h2 id="consultation-process-title">{t(copy.processTitle)}</h2>
        </div>
        <ol className="process-list">
          {consultationSteps.map((step, index) => (
            <li key={step.title.pl}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{t(step.title)}</h3>
              <p>{t(step.text)}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="consultation-preparation editorial-section" aria-labelledby="preparation-title">
        <div className="consultation-column">
          <div className="chapter-label">
            <span>03</span>
            <span className="chapter-line" aria-hidden="true" />
            {t(copy.prepareTitle)}
          </div>
          <h2 id="preparation-title">{t(copy.prepareTitle)}</h2>
          <p>{t(copy.prepareIntro)}</p>
          <ul>
            {copy.preparation.map((item) => (
              <li key={item.pl}>{t(item)}</li>
            ))}
          </ul>
        </div>
        <div className="consultation-column">
          <div className="chapter-label">
            <span>04</span>
            <span className="chapter-line" aria-hidden="true" />
            {t(copy.discussedTitle)}
          </div>
          <h2>{t(copy.discussedTitle)}</h2>
          <ul>
            {copy.discussed.map((item) => (
              <li key={item.pl}>{t(item)}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="contact editorial-section" aria-labelledby="consultation-contact-title">
        <div className="contact-copy">
          <div className="chapter-label">
            <span>05</span>
            <span className="chapter-line" aria-hidden="true" />
            {t(siteContent.navigation.contact)}
          </div>
          <h2 id="consultation-contact-title">{t(contactCopy.directTitle)}</h2>
          <p>{t(copy.privacyNote)}</p>
          <div className="contact-details">
            <a href={siteContent.contact.phoneHref}>
              <span>{t(contactCopy.phoneLabel)}</span>
              <strong>{siteContent.contact.phoneDisplay}</strong>
            </a>
            <a href={siteContent.contact.emailHref}>
              <span>{t(contactCopy.emailLabel)}</span>
              <strong>{siteContent.contact.email}</strong>
            </a>
          </div>
        </div>
        <div className="consultation-contact-action">
          <Link className="primary-button" to={staticPaths.contact}>
            {t(siteContent.navigation.book)}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
