import { Link } from "react-router-dom";
import { procedurePath, siteContent, type Procedure } from "../content/site";
import { useT } from "../i18n";

export default function ProcedureCard({
  procedure,
  index,
}: {
  procedure: Procedure;
  index?: number;
}) {
  const t = useT();

  return (
    <article className="procedure-card">
      <Link to={procedurePath(procedure)}>
        {typeof index === "number" ? (
          <span className="procedure-card-index" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
        ) : null}
        <div>
          <span className="procedure-card-eyebrow">{t(procedure.eyebrow)}</span>
          <h3>{t(procedure.shortTitle)}</h3>
          <p>{t(procedure.summary)}</p>
        </div>
        <span className="procedure-card-arrow" aria-label={t(siteContent.common.arrowLabel)}>
          ↗
        </span>
      </Link>
    </article>
  );
}
