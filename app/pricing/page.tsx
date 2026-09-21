import { redirect } from "next/navigation";

/** Prices moved onto the course cards; old links and any in-flight Paddle return land there. */
export default async function PricingPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const q = new URLSearchParams(await searchParams).toString();
  redirect(`/courses${q ? `?${q}` : ""}`);
}
