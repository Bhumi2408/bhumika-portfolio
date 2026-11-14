"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { Menu, Close, Command, ArrowUpRight, GitHub, LinkedIn, Mail } from "./Icons";
import { nav, profile } from "@/data/portfolio";

const isActive = (path, href) => (href === "/" ? path === "/" : path.startsWith(href));

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);
  const headerRef = useRef(null);
  const pillRef = useRef(null);
  const listRef = useRef(null);

  // close the mobile menu after navigating
  if (open && openedAt !== pathname) {
    setOpen(false);
    setOpenedAt(pathname);
  }

  // scrolled state + sliding active pill (DOM-only, no re-render)
  useEffect(() => {
    const onScroll = () => headerRef.current?.toggleAttribute("data-scrolled", window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const place = () => {
      const list = listRef.current;
      const pill = pillRef.current;
      if (!list || !pill) return;
      const active = list.querySelector("[data-active='true']");
      if (!active) return (pill.style.opacity = "0");
      pill.style.opacity = "1";
      pill.style.width = `${active.offsetWidth}px`;
      pill.style.transform = `translateX(${active.offsetLeft}px)`;
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const openPalette = () => window.dispatchEvent(new Event("open-palette"));

  return (
    <>
      <header ref={headerRef} className="group/nav fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-2 rounded-full border border-transparent px-2 py-2 transition-all duration-500 group-data-scrolled/nav:border-line group-data-scrolled/nav:bg-bg/75 group-data-scrolled/nav:shadow-[0_10px_40px_-20px_rgba(0,0,0,0.35)] group-data-scrolled/nav:backdrop-blur-xl">
          <Link href="/" className="flex shrink-0 items-center gap-2.5 pl-1.5" aria-label="Home">
            <span className="ring-gradient grid h-9 w-9 place-items-center rounded-xl font-display text-lg font-bold text-white shadow-lg shadow-accent/30">
              B
            </span>
            <span className="hidden font-mono text-sm text-fg sm:block">
              bhumika<span className="text-accent">.dev</span>
              <span className="ml-0.5 inline-block h-4 w-[7px] translate-y-0.5 animate-blink bg-accent" />
            </span>
          </Link>

          <div ref={listRef} className="relative hidden items-center rounded-full border border-line bg-surface/60 p-1 lg:flex">
            <span
              ref={pillRef}
              aria-hidden="true"
              className="absolute left-0 top-1 h-[calc(100%-0.5rem)] rounded-full bg-fg opacity-0 transition-all duration-500 ease-[cubic-bezier(.2,.8,.2,1)]"
            />
            {nav.map((l) => {
              const active = isActive(pathname, l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  data-active={active}
                  className={`relative z-10 rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-300 ${
                    active ? "text-bg" : "text-muted hover:text-fg"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={openPalette}
              className="hidden h-10 items-center gap-2 rounded-full border border-line bg-surface px-3 text-sm text-muted transition hover:border-accent hover:text-fg md:flex"
              aria-label="Open command palette"
            >
              <span>Search</span>
              <kbd className="flex items-center gap-0.5 rounded-md border border-line px-1.5 py-0.5 font-mono text-[11px]">
                <Command /> K
              </kbd>
            </button>
            <ThemeToggle />
            <Link
              href="/contact"
              className="hidden h-10 items-center gap-1.5 rounded-full bg-fg px-4 text-sm font-medium text-bg transition hover:opacity-85 sm:flex"
            >
              Hire me <ArrowUpRight width={16} height={16} />
            </Link>
            <button
              onClick={() => {
                setOpenedAt(pathname);
                setOpen((o) => !o);
              }}
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-fg lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <Close /> : <Menu />}
            </button>
          </div>
        </nav>
      </header>

      {/* mobile full-screen menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col bg-bg px-6 pb-8 pt-28 transition-[clip-path] duration-700 ease-[cubic-bezier(.7,0,.2,1)] lg:hidden ${
          open ? "[clip-path:circle(150%_at_100%_0)]" : "pointer-events-none [clip-path:circle(0%_at_100%_0)]"
        }`}
        aria-hidden={!open}
      >
        <div className="dot-grid fade-mask pointer-events-none absolute inset-0 opacity-60" />
        <p className="relative mb-4 font-mono text-xs uppercase tracking-[0.25em] text-faint">~/menu</p>
        <ul className="relative flex-1 space-y-1">
          {nav.map((l, i) => (
            <li
              key={l.href}
              className="overflow-hidden"
            >
              <Link
                href={l.href}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${150 + i * 60}ms` : "0ms" }}
                className={`flex items-baseline gap-4 py-1 font-display text-5xl font-semibold tracking-tight transition-all duration-700 ${
                  open ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                } ${isActive(pathname, l.href) ? "text-gradient" : "text-fg"}`}
              >
                <span className="font-mono text-sm text-faint">0{i + 1}</span>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="relative flex items-center gap-3">
          {[
            { href: profile.github, icon: <GitHub />, label: "GitHub" },
            { href: profile.linkedin, icon: <LinkedIn />, label: "LinkedIn" },
            { href: `mailto:${profile.email}`, icon: <Mail />, label: "Email" },
          ].map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} tabIndex={open ? 0 : -1}
              className="grid h-12 w-12 place-items-center rounded-full border border-line text-fg">
              {s.icon}
            </a>
          ))}
          <button
            onClick={() => {
              setOpen(false);
              openPalette();
            }}
            tabIndex={open ? 0 : -1}
            className="ml-auto flex items-center gap-2 rounded-full border border-line px-4 py-3 text-sm text-muted"
          >
            <Command /> Commands
          </button>
        </div>
      </div>
    </>
  );
}
