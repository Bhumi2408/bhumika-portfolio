"use client";

import { useSyncExternalStore } from "react";

const fmt = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});

const subscribe = (cb) => {
  const id = setInterval(cb, 1000);
  return () => clearInterval(id);
};

/** Live clock in Delhi time. */
export default function LocalTime({ className = "" }) {
  const time = useSyncExternalStore(subscribe, () => fmt.format(new Date()), () => "--:--:--");
  return <span className={`tabular-nums ${className}`}>{time}</span>;
}
