import {
  Events,
  Filters,
  SelectOption,
  UnavailableEvent
} from '../models';

export type UseGetEventsHook = {
  availableFilters: Filters;
  filters: Filters;
  events: UnavailableEvent[];
  locations: SelectOption[];
  selectedEvent: Events;
  setFilters: (filter: Filters) => void;
  setSelectedEvent: (e: Events) => void;
  workUnits: SelectOption[];
}
