import { Filters } from './Filters.interface';

export type ClearFilterProps = {
  availableFilters: Filters;
  clearFilter: (filters: Filters) => void;
  currentFilters: Filters;
}
