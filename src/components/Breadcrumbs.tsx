import { Link } from "react-router-dom";
import type { BiText } from "../content/site";
import { siteContent, staticPaths } from "../content/site";
import { useT } from "../i18n";

export type BreadcrumbItem = Readonly<{
  label: BiText;
  to?: string;
}>;

export default function Breadcrumbs({ items }: { items: readonly BreadcrumbItem[] }) {
  const t = useT();
  const breadcrumbs: readonly BreadcrumbItem[] = [
    { label: siteContent.navigation.home, to: staticPaths.home },
    ...items,
  ];

  return (
    <nav
      className="breadcrumbs"
      aria-label={t(siteContent.common.breadcrumbLabel)}
      data-testid="breadcrumbs"
    >
      <ol>
        {breadcrumbs.map((item, index) => {
          const isCurrent = index === breadcrumbs.length - 1;
          return (
            <li key={`${item.to ?? "current"}-${t(item.label)}`}>
              {item.to && !isCurrent ? (
                <Link to={item.to}>{t(item.label)}</Link>
              ) : (
                <span aria-current={isCurrent ? "page" : undefined}>
                  {t(item.label)}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
