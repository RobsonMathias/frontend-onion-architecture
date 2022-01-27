export function setValueForm(fireEvent: any, getByTestId: any, form: any) {
  fireEvent.change(getByTestId('description'), { target: { value: form.description } });
  fireEvent.click(getByTestId('submit'));
}
