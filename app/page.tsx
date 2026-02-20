import ReviewCard from "@/components/reviews/ReviewCard";
import { jsonStorage } from "@/lib/storage/json-adapter";

export default async function HomePage() {
  const reviews = await jsonStorage.getReviews();
  const latestReviews = [...reviews]
    .sort((a, b) => (a.date > b.date ? -1 : 1))
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      {/* Hero */}
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Добро пожаловать в DomikStay
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Уютный домик для вашего идеального отдыха. Тишина, природа и комфорт
          — всё, что нужно для незабываемых выходных.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <a
            href="/book"
            className="rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 transition-colors"
          >
            Забронировать
          </a>
          <a
            href="/gallery"
            className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Смотреть фото
          </a>
        </div>
      </section>

      {/* Reviews preview */}
      {latestReviews.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Что говорят гости
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {latestReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
          <div className="mt-6 text-center">
            <a
              href="/reviews"
              className="text-sm font-medium text-emerald-600 hover:text-emerald-500 transition-colors"
            >
              Все отзывы →
            </a>
          </div>
        </section>
      )}
    </div>
  );
}
