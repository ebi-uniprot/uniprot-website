import { screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import customRender from '../../../../shared/__test-helpers__/customRender';
import settle from '../../../../shared/__test-helpers__/settle';
import mockData from '../../../__mocks__/proteomesEntryModelData';
import proteomesConverter from '../../../adapters/proteomesConverter';
import Overview from '../Overview';

const mock = new MockAdapter(axios);

afterEach(() => {
  mock.reset();
});

afterAll(() => {
  mock.restore();
});

describe('Overview', () => {
  it('renders precomputed annotations download link for Non Reference proteome with positive probe', async () => {
    const upId = 'UP000000318';
    const url = `/<testing>/api/uniprotkb/precomputed/proteome/${upId}?size=0`;
    mock.onHead(url).reply(200, undefined, { 'x-total-results': '13794' });

    const baseData = proteomesConverter(mockData);
    const data = {
      ...baseData,
      id: upId,
      proteomeType: 'Non Reference proteome' as const,
      proteinCount: 4042,
    };

    customRender(<Overview data={data} />);

    const link = await screen.findByRole('link', {
      name: 'Download precomputed annotations',
    });
    expect(link).toHaveAttribute(
      'href',
      `/<testing>/api/uniprotkb/precomputed/proteome/${upId}/stream?compressed=true&download=true`
    );
  });

  it('renders precomputed annotations download link for Excluded proteome with positive probe', async () => {
    const upId = 'UP000000319';
    const url = `/<testing>/api/uniprotkb/precomputed/proteome/${upId}?size=0`;
    mock.onHead(url).reply(200, undefined, { 'x-total-results': '500' });

    const baseData = proteomesConverter(mockData);
    const data = {
      ...baseData,
      id: upId,
      proteomeType: 'Excluded' as const,
      proteinCount: 100,
    };

    customRender(<Overview data={data} />);

    const link = await screen.findByRole('link', {
      name: 'Download precomputed annotations',
    });
    expect(link).toHaveAttribute(
      'href',
      `/<testing>/api/uniprotkb/precomputed/proteome/${upId}/stream?compressed=true&download=true`
    );
  });

  it('does not render download link or fire probe request for Reference proteome', () => {
    const baseData = proteomesConverter(mockData);
    const data = {
      ...baseData,
      id: 'UP000005640',
      proteomeType: 'Reference proteome' as const,
      proteinCount: 20000,
    };

    customRender(<Overview data={data} />);

    expect(
      screen.queryByRole('link', { name: 'Download precomputed annotations' })
    ).not.toBeInTheDocument();
    expect(mock.history.head).toHaveLength(0);
  });

  it('does not render download link when probe returns 404', async () => {
    const upId = 'UP000000320';
    const url = `/<testing>/api/uniprotkb/precomputed/proteome/${upId}?size=0`;
    mock.onHead(url).reply(404);

    const baseData = proteomesConverter(mockData);
    const data = {
      ...baseData,
      id: upId,
      proteomeType: 'Non Reference proteome' as const,
      proteinCount: 4042,
    };

    customRender(<Overview data={data} />);

    await settle();

    expect(
      screen.queryByRole('link', { name: 'Download precomputed annotations' })
    ).not.toBeInTheDocument();
  });

  it('does not render download link or fire probe when proteinCount is 0', () => {
    const baseData = proteomesConverter(mockData);
    const data = {
      ...baseData,
      id: 'UP000000321',
      proteomeType: 'Non Reference proteome' as const,
      proteinCount: 0,
    };

    customRender(<Overview data={data} />);

    expect(
      screen.queryByRole('link', { name: 'Download precomputed annotations' })
    ).not.toBeInTheDocument();
    expect(mock.history.head).toHaveLength(0);
  });
});
