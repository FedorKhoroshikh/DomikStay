"use server";

import { kvStorage as jsonStorage } from "@/lib/storage/kv-adapter";
import { getBlockedDates } from "@/domain/availability";

export async function fetchBlockedDates(): Promise<string[]> {
  const blocked = await jsonStorage.getBlockedPeriods();
  return getBlockedDates(blocked);
}
