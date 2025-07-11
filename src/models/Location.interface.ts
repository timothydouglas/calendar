import { ReferenceData } from './ReferenceData.interface';
import { DepartmentInformation } from './DepartmentInformation.interface';

export interface Location extends ReferenceData {
  locationTypeId?: {
    correlation: string;
  };
  workUnitId?: {
    correlation: string;
  };
  departmentInformations?: DepartmentInformation[];
}
