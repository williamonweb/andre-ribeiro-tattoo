"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CMS_COOKIE,getCmsSettings,hashCmsPassword,makeCmsToken,requireAdmin,verifyCmsCredentials } from "@/lib/admin";
import { getSql } from "@/lib/db";

export async function updateCmsAccess(fd:FormData){
  await requireAdmin("/admin/seguranca");
  const settings=await getCmsSettings();
  const currentUser=settings?.username||process.env.ADMIN_USER||"admin";
  const currentPassword=String(fd.get("currentPassword")||"");
  const username=String(fd.get("username")||"").trim();
  const password=String(fd.get("newPassword")||"");
  const confirmation=String(fd.get("confirmPassword")||"");
  const emergencyUser=process.env.ADMIN_USER||"admin";
  const validCurrent=(await verifyCmsCredentials(currentUser,currentPassword))||(await verifyCmsCredentials(emergencyUser,currentPassword));
  if(!validCurrent)redirect("/admin/seguranca?erro=senha-atual");
  if(!/^[a-zA-Z0-9._-]{3,40}$/.test(username))redirect("/admin/seguranca?erro=usuario");
  if(password.length<10)redirect("/admin/seguranca?erro=senha-curta");
  if(password!==confirmation)redirect("/admin/seguranca?erro=confirmacao");
  const {salt,hash}=hashCmsPassword(password);const version=(settings?.session_version||1)+1;const sql=await getSql();
  await sql`INSERT INTO cms_settings (id,username,password_salt,password_hash,session_version,updated_at) VALUES (1,${username},${salt},${hash},${version},NOW()) ON CONFLICT (id) DO UPDATE SET username=EXCLUDED.username,password_salt=EXCLUDED.password_salt,password_hash=EXCLUDED.password_hash,session_version=EXCLUDED.session_version,updated_at=NOW()`;
  (await cookies()).set(CMS_COOKIE,makeCmsToken(username,version),{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax",path:"/",maxAge:60*60*12});
  redirect("/admin/seguranca?saved=1");
}
