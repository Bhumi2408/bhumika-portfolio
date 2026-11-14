// Public URL of the site, used for SEO (Open Graph, sitemap, robots).
// Priority: NEXT_PUBLIC_SITE_URL (set this once you have a custom domain)
//        → Vercel's production URL (set automatically on Vercel)
//        → localhost for local development.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  "http://localhost:3000"
).replace(/\/$/, "");
