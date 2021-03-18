import { render } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import EntryMain from '../EntryMain';
import proteomesConverter from '../../../adapters/proteomesConverter';
import mockData from '../../../__mocks__/proteomesEntryModelData';

describe('EntryMain view', () => {
  it('should render', () => {
    const { asFragment } = render(
      <Router>
        <EntryMain transformedData={proteomesConverter(mockData)} />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
