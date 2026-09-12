import { KeyRound,ShieldCheck } from "lucide-react";
import { AdminHeader,SavedNotice } from "@/components/admin-shell";
import { getCmsSettings } from "@/lib/admin";
import { updateCmsAccess } from "./actions";

const errors:Record<string,string>={"senha-atual":"A senha atual não confere.",usuario:"Use de 3 a 40 caracteres: letras, números, ponto, traço ou underline.","senha-curta":"A nova senha precisa ter pelo menos 10 caracteres.",confirmacao:"A confirmação está diferente da nova senha."};

export default async function Page({searchParams}:{searchParams:Promise<{saved?:string;erro?:string}>}){
  const [settings,params]=await Promise.all([getCmsSettings(),searchParams]);const username=settings?.username||process.env.ADMIN_USER||"admin";
  return <><AdminHeader eyebrow="Configurações" title="Segurança do painel" description="Altere o usuário e a senha usados para acessar o CMS."/><SavedNotice saved={params.saved}/>{params.erro&&<div className="security-error">{errors[params.erro]||"Não foi possível alterar o acesso."}</div>}<form action={updateCmsAccess} className="admin-card security-form"><div className="card-title"><div><h2>Acesso administrativo</h2><p>A nova senha fica protegida e não é exibida novamente.</p></div><ShieldCheck size={24}/></div><div className="security-note"><KeyRound size={20}/><span>Os dados configurados na Vercel continuam funcionando como acesso de recuperação.</span></div><div className="form-grid admin-editor-grid"><label>Novo usuário<input name="username" defaultValue={username} minLength={3} maxLength={40} required autoComplete="username"/></label><label>Senha atual<input name="currentPassword" type="password" required autoComplete="current-password"/></label><label>Nova senha<input name="newPassword" type="password" minLength={10} required autoComplete="new-password"/><small>Mínimo de 10 caracteres.</small></label><label>Confirmar nova senha<input name="confirmPassword" type="password" minLength={10} required autoComplete="new-password"/></label></div><div className="admin-savebar"><span>Você continuará conectado após a alteração.</span><button type="submit">Atualizar acesso</button></div></form></>;
}
