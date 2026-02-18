# DomikStay — Project Context

## What is this?
Сайт-витрина для сдачи одного домика. Без отдельного бэкенда, без онлайн-оплаты.

## Stack
- **Next.js 16** (App Router, Turbopack) + **TypeScript**
- **Tailwind CSS 4** (`@import "tailwindcss"` в CSS, `@tailwindcss/postcss` в PostCSS)
- **Zod** — валидация (ещё не установлен, Day 2)
- **Telegram Bot API** — уведомления
- `"type": "module"` в package.json (обязательно для Turbopack)

## Architecture
```
app/            — страницы, layout, server actions (App Router)
components/     — React-компоненты (layout/, calendar/, booking/, reviews/, ui/)
domain/         — типы, Zod-схемы, бизнес-логика (чистый слой, без зависимостей от Next)
lib/            — storage адаптеры, Telegram, rate-limit, server actions
data/           — JSON-файлы (availability.json, reviews.json)
public/         — статика, изображения
```

## Conventions
- Server Components по умолчанию. `"use client"` только для интерактива (формы, календарь, мобильное меню)
- Данные читать/писать только через storage adapter (lib/storage/) — позволяет заменить JSON на БД
- Валидация через Zod-схемы из domain/schemas.ts
- Минимум библиотек — самописные решения, где возможно
- Коммиты без co-author строки

## Pages
| Route           | Описание            | Статус    |
|-----------------|---------------------|-----------|
| `/`             | Главная             | stub      |
| `/gallery`      | Галерея             | stub      |
| `/availability` | Календарь занятости | stub      |
| `/book`         | Бронирование        | stub      |
| `/location`     | Расположение        | stub      |
| `/terms`        | Условия             | stub      |
| `/reviews`      | Отзывы              | stub      |

## Env Variables
```
TELEGRAM_BOT_TOKEN  — токен бота
TELEGRAM_CHAT_ID    — ID чата для уведомлений
NEXT_PUBLIC_SITE_URL — URL сайта
```

## Risks / Gotchas
- `fs` доступен только на сервере — все операции с JSON через server actions/route handlers
- In-memory rate limit сбрасывается в serverless (Vercel) — для MVP ок, позже Upstash Redis
- Hydration mismatch от дат — форматировать единообразно, не использовать `new Date()` в рендере
- Tailwind v4: `content` автоматически определяется, не нужно указывать вручную
