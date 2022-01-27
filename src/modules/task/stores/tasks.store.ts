import { createAsyncThunk } from '@reduxjs/toolkit';
import { STORE_TASK_FETCH_LIST, STORE_TASK, STORE_STATUS_INITIALIZED } from 'constants/store';
import { ErrorStore, Task, TasksResponse } from '@types';
import { createGenericSlice, GenericState, createReducers, ExtraReducers } from 'stores/generics';

import { Payload } from 'stores';

export type TasksState = Task[];

export const initialState: GenericState<TasksState> = {
  data: [],
  status: STORE_STATUS_INITIALIZED,
  error: null
};

export const fetchList = createAsyncThunk<TasksState, Promise<TasksResponse>, Payload>(
  STORE_TASK_FETCH_LIST,
  async (promise, { rejectWithValue }) => {
    try {
      const response = await promise;
      return response.data;
    } catch (e: unknown) {
      const { code, message } = e as ErrorStore;
      return rejectWithValue({ code, message });
    }
  }
);

const extraReducers: ExtraReducers<TasksState> = createReducers<TasksState, TasksResponse, Payload>(
  fetchList,
  initialState.data
);

const slice = createGenericSlice({
  name: STORE_TASK,
  initialState,
  reducers: {},
  extraReducers
});

const { actions, reducer } = slice;

const { clear } = actions;

export { clear };

export default reducer;
