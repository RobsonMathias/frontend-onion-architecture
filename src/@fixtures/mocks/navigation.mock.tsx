import React from 'react';

const setData = jest.fn();
const mockUseUI = jest.fn(() => ({ setData }));

const query = { get: jest.fn(), set: jest.fn() };
const set = jest.fn();
const setAll = jest.fn();
const mockUseQuery = jest.fn(() => ({ query, setAll, set }));

const replace = jest.fn();
const mockUseURL = jest.fn(() => ({ replace }));

const mockNavBar = React.forwardRef((props, ref) => <div {...props} />);

export const mockNavigation = {
  NavBar: mockNavBar,
  useQuery: mockUseQuery,
  query,
  setAll,
  set,
  useUI: mockUseUI,
  setData,
  useURL: mockUseURL,
  replace
};
