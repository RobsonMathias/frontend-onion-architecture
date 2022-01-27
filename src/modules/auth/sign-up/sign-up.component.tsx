import React, { useEffect } from 'react';

import { SignUpPayload } from '@types';
import { Box, Button, TextField } from '@mui/material';
import { FieldErrors, useForm } from 'react-hook-form';

type SignUpComponentProps = {
  onSubmit: (payload: SignUpPayload) => void;
  loading?: boolean;
};

export function SignUpComponent(props: SignUpComponentProps) {
  const { onSubmit, loading } = props;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted }
  } = useForm({ mode: 'all' });

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  function hasError(error?: FieldErrors): string {
    const { message } = error || { message: '' };
    return isSubmitted ? message : '';
  }

  function submit(data: SignUpPayload) {
    onSubmit(data);
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Box mb={2}>
        <TextField
          variant="standard"
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
          variant="standard"
          fullWidth={true}
          type="text"
          inputProps={{ 'data-testid': 'name' }}
          label="Nome"
          placeholder="Digite seu nome"
          error={!!hasError(errors.name)}
          helperText={hasError(errors.name)}
          {...register('name', {
            required: 'Nome é obrigatório.'
          })}
        />
      </Box>
      <Box mb={2}>
        <TextField
          type="password"
          variant="standard"
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
      <Button
        disabled={loading}
        data-testid="submit"
        type="submit"
        variant="contained"
        color="secondary"
      >
        Cadastrar
      </Button>
    </form>
  );
}
