export enum TaskStatus {
  NEW = 'new',
  DONE = 'done',
  PROGRESS = 'progress'
}

export interface Task {
  description: string;
  id: string;
  status: TaskStatus;
}

export interface TaskPayload extends Partial<Task> {}

export interface TasksResponse {
  data: Task[];
}

export interface TaskResponse extends Task {}
