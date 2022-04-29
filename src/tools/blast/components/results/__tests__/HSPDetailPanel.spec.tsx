import { fireEvent, screen } from '@testing-library/react';

import HSPDetailPanel from '../HSPDetailPanel';

import customRender from '../../../../../shared/__test-helpers__/customRender';

import useSize from '../../../../../shared/hooks/useSize';
import useDataApi from '../../../../../shared/hooks/useDataApi';

import blastResultsMockData from '../../../../__mocks__/server-jobs/example-truncated';
import modelData from '../../../../../uniprotkb/__mocks__/uniProtKBEntryModelData';

import { Namespace } from '../../../../../shared/types/namespaces';

jest.mock('../../../../../shared/hooks/useDataApi', () => jest.fn());
jest.mock('../../../../../shared/hooks/useSize', () => jest.fn());

(useSize as jest.Mock).mockImplementation(() => [{ width: 1000 }]);

describe('HSPDetailPanel', () => {
  const onClose = jest.fn();
  const hit = blastResultsMockData.hits[0];
  const hsp = hit.hit_hsps[0];

  beforeEach(() => {
    (useDataApi as jest.Mock).mockReturnValue({ data: modelData });
    customRender(
      <HSPDetailPanel
        hsp={hsp}
        hitAccession={hit.hit_acc}
        onClose={onClose}
        hitLength={hit.hit_len}
        queryLength={blastResultsMockData.query_len}
        namespace={Namespace.uniprotkb}
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
      { name: 'Match:U6MKN0', sequence: hsp.hsp_hseq },
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
