import { Events } from './Events.type';

export type UseModalHook = {
  availabilityOpen: boolean;
  unavailabilityOpen: boolean;
  toggleAvailability: () => void;
  toggleModal: (event: Events) => void;
  toggleUnavailability: () => void;
}
