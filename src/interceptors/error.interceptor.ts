import axios, { AxiosError, AxiosResponse } from 'axios';
import { ErrorInterceptor, ErrorResponse, Toast } from '../models';
import { AlertColor } from '@mui/material';

/**
 * Intercept error responses and display toast notification
 */
export const errorInterceptor: ErrorInterceptor = (addToast: (toast: Toast, type: AlertColor) => void) => {
  const interceptor: number = axios.interceptors.response.use(
    (resp: AxiosResponse) => resp,
    (error: AxiosError | ErrorResponse) => {
      const httpError: Toast = { error: [(error as AxiosError).message] };
      addToast((error as ErrorResponse).errors ?? httpError, 'error');
      return Promise.reject(error);
    }
  );

  return () => axios.interceptors.response.eject(interceptor);
}
