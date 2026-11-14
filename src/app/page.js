import Image from "next/image";
import Link from "next/link";
import Reveal, { SplitHeading } from "@/components/Reveal";
import RoleTyper from "@/components/RoleTyper";
import CodeWindow from "@/components/CodeWindow";
import Terminal from "@/components/Terminal";
import TiltCard from "@/components/TiltCard";
import CountUp from "@/components/CountUp";
import LocalTime from "@/components/LocalTime";
import Orbit from "@/components/Orbit";
import ProjectCard from "@/components/ProjectCard";
import { Container, SectionHead, Serif, Marquee, Button, CTA } from "@/components/ui";
import { ArrowRight, ArrowUpRight, Download, Pin, Clock, iconMap } from "@/components/Icons";
import { profile, stats, marquee, projects, services, orbit } from "@/data/portfolio";
import JsonLd from "@/components/JsonLd";
import { profilePageSchema } from "@/lib/seo";

function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-32 lg:pt-28">
      <div className="line-grid fade-mask pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -left-32 top-10 h-[460px] w-[460px] animate-blob rounded-full bg-accent/25 blur-[110px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-[420px] w-[420px] animate-blob rounded-full bg-accent-2/20 blur-[110px] [animation-delay:-7s]" />

      <Container className="relative grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="min-w-0">
          <Reveal className="flex flex-wrap items-center gap-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 py-1.5 pl-2.5 pr-3.5 text-sm text-fg backdrop-blur transition hover:border-lime"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-lime" />
              </span>
              Available for work
            </Link>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/70 px-3 py-1.5 font-mono text-xs text-muted backdrop-blur">
              <Pin width={13} height={13} /> Delhi · <LocalTime />
            </span>
          </Reveal>

          <Reveal delay={100}>
            <p className="mt-8 text-lg text-muted sm:text-xl">
              Hi there <span className="inline-block origin-[70%_70%] animate-wave">👋</span> I&apos;m{" "}
              <span className="font-semibold text-fg">{profile.name}</span>
            </p>
          </Reveal>

          <SplitHeading
            as="h1"
            delay={150}
            className="mt-3 font-display text-[clamp(2.9rem,8.5vw,6.6rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-fg"
            parts={[
              "Full-stack",
              <br key="b1" />,
              <span key="pill" className="mr-[0.2em] inline-flex h-[0.78em] translate-y-[0.06em] items-center rounded-full ring-gradient px-[0.28em] align-middle font-mono text-[0.42em] font-medium tracking-normal text-white">
                {"</>"}
              </span>,
              "developer",
              <br key="b2" />,
              "who ",
              <Serif key="s">ships.</Serif>,
            ]}
          />

          <Reveal delay={450}>
            <p className="mt-7 font-mono text-sm text-muted sm:text-base">
              <span className="text-lime">❯</span> <RoleTyper words={profile.roles} />
            </p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">{profile.intro}</p>
          </Reveal>

          <Reveal delay={550} className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="/projects" cursor="Go">
              View my work <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Button>
            <Button href={profile.resume} download variant="ghost">
              <Download /> Download CV
            </Button>
          </Reveal>
        </div>

        <Reveal delay={300} className="mx-auto w-full max-w-[300px] sm:max-w-[460px] lg:max-w-none">
          <Orbit
            rings={orbit}
            center={
              <div className="relative h-[clamp(96px,28cqw,170px)] w-[clamp(96px,28cqw,170px)]">
                <div className="ring-gradient absolute -inset-1 animate-spin-slow rounded-full opacity-90" />
                <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-bg">
                  <Image src={profile.photo} alt={profile.name} fill priority sizes="200px" className="object-cover object-[50%_32%]" />
                </div>
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-fg px-3 py-1 font-mono text-[11px] text-bg shadow-lg">
                  @bhumika
                </span>
              </div>
            }
          />
        </Reveal>
      </Container>

      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-faint md:flex">
        scroll
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_1.8s_ease-in-out_infinite] bg-accent" />
        </span>
        <style>{`@keyframes scrollcue{0%{transform:translateY(-100%)}100%{transform:translateY(200%)}}`}</style>
      </div>
    </section>
  );
}

function Strip() {
  return (
    <div className="overflow-hidden py-10">
      <div className="-mx-4 -rotate-2 border-y border-line bg-surface py-5">
        <Marquee items={marquee} />
      </div>
    </div>
  );
}

