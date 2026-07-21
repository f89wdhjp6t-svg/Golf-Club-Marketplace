"use client";

import { useMemo, useState } from "react";
import type { CalendarEvent, FamilyMember } from "@/lib/types";
import { theme } from "@/lib/theme";
import { deleteCalendarEvent } from "@/lib/family-data";

const CATEGORY_META: Record<string, { icon: string; color: string }> = {
  appointment: { icon: "🩺", color: theme.primary },
  childcare: { icon: "🧸", color: theme.accent },
  reminder: { icon: "📌", color: "#b08a3e" },
  other: { icon: "📅", color: theme.sub },
};

function ymd(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function CalendarView({
  events,
  members,
  onDayClick,
  onDeleted,
}: {
  events: CalendarEvent[];
  members: FamilyMember[];
  onDayClick: (dateStr: string) => void;
  onDeleted: (id: number) => void;
}) {
  const [cursor, setCursor] = useState(new Date());

  const eventsByDay = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    for (const e of events) {
      const key = ymd(new Date(e.startAt));
      const arr = map.get(key) ?? [];
      arr.push(e);
      map.set(key, arr);
    }
    return map;
  }, [events]);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const startWeekday = firstOfMonth.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayStr = ymd(new Date());

  const cells: (number | null)[] = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const monthLabel = firstOfMonth.toLocaleDateString([], { month: "long", year: "numeric" });

  const upcoming = events
    .filter((e) => new Date(e.startAt).getTime() >= Date.now() - 24 * 60 * 60 * 1000)
    .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime())
    .slice(0, 8);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 24 }} className="calendar-grid">
      <div style={{ background: "#fff", border: `1.5px solid ${theme.border}`, borderRadius: 18, padding: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <button
            onClick={() => setCursor(new Date(year, month - 1, 1))}
            style={{ background: "none", border: `1.5px solid ${theme.border}`, borderRadius: 10, padding: "6px 12px", cursor: "pointer", fontSize: 14 }}
          >
            ←
          </button>
          <div style={{ fontFamily: theme.serif, fontSize: 18, fontWeight: 700, color: theme.ink }}>{monthLabel}</div>
          <button
            onClick={() => setCursor(new Date(year, month + 1, 1))}
            style={{ background: "none", border: `1.5px solid ${theme.border}`, borderRadius: 10, padding: "6px 12px", cursor: "pointer", fontSize: 14 }}
          >
            →
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 6 }}>
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <div key={i} style={{ textAlign: "center", fontSize: 11, fontWeight: 700, color: theme.sub, padding: "4px 0" }}>
              {d}
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
          {cells.map((day, i) => {
            if (day === null) return <div key={i} />;
            const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const dayEvents = eventsByDay.get(dateStr) ?? [];
            const isToday = dateStr === todayStr;
            return (
              <button
                key={i}
                onClick={() => onDayClick(dateStr)}
                style={{
                  minHeight: 56,
                  border: isToday ? `1.5px solid ${theme.primary}` : `1px solid ${theme.border}`,
                  borderRadius: 10,
                  background: isToday ? theme.primarySoft : "#fff",
                  cursor: "pointer",
                  padding: 6,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 2,
                  textAlign: "left",
                }}
              >
                <span style={{ fontSize: 12, fontWeight: isToday ? 800 : 600, color: theme.ink }}>{day}</span>
                {dayEvents.slice(0, 2).map((e) => (
                  <span
                    key={e.id}
                    style={{
                      fontSize: 9,
                      background: CATEGORY_META[e.category]?.color ?? theme.sub,
                      color: "#fff",
                      borderRadius: 6,
                      padding: "1px 5px",
                      maxWidth: "100%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {e.title}
                  </span>
                ))}
                {dayEvents.length > 2 && <span style={{ fontSize: 9, color: theme.sub }}>+{dayEvents.length - 2} more</span>}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: theme.sub, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 12 }}>
          Upcoming
        </div>
        {upcoming.length === 0 ? (
          <p style={{ fontSize: 13, color: theme.sub }}>No upcoming events — click a day to add one.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {upcoming.map((e) => (
              <div key={e.id} style={{ background: "#fff", border: `1.5px solid ${theme.border}`, borderRadius: 12, padding: "10px 14px", display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ fontSize: 18 }}>{CATEGORY_META[e.category]?.icon ?? "📅"}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: theme.ink }}>{e.title}</div>
                  <div style={{ fontSize: 11, color: theme.sub, marginTop: 2 }}>
                    {new Date(e.startAt).toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })} ·{" "}
                    {new Date(e.startAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
                    {e.assignedToName ? ` · ${e.assignedToName}` : " · Both parents"}
                  </div>
                </div>
                <button
                  onClick={() => {
                    deleteCalendarEvent(e.id);
                    onDeleted(e.id);
                  }}
                  style={{ background: "none", border: "none", color: theme.sub, cursor: "pointer", fontSize: 15 }}
                  aria-label="Delete event"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
