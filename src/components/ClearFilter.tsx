import { ClearFilterProps } from '../models';
import { clsx as cx } from 'clsx';
import { FILTERS_STATE } from '../constants';

export function ClearFilter({ availableFilters, clearFilter, currentFilters }: ClearFilterProps): JSX.Element {
  const available: boolean = Object.values(availableFilters).some((o: string[]) => o?.length);
  const filter: boolean = Object.values(currentFilters).some((o: string[]) => o?.length);
  const clearFilters = (): void => clearFilter(FILTERS_STATE);

  return (
    <>
      {!!available && (
        <button
          disabled={!filter}
          className={cx('bg-blue-500 text-white font-semibold py-2 px-6 border-b-4 border-blue-700 rounded w-full', {
            'disabled:opacity-50': !filter,
            'hover:bg-blue-400 hover:border-blue-500': filter
          })}
          data-testid="clear-filter-button"
          onClick={clearFilters}
        >
          Clear filters
        </button>
      )}
    </>
  );
}
