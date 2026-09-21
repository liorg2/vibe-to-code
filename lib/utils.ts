import { cn as cnMerge } from "cn";

export function cn(...inputs: Parameters<typeof cnMerge>) {
  return cnMerge(...inputs);
}

export function esc(s: string): string {
  return s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]!));
}

export function para(s: string): string[] {
  return s.split("\n\n").filter(Boolean);
}
