"use client";

import { useState } from "react";
import type { Club } from "@/lib/types";
import { conditionBadgeBg, conditionColor } from "@/lib/clubs";

export function ClubCard({ club, onSelect }: { club: Club; onSelect: (club: Club) => void }) {
  const [photoIdx, setPhotoIdx] = useState(0);
  const savingsPct = Math.round(
    ((club.originalPrice - club.price) / club.originalPrice) * 100
  );

  return (
    <div
      onClick={() => onSelect(club)}
      style={{
        background: "#fff",
        border: "1.5px solid #e5e7eb",
        borderRadius: 18,
        cursor: "pointer",
        transition: "all 0.18s",
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#16a34a";
        e.currentTarget.style.boxShadow = "0 8px 28px rgba(22,163,74,0.15)";
        e.currentTarget.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#e5e7eb";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div style={{ position: "relative", height: 210, background: "#f1f5f9", overflow: "hidden" }}>
        <img
          src={club.photos[photoIdx]}
          alt={club.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          onError={(e) => ((e.target as HTMLImageElement).style.opacity = "0")}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 70,
            background: "linear-gradient(to top, rgba(0,0,0,0.45), transparent)",
          }}
        />
        <span
          style={{
            position: "absolute",
            top: 11,
            left: 11,
            background: "#16a34a",
            color: "#fff",
            fontSize: 11,
            fontWeight: 800,
            borderRadius: 20,
            padding: "3px 10px",
          }}
        >
          -{savingsPct}% OFF
        </span>
        <span
          style={{
            position: "absolute",
            top: 11,
            right: 11,
            background: conditionBadgeBg[club.condition],
            color: conditionColor[club.condition],
            fontSize: 11,
            fontWeight: 700,
            borderRadius: 20,
            padding: "3px 10px",
            border: `1.5px solid ${conditionColor[club.condition]}50`,
          }}
        >
          {club.condition}
        </span>
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 5,
          }}
        >
          {club.photos.map((_, i) => (
            <div
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setPhotoIdx(i);
              }}
              style={{
                width: i === photoIdx ? 18 : 6,
                height: 6,
                borderRadius: 3,
                background: i === photoIdx ? "#fff" : "rgba(255,255,255,0.5)",
                transition: "all 0.2s",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>
      <div style={{ padding: "14px 16px 16px", display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "#16a34a",
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          {club.brand} · {club.type}
        </div>
        <div
          style={{
            fontFamily: "'Georgia', serif",
            fontWeight: 700,
            fontSize: 15,
            color: "#111",
            lineHeight: 1.3,
          }}
        >
          {club.name}
        </div>
        <div style={{ fontSize: 12, color: "#9ca3af" }}>
          {club.year} · {club.loft}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 2 }}>
          <span style={{ fontSize: 22, fontWeight: 800, color: "#16a34a" }}>${club.price}</span>
          <span style={{ fontSize: 13, color: "#9ca3af", textDecoration: "line-through" }}>
            ${club.originalPrice}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "auto",
            paddingTop: 10,
            borderTop: "1px solid #f3f4f6",
          }}
        >
          <span style={{ fontSize: 12, color: "#6b7280" }}>
            ⭐ {club.rating} <span style={{ color: "#d1d5db" }}>({club.reviews})</span>
          </span>
          <span style={{ fontSize: 11, color: "#9ca3af" }}>by {club.seller}</span>
        </div>
      </div>
    </div>
  );
}
