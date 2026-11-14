"use client";

import { useEffect, useRef } from "react";

/** A soft ring that trails the cursor and grows over interactive elements (desktop only). */
export default function Cursor() {
  const ring = useRef(null);
  const dot = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = ring.current;
    const d = dot.current;
    r.style.display = d.style.display = "block";

    let mx = -100, my = -100, rx = -100, ry = -100, raf;
    const move = (e) => {
      mx = e.clientX;
      my = e.clientY;
      d.style.transform = `translate(${mx}px, ${my}px)`;
      const t = e.target.closest?.("a, button, [data-cursor], input, textarea");
      const text = t?.getAttribute?.("data-cursor") || "";
      r.dataset.hover = t ? (text ? "label" : "link") : "";
      label.current.textContent = text;
    };
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      r.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    const leave = () => (r.style.opacity = d.style.opacity = "0");
    const enter = () => (r.style.opacity = d.style.opacity = "1");
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, []);

  return (
    <>
      <div ref={ring} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[120] hidden" style={{ transform: "translate(-100px,-100px)" }}>
        <div className="cursor-ring -translate-x-1/2 -translate-y-1/2">
          <span ref={label} />
        </div>
      </div>
      <div ref={dot} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[121] hidden">
        <div className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
      </div>
      <style>{`
        .cursor-ring{width:34px;height:34px;border-radius:999px;border:1.5px solid var(--accent);display:grid;place-items:center;
          transition:width .3s cubic-bezier(.2,.8,.2,1),height .3s cubic-bezier(.2,.8,.2,1),background .3s,border-color .3s;}
        .cursor-ring span{font:500 11px var(--font-jetbrains),monospace;letter-spacing:.08em;text-transform:uppercase;color:var(--bg);opacity:0;transition:opacity .2s}
        [data-hover="link"] .cursor-ring{width:54px;height:54px;background:color-mix(in oklab,var(--accent) 15%,transparent)}
        [data-hover="label"] .cursor-ring{width:84px;height:84px;background:var(--accent);border-color:var(--accent)}
        [data-hover="label"] .cursor-ring span{opacity:1}
      `}</style>
    </>
  );
}
