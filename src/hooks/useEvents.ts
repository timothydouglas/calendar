import { AvailableEvent, DateType, EventRecord, Events, UnavailableEvent, UseEventsHook } from '../models';
import { CSSProperties } from 'react';

export const useEvents = (dateType: string, events: UnavailableEvent[], exclusions: AvailableEvent[]): UseEventsHook => {
  const { availableEvents, unavailableEvents }: EventRecord = dateType === DateType.MONTH
    ? {
      availableEvents: exclusions?.slice(0, (~~events?.length + ~~exclusions?.length > 4 ? 1 : ~~exclusions?.length)),
      unavailableEvents: events?.slice(0, (~~events?.length + ~~exclusions?.length > 4 ? 1 : ~~events?.length))
    }
    : { availableEvents: exclusions, unavailableEvents: events };
  const total: number = (~~exclusions?.length + ~~events?.length) - (~~availableEvents?.length + ~~unavailableEvents?.length);
  const setEventStyle = (event: Events): CSSProperties => {
    if (event?.theme) {
      return 'endDate' in event
        ? { background: event.theme.light, border: `1px solid ${event.theme.dark}`, color: event.theme.dark }
        : { background: event.theme.dark, color: event.theme.light };
    }
    return {};
  };

  return { availableEvents, unavailableEvents, setEventStyle, total };
}
