import {
  createContext,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
  useState,
  Context
} from 'react';
import { EventContextProps, Events, UnavailableEvent } from '../models';

export const EventContext: Context<EventContextProps | null> = createContext<EventContextProps | null>(null);

export function EventProvider({ children }: PropsWithChildren): JSX.Element {
  const [events, setEvents]: [UnavailableEvent[], Dispatch<SetStateAction<UnavailableEvent[]>>] = useState([]);
  const [selectedEvent, setSelectedEvent]: [Events, Dispatch<SetStateAction<Events>>] = useState(null);
  const [submitted, setSubmitted]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);

  const value: EventContextProps = {
    events,
    selectedEvent,
    setEvents,
    setSelectedEvent,
    setSubmitted,
    submitted
  };

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
}
