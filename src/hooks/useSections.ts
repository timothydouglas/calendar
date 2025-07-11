import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Filters, SelectOption } from '../models';

export const useSections = (
  locations: SelectOption[],
  locationId: string | string[],
  filters?: Filters,
  setFilters?: (filter: Filters) => void
): SelectOption[] => {
  const [sections, setSections]: [SelectOption[], Dispatch<SetStateAction<SelectOption[]>>] = useState([]);
  const getSections = (id: string): SelectOption[] => locations?.length ? locations.find((o: SelectOption) => o.id === id)?.data?.sections ?? [] : [];
  const currentSections: SelectOption[] = Array.isArray(locationId) && locationId.length
    ? locationId.flatMap((id: string) => getSections(id))
    : getSections(locationId as string);

  useEffect(() => {
    setSections(currentSections);
    if (Array.isArray(locationId)) {
      setFilters({
        ...filters,
        sectionId: filters.sectionId.filter((f: string) => currentSections.some((o: SelectOption) => o.id === f))
      });
    }
  }, [locationId]); // eslint-disable-line react-hooks/exhaustive-deps

  return sections;
};
