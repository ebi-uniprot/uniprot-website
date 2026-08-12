import { screen } from '@testing-library/react';

import customRender from '../../../shared/__test-helpers__/customRender';
import testColumnConfiguration from '../../../shared/__test-helpers__/testColumnConfiguration';
import data from '../../__mocks__/uniparcXrefsModelData';
import { type UniParcXRef } from '../../adapters/uniParcConverter';
import UniParcXRefsColumnConfiguration, {
  UniParcXRefsColumn,
} from '../UniParcXRefsColumnConfiguration';

jest.mock('../../../shared/workers/jobs/utils/storage');

describe('UniParcXRefsColumnConfiguration component', () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
  const xrefData = data.results?.[0]!;
  testColumnConfiguration<UniParcXRefsColumn, UniParcXRef>(
    UniParcXRefsColumnConfiguration,
    xrefData
  );

  describe('proteome column, falling back to the "sources" property', () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { render } = UniParcXRefsColumnConfiguration.get(
      UniParcXRefsColumn.proteome
    )!;

    it('renders a proteome link even when the sources value has no component segment', () => {
      const xref: UniParcXRef = {
        properties: [{ key: 'sources', value: 'EMBL:CAA12345:UP000005640' }],
      };
      customRender(<>{render(xref)}</>);
      const link = screen.getByRole('link', { name: 'UP000005640' });
      expect(link).toHaveAttribute(
        'href',
        expect.stringContaining('UP000005640')
      );
      expect(link.parentElement).toHaveTextContent(/^UP000005640$/);
    });

    it('renders the component alongside the proteome link when present', () => {
      const xref: UniParcXRef = {
        properties: [
          { key: 'sources', value: 'EMBL:CAA12345:UP000005640:Chromosome 1' },
        ],
      };
      customRender(<>{render(xref)}</>);
      expect(
        screen.getByRole('link', { name: 'UP000005640' })
      ).toBeInTheDocument();
      expect(screen.getByText('(Chromosome 1)')).toBeInTheDocument();
    });

    it('deduplicates sources that point at the same proteome', () => {
      const xref: UniParcXRef = {
        properties: [
          { key: 'sources', value: 'EMBL:CAA12345:UP000005640:Chromosome 1' },
          { key: 'sources', value: 'EMBL:CAA99999:UP000005640:Chromosome 1' },
        ],
      };
      customRender(<>{render(xref)}</>);
      expect(screen.getAllByRole('link', { name: 'UP000005640' })).toHaveLength(
        1
      );
    });
  });
});
