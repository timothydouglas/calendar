import axios, { AxiosResponse, AxiosResponseHeaders } from 'axios';

/**
 * Intercept logout request with security headers
 */
export const logOutInterceptor: () => void = () => {
  const interceptor: number = axios.interceptors.response.use((resp: AxiosResponse) => {
    const logout: string = (resp.headers as AxiosResponseHeaders)?.get('idp_logout') as string;

    if (logout) {
      window.location.href = logout;
    }

    return resp;
  });

  return () => axios.interceptors.response.eject(interceptor);
}

