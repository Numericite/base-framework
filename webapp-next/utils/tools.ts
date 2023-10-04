export function formatDateToFrenchString(tmpDate: string) {
  const date = new Date(tmpDate);

  if (!(date instanceof Date)) {
    throw new Error("Input is not a valid Date object");
  }

  const formatter = new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  return formatter.format(date);
}
