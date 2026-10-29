import type { CeremonyDate } from "@/config/wedding";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** Pakistan Standard Time offset (no DST). */
const PKT_OFFSET = "+05:00";

export function isCompleteDate(date: CeremonyDate): date is CeremonyDate & { month: number; year: number } {
  return date.month !== null && date.year !== null;
}

/** ISO timestamp in PKT, or null if the date is incomplete. */
export function toIsoDateTime(date: CeremonyDate, time: string): string | null {
  if (!isCompleteDate(date)) return null;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.year}-${pad(date.month)}-${pad(date.day)}T${time}:00${PKT_OFFSET}`;
}

export function ordinal(n: number): string {
  const s = n % 100 >= 11 && n % 100 <= 13 ? "th" : (["th", "st", "nd", "rd"][n % 10] ?? "th");
  return `${n}${s}`;
}

/** "12 Nov" when the month is known, otherwise "12th". */
export function formatShortDate(date: CeremonyDate): string {
  return isCompleteDate(date) ? `${date.day} ${MONTHS[date.month - 1].slice(0, 3)}` : ordinal(date.day);
}

/** Pieces for the large date block; unknown parts are null. */
export function dateParts(date: CeremonyDate) {
  if (!isCompleteDate(date)) return { day: String(date.day), month: null, weekday: null, year: null };
  const weekday = new Date(Date.UTC(date.year, date.month - 1, date.day, 12)).getUTCDay();
  return {
    day: String(date.day),
    month: MONTHS[date.month - 1],
    weekday: WEEKDAYS[weekday],
    year: String(date.year),
  };
}

/** "12 – 13 March 2027" when all dates share a known month, otherwise "12th & 13th". */
export function formatDateSpan(dates: CeremonyDate[]): string {
  const first = dates[0];
  const last = dates[dates.length - 1];
  const sameMonth = dates.every((d) => isCompleteDate(d) && d.month === first.month && d.year === first.year);
  if (sameMonth && isCompleteDate(first)) {
    return `${first.day} – ${last.day} ${MONTHS[first.month - 1]} ${first.year}`;
  }
  return dates.map((d) => ordinal(d.day)).join(" & ");
}

/** "19:00" → "7:00 PM" */
export function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
}

/** "0308 9875977" → "+92 308 9875977" */
export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  const local = digits.startsWith("92") ? digits.slice(2) : digits.replace(/^0/, "");
  return local.length === 10 ? `+92 ${local.slice(0, 3)} ${local.slice(3)}` : phone;
}

/** "0308 9875977" → "+923089875977" */
export function toInternational(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("92")) return `+${digits}`;
  if (digits.startsWith("0")) return `+92${digits.slice(1)}`;
  return `+${digits}`;
}

export function telHref(phone: string): string {
  return `tel:${toInternational(phone)}`;
}

export function whatsappHref(phone: string, message?: string): string {
  const number = toInternational(phone).replace("+", "");
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${number}${text}`;
}
