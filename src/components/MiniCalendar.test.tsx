import { fireEvent, render, screen } from '@testing-library/react';
import { MiniCalendar } from './MiniCalendar';
import { add, set, sub } from 'date-fns';
import { formatMonthMini, formatDateApi, formatDayMini } from '../util';

describe('MiniCalendar', () => {
  let mockDate: Date = new Date();
  const mockSetSelectedDate = (date: Date): void => {
    mockDate = new Date(date);
  };

  beforeEach(() => {
    mockDate = new Date();
  });

  describe('date', () => {
    it('should display mini calendar date', () => {
      render(
        <MiniCalendar
          selectedDate={mockDate}
          setSelectedDate={mockSetSelectedDate}
        />
      );
      const currentDate: string = formatMonthMini(mockDate);
      const miniCalendarHeader: HTMLElement = screen.getByTestId('mini-calendar-date');

      expect(miniCalendarHeader).toHaveTextContent(currentDate);
    });
  });

  describe('gotoPrevMonth', () => {
    it('should set mini calendar header date to previous month', () => {
      render(
        <MiniCalendar
          selectedDate={mockDate}
          setSelectedDate={mockSetSelectedDate}
        />
      );
      const prevDate: string = formatMonthMini(sub(mockDate, { months: 1 }));
      const miniCalendarPrevButton: HTMLElement = screen.getByTestId('mini-calendar-prev-button');
      const miniCalendarHeader: HTMLElement = screen.getByTestId('mini-calendar-date');

      fireEvent.click(miniCalendarPrevButton);

      expect(miniCalendarHeader).toHaveTextContent(prevDate);
    });
  });

  describe('gotoNextMonth', () => {
    it('should set mini calendar header date to next month', () => {
      render(
         <MiniCalendar
          selectedDate={mockDate}
          setSelectedDate={mockSetSelectedDate}
        />
      );
      const nextDate: string = formatMonthMini(add(mockDate, { months: 1 }));
      const miniCalendarNextButton: HTMLElement = screen.getByTestId('mini-calendar-next-button');
      const miniCalendarHeader: HTMLElement = screen.getByTestId('mini-calendar-date');

      fireEvent.click(miniCalendarNextButton);

      expect(miniCalendarHeader).toHaveTextContent(nextDate);
    });
  });

  describe('setSelectedDate', () => {
    it('should set selected mini calendar date to current date', () => {
      render(
        <MiniCalendar
          selectedDate={mockDate}
          setSelectedDate={mockSetSelectedDate}
        />
      );
      const mockSelectedDate: Date = set(new Date(), { date: 4 });
      const miniCalendarDayButton: HTMLElement = screen.getAllByText(formatDayMini(mockSelectedDate))[0];

      fireEvent.click(miniCalendarDayButton);

      expect(formatDateApi(mockDate)).toStrictEqual(formatDateApi(mockSelectedDate));
    });
  });
});
