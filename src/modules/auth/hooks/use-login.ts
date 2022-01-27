import { useDispatch, useSelector } from 'react-redux';
import { useService } from 'services';
import { fetchAuth } from '../stores/user.store';

export function useLogin() {
  const dispatch = useDispatch();
  const { auth: service } = useService();
  const { auth } = useSelector((state) => state);

  function login(email: string, password: string) {
    const fetch = service.signIn(email, password);
    dispatch(fetchAuth(fetch));
  }

  function loginWithGoogle() {
    const fetch = service.signInWithGoogle();
    dispatch(fetchAuth(fetch));
  }

  return { login, auth, loginWithGoogle };
}
