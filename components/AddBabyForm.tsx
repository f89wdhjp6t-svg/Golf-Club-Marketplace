"use client";

import { useState } from "react";
import { useFamily } from "@/lib/family-context";
import { theme } from "@/lib/theme";
import { Card, inputStyle, PrimaryButton } from "./Shared";

export function AddBabyForm({ onDone }: { onDone?: () => void }) {
  const { addBaby } = useFamily();
  const [stage, setStage] = useState<"expecting" | "born">("expecting");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!name.trim() || !date) return;
    setLoading(true);
    setError("");
    const res = await addBaby(name.trim(), stage === "born" ? date : null, stage === "expecting" ? date : null);
    setLoading(false);
    if (res.error) {
      setError(res.error);
      return;
    }
    setName("");
    setDate("");
    onDone?.();
  };

  return (
    <Card>
      <div style={{ fontSize: 15, fontWeight: 700, color: theme.ink, marginBottom: 14 }}>Add a baby</div>
      <div style={{ display: "flex", background: "#f6efe9", borderRadius: 12, padding: 4, marginBottom: 14, gap: 4 }}>
        {(["expecting", "born"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStage(s)}
            style={{
              flex: 1,
              padding: "9px 4px",
              borderRadius: 9,
              background: stage === s ? "#fff" : "transparent",
              border: stage === s ? `1.5px solid ${theme.border}` : "1.5px solid transparent",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
              color: stage === s ? theme.ink : theme.sub,
            }}
          >
            {s === "expecting" ? "Still expecting" : "Already born"}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input style={inputStyle} placeholder={stage === "expecting" ? "Nickname (e.g. Baby Smith)" : "Baby's name"} value={name} onChange={(e) => setName(e.target.value)} />
        <div>
          <label style={{ fontSize: 12, color: theme.sub, fontWeight: 600, display: "block", marginBottom: 6 }}>
            {stage === "expecting" ? "Due date" : "Birth date"}
          </label>
          <input style={inputStyle} type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        {error && <p style={{ fontSize: 12, color: "#a3313a", margin: 0 }}>{error}</p>}
        <PrimaryButton onClick={handleSubmit} disabled={loading || !name.trim() || !date}>
          {loading ? "Saving..." : "Add Baby →"}
        </PrimaryButton>
      </div>
    </Card>
  );
}
