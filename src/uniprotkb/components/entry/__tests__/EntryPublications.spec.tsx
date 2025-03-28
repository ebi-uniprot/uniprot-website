import { screen } from '@testing-library/react';

import customRender from '../../../../shared/__test-helpers__/customRender';
import useDataApi from '../../../../shared/hooks/useDataApi';
import EntryPublications from '../tabs/Publications';
import mockPublicationsData from './__mocks__/entryPublicationsData';

jest.mock('../../../../shared/hooks/useDataApi', () => jest.fn());

const headers = { 'x-total-results': mockPublicationsData.results.length };
const dataMock = {
  loading: false,
  data: mockPublicationsData,
  headers,
};

describe('EntryPublications tests', () => {
  it('should call useDataApi and render', () => {
    (useDataApi as jest.Mock).mockImplementation(() => dataMock);
    customRender(<EntryPublications accession="P05067" />);
    expect(useDataApi).toHaveBeenCalled();
    expect(
      screen.getByText(/Identification of an S-adenosylhomocysteine/)
    ).toBeInTheDocument();
  });
});
