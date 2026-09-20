import { requireSession } from "@/lib/verify-session";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  await requireSession();
  return children;
}
