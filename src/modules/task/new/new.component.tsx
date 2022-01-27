import React, { useEffect } from 'react';

import { TaskPayload } from '@types';
import { FieldErrors, useForm } from 'react-hook-form';
import { Button, Grid, TextField } from '@mui/material';
import { BiPlus } from 'react-icons/bi';

export type NewComponentProps = {
  onSubmit: (payload: TaskPayload) => void;
  loading?: boolean;
};

export function NewComponent(props: NewComponentProps) {
  const { onSubmit, loading } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted }
  } = useForm();

  function hasError(error?: FieldErrors): string {
    const { message } = error || { message: '' };
    return isSubmitted ? message : '';
  }

  function submit(data: TaskPayload) {
    onSubmit(data);
    reset();
  }

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Grid container>
        <TextField
          variant="filled"
          type="text"
          inputProps={{ 'data-testid': 'description' }}
          label="Insira uma atividade"
          error={!!hasError(errors.description)}
          helperText={hasError(errors.description)}
          {...register('description', {
            required: 'Descrição é obrigatória.'
          })}
          sx={{ flexGrow: 1 }}
        />
        <Button
          aria-label="Adicionar"
          disabled={loading}
          data-testid="submit"
          type="submit"
          variant="contained"
          color="secondary"
        >
          <BiPlus size={24} />
        </Button>
      </Grid>
    </form>
  );
}
