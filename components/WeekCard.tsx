"use client";

import type { WeekEntry } from "@/lib/content/weeks";
import { theme } from "@/lib/theme";

export function WeekCard({ week, highlight }: { week: WeekEntry; highlight?: boolean }) {
  return (
    <div
      style={{
        background: highlight ? theme.primarySoft : "#fff",
        border: `1.5px solid ${highlight ? theme.primary : theme.border}`,
        borderRadius: 16,
        padding: 18,
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8 }}>
        <span style={{ fontFamily: theme.serif, fontSize: 18, fontWeight: 700, color: theme.primaryDark }}>Week {week.week}</span>
        <span style={{ fontSize: 12, color: theme.sub }}>about the size of {week.size}</span>
      </div>
      <p style={{ fontSize: 13, color: theme.ink, lineHeight: 1.6, margin: "0 0 12px" }}>{week.development}</p>
      <div style={{ fontSize: 11, fontWeight: 700, color: theme.sub, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>
        Common this week
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {week.symptoms.map((s) => (
          <span key={s} style={{ background: theme.accentSoft, color: "#3d7357", fontSize: 11, borderRadius: 20, padding: "3px 10px" }}>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
