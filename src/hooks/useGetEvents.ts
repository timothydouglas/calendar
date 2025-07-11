import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { ApiContext, EventContext, FilterContext } from '../context';
import { add, Duration } from 'date-fns';
import { formatDateApi, getMonthArray, weekStartDate } from '../util';
import {
  ApiContextProps,
  EventContextProps,
  DateType,
  CalendarEvents,
  FilterContextProps,
  UseGetEventsHook
} from '../models';

export const useGetEvents = (date: Date, dateType: string): UseGetEventsHook => {
  const { fetchEvents }: ApiContextProps = useContext(ApiContext);
  const { events, submitted, setSubmitted, setEvents, selectedEvent, setSelectedEvent }: EventContextProps = useContext(EventContext);
  const { availableFilters, filters, locations, setAvailableFilters, setFilters, workUnits }: FilterContextProps = useContext(FilterContext);
  const [prevDateType, setPrevDateType]: [string, Dispatch<SetStateAction<string>>] = useState('');
  const { 0: from, length: days }: Date[] = getMonthArray(date);
  const dates: Map<string, { duration: Duration, from: Date }> = new Map([
    [DateType.DAY, { duration: { days: 1 }, from: date }],
    [DateType.WEEK, { duration: { days: 7 }, from: weekStartDate(date) }],
    [DateType.MONTH, { duration: { days }, from }]
  ]);
  const to: Date = add(dates.get(dateType).from, dates.get(dateType).duration);

  useEffect(() => {
    fetchEvents(formatDateApi(dates.get(dateType).from), formatDateApi(to), filters).then(
      ({ unavailableDatesDTOs, workUnitIds: locationId, locationIds: workUnitId }: CalendarEvents) => {
        setEvents(unavailableDatesDTOs);
        if (Object.values(filters).every((f: string[]) => !f.length) || dateType !== prevDateType) {
          setPrevDateType(dateType);
          setAvailableFilters({ locationId, workUnitId });
        }
        setSubmitted(false);
      }
    );
  }, [formatDateApi(date), submitted, filters, dateType]); // eslint-disable-line react-hooks/exhaustive-deps

  return { availableFilters, events, filters, locations, selectedEvent, setFilters, setSelectedEvent, workUnits };
}
