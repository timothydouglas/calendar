import { clsx as cx } from 'clsx';
import {
  AvailableEvent,
  DateType,
  DayProps,
  Events,
  UnavailableEvent,
  UseEventsHook,
  UseGuardsHook,
  UseMenuActionsHook,
  UseModalHook
} from '../models';
import { CreateAvailabilityModal, CreateUnavailabilityModal } from '../components';
import { useEvents, useMenuActions, useModal, useGuards } from '../hooks';
import { Guard, PolicyGroup, PolicyResult } from 'react-guardian';
import { ListItemText, Menu, MenuItem, MenuList } from '@mui/material';
import { formatDay, formatDayHeader, isToday, isSameMonth, isSameDay } from '../util';

const className: Map<string, Record<string, string>> = new Map([
  [DateType.DAY, { date: 'text-3xl w-12', header: 'text-2xl' }],
  [DateType.WEEK, { date: 'text-xl w-9', header: 'text-lg' }],
  [DateType.MONTH, { date: 'text-sm w-7', header: 'text-xs' }]
]);

export function Day({
  addToast,
  day,
  dateType,
  rowIdx,
  events,
  currentDate,
  exclusions,
  addAvailableEvent,
  updateUnavailableEvent,
  deleteUnavailableEvent,
  deleteAvailableEvent,
  guards,
  locations,
  selectedDate,
  setSelectedDate,
  selectedEvent,
  setSelectedEvent,
  workUnits
}: DayProps): JSX.Element {
  const { availabilityOpen, toggleModal, toggleAvailability, toggleUnavailability, unavailabilityOpen }: UseModalHook = useModal();
  const { anchorEl, open, handleClick, handleClose }: UseMenuActionsHook = useMenuActions();
  const { availableEvents, unavailableEvents, setEventStyle, total }: UseEventsHook = useEvents(dateType, events, exclusions);
  const { eventGuardFallback, moreEventsGuardFallback }: UseGuardsHook = useGuards(addToast, handleClose);
  const { eventPolicy, exclusionPolicy }: Record<string, PolicyGroup> = guards;
  const date: string = formatDay(day);

  return (
    <div role="cell" className="bg-white relative flex flex-col">
      <header className="flex flex-col items-center">
        {rowIdx < 7 && (
          <p className={cx('font-semibold text-slate-600 mt-2 uppercase', className.get(dateType).header)}>
            {formatDayHeader(day)}
          </p>
        )}
        <p
          className={cx('p-1 text-center', className.get(dateType).date, {
            'text-slate-200': !isSameMonth(day, currentDate),
            'bg-blue-600 text-white rounded-full': isToday(day),
            'bg-blue-100 rounded-full text-blue-600 font-bold': isSameDay(day, selectedDate)
          })}
        >
          {date}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer"
        data-testid={`calendar-day-${date}`}
        onClick={() => setSelectedDate(day)}
      >
        <Guard policies={[exclusionPolicy.view]}>
          {availableEvents?.map((exclusion: AvailableEvent, i: number) =>
            <Guard
              key={i}
              policies={[exclusionPolicy.create]}
              fallback={(failedPolicy: PolicyResult) => eventGuardFallback(failedPolicy, exclusion, i)}
            >
              <div
                key={i}
                className={cx('bg-color-2 text-white rounded text-xs font-semibold p-1 "truncate ..."')}
                style={setEventStyle(exclusion)}
                onClick={() => {
                  setSelectedEvent(exclusion);
                  toggleAvailability();
                }}
              >
                {exclusion.label}
              </div>
            </Guard>
          )}
        </Guard>
        <Guard policies={[eventPolicy.view]}>
          {unavailableEvents?.map((event: UnavailableEvent, i: number) =>
            <Guard
              key={i}
              policies={[eventPolicy.create]}
              fallback={(failedPolicy: PolicyResult) => eventGuardFallback(failedPolicy, event, i)}
            >
              <div
                key={i}
                className={cx('bg-color-default text-white rounded text-xs font-semibold p-1 "truncate ..."')}
                style={setEventStyle(event)}
                onClick={() => {
                  setSelectedEvent(event);
                  toggleUnavailability();
                }}
              >
                {event.label}
              </div>
            </Guard>
          )}
        </Guard>
        {(dateType === DateType.MONTH && (events?.length + exclusions?.length) > 4) && (
          <>
            <div
              data-testid="more-events-button"
              className="rounded flex text-xs font-medium p-1 bg-color-11"
              onClick={handleClick}
            >
              <span>+{total} more</span>
              <span className="material-icons-outlined ml-auto text-sm">
                more_vert
              </span>
            </div>
            <Menu
              id="more-events-menu"
              data-testid="more-events-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuList dense>
                {[...exclusions, ...events]
                  .filter((e: Events) => ![...availableEvents, ...unavailableEvents].includes(e))
                  .map((e: Events, i: number) =>
                    <Guard
                      key={i}
                      policies={[eventPolicy.create, exclusionPolicy.create]}
                      fallback={(failedPolicy: PolicyResult) => moreEventsGuardFallback(failedPolicy, e, i)}
                    >
                      <MenuItem
                        key={i}
                        onClick={() => {
                          setSelectedEvent(e);
                          toggleModal(e);
                          handleClose();
                        }}
                      >
                        <ListItemText>{e.label}</ListItemText>
                      </MenuItem>
                    </Guard>
                  )
                }
              </MenuList>
            </Menu>
          </>
        )}
      </div>
      <CreateAvailabilityModal
        open={availabilityOpen}
        onClose={toggleAvailability}
        onSave={addAvailableEvent}
        onDelete={deleteAvailableEvent}
        guards={guards}
        selectedEvent={selectedEvent as AvailableEvent}
        selectedDate={selectedDate}
        locations={locations}
        workUnits={workUnits}
      />
      <CreateUnavailabilityModal
        open={unavailabilityOpen}
        onClose={toggleUnavailability}
        onSave={updateUnavailableEvent}
        onDelete={deleteUnavailableEvent}
        guards={guards}
        selectedEvent={selectedEvent as UnavailableEvent}
        selectedDate={selectedDate}
        locations={locations}
        workUnits={workUnits}
      />
    </div>
  );
}
