import { MemoryRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';

import EntryExternalLinks from '../EntryExternalLinks';
import uniProtKbConverter from '../../../adapters/uniProtkbConverter';

import mockData from '../../../__mocks__/entryModelData';

describe('Entry - External Links view', () => {
  test('should render', () => {
    const { asFragment } = render(
      <Router>
        <EntryExternalLinks transformedData={uniProtKbConverter(mockData)} />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
