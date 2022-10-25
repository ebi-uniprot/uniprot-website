import { fireEvent, screen } from '@testing-library/react';

import customRender from '../../../../shared/__test-helpers__/customRender';

import UniProtKBEvidenceTag from '../UniProtKBEvidenceTag';

import { Evidence } from '../../../types/modelTypes';

describe('UniProtKBEvidenceTag components', () => {
  it('should render automatic annotation', () => {
    const evidences: Evidence[] = [
      {
        evidenceCode: 'ECO:0000255',
        source: 'PROSITE-ProRule',
        id: 'PRU10023',
      },
    ];
    const { asFragment } = customRender(
      <UniProtKBEvidenceTag evidences={evidences} />,
      { route: `/uniprotkb/P05067` }
    );
    expect(asFragment()).toMatchSnapshot();

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render publications count', () => {
    const evidences: Evidence[] = [
      {
        evidenceCode: 'ECO:0000269',
        source: 'PubMed',
        id: '12345',
      },
      {
        evidenceCode: 'ECO:0000269',
        source: 'PubMed',
        id: '12346',
      },
    ];
    const { asFragment } = customRender(
      <UniProtKBEvidenceTag evidences={evidences} />,
      { route: `/uniprotkb/P05067` }
    );
    expect(asFragment()).toMatchSnapshot();

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render automatic ', () => {
    const evidences: Evidence[] = [
      {
        evidenceCode: 'ECO:0000313',
      },
    ];
    const { asFragment } = customRender(
      <UniProtKBEvidenceTag evidences={evidences} />,
      { route: `/uniprotkb/P05067` }
    );
    expect(asFragment()).toMatchSnapshot();

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(asFragment()).toMatchSnapshot();
  });
});
