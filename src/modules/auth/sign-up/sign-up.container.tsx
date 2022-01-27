import React from 'react';

import { SignUpComponent } from './sign-up.component';
import { useSignUp } from '../hooks';
import { STORE_STATUS_LOADING } from 'constants/store';
import { SignUpPayload } from '@types';

export function SignUpContainer() {
  const { signUp, user } = useSignUp();

  function onSubmit(payload: SignUpPayload) {
    signUp(payload);
  }

  return <SignUpComponent onSubmit={onSubmit} loading={user.status === STORE_STATUS_LOADING} />;
}
