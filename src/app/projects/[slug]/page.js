import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal, { SplitHeading } from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import { BrowserFrame } from "@/components/ProjectCard";
import { Container, Button, CTA } from "@/components/ui";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Globe } from "@/components/Icons";
import { projects } from "@/data/portfolio";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: p.name,
    description: `${p.name} — ${p.tagline}. ${p.description}`,
    openGraph: { images: [p.image] },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i === -1) notFound();
  const p = projects[i];
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  const host = p.url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <>
      <section className="relative overflow-hidden pb-12 pt-32 sm:pt-40">
        <div className="line-grid fade-mask pointer-events-none absolute inset-0 opacity-70" />
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-[460px] w-[min(900px,140vw)] -translate-x-1/2 rounded-full opacity-30 blur-[120px]"
          style={{ background: p.accent }}
        />
        <Container className="relative">
          <Reveal>
            <Link href="/projects" className="group mb-8 inline-flex items-center gap-2 font-mono text-sm text-muted transition hover:text-fg">
              <ArrowLeft width={16} height={16} className="transition-transform group-hover:-translate-x-1" /> cd ../projects
            </Link>
          </Reveal>
          <Reveal delay={60} className="flex flex-wrap items-center gap-2">
            <span className="rounded-full px-3 py-1 font-mono text-xs font-medium uppercase tracking-wider text-white" style={{ background: p.accent }}>
              {p.kind}
            </span>
            <span className="font-mono text-xs text-faint">
              project {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
          </Reveal>
          <SplitHeading
            as="h1"
            parts={[p.name]}
            className="mt-5 font-display text-[clamp(2.6rem,9vw,7rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-fg"
          />
          <Reveal delay={200} className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <p className="max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{p.tagline}.</p>
            <Button href={p.url} external cursor="Visit">
              Visit live site <ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Button>
          </Reveal>
        </Container>
      </section>

      <Container>
        <Reveal>
          <a href={p.url} target="_blank" rel="noopener noreferrer" data-cursor="Visit" className="group block">
            <div className="rounded-2xl border border-line bg-surface p-2 shadow-[0_40px_120px_-50px_var(--glow)] sm:p-3">
              <BrowserFrame project={p} priority sizes="(min-width:1200px) 1150px, 100vw" />
            </div>
          </a>
        </Reveal>
      </Container>

      <section className="py-20">
        <Container className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="min-w-0">
            <Reveal>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-faint">Overview</p>
              <p className="font-display text-2xl font-medium leading-snug tracking-tight text-fg sm:text-3xl">{p.description}</p>
            </Reveal>

            <Reveal delay={100}>
              <p className="mb-5 mt-14 font-mono text-xs uppercase tracking-[0.25em] text-faint">Key features</p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-4 text-fg">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-lime/15 text-lime">
                      <Check width={14} height={14} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={150} className="lg:sticky lg:top-28 lg:self-start">
            <TiltCard className="p-7">
              <dl className="relative space-y-6">
                <div>
                  <dt className="font-mono text-xs uppercase tracking-widest text-faint">Type</dt>
                  <dd className="mt-1 text-lg text-fg">{p.kind === "E-commerce" ? "Full-stack e-commerce platform" : "Business website"}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-widest text-faint">Stack</dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <span key={t} className="rounded-full border border-line bg-fg/[0.03] px-3 py-1 text-sm text-fg">
                        {t}
                      </span>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-widest text-faint">Live</dt>
                  <dd className="mt-1">
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 break-all text-lg text-fg underline decoration-line underline-offset-4 transition hover:decoration-accent">
                      <Globe width={16} height={16} className="shrink-0" /> {host}
                    </a>
                  </dd>
                </div>
              </dl>
            </TiltCard>
          </Reveal>
        </Container>
      </section>

      {/* prev / next */}
      <Container>
        <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2">
          {[
            { p: prev, label: "Previous", icon: <ArrowLeft />, align: "" },
            { p: next, label: "Next project", icon: <ArrowRight />, align: "sm:text-right sm:items-end" },
          ].map(({ p: q, label, icon, align }) => (
            <Link key={label} href={`/projects/${q.slug}`} className={`group flex flex-col gap-2 bg-bg p-8 transition-colors duration-500 hover:bg-surface sm:p-10 ${align}`}>
              <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-faint">
                {label === "Previous" && icon} {label} {label !== "Previous" && icon}
              </span>
              <span className="font-display text-2xl font-semibold tracking-tight text-fg transition-colors group-hover:text-accent sm:text-3xl">{q.name}</span>
              <span className="text-sm text-muted">{q.tagline}</span>
            </Link>
          ))}
        </div>
      </Container>

      <CTA />
    </>
  );
}
