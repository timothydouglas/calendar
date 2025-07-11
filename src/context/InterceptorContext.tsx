import { Context, createContext, Dispatch, PropsWithChildren, SetStateAction, useEffect, useState } from 'react';
import { errorInterceptor } from '../interceptors';
import { InterceptorContextProps, UseToastHook } from '../models';
import { useToast } from '../hooks';

export const InterceptorContext: Context<InterceptorContextProps | null> = createContext<InterceptorContextProps>(null);

export function InterceptorProvider({ children }: PropsWithChildren): JSX.Element  {
  const [isSet, setIsSet]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);
  const { addToast }: UseToastHook = useToast();

  useEffect(() => {
    errorInterceptor(addToast);
    setIsSet(true);
  }, [addToast]);

  const value: InterceptorContextProps = { isSet, setIsSet };

  return isSet && <InterceptorContext.Provider value={value}>{children}</InterceptorContext.Provider>;
}
