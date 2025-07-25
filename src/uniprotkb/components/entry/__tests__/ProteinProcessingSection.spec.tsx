import { screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import customRender from '../../../../shared/__test-helpers__/customRender';
import mockNonHumanData from '../../../__mocks__/nonHumanEntryModelData';
import mockPtmExchangeData from '../../../__mocks__/ptmExchangeData';
import mockHumanData from '../../../__mocks__/uniProtKBEntryModelData';
import uniProtKbConverter from '../../../adapters/uniProtkbConverter';
import EntrySection from '../../../types/entrySection';
import databaseInfoMaps from '../../../utils/__tests__/__mocks__/databaseInfoMaps';
import ProteinProcessingSection from '../ProteinProcessingSection';

const axiosMock = new MockAdapter(axios);
axiosMock
  // Humans should (eventually) have PTMeXchange data so just using
  .onGet(
    `https://www.ebi.ac.uk/proteins/api/proteomics/ptm/${mockHumanData.primaryAccession}`
  )
  .reply(200, mockPtmExchangeData)
  // Assumed that flavonifractor plautii won't have PTMeXchange data
  .onGet(
    `https://www.ebi.ac.uk/proteins/api/proteomics/ptm/${mockNonHumanData.primaryAccession}`
  )
  .reply(404);

describe('ProteinProcessingSection', () => {
  beforeAll(() => {
    jest.mock('@nightingale-elements/nightingale-sequence', () => jest.fn());
    jest.mock('@nightingale-elements/nightingale-track-canvas', () =>
      jest.fn()
    );
  });

  it('should render when PTMeXchange is available', async () => {
    const transformedData = uniProtKbConverter(mockHumanData, databaseInfoMaps);
    customRender(
      <ProteinProcessingSection
        data={transformedData[EntrySection.ProteinProcessing]}
        sequence={transformedData[EntrySection.Sequence].sequence?.value}
        primaryAccession={transformedData.primaryAccession}
        key={EntrySection.ProteinProcessing}
      />,
      { route: `/uniprotkb/P05067/entry` }
    );
    await screen.findByRole('heading', { name: 'PTM/Processing' });
    await screen.findByRole('button', { name: 'Download' });
    const row = await screen.findAllByRole('row', { name: /PTMeXchange/ });
    // Only one phosphorylation position in the data
    expect(row).toHaveLength(1);
    expect(row[0]).toHaveTextContent(/Phosphoserine/);
    expect(row[0]).toHaveTextContent(/Silver/);
  });

  it('should render when no PTMeXchange is available', async () => {
    const transformedData = uniProtKbConverter(
      mockNonHumanData,
      databaseInfoMaps
    );
    customRender(
      <ProteinProcessingSection
        data={transformedData[EntrySection.ProteinProcessing]}
        sequence={transformedData[EntrySection.Sequence].sequence?.value}
        primaryAccession={transformedData.primaryAccession}
        key={EntrySection.ProteinProcessing}
      />,
      { route: `/uniprotkb/P05067/entry` }
    );
    await screen.findByRole('heading', { name: 'PTM/Processing' });
    await screen.findByRole('button', { name: 'Download' });
    // Await for the table to have rendered before checking no PTMeXchange row
    await screen.findByRole('table');
    expect(
      screen.queryByRole('row', { name: /PTMeXchange/ })
    ).not.toBeInTheDocument();
  });
});
