import { screen } from '@testing-library/react';

import customRender from '../../../shared/__test-helpers__/customRender';
import testColumnConfiguration from '../../../shared/__test-helpers__/testColumnConfiguration';
import data from '../../__mocks__/uniparcXrefsModelData';
import { type UniParcXRef } from '../../adapters/uniParcConverter';
import UniParcXRefsColumnConfiguration, {
  destinationIconTitles,
  getUniParcXRefsColumns,
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
});

describe('Identifier column destination markers', () => {
  const templateMap = new Map([
    ['EMBL', 'https://www.ebi.ac.uk/ena/browser/view/%id'],
  ]);

  const renderAccessionCell = (xref: UniParcXRef) => {
    const [column] = getUniParcXRefsColumns(
      [UniParcXRefsColumn.accession],
      templateMap,
      'UPI0000000001'
    );
    return customRender(<div>{column.render(xref)}</div>);
  };

  it('marks an active non-UniProtKB xref as going to the sequence archive page', () => {
    renderAccessionCell({ database: 'EMBL', id: 'AAB12345', active: true });

    expect(
      screen.getByTitle(destinationIconTitles.subEntry)
    ).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      '/uniparc/UPI0000000001/entry/EMBL:AAB12345'
    );
  });

  it('marks an obsolete non-UniProtKB xref as leaving for the source database', () => {
    renderAccessionCell({ database: 'EMBL', id: 'AAB12345', active: false });

    expect(
      screen.getByTitle(destinationIconTitles.external)
    ).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      'https://www.ebi.ac.uk/ena/browser/view/AAB12345'
    );
    // The marker leads the identifier, so franklin's own trailing icon is off
    expect(screen.queryByTestId('external-link-icon')).not.toBeInTheDocument();
  });

  it('marks an obsolete reviewed xref as going to the entry history', () => {
    renderAccessionCell({
      database: 'UniProtKB/Swiss-Prot',
      id: 'P12345',
      active: false,
    });

    expect(
      screen.getByTitle(destinationIconTitles.history)
    ).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      '/uniprotkb/P12345/history'
    );
  });

  it('leaves an active UniProtKB xref unmarked, as the expected destination', () => {
    renderAccessionCell({
      database: 'UniProtKB/Swiss-Prot',
      id: 'P12345',
      active: true,
    });

    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      '/uniprotkb/P12345/entry'
    );
    for (const title of Object.values(destinationIconTitles)) {
      expect(screen.queryByTitle(title)).not.toBeInTheDocument();
    }
  });

  it('renders an unlinkable xref as plain text with no marker', () => {
    const { container } = renderAccessionCell({
      database: 'DatabaseWithNoTemplate',
      id: 'XYZ123',
      active: true,
    });

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(container).toHaveTextContent('XYZ123');
    for (const title of Object.values(destinationIconTitles)) {
      expect(screen.queryByTitle(title)).not.toBeInTheDocument();
    }
  });
});
