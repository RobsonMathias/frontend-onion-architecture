import { useDispatch, useSelector } from 'react-redux';
import { patchTask } from '../stores/patch.store';
import { useService } from 'services';
import { Task, TaskPayload, TaskStatus } from '@types';
import { useList } from './use-list';

export function useTask() {
  const dispatch = useDispatch();
  const { list: reFetch } = useList();
  const { task: service } = useService();
  const { patch: task } = useSelector((state) => state.task);

  function create(payload: TaskPayload) {
    dispatch(patchTask(service.create(payload)));
    reFetch();
  }

  function update(payload: Task) {
    dispatch(patchTask(service.update(payload)));
    reFetch();
  }

  async function remove(id: string) {
    await service.delete(id);
    reFetch();
  }

  function setStatus(payload: Task, status: TaskStatus) {
    update({ ...payload, status });
  }

  return { create, update, remove, setStatus, task };
}
