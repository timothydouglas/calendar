import cli from './cli';
import { User } from '../models';

export async function fetchUser(): Promise<User> {
  return cli<Record<string, User>>({
    baseURL: '/',
    method: 'get',
    url: '/me'
  }).then(
    ({ user }: Record<string, User>) => user
  );
}
