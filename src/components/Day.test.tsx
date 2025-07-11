import { fireEvent, render, RenderResult, screen } from '@testing-library/react';
import { EventProvider, LocaleProvider, ToastProvider, SelectedDateProvider } from '../context';
import { Day, Toast } from '../components';
import { add } from 'date-fns';
import { formatDateApi, formatDay } from '../util';
import { AlertColor } from '@mui/material';
import { AvailableEvent, Events, Toast as IToast, UnavailableEvent } from '../models';
import { PERMISSION_EVENT_WRITE, PERMISSION_EXCLUSION_WRITE } from '../constants';
import {
  mockEventPolicy as eventPolicy,
  mockExclusionPolicy as exclusionPolicy,
  mockDateType,
  mockEventTestPolicy,
  mockEvents,
  mockExclusionTestPolicy
} from '../mocks';

describe('Day', () => {
  let mockSelectedDate: Date = new Date();
  let mockSelectedEvent: Events = undefined;
  let mockToast: IToast = {};
  let mockToastType: AlertColor = 'error';
  const mockDay: Date = add(new Date(), { days: 1 });
  const mockCurrentDate: Date = new Date();
  const mockAvailableEvents: AvailableEvent[] = [
    {
      id: 'test-available-1',
      label: 'Test Available Event 1',
      excludedDate: add(new Date(), { days: 8 }),
      createdTimestamp: new Date(),
      theme: { light: '#FFFFFF', dark: '#000000' }
    },
    {
      id: 'test-available-2',
      label: 'Test Available Event 2',
      excludedDate: new Date(),
      createdTimestamp: new Date(),
      theme: { light: '#FFFFFF', dark: '#000000' }
    }
  ];
  const mockEventToast: IToast = { permissions: [PERMISSION_EVENT_WRITE] };
  const mockExclusionToast: IToast = { permissions: [PERMISSION_EXCLUSION_WRITE] };

  const mockSetSelectedDate = (date: Date): void => {
    mockSelectedDate = new Date(date);
  };
  const mockSetSelectedEvent = (e: Events): void => {
    mockSelectedEvent = e;
  };
  const mockAddToast = (toast: IToast, type: AlertColor): void => {
    mockToast = toast;
    mockToastType = type;
  };

  beforeEach(() => {
    mockSelectedEvent = undefined;
  });

  describe('setSelectedDate', () => {
    it('should set the selected date to current date', () => {
      render(
        <LocaleProvider>
          <ToastProvider>
            <SelectedDateProvider>
              <Day
                addToast={mockAddToast}
                addAvailableEvent={undefined}
                rowIdx={0}
                exclusions={mockAvailableEvents}
                currentDate={mockCurrentDate}
                dateType={mockDateType.id}
                deleteUnavailableEvent={undefined}
                deleteAvailableEvent={undefined}
                updateUnavailableEvent={undefined}
                day={mockDay}
                events={mockEvents}
                guards={{ eventPolicy, exclusionPolicy }}
                locations={[]}
                selectedDate={mockSelectedDate}
                selectedEvent={mockSelectedEvent}
                setSelectedDate={mockSetSelectedDate}
                setSelectedEvent={mockSetSelectedEvent}
                workUnits={[]}
              />
            </SelectedDateProvider>
          </ToastProvider>
        </LocaleProvider>
      );
      const calendarDay: HTMLElement = screen.queryByTestId(`calendar-day-${formatDay(mockDay)}`);
      fireEvent.click(calendarDay);

      expect(formatDateApi(mockSelectedDate)).toStrictEqual(formatDateApi(mockDay));
    });
  });

  describe('setSelectedEvent', () => {
    it('should set the selected event to unavailable event', () => {
      render(
        <LocaleProvider>
          <ToastProvider>
            <EventProvider>
              <Day
                addToast={mockAddToast}
                addAvailableEvent={undefined}
                rowIdx={0}
                exclusions={undefined}
                currentDate={mockCurrentDate}
                dateType={mockDateType.id}
                deleteUnavailableEvent={undefined}
                deleteAvailableEvent={undefined}
                updateUnavailableEvent={undefined}
                day={mockDay}
                events={mockEvents}
                guards={{ eventPolicy, exclusionPolicy }}
                locations={[]}
                selectedDate={mockSelectedDate}
                selectedEvent={mockSelectedEvent}
                setSelectedDate={mockSetSelectedDate}
                setSelectedEvent={mockSetSelectedEvent}
                workUnits={[]}
              />
            </EventProvider>
          </ToastProvider>
        </LocaleProvider>
      );
      const calendarEvent: HTMLElement = screen.getByText(mockEvents[0].label);
      fireEvent.click(calendarEvent);

      expect(mockSelectedEvent).toStrictEqual(mockEvents[0]);
    });

    it('should set the selected event to available event', () => {
      render(
        <LocaleProvider>
          <ToastProvider>
            <EventProvider>
              <Day
                addToast={mockAddToast}
                addAvailableEvent={undefined}
                rowIdx={0}
                exclusions={mockAvailableEvents}
                currentDate={mockCurrentDate}
                dateType={mockDateType.id}
                deleteUnavailableEvent={undefined}
                deleteAvailableEvent={undefined}
                updateUnavailableEvent={undefined}
                day={mockDay}
                events={mockEvents}
                guards={{ eventPolicy, exclusionPolicy }}
                locations={[]}
                selectedDate={mockSelectedDate}
                selectedEvent={mockSelectedEvent}
                setSelectedDate={mockSetSelectedDate}
                setSelectedEvent={mockSetSelectedEvent}
                workUnits={[]}
              />
            </EventProvider>
          </ToastProvider>
        </LocaleProvider>
      );
      const calendarEvent: HTMLElement = screen.getByText(mockAvailableEvents[0].label);
      fireEvent.click(calendarEvent);

      expect(mockSelectedEvent).toStrictEqual(mockAvailableEvents[0]);
    });

    it('should set the selected event within more events menu to unavailable event', () => {
      const { rerender }: RenderResult = render(
        <LocaleProvider>
          <ToastProvider>
            <EventProvider>
              <Day
                addToast={mockAddToast}
                addAvailableEvent={undefined}
                rowIdx={0}
                exclusions={mockAvailableEvents}
                currentDate={mockCurrentDate}
                dateType={mockDateType.id}
                deleteUnavailableEvent={undefined}
                deleteAvailableEvent={undefined}
                updateUnavailableEvent={undefined}
                day={mockDay}
                events={mockEvents}
                guards={{ eventPolicy, exclusionPolicy }}
                locations={[]}
                selectedDate={mockSelectedDate}
                selectedEvent={mockSelectedEvent}
                setSelectedDate={mockSetSelectedDate}
                setSelectedEvent={mockSetSelectedEvent}
                workUnits={[]}
              />
            </EventProvider>
          </ToastProvider>
        </LocaleProvider>
      );

      const moreEventsButton: HTMLElement = screen.getByTestId('more-events-button');
      fireEvent.click(moreEventsButton);

      const unavailableEventMoreButton: HTMLElement = screen.getByText('Test Unavailable Event 6');
      fireEvent.click(unavailableEventMoreButton);

      expect((mockSelectedEvent as AvailableEvent)?.excludedDate).toBeFalsy();

      rerender(
        <LocaleProvider>
          <ToastProvider>
            <EventProvider>
              <Day
                addToast={mockAddToast}
                addAvailableEvent={undefined}
                rowIdx={0}
                exclusions={mockAvailableEvents}
                currentDate={mockCurrentDate}
                dateType={mockDateType.id}
                deleteUnavailableEvent={undefined}
                deleteAvailableEvent={undefined}
                updateUnavailableEvent={undefined}
                day={mockDay}
                events={mockEvents}
                guards={{ eventPolicy, exclusionPolicy }}
                locations={[]}
                selectedDate={mockSelectedDate}
                selectedEvent={mockSelectedEvent}
                setSelectedDate={mockSetSelectedDate}
                setSelectedEvent={mockSetSelectedEvent}
                workUnits={[]}
              />
            </EventProvider>
          </ToastProvider>
        </LocaleProvider>
      );

      const editEventModal: HTMLElement = screen.getByText('Edit Unavailability');

      expect(editEventModal).toBeTruthy();
    });

    it('should set the selected event within more events menu to available event', () => {
      const { rerender }: RenderResult = render(
        <LocaleProvider>
          <ToastProvider>
            <EventProvider>
              <Day
                addToast={mockAddToast}
                addAvailableEvent={undefined}
                rowIdx={0}
                exclusions={mockAvailableEvents}
                currentDate={mockCurrentDate}
                dateType={mockDateType.id}
                deleteUnavailableEvent={undefined}
                deleteAvailableEvent={undefined}
                updateUnavailableEvent={undefined}
                day={mockDay}
                events={mockEvents}
                guards={{ eventPolicy, exclusionPolicy }}
                locations={[]}
                selectedDate={mockSelectedDate}
                selectedEvent={mockSelectedEvent}
                setSelectedDate={mockSetSelectedDate}
                setSelectedEvent={mockSetSelectedEvent}
                workUnits={[]}
              />
            </EventProvider>
          </ToastProvider>
        </LocaleProvider>
      );

      const moreEventsButton: HTMLElement = screen.getByTestId('more-events-button');
      fireEvent.click(moreEventsButton);

      const availableEventMoreButton: HTMLElement = screen.getByText('Test Available Event 2');
      fireEvent.click(availableEventMoreButton);

      expect((mockSelectedEvent as AvailableEvent)?.excludedDate).toBeTruthy();

      rerender(
        <LocaleProvider>
          <ToastProvider>
            <EventProvider>
              <Day
                addToast={mockAddToast}
                addAvailableEvent={undefined}
                rowIdx={0}
                exclusions={mockAvailableEvents}
                currentDate={mockCurrentDate}
                dateType={mockDateType.id}
                deleteUnavailableEvent={undefined}
                deleteAvailableEvent={undefined}
                updateUnavailableEvent={undefined}
                day={mockDay}
                events={mockEvents}
                guards={{ eventPolicy, exclusionPolicy }}
                locations={[]}
                selectedDate={mockSelectedDate}
                selectedEvent={mockSelectedEvent}
                setSelectedDate={mockSetSelectedDate}
                setSelectedEvent={mockSetSelectedEvent}
                workUnits={[]}
              />
            </EventProvider>
          </ToastProvider>
        </LocaleProvider>
      );
      const editExclusionModal: HTMLElement = screen.getByText('Delete Exclusion');

      expect(editExclusionModal).toBeTruthy();
    });

    describe('Guards', () => {
      it('should not open selected event when permissions are read only', () => {
        const { container, rerender }: RenderResult = render(
          <LocaleProvider>
            <ToastProvider>
              <Day
                addToast={() => mockAddToast(mockEventToast, mockToastType)}
                addAvailableEvent={undefined}
                rowIdx={0}
                exclusions={mockAvailableEvents}
                currentDate={mockCurrentDate}
                dateType={mockDateType.id}
                deleteUnavailableEvent={undefined}
                deleteAvailableEvent={undefined}
                updateUnavailableEvent={undefined}
                day={mockDay}
                events={mockEvents}
                guards={{eventPolicy: mockEventTestPolicy, exclusionPolicy: mockExclusionTestPolicy}}
                locations={[]}
                selectedDate={mockSelectedDate}
                selectedEvent={mockSelectedEvent}
                setSelectedDate={mockSetSelectedDate}
                setSelectedEvent={mockSetSelectedEvent}
                workUnits={[]}
              />
              <Toast toast={mockToast} type={mockToastType} />
            </ToastProvider>
          </LocaleProvider>
        );

        const calendarEvent: HTMLElement = screen.getByText(mockEvents[0].label);
        fireEvent.click(calendarEvent);

        rerender(
          <LocaleProvider>
            <ToastProvider>
              <Day
                addToast={() => mockAddToast(mockEventToast, mockToastType)}
                addAvailableEvent={undefined}
                rowIdx={0}
                exclusions={mockAvailableEvents}
                currentDate={mockCurrentDate}
                dateType={mockDateType.id}
                deleteUnavailableEvent={undefined}
                deleteAvailableEvent={undefined}
                updateUnavailableEvent={undefined}
                day={mockDay}
                events={mockEvents}
                guards={{eventPolicy: mockEventTestPolicy, exclusionPolicy: mockExclusionTestPolicy}}
                locations={[]}
                selectedDate={mockSelectedDate}
                selectedEvent={mockSelectedEvent}
                setSelectedDate={mockSetSelectedDate}
                setSelectedEvent={mockSetSelectedEvent}
                workUnits={[]}
              />
              <Toast toast={mockToast} type={mockToastType} />
            </ToastProvider>
          </LocaleProvider>
        );

        const toastMessage: HTMLElement = screen.getByText(PERMISSION_EVENT_WRITE);
        expect(container).toContainElement(toastMessage);
      });

      it('should not open selected exclusion when permissions are read only', () => {
        const mockedEvents: UnavailableEvent[] = mockEvents.slice(2, 0);
        const availableEvents: AvailableEvent[] = [
          ...mockAvailableEvents,
          {
            id: 'test-available-3',
            label: 'Test Available Event 3',
            excludedDate: new Date(),
            createdTimestamp: new Date(),
            workUnitId: 'workUnitId'
          }
        ];
        const { container, rerender }: RenderResult = render(
          <LocaleProvider>
            <ToastProvider>
              <Day
                addToast={() => mockAddToast(mockExclusionToast, mockToastType)}
                addAvailableEvent={undefined}
                rowIdx={0}
                exclusions={availableEvents}
                currentDate={mockCurrentDate}
                dateType={mockDateType.id}
                deleteUnavailableEvent={undefined}
                deleteAvailableEvent={undefined}
                updateUnavailableEvent={undefined}
                day={mockDay}
                events={mockedEvents}
                guards={{eventPolicy: mockEventTestPolicy, exclusionPolicy: mockExclusionTestPolicy}}
                locations={[]}
                selectedDate={mockSelectedDate}
                selectedEvent={mockSelectedEvent}
                setSelectedDate={mockSetSelectedDate}
                setSelectedEvent={mockSetSelectedEvent}
                workUnits={[]}
              />
              <Toast toast={mockToast} type={mockToastType} />
            </ToastProvider>
          </LocaleProvider>
        );

        const calendarEvent: HTMLElement = screen.getByText(mockAvailableEvents[0].label);
        fireEvent.click(calendarEvent);

        rerender(
          <LocaleProvider>
            <ToastProvider>
              <Day
                addToast={() => mockAddToast(mockExclusionToast, mockToastType)}
                addAvailableEvent={undefined}
                rowIdx={0}
                exclusions={availableEvents}
                currentDate={mockCurrentDate}
                dateType={mockDateType.id}
                deleteUnavailableEvent={undefined}
                deleteAvailableEvent={undefined}
                updateUnavailableEvent={undefined}
                day={mockDay}
                events={mockedEvents}
                guards={{eventPolicy: mockEventTestPolicy, exclusionPolicy: mockExclusionTestPolicy}}
                locations={[]}
                selectedDate={mockSelectedDate}
                selectedEvent={mockSelectedEvent}
                setSelectedDate={mockSetSelectedDate}
                setSelectedEvent={mockSetSelectedEvent}
                workUnits={[]}
              />
              <Toast toast={mockToast} type={mockToastType} />
            </ToastProvider>
          </LocaleProvider>
        );

        const toastMessage: HTMLElement = screen.getByText(PERMISSION_EXCLUSION_WRITE);
        expect(container).toContainElement(toastMessage);
      });

      it('should not open the selected exclusion within more events menu when invalid permissions', () => {
        const { container, rerender }: RenderResult = render(
          <LocaleProvider>
            <ToastProvider>
              <Day
                addToast={() => mockAddToast(mockExclusionToast, mockToastType)}
                addAvailableEvent={undefined}
                rowIdx={0}
                exclusions={mockAvailableEvents}
                currentDate={mockCurrentDate}
                dateType={mockDateType.id}
                deleteUnavailableEvent={undefined}
                deleteAvailableEvent={undefined}
                updateUnavailableEvent={undefined}
                day={mockDay}
                events={mockEvents}
                guards={{eventPolicy: mockEventTestPolicy, exclusionPolicy: mockExclusionTestPolicy}}
                locations={[]}
                selectedDate={mockSelectedDate}
                selectedEvent={mockSelectedEvent}
                setSelectedDate={mockSetSelectedDate}
                setSelectedEvent={mockSetSelectedEvent}
                workUnits={[]}
              />
              <Toast toast={mockToast} type={mockToastType} />
            </ToastProvider>
          </LocaleProvider>
        );

        const moreEventsButton: HTMLElement = screen.getByTestId('more-events-button');
        fireEvent.click(moreEventsButton);

        const availableEventMoreButton: HTMLElement = screen.getByText('Test Available Event 2');
        fireEvent.click(availableEventMoreButton);

        rerender(
          <LocaleProvider>
            <ToastProvider>
              <Day
                addToast={mockAddToast}
                addAvailableEvent={undefined}
                rowIdx={0}
                exclusions={mockAvailableEvents}
                currentDate={mockCurrentDate}
                dateType={mockDateType.id}
                deleteUnavailableEvent={undefined}
                deleteAvailableEvent={undefined}
                updateUnavailableEvent={undefined}
                day={mockDay}
                events={mockEvents}
                guards={{eventPolicy: mockEventTestPolicy, exclusionPolicy: mockExclusionTestPolicy}}
                locations={[]}
                selectedDate={mockSelectedDate}
                selectedEvent={mockSelectedEvent}
                setSelectedDate={mockSetSelectedDate}
                setSelectedEvent={mockSetSelectedEvent}
                workUnits={[]}
              />
              <Toast toast={mockToast} type={mockToastType} />
            </ToastProvider>
          </LocaleProvider>
        );

        const toastMessage: HTMLElement = screen.getByText(PERMISSION_EXCLUSION_WRITE);
        expect(container).toContainElement(toastMessage);
      });

      it('should not open the selected event within more events menu when invalid permissions', () => {
        const { container, rerender }: RenderResult = render(
          <LocaleProvider>
            <ToastProvider>
              <Day
                addToast={() => mockAddToast(mockEventToast, mockToastType)}
                addAvailableEvent={undefined}
                rowIdx={0}
                exclusions={mockAvailableEvents}
                currentDate={mockCurrentDate}
                dateType={mockDateType.id}
                deleteUnavailableEvent={undefined}
                deleteAvailableEvent={undefined}
                updateUnavailableEvent={undefined}
                day={mockDay}
                events={mockEvents}
                guards={{eventPolicy: mockEventTestPolicy, exclusionPolicy: mockExclusionTestPolicy}}
                locations={[]}
                selectedDate={mockSelectedDate}
                selectedEvent={mockSelectedEvent}
                setSelectedDate={mockSetSelectedDate}
                setSelectedEvent={mockSetSelectedEvent}
                workUnits={[]}
              />
              <Toast toast={mockToast} type={mockToastType} />
            </ToastProvider>
          </LocaleProvider>
        );

        const moreEventsButton: HTMLElement = screen.getByTestId('more-events-button');
        fireEvent.click(moreEventsButton);

        const unavailableEventMoreButton: HTMLElement = screen.getByText('Test Unavailable Event 6');
        fireEvent.click(unavailableEventMoreButton);

        rerender(
          <LocaleProvider>
            <ToastProvider>
              <Day
                addToast={mockAddToast}
                addAvailableEvent={undefined}
                rowIdx={0}
                exclusions={mockAvailableEvents}
                currentDate={mockCurrentDate}
                dateType={mockDateType.id}
                deleteUnavailableEvent={undefined}
                deleteAvailableEvent={undefined}
                updateUnavailableEvent={undefined}
                day={mockDay}
                events={mockEvents}
                guards={{eventPolicy: mockEventTestPolicy, exclusionPolicy: mockExclusionTestPolicy}}
                locations={[]}
                selectedDate={mockSelectedDate}
                selectedEvent={mockSelectedEvent}
                setSelectedDate={mockSetSelectedDate}
                setSelectedEvent={mockSetSelectedEvent}
                workUnits={[]}
              />
              <Toast toast={mockToast} type={mockToastType} />
            </ToastProvider>
          </LocaleProvider>
        );

        const toastMessage: HTMLElement = screen.getByText(PERMISSION_EVENT_WRITE);
        expect(container).toContainElement(toastMessage);
      });
    });
  });
});
