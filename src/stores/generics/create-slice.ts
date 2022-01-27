import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction,
  SliceCaseReducers,
  ValidateSliceCaseReducers
} from '@reduxjs/toolkit';
import { StatusType } from '@types';
import { STORE_STATUS_ERROR, STORE_STATUS_FINISHED, STORE_STATUS_LOADING } from 'constants/store';

export interface GetRejectValue {
  code: string;
  message: StatusType;
}
export interface GenericState<T> {
  data: T;
  status: StatusType;
  error: null | Error;
}

export const createGenericSlice = <T, Reducers extends SliceCaseReducers<GenericState<T>>>({
  name = '',
  initialState,
  reducers,
  extraReducers
}: {
  name: string;
  initialState: GenericState<T>;
  reducers: ValidateSliceCaseReducers<GenericState<T>, Reducers>;
  extraReducers?: (builder: ActionReducerMapBuilder<GenericState<T>>) => void;
}) => {
  return createSlice({
    name,
    initialState,
    reducers: {
      start(state) {
        state.status = STORE_STATUS_LOADING;
      },
      success(state: GenericState<T>, action: PayloadAction<T>) {
        state.data = action.payload;
        state.status = STORE_STATUS_FINISHED;
      },
      error(state, action: PayloadAction<Error>) {
        state.error = action.payload;
        state.status = STORE_STATUS_ERROR;
      },
      clear(state: GenericState<T>) {
        state.error = initialState.error;
        state.data = initialState.data;
        state.status = initialState.status;
      },
      ...reducers
    },
    extraReducers
  });
};
