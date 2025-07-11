// Days of the week: 0 - 6, 0 = Sunday
import { Filters } from './models';

export const WEEK_START: number = 0;
// Days of the week: 0 - 6, 6 = Saturday
export const WEEK_END: number = 6;
export const TOAST_TIMER: number = 6000;
export const VALIDATOR_REQUIRED: string = 'This is a required field';
export const VALIDATOR_VALID_DATE: string = 'Please enter a valid date';
export const VALIDATOR_DATE_BEFORE: string = 'Start date must be before End date';
export const VALIDATOR_DATE_AFTER: string = 'End date must be after Start date';
export const PERMISSION_EVENT_VIEW: string = 'You must have read permissions to view an event.'
export const PERMISSION_EVENT_WRITE: string = 'You must have write permissions to create an event.'
export const PERMISSION_EVENT_UPDATE: string = 'You must have admin permissions to update an event.'
export const PERMISSION_EXCLUSION_VIEW: string = 'You must have read permissions to view an exclusion.'
export const PERMISSION_EXCLUSION_WRITE: string = 'You must have write permissions to create an exclusion.'
export const PERMISSION_EXCLUSION_UPDATE: string = 'You must have admin permissions to update an exclusion.'
export const LABEL_PROPS: Record<string, boolean> = { shrink: true };
export const READ_ROLES: string[] = ['ROLE_OPSCAL_DEV', 'ROLE_CFC_ADMINS'];
export const WRITE_ROLES: string[] = ['ROLE_OPSCAL_DEV', 'ROLE_CFC_ADMINS'];
export const ADMIN_ROLES: string[] = ['ROLE_CFC_ADMINS'];
export const FILTERS_STATE: Filters = { locationId: [], workUnitId: [], sectionId: [] };
export const { locationId, workUnitId, sectionId }: Filters = FILTERS_STATE;
