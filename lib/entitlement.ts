import { redirect } from "next/navigation";
import { pathForModule } from "./course";
import { withLang } from "./lang";
import { serverLang } from "./lang-server";
import { getCourses, type Course } from "./db";
import { isPreviewModule } from "./protected";
import { sessionClaims } from "./verify-session";

export type { Course };

const ALL: Course[] = ["basic", "advanced"];

/**
 * ponytail: dark until the owner flips it in Vercel — unset means today's behaviour exactly,
 * every signed-in Google account sees everything and no DB row is ever read.
 */
export function billingOn(): boolean {
  return process.env.BILLING_ENABLED === "1";
}

/** Which course a lesson belongs to — the two are independent products, so this is the whole gate. */
export function courseOfModule(moduleId: string): Course | undefined {
  return pathForModule(moduleId)?.id as Course | undefined;
}

/** What this visitor has actually bought. Nothing bought = empty. Server components only. */
export async function ownedCourses(): Promise<Set<Course>> {
  if (!billingOn()) return new Set(ALL);
  const claims = await sessionClaims();
  if (!claims) return new Set<Course>();
  return new Set(await getCourses(claims.uid));
}

/**
 * Owning a course opens every term in its lessons — there is no level inside a course any more.
 * ponytail: the free preview short-circuits before any session or DB read, so a logged-out
 * visitor still gets the first lesson of each course.
 */
export async function ownsModule(moduleId: string): Promise<boolean> {
  if (isPreviewModule(moduleId)) return true;
  const course = courseOfModule(moduleId);
  return !!course && (await ownedCourses()).has(course);
}

/** For pages that have nothing at all to show a non-buyer — send them to the offer. */
export async function requireEntitlement(): Promise<Set<Course>> {
  const owned = await ownedCourses();
  if (!owned.size) redirect(withLang(await serverLang(), "/courses"));
  return owned;
}
