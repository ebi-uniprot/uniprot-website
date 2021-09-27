import { KeywordsAPIModel } from '../adapters/keywordsConverter';

// Data from /api/keywords/search?query=site&size=2
const mock: KeywordsAPIModel[] = [
  {
    keyword: { name: 'Allosteric enzyme', id: 'KW-0021' },
    definition:
      'Enzyme whose activity is modified by the noncovalent binding of an allosteric effector at a site other than the active site. This binding mediates conformational changes, altering its catalytic or binding properties.',
    geneOntologies: [
      { goId: 'GO:0003824', name: 'catalytic activity' },
      { goId: 'GO:0008152', name: 'metabolic process' },
    ],
    category: { name: 'Molecular function', id: 'KW-9992' },
    children: [
      {
        keyword: { name: 'Molecular function', id: 'KW-9992' },
        definition:
          'Keywords assigned to proteins due to their particular molecular function.',
      },
    ],
    statistics: { reviewedProteinCount: 2482, unreviewedProteinCount: 139810 },
  },
  {
    keyword: { name: 'Calcium/phospholipid-binding', id: 'KW-0111' },
    definition:
      'Protein which contains at least one binding site for calcium and phospholipid. For example, proteins with annexin repeats, of which a pair may form one binding site for calcium and phospholipid, or some proteins with C2 domains.',
    synonyms: ['Calcium-dependent phospholipid binding'],
    geneOntologies: [
      { goId: 'GO:0005544', name: 'calcium-dependent phospholipid binding' },
    ],
    category: { name: 'Ligand', id: 'KW-9993' },
    children: [
      {
        keyword: { name: 'Calcium', id: 'KW-0106' },
        definition:
          'Protein which binds at least one calcium atom, or protein whose function is calcium-dependent. Calcium is a metal, chemical symbol Ca. Calcium is essential for a variety of bodily functions, such as neurotransmission, muscle contraction and proper heart function.',
        synonyms: ['Ca', 'Calcium ion'],
        links: ['https://www.webelements.com/calcium/'],
        category: { name: 'Ligand', id: 'KW-9993' },
        children: [
          {
            keyword: { name: 'Ligand', id: 'KW-9993' },
            definition:
              'Keywords assigned to proteins because they bind, are associated with, or whose activity is dependent of some molecule.',
          },
        ],
      },
    ],
    statistics: { reviewedProteinCount: 102, unreviewedProteinCount: 14480 },
  },
];

export default mock;
