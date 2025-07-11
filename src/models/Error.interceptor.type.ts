import { Toast } from './Toast.interface';
import { AlertColor } from '@mui/material';

export type ErrorInterceptor = (addToast: (toast: Toast, type: AlertColor) => void) => void;
