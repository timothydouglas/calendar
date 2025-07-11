import { Toast } from './Toast.interface';
import { AlertColor } from '@mui/material';

export type ToastContextProps = {
  toasts: Toast;
  toastType: AlertColor;
  setToasts: (toasts: Toast) => void;
  setToastType: (type: AlertColor) => void;
}
