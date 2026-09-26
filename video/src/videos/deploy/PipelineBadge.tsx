import { useCurrentFrame } from "remotion";
import { COLORS, FONT, MONO } from "../../components/theme";

/** Small closing-card glyph: the pipeline steps, one highlighted at a time, all green. */
export function PipelineBadge() {
  const frame = useCurrentFrame();
  const rows = [
    { name: "install", status: "ok" },
    { name: "test", status: "ok" },
    { name: "build", status: "ok" },
    { name: "deploy", status: "ok" },
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
        <span>Pipeline</span>
        <span style={{ color: COLORS.tx3, fontWeight: 400 }}>main branch</span>
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
          <span style={{ color: COLORS.good, fontWeight: 700 }}>passed</span>
        </div>
      ))}
    </div>
  );
}
