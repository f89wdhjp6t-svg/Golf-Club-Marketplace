"use client";

import { useState } from "react";
import type { SellForm, ValuationResult } from "@/lib/types";
import { CLUB_TYPES, CONDITIONS, conditionBadgeBg, conditionColor } from "@/lib/clubs";

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "1.5px solid #e5e7eb",
  borderRadius: 10,
  padding: "11px 14px",
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box",
  background: "#fff",
  color: "#111",
  fontFamily: "inherit",
};

const labelStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 700,
  color: "#374151",
  marginBottom: 5,
  display: "block",
  textTransform: "uppercase",
  letterSpacing: 0.4,
};

export function ValueGuideView({ onGoToSell }: { onGoToSell: () => void }) {
  const [form, setForm] = useState<SellForm>({
    clubName: "",
    brand: "",
    type: "Driver",
    year: "",
    loft: "",
    shaft: "",
    condition: "Very Good",
    extraNotes: "",
  });
  const [result, setResult] = useState<ValuationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = <K extends keyof SellForm>(k: K, v: SellForm[K]) => setForm((f) => ({ ...f, [k]: v }));

  const handleLookup = async () => {
    setLoading(true);
    setResult(null);
    setError("");
    try {
      const res = await fetch("/api/valuation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Valuation failed");
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not get a value estimate. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      <div
        style={{
          background: "linear-gradient(135deg, #0f1f0f, #14532d)",
          borderRadius: 20,
          padding: "32px",
          marginBottom: 24,
        }}
      >
        <div style={{ fontFamily: "'Georgia', serif", fontSize: 26, fontWeight: 700, color: "#fff", marginBottom: 8 }}>
          Value Guide
        </div>
        <p style={{ color: "#86efac", fontSize: 14, margin: 0 }}>
          Curious what a club is worth? Get an instant AI-powered estimate — no listing required.
        </p>
      </div>

      <div style={{ background: "#fff", borderRadius: 18, padding: 28, border: "1.5px solid #e5e7eb", display: "flex", flexDirection: "column", gap: 20, marginBottom: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <label style={labelStyle}>Club Name / Model</label>
            <input style={inputStyle} placeholder="e.g. Stealth 2 Driver" value={form.clubName} onChange={(e) => set("clubName", e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Brand</label>
            <input style={inputStyle} placeholder="e.g. TaylorMade, Callaway..." value={form.brand} onChange={(e) => set("brand", e.target.value)} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <label style={labelStyle}>Club Type</label>
            <select style={{ ...inputStyle, cursor: "pointer" }} value={form.type} onChange={(e) => set("type", e.target.value)}>
              {CLUB_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Year</label>
            <input style={inputStyle} placeholder="e.g. 2022" value={form.year} onChange={(e) => set("year", e.target.value)} />
          </div>
        </div>

        <div>
          <label style={labelStyle}>Condition</label>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {CONDITIONS.map((c) => (
              <button
                key={c}
                onClick={() => set("condition", c)}
                style={{
                  padding: "8px 16px",
                  borderRadius: 20,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  background: form.condition === c ? conditionBadgeBg[c] : "#f8fafc",
                  color: form.condition === c ? conditionColor[c] : "#6b7280",
                  border: form.condition === c ? `2px solid ${conditionColor[c]}` : "2px solid #e5e7eb",
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {error && <p style={{ fontSize: 13, color: "#ef4444", margin: 0 }}>{error}</p>}

        <button
          onClick={handleLookup}
          disabled={loading || (!form.clubName && !form.brand)}
          style={{
            width: "100%",
            background: loading || (!form.clubName && !form.brand) ? "#e5e7eb" : "#16a34a",
            color: loading || (!form.clubName && !form.brand) ? "#9ca3af" : "#fff",
            border: "none",
            borderRadius: 12,
            padding: "15px",
            fontWeight: 700,
            fontSize: 15,
            cursor: "pointer",
          }}
        >
          {loading ? "🤖 Estimating value..." : "Get Value Estimate →"}
        </button>
      </div>

      {result && (
        <div style={{ background: "#fff", borderRadius: 18, padding: 24, border: "1.5px solid #e5e7eb" }}>
          <div style={{ background: "#f0fdf4", border: "2px solid #16a34a", borderRadius: 14, padding: "18px 20px", marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#16a34a", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>
              Estimated Market Value
            </div>
            <span style={{ fontFamily: "'Georgia', serif", fontSize: 28, fontWeight: 800, color: "#16a34a" }}>
              ${result.priceLow} – ${result.priceHigh}
            </span>
            <div style={{ fontSize: 12, color: "#166534", marginTop: 6 }}>
              Suggested listing price: <strong>${result.priceSuggested}</strong> · Original MSRP: ${result.originalMSRP}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f3f4f6" }}>
            <span style={{ fontSize: 13, color: "#6b7280" }}>Market Demand</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: result.demandColor }}>{result.marketDemand}</span>
          </div>

          <div style={{ background: "#f8fafc", borderRadius: 10, padding: 14, margin: "12px 0" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 6 }}>
              Why this range?
            </div>
            <p style={{ fontSize: 12, color: "#374151", margin: 0, lineHeight: 1.6 }}>{result.pricingRationale}</p>
          </div>

          <button
            onClick={onGoToSell}
            style={{ width: "100%", background: "#0f1f0f", color: "#fff", border: "none", borderRadius: 12, padding: "14px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}
          >
            Ready to sell? List this club →
          </button>
        </div>
      )}
    </div>
  );
}
