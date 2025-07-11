import cli from './cli';
import { DepartmentInformation, SelectOption, Location } from '../models';

export async function fetchLocations(): Promise<SelectOption[]> {
  return cli<Location[]>({
    baseURL: process.env.REACT_APP_REFERENCE_API_URL,
    url: '/locations/latest'
  }).then((locations: Location[]) =>
    locations?.map((location: Location) => ({
      id: location.correlationId.correlation,
      label: location.code,
      data: {
        sections: location.departmentInformations
          ?.filter((d: DepartmentInformation) => d?.departmentTypeId?.correlation === 'SECTION')
          .map(({ sectionId }: DepartmentInformation) => ({
            id: sectionId.toString(),
            label: sectionId.toString()
          }) as SelectOption)
          .sort((a: SelectOption, b: SelectOption) => +a.id - +b.id),
        workUnitId: location.workUnitId?.correlation
      }
    })) ?? []
  );
}
