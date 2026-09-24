import {
  Activity, AppWindow, Bot, Boxes, Braces, Cloud, CreditCard, Database, FileCode, FlaskConical, GitBranch, Globe, Hourglass,
  KeyRound, MemoryStick, MessagesSquare, MonitorSmartphone, Plug, Rocket, ShieldCheck, Users, Zap, type LucideIcon,
} from "lucide-react";
import type { Module } from "@/lib/types";

/** One picture per lesson, saying what it is about; the course data's glyph is the fallback. */
const ICONS: Record<string, LucideIcon> = {
  ground: FileCode,
  vcs: GitBranch,
  sides: MonitorSmartphone,
  langs: Braces,
  frontend: AppWindow,
  http: MessagesSquare,
  apis: Plug,
  data: Database,
  memory: MemoryStick,
  cache: Zap,
  testing: FlaskConical,
  async: Hourglass,
  auth: KeyRound,
  security: ShieldCheck,
  pay: CreditCard,
  net: Globe,
  cloud: Cloud,
  devops: Rocket,
  observe: Activity,
  scale: Boxes,
  team: Users,
  ai: Bot,
};

export function LessonIcon({ m, size = 20 }: { m: Pick<Module, "id" | "icon">; size?: number }) {
  const I = ICONS[m.id];
  return I ? <I size={size} strokeWidth={1.9} aria-hidden="true" /> : <>{m.icon}</>;
}
