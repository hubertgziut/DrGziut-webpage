import ContactForm from "../components/ContactForm";
import PageHero from "../components/PageHero";
import Seo from "../components/Seo";
import { pageContent, siteContent } from "../content/site";
import { useT } from "../i18n";

export default function ContactPage() {
  const t = useT();
  const copy = pageContent.contact;

  return (
    <>
      <Seo {...copy.seo} />
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        summary={copy.summary}
        breadcrumbs={[{ label: siteContent.navigation.contact }]}
      />

      <section className="contact editorial-section" aria-labelledby="contact-direct-title">
        <div className="contact-copy">
          <div className="chapter-label">
            <span>02</span>
            <span className="chapter-line" aria-hidden="true" />
            {t(copy.directTitle)}
          </div>
          <h2 id="contact-direct-title">{t(copy.directTitle)}</h2>
          <div className="contact-details">
            <a href={siteContent.contact.phoneHref}>
              <span>{t(copy.phoneLabel)}</span>
              <strong>{siteContent.contact.phoneDisplay}</strong>
            </a>
            <a href={siteContent.contact.emailHref}>
              <span>{t(copy.emailLabel)}</span>
              <strong>{siteContent.contact.email}</strong>
            </a>
            <div>
              <span>{t(copy.addressLabel)}</span>
              <strong>{t(siteContent.contact.address)}</strong>
            </div>
          </div>
        </div>

        <div className="contact-form-column" aria-labelledby="contact-form-title">
          <h2 id="contact-form-title">{t(copy.formTitle)}</h2>
          <p>{t(copy.formIntro)}</p>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
