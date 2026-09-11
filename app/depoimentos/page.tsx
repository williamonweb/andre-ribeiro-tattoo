import { MessageSquareQuote } from "lucide-react";
import { RouteShell } from "@/components/route-shell";
import { defaultTestimonials,getContent } from "@/lib/content";
export const dynamic="force-dynamic";
export default async function DepoimentosPage(){const content=await getContent("testimonials",defaultTestimonials);return <RouteShell active="depoimentos" eyebrow={content.eyebrow} title={<>{content.title}<br /><em>{content.accent}</em></>} description={content.description}>
 <section className="route-testimonials">{content.items.map((item,i)=><blockquote key={i}><MessageSquareQuote size={30}/><p>“{item.quote}”</p><footer><strong>{item.name}</strong><span>{item.style}</span></footer></blockquote>)}</section>
 <p className="testimonial-note route-note">Depoimentos administrados pelo painel CMS.</p>
 </RouteShell>}
