"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { profile, skills, experience, projects, education, nav } from "@/data/portfolio";
import { setTheme, toggleTheme } from "@/lib/theme";

const A = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-[var(--syn-key)] underline decoration-dotted underline-offset-4 hover:text-accent">
    {children}
  </a>
);

const HELP = [
  ["whoami", "who is Bhumika?"],
  ["about", "a short intro"],
  ["skills", "tech stack"],
  ["experience", "work history"],
  ["projects", "live projects"],
  ["open <name>", "open a project, e.g. open shop99"],
  ["education", "degrees"],
  ["contact", "ways to reach me"],
  ["resume", "download my CV"],
  ["cd <page>", "go to a page, e.g. cd projects"],
  ["theme", "toggle light / dark"],
  ["clear", "clear the screen"],
];

function respond(raw, { router }) {
  const input = raw.trim();
  const [cmd, ...args] = input.split(/\s+/);
  const arg = args.join(" ").toLowerCase();

  switch ((cmd || "").toLowerCase()) {
    case "":
      return null;
    case "help":
      return (
        <div className="grid gap-x-6 sm:grid-cols-[auto_1fr]">
          {HELP.map(([c, d]) => (
            <div key={c} className="contents">
              <span className="text-lime">{c}</span>
              <span className="mb-1 text-faint sm:mb-0">{d}</span>
            </div>
          ))}
        </div>
      );
    case "whoami":
      return <p>{profile.name} — {profile.role} (MERN · Next.js) · {profile.location}</p>;
    case "about":
      return <p className="text-muted">{profile.about[0]}</p>;
    case "skills":
      return (
        <div className="space-y-1">
          {skills.map((s) => (
            <p key={s.title}>
              <span className="text-[var(--syn-key)]">{s.title.padEnd(18, " ")}</span>
              <span className="text-muted">{s.items.join(", ")}</span>
            </p>
          ))}
        </div>
      );
    case "experience":
    case "work":
      return (
        <div className="space-y-2">
          {experience.map((e) => (
            <p key={e.company}>
              <span className="text-[var(--syn-num)]">{e.hash}</span> <span className="text-fg">{e.role}</span>{" "}
              <span className="text-muted">@ {e.company}</span> <span className="text-faint">({e.period})</span>
            </p>
          ))}
        </div>
      );
    case "projects":
    case "ls-projects":
      return (
        <div className="space-y-0.5">
          {projects.map((p) => (
            <p key={p.slug}>
              <span className="text-faint">{p.kind === "E-commerce" ? "🛒" : "🌐"}</span> <A href={p.url}>{p.name}</A>{" "}
              <span className="text-faint">— {p.tagline}</span>
            </p>
          ))}
          <p className="pt-1 text-faint">tip: open {projects[0].slug}</p>
        </div>
      );
    case "open": {
      const p = projects.find((x) => x.slug.includes(arg) || x.name.toLowerCase().includes(arg));
      if (!arg || !p) return <p className="text-accent-2">project not found. try `projects` to list them.</p>;
      window.open(p.url, "_blank");
      return <p>opening <A href={p.url}>{p.url}</A> …</p>;
    }
    case "education":
      return (
        <div className="space-y-0.5">
          {education.map((e) => (
            <p key={e.degree}>
              <span className="text-fg">{e.degree}</span> <span className="text-muted">— {e.school}</span>{" "}
              <span className="text-[var(--syn-str)]">{e.note}</span>
            </p>
          ))}
        </div>
      );
    case "contact":
      return (
        <div className="space-y-0.5">
          <p>email&nbsp;&nbsp;&nbsp; <A href={`mailto:${profile.email}`}>{profile.email}</A></p>
          <p>phone&nbsp;&nbsp;&nbsp; <A href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</A></p>
          <p>linkedin <A href={profile.linkedin}>bhumika-garg</A></p>
          <p>github&nbsp;&nbsp; <A href={profile.github}>Bhumi2408</A></p>
        </div>
      );
    case "resume":
    case "cv":
      window.open(profile.resume, "_blank");
      return <p className="text-lime">✓ opening resume.pdf</p>;
    case "ls":
      return (
        <p className="flex flex-wrap gap-x-5">
          {nav.map((n) => (
            <span key={n.href} className="text-[var(--syn-key)]">{n.href === "/" ? "home" : n.href.slice(1)}/</span>
          ))}
          <span className="text-muted">resume.pdf</span>
        </p>
      );
    case "cd": {
      const target = nav.find((n) => (n.href === "/" ? "home" : n.href.slice(1)) === arg.replace(/\/$/, "")) || (arg === "~" || arg === "/" ? nav[0] : null);
      if (!target) return <p className="text-accent-2">cd: no such directory: {arg || "(empty)"}</p>;
      setTimeout(() => router.push(target.href), 350);
      return <p className="text-lime">→ navigating to {target.href}</p>;
    }
    case "theme":
      if (arg === "light" || arg === "dark") setTheme(arg, innerWidth / 2, innerHeight / 2);
      else toggleTheme(innerWidth / 2, innerHeight / 2);
      return <p className="text-lime">✓ theme switched</p>;
    case "date":
      return <p>{new Date().toString()}</p>;
    case "echo":
      return <p>{args.join(" ")}</p>;
    case "git":
      return <p className="text-muted">On branch <span className="text-lime">main</span> — your branch is up to date with &apos;origin/hire-me&apos; 😉</p>;
    case "sudo":
      if (arg.includes("hire")) {
        setTimeout(() => router.push("/contact"), 1400);
        return (
          <div>
            <p className="text-lime">[sudo] permission granted ✓</p>
            <p className="text-muted">Great choice! Redirecting you to the contact page…</p>
          </div>
        );
      }
      return <p className="text-accent-2">nice try 😄 — but you could try `sudo hire-bhumika`</p>;
    case "hello":
    case "hi":
    case "namaste":
      return <p>Namaste! 🙏 type <span className="text-lime">help</span> to look around.</p>;
    default:
      return (
        <p className="text-accent-2">
          command not found: {cmd}. Type <span className="text-lime">help</span> for a list.
        </p>
      );
  }
}

