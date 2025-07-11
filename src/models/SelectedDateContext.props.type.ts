import { SelectOption } from './SelectOption.interface';

export type SelectedDateContextProps = {
  date: Date;
  dateType: SelectOption;
  setDate: (date: Date) => void;
  setDateType: (SelectOption: SelectOption) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
};

