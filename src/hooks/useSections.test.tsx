import { renderHook, RenderHookResult, cleanup } from '@testing-library/react';
import { useSections } from './useSections';
import { Filters, SelectOption, UseSectionsHook } from '../models';
import { mockLocations as locations } from '../mocks';
import { JSXElementConstructor, ReactNode } from 'react';
import { FilterProvider } from '../context';
import { FILTERS_STATE } from '../constants';

describe('useSections', () => {
  const wrapper: JSXElementConstructor<{ children: ReactNode }> = ({ children }) => <FilterProvider>{children}</FilterProvider>;
  let filters: Filters;
  let locationId: string[] = ['location1', 'location2'];
  const setFilters = (f: Filters): void => {
    filters = f;
  };

  beforeEach(() => {
    filters = { ...FILTERS_STATE };
  });

  afterEach(() => {
    cleanup();
  });

  describe('currentSections', () => {
    it('should get sections from locationId', () => {
      const { result }: RenderHookResult<SelectOption[], UseSectionsHook> = renderHook(() =>
        useSections(locations, locationId[0], filters, setFilters), { wrapper }
      );

      expect(result.current).toHaveLength(3);
    });

    it('should get sections from an array of locationIds', () => {
      const { result }: RenderHookResult<SelectOption[], UseSectionsHook> = renderHook(() =>
        useSections(locations, locationId, filters, setFilters), { wrapper }
      );

      expect(result.current).toHaveLength(6);
    });

    it('should filter sectionIds from current locationIds', () => {
      filters = {
        ...FILTERS_STATE,
        sectionId: ['section1', 'section2', 'section4', 'section5', 'section6']
      };
      const { rerender }: RenderHookResult<SelectOption[], UseSectionsHook> = renderHook(() =>
        useSections(locations, locationId, filters, setFilters), { wrapper }
      );

      locationId = ['location2'];

      rerender({ locations, locationId, filters, setFilters });

      expect(filters.sectionId).toHaveLength(3);
    });
  });
});
