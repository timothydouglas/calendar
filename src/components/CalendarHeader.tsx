import { useContext } from 'react';
import { CalendarContext } from '../context';
import { Logo } from './Logo';
import dayjs from 'dayjs';
import { CalendarContextType } from '../models';

export function CalendarHeader() {
  const { monthIndex, setMonthIndex }: CalendarContextType = useContext(CalendarContext) as CalendarContextType;
  const handlePrevMonth = (): void => setMonthIndex(monthIndex - 1);
  const handleNextMonth = (): void => setMonthIndex(monthIndex + 1);
  const handleToday = (): void => setMonthIndex(dayjs().month());
  const title: string = document.title;
  return (
      <header className="px-4 py-2 flex items-center" data-testid="calendar-header">
        <Logo/>
        <h1 className="ml-5 mr-10 text-xl text-gray-500 font-bold">
          { title }
        </h1>
        <button onClick={handleToday} className="border rounded py-2 px-4 mr-5" data-testid="calendar-today-button">
          Today
        </button>
        <button onClick={handlePrevMonth} data-testid="calendar-prev-button">
          <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
            chevron_left
          </span>
        </button>
        <button onClick={handleNextMonth} data-testid="calendar-next-button">
          <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
            chevron_right
          </span>
        </button>
        <h2 className="ml-4 text-xl text-gray-500 font-bold" data-testid="calendar-date">
          {dayjs().month(monthIndex).format('MMMM YYYY')}
        </h2>
      </header>
  );
}
