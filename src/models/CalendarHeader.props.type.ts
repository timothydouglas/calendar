import { SelectOption, User } from '../models';

export type CalendarHeaderProps = {
  date: Date;
  dateType: SelectOption;
  logOut: () => void;
  gotoPrevDate: () => void;
  gotoNextDate: () => void;
  gotoCurrentDate: () => void;
  setDateType: (type: SelectOption) => void;
  title: string;
  user: User;
}
