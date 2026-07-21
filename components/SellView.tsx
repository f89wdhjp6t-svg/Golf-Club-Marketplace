"use client";

import { useRef, useState } from "react";
import type { Club, SellForm, ValuationResult } from "@/lib/types";
import { CLUB_TYPES, CONDITIONS, conditionBadgeBg, conditionColor, conditionDescription } from "@/lib/clubs";
import { clubIconFor } from "@/lib/clubIcons";

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

function StepIndicator({ step }: { step: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
      {(
        [
          ["1", "Club Details"],
          ["2", "Pricing"],
          ["3", "Preview & List"],
        ] as const
      ).map(([n, label], i) => {
        const done = step > i + 1;
        const active = step === i + 1;
        return (
          <div key={n} style={{ display: "flex", alignItems: "center", gap: 8, flex: i < 2 ? "unset" : 1 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: done || active ? "#16a34a" : "#e5e7eb",
                color: done || active ? "#fff" : "#9ca3af",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {done ? "✓" : n}
            </div>
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: active ? "#111" : "#9ca3af",
                whiteSpace: "nowrap",
              }}
            >
              {label}
            </span>
            {i < 2 && (
              <div
                style={{
                  flex: 1,
                  height: 2,
                  background: done ? "#16a34a" : "#e5e7eb",
                  minWidth: 20,
                  marginLeft: 4,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function SellView({ onListingCreated }: { onListingCreated: (club: Club) => void }) {
  const [step, setStep] = useState(1); // 1=info, 2=pricing, 3=preview
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
  const [aiData, setAiData] = useState<ValuationResult | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiError, setAiError] = useState("");
  const [sellerPrice, setSellerPrice] = useState("");
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const photoRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof SellForm>(k: K, v: SellForm[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handlePhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, 3);
    const readers = files.map(
      (f) =>
        new Promise<string>((res) => {
          const r = new FileReader();
          r.onload = (ev) => res(ev.target?.result as string);
          r.readAsDataURL(f);
        })
    );
    Promise.all(readers).then(setPhotoPreviews);
  };

  const handleGetAIValuation = async () => {
    setLoadingAI(true);
    setAiData(null);
    setAiError("");
    try {
      const res = await fetch("/api/valuation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Valuation failed");
      setAiData(data);
      setSellerPrice(String(data.priceSuggested));
      setStep(2);
    } catch (err) {
      setAiError(err instanceof Error ? err.message : "Could not get valuation. Please try again.");
    }
    setLoadingAI(false);
  };

  /* STEP 1 — Club Info */
  if (step === 1)
    return (
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div
          style={{
            background: "linear-gradient(135deg, #0f1f0f, #14532d)",
            borderRadius: 20,
            padding: "32px",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: 26,
              fontWeight: 700,
              color: "#fff",
              marginBottom: 8,
            }}
          >
            Sell Your Club
          </div>
          <p style={{ color: "#86efac", fontSize: 14, margin: 0 }}>
            Tell us about your club — AI will appraise it, write the specs, and give you a fair
            price range.
          </p>
        </div>

        <StepIndicator step={step} />

        <div
          style={{
            background: "#fff",
            borderRadius: 18,
            padding: 28,
            border: "1.5px solid #e5e7eb",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label style={labelStyle}>Club Name / Model</label>
              <input
                style={inputStyle}
                placeholder="e.g. Stealth 2 Driver"
                value={form.clubName}
                onChange={(e) => set("clubName", e.target.value)}
                onFocus={(e) => (e.target.style.borderColor = "#16a34a")}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              />
            </div>
            <div>
              <label style={labelStyle}>Brand</label>
              <input
                style={inputStyle}
                placeholder="e.g. TaylorMade, Callaway..."
                value={form.brand}
                onChange={(e) => set("brand", e.target.value)}
                onFocus={(e) => (e.target.style.borderColor = "#16a34a")}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label style={labelStyle}>Club Type</label>
              <select
                style={{ ...inputStyle, cursor: "pointer" }}
                value={form.type}
                onChange={(e) => set("type", e.target.value)}
              >
                {CLUB_TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Year</label>
              <input
                style={inputStyle}
                placeholder="e.g. 2022"
                value={form.year}
                onChange={(e) => set("year", e.target.value)}
                onFocus={(e) => (e.target.style.borderColor = "#16a34a")}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label style={labelStyle}>Loft (optional)</label>
              <input
                style={inputStyle}
                placeholder="e.g. 10.5°, 56°, 5-PW"
                value={form.loft}
                onChange={(e) => set("loft", e.target.value)}
                onFocus={(e) => (e.target.style.borderColor = "#16a34a")}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              />
            </div>
            <div>
              <label style={labelStyle}>Shaft (optional)</label>
              <input
                style={inputStyle}
                placeholder="e.g. Fujikura Ventus Stiff"
                value={form.shaft}
                onChange={(e) => set("shaft", e.target.value)}
                onFocus={(e) => (e.target.style.borderColor = "#16a34a")}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              />
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
                    transition: "all 0.15s",
                    background: form.condition === c ? conditionBadgeBg[c] : "#f8fafc",
                    color: form.condition === c ? conditionColor[c] : "#6b7280",
                    border: form.condition === c ? `2px solid ${conditionColor[c]}` : "2px solid #e5e7eb",
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
            <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 6 }}>
              {conditionDescription[form.condition]}
            </div>
          </div>

          <div>
            <label style={labelStyle}>Additional Notes (optional)</label>
            <textarea
              style={{ ...inputStyle, minHeight: 80, resize: "vertical" }}
              placeholder="e.g. includes headcover, original box, aftermarket grip, custom shaft..."
              value={form.extraNotes}
              onChange={(e) => set("extraNotes", e.target.value)}
              onFocus={(e) => (e.target.style.borderColor = "#16a34a")}
              onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
            />
          </div>

          <div>
            <label style={labelStyle}>Add Photos (up to 3)</label>
            <div
              onClick={() => photoRef.current?.click()}
              style={{
                border: "2px dashed #d1d5db",
                borderRadius: 12,
                padding: photoPreviews.length ? "12px" : "24px 16px",
                textAlign: "center",
                cursor: "pointer",
                background: "#fafafa",
                transition: "border-color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#16a34a")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
            >
              {photoPreviews.length > 0 ? (
                <div style={{ display: "flex", gap: 10 }}>
                  {photoPreviews.map((p, i) => (
                    <div key={i} style={{ flex: 1, height: 90, borderRadius: 8, overflow: "hidden" }}>
                      <img src={p} alt={`photo ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  ))}
                  <div
                    style={{
                      flex: 1,
                      height: 90,
                      borderRadius: 8,
                      background: "#f3f4f6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 24,
                      color: "#d1d5db",
                    }}
                  >
                    +
                  </div>
                </div>
              ) : (
                <>
                  <div style={{ fontSize: 32, marginBottom: 6 }}>📸</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#374151", marginBottom: 3 }}>
                    Upload up to 3 photos
                  </div>
                  <div style={{ fontSize: 12, color: "#9ca3af" }}>Good lighting sells clubs faster</div>
                </>
              )}
            </div>
            <input
              ref={photoRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotos}
              style={{ display: "none" }}
            />
          </div>

          {aiError && (
            <p style={{ fontSize: 13, color: "#ef4444", margin: 0 }}>{aiError}</p>
          )}

          <button
            onClick={handleGetAIValuation}
            disabled={loadingAI || (!form.clubName && !form.brand)}
            style={{
              width: "100%",
              background: loadingAI || (!form.clubName && !form.brand) ? "#e5e7eb" : "#16a34a",
              color: loadingAI || (!form.clubName && !form.brand) ? "#9ca3af" : "#fff",
              border: "none",
              borderRadius: 12,
              padding: "15px",
              fontWeight: 700,
              fontSize: 15,
              cursor: "pointer",
              transition: "background 0.15s",
            }}
          >
            {loadingAI ? "🤖 Getting AI Valuation..." : "Get AI Price & Specs →"}
          </button>
          {!form.clubName && !form.brand && (
            <p style={{ fontSize: 12, color: "#9ca3af", margin: "-10px 0 0", textAlign: "center" }}>
              Enter at least a club name or brand to continue
            </p>
          )}
        </div>
      </div>
    );

  /* STEP 2 — Pricing */
  if (step === 2 && aiData) {
    const numPrice = parseFloat(sellerPrice) || aiData.priceSuggested;
    const pct = Math.round(((aiData.originalMSRP - numPrice) / aiData.originalMSRP) * 100);
    const inRange = numPrice >= aiData.priceLow && numPrice <= aiData.priceHigh;
    const tooLow = numPrice < aiData.priceLow;
    const tooHigh = numPrice > aiData.priceHigh;

    return (
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <StepIndicator step={step} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: "#fff", borderRadius: 18, padding: 24, border: "1.5px solid #e5e7eb" }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#6b7280",
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                  marginBottom: 12,
                }}
              >
                🤖 AI Market Valuation
              </div>

              <div
                style={{
                  background: "#f0fdf4",
                  border: "2px solid #16a34a",
                  borderRadius: 14,
                  padding: "18px 20px",
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#16a34a",
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                    marginBottom: 6,
                  }}
                >
                  Recommended Price Range
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontFamily: "'Georgia', serif", fontSize: 28, fontWeight: 800, color: "#16a34a" }}>
                    ${aiData.priceLow} – ${aiData.priceHigh}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: "#166534", marginTop: 6 }}>
                  Suggested listing price: <strong>${aiData.priceSuggested}</strong>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f3f4f6" }}>
                <span style={{ fontSize: 13, color: "#6b7280" }}>Original MSRP</span>
                <span style={{ fontSize: 13, fontWeight: 600 }}>${aiData.originalMSRP}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f3f4f6" }}>
                <span style={{ fontSize: 13, color: "#6b7280" }}>Market Demand</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: aiData.demandColor }}>{aiData.marketDemand}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0" }}>
                <span style={{ fontSize: 13, color: "#6b7280" }}>Condition</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: conditionColor[form.condition] }}>
                  {form.condition}
                </span>
              </div>

              <div style={{ background: "#f8fafc", borderRadius: 10, padding: 14, marginTop: 12 }}>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#6b7280",
                    textTransform: "uppercase",
                    letterSpacing: 0.4,
                    marginBottom: 6,
                  }}
                >
                  Why this range?
                </div>
                <p style={{ fontSize: 12, color: "#374151", margin: 0, lineHeight: 1.6 }}>
                  {aiData.pricingRationale}
                </p>
              </div>
            </div>

            <div style={{ background: "#fff", borderRadius: 18, padding: 22, border: "1.5px solid #e5e7eb" }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#6b7280",
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                  marginBottom: 12,
                }}
              >
                💡 Selling Tips
              </div>
              {aiData.sellingTips?.map((tip, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 10,
                    marginBottom: 10,
                    padding: "10px 0",
                    borderBottom: i < aiData.sellingTips.length - 1 ? "1px solid #f3f4f6" : "none",
                  }}
                >
                  <span
                    style={{
                      background: "#f0fdf4",
                      color: "#16a34a",
                      fontWeight: 800,
                      fontSize: 12,
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ fontSize: 13, color: "#374151", lineHeight: 1.5 }}>{tip}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: "#fff", borderRadius: 18, padding: 24, border: "1.5px solid #e5e7eb" }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#6b7280",
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                  marginBottom: 16,
                }}
              >
                Set Your Listing Price
              </div>

              <div style={{ position: "relative", marginBottom: 14 }}>
                <span
                  style={{
                    position: "absolute",
                    left: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: 24,
                    fontWeight: 800,
                    color: "#16a34a",
                  }}
                >
                  $
                </span>
                <input
                  type="number"
                  value={sellerPrice}
                  onChange={(e) => setSellerPrice(e.target.value)}
                  style={{
                    width: "100%",
                    border: `2px solid ${inRange ? "#16a34a" : tooLow ? "#3b82f6" : "#ef4444"}`,
                    borderRadius: 12,
                    padding: "14px 14px 14px 40px",
                    fontSize: 28,
                    fontWeight: 800,
                    outline: "none",
                    boxSizing: "border-box",
                    color: "#111",
                    fontFamily: "inherit",
                  }}
                />
              </div>

              {tooLow && (
                <div
                  style={{
                    background: "#eff6ff",
                    border: "1.5px solid #93c5fd",
                    borderRadius: 10,
                    padding: "10px 14px",
                    marginBottom: 12,
                    fontSize: 13,
                    color: "#1d4ed8",
                  }}
                >
                  ⬇️ Below market range — you may be leaving money on the table. Consider ${aiData.priceLow}+
                </div>
              )}
              {tooHigh && (
                <div
                  style={{
                    background: "#fef2f2",
                    border: "1.5px solid #fca5a5",
                    borderRadius: 10,
                    padding: "10px 14px",
                    marginBottom: 12,
                    fontSize: 13,
                    color: "#dc2626",
                  }}
                >
                  ⬆️ Above market range — may take longer to sell. Buyers typically pay up to ${aiData.priceHigh} for this club.
                </div>
              )}
              {inRange && (
                <div
                  style={{
                    background: "#f0fdf4",
                    border: "1.5px solid #86efac",
                    borderRadius: 10,
                    padding: "10px 14px",
                    marginBottom: 12,
                    fontSize: 13,
                    color: "#16a34a",
                  }}
                >
                  ✓ Great price — within the recommended market range. Should sell quickly.
                </div>
              )}

              <div style={{ marginBottom: 16 }}>
                <input
                  type="range"
                  min={Math.round(aiData.priceLow * 0.6)}
                  max={Math.round(aiData.priceHigh * 1.5)}
                  value={numPrice}
                  onChange={(e) => setSellerPrice(e.target.value)}
                  style={{ width: "100%", accentColor: "#16a34a" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#9ca3af", marginTop: 4 }}>
                  <span>$0</span>
                  <span style={{ color: "#16a34a", fontWeight: 700 }}>
                    ${aiData.priceLow}–${aiData.priceHigh} recommended
                  </span>
                  <span>${Math.round(aiData.priceHigh * 1.5)}</span>
                </div>
              </div>

              <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
                {(
                  [
                    ["Quick Sale", aiData.priceLow],
                    ["Best Value", aiData.priceSuggested],
                    ["Top Dollar", aiData.priceHigh],
                  ] as const
                ).map(([label, val]) => (
                  <button
                    key={label}
                    onClick={() => setSellerPrice(String(val))}
                    style={{
                      flex: 1,
                      padding: "8px 4px",
                      borderRadius: 8,
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: "pointer",
                      background: String(val) === sellerPrice ? "#16a34a" : "#f8fafc",
                      color: String(val) === sellerPrice ? "#fff" : "#374151",
                      border: String(val) === sellerPrice ? "1.5px solid #16a34a" : "1.5px solid #e5e7eb",
                      transition: "all 0.15s",
                    }}
                  >
                    {label}
                    <br />
                    <span style={{ fontWeight: 800, fontSize: 13 }}>${val}</span>
                  </button>
                ))}
              </div>

              <div
                style={{
                  background: "#0f1f0f",
                  borderRadius: 12,
                  padding: "14px 18px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontSize: 11, color: "#86efac", fontWeight: 600, textTransform: "uppercase" }}>
                    You&apos;ll save buyers
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>{pct}% off retail</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 11, color: "#9ca3af" }}>Your listing price</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "#16a34a" }}>${numPrice}</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep(3)}
              style={{
                width: "100%",
                background: "#16a34a",
                color: "#fff",
                border: "none",
                borderRadius: 12,
                padding: "15px",
                fontWeight: 700,
                fontSize: 15,
                cursor: "pointer",
              }}
            >
              Preview Listing →
            </button>
            <button
              onClick={() => setStep(1)}
              style={{
                width: "100%",
                background: "none",
                border: "1.5px solid #e5e7eb",
                borderRadius: 12,
                padding: "12px",
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer",
                color: "#6b7280",
              }}
            >
              ← Edit Club Info
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* STEP 3 — Preview */
  if (step === 3 && aiData) {
    const finalPrice = parseFloat(sellerPrice) || aiData.priceSuggested;
    return (
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <StepIndicator step={step} />

        <div style={{ background: "#fff", borderRadius: 18, border: "2px solid #16a34a", overflow: "hidden", marginBottom: 20 }}>
          <div
            style={{
              background: "#f0fdf4",
              padding: "14px 22px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #dcfce7",
            }}
          >
            <span style={{ fontWeight: 700, color: "#16a34a", fontSize: 14 }}>👀 Listing Preview</span>
            <span style={{ fontSize: 12, color: "#6b7280" }}>This is what buyers will see</span>
          </div>

          <div style={{ padding: 24 }}>
            {photoPreviews.length > 0 ? (
              <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
                <div style={{ flex: 2, height: 220, borderRadius: 12, overflow: "hidden" }}>
                  <img src={photoPreviews[0]} alt="main" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                {photoPreviews.length > 1 && (
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
                    {photoPreviews.slice(1).map((p, i) => (
                      <div key={i} style={{ flex: 1, borderRadius: 10, overflow: "hidden" }}>
                        <img src={p} alt={`photo ${i + 2}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div
                style={{
                  height: 160,
                  background: "#f3f4f6",
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                  color: "#9ca3af",
                  fontSize: 14,
                }}
              >
                📸 No photos added — consider adding some to sell faster
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <h2 style={{ fontFamily: "'Georgia', serif", fontSize: 20, fontWeight: 700, margin: 0, flex: 1, lineHeight: 1.3 }}>
                {aiData.generatedTitle}
              </h2>
              <span style={{ fontSize: 28, fontWeight: 900, color: "#16a34a", marginLeft: 16 }}>${finalPrice}</span>
            </div>

            <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
              <span
                style={{
                  background: conditionBadgeBg[form.condition],
                  color: conditionColor[form.condition],
                  fontSize: 12,
                  fontWeight: 700,
                  borderRadius: 20,
                  padding: "4px 12px",
                  border: `1.5px solid ${conditionColor[form.condition]}50`,
                }}
              >
                {form.condition}
              </span>
              <span style={{ background: "#f3f4f6", color: "#374151", fontSize: 12, fontWeight: 600, borderRadius: 20, padding: "4px 12px" }}>
                {form.type}
              </span>
              {form.year && (
                <span style={{ background: "#f3f4f6", color: "#374151", fontSize: 12, fontWeight: 600, borderRadius: 20, padding: "4px 12px" }}>
                  {form.year}
                </span>
              )}
            </div>

            <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7, marginBottom: 18 }}>
              {aiData.generatedDescription}
            </p>

            <div style={{ borderTop: "1.5px solid #f3f4f6", paddingTop: 16 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#6b7280",
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                  marginBottom: 12,
                }}
              >
                Full Specifications
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
                {(
                  [
                    ["Brand", form.brand || "—"],
                    ["Type", form.type],
                    ["Year", form.year || "—"],
                    ["Loft", aiData.specs.loft || form.loft || "—"],
                    ["Shaft", aiData.specs.shaft],
                    ["Flex", aiData.specs.flex],
                    ["Head Size", aiData.specs.headSize],
                    ["Adjustable", aiData.specs.adjustable ? "Yes" : "No"],
                    ["Forgiveness", aiData.specs.forgiveness],
                    ["Distance", aiData.specs.distance],
                    ["Spin", aiData.specs.spin],
                    ["Face Material", aiData.specs.material],
                  ] as const
                ).map(([label, value]) => (
                  <div
                    key={label}
                    style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid #f3f4f6" }}
                  >
                    <span style={{ fontSize: 13, color: "#6b7280" }}>{label}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {form.extraNotes && (
              <div style={{ background: "#fffbeb", border: "1px solid #fef3c7", borderRadius: 10, padding: 12, marginTop: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", marginBottom: 4, textTransform: "uppercase" }}>
                  Seller Notes
                </div>
                <p style={{ fontSize: 13, color: "#78350f", margin: 0 }}>{form.extraNotes}</p>
              </div>
            )}
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={() => setStep(2)}
            style={{
              flex: 1,
              background: "#fff",
              border: "1.5px solid #e5e7eb",
              borderRadius: 12,
              padding: "14px",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
              color: "#6b7280",
            }}
          >
            ← Edit Pricing
          </button>
          <button
            onClick={() => {
              const newListing: Club = {
                id: Date.now(),
                name: aiData.generatedTitle,
                type: form.type,
                brand: form.brand || "Unknown",
                year: parseInt(form.year) || 2023,
                loft: form.loft || aiData.specs.loft || "—",
                shaft: aiData.specs.shaft,
                condition: form.condition,
                price: finalPrice,
                originalPrice: aiData.originalMSRP,
                photos: photoPreviews.length > 0 ? photoPreviews : [clubIconFor(form.type)],
                specs: aiData.specs,
                seller: "You",
                rating: 5.0,
                reviews: 0,
                daysListed: 0,
                description: aiData.generatedDescription,
              };
              onListingCreated(newListing);
            }}
            style={{
              flex: 2,
              background: "#16a34a",
              color: "#fff",
              border: "none",
              borderRadius: 12,
              padding: "14px",
              fontWeight: 700,
              fontSize: 15,
              cursor: "pointer",
            }}
          >
            🚀 Publish Listing for ${finalPrice}
          </button>
        </div>
      </div>
    );
  }

  return null;
}
