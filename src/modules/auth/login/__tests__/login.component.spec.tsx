/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';

import { act, fireEvent, render } from '@testing-library/react';
import '@fixtures/mocks';
import React from 'react';

import { setValueForm } from './fixture';
import { LoginComponent } from '../login.component';

describe('LoginComponent', () => {
  it('should render successfully', () => {
    const onSubmit = jest.fn();
    const { container } = render(<LoginComponent onSubmit={onSubmit} />);
    expect(container).toMatchSnapshot();
  });

  it('should render action successfully', () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <LoginComponent action={<span>action</span>} onSubmit={onSubmit} />
    );
    expect(container).toMatchSnapshot();
  });

  it('should submit form successfully', async () => {
    const onSubmit = jest.fn();
    const { getByTestId } = render(<LoginComponent onSubmit={onSubmit} />);

    await act(async () => {
      setValueForm(fireEvent, getByTestId);
    });

    expect(onSubmit).toHaveBeenCalledWith({ email: 'test@test.com', password: '123456789' });
  });

  it('should render required errors', async () => {
    const onSubmit = jest.fn();
    const { getByTestId, container } = render(<LoginComponent onSubmit={onSubmit} />);

    await act(async () => {
      fireEvent.click(getByTestId('submit'));
    });

    expect(container).toHaveTextContent('E-mail é obrigatório.');
    expect(container).toHaveTextContent('Senha é obrigatória.');
  });
});
