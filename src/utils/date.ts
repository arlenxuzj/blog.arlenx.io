import { format as formatFn, parseISO } from 'date-fns';
import { enUS } from 'date-fns/locale';

export const formatDate = (
  date: Date | string | number,
  format = 'MMMM dd, yyyy',
  locale = enUS
): string => {
  return typeof date === 'string'
    ? formatFn(parseISO(date), format, { locale })
    : formatFn(date, format, { locale });
};
