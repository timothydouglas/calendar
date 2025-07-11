import { ReactNode } from 'react';
import { PolicyResult } from 'react-guardian';
import { Events } from '../models';

export type EventGuardFallback = (failedPolicy: PolicyResult, event: Events, index: number) => ReactNode;
