import React from 'react';
import { Task, TaskStatus } from '@types';
import { Card, CardContent, Grid, IconButton, MenuItem, Select, Typography } from '@mui/material';
import { BiTrash } from 'react-icons/bi';

export enum ListEvent {
  REMOVE = 'remove',
  EDIT = 'edit',
  CHANGE_STATUS = 'status'
}

export type ListItemComponentProps = {
  task: Task;
  onEvent: (task: Task, event: ListEvent) => void;
};

export function ListItemComponent(props: ListItemComponentProps) {
  const { task, onEvent } = props;

  function handleRemove() {
    onEvent(task, ListEvent.REMOVE);
  }

  function handleEdit() {
    onEvent(task, ListEvent.EDIT);
  }

  function handleStatus(evt: any) {
    onEvent({ ...task, status: evt.target.value }, ListEvent.CHANGE_STATUS);
  }

  return (
    <Card>
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography
            variant="subtitle1"
            sx={{ cursor: 'pointer', flexGrow: 1 }}
            data-testid="edit"
            onClick={handleEdit}
          >
            {task.description}
          </Typography>
          <Select
            labelId={`task-status-label-${task.id}`}
            id={`task-status-${task.id}`}
            inputProps={{ ['data-testid']: 'status' }}
            value={task.status}
            label="Status"
            onChange={handleStatus}
          >
            <MenuItem value={TaskStatus.NEW}>Novo</MenuItem>
            <MenuItem value={TaskStatus.PROGRESS}>Trabalhando</MenuItem>
            <MenuItem value={TaskStatus.DONE}>Finalizado</MenuItem>
          </Select>
          <IconButton onClick={handleRemove} aria-label="Remover" data-testid="remove">
            <BiTrash />
          </IconButton>
        </Grid>
      </CardContent>
    </Card>
  );
}
