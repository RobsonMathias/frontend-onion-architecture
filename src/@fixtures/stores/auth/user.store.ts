import { AuthUserState } from 'modules/auth/stores/user.store';
import { GenericState } from 'stores/generics';
import {
  STORE_STATUS_ERROR,
  STORE_STATUS_FINISHED,
  STORE_STATUS_INITIALIZED
} from 'constants/store';
import { UNAUTHORIZED_CODE } from 'constants/request-code';

export const STORE_AUTH_FETCH_USER_MOCK_INITIALIZED: GenericState<AuthUserState> = {
  data: {
    displayName: '',
    email: '',
    id: '',
    token: ''
  },
  status: STORE_STATUS_INITIALIZED,
  error: null
};

export const STORE_AUTH_FETCH_USER_MOCK_LOADING: GenericState<AuthUserState> = {
  ...STORE_AUTH_FETCH_USER_MOCK_INITIALIZED,
  status: STORE_STATUS_INITIALIZED
};

export const STORE_AUTH_FETCH_USER_MOCK_FINISHED: GenericState<AuthUserState> = {
  data: {
    displayName: 'Robson',
    email: 'robsond.mathias@gmail.com',
    id: '213213asdsa2131',
    token: '12321312'
  },
  status: STORE_STATUS_FINISHED,
  error: null
};

export const STORE_AUTH_FETCH_USER_MOCK_ERROR: GenericState<AuthUserState> = {
  ...STORE_AUTH_FETCH_USER_MOCK_INITIALIZED,
  error: {
    message: UNAUTHORIZED_CODE,
    name: UNAUTHORIZED_CODE
  },
  status: STORE_STATUS_ERROR
};
