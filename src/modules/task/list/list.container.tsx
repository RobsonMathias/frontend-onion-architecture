import React, { useEffect } from 'react';

import { useList } from '../hooks';
import { LoadingComponent } from './loading.component';
import { STORE_STATUS_FINISHED } from 'constants/store';
import { Box } from '@mui/material';
import { ListItemContainer } from './list-item.container';

export function ListContainer() {
  const { list, tasks } = useList();

  useEffect(() => {
    list();
  }, []);

  return tasks.status === STORE_STATUS_FINISHED ? (
    <>
      {tasks.data.map((task) => (
        <Box key={task.id} mb={1}>
          <ListItemContainer task={task} />
        </Box>
      ))}
    </>
  ) : (
    <LoadingComponent />
  );
}
