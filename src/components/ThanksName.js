"use client";

import { useSyncExternalStore } from "react";

const read = () => {
  try {
    return sessionStorage.getItem("lead-name") || "";
  } catch {
    return "";
  }
};

/** Shows the visitor's first name (saved when the form was sent), e.g. "Thank you, Riya!" */
export default function ThanksName() {
  const name = useSyncExternalStore(() => () => {}, read, () => "");
  return name ? <>, {name}</> : null;
}
