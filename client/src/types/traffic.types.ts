// Traffic entry from the Firestore database
export interface TrafficEntry {
  id: string; // auto-generated Firestore ID
  date: string; // ISO date string (YYYY-MM-DD)
  visits: number; // total visits for the day
  createdBy: string;
  updatedAt?: string;
}

export type TrafficEntryInput = Omit<TrafficEntry, "id" | "createdBy" | "updatedAt">;
