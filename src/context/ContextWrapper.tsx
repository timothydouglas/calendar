import { PropsWithChildren, Dispatch, SetStateAction, useState } from 'react';
import { CalendarContext }  from './CalendarContext';
import dayjs from 'dayjs';

export function ContextWrapper(props: PropsWithChildren) {
  const [monthIndex, setMonthIndex]: [number, Dispatch<SetStateAction<number>>] = useState(dayjs().month());
  return (
      <CalendarContext.Provider value={{monthIndex, setMonthIndex}}>
        {props.children}
      </CalendarContext.Provider>
  )
}
