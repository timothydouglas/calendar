import { SelectOption, UnavailableEvent } from '../models';
import { PolicyGroup } from 'react-guardian';

export type CreateUnavailabilityModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (event: Partial<UnavailableEvent>, close: () => void, setLoading: (loading: boolean) => void) => void;
  onDelete: (id: string, close: () => void, setLoading: (loading: boolean) => void) => void;
  guards?: Record<string, PolicyGroup>;
  selectedDate: Date;
  selectedEvent?: UnavailableEvent;
  locations: SelectOption[];
  workUnits: SelectOption[];
}
