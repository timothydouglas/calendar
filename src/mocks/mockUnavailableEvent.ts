import { UnavailableEvent } from '../models';

export const mockUnavailableEvent: UnavailableEvent = {
  id: '',
  label: '',
  startDate: new Date(),
  endDate: new Date(),
  workUnitId: '',
  locationId: '',
  sectionId: '',
  recurrenceStrategy: '',
  unavailableDateTimes: [],
  availableDates: []
};
