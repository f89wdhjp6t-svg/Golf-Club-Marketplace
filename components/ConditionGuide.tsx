"use client";

import { useState } from "react";
import type { Condition } from "@/lib/types";
import { CONDITION_ORDER, conditionBadgeBg, conditionColor, conditionDescription } from "@/lib/clubs";

export function ConditionGuide({ highlight }: { highlight?: Condition }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          position: "relative",
          zIndex: 302,
          background: "none",
          border: "1.5px solid #e5e7eb",
          borderRadius: 20,
          padding: "3px 10px",
          fontSize: 11,
          fontWeight: 700,
          color: "#6b7280",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        ⓘ Condition Guide
      </button>

      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            style={{ position: "fixed", inset: 0, zIndex: 300 }}
          />
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              left: 0,
              width: 320,
              background: "#fff",
              border: "1.5px solid #e5e7eb",
              borderRadius: 14,
              boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
              padding: 18,
              zIndex: 301,
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 700, color: "#111", marginBottom: 12 }}>
              What do conditions mean?
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {CONDITION_ORDER.map((c) => (
                <div
                  key={c}
                  style={{
                    padding: 10,
                    borderRadius: 10,
                    background: c === highlight ? conditionBadgeBg[c] : "transparent",
                    border: c === highlight ? `1.5px solid ${conditionColor[c]}` : "1.5px solid transparent",
                  }}
                >
                  <div style={{ fontSize: 12, fontWeight: 700, color: conditionColor[c], marginBottom: 3 }}>
                    {c}
                  </div>
                  <div style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.5 }}>{conditionDescription[c]}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
