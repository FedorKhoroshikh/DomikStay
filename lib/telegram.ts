import type { Booking, Review } from "@/domain/types";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function sendMessage(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn(
      "[telegram] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set — skipping"
    );
    return;
  }

  const res = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
    }
  );

  if (!res.ok) {
    const body = await res.text();
    console.error(`[telegram] sendMessage failed: ${res.status} ${body}`);
  }
}

export function bookingMessage(booking: Booking): string {
  const nights = Math.round(
    (new Date(booking.dates.end).getTime() -
      new Date(booking.dates.start).getTime()) /
      86_400_000
  );
  const comment = booking.comment
    ? `\n💬 <b>Комментарий:</b> ${escapeHtml(booking.comment)}`
    : "";

  return [
    `🏠 <b>Новая заявка на бронирование</b>`,
    ``,
    `👤 <b>Имя:</b> ${escapeHtml(booking.name)}`,
    `📞 <b>Телефон:</b> ${escapeHtml(booking.phone)}`,
    `📅 <b>Заезд:</b> ${booking.dates.start}`,
    `📅 <b>Выезд:</b> ${booking.dates.end}`,
    `🌙 <b>Ночей:</b> ${nights}`,
    `👥 <b>Гостей:</b> ${booking.guests}`,
    comment,
    ``,
    `🆔 <code>${booking.id}</code>`,
  ]
    .filter((line) => line !== undefined)
    .join("\n");
}

export function reviewMessage(review: Review): string {
  const filled = "★".repeat(review.rating);
  const empty = "☆".repeat(5 - review.rating);

  return [
    `⭐ <b>Новый отзыв</b>`,
    ``,
    `👤 <b>Автор:</b> ${escapeHtml(review.author)}`,
    `${filled}${empty} (${review.rating}/5)`,
    ``,
    `💬 ${escapeHtml(review.text)}`,
    ``,
    `📅 ${review.date}`,
    `🆔 <code>${review.id}</code>`,
  ].join("\n");
}
