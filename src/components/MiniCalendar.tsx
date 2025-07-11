import { Fragment } from 'react';
import { clsx as cx } from 'clsx';
import { useMiniCalendar } from '../hooks';
import { MiniCalendarProps, UseMiniCalendarHook } from '../models';
import {
  formatDayMini,
  formatMonthHeader,
  formatMonthMini,
  isToday,
  isSameDay,
  isSameMonth
} from '../util';

export function MiniCalendar({ selectedDate, setSelectedDate }: MiniCalendarProps): JSX.Element {
  const { date, days, gotoPrevMonth, gotoNextMonth }: UseMiniCalendarHook = useMiniCalendar(selectedDate);

  return (
    <div className="mt-9 mb-4">
      <header className="flex justify-between mb-2">
        <h3 data-testid="mini-calendar-date">{formatMonthMini(date)}</h3>
        <div className="flex justify-between space-x-3">
          <button
            onClick={gotoPrevMonth}
            className="hover:bg-slate-100 rounded-full h-6 w-6 flex items-center justify-center"
            data-testid="mini-calendar-prev-button"
          >
            <span className="material-icons-outlined cursor-pointer text-gray-700 text-lg">
              chevron_left
            </span>
          </button>
          <button
            onClick={gotoNextMonth}
            className="hover:bg-slate-100 rounded-full h-6 w-6 flex items-center justify-center"
            data-testid="mini-calendar-next-button"
          >
            <span className="material-icons-outlined cursor-pointer text-gray-700 text-lg">
              chevron_right
            </span>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-7 grid-rows-6 -mx-2">
        {days.map((day: Date, i: number) => (i < 7 &&
          <span key={i} className="text-xs font-bold py-1 text-center">
            {formatMonthHeader(day)}
          </span>
        ))}

        {days.map((day: Date, i: number) => (
          <Fragment key={i}>
            <button
              onClick={() => setSelectedDate(day)}
              className={cx('p-1 w-6 h-6 m-0.5 text-center text-xs cursor-pointer', {
                'text-gray-400': !isSameMonth(date, day),
                'bg-blue-500 text-white rounded-full': isToday(day),
                'bg-blue-100 rounded-full text-blue-600 font-bold': isSameDay(day, selectedDate)
              })}
            >
              {formatDayMini(day)}
            </button>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
