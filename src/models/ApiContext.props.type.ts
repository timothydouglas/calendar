import {
  AvailableEvent,
  CalendarEvents,
  Filters,
  SelectOption,
  UnavailableEvent,
  User
} from '../models';

export type ApiContextProps = {
  createAvailable: (e: Partial<AvailableEvent>) => Promise<AvailableEvent>;
  createUnavailable: (event: Partial<UnavailableEvent>) => Promise<UnavailableEvent>;
  deleteAvailable: (id: string) => Promise<AvailableEvent>;
  deleteUnavailable: (id: string) => Promise<UnavailableEvent>;
  fetchLocations: () => Promise<SelectOption[]>;
  fetchEvents: (from?: string, to?: string, filters?: Filters) => Promise<CalendarEvents>;
  fetchWorkUnits: () => Promise<SelectOption[]>;
  fetchUser: () => Promise<User>;
  logOut: () => Promise<void>;
  updateAvailable: (id: string, e: Partial<AvailableEvent>) => Promise<AvailableEvent>;
  updateUnavailable: (id: string, e: Partial<UnavailableEvent>) => Promise<UnavailableEvent>;
}
