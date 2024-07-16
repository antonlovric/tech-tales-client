import dayjs from 'dayjs';
import DOMPurify from 'isomorphic-dompurify';

export function formatDate(
  date: string | number | Date | dayjs.Dayjs | null | undefined
) {
  return dayjs(date).format('DD.MM.YYYY.');
}

export function getSanitizedHtml(text: string | null = '') {
  if (text === null) return '';
  return DOMPurify.sanitize(text);
}
