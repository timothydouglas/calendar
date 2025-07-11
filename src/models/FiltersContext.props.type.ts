import { Filters, SelectOption } from '../models';

export type FilterContextProps = {
  availableFilters: Filters;
  filters: Filters;
  locations: SelectOption[];
  setAvailableFilters: (filter: Filters) => void;
  setFilters: (filter: Filters) => void;
  setLocations: (d: SelectOption[]) => void;
  setWorkUnits: (d: SelectOption[]) => void;
  workUnits: SelectOption[];
}
