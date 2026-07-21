"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useAuth } from "./auth-context";
import { addBaby as addBabyApi, createFamily as createFamilyApi, fetchBabies, fetchFamilyMembers, fetchMyFamily, joinFamily as joinFamilyApi } from "./family-data";
import type { Baby, Family, FamilyMember } from "./types";

interface FamilyContextValue {
  family: Family | null;
  members: FamilyMember[];
  babies: Baby[];
  loading: boolean;
  createFamily: (name: string) => Promise<{ error?: string }>;
  joinFamily: (code: string) => Promise<{ error?: string }>;
  addBaby: (name: string, birthDate: string | null, dueDate: string | null) => Promise<{ error?: string }>;
  refresh: () => Promise<void>;
}

const FamilyContext = createContext<FamilyContextValue | null>(null);

export function FamilyProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [family, setFamily] = useState<Family | null>(null);
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [babies, setBabies] = useState<Baby[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!user) {
      setFamily(null);
      setMembers([]);
      setBabies([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const fam = await fetchMyFamily(user.id);
    setFamily(fam);
    if (fam) {
      const [mem, bab] = await Promise.all([fetchFamilyMembers(fam.id), fetchBabies(fam.id)]);
      setMembers(mem);
      setBabies(bab);
    } else {
      setMembers([]);
      setBabies([]);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createFamily = async (name: string): Promise<{ error?: string }> => {
    try {
      await createFamilyApi(name);
      await refresh();
      return {};
    } catch (err) {
      return { error: err instanceof Error ? err.message : "Could not create family." };
    }
  };

  const joinFamily = async (code: string): Promise<{ error?: string }> => {
    try {
      await joinFamilyApi(code);
      await refresh();
      return {};
    } catch (err) {
      return { error: err instanceof Error ? err.message : "Could not join family — check the invite code." };
    }
  };

  const addBaby = async (name: string, birthDate: string | null, dueDate: string | null): Promise<{ error?: string }> => {
    if (!family) return { error: "Set up your family first." };
    const created = await addBabyApi(family.id, name, birthDate, dueDate);
    if (!created) return { error: "Could not add baby." };
    setBabies((prev) => [...prev, created]);
    return {};
  };

  return (
    <FamilyContext.Provider value={{ family, members, babies, loading, createFamily, joinFamily, addBaby, refresh }}>
      {children}
    </FamilyContext.Provider>
  );
}

export function useFamily() {
  const ctx = useContext(FamilyContext);
  if (!ctx) throw new Error("useFamily must be used within FamilyProvider");
  return ctx;
}
