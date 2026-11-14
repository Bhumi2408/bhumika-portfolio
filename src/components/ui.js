// Small server-rendered building blocks shared across pages.
import Link from "next/link";
import Reveal, { SplitHeading } from "./Reveal";
import { Sparkle, ArrowUpRight } from "./Icons";
import Magnetic from "./Magnetic";

export function Container({ className = "", children }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function Eyebrow({ index, children }) {
  return (
    <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-faint">
      {index && <span className="text-accent">{index}</span>}
      <span className="h-px w-8 bg-line" />
      {children}
    </p>
  );
}

/** Section heading with word-by-word reveal. `title` is an array of strings / nodes. */
export function SectionHead({ index, eyebrow, title, children, className = "", action }) {
  return (
    <div className={`mb-12 flex flex-wrap items-end justify-between gap-6 ${className}`}>
      <div className="max-w-3xl">
        <Reveal>
          <Eyebrow index={index}>{eyebrow}</Eyebrow>
        </Reveal>
        <SplitHeading
          parts={title}
          className="font-display text-[clamp(2.2rem,5.5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-fg"
        />
        {children && (
          <Reveal delay={150}>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{children}</p>
          </Reveal>
        )}
      </div>
      {action && <Reveal delay={200}>{action}</Reveal>}
    </div>
  );
}

export const Serif = ({ children }) => (
  <span className="font-serif font-normal italic tracking-normal text-gradient">{children}</span>
);

/** Big header at the top of each inner page. */
export function PageHeader({ path, index, title, children, bg }) {
  return (
    <section className="relative overflow-hidden pb-16 pt-36 sm:pt-44">
      <div className="line-grid fade-mask pointer-events-none absolute inset-0 opacity-70" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[min(900px,140vw)] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]" />
      {bg && (
        <p
          aria-hidden="true"
          className="text-outline pointer-events-none absolute -bottom-6 right-0 select-none font-display text-[22vw] font-bold leading-none tracking-tighter sm:-bottom-10"
        >
          {bg}
        </p>
      )}
      <Container className="relative">
        <Reveal>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1.5 font-mono text-xs text-muted backdrop-blur">
            <span className="text-lime">➜</span> ~/bhumika<span className="text-accent">{path}</span>
            {index && <span className="ml-2 text-faint">[{index}]</span>}
          </p>
        </Reveal>
        <SplitHeading
          as="h1"
          parts={title}
          className="max-w-4xl font-display text-[clamp(2.75rem,8vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-fg"
        />
        {children && (
          <Reveal delay={200}>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{children}</p>
          </Reveal>
        )}
      </Container>
    </section>
  );
}

export function Marquee({ items, reverse = false, className = "" }) {
  const row = [...items, ...items];
  return (
    <div className={`relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)] ${className}`}>
      <div className={`flex w-max gap-8 ${reverse ? "animate-marquee-rev" : "animate-marquee"} hover:[animation-play-state:paused]`}>
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-8 whitespace-nowrap font-display text-2xl font-medium tracking-tight text-faint sm:text-4xl">
            {t}
            <Sparkle width={16} height={16} className="text-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function Chip({ children, className = "" }) {
  return (
    <span className={`rounded-full border border-line bg-fg/[0.03] px-3 py-1 text-xs text-muted ${className}`}>{children}</span>
  );
}

export function Button({ href, children, variant = "solid", external, download, className = "", cursor }) {
  const styles =
    variant === "solid"
      ? "bg-fg text-bg hover:shadow-[0_0_50px_-8px_var(--accent)]"
      : "border border-line bg-surface/60 text-fg hover:border-accent backdrop-blur";
  const cls = `group inline-flex h-13 items-center gap-2 rounded-full px-6 font-medium transition-all duration-300 ${styles} ${className}`;
  const inner = (
    <>
      {children}
    </>
  );
  return (
    <Magnetic>
      {external || download ? (
        <a href={href} className={cls} data-cursor={cursor} {...(download ? { download: true } : { target: "_blank", rel: "noopener noreferrer" })}>
          {inner}
        </a>
      ) : (
        <Link href={href} className={cls} data-cursor={cursor}>
          {inner}
        </Link>
      )}
    </Magnetic>
  );
}

/** Call-to-action band reused at the bottom of pages. */
export function CTA() {
  return (
    <Container className="py-24">
      <Reveal>
        <Link
          href="/contact"
          data-cursor="Say hi"
          className="group relative block overflow-hidden rounded-[2rem] border border-line bg-surface px-6 py-16 sm:px-14 sm:py-20"
        >
          <div className="dot-grid pointer-events-none absolute inset-0 opacity-70" />
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 animate-blob rounded-full bg-accent/25 blur-[90px]" />
          <div className="pointer-events-none absolute -bottom-24 left-10 h-72 w-72 animate-blob rounded-full bg-accent-2/20 blur-[90px] [animation-delay:-8s]" />
          <div className="relative flex flex-wrap items-end justify-between gap-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-faint">Have a project in mind?</p>
              <p className="mt-4 font-display text-[clamp(2.4rem,7vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-fg">
                Let&apos;s build <Serif>together.</Serif>
              </p>
            </div>
            <span className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-fg text-bg transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110 sm:h-28 sm:w-28">
              <ArrowUpRight width={36} height={36} />
            </span>
          </div>
        </Link>
      </Reveal>
    </Container>
  );
}
