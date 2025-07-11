import { SelectOption } from './SelectOption.interface';

export type UseGetDatesHook = {
  date: Date;
  dateType: SelectOption;
  selectedDate: Date;
  gotoPrevDate: () => void;
  gotoNextDate: () => void;
  gotoCurrentDate: () => void;
  setDateType: (type: SelectOption) => void;
  setDate: (date: Date) => void;
  setSelectedDate: (date: Date) => void;
}
