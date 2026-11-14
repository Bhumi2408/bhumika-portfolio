import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import Orbit from "@/components/Orbit";
import { Container, PageHeader, SectionHead, Serif, Marquee, CTA } from "@/components/ui";
import { iconMap } from "@/components/Icons";
import { skills, orbit, marquee } from "@/data/portfolio";
import JsonLd from "@/components/JsonLd";
import { pageMeta, breadcrumbSchema } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Skills",
  description:
    "Tech stack of Bhumika Garg — React.js, Next.js, Node.js, Express.js, MongoDB, MySQL, Tailwind CSS, REST APIs, authentication, RBAC, Git and technical SEO.",
  path: "/skills",
  keywords: ["MERN stack skills", "React Next.js Node MongoDB developer", "Tailwind CSS developer"],
});

const pkg = {
  name: '"bhumika-garg"',
  version: '"1.5.0"',
  description: '"Full Stack Developer — MERN · Next.js"',
};

function PackageJson() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface font-mono text-[12.5px] shadow-[0_30px_80px_-40px_var(--glow)] sm:text-[13.5px]">
      <div className="flex items-center gap-2 border-b border-line bg-fg/[0.03] px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 rounded-md border border-line bg-bg/60 px-2.5 py-0.5 text-xs text-muted">
          <span className="text-[#cb3837]">npm</span> package.json
        </span>
      </div>
      <div className="max-h-[520px] overflow-auto p-5 leading-7">
        <p className="text-[var(--syn-punc)]">{"{"}</p>
        {Object.entries(pkg).map(([k, v]) => (
          <p key={k} className="pl-5">
            <span className="text-[var(--syn-key)]">&quot;{k}&quot;</span>
            <span className="text-[var(--syn-punc)]">: </span>
            <span className="text-[var(--syn-str)]">{v}</span>
            <span className="text-[var(--syn-punc)]">,</span>
          </p>
        ))}
        <p className="pl-5">
          <span className="text-[var(--syn-key)]">&quot;skills&quot;</span>
          <span className="text-[var(--syn-punc)]">: {"{"}</span>
        </p>
        {skills.map((s, i) => (
          <div key={s.title} className="pl-10">
            <p>
              <span className="text-[var(--syn-fn)]">&quot;{s.title.toLowerCase().replace(/ & /g, "_").replace(/\s/g, "_")}&quot;</span>
              <span className="text-[var(--syn-punc)]">: [</span>
            </p>
            <p className="pl-5 text-[var(--syn-str)]">
              {s.items.map((it, k) => (
                <span key={it} className="whitespace-nowrap">
                  &quot;{it}&quot;
                  {k < s.items.length - 1 && <span className="text-[var(--syn-punc)]">, </span>}
                </span>
              ))}
            </p>
            <p className="text-[var(--syn-punc)]">]{i < skills.length - 1 ? "," : ""}</p>
          </div>
        ))}
        <p className="pl-5 text-[var(--syn-punc)]">{"},"}</p>
        <p className="whitespace-nowrap pl-5">
          <span className="text-[var(--syn-key)]">&quot;openToWork&quot;</span>
          <span className="text-[var(--syn-punc)]">: </span>
          <span className="text-[var(--syn-num)]">true</span>
        </p>
        <p className="text-[var(--syn-punc)]">{"}"}</p>
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Skills", path: "/skills" }])} />
      <PageHeader path="/skills" index="04" title={["My ", <Serif key="s">toolbox.</Serif>]} bg="STACK">
        The languages, frameworks and tools I use every day to take products from database schema to deployed, SEO-ready pages.
      </PageHeader>

      <section className="py-12">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="mx-auto w-full max-w-[520px]">
            <Orbit
              rings={orbit}
              center={
                <div className="ring-gradient grid h-[clamp(84px,24cqw,128px)] w-[clamp(84px,24cqw,128px)] place-items-center rounded-full font-mono text-[clamp(20px,6cqw,34px)] font-bold text-white shadow-2xl shadow-accent/40">
                  {"</>"}
                </div>
              }
            />
          </Reveal>
          <Reveal delay={150} className="min-w-0">
            <PackageJson />
          </Reveal>
        </Container>
      </section>

      <div className="space-y-4 overflow-hidden py-12">
        <Marquee items={marquee} />
        <Marquee items={[...marquee].reverse()} reverse />
      </div>

      <section className="py-16">
        <Container>
          <SectionHead index="✦" eyebrow="By category" title={["Everything in ", <Serif key="s">one place.</Serif>]} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((group, i) => {
              const Icon = iconMap[group.icon];
              return (
                <Reveal key={group.title} delay={(i % 3) * 90}>
                  <TiltCard tilt className="h-full p-7">
                    <div className="relative flex items-center justify-between">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/12 text-accent transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                        <Icon />
                      </span>
                      <span className="font-mono text-xs text-faint">{String(group.items.length).padStart(2, "0")} items</span>
                    </div>
                    <h3 className="relative mt-6 font-display text-2xl font-semibold tracking-tight text-fg">{group.title}</h3>
                    <div className="relative mt-5 flex flex-wrap gap-2">
                      {group.items.map((s) => (
                        <span
                          key={s}
                          className="rounded-xl border border-line bg-fg/[0.03] px-3 py-1.5 text-sm text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-fg"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
