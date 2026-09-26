import {
  Activity, AppWindow, Bot, Boxes, Braces, Cloud, CreditCard, Database, FileCode, FlaskConical, Gauge, GitBranch, Globe, Hourglass,
  KeyRound, MemoryStick, MessagesSquare, MonitorSmartphone, Plug, Rocket, ShieldCheck, Smartphone, Sparkles, Users, type LucideIcon,
} from "lucide-react";
import type { Module } from "@/lib/types";

/** One picture per lesson, saying what it is about; the course data's glyph is the fallback. */
const ICONS: Record<string, LucideIcon> = {
  ground: FileCode,
  vcs: GitBranch,
  sides: MonitorSmartphone,
  langs: Braces,
  frontend: AppWindow,
  web: Gauge,
  mobile: Smartphone,
  http: MessagesSquare,
  data: Database,
  testing: FlaskConical,
  auth: KeyRound,
  security: ShieldCheck,
  apis: Plug,
  async: Hourglass,
  pay: CreditCard,
  memory: MemoryStick,
  scale: Boxes,
  net: Globe,
  cloud: Cloud,
  devops: Rocket,
  observe: Activity,
  team: Users,
  llm: Sparkles,
  ai: Bot,
};

export function LessonIcon({ m, size = 20 }: { m: Pick<Module, "id" | "icon">; size?: number }) {
  const I = ICONS[m.id];
  return I ? <I size={size} strokeWidth={1.9} aria-hidden="true" /> : <>{m.icon}</>;
}
