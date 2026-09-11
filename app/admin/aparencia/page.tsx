import { ImageIcon, Palette } from "lucide-react";
import { AdminHeader, SavedNotice } from "@/components/admin-shell";
import { SaveButton } from "@/components/admin-fields";
import { defaultAppearance,getContent } from "@/lib/content";
import { saveAppearance } from "../actions";

export default async function Page({searchParams}:{searchParams:Promise<{saved?:string}>}){
  const [data,params]=await Promise.all([getContent("appearance",defaultAppearance),searchParams]);
  return <><AdminHeader eyebrow="Geral" title="Aparência e marca" description="Controle a identidade visual e a imagem principal do site."/><SavedNotice saved={params.saved}/>
  <form action={saveAppearance} className="admin-card appearance-form">
    <div className="card-title"><div><h2>Identidade visual</h2><p>Cores, assinatura e informações usadas em todo o site.</p></div><span>Marca</span></div>
    <div className="appearance-preview" style={{backgroundColor:data.backgroundColor,borderColor:data.goldColor}}><div className="preview-brand" style={{color:data.goldBrightColor,borderColor:data.goldColor}}>{data.logoInitials}</div><div><strong>Prévia da marca</strong><span style={{color:data.goldColor}}>{data.brandSuffix}</span></div><Palette size={22}/></div>
    <div className="form-grid admin-editor-grid"><label>Iniciais do símbolo<input name="logoInitials" maxLength={3} defaultValue={data.logoInitials}/></label><label>Complemento da marca<input name="brandSuffix" defaultValue={data.brandSuffix}/></label><label>Cor dourada<input name="goldColor" type="color" defaultValue={data.goldColor}/></label><label>Dourado claro<input name="goldBrightColor" type="color" defaultValue={data.goldBrightColor}/></label><label>Cor de fundo<input name="backgroundColor" type="color" defaultValue={data.backgroundColor}/></label><label className="full">Título do site para Google<input name="siteTitle" defaultValue={data.siteTitle}/></label><label className="full">Descrição para Google<textarea name="siteDescription" rows={3} defaultValue={data.siteDescription}/></label></div>
    <fieldset className="admin-item-editor"><legend>Imagem de fundo da página inicial</legend><div className="hero-admin-preview" style={{backgroundImage:`linear-gradient(rgba(0,0,0,.25),rgba(0,0,0,.7)),url(${data.heroImageUrl||"/hero-tattoo.png"})`,backgroundPosition:data.heroPosition}}><ImageIcon/><span>Prévia da capa</span></div><div className="form-grid admin-editor-grid"><label className="full">Trocar imagem de fundo<input name="heroImage" type="file" accept="image/jpeg,image/png,image/webp"/><small>Recomendado: horizontal, pelo menos 1920 × 1080 px. Máximo 12 MB.</small></label><label>Enquadramento<select name="heroPosition" defaultValue={data.heroPosition}><option value="center center">Centro</option><option value="center top">Centro superior</option><option value="center bottom">Centro inferior</option><option value="left center">Lado esquerdo</option><option value="right center">Lado direito</option></select></label><label>Escurecimento da imagem<input name="heroOverlay" type="range" min="35" max="95" defaultValue={data.heroOverlay}/><small>Quanto maior, mais escura e legível fica a capa.</small></label></div></fieldset>
    <SaveButton/>
  </form></>;
}
