import type { Review } from "@/domain/types";

interface Props {
  review: Review;
}

function Stars({ rating }: { rating: number }) {
  return (
    <span aria-label={`${rating} из 5`}>
      <span className="text-yellow-400">{"★".repeat(rating)}</span>
      <span className="text-gray-300">{"★".repeat(5 - rating)}</span>
    </span>
  );
}

export default function ReviewCard({ review }: Props) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <p className="font-semibold text-gray-900">{review.author}</p>
          <Stars rating={review.rating} />
        </div>
        <time
          dateTime={review.date}
          className="text-xs text-gray-400 whitespace-nowrap pt-0.5"
        >
          {review.date}
        </time>
      </div>
      <p className="text-gray-700 text-sm leading-relaxed">{review.text}</p>
    </div>
  );
}
