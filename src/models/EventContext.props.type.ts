import { Events, UnavailableEvent } from '../models';

export type EventContextProps = {
  events: UnavailableEvent[];
  submitted: boolean;
  setSubmitted: (submitted: boolean) => void;
  selectedEvent: Events;
  setEvents: (e: UnavailableEvent[]) => void;
  setSelectedEvent: (e: Events) => void;
}

