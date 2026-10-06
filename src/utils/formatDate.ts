// src/utils/formatDate.ts
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

// "2026-09-12" -> "12 Sep 2026"
export function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-");
  return `${day} ${MONTHS[Number(month) - 1]} ${year}`;
}