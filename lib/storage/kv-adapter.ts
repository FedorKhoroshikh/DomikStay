import "server-only";
import { Redis } from "@upstash/redis";
import { promises as fs } from "fs";
import path from "path";
import type { BlockedPeriod, Booking, Review } from "@/domain/types";
import type { IStorage } from "./adapter";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const DATA_DIR = path.join(process.cwd(), "data");

type AvailabilityFile = { blocked: BlockedPeriod[] };
type ReviewsFile = { reviews: Review[] };
type BookingsFile = { bookings: Booking[] };

const KEYS = {
  availability: "ds:availability",
  bookings: "ds:bookings",
  reviews: "ds:reviews",
} as const;

async function readJsonFile<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/** На первом вызове сеедит KV из JSON-файла, потом работает только с KV */
async function getOrSeed<T>(
  kvKey: string,
  jsonPath: string,
  fallback: T
): Promise<T> {
  const cached = await redis.get<T>(kvKey);
  if (cached !== null && cached !== undefined) return cached;

  const data = await readJsonFile<T>(jsonPath, fallback);
  await redis.set(kvKey, data);
  return data;
}

export const kvStorage: IStorage = {
  async getBlockedPeriods(): Promise<BlockedPeriod[]> {
    const file = await getOrSeed<AvailabilityFile>(
      KEYS.availability,
      path.join(DATA_DIR, "availability.json"),
      { blocked: [] }
    );
    return file.blocked;
  },

  async addBlockedPeriod(period: BlockedPeriod): Promise<void> {
    const file = await getOrSeed<AvailabilityFile>(
      KEYS.availability,
      path.join(DATA_DIR, "availability.json"),
      { blocked: [] }
    );
    file.blocked.push(period);
    await redis.set(KEYS.availability, file);
  },

  async getBookings(): Promise<Booking[]> {
    const file = await getOrSeed<BookingsFile>(
      KEYS.bookings,
      path.join(DATA_DIR, "bookings.json"),
      { bookings: [] }
    );
    return file.bookings;
  },

  async addBooking(booking: Booking): Promise<void> {
    const file = await getOrSeed<BookingsFile>(
      KEYS.bookings,
      path.join(DATA_DIR, "bookings.json"),
      { bookings: [] }
    );
    file.bookings.push(booking);
    await redis.set(KEYS.bookings, file);
  },

  async getReviews(): Promise<Review[]> {
    const file = await getOrSeed<ReviewsFile>(
      KEYS.reviews,
      path.join(DATA_DIR, "reviews.json"),
      { reviews: [] }
    );
    return file.reviews;
  },

  async addReview(review: Review): Promise<void> {
    const file = await getOrSeed<ReviewsFile>(
      KEYS.reviews,
      path.join(DATA_DIR, "reviews.json"),
      { reviews: [] }
    );
    file.reviews.push(review);
    await redis.set(KEYS.reviews, file);
  },
};
