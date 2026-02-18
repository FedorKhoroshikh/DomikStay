import type { BlockedPeriod, DateRange } from "./types";

/** Проверяет, пересекается ли запрошенный диапазон с заблокированным периодом */
function overlaps(range: DateRange, blocked: BlockedPeriod): boolean {
  return range.start <= blocked.end && range.end >= blocked.start;
}

/** Возвращает true, если диапазон дат полностью свободен */
export function isRangeAvailable(
  range: DateRange,
  blocked: BlockedPeriod[]
): boolean {
  return !blocked.some((period) => overlaps(range, period));
}

/** Возвращает массив заблокированных дат (ISO-строки "YYYY-MM-DD") */
export function getBlockedDates(blocked: BlockedPeriod[]): string[] {
  const dates: string[] = [];
  for (const period of blocked) {
    const cur = new Date(period.start);
    const end = new Date(period.end);
    while (cur <= end) {
      dates.push(cur.toISOString().slice(0, 10));
      cur.setUTCDate(cur.getUTCDate() + 1);
    }
  }
  return dates;
}

/** Возвращает blocked-периоды, пересекающиеся с диапазоном */
export function getConflicts(
  range: DateRange,
  blocked: BlockedPeriod[]
): BlockedPeriod[] {
  return blocked.filter((period) => overlaps(range, period));
}
