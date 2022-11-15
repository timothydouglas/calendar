import dayjs from 'dayjs';

export type CalendarContextType = {
  monthIndex: number,
  setMonthIndex: (i: number) => void,
  miniCalendarMonth: number,
  setMiniCalendarMonth: (i: number) => void;
  selectedDay: dayjs.Dayjs | null,
  setSelectedDay: (day: dayjs.Dayjs) => void;
  displayUnavailabilityModal: boolean,
  setUnavailabilityModal: (x: boolean) => void,
};
