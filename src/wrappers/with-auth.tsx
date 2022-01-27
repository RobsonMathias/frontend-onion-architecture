import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { URL_PUBLIC } from 'constants/urls';
import { UNAUTHORIZED_CODE } from 'constants/request-code';
import { useAuth } from 'modules/auth';

export const withAuth = <P extends object>(Component: React.ComponentType<P>): React.FC<P> => {
  function WithAuth(props: P) {
    const {
      onAuthStateChange,
      auth: { error }
    } = useAuth();
    const router = useHistory();

    function redirectToLogin() {
      router.push(URL_PUBLIC);
    }

    useEffect(() => {
      const subscribed = onAuthStateChange(redirectToLogin);
      return () => {
        subscribed.unsubscribe();
      };
    }, []);

    useEffect(() => {
      if (error && error.name === UNAUTHORIZED_CODE) {
        redirectToLogin();
      }
    }, [error]);

    return <Component {...props} />;
  }

  return WithAuth;
};
