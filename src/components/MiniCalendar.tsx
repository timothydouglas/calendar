import React from 'react';
import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import { getMonth, isCurrentDaySelected, isCurrentDayValid } from '../util';
import { CalendarContextType } from '../models';
import { CalendarContext } from '../context';
import { clsx as cx } from 'clsx';


export function MiniCalendar() {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx))
  }, [currentMonthIdx]);
  const { monthIndex, setMiniCalendarMonth, setSelectedDay, selectedDay }: CalendarContextType = useContext(CalendarContext) as CalendarContextType;
  useEffect(() => {
    setCurrentMonthIdx(monthIndex)
  }, [monthIndex]);
  const gotoPrevMonth = (): void => setCurrentMonthIdx(currentMonthIdx - 1);
  const gotoNextMonth = (): void => setCurrentMonthIdx(currentMonthIdx + 1);
  return (
    <div className="mt-9">
      <header className="flex justify-between">
        <p className="text-gray-500 font-bold">
          {dayjs().month(currentMonthIdx).format('MMMM YYYY')}
        </p>
        <div>
          <button onClick={gotoPrevMonth}>
            <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
              chevron_left
            </span>
          </button>
          <button onClick={gotoNextMonth}>
            <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
              chevron_right
            </span>
          </button>
        </div>
      </header>
      <div className="grid grid-cols-7 grid-rows-6">
        {currentMonth[0].map((day: dayjs.Dayjs, i: number) => (
          <span key={i} className="text-sm py-1 text-center">
            {day.format('dd').charAt(0)}
          </span>
        ))}
        {currentMonth.map((row: dayjs.Dayjs[], i: number) => (
          <React.Fragment key={i}>
            {row.map((day: dayjs.Dayjs, idx: number) => (
              <button key={idx}
                onClick={() => {
                  setMiniCalendarMonth(currentMonthIdx);
                  setSelectedDay(day);
                }}
                className={cx('py-1 w-full', {
                  'bg-blue-500 text-white rounded-full': isCurrentDayValid(day),
                  'bg-blue-100 rounded-full text-blue-600 font-bold': isCurrentDaySelected(day, selectedDay)
                })}>
                <span className="text-sm">{day.format('D')}</span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
