import { screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import customRender from '../../../../shared/__test-helpers__/customRender';
import * as logging from '../../../../shared/utils/logging';
import { type EvidenceProperty } from '../../../types/protNLMAPIModel';
import ProtNLM2EvidenceLink from '../ProtNLM2EvidenceLink';

const accession = 'A8Y1C3';

describe('ProtNLM2EvidenceLink', () => {
  it('renders the string-match branch (hydrated, InterPro link)', () => {
    const properties: EvidenceProperty[] = [
      { key: 'model_score', value: '0.64' },
      { key: 'string_match_text', value: 'IPR007669' },
      { key: 'string_match_location', value: 'InterPro' },
      { key: 'string_match_type', value: 'hydrated' },
    ];
    const { asFragment } = customRender(
      <ProtNLM2EvidenceLink properties={properties} accession={accession} />,
      { route: `/uniprotkb/${accession}/entry` }
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the phmmer branch', () => {
    const properties: EvidenceProperty[] = [
      { key: 'model_score', value: '0.5' },
      { key: 'phmmer_accession', value: 'Q09272' },
      { key: 'phmmer_score', value: '136.3' },
    ];
    const { asFragment } = customRender(
      <ProtNLM2EvidenceLink properties={properties} accession={accession} />,
      { route: `/uniprotkb/${accession}/entry` }
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the tmalign branch', () => {
    const properties: EvidenceProperty[] = [
      { key: 'model_score', value: '0.5' },
      { key: 'tmalign_accession', value: 'Q99LL3' },
      { key: 'tmalign_score_chain_1', value: '0.594' },
      { key: 'tmalign_score_chain_2', value: '0.47778' },
    ];
    const { asFragment } = customRender(
      <ProtNLM2EvidenceLink properties={properties} accession={accession} />,
      { route: `/uniprotkb/${accession}/entry` }
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the malformed-evidence fallback (and logs) when a value is missing', () => {
    const errorSpy = jest.spyOn(logging, 'error').mockImplementation(() => {});
    const properties: EvidenceProperty[] = [
      { key: 'model_score', value: '0.5' },
      // Should trip the "no value" guard at the top of the component.
      { key: 'string_match_text', value: null },
      { key: 'string_match_location', value: 'InterPro' },
      { key: 'string_match_type', value: 'hydrated' },
    ];
    const { container } = customRender(
      <ProtNLM2EvidenceLink properties={properties} accession={accession} />,
      { route: `/uniprotkb/${accession}/entry` }
    );

    expect(container).toHaveTextContent(/something went wrong/i);
    expect(errorSpy).toHaveBeenCalledTimes(1);
    errorSpy.mockRestore();
  });

  it('enriches the linked accession with an entry-type icon and organism', async () => {
    const axiosMock = new MockAdapter(axios);
    axiosMock.onGet(/\/uniprotkb\/Q09272/).reply(200, {
      primaryAccession: 'Q09272',
      entryType: 'UniProtKB reviewed (Swiss-Prot)',
      organism: { scientificName: 'Homo sapiens' },
    });

    const properties: EvidenceProperty[] = [
      { key: 'model_score', value: '0.5' },
      { key: 'phmmer_accession', value: 'Q09272' },
      { key: 'phmmer_score', value: '136.3' },
    ];
    customRender(
      <ProtNLM2EvidenceLink properties={properties} accession={accession} />,
      { route: `/uniprotkb/${accession}/entry` }
    );

    // Organism appears once the linked entry resolves...
    await waitFor(() =>
      expect(screen.getByText(/Homo sapiens/)).toBeInTheDocument()
    );
    // ...alongside the Swiss-Prot entry-type icon.
    expect(screen.getByTitle(/reviewed/i)).toBeInTheDocument();

    axiosMock.restore();
  });

  it('renders the no-matching-branch fallback when only model_score is present', () => {
    // model_score alone fits none of string-match / phmmer / tmalign — this
    // is the case that pre-fix fell through and returned `undefined`.
    const errorSpy = jest.spyOn(logging, 'error').mockImplementation(() => {});
    const properties: EvidenceProperty[] = [
      { key: 'model_score', value: '0.5' },
    ];
    const { container } = customRender(
      <ProtNLM2EvidenceLink properties={properties} accession={accession} />,
      { route: `/uniprotkb/${accession}/entry` }
    );

    expect(container).toHaveTextContent(/something went wrong/i);
    expect(errorSpy).toHaveBeenCalledTimes(1);
    errorSpy.mockRestore();
  });
});
