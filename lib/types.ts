export interface Family {
  id: string;
  name: string;
  inviteCode: string;
}

export interface FamilyMember {
  userId: string;
  displayName: string;
  role: string;
}

export interface Baby {
  id: string;
  familyId: string;
  name: string;
  birthDate: string | null;
  dueDate: string | null;
}

export type TrackerType = "feeding" | "diaper" | "sleep";

export interface TrackerEntry {
  id: number;
  babyId: string;
  familyId: string;
  type: TrackerType;
  subtype: string | null;
  startedAt: string;
  endedAt: string | null;
  amount: string | null;
  notes: string | null;
  loggedBy: string | null;
  loggedByName: string | null;
}

export interface CalendarEvent {
  id: number;
  familyId: string;
  title: string;
  category: string;
  startAt: string;
  endAt: string | null;
  notes: string | null;
  assignedTo: string | null;
  assignedToName: string | null;
  createdBy: string | null;
}
