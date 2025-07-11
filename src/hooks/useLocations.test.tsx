import { renderHook, RenderHookResult, cleanup } from '@testing-library/react';
import { JSXElementConstructor, ReactNode } from 'react';
import { useLocations } from './useLocations';
import { FilterProvider } from '../context';
import { Filters, SelectOption, UseLocationsHook } from '../models';
import { mockLocations as locations } from '../mocks';
import { FILTERS_STATE } from '../constants';

describe('useLocations', () => {
  const wrapper: JSXElementConstructor<{ children: ReactNode }> = ({ children }) => <FilterProvider>{children}</FilterProvider>;
  let filters: Filters;
  let workUnitId: string[] = ['workUnit1', 'workUnit2', 'workUnit3'];
  const setFilters = (f: Filters): void => {
    filters = f;
  };

  beforeEach(() => {
    filters = { ...FILTERS_STATE };
  });

  afterEach(() => {
    cleanup();
  });

  describe('currentLocations', () => {
    it('should get locations from workUnitId', () => {
      const { result }: RenderHookResult<SelectOption[], UseLocationsHook> = renderHook(() =>
        useLocations(locations, workUnitId[0], filters, setFilters), { wrapper }
      );

      expect(result.current).toHaveLength(1);
    });

    it('should get locations from an array of workUnitIds', () => {
      const { result }: RenderHookResult<SelectOption[], UseLocationsHook> = renderHook(() =>
        useLocations(locations, workUnitId, filters, setFilters), { wrapper }
      );

      expect(result.current).toHaveLength(3);
    });

    it('should filter locationIds from current workUnitIds', () => {
      filters = {
        ...FILTERS_STATE,
        locationId: ['location1', 'location2', 'location3']
      };
      const { rerender }: RenderHookResult<SelectOption[], UseLocationsHook> = renderHook(() =>
        useLocations(locations, workUnitId, filters, setFilters), { wrapper }
      );

      workUnitId = ['workUnit1', 'workUnit2'];

      rerender({ locations, workUnitId, filters, setFilters });

      expect(filters.locationId).toHaveLength(2);
    });
  });
});
