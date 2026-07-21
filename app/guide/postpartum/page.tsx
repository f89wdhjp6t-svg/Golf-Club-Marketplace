"use client";

import { theme } from "@/lib/theme";
import { Card, Disclaimer, SectionTitle } from "@/components/Shared";
import { CALL_PEDIATRICIAN_SIGNS, EMOTIONAL_RECOVERY, NEWBORN_BASICS, PHYSICAL_RECOVERY, POSTPARTUM_WARNING_SIGNS } from "@/lib/content/postpartum";

function TopicGrid({ items }: { items: { title: string; detail: string }[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12, marginBottom: 26 }}>
      {items.map((i) => (
        <Card key={i.title} style={{ padding: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: theme.ink, marginBottom: 4 }}>{i.title}</div>
          <div style={{ fontSize: 13, color: theme.sub, lineHeight: 1.5 }}>{i.detail}</div>
        </Card>
      ))}
    </div>
  );
}

export default function PostpartumPage() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 20px 60px" }}>
      <SectionTitle sub="What recovery looks like for you, and what's normal for your newborn in the first weeks home.">
        Postpartum & Newborn Care
      </SectionTitle>

      <div style={{ fontSize: 13, fontWeight: 700, color: theme.sub, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 12 }}>
        Your physical recovery
      </div>
      <TopicGrid items={PHYSICAL_RECOVERY} />

      <div style={{ fontSize: 13, fontWeight: 700, color: theme.sub, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 12 }}>
        Your emotional recovery
      </div>
      <TopicGrid items={EMOTIONAL_RECOVERY} />

      <Disclaimer>
        <strong>Call your provider right away if you notice:</strong> {POSTPARTUM_WARNING_SIGNS.join(" · ")}
      </Disclaimer>

      <div style={{ height: 30 }} />

      <div style={{ fontSize: 13, fontWeight: 700, color: theme.sub, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 12 }}>
        Newborn basics
      </div>
      <TopicGrid items={NEWBORN_BASICS} />

      <Disclaimer>
        <strong>Call your pediatrician right away if you notice:</strong> {CALL_PEDIATRICIAN_SIGNS.join(" · ")}
      </Disclaimer>
    </div>
  );
}
