import plus from '../assets/plus.svg';

export function CreateUnavailability() {
  return <button className="border p-2 rounded-full flex items-center shadow-md hover:shadow-2xl" data-testid="create-unavailability">
    <img src={plus} alt="Add Unavailability" className="w-7 h-7" />
    <span className="pl-3 pr-7" data-testid="create-button-label">Create</span>
  </button>
}
