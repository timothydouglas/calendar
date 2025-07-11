import { Context, createContext, ReactNode } from 'react';
import { ApiContextProps } from '../models';

export const ApiContext: Context<ApiContextProps | null> = createContext<ApiContextProps>(null);

export function ApiProvider({ methods, children }: { methods: ApiContextProps, children: ReactNode }): JSX.Element  {
  return <ApiContext.Provider value={methods}>{children}</ApiContext.Provider>;
}
