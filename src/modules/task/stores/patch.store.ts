import { createAsyncThunk } from '@reduxjs/toolkit';
import { STORE_TASK, STORE_TASK_PATCH, STORE_STATUS_INITIALIZED } from 'constants/store';
import { ErrorStore, Task, TaskResponse, TaskStatus } from '@types';
import { createGenericSlice, createReducers, ExtraReducers, GenericState } from 'stores/generics';

import { Payload } from 'stores';

export type PatchTaskState = Task;

type State = GenericState<PatchTaskState>;

export const initialState: State = {
  data: {
    description: '',
    id: '',
    status: TaskStatus.PROGRESS
  },
  status: STORE_STATUS_INITIALIZED,
  error: null
};

export const patchTask = createAsyncThunk<PatchTaskState, Promise<TaskResponse>, Payload>(
  STORE_TASK_PATCH,
  async (promise, { rejectWithValue }) => {
    try {
      const response = await promise;
      return response;
    } catch (e: unknown) {
      const { code, message } = e as ErrorStore;
      return rejectWithValue({ code, message });
    }
  }
);

const extraReducers: ExtraReducers<PatchTaskState> = createReducers<
  PatchTaskState,
  TaskResponse,
  Payload
>(patchTask, initialState.data);

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
