import { useDispatch, useSelector } from 'react-redux';
import { fetchAuth, clear } from '../stores/user.store';
import { useService } from 'services';

export function useAuth() {
  const dispatch = useDispatch();
  const { auth: service } = useService();
  const { user: auth } = useSelector((state) => state.auth);

  function logout() {
    service.signOut();
    dispatch(clear());
  }

  function onAuthStateChange(callback?: () => void) {
    return service.onAuthStateChange((auth) => {
      if (auth) {
        dispatch(fetchAuth(Promise.resolve(auth)));
      } else {
        callback && callback();
      }
    });
  }

  return { onAuthStateChange, auth, logout };
}
