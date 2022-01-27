import React from 'react';

import { useLogin } from '../hooks';
import { Button } from '@mui/material';
import { AiFillGooglePlusSquare } from 'react-icons/ai';

export function GoogleContainer() {
  const { loginWithGoogle } = useLogin();

  const handleClick = () => {
    loginWithGoogle();
  };

  return (
    <Button
      onClick={handleClick}
      data-testid="google-submit"
      type="button"
      variant="outlined"
      color="secondary"
      fullWidth={true}
      endIcon={<AiFillGooglePlusSquare size={18} />}
    >
      Entrar com Google
    </Button>
  );
}
