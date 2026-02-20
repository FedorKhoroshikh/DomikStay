export const metadata = {
  title: "Условия проживания — ДомикStay",
  description: "Правила проживания, заезд и выезд, отмена бронирования.",
};

const SECTIONS = [
  {
    title: "Заезд и выезд",
    items: [
      "Заезд: с 14:00",
      "Выезд: до 12:00",
      "Ранний заезд или поздний выезд — по договорённости, при наличии свободных дат",
    ],
  },
  {
    title: "Гости и вместимость",
    items: [
      "Максимальная вместимость: 8 человек",
      "Дети считаются как гости",
      "Проживание с домашними животными обсуждается индивидуально",
    ],
  },
  {
    title: "Правила поведения",
    items: [
      "Тихое время: с 23:00 до 08:00",
      "Курение разрешено только на улице, в специально отведённых местах",
      "Мусор необходимо убирать в предназначенные контейнеры",
      "Бережное отношение к имуществу — ответственность за ущерб несёт гость",
    ],
  },
  {
    title: "Уборка и залог",
    items: [
      "Финальная уборка включена в стоимость",
      "Просим оставить домик в аккуратном состоянии: вымыть посуду и убрать за собой",
      "Страховой залог 3 000 ₽ возвращается при выезде после проверки",
    ],
  },
  {
    title: "Бронирование и оплата",
    items: [
      "Бронирование подтверждается после связи с хозяином",
      "Предоплата 30% для фиксации даты",
      "Остаток оплачивается при заезде наличными или переводом",
    ],
  },
  {
    title: "Отмена бронирования",
    items: [
      "Отмена за 7+ дней до заезда: предоплата возвращается полностью",
      "Отмена за 3–6 дней: возврат 50% предоплаты",
      "Отмена менее чем за 3 дня: предоплата не возвращается",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Условия проживания
      </h1>
      <p className="text-gray-600 mb-10">
        Пожалуйста, ознакомьтесь с правилами до бронирования.
      </p>

      <div className="space-y-8">
        {SECTIONS.map((section) => (
          <section key={section.title}>
            <h2 className="text-lg font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-200">
              {section.title}
            </h2>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-12 bg-emerald-50 border border-emerald-200 rounded-lg p-6 text-center">
        <p className="text-gray-700 text-sm mb-4">
          Остались вопросы? Свяжитесь с нами или сразу бронируйте.
        </p>
        <a
          href="/book"
          className="inline-block rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500 transition-colors"
        >
          Забронировать
        </a>
      </div>
    </div>
  );
}
