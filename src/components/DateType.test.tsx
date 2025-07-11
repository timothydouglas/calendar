import { fireEvent, render, RenderResult, screen } from '@testing-library/react';
import { DateType } from './DateType';
import { DateType as Type, DateTypes, SelectOption } from '../models';

describe('DateType', () => {
  let mockDateType: SelectOption = {
    label: DateTypes[Type.MONTH],
    id: Type.MONTH,
    data: 1
  };
  const mockSetDateType = (type: SelectOption): void => {
    mockDateType = { ...mockDateType, ...type };
  };

  describe('dateType', () => {
    it('should display current dateType label within button', () => {
      render(
        <DateType
          dateType={mockDateType}
          setDateType={mockSetDateType}
        />
      );
      const dateTypeButton: HTMLElement = screen.getByTestId('dateType-button');

      expect(dateTypeButton).toHaveTextContent(DateTypes[Type.MONTH]);
    });
  });

  describe('setDateType', () => {
    it('should set dateType to current dateType', () => {
      const weekDateType: SelectOption = {
        label: DateTypes[Type.WEEK],
        id: Type.WEEK,
        data: 2
      };

      const { rerender }: RenderResult = render(
        <DateType
          dateType={mockDateType}
          setDateType={mockSetDateType}
        />
      );

      const dateTypeButton: HTMLElement = screen.getByTestId('dateType-button');
      fireEvent.click(dateTypeButton);

      rerender(
        <DateType
          dateType={mockDateType}
          setDateType={mockSetDateType}
        />
      );

      const dateTypeMenuWeeks: HTMLElement = screen.getByText(DateTypes[Type.WEEK]);
      fireEvent.click(dateTypeMenuWeeks);

      rerender(
        <DateType
          dateType={mockDateType}
          setDateType={mockSetDateType}
        />
      );

      expect(dateTypeButton).toHaveTextContent(DateTypes[Type.WEEK]);
      expect(mockDateType).toStrictEqual(weekDateType);
    });
  });
});
