import { Mock } from './component.mock';
import { configureStore } from '@reduxjs/toolkit';

export const initializeStore = (reducer: any) => {
  return configureStore({ reducer });
};

const mockCallbackUseDispatch = jest.fn();
const mockUseDispatch = jest.fn(() => mockCallbackUseDispatch);
const mockUseSelector = jest.fn();
jest.mock('react-redux', () => ({
  Provider: Mock,
  useDispatch: mockUseDispatch,
  useSelector: mockUseSelector
}));

export const mockStore = {
  useDispatch: mockUseDispatch,
  useSelector: mockUseSelector,
  callbackUseDispatch: mockCallbackUseDispatch
};
