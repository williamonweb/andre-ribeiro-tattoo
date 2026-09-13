import Link from "next/link";
import { ArrowUpRight, LockKeyhole, Menu } from "lucide-react";
import { getProfile } from "@/lib/site-data";
import { defaultAppearance,getContent } from "@/lib/content";

const links = [
  ["/", "Início", "inicio"],
  ["/perfil", "O artista", "perfil"],
  ["/artes", "Portfólio", "artes"],
  ["/especialidades", "Especialidades", "especialidades"],
  ["/atendimento", "Atendimento", "atendimento"],
  ["/orcamento", "Orçamento", "orcamento"],
] as const;

export async function SiteHeader({ active = "", overlay = false }: { active?: string; overlay?: boolean }) {
  const [profile,appearance] = await Promise.all([getProfile(),getContent("appearance",defaultAppearance)]);
  const logoSize=Math.min(110,Math.max(60,Number(appearance.logoSize)||86));
  const whatsappUrl = `https://wa.me/${profile.whatsapp}?text=Olá%20André!%20Vim%20pelo%20site%20e%20gostaria%20de%20conversar%20sobre%20uma%20tatuagem.`;
  return (
    <header className={"site-header inner-header" + (overlay ? " overlay-header" : "")}>
      <Link className="brand" href="/" aria-label="André Ribeiro Tattoo — início">
        {appearance.logoImageUrl?<img className="brand-logo-image" style={{width:logoSize,height:logoSize}} src={appearance.logoImageUrl} alt=""/>:<span className="brand-mark">{appearance.logoInitials}</span>}
        {appearance.showBrandText&&<span className="brand-name">{profile.name} <small>{appearance.brandSuffix}</small></span>}
      </Link>
      <nav className="desktop-nav" aria-label="Navegação principal">
        {links.map(([href, label, key]) => <Link key={href} className={active === key ? "active" : ""} href={href}>{label}</Link>)}
      </nav>
      <div className="header-actions">
        <Link className="cms-link" href="/admin"><LockKeyhole size={15} /> Painel CMS</Link>
        <a className="header-cta" href={whatsappUrl} target="_blank" rel="noreferrer">Agendar <ArrowUpRight size={17} /></a>
        <details className="mobile-menu">
          <summary aria-label="Abrir menu"><Menu size={22} /></summary>
          <nav>{links.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}<Link href="/cuidados">Cuidados</Link><Link href="/depoimentos">Depoimentos</Link><Link href="/duvidas">Dúvidas</Link><Link href="/admin"><LockKeyhole size={15} /> Painel CMS</Link></nav>
        </details>
      </div>
    </header>
  );
}

export async function SiteFooter() {
  const [profile,appearance] = await Promise.all([getProfile(),getContent("appearance",defaultAppearance)]);
  const logoSize=Math.min(110,Math.max(60,Number(appearance.logoSize)||86));
  const year=new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="site-footer-main">
        <Link className="brand" href="/">{appearance.logoImageUrl?<img className="brand-logo-image" style={{width:logoSize,height:logoSize}} src={appearance.logoImageUrl} alt=""/>:<span className="brand-mark">{appearance.logoInitials}</span>}{appearance.showBrandText&&<span className="brand-name">{profile.name} <small>{appearance.brandSuffix}</small></span>}</Link>
        <nav className="site-footer-nav" aria-label="Páginas do site"><Link href="/especialidades">Especialidades</Link><Link href="/atendimento">Atendimento</Link><Link href="/cuidados">Cuidados</Link><Link href="/depoimentos">Depoimentos</Link><Link href="/duvidas">Dúvidas</Link><Link href="/orcamento">Orçamento</Link></nav>
        <div className="site-footer-actions"><a href={`https://instagram.com/${profile.instagram}`} target="_blank" rel="noreferrer">Instagram</a><Link href="/admin"><LockKeyhole size={14} /> Painel CMS</Link></div>
      </div>
      <div className="site-footer-bottom">
        <p>© {year} {profile.name} Tattoo. Todos os direitos reservados.</p>
        <nav className="footer-legal" aria-label="Informações legais"><Link href="/termos">Termos de Uso</Link><Link href="/privacidade">Política de Privacidade</Link></nav>
        <a className="forge-credit" href="https://forgelabss.com.br" target="_blank" rel="noreferrer">Criado por <strong>Forge Labs</strong><ArrowUpRight size={14}/></a>
      </div>
    </footer>
  );
}
