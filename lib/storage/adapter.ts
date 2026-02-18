import type { BlockedPeriod, Booking, Review } from "@/domain/types";

export interface IStorage {
  // Availability
  getBlockedPeriods(): Promise<BlockedPeriod[]>;
  addBlockedPeriod(period: BlockedPeriod): Promise<void>;

  // Bookings
  getBookings(): Promise<Booking[]>;
  addBooking(booking: Booking): Promise<void>;

  // Reviews
  getReviews(): Promise<Review[]>;
  addReview(review: Review): Promise<void>;
}
