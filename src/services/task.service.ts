import { Service } from './service';
import { TaskPayload, TaskResponse, TasksResponse, TaskStatus } from '@types';

export class TaskService {
  constructor(private service: Service) {}

  list(): Promise<TasksResponse> {
    return this.service.get<TasksResponse>('/tasks');
  }

  create(payload: TaskPayload): Promise<TaskResponse> {
    return this.service.post<TaskPayload, TaskResponse>('/tasks', {
      ...payload,
      status: TaskStatus.NEW
    });
  }

  update(payload: TaskPayload): Promise<TaskResponse> {
    return this.service.post<TaskPayload, TaskResponse>(`/tasks/${payload.id}`, payload);
  }

  delete(id: string): Promise<unknown> {
    return this.service.delete(id);
  }
}
