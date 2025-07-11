import { AvailableEvent, SelectOption } from '../models';
import { PolicyGroup } from 'react-guardian';

export type CreateAvailabilityModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (event: Partial<AvailableEvent>, close: () => void, setLoading: (loading: boolean) => void) => void;
  onDelete: (id: string, close: () => void, setLoading: (loading: boolean) => void) => void;
  guards?: Record<string, PolicyGroup>;
  selectedDate: Date;
  selectedEvent?: AvailableEvent;
  locations: SelectOption[];
  workUnits: SelectOption[];
}
