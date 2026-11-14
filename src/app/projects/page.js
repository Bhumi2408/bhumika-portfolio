import ProjectsExplorer from "@/components/ProjectsExplorer";
import { Container, PageHeader, Serif, CTA } from "@/components/ui";
import { projects } from "@/data/portfolio";
import JsonLd from "@/components/JsonLd";
import { pageMeta, breadcrumbSchema, projectsListSchema } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Projects",
  description:
    "10 live projects by Bhumika Garg — 4 full-stack e-commerce platforms (Artics Decorr, Lute Diamonds, Shop99, Medical Surgical Solutions) and 6 business websites built with Next.js, React.js, Node.js and MongoDB.",
  path: "/projects",
  keywords: ["Next.js e-commerce projects", "MERN e-commerce website", "web developer portfolio projects"],
});

export default function Projects() {
  const ecom = projects.filter((p) => p.kind === "E-commerce").length;
  return (
    <>
      <JsonLd data={[projectsListSchema(), breadcrumbSchema([{ name: "Projects", path: "/projects" }])]} />
      <PageHeader path="/projects" index="03" title={["Selected ", <Serif key="s">work.</Serif>]} bg="WORK">
        {projects.length} live projects — {ecom} full-stack e-commerce platforms and {projects.length - ecom} business websites for real clients. Switch to list view and hover for previews.
      </PageHeader>
      <section className="pb-12">
        <Container>
          <ProjectsExplorer projects={projects} />
        </Container>
      </section>
      <CTA />
    </>
  );
}
