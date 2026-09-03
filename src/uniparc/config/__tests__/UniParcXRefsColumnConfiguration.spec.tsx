import { screen } from '@testing-library/react';

import customRender from '../../../shared/__test-helpers__/customRender';
import testColumnConfiguration from '../../../shared/__test-helpers__/testColumnConfiguration';
import data from '../../__mocks__/uniparcXrefsModelData';
import { type UniParcXRef } from '../../adapters/uniParcConverter';
import { type ObsoleteXRefStatus } from '../../components/entry/hooks/useObsoleteXRefStatuses';
import UniParcXRefsColumnConfiguration, {
  defaultColumns,
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

  const getLinksColumn = (
    columns: UniParcXRefsColumn[] = [],
    obsoleteStatuses?: Map<string, ObsoleteXRefStatus>
  ) =>
    getUniParcXRefsColumns(
      columns,
      templateMap,
      'UPI0000000001',
      undefined,
      undefined,
      obsoleteStatuses
    ).find(({ name }) => name === 'links');

  const renderLinksCell = (
    xref: UniParcXRef,
    obsoleteStatuses?: Map<string, ObsoleteXRefStatus>
  ) => {
    const column = getLinksColumn([], obsoleteStatuses);
    return customRender(<div>{column?.render(xref)}</div>);
  };

  // "Go to" has no API field behind it, so it is never stored, downloaded or
  // offered in the Customise Table panel — it is added to the rendered table
  // whatever the stored column list happens to say.
  it('is present whatever the stored columns are', () => {
    expect(defaultColumns).not.toContain('links');
    expect(getLinksColumn([])).toBeDefined();
    expect(getLinksColumn(defaultColumns)).toBeDefined();
  });

  const names = (columns: UniParcXRefsColumn[]) =>
    getUniParcXRefsColumns(columns, templateMap, 'UPI0000000001').map(
      ({ name }) => name
    );

  it('sits right after the identifier it describes', () => {
    expect(names(defaultColumns)).toEqual([
      'database',
      'accession',
      'links',
      'active',
      'organism',
      'proteome',
      'version',
      'first_seen',
      'last_seen',
    ]);
    expect(
      names([UniParcXRefsColumn.database, UniParcXRefsColumn.accession])
    ).toEqual(['database', 'accession', 'links']);
  });

  // Column lists stored before this column existed put `active` last, so
  // anchoring on it would strand "Go to" at the far end of a horizontally
  // scrolling table, columns away from the identifier it explains
  it('stays next to the identifier in a stored column order', () => {
    expect(
      names([
        UniParcXRefsColumn.database,
        UniParcXRefsColumn.accession,
        UniParcXRefsColumn.version,
        UniParcXRefsColumn.organism,
        UniParcXRefsColumn.proteome,
        UniParcXRefsColumn.firstSeen,
        UniParcXRefsColumn.lastSeen,
        UniParcXRefsColumn.active,
      ])
    ).toEqual([
      'database',
      'accession',
      'links',
      'version',
      'organism',
      'proteome',
      'first_seen',
      'last_seen',
      'active',
    ]);
  });

  // Stored column lists from before it became a fixed column can still hold it,
  // and it would render as an unknown column (and 400 the download) if kept
  it('is not duplicated by a stale stored column list', () => {
    expect(
      names(['links' as UniParcXRefsColumn, UniParcXRefsColumn.active])
    ).toEqual(['active', 'links']);
  });

  it('links an active UniProtKB xref to its entry', () => {
    renderLinksCell({
      database: 'UniProtKB/Swiss-Prot',
      id: 'P12345',
      active: true,
    });

    expect(
      screen.getByRole('link', { name: 'UniProtKB entry P12345' })
    ).toHaveAttribute('href', '/uniprotkb/P12345/entry');
  });

  it('links an obsolete reviewed xref to its history, not the sub-entry', () => {
    renderLinksCell({
      database: 'UniProtKB/Swiss-Prot',
      id: 'P12345',
      active: false,
    });

    expect(
      screen.getByRole('link', { name: 'History of P12345' })
    ).toHaveAttribute('href', '/uniprotkb/P12345/history');
    expect(
      screen.queryByRole('link', { name: /Sequence annotation/ })
    ).not.toBeInTheDocument();
  });

  // An obsolete TrEMBL xref can have ended up in one of three places and the row
  // itself gives no clue which, so the destination follows the resolved status
  // rather than anything on the xref.
  const obsoleteTrEMBL: UniParcXRef = {
    database: 'UniProtKB/TrEMBL',
    id: 'Q71TT2',
    active: false,
  };

  it.each([
    ['with an organism', { ...obsoleteTrEMBL, organism: { taxonId: 10254 } }],
    ['with no organism', obsoleteTrEMBL],
  ])(
    'labels an unresolved obsolete TrEMBL xref %s without promising a page',
    (_, xref) => {
      renderLinksCell(xref);

      // Whichever page the sub-entry router settles on, this label holds
      expect(
        screen.getByRole('link', { name: 'UniProtKB record for Q71TT2' })
      ).toHaveAttribute('href', '/uniparc/UPI0000000001/entry/Q71TT2');
    }
  );

  it('links a deleted TrEMBL xref to its sequence annotation', () => {
    renderLinksCell(obsoleteTrEMBL, new Map([['Q71TT2', 'deleted']]));

    expect(
      screen.getByRole('link', { name: 'Sequence annotation for Q71TT2' })
    ).toHaveAttribute('href', '/uniparc/UPI0000000001/entry/Q71TT2');
  });

  it('links a merged TrEMBL xref straight to its history', () => {
    renderLinksCell(obsoleteTrEMBL, new Map([['Q71TT2', 'merged']]));

    // Straight to history rather than via the sub-entry page, which would only
    // redirect there anyway
    expect(
      screen.getByRole('link', { name: 'History of Q71TT2' })
    ).toHaveAttribute('href', '/uniprotkb/Q71TT2/history');
  });

  it('links a TrEMBL xref that UniProtKB still has to its entry', () => {
    renderLinksCell(obsoleteTrEMBL, new Map([['Q71TT2', 'active']]));

    expect(
      screen.getByRole('link', { name: 'UniProtKB entry Q71TT2' })
    ).toHaveAttribute('href', '/uniprotkb/Q71TT2/entry');
  });

  it('links an active non-UniProtKB xref to the sequence annotation sub-entry', () => {
    renderLinksCell({ database: 'EMBL', id: 'AAB12345', active: true });

    expect(
      screen.getByRole('link', { name: 'Sequence annotation for AAB12345' })
    ).toHaveAttribute('href', '/uniparc/UPI0000000001/entry/EMBL:AAB12345');
  });

  it('links an obsolete non-UniProtKB xref out to the source database', () => {
    renderLinksCell({ database: 'EMBL', id: 'AAB12345', active: false });

    expect(
      screen.getByRole('link', { name: /^Source database entry AAB12345/ })
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

  // The sub-entry page is built from the xref row, so an active external
  // reference links whether or not the database templates have arrived
  it('links an active xref of a database with no URL template', () => {
    renderLinksCell({
      database: 'DatabaseWithNoTemplate',
      id: 'XYZ123',
      active: true,
    });

    expect(
      screen.getByRole('link', { name: 'Sequence annotation for XYZ123' })
    ).toHaveAttribute(
      'href',
      '/uniparc/UPI0000000001/entry/DatabaseWithNoTemplate:XYZ123'
    );
  });

  it('renders no link for an obsolete xref with no URL template', () => {
    renderLinksCell({
      database: 'DatabaseWithNoTemplate',
      id: 'XYZ123',
      active: false,
    });

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
