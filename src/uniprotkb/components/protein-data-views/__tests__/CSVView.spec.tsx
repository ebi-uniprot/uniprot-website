import { screen, render, fireEvent } from '@testing-library/react';
import CSVView from '../CSVView';

describe('CSVView', () => {
  it('should return nothing if no data provided', () => {
    const { container } = render(<CSVView data={undefined} />);
    expect(container).toBeEmptyDOMElement();
  });
  it('should make first element bolder', () => {
    render(<CSVView data={[{ value: 'foo' }, { value: 'bar' }]} bolderFirst />);
    expect(screen.getByText('foo')).toHaveStyle({ 'font-weight': 'bolder' });
  });
  it('should display if any supplementary data is provided', async () => {
    render(
      <CSVView
        data={[{ value: 'foo' }, { value: 'bar' }]}
        bolderFirst
        supplementaryData={[{ value: 'baz' }]}
        supplementaryText="includes"
      />
    );
    const ellipsisButton = await screen.findByRole('button', {
      name: 'Show more',
    });
    fireEvent.click(ellipsisButton);
    expect(
      await screen.findByText('includes', { exact: false })
    ).toBeInTheDocument();
    expect(screen.getByText('baz')).toHaveStyle({ 'font-weight': 'bolder' });
  });
});
