import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { RouteShell } from "@/components/route-shell";
import { defaultProcess,getContent } from "@/lib/content";

export const dynamic="force-dynamic";
export default async function AtendimentoPage(){const content=await getContent("process",defaultProcess);
 return <RouteShell active="atendimento" eyebrow={content.eyebrow} title={<>{content.title}<br /><em>{content.accent}</em></>} description={content.description}>
  <section className="route-steps">{content.items.map((item,i)=><article key={i}><strong>{String(i+1).padStart(2,"0")}</strong><div><h2>{item.title}</h2><p>{item.text}</p></div></article>)}</section>
  <div className="route-cta"><div><p>Pronto para começar?</p><h2>O primeiro passo é contar um pouco sobre a sua ideia.</h2></div><Link className="button-gold" href="/orcamento">Começar orçamento <ArrowUpRight size={18}/></Link></div>
 </RouteShell>
}
