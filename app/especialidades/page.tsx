import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { RouteShell } from "@/components/route-shell";
import { defaultSpecialties,getContent } from "@/lib/content";

export const dynamic="force-dynamic";
export default async function EspecialidadesPage() {
  const content=await getContent("specialties",defaultSpecialties);
  return (
    <RouteShell active="especialidades" eyebrow={content.eyebrow} title={<>{content.title}<br /><em>{content.accent}</em></>} description={content.description}>
      <section className="specialty-example-grid">
        {content.items.map((item,index) => (
          <article key={item.title}>
            <div className="specialty-example-image" role="img" aria-label={"Exemplo de " + item.title} style={{ backgroundPosition:item.imageUrl?"center, center":`center, ${item.position}`, backgroundSize:item.imageUrl?"cover, contain":"cover, 300% auto", backgroundImage:`linear-gradient(0deg,rgba(0,0,0,.55),transparent 56%),url(${item.imageUrl||"/instagram-reference.png"})` }}>
              <span>Exemplo visual</span>
            </div>
            <div className="specialty-example-copy"><span>{String(index+1).padStart(2,"0")}</span><h2>{item.title}</h2><p>{item.text}</p><small>{item.example}</small></div>
          </article>
        ))}
      </section>
      <div className="route-cta"><div><p>Não sabe qual estilo escolher?</p><h2>Conte a sua ideia. André ajuda a encontrar o melhor caminho.</h2></div><Link className="button-gold" href="/orcamento">Solicitar orçamento <ArrowUpRight size={18}/></Link></div>
    </RouteShell>
  );
}
