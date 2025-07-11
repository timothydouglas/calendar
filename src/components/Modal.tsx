import { MouseEvent } from 'react';
import { ModalProps } from '../models';
import { Guard } from 'react-guardian';

export function Modal({ open = false, onClose, title, clear, children, guards }: ModalProps): JSX.Element  {
  if (!open) {
    return null;
  }

  return (
    <div className="z-10 fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div
        className="absolute -z-10 w-full h-full bg-black opacity-30"
        data-testid="modal-background"
        onClick={onClose}
      />

      <div
        className="bg-whiteborder mb-20 shadow-xl rounded"
        data-testid="modal-container"
        onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <header className="bg-gray-100 px-4 py-2 flex justify-center items-center">
           <span className="w-6"></span>
          <h2
            className="flex items-center bg-slate-100 p-4 m-auto"
            data-testid="modal-title"
          >
            {title}
          </h2>
          <div>
            {!!clear && (
              <Guard policies={[guards.eventPolicy.update, guards.exclusionPolicy.update]}>
                <span
                  className="material-icons-outlined cursor-pointer text-gray-400 hover:text-gray-600"
                  onClick={clear}
                  data-testid="modal-clear-button"
                >
                  delete
                </span>
              </Guard>
            )}
            <span
              className="material-icons-outlined cursor-pointer text-gray-400 hover:text-gray-600"
              data-testid="modal-close-button"
              onClick={onClose}
            >
              close
            </span>
          </div>
        </header>

        <div className="p-4 bg-white text-sm" data-testid="modal-children">{children}</div>
      </div>
    </div>
  );
}