const chips = ["help", "whoami", "skills", "projects", "contact", "sudo hire-bhumika"];

export default function Terminal({ className = "" }) {
  const router = useRouter();
  const [history, setHistory] = useState([
    {
      id: 0,
      cmd: null,
      out: (
        <div>
          <p className="text-fg">Welcome to bhumika-sh v1.0 ✨</p>
          <p className="text-faint">Type <span className="text-lime">help</span> to see available commands, or tap one below.</p>
        </div>
      ),
    },
  ]);
  const [value, setValue] = useState("");
  const [past, setPast] = useState([]);
  const [pi, setPi] = useState(-1);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const b = bodyRef.current;
    b.scrollTop = b.scrollHeight;
  }, [history]);

  const exec = (cmd) => {
    if (cmd.trim().toLowerCase() === "clear") {
      setHistory([]);
    } else {
      const out = respond(cmd, { router });
      setHistory((h) => [...h, { id: Date.now() + Math.random(), cmd, out }]);
    }
    if (cmd.trim()) setPast((p) => [cmd, ...p]);
    setPi(-1);
    setValue("");
  };

  const onKey = (e) => {
    if (e.key === "Enter") exec(value);
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      const n = Math.min(pi + 1, past.length - 1);
      if (past[n] !== undefined) {
        setPi(n);
        setValue(past[n]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const n = pi - 1;
      setPi(Math.max(n, -1));
      setValue(n >= 0 ? past[n] : "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const all = [...HELP.map(([c]) => c.split(" ")[0]), "sudo"];
      const m = all.find((c) => c.startsWith(value.toLowerCase()) && value);
      if (m) setValue(m + " ");
    }
  };

  return (
    <div className={`overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_30px_80px_-40px_var(--glow)] ${className}`}>
      <div className="flex items-center gap-2 border-b border-line bg-fg/[0.03] px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-faint">bhumika@portfolio: ~</span>
      </div>
      <div
        ref={bodyRef}
        onClick={() => inputRef.current?.focus({ preventScroll: true })}
        className="h-[340px] overflow-y-auto p-4 font-mono text-[12.5px] leading-6 sm:p-5 sm:text-[13.5px]"
      >
        {history.map((h) => (
          <div key={h.id} className="mb-2 break-words">
            {h.cmd !== null && (
              <p>
                <span className="text-lime">➜</span> <span className="text-[var(--syn-key)]">~</span> <span className="text-fg">{h.cmd}</span>
              </p>
            )}
            {h.out && <div className="text-fg/90">{h.out}</div>}
          </div>
        ))}
        <div className="flex items-center gap-2">
          <span className="text-lime">➜</span>
          <span className="text-[var(--syn-key)]">~</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKey}
            aria-label="Terminal input"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent text-fg caret-accent outline-none"
            placeholder="type a command…"
          />
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto border-t border-line px-4 py-3">
        {chips.map((c) => (
          <button
            key={c}
            onClick={() => exec(c)}
            className="shrink-0 rounded-full border border-line px-3 py-1 font-mono text-xs text-muted transition hover:border-accent hover:text-fg"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
