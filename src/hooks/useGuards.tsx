import { PolicyResult } from 'react-guardian';
import { clsx as cx } from 'clsx';
import { AlertColor, ListItemText, MenuItem } from '@mui/material';
import { EventGuardFallback, Events, Toast, UseGuardsHook } from '../models';
import { PERMISSION_EXCLUSION_WRITE } from '../constants';

export const useGuards = (
  addToast: (toast: Toast, type: AlertColor) => void,
  handleClose: () => void
): UseGuardsHook => {
  const eventGuardFallback: EventGuardFallback = (
    failedPolicy: PolicyResult,
    event: Events,
    i: number
  ) => {
    const exclusion: boolean = !!event && 'excludedDate' in event;
    return (
      <div
        key={i}
        className={cx('text-white rounded text-xs font-semibold p-1 "truncate ..."', {
          'bg-color-default': !exclusion,
          'bg-color-2': exclusion
        })}
        onClick={() => addToast({ permission: [failedPolicy.message] }, 'error')}
        style={{
          background: (!!event.workUnitId || !!event.locationId || !!event.sectionId) && exclusion ? event?.theme?.dark : event?.theme?.light,
          color: (!!event.workUnitId || !!event.locationId || !!event.sectionId) && exclusion ? event?.theme?.light : event?.theme?.dark,
          border: ((!!event.workUnitId || !!event.locationId || !!event.sectionId) && !exclusion) && `1px solid ${event?.theme?.dark}`
        }}
      >
        {event.label}
      </div>
    );
  };

  const moreEventsGuardFallback: EventGuardFallback = (
    failedPolicy: PolicyResult,
    event: Events,
    i: number
  ) => {
    const permission: string[] = [!!event && 'endDate' in event ? failedPolicy.message : PERMISSION_EXCLUSION_WRITE];
    return (
      <MenuItem
        key={i}
        onClick={() => {
          addToast({ permission }, 'error');
          handleClose();
        }}
      >
        <ListItemText>{event.label}</ListItemText>
      </MenuItem>
    );
  };

  return { eventGuardFallback, moreEventsGuardFallback };
}
