import {
  createContext,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
  useState,
  Context
} from 'react';
import { Toast, ToastContextProps } from '../models';
import { AlertColor } from '@mui/material';

export const ToastContext: Context<ToastContextProps> = createContext<ToastContextProps>(null);

export function ToastProvider({ children }: PropsWithChildren): JSX.Element  {
  const [toasts, setToasts]: [Toast, Dispatch<SetStateAction<Toast>>] = useState<Toast>(null);
  const [toastType, setToastType]: [AlertColor, Dispatch<SetStateAction<AlertColor>>] = useState<AlertColor>(null);
  const value: ToastContextProps = { toasts, toastType, setToasts, setToastType };

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

