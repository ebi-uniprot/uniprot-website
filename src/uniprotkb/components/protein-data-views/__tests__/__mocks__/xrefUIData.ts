import { DatabaseCategory } from '../../../../types/databaseRefs';
import { type XrefUIModel } from '../../../../utils/xrefUtils';

const data: Record<string, XrefUIModel[]> = {
  standard: [
    {
      category: DatabaseCategory.CHEMISTRY,
      databases: [
        {
          database: 'EMBL',
          xrefs: [
            {
              database: 'EMBL',
              id: '1234',
              properties: { propKey: 'propValue' },
              isoformId: 'ABCD',
            },
          ],
        },
      ],
    },
  ],
  duplicateLink: [
    {
      category: DatabaseCategory.GENOME,
      databases: [
        {
          database: 'EnsemblBacteria',
          xrefs: [
            {
              database: 'EnsemblBacteria',
              id: 'AAC74343',
              properties: {
                ProteinId: 'AAC74343',
                GeneId: 'b1261',
              },
            },
            {
              database: 'EnsemblBacteria',
              id: 'BAA14793',
              properties: {
                ProteinId: 'BAA14793',
                GeneId: 'BAA14793',
              },
            },
          ],
        },
      ],
    },
  ],
};
export default data;
