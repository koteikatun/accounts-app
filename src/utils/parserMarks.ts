export const parserMarks = (raw: string | undefined): { text: string }[] => {
  if (!raw) return [];
  return raw
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((text) => ({ text }));
};
