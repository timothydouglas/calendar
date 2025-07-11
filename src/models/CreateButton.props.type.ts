import { AvailableEvent, SelectOption, UnavailableEvent } from '../models';

export type CreateButtonProps = {
  addAvailableEvent: (event: Partial<AvailableEvent>, close: () => void, setLoading: (loading: boolean) => void) => void;
  addUnavailableEvent: (event: Partial<UnavailableEvent>, close: () => void, setLoading: (loading: boolean) => void) => void;
  deleteUnavailableEvent: (id: string, close: () => void, setLoading: (loading: boolean) => void) => void;
  deleteAvailableEvent: (id: string, close: () => void, setLoading: (loading: boolean) => void) => void;
  selectedDate: Date;
  locations: SelectOption[];
  workUnits: SelectOption[];
}
