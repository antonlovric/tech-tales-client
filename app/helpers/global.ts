import dayjs from 'dayjs';

export function formatDate(
  date: string | number | Date | dayjs.Dayjs | null | undefined
) {
  return dayjs(date).format('DD.MM.YYYY.');
}
