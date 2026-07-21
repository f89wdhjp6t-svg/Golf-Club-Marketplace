"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useFamily } from "@/lib/family-context";
import { addCalendarEvent, fetchCalendarEvents } from "@/lib/family-data";
import type { CalendarEvent } from "@/lib/types";
import { theme } from "@/lib/theme";
import { Card, SectionTitle } from "@/components/Shared";
import { CalendarView } from "@/components/CalendarView";
import { EventModal } from "@/components/EventModal";

export default function CalendarPage() {
  const { user, loading: authLoading } = useAuth();
  const { family, members, loading: familyLoading } = useFamily();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [modalDate, setModalDate] = useState<string | null>(null);

  useEffect(() => {
    if (!family) return;
    setEventsLoading(true);
    fetchCalendarEvents(family.id).then((e) => {
      setEvents(e);
      setEventsLoading(false);
    });
  }, [family]);

  if (authLoading || familyLoading) return null;

  if (!user) {
    return (
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "32px 20px 60px", textAlign: "center" }}>
        <SectionTitle sub="Sign in (top right) to see and manage your shared family calendar.">Shared Calendar</SectionTitle>
      </div>
    );
  }

  if (!family) {
    return (
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "32px 20px 60px", textAlign: "center" }}>
        <SectionTitle>Shared Calendar</SectionTitle>
        <Card>
          <p style={{ fontSize: 14, color: theme.ink, margin: "0 0 12px" }}>Set up your family first to unlock the shared calendar.</p>
          <Link href="/family" style={{ color: theme.primary, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
            Go to Family →
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1080, margin: "0 auto", padding: "32px 20px 60px" }}>
      <SectionTitle sub="Appointments, childcare days, and anything else both parents need to see — click any day to add an event.">
        Shared Calendar
      </SectionTitle>

      {eventsLoading ? (
        <p style={{ fontSize: 13, color: theme.sub }}>Loading calendar...</p>
      ) : (
        <CalendarView
          events={events}
          members={members}
          onDayClick={(dateStr) => setModalDate(dateStr)}
          onDeleted={(id) => setEvents((prev) => prev.filter((e) => e.id !== id))}
        />
      )}

      {modalDate && (
        <EventModal
          defaultDate={modalDate}
          members={members}
          onClose={() => setModalDate(null)}
          onSave={async (data) => {
            const created = await addCalendarEvent({
              familyId: family.id,
              title: data.title,
              category: data.category,
              startAt: data.startAt,
              notes: data.notes || null,
              assignedTo: data.assignedTo,
              createdBy: user.id,
            });
            if (created) setEvents((prev) => [...prev, created].sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime()));
            setModalDate(null);
          }}
        />
      )}
    </div>
  );
}
