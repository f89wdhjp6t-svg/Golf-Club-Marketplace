"use client";

import { theme } from "@/lib/theme";
import { Card, Disclaimer, SectionTitle } from "@/components/Shared";
import { BIRTH_PLAN_TOPICS, CESAREAN_OVERVIEW, IMMEDIATELY_AFTER_BIRTH, LABOR_SIGNS, LABOR_STAGES, PAIN_MANAGEMENT_OPTIONS } from "@/lib/content/birth";

export default function BirthPage() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 20px 60px" }}>
      <SectionTitle sub="What labor and delivery typically look like — signs it's starting, the stages of labor, and what happens right after birth.">
        Labor & Birth
      </SectionTitle>

      <div style={{ fontSize: 13, fontWeight: 700, color: theme.sub, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 12 }}>
        Signs labor may be starting
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12, marginBottom: 28 }}>
        {LABOR_SIGNS.map((s) => (
          <Card key={s.title} style={{ padding: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: theme.ink, marginBottom: 4 }}>{s.title}</div>
            <div style={{ fontSize: 13, color: theme.sub, lineHeight: 1.5 }}>{s.detail}</div>
          </Card>
        ))}
      </div>

      <div style={{ fontSize: 13, fontWeight: 700, color: theme.sub, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 12 }}>
        The stages of labor
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
        {LABOR_STAGES.map((s) => (
          <Card key={s.title} style={{ padding: 18, display: "flex", gap: 16, alignItems: "flex-start" }}>
            <div
              style={{
                background: theme.primarySoft,
                color: theme.primaryDark,
                fontSize: 11,
                fontWeight: 700,
                borderRadius: 20,
                padding: "5px 12px",
                whiteSpace: "nowrap",
              }}
            >
              {s.stage}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: theme.ink, marginBottom: 4 }}>{s.title}</div>
              <div style={{ fontSize: 13, color: theme.sub, lineHeight: 1.6 }}>{s.detail}</div>
            </div>
          </Card>
        ))}
      </div>

      <div style={{ fontSize: 13, fontWeight: 700, color: theme.sub, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 12 }}>
        Pain management options
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12, marginBottom: 28 }}>
        {PAIN_MANAGEMENT_OPTIONS.map((o) => (
          <Card key={o.name} style={{ padding: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: theme.ink, marginBottom: 4 }}>{o.name}</div>
            <div style={{ fontSize: 13, color: theme.sub, lineHeight: 1.5 }}>{o.detail}</div>
          </Card>
        ))}
      </div>

      <Card style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: theme.ink, marginBottom: 8 }}>🏥 When labor becomes a C-section</div>
        <p style={{ fontSize: 13, color: theme.sub, lineHeight: 1.6, margin: 0 }}>{CESAREAN_OVERVIEW}</p>
      </Card>

      <div style={{ fontSize: 13, fontWeight: 700, color: theme.sub, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 12 }}>
        Right after your baby is born
      </div>
      <Card style={{ marginBottom: 28 }}>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: theme.ink, lineHeight: 1.9 }}>
          {IMMEDIATELY_AFTER_BIRTH.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </Card>

      <div style={{ fontSize: 13, fontWeight: 700, color: theme.sub, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 12 }}>
        Things worth deciding ahead of time (birth plan)
      </div>
      <Card style={{ marginBottom: 24 }}>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: theme.ink, lineHeight: 1.9 }}>
          {BIRTH_PLAN_TOPICS.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </Card>

      <Disclaimer>
        Every birth is different, and plans often change in the moment for good medical reasons. This page is general
        education, not a substitute for guidance from your OB, midwife, or doulas — talk through your specific
        situation and options with them.
      </Disclaimer>
    </div>
  );
}
