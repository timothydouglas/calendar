import { renderHook, act, RenderHookResult, cleanup } from '@testing-library/react';
import { JSXElementConstructor, ReactNode } from 'react';
import { ToastProvider } from '../context';
import { useToast } from './useToast';
import { UseToastHook } from '../models';
import { TOAST_TIMER } from '../constants';
import { mockToast, mockToastType } from '../mocks';

describe('useToast', () => {
  const wrapper: JSXElementConstructor<{ children: ReactNode }> = ({ children }) => <ToastProvider>{children}</ToastProvider>;

  afterEach(() => {
    cleanup();
  });

  describe('addToast', () => {
    it('should set current toast', () => {
      const { result }: RenderHookResult<UseToastHook, never> = renderHook(() => useToast(), { wrapper });

      act(() => result.current.addToast(mockToast, mockToastType));

      expect(result.current.toasts).toEqual(mockToast);
    });

    it('should clear current toast once set', () => {
      jest.useFakeTimers();
      const { result, rerender }: RenderHookResult<UseToastHook, never> = renderHook(() => useToast(), { wrapper });

      act(() => result.current.addToast(mockToast, mockToastType));

      act(() => void jest.advanceTimersByTime(TOAST_TIMER));

      rerender();

      expect(result.current.toasts).toEqual(null);
    });
  });
});
