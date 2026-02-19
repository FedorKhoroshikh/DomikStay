import { fetchBlockedDates } from "@/lib/actions/availability";
import Calendar from "@/components/calendar/Calendar";

export const metadata = {
  title: "Календарь занятости — ДомикStay",
  description: "Проверьте свободные даты и выберите период для бронирования.",
};

export default async function AvailabilityPage() {
  const blockedDates = await fetchBlockedDates();
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Календарь занятости
      </h1>
      <p className="text-gray-600 mb-8">
        Выберите желаемые даты — кликните на день заезда, затем на день выезда.
      </p>
      <Calendar blockedDates={blockedDates} today={today} />
    </div>
  );
}
