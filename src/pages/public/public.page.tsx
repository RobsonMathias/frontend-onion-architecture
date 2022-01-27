import { Switch, Route, useRouteMatch } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import { URL_LOGIN, URL_SIGN_UP } from 'constants/urls';
import { PageLoader } from 'layouts/loaders';

const LoginPage = lazy(() => import('./login/login.page'));
const SignUpPage = lazy(() => import('./sign-up/sign-up.page'));

function PublicPage() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Suspense fallback={<PageLoader />}>
        <Route path={path}>
          <Route exact path={URL_SIGN_UP} component={SignUpPage} />
          <Route exact path={URL_LOGIN} component={LoginPage} />
        </Route>
      </Suspense>
    </Switch>
  );
}

export default PublicPage;
