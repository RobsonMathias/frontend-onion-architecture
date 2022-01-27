import React from 'react';

import { useAuth } from '../hooks';
import { Button } from '@mui/material';
import { BiLogOut } from 'react-icons/bi';

export function LogoutContainer() {
  const { logout } = useAuth();

  function handleClick() {
    logout();
  }

  return (
    <Button
      onClick={handleClick}
      data-testid="logout"
      type="button"
      variant="outlined"
      color="secondary"
      endIcon={<BiLogOut />}
    >
      Sair
    </Button>
  );
}
