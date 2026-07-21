"use client";

import { theme } from "@/lib/theme";
import { Card, Disclaimer, SectionTitle } from "@/components/Shared";
import { CHOICE_BREAKDOWN, COMMON_CONCERNS, VACCINES_DISCLAIMER, VACCINES_INTRO, VACCINE_QUESTIONS_FOR_YOUR_DOCTOR } from "@/lib/content/vaccines";

export default function VaccinesPage() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 20px 60px" }}>
      <SectionTitle sub={VACCINES_INTRO}>Vaccines: Both Sides</SectionTitle>

      <div style={{ fontSize: 13, fontWeight: 700, color: theme.sub, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 12 }}>
        Pros & cons, by choice
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 30 }}>
        {CHOICE_BREAKDOWN.map((c) => (
          <Card key={c.title}>
            <div style={{ fontSize: 15, fontWeight: 700, color: theme.ink, marginBottom: 14 }}>{c.title}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="calendar-grid">
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#3d7357", marginBottom: 8 }}>✓ Reasons parents choose this</div>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: theme.ink, lineHeight: 1.8 }}>
                  {c.pros.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#a3313a", marginBottom: 8 }}>✕ Tradeoffs to weigh</div>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: theme.ink, lineHeight: 1.8 }}>
                  {c.cons.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div style={{ fontSize: 13, fontWeight: 700, color: theme.sub, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 12 }}>
        Common concerns, addressed
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 30 }}>
        {COMMON_CONCERNS.map((c) => (
          <Card key={c.concern} style={{ padding: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: theme.ink, marginBottom: 6, fontStyle: "italic" }}>{c.concern}</div>
            <div style={{ fontSize: 13, color: theme.sub, lineHeight: 1.6 }}>{c.response}</div>
          </Card>
        ))}
      </div>

      <div style={{ fontSize: 13, fontWeight: 700, color: theme.sub, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 12 }}>
        Questions worth bringing to your pediatrician
      </div>
      <Card style={{ marginBottom: 24 }}>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: theme.ink, lineHeight: 1.9 }}>
          {VACCINE_QUESTIONS_FOR_YOUR_DOCTOR.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ul>
      </Card>

      <Disclaimer>{VACCINES_DISCLAIMER}</Disclaimer>
    </div>
  );
}
