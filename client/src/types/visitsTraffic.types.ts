// Traffic entry from the Firestore database
export interface VisitsTrafficEntry {
  date: string; // ISO date string (YYYY-MM-DD)
  visits: number; // total visits for the day
  createdBy?: string;
  updatedAt?: string;
}

export type VisitsCrudAction =
  | { type: "START" }
  | { type: "SUCCESS"; message?: string }
  | { type: "ERROR"; error: string }
  | { type: "RESET" };

export interface VisitsCrudState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

export const initialState: VisitsCrudState = {
  loading: false,
  error: null,
  success: false,
};
