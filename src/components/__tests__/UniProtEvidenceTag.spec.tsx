import React from 'react';
import UniProtEvidenceTag, {
  UniProtProtvistaEvidenceTag,
} from '../UniProtEvidenceTag';
import { cleanup } from '@testing-library/react';
import renderWithRedux from '../../__testHelpers__/renderWithRedux';

describe('UniProtEvidenceTag components', () => {
  test('should render automatic annotation', () => {
    const evidences = [
      {
        evidenceCode: 'ECO:0000255',
        source: 'PROSITE-ProRule',
        id: 'PRU10023',
      },
    ];
    const { asFragment } = renderWithRedux(
      <UniProtEvidenceTag evidences={evidences} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render publications count', () => {
    const evidences = [
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
    const { asFragment } = renderWithRedux(
      <UniProtEvidenceTag evidences={evidences} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render automatic ', () => {
    const evidences = [
      {
        evidenceCode: 'ECO:0000313',
      },
    ];
    const { asFragment } = renderWithRedux(
      <UniProtEvidenceTag evidences={evidences} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render ProtVista evidence tag', () => {
    const evidences = [
      {
        evidenceCode: 'ECO:0000313',
      },
    ];
    const htmlTemplate = UniProtProtvistaEvidenceTag(evidences, () => {});
    expect(htmlTemplate).toMatchSnapshot();
  });

  afterEach(() => cleanup());
});
