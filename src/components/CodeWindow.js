"use client";

import { useEffect, useRef, useState } from "react";

// [tokenType, text]  — k: keyword, v: variable, p: punctuation, key: object key, s: string, n: number/bool, c: comment, f: function
const CODE = [
  [["c", "// hello world 👋"]],
  [["k", "const "], ["v", "bhumika"], ["p", " = {"]],
  [["key", "  role"], ["p", ": "], ["s", '"Full Stack Developer"'], ["p", ","]],
  [["key", "  location"], ["p", ": "], ["s", '"Delhi, India"'], ["p", ","]],
  [["key", "  stack"], ["p", ": ["], ["s", '"MongoDB"'], ["p", ", "], ["s", '"Express"'], ["p", ", "], ["s", '"React"'], ["p", ", "], ["s", '"Node"'], ["p", ", "], ["s", '"Next.js"'], ["p", "],"]],
  [["key", "  experience"], ["p", ": "], ["s", '"1.5+ years"'], ["p", ","]],
  [["key", "  shipped"], ["p", ": { "], ["key", "ecommerce"], ["p", ": "], ["n", "4"], ["p", ", "], ["key", "websites"], ["p", ": "], ["n", "10"], ["p", " },"]],
  [["key", "  education"], ["p", ": "], ["s", '"B.Tech 🥈 · M.Tech"'], ["p", ","]],
  [["key", "  openToWork"], ["p", ": "], ["n", "true"], ["p", ","]],
  [["p", "};"]],
  [],
  [["k", "export default "], ["f", "hire"], ["p", "("], ["v", "bhumika"], ["p", ");"]],
];

const color = {
  k: "text-[var(--syn-kw)]",
  v: "text-fg",
  p: "text-[var(--syn-punc)]",
  key: "text-[var(--syn-key)]",
  s: "text-[var(--syn-str)]",
  n: "text-[var(--syn-num)]",
  c: "text-[var(--syn-com)] italic",
  f: "text-[var(--syn-fn)]",
};

const TOTAL = CODE.reduce((a, l) => a + l.reduce((b, [, t]) => b + t.length, 0) + 1, 0);

/** Returns the code truncated to the first `n` characters, plus the line the cursor is on. */
function sliceCode(n) {
  let left = n;
  let cursorLine = -1;
  const lines = CODE.map((line, li) => {
    const out = [];
    for (let ti = 0; ti < line.length; ti++) {
      const [type, text] = line[ti];
      if (left <= 0) break;
      const part = text.slice(0, left);
      left -= part.length;
      out.push(
        <span key={ti} className={color[type]}>
          {part}
        </span>
      );
    }
    if (left > 0) left -= 1; // newline
    else if (cursorLine === -1) cursorLine = li;
    return out;
  });
  if (cursorLine === -1) cursorLine = CODE.length - 1;
  return { lines, cursorLine };
}

export default function CodeWindow({ className = "", filename = "bhumika.js" }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    let id;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        if (matchMedia("(prefers-reduced-motion: reduce)").matches) return setN(TOTAL);
        id = setInterval(() => {
          setN((c) => {
            if (c >= TOTAL) {
              clearInterval(id);
              return c;
            }
            return c + 2;
          });
        }, 18);
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearInterval(id);
    };
  }, []);

  const { lines, cursorLine } = sliceCode(n);

  return (
    <div ref={ref} className={`overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_30px_80px_-40px_var(--glow)] ${className}`}>
      <div className="flex items-center gap-2 border-b border-line bg-fg/[0.03] px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 flex items-center gap-2 rounded-md border border-line bg-bg/60 px-2.5 py-0.5 font-mono text-xs text-muted">
          <span className="text-[#f7df1e]">JS</span> {filename}
        </span>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[12px] leading-6 sm:p-5 sm:text-[13.5px]">
        {lines.map((l, i) => (
          <div key={i} className="flex min-h-6">
            <span className="mr-4 inline-block w-5 shrink-0 select-none text-right text-faint/70">{i + 1}</span>
            <span className="whitespace-pre">
              {l}
              {i === cursorLine && <span className="ml-px inline-block h-4 w-[7px] translate-y-[3px] animate-blink bg-accent" />}
            </span>
          </div>
        ))}
      </pre>
    </div>
  );
}
