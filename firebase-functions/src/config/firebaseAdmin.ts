import * as admin from "firebase-admin";
import { logger } from "firebase-functions";
import { readFileSync } from "fs";
import path from "path";

// Lazy singleton init pattern
export function initFirebaseAdmin(): admin.app.App {
  if (admin.apps.length === 0) {
    const serviceAccountPath = path.resolve(process.cwd(), "credentials/serviceAccountKey.json");
    let serviceAccount: admin.ServiceAccount;
    try {
      const serviceAccountRaw = readFileSync(serviceAccountPath, "utf-8");
      serviceAccount = JSON.parse(serviceAccountRaw) as admin.ServiceAccount;
    } catch (err) {
      logger.error("Failed to read credentials file:", err);
      throw err;
    }
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  return admin.app();
}

export const firebaseAdmin = initFirebaseAdmin();
export const firestore = firebaseAdmin.firestore();
export const auth = firebaseAdmin.auth();
