"use server";

import { headers } from "next/headers";
import { nanoid } from "nanoid";
import { kvStorage as jsonStorage } from "@/lib/storage/kv-adapter";
import { isRangeAvailable } from "@/domain/availability";
import { BookingInputSchema } from "@/domain/schemas";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendMessage, bookingMessage } from "@/lib/telegram";

export type BookingActionResult =
  | { success: true }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

export async function submitBooking(
  _prev: BookingActionResult | null,
  formData: FormData
): Promise<BookingActionResult> {
  // 1. Honeypot — silent accept to not reveal the trap
  if (formData.get("website")) {
    return { success: true };
  }

  // 2. Rate limit by IP
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!checkRateLimit(ip)) {
    return {
      success: false,
      error: "Слишком много запросов. Попробуйте через минуту.",
    };
  }

  // 3. Parse & validate with Zod
  const raw = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    dates: {
      start: formData.get("dateFrom"),
      end: formData.get("dateTo"),
    },
    guests: Number(formData.get("guests")),
    comment: formData.get("comment") || undefined,
  };

  const parsed = BookingInputSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join(".");
      fieldErrors[key] = [...(fieldErrors[key] ?? []), issue.message];
    }
    return {
      success: false,
      error: "Проверьте введённые данные.",
      fieldErrors,
    };
  }

  // 4. Check availability
  const blocked = await jsonStorage.getBlockedPeriods();
  if (!isRangeAvailable(parsed.data.dates, blocked)) {
    return {
      success: false,
      error: "Выбранные даты уже заняты. Пожалуйста, выберите другой период.",
    };
  }

  // 5. Persist
  const booking = {
    ...parsed.data,
    id: nanoid(),
    createdAt: new Date().toISOString(),
    status: "pending" as const,
  };
  await jsonStorage.addBooking(booking);

  // 6. Notify via Telegram (non-blocking — booking succeeds even if this fails)
  sendMessage(bookingMessage(booking)).catch((err) =>
    console.error("[telegram] failed to notify:", err)
  );

  return { success: true };
}
