"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { theme } from "@/lib/theme";
import { useAuth } from "@/lib/auth-context";
import { AuthModal } from "./AuthModal";


const LINKS = [
  { href: "/", label: "🏠 Home" },
  { href: "/guide", label: "📖 Guide" },
  { href: "/tracker", label: "🍼 Tracker" },
  { href: "/calendar", label: "📅 Calendar" },
  { href: "/family", label: "👨‍👩‍👧 Family" },
];

export function Nav() {
  const pathname = usePathname();
  const { user, displayName, signOut } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <header
      style={{
        background: theme.headerBg,
        padding: "0 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: 60,
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
        flexWrap: "wrap",
        gap: 8,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", padding: "10px 0" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <span style={{ fontSize: 22 }}>🤰</span>
          <span style={{ fontFamily: theme.serif, fontWeight: 700, fontSize: 17, color: "#fff", lineHeight: 1.1 }}>
            The Ultimate Baby Guide
          </span>
        </Link>
        <nav style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {LINKS.map((l) => {
            const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  background: active ? theme.primary : "transparent",
                  border: active ? "none" : "1.5px solid rgba(255,255,255,0.2)",
                  borderRadius: 20,
                  padding: "7px 16px",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 13,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0" }}>
        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "#f3d7de", fontSize: 13, fontWeight: 600 }}>👤 {displayName ?? user.email}</span>
            <button
              onClick={() => signOut()}
              style={{ background: "none", border: "1.5px solid rgba(255,255,255,0.3)", borderRadius: 20, padding: "5px 14px", color: "#fff", fontWeight: 700, fontSize: 12, cursor: "pointer" }}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={() => setAuthOpen(true)}
            style={{ background: theme.primary, border: "none", borderRadius: 20, padding: "7px 18px", color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer" }}
          >
            Sign In
          </button>
        )}
      </div>
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </header>
  );
}
