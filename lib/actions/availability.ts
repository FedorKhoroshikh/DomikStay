"use server";

import { jsonStorage } from "@/lib/storage/json-adapter";
import { getBlockedDates } from "@/domain/availability";

export async function fetchBlockedDates(): Promise<string[]> {
  const blocked = await jsonStorage.getBlockedPeriods();
  return getBlockedDates(blocked);
}
