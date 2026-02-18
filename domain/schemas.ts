import { z } from "zod";

export const DateRangeSchema = z
  .object({
    start: z.string().date(),
    end: z.string().date(),
  })
  .refine((v) => v.start <= v.end, {
    message: "start must be ≤ end",
  });

export const BlockedPeriodSchema = z.object({
  start: z.string().date(),
  end: z.string().date(),
  reason: z.enum(["booked", "maintenance", "owner"]),
});

export const BookingSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(2).max(100),
  phone: z.string().min(7).max(20),
  dates: DateRangeSchema,
  guests: z.number().int().min(1).max(20),
  comment: z.string().max(500).optional(),
  createdAt: z.string().datetime(),
  status: z.enum(["pending", "confirmed", "cancelled"]),
});

export const ReviewSchema = z.object({
  id: z.string().min(1),
  author: z.string().min(1).max(100),
  rating: z.union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
    z.literal(5),
  ]),
  text: z.string().min(1).max(2000),
  date: z.string().date(),
});

// Input schemas (for user-submitted forms — no id/createdAt/status)
export const BookingInputSchema = BookingSchema.omit({
  id: true,
  createdAt: true,
  status: true,
});

export const ReviewInputSchema = ReviewSchema.omit({ id: true });

export type BookingInput = z.infer<typeof BookingInputSchema>;
export type ReviewInput = z.infer<typeof ReviewInputSchema>;
