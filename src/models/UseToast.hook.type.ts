import { Toast } from './Toast.interface';
import { AlertColor } from '@mui/material';

export type UseToastHook = {
  addToast: (toast: Toast, type: AlertColor) => void;
  messages: string[];
  toasts: Toast;
  toastType: AlertColor;
}
