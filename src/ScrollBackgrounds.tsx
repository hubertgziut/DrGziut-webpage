import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

/* ──────────────────────────────────────────────────────────────
   Scroll-driven cinematic backgrounds
   ──────────────────────────────────────────────────────────────
   A fixed, full-viewport stack of image layers lives BEHIND the
   page content (negative z-index, pointer-events none). Each
   section registers its own layer via <SectionBackground>; an
   IntersectionObserver (threshold 0.4) decides which section is
   in view and the layers crossfade (opacity, ~0.9s ease). The
   active layer gets a subtle GPU-only parallax (scale 1.06→1.0 +
   slight translateY, transform only, rAF-throttled, passive
   scroll listener — no scroll-jacking, no layout reads in the
   hot path beyond scrollY/innerHeight).

   When NO section is active (e.g. the footer) every layer fades
   out and the plain --bg body colour shows through — a subtle
   "default" state.

   prefers-reduced-motion: crossfade + parallax disabled, the
   first registered layer is shown statically.
   ────────────────────────────────────────────────────────────── */

interface ScrollBgContextValue {
  register: (id: string, src: string) => void;
  unregister: (id: string) => void;
  setActive: (id: string, active: boolean) => void;
}

const ScrollBgContext = createContext<ScrollBgContextValue | null>(null);

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Resolve asset URLs against the Vite base so images load both on the
   dev root and from the '/DrGziut-webpage/' base (GitHub Pages). */
const BASE = import.meta.env.BASE_URL || '/';
export const assetUrl = (src: string) =>
  src.startsWith('/') ? BASE.replace(/\/$/, '') + src : src;

export function ScrollBackgroundProvider({ children }: { children: ReactNode }) {
  // Registry of layers — Map preserves insertion order (= document order
  // on first mount, so layer #0 is the hero / first section).
  const [layers, setLayers] = useState<Map<string, string>>(new Map());
  // Ordered list of currently-active ids — the LAST one wins.
  const [activeIds, setActiveIds] = useState<string[]>([]);
  const layerRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const rafId = useRef(0);
  const [reduced] = useState(prefersReducedMotion);

  const register = useCallback((id: string, src: string) => {
    setLayers(prev => {
      if (prev.get(id) === src) return prev;
      const next = new Map(prev);
      next.set(id, src);
      return next;
    });
  }, []);

  const unregister = useCallback((id: string) => {
    setLayers(prev => {
      if (!prev.has(id)) return prev;
      const next = new Map(prev);
      next.delete(id);
      return next;
    });
    setActiveIds(prev => (prev.includes(id) ? prev.filter(x => x !== id) : prev));
  }, []);

  const setActive = useCallback((id: string, active: boolean) => {
    setActiveIds(prev => {
      const has = prev.includes(id);
      if (active && !has) return [...prev, id];
      if (!active && has) return prev.filter(x => x !== id);
      return prev;
    });
  }, []);

  const ctx = useMemo<ScrollBgContextValue>(
    () => ({ register, unregister, setActive }),
    [register, unregister, setActive]
  );

  const entries = Array.from(layers.entries());
  const topId = activeIds.length ? activeIds[activeIds.length - 1] : null;

  /* ── parallax: transform-only, rAF-throttled, passive listener ── */
  useEffect(() => {
    if (reduced || !topId) return;
    const el = layerRefs.current.get(topId);
    if (!el) return;
    const section = document.querySelector<HTMLElement>(`[data-bg-id="${topId}"]`);

    const apply = () => {
      rafId.current = 0;
      const vh = window.innerHeight || 1;
      let p = 0;
      if (section) {
        // progress of the active section through the viewport: 0 when its
        // top hits the viewport bottom, 1 when its bottom leaves the top
        const r = section.getBoundingClientRect();
        const total = r.height + vh;
        p = Math.min(1, Math.max(0, (vh - r.top) / total));
      } else {
        p = Math.min(1, Math.max(0, window.scrollY / vh));
      }
      const scale = 1.06 - 0.06 * p; // 1.06 → 1.0 as the section scrolls by
      const ty = (p - 0.5) * 32;     // ±16px gentle vertical drift
      el.style.transform = `translate3d(0, ${ty.toFixed(1)}px, 0) scale(${scale.toFixed(4)})`;
    };
    const onScroll = () => {
      if (!rafId.current) rafId.current = requestAnimationFrame(apply);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    apply();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = 0;
      }
    };
  }, [topId, reduced]);

  return (
    <ScrollBgContext.Provider value={ctx}>
      <div className="scroll-bg-stack" aria-hidden="true">
        {entries.map(([id, src], i) => {
          const isActive = reduced ? i === 0 : id === topId;
          return (
            <div
              key={id}
              ref={node => {
                if (node) layerRefs.current.set(id, node);
                else layerRefs.current.delete(id);
              }}
              className={`scroll-bg-layer${isActive ? ' active' : ''}`}
            >
              <img
                src={assetUrl(src)}
                alt=""
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </div>
          );
        })}
      </div>
      {children}
    </ScrollBgContext.Provider>
  );
}

/* ── <SectionBackground id="…" src="…"> wraps a section and ties a
      background layer to its visibility. Renders a plain wrapper div
      (no visual styling of its own beyond making sure content sits
      above the fixed stack). ── */
export function SectionBackground({
  id,
  src,
  children,
  className = '',
}: {
  id: string;
  src: string;
  children: ReactNode;
  className?: string;
}) {
  const ctx = useContext(ScrollBgContext);
  const ref = useRef<HTMLDivElement>(null);

  // Register / update the layer.
  useEffect(() => {
    if (!ctx) return;
    ctx.register(id, src);
    return () => ctx.unregister(id);
  }, [ctx, id, src]);

  // Observe visibility → mark layer active.
  useEffect(() => {
    const node = ref.current;
    if (!node || !ctx) return;
    const obs = new IntersectionObserver(
      ([entry]) => ctx.setActive(id, entry.isIntersecting),
      { threshold: 0.4 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [ctx, id]);

  return (
    <div ref={ref} className={`scroll-bg-section ${className}`} data-bg-id={id}>
      {children}
    </div>
  );
}

/* ── Hook variant for sections that already have their own element. ── */
export function useSectionBackground<T extends HTMLElement>(id: string, src: string) {
  const ctx = useContext(ScrollBgContext);
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ctx) return;
    ctx.register(id, src);
    return () => ctx.unregister(id);
  }, [ctx, id, src]);

  useEffect(() => {
    const node = ref.current;
    if (!node || !ctx) return;
    const obs = new IntersectionObserver(
      ([entry]) => ctx.setActive(id, entry.isIntersecting),
      { threshold: 0.4 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [ctx, id]);

  return ref;
}
