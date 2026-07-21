const BADGES = [
  { icon: "✅", label: "Authenticity Guaranteed" },
  { icon: "↩️", label: "30-Day Returns" },
  { icon: "🔒", label: "Secure Checkout" },
];

export function TrustBadges({ compact = false }: { compact?: boolean }) {
  return (
    <div style={{ display: "flex", gap: compact ? 10 : 16, flexWrap: "wrap" }}>
      {BADGES.map((b) => (
        <div
          key={b.label}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: compact ? 11 : 12,
            fontWeight: 600,
            color: "#6b7280",
          }}
        >
          <span style={{ fontSize: compact ? 13 : 14 }}>{b.icon}</span>
          {b.label}
        </div>
      ))}
    </div>
  );
}
