import Image from "next/image";
import { Award, Camera, Clock3, MapPin } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { getProfile } from "@/lib/site-data";

export const dynamic = "force-dynamic";

export default async function PerfilPage() {
  const profile = await getProfile();
  return (
    <main>
      <SiteHeader active="perfil" />
      <section className="page-shell artist-layout">
        <div className="artist-photo">
          <Image
            src={profile.profileImageUrl || "/instagram-reference.png"}
            alt={profile.profileImageUrl ? "Retrato de " + profile.name : "Perfil de André Ribeiro no Instagram"}
            fill
            sizes="(max-width: 800px) 100vw, 46vw"
            className={profile.profileImageUrl ? "profile-upload" : "profile-reference"}
            unoptimized={Boolean(profile.profileImageUrl)}
            priority
          />
          <span className="photo-frame" />
        </div>
        <div className="artist-copy">
          <p className="eyebrow"><span /> O artista</p>
          <h1>{profile.name}</h1>
          <h2>{profile.headline}</h2>
          <p>{profile.bio}</p>
          <div className="artist-facts">
            <div><strong>{profile.yearsExperience}</strong><span><Clock3 size={15} /> anos de experiência</span></div>
            <div><strong>01</strong><span><Award size={15} /> projeto por vez</span></div>
          </div>
          <div className="artist-links">
            <span><MapPin size={17} /> {profile.city}</span>
            <a href={"https://instagram.com/" + profile.instagram} target="_blank" rel="noreferrer"><Camera size={17} /> @{profile.instagram}</a>
          </div>
        </div>
      </section>
    </main>
  );
}
