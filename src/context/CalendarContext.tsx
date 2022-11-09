import React from 'react';
import { CalendarContextType } from '../models';

export const CalendarContext: React.Context<CalendarContextType | null> = React.createContext<CalendarContextType | null>({
  monthIndex: 0,
  setMonthIndex: (i: number) => {}
})
