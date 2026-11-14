import { Geist, JetBrains_Mono, Instrument_Serif, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import Loader from "@/components/Loader";
import { themeScript } from "@/lib/theme";
import { siteUrl } from "@/lib/site";
import LeadPopup from "@/components/LeadPopup";
import JsonLd from "@/components/JsonLd";
import { pageMeta, personSchema, websiteSchema, SITE_NAME } from "@/lib/seo";
import { profile } from "@/data/portfolio";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });
const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"] });
const instrument = Instrument_Serif({ variable: "--font-instrument", subsets: ["latin"], weight: "400", style: ["normal", "italic"] });

const base = pageMeta({
  description:
    "Bhumika Garg is a Full Stack Developer in Delhi, India specialising in the MERN stack and Next.js. 1.5+ years building production e-commerce platforms, admin dashboards and SEO-optimised websites with React.js, Node.js, Express.js and MongoDB.",
  path: "/",
});

export const metadata = {
  ...base,
  // picks up the Vercel URL automatically (see src/lib/site.js)
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bhumika Garg — Full Stack Developer (MERN · Next.js) in Delhi",
    template: "%s — Bhumika Garg | Full Stack Developer",
  },
  applicationName: SITE_NAME,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  publisher: profile.name,
  category: "technology",
  formatDetection: { telephone: false, email: false, address: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  // add NEXT_PUBLIC_GOOGLE_VERIFICATION in Vercel after verifying the site in Google Search Console
  ...(process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION } }
    : {}),
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f3ee" },
    { media: "(prefers-color-scheme: dark)", color: "#08080c" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${geist.variable} ${jetbrains.variable} ${bricolage.variable} ${instrument.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <JsonLd data={[personSchema(), websiteSchema()]} />
      </head>
      <body className="grain min-h-screen font-sans">
        <Loader />
        <ScrollProgress />
        <Navbar />
        {children}
        <Footer />
        <CommandPalette />
        <LeadPopup />
        <Cursor />
      </body>
    </html>
  );
}