function Snapshot() {
  return (
    <section className="py-24">
      <Container>
        <SectionHead
          index="01"
          eyebrow="Snapshot"
          title={["Code is how I ", <Serif key="s">think.</Serif>]}
          action={
            <Link href="/about" className="group inline-flex items-center gap-2 text-sm font-medium text-fg">
              More about me
              <span className="grid h-9 w-9 place-items-center rounded-full border border-line transition group-hover:rotate-45 group-hover:bg-fg group-hover:text-bg">
                <ArrowUpRight width={16} height={16} />
              </span>
            </Link>
          }
        />

        <div className="grid gap-5 lg:grid-cols-3">
          <Reveal className="min-w-0 lg:col-span-2 lg:row-span-2">
            <CodeWindow className="h-full" />
          </Reveal>

          <Reveal delay={100}>
            <TiltCard className="flex h-full flex-col justify-between gap-6 p-7">
              <div className="relative flex items-center justify-between">
                <p className="font-mono text-xs uppercase tracking-widest text-faint">Currently</p>
                <span className="flex items-center gap-1.5 rounded-full bg-lime/15 px-2.5 py-1 text-xs font-medium text-lime">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" /> Live
                </span>
              </div>
              <div className="relative">
                <p className="font-display text-2xl font-semibold text-fg">{profile.role}</p>
                <p className="mt-1 text-muted">
                  @ {profile.company} <span className="text-faint">· {profile.companyGroup}</span>
                </p>
              </div>
            </TiltCard>
          </Reveal>

          <Reveal delay={180}>
            <TiltCard className="relative h-full overflow-hidden p-7">
              <div className="dot-grid pointer-events-none absolute inset-0 opacity-80" />
              <div className="pointer-events-none absolute right-8 top-8 grid h-16 w-16 place-items-center">
                <span className="absolute h-full w-full animate-ping rounded-full bg-accent/30" />
                <span className="h-3 w-3 rounded-full bg-accent" />
              </div>
              <div className="relative">
                <p className="font-mono text-xs uppercase tracking-widest text-faint">Based in</p>
                <p className="mt-6 font-display text-2xl font-semibold text-fg">Delhi, India</p>
                <p className="mt-1 flex items-center gap-1.5 font-mono text-sm text-muted">
                  <Clock width={14} height={14} /> <LocalTime /> IST
                </p>
              </div>
            </TiltCard>
          </Reveal>

          <div className="grid grid-cols-2 gap-5 lg:col-span-3 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 80}>
                <TiltCard className="h-full p-6 sm:p-7">
                  <p className="relative font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                    <CountUp value={s.value} decimals={s.decimals} suffix={s.suffix} className="text-gradient" />
                  </p>
                  <p className="relative mt-2 text-sm text-muted">{s.label}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function FeaturedWork() {
  const featured = projects.filter((p) => p.featured);
  return (
    <section className="py-24">
      <Container>
        <SectionHead
          index="02"
          eyebrow="Featured work"
          title={["Stores that ", <Serif key="s">sell</Serif>, " for real."]}
          action={
            <Button href="/projects" variant="ghost">
              All {projects.length} projects <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Button>
          }
        >
          Four live e-commerce platforms I built end-to-end — catalogues, carts, checkout and admin dashboards.
        </SectionHead>
        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 120} className={i % 2 ? "md:translate-y-20" : ""}>
              <ProjectCard project={p} index={projects.indexOf(p)} />
            </Reveal>
          ))}
        </div>
        <div className="hidden h-20 md:block" />
      </Container>
    </section>
  );
}

function Services() {
  return (
    <section className="py-24">
      <Container>
        <SectionHead index="03" eyebrow="What I do" title={["From database to ", <Serif key="s">deploy.</Serif>]} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon];
            return (
              <Reveal key={s.title} delay={i * 90}>
                <TiltCard tilt className="flex h-full flex-col p-7">
                  <div className="relative flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/12 text-accent transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110">
                      <Icon />
                    </span>
                    <span className="font-mono text-xs text-faint">0{i + 1}</span>
                  </div>
                  <h3 className="relative mt-8 font-display text-xl font-semibold text-fg">{s.title}</h3>
                  <p className="relative mt-3 text-[15px] leading-relaxed text-muted">{s.text}</p>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function TerminalSection() {
  return (
    <section className="py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHead
            index="04"
            eyebrow="Try it"
            className="mb-0!"
            title={["Prefer the ", <Serif key="s">command line?</Serif>]}
          >
            Explore my portfolio the developer way. Type <code className="rounded bg-fg/[0.06] px-1.5 py-0.5 font-mono text-[0.9em] text-lime">help</code>, try{" "}
            <code className="rounded bg-fg/[0.06] px-1.5 py-0.5 font-mono text-[0.9em] text-lime">projects</code> or{" "}
            <code className="rounded bg-fg/[0.06] px-1.5 py-0.5 font-mono text-[0.9em] text-lime">cd skills</code> — and press{" "}
            <kbd className="rounded border border-line px-1.5 font-mono text-[0.85em]">Ctrl K</kbd> anywhere for the command palette.
          </SectionHead>
        </div>
        <Reveal delay={150} className="min-w-0">
          <Terminal />
        </Reveal>
      </Container>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <JsonLd data={profilePageSchema()} />
      <Hero />
      <Strip />
      <Snapshot />
      <FeaturedWork />
      <Services />
      <TerminalSection />
      <CTA />
    </>
  );
}
