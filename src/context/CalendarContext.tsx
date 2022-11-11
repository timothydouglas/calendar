import React from 'react';
import { CalendarContextType } from '../models';
import dayjs from 'dayjs';

export const CalendarContext: React.Context<CalendarContextType | null> = React.createContext<CalendarContextType | null>({
  monthIndex: 0,
  setMonthIndex: (i: number) => {},
  miniCalendarMonth: null,
  setMiniCalendarMonth: (i: number) => {},
  selectedDay: null,
  setSelectedDay: (day: dayjs.Dayjs) => {},
})
