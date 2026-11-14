"use client";

import { useEffect, useState } from "react";

export default function RoleTyper({ words }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState(words[0]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    let t;
    if (!deleting && text === word) {
      t = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && text === "") {
      t = setTimeout(() => {
        setDeleting(false);
        setI((n) => n + 1);
      }, 250);
    } else {
      t = setTimeout(
        () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
        deleting ? 35 : 70
      );
    }
    return () => clearTimeout(t);
  }, [text, deleting, i, words]);

  return (
    <span className="font-mono text-accent">
      {text}
      <span className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[3px] animate-blink bg-accent" />
    </span>
  );
}
