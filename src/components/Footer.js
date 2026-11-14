import Link from "next/link";
import Image from "next/image";
import LocalTime from "./LocalTime";
import { Container } from "./ui";
import { GitHub, LinkedIn, Mail, ArrowUpRight } from "./Icons";
import { nav, profile } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="relative mt-10 overflow-hidden border-t border-line">
      <Container className="relative grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" aria-label="Bhumika Garg — home" className="mb-8 inline-block rounded-2xl border border-line bg-[#0b0b12] px-5 py-4">
            <Image src="/logo-full.png" alt="Bhumika — Developer" width={480} height={365} className="h-20 w-auto" />
          </Link>
          <p className="font-display text-3xl font-semibold tracking-tight text-fg">
            Got an idea? <br />
            <a href={`mailto:${profile.email}`} className="text-gradient break-all">
              {profile.email}
            </a>
          </p>
          <div className="mt-6 flex gap-2">
            {[
              { href: profile.github, icon: <GitHub />, label: "GitHub" },
              { href: profile.linkedin, icon: <LinkedIn />, label: "LinkedIn" },
              { href: `mailto:${profile.email}`, icon: <Mail />, label: "Email" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid h-11 w-11 place-items-center rounded-full border border-line text-muted transition hover:-translate-y-1 hover:border-accent hover:text-fg"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-faint">Sitemap</p>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-muted transition hover:text-fg">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={profile.resume} download className="inline-flex items-center gap-1 text-muted transition hover:text-fg">
                Resume <ArrowUpRight width={14} height={14} />
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-faint">Local time</p>
          <p className="font-mono text-2xl text-fg">
            <LocalTime />
          </p>
          <p className="mt-1 text-sm text-muted">Delhi, India · IST (UTC+5:30)</p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
            </span>
            Available for opportunities
          </p>
        </div>
      </Container>

      <div aria-hidden="true" className="select-none overflow-hidden">
        <p className="text-outline -mb-[0.22em] text-center font-display text-[17.5vw] font-bold leading-none tracking-[-0.05em]">
          BHUMIKA
        </p>
      </div>

      <Container className="relative flex flex-col items-center justify-between gap-2 border-t border-line py-6 text-xs text-faint sm:flex-row">
        <p>© 2026 {profile.name}. Designed &amp; developed by me.</p>
        <p className="font-mono">
          built with <span className="text-fg">Next.js</span> + <span className="text-fg">Tailwind</span> · press{" "}
          <kbd className="rounded border border-line px-1">Ctrl K</kbd>
        </p>
      </Container>
    </footer>
  );
}
