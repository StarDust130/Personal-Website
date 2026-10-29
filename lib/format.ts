const newPostWindowMs = 7 * 24 * 60 * 60 * 1000;

function toDate(iso: string | null | undefined): Date | null {
  if (!iso) return null;
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function isNewPost(
  iso: string | null | undefined,
  now: number
): boolean {
  const date = toDate(iso);
  if (!date) return false;

  const age = now - date.getTime();
  return age >= 0 && age < newPostWindowMs;
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
