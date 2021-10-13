import { fireEvent, screen } from '@testing-library/react';

import HSPDetailPanel from '../HSPDetailPanel';

import { enrich } from '../BlastResult';

import customRender from '../../../../../shared/__test-helpers__/customRender';

import blastResultsMockData from '../../../../__mocks__/server-jobs/example-truncated';
import modelData from '../../../../../uniprotkb/__mocks__/uniProtKBEntryModelData';
import useSize from '../../../../../shared/hooks/useSize';

import { Namespace } from '../../../../../shared/types/namespaces';

jest.mock('../../../../../shared/hooks/useDataApi', () => jest.fn());
jest.mock('../../../../../shared/hooks/useSize', () => jest.fn());

(useSize as jest.Mock).mockImplementation(() => [{ width: 1000 }]);

// Mutate to match the 2 models so that it can be enriched
blastResultsMockData.hits[0].hit_acc = modelData.primaryAccession;
const enrichedData = enrich(
  blastResultsMockData,
  { results: [modelData] },
  Namespace.uniprotkb
);

describe('HSPDetailPanel', () => {
  const onClose = jest.fn();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const hit = enrichedData!.hits[0];
  const hsp = hit.hit_hsps[0];

  beforeEach(() => {
    customRender(
      <HSPDetailPanel
        hsp={hsp}
        hitAccession={hit.hit_acc}
        onClose={onClose}
        hitLength={hit.hit_len}
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        queryLength={enrichedData!.query_len}
        extra={modelData}
      />
    );
  });

  it('should initially render overview', async () => {
    expect(screen.getByTestId('alignment-view')).toBeInTheDocument();
    const slidingPanel = screen.getByTestId('sliding-panel');
    expect(slidingPanel).toMatchSnapshot();
  });

  it('should load correct query and match sequence data', async () => {
    const slidingPanel = screen.getByTestId('sliding-panel');
    const msa = slidingPanel.querySelector('protvista-msa');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((msa as any).data).toEqual([
      { name: 'Query', sequence: hsp.hsp_qseq },
      { name: 'Match:P21802', sequence: hsp.hsp_hseq },
    ]);
  });

  it('should change to wrapped and render when wrapped view is clicked', async () => {
    const wrappedButton = screen.getByText('Wrapped');
    fireEvent.click(wrappedButton);
    expect(screen.getByTestId('alignment-wrapped-view')).toBeInTheDocument();
    // skip the top level div, as it contains the dynamically injected style
    // that might be different across different runs ("sliding" effect)
    expect(screen.getByTestId('alignment-wrapped-view')).toBeInTheDocument();
    const slidingPanel = screen.getByTestId('sliding-panel');
    expect(slidingPanel).toMatchSnapshot();
  });
});
