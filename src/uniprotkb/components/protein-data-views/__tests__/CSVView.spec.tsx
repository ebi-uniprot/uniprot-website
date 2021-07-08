import { screen, render } from '@testing-library/react';
import CSVView from '../CSVView';

describe('CSVView', () => {
  it('should return nothing if no data provided', () => {
    const { container } = render(<CSVView data={undefined} />);
    expect(container).toBeEmptyDOMElement();
  });
  it('should make first element is bolder', () => {
    render(<CSVView data={[{ value: 'foo' }, { value: 'bar' }]} bolderFirst />);
    expect(screen.getByText('foo')).toHaveStyle({ 'font-weight': 'bolder' });
  });
});
