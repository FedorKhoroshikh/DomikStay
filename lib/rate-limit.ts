type Entry = { count: number; resetAt: number };

const store = new Map<string, Entry>();

/**
 * Returns true if the request is allowed, false if the limit is exceeded.
 * In-memory only — resets on cold start (acceptable for serverless MVP).
 */
export function checkRateLimit(
  key: string,
  limit = 3,
  windowMs = 60_000
): boolean {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}
