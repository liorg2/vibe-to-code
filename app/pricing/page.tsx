import { redirect } from "next/navigation";
import { withLang } from "@/lib/lang";
import { serverLang } from "@/lib/lang-server";

/** Prices moved onto the course cards; old links and any in-flight Paddle return land there. */
export default async function PricingPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const q = new URLSearchParams(await searchParams).toString();
  redirect(withLang(await serverLang(), `/courses${q ? `?${q}` : ""}`));
}
