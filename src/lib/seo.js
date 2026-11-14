import { siteUrl } from "./site";
import { profile, skills, education, projects } from "@/data/portfolio";

export const SITE_NAME = "Bhumika Garg — Full Stack Developer";
export const OG_IMAGE = { url: "/og.png", width: 1200, height: 630, alt: "Bhumika Garg — Full Stack Developer (MERN · Next.js)" };

export const KEYWORDS = [
  "Bhumika Garg",
  "Bhumika Garg developer",
  "Bhumika Garg portfolio",
  "Full Stack Developer",
  "Full Stack Developer Delhi",
  "MERN Stack Developer",
  "MERN Stack Developer Delhi",
  "Next.js Developer",
  "Next.js Developer India",
  "React.js Developer",
  "React Developer Delhi",
  "Node.js Developer",
  "E-commerce Website Developer",
  "Freelance Web Developer Delhi",
  "Web Developer India",
  "MongoDB Express React Node",
  "SEO friendly website developer",
];

/**
 * Builds complete metadata for a page: title, description, canonical URL,
 * Open Graph and Twitter card. Child pages replace (not merge) openGraph,
 * so every page goes through this helper.
 */
export function pageMeta({ title, description, path = "/", image, type = "website", noIndex = false, keywords = [] }) {
  const url = `${siteUrl}${path === "/" ? "" : path}`;
  const images = image ? [{ url: image, width: 1440, height: 900, alt: title }] : [OG_IMAGE];
  return {
    ...(title ? { title } : {}),
    description,
    keywords: [...keywords, ...KEYWORDS],
    alternates: { canonical: path },
    openGraph: {
      type,
      url,
      siteName: SITE_NAME,
      locale: "en_IN",
      title: title ? `${title} — ${profile.name}` : SITE_NAME,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: title ? `${title} — ${profile.name}` : SITE_NAME,
      description,
      images: images.map((i) => i.url),
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

// ---------- structured data (JSON-LD) ----------

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: profile.name,
    givenName: "Bhumika",
    familyName: "Garg",
    jobTitle: profile.role,
    description: profile.intro,
    url: siteUrl,
    image: `${siteUrl}${profile.photo}`,
    email: `mailto:${profile.email}`,
    telephone: profile.phone.replace(/\s/g, ""),
    address: { "@type": "PostalAddress", addressLocality: "Delhi", addressCountry: "IN" },
    worksFor: { "@type": "Organization", name: `${profile.company} (${profile.companyGroup})` },
    alumniOf: { "@type": "CollegeOrUniversity", name: education[1].school },
    hasCredential: education.map((e) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: e.degree,
      recognizedBy: { "@type": "Organization", name: e.school },
    })),
    award: ["Silver Medalist — B.Tech, Maharaja Agrasen University", "2nd Position — University-level hackathon for Smart India Hackathon 2022"],
    knowsAbout: skills.flatMap((s) => s.items),
    sameAs: [profile.linkedin, profile.github],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: SITE_NAME,
    inLanguage: "en-IN",
    author: { "@id": `${siteUrl}/#person` },
  };
}

export function profilePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: siteUrl,
    name: SITE_NAME,
    mainEntity: { "@id": `${siteUrl}/#person` },
  };
}

export function projectsListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Projects by Bhumika Garg",
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${siteUrl}/projects/${p.slug}`,
      name: p.name,
    })),
  };
}

export function projectSchema(p) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.name,
    headline: `${p.name} — ${p.tagline}`,
    description: p.description,
    url: `${siteUrl}/projects/${p.slug}`,
    image: `${siteUrl}${p.image}`,
    sameAs: p.url,
    keywords: p.tech.join(", "),
    genre: p.kind === "E-commerce" ? "E-commerce platform" : "Business website",
    creator: { "@id": `${siteUrl}/#person` },
  };
}

export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${siteUrl}${it.path === "/" ? "" : it.path}`,
    })),
  };
}

export function faqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
