import { render, screen } from '@testing-library/react';
import { Dates } from './Dates';
import { DateType, DateTypes, SelectOption, Toast } from '../models';
import { mockEvents, mockEventPolicy as eventPolicy, mockExclusionPolicy as exclusionPolicy } from '../mocks';
import { previousSunday } from 'date-fns';
import { ApiProvider } from '../context';
import { apiMethods } from '../api';

describe('Dates', () => {
  let mockDateType: SelectOption = {
    label: DateTypes[DateType.MONTH],
    id: DateType.MONTH
  };
  let mockDate: Date = new Date();
  let mockToast: Toast = {};

  const mockAddToast = (toast: Toast): void => {
    mockToast = { ...mockToast, ...toast };
  };

  beforeEach(() => {
    mockDateType = {
      label: DateTypes[DateType.MONTH],
      id: DateType.MONTH
    };
  });

  describe('dates', () => {
    it('should render correct dates array for date type DAY', () => {
      mockDateType = {
        label: DateTypes[DateType.DAY],
        id: DateType.DAY
      };

      render(
        <ApiProvider methods={apiMethods}>
          <Dates
            addToast={mockAddToast}
            addAvailableEvent={undefined}
            dateType={mockDateType.id}
            deleteUnavailableEvent={undefined}
            deleteAvailableEvent={undefined}
            updateUnavailableEvent={undefined}
            date={mockDate}
            events={mockEvents}
            guards={{ eventPolicy, exclusionPolicy }}
            locations={[]}
            selectedDate={mockDate}
            selectedEvent={undefined}
            setSelectedDate={undefined}
            setSelectedEvent={undefined}
            workUnits={[]}
          />
        </ApiProvider>
      );
      const dates: HTMLElement[] = screen.getAllByRole('cell');
      const datesContainer: HTMLElement = screen.getByRole('grid');

      expect(dates).toHaveLength(1);
      expect(datesContainer).not.toHaveClass('grid-cols-7');
    });

    it('should render correct dates array for date type WEEK', () => {
      mockDateType = {
        label: DateTypes[DateType.WEEK],
        id: DateType.WEEK
      };
      mockDate = previousSunday(mockDate);

      render(
        <ApiProvider methods={apiMethods}>
          <Dates
            addToast={mockAddToast}
            addAvailableEvent={undefined}
            dateType={mockDateType.id}
            deleteUnavailableEvent={undefined}
            deleteAvailableEvent={undefined}
            updateUnavailableEvent={undefined}
            date={mockDate}
            events={mockEvents}
            guards={{ eventPolicy, exclusionPolicy }}
            locations={[]}
            selectedDate={mockDate}
            selectedEvent={undefined}
            setSelectedDate={undefined}
            setSelectedEvent={undefined}
            workUnits={[]}
          />
        </ApiProvider>
      );
      const dates: HTMLElement[] = screen.getAllByRole('cell');
      const datesContainer: HTMLElement = screen.getByRole('grid');

      expect(dates).toHaveLength(7);
      expect(datesContainer).toHaveClass('grid-cols-7');
    });

    it('should render correct dates array for date type MONTH with no offset', () => {
      // February 2026 starts on Sunday and ends on Saturday
      mockDate = new Date('2026-02-01');

      render(
        <ApiProvider methods={apiMethods}>
          <Dates
            addToast={mockAddToast}
            addAvailableEvent={undefined}
            dateType={mockDateType.id}
            deleteUnavailableEvent={undefined}
            deleteAvailableEvent={undefined}
            updateUnavailableEvent={undefined}
            date={mockDate}
            events={mockEvents}
            guards={{ eventPolicy, exclusionPolicy }}
            locations={[]}
            selectedDate={mockDate}
            selectedEvent={undefined}
            setSelectedDate={undefined}
            setSelectedEvent={undefined}
            workUnits={[]}
          />
        </ApiProvider>
      );
      const dates: HTMLElement[] = screen.getAllByRole('cell');
      const datesContainer: HTMLElement = screen.getByRole('grid');

      expect(dates.length).toStrictEqual(28);
      expect(datesContainer).toHaveClass(...['grid-cols-7', 'grid-rows-4']);
    });

    it('should render correct dates array for date type MONTH with only offset start', () => {
      // September 2023 ends on Saturday
      mockDate = new Date('2023-09-01');

      render(
        <ApiProvider methods={apiMethods}>
          <Dates
            addToast={mockAddToast}
            addAvailableEvent={undefined}
            dateType={mockDateType.id}
            deleteUnavailableEvent={undefined}
            deleteAvailableEvent={undefined}
            updateUnavailableEvent={undefined}
            date={mockDate}
            events={mockEvents}
            guards={{ eventPolicy, exclusionPolicy }}
            locations={[]}
            selectedDate={mockDate}
            selectedEvent={undefined}
            setSelectedDate={undefined}
            setSelectedEvent={undefined}
            workUnits={[]}
          />
        </ApiProvider>
      );
      const dates: HTMLElement[] = screen.getAllByRole('cell');
      const datesContainer: HTMLElement = screen.getByRole('grid');

      expect(dates.length > 28 && dates.length <= 35).toBe(true);
      expect(datesContainer).toHaveClass(...['grid-cols-7', 'grid-rows-5']);
    });

    it('should render correct dates array for date type MONTH with both offset start/end', () => {
      // April 2023 starts on Saturday and ends on Sunday
      mockDate = new Date('2023-04-01');

      render(
        <ApiProvider methods={apiMethods}>
          <Dates
            addToast={mockAddToast}
            addAvailableEvent={undefined}
            dateType={mockDateType.id}
            deleteUnavailableEvent={undefined}
            deleteAvailableEvent={undefined}
            updateUnavailableEvent={undefined}
            date={mockDate}
            events={mockEvents}
            guards={{ eventPolicy, exclusionPolicy }}
            locations={[]}
            selectedDate={mockDate}
            selectedEvent={undefined}
            setSelectedDate={undefined}
            setSelectedEvent={undefined}
            workUnits={[]}
          />
        </ApiProvider>
      );
      const dates: HTMLElement[] = screen.getAllByRole('cell');
      const datesContainer: HTMLElement = screen.getByRole('grid');

      expect(dates.length).toBeGreaterThan(35);
      expect(datesContainer).toHaveClass(...['grid-cols-7', 'grid-rows-6']);
    });
  });
});
