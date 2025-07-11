import { UnavailableEvent } from '../models';
import { add, eachDayOfInterval } from 'date-fns';
import { setEventTheme } from '../util';

const events: UnavailableEvent[] = [
  {
    id: 'test-unavailable-1',
    label: 'Test Unavailable Event',
    startDate: new Date(),
    workUnitId: 'workUnit1',
    locationId: 'location1',
    sectionId: '1',
    endDate: add(new Date(), { days: 7 }),
    recurrenceStrategy: 'None',
    unavailableDateTimes: eachDayOfInterval({
      start: new Date(),
      end: add(new Date(), { days: 7 })
    }),
    availableDates: [
      {
        id: 'test-available-1',
        label: 'Test Available Event 1',
        excludedDate: add(new Date(), { days: 2 }),
        createdTimestamp: new Date(),
        workUnitId: 'workUnit1',
        locationId: 'location1',
        sectionId: '1',
      }
    ],
    theme: { light: '#FFFFFF', dark: '#000000' }
  },
  {
    id: 'test-unavailable-2',
    label: 'Test Unavailable Event 2',
    startDate: new Date(),
    endDate: add(new Date(), { days: 1 }),
    recurrenceStrategy: 'None',
    workUnitId: 'workUnit2',
    locationId: 'location2',
    sectionId: '2',
    unavailableDateTimes: eachDayOfInterval({
      start: new Date(),
      end: add(new Date(), { days: 1 })
    }),
    availableDates: [],
    theme: { light: '#FFFFFF', dark: '#000000' }
  },
  {
    id: 'test-unavailable-3',
    label: 'Test Unavailable Event 3',
    startDate: new Date(),
    workUnitId: 'workUnit3',
    endDate: add(new Date(), { days: 1 }),
    recurrenceStrategy: 'None',
    unavailableDateTimes: eachDayOfInterval({
      start: new Date(),
      end: add(new Date(), { days: 1 })
    }),
    availableDates: [],
    theme: { light: '#FFFFFF', dark: '#000000' }
  },
  {
    id: 'test-unavailable-4',
    label: 'Test Unavailable Event 4',
    startDate: new Date(),
    endDate: add(new Date(), { days: 1 }),
    recurrenceStrategy: 'None',
    unavailableDateTimes: eachDayOfInterval({
      start: new Date(),
      end: add(new Date(), { days: 1 })
    }),
    availableDates: [],
    theme: { light: '#FFFFFF', dark: '#000000' }
  },
  {
    id: 'test-unavailable-5',
    label: 'Test Unavailable Event 5',
    startDate: new Date(),
    endDate: add(new Date(), { days: 3 }),
    recurrenceStrategy: 'Daily',
    workUnitId: 'workUnit4',
    locationId: 'location2',
    sectionId: '3',
    unavailableDateTimes: eachDayOfInterval({
      start: new Date(),
      end: add(new Date(), { days: 3 })
    }),
    availableDates: [],
    theme: { light: '#FFFFFF', dark: '#000000' }
  },
  {
    id: 'test-unavailable-6',
    label: 'Test Unavailable Event 6',
    startDate: new Date(),
    endDate: add(new Date(), { days: 1 }),
    recurrenceStrategy: 'Daily',
    workUnitId: 'workUnit2',
    locationId: 'location1',
    unavailableDateTimes: eachDayOfInterval({
      start: new Date(),
      end: add(new Date(), { days: 1 })
    }),
    availableDates: [
      {
        id: 'test-available-2',
        label: 'Test Available Event 2',
        excludedDate: new Date(),
        createdTimestamp: new Date(),
        workUnitId: 'workUnit2',
        locationId: 'location2',
        sectionId: '2'
      }
    ],
    theme: { light: '#FFFFFF', dark: '#000000' }
  }
];

export const mockEvents: UnavailableEvent[] = events.map((event: UnavailableEvent) => ({
  ...setEventTheme(event),
  availableDates: event.availableDates.map(setEventTheme)
}));
