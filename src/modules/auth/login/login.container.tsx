import React from 'react';

import { LoginComponent } from './login.component';
import { useLogin } from '../hooks';
import { LoginPayload } from '@types';
import { STORE_STATUS_LOADING } from 'constants/store';

export interface LoginContainerProps {
  action?: React.ReactNode;
}

export function LoginContainer(props: LoginContainerProps) {
  const { action } = props;
  const { login, auth } = useLogin();

  function handleSubmit(form: LoginPayload) {
    login(form.email, form.password);
  }

  return (
    <>
      <LoginComponent
        action={action}
        onSubmit={handleSubmit}
        loading={auth.user.status === STORE_STATUS_LOADING}
      />
    </>
  );
}
