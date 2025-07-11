import { renderHook, act, RenderHookResult, cleanup } from '@testing-library/react';
import { JSXElementConstructor, ReactNode } from 'react';
import { SelectedDateProvider } from '../context';
import { useGetDates } from './useGetDates';
import { add, isSameDay } from '../util';
import { UseGetDatesHook } from '../models';

describe('useGetDates', () => {
  const wrapper: JSXElementConstructor<{ children: ReactNode }> = ({ children }) => <SelectedDateProvider>{children}</SelectedDateProvider>;
  const currentDate: Date = new Date('2023-04-01');
  const nextDate: Date = new Date('2023-05-01');

  afterEach(() => {
    cleanup();
  });

  describe('gotoPrevDate', () => {
    it('should go to previous date', () => {
      const { result }: RenderHookResult<UseGetDatesHook, never> = renderHook(() => useGetDates(), { wrapper });
      const prevDate: Date = add(result.current.date, { [result.current.dateType.id]: -1 });

      act(() => result.current.gotoPrevDate());

      expect(isSameDay(result.current.date, prevDate)).toBe(true);
    });

    it('should go to selected date if current date is before and date type is MONTH', () => {
      const { result }: RenderHookResult<UseGetDatesHook, never> = renderHook(() => useGetDates(), { wrapper });
      const prevDate: Date = new Date('2023-03-31');

      act(() => result.current.setDate(currentDate));

      act(() => result.current.setSelectedDate(prevDate));

      act(() => result.current.gotoPrevDate());

      expect(isSameDay(result.current.date, prevDate)).toBe(true);
    });

    it('should go to 1st of previous date if current date is after and date type is MONTH', () => {
      const { result }: RenderHookResult<UseGetDatesHook, never> = renderHook(() => useGetDates(), { wrapper });
      const selectedDate: Date = new Date('2023-05-01');
      const prevDate: Date = new Date('2023-03-01');

      act(() => result.current.setDate(currentDate));

      act(() => result.current.setSelectedDate(selectedDate));

      act(() => result.current.gotoPrevDate());

      expect(isSameDay(result.current.date, prevDate)).toBe(true);
    });
  });

  describe('gotoNextDate', () => {
    it('should go to next date', () => {
      const { result }: RenderHookResult<UseGetDatesHook, never> = renderHook(() => useGetDates(), { wrapper });
      const nextDate: Date = add(result.current.date, { [result.current.dateType.id]: +1 });

      act(() => result.current.gotoNextDate());

      expect(isSameDay(result.current.date, nextDate)).toBe(true);
    });

    it('should go to selected date if current date is after and date type is MONTH', () => {
      const { result }: RenderHookResult<UseGetDatesHook, never> = renderHook(() => useGetDates(), { wrapper });

      act(() => result.current.setDate(currentDate));

      act(() => {
        result.current.setSelectedDate(nextDate);
        result.current.gotoNextDate();
      });

      expect(isSameDay(result.current.date, nextDate)).toBe(true);
    });

    it('should go to 1st of next date if current date is before and date type is MONTH', () => {
      const { result }: RenderHookResult<UseGetDatesHook, never> = renderHook(() => useGetDates(), { wrapper });
      const selectedDate: Date = new Date('2023-03-26');

      act(() => result.current.setDate(currentDate));

      act(() => result.current.setSelectedDate(selectedDate));

      act(() => result.current.gotoNextDate());

      expect(isSameDay(result.current.date, nextDate)).toBe(true);
    });
  });

  describe('gotoCurrentDate', () => {
    it('should go to current date', () => {
      const { result }: RenderHookResult<UseGetDatesHook, never> = renderHook(() => useGetDates(), { wrapper });
      const currentDate: Date = new Date();
      const selectedDate: Date = new Date('1900-01-01');

      act(() => {
        result.current.setDate(selectedDate);
        result.current.gotoCurrentDate();
      });

      expect(isSameDay(result.current.date, currentDate)).toBe(true);
    });
  });
});
