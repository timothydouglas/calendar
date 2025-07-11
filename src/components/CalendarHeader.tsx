import { StyledComponent } from '@emotion/styled';
import { styled, Theme } from '@mui/material';
import { Logo, DateType } from '../components';
import { CalendarHeaderProps, UseHeaderHook } from '../models';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { useHeader } from '../hooks';

const UserTooltip: StyledComponent<TooltipProps> = styled(
  ({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  )
)(({ theme }: { theme: Theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    border: '1px solid #dadde9',
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: theme.typography.pxToRem(14),
    maxWidth: 300
  }
}));

export function CalendarHeader({
  title,
  date,
  gotoPrevDate,
  gotoNextDate,
  gotoCurrentDate,
  logOut,
  dateType,
  setDateType,
  user
}: CalendarHeaderProps): JSX.Element {
  const { headerDate, userDetails: { name, roles } }: UseHeaderHook = useHeader(date, dateType.id, user);

  return (
    <header className="px-4 py-2 flex items-center" data-testid="calendar-header">
      <Logo />
      <h1 className="ml-4 mr-8" data-testid="calendar-header-title">{title}</h1>
      <button
        onClick={gotoCurrentDate}
        className="border rounded py-2 px-4 mr-4 hover:bg-slate-100"
        data-testid="calendar-header-today-button"
      >
        Today
      </button>
      <button
        onClick={gotoPrevDate}
        data-testid="calendar-header-prev-button"
        className="hover:bg-slate-100 rounded-full w-8 h-8 flex items-center justify-center"
      >
        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
          chevron_left
        </span>
      </button>
      <button
        onClick={gotoNextDate}
        data-testid="calendar-header-next-button"
        className="hover:bg-slate-100 rounded-full w-8 h-8 flex items-center justify-center"
      >
        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
          chevron_right
        </span>
      </button>
      <h2 className="ml-4" data-testid="calendar-header-date">
        {headerDate}
      </h2>
      <div className="flex items-center ml-auto">
        {!!user && (
          <UserTooltip
            title={
              <>
                <p><b>Logged in:</b> {name}</p>
                <p><b>Roles:</b> {roles}</p>
              </>
            }>
            <span className="material-icons-outlined cursor-pointer text-gray-600 hover:text-gray-800">
              person
            </span>
          </UserTooltip>
        )}
        <DateType dateType={dateType} setDateType={setDateType} />
        <button
          onClick={logOut}
          className="border rounded py-2 px-4 mr-4 hover:bg-slate-100"
          data-testid="calendar-header-logout-button"
        >
          Log out
        </button>
      </div>
    </header>
  );
}
