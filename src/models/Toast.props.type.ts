import { Toast } from './Toast.interface';
import { AlertColor, SnackbarOrigin } from '@mui/material';

export type ToastProps = {
  position?: SnackbarOrigin;
  toast: Toast;
  type: AlertColor;
}
