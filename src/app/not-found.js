import { Container, Button } from "@/components/ui";
import { ArrowLeft } from "@/components/Icons";

export const metadata = { title: "404 — Page not found" };

export default function NotFound() {
  return (
    <section className="relative flex min-h-[90svh] items-center overflow-hidden pt-28">
      <div className="line-grid fade-mask pointer-events-none absolute inset-0" />
      <Container className="relative text-center">
        <p className="text-gradient font-display text-[clamp(7rem,28vw,16rem)] font-bold leading-none tracking-[-0.06em]">404</p>
        <div className="mx-auto mt-6 max-w-md rounded-2xl border border-line bg-surface p-5 text-left font-mono text-sm">
          <p><span className="text-lime">$</span> <span className="text-fg">cd this-page</span></p>
          <p className="text-accent-2">bash: cd: this-page: No such file or directory</p>
          <p className="mt-2"><span className="text-lime">$</span> <span className="text-faint">try going home instead</span><span className="ml-1 inline-block h-4 w-[7px] translate-y-0.5 animate-blink bg-accent" /></p>
        </div>
        <div className="mt-10">
          <Button href="/">
            <ArrowLeft /> Back to home
          </Button>
        </div>
      </Container>
    </section>
  );
}
