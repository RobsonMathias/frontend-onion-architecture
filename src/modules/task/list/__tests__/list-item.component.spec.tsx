/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';

import { act, fireEvent, render } from '@testing-library/react';
import '@fixtures/mocks';
import React from 'react';

import { ListItemComponent, ListItemComponentProps } from '../list-item.component';
import { TaskStatus } from '@types';

const onEvent = jest.fn();
const defaultProps: ListItemComponentProps = {
  task: {
    id: 'id',
    status: TaskStatus.NEW,
    description: 'description'
  },
  onEvent
};

describe('ListItemComponent', () => {
  it('should render successfully', () => {
    const { container } = render(<ListItemComponent {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('should call onEvent with remove successfully', async () => {
    const { getByTestId } = render(<ListItemComponent {...defaultProps} />);

    await act(async () => {
      fireEvent.click(getByTestId('remove'));
    });

    expect(onEvent).toHaveBeenCalledWith(
      {
        id: 'id',
        status: 'new',
        description: 'description'
      },
      'remove'
    );
  });

  it('should call onEvent with edit successfully', async () => {
    const { getByTestId } = render(<ListItemComponent {...defaultProps} />);

    await act(async () => {
      fireEvent.click(getByTestId('edit'));
    });

    expect(onEvent).toHaveBeenCalledWith(
      {
        id: 'id',
        status: 'new',
        description: 'description'
      },
      'edit'
    );
  });

  it('should call onEvent with edit successfully', async () => {
    const { getByTestId } = render(<ListItemComponent {...defaultProps} />);

    await act(async () => {
      fireEvent.click(getByTestId('edit'));
    });

    expect(onEvent).toHaveBeenCalledWith(
      {
        id: 'id',
        status: 'new',
        description: 'description'
      },
      'edit'
    );
  });

  it('should call onEvent with status successfully', async () => {
    const { getByTestId } = render(<ListItemComponent {...defaultProps} />);

    await act(async () => {
      fireEvent.change(getByTestId('status'), { target: { value: 'done' } });
    });

    expect(onEvent).toHaveBeenCalledWith(
      {
        id: 'id',
        status: 'done',
        description: 'description'
      },
      'status'
    );
  });
});
