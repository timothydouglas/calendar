import { clsx as cx } from 'clsx';
import { Menu, MenuItem } from '@mui/material';
import { DateTypeProps, SelectOption, UseMenuActionsHook } from '../models';
import { useMenuActions } from '../hooks';
import { DateType as Type, DateTypes } from '../models';

const dateTypes: SelectOption[] = [
  {
    label: DateTypes[Type.DAY],
    id: Type.DAY,
    data: 1
  },
  {
    label: DateTypes[Type.WEEK],
    id: Type.WEEK,
    data: 2
  },
  {
    label: DateTypes[Type.MONTH],
    id: Type.MONTH,
    data: 3
  }
];

export function DateType({ dateType, setDateType }: DateTypeProps): JSX.Element {
  const { anchorEl, open, handleClick, handleClose }: UseMenuActionsHook = useMenuActions();

  return (
    <>
      <button
        className={cx('border rounded py-2 pl-4 pr-2 mr-4 hover:bg-slate-100 ml-4 flex items-center', {
          'bg-slate-100': open
        })}
        data-testid="dateType-button"
        onClick={handleClick}
      >
        {dateType.label}
        <span className="material-icons-outlined cursor-pointer text-gray-600">
          arrow_drop_down
        </span>
      </button>
      <Menu
        id="dateType-menu"
        data-testid="dateType-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {dateTypes
          .filter((o: SelectOption) => o.id !== dateType.id)
          .sort((a: SelectOption, b: SelectOption) => +a.data - +b.data)
          .map((type: SelectOption, i: number) =>
            <MenuItem
              key={i}
              id={`dateType-menu-item-${type.id}`}
              onClick={() => {
                setDateType(type);
                handleClose();
              }}
            >
              {type.label}
            </MenuItem>
          )
        }
      </Menu>
    </>
  );
}
