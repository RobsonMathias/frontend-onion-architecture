/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';

import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';
import '@fixtures/mocks';

import { setValueForm } from './fixture';
import { SignUpComponent } from '../sign-up.component';

describe('SignUpComponent', () => {
  it('should render successfully', () => {
    const onSubmit = jest.fn();
    const { container } = render(<SignUpComponent onSubmit={onSubmit} />);
    expect(container).toMatchSnapshot();
  });

  it('should submit form successfully', async () => {
    const onSubmit = jest.fn();
    const { getByTestId } = render(<SignUpComponent onSubmit={onSubmit} />);

    await act(async () => {
      setValueForm(fireEvent, getByTestId);
    });

    expect(onSubmit).toHaveBeenCalledWith({
      email: 'test@test.com',
      name: 'Test',
      password: '123456789'
    });
  });

  it('should render required errors', async () => {
    const onSubmit = jest.fn();
    const { getByTestId, container } = render(<SignUpComponent onSubmit={onSubmit} />);

    await act(async () => {
      fireEvent.click(getByTestId('submit'));
    });

    expect(container).toHaveTextContent('E-mail é obrigatório.');
    expect(container).toHaveTextContent('Senha é obrigatória.');
    expect(container).toHaveTextContent('Nome é obrigatório.');
  });
});
