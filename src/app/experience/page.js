import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import ScrollLine from "@/components/ScrollLine";
import { Container, PageHeader, Serif, CTA } from "@/components/ui";
import { Branch } from "@/components/Icons";
import { experience, milestones, profile } from "@/data/portfolio";

export const metadata = {
  title: "Experience",
  description: "Work experience of Bhumika Garg — Full Stack Developer at Bharat Bizmart (Cybertricks Media Group) and Web Developer Intern at Kreativan Technologies.",
};

// chronological (newest first) mix of jobs and milestones
const log = [
  { kind: "job", ...experience[0] },
  { kind: "note", ...milestones[0] },
  { kind: "job", ...experience[1] },
  { kind: "note", ...milestones[1] },
  { kind: "note", ...milestones[2] },
  { kind: "note", ...milestones[3] },
];

const typeColor = {
  feat: "text-[var(--syn-key)]",
  release: "text-lime",
  award: "text-accent-3",
  init: "text-accent-2",
};

function JobCommit({ c, i }) {
  return (
    <Reveal delay={i * 60} className="relative pl-12 sm:pl-16">
      <span className="absolute left-[11px] top-7 grid h-6 w-6 -translate-x-1/2 place-items-center rounded-full border-2 border-accent bg-bg sm:left-[19px]">
        <span className={`h-2.5 w-2.5 rounded-full ${c.current ? "animate-pulse bg-accent" : "bg-accent/60"}`} />
      </span>
      <TiltCard className="p-6 sm:p-8">
        <div className="relative font-mono text-[13px]">
          <p className="flex flex-wrap items-center gap-2">
            <span className="text-[var(--syn-num)]">commit {c.hash}</span>
            {c.refs.map((r) => (
              <span
                key={r}
                className={`rounded-md px-2 py-0.5 text-[11px] ${
                  r.startsWith("HEAD") ? "bg-[var(--syn-key)]/15 text-[var(--syn-key)]" : "bg-lime/15 text-lime"
                }`}
              >
                {r}
              </span>
            ))}
          </p>
          <p className="mt-2 text-faint">
            Author: <span className="text-muted">{profile.name}</span>
          </p>
          <p className="text-faint">
            Date:&nbsp;&nbsp; <span className="text-muted">{c.period}</span> · <span className="text-muted">{c.location}</span>
          </p>
        </div>

        <h2 className="relative mt-6 font-display text-[clamp(1.6rem,4vw,2.4rem)] font-semibold leading-tight tracking-tight text-fg">
          <span className="font-mono text-base font-normal text-lime">feat: </span>
          {c.role}
        </h2>
        <p className="relative mt-1 text-lg text-muted">@ {c.company}</p>

        <ul className="relative mt-6 space-y-3">
          {c.points.map((pt, k) => (
            <li key={k} className="flex gap-3 leading-relaxed text-muted">
              <span className="mt-1 font-mono text-sm text-lime">+</span>
              <span>{pt}</span>
            </li>
          ))}
        </ul>

        <div className="relative mt-6 flex flex-wrap gap-1.5">
          {c.tags.map((t) => (
            <span key={t} className="rounded-full border border-line bg-fg/[0.03] px-2.5 py-1 font-mono text-xs text-muted">
              {t}
            </span>
          ))}
        </div>
      </TiltCard>
    </Reveal>
  );
}

function NoteCommit({ c, i }) {
  return (
    <Reveal delay={i * 60} className="relative pl-12 sm:pl-16">
      <span className="absolute left-[11px] top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-line bg-surface sm:left-[19px]" />
      <div className="group flex flex-wrap items-center gap-x-4 gap-y-1 rounded-2xl border border-transparent px-4 py-3 font-mono text-[13px] transition hover:border-line hover:bg-surface">
        <span className="text-[var(--syn-num)]">{c.hash}</span>
        <span className="flex items-center gap-1 rounded-md bg-fg/[0.05] px-2 py-0.5 text-[11px] text-faint">
          <Branch width={12} height={12} /> {c.branch}
        </span>
        <span className="text-faint">{c.date}</span>
        <span className="basis-full font-sans text-[15px] text-fg sm:basis-auto">
          <span className={`font-mono text-[13px] ${typeColor[c.type]}`}>{c.type}: </span>
          {c.text}
        </span>
      </div>
    </Reveal>
  );
}

export default function Experience() {
  return (
    <>
      <PageHeader path="/experience" index="02" title={["My ", <Serif key="s">git log</Serif>, " so far."]} bg="LOG">
        Every role, release and milestone — committed to main. Scroll through the history of how I got here.
      </PageHeader>

      <section className="pb-12">
        <Container>
          <Reveal>
            <p className="mb-10 inline-flex max-w-full items-center gap-2 overflow-x-auto rounded-xl border border-line bg-surface px-4 py-3 font-mono text-sm">
              <span className="text-lime">$</span>
              <span className="whitespace-nowrap text-fg">git log --graph --decorate career</span>
              <span className="h-4 w-[7px] shrink-0 animate-blink bg-accent" />
            </p>
          </Reveal>

          <div className="relative space-y-8">
            <ScrollLine className="left-[11px] sm:left-[19px]" />
            {log.map((c, i) => (c.kind === "job" ? <JobCommit key={c.hash} c={c} i={i} /> : <NoteCommit key={c.hash} c={c} i={i} />))}
            <Reveal className="relative pl-12 font-mono text-sm text-faint sm:pl-16">
              <span className="absolute left-[11px] top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-line sm:left-[19px]" />
              (root) — and the next commit could be with your team 🚀
            </Reveal>
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
