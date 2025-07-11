import { Alert, Snackbar, SnackbarOrigin } from '@mui/material';
import { ToastProps, UseToastHook } from '../models';
import { useToast } from '../hooks';

const toastPosition: SnackbarOrigin = {
  vertical: 'top',
  horizontal: 'center'
};

export function Toast({ position = toastPosition, toast, type }: ToastProps): JSX.Element {
  const { messages }: UseToastHook = useToast(toast);

  if (!toast) {
    return null;
  }

  return (
    <>
      {messages.map((message: string, i: number) =>
        <Snackbar
          key={i}
          data-testid="toast-snackbar"
          autoHideDuration={6000}
          anchorOrigin={position}
          open={!!toast}
        >
          <Alert severity={type}>
            {message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}
