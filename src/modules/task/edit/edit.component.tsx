import React, { useEffect } from 'react';

import { TaskPayload } from '@types';
import { FieldErrors, useForm } from 'react-hook-form';
import { Grid, IconButton, TextField } from '@mui/material';
import { BiCheck, BiX } from 'react-icons/bi';

export type EditComponentProps = {
  onSubmit: (payload: TaskPayload) => void;
  onCanceled: () => void;
  loading?: boolean;
  defaultValues: TaskPayload;
};

export function EditComponent(props: EditComponentProps) {
  const { onSubmit, loading, defaultValues, onCanceled } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted }
  } = useForm({ defaultValues });

  function hasError(error?: FieldErrors): string {
    const { message } = error || { message: '' };
    return isSubmitted ? message : '';
  }

  function submit(data: TaskPayload) {
    onSubmit(data);
    reset();
  }

  function handleCanceled() {
    onCanceled();
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
        <IconButton
          aria-label="Cancelar"
          onClick={handleCanceled}
          disabled={loading}
          data-testid="cancel"
        >
          <BiX size={24} />
        </IconButton>
        <IconButton aria-label="Adicionar" disabled={loading} data-testid="submit" type="submit">
          <BiCheck size={24} />
        </IconButton>
      </Grid>
    </form>
  );
}
