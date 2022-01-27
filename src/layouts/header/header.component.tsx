import React from 'react';
import { AppBar, Container, Toolbar, Typography } from '@mui/material';

export type PageLoaderProps = {
  action?: React.ReactNode;
};

export function Header({ action }: PageLoaderProps) {
  return (
    <AppBar position="fixed" color="transparent">
      <Container maxWidth="sm">
        <Toolbar variant="regular">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            To-Do List
          </Typography>
          {action}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
