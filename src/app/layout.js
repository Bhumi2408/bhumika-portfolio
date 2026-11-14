import { Geist, JetBrains_Mono, Instrument_Serif, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import Loader from "@/components/Loader";
import { themeScript } from "@/lib/theme";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });
const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"] });
const instrument = Instrument_Serif({ variable: "--font-instrument", subsets: ["latin"], weight: "400", style: ["normal", "italic"] });

export const metadata = {
  // TODO: change to your final domain after deploying
  metadataBase: new URL("https://bhumikagargportfolio.netlify.app"),
  title: {
    default: "Bhumika Garg — Full Stack Developer (MERN · Next.js)",
    template: "%s — Bhumika Garg",
  },
  description:
    "Portfolio of Bhumika Garg, a Full Stack Developer in Delhi building production-grade e-commerce platforms and SEO-optimised websites with React.js, Next.js, Node.js, Express.js and MongoDB.",
  keywords: ["Bhumika Garg", "Full Stack Developer", "MERN Stack", "Next.js Developer", "React.js Developer", "Delhi"],
  openGraph: {
    title: "Bhumika Garg — Full Stack Developer",
    description: "MERN Stack · React.js · Next.js — 4 live e-commerce platforms and 10+ production websites.",
    images: ["/photo.jpeg"],
    type: "website",
  },
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
      </head>
      <body className="grain min-h-screen font-sans">
        <Loader />
        <ScrollProgress />
        <Navbar />
        {children}
        <Footer />
        <CommandPalette />
        <Cursor />
      </body>
    </html>
  );
}
