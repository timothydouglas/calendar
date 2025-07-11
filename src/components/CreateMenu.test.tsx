import { fireEvent, render, RenderResult, screen } from '@testing-library/react';
import { CreateMenu } from './CreateMenu';

describe('CreateMenu', () => {
  let mockAnchorEl: HTMLElement = document.createElement('test');
  let mockOpen: boolean = true;
  const mockHandleClose = (): void => {
    mockAnchorEl = null;
    mockOpen = false;
  };
  const mockToggleUnavailability = (): void => undefined;
  const mockToggleAvailability = (): void => undefined;

  beforeEach(() => {
    mockAnchorEl = document.createElement('test');
    mockOpen = true;
  });

  describe('selectedEvent', () => {
    it('should show menu items as CREATE', () => {
      render(
        <CreateMenu
          anchorEl={mockAnchorEl}
          open={mockOpen}
          onClose={mockHandleClose}
          toggleAvailability={mockToggleAvailability}
          toggleUnavailability={mockToggleUnavailability}
        />
      );
      const createAvailableItem: HTMLElement = screen.getByTestId('menu-item-available');
      const createUnavailableItem: HTMLElement = screen.getByTestId('menu-item-unavailable');

      expect(createAvailableItem).toHaveTextContent('Create Exclusion');
      expect(createUnavailableItem).toHaveTextContent('Create Unavailability');
    });
  });

  describe('onClose', () => {
    it('should close menu when clicking on unavailable menu item', () => {
      const { container, rerender }: RenderResult = render(
        <CreateMenu
          anchorEl={mockAnchorEl}
          open={mockOpen}
          onClose={mockHandleClose}
          toggleAvailability={mockToggleAvailability}
          toggleUnavailability={mockToggleUnavailability}
        />
      );
      const createUnavailableItem: HTMLElement = screen.queryByTestId('menu-item-unavailable');
      fireEvent.click(createUnavailableItem);
      rerender(
        <CreateMenu
          anchorEl={mockAnchorEl}
          open={mockOpen}
          onClose={mockHandleClose}
          toggleAvailability={mockToggleAvailability}
          toggleUnavailability={mockToggleUnavailability}
        />
      );

      expect(container).not.toContainElement(createUnavailableItem);
    });

    it('should close menu when clicking on available menu item', () => {
      const { container, rerender }: RenderResult = render(
        <CreateMenu
          anchorEl={mockAnchorEl}
          open={mockOpen}
          onClose={mockHandleClose}
          toggleAvailability={mockToggleAvailability}
          toggleUnavailability={mockToggleUnavailability}
        />
      );
      const createAvailableItem: HTMLElement = screen.queryByTestId('menu-item-available');
      fireEvent.click(createAvailableItem);
      rerender(
        <CreateMenu
          anchorEl={mockAnchorEl}
          open={mockOpen}
          onClose={mockHandleClose}
          toggleAvailability={mockToggleAvailability}
          toggleUnavailability={mockToggleUnavailability}
        />
      );

      expect(container).not.toContainElement(createAvailableItem);
    });
  });
});
