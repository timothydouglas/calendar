import plus from '../assets/plus.svg';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, } from '@material-tailwind/react';
import { useState, Fragment, ChangeEvent, useContext } from 'react';
import { CalendarContext } from '../context';
import { CalendarContextType } from '../models';

export function CreateUnavailability() {
  const { selectedDay, setUnavailabilityModal, displayUnavailabilityModal }: CalendarContextType = useContext(CalendarContext);
  const [title, setTitle] = useState('');
  return (
    <Fragment>
      <button onClick={() => setUnavailabilityModal(true)}
                   className="border p-2 rounded-full flex items-center shadow-md hover:shadow-2xl"
                   data-testid="create-unavailability">
        <img src={plus} alt="Add Unavailability" className="w-7 h-7" />
        <span className="pl-3 pr-7" data-testid="create-button-label">
          Create
        </span>
      </button>
      <Dialog open={displayUnavailabilityModal} handler={() => setUnavailabilityModal(false)}>
        <DialogHeader>
          <div className="flex justify-between w-full">
            <span className="material-icons-outlined text-gray-400">
              drag_handle
            </span>
            <span>Create Unavailability</span>
            <button onClick={() => setUnavailabilityModal(false)}>
              <span className="material-icons-outlined text-gray-400">
                close
              </span>
            </button>
          </div>
        </DialogHeader>
        <DialogBody divider>
          <div className="p-3">
            <div className="grid grid-cols-1/5 items-end gap-y-7">
              <div></div>
              <input
                type="text"
                name="title"
                placeholder="Add title"
                value={title}
                className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
              />
              <span className="material-icons-outlined text-gray-400">
                schedule
              </span>
              <p>
                {selectedDay.format("dddd, MMMM DD")}
              </p>
              <span className="material-icons-outlined text-gray-400">
                segment
              </span>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setUnavailabilityModal(false)}
            className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={() => setUnavailabilityModal(false)}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  )
}
