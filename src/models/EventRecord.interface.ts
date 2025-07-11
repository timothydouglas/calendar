import { AvailableEvent } from './AvailableEvent.interface';
import { UnavailableEvent } from './UnavailableEvent.interface';

export interface EventRecord {
  availableEvents: AvailableEvent[];
  unavailableEvents: UnavailableEvent[];
}
