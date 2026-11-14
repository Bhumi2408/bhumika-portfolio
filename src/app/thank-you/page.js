import Link from "next/link";
import Reveal from "@/components/Reveal";
import ThanksName from "@/components/ThanksName";
import { Container, Button } from "@/components/ui";
import { ArrowRight, LinkedIn, GitHub, Download } from "@/components/Icons";
import { pageMeta } from "@/lib/seo";
import { profile, projects } from "@/data/portfolio";

export const metadata = pageMeta({
  title: "Thank you",
  description: "Thanks for reaching out — your message has been delivered to Bhumika Garg.",
  path: "/thank-you",
  noIndex: true,
});

const confetti = Array.from({ length: 28 }, (_, i) => ({
  left: (i * 37) % 100,
  delay: (i % 7) * 0.25,
  dur: 3 + (i % 5) * 0.6,
  size: 6 + (i % 4) * 3,
  color: ["var(--accent)", "var(--accent-2)", "var(--accent-3)", "var(--lime)"][i % 4],
  round: i % 3 === 0,
}));

export default function ThankYou() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-32">
      <div className="line-grid fade-mask pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[min(800px,140vw)] -translate-x-1/2 -translate-y-1/3 rounded-full bg-accent/25 blur-[120px]" />

      {/* falling confetti */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {confetti.map((c, i) => (
          <span
            key={i}
            className="absolute -top-6 block animate-[confetti_linear_infinite]"
            style={{
              left: `${c.left}%`,
              width: c.size,
              height: c.round ? c.size : c.size * 1.6,
              background: c.color,
              borderRadius: c.round ? 999 : 2,
              animationDuration: `${c.dur}s`,
              animationDelay: `${c.delay}s`,
            }}
          />
        ))}
        <style>{`@keyframes confetti{0%{transform:translateY(-10vh) rotate(0)}100%{transform:translateY(110vh) rotate(720deg)}}`}</style>
      </div>

      <Container className="relative text-center">
        <Reveal>
          <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-lime/15">
            <svg viewBox="0 0 52 52" className="h-14 w-14 text-lime" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 27l8 8 16-18" style={{ strokeDasharray: 48, strokeDashoffset: 48, animation: "draw .8s .3s ease forwards" }} />
            </svg>
            <style>{`@keyframes draw{to{stroke-dashoffset:0}}`}</style>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="mt-8 font-display text-[clamp(2.6rem,8vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-fg">
            Thank you<ThanksName />!
          </h1>
        </Reveal>
        <Reveal delay={180}>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Your message has landed safely in my inbox. I&apos;ll read it personally and get back to you soon.
          </p>
        </Reveal>

        <Reveal delay={260}>
          <div className="mx-auto mt-10 max-w-md rounded-2xl border border-line bg-surface p-5 text-left font-mono text-sm shadow-[0_30px_80px_-40px_var(--glow)]">
            <p><span className="text-lime">$</span> <span className="text-fg">send --message</span></p>
            <p className="text-lime">✓ delivered to {profile.firstName.toLowerCase()}&apos;s inbox</p>
            <p className="text-muted">› status: <span className="text-[var(--syn-str)]">&quot;will reply soon&quot;</span><span className="ml-1 inline-block h-4 w-[7px] translate-y-0.5 animate-blink bg-accent" /></p>
          </div>
        </Reveal>

        <Reveal delay={340} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button href="/projects">
            Explore my work <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </Button>
          <Button href={profile.resume} download variant="ghost">
            <Download /> Download resume
          </Button>
        </Reveal>

        <Reveal delay={420}>
          <p className="mt-10 text-sm text-faint">Meanwhile, let&apos;s connect</p>
          <div className="mt-3 flex justify-center gap-2">
            {[
              { href: profile.linkedin, icon: <LinkedIn />, label: "LinkedIn" },
              { href: profile.github, icon: <GitHub />, label: "GitHub" },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                className="grid h-12 w-12 place-items-center rounded-full border border-line text-muted transition hover:-translate-y-1 hover:border-accent hover:text-fg">
                {s.icon}
              </a>
            ))}
          </div>
          <p className="mt-10 text-sm text-muted">
            Recently shipped:{" "}
            {projects.slice(0, 3).map((p, i) => (
              <span key={p.slug}>
                <Link href={`/projects/${p.slug}`} className="text-fg underline decoration-line underline-offset-4 hover:decoration-accent">{p.name}</Link>
                {i < 2 ? ", " : ""}
              </span>
            ))}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
