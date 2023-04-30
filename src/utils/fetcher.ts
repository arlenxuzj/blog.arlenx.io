import axios, { AxiosRequestConfig } from 'axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetcher = <T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => axios.get(url, config).then(res => res.data);
