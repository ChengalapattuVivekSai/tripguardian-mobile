export function formatDateIso(dateStr?: string) {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    return d.toDateString();
  } catch (e) {
    return dateStr;
  }
}
