"use client";

import { useState } from "react";
import type { Club } from "@/lib/types";

interface OfferResult {
  status: "accepted" | "countered" | "rejected";
  counterPrice?: number;
  message: string;
  error?: string;
}

export function MakeOfferPanel({
  club,
  onOfferAccepted,
}: {
  club: Club;
  onOfferAccepted: (finalPrice: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const [offerAmount, setOfferAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<OfferResult | null>(null);
  const [error, setError] = useState("");

  const submitOffer = async (amount: number) => {
    setLoading(true);
    setResult(null);
    setError("");
    try {
      const res = await fetch("/api/offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ club, offerAmount: amount }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Could not send offer.");
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send offer. Please try again.");
    }
    setLoading(false);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        style={{
          width: "100%",
          background: "#fff",
          color: "#0f1f0f",
          border: "1.5px solid #0f1f0f",
          borderRadius: 12,
          padding: "14px",
          fontWeight: 700,
          fontSize: 14,
          cursor: "pointer",
        }}
      >
        💬 Make an Offer
      </button>
    );
  }

  return (
    <div style={{ border: "1.5px solid #e5e7eb", borderRadius: 14, padding: 16, background: "#fafafa" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>💬 Make an Offer to {club.seller}</span>
        <button
          onClick={() => {
            setOpen(false);
            setResult(null);
            setError("");
            setOfferAmount("");
          }}
          style={{ background: "none", border: "none", color: "#9ca3af", cursor: "pointer", fontSize: 13 }}
        >
          ✕
        </button>
      </div>

      {!result && (
        <>
          <div style={{ position: "relative", marginBottom: 10 }}>
            <span
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: 15,
                fontWeight: 700,
                color: "#16a34a",
              }}
            >
              $
            </span>
            <input
              type="number"
              min={1}
              value={offerAmount}
              onChange={(e) => setOfferAmount(e.target.value)}
              placeholder={`e.g. ${Math.round(club.price * 0.85)}`}
              style={{
                width: "100%",
                border: "1.5px solid #d1d5db",
                borderRadius: 10,
                padding: "10px 12px 10px 26px",
                fontSize: 14,
                outline: "none",
                boxSizing: "border-box",
                color: "#111",
              }}
            />
          </div>
          <p style={{ fontSize: 11, color: "#9ca3af", margin: "0 0 10px" }}>
            Listed at ${club.price}. {club.seller} will accept, counter, or decline.
          </p>
          {error && <p style={{ fontSize: 12, color: "#ef4444", margin: "0 0 10px" }}>{error}</p>}
          <button
            onClick={() => submitOffer(Number(offerAmount))}
            disabled={loading || !offerAmount || Number(offerAmount) <= 0}
            style={{
              width: "100%",
              background: loading || !offerAmount ? "#e5e7eb" : "#0f1f0f",
              color: loading || !offerAmount ? "#9ca3af" : "#fff",
              border: "none",
              borderRadius: 10,
              padding: "12px",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            {loading ? "Sending offer..." : "Send Offer →"}
          </button>
        </>
      )}

      {result && (
        <div>
          <div
            style={{
              background:
                result.status === "accepted" ? "#f0fdf4" : result.status === "countered" ? "#fffbeb" : "#fef2f2",
              border: `1.5px solid ${
                result.status === "accepted" ? "#86efac" : result.status === "countered" ? "#fde68a" : "#fca5a5"
              }`,
              borderRadius: 10,
              padding: 12,
              marginBottom: 10,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: 0.5,
                marginBottom: 4,
                color: result.status === "accepted" ? "#16a34a" : result.status === "countered" ? "#b45309" : "#dc2626",
              }}
            >
              {result.status === "accepted" && "✓ Offer Accepted"}
              {result.status === "countered" && "↔ Counter Offer"}
              {result.status === "rejected" && "✗ Offer Declined"}
            </div>
            <p style={{ fontSize: 13, color: "#374151", margin: 0, lineHeight: 1.5 }}>{result.message}</p>
          </div>

          {result.status === "accepted" && (
            <button
              onClick={() => onOfferAccepted(Number(offerAmount))}
              style={{ width: "100%", background: "#16a34a", color: "#fff", border: "none", borderRadius: 10, padding: "12px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}
            >
              Add to Cart — ${offerAmount}
            </button>
          )}

          {result.status === "countered" && result.counterPrice && (
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => onOfferAccepted(result.counterPrice as number)}
                style={{ flex: 1, background: "#16a34a", color: "#fff", border: "none", borderRadius: 10, padding: "12px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}
              >
                Accept ${result.counterPrice}
              </button>
              <button
                onClick={() => {
                  setResult(null);
                  setOfferAmount("");
                }}
                style={{ flex: 1, background: "#fff", color: "#6b7280", border: "1.5px solid #e5e7eb", borderRadius: 10, padding: "12px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}
              >
                New Offer
              </button>
            </div>
          )}

          {result.status === "rejected" && (
            <button
              onClick={() => {
                setResult(null);
                setOfferAmount("");
              }}
              style={{ width: "100%", background: "#fff", color: "#6b7280", border: "1.5px solid #e5e7eb", borderRadius: 10, padding: "12px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}
            >
              Try a Different Offer
            </button>
          )}
        </div>
      )}
    </div>
  );
}
