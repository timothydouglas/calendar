import { Menu, MenuItem } from '@mui/material';
import { CreateMenuProps } from '../models';

export function CreateMenu({
  anchorEl,
  open,
  onClose,
  toggleAvailability,
  toggleUnavailability
}: CreateMenuProps): JSX.Element {
  return (
    <>
      <Menu
        id="create-menu"
        data-testid="create-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
      >
        <MenuItem
          id="menu-item-unavailable"
          data-testid="menu-item-unavailable"
          onClick={() => {
            onClose();
            toggleUnavailability();
          }}
        >
          Create Unavailability
        </MenuItem>
        <MenuItem
          id="menu-item-available"
          data-testid="menu-item-available"
          onClick={() => {
            onClose();
            toggleAvailability();
          }}
        >
          Create Exclusion
        </MenuItem>
      </Menu>
    </>
  );
}
