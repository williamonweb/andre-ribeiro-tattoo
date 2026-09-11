import Link from "next/link";
import { SiteFooter, SiteHeader } from "./site-header";

const infoLinks = [
  ["/especialidades", "Especialidades"],
  ["/atendimento", "Atendimento"],
  ["/cuidados", "Cuidados"],
  ["/depoimentos", "Depoimentos"],
  ["/duvidas", "Dúvidas"],
  ["/orcamento", "Orçamento"],
];

export function RouteShell({ active, eyebrow, title, description, children }: { active: string; eyebrow: string; title: React.ReactNode; description: string; children: React.ReactNode }) {
  return (
    <main>
      <SiteHeader active={active} />
      <section className="route-hero">
        <p className="eyebrow"><span /> {eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </section>
      <nav className="info-nav" aria-label="Informações">
        {infoLinks.map(([href,label])=><Link className={href.includes(active) ? "active" : ""} href={href} key={href}>{label}</Link>)}
      </nav>
      {children}
      <SiteFooter />
    </main>
  );
}

