import { StructError } from 'superstruct';
import { AnyStruct } from 'superstruct/dist/utils';
import { AvailableEventValidator, Events, UnavailableEventValidator } from '../models';

export interface UseFormHook<D extends Events> {
  event: D;
  errors: Map<keyof D, string>;
  loading: boolean;
  setEvent: (event: D) => void;
  setLoading: (loading: boolean) => void;
  handleChanges: <T, S extends AnyStruct>(id: string, value: T, validators: S) => void;
  setFormErrors: (error: StructError) => void;
  availableEventValidators: AvailableEventValidator;
  unavailableEventValidators: UnavailableEventValidator;
  touched: Record<string, boolean>;
  setValues: (data: D, selectedEvent: D) => D;
  markAllAsTouched: (event: D) => void;
  resetForm: () => void;
  toggleLoading: (loading: boolean) => void;
  validateFields: <T extends AnyStruct>(data: D, validators: T) => StructError;
}
