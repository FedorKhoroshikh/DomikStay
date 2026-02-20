"use client";

import { useActionState, useState } from "react";
import { submitReview, type ReviewActionResult } from "@/lib/actions/review";

export default function ReviewForm() {
  const [state, action, pending] = useActionState<
    ReviewActionResult | null,
    FormData
  >(submitReview, null);

  const [rating, setRating] = useState(5);
  const [hovered, setHovered] = useState(0);

  if (state?.success) {
    return (
      <div className="rounded-lg bg-green-50 border border-green-200 p-8 text-center">
        <p className="text-green-700 text-xl font-semibold">Спасибо за отзыв!</p>
        <p className="text-green-600 mt-2 text-sm">
          Ваш отзыв отправлен и будет опубликован после проверки.
        </p>
      </div>
    );
  }

  function fieldError(key: string): string | undefined {
    if (!state || state.success) return undefined;
    return state.fieldErrors?.[key]?.[0];
  }

  const inputClass =
    "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent";
  const errorClass = "mt-1 text-xs text-red-600";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <form action={action} className="space-y-5">
      {/* Honeypot — hidden from real users */}
      <input
        type="text"
        name="website"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {/* Global error */}
      {state && !state.success && (
        <div className="rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-700">
          {state.error}
        </div>
      )}

      {/* Author */}
      <div>
        <label htmlFor="author" className={labelClass}>
          Ваше имя <span className="text-red-500">*</span>
        </label>
        <input
          id="author"
          name="author"
          type="text"
          required
          autoComplete="name"
          placeholder="Иван"
          className={inputClass}
        />
        {fieldError("author") && (
          <p className={errorClass}>{fieldError("author")}</p>
        )}
      </div>

      {/* Rating */}
      <div>
        <p className={labelClass}>
          Оценка <span className="text-red-500">*</span>
        </p>
        <div className="flex gap-1" role="group" aria-label="Оценка от 1 до 5">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              aria-label={`${star} звезд`}
              aria-pressed={rating === star}
              className="text-3xl leading-none focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 rounded"
            >
              <span
                className={
                  (hovered || rating) >= star
                    ? "text-yellow-400"
                    : "text-gray-300"
                }
              >
                ★
              </span>
            </button>
          ))}
        </div>
        <input type="hidden" name="rating" value={rating} />
        {fieldError("rating") && (
          <p className={errorClass}>{fieldError("rating")}</p>
        )}
      </div>

      {/* Text */}
      <div>
        <label htmlFor="review-text" className={labelClass}>
          Отзыв <span className="text-red-500">*</span>
        </label>
        <textarea
          id="review-text"
          name="text"
          rows={4}
          required
          maxLength={2000}
          className={`${inputClass} resize-none`}
          placeholder="Поделитесь впечатлениями об отдыхе..."
        />
        {fieldError("text") && (
          <p className={errorClass}>{fieldError("text")}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full sm:w-auto rounded-md bg-green-600 text-white px-8 py-2.5 font-medium hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {pending ? "Отправка..." : "Отправить отзыв"}
      </button>
    </form>
  );
}
