/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';

import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { ListItemContainer } from '../list-item.container';
import { Task, TaskStatus } from '@types';
import { ListEvent, ListItemComponentProps } from '../list-item.component';
import { sleep } from '@fixtures/wait-for';

const taskMock: Task = {
  description: 'description',
  status: TaskStatus.DONE,
  id: '123'
};

function MockListItem({ onEvent }: ListItemComponentProps) {
  return (
    <>
      <div data-testid="edit" onClick={() => onEvent(taskMock, ListEvent.EDIT)} />
      <div data-testid="status" onClick={() => onEvent(taskMock, ListEvent.CHANGE_STATUS)} />
      <div data-testid="remove" onClick={() => onEvent(taskMock, ListEvent.REMOVE)} />
    </>
  );
}

function MockEditContainer({ onCompleted }: any) {
  return (
    <>
      <div data-testid="mock-edit-container" onClick={() => onCompleted()} />
    </>
  );
}

const mockRemove = jest.fn();
const mockSetStatus = jest.fn();
const mockUseTask = jest.fn(() => ({
  remove: mockRemove,
  setStatus: mockSetStatus
}));
jest.mock('../../hooks', () => ({
  // @ts-ignore
  useTask: jest.fn((...args) => mockUseTask(...args))
}));
jest.mock('./../list-item.component', () => ({
  ...jest.requireActual('./../list-item.component'),
  ListItemComponent: MockListItem
}));
jest.mock('./../../edit', () => ({
  EditContainer: MockEditContainer
}));

describe('ListItemContainer', () => {
  it('should call handleEvent with CHANGE_STATUS successfully', async () => {
    const { getByTestId } = render(<ListItemContainer task={taskMock} />);

    await act(async () => {
      fireEvent.click(getByTestId('status'));
    });

    expect(mockSetStatus).toHaveBeenCalledWith(
      {
        description: 'description',
        status: 'done',
        id: '123'
      },
      'done'
    );
  });

  it('should call handleEvent with REMOVE successfully', async () => {
    mockRemove.mockResolvedValue({});
    const { getByTestId } = render(<ListItemContainer task={taskMock} />);

    await act(async () => {
      fireEvent.click(getByTestId('remove'));
    });

    expect(mockRemove).toHaveBeenCalledWith('123');
  });

  it('should call handleEvent with EDIT successfully', async () => {
    const { getByTestId } = render(<ListItemContainer task={taskMock} />);

    await act(async () => {
      fireEvent.click(getByTestId('edit'));
    });

    expect(getByTestId('mock-edit-container')).toBeTruthy();
  });

  it('should call handleComplete successfully', async () => {
    const { getByTestId } = render(<ListItemContainer task={taskMock} />);

    await act(async () => {
      fireEvent.click(getByTestId('edit'));
      await sleep();
      fireEvent.click(getByTestId('mock-edit-container'));
    });

    expect(getByTestId('edit')).toBeTruthy();
  });
});
