import { fireEvent, screen } from '@testing-library/react';

import customRender from '../../../../shared/__test-helpers__/customRender';

import PtmExchangeEvidenceTag from '../PtmExchangeEvidenceTag';

import { Evidence } from '../../../types/modelTypes';

describe('PtmExchangeEvidenceTag components', () => {
  it('should render', () => {
    const evidences: Evidence[] = [
      { evidenceCode: 'ECO:0007829', source: 'PeptideAtlas' },
      { evidenceCode: 'ECO:0007829', source: 'PubMed', id: '28054942' },
      { evidenceCode: 'ECO:0007829', source: 'PRIDE', id: 'PXD004939' },
      { evidenceCode: 'ECO:0007829', source: 'PubMed', id: '28382632' },
      { evidenceCode: 'ECO:0007829', source: 'PRIDE', id: 'PXD005241' },
      { evidenceCode: 'ECO:0007829', source: 'PubMed', id: '28439285' },
      { evidenceCode: 'ECO:0007829', source: 'PRIDE', id: 'PXD004705' },
    ];
    const { asFragment } = customRender(
      <PtmExchangeEvidenceTag evidences={evidences} confidenceScore="Gold" />
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(asFragment()).toMatchSnapshot();
  });
});
