import customRender from '../../../../shared/__test-helpers__/customRender';

import UniProtKBEvidenceTag from '../UniProtKBEvidenceTag';

import { Evidence } from '../../../types/modelTypes';

describe('UniProtKBEvidenceTag components', () => {
  test('should render automatic annotation', () => {
    const evidences: Evidence[] = [
      {
        evidenceCode: 'ECO:0000255',
        source: 'PROSITE-ProRule',
        id: 'PRU10023',
      },
    ];
    const { asFragment } = customRender(
      <UniProtKBEvidenceTag evidences={evidences} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render publications count', () => {
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
      <UniProtKBEvidenceTag evidences={evidences} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render automatic ', () => {
    const evidences: Evidence[] = [
      {
        evidenceCode: 'ECO:0000313',
      },
    ];
    const { asFragment } = customRender(
      <UniProtKBEvidenceTag evidences={evidences} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
