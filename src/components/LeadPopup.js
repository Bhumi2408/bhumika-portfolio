"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ContactForm from "./ContactForm";
import { Close } from "./Icons";
import { profile } from "@/data/portfolio";

const HIDE_ON = ["/contact", "/thank-you"];
const SNOOZE_DAYS = 3;

function canAutoOpen() {
  try {
    if (localStorage.getItem("lead-sent")) return false;
    if (sessionStorage.getItem("lead-popup-shown")) return false;
    const snoozed = Number(localStorage.getItem("lead-popup-snooze") || 0);
    return Date.now() > snoozed;
  } catch {
    return false;
  }
}

/**
 * "Let's work together" popup.
 * Opens automatically once per visit (after 25s or 60% scroll), and whenever
 * something dispatches `window.dispatchEvent(new Event("open-lead"))`.
 */
export default function LeadPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const hidden = HIDE_ON.includes(pathname);

  // manual trigger (e.g. "Hire me" buttons)
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-lead", onOpen);
    return () => window.removeEventListener("open-lead", onOpen);
  }, []);

  // automatic trigger
  useEffect(() => {
    if (hidden || !canAutoOpen()) return;
    const show = () => {
      if (!canAutoOpen()) return cleanup();
      try { sessionStorage.setItem("lead-popup-shown", "1"); } catch {}
      setOpen(true);
      cleanup();
    };
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      if (h > 0 && scrollY / h > 0.6) show();
    };
    const timer = setTimeout(show, 25000);
    addEventListener("scroll", onScroll, { passive: true });
    function cleanup() {
      clearTimeout(timer);
      removeEventListener("scroll", onScroll);
    }
    return cleanup;
  }, [hidden]);

  // lock scroll + Escape to close + focus the panel
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && dismiss();
    addEventListener("keydown", onKey);
    setTimeout(() => panelRef.current?.querySelector("input[name=name]")?.focus({ preventScroll: true }), 350);
    return () => {
      document.body.style.overflow = prev;
      removeEventListener("keydown", onKey);
    };
  }, [open]);

  function dismiss() {
    setOpen(false);
    try { localStorage.setItem("lead-popup-snooze", String(Date.now() + SNOOZE_DAYS * 864e5)); } catch {}
  }

  if (hidden && !open) return null;

  return (
    <div
      className={`fixed inset-0 z-[105] flex items-end justify-center p-3 transition-opacity duration-300 sm:items-center sm:p-6 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!open}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={dismiss} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-title"
        className={`relative grid max-h-[92svh] w-full max-w-3xl overflow-hidden rounded-[1.75rem] border border-line bg-surface shadow-2xl transition-all duration-500 ease-[cubic-bezier(.2,.8,.2,1)] md:grid-cols-[0.8fr_1.2fr] ${
          open ? "translate-y-0 scale-100" : "translate-y-8 scale-95"
        }`}
      >
        {/* left: pitch */}
        <div className="relative hidden overflow-hidden bg-[#0b0b12] p-8 text-white md:flex md:flex-col">
          <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 animate-blob rounded-full bg-violet-600/40 blur-[70px]" />
          <div className="pointer-events-none absolute -bottom-20 -right-10 h-64 w-64 animate-blob rounded-full bg-pink-500/30 blur-[70px] [animation-delay:-6s]" />
          <Image src="/logo-mark.png" alt="" width={48} height={48} loading="eager" className="relative" />
          <p className="relative mt-8 font-display text-3xl font-semibold leading-tight tracking-tight">
            Have a project in mind? <span className="font-serif font-normal italic text-pink-300">Let&apos;s talk.</span>
          </p>
          <ul className="relative mt-6 space-y-2.5 text-sm text-white/70">
            {["E-commerce stores (MERN / Next.js)", "SEO-friendly business websites", "APIs, dashboards & CRMs", "Full-time & freelance roles"].map((t) => (
              <li key={t} className="flex gap-2">
                <span className="text-lime-300">✓</span> {t}
              </li>
            ))}
          </ul>
          <div className="relative mt-auto flex items-center gap-3 pt-8">
            <div className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-white/20">
              <Image src={profile.photo} alt={profile.name} fill sizes="44px" loading="eager" className="object-cover object-[50%_32%]" />
            </div>
            <div className="text-sm">
              <p className="font-medium">{profile.name}</p>
              <p className="text-white/50">{profile.role}</p>
            </div>
          </div>
        </div>

        {/* right: form */}
        <div className="overflow-y-auto p-6 sm:p-8">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p id="lead-title" className="font-display text-2xl font-semibold tracking-tight text-fg">
                Let&apos;s work together <span className="inline-block origin-[70%_70%] animate-wave">👋</span>
              </p>
              <p className="mt-1 text-sm text-muted">Drop your details and I&apos;ll get back to you.</p>
            </div>
            <button
              onClick={dismiss}
              aria-label="Close"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-muted transition hover:rotate-90 hover:text-fg"
            >
              <Close width={18} height={18} />
            </button>
          </div>
          {open && <ContactForm source="Popup" compact onSuccess={() => setOpen(false)} />}
        </div>
      </div>
    </div>
  );
}
