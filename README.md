# DomikStay

Сайт-витрина для аренды домика.

## Стек

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS 4** — стилизация
- **Telegram Bot API** — уведомления о бронировании и отзывах
- **Zod** — валидация данных

## Запуск

```bash
# Установка зависимостей
npm install

# Копировать переменные окружения
cp .env.local.example .env.local
# Заполнить TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID

# Режим разработки
npm run dev

# Сборка
npm run build
npm start
```

## Структура

```
app/          — страницы и layout (App Router)
components/   — React-компоненты
domain/       — типы, схемы валидации, бизнес-логика
lib/          — адаптеры хранения, Telegram, server actions
data/         — JSON-файлы данных (availability, reviews)
public/       — статика (изображения)
```

## Страницы

| Route          | Описание              |
| -------------- | --------------------- |
| `/`            | Главная               |
| `/gallery`     | Галерея фотографий    |
| `/availability`| Календарь занятости   |
| `/book`        | Форма бронирования    |
| `/location`    | Расположение          |
| `/terms`       | Условия проживания    |
| `/reviews`     | Отзывы                |
