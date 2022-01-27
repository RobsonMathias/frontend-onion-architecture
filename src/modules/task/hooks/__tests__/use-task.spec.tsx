/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import { mockServices, mockStore } from '@fixtures/mocks';
import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { mockTaskStore } from '@fixtures/stores/task';

import { useTask } from '../use-task';
import { Task, TaskPayload, TaskStatus } from '@types';

const mockPatchTask = jest.fn();
jest.mock('../../stores/patch.store', () => ({
  patchTask: jest.fn((...args) => mockPatchTask(...args))
}));
const mockList = jest.fn();
jest.mock('../use-list', () => ({
  useList: jest.fn(() => ({ list: mockList }))
}));
const { task } = mockServices;
const { useSelector } = mockStore;

function Component() {
  const { create, update, setStatus, remove } = useTask();
  const payload: TaskPayload = {
    description: 'Test'
  };
  const payloadTask: Task = {
    status: TaskStatus.NEW,
    id: '123',
    description: 'Test'
  };

  return (
    <>
      <div data-testid="mock-create" onClick={() => create(payload)} />
      <div data-testid="mock-update" onClick={() => update(payloadTask)} />
      <div data-testid="mock-remove" onClick={() => remove('123')} />
      <div data-testid="mock-set-status" onClick={() => setStatus(payloadTask, TaskStatus.DONE)} />
    </>
  );
}

describe('useTask', () => {
  it('should call create successfully', async () => {
    useSelector.mockReturnValue(mockTaskStore.task);
    const given = { data: 'MOCKED' };
    task.create.mockImplementation(() => given);

    const { getByTestId } = render(<Component />);
    await act(async () => {
      fireEvent.click(getByTestId('mock-create'));
    });

    expect(mockList).toHaveBeenCalledWith();
    expect(mockPatchTask).toHaveBeenCalledWith({ data: 'MOCKED' });
    expect(task.create).toHaveBeenCalled();
  });

  it('should call update successfully', async () => {
    useSelector.mockReturnValue(mockTaskStore.task);
    const given = { data: 'MOCKED' };
    task.update.mockImplementation(() => given);

    const { getByTestId } = render(<Component />);
    await act(async () => {
      fireEvent.click(getByTestId('mock-update'));
    });

    expect(mockList).toHaveBeenCalledWith();
    expect(mockPatchTask).toHaveBeenCalledWith({ data: 'MOCKED' });
    expect(task.update).toHaveBeenCalled();
  });

  it('should call remove successfully', async () => {
    useSelector.mockReturnValue(mockTaskStore.task);
    const given = { data: 'MOCKED' };
    task.delete.mockImplementation(() => given);

    const { getByTestId } = render(<Component />);
    await act(async () => {
      fireEvent.click(getByTestId('mock-remove'));
    });

    expect(mockList).toHaveBeenCalledWith();
    expect(task.delete).toHaveBeenCalled();
  });

  it('should call setStatus successfully', async () => {
    useSelector.mockReturnValue(mockTaskStore.task);
    const given = { data: 'MOCKED' };
    task.update.mockImplementation(() => given);

    const { getByTestId } = render(<Component />);
    await act(async () => {
      fireEvent.click(getByTestId('mock-set-status'));
    });

    expect(mockList).toHaveBeenCalledWith();
    expect(mockPatchTask).toHaveBeenCalledWith({ data: 'MOCKED' });
    expect(task.update).toHaveBeenCalled();
  });
});
