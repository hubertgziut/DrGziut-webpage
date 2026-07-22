import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type RefObject,
} from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import {
  categories,
  categoryPath,
  procedureById,
  procedurePath,
  siteContent,
  staticPaths,
  type CategoryId,
  type SiteAsset,
} from "../content/site";
import { useLanguage, useT } from "../i18n";
import { assetUrl } from "../lib/assets";

const categoryIds: readonly CategoryId[] = ["surgery", "aesthetic"];

const primaryLinks = [
  { to: staticPaths.doctor, label: siteContent.navigation.doctor },
  { to: staticPaths.consultation, label: siteContent.navigation.consultation },
  { to: staticPaths.pricing, label: siteContent.navigation.pricing },
  { to: staticPaths.faq, label: siteContent.navigation.faq },
] as const;

const backdropDefinitions: Readonly<
  Record<string, { src: SiteAsset; scene: string; width: number; height: number }>
> = {
  home: { src: "/assets/hero.jpg", scene: "hero", width: 1600, height: 1066 },
  surgery: { src: "/assets/bg-surgery.jpg", scene: "surgery", width: 1600, height: 1066 },
  aesthetic: { src: "/assets/bg-aesthetic.jpg", scene: "aesthetic", width: 1600, height: 1066 },
  doctor: { src: "/assets/clinic.jpg", scene: "doctor", width: 1600, height: 1066 },
  precision: { src: "/assets/precision.jpg", scene: "precision", width: 1600, height: 1063 },
  contact: { src: "/assets/bg-tech.jpg", scene: "contact", width: 1600, height: 1066 },
};

function LanguageSwitch() {
  const t = useT();
  const { language, setLanguage } = useLanguage();

  return (
    <div className="language-switch" aria-label={t(siteContent.navigation.language)}>
      <button
        type="button"
        data-testid="language-pl"
        aria-pressed={language === "pl"}
        onClick={() => setLanguage("pl")}
      >
        PL
      </button>
      <span aria-hidden="true">/</span>
      <button
        type="button"
        data-testid="language-en"
        aria-pressed={language === "en"}
        onClick={() => setLanguage("en")}
      >
        EN
      </button>
    </div>
  );
}

