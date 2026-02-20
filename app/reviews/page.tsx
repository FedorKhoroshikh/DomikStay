import ReviewCard from "@/components/reviews/ReviewCard";
import ReviewForm from "@/components/reviews/ReviewForm";
import { jsonStorage } from "@/lib/storage/json-adapter";

export const metadata = {
  title: "Отзывы — ДомикStay",
  description: "Отзывы гостей о домике. Поделитесь своими впечатлениями.",
};

function reviewWord(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 14) return "отзывов";
  if (mod10 === 1) return "отзыв";
  if (mod10 >= 2 && mod10 <= 4) return "отзыва";
  return "отзывов";
}

export default async function ReviewsPage() {
  const reviews = await jsonStorage.getReviews();
  const sorted = [...reviews].sort((a, b) => (a.date > b.date ? -1 : 1));

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Отзывы гостей</h1>
      <p className="text-gray-600 mb-10">
        {reviews.length > 0
          ? `${reviews.length} ${reviewWord(reviews.length)} от наших гостей`
          : "Будьте первым, кто оставит отзыв!"}
      </p>

      {sorted.length > 0 && (
        <div className="space-y-4 mb-14">
          {sorted.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}

      <div className="border-t border-gray-200 pt-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Оставить отзыв
        </h2>
        <ReviewForm />
      </div>
    </div>
  );
}
