import axios, { AxiosError, AxiosResponse } from 'axios';
import { CliConfig } from '../models';

export default function cli<T>({
  baseURL = process.env.REACT_APP_API_URL,
  method = 'get',
  url,
  data = null,
  params,
  paramsSerializer
}: CliConfig): Promise<T> {
  return axios({
    baseURL,
    method,
    url,
    data,
    params,
    paramsSerializer
  }).then((res: AxiosResponse) => {
    return res.data;
  }).catch((error: AxiosError) =>
    Promise.reject(error)
  );
}
