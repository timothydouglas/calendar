import { SelectOption } from './SelectOption.interface';
import { Filters } from './Filters.interface';

export type UseLocationsHook = {
  locations: SelectOption[];
  workUnitId: string | string[];
  filters?: Filters;
  setFilters?: (filter: Filters) => void;
}
