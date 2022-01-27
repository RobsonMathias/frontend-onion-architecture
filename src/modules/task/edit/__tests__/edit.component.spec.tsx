/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';

import { act, fireEvent, render } from '@testing-library/react';
import '@fixtures/mocks';
import React from 'react';

import { EditComponent, EditComponentProps } from '../edit.component';
import { TaskStatus } from '@types';
import { setValueForm } from './fixture';

const onCanceled = jest.fn();
const onSubmit = jest.fn();
const defaultProps: EditComponentProps = {
  defaultValues: {
    id: 'id',
    status: TaskStatus.NEW,
    description: 'description'
  },
  onSubmit,
  onCanceled
};

describe('EditComponent', () => {
  it('should render successfully', () => {
    const { container } = render(<EditComponent {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('should submit form successfully', async () => {
    const { getByTestId } = render(<EditComponent {...defaultProps} />);

    await act(async () => {
      setValueForm(fireEvent, getByTestId, { description: 'new description' });
    });

    expect(onSubmit).toHaveBeenCalledWith({
      id: 'id',
      status: 'new',
      description: 'new description'
    });
  });

  it('should call onCanceled successfully', async () => {
    const { getByTestId } = render(<EditComponent {...defaultProps} />);

    await act(async () => {
      fireEvent.click(getByTestId('cancel'));
    });

    expect(onCanceled).toHaveBeenCalled();
  });

  it('should render required errors', async () => {
    const { getByTestId, container } = render(<EditComponent {...defaultProps} />);

    await act(async () => {
      setValueForm(fireEvent, getByTestId, { description: '' });
    });

    expect(container).toHaveTextContent('Descrição é obrigatória.');
  });
});
