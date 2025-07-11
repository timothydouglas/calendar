import { Event } from './Event.interface';

export interface AvailableEvent extends Event {
  excludedDate: Date | string;
  createdTimestamp: Date;
}
