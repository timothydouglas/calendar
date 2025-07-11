import { useContext } from 'react';
import { ApiContext, EventContext } from '../context'
import { ApiContextProps, AvailableEvent, EventContextProps, UnavailableEvent, UseGetCreateActionsHook, Toast } from '../models';
import { AlertColor } from '@mui/material';

export const useGetCreateActions = (addToast: (toast: Toast, type: AlertColor) => void): UseGetCreateActionsHook => {
  const { createAvailable, createUnavailable, deleteAvailable, deleteUnavailable, updateUnavailable }: ApiContextProps = useContext(ApiContext);
  const { setSubmitted }: EventContextProps = useContext(EventContext);

  const createUnavailableEvent = (
    event: Partial<UnavailableEvent>,
    close: () => void,
    setLoading: (loading: boolean) => void
  ): void => {
    createUnavailable(event).then(
      () => {
        setSubmitted(true);
        close();
        addToast({ unavailability: [`${event.label} has been created`] }, 'success');
      },
      () => setLoading(false)
    );
  };

  const createAvailableEvent = (
    event: Partial<AvailableEvent>,
    close: () => void,
    setLoading: (loading: boolean) => void
  ): void => {
    createAvailable(event).then(
      () => {
        setSubmitted(true);
        close();
        addToast({ availability: [`${event.label} has been created`] }, 'success');
      },
      () => setLoading(false)
    );
  };

  const deleteUnavailableEvent = (
    id: string,
    close: () => void,
    setLoading: (loading: boolean) => void
  ): void => {
    deleteUnavailable(id).then(
      (event: UnavailableEvent) => {
        setSubmitted(true);
        close();
        addToast({ unavailability: [`${event.label} has been removed`] }, 'success');
      },
      () => setLoading(false)
    );
  };

  const deleteAvailableEvent = (
    id: string,
    close: () => void,
    setLoading: (loading: boolean) => void
  ): void => {
    deleteAvailable(id).then(
      (event: AvailableEvent) => {
        setSubmitted(true);
        close();
        addToast({ availability: [`${event.label} has been removed`] }, 'success');
      },
      () => setLoading(false)
    );
  };

  const updateUnavailableEvent = (
    event: Partial<UnavailableEvent>,
    close: () => void,
    setLoading: (loading: boolean) => void
  ): void => {
    updateUnavailable(event.id, event).then(
      () => {
        setSubmitted(true);
        close();
        addToast({ unavailability: [`${event.label} has been updated`] }, 'success');
      },
      () => setLoading(false)
    );
  };

  return { createAvailableEvent, deleteUnavailableEvent, deleteAvailableEvent, createUnavailableEvent, updateUnavailableEvent };
}
