import { clsx as cx } from 'clsx';
import { Day } from './Day';
import { AvailableEvent, DatesProps, DateType, UnavailableEvent } from '../models';
import { getMonthArray, getWeekArray, isSameDay } from '../util';

export function Dates({
  addAvailableEvent,
  addToast,
  updateUnavailableEvent,
  deleteUnavailableEvent,
  deleteAvailableEvent,
  date,
  dateType,
  events,
  guards,
  locations,
  selectedEvent,
  setSelectedDate,
  setSelectedEvent,
  workUnits,
  selectedDate
}: DatesProps): JSX.Element {
  const dates: Map<string, Date[]> = new Map([
    [DateType.DAY, [date]],
    [DateType.WEEK, getWeekArray(date)],
    [DateType.MONTH, getMonthArray(date)]
  ]);

  return (
    <div role="grid" className={cx('flex-1 grid gap-px bg-gray-200 border border-gray-200', {
      'grid-cols-7': ['weeks', 'months'].includes(dateType),
      'grid-rows-4': dates.get(dateType)?.length === 28,
      'grid-rows-5': dates.get(dateType)?.length > 28,
      'grid-rows-6': dates.get(dateType)?.length > 35
    })}>
      {dates.get(dateType)?.map((day: Date, i: number) =>
        <Day
          addToast={addToast}
          key={i}
          day={day}
          rowIdx={i}
          dateType={dateType}
          addAvailableEvent={addAvailableEvent}
          updateUnavailableEvent={updateUnavailableEvent}
          deleteUnavailableEvent={deleteUnavailableEvent}
          deleteAvailableEvent={deleteAvailableEvent}
          events={events
            ?.filter((e: UnavailableEvent) =>
              e.unavailableDateTimes.some((d: Date) => isSameDay(day, new Date(d))) &&
              !e.availableDates.some((a: AvailableEvent) => isSameDay(day, new Date(a.excludedDate)) &&
                [e.locationId, e.workUnitId, e.sectionId].every((f: string) =>
                  [a.locationId, a.workUnitId, a.sectionId].includes(f)
                )
              )
            )
          }
          exclusions={events
            ?.reduce((acc: AvailableEvent[], curr: UnavailableEvent) => ([
              ...acc,
              ...(curr?.availableDates?.length
                ? curr.availableDates.filter((e: AvailableEvent) => isSameDay(day, new Date(e.excludedDate)))
                : []
              )
            ]), [] as AvailableEvent[])
            .filter((e: AvailableEvent, i: number, exclusions: AvailableEvent[]) =>
              exclusions.findIndex((a: AvailableEvent) => (a.id === e.id)) === i
            )
          }
          guards={guards}
          currentDate={date}
          locations={locations}
          workUnits={workUnits}
          selectedDate={selectedDate}
          selectedEvent={selectedEvent}
          setSelectedDate={setSelectedDate}
          setSelectedEvent={setSelectedEvent}
        />
      )}
    </div>
  );
}
