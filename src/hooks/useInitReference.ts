import { useContext, useEffect } from 'react'
import { ApiContext, FilterContext } from '../context';
import { ApiContextProps, FilterContextProps } from '../models';

/**
 * called once at startup to fetch the reference data from the API
 */
export const useInitReference = (): void => {
  const { fetchLocations, fetchWorkUnits }: ApiContextProps = useContext(ApiContext);
  const { setLocations, setWorkUnits }: FilterContextProps = useContext(FilterContext);

  useEffect(() => {
    fetchLocations().then(setLocations);
    fetchWorkUnits().then(setWorkUnits);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
