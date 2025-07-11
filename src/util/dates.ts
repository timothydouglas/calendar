import {
  add,
  set,
  eachDayOfInterval,
  eachWeekOfInterval,
  getDay,
  getDaysInMonth,
  lastDayOfMonth,
  previousSunday
} from 'date-fns';
import { WEEK_END, WEEK_START } from '../constants';

export {
  add,
  set,
  isToday,
  isSameDay,
  isSameMonth,
  isValid,
  isBefore,
  getDay,
  isAfter
} from 'date-fns';

export const startDate = (date: Date, value: number = 1): Date =>
  set(date, {
    date: value,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0
  });

export const weekStartDate = (date: Date): Date => {
  const start: number = getDay(date) !== WEEK_START
    ? previousSunday(date).getDate()
    : date.getDate();

  return startDate(date, start);
};

export const getNthWeekOfMonth = (date: Date): string => {
  const nth: string[] = ['first', 'second', 'third', 'fourth'];
  const weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 = getDay(date);
  const weekStart: Date = startDate(date);
  const weekEnd: Date = startDate(weekStart, 7);
  const start: Date = eachDayOfInterval({ start: weekStart, end: weekEnd })
    .find((d: Date) => getDay(d) === weekStartsOn);
  const end: Date = lastDayOfMonth(date);
  const weeks: Date[] = eachWeekOfInterval({ start, end }, { weekStartsOn });
  const nthWeekOfMonth: Map<number, string> = new Map(
    weeks.map((d: Date, i: number, { length: l }: Date[]) =>
      [d.getDate(), i === l - 1 ? 'last' : nth[i]]
    )
  );

  return nthWeekOfMonth.get(date.getDate());
}

export const getWeekArray = (date: Date): Date[] => {
  const start: Date = weekStartDate(date);
  const end: Date = add(start, { days: 6 });

  return eachDayOfInterval({ start, end });
}

export const getMonthArray = (date: Date, weeks?: number): Date[] => {
  const start: Date = startDate(date);
  const end: Date = lastDayOfMonth(date);
  const daysInMonth: number = getDaysInMonth(start);
  const offsetStart: number = getDay(start) - WEEK_START;
  const offsetEnd: number = WEEK_END - getDay(end);
  const length: number = weeks
    ? (7 * weeks)
    : (daysInMonth + offsetStart + offsetEnd);

  return [...Array(length)].map((_, i: number) =>
    set(start, { date: i + 1 - offsetStart })
  );
}
