import Image from "next/image";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import { Container, PageHeader, SectionHead, Serif, CTA, Button } from "@/components/ui";
import { Cap, Trophy, Badge, Download, ArrowRight } from "@/components/Icons";
import { profile, education, achievements, certifications, services } from "@/data/portfolio";

export const metadata = {
  title: "About",
  description: "About Bhumika Garg — Full Stack Developer (MERN · Next.js) from Delhi, B.Tech Silver Medalist and M.Tech student.",
};

const facts = [
  ["name", profile.name],
  ["role", profile.role],
  ["based_in", profile.location],
  ["experience", "1.5+ years"],
  ["stack", "MERN · Next.js"],
  ["education", "B.Tech (9.62) · M.Tech"],
  ["status", "open_to_work"],
];

export default function About() {
  return (
    <>
      <PageHeader path="/about" index="01" title={["The developer ", <Serif key="s">behind</Serif>, " the code."]} bg="ABOUT">
        Silver-medal engineer turned full-stack developer — I care about clean APIs, fast pages and products that real customers use every day.
      </PageHeader>

      {/* story */}
      <section className="py-16">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <TiltCard tilt className="p-3">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.1rem]">
                <Image src={profile.photo} alt={profile.name} fill priority sizes="(min-width:1024px) 40vw, 100vw" className="object-cover object-[50%_30%]" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="font-display text-2xl font-semibold">{profile.name}</p>
                  <p className="font-mono text-sm text-white/70">{profile.role} · {profile.location}</p>
                </div>
              </div>
              <span className="absolute -right-2 top-8 rotate-6 rounded-2xl border border-line bg-surface px-3 py-2 text-sm font-medium text-fg shadow-xl sm:-right-5">
                🥈 Silver Medalist
              </span>
              <span className="absolute -left-2 top-1/2 -rotate-6 rounded-2xl border border-line bg-surface px-3 py-2 font-mono text-xs text-fg shadow-xl sm:-left-5">
                M.Tech <span className="text-accent">in progress…</span>
              </span>
            </TiltCard>
          </Reveal>

          <div className="min-w-0">
            <Reveal>
              <p className="font-display text-2xl font-medium leading-snug tracking-tight text-fg sm:text-3xl">
                {profile.about[0]}
              </p>
            </Reveal>
            {profile.about.slice(1).map((p, i) => (
              <Reveal key={i} delay={100 + i * 80}>
                <p className="mt-6 text-lg leading-relaxed text-muted">{p}</p>
              </Reveal>
            ))}

            {/* JSON-style quick facts */}
            <Reveal delay={200}>
              <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-surface font-mono text-sm">
                <div className="flex items-center justify-between border-b border-line px-5 py-3 text-xs text-faint">
                  <span>about.json</span>
                  <span>{facts.length} keys</span>
                </div>
                <div className="overflow-x-auto p-5 leading-7">
                  <p className="text-[var(--syn-punc)]">{"{"}</p>
                  {facts.map(([k, v], i) => (
                    <p key={k} className="whitespace-nowrap pl-5">
                      <span className="text-[var(--syn-key)]">&quot;{k}&quot;</span>
                      <span className="text-[var(--syn-punc)]">: </span>
                      {k === "status" ? (
                        <span className="text-[var(--syn-num)]">true</span>
                      ) : (
                        <span className="text-[var(--syn-str)]">&quot;{v}&quot;</span>
                      )}
                      {i < facts.length - 1 && <span className="text-[var(--syn-punc)]">,</span>}
                      {k === "status" && <span className="text-[var(--syn-com)]"> {"// open to work ✨"}</span>}
                    </p>
                  ))}
                  <p className="text-[var(--syn-punc)]">{"}"}</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={250} className="mt-8 flex flex-wrap gap-3">
              <Button href={profile.resume} download>
                <Download /> Download resume
              </Button>
              <Button href="/experience" variant="ghost">
                See my journey <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Button>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* what I do */}
      <section className="py-20">
        <Container>
          <SectionHead index="02" eyebrow="What I do" title={["Things I ", <Serif key="s">love</Serif>, " building."]} />
          <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 80} className="group bg-bg p-8 transition-colors duration-500 hover:bg-surface sm:p-10">
                <p className="font-mono text-sm text-accent">0{i + 1}.</p>
                <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-fg transition-transform duration-500 group-hover:translate-x-2">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-md leading-relaxed text-muted">{s.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* education + achievements + certifications */}
      <section className="py-20">
        <Container>
          <SectionHead index="03" eyebrow="Background" title={["Education & ", <Serif key="s">wins.</Serif>]} />

          <div className="grid gap-5 lg:grid-cols-3">
            {education.map((e, i) => (
              <Reveal key={e.degree} delay={i * 90}>
                <TiltCard className="flex h-full flex-col p-7">
                  <div className="relative flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/12 text-accent">
                      <Cap />
                    </span>
                    <span className="font-mono text-xs text-faint">{e.period}</span>
                  </div>
                  <p className="relative mt-8 font-display text-3xl font-semibold tracking-tight text-fg">{e.degree}</p>
                  <p className="relative mt-1 text-muted">{e.school}</p>
                  <p className="relative mt-auto pt-6">
                    <span className="inline-block rounded-full bg-lime/15 px-3 py-1 text-sm font-medium text-lime">{e.note}</span>
                  </p>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
            <Reveal>
              <TiltCard className="h-full p-7 sm:p-9">
                <p className="relative flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-faint">
                  <Trophy className="text-accent-3" /> Achievements
                </p>
                <ul className="relative mt-6 divide-y divide-line">
                  {achievements.map((a, i) => (
                    <li key={i} className="group/row flex items-baseline gap-5 py-4 first:pt-0 last:pb-0">
                      <span className="font-mono text-xs text-faint">0{i + 1}</span>
                      <p className="text-muted transition-transform duration-300 group-hover/row:translate-x-1">
                        <span className="font-semibold text-fg">{a.title}</span> — {a.detail}
                      </p>
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </Reveal>
            <Reveal delay={120}>
              <TiltCard className="h-full p-7 sm:p-9">
                <p className="relative flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-faint">
                  <Badge className="text-accent-2" /> Certifications
                </p>
                <ul className="relative mt-6 space-y-3">
                  {certifications.map((c) => (
                    <li key={c.title} className="flex items-center justify-between gap-4 rounded-2xl border border-line bg-fg/[0.02] p-4">
                      <div>
                        <p className="font-medium text-fg">{c.title}</p>
                        <p className="text-sm text-muted">{c.org}</p>
                      </div>
                      <span className="shrink-0 font-mono text-xs text-faint">{c.period}</span>
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </Reveal>
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
