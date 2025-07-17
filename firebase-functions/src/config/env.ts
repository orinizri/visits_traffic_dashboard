import dotenv from "dotenv";
dotenv.config();

export const SEED_SECRET = process.env.SEED_SECRET;
if (!SEED_SECRET) {
  throw new Error("SEED_SECRET environment variable is not set");
}
