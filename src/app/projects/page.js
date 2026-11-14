import ProjectsExplorer from "@/components/ProjectsExplorer";
import { Container, PageHeader, Serif, CTA } from "@/components/ui";
import { projects } from "@/data/portfolio";

export const metadata = {
  title: "Projects",
  description: "Live e-commerce platforms and business websites built by Bhumika Garg with Next.js, React.js, Node.js, Express.js and MongoDB.",
};

export default function Projects() {
  const ecom = projects.filter((p) => p.kind === "E-commerce").length;
  return (
    <>
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
