import { AdminShell } from "@/components/admin-shell";
import { requireAdmin } from "@/lib/admin";

export const dynamic = "force-dynamic";
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin("/admin");
  return <AdminShell>{children}</AdminShell>;
}
