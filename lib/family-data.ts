import { getSupabaseClient } from "./supabase";
import type { Baby, CalendarEvent, Family, FamilyMember, TrackerEntry, TrackerType } from "./types";

export async function fetchMyFamily(userId: string): Promise<Family | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;
  const { data: membership } = await supabase
    .from("family_members")
    .select("family_id")
    .eq("user_id", userId)
    .limit(1)
    .maybeSingle();
  if (!membership) return null;
  const { data, error } = await supabase
    .from("families")
    .select("id, name, invite_code")
    .eq("id", membership.family_id)
    .single();
  if (error || !data) return null;
  return { id: data.id, name: data.name, inviteCode: data.invite_code };
}

export async function fetchFamilyMembers(familyId: string): Promise<FamilyMember[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("family_members")
    .select("user_id, role, profiles(display_name)")
    .eq("family_id", familyId);
  if (error || !data) return [];
  return (data as unknown as { user_id: string; role: string; profiles: { display_name: string } | { display_name: string }[] | null }[]).map(
    (r) => ({
      userId: r.user_id,
      role: r.role,
      displayName: Array.isArray(r.profiles) ? r.profiles[0]?.display_name ?? "Parent" : r.profiles?.display_name ?? "Parent",
    })
  );
}

export async function createFamily(name: string): Promise<string | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;
  const { data, error } = await supabase.rpc("create_family", { fname: name });
  if (error) throw new Error(error.message);
  return data as string;
}

export async function joinFamily(code: string): Promise<string | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;
  const { data, error } = await supabase.rpc("join_family_by_invite_code", { code });
  if (error) throw new Error(error.message);
  return data as string;
}

export async function fetchBabies(familyId: string): Promise<Baby[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("babies")
    .select("id, family_id, name, birth_date, due_date")
    .eq("family_id", familyId)
    .order("created_at", { ascending: true });
  if (error || !data) return [];
  return data.map((b) => ({ id: b.id, familyId: b.family_id, name: b.name, birthDate: b.birth_date, dueDate: b.due_date }));
}

export async function addBaby(familyId: string, name: string, birthDate: string | null, dueDate: string | null): Promise<Baby | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("babies")
    .insert({ family_id: familyId, name, birth_date: birthDate, due_date: dueDate })
    .select("id, family_id, name, birth_date, due_date")
    .single();
  if (error || !data) return null;
  return { id: data.id, familyId: data.family_id, name: data.name, birthDate: data.birth_date, dueDate: data.due_date };
}

interface TrackerRow {
  id: number;
  baby_id: string;
  family_id: string;
  type: TrackerType;
  subtype: string | null;
  started_at: string;
  ended_at: string | null;
  amount: string | null;
  notes: string | null;
  logged_by: string | null;
  profiles: { display_name: string } | { display_name: string }[] | null;
}

function rowToTrackerEntry(r: TrackerRow): TrackerEntry {
  const p = r.profiles;
  const loggedByName = Array.isArray(p) ? p[0]?.display_name ?? null : p?.display_name ?? null;
  return {
    id: r.id,
    babyId: r.baby_id,
    familyId: r.family_id,
    type: r.type,
    subtype: r.subtype,
    startedAt: r.started_at,
    endedAt: r.ended_at,
    amount: r.amount,
    notes: r.notes,
    loggedBy: r.logged_by,
    loggedByName,
  };
}

export async function fetchTrackerEntries(babyId: string, limit = 100): Promise<TrackerEntry[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("tracker_entries")
    .select("*, profiles(display_name)")
    .eq("baby_id", babyId)
    .order("started_at", { ascending: false })
    .limit(limit);
  if (error || !data) return [];
  return (data as unknown as TrackerRow[]).map(rowToTrackerEntry);
}

export async function addTrackerEntry(entry: {
  babyId: string;
  familyId: string;
  type: TrackerType;
  subtype?: string | null;
  startedAt: string;
  endedAt?: string | null;
  amount?: string | null;
  notes?: string | null;
  loggedBy: string;
}): Promise<TrackerEntry | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("tracker_entries")
    .insert({
      baby_id: entry.babyId,
      family_id: entry.familyId,
      type: entry.type,
      subtype: entry.subtype ?? null,
      started_at: entry.startedAt,
      ended_at: entry.endedAt ?? null,
      amount: entry.amount ?? null,
      notes: entry.notes ?? null,
      logged_by: entry.loggedBy,
    })
    .select("*, profiles(display_name)")
    .single();
  if (error || !data) return null;
  return rowToTrackerEntry(data as unknown as TrackerRow);
}

export async function deleteTrackerEntry(id: number) {
  const supabase = getSupabaseClient();
  if (!supabase) return;
  await supabase.from("tracker_entries").delete().eq("id", id);
}

interface EventRow {
  id: number;
  family_id: string;
  title: string;
  category: string;
  start_at: string;
  end_at: string | null;
  notes: string | null;
  assigned_to: string | null;
  created_by: string | null;
  profiles: { display_name: string } | { display_name: string }[] | null;
}

function rowToEvent(r: EventRow): CalendarEvent {
  const p = r.profiles;
  const assignedToName = Array.isArray(p) ? p[0]?.display_name ?? null : p?.display_name ?? null;
  return {
    id: r.id,
    familyId: r.family_id,
    title: r.title,
    category: r.category,
    startAt: r.start_at,
    endAt: r.end_at,
    notes: r.notes,
    assignedTo: r.assigned_to,
    assignedToName,
    createdBy: r.created_by,
  };
}

export async function fetchCalendarEvents(familyId: string): Promise<CalendarEvent[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("calendar_events")
    .select("*, profiles!calendar_events_assigned_to_fkey(display_name)")
    .eq("family_id", familyId)
    .order("start_at", { ascending: true });
  if (error || !data) return [];
  return (data as unknown as EventRow[]).map(rowToEvent);
}

export async function addCalendarEvent(event: {
  familyId: string;
  title: string;
  category: string;
  startAt: string;
  endAt?: string | null;
  notes?: string | null;
  assignedTo?: string | null;
  createdBy: string;
}): Promise<CalendarEvent | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("calendar_events")
    .insert({
      family_id: event.familyId,
      title: event.title,
      category: event.category,
      start_at: event.startAt,
      end_at: event.endAt ?? null,
      notes: event.notes ?? null,
      assigned_to: event.assignedTo ?? null,
      created_by: event.createdBy,
    })
    .select("*, profiles!calendar_events_assigned_to_fkey(display_name)")
    .single();
  if (error || !data) return null;
  return rowToEvent(data as unknown as EventRow);
}

export async function deleteCalendarEvent(id: number) {
  const supabase = getSupabaseClient();
  if (!supabase) return;
  await supabase.from("calendar_events").delete().eq("id", id);
}
