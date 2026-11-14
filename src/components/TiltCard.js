"use client";

import Link from "next/link";
import { useRef } from "react";

/**
 * Card with a cursor-following glow and an optional subtle 3D tilt.
 * Pass `href` to make it a link (internal → next/link, external → <a target=_blank>).
 */
export default function TiltCard({ as = "div", href, tilt = false, className = "", children, ...rest }) {
  const ref = useRef(null);
  const external = href && /^(https?:|mailto:|tel:)/.test(href);
  const Comp = href ? (external ? "a" : Link) : as;
  const newTab = href && /^https?:/.test(href);
  const linkProps = href ? { href, ...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {}) } : {};

  const onMove = (e) => {
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--x", `${x}px`);
    el.style.setProperty("--y", `${y}px`);
    if (tilt && matchMedia("(pointer: fine)").matches) {
      const rx = (y / r.height - 0.5) * -5;
      const ry = (x / r.width - 0.5) * 5;
      el.style.transform = `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    }
  };
  const onLeave = () => {
    if (tilt) ref.current.style.transform = "";
  };

  return (
    <Comp ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={`card group ${className}`} {...linkProps} {...rest}>
      <span className="spot" aria-hidden="true" />
      {children}
    </Comp>
  );
}
