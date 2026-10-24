function toDate(iso: string | null | undefined): Date | null {
  if (!iso) return null;
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatDate(iso: string | null | undefined): string | null {
  const date = toDate(iso);
  if (!date) return null;

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).toUpperCase();
}

export function formatShortDate(iso: string | null | undefined): string | null {
  return formatDate(iso);
}
