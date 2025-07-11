import cli from './cli'
import { CalendarEvents, Filters, UnavailableEvent } from '../models';
import { setEventTheme } from '../util';

export async function fetchEvents(
  from: string,
  to: string,
  filters?: Filters
): Promise<CalendarEvents> {
  return cli<CalendarEvents>({
    url: '/Calendar',
    params: { from, to, ...filters },
    paramsSerializer: { indexes: null }
  }).then((events: CalendarEvents) => ({
    ...events,
    unavailableDatesDTOs: events.unavailableDatesDTOs?.map((event: UnavailableEvent) => ({
      ...setEventTheme(event),
      availableDates: event.availableDates.map(setEventTheme)
    })) ?? []
  }));
}
