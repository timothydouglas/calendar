import { Context, createContext, useState, Dispatch, SetStateAction, PropsWithChildren } from 'react';
import { DateType, DateTypes, SelectedDateContextProps, SelectOption } from '../models';

export const SelectedDateContext: Context<SelectedDateContextProps | null> = createContext<SelectedDateContextProps | null>(null);

const initialDateType: SelectOption = { id: DateType.MONTH, label: DateTypes[DateType.MONTH] };

/**
 * Remembers the current date offset and type
 */
export function SelectedDateProvider({ children }: PropsWithChildren): JSX.Element  {
  const [date, setDate]: [Date, Dispatch<SetStateAction<Date>>] = useState(new Date());
  const [selectedDate, setSelectedDate]: [Date, Dispatch<SetStateAction<Date>>] = useState(new Date());
  const [dateType, setDateType]: [SelectOption, Dispatch<SetStateAction<SelectOption>>] = useState(initialDateType);
  const value: SelectedDateContextProps = { date, dateType, selectedDate, setDateType, setDate, setSelectedDate };

  return <SelectedDateContext.Provider value={value}>{children}</SelectedDateContext.Provider>;
}
