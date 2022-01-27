import { STORE_STATUS_ERROR, STORE_STATUS_FINISHED, STORE_STATUS_LOADING } from 'constants/store';
import { GenericState, GetRejectValue } from './create-slice';
import { ActionReducerMapBuilder, AsyncThunk } from '@reduxjs/toolkit';

export type ExtraReducers<S> = (builder: ActionReducerMapBuilder<GenericState<S>>) => void;

export const createReducers =
  <State, Service, Payload>(
    thunkAction: AsyncThunk<State, Promise<Service>, Payload>,
    initialState: State
  ): ExtraReducers<State> =>
  (builder: ActionReducerMapBuilder<any>) => {
    builder.addCase(thunkAction.pending, (state: GenericState<State>) => {
      state.status = STORE_STATUS_LOADING;
    });
    builder.addCase(thunkAction.fulfilled, (state: GenericState<State>, { payload }) => {
      state.error = null;
      state.status = STORE_STATUS_FINISHED;
      state.data = payload;
    });
    builder.addCase(thunkAction.rejected, (state: GenericState<State>, { payload }) => {
      const { code, message } = (payload || {}) as GetRejectValue;
      state.data = initialState;
      state.status = STORE_STATUS_ERROR;
      state.error = {
        name: code,
        message: message
      };
    });
  };
