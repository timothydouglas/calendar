import { SelectOption } from './SelectOption.interface';
import { Filters } from './Filters.interface';

export type UseSectionsHook = {
  locations: SelectOption[];
  locationId: string | string[];
  filters?: Filters;
  setFilters?: (filter: Filters) => void;
}
