import { PolicyGroup } from 'react-guardian';
import { User } from '../models';
import {
  ADMIN_ROLES,
  READ_ROLES,
  WRITE_ROLES,
  PERMISSION_EVENT_UPDATE,
  PERMISSION_EVENT_VIEW,
  PERMISSION_EVENT_WRITE,
  PERMISSION_EXCLUSION_UPDATE,
  PERMISSION_EXCLUSION_VIEW,
  PERMISSION_EXCLUSION_WRITE,
} from '../constants';

export const eventGuard = (user: User): PolicyGroup => ({
  view: () => ({
    authorized: READ_ROLES.some((role: string) => user?.authoritiesAsStrings?.includes(role)),
    message: PERMISSION_EVENT_VIEW
  }),

  create: () => ({
    authorized: WRITE_ROLES.some((role: string) => user?.authoritiesAsStrings?.includes(role)),
    message: PERMISSION_EVENT_WRITE
  }),

  update: () => ({
    authorized: ADMIN_ROLES.every((role: string) => user?.authoritiesAsStrings?.includes(role)),
    message: PERMISSION_EVENT_UPDATE
  })
});

export const exclusionGuard = (user: User): PolicyGroup => ({
  view: () => ({
    authorized: READ_ROLES.some((role: string) => user?.authoritiesAsStrings?.includes(role)),
    message: PERMISSION_EXCLUSION_VIEW
  }),

  create: () => ({
    authorized: WRITE_ROLES.some((role: string) => user?.authoritiesAsStrings?.includes(role)),
    message: PERMISSION_EXCLUSION_WRITE
  }),

  update: () => ({
    authorized: ADMIN_ROLES.every((role: string) => user?.authoritiesAsStrings?.includes(role)),
    message: PERMISSION_EXCLUSION_UPDATE
  })
});
