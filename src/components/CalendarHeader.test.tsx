import { fireEvent, render, RenderResult, screen } from '@testing-library/react';
import { CalendarHeader } from './CalendarHeader';
import { add, sub } from 'date-fns';
import { formatHeaderDay, formatHeaderWeek, formatMonth } from '../util';
import { DateType, DateTypes, SelectOption } from '../models';
import { mockUser } from '../mocks';
import { AuthProvider } from '../context';

describe('CalendarHeader', () => {
  let mockDate: Date = new Date();
  let mockDateType: SelectOption = { label: DateTypes[DateType.MONTH], id: DateType.MONTH };
  const mockTitle: string = 'Calendar';
  const headerDateId: string = 'calendar-header-date';
  const mockGotoCurrentMonth = (): void => {
    mockDate = new Date();
  };
  const mockGotoNextMonth = (): void => {
    mockDate = add(mockDate, { months: 1 });
  };
  const mockGotoPrevMonth = (): void => {
    mockDate = sub(mockDate, { months: 1 });
  };
  const mockLogOut = (): void => {
    Object.defineProperty(window, 'location', { value: { href: '/logout' } });
  };
  const mockSetDateType = (type: SelectOption): void => {
    mockDateType = { ...mockDateType, ...type };
  };

  beforeEach(() => {
    mockDateType = { label: DateTypes[DateType.MONTH], id: DateType.MONTH };
    mockDate = new Date();
  });

  describe('title', () => {
    it('should show correct title', () => {
      render(
        <CalendarHeader
          date={mockDate}
          dateType={mockDateType}
          setDateType={mockSetDateType}
          gotoCurrentDate={mockGotoCurrentMonth}
          gotoNextDate={mockGotoNextMonth}
          gotoPrevDate={mockGotoPrevMonth}
          logOut={mockLogOut}
          title={mockTitle}
          user={mockUser}
        />
      );
      const titleHeader: HTMLElement = screen.getByTestId('calendar-header-title');

      expect(titleHeader).toHaveTextContent(mockTitle);
    });
  });

  describe('date', () => {
    it('should show correct input date for date type DAY', () => {
      // Day Date Type
      mockDateType = { label: DateTypes[DateType.DAY], id: DateType.DAY };

      render(
        <CalendarHeader
          date={mockDate}
          dateType={mockDateType}
          setDateType={mockSetDateType}
          gotoCurrentDate={mockGotoCurrentMonth}
          gotoNextDate={mockGotoNextMonth}
          gotoPrevDate={mockGotoPrevMonth}
          logOut={mockLogOut}
          title={mockTitle}
          user={mockUser}
        />
      );
      const calendarDate: HTMLElement = screen.getByTestId(headerDateId);
      const currentDate: string = formatHeaderDay(mockDate);

      expect(calendarDate).toHaveTextContent(currentDate);
    });

    it('should show correct input date for date type WEEK', () => {
      // Week Date Type
      mockDateType = { label: DateTypes[DateType.WEEK], id: DateType.WEEK };
      // April 2023 ends on Sunday
      mockDate = new Date(2023, 4, 30);
      const mockEndDate: Date = add(mockDate, { days: 6 });

      render(
        <CalendarHeader
          date={mockDate}
          dateType={mockDateType}
          setDateType={mockSetDateType}
          gotoCurrentDate={mockGotoCurrentMonth}
          gotoNextDate={mockGotoNextMonth}
          gotoPrevDate={mockGotoPrevMonth}
          logOut={mockLogOut}
          title={mockTitle}
          user={mockUser}
        />
      );
      const calendarDate: HTMLElement = screen.getByTestId(headerDateId);
      const currentDate: string = formatHeaderWeek(mockDate, mockEndDate);

      expect(calendarDate).toHaveTextContent(currentDate);
    });

    it('should show correct input date for date type MONTH', () => {
      render(
        <CalendarHeader
          date={mockDate}
          dateType={mockDateType}
          setDateType={mockSetDateType}
          gotoCurrentDate={mockGotoCurrentMonth}
          gotoNextDate={mockGotoNextMonth}
          gotoPrevDate={mockGotoPrevMonth}
          logOut={mockLogOut}
          title={mockTitle}
          user={mockUser}
        />
      );
      const calendarDate: HTMLElement = screen.getByTestId(headerDateId);
      const currentDate: string = formatMonth(mockDate);

      expect(calendarDate).toHaveTextContent(currentDate);
    });
  });

  describe('gotoCurrentMonth', () => {
    it('should set header date to current date', () => {
      // January 2026
      mockDate = new Date(2026, 1, 1);

      const { rerender }: RenderResult = render(
        <CalendarHeader
          date={mockDate}
          dateType={mockDateType}
          setDateType={mockSetDateType}
          gotoCurrentDate={mockGotoCurrentMonth}
          gotoNextDate={mockGotoNextMonth}
          gotoPrevDate={mockGotoPrevMonth}
          logOut={mockLogOut}
          title={mockTitle}
          user={mockUser}
        />
      );
      const currentDate: string = formatMonth(new Date());
      const todayButton: HTMLElement = screen.getByTestId('calendar-header-today-button');
      const calendarDate: HTMLElement = screen.getByTestId(headerDateId);

      fireEvent.click(todayButton);

      rerender(
        <CalendarHeader
          date={mockDate}
          dateType={mockDateType}
          setDateType={mockSetDateType}
          gotoCurrentDate={mockGotoCurrentMonth}
          gotoNextDate={mockGotoNextMonth}
          gotoPrevDate={mockGotoPrevMonth}
          logOut={mockLogOut}
          title={mockTitle}
          user={mockUser}
        />
      );

      expect(calendarDate).toHaveTextContent(currentDate);
    });
  });

  describe('gotoPrevDate', () => {
    it('should set header date to previous month', () => {
      const { rerender }: RenderResult = render(
        <CalendarHeader
          date={mockDate}
          dateType={mockDateType}
          setDateType={mockSetDateType}
          gotoCurrentDate={mockGotoCurrentMonth}
          gotoNextDate={mockGotoNextMonth}
          gotoPrevDate={mockGotoPrevMonth}
          logOut={mockLogOut}
          title={mockTitle}
          user={mockUser}
        />
      );
      const prevDate: string = formatMonth(sub(mockDate, { months: 1 }));
      const prevButton: HTMLElement = screen.getByTestId('calendar-header-prev-button');
      const calendarDate: HTMLElement = screen.getByTestId(headerDateId);

      fireEvent.click(prevButton);

      rerender(
        <CalendarHeader
          date={mockDate}
          dateType={mockDateType}
          setDateType={mockSetDateType}
          gotoCurrentDate={mockGotoCurrentMonth}
          gotoNextDate={mockGotoNextMonth}
          gotoPrevDate={mockGotoPrevMonth}
          logOut={mockLogOut}
          title={mockTitle}
          user={mockUser}
        />
      );

      expect(calendarDate).toHaveTextContent(prevDate);
    });
  });

  describe('gotoNextDate', () => {
    it('should set header date to next month', () => {
      const { rerender }: RenderResult = render(
        <CalendarHeader
          date={mockDate}
          dateType={mockDateType}
          setDateType={mockSetDateType}
          gotoCurrentDate={mockGotoCurrentMonth}
          gotoNextDate={mockGotoNextMonth}
          gotoPrevDate={mockGotoPrevMonth}
          logOut={mockLogOut}
          title={mockTitle}
          user={mockUser}
        />
      );
      const nextDate: string = formatMonth(add(mockDate, { months: 1 }));
      const nextButton: HTMLElement = screen.getByTestId('calendar-header-next-button');
      const calendarDate: HTMLElement = screen.getByTestId(headerDateId);

      fireEvent.click(nextButton);

      rerender(
        <CalendarHeader
          date={mockDate}
          dateType={mockDateType}
          setDateType={mockSetDateType}
          gotoCurrentDate={mockGotoCurrentMonth}
          gotoNextDate={mockGotoNextMonth}
          gotoPrevDate={mockGotoPrevMonth}
          logOut={mockLogOut}
          title={mockTitle}
          user={mockUser}
        />
      );

      expect(calendarDate).toHaveTextContent(nextDate);
    });
  });

  describe('logOut', () => {
    it('should log user out', () => {
      render(
        <AuthProvider>
          <CalendarHeader
            date={mockDate}
            dateType={mockDateType}
            setDateType={mockSetDateType}
            gotoCurrentDate={mockGotoCurrentMonth}
            gotoNextDate={mockGotoNextMonth}
            gotoPrevDate={mockGotoPrevMonth}
            logOut={mockLogOut}
            title={mockTitle}
            user={mockUser}
          />
        </AuthProvider>
      );
      const url: string = '/logout';
      const logoutButton: HTMLElement = screen.getByTestId('calendar-header-logout-button');

      fireEvent.click(logoutButton);

      expect(window.location.href).toBe(url);
    });
  });
});
