"use client";

import { useEffect, useRef } from "react";

/** Vertical line that fills as the user scrolls through its parent. */
export default function ScrollLine({ className = "" }) {
  const ref = useRef(null);
  const fill = useRef(null);
  useEffect(() => {
    const on = () => {
      const parent = ref.current.parentElement.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight * 0.6 - parent.top) / parent.height));
      fill.current.style.transform = `scaleY(${p})`;
    };
    on();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => {
      removeEventListener("scroll", on);
      removeEventListener("resize", on);
    };
  }, []);
  return (
    <div ref={ref} aria-hidden="true" className={`absolute bottom-0 top-0 w-[2px] rounded bg-line ${className}`}>
      <div ref={fill} className="h-full w-full origin-top rounded bg-linear-to-b from-accent via-accent-2 to-accent-3" style={{ transform: "scaleY(0)" }} />
    </div>
  );
}
