import { LocationsAPIModel } from '../adapters/locationsConverter';

// Source: /api/locations/search?query=membrane&size=2
// Retrieved: 2021-10-15
const mock: LocationsAPIModel[] = [
  {
    name: 'Endoplasmic reticulum-Golgi intermediate compartment membrane',
    id: 'SL-0099',
    definition:
      'The membrane surrounding the ER-Golgi intermediate compartment, which is a collection of tubulovesicular membrane clusters in the vicinity of ER exit sites.',
    content: 'Endoplasmic reticulum-Golgi intermediate compartment membrane',
    statistics: {
      reviewedProteinCount: 236,
      unreviewedProteinCount: 15974,
    },
    category: 'Cellular component',
    geneOntologies: [
      {
        goId: 'GO:0033116',
        name: 'endoplasmic reticulum-Golgi intermediate compartment membrane',
      },
    ],
    synonyms: [
      'ERGIC membrane',
      'ER-Golgi intermediate compartment membrane',
      'IC membrane',
      'Intermediate compartment membrane',
      'Vesiculo-tubular cluster membrane',
      'VTC membrane',
    ],
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
        name: 'Endoplasmic reticulum-Golgi intermediate compartment',
        id: 'SL-0098',
        definition:
          'The ER-Golgi intermediate compartment is a collection of tubulovesicular membrane clusters in the vicinity of ER exit sites. The ERGIC mediates transport between the endoplasmic reticulum and the Golgi and is the first anterograde/retrograde sorting station in the secretory pathway. ERGIC has not been observed in yeast and plants.',
        content: 'Endoplasmic reticulum-Golgi intermediate compartment',
        note: 'Compartment specific marker: LMAN1/ERGIC-53 (Also called P-58).',
        category: 'Cellular component',
        geneOntologies: [
          {
            goId: 'GO:0005793',
            name: 'endoplasmic reticulum-Golgi intermediate compartment',
          },
        ],
        synonyms: [
          'ERGIC',
          'ER-Golgi intermediate compartment',
          'IC',
          'Intermediate compartment',
          'Vesiculo-tubular cluster',
          'VTC',
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
      },
    ],
  },
  {
    name: 'Host endoplasmic reticulum-Golgi intermediate compartment membrane',
    id: 'SL-0392',
    definition:
      'The membrane surrounding the host ER-Golgi intermediate compartment, which is a collection of tubulovesicular membrane clusters in the vicinity of host ER exit sites.',
    content:
      'Host endoplasmic reticulum-Golgi intermediate compartment membrane',
    statistics: {
      reviewedProteinCount: 59,
      unreviewedProteinCount: 18988,
    },
    category: 'Cellular component',
    geneOntologies: [
      {
        goId: 'GO:0044173',
        name: 'host cell endoplasmic reticulum-Golgi intermediate compartment membrane',
      },
    ],
    synonyms: [
      'Host ERGIC membrane',
      'Host ER-Golgi intermediate compartment membrane',
      'Host IC membrane',
      'Host intermediate compartment membrane',
      'Host vesiculo-tubular cluster membrane',
      'Host VTC membrane',
    ],
    isA: [
      {
        name: 'Host membrane',
        id: 'SL-0380',
        definition:
          'A host membrane is a lipid bilayer which surrounds host enclosed spaces and compartments. This selectively permeable structure is essential for effective separation of a host cell or organelle from its surroundings.',
        content: 'Host membrane',
        keyword: {
          name: 'Host membrane',
          id: 'KW-1043',
        },
        category: 'Cellular component',
        geneOntologies: [
          {
            goId: 'GO:0033644',
            name: 'host cell membrane',
          },
        ],
      },
    ],
    partOf: [
      {
        name: 'Host endoplasmic reticulum-Golgi intermediate compartment',
        id: 'SL-0391',
        definition:
          'The host ER-Golgi intermediate compartment is a collection of tubulovesicular membrane clusters in the vicinity of host ER exit sites. The host ERGIC mediates transport between the endoplasmic reticulum and the Golgi and is the first anterograde/retrograde sorting station in the host secretory pathway.',
        content: 'Host endoplasmic reticulum-Golgi intermediate compartment',
        category: 'Cellular component',
        geneOntologies: [
          {
            goId: 'GO:0044172',
            name: 'host cell endoplasmic reticulum-Golgi intermediate compartment',
          },
        ],
        synonyms: [
          'Host ERGIC',
          'Host ER-Golgi intermediate compartment',
          'Host IC',
          'Host intermediate compartment',
          'Host vesiculo-tubular cluster',
          'Host VTC',
        ],
      },
      {
        name: 'Host endomembrane system',
        id: 'SL-0398',
        definition:
          'A collection of membranous structures involved in transport within the host cell. The main components of the host endomembrane system are endoplasmic reticulum, Golgi apparatus, vesicles, and cell membrane and nuclear envelope. The endomembrane system does not include the membranes of mitochondria or plastids.',
        content: 'Host endomembrane system',
        category: 'Cellular component',
        geneOntologies: [
          {
            goId: 'GO:0033645',
            name: 'host cell endomembrane system',
          },
        ],
        synonyms: ['Host endomembrane'],
      },
    ],
  },
];

export default mock;
