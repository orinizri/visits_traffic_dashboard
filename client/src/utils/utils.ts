export function formatDateToYMD(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Capitalizes the first letter of a string.
 *
 * Example:
 *   capitalizeFirstLetter("day")   → "Day"
 *   capitalizeFirstLetter("month") → "Month"
 *
 * @param str - The string to capitalize
 * @returns The string with the first character in uppercase
 */
export function capitalizeFirstLetter(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
