// Traffic entry from the Firestore database
export interface VisitsTrafficEntry {
  date: string; // ISO date string (YYYY-MM-DD)
  visits: number; // total visits for the day
  createdBy: string;
  updatedAt?: string;
}
