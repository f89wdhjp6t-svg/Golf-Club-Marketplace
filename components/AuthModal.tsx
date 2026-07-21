"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "1.5px solid #e5e7eb",
  borderRadius: 10,
  padding: "11px 14px",
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box",
  color: "#111",
};

export function AuthModal({ onClose }: { onClose: () => void }) {
  const { signUp, signIn, configured } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [signedUp, setSignedUp] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    const result =
      mode === "signup" ? await signUp(email, password, name) : await signIn(email, password);
    setLoading(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    if (mode === "signup") {
      setSignedUp(true);
    } else {
      onClose();
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,31,15,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 500,
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: "#fff", borderRadius: 20, padding: 32, maxWidth: 400, width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}
      >
        {!configured ? (
          <>
            <h2 style={{ fontFamily: "'Georgia', serif", fontSize: 20, fontWeight: 700, margin: "0 0 10px" }}>
              Accounts aren't set up yet
            </h2>
            <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6, margin: "0 0 20px" }}>
              This deployment doesn't have Supabase configured, so sign-up/login isn't available.
              Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to enable accounts.
            </p>
            <button onClick={onClose} style={{ width: "100%", background: "#0f1f0f", color: "#fff", border: "none", borderRadius: 10, padding: 12, fontWeight: 700, cursor: "pointer" }}>
              Close
            </button>
          </>
        ) : signedUp ? (
          <>
            <div style={{ fontSize: 32, marginBottom: 12 }}>✅</div>
            <h2 style={{ fontFamily: "'Georgia', serif", fontSize: 20, fontWeight: 700, margin: "0 0 10px" }}>
              Check your email
            </h2>
            <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6, margin: "0 0 20px" }}>
              We sent a confirmation link to <strong>{email}</strong>. Confirm it, then sign in.
            </p>
            <button
              onClick={() => {
                setSignedUp(false);
                setMode("signin");
              }}
              style={{ width: "100%", background: "#16a34a", color: "#fff", border: "none", borderRadius: 10, padding: 12, fontWeight: 700, cursor: "pointer" }}
            >
              Go to Sign In
            </button>
          </>
        ) : (
          <>
            <div style={{ display: "flex", gap: 10, marginBottom: 22 }}>
              <span style={{ fontSize: 26 }}>⛳</span>
              <span style={{ fontFamily: "'Georgia', serif", fontWeight: 700, fontSize: 20, color: "#0f1f0f" }}>FairwayFind</span>
            </div>

            <div style={{ display: "flex", background: "#f3f4f6", borderRadius: 12, padding: 4, marginBottom: 20, gap: 4 }}>
              {(["signin", "signup"] as const).map((m) => (
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
                    border: mode === m ? "1.5px solid #e5e7eb" : "1.5px solid transparent",
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: "pointer",
                    color: mode === m ? "#111" : "#6b7280",
                  }}
                >
                  {m === "signin" ? "Sign In" : "Sign Up"}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {mode === "signup" && (
                <input style={inputStyle} placeholder="Display name" value={name} onChange={(e) => setName(e.target.value)} />
              )}
              <input style={inputStyle} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input
                style={inputStyle}
                type="password"
                placeholder="Password (6+ characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
              {error && <p style={{ fontSize: 12, color: "#ef4444", margin: 0 }}>{error}</p>}
              <button
                onClick={handleSubmit}
                disabled={loading || !email || !password || (mode === "signup" && !name)}
                style={{
                  width: "100%",
                  background: loading || !email || !password ? "#e5e7eb" : "#16a34a",
                  color: loading || !email || !password ? "#9ca3af" : "#fff",
                  border: "none",
                  borderRadius: 10,
                  padding: 13,
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: "pointer",
                  marginTop: 6,
                }}
              >
                {loading ? "Please wait..." : mode === "signin" ? "Sign In" : "Create Account"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
