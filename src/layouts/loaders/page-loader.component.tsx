import React from 'react';

import { LoadersRoot } from './loaders.styles';
import { CircularProgress } from '@mui/material';

export type PageLoaderProps = {
  brand?: boolean;
};

export function PageLoader({ brand }: PageLoaderProps) {
  return (
    <LoadersRoot bgcolor={brand ? 'common.black' : ''}>
      <CircularProgress color="secondary" />
    </LoadersRoot>
  );
}
