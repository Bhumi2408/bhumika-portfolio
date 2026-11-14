import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import ContactForm from "@/components/ContactForm";
import LocalTime from "@/components/LocalTime";
import JsonLd from "@/components/JsonLd";
import { Container, PageHeader, SectionHead, Serif } from "@/components/ui";
import { Mail, Phone, LinkedIn, GitHub, ArrowUpRight, Download, Clock } from "@/components/Icons";
import { profile, faqs } from "@/data/portfolio";
import { pageMeta, faqSchema, breadcrumbSchema } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact",
  description:
    "Hire Bhumika Garg — Full Stack Developer (MERN · Next.js) in Delhi, India. Send a message for full-time roles, freelance projects or e-commerce websites.",
  path: "/contact",
  keywords: ["Hire Full Stack Developer", "Hire MERN Developer", "Hire Next.js Developer Delhi", "Contact Bhumika Garg"],
});

const channels = [
  { icon: <Mail />, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: <Phone />, label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
  { icon: <LinkedIn />, label: "LinkedIn", value: "in/bhumika-garg", href: profile.linkedin },
  { icon: <GitHub />, label: "GitHub", value: "@Bhumi2408", href: profile.github },
];

export default function Contact() {
  return (
    <>
      <JsonLd data={[faqSchema(faqs), breadcrumbSchema([{ name: "Contact", path: "/contact" }])]} />
      <PageHeader path="/contact" index="05" title={["Let's ", <Serif key="s">talk.</Serif>]} bg="HELLO">
        Hiring for a full-stack role, need an e-commerce store, or just want to say hi? Drop a message — I&apos;d love to hear from you.
      </PageHeader>

      <section className="pb-24">
        <Container className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          <Reveal>
            <TiltCard className="p-6 sm:p-10">
              <div className="relative">
                <p className="font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">Send a message</p>
                <p className="mb-8 mt-2 text-muted">Fill in the form and your message comes straight to my inbox.</p>
                <ContactForm source="Contact page" />
              </div>
            </TiltCard>
          </Reveal>

          <div className="grid content-start gap-4">
            {channels.map((c, i) => (
              <Reveal key={c.label} delay={80 + i * 70}>
                <TiltCard href={c.href} className="flex items-center gap-4 p-5">
                  <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent/12 text-accent transition-transform duration-500 group-hover:-rotate-12">
                    {c.icon}
                  </span>
                  <span className="relative min-w-0 flex-1">
                    <span className="block font-mono text-xs uppercase tracking-widest text-faint">{c.label}</span>
                    <span className="block truncate text-lg text-fg">{c.value}</span>
                  </span>
                  <ArrowUpRight className="relative shrink-0 text-faint transition-all duration-300 group-hover:rotate-45 group-hover:text-fg" />
                </TiltCard>
              </Reveal>
            ))}

            <Reveal delay={400}>
              <div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-6">
                <div className="dot-grid pointer-events-none absolute inset-0 opacity-70" />
                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-faint">
                      <Clock width={14} height={14} /> Local time in Delhi
                    </p>
                    <p className="mt-3 font-mono text-3xl text-fg">
                      <LocalTime />
                    </p>
                  </div>
                  <span className="flex items-center gap-1.5 rounded-full bg-lime/15 px-3 py-1 text-xs font-medium text-lime">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" /> Available
                  </span>
                </div>
                <a
                  href={profile.resume}
                  download
                  className="relative mt-6 flex items-center justify-center gap-2 rounded-2xl border border-line bg-bg/60 py-3 text-sm font-medium text-fg transition hover:border-accent"
                >
                  <Download /> Download my resume (PDF)
                </a>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* FAQ — native <details> so it works without JS and is fully crawlable */}
      <section className="pb-28">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead index="?" eyebrow="FAQ" title={["Good ", <Serif key="s">questions.</Serif>]}>
            Quick answers to what people usually ask before reaching out.
          </SectionHead>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 60}>
                <details className="group rounded-2xl border border-line bg-surface px-5 py-4 transition open:border-accent/50 sm:px-6" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold text-fg [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-muted transition-transform duration-300 group-open:rotate-45 group-open:border-accent group-open:text-accent">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
