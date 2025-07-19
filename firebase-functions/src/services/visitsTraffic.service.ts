import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  WithFieldValue,
} from "firebase-admin/firestore";
import { ListOptions } from "../types/pagination.types";
import AppError from "../utils/AppError";
import { firestore } from "../config/firebaseAdmin";
import { TrafficSeedEntry } from "../types/visitsTraffic.types";
import { CreateVisitsTrafficDTO } from "../zod/visitsTraffic.schema";

/**
 * Firestore data converter to map between Firestore documents and visits traffic objects.
 */
const visitsTrafficConverter: FirestoreDataConverter<TrafficSeedEntry> = {
  toFirestore(visit: WithFieldValue<TrafficSeedEntry>) {
    return visit;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot) {
    const data = snapshot.data();
    return data as TrafficSeedEntry;
  },
};

// Apply converter for type-safe reads and writes
const col = firestore.collection("trafficStats").withConverter(visitsTrafficConverter);

/**
 * Returns a paginated list of visits stats (traffic) with total document count.
 */
export async function fetchVisitsStats({
  limit,
  page,
}: ListOptions): Promise<{ items: TrafficSeedEntry[]; total: number }> {
  const offset = (page - 1) * limit;

  // Retrieve total count (consider Firestore count() when available)
  const totalSnap = await col.get();
  const total = totalSnap.size;
  // Retrieve paginated data
  const snapshot = await col.orderBy("date", "desc").offset(offset).limit(limit).get();
  // Map documents to User instances via converter
  const items: TrafficSeedEntry[] = snapshot.docs.map(doc => doc.data());
  return { items, total };
}

/**
 * Creates a new visits traffic document in Firestore.
 */
export async function createVisitsTraffic(data: CreateVisitsTrafficDTO): Promise<TrafficSeedEntry> {
  const timestamp = new Date().toISOString();
  const payload = {
    ...data,
    createdAt: timestamp,
  } as TrafficSeedEntry;
  const ref = await col.add(payload);
  const newSnap = await col.doc(ref.id).get();
  if (!newSnap.exists) {
    throw new AppError("Failed to retrieve the newly created visits traffic", 500);
  }
  return newSnap.data()!;
}

/**
 * Updates an existing visits traffic document and returns the updated visits traffic
 */
export async function updateVisitsTraffic(data: TrafficSeedEntry): Promise<TrafficSeedEntry> {
  const updatedAt = new Date().toISOString();
  await col.doc(data.date).update({ ...data, updatedAt });
  const snap = await col.doc(data.date).get();
  if (!snap.exists) {
    throw new AppError(`Visit at ${data.date} not found after update`, 404);
  }
  return snap.data()!;
}

/**
 * Deletes a visits traffic by date.
 */
export async function deleteVisitsTraffic(date: string): Promise<void> {
  const snap = await col.doc(date).get();
  if (!snap.exists) {
    throw new AppError(`Visit at ${date} not found`, 404);
  }
  await col.doc(date).delete();
}
