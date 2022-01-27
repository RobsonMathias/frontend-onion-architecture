import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { withAuth } from 'wrappers';
import React, { lazy, Suspense } from 'react';
import { PageLoader } from 'layouts/loaders';
import { LogoutContainer } from 'modules/auth';
import { Header } from 'layouts/header';

const TaskPage = lazy(() => import('./tasks/list.page'));

function AuthenticatedPage() {
  const { path } = useRouteMatch();

  return (
    <>
      <Header action={<LogoutContainer />} />
      <Switch>
        <Suspense fallback={<PageLoader />}>
          <Route path={path}>
            <Route exact path={path} component={TaskPage} />
          </Route>
        </Suspense>
      </Switch>
    </>
  );
}

export default withAuth(AuthenticatedPage);
