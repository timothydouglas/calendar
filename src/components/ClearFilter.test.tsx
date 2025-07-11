import { fireEvent, render, RenderResult, screen } from '@testing-library/react';
import { ClearFilter } from './ClearFilter';
import { Filters } from '../models';
import { FILTERS_STATE } from '../constants';

describe('ClearFilter', () => {
  let mockCurrentFilters: Filters = {
    locationId: ['location-1', 'location-2', 'location-3'],
    workUnitId: ['workUnit-1', 'workUnit-2', 'workUnit-3'],
    sectionId: ['1', '2', '3']
  };
  const clearFilterId: string = 'clear-filter-button';
  const mockAvailableFilters: Filters = {
    locationId: ['location-1', 'location-2', 'location-3', 'location-4'],
    workUnitId: ['workUnit-1', 'workUnit-2', 'workUnit-3', 'workUnit-4'],
    sectionId: ['1', '2', '3', '4', '5']
  };
  const mockFilters: Filters = { ...FILTERS_STATE };
  const mockClearFilter = (filters: Filters): void => {
    mockCurrentFilters = Object.keys(filters).reduce((acc: Filters, curr: string) => ({
      ...acc,
      [curr]: []
    }), {} as Filters);
  };

  describe('currentFilters', () => {
    it('should enable clear filters button when there are filters', () => {
      render(
        <ClearFilter
          availableFilters={mockAvailableFilters}
          currentFilters={mockCurrentFilters}
          clearFilter={mockClearFilter}
        />
      );
      const clearFilterButton: HTMLElement = screen.getByTestId(clearFilterId);

      expect(clearFilterButton).toBeEnabled();
    });

    it('should disable clear filters button when there are no filters', () => {
      render(
        <ClearFilter
          availableFilters={mockAvailableFilters}
          currentFilters={mockFilters}
          clearFilter={mockClearFilter}
        />
      );
      const clearFilterButton: HTMLElement = screen.getByTestId(clearFilterId);

      expect(clearFilterButton).toBeDisabled();
    });
  });

  describe('clearFilter', () => {
    it('should clear all filters and set disabled state on clear filters button', () => {
      const { rerender }: RenderResult = render(
        <ClearFilter
          availableFilters={mockAvailableFilters}
          currentFilters={mockCurrentFilters}
          clearFilter={mockClearFilter}
        />
      );
      const clearFilterButton: HTMLElement = screen.getByTestId(clearFilterId);

      fireEvent.click(clearFilterButton);

      rerender(
        <ClearFilter
          availableFilters={mockAvailableFilters}
          currentFilters={mockCurrentFilters}
          clearFilter={mockClearFilter}
        />
      );
      expect(mockCurrentFilters).toStrictEqual(mockFilters);
      expect(clearFilterButton).toBeDisabled();
    });
  });
});
