"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useFamily } from "@/lib/family-context";
import { theme } from "@/lib/theme";
import { Card, SectionTitle } from "@/components/Shared";
import { FamilySetup, InviteCodeCard } from "@/components/FamilySetup";
import { AddBabyForm } from "@/components/AddBabyForm";

export default function FamilyPage() {
  const { user, loading: authLoading } = useAuth();
  const { family, members, babies, loading } = useFamily();
  const [showAddBaby, setShowAddBaby] = useState(false);

  if (authLoading || loading) return null;

  if (!user) {
    return (
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 20px 60px", textAlign: "center" }}>
        <SectionTitle sub="Sign in (top right) to create or join your family.">Family</SectionTitle>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "32px 20px 60px" }}>
      <SectionTitle sub="Both parents can access the same tracker and calendar by joining the same family on separate phones.">
        Family
      </SectionTitle>

      {!family ? (
        <FamilySetup />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <InviteCodeCard />

          <Card>
            <div style={{ fontSize: 13, fontWeight: 700, color: theme.sub, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10 }}>
              Members
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {members.map((m) => (
                <div key={m.userId} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 18 }}>👤</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: theme.ink }}>{m.displayName}</span>
                  {m.userId === user.id && <span style={{ fontSize: 11, color: theme.sub }}>(you)</span>}
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: babies.length || showAddBaby ? 14 : 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: theme.sub, textTransform: "uppercase", letterSpacing: 0.5 }}>Babies</div>
              {!showAddBaby && (
                <button
                  onClick={() => setShowAddBaby(true)}
                  style={{ background: theme.primarySoft, color: theme.primaryDark, border: "none", borderRadius: 20, padding: "6px 14px", fontWeight: 700, fontSize: 12, cursor: "pointer" }}
                >
                  + Add baby
                </button>
              )}
            </div>
            {babies.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: showAddBaby ? 14 : 0 }}>
                {babies.map((b) => (
                  <div key={b.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderTop: `1px solid ${theme.border}` }}>
                    <span style={{ fontSize: 18 }}>{b.birthDate ? "👶" : "🤰"}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: theme.ink }}>{b.name}</div>
                      <div style={{ fontSize: 11, color: theme.sub }}>
                        {b.birthDate ? `Born ${new Date(b.birthDate).toLocaleDateString()}` : `Due ${new Date(b.dueDate!).toLocaleDateString()}`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {showAddBaby && <AddBabyForm onDone={() => setShowAddBaby(false)} />}
            {babies.length === 0 && !showAddBaby && (
              <p style={{ fontSize: 13, color: theme.sub, margin: 0 }}>No babies added yet.</p>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
