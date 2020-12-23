export function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
