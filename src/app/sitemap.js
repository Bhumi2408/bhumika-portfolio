import { siteUrl } from "@/lib/site";
import { nav, projects } from "@/data/portfolio";

export default function sitemap() {
  const lastModified = new Date("2026-11-14");
  return [
    ...nav.map((n) => ({ url: `${siteUrl}${n.href === "/" ? "" : n.href}`, lastModified, changeFrequency: "monthly", priority: n.href === "/" ? 1 : 0.8 })),
    ...projects.map((p) => ({ url: `${siteUrl}/projects/${p.slug}`, lastModified, changeFrequency: "yearly", priority: 0.6 })),
  ];
}
