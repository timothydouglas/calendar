import { PropsWithChildren, Dispatch, SetStateAction, useState, useEffect, useReducer } from 'react';
import { CalendarContext }  from './CalendarContext';
import dayjs from 'dayjs';
import { unavailabilityReducer } from '../reducers/unavailability';

export function ContextWrapper(props: PropsWithChildren) {
  const [monthIndex, setMonthIndex]: [number, Dispatch<SetStateAction<number>>] = useState(dayjs().month());
  const [miniCalendarMonth, setMiniCalendarMonth]: [number, Dispatch<SetStateAction<number>>] = useState(null);
  const [selectedDay, setSelectedDay]: [dayjs.Dayjs | null, Dispatch<SetStateAction<dayjs.Dayjs | null>>] = useState(dayjs());
  const [displayUnavailabilityModal, setUnavailabilityModal]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
  const [unavailabilityEvents, dispatchUnavailability] = useReducer(
    unavailabilityReducer,
    []
  );
  useEffect(() => {
    if(miniCalendarMonth !== null) {
      setMonthIndex(miniCalendarMonth)
    }
  }, [miniCalendarMonth]);
  return (
      <CalendarContext.Provider value={{
        monthIndex,
        setMonthIndex,
        miniCalendarMonth,
        setMiniCalendarMonth,
        selectedDay,
        setSelectedDay,
        displayUnavailabilityModal,
        setUnavailabilityModal,
        dispatchUnavailability,
        unavailabilityEvents
      }}>
        {props.children}
      </CalendarContext.Provider>
  )
}
