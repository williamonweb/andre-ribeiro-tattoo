import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const CMS_COOKIE = "andre_cms_session";
export function makeCmsToken(user: string, password: string) { return createHmac("sha256", password).update(`andre-ribeiro-cms:${user}`).digest("hex"); }
export async function isAdmin() {
  const user = process.env.ADMIN_USER || "admin"; const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  const actual = (await cookies()).get(CMS_COOKIE)?.value || ""; const expected = makeCmsToken(user,password);
  return actual.length === expected.length && timingSafeEqual(Buffer.from(actual),Buffer.from(expected));
}
export async function requireAdmin(returnTo = "/admin") { if (!(await isAdmin())) redirect(`/cms-login?returnTo=${encodeURIComponent(returnTo)}`); }
