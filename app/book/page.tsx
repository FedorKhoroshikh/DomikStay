import BookingForm from "@/components/booking/BookingForm";

export const metadata = {
  title: "Бронирование — ДомикStay",
  description: "Заполните форму для бронирования домика.",
};

interface Props {
  searchParams: Promise<{ from?: string; to?: string }>;
}

export default async function BookPage({ searchParams }: Props) {
  const { from, to } = await searchParams;

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Бронирование</h1>
      <p className="text-gray-600 mb-8">
        Заполните форму — мы свяжемся с вами для подтверждения.
      </p>
      <BookingForm defaultFrom={from} defaultTo={to} />
    </div>
  );
}
