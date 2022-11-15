import dayjs from 'dayjs';

export const format: string = 'DD-MM-YY';
export const colours: string[] = ['indigo', 'gray', 'green', 'blue', 'red', 'purple'];

export function getMonth(month = dayjs().month()): dayjs.Dayjs[][] {
  month = Math.floor(month);
  const year: number = dayjs().year();
  const firstDayOfTheMonth: number = dayjs(new Date(year, month, 1)).day();
  let currentMonthCount: number = 0 - firstDayOfTheMonth;
  return new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++
      return dayjs(new Date(year, month, currentMonthCount));
    })
  });
}

export function isCurrentDayValid(day: dayjs.Dayjs): boolean {
  const currentDay: string = day.format(format);
  return currentDay === dayjs().format(format);
}

export function isCurrentDaySelected(day: dayjs.Dayjs, selected: dayjs.Dayjs): boolean {
  const currentDay: string = day.format(format);
  const selectedDay: string = selected && selected.format(format);
  return currentDay === selectedDay
}
