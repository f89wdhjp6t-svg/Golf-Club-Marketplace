"use client";

import { useState } from "react";
import { theme } from "@/lib/theme";
import { Card, Disclaimer, SafetyBadge, SectionTitle, inputStyle } from "@/components/Shared";
import { FOOD_ITEMS, MEDICATION_ITEMS, NUTRITION_DISCLAIMER, type SafetyLevel } from "@/lib/content/nutrition";

const FILTERS: { value: SafetyLevel | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "safe", label: "Generally safe" },
  { value: "caution", label: "Caution / limit" },
  { value: "avoid", label: "Avoid" },
];

export default function NutritionPage() {
  const [tab, setTab] = useState<"food" | "meds">("food");
  const [filter, setFilter] = useState<SafetyLevel | "all">("all");
  const [query, setQuery] = useState("");

  const items = (tab === "food" ? FOOD_ITEMS : MEDICATION_ITEMS)
    .filter((i) => filter === "all" || i.level === filter)
    .filter((i) => i.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 20px 60px" }}>
      <SectionTitle sub="A quick-reference list for eating and taking medication during pregnancy. Search or filter to find what you need.">
        Food & Medication Safety
      </SectionTitle>

      <div style={{ display: "flex", background: "#f6efe9", borderRadius: 12, padding: 4, marginBottom: 18, gap: 4, maxWidth: 320 }}>
        {(["food", "meds"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              flex: 1,
              padding: "9px 4px",
              borderRadius: 9,
              background: tab === t ? "#fff" : "transparent",
              border: tab === t ? `1.5px solid ${theme.border}` : "1.5px solid transparent",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
              color: tab === t ? theme.ink : theme.sub,
            }}
          >
            {t === "food" ? "🥗 Food & Drink" : "💊 Medications"}
          </button>
        ))}
      </div>

      <input
        style={{ ...inputStyle, marginBottom: 14 }}
        placeholder={tab === "food" ? "Search foods (e.g. sushi, cheese, coffee)..." : "Search medications..."}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            style={{
              background: filter === f.value ? theme.primary : "#fff",
              color: filter === f.value ? "#fff" : theme.ink,
              border: `1.5px solid ${filter === f.value ? theme.primary : theme.border}`,
              borderRadius: 20,
              padding: "7px 16px",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
        {items.length === 0 ? (
          <p style={{ fontSize: 13, color: theme.sub }}>No matches — try a different search or filter.</p>
        ) : (
          items.map((i) => (
            <Card key={i.name} style={{ padding: 16, display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 14 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: theme.ink, marginBottom: 4 }}>{i.name}</div>
                <div style={{ fontSize: 13, color: theme.sub, lineHeight: 1.5 }}>{i.note}</div>
              </div>
              <SafetyBadge level={i.level} />
            </Card>
          ))
        )}
      </div>

      <Disclaimer>{NUTRITION_DISCLAIMER}</Disclaimer>
    </div>
  );
}
