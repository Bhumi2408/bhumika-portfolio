"use client";

import { useSyncExternalStore } from "react";

const subscribe = (cb) => {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
};

export function useTheme() {
  return useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.theme || "dark",
    () => "dark"
  );
}

/** Switch theme with a circular reveal that starts at (x, y). */
export function setTheme(next, x = innerWidth / 2, y = 0) {
  const apply = () => {
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch {}
  };
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!document.startViewTransition || reduce) return apply();

  const t = document.startViewTransition(apply);
  t.ready.then(() => {
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
      { duration: 650, easing: "cubic-bezier(.4,0,.2,1)", pseudoElement: "::view-transition-new(root)" }
    );
  });
}

export function toggleTheme(x, y) {
  const cur = document.documentElement.dataset.theme === "light" ? "light" : "dark";
  setTheme(cur === "dark" ? "light" : "dark", x, y);
}

export const themeScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}d.dataset.theme=t;if(sessionStorage.getItem('booted'))d.dataset.booted='1'}catch(e){d.dataset.theme='dark'}})();`;
