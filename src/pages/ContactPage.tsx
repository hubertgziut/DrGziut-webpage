import PageHero from "../components/PageHero";
import Seo from "../components/Seo";
import { pageContent, siteContent } from "../content/site";
import { useT } from "../i18n";

export default function ContactPage() {
  const t = useT();
  const copy = pageContent.contact;
  const phoneDigits = siteContent.contact.phoneHref.replace(/\D/g, "");
  const smsHref = siteContent.contact.phoneHref.replace(/^tel:/, "sms:");
  const whatsappHref = `https://wa.me/${phoneDigits}`;
  const channels = [
    {
      label: copy.phoneLabel,
      value: siteContent.contact.phoneDisplay,
      href: siteContent.contact.phoneHref,
      external: false,
    },
    {
      label: copy.whatsappLabel,
      value: "WhatsApp",
      href: whatsappHref,
      external: true,
    },
    {
      label: copy.smsLabel,
      value: "SMS",
      href: smsHref,
      external: false,
    },
  ] as const;

  return (
    <>
      <Seo {...copy.seo} />
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        summary={copy.summary}
        breadcrumbs={[{ label: siteContent.navigation.contact }]}
      />

      <section className="contact contact-page editorial-section" aria-labelledby="contact-direct-title">
        <div className="contact-copy">
          <div className="chapter-label">
            <span>02</span>
            <span className="chapter-line" aria-hidden="true" />
            {t(copy.directTitle)}
          </div>
          <h2 id="contact-direct-title">{t(copy.directTitle)}</h2>
          <div className="contact-details contact-details-compact">
            <div>
              <span>{t(copy.emailLabel)}</span>
              <strong>{siteContent.contact.email}</strong>
            </div>
            <div>
              <span>{t(copy.addressLabel)}</span>
              <strong>{t(siteContent.contact.address)}</strong>
            </div>
          </div>
        </div>

        <div className="contact-flow">
          <aside
            id="contact-privacy-note"
            className="contact-privacy-note"
            data-testid="contact-privacy-note"
            aria-labelledby="contact-privacy-title"
          >
            <span aria-hidden="true">i</span>
            <div>
              <h2 id="contact-privacy-title">{t(copy.privacyTitle)}</h2>
              <p>{t(copy.privacyText)}</p>
            </div>
          </aside>

          <div className="contact-channel-list" data-testid="contact-channel-list">
            {channels.map((channel, index) => (
              <a
                href={channel.href}
                key={channel.value}
                aria-describedby="contact-privacy-note"
                {...(channel.external ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <small>{t(channel.label)}</small>
                  <strong>{channel.value}</strong>
                </div>
                <i aria-hidden="true">↗</i>
                <em>{t(copy.channelHint)}</em>
              </a>
            ))}
          </div>

          <div className="contact-practical">
            <div className="contact-price-card">
              <span>{t(copy.consultationPriceLabel)}</span>
              <strong>{t(copy.consultationPrice)}</strong>
            </div>
            <p>{t(copy.availabilityNote)}</p>
          </div>
        </div>
      </section>
    </>
  );
}
