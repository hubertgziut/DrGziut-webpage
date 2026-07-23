import { useState } from "react";
import ContactBand from "../components/ContactBand";
import PageHero from "../components/PageHero";
import Seo from "../components/Seo";
import { pageContent, siteContent } from "../content/site";
import { useT } from "../i18n";

type ActiveGroup = "all" | number;

export default function FaqPage() {
  const t = useT();
  const copy = pageContent.faq;
  const [activeGroup, setActiveGroup] = useState<ActiveGroup>("all");
  const [openItems, setOpenItems] = useState<ReadonlySet<string>>(() => new Set(["0-0"]));

  const toggle = (id: string) => {
    setOpenItems((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const visibleGroups = copy.groups
    .map((group, groupIndex) => ({ group, groupIndex }))
    .filter(({ groupIndex }) => activeGroup === "all" || activeGroup === groupIndex);

  return (
    <>
      <Seo {...copy.seo} />
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        summary={copy.summary}
        breadcrumbs={[{ label: siteContent.navigation.faq }]}
      />

      <section className="faq-section editorial-section" aria-labelledby="faq-groups-title">
        <div className="faq-heading">
          <div className="chapter-label">
            <span>02</span>
            <span className="chapter-line" aria-hidden="true" />
            {t(copy.eyebrow)}
          </div>
          <h2 id="faq-groups-title">{t(copy.title)}</h2>
          <p>{t(copy.summary)}</p>
        </div>

        <div
          className="faq-filters"
          role="group"
          aria-label={t(copy.filterLabel)}
          data-testid="faq-filters"
        >
          <button
            type="button"
            aria-pressed={activeGroup === "all"}
            onClick={() => setActiveGroup("all")}
          >
            {t(copy.allFilter)}
          </button>
          {copy.groups.map((group, groupIndex) => (
            <button
              type="button"
              aria-pressed={activeGroup === groupIndex}
              key={group.title.pl}
              onClick={() => setActiveGroup(groupIndex)}
            >
              {t(group.title)}
            </button>
          ))}
        </div>

        <div className="faq-groups" aria-live="polite">
          {visibleGroups.map(({ group, groupIndex }) => (
            <section className="faq-group" key={group.title.pl} aria-labelledby={`faq-group-${groupIndex}`}>
              <h3 id={`faq-group-${groupIndex}`}>{t(group.title)}</h3>
              <div className="faq-list">
                {group.items.map((item, itemIndex) => {
                  const id = `${groupIndex}-${itemIndex}`;
                  const buttonId = `faq-button-${id}`;
                  const answerId = `faq-answer-${id}`;
                  const isOpen = openItems.has(id);
                  return (
                    <article className={`faq-item ${isOpen ? "is-open" : ""}`} key={item.question.pl}>
                      <button
                        id={buttonId}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={answerId}
                        onClick={() => toggle(id)}
                      >
                        <span>{t(item.question)}</span>
                        <i aria-hidden="true">+</i>
                      </button>
                      <div
                        id={answerId}
                        className="faq-answer"
                        role="region"
                        aria-labelledby={buttonId}
                        aria-hidden={!isOpen}
                      >
                        <p>{t(item.answer)}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </section>

      <ContactBand />
    </>
  );
}
