// Utility to format dates in Belgian style (e.g., '15 september 2025')
export function formatDate(date: Date): string {
  return date.toLocaleDateString('nl-BE', { day: 'numeric', month: 'long', year: 'numeric' });
}
