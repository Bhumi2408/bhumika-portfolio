"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { nav, profile, projects } from "@/data/portfolio";
import { toggleTheme } from "@/lib/theme";
import { Search, ArrowRight, Sun, Copy, Download, GitHub, LinkedIn, Mail, Layout } from "./Icons";

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const [toast, setToast] = useState("");
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const items = useMemo(
    () => [
      ...nav.map((n) => ({ group: "Pages", label: n.label, hint: n.href, icon: <ArrowRight />, run: () => router.push(n.href) })),
      ...projects.map((p) => ({
        group: "Projects",
        label: p.name,
        hint: p.kind,
        icon: <Layout width={18} height={18} />,
        run: () => router.push(`/projects/${p.slug}`),
      })),
      { group: "Actions", label: "Toggle light / dark theme", hint: "theme", icon: <Sun />, run: () => toggleTheme(innerWidth / 2, innerHeight / 2) },
      {
        group: "Actions",
        label: "Copy email address",
        hint: profile.email,
        icon: <Copy width={18} height={18} />,
        run: async () => {
          try {
            await navigator.clipboard.writeText(profile.email);
            setToast("Email copied to clipboard ✓");
            setTimeout(() => setToast(""), 2000);
          } catch {}
        },
      },
      { group: "Actions", label: "Download resume", hint: "PDF", icon: <Download />, run: () => window.open(profile.resume, "_blank") },
      { group: "Links", label: "GitHub", hint: "Bhumi2408", icon: <GitHub />, run: () => window.open(profile.github, "_blank") },
      { group: "Links", label: "LinkedIn", hint: "bhumika-garg", icon: <LinkedIn />, run: () => window.open(profile.linkedin, "_blank") },
      { group: "Links", label: "Send an email", hint: "mailto", icon: <Mail />, run: () => (window.location.href = `mailto:${profile.email}`) },
    ],
    [router]
  );

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter((i) => `${i.label} ${i.hint} ${i.group}`.toLowerCase().includes(s));
  }, [q, items]);

  const show = (v) => {
    setOpen(v);
    setQ("");
    setSel(0);
  };

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        setQ("");
        setSel(0);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => show(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 30);
  }, [open]);

  useEffect(() => {
    listRef.current?.querySelector("[data-sel='true']")?.scrollIntoView({ block: "nearest" });
  }, [sel]);

  const run = (item) => {
    setOpen(false);
    item.run();
  };

  const onInputKey = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSel((s) => Math.min(s + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSel((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter" && filtered[sel]) {
      run(filtered[sel]);
    }
  };

  let lastGroup = "";

  return (
    <>
      <div
        className={`fixed inset-0 z-[100] flex items-start justify-center bg-black/40 px-4 pt-[14vh] backdrop-blur-sm transition-opacity duration-200 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      >
        <div
          role="dialog"
          aria-label="Command palette"
          onClick={(e) => e.stopPropagation()}
          className={`w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl transition-all duration-300 ${
            open ? "translate-y-0 scale-100" : "-translate-y-4 scale-95"
          }`}
        >
          <div className="flex items-center gap-3 border-b border-line px-4">
            <Search className="text-faint" />
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setSel(0);
              }}
              onKeyDown={onInputKey}
              placeholder="Type a command or search…"
              className="h-14 flex-1 bg-transparent text-base text-fg outline-none placeholder:text-faint"
            />
            <kbd className="rounded-md border border-line px-1.5 py-0.5 font-mono text-[11px] text-faint">ESC</kbd>
          </div>
          <ul ref={listRef} className="max-h-[50vh] overflow-y-auto p-2">
            {filtered.length === 0 && <li className="px-3 py-8 text-center text-sm text-faint">No results for “{q}”</li>}
            {filtered.map((item, i) => {
              const header = item.group !== lastGroup;
              lastGroup = item.group;
              return (
                <li key={`${item.group}-${item.label}`}>
                  {header && <p className="px-3 pb-1 pt-3 font-mono text-[11px] uppercase tracking-widest text-faint">{item.group}</p>}
                  <button
                    data-sel={i === sel}
                    onMouseEnter={() => setSel(i)}
                    onClick={() => run(item)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                      i === sel ? "bg-fg/[0.07] text-fg" : "text-muted"
                    }`}
                  >
                    <span className={i === sel ? "text-accent" : "text-faint"}>{item.icon}</span>
                    <span className="flex-1 truncate">{item.label}</span>
                    <span className="truncate font-mono text-xs text-faint">{item.hint}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 font-mono text-[11px] text-faint">
            <span>↑↓ navigate</span>
            <span>↵ select</span>
            <span className="ml-auto">bhumika.dev</span>
          </div>
        </div>
      </div>

      <div
        className={`fixed bottom-6 left-1/2 z-[110] -translate-x-1/2 rounded-full bg-fg px-4 py-2 text-sm text-bg shadow-xl transition-all duration-300 ${
          toast ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
        role="status"
      >
        {toast}
      </div>
    </>
  );
}
