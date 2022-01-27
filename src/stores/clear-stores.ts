import { clear as tasks } from 'modules/task/stores/tasks.store';

export function clearAllStores(dispatch: any) {
  dispatch(tasks());
}
