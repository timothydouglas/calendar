import { fireEvent, render, RenderResult, screen } from '@testing-library/react';
import { Modal, DateType } from '../components';
import { ReactNode } from 'react';
import { mockDateType, mockEventPolicy as eventPolicy, mockExclusionPolicy as exclusionPolicy } from '../mocks';

describe('Modal', () => {
  let mockOpen: boolean = false;
  const mockTitle: string = 'Modal Title';
  const containerId: string = 'modal-container';
  const mockOnClose = (): void => {
    mockOpen = false;
  };
  const mockClear = (): void => undefined;
  const mockChildren: ReactNode = <DateType dateType={mockDateType} setDateType={undefined} />

  beforeEach(() => {
    mockOpen = true;
  });

  describe('open', () => {
    it('should not open modal by default', () => {
      render(
        <Modal
          onClose={mockOnClose}
          title={mockTitle}
          clear={mockClear}
          guards={{ eventPolicy, exclusionPolicy }}
        >
          {mockChildren}
        </Modal>
      );
      const modalContainer: HTMLElement = screen.queryByTestId(containerId);

      expect(modalContainer).toBeFalsy();
    });

    it('should open modal when open is set', () => {
      render(
        <Modal
          open={mockOpen}
          onClose={mockOnClose}
          title={mockTitle}
          clear={mockClear}
          guards={{ eventPolicy, exclusionPolicy }}
        >
          {mockChildren}
        </Modal>
      );
      const modalContainer: HTMLElement = screen.getByTestId(containerId);

      expect(modalContainer).toBeTruthy();
    });
  });

  describe('title', () => {
    it('should set modal title to input title', () => {
      render(
        <Modal
          open={mockOpen}
          onClose={mockOnClose}
          title={mockTitle}
          clear={mockClear}
          guards={{ eventPolicy, exclusionPolicy }}
        >
          {mockChildren}
        </Modal>
      );
      const modalTitle: HTMLElement = screen.getByTestId('modal-title');

      expect(modalTitle).toHaveTextContent(mockTitle);
    });
  });

  describe('onClose', () => {
    it('should close modal when clicking on background', () => {
      const { container, rerender }: RenderResult = render(
        <Modal
          open={mockOpen}
          onClose={mockOnClose}
          title={mockTitle}
          clear={mockClear}
          guards={{ eventPolicy, exclusionPolicy }}
        >
          {mockChildren}
        </Modal>
      );
      const modalBackground: HTMLElement = screen.queryByTestId('modal-background');
      fireEvent.click(modalBackground);
      rerender(
        <Modal
          open={mockOpen}
          onClose={mockOnClose}
          title={mockTitle}
          clear={mockClear}
          guards={{ eventPolicy, exclusionPolicy }}
        >
          {mockChildren}
        </Modal>
      );

      expect(container).not.toContainElement(modalBackground);
    });

    it('should close modal when clicking on close button', () => {
      const { container, rerender }: RenderResult = render(
        <Modal
          open={mockOpen}
          onClose={mockOnClose}
          title={mockTitle}
          clear={mockClear}
          guards={{ eventPolicy, exclusionPolicy }}
        >
          {mockChildren}
        </Modal>
      );
      const modalCloseButton: HTMLElement = screen.queryByTestId('modal-close-button');
      fireEvent.click(modalCloseButton);
      rerender(
        <Modal
          open={mockOpen}
          onClose={mockOnClose}
          title={mockTitle}
          clear={mockClear}
          guards={{ eventPolicy, exclusionPolicy }}
        >
          {mockChildren}
        </Modal>
      );

      expect(container).not.toContainElement(modalCloseButton);
    });
  });

  describe('children', () => {
    it('should render modal with valid react node/JSX', () => {
      render(
        <Modal
          open={mockOpen}
          onClose={mockOnClose}
          title={mockTitle}
          clear={mockClear}
          guards={{ eventPolicy, exclusionPolicy }}
        >
          {mockChildren}
        </Modal>
      );
      const modalChildren: HTMLElement = screen.getByTestId('modal-children');
      const dateTypeButton: HTMLElement = screen.getByTestId('dateType-button');

      expect(modalChildren).toContainElement(dateTypeButton);
    });
  });
});
