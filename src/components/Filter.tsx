import {
  FormControl,
  Autocomplete,
  TextField,
  AutocompleteRenderInputParams
} from '@mui/material';
import { FilterProps, SelectOption } from '../models';
import { AutocompleteValue } from '@mui/base';

export function Filter({ currentFilters, options, filters, id, setFilter, title }: FilterProps): JSX.Element {
  const filterOptions: SelectOption[] = filters
    ? options.filter((o: SelectOption) => filters.includes(o.id))
    : options;

  const handleChange = (_, values: AutocompleteValue<string | SelectOption, true, false, false>): void =>
    setFilter({
      ...currentFilters,
      [id]: (values as SelectOption[]).map((o: SelectOption) => o.id)
    });

  return (
    <>
      {!!filterOptions.length && (
        <div className="mt-2">
          <h2 className="mb-1" data-testid={`filter-title-${id}`}>{title}</h2>

          <FormControl fullWidth>
            <Autocomplete
              multiple
              limitTags={3}
              id={`filter-select-${id}`}
              data-testid={`filter-select-${id}`}
              value={filterOptions.filter((o: SelectOption) => currentFilters[id].includes(o.id))}
              filterSelectedOptions
              onChange={handleChange}
              options={filterOptions}
              getOptionLabel={(option: string | SelectOption) => (option as SelectOption).label}
              renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField
                  {...params}
                  label={title}
                  placeholder={title}
                />
              )}
            />
          </FormControl>
        </div>
      )}
    </>
  );
}
