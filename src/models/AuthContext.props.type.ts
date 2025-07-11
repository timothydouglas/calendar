import { User } from './User.interface';

export type AuthContextProps = {
  user: User;
  setUser: (user: User) => void;
}
