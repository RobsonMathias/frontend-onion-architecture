import React from 'react';

import { useTask } from '../hooks';
import { NewComponent } from './new.component';
import { TaskPayload } from '@types';
import { STORE_STATUS_LOADING } from 'constants/store';

export function NewContainer() {
  const { task, create } = useTask();

  function handleSubmit(payload: TaskPayload) {
    create(payload);
  }

  return <NewComponent onSubmit={handleSubmit} loading={task.status === STORE_STATUS_LOADING} />;
}
