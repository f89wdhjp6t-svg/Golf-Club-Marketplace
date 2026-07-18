import type { AIResult } from "@/lib/types";
import { ScoreBar } from "./Shared";

export function AIResultBody({
  result,
  myClubLabel,
}: {
  result: AIResult;
  myClubLabel: string;
}) {
  return (
    <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
      <div
        style={{
          background: result.verdictColor + "15",
          border: `2px solid ${result.verdictColor}`,
          borderRadius: 12,
          padding: "14px 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontFamily: "'Georgia', serif",
            fontWeight: 700,
            fontSize: 22,
            color: result.verdictColor,
          }}
        >
          {result.verdict}
        </span>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600 }}>VALUE SCORE</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: result.verdictColor }}>
            {result.valueScore}/10
          </div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <ScoreBar label="Value for Money" score={result.valueScore} />
        <ScoreBar label="Upgrade Potential" score={result.upgradeScore} />
      </div>
      <div>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "#6b7280",
            textTransform: "uppercase",
            letterSpacing: 0.5,
            marginBottom: 6,
          }}
        >
          Club Overview
        </div>
        <p style={{ fontSize: 13, color: "#374151", margin: 0, lineHeight: 1.6 }}>
          {result.summary}
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#16a34a", marginBottom: 6 }}>
            ✓ PROS
          </div>
          {result.prosForBuyer?.map((p, i) => (
            <div
              key={i}
              style={{ fontSize: 12, color: "#374151", marginBottom: 5, display: "flex", gap: 6 }}
            >
              <span style={{ color: "#16a34a", flexShrink: 0 }}>•</span>
              {p}
            </div>
          ))}
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#ef4444", marginBottom: 6 }}>
            ✗ CONS
          </div>
          {result.consForBuyer?.map((c, i) => (
            <div
              key={i}
              style={{ fontSize: 12, color: "#374151", marginBottom: 5, display: "flex", gap: 6 }}
            >
              <span style={{ color: "#ef4444", flexShrink: 0 }}>•</span>
              {c}
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: "#f0fdf4", borderRadius: 10, padding: 14 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#16a34a", marginBottom: 6 }}>
          🔀 vs. Your {myClubLabel}
        </div>
        <p style={{ fontSize: 13, color: "#374151", margin: 0, lineHeight: 1.6 }}>
          {result.comparisonInsight}
        </p>
      </div>
      <div
        style={{
          background: result.verdictColor + "10",
          borderLeft: `4px solid ${result.verdictColor}`,
          borderRadius: "0 10px 10px 0",
          padding: "10px 14px",
        }}
      >
        <div style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", marginBottom: 2 }}>
          CADDY&apos;S CALL
        </div>
        <p style={{ fontSize: 13, fontWeight: 600, color: "#111", margin: 0 }}>
          {result.buyRecommendation}
        </p>
      </div>
    </div>
  );
}
