import { screen } from '@testing-library/react';

import customRender from '../../../shared/__test-helpers__/customRender';
import testColumnConfiguration from '../../../shared/__test-helpers__/testColumnConfiguration';
import data from '../../__mocks__/uniparcXrefsModelData';
import { type UniParcXRef } from '../../adapters/uniParcConverter';
import UniParcXRefsColumnConfiguration, {
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

describe('Links column destinations', () => {
  const templateMap = new Map([
    ['EMBL', 'https://www.ebi.ac.uk/ena/browser/view/%id'],
  ]);

  const renderLinksCell = (xref: UniParcXRef) => {
    const [column] = getUniParcXRefsColumns(
      [UniParcXRefsColumn.links],
      templateMap,
      'UPI0000000001'
    );
    return customRender(<div>{column.render(xref)}</div>);
  };

  it('links an active UniProtKB xref to its entry', () => {
    renderLinksCell({
      database: 'UniProtKB/Swiss-Prot',
      id: 'P12345',
      active: true,
    });

    expect(
      screen.getByRole('link', { name: 'UniProtKB entry' })
    ).toHaveAttribute('href', '/uniprotkb/P12345/entry');
  });

  it('links an obsolete reviewed xref to its history, not the sub-entry', () => {
    renderLinksCell({
      database: 'UniProtKB/Swiss-Prot',
      id: 'P12345',
      active: false,
    });

    expect(screen.getByRole('link', { name: 'History' })).toHaveAttribute(
      'href',
      '/uniprotkb/P12345/history'
    );
    expect(
      screen.queryByRole('link', { name: 'Sequence annotation' })
    ).not.toBeInTheDocument();
  });

  it('links an obsolete TrEMBL xref with an organism to its sequence annotation', () => {
    renderLinksCell({
      database: 'UniProtKB/TrEMBL',
      id: 'Q71TT2',
      active: false,
      organism: { taxonId: 10254 },
    });

    expect(
      screen.getByRole('link', { name: 'Sequence annotation' })
    ).toHaveAttribute('href', '/uniparc/UPI0000000001/entry/Q71TT2');
  });

  it('links an obsolete TrEMBL xref with no organism to its history', () => {
    renderLinksCell({
      database: 'UniProtKB/TrEMBL',
      id: 'Q71TT2',
      active: false,
    });

    expect(screen.getByRole('link', { name: 'History' })).toHaveAttribute(
      'href',
      '/uniprotkb/Q71TT2/history'
    );
  });

  it('links an active non-UniProtKB xref to the sequence annotation sub-entry', () => {
    renderLinksCell({ database: 'EMBL', id: 'AAB12345', active: true });

    expect(
      screen.getByRole('link', { name: 'Sequence annotation' })
    ).toHaveAttribute('href', '/uniparc/UPI0000000001/entry/EMBL:AAB12345');
  });

  it('links an obsolete non-UniProtKB xref out to the source database', () => {
    renderLinksCell({ database: 'EMBL', id: 'AAB12345', active: false });

    expect(
      screen.getByRole('link', { name: /Source database/ })
    ).toHaveAttribute(
      'href',
      'https://www.ebi.ac.uk/ena/browser/view/AAB12345'
    );
  });

  it('renders no link for an obsolete isoform', () => {
    renderLinksCell({
      database: 'UniProtKB/Swiss-Prot protein isoforms',
      id: 'P12345-2',
      active: false,
    });

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('renders no link for a database with no URL template', () => {
    renderLinksCell({
      database: 'DatabaseWithNoTemplate',
      id: 'XYZ123',
      active: true,
    });

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
