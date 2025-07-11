import { useContext, useEffect } from 'react';
import { SelectedDateContext } from '../context';
import { set, add, isAfter, isBefore, isSameMonth } from '../util';
import { SelectedDateContextProps, UseGetDatesHook, DateType } from '../models';

export const useGetDates = (): UseGetDatesHook => {
  const { date, dateType, selectedDate, setDate, setDateType, setSelectedDate }: SelectedDateContextProps = useContext(SelectedDateContext);
  const prevDate: Date = dateType.id === DateType.MONTH && !isSameMonth(date, selectedDate)
    ? isAfter(selectedDate, date)
      ? set(add(date, { [dateType.id]: -1 }), { date: 1 })
      : selectedDate
    : add(selectedDate, { [dateType.id]: -1 });
  const nextDate: Date = dateType.id === DateType.MONTH && !isSameMonth(date, selectedDate)
    ? isBefore(selectedDate, date)
      ? set(add(date, { [dateType.id]: +1 }), { date: 1 })
      : selectedDate
    : add(selectedDate, { [dateType.id]: +1 });

  const gotoPrevDate = (): void => setDate(prevDate);

  const gotoNextDate = (): void => setDate(nextDate);

  const gotoCurrentDate = (): void => setDate(new Date());

  useEffect(() =>
    setSelectedDate(date),
    [date] // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() =>
    setDate(selectedDate),
    [dateType] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return {
    date,
    dateType,
    selectedDate,
    gotoCurrentDate,
    gotoNextDate,
    gotoPrevDate,
    setDate,
    setDateType,
    setSelectedDate
  };
}
