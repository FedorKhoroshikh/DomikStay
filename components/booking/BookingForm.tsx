"use client";

import { useActionState, useState } from "react";
import { submitBooking, type BookingActionResult } from "@/lib/actions/booking";

interface Props {
  defaultFrom?: string;
  defaultTo?: string;
  today: string; // ISO "YYYY-MM-DD" from server
}

export default function BookingForm({ defaultFrom = "", defaultTo = "", today }: Props) {
  const [dateFrom, setDateFrom] = useState(defaultFrom);
  const [dateTo, setDateTo] = useState(defaultTo);

  function handleDateFromChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setDateFrom(val);
    if (dateTo && val > dateTo) setDateTo(val);
  }

  function handleDateToChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDateTo(e.target.value);
  }

  const [state, action, pending] = useActionState<
    BookingActionResult | null,
    FormData
  >(submitBooking, null);

  if (state?.success) {
    return (
      <div className="rounded-lg bg-green-50 border border-green-200 p-8 text-center">
        <p className="text-green-700 text-xl font-semibold">Заявка отправлена!</p>
        <p className="text-green-600 mt-2 text-sm">
          Мы свяжемся с вами в ближайшее время для подтверждения бронирования.
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className={labelClass}>
            Имя <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={inputClass}
          />
          {fieldError("name") && (
            <p className={errorClass}>{fieldError("name")}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className={labelClass}>
            Телефон <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="+7 900 000-00-00"
            pattern="[\+\d][\d\s\-\(\)]{9,18}"
            title="Введите номер телефона, например: +7 900 123-45-67"
            className={inputClass}
          />
          {fieldError("phone") && (
            <p className={errorClass}>{fieldError("phone")}</p>
          )}
        </div>

        {/* Date from */}
        <div>
          <label htmlFor="dateFrom" className={labelClass}>
            Дата заезда <span className="text-red-500">*</span>
          </label>
          <input
            id="dateFrom"
            name="dateFrom"
            type="date"
            required
            value={dateFrom}
            min={today}
            onChange={handleDateFromChange}
            className={inputClass}
          />
          {fieldError("dates.start") && (
            <p className={errorClass}>{fieldError("dates.start")}</p>
          )}
        </div>

        {/* Date to */}
        <div>
          <label htmlFor="dateTo" className={labelClass}>
            Дата выезда <span className="text-red-500">*</span>
          </label>
          <input
            id="dateTo"
            name="dateTo"
            type="date"
            required
            value={dateTo}
            min={dateFrom || today}
            onChange={handleDateToChange}
            className={inputClass}
          />
          {fieldError("dates.end") && (
            <p className={errorClass}>{fieldError("dates.end")}</p>
          )}
        </div>

        {/* Guests */}
        <div>
          <label htmlFor="guests" className={labelClass}>
            Гостей <span className="text-red-500">*</span>
          </label>
          <input
            id="guests"
            name="guests"
            type="number"
            required
            min={1}
            max={20}
            defaultValue={2}
            className={inputClass}
          />
          {fieldError("guests") && (
            <p className={errorClass}>{fieldError("guests")}</p>
          )}
        </div>
      </div>

      {/* Comment */}
      <div>
        <label htmlFor="comment" className={labelClass}>
          Комментарий
        </label>
        <textarea
          id="comment"
          name="comment"
          rows={3}
          maxLength={500}
          className={`${inputClass} resize-none`}
          placeholder="Пожелания, особые требования..."
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full sm:w-auto rounded-md bg-green-600 text-white px-8 py-2.5 font-medium hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {pending ? "Отправка..." : "Отправить заявку"}
      </button>
    </form>
  );
}
