import ContactBand from "../components/ContactBand";
import PageHero from "../components/PageHero";
import Seo from "../components/Seo";
import { pageContent, siteContent } from "../content/site";
import { useT } from "../i18n";

export default function PricingPage() {
  const t = useT();
  const copy = pageContent.pricing;

  return (
    <>
      <Seo {...copy.seo} />
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        summary={copy.summary}
        breadcrumbs={[{ label: siteContent.navigation.pricing }]}
      />

      <section className="pricing-note editorial-section" aria-labelledby="pricing-note-title">
        <div className="chapter-label">
          <span>02</span>
          <span className="chapter-line" aria-hidden="true" />
          {t(copy.noteTitle)}
        </div>
        <h2 id="pricing-note-title">{t(copy.noteTitle)}</h2>
        <p>{t(copy.note)}</p>
      </section>

      <section className="pricing editorial-section" aria-labelledby="price-list-title">
        <div className="pricing-heading">
          <div className="chapter-label">
            <span>03</span>
            <span className="chapter-line" aria-hidden="true" />
            {t(copy.eyebrow)}
          </div>
          <h2 id="price-list-title">{t(copy.title)}</h2>
          <p>{t(copy.summary)}</p>
        </div>
        <div className="price-groups">
          {copy.groups.map((group, groupIndex) => (
            <section key={group.title.pl} aria-labelledby={`price-group-${groupIndex}`}>
              <h3 id={`price-group-${groupIndex}`}>{t(group.title)}</h3>
              <div className="price-list">
                {group.items.map((item, index) => (
                  <div key={item.name.pl}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{t(item.name)}</strong>
                    <i aria-hidden="true" />
                    <b>{t(item.value)}</b>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <ContactBand />
    </>
  );
}
