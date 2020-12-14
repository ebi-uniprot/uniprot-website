import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import UniProtKBCard from '../UniProtKBCard';
import data from '../../../__mocks__/entryModelData.json';

const handleEntrySelection = jest.fn();

let item;

describe('UniProtKBCard component', () => {
  beforeEach(() => {
    item = render(
      <Router>
        <UniProtKBCard
          data={data}
          selectedEntries={{}}
          handleEntrySelection={handleEntrySelection}
        />
      </Router>
    );
  });

  test('should render', () => {
    const { asFragment } = item;
    expect(asFragment()).toMatchSnapshot();
  });

  test('should select a row', () => {
    const { getByTestId } = item;
    const checkbox = getByTestId('up-card-checkbox');
    fireEvent.click(checkbox);
    expect(handleEntrySelection).toHaveBeenCalled();
  });
});
