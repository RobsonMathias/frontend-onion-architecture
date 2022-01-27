/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';

import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { NewContainer } from '../new.container';
import { NewComponentProps } from '../new.component';
import { TaskPayload } from '@types';
import { mockTaskStore } from '@fixtures/stores/task';

const taskMock: TaskPayload = {
  description: 'description'
};

function Mock({ onSubmit, loading }: NewComponentProps) {
  return (
    <>
      <div data-testid="mock" onClick={() => onSubmit(taskMock)}>
        {loading}
      </div>
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
jest.mock(__dirname + '/../new.component', () => ({
  NewComponent: Mock
}));

describe('NewContainer', () => {
  it('should render successfully', () => {
    const { container } = render(<NewContainer />);
    expect(container).toMatchSnapshot();
  });

  it('should call onCompleted with a task', async () => {
    const { getByTestId } = render(<NewContainer />);

    await act(async () => {
      fireEvent.click(getByTestId('mock'));
    });

    expect(mockCreate).toHaveBeenCalledWith({
      description: 'description'
    });
  });
});
