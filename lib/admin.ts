import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSql } from "@/lib/db";

export const CMS_COOKIE = "andre_cms_session";
export type CmsSettings={username:string;password_salt:string;password_hash:string;session_version:number};

function sessionSecret(){return process.env.ADMIN_PASSWORD||"";}
function safeEqual(a:string,b:string){const left=Buffer.from(a),right=Buffer.from(b);return left.length===right.length&&timingSafeEqual(left,right);}

export async function getCmsSettings():Promise<CmsSettings|null>{
  try{const sql=await getSql();const rows=await sql`SELECT username,password_salt,password_hash,session_version FROM cms_settings WHERE id=1`;return (rows[0] as CmsSettings|undefined)||null;}catch{return null;}
}

export function hashCmsPassword(password:string,salt=randomBytes(16).toString("hex")){return{salt,hash:scryptSync(password,salt,64).toString("hex")};}
function verifyHash(password:string,salt:string,expected:string){try{return safeEqual(scryptSync(password,salt,64).toString("hex"),expected);}catch{return false;}}

export async function verifyCmsCredentials(user:string,password:string){
  const settings=await getCmsSettings();
  if(settings&&safeEqual(user,settings.username)&&verifyHash(password,settings.password_salt,settings.password_hash))return true;
  const emergencyUser=process.env.ADMIN_USER||"admin",emergencyPassword=process.env.ADMIN_PASSWORD||"";
  return Boolean(emergencyPassword)&&safeEqual(user,emergencyUser)&&safeEqual(password,emergencyPassword);
}

export function makeCmsToken(user:string,version=1){
  const secret=sessionSecret();if(!secret)return"";
  const payload=Buffer.from(JSON.stringify({user,version,expires:Date.now()+12*60*60*1000})).toString("base64url");
  const signature=createHmac("sha256",secret).update(payload).digest("hex");
  return `${payload}.${signature}`;
}

async function verifySession(token:string){
  const secret=sessionSecret();if(!secret||!token.includes("."))return false;
  const [payload,signature]=token.split(".");const expected=createHmac("sha256",secret).update(payload).digest("hex");
  if(!safeEqual(signature||"",expected))return false;
  try{const data=JSON.parse(Buffer.from(payload,"base64url").toString()) as {user?:string;version?:number;expires?:number};if(!data.user||!data.expires||data.expires<Date.now())return false;const settings=await getCmsSettings();const currentVersion=settings?.session_version||1;const emergencyUser=process.env.ADMIN_USER||"admin";return data.version===currentVersion&&(data.user===settings?.username||data.user===emergencyUser);}catch{return false;}
}

export async function isAdmin(){const actual=(await cookies()).get(CMS_COOKIE)?.value||"";return verifySession(actual);}
export async function requireAdmin(returnTo="/admin"){if(!(await isAdmin()))redirect(`/cms-login?returnTo=${encodeURIComponent(returnTo)}`);}
