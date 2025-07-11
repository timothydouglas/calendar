import { Context, createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from 'react';
import { AuthContextProps, User } from '../models';

export const AuthContext: Context<AuthContextProps | null> = createContext<AuthContextProps>(null);

export function AuthProvider({ children }: PropsWithChildren): JSX.Element  {
  const [user, setUser]: [User, Dispatch<SetStateAction<User | null>>] = useState(null);
  const value: AuthContextProps = { user, setUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
