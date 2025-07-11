import { Colors } from './Colors.interface';

export interface Event {
  id: string;
  label: string;
  workUnitId?: string;
  locationId?: string;
  sectionId?: string;
  theme?: Colors;
}
