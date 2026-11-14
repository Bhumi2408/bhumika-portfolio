"use client";

import { useEffect, useRef } from "react";

/** Fades/blurs children in when they scroll into view. */
export default function Reveal({ as: Tag = "div", delay = 0, className = "", style, children, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms`, ...style }} {...rest}>
      {children}
    </Tag>
  );
}

/** Heading whose words slide up one after another. Pass plain strings or nodes in `parts`. */
export function SplitHeading({ as: Tag = "h2", className = "", parts, delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  let i = 0;
  const words = [];
  parts.forEach((part, pi) => {
    if (typeof part === "string") {
      part.split(/(\s+)/).forEach((w, wi) => {
        if (!w) return;
        if (/^\s+$/.test(w)) return words.push(" ");
        const d = delay + i++ * 60;
        words.push(
          <span key={`${pi}-${wi}`} className="word">
            <span style={{ transitionDelay: `${d}ms` }}>{w}</span>
          </span>
        );
      });
    } else if (part?.type === "br") {
      words.push(part);
    } else {
      const d = delay + i++ * 60;
      words.push(
        <span key={pi} className="word">
          <span style={{ transitionDelay: `${d}ms` }}>{part}</span>
        </span>
      );
    }
  });

  return (
    <Tag ref={ref} className={className}>
      {words}
    </Tag>
  );
}
