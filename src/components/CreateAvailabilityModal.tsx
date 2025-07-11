import { ChangeEvent, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  TextFieldProps
} from '@mui/material';
import {
  AvailableEvent,
  CreateAvailabilityModalProps,
  SelectOption,
  UseFormHook
} from '../models';
import { Modal } from './Modal';
import { useForm, useLocations, useSections } from '../hooks';
import { LABEL_PROPS } from '../constants';
import { DatePicker } from '@mui/x-date-pickers';
import { clsx as cx } from 'clsx';
import { StructError } from 'superstruct';

const initialState: AvailableEvent = {
  id: '',
  label: '',
  excludedDate: new Date(),
  createdTimestamp: new Date(),
  workUnitId: '',
  locationId: '',
  sectionId: ''
};

export function CreateAvailabilityModal({
  open,
  onClose,
  onSave,
  onDelete,
  guards,
  selectedDate,
  selectedEvent,
  locations,
  workUnits,
}: CreateAvailabilityModalProps): JSX.Element {
  const {
    event,
    errors,
    loading,
    touched,
    availableEventValidators,
    handleChanges,
    markAllAsTouched,
    resetForm,
    setEvent,
    setFormErrors,
    setLoading,
    setValues,
    toggleLoading,
    validateFields
  }: UseFormHook<AvailableEvent> = useForm(initialState);
  const currentLocations: SelectOption[] = useLocations(locations, event.workUnitId);
  const sections: SelectOption[] = useSections(locations, event.locationId);
  const title: string = selectedEvent ? 'Delete Exclusion' : 'Create Exclusion';

  useEffect(() => {
    setEvent(selectedEvent
      ? { ...selectedEvent, excludedDate: selectedEvent.excludedDate }
      : { ...event, excludedDate: selectedDate }
    );
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const clear = (): void => onDelete(selectedEvent.id, close, toggleLoading);

  const close = (): void => {
    resetForm();
    onClose();
  };

  const save = (): void => {
    const error: StructError = validateFields(event, availableEventValidators);
    markAllAsTouched(event);
    if (error) {
      setFormErrors(error);
    } else {
      const values: AvailableEvent = setValues(event, selectedEvent);
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
          disabled={!!selectedEvent}
          label="Label"
          placeholder="Add title"
          InputLabelProps={LABEL_PROPS}
          value={event.label}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            e.stopPropagation();
            handleChanges('label', e.target.value, availableEventValidators);
          }}
          helperText={touched.label && errors.get('label')}
        />
      </label>
      <label className="my-2 flex items-center justify-between mb-3">
        <span className="w-32">Date</span>
        <DatePicker
          className="w-2/3"
          label="Date"
          value={event.excludedDate}
          disabled={!!selectedEvent}
          onChange={(excludedDate: string | Date) =>
            handleChanges('excludedDate', excludedDate, availableEventValidators)
          }
          renderInput={(params: TextFieldProps) => (
            <TextField
              {...params}
              helperText={errors.get('excludedDate')}
              error={errors.has('excludedDate') && touched.excludedDate}
            />
          )}
        />
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
              disabled={!!selectedEvent}
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
              disabled={!!selectedEvent}
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
              disabled={!!selectedEvent}
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

      {!selectedEvent && (
        <div className="mt-4 text-right">
          <button
            className={cx('bg-blue-500 text-white font-semibold py-2 px-6 border-b-4 border-blue-700 rounded', {
              'disabled:opacity-50': loading,
              'hover:bg-blue-400 hover:border-blue-500': !loading,
            })}
            data-testid="available-event-save-button"
            disabled={loading}
            onClick={save}
          >
            Save
          </button>
        </div>
      )}
    </Modal>
  );
}
