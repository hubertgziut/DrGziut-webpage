import { Link } from "react-router-dom";
import type { BiText } from "../content/site";
import { pageContent, siteContent, staticPaths } from "../content/site";
import { useT } from "../i18n";

type ContactBandProps = Readonly<{
  title?: BiText;
  text?: BiText;
  cta?: BiText;
}>;

export default function ContactBand({ title, text, cta }: ContactBandProps) {
  const t = useT();
  const copy = pageContent.contactBand;

  return (
    <section className="contact-band editorial-section" aria-labelledby="contact-band-title">
      <div>
        <div className="chapter-label">
          <span aria-hidden="true">→</span>
          <span className="chapter-line" aria-hidden="true" />
          {t(copy.eyebrow)}
        </div>
        <h2 id="contact-band-title">{t(title ?? copy.title)}</h2>
        <p>{t(text ?? copy.text)}</p>
      </div>
      <Link className="primary-button" to={staticPaths.contact}>
        {t(cta ?? siteContent.navigation.book)}
        <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}
