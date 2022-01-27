import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { URL_HOME, URL_PUBLIC } from 'constants/urls';
import AuthenticatedPage from './authenticated/authenticated.page';
import PublicPage from './public/public.page';

export const Router = (props?: any) => {
  return (
    <>
      <BrowserRouter {...props}>
        <Route path={URL_PUBLIC} component={PublicPage} />
        <Route path={URL_HOME} component={AuthenticatedPage} />
      </BrowserRouter>
    </>
  );
};
