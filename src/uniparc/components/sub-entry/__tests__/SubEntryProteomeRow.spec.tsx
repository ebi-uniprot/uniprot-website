import { screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import customRender from '../../../../shared/__test-helpers__/customRender';
import settle from '../../../../shared/__test-helpers__/settle';
import { type UniParcSubEntryUIModel } from '../../../adapters/uniParcSubEntryConverter';
import SubEntryNamesAndTaxonomySection, {
  SubEntryProteomeRow,
} from '../SubEntryNamesAndTaxonomySection';

const mock = new MockAdapter(axios);

afterEach(() => {
  mock.reset();
});

afterAll(() => {
  mock.restore();
});

describe('SubEntryProteomeRow', () => {
  it('renders precomputed annotations link for qualifying proteome with positive probe count', async () => {
    const upId = 'UP000000318';
    const url = `/<testing>/api/uniprotkb/precomputed/proteome/${upId}?size=0`;
    mock.onHead(url).reply(200, undefined, { 'x-total-results': '13794' });

    customRender(
      <SubEntryProteomeRow proteomeId={upId} component="Genome" isQualifying />
    );

    const link = await screen.findByRole('link', {
      name: 'Download predicted annotations',
    });
    expect(link).toHaveAttribute(
      'href',
      `/<testing>/api/uniprotkb/precomputed/proteome/${upId}/stream?compressed=true&download=true`
    );
  });

  it('does not render download link and does not fire request for non-qualifying proteome', () => {
    const upId = 'UP000005640';

    customRender(
      <SubEntryProteomeRow
        proteomeId={upId}
        component="Genome"
        isQualifying={false}
      />
    );

    expect(
      screen.queryByRole('link', { name: 'Download predicted annotations' })
    ).not.toBeInTheDocument();
    expect(mock.history.head).toHaveLength(0);
  });

  it('does not render download link when probe returns 404', async () => {
    const upId = 'UP000000320';
    const url = `/<testing>/api/uniprotkb/precomputed/proteome/${upId}?size=0`;
    mock.onHead(url).reply(404);

    customRender(
      <SubEntryProteomeRow proteomeId={upId} component="Genome" isQualifying />
    );

    await settle();

    expect(
      screen.queryByRole('link', { name: 'Download predicted annotations' })
    ).not.toBeInTheDocument();
  });
});

describe('SubEntryNamesAndTaxonomySection with proteomes', () => {
  it('renders proteome rows and download links for qualifying proteomes', async () => {
    const upId1 = 'UP000000318';
    const upId2 = 'UP000005640';
    mock
      .onHead(`/<testing>/api/uniprotkb/precomputed/proteome/${upId1}?size=0`)
      .reply(200, undefined, { 'x-total-results': '13794' });

    const uniparcData = {
      subEntry: {
        proteinName: 'Test protein',
      },
    } as unknown as UniParcSubEntryUIModel;

    customRender(
      <SubEntryNamesAndTaxonomySection
        uniparcData={uniparcData}
        proteomeComponentObject={{
          [upId1]: 'Genome',
          [upId2]: 'Chromosome 1',
        }}
        qualifyingProteomeIds={new Set([upId1])}
      />
    );

    const link = await screen.findByRole('link', {
      name: 'Download predicted annotations',
    });
    expect(link).toHaveAttribute(
      'href',
      `/<testing>/api/uniprotkb/precomputed/proteome/${upId1}/stream?compressed=true&download=true`
    );

    // upId2 is not qualifying, so only one download link should exist
    expect(
      screen.getAllByRole('link', { name: 'Download predicted annotations' })
    ).toHaveLength(1);
    expect(mock.history.head.some((req) => req.url?.includes(upId2))).toBe(
      false
    );
  });

  it('handles empty proteomeComponentObject without errors', () => {
    const uniparcData = {
      subEntry: {
        proteinName: 'Test protein',
      },
    } as unknown as UniParcSubEntryUIModel;

    customRender(
      <SubEntryNamesAndTaxonomySection
        uniparcData={uniparcData}
        proteomeComponentObject={{}}
        qualifyingProteomeIds={new Set()}
      />
    );

    expect(
      screen.queryByRole('link', { name: 'Download predicted annotations' })
    ).not.toBeInTheDocument();
    expect(mock.history.head).toHaveLength(0);
  });
});
