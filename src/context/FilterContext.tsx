import { Context, createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from 'react';
import { FilterContextProps, Filters, SelectOption } from '../models';
import { FILTERS_STATE, locationId, workUnitId } from '../constants';

export const FilterContext: Context<FilterContextProps | null> = createContext<FilterContextProps>(null);

export function FilterProvider({ children }: PropsWithChildren): JSX.Element  {
  const [locations, setLocations]: [SelectOption[], Dispatch<SetStateAction<SelectOption[]>>] = useState([]);
  const [workUnits, setWorkUnits]: [SelectOption[], Dispatch<SetStateAction<SelectOption[]>>] = useState([]);
  const [availableFilters, setAvailableFilters]: [Filters, Dispatch<SetStateAction<Filters>>] = useState<Filters>({ locationId, workUnitId });
  const [filters, setFilters]: [Filters, Dispatch<SetStateAction<Filters>>] = useState<Filters>(FILTERS_STATE);

  const value: FilterContextProps = {
    availableFilters,
    filters,
    locations,
    setAvailableFilters,
    setFilters,
    setLocations,
    setWorkUnits,
    workUnits
  };

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
}
