import Link from "next/link";
import { ExternalLink,LogOut } from "lucide-react";
import { AdminNav } from "@/components/admin-nav";

export function AdminShell({ children }: { children: React.ReactNode }) {
  return <main className="admin-page"><aside className="admin-sidebar">
    <Link className="brand" href="/admin"><span className="brand-mark">AR</span><span className="brand-name">Painel <small>André Ribeiro</small></span></Link>
    <AdminNav/>
    <div className="admin-sidebar-foot"><Link href="/" target="_blank"><ExternalLink size={16}/> Ver site</Link><a href="/api/admin/logout"><LogOut size={16}/> Sair</a></div>
  </aside><section className="admin-content">{children}</section></main>;
}

export function AdminHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <header className="admin-heading"><div><p>{eyebrow}</p><h1>{title}</h1><span>{description}</span></div><Link href="/" target="_blank">Ver site <ExternalLink size={16}/></Link></header>;
}

export function SavedNotice({ saved }: { saved?: string }) { return saved ? <div className="save-alert">Alterações salvas e aplicadas ao site.</div> : null; }
