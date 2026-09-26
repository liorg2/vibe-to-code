/** A soft glow ring shown when a box is the current beat's active actor. */
export function focusGlow(active: boolean, color: string) {
  const base = "0 20px 50px rgba(0,0,0,.4)";
  return active
    ? { boxShadow: `${base}, 0 0 0 5px ${color}33, 0 18px 40px ${color}22`, borderColor: color }
    : { boxShadow: base };
}
