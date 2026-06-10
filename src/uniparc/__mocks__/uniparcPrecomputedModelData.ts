import type { UniParcPrecomputedModel } from '../types/precomputed';

const mock: UniParcPrecomputedModel = {
  entryType: 'AA',
  primaryAccession: 'UPI000002A2F6-9606',
  uniProtkbId: null,
  annotationScore: 0.0,
  proteinDescription: {
    recommendedName: {
      fullName: {
        evidences: [
          { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00021782' },
        ],
        value: 'Amyloid-beta precursor protein',
      },
    },
    alternativeNames: [
      {
        fullName: {
          evidences: [
            { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00032275' },
          ],
          value: 'ABPP',
        },
      },
      {
        fullName: {
          evidences: [
            { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00031698' },
          ],
          value: 'Alzheimer disease amyloid A4 protein homolog',
        },
      },
      {
        fullName: {
          evidences: [
            { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00032685' },
          ],
          value: 'Alzheimer disease amyloid protein',
        },
      },
      {
        fullName: {
          evidences: [
            { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00030489' },
          ],
          value: 'Amyloid precursor protein',
        },
      },
      {
        fullName: {
          evidences: [
            { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00030741' },
          ],
          value: 'Amyloid-beta (A4) precursor protein',
        },
      },
      {
        fullName: {
          evidences: [
            { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00030344' },
          ],
          value: 'Amyloid-beta A4 protein',
        },
      },
    ],
  },
  comments: [
    {
      texts: [
        {
          evidences: [
            { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00002651' },
          ],
          value:
            'The gamma-CTF peptides as well as the caspase-cleaved peptides, including C31, are potent enhancers of neuronal apoptosis',
        },
      ],
      commentType: 'FUNCTION',
    },
    {
      commentType: 'SUBCELLULAR LOCATION',
      subcellularLocations: [
        {
          location: {
            evidences: [
              {
                evidenceCode: 'ECO:0000256',
                source: 'ARBA',
                id: 'ARBA00004251',
              },
            ],
            value: 'Cell membrane',
            id: 'SL-0039',
          },
          topology: {
            evidences: [
              {
                evidenceCode: 'ECO:0000256',
                source: 'ARBA',
                id: 'ARBA00004251',
              },
            ],
            value: 'Single-pass type I membrane protein',
            id: 'SL-9905',
          },
        },
      ],
    },
    {
      commentType: 'SUBCELLULAR LOCATION',
      subcellularLocations: [
        {
          location: {
            evidences: [
              {
                evidenceCode: 'ECO:0000256',
                source: 'ARBA',
                id: 'ARBA00004624',
              },
            ],
            value: 'Cell projection, growth cone',
            id: 'SL-0288',
          },
        },
      ],
    },
    {
      commentType: 'SUBCELLULAR LOCATION',
      subcellularLocations: [
        {
          location: {
            evidences: [
              {
                evidenceCode: 'ECO:0000256',
                source: 'ARBA',
                id: 'ARBA00004241',
              },
            ],
            value: 'Cell surface',
            id: 'SL-0310',
          },
        },
      ],
    },
    {
      commentType: 'SUBCELLULAR LOCATION',
      subcellularLocations: [
        {
          location: {
            evidences: [
              {
                evidenceCode: 'ECO:0000256',
                source: 'ARBA',
                id: 'ARBA00004541',
              },
            ],
            value: 'Cytoplasmic vesicle',
            id: 'SL-0088',
          },
        },
      ],
    },
    {
      commentType: 'SUBCELLULAR LOCATION',
      subcellularLocations: [
        {
          location: {
            evidences: [
              {
                evidenceCode: 'ECO:0000256',
                source: 'ARBA',
                id: 'ARBA00004412',
              },
            ],
            value: 'Early endosome',
            id: 'SL-0094',
          },
        },
      ],
    },
    {
      commentType: 'SUBCELLULAR LOCATION',
      subcellularLocations: [
        {
          location: {
            evidences: [
              {
                evidenceCode: 'ECO:0000256',
                source: 'ARBA',
                id: 'ARBA00004240',
              },
            ],
            value: 'Endoplasmic reticulum',
            id: 'SL-0095',
          },
        },
      ],
    },
    {
      commentType: 'SUBCELLULAR LOCATION',
      subcellularLocations: [
        {
          location: {
            evidences: [
              {
                evidenceCode: 'ECO:0000256',
                source: 'ARBA',
                id: 'ARBA00004555',
              },
            ],
            value: 'Golgi apparatus',
            id: 'SL-0132',
          },
        },
      ],
    },
    {
      commentType: 'SUBCELLULAR LOCATION',
      subcellularLocations: [
        {
          location: {
            evidences: [
              {
                evidenceCode: 'ECO:0000256',
                source: 'ARBA',
                id: 'ARBA00004600',
              },
            ],
            value: 'Membrane, clathrin-coated pit',
            id: 'SL-0069',
          },
        },
      ],
    },
    {
      commentType: 'SUBCELLULAR LOCATION',
      subcellularLocations: [
        {
          location: {
            evidences: [
              {
                evidenceCode: 'ECO:0000256',
                source: 'ARBA',
                id: 'ARBA00004123',
              },
            ],
            value: 'Nucleus',
            id: 'SL-0191',
          },
        },
      ],
    },
    {
      commentType: 'SUBCELLULAR LOCATION',
      subcellularLocations: [
        {
          location: {
            evidences: [
              {
                evidenceCode: 'ECO:0000256',
                source: 'ARBA',
                id: 'ARBA00004484',
              },
            ],
            value: 'Perikaryon',
            id: 'SL-0197',
          },
        },
      ],
    },
    {
      commentType: 'SUBCELLULAR LOCATION',
      subcellularLocations: [
        {
          location: {
            evidences: [
              {
                evidenceCode: 'ECO:0000256',
                source: 'ARBA',
                id: 'ARBA00004613',
              },
            ],
            value: 'Secreted',
            id: 'SL-0243',
          },
        },
      ],
    },
    {
      texts: [
        {
          evidences: [
            { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00009449' },
            {
              evidenceCode: 'ECO:0000256',
              source: 'PROSITE-ProRule',
              id: 'PRU01217',
            },
          ],
          value: 'Belongs to the APP family',
        },
      ],
      commentType: 'SIMILARITY',
    },
    {
      texts: [
        {
          evidences: [
            {
              evidenceCode: 'ECO:0000256',
              source: 'PROSITE-ProRule',
              id: 'PRU01217',
            },
          ],
          value:
            'Lacks conserved residue(s) required for the propagation of feature annotation',
        },
      ],
      commentType: 'CAUTION',
    },
  ],
  features: [
    {
      type: 'Disulfide bond',
      location: {
        start: { value: 73, modifier: 'EXACT' },
        end: { value: 117, modifier: 'EXACT' },
      },
      description: '',
      evidences: [
        {
          evidenceCode: 'ECO:0000256',
          source: 'PROSITE-ProRule',
          id: 'PRU01217',
        },
      ],
    },
    {
      type: 'Disulfide bond',
      location: {
        start: { value: 98, modifier: 'EXACT' },
        end: { value: 105, modifier: 'EXACT' },
      },
      description: '',
      evidences: [
        {
          evidenceCode: 'ECO:0000256',
          source: 'PROSITE-ProRule',
          id: 'PRU01217',
        },
      ],
    },
    {
      type: 'Disulfide bond',
      location: {
        start: { value: 133, modifier: 'EXACT' },
        end: { value: 187, modifier: 'EXACT' },
      },
      description: '',
      evidences: [
        {
          evidenceCode: 'ECO:0000256',
          source: 'PROSITE-ProRule',
          id: 'PRU01217',
        },
      ],
    },
    {
      type: 'Disulfide bond',
      location: {
        start: { value: 144, modifier: 'EXACT' },
        end: { value: 174, modifier: 'EXACT' },
      },
      description: '',
      evidences: [
        {
          evidenceCode: 'ECO:0000256',
          source: 'PROSITE-ProRule',
          id: 'PRU01217',
        },
      ],
    },
    {
      type: 'Disulfide bond',
      location: {
        start: { value: 158, modifier: 'EXACT' },
        end: { value: 186, modifier: 'EXACT' },
      },
      description: '',
      evidences: [
        {
          evidenceCode: 'ECO:0000256',
          source: 'PROSITE-ProRule',
          id: 'PRU01217',
        },
      ],
    },
  ],
  keywords: [
    {
      evidences: [
        { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00023087' },
      ],
      id: 'KW-0034',
      category: 'Cellular component',
      name: 'Amyloid',
    },
    {
      evidences: [
        { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00022703' },
      ],
      id: 'KW-0053',
      category: 'Biological process',
      name: 'Apoptosis',
    },
    {
      evidences: [
        { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00022889' },
      ],
      id: 'KW-0130',
      category: 'Biological process',
      name: 'Cell adhesion',
    },
    {
      evidences: [
        { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00022475' },
      ],
      id: 'KW-1003',
      category: 'Cellular component',
      name: 'Cell membrane',
    },
    {
      evidences: [
        { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00023273' },
      ],
      id: 'KW-0966',
      category: 'Cellular component',
      name: 'Cell projection',
    },
    {
      evidences: [
        { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00023176' },
      ],
      id: 'KW-0168',
      category: 'Cellular component',
      name: 'Coated pit',
    },
    {
      evidences: [
        { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00023008' },
      ],
      id: 'KW-0186',
      category: 'Ligand',
      name: 'Copper',
    },
    {
      evidences: [
        { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00022490' },
      ],
      id: 'KW-0963',
      category: 'Cellular component',
      name: 'Cytoplasm',
    },
    {
      evidences: [
        { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00023329' },
      ],
      id: 'KW-0968',
      category: 'Cellular component',
      name: 'Cytoplasmic vesicle',
    },
    {
      evidences: [
        { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00023157' },
        {
          evidenceCode: 'ECO:0000256',
          source: 'PROSITE-ProRule',
          id: 'PRU01217',
        },
      ],
      id: 'KW-1015',
      category: 'PTM',
      name: 'Disulfide bond',
    },
    {
      evidences: [
        { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00022583' },
      ],
      id: 'KW-0254',
      category: 'Biological process',
      name: 'Endocytosis',
    },
    {
      evidences: [
        { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00022824' },
      ],
      id: 'KW-0256',
      category: 'Cellular component',
      name: 'Endoplasmic reticulum',
    },
    {
      evidences: [
        { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00022753' },
      ],
      id: 'KW-0967',
      category: 'Cellular component',
      name: 'Endosome',
    },
    {
      evidences: [
        { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00023180' },
      ],
      id: 'KW-0325',
      category: 'PTM',
      name: 'Glycoprotein',
    },
    {
      evidences: [
        { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00023034' },
      ],
      id: 'KW-0333',
      category: 'Cellular component',
      name: 'Golgi apparatus',
    },
    {
      evidences: [
        { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00022674' },
      ],
      id: 'KW-0358',
      category: 'Molecular function',
      name: 'Heparin-binding',
    },
    {
      evidences: [
        { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00023004' },
      ],
      id: 'KW-0408',
      category: 'Ligand',
      name: 'Iron',
    },
    {
      evidences: [
        { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00022499' },
      ],
      id: 'KW-1017',
      category: 'PTM',
      name: 'Isopeptide bond',
    },
    {
      evidences: [
        { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00023136' },
      ],
      id: 'KW-0472',
      category: 'Cellular component',
      name: 'Membrane',
    },
    {
      evidences: [
        { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00022723' },
      ],
      id: 'KW-0479',
      category: 'Ligand',
      name: 'Metal-binding',
    },
    {
      evidences: [
        { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00022976' },
      ],
      id: 'KW-0914',
      category: 'Biological process',
      name: 'Notch signaling pathway',
    },
    {
      evidences: [
        { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00023242' },
      ],
      id: 'KW-0539',
      category: 'Cellular component',
      name: 'Nucleus',
    },
    {
      evidences: [
        { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00022553' },
      ],
      id: 'KW-0597',
      category: 'PTM',
      name: 'Phosphoprotein',
    },
    {
      evidences: [
        { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00022690' },
      ],
      id: 'KW-0646',
      category: 'Molecular function',
      name: 'Protease inhibitor',
    },
    {
      evidences: [
        { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00022974' },
      ],
      id: 'KW-0654',
      category: 'PTM',
      name: 'Proteoglycan',
    },
    {
      evidences: [
        { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00022525' },
      ],
      id: 'KW-0964',
      category: 'Cellular component',
      name: 'Secreted',
    },
    {
      evidences: [
        { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00022900' },
      ],
      id: 'KW-0722',
      category: 'Molecular function',
      name: 'Serine protease inhibitor',
    },
    {
      evidences: [
        { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00022729' },
      ],
      id: 'KW-0732',
      category: 'Domain',
      name: 'Signal',
    },
    {
      evidences: [
        { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00022641' },
      ],
      id: 'KW-0765',
      category: 'PTM',
      name: 'Sulfation',
    },
    {
      evidences: [
        { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00022692' },
      ],
      id: 'KW-0812',
      category: 'Domain',
      name: 'Transmembrane',
    },
    {
      evidences: [
        { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00022989' },
      ],
      id: 'KW-1133',
      category: 'Domain',
      name: 'Transmembrane helix',
    },
    {
      evidences: [
        { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00022843' },
      ],
      id: 'KW-0832',
      category: 'PTM',
      name: 'Ubl conjugation',
    },
    {
      evidences: [
        { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00022833' },
      ],
      id: 'KW-0862',
      category: 'Ligand',
      name: 'Zinc',
    },
  ],
  extraAttributes: {
    countByCommentType: {
      FUNCTION: 1,
      'SUBCELLULAR LOCATION': 11,
      SIMILARITY: 1,
      CAUTION: 1,
    },
    countByFeatureType: { 'Disulfide bond': 5 },
  },
};

export default mock;
