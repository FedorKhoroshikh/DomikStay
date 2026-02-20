export const metadata = {
  title: "Расположение — ДомикStay",
  description:
    "Как добраться до домика: адрес, карта и маршрут.",
};

const MAP_EMBED_URL = process.env.NEXT_PUBLIC_MAP_EMBED_URL ?? "";

const DIRECTIONS = [
  {
    how: "На автомобиле",
    desc: "Съехать с трассы по указателю, через 2 км повернуть направо. Парковка прямо у домика.",
  },
  {
    how: "На общественном транспорте",
    desc: "Автобус до остановки «Лесная», затем 10 минут пешком по грунтовой дороге.",
  },
  {
    how: "Трансфер",
    desc: "Можем организовать встречу от ближайшей станции — договоритесь при бронировании.",
  },
];

export default function LocationPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Расположение</h1>
      <p className="text-gray-600 mb-10">
        Домик находится в тихом месте на природе, вдали от городской суеты.
      </p>

      {/* Map */}
      <div className="mb-12 rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-gray-100 aspect-[16/7]">
        {MAP_EMBED_URL ? (
          <iframe
            src={MAP_EMBED_URL}
            width="100%"
            height="100%"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Карта расположения"
            className="w-full h-full"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2 p-8">
            <svg
              className="w-12 h-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
            <p className="text-sm text-center max-w-xs">
              Карта появится после добавления{" "}
              <code className="bg-gray-200 px-1 rounded text-xs">
                NEXT_PUBLIC_MAP_EMBED_URL
              </code>{" "}
              в .env.local
            </p>
          </div>
        )}
      </div>

      {/* Address */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-10">
        <h2 className="font-semibold text-gray-900 mb-3">Адрес</h2>
        <address className="not-italic space-y-1 text-gray-700 text-sm">
          <p>Московская область, Серпуховской район</p>
          <p>д. Лесная, ул. Садовая, д. 1</p>
        </address>
        <a
          href="#"
          className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium text-emerald-700 hover:text-emerald-600 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
          Открыть в Яндекс.Картах
        </a>
      </div>

      {/* Directions */}
      <h2 className="text-xl font-semibold text-gray-900 mb-5">Как добраться</h2>
      <div className="space-y-4">
        {DIRECTIONS.map((item) => (
          <div
            key={item.how}
            className="flex gap-4 p-4 rounded-lg border border-gray-200 bg-white"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-emerald-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900 text-sm">{item.how}</p>
              <p className="text-gray-600 text-sm mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
