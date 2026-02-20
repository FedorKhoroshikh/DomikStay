"use server";

import { headers } from "next/headers";
import { nanoid } from "nanoid";
import { kvStorage as jsonStorage } from "@/lib/storage/kv-adapter";
import { ReviewInputSchema } from "@/domain/schemas";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendMessage, reviewMessage } from "@/lib/telegram";

export type ReviewActionResult =
  | { success: true }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

export async function submitReview(
  _prev: ReviewActionResult | null,
  formData: FormData
): Promise<ReviewActionResult> {
  // 1. Honeypot — silent accept
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
    author: formData.get("author"),
    rating: Number(formData.get("rating")),
    text: formData.get("text"),
    date: new Date().toISOString().slice(0, 10),
  };

  const parsed = ReviewInputSchema.safeParse(raw);
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

  // 4. Persist
  const review = {
    ...parsed.data,
    id: nanoid(),
  };
  await jsonStorage.addReview(review);

  // 5. Notify via Telegram (non-blocking)
  sendMessage(reviewMessage(review)).catch((err) =>
    console.error("[telegram] failed to notify:", err)
  );

  return { success: true };
}
