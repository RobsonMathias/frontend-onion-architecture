import React from 'react';

// eslint-disable-next-line react/display-name
const mock = (Component: any) => (props: any) => {
  return <Component {...props} />;
};
const mockUseSW = jest.fn(() => ({ updateAvailable: false }));

export const mockWrappers = {
  useSW: mockUseSW,
  withAuth: mock,
  withSituation: mock,
  withServiceWorker: mock
};
