import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import ScrollLine from "@/components/ScrollLine";
import JsonLd from "@/components/JsonLd";
import { Container, PageHeader, SectionHead, Serif, CTA } from "@/components/ui";
import { Pin, Clock, Cap, Trophy, Check } from "@/components/Icons";
import { experience, milestones } from "@/data/portfolio";
import { pageMeta, breadcrumbSchema } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Experience",
  description:
    "Work experience of Bhumika Garg — Full Stack Developer at Bharat Bizmart (Cybertricks Media Group) building MERN & Next.js e-commerce platforms, and Web Developer Intern at Kreativan Technologies.",
  path: "/experience",
  keywords: ["Bhumika Garg experience", "Full Stack Developer Bharat Bizmart", "Cybertricks Media developer"],
});

const milestoneIcon = { education: Cap, achievements: Trophy };

function Job({ job, i }) {
  return (
    <Reveal delay={i * 80} className="relative pl-12 sm:pl-16">
      {/* dot on the timeline */}
      <span className="absolute left-[11px] top-9 grid h-6 w-6 -translate-x-1/2 place-items-center rounded-full border-2 border-accent bg-bg sm:left-[19px]">
        <span className={`h-2.5 w-2.5 rounded-full ${job.current ? "animate-pulse bg-accent" : "bg-accent/60"}`} />
      </span>

      <TiltCard className="p-6 sm:p-9">
        <div className="relative flex flex-wrap items-center gap-2 text-sm">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-fg/[0.03] px-3 py-1 text-muted">
            <Clock width={14} height={14} /> {job.period}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-fg/[0.03] px-3 py-1 text-muted">
            <Pin width={14} height={14} /> {job.location}
          </span>
          {job.current && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-lime/15 px-3 py-1 font-medium text-lime">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" /> Current role
            </span>
          )}
        </div>

        <h2 className="relative mt-6 font-display text-[clamp(1.7rem,4vw,2.6rem)] font-semibold leading-tight tracking-tight text-fg">{job.role}</h2>
        <p className="relative mt-1 text-lg text-accent">{job.company}</p>

        <p className="relative mb-4 mt-8 font-mono text-xs uppercase tracking-[0.2em] text-faint">What I did</p>
        <ul className="relative space-y-3">
          {job.points.map((pt, k) => (
            <li key={k} className="flex gap-3 leading-relaxed text-muted">
              <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/12 text-accent">
                <Check width={12} height={12} />
              </span>
              <span>{pt}</span>
            </li>
          ))}
        </ul>

        <p className="relative mb-3 mt-8 font-mono text-xs uppercase tracking-[0.2em] text-faint">Skills used</p>
        <div className="relative flex flex-wrap gap-1.5">
          {job.tags.map((t) => (
            <span key={t} className="rounded-full border border-line bg-fg/[0.03] px-3 py-1 text-sm text-muted">
              {t}
            </span>
          ))}
        </div>
      </TiltCard>
    </Reveal>
  );
}

export default function Experience() {
  // oldest → newest reads naturally as a story
  const journey = [...milestones].reverse();

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Experience", path: "/experience" }])} />
      <PageHeader path="/experience" index="02" title={["My work ", <Serif key="s">experience.</Serif>]} bg="WORK">
        Where I&apos;ve worked, what I built there, and the milestones that brought me here.
      </PageHeader>

      {/* quick summary */}
      <section className="pb-10">
        <Container>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-4">
            {[
              ["1.5+ yrs", "Hands-on experience"],
              ["2", "Companies"],
              ["4", "E-commerce stores shipped"],
              ["10+", "Live websites"],
            ].map(([v, l], i) => (
              <Reveal key={l} delay={i * 70} className="bg-bg p-6 sm:p-8">
                <p className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                  <span className="text-gradient">{v}</span>
                </p>
                <p className="mt-1 text-sm text-muted">{l}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* jobs */}
      <section className="py-12">
        <Container>
          <SectionHead index="01" eyebrow="Work" title={["Where I've ", <Serif key="s">worked.</Serif>]} />
          <div className="relative space-y-10">
            <ScrollLine className="left-[11px] sm:left-[19px]" />
            {experience.map((job, i) => (
              <Job key={job.company} job={job} i={i} />
            ))}
          </div>
        </Container>
      </section>

      {/* milestones */}
      <section className="py-20">
        <Container>
          <SectionHead index="02" eyebrow="Milestones" title={["Education & ", <Serif key="s">milestones.</Serif>]} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {journey.map((m, i) => {
              const Icon = milestoneIcon[m.branch] || Cap;
              return (
                <Reveal key={m.text} delay={i * 90}>
                  <TiltCard className="flex h-full flex-col p-6">
                    <div className="relative flex items-center justify-between">
                      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent/12 text-accent">
                        <Icon />
                      </span>
                      <span className="font-display text-2xl font-semibold text-faint">{m.date}</span>
                    </div>
                    <p className="relative mt-6 leading-relaxed text-fg">{m.text}</p>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
