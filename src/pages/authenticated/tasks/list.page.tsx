import React from 'react';
import { CenteredComponent } from 'layouts/container';
import { ListContainer, NewContainer } from 'modules/task';
import { Box } from '@mui/material';

const ListPage = () => {
  return (
    <CenteredComponent>
      <Box mb={2}>
        <NewContainer />
      </Box>
      <ListContainer />
    </CenteredComponent>
  );
};

export default ListPage;
