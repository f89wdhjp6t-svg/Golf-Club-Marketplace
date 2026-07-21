"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useFamily } from "@/lib/family-context";
import { fetchTrackerEntries } from "@/lib/family-data";
import type { TrackerEntry } from "@/lib/types";
import { theme } from "@/lib/theme";
import { Card, SectionTitle } from "@/components/Shared";
import { TrackerLogger } from "@/components/TrackerLogger";
import { TrackerTimeline } from "@/components/TrackerTimeline";
import { AddBabyForm } from "@/components/AddBabyForm";

export default function TrackerPage() {
  const { user, loading: authLoading } = useAuth();
  const { family, babies, loading: familyLoading } = useFamily();
  const [babyId, setBabyId] = useState<string | null>(null);
  const [entries, setEntries] = useState<TrackerEntry[]>([]);
  const [entriesLoading, setEntriesLoading] = useState(false);

  useEffect(() => {
    if (babies.length && !babyId) setBabyId(babies[0].id);
  }, [babies, babyId]);

  useEffect(() => {
    if (!babyId) return;
    setEntriesLoading(true);
    fetchTrackerEntries(babyId).then((e) => {
      setEntries(e);
      setEntriesLoading(false);
    });
  }, [babyId]);

  if (authLoading || familyLoading) return null;

  if (!user) {
    return (
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "32px 20px 60px", textAlign: "center" }}>
        <SectionTitle sub="Sign in (top right) to start tracking feedings, diapers, and sleep.">Baby Tracker</SectionTitle>
      </div>
    );
  }

  if (!family) {
    return (
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "32px 20px 60px", textAlign: "center" }}>
        <SectionTitle>Baby Tracker</SectionTitle>
        <Card>
          <p style={{ fontSize: 14, color: theme.ink, margin: "0 0 12px" }}>Set up your family first to start tracking.</p>
          <Link href="/family" style={{ color: theme.primary, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
            Go to Family →
          </Link>
        </Card>
      </div>
    );
  }

  const activeBaby = babies.find((b) => b.id === babyId);

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "32px 20px 60px" }}>
      <SectionTitle sub="Log feedings, diapers, and sleep — both parents see the same timeline, wherever they're logging in from.">
        Baby Tracker
      </SectionTitle>

      {babies.length === 0 ? (
        <AddBabyForm />
      ) : (
        <>
          {babies.length > 1 && (
            <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
              {babies.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setBabyId(b.id)}
                  style={{
                    background: babyId === b.id ? theme.primary : "#fff",
                    color: babyId === b.id ? "#fff" : theme.ink,
                    border: `1.5px solid ${babyId === b.id ? theme.primary : theme.border}`,
                    borderRadius: 20,
                    padding: "7px 16px",
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {b.name}
                </button>
              ))}
            </div>
          )}

          {activeBaby && (
            <>
              <TrackerLogger
                babyId={activeBaby.id}
                familyId={family.id}
                onLogged={(entry) => setEntries((prev) => [entry, ...prev])}
              />
              <div style={{ height: 24 }} />
              {entriesLoading ? (
                <p style={{ fontSize: 13, color: theme.sub }}>Loading timeline...</p>
              ) : (
                <TrackerTimeline entries={entries} onDeleted={(id) => setEntries((prev) => prev.filter((e) => e.id !== id))} />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
