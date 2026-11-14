"use client";

import { useEffect, useRef } from "react";

const lines = [
  ["$", "npm run bhumika"],
  ["›", "compiling components…"],
  ["✓", "loaded 10 projects"],
  ["✓", "connected to MongoDB"],
  ["✓", "ready on bhumika.dev"],
];

/** Terminal-style boot screen, shown once per browser session. */
export default function Loader() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (document.documentElement.dataset.booted) return;
    const rows = el.querySelectorAll("[data-row]");
    const bar = el.querySelector("[data-bar]");
    const timers = [];
    rows.forEach((row, i) => timers.push(setTimeout(() => row.classList.remove("opacity-0", "translate-y-2"), 120 + i * 230)));
    timers.push(setTimeout(() => (bar.style.transform = "scaleX(1)"), 50));
    timers.push(
      setTimeout(() => {
        el.classList.add("[clip-path:inset(0_0_100%_0)]");
        try { sessionStorage.setItem("booted", "1"); } catch {}
      }, 1650)
    );
    timers.push(setTimeout(() => (document.documentElement.dataset.booted = "1"), 2500));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      ref={ref}
      className="boot fixed inset-0 z-[200] flex items-center justify-center bg-bg px-6 transition-[clip-path] duration-700 ease-[cubic-bezier(.7,0,.2,1)] [clip-path:inset(0_0_0_0)]"
      aria-hidden="true"
    >
      <div className="w-full max-w-sm font-mono text-sm">
        {lines.map(([sym, text], i) => (
          <p key={i} data-row className="flex gap-3 py-1 opacity-0 translate-y-2 transition-all duration-300">
            <span className={sym === "✓" ? "text-lime" : "text-accent"}>{sym}</span>
            <span className={i === 0 ? "text-fg" : "text-muted"}>{text}</span>
          </p>
        ))}
        <div className="mt-6 h-[2px] overflow-hidden rounded bg-line">
          <div data-bar className="ring-gradient h-full origin-left transition-transform duration-[1500ms] ease-out" style={{ transform: "scaleX(0)" }} />
        </div>
      </div>
      <noscript>
        <style>{`.boot{display:none}`}</style>
      </noscript>
    </div>
  );
}
