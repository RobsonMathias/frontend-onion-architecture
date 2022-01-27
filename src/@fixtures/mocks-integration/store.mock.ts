import { configureStore } from '@reduxjs/toolkit';

export const initializeStore = (reducer: any) => {
  return configureStore({ reducer });
};

const mockStores = jest.fn(() => ({}));
jest.mock('react-redux', () => {
  const actual = jest.requireActual('react-redux');
  const useSelector = jest.fn((...args) => {
    return {
      ...actual.useSelector(...args),
      ...mockStores()
    };
  });
  return {
    ...actual,
    useSelector
  };
});

export const mockStoreIntegration = { stores: mockStores };
