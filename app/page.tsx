import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Camera, MapPin } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { defaultAppearance,defaultHome, getContent } from "@/lib/content";
import { getProfile } from "@/lib/site-data";

const pageRoutes=["/especialidades","/atendimento","/cuidados","/depoimentos","/duvidas","/orcamento"];

export const dynamic = "force-dynamic";
export default async function Home() {
  const [content,profile,appearance] = await Promise.all([getContent("home",defaultHome),getProfile(),getContent("appearance",defaultAppearance)]);
  return (
    <main>
      <SiteHeader active="inicio" overlay />
      <section className="hero">
        <Image src={appearance.heroImageUrl||"/hero-tattoo.png"} alt="Processo artístico de uma tatuagem em preto e cinza" fill priority sizes="100vw" className="hero-image" unoptimized={Boolean(appearance.heroImageUrl)} style={{objectPosition:appearance.heroPosition}} />
        <div className="hero-shade" style={{"--hero-overlay":Number(appearance.heroOverlay)/100} as React.CSSProperties}/>
        <div className="hero-content">
          <p className="eyebrow"><span /> {content.eyebrow}</p>
          <h1>{content.title}<br /><em>{content.accent}</em></h1>
          <p className="hero-copy">{content.description}</p>
          <div className="hero-actions">
            <Link className="button-gold" href="/orcamento">Solicitar orçamento <ArrowUpRight size={18} /></Link>
            <Link className="text-link" href="/artes">Ver trabalhos <span>→</span></Link>
          </div>
        </div>
        <div className="hero-meta">
          <span><MapPin size={15} /> {profile.city}</span>
          <a href={`https://instagram.com/${profile.instagram}`} target="_blank" rel="noreferrer"><Camera size={15} /> @{profile.instagram}</a>
        </div>
      </section>
      <section className="signature-strip" aria-label="Especialidades">{content.strip.map((item,i)=><span className="signature-item" key={item}><p>{item}</p>{i<content.strip.length-1&&<b>✦</b>}</span>)}</section>
      <section className="home-pages">
        <div className="section-heading"><p className="eyebrow"><span /> {content.exploreEyebrow}</p><h2>{content.exploreTitle}</h2><p>{content.exploreDescription}</p></div>
        <div className="home-pages-grid">{content.cards.map((card,index)=><Link href={pageRoutes[index]} key={pageRoutes[index]}><span>0{index+1}</span><h3>{card.title}</h3><p>{card.text}</p><strong>Conhecer <ArrowUpRight size={16}/></strong></Link>)}</div>
      </section>
      <SiteFooter />
    </main>
  );
}
