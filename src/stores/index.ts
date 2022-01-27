import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

declare module 'react-redux' {
  interface DefaultRootState extends RootState {}
}

declare module '@reduxjs/toolkit' {
  interface AsyncThunkConfig {
    state: RootState;
  }
}

export const store = configureStore({
  reducer: rootReducer
});

export type Payload = {
  rejectValue: { code: string; message: string };
  state: RootState;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from './clear-stores';
