"use client";

import { deleteTrackerEntry } from "@/lib/family-data";
import type { TrackerEntry } from "@/lib/types";
import { theme } from "@/lib/theme";
import { TYPE_META } from "./TrackerLogger";

function dayLabel(dateStr: string): string {
  const d = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const same = (a: Date, b: Date) => a.toDateString() === b.toDateString();
  if (same(d, today)) return "Today";
  if (same(d, yesterday)) return "Yesterday";
  return d.toLocaleDateString([], { weekday: "long", month: "short", day: "numeric" });
}

export function TrackerTimeline({
  entries,
  onDeleted,
}: {
  entries: TrackerEntry[];
  onDeleted: (id: number) => void;
}) {
  if (entries.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "40px 0", color: theme.sub }}>
        <div style={{ fontSize: 30, marginBottom: 8 }}>📋</div>
        <p style={{ fontSize: 14, margin: 0 }}>No entries yet — log a feeding, diaper, or sleep above to get started.</p>
      </div>
    );
  }

  const groups: { label: string; items: TrackerEntry[] }[] = [];
  for (const e of entries) {
    const label = dayLabel(e.startedAt);
    const group = groups.find((g) => g.label === label);
    if (group) group.items.push(e);
    else groups.push({ label, items: [e] });
  }

  return (
    <div>
      {groups.map((g) => (
        <div key={g.label} style={{ marginBottom: 22 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: theme.sub, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 10 }}>
            {g.label}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {g.items.map((e) => (
              <div
                key={e.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: "#fff",
                  border: `1.5px solid ${theme.border}`,
                  borderRadius: 12,
                  padding: "10px 14px",
                }}
              >
                <span style={{ fontSize: 20 }}>{TYPE_META[e.type].icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: theme.ink }}>
                    {e.subtype || TYPE_META[e.type].label}
                    {e.amount ? ` · ${e.amount}` : ""}
                  </div>
                  <div style={{ fontSize: 11, color: theme.sub, marginTop: 2 }}>
                    {new Date(e.startedAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
                    {e.loggedByName ? ` · logged by ${e.loggedByName}` : ""}
                    {e.notes ? ` · ${e.notes}` : ""}
                  </div>
                </div>
                <button
                  onClick={() => {
                    deleteTrackerEntry(e.id);
                    onDeleted(e.id);
                  }}
                  style={{ background: "none", border: "none", color: theme.sub, cursor: "pointer", fontSize: 16, padding: 4 }}
                  aria-label="Delete entry"
                  title="Delete entry"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
