import { CircleHelp } from "lucide-react";
import { RouteShell } from "@/components/route-shell";
import { defaultFaq,getContent } from "@/lib/content";
export const dynamic="force-dynamic";
export default async function DuvidasPage(){const content=await getContent("faq",defaultFaq);return <RouteShell active="duvidas" eyebrow={content.eyebrow} title={<>{content.title}<br /><em>{content.accent}</em></>} description={content.description}>
 <section className="route-faq">{content.items.map((item,i)=><details key={i}><summary><span>{String(i+1).padStart(2,"0")}</span>{item.question}<CircleHelp size={20}/></summary><p>{item.answer}</p></details>)}</section>
 </RouteShell>}
