import { AvailableEvent, UnavailableEvent } from '../models';

export type UseGetCreateActionsHook = {
  createAvailableEvent: (event: Partial<AvailableEvent>, close: () => void, setLoading: (loading: boolean) => void) => void;
  createUnavailableEvent: (event: Partial<UnavailableEvent>, close: () => void, setLoading: (loading: boolean) => void) => void;
  deleteAvailableEvent: (id: string, close: () => void, setLoading: (loading: boolean) => void) => void;
  deleteUnavailableEvent: (id: string, close: () => void, setLoading: (loading: boolean) => void) => void;
  updateUnavailableEvent: (event: Partial<AvailableEvent>, close: () => void, setLoading: (loading: boolean) => void) => void;
}
