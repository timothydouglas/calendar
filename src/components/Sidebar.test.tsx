import { render, screen } from '@testing-library/react';
import { Sidebar, CreateButton } from '../components';

describe('Sidebar', () => {
  const mockDate: Date = new Date();

  describe('children', () => {
    it('should instantiate sidebar with child components', () => {
      render(
        <Sidebar>
          <CreateButton
            addUnavailableEvent={undefined}
            addAvailableEvent={undefined}
            deleteUnavailableEvent={undefined}
            deleteAvailableEvent={undefined}
            selectedDate={mockDate}
            locations={[]}
            workUnits={[]}
          />
        </Sidebar>
      );
      const sidebar: HTMLElement = screen.getByTestId('sidebar');
      const createButton: HTMLElement = screen.getByTestId('create-button');

      expect(sidebar).toContainElement(createButton);
    });
  });
});
