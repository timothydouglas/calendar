import cli from './cli';
import { SelectOption, ReferenceData } from '../models';

export async function fetchWorkUnits(): Promise<SelectOption[]> {
  return cli<ReferenceData[]>({
    baseURL: process.env.REACT_APP_REFERENCE_API_URL,
    url: '/workUnits/latest'
  }).then((workUnits: ReferenceData[]) =>
    workUnits?.map((o: ReferenceData) => ({
      id: o.correlationId.correlation,
      label: o.description
    })) ?? []
  );
}
