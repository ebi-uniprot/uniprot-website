import { screen } from '@testing-library/react';

import customRender from '../../../../shared/__test-helpers__/customRender';
import useDataApi from '../../../../shared/hooks/useDataApi';
import UniProtKBEntryPublications from '../UniProtKBEntryPublications';
import mockUniProtKBEntryPublications from './__mocks__/uniprotKBEntryPublications.json';

jest.mock('../../../../shared/hooks/useDataApi', () => jest.fn());

describe('UniProtKBEntryPublications', () => {
  it('Should make a call with pubmed ids and render properly', () => {
    (useDataApi as jest.Mock).mockImplementation(() => ({
      loading: false,
      data: mockUniProtKBEntryPublications,
    }));
    const pubMedIds = ['123', '456'];
    const { asFragment } = customRender(
      <UniProtKBEntryPublications pubmedIds={pubMedIds} />
    );
    expect(screen.getByText(/Baumkotter/i)).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should make a call with pubmed ids and fail', () => {
    (useDataApi as jest.Mock).mockImplementation(() => ({
      error: {
        message: 'There has been an error',
      },
    }));
    const pubMedIds = ['123', '456'];
    const { asFragment } = customRender(
      <UniProtKBEntryPublications pubmedIds={pubMedIds} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
