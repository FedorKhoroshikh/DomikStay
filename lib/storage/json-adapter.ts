import "server-only";
import { promises as fs } from "fs";
import path from "path";
import type { BlockedPeriod, Booking, Review } from "@/domain/types";
import type { IStorage } from "./adapter";

const DATA_DIR = path.join(process.cwd(), "data");

const PATHS = {
  availability: path.join(DATA_DIR, "availability.json"),
  reviews: path.join(DATA_DIR, "reviews.json"),
  bookings: path.join(DATA_DIR, "bookings.json"),
};

async function readJson<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJson(filePath: string, data: unknown): Promise<void> {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

type AvailabilityFile = { blocked: BlockedPeriod[] };
type ReviewsFile = { reviews: Review[] };
type BookingsFile = { bookings: Booking[] };

export const jsonStorage: IStorage = {
  async getBlockedPeriods(): Promise<BlockedPeriod[]> {
    const file = await readJson<AvailabilityFile>(PATHS.availability, {
      blocked: [],
    });
    return file.blocked;
  },

  async addBlockedPeriod(period: BlockedPeriod): Promise<void> {
    const file = await readJson<AvailabilityFile>(PATHS.availability, {
      blocked: [],
    });
    file.blocked.push(period);
    await writeJson(PATHS.availability, file);
  },

  async getBookings(): Promise<Booking[]> {
    const file = await readJson<BookingsFile>(PATHS.bookings, { bookings: [] });
    return file.bookings;
  },

  async addBooking(booking: Booking): Promise<void> {
    const file = await readJson<BookingsFile>(PATHS.bookings, { bookings: [] });
    file.bookings.push(booking);
    await writeJson(PATHS.bookings, file);
  },

  async getReviews(): Promise<Review[]> {
    const file = await readJson<ReviewsFile>(PATHS.reviews, { reviews: [] });
    return file.reviews;
  },

  async addReview(review: Review): Promise<void> {
    const file = await readJson<ReviewsFile>(PATHS.reviews, { reviews: [] });
    file.reviews.push(review);
    await writeJson(PATHS.reviews, file);
  },
};
