import { ArrowUpRight,Check,MessageSquareQuote } from "lucide-react";
import { RouteShell } from "@/components/route-shell";
import { defaultTestimonials,getContent } from "@/lib/content";
import { getApprovedTestimonials } from "@/lib/site-data";
import { submitTestimonial } from "@/app/actions";

export const dynamic="force-dynamic";

export default async function DepoimentosPage({searchParams}:{searchParams:Promise<{enviado?:string}>}){
 const [content,comments,params]=await Promise.all([getContent("testimonials",defaultTestimonials),getApprovedTestimonials(),searchParams]);
 return <RouteShell active="depoimentos" eyebrow={content.eyebrow} title={<>{content.title}<br/><em>{content.accent}</em></>} description={content.description}>
  <section className="route-testimonials">
   {content.items.map((item,i)=><blockquote key={`fixed-${i}`}><MessageSquareQuote size={30}/><p>“{item.quote}”</p><footer><strong>{item.name}</strong><span>{item.style}</span></footer></blockquote>)}
   {comments.map(item=><blockquote key={`comment-${item.id}`}><MessageSquareQuote size={30}/><p>“{item.message}”</p><footer><strong>{item.name}</strong><span>{[item.tattoo_style,item.city].filter(Boolean).join(" · ")||"Cliente verificado"}</span></footer></blockquote>)}
  </section>
  <section className="testimonial-submit-section">
   <div className="testimonial-submit-copy"><p className="eyebrow"><span/>Sua experiência</p><h2>Já tatuou com o André?</h2><p>Conte como foi. O comentário será analisado antes de aparecer publicamente no site.</p></div>
   <form action={submitTestimonial} className="testimonial-form">
    {params.enviado&&<p className="form-success"><Check size={18}/> Comentário enviado para aprovação. Obrigado!</p>}
    <div className="field-row"><label>Seu nome<input name="name" required minLength={2} maxLength={80} placeholder="Como deseja aparecer?"/></label><label>Cidade <small>opcional</small><input name="city" maxLength={80} placeholder="Ex.: Cachoeirinha · RS"/></label></div>
    <label>Estilo da tatuagem <small>opcional</small><input name="style" maxLength={80} placeholder="Ex.: Realismo ou Black & Grey"/></label>
    <label>Seu comentário<textarea name="message" required minLength={10} maxLength={1000} rows={5} placeholder="Conte como foi o atendimento e o resultado da sua tatuagem."/></label>
    <label className="testimonial-consent"><input type="checkbox" name="consent" required/><span>Autorizo a publicação do meu nome e comentário após a aprovação.</span></label>
    <label className="testimonial-honeypot" aria-hidden="true">Não preencha<input name="website" tabIndex={-1} autoComplete="off"/></label>
    <button type="submit">Enviar comentário <ArrowUpRight size={18}/></button>
   </form>
  </section>
 </RouteShell>
}
