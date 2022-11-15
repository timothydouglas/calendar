import { unavailabilityActionTypes } from '../actions';

export const getInitialState = () => ({
  unavailability: null,
});

export const unavailabilityReducer = (state, { type, payload }) => {
  const action: (state: any, payload: any) => void = unavailabilityActions.get(type);
  return action ? action(state, payload) : state;
};

const unavailabilityActions: Map<string, (state: any, payload: any) => void> = new Map([
  [unavailabilityActionTypes.PUSH, (state, payload) => ({
    ...state,
    payload
  })],

  [unavailabilityActionTypes.UPDATE, (state, payload) => ({
    ...state.map((unavailability) => unavailability.id === payload.id ? payload : unavailability)
  })],

  [unavailabilityActionTypes.DELETE, (state, payload) => ({
    ...state.filter((unavailability) => unavailability.id !== payload.id)
  })],
]);
