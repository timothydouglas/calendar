import { format } from 'date-fns';

const dateApiFormat: string = 'yyyy-MM-dd';
const dayFormat: string = 'dd';
const dayMonthFormat: string = 'LLLL d';
const miniDayFormat: string = 'd';
const dayHeaderFormat: string = 'E';
const monthFormat: string = 'MMMM yyyy';
const miniMonthFormat: string = 'MMMM yyyy';
const miniHeaderFormat: string = 'EEEEE';
const dayWeekFormat: string = 'EEEE';
const headerDayFormat: string = 'MMMM d, yyyy';
const weekStartFormat: string = 'MMM';
const weekEndFormat: string = 'MMM yyyy';

export const formatDateApi = (date: Date): string => format(date, dateApiFormat);
export const formatDay = (date: Date): string => format(date, dayFormat);
export const formatDayWeek = (date: Date): string => format(date, dayWeekFormat);
export const formatDayMonth = (date: Date): string => format(date, dayMonthFormat);
export const formatDayHeader = (date: Date): string => format(date, dayHeaderFormat);
export const formatDayMini = (date: Date): string => format(date, miniDayFormat);
export const formatHeaderDay = (date: Date): string => format(date, headerDayFormat);
export const formatMonth = (date: Date): string => format(date, monthFormat);
export const formatMonthHeader = (date: Date): string => format(date, miniHeaderFormat);
export const formatMonthMini = (date: Date): string => format(date, miniMonthFormat);
export const formatWeekStart = (date: Date): string => format(date, weekStartFormat);
export const formatWeekEnd = (date: Date): string => format(date, weekEndFormat);
export const formatHeaderWeek = (start: Date, end: Date): string => `${formatWeekStart(start)} - ${formatWeekEnd(end)}`;
