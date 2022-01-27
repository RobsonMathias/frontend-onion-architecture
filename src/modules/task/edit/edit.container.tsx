import React from 'react';

import { useTask } from '../hooks';
import { EditComponent } from './edit.component';
import { Task, TaskPayload } from '@types';
import { STORE_STATUS_LOADING } from 'constants/store';

export type EditContainerProps = {
  task: Task;
  onCompleted: (task?: Task) => void;
};

export function EditContainer(props: EditContainerProps) {
  const { task, onCompleted } = props;
  const { create, task: store } = useTask();

  function handleSubmit(payload: TaskPayload) {
    create(payload);
    onCompleted({ ...task, ...payload });
  }

  function handleCanceled() {
    onCompleted(undefined);
  }

  return (
    <EditComponent
      onSubmit={handleSubmit}
      onCanceled={handleCanceled}
      defaultValues={task}
      loading={store.status === STORE_STATUS_LOADING}
    />
  );
}
