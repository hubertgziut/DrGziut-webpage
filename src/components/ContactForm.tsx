import { useEffect, useRef, useState, type FormEvent } from "react";
import { categories, pageContent } from "../content/site";
import { useT } from "../i18n";

export default function ContactForm() {
  const t = useT();
  const [complete, setComplete] = useState(false);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const copy = pageContent.contactForm;

  useEffect(() => {
    if (complete) successHeadingRef.current?.focus();
  }, [complete]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setComplete(true);
  };

  if (complete) {
    return (
      <div className="form-success" role="status" aria-live="polite" data-testid="form-success">
        <span aria-hidden="true">✓</span>
        <h3 ref={successHeadingRef} tabIndex={-1}>
          {t(copy.successTitle)}
        </h3>
        <p>{t(copy.success)}</p>
        <button className="text-button" type="button" onClick={() => setComplete(false)}>
          {t(copy.reset)}
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={submit} data-testid="demo-form">
      <div className="form-row">
        <label>
          <span>{t(copy.name)}</span>
          <input name="name" autoComplete="name" required />
        </label>
        <label>
          <span>{t(copy.contact)}</span>
          <input name="contact" autoComplete="tel" required />
        </label>
      </div>
      <label>
        <span>{t(copy.area)}</span>
        <select name="area" defaultValue="" required>
          <option value="" disabled>
            {t(copy.select)}
          </option>
          <option value={categories.surgery.id}>{t(categories.surgery.label)}</option>
          <option value={categories.aesthetic.id}>{t(categories.aesthetic.label)}</option>
          <option value="unsure">{t(copy.unsure)}</option>
        </select>
      </label>
      <label>
        <span>{t(copy.message)}</span>
        <textarea name="message" rows={3} />
      </label>
      <p className="privacy-warning">{t(copy.warning)}</p>
      <label className="consent">
        <input name="consent" type="checkbox" required />
        <span>{t(copy.consent)}</span>
      </label>
      <button className="primary-button" type="submit">
        {t(copy.submit)}
        <span aria-hidden="true">↗</span>
      </button>
    </form>
  );
}
