import { AvailableEvent, Events, SelectOption, Toast, UnavailableEvent } from '../models';
import { PolicyGroup } from 'react-guardian';
import { AlertColor } from '@mui/material';

export type DatesProps = {
  addAvailableEvent: (event: Partial<AvailableEvent>, close: () => void, setLoading: (loading: boolean) => void) => void;
  addToast: (toast: Toast, type: AlertColor) => void;
  date: Date;
  selectedDate: Date;
  dateType: string;
  deleteUnavailableEvent: (id: string, close: () => void, setLoading: (loading: boolean) => void) => void;
  deleteAvailableEvent: (id: string, close: () => void, setLoading: (loading: boolean) => void) => void;
  events: UnavailableEvent[];
  guards: Record<string, PolicyGroup>;
  locations: SelectOption[];
  selectedEvent: Events;
  setSelectedDate: (date: Date) => void;
  setSelectedEvent: (e: Events) => void;
  updateUnavailableEvent: (event: Partial<UnavailableEvent>, close: () => void, setLoading: (loading: boolean) => void) => void;
  workUnits: SelectOption[];
}
