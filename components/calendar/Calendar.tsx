"use client";

import { useState, useMemo } from "react";
import MonthGrid from "./MonthGrid";

interface CalendarProps {
  blockedDates: string[];
  today: string; // ISO "YYYY-MM-DD" from server
}

function addMonths(
  year: number,
  month: number,
  delta: number
): { year: number; month: number } {
  const d = new Date(year, month + delta, 1);
  return { year: d.getFullYear(), month: d.getMonth() };
}

export default function Calendar({ blockedDates, today }: CalendarProps) {
  const [viewYear, setViewYear] = useState(() => parseInt(today.slice(0, 4)));
  const [viewMonth, setViewMonth] = useState(
    () => parseInt(today.slice(5, 7)) - 1
  );
  const [rangeStart, setRangeStart] = useState<string | null>(null);
  const [rangeEnd, setRangeEnd] = useState<string | null>(null);

  const blocked = useMemo(() => new Set(blockedDates), [blockedDates]);
  const second = addMonths(viewYear, viewMonth, 1);

  function handleDayClick(iso: string) {
    if (!rangeStart || (rangeStart && rangeEnd)) {
      setRangeStart(iso);
      setRangeEnd(null);
    } else {
      if (iso > rangeStart) {
        setRangeEnd(iso);
      } else if (iso === rangeStart) {
        setRangeStart(null);
      } else {
        // clicked before start — reset start
        setRangeStart(iso);
      }
    }
  }

  function prev() {
    const m = addMonths(viewYear, viewMonth, -1);
    setViewYear(m.year);
    setViewMonth(m.month);
  }

  function next() {
    const m = addMonths(viewYear, viewMonth, 1);
    setViewYear(m.year);
    setViewMonth(m.month);
  }

  const nights =
    rangeStart && rangeEnd
      ? Math.round(
          (new Date(rangeEnd).getTime() - new Date(rangeStart).getTime()) /
            86_400_000
        )
      : null;

  const hasBlockedInRange =
    rangeStart && rangeEnd
      ? blockedDates.some((d) => d > rangeStart! && d < rangeEnd!)
      : false;

  return (
    <div className="space-y-6">
      {/* Month navigation */}
      <div className="flex items-center justify-between px-1">
        <button
          type="button"
          onClick={prev}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
          aria-label="Предыдущий месяц"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={next}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
          aria-label="Следующий месяц"
        >
          ›
        </button>
      </div>

      {/* Two months side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <MonthGrid
          year={viewYear}
          month={viewMonth}
          today={today}
          blockedDates={blocked}
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          onDayClick={handleDayClick}
        />
        <MonthGrid
          year={second.year}
          month={second.month}
          today={today}
          blockedDates={blocked}
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          onDayClick={handleDayClick}
        />
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-600 pt-2 border-t border-gray-100">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-4 h-4 rounded bg-green-600" />
          Выбранные даты
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-4 h-4 rounded bg-green-100 border border-green-200" />
          В диапазоне
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-4 h-4 rounded bg-red-50 border border-red-200" />
          Занято
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-4 h-4 rounded ring-2 ring-blue-400" />
          Сегодня
        </span>
      </div>

      {/* Selection info */}
      {rangeStart && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm space-y-1.5">
          <div>
            <span className="text-gray-500">Заезд:</span>{" "}
            <span className="font-medium">{rangeStart}</span>
          </div>
          {rangeEnd ? (
            <>
              <div>
                <span className="text-gray-500">Выезд:</span>{" "}
                <span className="font-medium">{rangeEnd}</span>
              </div>
              <div>
                <span className="text-gray-500">Ночей:</span>{" "}
                <span className="font-medium">{nights}</span>
              </div>
              {hasBlockedInRange ? (
                <p className="text-red-600 font-medium pt-1">
                  В выбранном диапазоне есть занятые даты. Пожалуйста, выберите
                  другой период.
                </p>
              ) : (
                <a
                  href={`/book?from=${rangeStart}&to=${rangeEnd}`}
                  className="mt-2 inline-block rounded-md bg-green-600 text-white px-5 py-2 font-medium hover:bg-green-700 transition-colors"
                >
                  Забронировать
                </a>
              )}
            </>
          ) : (
            <div className="text-gray-400">Выберите дату выезда</div>
          )}
        </div>
      )}
    </div>
  );
}
