import { z } from "zod";

/** Zod schema for creating a User. */
export const createUserSchema = z.object({
  email: z.email(),
  displayName: z.string().min(1),
  role: z.enum(["viewer", "editor", "admin"]),
});
