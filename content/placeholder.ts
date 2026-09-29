// Content Martin hasn't provided yet is written as "[Something]".
// Placeholders render as visible text (never as links) and must all be
// gone before launch (see openspec task 8.7).
export function isPlaceholder(value: string): boolean {
  return /^\[.*\]$/.test(value.trim());
}
