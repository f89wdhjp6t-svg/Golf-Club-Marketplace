export function StarRating({ value }: { value: number }) {
  return (
    <span style={{ color: "#eab308", fontSize: 14 }}>
      {"★".repeat(Math.round(value))}
      {"☆".repeat(5 - Math.round(value))}
    </span>
  );
}

export function SpecRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "8px 0",
        borderBottom: "1px solid #f3f4f6",
      }}
    >
      <span style={{ fontSize: 13, color: "#6b7280" }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>{value}</span>
    </div>
  );
}

export function ScoreBar({ label, score }: { label: string; score: number }) {
  return (
    <div style={{ background: "#f8fafc", borderRadius: 10, padding: 12 }}>
      <div style={{ fontSize: 11, color: "#6b7280", fontWeight: 600, marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ background: "#e5e7eb", borderRadius: 6, height: 8 }}>
        <div
          style={{
            background: score >= 7 ? "#16a34a" : score >= 5 ? "#eab308" : "#ef4444",
            borderRadius: 6,
            height: 8,
            width: `${score * 10}%`,
            transition: "width 0.8s ease",
          }}
        />
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, marginTop: 4, color: "#111" }}>
        {score}/10
      </div>
    </div>
  );
}
