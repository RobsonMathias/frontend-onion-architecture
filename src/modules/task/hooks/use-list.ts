import { useDispatch, useSelector } from 'react-redux';
import { fetchList } from '../stores/tasks.store';
import { useService } from 'services';

export function useList() {
  const dispatch = useDispatch();
  const { task: service } = useService();
  const { list: tasks } = useSelector((state) => state.task);

  function list() {
    dispatch(fetchList(service.list()));
  }

  return { tasks, list };
}
