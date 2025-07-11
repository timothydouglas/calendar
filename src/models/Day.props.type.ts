import { AvailableEvent, Events, SelectOption, Toast, UnavailableEvent } from '../models';
import { PolicyGroup } from 'react-guardian';
import { AlertColor } from '@mui/material';

export type DayProps = {
  addAvailableEvent: (event: Partial<AvailableEvent>, close: () => void, setLoading: (loading: boolean) => void) => void;
  addToast: (toast: Toast, type: AlertColor) => void;
  currentDate: Date;
  day: Date;
  dateType: string;
  deleteAvailableEvent: (id: string, close: () => void, setLoading: (loading: boolean) => void) => void;
  deleteUnavailableEvent: (id: string, close: () => void, setLoading: (loading: boolean) => void) => void;
  events: UnavailableEvent[];
  exclusions?: AvailableEvent[];
  locations: SelectOption[];
  guards: Record<string, PolicyGroup>;
  rowIdx: number;
  selectedDate: Date;
  selectedEvent: Events;
  setSelectedDate: (date: Date) => void;
  setSelectedEvent: (e: Events) => void;
  updateUnavailableEvent: (event: Partial<UnavailableEvent>, close: () => void, setLoading: (loading: boolean) => void) => void;
  workUnits: SelectOption[];
}
