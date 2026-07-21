"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useFamily } from "@/lib/family-context";
import { theme } from "@/lib/theme";
import { Card } from "@/components/Shared";
import { weekForDueDate, WEEKS } from "@/lib/content/weeks";

const SECTIONS = [
  { href: "/guide", icon: "📖", title: "Pregnancy & Birth Guide", desc: "What to expect week by week, what's normal to feel, food & medication safety, labor, and postpartum recovery." },
  { href: "/guide/vaccines", icon: "💉", title: "Vaccines: Both Sides", desc: "A balanced look at reasons parents vaccinate on schedule, delay, or decline — pros and cons either way." },
  { href: "/tracker", icon: "🍼", title: "Baby Tracker", desc: "Log feeding, diapers, and sleep, and see the timeline at a glance." },
  { href: "/calendar", icon: "📅", title: "Shared Calendar", desc: "Appointments and childcare days, visible to both parents on their own phones." },
];

export default function Home() {
  const { user, loading } = useAuth();
  const { family, babies } = useFamily();

  const activeBaby = babies.find((b) => b.dueDate && !b.birthDate) ?? babies[0];
  const currentWeek = activeBaby?.dueDate ? weekForDueDate(activeBaby.dueDate) : null;
  const weekInfo = currentWeek ? WEEKS.find((w) => w.week === Math.min(40, currentWeek)) : null;

  return (
    <div style={{ maxWidth: 1080, margin: "0 auto", padding: "32px 20px 60px" }}>
      <div
        style={{
          background: theme.headerBg,
          borderRadius: 24,
          padding: "40px 36px",
          marginBottom: 30,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", right: -6, top: -16, fontSize: 130, opacity: 0.08 }}>🤰</div>
        <div style={{ fontFamily: theme.serif, fontSize: 30, fontWeight: 700, color: "#fff", marginBottom: 10, maxWidth: 560 }}>
          The Ultimate Baby Guide
        </div>
        <p style={{ color: "#f3d7de", fontSize: 15, maxWidth: 520, margin: "0 0 20px", lineHeight: 1.6 }}>
          Your guide from two lines on a test through the first months home — what to expect, what's normal, and
          the tools to track it all with your partner.
        </p>
        {!user && !loading && (
          <p style={{ color: "#fff", fontSize: 13, margin: 0, opacity: 0.85 }}>
            Sign in (top right) to set up your family, invite your partner, and start tracking.
          </p>
        )}
      </div>

      {user && !family && (
        <Card style={{ marginBottom: 24, textAlign: "center" }}>
          <p style={{ fontSize: 14, color: theme.ink, margin: "0 0 12px" }}>
            You're signed in — set up your family to unlock the tracker and shared calendar.
          </p>
          <Link href="/family" style={{ color: theme.primary, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
            Set up your family →
          </Link>
        </Card>
      )}

      {activeBaby && weekInfo && (
        <Card style={{ marginBottom: 24, display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ fontSize: 40 }}>🤰</div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: theme.primaryDark, textTransform: "uppercase", letterSpacing: 0.5 }}>
              {activeBaby.name} · Week {Math.min(40, currentWeek!)}
            </div>
            <div style={{ fontSize: 14, color: theme.ink, marginTop: 4, lineHeight: 1.5 }}>
              About the size of {weekInfo.size}. {weekInfo.development}
            </div>
          </div>
          <Link href="/guide" style={{ color: theme.primary, fontWeight: 700, fontSize: 13, textDecoration: "none", whiteSpace: "nowrap" }}>
            Full guide →
          </Link>
        </Card>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 18 }}>
        {SECTIONS.map((s) => (
          <Link key={s.href} href={s.href} style={{ textDecoration: "none" }}>
            <Card style={{ height: "100%", cursor: "pointer" }}>
              <div style={{ fontSize: 30, marginBottom: 10 }}>{s.icon}</div>
              <div style={{ fontFamily: theme.serif, fontSize: 16, fontWeight: 700, color: theme.ink, marginBottom: 6 }}>{s.title}</div>
              <p style={{ fontSize: 13, color: theme.sub, margin: 0, lineHeight: 1.5 }}>{s.desc}</p>
            </Card>
          </Link>
        ))}
      </div>

      <p style={{ fontSize: 12, color: theme.sub, textAlign: "center", marginTop: 36, lineHeight: 1.6 }}>
        Everything here is general educational information, not medical advice. Always check with your OB, midwife,
        or pediatrician for guidance specific to you and your baby.
      </p>
    </div>
  );
}
