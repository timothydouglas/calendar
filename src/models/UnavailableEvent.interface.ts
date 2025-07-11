import { AvailableEvent, Event } from '../models';

export interface UnavailableEvent extends Event {
  startDate: Date | string;
  endDate: Date | string;
  recurrenceStrategy: string;
  unavailableDateTimes: Date[];
  availableDates: AvailableEvent[];
  daysOfWeek?: string;
  dayOfMonth?: string;
  weekOfMonth?: number;
  month?: number;
  day?: number;
}
