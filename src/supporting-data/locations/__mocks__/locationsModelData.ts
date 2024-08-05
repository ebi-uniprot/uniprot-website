import { SearchResults } from '../../../shared/types/results';
import { LocationsAPIModel } from '../adapters/locationsConverter';

// Source: locations/search?query=membrane&size=2
// Retrieved: 2024-07-24
const mock: SearchResults<LocationsAPIModel> = {
  results: [
    {
      name: 'Cell inner membrane',
      id: 'SL-0037',
      definition:
        'The prokaryotic inner cell membrane is the selectively permeable membrane which separates the cytoplasm from the periplasm in prokaryotes with 2 membranes.',
      content: 'Cell inner membrane',
      keyword: {
        name: 'Cell inner membrane',
        id: 'KW-0997',
      },
      statistics: {
        reviewedProteinCount: 27448,
        unreviewedProteinCount: 2266044,
      },
      category: 'Cellular component',
      geneOntologies: [
        {
          goId: 'GO:0005886',
          name: 'plasma membrane',
        },
      ],
      synonyms: ['Cytoplasmic membrane', 'Inner membrane', 'Plasma membrane'],
      isA: [
        {
          name: 'Cell membrane',
          id: 'SL-0039',
          definition:
            'The cell membrane is the selectively permeable membrane which separates the cytoplasm from its surroundings. Known as the cell inner membrane in prokaryotes with 2 membranes.',
          content: 'Cell membrane',
          keyword: {
            name: 'Cell membrane',
            id: 'KW-1003',
          },
          category: 'Cellular component',
          geneOntologies: [
            {
              goId: 'GO:0005886',
              name: 'plasma membrane',
            },
          ],
          synonyms: ['Cytoplasmic membrane', 'Plasmalemma', 'Plasma membrane'],
          isA: [
            {
              name: 'Membrane',
              id: 'SL-0162',
              definition:
                'A membrane is a lipid bilayer which surrounds enclosed spaces and compartments. This selectively permeable structure is essential for effective separation of a cell or organelle from its surroundings. Membranes are composed of various types of molecules such as phospholipids, integral membrane proteins, peripheral proteins, glycoproteins, glycolipids, etc. The relative amounts of these components as well as the types of lipids are non-randomly distributed from membrane to membrane as well as between the two leaflets of a membrane.',
              content: 'Membrane',
              keyword: {
                name: 'Membrane',
                id: 'KW-0472',
              },
              category: 'Cellular component',
              geneOntologies: [
                {
                  goId: 'GO:0016020',
                  name: 'membrane',
                },
              ],
            },
          ],
          partOf: [
            {
              name: 'Cell envelope',
              id: 'SL-0036',
              definition:
                'The cell envelope comprises the cell membrane, the cell wall and an outer membrane if present. In bacteria with 1 membrane (Gram-positive) the cell envelope consists of the cytoplasmic membrane, cell wall and capsule. In bacteria with 2 membranes (Gram-negative) the envelope consists of the cytoplasmic membrane, cell wall, periplasmic space, outer membrane and capsule. The archaeal cell envelope generally consists of single membrane covered by a surface layer (S-layer). Ignicoccus species exceptionally have an outer membrane which encloses a large periplasmic space. Extreme thermophiles and acidophiles have tetraether type glycerophospholipids with C40 isoprenoid chains. The yeast cell envelope is a protecting capsule which consists of the cytoplasmic membrane, the periplasmic space, and the cell wall.',
              content: 'Cell envelope',
              note: 'Try to use a child/narrower/more specific term instead',
              category: 'Cellular component',
              geneOntologies: [
                {
                  goId: 'GO:0030313',
                  name: 'cell envelope',
                },
              ],
              synonyms: ['Envelope'],
              links: [
                'http://www.cf.ac.uk/biosi/staff/ehrmann/tools/ecce/ecce.htm',
              ],
            },
            {
              name: 'Endomembrane system',
              id: 'SL-0147',
              definition:
                'A collection of membranous structures involved in transport within the cell. The main components of the endomembrane system are endoplasmic reticulum, Golgi apparatus, vesicles and cell membrane and nuclear envelope. The endomembrane system does not include the membranes of mitochondria or plastids.',
              content: 'Endomembrane system',
              note: 'Try to use a child/narrower/more specific term instead',
              category: 'Cellular component',
              geneOntologies: [
                {
                  goId: 'GO:0012505',
                  name: 'endomembrane system',
                },
              ],
              synonyms: ['Endomembrane'],
              isA: [
                {
                  name: 'Membrane',
                  id: 'SL-0162',
                  definition:
                    'A membrane is a lipid bilayer which surrounds enclosed spaces and compartments. This selectively permeable structure is essential for effective separation of a cell or organelle from its surroundings. Membranes are composed of various types of molecules such as phospholipids, integral membrane proteins, peripheral proteins, glycoproteins, glycolipids, etc. The relative amounts of these components as well as the types of lipids are non-randomly distributed from membrane to membrane as well as between the two leaflets of a membrane.',
                  content: 'Membrane',
                  keyword: {
                    name: 'Membrane',
                    id: 'KW-0472',
                  },
                  category: 'Cellular component',
                  geneOntologies: [
                    {
                      goId: 'GO:0016020',
                      name: 'membrane',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'Membrane',
      id: 'SL-0162',
      definition:
        'A membrane is a lipid bilayer which surrounds enclosed spaces and compartments. This selectively permeable structure is essential for effective separation of a cell or organelle from its surroundings. Membranes are composed of various types of molecules such as phospholipids, integral membrane proteins, peripheral proteins, glycoproteins, glycolipids, etc. The relative amounts of these components as well as the types of lipids are non-randomly distributed from membrane to membrane as well as between the two leaflets of a membrane.',
      content: 'Membrane',
      keyword: {
        name: 'Membrane',
        id: 'KW-0472',
      },
      statistics: {
        reviewedProteinCount: 117565,
        unreviewedProteinCount: 29411837,
      },
      category: 'Cellular component',
      geneOntologies: [
        {
          goId: 'GO:0016020',
          name: 'membrane',
        },
      ],
    },
  ],
};

export default mock.results;
