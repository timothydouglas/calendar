import { MouseEvent } from 'react';

export type UseMenuActionsHook = {
  anchorEl: HTMLElement;
  open: boolean;
  handleClick: (event: MouseEvent<HTMLButtonElement|HTMLDivElement>) => void;
  handleClose: () => void;
}
