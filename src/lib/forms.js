// Web3Forms — https://web3forms.com
// The access key is meant to be public (it only allows sending to your inbox),
// but you can also set NEXT_PUBLIC_WEB3FORMS_KEY in Vercel to override it.
export const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "d5d1f3aa-878f-4642-aa4f-bcc75d870705";

/**
 * Sends a lead to Web3Forms. Returns { ok: true } or { ok: false, message }.
 * `source` tells you in the email where the lead came from (Contact page / Popup).
 */
export async function submitLead(fields, source) {
  if (fields.botcheck) return { ok: true }; // honeypot filled → silently drop spam

  const payload = {
    access_key: WEB3FORMS_KEY,
    subject: `New portfolio enquiry — ${fields.interest || "General"} (${source})`,
    from_name: "Bhumika Garg Portfolio",
    replyto: fields.email,
    name: fields.name,
    email: fields.email,
    phone: fields.phone || "—",
    interest: fields.interest || "—",
    message: fields.message || "—",
    source,
    page: typeof window !== "undefined" ? window.location.href : "",
  };

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success) return { ok: true };
    return { ok: false, message: data.message || "Something went wrong. Please try again." };
  } catch {
    return { ok: false, message: "Network error — please check your connection and try again." };
  }
}
