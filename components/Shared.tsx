"use client";

import { theme } from "@/lib/theme";
import type { SafetyLevel } from "@/lib/content/nutrition";

export function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        background: theme.card,
        border: `1.5px solid ${theme.border}`,
        borderRadius: 18,
        padding: 22,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function SectionTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <h2 style={{ fontFamily: theme.serif, fontSize: 22, fontWeight: 700, color: theme.ink, margin: "0 0 6px" }}>
        {children}
      </h2>
      {sub && <p style={{ fontSize: 14, color: theme.sub, margin: 0, lineHeight: 1.5 }}>{sub}</p>}
    </div>
  );
}

export function Disclaimer({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: theme.warnSoft,
        border: `1.5px solid #f3d9a8`,
        borderRadius: 14,
        padding: "14px 18px",
        fontSize: 13,
        color: "#8a5a12",
        lineHeight: 1.6,
        display: "flex",
        gap: 10,
        alignItems: "flex-start",
      }}
    >
      <span style={{ fontSize: 16 }}>ℹ️</span>
      <span>{children}</span>
    </div>
  );
}

const levelColors: Record<SafetyLevel, { bg: string; fg: string; label: string }> = {
  safe: { bg: "#e8f2ec", fg: "#3d7357", label: "Generally safe" },
  caution: { bg: "#fef3e2", fg: "#8a5a12", label: "Caution / limit" },
  avoid: { bg: "#fbe9ea", fg: "#a3313a", label: "Avoid" },
};

export function SafetyBadge({ level }: { level: SafetyLevel }) {
  const c = levelColors[level];
  return (
    <span
      style={{
        background: c.bg,
        color: c.fg,
        fontSize: 11,
        fontWeight: 700,
        borderRadius: 20,
        padding: "4px 12px",
        whiteSpace: "nowrap",
      }}
    >
      {c.label}
    </span>
  );
}

export function PrimaryButton({
  children,
  onClick,
  disabled,
  style,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: disabled ? "#e5dcd6" : theme.primary,
        color: disabled ? "#a89890" : "#fff",
        border: "none",
        borderRadius: 12,
        padding: "12px 20px",
        fontWeight: 700,
        fontSize: 14,
        cursor: disabled ? "default" : "pointer",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

export const inputStyle: React.CSSProperties = {
  width: "100%",
  border: `1.5px solid ${theme.border}`,
  borderRadius: 10,
  padding: "11px 14px",
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box",
  color: theme.ink,
};
