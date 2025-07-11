import cli from './cli';
import { logOutInterceptor } from '../interceptors';

export async function logOut(): Promise<void> {
  logOutInterceptor();

  return cli({
    baseURL: '/',
    method: 'post',
    url: '/logout'
  });
}
