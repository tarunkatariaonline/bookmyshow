/**
 * Merges class names into a single string.
 * Filters out falsy values and trims the result.
 */
export function cn(
  ...classes: (string | undefined | null | false)[]
): string {
  return classes.filter(Boolean).join(" ").trim();
}
