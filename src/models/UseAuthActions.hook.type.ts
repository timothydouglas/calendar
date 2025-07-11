import { PolicyGroup } from 'react-guardian';
import { User } from './User.interface';

export type UseAuthActionsHook = {
  eventPolicy: PolicyGroup;
  exclusionPolicy: PolicyGroup;
  signOut: () => void;
  user: User;
}
