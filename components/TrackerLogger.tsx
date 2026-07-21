"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { addTrackerEntry } from "@/lib/family-data";
import type { TrackerEntry, TrackerType } from "@/lib/types";
import { theme } from "@/lib/theme";
import { Card, inputStyle, PrimaryButton } from "./Shared";

const FEEDING_SUBTYPES = ["Breast", "Bottle", "Solids"];
const DIAPER_SUBTYPES = ["Pee", "Poop", "Both"];
const SLEEP_SUBTYPES = ["Nap", "Night sleep"];

const TYPE_META: Record<TrackerType, { icon: string; label: string; subtypes: string[] }> = {
  feeding: { icon: "🍼", label: "Feeding", subtypes: FEEDING_SUBTYPES },
  diaper: { icon: "🧷", label: "Diaper", subtypes: DIAPER_SUBTYPES },
  sleep: { icon: "😴", label: "Sleep", subtypes: SLEEP_SUBTYPES },
};

export function TrackerLogger({
  babyId,
  familyId,
  onLogged,
}: {
  babyId: string;
  familyId: string;
  onLogged: (entry: TrackerEntry) => void;
}) {
  const { user } = useAuth();
  const [open, setOpen] = useState<TrackerType | null>(null);
  const [subtype, setSubtype] = useState("");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const openLogger = (type: TrackerType) => {
    setOpen(type);
    setSubtype(TYPE_META[type].subtypes[0]);
    setAmount("");
    setNotes("");
  };

  const handleSave = async () => {
    if (!open || !user) return;
    setSaving(true);
    const entry = await addTrackerEntry({
      babyId,
      familyId,
      type: open,
      subtype,
      startedAt: new Date().toISOString(),
      amount: amount || null,
      notes: notes || null,
      loggedBy: user.id,
    });
    setSaving(false);
    if (entry) {
      onLogged(entry);
      setOpen(null);
    }
  };

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: open ? 16 : 0 }}>
        {(Object.keys(TYPE_META) as TrackerType[]).map((t) => (
          <button
            key={t}
            onClick={() => openLogger(t)}
            style={{
              background: open === t ? theme.primary : "#fff",
              color: open === t ? "#fff" : theme.ink,
              border: `1.5px solid ${open === t ? theme.primary : theme.border}`,
              borderRadius: 14,
              padding: "16px 8px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              fontWeight: 700,
              fontSize: 13,
            }}
          >
            <span style={{ fontSize: 24 }}>{TYPE_META[t].icon}</span>
            Log {TYPE_META[t].label}
          </button>
        ))}
      </div>

      {open && (
        <Card style={{ background: theme.primarySoft, border: "none" }}>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12, color: theme.ink }}>
            {TYPE_META[open].icon} New {TYPE_META[open].label.toLowerCase()} entry
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
            {TYPE_META[open].subtypes.map((s) => (
              <button
                key={s}
                onClick={() => setSubtype(s)}
                style={{
                  background: subtype === s ? theme.primary : "#fff",
                  color: subtype === s ? "#fff" : theme.ink,
                  border: `1.5px solid ${subtype === s ? theme.primary : theme.border}`,
                  borderRadius: 20,
                  padding: "7px 16px",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {s}
              </button>
            ))}
          </div>
          {open === "feeding" && (
            <input style={{ ...inputStyle, marginBottom: 12 }} placeholder="Amount (e.g. 4oz, 15 min)" value={amount} onChange={(e) => setAmount(e.target.value)} />
          )}
          <input style={{ ...inputStyle, marginBottom: 12 }} placeholder="Notes (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} />
          <div style={{ display: "flex", gap: 10 }}>
            <PrimaryButton onClick={handleSave} disabled={saving} style={{ flex: 1 }}>
              {saving ? "Saving..." : `Save (now, ${new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })})`}
            </PrimaryButton>
            <button
              onClick={() => setOpen(null)}
              style={{ background: "transparent", border: `1.5px solid ${theme.border}`, borderRadius: 12, padding: "12px 18px", fontWeight: 700, fontSize: 14, cursor: "pointer", color: theme.sub }}
            >
              Cancel
            </button>
          </div>
        </Card>
      )}
    </div>
  );
}

export { TYPE_META };
