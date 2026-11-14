"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";
import { ArrowUpRight, Layout } from "./Icons";

const filters = [
  { key: "All", label: "All work" },
  { key: "E-commerce", label: "E-commerce" },
  { key: "Website", label: "Websites" },
];

const ListIcon = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}>
    <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
  </svg>
);

function ListView({ list }) {
  const preview = useRef(null);
  const [hover, setHover] = useState(null);

  const onMove = (e) => {
    const el = preview.current;
    if (!el) return;
    el.style.transform = `translate(${e.clientX + 24}px, ${e.clientY - 110}px)`;
  };

  return (
    <div onMouseMove={onMove} onMouseLeave={() => setHover(null)} className="relative">
      <ul className="border-t border-line">
        {list.map((p, i) => (
          <li key={p.slug}>
            <Link
              href={`/projects/${p.slug}`}
              onMouseEnter={() => setHover(p)}
              className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-line py-6 transition-colors sm:grid-cols-[3rem_1.4fr_1fr_auto] sm:gap-6 sm:py-8"
            >
              <span className="font-mono text-xs text-faint">{String(i + 1).padStart(2, "0")}</span>
              <span className="min-w-0">
                <span className="block truncate font-display text-2xl font-semibold tracking-tight text-fg transition-all duration-500 group-hover:translate-x-3 group-hover:text-accent sm:text-4xl">
                  {p.name}
                </span>
                <span className="mt-1 block truncate text-sm text-muted sm:hidden">{p.tagline}</span>
              </span>
              <span className="hidden text-sm text-muted sm:block">
                {p.tagline}
                <span className="mt-1 block font-mono text-xs text-faint">{p.tech.slice(0, 3).join(" · ")}</span>
              </span>
              <span className="grid h-10 w-10 place-items-center rounded-full border border-line text-fg transition-all duration-500 group-hover:rotate-45 group-hover:bg-fg group-hover:text-bg">
                <ArrowUpRight />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* floating preview that follows the cursor (desktop) */}
      <div
        ref={preview}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-40 hidden w-[340px] transition-[opacity,scale] duration-300 lg:block"
        style={{ opacity: hover ? 1 : 0, scale: hover ? "1" : "0.85" }}
      >
        {hover && (
          <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-2xl">
            <div className="relative aspect-[16/10]">
              <Image src={hover.image} alt="" fill sizes="340px" className="object-cover object-top" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProjectsExplorer({ projects }) {
  const [filter, setFilter] = useState("All");
  const [view, setView] = useState("grid");
  const list = projects.filter((p) => filter === "All" || p.kind === filter);

  return (
    <>
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const count = f.key === "All" ? projects.length : projects.filter((p) => p.kind === f.key).length;
            const on = filter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`rounded-full border px-4 py-2 text-sm transition-all duration-300 ${
                  on ? "border-fg bg-fg text-bg" : "border-line text-muted hover:border-accent hover:text-fg"
                }`}
              >
                {f.label}
                <sup className={`ml-1 font-mono text-[10px] ${on ? "text-bg/60" : "text-faint"}`}>{count}</sup>
              </button>
            );
          })}
        </div>
        <div className="flex rounded-full border border-line p-1">
          {[
            { k: "grid", icon: <Layout width={18} height={18} />, label: "Grid view" },
            { k: "list", icon: <ListIcon />, label: "List view" },
          ].map((v) => (
            <button
              key={v.k}
              onClick={() => setView(v.k)}
              aria-label={v.label}
              aria-pressed={view === v.k}
              className={`grid h-9 w-9 place-items-center rounded-full transition ${view === v.k ? "bg-fg text-bg" : "text-muted hover:text-fg"}`}
            >
              {v.icon}
            </button>
          ))}
        </div>
      </div>

      {view === "grid" ? (
        <div key={filter} className="grid gap-5 md:grid-cols-2 md:gap-6">
          {list.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 100} className={i % 2 === 1 ? "md:translate-y-16" : ""}>
              <ProjectCard project={p} index={projects.indexOf(p)} priority={i < 2} />
            </Reveal>
          ))}
        </div>
      ) : (
        <ListView list={list} />
      )}
      {view === "grid" && <div className="hidden h-16 md:block" />}
    </>
  );
}
