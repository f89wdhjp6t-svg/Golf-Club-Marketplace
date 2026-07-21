"use client";

import { useState } from "react";
import type { FamilyMember } from "@/lib/types";
import { theme } from "@/lib/theme";
import { inputStyle, PrimaryButton } from "./Shared";

const CATEGORIES = [
  { value: "appointment", label: "🩺 Appointment" },
  { value: "childcare", label: "🧸 Childcare day" },
  { value: "reminder", label: "📌 Reminder" },
  { value: "other", label: "📅 Other" },
];

export function EventModal({
  defaultDate,
  members,
  onClose,
  onSave,
}: {
  defaultDate: string;
  members: FamilyMember[];
  onClose: () => void;
  onSave: (data: { title: string; category: string; startAt: string; notes: string; assignedTo: string | null }) => Promise<void>;
}) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("appointment");
  const [date, setDate] = useState(defaultDate);
  const [time, setTime] = useState("09:00");
  const [notes, setNotes] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!title.trim() || !date) return;
    setSaving(true);
    await onSave({
      title: title.trim(),
      category,
      startAt: new Date(`${date}T${time || "00:00"}`).toISOString(),
      notes,
      assignedTo: assignedTo || null,
    });
    setSaving(false);
  };

  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(58,46,42,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 500, padding: 20 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: "#fff", borderRadius: 20, padding: 28, maxWidth: 420, width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}
      >
        <h2 style={{ fontFamily: theme.serif, fontSize: 19, fontWeight: 700, margin: "0 0 18px", color: theme.ink }}>New calendar event</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input style={inputStyle} placeholder="Title (e.g. 20-week ultrasound)" value={title} onChange={(e) => setTitle(e.target.value)} />
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {CATEGORIES.map((c) => (
              <button
                key={c.value}
                onClick={() => setCategory(c.value)}
                style={{
                  background: category === c.value ? theme.primary : "#fff",
                  color: category === c.value ? "#fff" : theme.ink,
                  border: `1.5px solid ${category === c.value ? theme.primary : theme.border}`,
                  borderRadius: 20,
                  padding: "6px 14px",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <input style={inputStyle} type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <input style={inputStyle} type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          </div>
          {members.length > 0 && (
            <select style={inputStyle} value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
              <option value="">Both parents</option>
              {members.map((m) => (
                <option key={m.userId} value={m.userId}>
                  {m.displayName}
                </option>
              ))}
            </select>
          )}
          <textarea style={{ ...inputStyle, minHeight: 70, resize: "vertical" }} placeholder="Notes (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} />
          <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
            <PrimaryButton onClick={handleSave} disabled={saving || !title.trim()} style={{ flex: 1 }}>
              {saving ? "Saving..." : "Save Event"}
            </PrimaryButton>
            <button
              onClick={onClose}
              style={{ background: "transparent", border: `1.5px solid ${theme.border}`, borderRadius: 12, padding: "12px 18px", fontWeight: 700, fontSize: 14, cursor: "pointer", color: theme.sub }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
