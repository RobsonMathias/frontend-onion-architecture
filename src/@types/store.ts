import {
  STORE_STATUS_ERROR,
  STORE_STATUS_FINISHED,
  STORE_STATUS_INITIALIZED,
  STORE_STATUS_LOADING
} from 'constants/store';

export type StatusType =
  | typeof STORE_STATUS_ERROR
  | typeof STORE_STATUS_LOADING
  | typeof STORE_STATUS_INITIALIZED
  | typeof STORE_STATUS_FINISHED;

export interface ErrorStore {
  code: string;
  message: string;
}
