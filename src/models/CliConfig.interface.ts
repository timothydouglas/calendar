import { ParamsSerializerOptions } from 'axios';

/* eslint-disable  @typescript-eslint/no-explicit-any */
export interface CliConfig {
  baseURL?: string;
  method?: string;
  url: string;
  data?: any;
  params?: any;
  paramsSerializer?: ParamsSerializerOptions;
}
