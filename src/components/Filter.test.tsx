import { fireEvent, render, RenderResult, screen } from '@testing-library/react';
import { Filter } from './Filter';
import { Filters, SelectOption } from '../models';
import { FilterProvider } from '../context';
import { FILTERS_STATE } from '../constants';

describe('Filter', () => {
  let mockFilters: Filters = { ...FILTERS_STATE };
  const mockOptions: SelectOption[] = [
    {
      id: 'test-1',
      label: 'Test 1'
    },
    {
      id: 'test-2',
      label: 'Test 2'
    },
    {
      id: 'test-3',
      label: 'Test 3'
    }
  ];
  const mockAvailableFilters: string[] = ['test-1'];
  const mockSetFilter = (filters: Filters): void => {
    mockFilters = { ...mockFilters, ...filters };
  };

  describe('options', () => {
    it('should display filters with default options', () => {
      render(
        <FilterProvider>
          <Filter
            currentFilters={mockFilters}
            id="sectionId"
            options={mockOptions}
            setFilter={mockSetFilter}
            title="Sections"
          />
        </FilterProvider>
      );
      const autoCompleteInput: HTMLElement = screen.getByRole('combobox');
      fireEvent.change(autoCompleteInput, { target: { value: 't' } });

      const autoCompleteOptions: HTMLElement[] = screen.getAllByRole('option');

      expect(autoCompleteOptions).toHaveLength(3);
    });
  });

  describe('filters', () => {
    it('should display filters with conditional options', () => {
      render(
        <FilterProvider>
          <Filter
            currentFilters={mockFilters}
            filters={mockAvailableFilters}
            id="sectionId"
            options={mockOptions}
            setFilter={mockSetFilter}
            title="Sections"
          />
        </FilterProvider>
      );
      const autoCompleteInput: HTMLElement = screen.getByRole('combobox');
      fireEvent.change(autoCompleteInput, { target: { value: 't' } });

      const autoCompleteOptions: HTMLElement[] = screen.getAllByRole('option');

      expect(autoCompleteOptions).toHaveLength(1);
    });
  });

  describe('setFilter', () => {
    it('should set selected filter to current filter', () => {
      const { rerender }: RenderResult = render(
        <FilterProvider>
          <Filter
            currentFilters={mockFilters}
            filters={mockAvailableFilters}
            id="sectionId"
            options={mockOptions}
            setFilter={mockSetFilter}
            title="Sections"
          />
        </FilterProvider>
      );
      const autoCompleteInput: HTMLElement = screen.getByRole('combobox');
      fireEvent.change(autoCompleteInput, { target: { value: 't' } });

      const autoCompleteOption: HTMLElement = screen.getByText('Test 1');
      fireEvent.click(autoCompleteOption);

      const filters: Filters = { ...FILTERS_STATE, sectionId: ['test-1'] };

      rerender(
        <FilterProvider>
          <Filter
            currentFilters={mockFilters}
            filters={mockAvailableFilters}
            id="sectionId"
            options={mockOptions}
            setFilter={mockSetFilter}
            title="Sections"
          />
        </FilterProvider>
      );

      expect(mockFilters).toStrictEqual(filters);
      expect(mockFilters.sectionId[0]).toBe(mockOptions[0].id);
    });
  });
});
