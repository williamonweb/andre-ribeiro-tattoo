import { Check, Droplets } from "lucide-react";
import { RouteShell } from "@/components/route-shell";
import { defaultCare,getContent } from "@/lib/content";
export const dynamic="force-dynamic";
export default async function CuidadosPage(){const content=await getContent("care",defaultCare);return <RouteShell active="cuidados" eyebrow={content.eyebrow} title={<>{content.title}<br /><em>{content.accent}</em></>} description={content.description}>
 <section className="care-route-grid">{content.items.map((item,i)=><article key={i}><Droplets size={24}/><div><h2>{item.title}</h2><p>{item.text}</p></div><Check size={17}/></article>)}</section>
 <p className="health-note">{content.note}</p>
 </RouteShell>}
