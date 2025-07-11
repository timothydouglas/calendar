import { Dispatch, SetStateAction, useState } from 'react';
import { Events, UseModalHook } from '../models';

export const useModal = (): UseModalHook => {
  const [availabilityOpen, setAvailabilityOpen]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);
  const [unavailabilityOpen, setUnavailabilityOpen]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);
  const toggleAvailability = (): void => setAvailabilityOpen(!availabilityOpen);
  const toggleUnavailability = (): void => setUnavailabilityOpen(!unavailabilityOpen);
  const toggleModal = (event: Events): void => 'endDate' in event ? toggleUnavailability() : toggleAvailability();

  return { availabilityOpen, toggleAvailability, toggleModal, toggleUnavailability, unavailabilityOpen };
}
