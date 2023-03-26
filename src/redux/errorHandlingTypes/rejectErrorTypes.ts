import { AxiosError } from 'axios';

export type AxiosErrorResponse = {
  message: string;
};

export type ErrorStatusAndMessage = {
  message: string;
  status?: number;
  error?: {};
};

export const axiosError = (error: any): ErrorStatusAndMessage => {
  const e = error as AxiosError;
  const message = (e.response?.data as AxiosErrorResponse).message;
  const status = e.response?.status;
  return { message, status };
};
