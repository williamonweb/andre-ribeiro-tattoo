import Image from "next/image";
import { Camera } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { getInstagramItems, getProfile } from "@/lib/site-data";
import { defaultPortfolio,getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

const positions = ["17% 88%", "50% 88%", "83% 88%"];

export default async function ArtesPage() {
  const [items, profile, content] = await Promise.all([getInstagramItems(), getProfile(), getContent("portfolio",defaultPortfolio)]);
  return (
    <main>
      <SiteHeader active="artes" />
      <section className="portfolio-head">
        <p className="eyebrow"><span /> {content.eyebrow}</p>
        <h1>{content.title}</h1>
        <p>{content.description}</p>
      </section>
      <section className="portfolio-grid">
        {items.length > 0 ? items.map((item) => (
          <a className="portfolio-card" key={item.id} href={item.permalink} target="_blank" rel="noreferrer">
            <img src={item.media_type === "VIDEO" ? item.thumbnail_url : item.media_url} alt={item.caption?.slice(0, 110) || "Tatuagem realizada por André Ribeiro"} loading="lazy" />
            <span><Camera size={16} /> Ver no Instagram</span>
          </a>
        )) : positions.map((position, index) => (
          <a className="portfolio-card seed-card" key={position} href={"https://instagram.com/" + profile.instagram} target="_blank" rel="noreferrer">
            <Image src="/instagram-reference.png" alt={"Trabalho de André Ribeiro — amostra " + (index + 1)} fill sizes="(max-width: 720px) 100vw, 33vw" style={{ objectPosition: position }} />
            <span><Camera size={16} /> Ver trabalho no Instagram</span>
          </a>
        ))}
      </section>
      <div className="instagram-note">
        <span className={items.length ? "status-live" : "status-pending"} />
        {items.length ? "Portfólio sincronizado automaticamente com o Instagram." : "Novos trabalhos aparecerão aqui automaticamente após a conexão do Instagram."}
      </div>
    </main>
  );
}
