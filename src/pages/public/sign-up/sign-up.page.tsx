import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { SignUpContainer, useAuth } from 'modules/auth';
import { CenteredComponent } from 'layouts/container';
import { STORE_STATUS_FINISHED } from 'constants/store';
import { URL_HOME } from 'constants/urls';
import { Box, Typography } from '@mui/material';

const SignUpPage = () => {
  const router = useHistory();
  const { auth } = useAuth();

  useEffect(() => {
    if (auth.status === STORE_STATUS_FINISHED) {
      router.push(URL_HOME);
    }
  }, [auth.status]);

  return (
    <CenteredComponent>
      <Box mb={5}>
        <Typography variant="h3">Criar conta</Typography>
      </Box>
      <SignUpContainer />
    </CenteredComponent>
  );
};

export default SignUpPage;
