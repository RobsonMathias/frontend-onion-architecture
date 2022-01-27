/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';

import { act, fireEvent, render } from '@testing-library/react';
import '@fixtures/mocks';
import React from 'react';

import { NewComponent } from '../new.component';
import { setValueForm } from 'modules/task/new/__tests__/fixture';

const onSubmit = jest.fn();

describe('NewComponent', () => {
  it('should render successfully', () => {
    const { container } = render(<NewComponent onSubmit={onSubmit} />);
    expect(container).toMatchSnapshot();
  });

  it('should submit form successfully', async () => {
    const { getByTestId } = render(<NewComponent onSubmit={onSubmit} />);

    await act(async () => {
      setValueForm(fireEvent, getByTestId, { description: 'new description' });
    });

    expect(onSubmit).toHaveBeenCalledWith({
      description: 'new description'
    });
  });

  it('should render required errors', async () => {
    const { getByTestId, container } = render(<NewComponent onSubmit={onSubmit} />);

    await act(async () => {
      setValueForm(fireEvent, getByTestId, { description: '' });
    });

    expect(container).toHaveTextContent('Descrição é obrigatória.');
  });
});
