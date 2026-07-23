import { useCallback, useEffect, useRef, useState } from "react";
import { pageContent } from "../content/site";
import { useT } from "../i18n";

export default function ProcedureLocalNav() {
  const t = useT();
  const trackRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ atStart: true, atEnd: false });
  const copy = pageContent.procedure;
  const guideLabels = copy.guideItems.map((item) => t(item.label));
  const guideLabelKey = guideLabels.join("\u001f");

  const updateEdges = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    setEdges({
      atStart: track.scrollLeft <= 2,
      atEnd: maxScroll - track.scrollLeft <= 2,
    });
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(updateEdges);
    const observer = new ResizeObserver(updateEdges);
    const track = trackRef.current;
    if (track) {
      observer.observe(track);
      Array.from(track.children).forEach((child) => observer.observe(child));
    }
    window.addEventListener("resize", updateEdges);
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", updateEdges);
    };
  }, [guideLabelKey, updateEdges]);

  return (
    <nav
      className="procedure-local-nav"
      aria-label={t(copy.guideLabel)}
      data-testid="procedure-local-nav"
      data-at-start={String(edges.atStart)}
      data-at-end={String(edges.atEnd)}
    >
      <span className="procedure-local-nav-label">{t(copy.guideLabel)}</span>
      <div
        className="procedure-local-nav-track"
        data-testid="procedure-local-nav-track"
        ref={trackRef}
        onScroll={updateEdges}
      >
        {copy.guideItems.map((item, index) => (
          <a href={`#${item.id}`} key={item.id}>
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            {guideLabels[index]}
          </a>
        ))}
      </div>
    </nav>
  );
}
