export type UseMiniCalendarHook = {
  date: Date;
  days: Date[];
  gotoPrevMonth: () => void;
  gotoNextMonth: () => void;
}
