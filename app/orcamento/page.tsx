import { ArrowUpRight, Check, Clock3 } from "lucide-react";
import { RouteShell } from "@/components/route-shell";
import { requestQuote } from "@/app/actions";
import { defaultQuote,getContent } from "@/lib/content";

export const dynamic="force-dynamic";
export default async function OrcamentoPage({searchParams}:{searchParams:Promise<{enviado?:string}>}){const [params,content]=await Promise.all([searchParams,getContent("quote",defaultQuote)]);return <RouteShell active="orcamento" eyebrow={content.eyebrow} title={<>{content.title}<br /><em>{content.accent}</em></>} description={content.description}>
 <section className="quote-route">
  <aside><Clock3 size={24}/><h2>{content.responseTitle}</h2><p>{content.responseText}</p><ul><li>Informe o local do corpo</li><li>Diga o tamanho aproximado</li><li>Explique a ideia e o significado</li><li>Separe referências para enviar depois</li></ul></aside>
  <form action={requestQuote} className="quote-form">
   {params.enviado&&<p className="form-success"><Check size={18}/> Pedido enviado. André poderá responder pelo WhatsApp.</p>}
   <div className="field-row"><label>Seu nome<input name="name" required placeholder="Como podemos chamar você?"/></label><label>WhatsApp<input name="phone" required inputMode="tel" placeholder="(51) 99999-9999"/></label></div>
   <div className="field-row"><label>Local do corpo<input name="bodyArea" required placeholder="Ex.: antebraço"/></label><label>Tamanho aproximado<input name="size" placeholder="Ex.: 15 cm"/></label></div>
   <label>Estilo desejado<select name="style" defaultValue=""><option value="" disabled>Selecione</option><option>Realismo</option><option>Black & Grey</option><option>Animais</option><option>Religioso</option><option>Outro / Não sei</option></select></label>
   <label>Conte sua ideia<textarea name="idea" rows={5} required placeholder="Descreva o desenho, significado e referências que você imaginou."/></label>
   <button type="submit">Enviar pedido de orçamento <ArrowUpRight size={18}/></button><small>Seus dados serão usados somente para responder sobre este orçamento.</small>
  </form>
 </section>
 </RouteShell>}
