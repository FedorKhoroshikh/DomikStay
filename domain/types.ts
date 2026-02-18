export type DateRange = {
  start: string; // ISO date: "YYYY-MM-DD"
  end: string;   // ISO date: "YYYY-MM-DD", inclusive
};

export type BlockedPeriod = {
  start: string;
  end: string;
  reason: "booked" | "maintenance" | "owner";
};

export type Booking = {
  id: string;
  name: string;
  phone: string;
  dates: DateRange;
  guests: number;
  comment?: string;
  createdAt: string; // ISO datetime
  status: "pending" | "confirmed" | "cancelled";
};

export type Review = {
  id: string;
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  date: string; // ISO date: "YYYY-MM-DD"
};
