import { EventGuardFallback } from '../models';

export type UseGuardsHook = {
  eventGuardFallback: EventGuardFallback;
  moreEventsGuardFallback: EventGuardFallback;
}
