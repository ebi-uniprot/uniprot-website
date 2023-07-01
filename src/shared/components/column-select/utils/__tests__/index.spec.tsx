import { prepareFieldData, getLabel } from '..';

import { UniProtKBColumn } from '../../../../../uniprotkb/types/columnTypes';
import { Namespace } from '../../../../types/namespaces';

import fieldData from './__mocks__/fieldData';

describe('prepareFieldData', () => {
  it('should return prepared field data', () => {
    expect(prepareFieldData(fieldData)).toEqual([
      {
        id: 'uniprot-data',
        items: [
          {
            id: 'names_&_taxonomy',
            items: [
              {
                id: 'gene_names',
                key: 'names_&_taxonomy/gene_names',
                label: 'Gene Names',
              },
            ],
            label: 'Names & Taxonomy',
          },
        ],
        label: 'UniProt Data',
      },
      {
        id: 'external-resources',
        items: [
          {
            id: 'sequence',
            items: [{ id: 'xref_ccds', key: 'sequence/ccds', label: 'CCDS' }],
            label: 'Sequence',
          },
        ],
        label: 'External Resources',
      },
    ]);
  });

  it('should exclude column', () => {
    expect(prepareFieldData(fieldData, [UniProtKBColumn.geneNames])).toEqual([
      {
        id: 'external-resources',
        items: [
          {
            id: 'sequence',
            items: [{ id: 'xref_ccds', key: 'sequence/ccds', label: 'CCDS' }],
            label: 'Sequence',
          },
        ],
        label: 'External Resources',
      },
    ]);
  });
});

describe('getLabel', () => {
  const prepared = prepareFieldData(fieldData);
  it('should get field data for "UniProt Data" column', () => {
    expect(
      getLabel(prepared, Namespace.uniprotkb, UniProtKBColumn.geneNames)
    ).toEqual('Gene Names');
  });
  it('should get field data for "External Resources" column', () => {
    expect(
      getLabel(prepared, Namespace.uniprotkb, UniProtKBColumn.xrefCcds)
    ).toEqual('CCDS');
  });
});
