import { ChangeEvent, useEffect } from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  TextFieldProps
} from '@mui/material';
import {
  CreateUnavailabilityModalProps,
  SelectOption,
  UnavailableEvent,
  UseFormHook,
  UseStrategiesHook
} from '../models';
import {
  useForm,
  useLocations,
  useSections,
  useStrategies
} from '../hooks';
import { clsx as cx } from 'clsx';
import { Modal } from './Modal';
import { LABEL_PROPS } from '../constants';
import { DatePicker } from '@mui/x-date-pickers';
import { StructError } from 'superstruct';

const initialState: UnavailableEvent = {
  id: '',
  label: '',
  startDate: new Date(),
  endDate: null,
  workUnitId: '',
  locationId: '',
  sectionId: '',
  recurrenceStrategy: '',
  unavailableDateTimes: [],
  availableDates: []
};

export function CreateUnavailabilityModal({
  open,
  onClose,
  onSave,
  onDelete,
  guards,
  selectedDate,
  selectedEvent,
  locations,
  workUnits
}: CreateUnavailabilityModalProps): JSX.Element {
  const {
    event,
    errors,
    loading,
    touched,
    unavailableEventValidators,
    handleChanges,
    markAllAsTouched,
    resetForm,
    setEvent,
    setFormErrors,
    setLoading,
    setValues,
    toggleLoading,
    validateFields
  }: UseFormHook<UnavailableEvent> = useForm(initialState);
  const { strategies, handleStrategy, resetStrategy }: UseStrategiesHook = useStrategies(event, setEvent);
  const currentLocations: SelectOption[] = useLocations(locations, event.workUnitId);
  const sections: SelectOption[] = useSections(locations, event.locationId);
  const title: string = selectedEvent ? 'Edit Unavailability' : 'Create Unavailability';

  useEffect(() => {
    setEvent(selectedEvent
      ? {
        ...selectedEvent,
        startDate: new Date(selectedEvent.startDate),
        endDate: new Date(selectedEvent.endDate)
      }
      : {
        ...event,
        startDate: selectedDate,
        endDate: selectedDate
      }
    );
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const clear = (): void => onDelete(selectedEvent.id, close, toggleLoading);

  const close = (): void => {
    resetForm();
    onClose();
  };

  const save = (): void => {
    const error: StructError = validateFields(event, unavailableEventValidators);
    markAllAsTouched(event);
    if (error) {
      setFormErrors(error);
    } else {
      const values: UnavailableEvent = setValues(event, selectedEvent);
      setLoading(true);
      onSave(values, close, toggleLoading);
    }
  };

  return (
    <Modal
      open={open}
      onClose={close}
      title={title}
      clear={selectedEvent && clear}
      guards={guards}
    >
      <label className="my-2 flex items-center justify-between mb-3">
        <span className="w-32">Label</span>
        <TextField
          className="w-2/3"
          error={errors.has('label') && touched.label}
          id="label"
          label="Label"
          placeholder="Add title"
          InputLabelProps={LABEL_PROPS}
          value={event.label}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            e.stopPropagation();
            handleChanges('label', e.target.value, unavailableEventValidators);
          }}
          helperText={touched.label && errors.get('label')}
        />
      </label>
      <label className="my-2 flex items-center justify-between mb-3">
        <span className="w-32">Start Date</span>
        <DatePicker
          className="w-2/3"
          label="Start Date"
          value={event.startDate}
          onChange={(startDate: string | Date) =>
            handleChanges('startDate', startDate, unavailableEventValidators)
          }
          onAccept={resetStrategy}
          renderInput={(params: TextFieldProps) => (
            <TextField
              {...params}
              onChange={() => resetStrategy()}
              helperText={touched.startDate && errors.get('startDate')}
              error={errors.has('startDate') && touched.startDate}
            />
          )}
        />
      </label>
      <label className="my-2 flex items-center justify-between mb-3">
        <span className="w-32">End Date</span>
        <DatePicker
          className="w-2/3"
          label="End Date"
          value={event.endDate}
          onChange={(endDate: string | Date) =>
            handleChanges('endDate', endDate, unavailableEventValidators)
          }
          renderInput={(params: TextFieldProps) => (
            <TextField
              {...params}
              helperText={touched.endDate && errors.get('endDate')}
              error={errors.has('endDate') && touched.endDate}
            />
          )}
        />
      </label>
      <label className="my-2 flex items-center justify-between mb-3">
        <span className="w-32">Recurrence Strategy</span>
        <FormControl className="w-2/3" error={!!strategies.length && errors.has('recurrenceStrategy') && touched.recurrenceStrategy}>
          <InputLabel id="recurrenceStrategy">Recurrence Strategy</InputLabel>
          <Select
            id="recurrenceStrategy"
            variant="outlined"
            disabled={!strategies.length}
            value={event.recurrenceStrategy}
            error={errors.has('recurrenceStrategy') && touched.recurrenceStrategy}
            label="Recurrence Strategy"
            onChange={({ target: { value } }: SelectChangeEvent) => {
              handleChanges('recurrenceStrategy', value, unavailableEventValidators);
              handleStrategy(value);
            }}>
            {strategies.map(({ id, label }: SelectOption, i: number) => (
              <MenuItem key={i} value={id}>{label}</MenuItem>
            ))}
          </Select>
          {!!strategies.length && touched.recurrenceStrategy && (
            <FormHelperText>{errors.get('recurrenceStrategy')}</FormHelperText>
          )}
        </FormControl>
      </label>
      {!!workUnits?.length && (
        <label className="my-2 flex items-center justify-between mb-3">
          <span className="w-32">Work Unit</span>
          <FormControl className="w-2/3">
            <InputLabel id="workUnit">Work Unit</InputLabel>
            <Select
              id="workUnit"
              variant="outlined"
              value={event.workUnitId}
              label="Work Unit"
              onChange={({ target: { value: workUnitId } }: SelectChangeEvent) =>
                setEvent({
                  ...event,
                  workUnitId,
                  locationId: '',
                  sectionId: ''
                })
              }>
              {workUnits.map(({ id, label }: SelectOption, i: number) => (
                <MenuItem key={i} value={id}>{label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </label>
      )}
      {!!currentLocations?.length && (
        <label className="my-2 flex items-center justify-between mb-3">
          <span className="w-32">Location</span>
          <FormControl className="w-2/3">
            <InputLabel id="location">Location</InputLabel>
            <Select
              id="location"
              variant="outlined"
              value={event.locationId}
              label="Location"
              onChange={({ target: { value: locationId } }: SelectChangeEvent) =>
                setEvent({ ...event, locationId, sectionId: '' })
              }>
              {currentLocations.map(({ id, label }: SelectOption, i: number) => (
                <MenuItem key={i} value={id}>{label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </label>
      )}
      {!!sections?.length && (
        <label className="my-2 flex items-center justify-between">
          <span className="w-32">Section</span>
          <FormControl className="w-2/3">
            <InputLabel id="section">Section</InputLabel>
            <Select
              id="section"
              variant="outlined"
              value={event.sectionId}
              label="Section"
              onChange={({ target: { value: sectionId } }: SelectChangeEvent) =>
                setEvent({ ...event, sectionId })
              }>
              {sections.map(({ id, label }: SelectOption, i: number) => (
                <MenuItem key={i} value={id}>{label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </label>
      )}

      <div className="mt-4 text-right">
        <button
          className={cx('bg-blue-500 text-white font-semibold py-2 px-6 border-b-4 border-blue-700 rounded', {
            'disabled:opacity-50': loading,
            'hover:bg-blue-400 hover:border-blue-500': !loading
          })}
          data-testid="unavailable-event-save-button"
          disabled={loading}
          onClick={save}
        >
          Save
        </button>
      </div>
    </Modal>
  );
}
