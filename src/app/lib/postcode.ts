export function normalizePostcode(input: string): string | null {
  if (!input) return null;
  const s = input.toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (!/^[A-Z0-9]{2,4}[0-9][A-Z]{2}$/.test(s)) return null;
  return s.slice(0, s.length - 3) + " " + s.slice(-3);
}
export function toCompact(pcWithSpace: string) {
  return pcWithSpace.replace(/\s+/g, "").toUpperCase();
}
export function pretty(compact: string) {
  const s = compact.toUpperCase().replace(/\s+/g, "");
  return s.slice(0, s.length - 3) + " " + s.slice(-3);
}
