import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import UniProtKBEntryPublications from '../UniProtKBEntryPublications';
import { getPublicationsURL } from '../../../../shared/config/apiUrls';
import mockUniProtKBEntryPublications from './__mocks__/uniprotKBEntryPublications.json';

import useDataApi from '../../../../shared/hooks/useDataApi';

jest.mock('../../../../shared/hooks/useDataApi', () => jest.fn());

describe('UniProtKBEntryPublications', () => {
  it('Should make a call with pubmed ids and render properly', () => {
    useDataApi.mockImplementation(() => ({
      loading: false,
      data: mockUniProtKBEntryPublications,
    }));
    const pubMedIds = ['123', '456'];
    const { asFragment } = render(
      <Router>
        <UniProtKBEntryPublications pubmedIds={pubMedIds} />
      </Router>
    );
    expect(useDataApi).toHaveBeenCalledWith(getPublicationsURL(pubMedIds));
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should make a call with pubmed ids', () => {
    useDataApi.mockImplementation(() => ({
      error: {
        message: 'There has been an error',
      },
    }));
    const pubMedIds = ['123', '456'];
    const { asFragment } = render(
      <Router>
        <UniProtKBEntryPublications pubmedIds={pubMedIds} />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
