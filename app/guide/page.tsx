"use client";

import { useState } from "react";
import Link from "next/link";
import { theme } from "@/lib/theme";
import { Card, Disclaimer, SectionTitle } from "@/components/Shared";
import { WeekCard } from "@/components/WeekCard";
import { TRIMESTERS, WHEN_TO_CALL_YOUR_PROVIDER } from "@/lib/content/trimesters";
import { WEEKS } from "@/lib/content/weeks";

const SUBPAGES = [
  { href: "/guide/nutrition", icon: "🥗", title: "Food & Medication Safety", desc: "What's safe, what to limit, and what to avoid eating or taking." },
  { href: "/guide/birth", icon: "🏥", title: "Labor & Birth", desc: "Signs of labor, the stages of birth, pain management, and birth plans." },
  { href: "/guide/postpartum", icon: "🌙", title: "Postpartum & Newborn Care", desc: "Recovering after birth and the first weeks with your newborn." },
  { href: "/guide/vaccines", icon: "💉", title: "Vaccines: Both Sides", desc: "Balanced pros and cons for whichever path you choose." },
];

export default function GuidePage() {
  const [active, setActive] = useState<1 | 2 | 3>(1);
  const trimester = TRIMESTERS.find((t) => t.id === active)!;
  const weeks = WEEKS.filter((w) => w.trimester === active);

  return (
    <div style={{ maxWidth: 1080, margin: "0 auto", padding: "32px 20px 60px" }}>
      <SectionTitle sub="What to expect, what's normal to feel, and what's happening week by week. Every pregnancy is different — treat this as a starting point, not a diagnosis.">
        Pregnancy Guide
      </SectionTitle>

      <div style={{ display: "flex", gap: 8, marginBottom: 22 }}>
        {TRIMESTERS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            style={{
              flex: 1,
              background: active === t.id ? theme.primary : "#fff",
              color: active === t.id ? "#fff" : theme.ink,
              border: `1.5px solid ${active === t.id ? theme.primary : theme.border}`,
              borderRadius: 14,
              padding: "12px 10px",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 13,
            }}
          >
            {t.label}
            <div style={{ fontSize: 11, fontWeight: 500, opacity: 0.85, marginTop: 2 }}>{t.weeks}</div>
          </button>
        ))}
      </div>

      <Card style={{ marginBottom: 22 }}>
        <p style={{ fontSize: 14, color: theme.ink, lineHeight: 1.6, margin: "0 0 16px" }}>{trimester.overview}</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="calendar-grid">
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: theme.sub, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>
              Normal to feel physically
            </div>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: theme.ink, lineHeight: 1.9 }}>
              {trimester.normalToFeel.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: theme.sub, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>
              Normal to feel emotionally
            </div>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: theme.ink, lineHeight: 1.9 }}>
              {trimester.emotional.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      <div style={{ fontSize: 12, fontWeight: 700, color: theme.sub, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 12 }}>
        Week by week
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14, marginBottom: 26 }}>
        {weeks.map((w) => (
          <WeekCard key={w.week} week={w} />
        ))}
      </div>

      <Disclaimer>
        <strong>When to call your provider right away:</strong> {WHEN_TO_CALL_YOUR_PROVIDER.join(" · ")}
      </Disclaimer>

      <div style={{ fontSize: 12, fontWeight: 700, color: theme.sub, textTransform: "uppercase", letterSpacing: 0.5, margin: "30px 0 12px" }}>
        More in the guide
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
        {SUBPAGES.map((s) => (
          <Link key={s.href} href={s.href} style={{ textDecoration: "none" }}>
            <Card style={{ height: "100%", cursor: "pointer" }}>
              <div style={{ fontSize: 26, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontFamily: theme.serif, fontSize: 15, fontWeight: 700, color: theme.ink, marginBottom: 6 }}>{s.title}</div>
              <p style={{ fontSize: 13, color: theme.sub, margin: 0, lineHeight: 1.5 }}>{s.desc}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
