import { combineReducers } from '@reduxjs/toolkit';
import { rootReducer as auth } from 'modules/auth/stores';
import { rootReducer as task } from 'modules/task/stores';

const rootReducer = combineReducers({
  task,
  auth
});

export default rootReducer;
