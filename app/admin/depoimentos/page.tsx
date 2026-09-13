import { MessageSquareQuote } from "lucide-react";
import { AdminHeader,SavedNotice } from "@/components/admin-shell";
import { EditorCard,PageHeaderFields,SaveButton } from "@/components/admin-fields";
import { defaultTestimonials,getContent } from "@/lib/content";
import { getTestimonialRequests } from "@/lib/site-data";
import { saveTestimonials,updateTestimonialStatus } from "../actions";

export default async function Page({searchParams}:{searchParams:Promise<{saved?:string}>}){
 const [data,comments,params]=await Promise.all([getContent("testimonials",defaultTestimonials),getTestimonialRequests(),searchParams]);
 const pending=comments.filter(item=>item.status==="pendente").length;
 return <><AdminHeader eyebrow="Conteúdo" title="Depoimentos" description="Edite os destaques e modere os comentários enviados pelos clientes."/><SavedNotice saved={params.saved}/>
  <section className="admin-card testimonial-moderation">
   <div className="card-title"><div><h2>Comentários recebidos</h2><p>Somente comentários aprovados aparecem no site.</p></div><span>{pending} pendente{pending===1?"":"s"}</span></div>
   {comments.length?<div className="moderation-list">{comments.map(item=><article key={item.id}><div className="moderation-message"><MessageSquareQuote size={22}/><div><strong>{item.name}</strong><small>{[item.tattoo_style,item.city,new Date(item.created_at).toLocaleDateString("pt-BR")].filter(Boolean).join(" · ")}</small><p>{item.message}</p></div></div><form action={updateTestimonialStatus}><input type="hidden" name="id" value={item.id}/><label>Status<select name="status" defaultValue={item.status}><option value="pendente">Pendente</option><option value="aprovado">Aprovado</option><option value="oculto">Oculto</option></select></label><button type="submit">Atualizar</button></form></article>)}</div>:<div className="empty-requests"><MessageSquareQuote size={28}/><p>Nenhum comentário recebido ainda.</p></div>}
  </section>
  <form action={saveTestimonials} className="admin-card"><div className="card-title"><div><h2>Depoimentos em destaque</h2><p>Estes três depoimentos permanecem no início da página.</p></div><span>Fixos</span></div><PageHeaderFields data={data}/>{data.items.map((item,i)=><EditorCard number={i+1} key={i}><label>Nome do cliente<input name={`name_${i}`} defaultValue={item.name}/></label><label>Estilo da tatuagem<input name={`style_${i}`} defaultValue={item.style}/></label><label className="full">Depoimento<textarea name={`quote_${i}`} rows={4} defaultValue={item.quote}/></label></EditorCard>)}<SaveButton/></form>
 </>;
}
