import { useCallback, useContext, useEffect } from 'react';
import { Toast, ToastContextProps, UseToastHook } from '../models';
import { ToastContext } from '../context';
import { AlertColor } from '@mui/material';
import { TOAST_TIMER } from '../constants';

export const useToast = (toast?: Toast): UseToastHook => {
  const { toastType, setToastType, toasts, setToasts }: ToastContextProps = useContext(ToastContext);
  const messages: string[] = toast ? Object.values(toast).flat() : [];

  useEffect(() => {
    if (toasts && Object.values(toasts).some((o: string[]) => o.length)) {
      const toastTimer: NodeJS.Timeout = setTimeout(() => {
        setToasts(null);
        setToastType(null);
      }, TOAST_TIMER);
      return () => clearTimeout(toastTimer);
    }
  }, [toasts]); // eslint-disable-line react-hooks/exhaustive-deps

  const addToast: (toast: Toast, type: AlertColor) => void = useCallback(
    (toast: Toast, type: AlertColor) => {
      setToasts({ ...toasts, ...toast });
      setToastType(type);
    },
    [setToasts, setToastType] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return { addToast, messages, toasts, toastType };
}
