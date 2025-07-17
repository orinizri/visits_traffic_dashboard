import { z } from "zod";

export const VisitsTrafficSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Date must be in YYYY-MM-DD format",
  }),
  visits: z.number().int().nonnegative({ message: "Visits must be a non-negative integer" }),
});

export const TrafficSeedBodySchema = z.object({
  secret: z.string().min(1, { message: "Secret is required" }),
});

export const VisitsTrafficArraySchema = z.array(VisitsTrafficSchema);

export type TrafficStat = z.infer<typeof VisitsTrafficSchema>;

/** Zod schema for updating a traffic (all fields optional). */
export const updateVisitsTrafficSchema = VisitsTrafficSchema.partial();

/** DTO types inferred from Zod schemas */
export type CreateVisitsTrafficDTO = z.infer<typeof VisitsTrafficSchema>;
export type UpdateTrafficDTO = z.infer<typeof updateVisitsTrafficSchema>;

/** Traffic type */
export interface Traffic extends CreateVisitsTrafficDTO {
  date: string;
  visits: number;
  createdAt: string;
  updatedAt?: string;
}
