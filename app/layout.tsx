import type { Metadata } from "next";
import "./globals.css";
import { defaultAppearance,getContent } from "@/lib/content";

export async function generateMetadata():Promise<Metadata>{const appearance=await getContent("appearance",defaultAppearance);const icon=appearance.logoImageUrl||"/favicon.svg";return{title:appearance.siteTitle,description:appearance.siteDescription,icons:{icon,shortcut:icon}};}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const appearance=await getContent("appearance",defaultAppearance);
  return (
    <html lang="pt-BR">
      <body style={{"--gold":appearance.goldColor,"--gold-bright":appearance.goldBrightColor,"--background":appearance.backgroundColor} as React.CSSProperties}>{children}</body>
    </html>
  );
}
