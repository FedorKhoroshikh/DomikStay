type DayStatus =
  | "past"
  | "blocked"
  | "start"
  | "end"
  | "in-range"
  | "today"
  | "free";

interface MonthGridProps {
  year: number;
  month: number; // 0-based
  today: string; // ISO "YYYY-MM-DD"
  blockedDates: Set<string>;
  rangeStart: string | null;
  rangeEnd: string | null;
  onDayClick: (iso: string) => void;
}

const WEEKDAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const MONTHS_RU = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

function toISO(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstOffset(year: number, month: number): number {
  // Monday=0 ... Sunday=6 (European week start)
  const day = new Date(year, month, 1).getDay();
  return (day + 6) % 7;
}

export default function MonthGrid({
  year,
  month,
  today,
  blockedDates,
  rangeStart,
  rangeEnd,
  onDayClick,
}: MonthGridProps) {
  const daysInMonth = getDaysInMonth(year, month);
  const offset = getFirstOffset(year, month);

  const cells: Array<{ day: number | null; iso: string | null }> = [];
  for (let i = 0; i < offset; i++) cells.push({ day: null, iso: null });
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, iso: toISO(year, month, d) });
  }

  function getStatus(iso: string): DayStatus {
    if (iso < today) return "past";
    if (blockedDates.has(iso)) return "blocked";
    if (iso === rangeStart) return "start";
    if (iso === rangeEnd) return "end";
    if (rangeStart && rangeEnd && iso > rangeStart && iso < rangeEnd)
      return "in-range";
    return iso === today ? "today" : "free";
  }

  function getClass(status: DayStatus): string {
    const base =
      "h-10 w-full flex items-center justify-center rounded text-sm font-medium select-none transition-colors";
    switch (status) {
      case "past":
        return `${base} text-gray-300 cursor-default`;
      case "blocked":
        return `${base} bg-red-50 text-red-300 cursor-default line-through`;
      case "start":
      case "end":
        return `${base} bg-green-600 text-white cursor-pointer`;
      case "in-range":
        return `${base} bg-green-100 text-green-800 cursor-pointer`;
      case "today":
        return `${base} ring-2 ring-blue-400 text-blue-700 cursor-pointer hover:bg-blue-50`;
      case "free":
        return `${base} text-gray-900 cursor-pointer hover:bg-green-50`;
    }
  }

  const canClick = (status: DayStatus) =>
    !["past", "blocked"].includes(status);

  return (
    <div>
      <h3 className="text-center font-semibold text-gray-800 mb-4">
        {MONTHS_RU[month]} {year}
      </h3>
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {WEEKDAYS.map((d) => (
          <div key={d} className="text-center text-xs text-gray-400 pb-1">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((cell, i) => {
          if (!cell.iso || !cell.day) {
            return <div key={`empty-${i}`} />;
          }
          const status = getStatus(cell.iso);
          return (
            <button
              key={cell.iso}
              type="button"
              disabled={!canClick(status)}
              onClick={() => canClick(status) && onDayClick(cell.iso!)}
              className={getClass(status)}
              aria-label={cell.iso}
              aria-pressed={status === "start" || status === "end"}
            >
              {cell.day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
