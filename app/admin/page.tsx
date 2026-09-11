import Link from "next/link";
import { ArrowUpRight, Camera, CircleHelp, ImageIcon, Inbox, Settings2, Sparkles, UserRound } from "lucide-react";
import { AdminHeader } from "@/components/admin-shell";
import { getQuoteRequests } from "@/lib/site-data";

export default async function AdminPage() {
  const requests = await getQuoteRequests(); const pending = requests.filter(r=>r.status==="novo").length;
  const cards=[["/admin/orcamentos","Pedidos novos",String(pending),Inbox],["/admin/aparencia","Aparência","Editar",ImageIcon],["/admin/perfil","Perfil do artista","Editar",UserRound],["/admin/instagram","Instagram","Configurar",Camera]] as const;
  return <><AdminHeader eyebrow="Painel CMS" title="Visão geral" description="Gerencie cada parte do site em uma página separada."/>
    <section className="admin-stats">{cards.map(([href,label,cardValue,Icon])=><Link href={href} key={href}><Icon size={22}/><span>{label}</span><strong>{cardValue}</strong><ArrowUpRight size={17}/></Link>)}</section>
    <section className="admin-card"><div className="card-title"><div><h2>Conteúdo do site</h2><p>Escolha a página que deseja atualizar.</p></div><span>Rotas</span></div>
      <div className="admin-route-grid"><Link href="/admin/configuracoes"><Settings2/><strong>Página inicial</strong><small>Chamadas, texto principal e todos os atalhos.</small></Link><Link href="/admin/especialidades"><Sparkles/><strong>Especialidades</strong><small>Estilos, imagens, exemplos e explicações.</small></Link><Link href="/admin/duvidas"><CircleHelp/><strong>Perguntas frequentes</strong><small>Dúvidas e respostas dos clientes.</small></Link></div>
    </section></>;
}
