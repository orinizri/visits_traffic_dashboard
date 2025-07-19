import { z } from "zod";

export const visitsTrafficEntrySchema = z.object({
  date: z
    .string()
    .nonempty("Date is required")
    .refine(val => !isNaN(Date.parse(val)), { message: "Invalid date format" }),
  visits: z
    .number({ message: "Visits must be a number" })
    .min(0, { message: "Visits cannot be negative" }),
});

export type VisitsTrafficEntrySchema = z.infer<typeof visitsTrafficEntrySchema>;
