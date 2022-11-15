import { fireEvent, getByTestId, render } from '@testing-library/react';
import { CalendarHeader } from './CalendarHeader';
import { CalendarContext } from '../context';
import dayjs from 'dayjs';

describe('CalendarHeader', () => {
  let monthIndex: number = 10;
  const setMonthIndex: (i: number) => void = (i: number) => {};
  let miniCalendarMonth: number = null;
  const setMiniCalendarMonth: (i: number) => void = (i: number) => {};
  let selectedDay: dayjs.Dayjs;
  const setSelectedDay: (day: dayjs.Dayjs) => void = (day: dayjs.Dayjs) => {};
  let displayUnavailabilityModal: boolean = false;
  const setUnavailabilityModal: (x: boolean) => void = (x: boolean) => {};

  test('goToPrevMonth', () => {
    const { container, rerender } = render(
      <CalendarContext.Provider value={{
        monthIndex,
        setMonthIndex,
        miniCalendarMonth,
        setMiniCalendarMonth,
        selectedDay,
        setSelectedDay,
        displayUnavailabilityModal,
        setUnavailabilityModal
      }}>
        <CalendarHeader/>
      </CalendarContext.Provider>
    );
    const prevButton = getByTestId(container, 'calendar-prev-button');
    const calendarDate = getByTestId(container, 'calendar-date');
    monthIndex = monthIndex - 1;
    const date: string = dayjs().month(monthIndex).format('MMMM YYYY');
    fireEvent.click(prevButton);
    rerender(
     <CalendarContext.Provider value={{
        monthIndex,
        setMonthIndex,
        miniCalendarMonth,
        setMiniCalendarMonth,
        selectedDay,
        setSelectedDay,
        displayUnavailabilityModal,
        setUnavailabilityModal
      }}>
        <CalendarHeader/>
      </CalendarContext.Provider>,
    );
    expect(calendarDate).toHaveTextContent(date);
  });

  test('goToNextMonth', () => {
    const { container, rerender } = render(
     <CalendarContext.Provider value={{
        monthIndex,
        setMonthIndex,
        miniCalendarMonth,
        setMiniCalendarMonth,
        selectedDay,
        setSelectedDay,
        displayUnavailabilityModal,
        setUnavailabilityModal
      }}>
        <CalendarHeader/>
      </CalendarContext.Provider>
    );
    const nextButton = getByTestId(container, 'calendar-next-button');
    const calendarDate = getByTestId(container, 'calendar-date');
    monthIndex = monthIndex + 1;
    const date: string = dayjs().month(monthIndex).format('MMMM YYYY');
    fireEvent.click(nextButton);
    rerender(
     <CalendarContext.Provider value={{
        monthIndex,
        setMonthIndex,
        miniCalendarMonth,
        setMiniCalendarMonth,
        selectedDay,
        setSelectedDay,
        displayUnavailabilityModal,
        setUnavailabilityModal
      }}>
        <CalendarHeader/>
      </CalendarContext.Provider>
    );
    expect(calendarDate).toHaveTextContent(date);
  });

  test('goToCurrentMonth', () => {
    const { container, rerender } = render(
     <CalendarContext.Provider value={{
        monthIndex,
        setMonthIndex,
        miniCalendarMonth,
        setMiniCalendarMonth,
        selectedDay,
        setSelectedDay,
        displayUnavailabilityModal,
        setUnavailabilityModal
      }}>
        <CalendarHeader/>
      </CalendarContext.Provider>,
    );
    const todayButton = getByTestId(container, 'calendar-today-button');
    const date: string = dayjs().month(monthIndex).format('MMMM YYYY');
    const calendarDate = getByTestId(container, 'calendar-date');
    fireEvent.click(todayButton);
    rerender(
     <CalendarContext.Provider value={{
        monthIndex,
        setMonthIndex,
        miniCalendarMonth,
        setMiniCalendarMonth,
        selectedDay,
        setSelectedDay,
        displayUnavailabilityModal,
        setUnavailabilityModal
      }}>
        <CalendarHeader/>
      </CalendarContext.Provider>
    );
    expect(calendarDate).toHaveTextContent(date);
  });
});
