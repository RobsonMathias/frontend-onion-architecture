import { combineReducers } from '@reduxjs/toolkit';
import list from './tasks.store';
import patch from './patch.store';

export const rootReducer = combineReducers({
  list,
  patch
});
