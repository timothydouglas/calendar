import { PropsWithChildren } from 'react';
import AdapterDateFns from '@date-io/date-fns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { enUS } from 'date-fns/locale';

export function LocaleProvider({ children }: PropsWithChildren): JSX.Element {
  return <LocalizationProvider adapterLocale={enUS} dateAdapter={AdapterDateFns}>{children}</LocalizationProvider>;
}
