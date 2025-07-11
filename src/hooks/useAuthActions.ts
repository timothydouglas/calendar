import { useContext, useEffect } from 'react';
import { ApiContext, AuthContext } from '../context';
import { ApiContextProps, AuthContextProps, UseAuthActionsHook, User } from '../models';
import { PolicyGroup } from 'react-guardian';
import { eventGuard, exclusionGuard } from '../util';

export const useAuthActions = (): UseAuthActionsHook => {
  const { fetchUser, logOut }: ApiContextProps = useContext(ApiContext);
  const { user, setUser }: AuthContextProps = useContext(AuthContext);
  const eventPolicy: PolicyGroup = eventGuard(user);
  const exclusionPolicy: PolicyGroup = exclusionGuard(user);

  const signOut = (): void => {
    logOut().then(() => window.location.reload());
  };

  useEffect(() => {
    fetchUser().then(
      (user: User) => user?.username
        ? setUser(user)
        : signOut(),
      () => signOut()
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { eventPolicy, exclusionPolicy, signOut, user };
}
