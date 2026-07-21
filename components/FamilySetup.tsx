"use client";

import { useState } from "react";
import { useFamily } from "@/lib/family-context";
import { theme } from "@/lib/theme";
import { Card, inputStyle, PrimaryButton } from "./Shared";

export function FamilySetup() {
  const { createFamily, joinFamily } = useFamily();
  const [mode, setMode] = useState<"create" | "join">("create");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreate = async () => {
    setLoading(true);
    setError("");
    const res = await createFamily(name || "Our Family");
    setLoading(false);
    if (res.error) setError(res.error);
  };

  const handleJoin = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setError("");
    const res = await joinFamily(code.trim());
    setLoading(false);
    if (res.error) setError(res.error);
  };

  return (
    <Card style={{ maxWidth: 460, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 34, marginBottom: 8 }}>👨‍👩‍👧</div>
        <h2 style={{ fontFamily: theme.serif, fontSize: 20, fontWeight: 700, margin: "0 0 6px", color: theme.ink }}>
          Set up your family
        </h2>
        <p style={{ fontSize: 13, color: theme.sub, margin: 0, lineHeight: 1.5 }}>
          Create a family to start tracking, or join one with an invite code so both parents see the same tracker and calendar on separate phones.
        </p>
      </div>

      <div style={{ display: "flex", background: "#f6efe9", borderRadius: 12, padding: 4, marginBottom: 20, gap: 4 }}>
        {(["create", "join"] as const).map((m) => (
          <button
            key={m}
            onClick={() => {
              setMode(m);
              setError("");
            }}
            style={{
              flex: 1,
              padding: "9px 4px",
              borderRadius: 9,
              background: mode === m ? "#fff" : "transparent",
              border: mode === m ? `1.5px solid ${theme.border}` : "1.5px solid transparent",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
              color: mode === m ? theme.ink : theme.sub,
            }}
          >
            {m === "create" ? "Start a new family" : "Join with a code"}
          </button>
        ))}
      </div>

      {mode === "create" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input style={inputStyle} placeholder="Family name (e.g. The Smiths)" value={name} onChange={(e) => setName(e.target.value)} />
          {error && <p style={{ fontSize: 12, color: "#a3313a", margin: 0 }}>{error}</p>}
          <PrimaryButton onClick={handleCreate} disabled={loading}>
            {loading ? "Creating..." : "Create Family →"}
          </PrimaryButton>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input
            style={{ ...inputStyle, textTransform: "uppercase", letterSpacing: 2, textAlign: "center", fontWeight: 700 }}
            placeholder="INVITE CODE"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === "Enter" && handleJoin()}
          />
          {error && <p style={{ fontSize: 12, color: "#a3313a", margin: 0 }}>{error}</p>}
          <PrimaryButton onClick={handleJoin} disabled={loading || !code.trim()}>
            {loading ? "Joining..." : "Join Family →"}
          </PrimaryButton>
        </div>
      )}
    </Card>
  );
}

export function InviteCodeCard() {
  const { family } = useFamily();
  const [copied, setCopied] = useState(false);
  if (!family) return null;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(family.inviteCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard not available — the code is still visible to copy manually
    }
  };

  return (
    <Card>
      <div style={{ fontSize: 13, fontWeight: 700, color: theme.sub, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 8 }}>
        Invite your partner
      </div>
      <p style={{ fontSize: 13, color: theme.sub, margin: "0 0 14px", lineHeight: 1.5 }}>
        Share this code — they enter it on their own phone under Family → Join with a code, and you'll both see the same tracker and calendar.
      </p>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <div
          style={{
            flex: 1,
            background: theme.primarySoft,
            borderRadius: 12,
            padding: "12px 16px",
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: 4,
            textAlign: "center",
            color: theme.primaryDark,
            fontFamily: "monospace",
          }}
        >
          {family.inviteCode}
        </div>
        <button
          onClick={copy}
          style={{ background: theme.primary, color: "#fff", border: "none", borderRadius: 12, padding: "12px 16px", fontWeight: 700, fontSize: 13, cursor: "pointer", whiteSpace: "nowrap" }}
        >
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>
    </Card>
  );
}
