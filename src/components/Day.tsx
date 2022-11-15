import { clsx as cx } from 'clsx';
import { isCurrentDayValid } from '../util';
import { useContext, useEffect, useState } from 'react';
import { CalendarContext } from '../context';
import { CalendarContextType, Unavailability } from '../models';
import dayjs from 'dayjs';

export function Day({ day, rowIdx }) {
  const { setSelectedDay, setUnavailabilityModal, unavailabilityEvents }: CalendarContextType = useContext(CalendarContext)
  const [unavailability, setUnavailability] = useState([]);
  useEffect(() => {
    const format: string = 'DD-MM-YY';
    const events: Unavailability[] = unavailability.filter(
      (unavailability: Unavailability) =>
        dayjs(unavailability.startDate).format(format) === day.format(format)
    );
    setUnavailability(events);
  }, [unavailabilityEvents, day]);

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
        {unavailability.map((u: Unavailability, i: number) => (
          <div
            key={i}
            className={`bg-${u.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}>
            {u.title}
          </div>
        ))}
      </div>
    </div>
  );
}
