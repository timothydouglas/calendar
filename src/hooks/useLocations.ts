import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Filters, SelectOption } from '../models';

export const useLocations = (
  locations: SelectOption[],
  workUnitId: string | string[],
  filters?: Filters,
  setFilters?: (filter: Filters) => void
): SelectOption[] => {
  const [currentLocations, setCurrentLocations]: [SelectOption[], Dispatch<SetStateAction<SelectOption[]>>] = useState([]);
  const filteredLocations: SelectOption[] = locations.filter((o: SelectOption) => Array.isArray(workUnitId)
    ? workUnitId.includes(o.data?.workUnitId)
    : workUnitId === o.data?.workUnitId
  );

  useEffect(() => {
    setCurrentLocations(filteredLocations);
    if (Array.isArray(workUnitId)) {
      setFilters({
        ...filters,
        locationId: filters.locationId.filter((f: string) => filteredLocations.some((o: SelectOption) => o.id === f))
      });
    }
  }, [workUnitId]); // eslint-disable-line react-hooks/exhaustive-deps

  return currentLocations;
};
