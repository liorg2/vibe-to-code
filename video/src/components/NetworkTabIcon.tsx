import { useCurrentFrame } from "remotion";
import { COLORS, FONT, MONO } from "./theme";

/** Small network-tab glyph for the closing beat: three request rows with a highlighted one. */
export function NetworkTabIcon() {
  const frame = useCurrentFrame();
  const rows = [
    { name: "contacts", status: 200, color: COLORS.good },
    { name: "styles.css", status: 200, color: COLORS.good },
    { name: "ghost", status: 404, color: COLORS.warn },
  ];
  const highlight = Math.floor(frame / 20) % rows.length;
  return (
    <div
      style={{
        width: 560,
        background: COLORS.card,
        border: `1px solid ${COLORS.line}`,
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 20px 50px rgba(0,0,0,.4)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 18,
          padding: "12px 20px",
          borderBottom: `1px solid ${COLORS.line}`,
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: 16,
          color: COLORS.acc2,
        }}
      >
        <span>Network</span>
        <span style={{ color: COLORS.tx3, fontWeight: 400 }}>Console</span>
        <span style={{ color: COLORS.tx3, fontWeight: 400 }}>Elements</span>
      </div>
      {rows.map((r, i) => (
        <div
          key={r.name}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "12px 20px",
            fontFamily: MONO,
            fontSize: 17,
            background: i === highlight ? COLORS.card2 : "transparent",
            color: COLORS.tx2,
          }}
        >
          <span>{r.name}</span>
          <span style={{ color: r.color, fontWeight: 700 }}>{r.status}</span>
        </div>
      ))}
    </div>
  );
}
