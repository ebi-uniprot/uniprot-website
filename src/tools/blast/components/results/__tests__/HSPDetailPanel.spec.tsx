import { fireEvent, screen } from '@testing-library/react';

import HSPDetailPanel from '../HSPDetailPanel';

import renderWithRouter from '../../../../../shared/__test-helpers__/RenderWithRouter';

import blastResultsMockData from '../../../../__mocks__/server-jobs/example-truncated.json';
import modelData from '../../../../../uniprotkb/__mocks__/entryModelData.json';

jest.mock('../../../../../shared/hooks/useDataApi', () => jest.fn());
jest.mock('../../../../../shared/hooks/useSize', () => jest.fn());
import useDataApi from '../../../../../shared/hooks/useDataApi';
import useSize from '../../../../../shared/hooks/useSize';

const dataMock = {
  loading: false,
  data: { results: [modelData] },
};
(useDataApi as jest.Mock).mockImplementation(() => dataMock);
(useSize as jest.Mock).mockImplementation(() => [{ width: 1000 }]);

describe('HSPDetailPanel', () => {
  const onClose = jest.fn();
  const hit = blastResultsMockData.hits[0];
  const hsp = hit.hit_hsps[0];

  beforeEach(async () => {
    await renderWithRouter(
      <HSPDetailPanel
        hsp={hsp}
        hitAccession={hit.hit_acc}
        onClose={onClose}
        hitLength={hit.hit_len}
        queryLength={blastResultsMockData.query_len}
      />
    );
  });

  it('should initially render overview', async () => {
    expect(await screen.getByTestId('alignment-view')).toBeTruthy();
    const slidingPanel = await screen.findByTestId('sliding-panel');
    expect(slidingPanel).toMatchSnapshot();
  });

  it('should load correct query and match sequence data', async () => {
    const slidingPanel = await screen.findByTestId('sliding-panel');
    const msa = slidingPanel.querySelector('protvista-msa');
    expect((msa as any).data).toEqual([
      { name: 'Query', sequence: hsp.hsp_qseq },
      { name: 'Match:U6MKN0', sequence: hsp.hsp_hseq },
    ]);
  });

  it('should change to wrapped and render when wrapped view is clicked', async () => {
    const wrappedButton = screen.getByText('Wrapped');
    fireEvent.click(wrappedButton);
    expect(await screen.findByTestId('alignment-wrapped-view')).toBeTruthy();
    // skip the top level div, as it contains the dynamically injected style
    // that might be different across different runs ("sliding" effect)
    expect(await screen.findByTestId('alignment-wrapped-view')).toBeTruthy();
    const slidingPanel = await screen.findByTestId('sliding-panel');
    expect(slidingPanel.firstElementChild).toMatchSnapshot();
  });
});
