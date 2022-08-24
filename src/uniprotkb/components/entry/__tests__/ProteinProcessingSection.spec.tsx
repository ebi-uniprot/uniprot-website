import { screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import customRender from '../../../../shared/__test-helpers__/customRender';
import uniProtKbConverter from '../../../adapters/uniProtkbConverter';
import ProteinProcessingSection from '../ProteinProcessingSection';

import mockHumanData from '../../../__mocks__/uniProtKBEntryModelData';
import mockPtmexchangeData from '../../../__mocks__/ptmexchangeData';
import mockNonHumanData from '../../../__mocks__/nonHumanEntryModelData';
import databaseInfoMaps from '../../../utils/__tests__/__mocks__/databaseInfoMaps';
import EntrySection from '../../../types/entrySection';

const axiosMock = new MockAdapter(axios);
axiosMock
  // Humans should (eventually) have PTMeXchange data so just using
  .onGet(
    `https://www.ebi.ac.uk/proteins/api/proteomics-ptm/${mockHumanData.primaryAccession}`
  )
  .reply(200, mockPtmexchangeData)
  // Assumed that flavonifractor plautii won't have PTMeXchange data
  .onGet(
    `https://www.ebi.ac.uk/proteins/api/proteomics-ptm/${mockNonHumanData.primaryAccession}`
  )
  .reply(404);

describe('ProteinProcessingSection', () => {
  it('should render when PTMeXchange is available', async () => {
    const transformedData = uniProtKbConverter(mockHumanData, databaseInfoMaps);
    const { asFragment } = customRender(
      <ProteinProcessingSection
        data={transformedData[EntrySection.ProteinProcessing]}
        sequence={transformedData[EntrySection.Sequence].sequence.value}
        primaryAccession={transformedData.primaryAccession}
        key={EntrySection.ProteinProcessing}
      />
    );
    await screen.findByText('PTM/Processing');
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render when no PTMeXchange is available', async () => {
    const transformedData = uniProtKbConverter(
      mockNonHumanData,
      databaseInfoMaps
    );
    const { asFragment } = customRender(
      <ProteinProcessingSection
        data={transformedData[EntrySection.ProteinProcessing]}
        sequence={transformedData[EntrySection.Sequence].sequence.value}
        primaryAccession={transformedData.primaryAccession}
        key={EntrySection.ProteinProcessing}
      />
    );
    await screen.findByText('PTM/Processing');
    expect(asFragment()).toMatchSnapshot();
  });
});
