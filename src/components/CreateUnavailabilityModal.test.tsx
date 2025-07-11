import { fireEvent, render, RenderResult, screen, within } from '@testing-library/react';
import { CreateUnavailabilityModal } from './CreateUnavailabilityModal';
import { UnavailableEvent } from '../models';
import { add, eachDayOfInterval } from 'date-fns';
import { LocaleProvider } from '../context';
import { VALIDATOR_DATE_AFTER, VALIDATOR_DATE_BEFORE, VALIDATOR_REQUIRED, VALIDATOR_VALID_DATE } from '../constants';
import {
  mockLocations,
  mockWorkUnits,
  mockUnavailableEvent as mockInitialState,
  mockEventPolicy as eventPolicy,
  mockExclusionPolicy as exclusionPolicy,
  mockUser,
} from '../mocks';
import { formatDayMonth, formatDayWeek, getNthWeekOfMonth } from '../util';

describe('CreateUnavailabilityModal', () => {
  let mockOpen: boolean = false;
  let mockEvent: UnavailableEvent = undefined;
  const mockDay: Date = add(new Date(), { days: 1 });
  const mockUnavailableEvent: UnavailableEvent = {
    id: 'test-unavailable-1',
    label: 'Test Unavailable Event',
    startDate: new Date('2023-03-25'),
    endDate: add(new Date(), { days: 3 }),
    recurrenceStrategy: '',
    workUnitId: 'workUnit1',
    locationId: 'location1',
    sectionId: '',
    unavailableDateTimes: eachDayOfInterval({
      start: new Date(),
      end: add(new Date(), { days: 3 })
    }),
    availableDates: [
      {
        id: 'test-available-1',
        label: 'Test Available Event',
        excludedDate: add(new Date(), { days: 8 }),
        createdTimestamp: new Date()
      }
    ]
  };
  const mockClose = (): void => {
    mockEvent = mockInitialState;
    mockOpen = false;
  };
  const mockAddUnavailableEvent = (e: Partial<UnavailableEvent>, close: () => void, setLoading: (loading: boolean) => void): void => {
    mockEvent = { ...mockEvent, ...e };
    setLoading(false);
    close();
  };
  const mockDeleteUnavailableEvent = (id: string, close: () => void, setLoading: (loading: boolean) => void): void => {
    setLoading(false);
    close();
  };

  beforeEach(() => {
    mockEvent = mockInitialState;
    mockOpen = true;
  });

  describe('onClose', () => {
    it('should close unavailable event modal', () => {
      const { container, rerender }: RenderResult = render(
        <LocaleProvider>
          <CreateUnavailabilityModal
            open={mockOpen}
            onClose={mockClose}
            onSave={mockAddUnavailableEvent}
            onDelete={mockDeleteUnavailableEvent}
            guards={{ eventPolicy, exclusionPolicy }}
            selectedEvent={mockUnavailableEvent}
            selectedDate={mockDay}
            locations={mockLocations}
            workUnits={mockWorkUnits}
          />
        </LocaleProvider>
      );
      const unavailableHeader: HTMLElement = screen.getByTestId('modal-title');
      const unavailableCloseButton: HTMLElement = screen.queryByTestId('modal-close-button');
      fireEvent.click(unavailableCloseButton);

      rerender(
        <LocaleProvider>
          <CreateUnavailabilityModal
            open={mockOpen}
            onClose={mockClose}
            onSave={mockAddUnavailableEvent}
            onDelete={mockDeleteUnavailableEvent}
            guards={{ eventPolicy, exclusionPolicy }}
            selectedEvent={mockUnavailableEvent}
            selectedDate={mockDay}
            locations={mockLocations}
            workUnits={mockWorkUnits}
          />
        </LocaleProvider>
      );

      expect(mockEvent).toStrictEqual(mockInitialState);
      expect(container).not.toContainElement(unavailableHeader);
    });
  });

  describe('onDelete', () => {
    it('should close unavailable event modal when event has been deleted', () => {
      const { container, rerender }: RenderResult = render(
        <LocaleProvider>
          <CreateUnavailabilityModal
            open={mockOpen}
            onClose={mockClose}
            onSave={mockAddUnavailableEvent}
            onDelete={mockDeleteUnavailableEvent}
            guards={{ eventPolicy, exclusionPolicy }}
            selectedEvent={mockUnavailableEvent}
            selectedDate={mockDay}
            locations={mockLocations}
            workUnits={mockWorkUnits}
          />
        </LocaleProvider>
      );
      const unavailableHeader: HTMLElement = screen.getByTestId('modal-title');
      const unavailableClearButton: HTMLElement = screen.queryByTestId('modal-clear-button');
      fireEvent.click(unavailableClearButton);

      rerender(
        <LocaleProvider>
          <CreateUnavailabilityModal
            open={mockOpen}
            onClose={mockClose}
            onSave={mockAddUnavailableEvent}
            onDelete={mockDeleteUnavailableEvent}
            guards={{ eventPolicy, exclusionPolicy }}
            selectedEvent={mockUnavailableEvent}
            selectedDate={mockDay}
            locations={mockLocations}
            workUnits={mockWorkUnits}
          />
        </LocaleProvider>
      );

      expect(mockEvent).toStrictEqual(mockInitialState);
      expect(container).not.toContainElement(unavailableHeader);
    });

    it('should disable delete action when permissions are not valid', () => {
      mockUser.authoritiesAsStrings = ['ROLE_OPSCAL_DEV'];
      const { container }: RenderResult = render(
        <LocaleProvider>
          <CreateUnavailabilityModal
            open={mockOpen}
            onClose={mockClose}
            onSave={mockAddUnavailableEvent}
            onDelete={mockDeleteUnavailableEvent}
            guards={{ eventPolicy, exclusionPolicy }}
            selectedEvent={mockUnavailableEvent}
            selectedDate={mockDay}
            locations={mockLocations}
            workUnits={mockWorkUnits}
          />
        </LocaleProvider>
      );
      const unavailableClearButton: HTMLElement = screen.queryByTestId('modal-clear-button');

      expect(container).not.toContainElement(unavailableClearButton);
    });
  });

  describe('onSave', () => {
    it('should save unavailable event when fields are valid', () => {
      mockEvent = { ...mockUnavailableEvent, recurrenceStrategy: 'Daily' };
      const selectedDate: Date = mockEvent.startDate as Date;

      render(
        <LocaleProvider>
          <CreateUnavailabilityModal
            open={mockOpen}
            onClose={mockClose}
            onSave={mockAddUnavailableEvent}
            onDelete={mockDeleteUnavailableEvent}
            guards={{ eventPolicy, exclusionPolicy }}
            selectedEvent={mockEvent}
            selectedDate={selectedDate}
            locations={mockLocations}
            workUnits={mockWorkUnits}
          />
        </LocaleProvider>
      );
      const unavailableLabelInput: HTMLElement = screen.getByLabelText('Label');
      fireEvent.change(unavailableLabelInput, { target: { value: 'Mock Test' } });

      const strategySelect: HTMLElement = screen.getByLabelText('Recurrence Strategy');

      // DayMonthly Recurrence Strategy
      fireEvent.mouseDown(strategySelect);
      const dailyMonthlyStrategy: string = `Monthly on the ${getNthWeekOfMonth(selectedDate)} ${formatDayWeek(selectedDate)}`;
      const dayMonthlyOption: HTMLElement = within(screen.getByRole('listbox')).getByText(dailyMonthlyStrategy);
      fireEvent.click(dayMonthlyOption);

      // Weekly Recurrence Strategy
      fireEvent.mouseDown(strategySelect);
      const weeklyStrategy: string = `Weekly on a ${formatDayWeek(selectedDate)}`;
      const weeklyOption: HTMLElement = within(screen.getByRole('listbox')).getByText(weeklyStrategy);
      fireEvent.click(weeklyOption);

      // Monthly Recurrence Strategy
      fireEvent.mouseDown(strategySelect);
      const monthlyStrategy: string = `Monthly on ${formatDayMonth(selectedDate)}`;
      const monthlyOption: HTMLElement = within(screen.getByRole('listbox')).getByText(monthlyStrategy);
      fireEvent.click(monthlyOption);

      // Yearly Recurrence Strategy
      fireEvent.mouseDown(strategySelect);
      const yearlyStrategy: string = `Annually on ${formatDayMonth(selectedDate)}`;
      const yearlyOption: HTMLElement = within(screen.getByRole('listbox')).getByText(yearlyStrategy);
      fireEvent.click(yearlyOption);

      // Daily Recurrence Strategy
      fireEvent.mouseDown(strategySelect);
      const dailyOption: HTMLElement = within(screen.getByRole('listbox')).getByText('Daily');
      fireEvent.click(dailyOption);

      // Work Units dropdown
      const workUnitSelect: HTMLElement = screen.getByLabelText('Work Unit');
      fireEvent.mouseDown(workUnitSelect);
      const workUnitOption: HTMLElement = within(screen.getByRole('listbox')).getByText('Work Unit 2');
      fireEvent.click(workUnitOption);

      // Locations dropdown
      const locationSelect: HTMLElement = screen.getByLabelText('Location');
      fireEvent.mouseDown(locationSelect);
      const locationOption: HTMLElement = within(screen.getByRole('listbox')).getByText('Location 2');
      fireEvent.click(locationOption);

      // Sections dropdown
      const sectionSelect: HTMLElement = screen.getByLabelText('Section');
      fireEvent.mouseDown(sectionSelect);
      const sectionOption: HTMLElement = within(screen.getByRole('listbox')).getByText('Section 5');
      fireEvent.click(sectionOption);

      const unavailableSaveButton: HTMLElement = screen.queryByTestId('unavailable-event-save-button');
      fireEvent.click(unavailableSaveButton);

      expect(mockEvent).toStrictEqual(mockInitialState);
    });

    it('should display errors on save when fields are invalid', () => {
      mockEvent = {
        ...mockUnavailableEvent,
        recurrenceStrategy: ''
      };

      render(
        <LocaleProvider>
          <CreateUnavailabilityModal
            open={mockOpen}
            onClose={mockClose}
            onSave={mockAddUnavailableEvent}
            onDelete={mockDeleteUnavailableEvent}
            guards={{ eventPolicy, exclusionPolicy }}
            selectedEvent={mockEvent}
            selectedDate={mockDay}
            locations={mockLocations}
            workUnits={mockWorkUnits}
          />
        </LocaleProvider>
      );
      const unavailableLabelInput: HTMLElement = screen.getByLabelText('Label');
      fireEvent.change(unavailableLabelInput, { target: { value: '' } });

      const sectionOption: HTMLElement = screen.getByLabelText('Section');
      fireEvent.mouseDown(sectionOption);

      const startDate: HTMLElement = screen.getByLabelText('Start Date');
      fireEvent.change(startDate, { target: { value: '01/05/1900' } });

      const endDate: HTMLElement = screen.getByLabelText('End Date');
      fireEvent.change(endDate, { target: { value: '01/01/1900' } });

      const unavailableSaveButton: HTMLElement = screen.queryByTestId('unavailable-event-save-button');
      fireEvent.click(unavailableSaveButton);

      const requiredError: HTMLElement[] = screen.getAllByText(VALIDATOR_REQUIRED);
      const beforeDateError: HTMLElement = screen.getByText(VALIDATOR_DATE_BEFORE);
      const afterDateError: HTMLElement = screen.getByText(VALIDATOR_DATE_AFTER);

      expect(requiredError).toHaveLength(2);
      expect(beforeDateError).toBeTruthy();
      expect(afterDateError).toBeTruthy();
    });

    it('should should clear errors when fields are valid', () => {
      mockEvent = {
        ...mockUnavailableEvent
      };

      const { container }: RenderResult = render(
        <LocaleProvider>
          <CreateUnavailabilityModal
            open={mockOpen}
            onClose={mockClose}
            onSave={mockAddUnavailableEvent}
            onDelete={mockDeleteUnavailableEvent}
            guards={{ eventPolicy, exclusionPolicy }}
            selectedEvent={mockEvent}
            selectedDate={mockDay}
            locations={mockLocations}
            workUnits={mockWorkUnits}
          />
        </LocaleProvider>
      );

      const startDate: HTMLElement = screen.getByLabelText('Start Date');
      fireEvent.change(startDate, { target: { value: 't' } });

      const unavailableSaveButton: HTMLElement = screen.queryByTestId('unavailable-event-save-button');
      fireEvent.click(unavailableSaveButton);

      const validStartDateError: HTMLElement = screen.getByText(VALIDATOR_VALID_DATE);

      expect(container).toContainElement(validStartDateError)
      fireEvent.change(startDate, { target: { value: '01/01/1900' } });

      expect(container).not.toContainElement(validStartDateError);

      const endDate: HTMLElement = screen.getByLabelText('End Date');
      fireEvent.change(endDate, { target: { value: 't' } });

      const validEndDateError: HTMLElement = screen.getByText(VALIDATOR_VALID_DATE);
      expect(container).toContainElement(validEndDateError);

      fireEvent.change(endDate, { target: { value: '01/02/1900' } });

      expect(container).not.toContainElement(validEndDateError);
    });
  });
});