function DesktopOfferMenu({
  open,
  setOpen,
  triggerRef,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: RefObject<HTMLButtonElement>;
}) {
  const t = useT();
  const menuRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Node && !menuRef.current?.parentElement?.contains(target)) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open, setOpen]);

  const focusFirstLink = () => {
    setOpen(true);
    window.requestAnimationFrame(() => firstLinkRef.current?.focus());
  };

  const handleTriggerKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      focusFirstLink();
    }
    if (event.key === "Escape" && open) {
      event.preventDefault();
      setOpen(false);
    }
  };

  const handleMenuKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Escape") return;
    event.preventDefault();
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div className="desktop-offer">
      <button
        className="desktop-offer-trigger"
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="desktop-offer-menu"
        aria-label={t(open ? siteContent.navigation.closeOffer : siteContent.navigation.openOffer)}
        data-testid="desktop-offer-trigger"
        ref={triggerRef}
        onClick={() => setOpen(!open)}
        onKeyDown={handleTriggerKeyDown}
      >
        {t(siteContent.navigation.offer)}
        <span aria-hidden="true">⌄</span>
      </button>
      <div
        id="desktop-offer-menu"
        className="desktop-offer-menu"
        hidden={!open}
        ref={menuRef}
        onKeyDown={handleMenuKeyDown}
      >
        {categoryIds.map((categoryId, categoryIndex) => {
          const category = categories[categoryId];
          return (
            <section key={category.id} aria-labelledby={`desktop-category-${category.id}`}>
              <NavLink
                id={`desktop-category-${category.id}`}
                className="desktop-category-link"
                to={categoryPath(category)}
                ref={categoryIndex === 0 ? firstLinkRef : undefined}
              >
                {t(category.label)}
              </NavLink>
              <ul>
                {category.featuredProcedureIds.map((procedureId) => {
                  const procedure = procedureById[procedureId];
                  return (
                    <li key={procedure.id}>
                      <NavLink to={procedurePath(procedure)}>
                        {t(procedure.shortTitle)}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function MobileOfferAccordion({ closeMenu }: { closeMenu: () => void }) {
  const t = useT();
  const [open, setOpen] = useState(false);

  return (
    <div className="mobile-offer-accordion">
      <button
        className="mobile-offer-trigger"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-offer-panel"
        onClick={() => setOpen((current) => !current)}
      >
        <span aria-hidden="true">02</span>
        {t(siteContent.navigation.offer)}
        <i aria-hidden="true">+</i>
      </button>
      <div id="mobile-offer-panel" className="mobile-offer-panel" hidden={!open}>
        {categoryIds.map((categoryId) => {
          const category = categories[categoryId];
          return (
            <section key={category.id} aria-labelledby={`mobile-category-${category.id}`}>
              <Link
                id={`mobile-category-${category.id}`}
                className="mobile-category-link"
                to={categoryPath(category)}
                onClick={closeMenu}
              >
                {t(category.label)}
              </Link>
              <ul>
                {category.featuredProcedureIds.map((procedureId) => {
                  const procedure = procedureById[procedureId];
                  return (
                    <li key={procedure.id}>
                      <Link to={procedurePath(procedure)} onClick={closeMenu}>
                        {t(procedure.shortTitle)}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function SiteHeader() {
  const t = useT();
  const location = useLocation();
  const [desktopOfferOpen, setDesktopOfferOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const desktopTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);
  const restoreMobileFocusRef = useRef(false);

  useEffect(() => {
    restoreMobileFocusRef.current = false;
    setDesktopOfferOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileOpen) {
      if (restoreMobileFocusRef.current) {
        restoreMobileFocusRef.current = false;
        window.requestAnimationFrame(() => mobileTriggerRef.current?.focus());
      }
      return;
    }

    const inertTargets = Array.from(
      document.querySelectorAll<HTMLElement>("main, footer, [data-menu-inert]"),
    );
    inertTargets.forEach((element) => {
      element.inert = true;
    });
    document.body.classList.add("menu-open");

    const focusTimer = window.setTimeout(() => {
      firstMobileLinkRef.current?.focus({ preventScroll: true });
    }, 30);

    const focusableElements = () =>
      Array.from(
        mobilePanelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((element) => element.getClientRects().length > 0 && !element.closest("[hidden]"));

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        restoreMobileFocusRef.current = true;
        setMobileOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusableElements();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      inertTargets.forEach((element) => {
        element.inert = false;
      });
      document.body.classList.remove("menu-open");
    };
  }, [mobileOpen]);

  useEffect(
    () => () => {
      document.querySelectorAll<HTMLElement>("main, footer, [data-menu-inert]").forEach((element) => {
        element.inert = false;
      });
      document.body.classList.remove("menu-open");
    },
    [],
  );

  const closeMobileForNavigation = () => {
    restoreMobileFocusRef.current = false;
    setMobileOpen(false);
  };

  const closeMobileAndRestore = () => {
    restoreMobileFocusRef.current = true;
    setMobileOpen(false);
  };

  return (
    <>
      <header className="site-header">
        <Link
          className="brand"
          to={staticPaths.home}
          aria-label={t(siteContent.navigation.homeAria)}
          data-menu-inert
        >
          <span className="brand-wordmark" aria-hidden="true">
            <strong>DR</strong>
            <span>GZIUT</span>
          </span>
        </Link>

        <nav
          className="desktop-nav"
          aria-label={t(siteContent.navigation.primaryLabel)}
          data-menu-inert
        >
          <NavLink end to={staticPaths.home}>
            {t(siteContent.navigation.home)}
          </NavLink>
          <DesktopOfferMenu
            open={desktopOfferOpen}
            setOpen={setDesktopOfferOpen}
            triggerRef={desktopTriggerRef}
          />
          {primaryLinks.map((item) => (
            <NavLink key={item.to} to={item.to}>
              {t(item.label)}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <a className="header-phone" href={siteContent.contact.phoneHref} data-menu-inert>
            {siteContent.contact.phoneDisplay}
          </a>
          <div data-menu-inert>
            <LanguageSwitch />
          </div>
          <Link className="header-cta" to={staticPaths.contact} data-menu-inert>
            {t(siteContent.navigation.book)}
          </Link>
          <button
            className="menu-trigger"
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={t(
              mobileOpen ? siteContent.navigation.closeMobile : siteContent.navigation.openMobile,
            )}
            data-testid="menu-trigger"
            ref={mobileTriggerRef}
            onClick={() => {
              if (mobileOpen) restoreMobileFocusRef.current = true;
              setMobileOpen((current) => !current);
            }}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`mobile-menu ${mobileOpen ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={t(siteContent.navigation.mobileDialog)}
        aria-hidden={!mobileOpen}
        data-testid="mobile-menu"
        ref={mobilePanelRef}
      >
        <div className="mobile-menu-meta">DrGziut · Szczecin</div>
        <nav aria-label={t(siteContent.navigation.mobileDialog)}>
          <NavLink
            end
            to={staticPaths.home}
            onClick={closeMobileForNavigation}
            ref={firstMobileLinkRef}
          >
            <span aria-hidden="true">01</span>
            {t(siteContent.navigation.home)}
          </NavLink>
          <MobileOfferAccordion closeMenu={closeMobileForNavigation} />
          {primaryLinks.map((item, index) => (
            <NavLink key={item.to} to={item.to} onClick={closeMobileForNavigation}>
              <span aria-hidden="true">{String(index + 3).padStart(2, "0")}</span>
              {t(item.label)}
            </NavLink>
          ))}
          <NavLink
            className="mobile-menu-cta"
            to={staticPaths.contact}
            onClick={closeMobileForNavigation}
          >
            <span aria-hidden="true">07</span>
            {t(siteContent.navigation.book)}
          </NavLink>
        </nav>
        <a className="mobile-phone" href={siteContent.contact.phoneHref}>
          {siteContent.contact.phoneDisplay}
        </a>
        <button className="mobile-menu-close" type="button" onClick={closeMobileAndRestore}>
          {t(siteContent.navigation.closeMobile)}
        </button>
      </div>
    </>
  );
}

function RouteBackdrop() {
  const location = useLocation();
  let backdrop = backdropDefinitions.precision;

  if (location.pathname === staticPaths.home) backdrop = backdropDefinitions.home;
  else if (location.pathname.startsWith(categoryPath("surgery"))) backdrop = backdropDefinitions.surgery;
  else if (location.pathname.startsWith(categoryPath("aesthetic"))) backdrop = backdropDefinitions.aesthetic;
  else if (location.pathname === staticPaths.doctor) backdrop = backdropDefinitions.doctor;
  else if (location.pathname === staticPaths.contact) backdrop = backdropDefinitions.contact;

  return (
    <div className="scene-stack" aria-hidden="true">
      <div className="scene-layer is-active" data-background={backdrop.scene}>
        <img
          key={backdrop.src}
          src={assetUrl(backdrop.src)}
          alt=""
          width={backdrop.width}
          height={backdrop.height}
          decoding="async"
          fetchPriority={location.pathname === staticPaths.home ? "high" : "auto"}
        />
      </div>
      <div className="scene-shade" />
    </div>
  );
}

function RouteFocusAndScroll() {
  const location = useLocation();
  const hasMounted = useRef(false);

  useEffect(() => {
    const shouldMoveFocus = hasMounted.current;
    hasMounted.current = true;
    const frame = window.requestAnimationFrame(() => {
      const main = document.getElementById("main-content");
      const hashTarget = location.hash
        ? document.getElementById(decodeURIComponent(location.hash.slice(1)))
        : null;
      const root = document.documentElement;
      const previousScrollBehavior = root.style.scrollBehavior;

      root.style.scrollBehavior = "auto";
      if (hashTarget) hashTarget.scrollIntoView();
      else window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      root.style.scrollBehavior = previousScrollBehavior;

      if (shouldMoveFocus) main?.focus({ preventScroll: true });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.hash, location.key, location.pathname]);

  return null;
}

function SiteFooter() {
  const t = useT();

  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <Link to={staticPaths.home} aria-label={t(siteContent.navigation.homeAria)}>
          <span className="footer-wordmark" aria-hidden="true">
            <strong>DR GZIUT</strong>
            <small>Chirurgia plastyczna · Medycyna estetyczna</small>
          </span>
        </Link>
      </div>
      <div className="footer-contact">
        <a href={siteContent.contact.phoneHref}>{siteContent.contact.phoneDisplay}</a>
        <a href={siteContent.contact.emailHref}>{siteContent.contact.email}</a>
        <span>{t(siteContent.contact.address)}</span>
      </div>
      <nav className="footer-navigation" aria-label={t(siteContent.footer.navigationLabel)}>
        <Link to={categoryPath("surgery")}>{t(categories.surgery.label)}</Link>
        <Link to={categoryPath("aesthetic")}>{t(categories.aesthetic.label)}</Link>
        <Link to={staticPaths.consultation}>{t(siteContent.navigation.consultation)}</Link>
        <Link to={staticPaths.pricing}>{t(siteContent.navigation.pricing)}</Link>
        <Link to={staticPaths.faq}>{t(siteContent.navigation.faq)}</Link>
        <Link to={staticPaths.contact}>{t(siteContent.navigation.contact)}</Link>
      </nav>
      <p className="footer-disclaimer">{t(siteContent.footer.disclaimer)}</p>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} DrGziut</span>
        <span>NPWZ {siteContent.physician.licenseNumber}</span>
      </div>
    </footer>
  );
}

export default function SiteLayout() {
  const t = useT();

  return (
    <div className="site-shell">
      <RouteBackdrop />
      <a className="skip-link" href="#main-content">
        {t(siteContent.navigation.skip)}
      </a>
      <SiteHeader />
      <RouteFocusAndScroll />
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
