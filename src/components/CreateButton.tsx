import { clsx as cx } from 'clsx';
import { CreateUnavailabilityModal, CreateAvailabilityModal, CreateMenu } from '../components';
import { useMenuActions, useModal } from '../hooks';
import { CreateButtonProps, UseMenuActionsHook, UseModalHook } from '../models';

export function CreateButton({
  addUnavailableEvent,
  addAvailableEvent,
  deleteUnavailableEvent,
  deleteAvailableEvent,
  selectedDate,
  locations,
  workUnits
}: CreateButtonProps): JSX.Element {
  const { availabilityOpen, toggleAvailability, toggleUnavailability, unavailabilityOpen }: UseModalHook = useModal();
  const { anchorEl, open, handleClick, handleClose }: UseMenuActionsHook = useMenuActions();

  return (
    <>
      <button
        className={cx('hover:transition-all transition duration-300 ease-in-out hover:bg-slate-100 border p-2 rounded-full flex items-center shadow-md hover:shadow-lg', {
          'bg-slate-100': open
        })}
        data-testid="create-button"
        onClick={handleClick}
      >
        <span className="material-icons-outlined text-gray-600 text-2xl">
          add
        </span>
        <span className="pl-3 pr-7" data-testid="create-button-label">
          Create
        </span>
        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-1">
          arrow_drop_down
        </span>
      </button>
      <CreateMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        toggleAvailability={toggleAvailability}
        toggleUnavailability={toggleUnavailability}
      />
      <CreateAvailabilityModal
        open={availabilityOpen}
        onClose={toggleAvailability}
        onSave={addAvailableEvent}
        onDelete={deleteAvailableEvent}
        selectedDate={selectedDate}
        locations={locations}
        workUnits={workUnits}
      />
      <CreateUnavailabilityModal
        open={unavailabilityOpen}
        onClose={toggleUnavailability}
        onSave={addUnavailableEvent}
        onDelete={deleteUnavailableEvent}
        selectedDate={selectedDate}
        locations={locations}
        workUnits={workUnits}
      />
    </>
  );
}
