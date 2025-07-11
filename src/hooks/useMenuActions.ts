import { Dispatch, MouseEvent, SetStateAction, useState } from 'react';
import { UseMenuActionsHook } from '../models';

export const useMenuActions = (): UseMenuActionsHook => {
  const [anchorEl, setAnchorEl]: [HTMLElement, Dispatch<SetStateAction<HTMLElement | null>>] = useState(null);
  const open: boolean = !!anchorEl;
  const handleClose = (): void => setAnchorEl(null);
  const handleClick = (event: MouseEvent<HTMLElement>): void => setAnchorEl(event.currentTarget);

  return { anchorEl, open, handleClick, handleClose };
}
