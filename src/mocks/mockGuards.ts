import { PolicyGroup } from 'react-guardian';
import {
  PERMISSION_EVENT_UPDATE,
  PERMISSION_EVENT_VIEW,
  PERMISSION_EVENT_WRITE,
  PERMISSION_EXCLUSION_UPDATE,
  PERMISSION_EXCLUSION_VIEW,
  PERMISSION_EXCLUSION_WRITE,
} from '../constants';
import { eventGuard, exclusionGuard } from '../util';
import * as Mock from './mockUser';

export const mockEventPolicy: PolicyGroup = eventGuard(Mock.mockUser);
export const mockExclusionPolicy: PolicyGroup = exclusionGuard(Mock.mockUser);
export const mockEventTestPolicy: PolicyGroup = ({
  view: () => ({
    authorized: Mock.MOCK_READ_ROLES.some((role: string) => Mock.mockTestUser?.authoritiesAsStrings?.includes(role)),
    message: PERMISSION_EVENT_VIEW
  }),

  create: () => ({
    authorized: Mock.MOCK_WRITE_ROLES.some((role: string) => Mock.mockTestUser?.authoritiesAsStrings?.includes(role)),
    message: PERMISSION_EVENT_WRITE
  }),

  update: () => ({
    authorized: Mock.MOCK_ADMIN_ROLES.every((role: string) => Mock.mockTestUser?.authoritiesAsStrings?.includes(role)),
    message: PERMISSION_EVENT_UPDATE
  })
});
export const mockExclusionTestPolicy: PolicyGroup = ({
  view: () => ({
    authorized: Mock.MOCK_READ_ROLES.some((role: string) => Mock.mockTestUser?.authoritiesAsStrings?.includes(role)),
    message: PERMISSION_EXCLUSION_VIEW
  }),

  create: () => ({
    authorized: Mock.MOCK_WRITE_ROLES.some((role: string) => Mock.mockTestUser?.authoritiesAsStrings?.includes(role)),
    message: PERMISSION_EXCLUSION_WRITE
  }),

  update: () => ({
    authorized: Mock.MOCK_ADMIN_ROLES.every((role: string) => Mock.mockTestUser?.authoritiesAsStrings?.includes(role)),
    message: PERMISSION_EXCLUSION_UPDATE
  })
});
