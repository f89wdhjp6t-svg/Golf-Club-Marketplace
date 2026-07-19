"use client";

import { useEffect, useState } from "react";
import type { NewClub, StorePriceEstimate } from "@/lib/types";
import { RETAILERS, retailerSearchUrl } from "@/lib/newClubs";

export function PriceComparison({ club }: { club: NewClub }) {
  const [estimates, setEstimates] = useState<StorePriceEstimate[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    setEstimates(null);

    fetch("/api/store-prices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ club }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok || data.error) throw new Error(data.error || "Failed to load prices");
        if (!cancelled) setEstimates(data.estimates);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Could not load price estimates.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [club]);

  const cheapest =
    estimates && estimates.length
      ? Math.min(...estimates.map((e) => e.estimatedPrice))
      : null;

  return (
    <div style={{ background: "#fff", borderRadius: 18, padding: 22, border: "1.5px solid #e5e7eb" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <span style={{ fontSize: 20 }}>🏬</span>
        <h2 style={{ fontFamily: "'Georgia', serif", fontSize: 17, fontWeight: 700, margin: 0 }}>
          Compare Store Prices
        </h2>
      </div>
      <p style={{ fontSize: 12, color: "#9ca3af", margin: "0 0 16px" }}>
        AI-estimated prices, not live retailer data — always confirm the current price before buying.
      </p>

      {loading && (
        <div style={{ textAlign: "center", padding: "24px 0", color: "#6b7280", fontSize: 13 }}>
          Estimating current prices across stores...
        </div>
      )}

      {error && (
        <div style={{ background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: 12, padding: 14 }}>
          <p style={{ color: "#ef4444", fontSize: 13, margin: 0 }}>{error}</p>
        </div>
      )}

      {estimates && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {estimates.map((est) => {
            const retailer = RETAILERS.find((r) => r.name === est.store);
            const isCheapest = cheapest !== null && est.estimatedPrice === cheapest;
            return (
              <div
                key={est.store}
                style={{
                  border: isCheapest ? "2px solid #16a34a" : "1.5px solid #e5e7eb",
                  background: isCheapest ? "#f0fdf4" : "#fff",
                  borderRadius: 12,
                  padding: "14px 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: "#111" }}>{est.store}</span>
                    {isCheapest && (
                      <span
                        style={{
                          background: "#16a34a",
                          color: "#fff",
                          fontSize: 10,
                          fontWeight: 800,
                          borderRadius: 20,
                          padding: "2px 8px",
                        }}
                      >
                        LOWEST
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>{est.note}</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 800,
                      color: isCheapest ? "#16a34a" : "#111",
                      marginBottom: 6,
                    }}
                  >
                    ${est.estimatedPrice}
                  </div>
                  {retailer && (
                    <a
                      href={retailerSearchUrl(retailer, club.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#16a34a",
                        textDecoration: "none",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Search at {est.store} →
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
