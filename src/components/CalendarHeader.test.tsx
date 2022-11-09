import { fireEvent, getByTestId, render } from '@testing-library/react';
import { CalendarHeader } from './CalendarHeader';
import { CalendarContext } from '../context';
import dayjs from 'dayjs';

describe('CalendarHeader', () => {
  let monthIndex = 10;
  const setMonthIndex: (i: number) => void = (i: number) => {
  };

  test('handlePrevMonth', () => {
    const { container, rerender } = render(
      <CalendarContext.Provider value={{ monthIndex, setMonthIndex }}>
        <CalendarHeader/>
      </CalendarContext.Provider>
    );
    const prevButton = getByTestId(container, 'calendar-prev-button');
    const calendarDate = getByTestId(container, 'calendar-date');
    monthIndex = monthIndex - 1;
    const date: string = dayjs().month(monthIndex).format('MMMM YYYY');
    fireEvent.click(prevButton);
    rerender(
      <CalendarContext.Provider value={{ monthIndex, setMonthIndex }}>
        <CalendarHeader/>
      </CalendarContext.Provider>,
    );
    expect(calendarDate).toHaveTextContent(date);
  });

  test('handleNextMonth', () => {
    const { container, rerender } = render(
      <CalendarContext.Provider value={{ monthIndex, setMonthIndex }}>
        <CalendarHeader/>
      </CalendarContext.Provider>
    );
    const nextButton = getByTestId(container, 'calendar-next-button');
    const calendarDate = getByTestId(container, 'calendar-date');
    monthIndex = monthIndex + 1;
    const date: string = dayjs().month(monthIndex).format('MMMM YYYY');
    fireEvent.click(nextButton);
    rerender(
      <CalendarContext.Provider value={{ monthIndex, setMonthIndex }}>
        <CalendarHeader/>
      </CalendarContext.Provider>
    );
    expect(calendarDate).toHaveTextContent(date);
  });

  test('handleToday', () => {
    const { container, rerender } = render(
      <CalendarContext.Provider value={{ monthIndex, setMonthIndex }}>
        <CalendarHeader/>
      </CalendarContext.Provider>,
    );
    const todayButton = getByTestId(container, 'calendar-today-button');
    const date: string = dayjs().month(monthIndex).format('MMMM YYYY');
    const calendarDate = getByTestId(container, 'calendar-date');
    fireEvent.click(todayButton);
    rerender(
      <CalendarContext.Provider value={{ monthIndex, setMonthIndex }}>
        <CalendarHeader/>
      </CalendarContext.Provider>
    );
    expect(calendarDate).toHaveTextContent(date);
  });
});
