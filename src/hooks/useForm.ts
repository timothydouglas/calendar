import {
  Dispatch,
  SetStateAction,
  useCallback,
  useState
} from 'react';
import {
  formatDateApi as format,
  isAfterValidator,
  isBeforeValidator,
  requiredValidator,
  validDateValidator
} from '../util';
import {
  Failure,
  StructError,
  type,
  validate
} from 'superstruct';
import {
  AvailableEventValidator,
  Events,
  UnavailableEventValidator,
  UseFormHook
} from '../models';
import { AnyStruct } from 'superstruct/dist/utils';

export const useForm = <D extends Events>(initialState: D): UseFormHook<D> => {
  const [event, setEvent]: [D, Dispatch<SetStateAction<D>>] = useState(initialState);
  const [errors, setErrors]: [Map<keyof D, string>, Dispatch<SetStateAction<Map<keyof D, string>>>] = useState(new Map());
  const [loading, setLoading]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);
  const [touched, setTouched]: [Record<string, boolean>, Dispatch<SetStateAction<Record<string, boolean>>>] = useState({});

  const availableEventValidators: AvailableEventValidator = type({
    label: requiredValidator,
    excludedDate: validDateValidator
  });

  const unavailableEventValidators: UnavailableEventValidator = type({
    label: requiredValidator,
    startDate: isBeforeValidator('endDate'),
    endDate: isAfterValidator('startDate'),
    recurrenceStrategy: requiredValidator
  });

  const handleChanges = <T, S extends AnyStruct>(id: string, value: T, validators: S): void => {
    const data: D = { ...event, [id]: value };
    const error: StructError = validateFields(data, validators);
    if (error && !!touched[id]) {
      setFormErrors(error);
    } else {
      setErrors(new Map());
    }
    setTouched({ ...touched, [id]: true });
    setEvent(data);
  };

  const markAllAsTouched = (data: D): void => {
    const fields: Record<string, boolean> = Object
      .keys(data)
      .reduce((acc: Record<string, boolean>, curr: string) => ({ ...acc, [curr]: true }), {});
    setTouched(fields);
  };

  const resetForm = (): void => {
    setEvent(initialState);
    setTouched({});
    setErrors(new Map());
    setLoading(false);
  };

  const setFormErrors = (error: StructError): void => {
    const failures: Failure[] = error.failures();
    const fields: Map<keyof D, string> = new Map(failures.map((f: Failure) => [f.key, f.message]));
    setErrors(fields);
  };

  const setValues = (data: D, selectedEvent: D): D => {
    const values: D = !selectedEvent ? (({ id, ...state }: D) => state as D)(data) : data;
    return {
      ...values,
      ...('startDate' in data
        ? { startDate: format(new Date(data.startDate)), endDate: format(new Date(data.endDate)) }
        : { excludedDate: format(new Date(data.excludedDate)) }
      )
    };
  };

  const toggleLoading: (loading: boolean) => void = useCallback(
    (loading: boolean) => setLoading(loading),
    [setLoading]
  );

  const validateFields = <T extends AnyStruct>(data: D, validators: T): StructError => {
    const [error]: [StructError, unknown] = validate(data, validators);
    return error;
  };

  return {
    availableEventValidators,
    event,
    errors,
    loading,
    handleChanges,
    markAllAsTouched,
    resetForm,
    setEvent,
    setFormErrors,
    setLoading,
    setValues,
    touched,
    toggleLoading,
    unavailableEventValidators,
    validateFields
  };
};
