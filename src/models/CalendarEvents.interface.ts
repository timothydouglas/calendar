import { UnavailableEvent } from './UnavailableEvent.interface';

export interface CalendarEvents {
  unavailableDatesDTOs: UnavailableEvent[],
  workUnitIds: string[],
  locationIds: string[]
}
