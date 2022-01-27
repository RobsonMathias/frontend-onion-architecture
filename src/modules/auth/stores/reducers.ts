import { combineReducers } from '@reduxjs/toolkit';
import user from './user.store';

export const rootReducer = combineReducers({
  user
});
