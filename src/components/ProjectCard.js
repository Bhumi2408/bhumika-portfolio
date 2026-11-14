"use client";

import Image from "next/image";
import TiltCard from "./TiltCard";
import { ArrowUpRight } from "./Icons";

export function BrowserFrame({ project, className = "", priority = false, sizes = "(min-width:768px) 50vw, 100vw" }) {
  const host = project.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return (
    <div className={`overflow-hidden rounded-xl border border-line bg-surface-2 ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="mx-auto max-w-[70%] truncate rounded-md bg-fg/[0.05] px-3 py-0.5 font-mono text-[11px] text-faint">{host}</span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.name} website screenshot`}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.06]"
        />
      </div>
    </div>
  );
}

export default function ProjectCard({ project, index, priority }) {
  return (
    <TiltCard href={`/projects/${project.slug}`} tilt data-cursor="View" className="flex h-full flex-col p-3 sm:p-4">
      <div className="relative">
        <BrowserFrame project={project} priority={priority} />
      </div>
      <div className="relative flex flex-1 flex-col px-2 pb-2 pt-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="flex items-center gap-2 font-mono text-xs text-faint">
              {String(index + 1).padStart(2, "0")} /
              <span className="flex items-center gap-1.5 uppercase tracking-wider">
                <span className="h-2 w-2 rounded-full" style={{ background: project.accent }} />
                {project.kind}
              </span>
            </p>
            <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight text-fg">{project.name}</h3>
            <p className="text-sm text-muted">{project.tagline}</p>
          </div>
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line text-fg transition-all duration-500 group-hover:rotate-45 group-hover:border-fg group-hover:bg-fg group-hover:text-bg">
            <ArrowUpRight />
          </span>
        </div>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
          {project.tech.slice(0, 5).map((t) => (
            <span key={t} className="rounded-full border border-line bg-fg/[0.03] px-2.5 py-1 text-xs text-muted">
              {t}
            </span>
          ))}
        </div>
      </div>
    </TiltCard>
  );
}
