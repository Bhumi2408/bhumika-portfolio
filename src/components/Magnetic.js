"use client";

import { useRef } from "react";

/** Pulls its child slightly toward the cursor. */
export default function Magnetic({ strength = 0.3, className = "", children }) {
  const ref = useRef(null);
  const onMove = (e) => {
    if (!matchMedia("(pointer: fine)").matches) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };
  const onLeave = () => (ref.current.style.transform = "");
  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`inline-block transition-transform duration-300 ease-out ${className}`}
    >
      {children}
    </span>
  );
}
