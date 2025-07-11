import { Filters, SelectOption } from '../models';

export type FilterProps = {
  currentFilters: Filters;
  options: SelectOption[];
  filters?: string[];
  id: string;
  setFilter: (filters: Filters) => void;
  title: string;
}
