import { clsx as cx } from 'clsx';
import { isCurrentDayValid } from '../util';
import { useContext } from 'react';
import { CalendarContext } from '../context';
import { CalendarContextType } from '../models';

export function Day({ day, rowIdx }) {
  const { setSelectedDay, setUnavailabilityModal }: CalendarContextType = useContext(CalendarContext)
  return (
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1">
            {day.format('ddd').toUpperCase()}
          </p>
        )}
        <p className={cx('text-sm p-1 my-1 text-center', isCurrentDayValid(day) && 'bg-blue-600 text-white rounded-full w-7')}>
          {day.format('DD')}
        </p>
      </header>
      <div className="flex-1 cursor-pointer" onClick={() => {
        setSelectedDay(day);
        setUnavailabilityModal(true);
      }}>
      </div>
    </div>
  );
}
