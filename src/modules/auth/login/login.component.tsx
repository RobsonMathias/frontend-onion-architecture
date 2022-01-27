import React, { useEffect } from 'react';

import { LoginPayload } from '@types';
import { FieldErrors, useForm } from 'react-hook-form';
import { Box, Button, Grid, TextField } from '@mui/material';

export type LoginComponentProps = {
  onSubmit: (payload: LoginPayload) => void;
  loading?: boolean;
  action?: React.ReactNode;
};

export function LoginComponent(props: LoginComponentProps) {
  const { onSubmit, loading, action } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted }
  } = useForm({ mode: 'all' });

  function hasError(error?: FieldErrors): string {
    const { message } = error || { message: '' };
    return isSubmitted ? message : '';
  }

  function submit(data: LoginPayload) {
    onSubmit(data);
  }

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Box mb={2}>
        <TextField
          variant="filled"
          fullWidth={true}
          type="email"
          inputProps={{ 'data-testid': 'email' }}
          label="E-mail"
          error={!!hasError(errors.email)}
          helperText={hasError(errors.email)}
          placeholder="email@exemplo.com"
          {...register('email', {
            required: 'E-mail é obrigatório.'
          })}
        />
      </Box>
      <Box mb={2}>
        <TextField
          type="password"
          variant="filled"
          inputProps={{ 'data-testid': 'password' }}
          fullWidth={true}
          autoComplete="off"
          label="Senha"
          placeholder="Digite sua senha"
          error={!!hasError(errors.password)}
          helperText={hasError(errors.password)}
          {...register('password', {
            minLength: {
              value: 9,
              message: 'Senha precisa ter no mínimo 9 caracteres.'
            },
            required: 'Senha é obrigatória.'
          })}
        />
      </Box>
      <Grid container spacing={2} justifyContent="end">
        {action && <Grid item>{action}</Grid>}
        <Grid item>
          <Button
            disabled={loading}
            data-testid="submit"
            type="submit"
            variant="contained"
            color="secondary"
          >
            Acessar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
