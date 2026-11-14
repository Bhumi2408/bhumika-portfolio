"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitLead } from "@/lib/forms";
import { Send } from "./Icons";

export const interests = ["Full-time role", "Freelance project", "E-commerce store", "Just saying hi"];

/**
 * Lead form used on the Contact page and in the popup.
 * Sends to Web3Forms, then redirects to our own /thank-you page.
 */
export default function ContactForm({ source = "Contact page", compact = false, onSuccess }) {
  const router = useRouter();
  const [interest, setInterest] = useState(interests[0]);
  const [status, setStatus] = useState("idle"); // idle | sending | error
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fields = Object.fromEntries(new FormData(form));
    setStatus("sending");
    setError("");
    const res = await submitLead({ ...fields, interest }, source);
    if (!res.ok) {
      setStatus("error");
      setError(res.message);
      return;
    }
    try {
      sessionStorage.setItem("lead-name", String(fields.name || "").split(" ")[0]);
      localStorage.setItem("lead-sent", "1"); // don't show the popup again
    } catch {}
    form.reset();
    onSuccess?.();
    router.push("/thank-you");
  };

  const field =
    "peer w-full rounded-2xl border border-line bg-bg/60 px-4 pb-2.5 pt-6 text-fg outline-none transition placeholder:text-transparent focus:border-accent focus:bg-bg";
  const label =
    "pointer-events-none absolute left-4 top-4 origin-left text-muted transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs";

  const sending = status === "sending";

  return (
    <form onSubmit={submit} className={compact ? "space-y-3" : "space-y-4"} noValidate={false}>
      {/* honeypot for bots — hidden from people */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div>
        <p className="mb-2.5 font-mono text-xs uppercase tracking-[0.2em] text-faint">I&apos;m interested in…</p>
        <div className="flex flex-wrap gap-2">
          {interests.map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => setInterest(t)}
              aria-pressed={interest === t}
              className={`rounded-full border px-3.5 py-1.5 text-sm transition ${
                interest === t ? "border-fg bg-fg text-bg" : "border-line text-muted hover:border-accent hover:text-fg"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="relative block">
          <input name="name" required maxLength={80} autoComplete="name" placeholder="Your name" className={field} />
          <span className={label}>Your name *</span>
        </label>
        <label className="relative block">
          <input name="email" type="email" required autoComplete="email" placeholder="Your email" className={field} />
          <span className={label}>Your email *</span>
        </label>
      </div>
      <label className="relative block">
        <input name="phone" type="tel" autoComplete="tel" pattern="[0-9+\-\s()]{7,20}" placeholder="Phone" className={field} />
        <span className={label}>Phone / WhatsApp (optional)</span>
      </label>
      <label className="relative block">
        <textarea
          name="message"
          required
          rows={compact ? 3 : 5}
          maxLength={3000}
          placeholder="Message"
          className={`${field} resize-none`}
        />
        <span className={label}>Tell me about your project or role *</span>
      </label>

      {status === "error" && (
        <p role="alert" className="rounded-xl border border-accent-2/30 bg-accent-2/10 px-4 py-3 text-sm text-accent-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="group flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-fg font-medium text-bg transition hover:shadow-[0_0_50px_-8px_var(--accent)] disabled:cursor-wait disabled:opacity-70"
      >
        {sending ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-bg/30 border-t-bg" /> Sending…
          </>
        ) : (
          <>
            Send message <Send className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
          </>
        )}
      </button>
      <p className="text-center text-xs text-faint">Your details are only used to get back to you — no spam, ever.</p>
    </form>
  );
}
