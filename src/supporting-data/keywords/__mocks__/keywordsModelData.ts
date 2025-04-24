import { SearchResults } from '../../../shared/types/results';
import { KeywordsAPIModel } from '../adapters/keywordsConverter';

// Source: keywords/search?query=site&size=2
// Retrieved: 2025-04-22
const mock: SearchResults<KeywordsAPIModel> = {
  results: [
    {
      keyword: {
        name: 'Allosteric enzyme',
        id: 'KW-0021',
      },
      definition:
        'Enzyme whose activity is modified by the noncovalent binding of an allosteric effector at a site other than the active site. This binding mediates conformational changes, altering its catalytic or binding properties.',
      geneOntologies: [
        {
          goId: 'GO:0003824',
          name: 'catalytic activity',
        },
        {
          goId: 'GO:0008152',
          name: 'metabolic process',
        },
      ],
      parents: [
        {
          keyword: {
            name: 'Molecular function',
            id: 'KW-9992',
          },
        },
      ],
      category: {
        name: 'Molecular function',
        id: 'KW-9992',
      },
      statistics: {
        reviewedProteinCount: 2514,
        unreviewedProteinCount: 180201,
      },
    },
    {
      keyword: {
        name: 'Calcium/phospholipid-binding',
        id: 'KW-0111',
      },
      definition:
        'Protein which contains at least one binding site for calcium and phospholipid. For example, proteins with annexin repeats, of which a pair may form one binding site for calcium and phospholipid, or some proteins with C2 domains.',
      synonyms: ['Calcium-dependent phospholipid binding'],
      geneOntologies: [
        {
          goId: 'GO:0005544',
          name: 'calcium-dependent phospholipid binding',
        },
      ],
      parents: [
        {
          keyword: {
            name: 'Calcium',
            id: 'KW-0106',
          },
          parents: [
            {
              keyword: {
                name: 'Ligand',
                id: 'KW-9993',
              },
            },
          ],
        },
      ],
      category: {
        name: 'Ligand',
        id: 'KW-9993',
      },
      statistics: {
        reviewedProteinCount: 105,
        unreviewedProteinCount: 22830,
      },
    },
  ],
};

export default mock.results;
