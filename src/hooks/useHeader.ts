import { formatHeaderDay, formatHeaderWeek, formatMonth, getWeekArray, isSameMonth } from '../util';
import { DateType, User, UseHeaderHook } from '../models';

export const useHeader = (date: Date, dateType: string, user: User): UseHeaderHook => {
  const { 0: start, length: l, [l - 1]: end }: Date[] = getWeekArray(date);
  const header: Map<string, string> = new Map([
    [DateType.DAY, formatHeaderDay(date)],
    [DateType.WEEK, !isSameMonth(start, end) ? formatHeaderWeek(start, end) : formatMonth(date)],
    [DateType.MONTH, formatMonth(date)]
  ]);
  const userDetails: Record<string, string> = { name: user?.username, roles: user?.authoritiesAsStrings?.join() };

  return { headerDate: header.get(dateType), userDetails };
}
