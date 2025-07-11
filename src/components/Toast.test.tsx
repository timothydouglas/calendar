import { render, screen } from '@testing-library/react';
import { Toast } from './Toast';
import { InterceptorProvider, ToastProvider } from '../context';
import { mockToast, mockToastType } from '../mocks';

describe('Toast', () => {
  it('should render snackbar when there is a toast', () => {
    render(
      <ToastProvider>
        <InterceptorProvider>
          <Toast
            toast={mockToast}
            type={mockToastType}
          />
        </InterceptorProvider>
      </ToastProvider>
    );
    const toastSnackBar: HTMLElement = screen.getByTestId('toast-snackbar');

    expect(toastSnackBar).toBeTruthy();
  });

  it('should not render snackbar when there is no toast', () => {
    render(
      <ToastProvider>
        <Toast
          toast={null}
          type={mockToastType}
        />
      </ToastProvider>
    );
    const toastSnackBar: HTMLElement = screen.queryByTestId('toast-snackbar');

    expect(toastSnackBar).toBeFalsy();
  });
});
