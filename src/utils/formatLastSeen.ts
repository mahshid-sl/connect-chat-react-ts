import {
  formatDistanceToNow,
  parseISO,
  format,
  isToday,
  isYesterday,
} from 'date-fns';

export function formatLastSeen(
  lastSeen?: string,
  isOnline?: boolean,
  name?: string,
) {
  if (name === 'Deleted Account') return 'last seen a long time ago';
  if (isOnline) return 'Online';

  if (!lastSeen) return 'Offline';

  const date = parseISO(lastSeen);

  if (isToday(date)) {
    return `last seen today at ${format(date, 'HH:mm')}`;
  }

  if (isYesterday(date)) {
    return 'last seen yesterday';
  }

  // return `last seen on ${format(date, 'MMM d')}`;
  return `last seen ${formatDistanceToNow(date, { addSuffix: true })}`;
}
