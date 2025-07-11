import { AvailableEvent, Events, UnavailableEvent } from '../models';
import { CSSProperties } from 'react';

export type UseEventsHook = {
  availableEvents: AvailableEvent[];
  unavailableEvents: UnavailableEvent[];
  setEventStyle: (event: Events) => CSSProperties;
  total: number;
}
