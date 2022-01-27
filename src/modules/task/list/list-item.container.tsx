import React, { useEffect, useState } from 'react';

import { ListItemComponent, ListEvent } from './list-item.component';
import { Task } from '@types';
import { EditContainer } from '../edit';
import { useTask } from '../hooks';

export type ListItemContainerProps = {
  task: Task;
};

export function ListItemContainer(props: ListItemContainerProps) {
  const { task } = props;
  const { remove, setStatus } = useTask();
  const [editTask, setEditTask] = useState(false);

  function handleEvent(task: Task, event: ListEvent) {
    switch (event) {
      case ListEvent.CHANGE_STATUS:
        setStatus(task, task.status);
        break;
      case ListEvent.EDIT:
        setEditTask(true);
        break;
      case ListEvent.REMOVE:
        remove(task.id).then();
        break;
    }
  }

  function handleComplete() {
    setEditTask(false);
  }

  return (
    <>
      {editTask ? (
        <EditContainer task={task} onCompleted={handleComplete} />
      ) : (
        <ListItemComponent task={task} onEvent={handleEvent} />
      )}
    </>
  );
}
