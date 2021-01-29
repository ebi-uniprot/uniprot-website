import { act } from 'react-dom/test-utils';
import { fireEvent } from '@testing-library/react';
import renderWithRedux from '../../../../shared/__test-helpers__/RenderWithRedux';
import SimilarProteins from '../similar-proteins/SimilarProteins';
import similarProteinsData from './__mocks__/similarProteinsData.json';
import accessionsData from './__mocks__/accessionsData.json';

var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');

var axiosMock = new MockAdapter(axios);
axiosMock.onGet(/\/uniref\/search/).reply(200, similarProteinsData);
axiosMock.onGet(/\/uniprotkb\/accessions/).reply(200, accessionsData);

const getRendered = async () => {
  let rendered;
  await act(async () => {
    rendered = renderWithRedux(
      <SimilarProteins
        primaryAccession="P05067"
        isoforms={{ isoforms: ['P05067-4'] }}
      />
    );
  });
  return rendered;
};

describe('SimilarProteins tests', () => {
  it('should call useDataApi and render', async () => {
    const { findAllByText } = await getRendered();
    expect(await findAllByText(/0FGN2/)).toBeTruthy();
  });

  it('should change tabs', async () => {
    const { findByText } = await getRendered();
    fireEvent.click(await findByText(/50% identity/));
    expect(await findByText(/P12023/)).toBeTruthy();
  });
});
