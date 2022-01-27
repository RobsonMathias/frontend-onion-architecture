import React from 'react';

function Mock({ children }: any) {
  return <>{children}</>;
}

const mockUseLocation = jest.fn(() => ({}));
const goBack = jest.fn();
const push = jest.fn();
const listen = jest.fn();
const mockUseHistory = jest.fn(() => ({ push, goBack, location: {}, listen, action: 'ACTION' }));
const useRouteMatch = () => ({ push: jest.fn(), url: '/mocked' });
const mockUseParams = jest.fn();
const mockNavLink = React.forwardRef(
  ({ to, children, activeClassName, className, 'data-testid': testId }: any, ref) => (
    <a
      className={`${className}-${activeClassName}`}
      href={to}
      children={children}
      data-testid={testId}
    />
  )
);
const Link = React.forwardRef((props, ref) => <p {...props} />);
const mockRoute = React.forwardRef((props, ref) => <div />);
const mockSwitch = React.forwardRef((props, ref) => <div />);
jest.mock('react-router-dom', () => ({
  Redirect: Mock,
  BrowserRouter: Mock,
  useHistory: mockUseHistory,
  useParams: mockUseParams,
  useRouteMatch,
  NavLink: mockNavLink,
  Route: mockRoute,
  Switch: mockSwitch,
  useLocation: mockUseLocation
}));

export const mockRouter = {
  useHistory: mockUseHistory,
  Link,
  useParams: mockUseParams,
  NavLink: mockNavLink,
  useLocation: mockUseLocation,
  goBack,
  push,
  listen
};
