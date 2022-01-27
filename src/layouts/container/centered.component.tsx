import React from 'react';
import { Grid, Container, Box } from '@mui/material';

type CenteredComponentProps = React.HTMLAttributes<HTMLDivElement> & {
  children: NonNullable<React.ReactNode>;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
};

export function CenteredComponent(props: CenteredComponentProps) {
  const { children, maxWidth = 'xs', ...isProps } = props;

  return (
    <Box py={10}>
      <Grid {...isProps} container alignItems="center">
        <Container maxWidth={maxWidth}>{children}</Container>
      </Grid>
    </Box>
  );
}
