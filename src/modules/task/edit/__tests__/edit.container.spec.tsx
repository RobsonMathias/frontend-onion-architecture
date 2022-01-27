/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';

import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { EditContainer } from '../edit.container';
import { EditComponentProps } from '../edit.component';
import { Task, TaskStatus } from '@types';
import { mockTaskStore } from '@fixtures/stores/task';

const taskMock: Task = {
  description: 'description',
  status: TaskStatus.NEW,
  id: 'id'
};

function Mock({ onCanceled, onSubmit }: EditComponentProps) {
  return (
    <>
      <div data-testid="mock" onClick={() => onSubmit(taskMock)} />
      <div data-testid="mock-canceled" onClick={() => onCanceled()} />
    </>
  );
}

const mockCreate = jest.fn();
jest.mock('../../hooks', () => {
  return {
    useTask: jest.fn(() => ({
      create: jest.fn((...args) => mockCreate(...args)),
      task: mockTaskStore.task.patch
    }))
  };
});
jest.mock(__dirname + '/../edit.component', () => ({
  EditComponent: Mock
}));
const onCompleted = jest.fn();

describe('EditContainer', () => {
  const defaultProps = {
    task: taskMock,
    onCompleted
  };

  it('should render successfully', () => {
    const { container } = render(<EditContainer {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('should call onCompleted with a task', async () => {
    const { getByTestId } = render(<EditContainer {...defaultProps} />);

    await act(async () => {
      fireEvent.click(getByTestId('mock'));
    });

    expect(mockCreate).toHaveBeenCalledWith({
      description: 'description',
      id: 'id',
      status: 'new'
    });
    expect(onCompleted).toHaveBeenCalledWith({
      description: 'description',
      id: 'id',
      status: 'new'
    });
  });

  it('should call onCompleted with undefined value', async () => {
    const { getByTestId } = render(<EditContainer {...defaultProps} />);

    await act(async () => {
      fireEvent.click(getByTestId('mock-canceled'));
    });

    expect(mockCreate).not.toHaveBeenCalled();
    expect(onCompleted).toHaveBeenCalledWith(undefined);
  });
});
