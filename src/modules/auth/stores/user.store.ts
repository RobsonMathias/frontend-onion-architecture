import { createAsyncThunk } from '@reduxjs/toolkit';
import { STORE_AUTH_FETCH_USER, STORE_AUTH, STORE_STATUS_INITIALIZED } from 'constants/store';
import { Auth, ErrorStore } from '@types';
import { createGenericSlice, GenericState, createReducers, ExtraReducers } from 'stores/generics';

import { Payload } from 'stores';

export type AuthUserState = Auth;

type State = GenericState<AuthUserState>;

export const initialState: State = {
  data: {
    displayName: '',
    email: '',
    id: '',
    token: ''
  },
  status: STORE_STATUS_INITIALIZED,
  error: null
};

export const fetchAuth = createAsyncThunk<AuthUserState, Promise<Auth>, Payload>(
  STORE_AUTH_FETCH_USER,
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

const extraReducers: ExtraReducers<AuthUserState> = createReducers<AuthUserState, Auth, Payload>(
  fetchAuth,
  initialState.data
);

const slice = createGenericSlice({
  name: STORE_AUTH,
  initialState,
  reducers: {},
  extraReducers
});

const { actions, reducer } = slice;

const { clear } = actions;

export { clear };

export default reducer;
