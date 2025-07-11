import { getMonth, getWeekOfMonth } from 'date-fns';
import { getDay, getNthWeekOfMonth, formatDay, formatDayMonth, formatDayWeek, isValid, startDate } from '../util';
import { RecurrenceStrategy, SelectOption, UseStrategiesHook, UnavailableEvent } from '../models';

export const useStrategies = (event: UnavailableEvent, setEvent: (e: UnavailableEvent) => void): UseStrategiesHook => {
  const date: Date = event?.startDate as Date ?? undefined;
  const state: UnavailableEvent = (({ daysOfWeek, dayOfMonth, weekOfMonth, month, day, ...state }: UnavailableEvent) => state)(event);
  const strategies: SelectOption[] = isValid(date)
    ? [
        {
          id: RecurrenceStrategy.DAILY,
          label: RecurrenceStrategy.DAILY
        },
        {
          id: RecurrenceStrategy.WEEKLY,
          label: `Weekly on a ${formatDayWeek(date)}`
        },
        {
          id: RecurrenceStrategy.MONTHLY,
          label: `Monthly on ${formatDayMonth(date)}`
        },
        {
          id: RecurrenceStrategy.DAYMONTHLY,
          label: `Monthly on the ${getNthWeekOfMonth(date)} ${formatDayWeek(date)}`
        },
        {
          id: RecurrenceStrategy.YEARLY,
          label: `Annually on ${formatDayMonth(date)}`
        }
      ]
    : [];

  const handleStrategy = (recurrenceStrategy: string): void => {
    const start: Date = startDate(date);
    const weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 = getDay(start);
    const day: number = +formatDay(date);
    const daysOfWeek: string = formatDayWeek(date), dayOfMonth: string = daysOfWeek;
    const month: number = getMonth(date) + 1;
    const weekOfMonth: number = getWeekOfMonth(date, { weekStartsOn });
    const values: UnavailableEvent = { ...state, recurrenceStrategy };
    const setStrategy: Map<string, () => void> = new Map([
      [RecurrenceStrategy.DAILY, (): void => setEvent(values)],
      [RecurrenceStrategy.WEEKLY, (): void => setEvent({ ...values, daysOfWeek })],
      [RecurrenceStrategy.MONTHLY, (): void => setEvent({ ...values, day })],
      [RecurrenceStrategy.DAYMONTHLY, (): void => setEvent({ ...values, dayOfMonth, weekOfMonth })],
      [RecurrenceStrategy.YEARLY, (): void => setEvent({ ...values, day, month })]
    ]);

    return setStrategy.get(recurrenceStrategy)();
  };

  const resetStrategy = (startDate?: string | Date): void =>
    setEvent({
      ...state,
      startDate: startDate ?? date,
      recurrenceStrategy: ''
    });

  return { handleStrategy, resetStrategy, strategies };
}
