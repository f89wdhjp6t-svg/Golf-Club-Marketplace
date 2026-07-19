"use client";

import type { NewClub } from "@/lib/types";

export function NewClubCard({
  club,
  onSelect,
}: {
  club: NewClub;
  onSelect: (club: NewClub) => void;
}) {
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
          src={club.photos[0]}
          alt={club.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          onError={(e) => ((e.target as HTMLImageElement).style.opacity = "0")}
        />
        <span
          style={{
            position: "absolute",
            top: 11,
            left: 11,
            background: "#0f1f2f",
            color: "#fff",
            fontSize: 11,
            fontWeight: 800,
            borderRadius: 20,
            padding: "3px 10px",
          }}
        >
          NEW · {club.year}
        </span>
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
        <div style={{ fontSize: 12, color: "#9ca3af" }}>{club.loft}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 2 }}>
          <span style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600 }}>MSRP</span>
          <span style={{ fontSize: 22, fontWeight: 800, color: "#111" }}>${club.msrp}</span>
        </div>
        <div
          style={{
            marginTop: "auto",
            paddingTop: 10,
            borderTop: "1px solid #f3f4f6",
            fontSize: 12,
            fontWeight: 700,
            color: "#16a34a",
          }}
        >
          Compare store prices →
        </div>
      </div>
    </div>
  );
}
