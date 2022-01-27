import { useDispatch, useSelector } from 'react-redux';
import { useService } from 'services';
import { SignUpPayload } from '@types';
import { fetchAuth } from '../stores/user.store';

export function useSignUp() {
  const { auth: service } = useService();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function signUp(payload: SignUpPayload) {
    dispatch(fetchAuth(service.signUp(payload)));
  }

  return { signUp, user };
}
