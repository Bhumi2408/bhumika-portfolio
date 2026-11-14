"use client";

import { useState } from "react";
import { Send, Check } from "./Icons";

const topics = ["Full-time role", "Freelance project", "E-commerce store", "Just saying hi"];

/** No backend needed: composes a pre-filled email in the visitor's mail app. */
export default function ContactForm({ email }) {
  const [topic, setTopic] = useState(topics[0]);
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = `[Portfolio] ${topic} — ${f.get("name")}`;
    const body = `${f.get("message")}\n\n— ${f.get("name")}\n${f.get("email")}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const field =
    "peer w-full rounded-2xl border border-line bg-bg/60 px-4 pb-3 pt-6 text-fg outline-none transition placeholder:text-transparent focus:border-accent focus:bg-bg";
  const label =
    "pointer-events-none absolute left-4 top-4 origin-left text-muted transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs";

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-faint">I&apos;m interested in…</p>
        <div className="flex flex-wrap gap-2">
          {topics.map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => setTopic(t)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                topic === t ? "border-fg bg-fg text-bg" : "border-line text-muted hover:border-accent hover:text-fg"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="relative block">
          <input name="name" required placeholder="Your name" className={field} />
          <span className={label}>Your name</span>
        </label>
        <label className="relative block">
          <input name="email" type="email" required placeholder="Your email" className={field} />
          <span className={label}>Your email</span>
        </label>
      </div>
      <label className="relative block">
        <textarea name="message" required rows={5} placeholder="Tell me about your project" className={`${field} resize-none`} />
        <span className={label}>Tell me about your project…</span>
      </label>

      <button
        type="submit"
        className="group flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-fg font-medium text-bg transition hover:shadow-[0_0_50px_-8px_var(--accent)]"
      >
        {sent ? (
          <>
            <Check /> Opening your mail app…
          </>
        ) : (
          <>
            Send message <Send className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
          </>
        )}
      </button>
    </form>
  );
}
