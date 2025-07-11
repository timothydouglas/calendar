import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { add, getMonthArray } from '../util';
import { UseMiniCalendarHook } from '../models';

export const useMiniCalendar = (selectedDate: Date): UseMiniCalendarHook => {
  const [date, setDate]: [Date, Dispatch<SetStateAction<Date>>] = useState(selectedDate);
  const days: Date[] = getMonthArray(date, 6);

  const gotoPrevMonth = (): void => setDate(add(date, { months: -1 }));
  const gotoNextMonth = (): void => setDate(add(date, { months: +1 }));

  useEffect(() =>
    setDate(selectedDate),
    [selectedDate] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return { date, days, gotoPrevMonth, gotoNextMonth };
}
