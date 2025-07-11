import { fireEvent, render, RenderResult, screen, within } from '@testing-library/react';
import { CreateAvailabilityModal } from './CreateAvailabilityModal';
import { AvailableEvent } from '../models';
import { add } from 'date-fns';
import { LocaleProvider } from '../context';
import { VALIDATOR_REQUIRED, VALIDATOR_VALID_DATE } from '../constants';
import {
  mockAvailableEvent as mockInitialState,
  mockEventPolicy as eventPolicy,
  mockExclusionPolicy as exclusionPolicy,
  mockLocations,
  mockWorkUnits,
} from '../mocks';

describe('CreateAvailabilityModal', () => {
  let mockOpen: boolean = false;
  let mockEvent: AvailableEvent = undefined;
  const mockDay: Date = add(new Date(), { days: 1 });
  const mockAvailableEvent: AvailableEvent = {
    id: 'test-available-1',
    label: 'Test Available Event',
    excludedDate: add(new Date(), { days: 8 }),
    createdTimestamp: new Date(),
    workUnitId: 'workUnit1',
    locationId: 'location1',
    sectionId: ''
  };
  const mockClose = (): void => {
    mockEvent = mockInitialState;
    mockOpen = false;
  };
  const mockAddAvailableEvent = (e: Partial<AvailableEvent>, close: () => void, setLoading: (loading: boolean) => void): void => {
    mockEvent = { ...mockEvent, ...e };
    setLoading(false);
    close();
  };
  const mockDeleteAvailableEvent = (id: string, close: () => void, setLoading: (loading: boolean) => void): void => {
    setLoading(false);
    close();
  };

  beforeEach(() => {
    mockEvent = mockInitialState;
    mockOpen = true;
  });

  describe('onClose', () => {
    it('should close available event modal', () => {
      const { container, rerender }: RenderResult = render(
        <LocaleProvider>
          <CreateAvailabilityModal
            open={mockOpen}
            onClose={mockClose}
            onSave={mockAddAvailableEvent}
            onDelete={mockDeleteAvailableEvent}
            guards={{ eventPolicy, exclusionPolicy }}
            selectedEvent={mockAvailableEvent}
            selectedDate={mockDay}
            locations={mockLocations}
            workUnits={mockWorkUnits}
          />
        </LocaleProvider>
      );
      const availableHeader: HTMLElement = screen.queryByTestId('modal-title');
      const availableCloseButton: HTMLElement = screen.queryByTestId('modal-close-button');
      fireEvent.click(availableCloseButton);

      rerender(
        <LocaleProvider>
          <CreateAvailabilityModal
            open={mockOpen}
            onClose={mockClose}
            onSave={mockAddAvailableEvent}
            onDelete={mockDeleteAvailableEvent}
            guards={{ eventPolicy, exclusionPolicy }}
            selectedEvent={mockAvailableEvent}
            selectedDate={mockDay}
            locations={mockLocations}
            workUnits={mockWorkUnits}
          />
        </LocaleProvider>
      );

      expect(mockEvent).toStrictEqual(mockInitialState);
      expect(container).not.toContainElement(availableHeader);
    });
  });

  describe('onDelete', () => {
    it('should close available event modal when event has been deleted', () => {
      const { container, rerender }: RenderResult = render(
        <LocaleProvider>
          <CreateAvailabilityModal
            open={mockOpen}
            onClose={mockClose}
            onSave={mockAddAvailableEvent}
            onDelete={mockDeleteAvailableEvent}
            guards={{ eventPolicy, exclusionPolicy }}
            selectedEvent={mockAvailableEvent}
            selectedDate={mockDay}
            locations={mockLocations}
            workUnits={mockWorkUnits}
          />
        </LocaleProvider>
      );
      const availableHeader: HTMLElement = screen.queryByTestId('modal-title');
      const availableClearButton: HTMLElement = screen.queryByTestId('modal-clear-button');
      fireEvent.click(availableClearButton);

      rerender(
        <LocaleProvider>
          <CreateAvailabilityModal
            open={mockOpen}
            onClose={mockClose}
            onSave={mockAddAvailableEvent}
            onDelete={mockDeleteAvailableEvent}
            guards={{ eventPolicy, exclusionPolicy }}
            selectedEvent={mockAvailableEvent}
            selectedDate={mockDay}
            locations={mockLocations}
            workUnits={mockWorkUnits}
          />
        </LocaleProvider>
      );

      expect(mockEvent).toStrictEqual(mockInitialState);
      expect(container).not.toContainElement(availableHeader);
    });
  });

  describe('onSave', () => {
    it('should save available event when fields are valid', () => {
      render(
        <LocaleProvider>
          <CreateAvailabilityModal
            open={mockOpen}
            onClose={mockClose}
            onSave={mockAddAvailableEvent}
            onDelete={mockDeleteAvailableEvent}
            guards={{ eventPolicy, exclusionPolicy }}
            selectedDate={mockDay}
            locations={mockLocations}
            workUnits={mockWorkUnits}
          />
        </LocaleProvider>
      );
      const availableLabelInput: HTMLElement = screen.getByLabelText('Label');
      fireEvent.change(availableLabelInput, { target: { value: 'Mock Test' } });
      
      const workUnitSelect: HTMLElement = screen.getByLabelText('Work Unit');
      fireEvent.mouseDown(workUnitSelect);
      const workUnitOption: HTMLElement = within(screen.getByRole('listbox')).getByText('Work Unit 1');
      fireEvent.click(workUnitOption);
      
      const locationSelect: HTMLElement = screen.getByLabelText('Location');
      fireEvent.mouseDown(locationSelect);
      const locationOption: HTMLElement = within(screen.getByRole('listbox')).getByText('Location 1');
      fireEvent.click(locationOption);
      
      const sectionSelect: HTMLElement = screen.getByLabelText('Section');
      fireEvent.mouseDown(sectionSelect);
      const sectionOption: HTMLElement = within(screen.getByRole('listbox')).getByText('Section 2');
      fireEvent.click(sectionOption);

      const availableSaveButton: HTMLElement = screen.queryByTestId('available-event-save-button');
      fireEvent.click(availableSaveButton);

      expect(mockEvent).toStrictEqual(mockInitialState);
    });

    it('should display errors on save when fields are invalid', () => {
      render(
        <LocaleProvider>
          <CreateAvailabilityModal
            open={mockOpen}
            onClose={mockClose}
            onSave={mockAddAvailableEvent}
            onDelete={mockDeleteAvailableEvent}
            guards={{ eventPolicy, exclusionPolicy }}
            selectedDate={mockDay}
            locations={mockLocations}
            workUnits={mockWorkUnits}
          />
        </LocaleProvider>
      );
      const availableLabelInput: HTMLElement = screen.getByLabelText('Label');
      fireEvent.change(availableLabelInput, { target: { value: '' } });

      const excludedDate: HTMLElement = screen.getByLabelText('Date');
      fireEvent.change(excludedDate, { target: { value: 't' }})

      const availableSaveButton: HTMLElement = screen.queryByTestId('available-event-save-button');
      fireEvent.click(availableSaveButton);

      const requiredError: HTMLElement = screen.getByText(VALIDATOR_REQUIRED);
      const dateError: HTMLElement = screen.getByText(VALIDATOR_VALID_DATE);

      expect(requiredError).toBeTruthy();
      expect(dateError).toBeTruthy();
    });
  });
});
