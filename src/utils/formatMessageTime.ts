import { format, isToday, isYesterday } from 'date-fns';

export function formatMessageTime(dateString?: string) {
  if (!dateString) return '';

  const date = new Date(dateString);

  if (isToday(date)) {
    //  just hour and minute
    return format(date, 'HH:mm');
  }

  if (isYesterday(date)) {
    return 'Yesterday';
  }

  //  for older dates
  return format(date, 'MMM d');
}
