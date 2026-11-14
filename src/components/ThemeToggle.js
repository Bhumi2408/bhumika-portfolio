"use client";

import { useTheme, toggleTheme } from "@/lib/theme";
import { Sun, Moon } from "./Icons";

export default function ThemeToggle({ className = "" }) {
  const theme = useTheme();
  const dark = theme === "dark";

  return (
    <button
      type="button"
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        toggleTheme(r.left + r.width / 2, r.top + r.height / 2);
      }}
      aria-label={`Switch to ${dark ? "light" : "dark"} theme`}
      title={`Switch to ${dark ? "light" : "dark"} theme`}
      className={`relative grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-line bg-surface text-fg transition hover:border-accent ${className}`}
    >
      <Sun
        className={`absolute transition-all duration-500 ${dark ? "translate-y-0 rotate-0 opacity-100" : "translate-y-6 rotate-90 opacity-0"}`}
      />
      <Moon
        className={`absolute transition-all duration-500 ${dark ? "-translate-y-6 -rotate-90 opacity-0" : "translate-y-0 rotate-0 opacity-100"}`}
      />
    </button>
  );
}
