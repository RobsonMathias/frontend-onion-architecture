export function setValueForm(fireEvent: any, getByTestId: any) {
  fireEvent.change(getByTestId('email'), { target: { value: 'test@test.com' } });
  fireEvent.change(getByTestId('password'), { target: { value: '123456789' } });
  fireEvent.click(getByTestId('submit'));
}
