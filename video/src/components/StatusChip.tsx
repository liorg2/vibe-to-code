import { COLORS, MONO } from "./theme";

/** A small colored pill for an HTTP status code: 2xx green, 4xx amber, 5xx red. */
export function StatusChip({ status }: { status: number }) {
  const color = status < 300 ? COLORS.good : status < 500 ? COLORS.warn : COLORS.bad;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "3px 11px",
        borderRadius: 999,
        fontWeight: 800,
        fontSize: 21,
        fontFamily: MONO,
        color: "#0a0b0f",
        background: color,
        flex: "none",
      }}
    >
      {status}
    </span>
  );
}
