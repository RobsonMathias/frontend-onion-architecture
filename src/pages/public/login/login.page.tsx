import { GoogleContainer, LoginContainer, useAuth } from 'modules/auth';
import { CenteredComponent } from 'layouts/container';
import React, { useEffect } from 'react';
import { STORE_STATUS_FINISHED } from 'constants/store';
import { useHistory } from 'react-router-dom';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { URL_HOME } from 'constants/urls';

const LoginPage = () => {
  const router = useHistory();
  const { auth, onAuthStateChange } = useAuth();

  useEffect(() => {
    if (auth.status === STORE_STATUS_FINISHED) {
      router.push(URL_HOME);
    }
  }, [auth.status]);

  useEffect(() => {
    const subscribed = onAuthStateChange();
    return () => {
      subscribed.unsubscribe();
    };
  }, []);

  return (
    <CenteredComponent>
      <Box mb={5}>
        <Typography variant={'h2'} component={'h1'}>
          Olá
        </Typography>
      </Box>
      <GoogleContainer />
      <Box mt={2} mb={1}>
        <Grid container alignItems="center">
          <Grid item xs={4}>
            <Divider />
          </Grid>
          <Grid item xs={4}>
            <Typography component="p" variant="overline" align="center" color="text.secondary">
              OU
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Divider />
          </Grid>
        </Grid>
      </Box>
      <LoginContainer action={<Button>Criar conta</Button>} />
    </CenteredComponent>
  );
};

export default LoginPage;
