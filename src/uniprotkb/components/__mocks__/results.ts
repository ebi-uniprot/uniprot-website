import { SearchResults } from '../../../shared/types/results';
import { UniProtkbAPIModel } from '../../adapters/uniProtkbConverter';

// Source: uniprotkb/search?facets=reviewed%2Cmodel_organism%2Cproteins_with%2Cexistence%2Cannotation_score%2Clength&query=glucose&size=2
// Retrieved: 2024-07-24
const mock: SearchResults<UniProtkbAPIModel> = {
  facets: [
    {
      label: 'Status',
      name: 'reviewed',
      allowMultipleSelection: false,
      values: [
        {
          label: 'Reviewed (Swiss-Prot)',
          value: 'true',
          count: 14456,
        },
        {
          label: 'Unreviewed (TrEMBL)',
          value: 'false',
          count: 3009707,
        },
      ],
    },
    {
      label: 'Popular organisms',
      name: 'model_organism',
      allowMultipleSelection: true,
      values: [
        {
          label: 'Rat',
          value: '10116',
          count: 1984,
        },
        {
          label: 'Human',
          value: '9606',
          count: 1823,
        },
        {
          label: 'A. thaliana',
          value: '3702',
          count: 1692,
        },
        {
          label: 'Mouse',
          value: '10090',
          count: 1497,
        },
        {
          label: 'Rice',
          value: '39947',
          count: 936,
        },
      ],
    },
    {
      label: 'Proteins with',
      name: 'proteins_with',
      allowMultipleSelection: true,
      values: [
        {
          label: '3D structure',
          value: '1',
          count: 2491,
        },
        {
          label: 'Active site',
          value: '2',
          count: 574418,
        },
        {
          label: 'Activity regulation',
          value: '3',
          count: 38615,
        },
        {
          label: 'Allergen',
          value: '4',
          count: 24,
        },
        {
          label: 'Alternative products (isoforms)',
          value: '5',
          count: 1193,
        },
        {
          label: 'Alternative splicing',
          value: '6',
          count: 1121,
        },
        {
          label: 'Beta strand',
          value: '7',
          count: 1642,
        },
        {
          label: 'Binary interaction',
          value: '8',
          count: 1427,
        },
        {
          label: 'Binding site',
          value: '9',
          count: 588446,
        },
        {
          label: 'Biophysicochemical properties',
          value: '10',
          count: 1369,
        },
        {
          label: 'Biotechnological use',
          value: '11',
          count: 128,
        },
        {
          label: 'Catalytic activity',
          value: '13',
          count: 1212070,
        },
        {
          label: 'Chain',
          value: '14',
          count: 242147,
        },
        {
          label: 'Cofactors',
          value: '15',
          count: 722616,
        },
        {
          label: 'Coiled-coil',
          value: '16',
          count: 62298,
        },
        {
          label: 'Compositional bias',
          value: '17',
          count: 218397,
        },
        {
          label: 'Cross-link',
          value: '18',
          count: 586,
        },
        {
          label: 'Developmental stage',
          value: '19',
          count: 697,
        },
        {
          label: 'Disease',
          value: '20',
          count: 433,
        },
        {
          label: 'Disruption phenotype',
          value: '21',
          count: 1376,
        },
        {
          label: 'Disulfide bond',
          value: '22',
          count: 11292,
        },
        {
          label: 'DNA binding',
          value: '23',
          count: 1036,
        },
        {
          label: 'Domain',
          value: '24',
          count: 2234613,
        },
        {
          label: 'Function',
          value: '25',
          count: 666829,
        },
        {
          label: 'Glycosylation',
          value: '26',
          count: 2072,
        },
        {
          label: 'Helix',
          value: '27',
          count: 1731,
        },
        {
          label: 'Induction',
          value: '28',
          count: 2387,
        },
        {
          label: 'Initiator methionine',
          value: '29',
          count: 839,
        },
        {
          label: 'Intramembrane',
          value: '30',
          count: 67,
        },
        {
          label: 'Lipidation',
          value: '31',
          count: 309,
        },
        {
          label: 'Mass spectrometry',
          value: '32',
          count: 130,
        },
        {
          label: 'Modified residue',
          value: '34',
          count: 108915,
        },
        {
          label: 'Motif',
          value: '35',
          count: 15803,
        },
        {
          label: 'Mutagenesis',
          value: '36',
          count: 1452,
        },
        {
          label: 'Natural variant',
          value: '37',
          count: 896,
        },
        {
          label: 'Non-standard residue',
          value: '38',
          count: 32,
        },
        {
          label: 'Pathway',
          value: '40',
          count: 728850,
        },
        {
          label: 'Peptide',
          value: '41',
          count: 315,
        },
        {
          label: 'Pharmaceutical use',
          value: '42',
          count: 13,
        },
        {
          label: 'Polymorphism',
          value: '43',
          count: 83,
        },
        {
          label: 'Propeptide',
          value: '44',
          count: 502,
        },
        {
          label: 'PTM comments',
          value: '45',
          count: 34684,
        },
        {
          label: 'Region',
          value: '46',
          count: 437380,
        },
        {
          label: 'Repeat',
          value: '47',
          count: 9151,
        },
        {
          label: 'RNA editing',
          value: '48',
          count: 2,
        },
        {
          label: 'Signal peptide',
          value: '49',
          count: 229933,
        },
        {
          label: 'Subcellular location',
          value: '50',
          count: 852988,
        },
        {
          label: 'Subunit structure',
          value: '51',
          count: 358351,
        },
        {
          label: 'Tissue specificity',
          value: '52',
          count: 2463,
        },
        {
          label: 'Topological domain',
          value: '53',
          count: 1249,
        },
        {
          label: 'Toxic dose',
          value: '54',
          count: 11,
        },
        {
          label: 'Transit peptide',
          value: '55',
          count: 373,
        },
        {
          label: 'Transmembrane',
          value: '56',
          count: 673739,
        },
        {
          label: 'Turn',
          value: '57',
          count: 1515,
        },
        {
          label: 'Zinc finger',
          value: '58',
          count: 354,
        },
      ],
    },
    {
      label: 'Protein existence',
      name: 'existence',
      allowMultipleSelection: true,
      values: [
        {
          label: 'Homology',
          value: '3',
          count: 2167928,
        },
        {
          label: 'Predicted',
          value: '4',
          count: 826692,
        },
        {
          label: 'Transcript level',
          value: '2',
          count: 19786,
        },
        {
          label: 'Protein level',
          value: '1',
          count: 9736,
        },
        {
          label: 'Uncertain',
          value: '5',
          count: 21,
        },
      ],
    },
    {
      label: 'Annotation score',
      name: 'annotation_score',
      allowMultipleSelection: true,
      values: [
        {
          value: '5',
          count: 9066,
        },
        {
          value: '4',
          count: 58601,
        },
        {
          value: '3',
          count: 351919,
        },
        {
          value: '2',
          count: 1135981,
        },
        {
          value: '1',
          count: 1468596,
        },
      ],
    },
    {
      label: 'Sequence length',
      name: 'length',
      allowMultipleSelection: true,
      values: [
        {
          label: '1 - 200',
          value: '[1 TO 200]',
          count: 294645,
        },
        {
          label: '201 - 400',
          value: '[201 TO 400]',
          count: 1137701,
        },
        {
          label: '401 - 600',
          value: '[401 TO 600]',
          count: 1117209,
        },
        {
          label: '601 - 800',
          value: '[601 TO 800]',
          count: 283342,
        },
        {
          label: '>= 801',
          value: '[801 TO *]',
          count: 191266,
        },
      ],
    },
  ],
  results: [
    {
      entryType: 'UniProtKB reviewed (Swiss-Prot)',
      primaryAccession: 'P19926',
      uniProtkbId: 'AGP_ECOLI',
      entryAudit: {
        firstPublicDate: '1991-02-01',
        lastAnnotationUpdateDate: '2024-07-24',
        lastSequenceUpdateDate: '1991-02-01',
        entryVersion: 175,
        sequenceVersion: 1,
      },
      annotationScore: 5,
      organism: {
        scientificName: 'Escherichia coli (strain K12)',
        taxonId: 83333,
        lineage: [
          'Bacteria',
          'Pseudomonadota',
          'Gammaproteobacteria',
          'Enterobacterales',
          'Enterobacteriaceae',
          'Escherichia',
        ],
      },
      proteinExistence: '1: Evidence at protein level',
      proteinDescription: {
        recommendedName: {
          fullName: {
            value: 'Glucose-1-phosphatase',
          },
          shortNames: [
            {
              value: 'G1Pase',
            },
          ],
          ecNumbers: [
            {
              value: '3.1.3.10',
            },
          ],
        },
        flag: 'Precursor',
      },
      genes: [
        {
          geneName: {
            value: 'agp',
          },
          orderedLocusNames: [
            {
              value: 'b1002',
            },
            {
              value: 'JW0987',
            },
          ],
        },
      ],
      comments: [
        {
          texts: [
            {
              value:
                'Absolutely required for the growth of E.coli in a high-phosphate medium containing G-1-P as the sole carbon source',
            },
          ],
          commentType: 'FUNCTION',
        },
        {
          commentType: 'CATALYTIC ACTIVITY',
          reaction: {
            name: 'alpha-D-glucose 1-phosphate + H2O = D-glucose + phosphate',
            reactionCrossReferences: [
              {
                database: 'Rhea',
                id: 'RHEA:19933',
              },
              {
                database: 'ChEBI',
                id: 'CHEBI:4167',
              },
              {
                database: 'ChEBI',
                id: 'CHEBI:15377',
              },
              {
                database: 'ChEBI',
                id: 'CHEBI:43474',
              },
              {
                database: 'ChEBI',
                id: 'CHEBI:58601',
              },
            ],
            ecNumber: '3.1.3.10',
          },
        },
        {
          texts: [
            {
              value:
                'Independent from inorganic phosphate availability, and apparently submitted to catabolite repression, it is positively controlled by cAMP and the cAMP receptor protein',
            },
          ],
          commentType: 'ACTIVITY REGULATION',
        },
        {
          commentType: 'BIOPHYSICOCHEMICAL PROPERTIES',
          phDependence: {
            texts: [
              {
                value: 'Optimum pH is about 4.',
              },
            ],
          },
        },
        {
          texts: [
            {
              evidences: [
                {
                  evidenceCode: 'ECO:0000269',
                  source: 'PubMed',
                  id: '12782623',
                },
              ],
              value: 'Homodimer',
            },
          ],
          commentType: 'SUBUNIT',
        },
        {
          commentType: 'SUBCELLULAR LOCATION',
          subcellularLocations: [
            {
              location: {
                value: 'Periplasm',
                id: 'SL-0200',
              },
            },
          ],
        },
        {
          texts: [
            {
              evidences: [
                {
                  evidenceCode: 'ECO:0000305',
                },
              ],
              value: 'Belongs to the histidine acid phosphatase family',
            },
          ],
          commentType: 'SIMILARITY',
        },
      ],
      features: [
        {
          type: 'Signal',
          location: {
            start: {
              value: 1,
              modifier: 'EXACT',
            },
            end: {
              value: 22,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '2153660',
            },
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '9298646',
            },
          ],
        },
        {
          type: 'Chain',
          location: {
            start: {
              value: 23,
              modifier: 'EXACT',
            },
            end: {
              value: 413,
              modifier: 'EXACT',
            },
          },
          description: 'Glucose-1-phosphatase',
          featureId: 'PRO_0000023948',
        },
        {
          type: 'Active site',
          location: {
            start: {
              value: 40,
              modifier: 'EXACT',
            },
            end: {
              value: 40,
              modifier: 'EXACT',
            },
          },
          description: 'Nucleophile',
        },
        {
          type: 'Active site',
          location: {
            start: {
              value: 312,
              modifier: 'EXACT',
            },
            end: {
              value: 312,
              modifier: 'EXACT',
            },
          },
          description: 'Proton donor',
        },
        {
          type: 'Binding site',
          location: {
            start: {
              value: 39,
              modifier: 'EXACT',
            },
            end: {
              value: 39,
              modifier: 'EXACT',
            },
          },
          description: '',
          ligand: {
            name: 'substrate',
          },
        },
        {
          type: 'Binding site',
          location: {
            start: {
              value: 43,
              modifier: 'EXACT',
            },
            end: {
              value: 43,
              modifier: 'EXACT',
            },
          },
          description: '',
          ligand: {
            name: 'substrate',
          },
        },
        {
          type: 'Binding site',
          location: {
            start: {
              value: 116,
              modifier: 'EXACT',
            },
            end: {
              value: 116,
              modifier: 'EXACT',
            },
          },
          description: '',
          ligand: {
            name: 'substrate',
          },
        },
        {
          type: 'Binding site',
          location: {
            start: {
              value: 218,
              modifier: 'EXACT',
            },
            end: {
              value: 218,
              modifier: 'EXACT',
            },
          },
          description: '',
          ligand: {
            name: 'substrate',
          },
        },
        {
          type: 'Binding site',
          location: {
            start: {
              value: 311,
              modifier: 'EXACT',
            },
            end: {
              value: 313,
              modifier: 'EXACT',
            },
          },
          description: '',
          ligand: {
            name: 'substrate',
          },
        },
        {
          type: 'Beta strand',
          location: {
            start: {
              value: 29,
              modifier: 'EXACT',
            },
            end: {
              value: 38,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '1NT4',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 47,
              modifier: 'EXACT',
            },
            end: {
              value: 49,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '1NT4',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 50,
              modifier: 'EXACT',
            },
            end: {
              value: 55,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '1NT4',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 73,
              modifier: 'EXACT',
            },
            end: {
              value: 92,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '1NT4',
            },
          ],
        },
        {
          type: 'Beta strand',
          location: {
            start: {
              value: 98,
              modifier: 'EXACT',
            },
            end: {
              value: 100,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '1NT4',
            },
          ],
        },
        {
          type: 'Beta strand',
          location: {
            start: {
              value: 106,
              modifier: 'EXACT',
            },
            end: {
              value: 111,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '1NT4',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 115,
              modifier: 'EXACT',
            },
            end: {
              value: 128,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '1NT4',
            },
          ],
        },
        {
          type: 'Turn',
          location: {
            start: {
              value: 147,
              modifier: 'EXACT',
            },
            end: {
              value: 149,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '1NT4',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 159,
              modifier: 'EXACT',
            },
            end: {
              value: 174,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '1NT4',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 178,
              modifier: 'EXACT',
            },
            end: {
              value: 188,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '1NT4',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 190,
              modifier: 'EXACT',
            },
            end: {
              value: 192,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '1NT4',
            },
          ],
        },
        {
          type: 'Turn',
          location: {
            start: {
              value: 194,
              modifier: 'EXACT',
            },
            end: {
              value: 199,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '1NT4',
            },
          ],
        },
        {
          type: 'Turn',
          location: {
            start: {
              value: 204,
              modifier: 'EXACT',
            },
            end: {
              value: 206,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '1NT4',
            },
          ],
        },
        {
          type: 'Beta strand',
          location: {
            start: {
              value: 210,
              modifier: 'EXACT',
            },
            end: {
              value: 212,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '1NT4',
            },
          ],
        },
        {
          type: 'Beta strand',
          location: {
            start: {
              value: 220,
              modifier: 'EXACT',
            },
            end: {
              value: 223,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '1NT4',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 224,
              modifier: 'EXACT',
            },
            end: {
              value: 240,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '1NT4',
            },
          ],
        },
        {
          type: 'Turn',
          location: {
            start: {
              value: 245,
              modifier: 'EXACT',
            },
            end: {
              value: 247,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '1NT4',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 248,
              modifier: 'EXACT',
            },
            end: {
              value: 251,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '1NT4',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 258,
              modifier: 'EXACT',
            },
            end: {
              value: 274,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '1NT4',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 277,
              modifier: 'EXACT',
            },
            end: {
              value: 283,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '1NT4',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 285,
              modifier: 'EXACT',
            },
            end: {
              value: 294,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '1NT4',
            },
          ],
        },
        {
          type: 'Turn',
          location: {
            start: {
              value: 295,
              modifier: 'EXACT',
            },
            end: {
              value: 301,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '1NT4',
            },
          ],
        },
        {
          type: 'Beta strand',
          location: {
            start: {
              value: 304,
              modifier: 'EXACT',
            },
            end: {
              value: 309,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '1NT4',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 312,
              modifier: 'EXACT',
            },
            end: {
              value: 321,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '1NT4',
            },
          ],
        },
        {
          type: 'Beta strand',
          location: {
            start: {
              value: 333,
              modifier: 'EXACT',
            },
            end: {
              value: 336,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '1NT4',
            },
          ],
        },
        {
          type: 'Beta strand',
          location: {
            start: {
              value: 341,
              modifier: 'EXACT',
            },
            end: {
              value: 349,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '1NT4',
            },
          ],
        },
        {
          type: 'Turn',
          location: {
            start: {
              value: 350,
              modifier: 'EXACT',
            },
            end: {
              value: 353,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '1NT4',
            },
          ],
        },
        {
          type: 'Beta strand',
          location: {
            start: {
              value: 354,
              modifier: 'EXACT',
            },
            end: {
              value: 363,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '1NT4',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 366,
              modifier: 'EXACT',
            },
            end: {
              value: 371,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '1NT4',
            },
          ],
        },
        {
          type: 'Beta strand',
          location: {
            start: {
              value: 377,
              modifier: 'EXACT',
            },
            end: {
              value: 379,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '1NT4',
            },
          ],
        },
        {
          type: 'Beta strand',
          location: {
            start: {
              value: 382,
              modifier: 'EXACT',
            },
            end: {
              value: 385,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '1NT4',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 401,
              modifier: 'EXACT',
            },
            end: {
              value: 411,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '1NT4',
            },
          ],
        },
      ],
      keywords: [
        {
          id: 'KW-0002',
          category: 'Technical term',
          name: '3D-structure',
        },
        {
          id: 'KW-0903',
          category: 'Technical term',
          name: 'Direct protein sequencing',
        },
        {
          id: 'KW-0378',
          category: 'Molecular function',
          name: 'Hydrolase',
        },
        {
          id: 'KW-0574',
          category: 'Cellular component',
          name: 'Periplasm',
        },
        {
          id: 'KW-1185',
          category: 'Technical term',
          name: 'Reference proteome',
        },
        {
          id: 'KW-0732',
          category: 'Domain',
          name: 'Signal',
        },
      ],
      references: [
        {
          referenceNumber: 1,
          citation: {
            id: '2153660',
            citationType: 'journal article',
            authors: ['Pradel E.', 'Marck C.', 'Boquet P.L.'],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '2153660',
              },
              {
                database: 'DOI',
                id: '10.1128/jb.172.2.802-807.1990',
              },
            ],
            title:
              'Nucleotide sequence and transcriptional analysis of the Escherichia coli agp gene encoding periplasmic acid glucose-1-phosphatase.',
            publicationDate: '1990',
            journal: 'J. Bacteriol.',
            firstPage: '802',
            lastPage: '807',
            volume: '172',
          },
          referencePositions: [
            'NUCLEOTIDE SEQUENCE [GENOMIC DNA]',
            'PROTEIN SEQUENCE OF 23-31',
          ],
          referenceComments: [
            {
              value: 'K12',
              type: 'STRAIN',
            },
          ],
        },
        {
          referenceNumber: 2,
          citation: {
            id: '8905232',
            citationType: 'journal article',
            authors: [
              'Oshima T.',
              'Aiba H.',
              'Baba T.',
              'Fujita K.',
              'Hayashi K.',
              'Honjo A.',
              'Ikemoto K.',
              'Inada T.',
              'Itoh T.',
              'Kajihara M.',
              'Kanai K.',
              'Kashimoto K.',
              'Kimura S.',
              'Kitagawa M.',
              'Makino K.',
              'Masuda S.',
              'Miki T.',
              'Mizobuchi K.',
              'Mori H.',
              'Motomura K.',
              'Nakamura Y.',
              'Nashimoto H.',
              'Nishio Y.',
              'Saito N.',
              'Sampei G.',
              'Seki Y.',
              'Tagami H.',
              'Takemoto K.',
              'Wada C.',
              'Yamamoto Y.',
              'Yano M.',
              'Horiuchi T.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '8905232',
              },
              {
                database: 'DOI',
                id: '10.1093/dnares/3.3.137',
              },
            ],
            title:
              'A 718-kb DNA sequence of the Escherichia coli K-12 genome corresponding to the 12.7-28.0 min region on the linkage map.',
            publicationDate: '1996',
            journal: 'DNA Res.',
            firstPage: '137',
            lastPage: '155',
            volume: '3',
          },
          referencePositions: ['NUCLEOTIDE SEQUENCE [LARGE SCALE GENOMIC DNA]'],
          referenceComments: [
            {
              value: 'K12 / W3110 / ATCC 27325 / DSM 5911',
              type: 'STRAIN',
            },
          ],
        },
        {
          referenceNumber: 3,
          citation: {
            id: '9278503',
            citationType: 'journal article',
            authors: [
              'Blattner F.R.',
              'Plunkett G. III',
              'Bloch C.A.',
              'Perna N.T.',
              'Burland V.',
              'Riley M.',
              'Collado-Vides J.',
              'Glasner J.D.',
              'Rode C.K.',
              'Mayhew G.F.',
              'Gregor J.',
              'Davis N.W.',
              'Kirkpatrick H.A.',
              'Goeden M.A.',
              'Rose D.J.',
              'Mau B.',
              'Shao Y.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '9278503',
              },
              {
                database: 'DOI',
                id: '10.1126/science.277.5331.1453',
              },
            ],
            title: 'The complete genome sequence of Escherichia coli K-12.',
            publicationDate: '1997',
            journal: 'Science',
            firstPage: '1453',
            lastPage: '1462',
            volume: '277',
          },
          referencePositions: ['NUCLEOTIDE SEQUENCE [LARGE SCALE GENOMIC DNA]'],
          referenceComments: [
            {
              value: 'K12 / MG1655 / ATCC 47076',
              type: 'STRAIN',
            },
          ],
        },
        {
          referenceNumber: 4,
          citation: {
            id: '16738553',
            citationType: 'journal article',
            authors: [
              'Hayashi K.',
              'Morooka N.',
              'Yamamoto Y.',
              'Fujita K.',
              'Isono K.',
              'Choi S.',
              'Ohtsubo E.',
              'Baba T.',
              'Wanner B.L.',
              'Mori H.',
              'Horiuchi T.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '16738553',
              },
              {
                database: 'DOI',
                id: '10.1038/msb4100049',
              },
            ],
            title:
              'Highly accurate genome sequences of Escherichia coli K-12 strains MG1655 and W3110.',
            publicationDate: '2006',
            journal: 'Mol. Syst. Biol.',
            firstPage: 'E1',
            lastPage: 'E5',
            volume: '2',
          },
          referencePositions: ['NUCLEOTIDE SEQUENCE [LARGE SCALE GENOMIC DNA]'],
          referenceComments: [
            {
              value: 'K12 / W3110 / ATCC 27325 / DSM 5911',
              type: 'STRAIN',
            },
          ],
        },
        {
          referenceNumber: 5,
          citation: {
            id: '9298646',
            citationType: 'journal article',
            authors: ['Link A.J.', 'Robison K.', 'Church G.M.'],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '9298646',
              },
              {
                database: 'DOI',
                id: '10.1002/elps.1150180807',
              },
            ],
            title:
              'Comparing the predicted and observed properties of proteins encoded in the genome of Escherichia coli K-12.',
            publicationDate: '1997',
            journal: 'Electrophoresis',
            firstPage: '1259',
            lastPage: '1313',
            volume: '18',
          },
          referencePositions: ['PROTEIN SEQUENCE OF 23-34'],
          referenceComments: [
            {
              value: 'K12 / EMG2',
              type: 'STRAIN',
            },
          ],
        },
        {
          referenceNumber: 6,
          citation: {
            id: '12782623',
            citationType: 'journal article',
            authors: ['Lee D.C.', 'Cottrill M.A.', 'Forsberg C.W.', 'Jia Z.'],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '12782623',
              },
              {
                database: 'DOI',
                id: '10.1074/jbc.m213154200',
              },
            ],
            title:
              'Functional insights revealed by the crystal structures of Escherichia coli glucose-1-phosphatase.',
            publicationDate: '2003',
            journal: 'J. Biol. Chem.',
            firstPage: '31412',
            lastPage: '31418',
            volume: '278',
          },
          referencePositions: [
            'X-RAY CRYSTALLOGRAPHY (2.4 ANGSTROMS) OF 23-413 IN COMPLEX WITH GLUCOSE 1-PHOSPHATE',
          ],
        },
      ],
      uniProtKBCrossReferences: [
        {
          database: 'EMBL',
          id: 'M33807',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAA23426.1',
            },
            {
              key: 'Status',
              value: '-',
            },
            {
              key: 'MoleculeType',
              value: 'Genomic_DNA',
            },
          ],
        },
        {
          database: 'EMBL',
          id: 'U00096',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAC74087.1',
            },
            {
              key: 'Status',
              value: '-',
            },
            {
              key: 'MoleculeType',
              value: 'Genomic_DNA',
            },
          ],
        },
        {
          database: 'EMBL',
          id: 'AP009048',
          properties: [
            {
              key: 'ProteinId',
              value: 'BAA35769.1',
            },
            {
              key: 'Status',
              value: '-',
            },
            {
              key: 'MoleculeType',
              value: 'Genomic_DNA',
            },
          ],
        },
        {
          database: 'PIR',
          id: 'JV0087',
          properties: [
            {
              key: 'EntryName',
              value: 'JV0087',
            },
          ],
        },
        {
          database: 'RefSeq',
          id: 'NP_415522.1',
          properties: [
            {
              key: 'NucleotideSequenceId',
              value: 'NC_000913.3',
            },
          ],
        },
        {
          database: 'RefSeq',
          id: 'WP_001044279.1',
          properties: [
            {
              key: 'NucleotideSequenceId',
              value: 'NZ_SSZK01000002.1',
            },
          ],
        },
        {
          database: 'PDB',
          id: '1NT4',
          properties: [
            {
              key: 'Method',
              value: 'X-ray',
            },
            {
              key: 'Resolution',
              value: '2.40 A',
            },
            {
              key: 'Chains',
              value: 'A/B=23-413',
            },
          ],
        },
        {
          database: 'PDB',
          id: '6RMR',
          properties: [
            {
              key: 'Method',
              value: 'X-ray',
            },
            {
              key: 'Resolution',
              value: '2.50 A',
            },
            {
              key: 'Chains',
              value: 'A/B=23-413',
            },
          ],
        },
        {
          database: 'PDBsum',
          id: '1NT4',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'PDBsum',
          id: '6RMR',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'AlphaFoldDB',
          id: 'P19926',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'SMR',
          id: 'P19926',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'BioGRID',
          id: '4259551',
          properties: [
            {
              key: 'Interactions',
              value: '16',
            },
          ],
        },
        {
          database: 'DIP',
          id: 'DIP-2905N',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'IntAct',
          id: 'P19926',
          properties: [
            {
              key: 'Interactions',
              value: '3',
            },
          ],
        },
        {
          database: 'STRING',
          id: '511145.b1002',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'DrugBank',
          id: 'DB02843',
          properties: [
            {
              key: 'GenericName',
              value: 'alpha-D-glucose-1-phosphate',
            },
          ],
        },
        {
          database: 'jPOST',
          id: 'P19926',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'PaxDb',
          id: '511145-b1002',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'EnsemblBacteria',
          id: 'AAC74087',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAC74087',
            },
            {
              key: 'GeneId',
              value: 'b1002',
            },
          ],
        },
        {
          database: 'GeneID',
          id: '945773',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'KEGG',
          id: 'ecj:JW0987',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'KEGG',
          id: 'eco:b1002',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'PATRIC',
          id: 'fig|1411691.4.peg.1269',
          properties: [
            {
              key: 'GeneDesignation',
              value: '-',
            },
          ],
        },
        {
          database: 'EchoBASE',
          id: 'EB0032',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'eggNOG',
          id: 'ENOG502Z7K9',
          properties: [
            {
              key: 'ToxonomicScope',
              value: 'Bacteria',
            },
          ],
        },
        {
          database: 'HOGENOM',
          id: 'CLU_030561_2_1_6',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'InParanoid',
          id: 'P19926',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'OMA',
          id: 'IKTDQQW',
          properties: [
            {
              key: 'Fingerprint',
              value: '-',
            },
          ],
        },
        {
          database: 'OrthoDB',
          id: '395886at2',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'PhylomeDB',
          id: 'P19926',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'BioCyc',
          id: 'EcoCyc:GLUCOSE-1-PHOSPHAT-MONOMER',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'BioCyc',
          id: 'MetaCyc:GLUCOSE-1-PHOSPHAT-MONOMER',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'EvolutionaryTrace',
          id: 'P19926',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'PRO',
          id: 'PR:P19926',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'Proteomes',
          id: 'UP000000318',
          properties: [
            {
              key: 'Component',
              value: 'Chromosome',
            },
          ],
        },
        {
          database: 'Proteomes',
          id: 'UP000000625',
          properties: [
            {
              key: 'Component',
              value: 'Chromosome',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0030288',
          properties: [
            {
              key: 'GoTerm',
              value: 'C:outer membrane-bounded periplasmic space',
            },
            {
              key: 'GoEvidenceType',
              value: 'IDA:EcoCyc',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000314',
              source: 'PubMed',
              id: '15911532',
            },
            {
              evidenceCode: 'ECO:0000314',
              source: 'PubMed',
              id: '24140104',
            },
            {
              evidenceCode: 'ECO:0000314',
              source: 'PubMed',
              id: '2844729',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0016158',
          properties: [
            {
              key: 'GoTerm',
              value: 'F:3-phytase activity',
            },
            {
              key: 'GoEvidenceType',
              value: 'IDA:EcoCyc',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000314',
              source: 'PubMed',
              id: '12455612',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0008877',
          properties: [
            {
              key: 'GoTerm',
              value: 'F:glucose-1-phosphatase activity',
            },
            {
              key: 'GoEvidenceType',
              value: 'IDA:EcoCyc',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000314',
              source: 'PubMed',
              id: '12455612',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0050308',
          properties: [
            {
              key: 'GoTerm',
              value: 'F:sugar-phosphatase activity',
            },
            {
              key: 'GoEvidenceType',
              value: 'IBA:GO_Central',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0006007',
          properties: [
            {
              key: 'GoTerm',
              value: 'P:glucose catabolic process',
            },
            {
              key: 'GoEvidenceType',
              value: 'IMP:EcoCyc',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000315',
              source: 'PubMed',
              id: '1648777',
            },
            {
              evidenceCode: 'ECO:0000315',
              source: 'PubMed',
              id: '2542226',
            },
          ],
        },
        {
          database: 'CDD',
          id: 'cd07061',
          properties: [
            {
              key: 'EntryName',
              value: 'HP_HAP_like',
            },
            {
              key: 'MatchStatus',
              value: '1',
            },
          ],
        },
        {
          database: 'Gene3D',
          id: '3.40.50.1240',
          properties: [
            {
              key: 'EntryName',
              value: 'Phosphoglycerate mutase-like',
            },
            {
              key: 'MatchStatus',
              value: '2',
            },
          ],
        },
        {
          database: 'InterPro',
          id: 'IPR033379',
          properties: [
            {
              key: 'EntryName',
              value: 'Acid_Pase_AS',
            },
          ],
        },
        {
          database: 'InterPro',
          id: 'IPR000560',
          properties: [
            {
              key: 'EntryName',
              value: 'His_Pase_clade-2',
            },
          ],
        },
        {
          database: 'InterPro',
          id: 'IPR029033',
          properties: [
            {
              key: 'EntryName',
              value: 'His_PPase_superfam',
            },
          ],
        },
        {
          database: 'InterPro',
          id: 'IPR050645',
          properties: [
            {
              key: 'EntryName',
              value: 'Histidine_acid_phosphatase',
            },
          ],
        },
        {
          database: 'PANTHER',
          id: 'PTHR11567',
          properties: [
            {
              key: 'EntryName',
              value: 'ACID PHOSPHATASE-RELATED',
            },
            {
              key: 'MatchStatus',
              value: '1',
            },
          ],
        },
        {
          database: 'PANTHER',
          id: 'PTHR11567:SF135',
          properties: [
            {
              key: 'EntryName',
              value: 'GLUCOSE-1-PHOSPHATASE',
            },
            {
              key: 'MatchStatus',
              value: '1',
            },
          ],
        },
        {
          database: 'Pfam',
          id: 'PF00328',
          properties: [
            {
              key: 'EntryName',
              value: 'His_Phos_2',
            },
            {
              key: 'MatchStatus',
              value: '1',
            },
          ],
        },
        {
          database: 'SUPFAM',
          id: 'SSF53254',
          properties: [
            {
              key: 'EntryName',
              value: 'Phosphoglycerate mutase-like',
            },
            {
              key: 'MatchStatus',
              value: '1',
            },
          ],
        },
        {
          database: 'PROSITE',
          id: 'PS00616',
          properties: [
            {
              key: 'EntryName',
              value: 'HIS_ACID_PHOSPHAT_1',
            },
            {
              key: 'MatchStatus',
              value: '1',
            },
          ],
        },
        {
          database: 'PROSITE',
          id: 'PS00778',
          properties: [
            {
              key: 'EntryName',
              value: 'HIS_ACID_PHOSPHAT_2',
            },
            {
              key: 'MatchStatus',
              value: '1',
            },
          ],
        },
      ],
      sequence: {
        value:
          'MNKTLIAAAVAGIVLLASNAQAQTVPEGYQLQQVLMMSRHNLRAPLANNGSVLEQSTPNKWPEWDVPGGQLTTKGGVLEVYMGHYMREWLAEQGMVKSGECPPPYTVYAYANSLQRTVATAQFFITGAFPGCDIPVHHQEKMGTMDPTFNPVITDDSAAFSEQAVAAMEKELSKLQLTDSYQLLEKIVNYKDSPACKEKQQCSLVDGKNTFSAKYQQEPGVSGPLKVGNSLVDAFTLQYYEGFPMDQVAWGEIKSDQQWKVLSKLKNGYQDSLFTSPEVARNVAKPLVSYIDKALVTDRTSAPKITVLVGHDSNIASLLTALDFKPYQLHDQNERTPIGGKIVFQRWHDSKANRDLMKIEYVYQSAEQLRNADALTLQAPAQRVTLELSGCPIDADGFCPMDKFDSVLNEAVK',
        length: 413,
        molWeight: 45683,
        crc64: 'ADADAD3639D0D6AB',
        md5: '59C6E65346097099D739383B53092172',
      },
      extraAttributes: {
        countByCommentType: {
          FUNCTION: 1,
          'CATALYTIC ACTIVITY': 1,
          'ACTIVITY REGULATION': 1,
          'BIOPHYSICOCHEMICAL PROPERTIES': 1,
          SUBUNIT: 1,
          'SUBCELLULAR LOCATION': 1,
          SIMILARITY: 1,
        },
        countByFeatureType: {
          Signal: 1,
          Chain: 1,
          'Active site': 2,
          'Binding site': 5,
          'Beta strand': 11,
          Helix: 15,
          Turn: 6,
        },
        uniParcId: 'UPI00001256FB',
      },
    },
    {
      entryType: 'UniProtKB reviewed (Swiss-Prot)',
      primaryAccession: 'P13866',
      secondaryAccessions: ['B2R7E2', 'B7Z4Q9', 'B7ZA69'],
      uniProtkbId: 'SC5A1_HUMAN',
      entryAudit: {
        firstPublicDate: '1990-01-01',
        lastAnnotationUpdateDate: '2024-07-24',
        lastSequenceUpdateDate: '1990-01-01',
        entryVersion: 220,
        sequenceVersion: 1,
      },
      annotationScore: 5,
      organism: {
        scientificName: 'Homo sapiens',
        commonName: 'Human',
        taxonId: 9606,
        lineage: [
          'Eukaryota',
          'Metazoa',
          'Chordata',
          'Craniata',
          'Vertebrata',
          'Euteleostomi',
          'Mammalia',
          'Eutheria',
          'Euarchontoglires',
          'Primates',
          'Haplorrhini',
          'Catarrhini',
          'Hominidae',
          'Homo',
        ],
      },
      proteinExistence: '1: Evidence at protein level',
      proteinDescription: {
        recommendedName: {
          fullName: {
            value: 'Sodium/glucose cotransporter 1',
          },
          shortNames: [
            {
              evidences: [
                {
                  evidenceCode: 'ECO:0000303',
                  source: 'PubMed',
                  id: '8563765',
                },
              ],
              value: 'Na(+)/glucose cotransporter 1',
            },
          ],
        },
        alternativeNames: [
          {
            fullName: {
              value: 'High affinity sodium-glucose cotransporter',
            },
          },
          {
            fullName: {
              value: 'Solute carrier family 5 member 1',
            },
          },
        ],
      },
      genes: [
        {
          geneName: {
            evidences: [
              {
                evidenceCode: 'ECO:0000303',
                source: 'PubMed',
                id: '28974690',
              },
              {
                evidenceCode: 'ECO:0000312',
                source: 'HGNC',
                id: 'HGNC:11036',
              },
            ],
            value: 'SLC5A1',
          },
          synonyms: [
            {
              value: 'NAGT',
            },
            {
              evidences: [
                {
                  evidenceCode: 'ECO:0000303',
                  source: 'PubMed',
                  id: '8563765',
                },
              ],
              value: 'SGLT1',
            },
          ],
        },
      ],
      comments: [
        {
          texts: [
            {
              evidences: [
                {
                  evidenceCode: 'ECO:0000250',
                  source: 'UniProtKB',
                  id: 'Q8C3K6',
                },
                {
                  evidenceCode: 'ECO:0000269',
                  source: 'PubMed',
                  id: '14695256',
                },
                {
                  evidenceCode: 'ECO:0000269',
                  source: 'PubMed',
                  id: '20980548',
                },
                {
                  evidenceCode: 'ECO:0000269',
                  source: 'PubMed',
                  id: '26945065',
                },
                {
                  evidenceCode: 'ECO:0000269',
                  source: 'PubMed',
                  id: '28974690',
                },
                {
                  evidenceCode: 'ECO:0000269',
                  source: 'PubMed',
                  id: '34880492',
                },
                {
                  evidenceCode: 'ECO:0000269',
                  source: 'PubMed',
                  id: '35077764',
                },
                {
                  evidenceCode: 'ECO:0000269',
                  source: 'PubMed',
                  id: '8563765',
                },
              ],
              value:
                'Electrogenic Na(+)-coupled sugar symporter that actively transports D-glucose or D-galactose at the plasma membrane, with a Na(+) to sugar coupling ratio of 2:1. Transporter activity is driven by a transmembrane Na(+) electrochemical gradient set by the Na(+)/K(+) pump (PubMed:20980548, PubMed:34880492, PubMed:35077764, PubMed:8563765). Has a primary role in the transport of dietary monosaccharides from enterocytes to blood. Responsible for the absorption of D-glucose or D-galactose across the apical brush-border membrane of enterocytes, whereas basolateral exit is provided by GLUT2. Additionally, functions as a D-glucose sensor in enteroendocrine cells, triggering the secretion of the incretins GCG and GIP that control food intake and energy homeostasis (By similarity) (PubMed:8563765). Together with SGLT2, functions in reabsorption of D-glucose from glomerular filtrate, playing a nonredundant role in the S3 segment of the proximal tubules (By similarity). Transports D-glucose into endometrial epithelial cells, controlling glycogen synthesis and nutritional support for the embryo as well as the decidual transformation of endometrium prior to conception (PubMed:28974690). Acts as a water channel enabling passive water transport across the plasma membrane in response to the osmotic gradient created upon sugar and Na(+) uptake. Has high water conductivity, comparable to aquaporins, and therefore is expected to play an important role in transepithelial water permeability, especially in the small intestine',
            },
          ],
          commentType: 'FUNCTION',
        },
        {
          commentType: 'CATALYTIC ACTIVITY',
          reaction: {
            name: 'D-glucose(out) + 2 Na(+)(out) = D-glucose(in) + 2 Na(+)(in)',
            reactionCrossReferences: [
              {
                database: 'Rhea',
                id: 'RHEA:70495',
              },
              {
                database: 'ChEBI',
                id: 'CHEBI:4167',
              },
              {
                database: 'ChEBI',
                id: 'CHEBI:29101',
              },
            ],
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '35077764',
              },
            ],
          },
          physiologicalReactions: [
            {
              directionType: 'left-to-right',
              reactionCrossReference: {
                database: 'Rhea',
                id: 'RHEA:70496',
              },
              evidences: [
                {
                  evidenceCode: 'ECO:0000305',
                  source: 'PubMed',
                  id: '20980548',
                },
                {
                  evidenceCode: 'ECO:0000305',
                  source: 'PubMed',
                  id: '34880492',
                },
                {
                  evidenceCode: 'ECO:0000305',
                  source: 'PubMed',
                  id: '35077764',
                },
                {
                  evidenceCode: 'ECO:0000305',
                  source: 'PubMed',
                  id: '8563765',
                },
              ],
            },
          ],
        },
        {
          commentType: 'CATALYTIC ACTIVITY',
          reaction: {
            name: 'D-galactose(out) + 2 Na(+)(out) = D-galactose(in) + 2 Na(+)(in)',
            reactionCrossReferences: [
              {
                database: 'Rhea',
                id: 'RHEA:70499',
              },
              {
                database: 'ChEBI',
                id: 'CHEBI:4139',
              },
              {
                database: 'ChEBI',
                id: 'CHEBI:29101',
              },
            ],
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '34880492',
              },
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '35077764',
              },
            ],
          },
          physiologicalReactions: [
            {
              directionType: 'left-to-right',
              reactionCrossReference: {
                database: 'Rhea',
                id: 'RHEA:70500',
              },
              evidences: [
                {
                  evidenceCode: 'ECO:0000305',
                  source: 'PubMed',
                  id: '20980548',
                },
                {
                  evidenceCode: 'ECO:0000305',
                  source: 'PubMed',
                  id: '34880492',
                },
                {
                  evidenceCode: 'ECO:0000305',
                  source: 'PubMed',
                  id: '35077764',
                },
              ],
            },
          ],
        },
        {
          texts: [
            {
              evidences: [
                {
                  evidenceCode: 'ECO:0000269',
                  source: 'PubMed',
                  id: '20980548',
                },
                {
                  evidenceCode: 'ECO:0000269',
                  source: 'PubMed',
                  id: '34880492',
                },
              ],
              value:
                'Inhibited by phlorizin (PubMed:20980548, PubMed:34880492). Possibly modulated by cholesterol binding (PubMed:34880492)',
            },
          ],
          commentType: 'ACTIVITY REGULATION',
        },
        {
          commentType: 'BIOPHYSICOCHEMICAL PROPERTIES',
          kineticParameters: {
            michaelisConstants: [
              {
                constant: 1.74,
                unit: 'mM',
                substrate: 'D-glucose',
                evidences: [
                  {
                    evidenceCode: 'ECO:0000269',
                    source: 'PubMed',
                    id: '35077764',
                  },
                ],
              },
              {
                constant: 3.12,
                unit: 'mM',
                substrate: 'D-galactose',
                evidences: [
                  {
                    evidenceCode: 'ECO:0000269',
                    source: 'PubMed',
                    id: '35077764',
                  },
                ],
              },
            ],
          },
        },
        {
          commentType: 'INTERACTION',
          interactions: [
            {
              interactantOne: {
                uniProtKBAccession: 'P13866',
                intActId: 'EBI-1772443',
              },
              interactantTwo: {
                uniProtKBAccession: 'P00533',
                geneName: 'EGFR',
                intActId: 'EBI-297353',
              },
              numberOfExperiments: 3,
              organismDiffer: false,
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
                    evidenceCode: 'ECO:0000269',
                    source: 'PubMed',
                    id: '26945065',
                  },
                ],
                value: 'Apical cell membrane',
                id: 'SL-0015',
              },
              topology: {
                evidences: [
                  {
                    evidenceCode: 'ECO:0000255',
                  },
                ],
                value: 'Multi-pass membrane protein',
                id: 'SL-9909',
              },
            },
          ],
        },
        {
          commentType: 'ALTERNATIVE PRODUCTS',
          events: ['Alternative splicing'],
          isoforms: [
            {
              name: {
                value: '1',
              },
              isoformIds: ['P13866-1'],
              isoformSequenceStatus: 'Displayed',
            },
            {
              name: {
                value: '2',
              },
              isoformIds: ['P13866-2'],
              sequenceIds: ['VSP_044782'],
              isoformSequenceStatus: 'Described',
            },
          ],
        },
        {
          texts: [
            {
              evidences: [
                {
                  evidenceCode: 'ECO:0000269',
                  source: 'PubMed',
                  id: '2490366',
                },
                {
                  evidenceCode: 'ECO:0000269',
                  source: 'PubMed',
                  id: '28974690',
                },
              ],
              value:
                'Expressed in intestine (PubMed:2490366). Expressed in endometrial cells (PubMed:28974690)',
            },
          ],
          commentType: 'TISSUE SPECIFICITY',
        },
        {
          texts: [
            {
              evidences: [
                {
                  evidenceCode: 'ECO:0000269',
                  source: 'PubMed',
                  id: '28974690',
                },
              ],
              value:
                'Up-regulated upon transition of the endometrium from the non-receptive early secretory phase to the receptive mid-secretory phase of the cycle',
            },
          ],
          commentType: 'INDUCTION',
        },
        {
          texts: [
            {
              evidences: [
                {
                  evidenceCode: 'ECO:0000269',
                  source: 'PubMed',
                  id: '34880492',
                },
              ],
              value:
                'The cholesterol-binding site is formed by transmembrane helices TM1, TM7 and TM13',
            },
          ],
          commentType: 'DOMAIN',
        },
        {
          texts: [
            {
              evidences: [
                {
                  evidenceCode: 'ECO:0000269',
                  source: 'PubMed',
                  id: '8567640',
                },
              ],
              value:
                'N-glycosylation is not necessary for the cotransporter function',
            },
          ],
          commentType: 'PTM',
        },
        {
          commentType: 'DISEASE',
          disease: {
            diseaseId: 'Congenital glucose/galactose malabsorption',
            diseaseAccession: 'DI-01402',
            acronym: 'GGM',
            description:
              'Intestinal monosaccharide transporter deficiency. It is an autosomal recessive disorder manifesting itself within the first weeks of life. It is characterized by severe diarrhea and dehydration which are usually fatal unless glucose and galactose are eliminated from the diet.',
            diseaseCrossReference: {
              database: 'MIM',
              id: '606824',
            },
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '10036327',
              },
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '11406349',
              },
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '2008213',
              },
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '8195156',
              },
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '8563765',
              },
            ],
          },
          note: {
            texts: [
              {
                value:
                  'The disease is caused by variants affecting the gene represented in this entry',
              },
            ],
          },
        },
        {
          texts: [
            {
              evidences: [
                {
                  evidenceCode: 'ECO:0000305',
                },
              ],
              value:
                'Belongs to the sodium:solute symporter (SSF) (TC 2.A.21) family',
            },
          ],
          commentType: 'SIMILARITY',
        },
      ],
      features: [
        {
          type: 'Chain',
          location: {
            start: {
              value: 1,
              modifier: 'EXACT',
            },
            end: {
              value: 664,
              modifier: 'EXACT',
            },
          },
          description: 'Sodium/glucose cotransporter 1',
          featureId: 'PRO_0000105366',
        },
        {
          type: 'Topological domain',
          location: {
            start: {
              value: 1,
              modifier: 'EXACT',
            },
            end: {
              value: 28,
              modifier: 'EXACT',
            },
          },
          description: 'Extracellular',
          evidences: [
            {
              evidenceCode: 'ECO:0000255',
            },
          ],
        },
        {
          type: 'Transmembrane',
          location: {
            start: {
              value: 29,
              modifier: 'EXACT',
            },
            end: {
              value: 49,
              modifier: 'EXACT',
            },
          },
          description: 'Helical',
          evidences: [
            {
              evidenceCode: 'ECO:0000255',
            },
          ],
        },
        {
          type: 'Topological domain',
          location: {
            start: {
              value: 50,
              modifier: 'EXACT',
            },
            end: {
              value: 64,
              modifier: 'EXACT',
            },
          },
          description: 'Cytoplasmic',
          evidences: [
            {
              evidenceCode: 'ECO:0000255',
            },
          ],
        },
        {
          type: 'Transmembrane',
          location: {
            start: {
              value: 65,
              modifier: 'EXACT',
            },
            end: {
              value: 85,
              modifier: 'EXACT',
            },
          },
          description: 'Helical',
          evidences: [
            {
              evidenceCode: 'ECO:0000255',
            },
          ],
        },
        {
          type: 'Topological domain',
          location: {
            start: {
              value: 86,
              modifier: 'EXACT',
            },
            end: {
              value: 105,
              modifier: 'EXACT',
            },
          },
          description: 'Extracellular',
          evidences: [
            {
              evidenceCode: 'ECO:0000255',
            },
          ],
        },
        {
          type: 'Transmembrane',
          location: {
            start: {
              value: 106,
              modifier: 'EXACT',
            },
            end: {
              value: 126,
              modifier: 'EXACT',
            },
          },
          description: 'Helical',
          evidences: [
            {
              evidenceCode: 'ECO:0000255',
            },
          ],
        },
        {
          type: 'Topological domain',
          location: {
            start: {
              value: 127,
              modifier: 'EXACT',
            },
            end: {
              value: 142,
              modifier: 'EXACT',
            },
          },
          description: 'Cytoplasmic',
          evidences: [
            {
              evidenceCode: 'ECO:0000255',
            },
          ],
        },
        {
          type: 'Transmembrane',
          location: {
            start: {
              value: 143,
              modifier: 'EXACT',
            },
            end: {
              value: 163,
              modifier: 'EXACT',
            },
          },
          description: 'Helical',
          evidences: [
            {
              evidenceCode: 'ECO:0000255',
            },
          ],
        },
        {
          type: 'Topological domain',
          location: {
            start: {
              value: 164,
              modifier: 'EXACT',
            },
            end: {
              value: 178,
              modifier: 'EXACT',
            },
          },
          description: 'Extracellular',
          evidences: [
            {
              evidenceCode: 'ECO:0000255',
            },
          ],
        },
        {
          type: 'Transmembrane',
          location: {
            start: {
              value: 179,
              modifier: 'EXACT',
            },
            end: {
              value: 201,
              modifier: 'EXACT',
            },
          },
          description: 'Helical',
          evidences: [
            {
              evidenceCode: 'ECO:0000255',
            },
          ],
        },
        {
          type: 'Topological domain',
          location: {
            start: {
              value: 202,
              modifier: 'EXACT',
            },
            end: {
              value: 208,
              modifier: 'EXACT',
            },
          },
          description: 'Cytoplasmic',
          evidences: [
            {
              evidenceCode: 'ECO:0000255',
            },
          ],
        },
        {
          type: 'Transmembrane',
          location: {
            start: {
              value: 209,
              modifier: 'EXACT',
            },
            end: {
              value: 229,
              modifier: 'EXACT',
            },
          },
          description: 'Helical',
          evidences: [
            {
              evidenceCode: 'ECO:0000255',
            },
          ],
        },
        {
          type: 'Topological domain',
          location: {
            start: {
              value: 230,
              modifier: 'EXACT',
            },
            end: {
              value: 277,
              modifier: 'EXACT',
            },
          },
          description: 'Extracellular',
          evidences: [
            {
              evidenceCode: 'ECO:0000255',
            },
          ],
        },
        {
          type: 'Transmembrane',
          location: {
            start: {
              value: 278,
              modifier: 'EXACT',
            },
            end: {
              value: 298,
              modifier: 'EXACT',
            },
          },
          description: 'Helical',
          evidences: [
            {
              evidenceCode: 'ECO:0000255',
            },
          ],
        },
        {
          type: 'Topological domain',
          location: {
            start: {
              value: 299,
              modifier: 'EXACT',
            },
            end: {
              value: 313,
              modifier: 'EXACT',
            },
          },
          description: 'Cytoplasmic',
          evidences: [
            {
              evidenceCode: 'ECO:0000255',
            },
          ],
        },
        {
          type: 'Transmembrane',
          location: {
            start: {
              value: 314,
              modifier: 'EXACT',
            },
            end: {
              value: 334,
              modifier: 'EXACT',
            },
          },
          description: 'Helical',
          evidences: [
            {
              evidenceCode: 'ECO:0000255',
            },
          ],
        },
        {
          type: 'Topological domain',
          location: {
            start: {
              value: 335,
              modifier: 'EXACT',
            },
            end: {
              value: 380,
              modifier: 'EXACT',
            },
          },
          description: 'Extracellular',
          evidences: [
            {
              evidenceCode: 'ECO:0000255',
            },
          ],
        },
        {
          type: 'Transmembrane',
          location: {
            start: {
              value: 381,
              modifier: 'EXACT',
            },
            end: {
              value: 401,
              modifier: 'EXACT',
            },
          },
          description: 'Helical',
          evidences: [
            {
              evidenceCode: 'ECO:0000255',
            },
          ],
        },
        {
          type: 'Topological domain',
          location: {
            start: {
              value: 402,
              modifier: 'EXACT',
            },
            end: {
              value: 423,
              modifier: 'EXACT',
            },
          },
          description: 'Cytoplasmic',
          evidences: [
            {
              evidenceCode: 'ECO:0000255',
            },
          ],
        },
        {
          type: 'Transmembrane',
          location: {
            start: {
              value: 424,
              modifier: 'EXACT',
            },
            end: {
              value: 444,
              modifier: 'EXACT',
            },
          },
          description: 'Helical',
          evidences: [
            {
              evidenceCode: 'ECO:0000255',
            },
          ],
        },
        {
          type: 'Topological domain',
          location: {
            start: {
              value: 445,
              modifier: 'EXACT',
            },
            end: {
              value: 455,
              modifier: 'EXACT',
            },
          },
          description: 'Extracellular',
          evidences: [
            {
              evidenceCode: 'ECO:0000255',
            },
          ],
        },
        {
          type: 'Transmembrane',
          location: {
            start: {
              value: 456,
              modifier: 'EXACT',
            },
            end: {
              value: 476,
              modifier: 'EXACT',
            },
          },
          description: 'Helical',
          evidences: [
            {
              evidenceCode: 'ECO:0000255',
            },
          ],
        },
        {
          type: 'Topological domain',
          location: {
            start: {
              value: 477,
              modifier: 'EXACT',
            },
            end: {
              value: 484,
              modifier: 'EXACT',
            },
          },
          description: 'Cytoplasmic',
          evidences: [
            {
              evidenceCode: 'ECO:0000255',
            },
          ],
        },
        {
          type: 'Transmembrane',
          location: {
            start: {
              value: 485,
              modifier: 'EXACT',
            },
            end: {
              value: 505,
              modifier: 'EXACT',
            },
          },
          description: 'Helical',
          evidences: [
            {
              evidenceCode: 'ECO:0000255',
            },
          ],
        },
        {
          type: 'Topological domain',
          location: {
            start: {
              value: 506,
              modifier: 'EXACT',
            },
            end: {
              value: 526,
              modifier: 'EXACT',
            },
          },
          description: 'Extracellular',
          evidences: [
            {
              evidenceCode: 'ECO:0000255',
            },
          ],
        },
        {
          type: 'Intramembrane',
          location: {
            start: {
              value: 527,
              modifier: 'EXACT',
            },
            end: {
              value: 563,
              modifier: 'EXACT',
            },
          },
          description: 'Helical',
          evidences: [
            {
              evidenceCode: 'ECO:0000255',
            },
          ],
        },
        {
          type: 'Topological domain',
          location: {
            start: {
              value: 564,
              modifier: 'EXACT',
            },
            end: {
              value: 643,
              modifier: 'EXACT',
            },
          },
          description: 'Extracellular',
          evidences: [
            {
              evidenceCode: 'ECO:0000255',
            },
          ],
        },
        {
          type: 'Transmembrane',
          location: {
            start: {
              value: 644,
              modifier: 'EXACT',
            },
            end: {
              value: 664,
              modifier: 'EXACT',
            },
          },
          description: 'Helical',
          evidences: [
            {
              evidenceCode: 'ECO:0000255',
            },
          ],
        },
        {
          type: 'Binding site',
          location: {
            start: {
              value: 457,
              modifier: 'EXACT',
            },
            end: {
              value: 457,
              modifier: 'EXACT',
            },
          },
          description: '',
          featureCrossReferences: [
            {
              database: 'ChEBI',
              id: 'CHEBI:4167',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000250',
            },
          ],
          ligand: {
            name: 'D-glucose',
            id: 'ChEBI:CHEBI:4167',
          },
        },
        {
          type: 'Site',
          location: {
            start: {
              value: 43,
              modifier: 'EXACT',
            },
            end: {
              value: 43,
              modifier: 'EXACT',
            },
          },
          description: 'Implicated in sodium coupling',
          evidences: [
            {
              evidenceCode: 'ECO:0000250',
            },
          ],
        },
        {
          type: 'Site',
          location: {
            start: {
              value: 300,
              modifier: 'EXACT',
            },
            end: {
              value: 300,
              modifier: 'EXACT',
            },
          },
          description: 'Implicated in sodium coupling',
          evidences: [
            {
              evidenceCode: 'ECO:0000250',
            },
          ],
        },
        {
          type: 'Site',
          location: {
            start: {
              value: 460,
              modifier: 'EXACT',
            },
            end: {
              value: 460,
              modifier: 'EXACT',
            },
          },
          description:
            'Involved in sugar-binding/transport and inhibitor binding',
          evidences: [
            {
              evidenceCode: 'ECO:0000250',
            },
          ],
        },
        {
          type: 'Modified residue',
          location: {
            start: {
              value: 587,
              modifier: 'EXACT',
            },
            end: {
              value: 587,
              modifier: 'EXACT',
            },
          },
          description: 'Phosphothreonine',
          evidences: [
            {
              evidenceCode: 'ECO:0000250',
              source: 'UniProtKB',
              id: 'Q8C3K6',
            },
          ],
        },
        {
          type: 'Glycosylation',
          location: {
            start: {
              value: 248,
              modifier: 'EXACT',
            },
            end: {
              value: 248,
              modifier: 'EXACT',
            },
          },
          description: 'N-linked (GlcNAc...) asparagine',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '8567640',
            },
          ],
          featureId: '',
        },
        {
          type: 'Disulfide bond',
          location: {
            start: {
              value: 255,
              modifier: 'EXACT',
            },
            end: {
              value: 511,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '34880492',
            },
          ],
        },
        {
          type: 'Disulfide bond',
          location: {
            start: {
              value: 345,
              modifier: 'EXACT',
            },
            end: {
              value: 351,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '34880492',
            },
          ],
        },
        {
          type: 'Disulfide bond',
          location: {
            start: {
              value: 355,
              modifier: 'EXACT',
            },
            end: {
              value: 361,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '34880492',
            },
          ],
        },
        {
          type: 'Disulfide bond',
          location: {
            start: {
              value: 517,
              modifier: 'EXACT',
            },
            end: {
              value: 522,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '34880492',
            },
          ],
        },
        {
          type: 'Alternative sequence',
          location: {
            start: {
              value: 1,
              modifier: 'EXACT',
            },
            end: {
              value: 127,
              modifier: 'EXACT',
            },
          },
          description: 'in isoform 2',
          evidences: [
            {
              evidenceCode: 'ECO:0000303',
              source: 'PubMed',
              id: '14702039',
            },
          ],
          featureId: 'VSP_044782',
          alternativeSequence: {},
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 28,
              modifier: 'EXACT',
            },
            end: {
              value: 28,
              modifier: 'EXACT',
            },
          },
          description: 'in GGM; dbSNP:rs121912669',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs121912669',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '8195156',
            },
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '8563765',
            },
          ],
          featureId: 'VAR_013630',
          alternativeSequence: {
            originalSequence: 'D',
            alternativeSequences: ['G'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 28,
              modifier: 'EXACT',
            },
            end: {
              value: 28,
              modifier: 'EXACT',
            },
          },
          description: 'in GGM; dbSNP:rs121912668',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs121912668',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '2008213',
            },
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '8563765',
            },
          ],
          featureId: 'VAR_007168',
          alternativeSequence: {
            originalSequence: 'D',
            alternativeSequences: ['N'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 51,
              modifier: 'EXACT',
            },
            end: {
              value: 51,
              modifier: 'EXACT',
            },
          },
          description: 'in GGM; slightly decreased activity; dbSNP:rs17683011',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs17683011',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '8563765',
            },
          ],
          featureId: 'VAR_029147',
          alternativeSequence: {
            originalSequence: 'N',
            alternativeSequences: ['S'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 135,
              modifier: 'EXACT',
            },
            end: {
              value: 135,
              modifier: 'EXACT',
            },
          },
          description: 'in GGM; loss of activity',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '11406349',
            },
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '8563765',
            },
          ],
          featureId: 'VAR_021502',
          alternativeSequence: {
            originalSequence: 'R',
            alternativeSequences: ['W'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 159,
              modifier: 'EXACT',
            },
            end: {
              value: 159,
              modifier: 'EXACT',
            },
          },
          description: 'in GGM; loss of activity; dbSNP:rs933026071',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs933026071',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '8563765',
            },
          ],
          featureId: 'VAR_086053',
          alternativeSequence: {
            originalSequence: 'S',
            alternativeSequences: ['P'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 166,
              modifier: 'EXACT',
            },
            end: {
              value: 166,
              modifier: 'EXACT',
            },
          },
          description: 'in GGM; about 90% reduction in activity',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '8563765',
            },
          ],
          featureId: 'VAR_086054',
          alternativeSequence: {
            originalSequence: 'A',
            alternativeSequences: ['T'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 191,
              modifier: 'EXACT',
            },
            end: {
              value: 664,
              modifier: 'EXACT',
            },
          },
          description: 'in GGM; loss of activity',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '8563765',
            },
          ],
          featureId: 'VAR_086055',
          alternativeSequence: {},
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 254,
              modifier: 'EXACT',
            },
            end: {
              value: 664,
              modifier: 'EXACT',
            },
          },
          description: 'in GGM',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '8563765',
            },
          ],
          featureId: 'VAR_086056',
          alternativeSequence: {},
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 276,
              modifier: 'EXACT',
            },
            end: {
              value: 276,
              modifier: 'EXACT',
            },
          },
          description: 'in GGM; about 95% reduction in activity',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '8563765',
            },
          ],
          featureId: 'VAR_086057',
          alternativeSequence: {
            originalSequence: 'W',
            alternativeSequences: ['L'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 292,
              modifier: 'EXACT',
            },
            end: {
              value: 292,
              modifier: 'EXACT',
            },
          },
          description: 'in GGM; loss of activity; dbSNP:rs765502638',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs765502638',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '8563765',
            },
          ],
          featureId: 'VAR_086058',
          alternativeSequence: {
            originalSequence: 'C',
            alternativeSequences: ['Y'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 295,
              modifier: 'EXACT',
            },
            end: {
              value: 295,
              modifier: 'EXACT',
            },
          },
          description: 'in GGM; loss of activity; dbSNP:rs779428134',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs779428134',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '8563765',
            },
          ],
          featureId: 'VAR_086059',
          alternativeSequence: {
            originalSequence: 'Q',
            alternativeSequences: ['R'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 300,
              modifier: 'EXACT',
            },
            end: {
              value: 300,
              modifier: 'EXACT',
            },
          },
          description: 'in GGM; loss of activity',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '8563765',
            },
          ],
          featureId: 'VAR_086060',
          alternativeSequence: {
            originalSequence: 'R',
            alternativeSequences: ['S'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 304,
              modifier: 'EXACT',
            },
            end: {
              value: 304,
              modifier: 'EXACT',
            },
          },
          description: 'in GGM; impairs trafficking to the plasma membrane',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '8563765',
            },
          ],
          featureId: 'VAR_086061',
          alternativeSequence: {
            originalSequence: 'A',
            alternativeSequences: ['V'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 318,
              modifier: 'EXACT',
            },
            end: {
              value: 318,
              modifier: 'EXACT',
            },
          },
          description: 'in GGM; dbSNP:rs371505974',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs371505974',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '10036327',
            },
          ],
          featureId: 'VAR_021503',
          alternativeSequence: {
            originalSequence: 'G',
            alternativeSequences: ['R'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 369,
              modifier: 'EXACT',
            },
            end: {
              value: 369,
              modifier: 'EXACT',
            },
          },
          description: 'in GGM; loss of activity',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '8563765',
            },
          ],
          featureId: 'VAR_086062',
          alternativeSequence: {
            originalSequence: 'L',
            alternativeSequences: ['S'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 379,
              modifier: 'EXACT',
            },
            end: {
              value: 664,
              modifier: 'EXACT',
            },
          },
          description: 'in GGM; loss of activity',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '8563765',
            },
          ],
          featureId: 'VAR_086063',
          alternativeSequence: {},
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 379,
              modifier: 'EXACT',
            },
            end: {
              value: 379,
              modifier: 'EXACT',
            },
          },
          description: 'in GGM; loss of activity; dbSNP:rs747215838',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs747215838',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '8563765',
            },
          ],
          featureId: 'VAR_086064',
          alternativeSequence: {
            originalSequence: 'R',
            alternativeSequences: ['Q'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 388,
              modifier: 'EXACT',
            },
            end: {
              value: 388,
              modifier: 'EXACT',
            },
          },
          description: 'in GGM; loss of activity',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '8563765',
            },
          ],
          featureId: 'VAR_086065',
          alternativeSequence: {
            originalSequence: 'A',
            alternativeSequences: ['V'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 405,
              modifier: 'EXACT',
            },
            end: {
              value: 405,
              modifier: 'EXACT',
            },
          },
          description: 'in GGM; loss of activity',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '8563765',
            },
          ],
          featureId: 'VAR_086066',
          alternativeSequence: {
            originalSequence: 'F',
            alternativeSequences: ['S'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 411,
              modifier: 'EXACT',
            },
            end: {
              value: 411,
              modifier: 'EXACT',
            },
          },
          description: 'in GGM; slightly decreased activity; dbSNP:rs17683430',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs17683430',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '8563765',
            },
          ],
          featureId: 'VAR_029148',
          alternativeSequence: {
            originalSequence: 'A',
            alternativeSequences: ['T'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 426,
              modifier: 'EXACT',
            },
            end: {
              value: 426,
              modifier: 'EXACT',
            },
          },
          description: 'in GGM; loss of activity; dbSNP:rs1304151494',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs1304151494',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '8563765',
            },
          ],
          featureId: 'VAR_086067',
          alternativeSequence: {
            originalSequence: 'G',
            alternativeSequences: ['R'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 468,
              modifier: 'EXACT',
            },
            end: {
              value: 468,
              modifier: 'EXACT',
            },
          },
          description: 'in GGM; dbSNP:rs200406921',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs200406921',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '10036327',
            },
          ],
          featureId: 'VAR_021504',
          alternativeSequence: {
            originalSequence: 'A',
            alternativeSequences: ['V'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 470,
              modifier: 'EXACT',
            },
            end: {
              value: 470,
              modifier: 'EXACT',
            },
          },
          description:
            'in GGM; about 90% reduction in activity; requires 2 nucleotide substitutions',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '8563765',
            },
          ],
          featureId: 'VAR_086068',
          alternativeSequence: {
            originalSequence: 'V',
            alternativeSequences: ['N'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 499,
              modifier: 'EXACT',
            },
            end: {
              value: 499,
              modifier: 'EXACT',
            },
          },
          description:
            'in GGM; impairs trafficking to the plasma membrane; decreases the sugar affinity; dbSNP:rs927157864',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs927157864',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '8563765',
            },
          ],
          featureId: 'VAR_086069',
          alternativeSequence: {
            originalSequence: 'R',
            alternativeSequences: ['H'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 615,
              modifier: 'EXACT',
            },
            end: {
              value: 615,
              modifier: 'EXACT',
            },
          },
          description: 'in GGM; slightly decreased activity; dbSNP:rs33954001',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs33954001',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '8563765',
            },
          ],
          featureId: 'VAR_086070',
          alternativeSequence: {
            originalSequence: 'H',
            alternativeSequences: ['Q'],
          },
        },
        {
          type: 'Mutagenesis',
          location: {
            start: {
              value: 67,
              modifier: 'EXACT',
            },
            end: {
              value: 67,
              modifier: 'EXACT',
            },
          },
          description: 'Strong reduction in D-glucose transporter activity.',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '34880492',
            },
          ],
          alternativeSequence: {
            originalSequence: 'W',
            alternativeSequences: ['A'],
          },
        },
        {
          type: 'Mutagenesis',
          location: {
            start: {
              value: 77,
              modifier: 'EXACT',
            },
            end: {
              value: 77,
              modifier: 'EXACT',
            },
          },
          description: 'Loss of activity.',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '34880492',
            },
          ],
          alternativeSequence: {
            originalSequence: 'S',
            alternativeSequences: ['A'],
          },
        },
        {
          type: 'Mutagenesis',
          location: {
            start: {
              value: 83,
              modifier: 'EXACT',
            },
            end: {
              value: 83,
              modifier: 'EXACT',
            },
          },
          description:
            'Acquires D-mannose, D-fructose and L-sorbose transporter activity; when associated with A-287 and C-290.',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '35077764',
            },
          ],
          alternativeSequence: {
            originalSequence: 'H',
            alternativeSequences: ['L'],
          },
        },
        {
          type: 'Mutagenesis',
          location: {
            start: {
              value: 83,
              modifier: 'EXACT',
            },
            end: {
              value: 83,
              modifier: 'EXACT',
            },
          },
          description: 'Loss of D-glucose transporter activity.',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '34880492',
            },
          ],
          alternativeSequence: {
            originalSequence: 'H',
            alternativeSequences: ['Q'],
          },
        },
        {
          type: 'Mutagenesis',
          location: {
            start: {
              value: 204,
              modifier: 'EXACT',
            },
            end: {
              value: 204,
              modifier: 'EXACT',
            },
          },
          description: 'Loss of activity.',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '34880492',
            },
          ],
          alternativeSequence: {
            originalSequence: 'D',
            alternativeSequences: ['A'],
          },
        },
        {
          type: 'Mutagenesis',
          location: {
            start: {
              value: 248,
              modifier: 'EXACT',
            },
            end: {
              value: 248,
              modifier: 'EXACT',
            },
          },
          description: 'Loss of N-glycosylation.',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '8567640',
            },
          ],
          alternativeSequence: {
            originalSequence: 'N',
            alternativeSequences: ['Q'],
          },
        },
        {
          type: 'Mutagenesis',
          location: {
            start: {
              value: 287,
              modifier: 'EXACT',
            },
            end: {
              value: 287,
              modifier: 'EXACT',
            },
          },
          description:
            'Acquires D-mannose, D-fructose and L-sorbose transporter activity; when associated with L-83 and C-290.',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '35077764',
            },
          ],
          alternativeSequence: {
            originalSequence: 'T',
            alternativeSequences: ['A'],
          },
        },
        {
          type: 'Mutagenesis',
          location: {
            start: {
              value: 287,
              modifier: 'EXACT',
            },
            end: {
              value: 287,
              modifier: 'EXACT',
            },
          },
          description:
            'Loss of D-glucose transporter activity. Has strict selectivity for D-galactose.',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '34880492',
            },
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '35077764',
            },
          ],
          alternativeSequence: {
            originalSequence: 'T',
            alternativeSequences: ['N'],
          },
        },
        {
          type: 'Mutagenesis',
          location: {
            start: {
              value: 287,
              modifier: 'EXACT',
            },
            end: {
              value: 287,
              modifier: 'EXACT',
            },
          },
          description:
            'Has normal D-glucose and D-galactose transporter activity.',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '34880492',
            },
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '35077764',
            },
          ],
          alternativeSequence: {
            originalSequence: 'T',
            alternativeSequences: ['S', 'A'],
          },
        },
        {
          type: 'Mutagenesis',
          location: {
            start: {
              value: 290,
              modifier: 'EXACT',
            },
            end: {
              value: 290,
              modifier: 'EXACT',
            },
          },
          description:
            'Loss of D-galactose transporter activity. Has strict selectivity for D-glucose. Acquires D-mannose, D-fructose and L-sorbose transporter activity; when associated with A-287 and L-83.',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '35077764',
            },
          ],
          alternativeSequence: {
            originalSequence: 'Y',
            alternativeSequences: ['C'],
          },
        },
        {
          type: 'Mutagenesis',
          location: {
            start: {
              value: 291,
              modifier: 'EXACT',
            },
            end: {
              value: 291,
              modifier: 'EXACT',
            },
          },
          description: 'Loss of D-glucose transporter activity.',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '34880492',
            },
          ],
          alternativeSequence: {
            originalSequence: 'W',
            alternativeSequences: ['A'],
          },
        },
        {
          type: 'Mutagenesis',
          location: {
            start: {
              value: 292,
              modifier: 'EXACT',
            },
            end: {
              value: 292,
              modifier: 'EXACT',
            },
          },
          description: 'Has no effect on water permeability.',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '26945065',
            },
          ],
          alternativeSequence: {
            originalSequence: 'C',
            alternativeSequences: ['A'],
          },
        },
        {
          type: 'Mutagenesis',
          location: {
            start: {
              value: 321,
              modifier: 'EXACT',
            },
            end: {
              value: 321,
              modifier: 'EXACT',
            },
          },
          description:
            'Acquires D-mannose and D-allose transporter activity comparable to glucose and galactose.',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '35077764',
            },
          ],
          alternativeSequence: {
            originalSequence: 'K',
            alternativeSequences: ['Q'],
          },
        },
        {
          type: 'Mutagenesis',
          location: {
            start: {
              value: 363,
              modifier: 'EXACT',
            },
            end: {
              value: 363,
              modifier: 'EXACT',
            },
          },
          description: 'Loss of water permeation.',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '34880492',
            },
          ],
          alternativeSequence: {
            originalSequence: 'N',
            alternativeSequences: ['A'],
          },
        },
        {
          type: 'Mutagenesis',
          location: {
            start: {
              value: 396,
              modifier: 'EXACT',
            },
            end: {
              value: 396,
              modifier: 'EXACT',
            },
          },
          description: 'Loss of activity.',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '34880492',
            },
          ],
          alternativeSequence: {
            originalSequence: 'S',
            alternativeSequences: ['A'],
          },
        },
        {
          type: 'Mutagenesis',
          location: {
            start: {
              value: 451,
              modifier: 'EXACT',
            },
            end: {
              value: 451,
              modifier: 'EXACT',
            },
          },
          description: 'Strong reduction in water permeation.',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '34880492',
            },
          ],
          alternativeSequence: {
            originalSequence: 'Q',
            alternativeSequences: ['A'],
          },
        },
        {
          type: 'Mutagenesis',
          location: {
            start: {
              value: 452,
              modifier: 'EXACT',
            },
            end: {
              value: 452,
              modifier: 'EXACT',
            },
          },
          description: 'Loss of water permeation.',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '34880492',
            },
          ],
          alternativeSequence: {
            originalSequence: 'L',
            alternativeSequences: ['A'],
          },
        },
        {
          type: 'Mutagenesis',
          location: {
            start: {
              value: 454,
              modifier: 'EXACT',
            },
            end: {
              value: 454,
              modifier: 'EXACT',
            },
          },
          description: 'Has no effect on water permeation.',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '34880492',
            },
          ],
          alternativeSequence: {
            originalSequence: 'D',
            alternativeSequences: ['A'],
          },
        },
        {
          type: 'Mutagenesis',
          location: {
            start: {
              value: 457,
              modifier: 'EXACT',
            },
            end: {
              value: 457,
              modifier: 'EXACT',
            },
          },
          description: 'Loss of D-glucose transporter activity.',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '34880492',
            },
          ],
          alternativeSequence: {
            originalSequence: 'Q',
            alternativeSequences: ['A'],
          },
        },
        {
          type: 'Mutagenesis',
          location: {
            start: {
              value: 457,
              modifier: 'EXACT',
            },
            end: {
              value: 457,
              modifier: 'EXACT',
            },
          },
          description: 'Strong reduction in D-glucose transporter activity.',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '34880492',
            },
          ],
          alternativeSequence: {
            originalSequence: 'Q',
            alternativeSequences: ['C'],
          },
        },
        {
          type: 'Mutagenesis',
          location: {
            start: {
              value: 460,
              modifier: 'EXACT',
            },
            end: {
              value: 460,
              modifier: 'EXACT',
            },
          },
          description: 'Loss of D-glucose transporter activity.',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '34880492',
            },
          ],
          alternativeSequence: {
            originalSequence: 'T',
            alternativeSequences: ['A'],
          },
        },
        {
          type: 'Mutagenesis',
          location: {
            start: {
              value: 641,
              modifier: 'EXACT',
            },
            end: {
              value: 641,
              modifier: 'EXACT',
            },
          },
          description: 'Slightly reduced D-glucose transporter activity.',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '34880492',
            },
          ],
          alternativeSequence: {
            originalSequence: 'W',
            alternativeSequences: ['A'],
          },
        },
        {
          type: 'Mutagenesis',
          location: {
            start: {
              value: 660,
              modifier: 'EXACT',
            },
            end: {
              value: 661,
              modifier: 'EXACT',
            },
          },
          description: 'Loss of D-glucose transporter activity.',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '34880492',
            },
          ],
          alternativeSequence: {
            originalSequence: 'HA',
            alternativeSequences: ['WG'],
          },
        },
        {
          type: 'Sequence conflict',
          location: {
            start: {
              value: 631,
              modifier: 'EXACT',
            },
            end: {
              value: 631,
              modifier: 'EXACT',
            },
          },
          description: 'in Ref. 4; BAH14555',
          evidences: [
            {
              evidenceCode: 'ECO:0000305',
            },
          ],
          alternativeSequence: {
            originalSequence: 'K',
            alternativeSequences: ['R'],
          },
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 22,
              modifier: 'EXACT',
            },
            end: {
              value: 24,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7YNI',
            },
          ],
        },
        {
          type: 'Turn',
          location: {
            start: {
              value: 26,
              modifier: 'EXACT',
            },
            end: {
              value: 28,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SLA',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 29,
              modifier: 'EXACT',
            },
            end: {
              value: 46,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SLA',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 67,
              modifier: 'EXACT',
            },
            end: {
              value: 75,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SLA',
            },
          ],
        },
        {
          type: 'Turn',
          location: {
            start: {
              value: 76,
              modifier: 'EXACT',
            },
            end: {
              value: 78,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SL8',
            },
          ],
        },
        {
          type: 'Turn',
          location: {
            start: {
              value: 79,
              modifier: 'EXACT',
            },
            end: {
              value: 81,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SLA',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 86,
              modifier: 'EXACT',
            },
            end: {
              value: 93,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SLA',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 97,
              modifier: 'EXACT',
            },
            end: {
              value: 101,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SLA',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 102,
              modifier: 'EXACT',
            },
            end: {
              value: 114,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SLA',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 117,
              modifier: 'EXACT',
            },
            end: {
              value: 121,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SLA',
            },
          ],
        },
        {
          type: 'Turn',
          location: {
            start: {
              value: 122,
              modifier: 'EXACT',
            },
            end: {
              value: 124,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SLA',
            },
          ],
        },
        {
          type: 'Beta strand',
          location: {
            start: {
              value: 126,
              modifier: 'EXACT',
            },
            end: {
              value: 128,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SLA',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 129,
              modifier: 'EXACT',
            },
            end: {
              value: 135,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SLA',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 140,
              modifier: 'EXACT',
            },
            end: {
              value: 156,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SLA',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 158,
              modifier: 'EXACT',
            },
            end: {
              value: 172,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SLA',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 178,
              modifier: 'EXACT',
            },
            end: {
              value: 193,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SLA',
            },
          ],
        },
        {
          type: 'Turn',
          location: {
            start: {
              value: 196,
              modifier: 'EXACT',
            },
            end: {
              value: 198,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SLA',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 202,
              modifier: 'EXACT',
            },
            end: {
              value: 225,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SLA',
            },
          ],
        },
        {
          type: 'Turn',
          location: {
            start: {
              value: 227,
              modifier: 'EXACT',
            },
            end: {
              value: 229,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SL8',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 230,
              modifier: 'EXACT',
            },
            end: {
              value: 236,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SLA',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 253,
              modifier: 'EXACT',
            },
            end: {
              value: 255,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SLA',
            },
          ],
        },
        {
          type: 'Turn',
          location: {
            start: {
              value: 260,
              modifier: 'EXACT',
            },
            end: {
              value: 263,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7YNI',
            },
          ],
        },
        {
          type: 'Beta strand',
          location: {
            start: {
              value: 265,
              modifier: 'EXACT',
            },
            end: {
              value: 267,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SLA',
            },
          ],
        },
        {
          type: 'Turn',
          location: {
            start: {
              value: 269,
              modifier: 'EXACT',
            },
            end: {
              value: 271,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SLA',
            },
          ],
        },
        {
          type: 'Beta strand',
          location: {
            start: {
              value: 272,
              modifier: 'EXACT',
            },
            end: {
              value: 275,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SLA',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 276,
              modifier: 'EXACT',
            },
            end: {
              value: 292,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SLA',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 296,
              modifier: 'EXACT',
            },
            end: {
              value: 301,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SLA',
            },
          ],
        },
        {
          type: 'Beta strand',
          location: {
            start: {
              value: 304,
              modifier: 'EXACT',
            },
            end: {
              value: 307,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SLA',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 308,
              modifier: 'EXACT',
            },
            end: {
              value: 320,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SLA',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 321,
              modifier: 'EXACT',
            },
            end: {
              value: 323,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SL8',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 325,
              modifier: 'EXACT',
            },
            end: {
              value: 329,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SLA',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 330,
              modifier: 'EXACT',
            },
            end: {
              value: 338,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SLA',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 340,
              modifier: 'EXACT',
            },
            end: {
              value: 343,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SLA',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 348,
              modifier: 'EXACT',
            },
            end: {
              value: 355,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SLA',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 362,
              modifier: 'EXACT',
            },
            end: {
              value: 364,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SLA',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 365,
              modifier: 'EXACT',
            },
            end: {
              value: 371,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SLA',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 378,
              modifier: 'EXACT',
            },
            end: {
              value: 408,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SLA',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 410,
              modifier: 'EXACT',
            },
            end: {
              value: 412,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SLA',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 419,
              modifier: 'EXACT',
            },
            end: {
              value: 427,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SLA',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 430,
              modifier: 'EXACT',
            },
            end: {
              value: 444,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SLA',
            },
          ],
        },
        {
          type: 'Turn',
          location: {
            start: {
              value: 448,
              modifier: 'EXACT',
            },
            end: {
              value: 450,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SLA',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 452,
              modifier: 'EXACT',
            },
            end: {
              value: 463,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SLA',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 465,
              modifier: 'EXACT',
            },
            end: {
              value: 476,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SLA',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 482,
              modifier: 'EXACT',
            },
            end: {
              value: 506,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SLA',
            },
          ],
        },
        {
          type: 'Beta strand',
          location: {
            start: {
              value: 511,
              modifier: 'EXACT',
            },
            end: {
              value: 513,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SLA',
            },
          ],
        },
        {
          type: 'Beta strand',
          location: {
            start: {
              value: 519,
              modifier: 'EXACT',
            },
            end: {
              value: 524,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SLA',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 528,
              modifier: 'EXACT',
            },
            end: {
              value: 545,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SLA',
            },
          ],
        },
        {
          type: 'Turn',
          location: {
            start: {
              value: 553,
              modifier: 'EXACT',
            },
            end: {
              value: 558,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SLA',
            },
          ],
        },
        {
          type: 'Beta strand',
          location: {
            start: {
              value: 559,
              modifier: 'EXACT',
            },
            end: {
              value: 561,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SLA',
            },
          ],
        },
        {
          type: 'Turn',
          location: {
            start: {
              value: 562,
              modifier: 'EXACT',
            },
            end: {
              value: 565,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SLA',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 628,
              modifier: 'EXACT',
            },
            end: {
              value: 632,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7YNI',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 641,
              modifier: 'EXACT',
            },
            end: {
              value: 663,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SLA',
            },
          ],
        },
      ],
      keywords: [
        {
          id: 'KW-0002',
          category: 'Technical term',
          name: '3D-structure',
        },
        {
          id: 'KW-0025',
          category: 'Coding sequence diversity',
          name: 'Alternative splicing',
        },
        {
          id: 'KW-1003',
          category: 'Cellular component',
          name: 'Cell membrane',
        },
        {
          id: 'KW-0225',
          category: 'Disease',
          name: 'Disease variant',
        },
        {
          id: 'KW-1015',
          category: 'PTM',
          name: 'Disulfide bond',
        },
        {
          id: 'KW-0325',
          category: 'PTM',
          name: 'Glycoprotein',
        },
        {
          id: 'KW-0406',
          category: 'Biological process',
          name: 'Ion transport',
        },
        {
          id: 'KW-0472',
          category: 'Cellular component',
          name: 'Membrane',
        },
        {
          id: 'KW-0597',
          category: 'PTM',
          name: 'Phosphoprotein',
        },
        {
          id: 'KW-1185',
          category: 'Technical term',
          name: 'Reference proteome',
        },
        {
          id: 'KW-0915',
          category: 'Ligand',
          name: 'Sodium',
        },
        {
          id: 'KW-0739',
          category: 'Biological process',
          name: 'Sodium transport',
        },
        {
          id: 'KW-0762',
          category: 'Biological process',
          name: 'Sugar transport',
        },
        {
          id: 'KW-0769',
          category: 'Biological process',
          name: 'Symport',
        },
        {
          id: 'KW-0812',
          category: 'Domain',
          name: 'Transmembrane',
        },
        {
          id: 'KW-1133',
          category: 'Domain',
          name: 'Transmembrane helix',
        },
        {
          id: 'KW-0813',
          category: 'Biological process',
          name: 'Transport',
        },
      ],
      references: [
        {
          referenceNumber: 1,
          citation: {
            id: '2490366',
            citationType: 'journal article',
            authors: ['Hediger M.A.', 'Turk E.', 'Wright E.M.'],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '2490366',
              },
              {
                database: 'DOI',
                id: '10.1073/pnas.86.15.5748',
              },
            ],
            title:
              'Homology of the human intestinal Na+/glucose and Escherichia coli Na+/proline cotransporters.',
            publicationDate: '1989',
            journal: 'Proc. Natl. Acad. Sci. U.S.A.',
            firstPage: '5748',
            lastPage: '5752',
            volume: '86',
          },
          referencePositions: [
            'NUCLEOTIDE SEQUENCE [MRNA] (ISOFORM 1)',
            'TISSUE SPECIFICITY',
          ],
        },
        {
          referenceNumber: 2,
          citation: {
            id: '8195156',
            citationType: 'journal article',
            authors: ['Turk E.', 'Martin M.G.', 'Wright E.M.'],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '8195156',
              },
              {
                database: 'DOI',
                id: '10.1016/s0021-9258(17)36592-4',
              },
            ],
            title:
              'Structure of the human Na+/glucose cotransporter gene SGLT1.',
            publicationDate: '1994',
            journal: 'J. Biol. Chem.',
            firstPage: '15204',
            lastPage: '15209',
            volume: '269',
          },
          referencePositions: [
            'NUCLEOTIDE SEQUENCE [GENOMIC DNA]',
            'VARIANT GGM GLY-28',
          ],
        },
        {
          referenceNumber: 3,
          citation: {
            id: '15461802',
            citationType: 'journal article',
            authors: [
              'Collins J.E.',
              'Wright C.L.',
              'Edwards C.A.',
              'Davis M.P.',
              'Grinham J.A.',
              'Cole C.G.',
              'Goward M.E.',
              'Aguado B.',
              'Mallya M.',
              'Mokrab Y.',
              'Huckle E.J.',
              'Beare D.M.',
              'Dunham I.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '15461802',
              },
              {
                database: 'DOI',
                id: '10.1186/gb-2004-5-10-r84',
              },
            ],
            title:
              'A genome annotation-driven approach to cloning the human ORFeome.',
            publicationDate: '2004',
            journal: 'Genome Biol.',
            firstPage: 'R84.1',
            lastPage: 'R84.11',
            volume: '5',
          },
          referencePositions: [
            'NUCLEOTIDE SEQUENCE [LARGE SCALE MRNA] (ISOFORM 1)',
          ],
        },
        {
          referenceNumber: 4,
          citation: {
            id: '14702039',
            citationType: 'journal article',
            authors: [
              'Ota T.',
              'Suzuki Y.',
              'Nishikawa T.',
              'Otsuki T.',
              'Sugiyama T.',
              'Irie R.',
              'Wakamatsu A.',
              'Hayashi K.',
              'Sato H.',
              'Nagai K.',
              'Kimura K.',
              'Makita H.',
              'Sekine M.',
              'Obayashi M.',
              'Nishi T.',
              'Shibahara T.',
              'Tanaka T.',
              'Ishii S.',
              'Yamamoto J.',
              'Saito K.',
              'Kawai Y.',
              'Isono Y.',
              'Nakamura Y.',
              'Nagahari K.',
              'Murakami K.',
              'Yasuda T.',
              'Iwayanagi T.',
              'Wagatsuma M.',
              'Shiratori A.',
              'Sudo H.',
              'Hosoiri T.',
              'Kaku Y.',
              'Kodaira H.',
              'Kondo H.',
              'Sugawara M.',
              'Takahashi M.',
              'Kanda K.',
              'Yokoi T.',
              'Furuya T.',
              'Kikkawa E.',
              'Omura Y.',
              'Abe K.',
              'Kamihara K.',
              'Katsuta N.',
              'Sato K.',
              'Tanikawa M.',
              'Yamazaki M.',
              'Ninomiya K.',
              'Ishibashi T.',
              'Yamashita H.',
              'Murakawa K.',
              'Fujimori K.',
              'Tanai H.',
              'Kimata M.',
              'Watanabe M.',
              'Hiraoka S.',
              'Chiba Y.',
              'Ishida S.',
              'Ono Y.',
              'Takiguchi S.',
              'Watanabe S.',
              'Yosida M.',
              'Hotuta T.',
              'Kusano J.',
              'Kanehori K.',
              'Takahashi-Fujii A.',
              'Hara H.',
              'Tanase T.-O.',
              'Nomura Y.',
              'Togiya S.',
              'Komai F.',
              'Hara R.',
              'Takeuchi K.',
              'Arita M.',
              'Imose N.',
              'Musashino K.',
              'Yuuki H.',
              'Oshima A.',
              'Sasaki N.',
              'Aotsuka S.',
              'Yoshikawa Y.',
              'Matsunawa H.',
              'Ichihara T.',
              'Shiohata N.',
              'Sano S.',
              'Moriya S.',
              'Momiyama H.',
              'Satoh N.',
              'Takami S.',
              'Terashima Y.',
              'Suzuki O.',
              'Nakagawa S.',
              'Senoh A.',
              'Mizoguchi H.',
              'Goto Y.',
              'Shimizu F.',
              'Wakebe H.',
              'Hishigaki H.',
              'Watanabe T.',
              'Sugiyama A.',
              'Takemoto M.',
              'Kawakami B.',
              'Yamazaki M.',
              'Watanabe K.',
              'Kumagai A.',
              'Itakura S.',
              'Fukuzumi Y.',
              'Fujimori Y.',
              'Komiyama M.',
              'Tashiro H.',
              'Tanigami A.',
              'Fujiwara T.',
              'Ono T.',
              'Yamada K.',
              'Fujii Y.',
              'Ozaki K.',
              'Hirao M.',
              'Ohmori Y.',
              'Kawabata A.',
              'Hikiji T.',
              'Kobatake N.',
              'Inagaki H.',
              'Ikema Y.',
              'Okamoto S.',
              'Okitani R.',
              'Kawakami T.',
              'Noguchi S.',
              'Itoh T.',
              'Shigeta K.',
              'Senba T.',
              'Matsumura K.',
              'Nakajima Y.',
              'Mizuno T.',
              'Morinaga M.',
              'Sasaki M.',
              'Togashi T.',
              'Oyama M.',
              'Hata H.',
              'Watanabe M.',
              'Komatsu T.',
              'Mizushima-Sugano J.',
              'Satoh T.',
              'Shirai Y.',
              'Takahashi Y.',
              'Nakagawa K.',
              'Okumura K.',
              'Nagase T.',
              'Nomura N.',
              'Kikuchi H.',
              'Masuho Y.',
              'Yamashita R.',
              'Nakai K.',
              'Yada T.',
              'Nakamura Y.',
              'Ohara O.',
              'Isogai T.',
              'Sugano S.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '14702039',
              },
              {
                database: 'DOI',
                id: '10.1038/ng1285',
              },
            ],
            title:
              'Complete sequencing and characterization of 21,243 full-length human cDNAs.',
            publicationDate: '2004',
            journal: 'Nat. Genet.',
            firstPage: '40',
            lastPage: '45',
            volume: '36',
          },
          referencePositions: [
            'NUCLEOTIDE SEQUENCE [LARGE SCALE MRNA] (ISOFORMS 1 AND 2)',
          ],
          referenceComments: [
            {
              value: 'Heart',
              type: 'TISSUE',
            },
            {
              value: 'Trachea',
              type: 'TISSUE',
            },
          ],
        },
        {
          referenceNumber: 5,
          citation: {
            id: '10591208',
            citationType: 'journal article',
            authors: [
              'Dunham I.',
              'Hunt A.R.',
              'Collins J.E.',
              'Bruskiewich R.',
              'Beare D.M.',
              'Clamp M.',
              'Smink L.J.',
              'Ainscough R.',
              'Almeida J.P.',
              'Babbage A.K.',
              'Bagguley C.',
              'Bailey J.',
              'Barlow K.F.',
              'Bates K.N.',
              'Beasley O.P.',
              'Bird C.P.',
              'Blakey S.E.',
              'Bridgeman A.M.',
              'Buck D.',
              'Burgess J.',
              'Burrill W.D.',
              'Burton J.',
              'Carder C.',
              'Carter N.P.',
              'Chen Y.',
              'Clark G.',
              'Clegg S.M.',
              'Cobley V.E.',
              'Cole C.G.',
              'Collier R.E.',
              'Connor R.',
              'Conroy D.',
              'Corby N.R.',
              'Coville G.J.',
              'Cox A.V.',
              'Davis J.',
              'Dawson E.',
              'Dhami P.D.',
              'Dockree C.',
              'Dodsworth S.J.',
              'Durbin R.M.',
              'Ellington A.G.',
              'Evans K.L.',
              'Fey J.M.',
              'Fleming K.',
              'French L.',
              'Garner A.A.',
              'Gilbert J.G.R.',
              'Goward M.E.',
              'Grafham D.V.',
              'Griffiths M.N.D.',
              'Hall C.',
              'Hall R.E.',
              'Hall-Tamlyn G.',
              'Heathcott R.W.',
              'Ho S.',
              'Holmes S.',
              'Hunt S.E.',
              'Jones M.C.',
              'Kershaw J.',
              'Kimberley A.M.',
              'King A.',
              'Laird G.K.',
              'Langford C.F.',
              'Leversha M.A.',
              'Lloyd C.',
              'Lloyd D.M.',
              'Martyn I.D.',
              'Mashreghi-Mohammadi M.',
              'Matthews L.H.',
              'Mccann O.T.',
              'Mcclay J.',
              'Mclaren S.',
              'McMurray A.A.',
              'Milne S.A.',
              'Mortimore B.J.',
              'Odell C.N.',
              'Pavitt R.',
              'Pearce A.V.',
              'Pearson D.',
              'Phillimore B.J.C.T.',
              'Phillips S.H.',
              'Plumb R.W.',
              'Ramsay H.',
              'Ramsey Y.',
              'Rogers L.',
              'Ross M.T.',
              'Scott C.E.',
              'Sehra H.K.',
              'Skuce C.D.',
              'Smalley S.',
              'Smith M.L.',
              'Soderlund C.',
              'Spragon L.',
              'Steward C.A.',
              'Sulston J.E.',
              'Swann R.M.',
              'Vaudin M.',
              'Wall M.',
              'Wallis J.M.',
              'Whiteley M.N.',
              'Willey D.L.',
              'Williams L.',
              'Williams S.A.',
              'Williamson H.',
              'Wilmer T.E.',
              'Wilming L.',
              'Wright C.L.',
              'Hubbard T.',
              'Bentley D.R.',
              'Beck S.',
              'Rogers J.',
              'Shimizu N.',
              'Minoshima S.',
              'Kawasaki K.',
              'Sasaki T.',
              'Asakawa S.',
              'Kudoh J.',
              'Shintani A.',
              'Shibuya K.',
              'Yoshizaki Y.',
              'Aoki N.',
              'Mitsuyama S.',
              'Roe B.A.',
              'Chen F.',
              'Chu L.',
              'Crabtree J.',
              'Deschamps S.',
              'Do A.',
              'Do T.',
              'Dorman A.',
              'Fang F.',
              'Fu Y.',
              'Hu P.',
              'Hua A.',
              'Kenton S.',
              'Lai H.',
              'Lao H.I.',
              'Lewis J.',
              'Lewis S.',
              'Lin S.-P.',
              'Loh P.',
              'Malaj E.',
              'Nguyen T.',
              'Pan H.',
              'Phan S.',
              'Qi S.',
              'Qian Y.',
              'Ray L.',
              'Ren Q.',
              'Shaull S.',
              'Sloan D.',
              'Song L.',
              'Wang Q.',
              'Wang Y.',
              'Wang Z.',
              'White J.',
              'Willingham D.',
              'Wu H.',
              'Yao Z.',
              'Zhan M.',
              'Zhang G.',
              'Chissoe S.',
              'Murray J.',
              'Miller N.',
              'Minx P.',
              'Fulton R.',
              'Johnson D.',
              'Bemis G.',
              'Bentley D.',
              'Bradshaw H.',
              'Bourne S.',
              'Cordes M.',
              'Du Z.',
              'Fulton L.',
              'Goela D.',
              'Graves T.',
              'Hawkins J.',
              'Hinds K.',
              'Kemp K.',
              'Latreille P.',
              'Layman D.',
              'Ozersky P.',
              'Rohlfing T.',
              'Scheet P.',
              'Walker C.',
              'Wamsley A.',
              'Wohldmann P.',
              'Pepin K.',
              'Nelson J.',
              'Korf I.',
              'Bedell J.A.',
              'Hillier L.W.',
              'Mardis E.',
              'Waterston R.',
              'Wilson R.',
              'Emanuel B.S.',
              'Shaikh T.',
              'Kurahashi H.',
              'Saitta S.',
              'Budarf M.L.',
              'McDermid H.E.',
              'Johnson A.',
              'Wong A.C.C.',
              'Morrow B.E.',
              'Edelmann L.',
              'Kim U.J.',
              'Shizuya H.',
              'Simon M.I.',
              'Dumanski J.P.',
              'Peyrard M.',
              'Kedra D.',
              'Seroussi E.',
              'Fransson I.',
              'Tapia I.',
              'Bruder C.E.',
              "O'Brien K.P.",
              'Wilkinson P.',
              'Bodenteich A.',
              'Hartman K.',
              'Hu X.',
              'Khan A.S.',
              'Lane L.',
              'Tilahun Y.',
              'Wright H.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '10591208',
              },
              {
                database: 'DOI',
                id: '10.1038/990031',
              },
            ],
            title: 'The DNA sequence of human chromosome 22.',
            publicationDate: '1999',
            journal: 'Nature',
            firstPage: '489',
            lastPage: '495',
            volume: '402',
          },
          referencePositions: ['NUCLEOTIDE SEQUENCE [LARGE SCALE GENOMIC DNA]'],
        },
        {
          referenceNumber: 6,
          citation: {
            id: 'CI-5GBDQ6B103N1E',
            citationType: 'submission',
            authors: [
              'Mural R.J.',
              'Istrail S.',
              'Sutton G.G.',
              'Florea L.',
              'Halpern A.L.',
              'Mobarry C.M.',
              'Lippert R.',
              'Walenz B.',
              'Shatkay H.',
              'Dew I.',
              'Miller J.R.',
              'Flanigan M.J.',
              'Edwards N.J.',
              'Bolanos R.',
              'Fasulo D.',
              'Halldorsson B.V.',
              'Hannenhalli S.',
              'Turner R.',
              'Yooseph S.',
              'Lu F.',
              'Nusskern D.R.',
              'Shue B.C.',
              'Zheng X.H.',
              'Zhong F.',
              'Delcher A.L.',
              'Huson D.H.',
              'Kravitz S.A.',
              'Mouchard L.',
              'Reinert K.',
              'Remington K.A.',
              'Clark A.G.',
              'Waterman M.S.',
              'Eichler E.E.',
              'Adams M.D.',
              'Hunkapiller M.W.',
              'Myers E.W.',
              'Venter J.C.',
            ],
            publicationDate: 'JUL-2005',
            submissionDatabase: 'EMBL/GenBank/DDBJ databases',
          },
          referencePositions: ['NUCLEOTIDE SEQUENCE [LARGE SCALE GENOMIC DNA]'],
        },
        {
          referenceNumber: 7,
          citation: {
            id: '8567640',
            citationType: 'journal article',
            authors: ['Turk E.', 'Kerner C.J.', 'Lostao M.P.', 'Wright E.M.'],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '8567640',
              },
              {
                database: 'DOI',
                id: '10.1074/jbc.271.4.1925',
              },
            ],
            title:
              'Membrane topology of the human Na+/glucose cotransporter SGLT1.',
            publicationDate: '1996',
            journal: 'J. Biol. Chem.',
            firstPage: '1925',
            lastPage: '1934',
            volume: '271',
          },
          referencePositions: [
            'TOPOLOGY',
            'MUTAGENESIS OF ASN-248',
            'GLYCOSYLATION AT ASN-248',
          ],
        },
        {
          referenceNumber: 8,
          citation: {
            id: '14695256',
            citationType: 'journal article',
            authors: [
              'Gagnon M.P.',
              'Bissonnette P.',
              'Deslandes L.M.',
              'Wallendorff B.',
              'Lapointe J.Y.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '14695256',
              },
              {
                database: 'DOI',
                id: '10.1016/s0006-3495(04)74090-4',
              },
            ],
            title:
              'Glucose accumulation can account for the initial water flux triggered by Na+/glucose cotransport.',
            publicationDate: '2004',
            journal: 'Biophys. J.',
            firstPage: '125',
            lastPage: '133',
            volume: '86',
          },
          referencePositions: ['FUNCTION'],
        },
        {
          referenceNumber: 9,
          citation: {
            id: '20980548',
            citationType: 'journal article',
            authors: [
              'Hummel C.S.',
              'Lu C.',
              'Loo D.D.',
              'Hirayama B.A.',
              'Voss A.A.',
              'Wright E.M.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '20980548',
              },
              {
                database: 'DOI',
                id: '10.1152/ajpcell.00388.2010',
              },
            ],
            title:
              'Glucose transport by human renal Na+/D-glucose cotransporters SGLT1 and SGLT2.',
            publicationDate: '2011',
            journal: 'Am. J. Physiol.',
            firstPage: 'C14',
            lastPage: 'C21',
            volume: '300',
          },
          referencePositions: [
            'FUNCTION',
            'TRANSPORTER ACTIVITY',
            'ACTIVITY REGULATION',
          ],
        },
        {
          referenceNumber: 10,
          citation: {
            id: '26945065',
            citationType: 'journal article',
            authors: [
              'Erokhova L.',
              'Horner A.',
              'Ollinger N.',
              'Siligan C.',
              'Pohl P.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '26945065',
              },
              {
                database: 'DOI',
                id: '10.1074/jbc.m115.706986',
              },
            ],
            title:
              'The Sodium Glucose Cotransporter SGLT1 Is an Extremely Efficient Facilitator of Passive Water Transport.',
            publicationDate: '2016',
            journal: 'J. Biol. Chem.',
            firstPage: '9712',
            lastPage: '9720',
            volume: '291',
          },
          referencePositions: [
            'FUNCTION',
            'SUBCELLULAR LOCATION',
            'MUTAGENESIS OF CYS-292',
          ],
        },
        {
          referenceNumber: 11,
          citation: {
            id: '28974690',
            citationType: 'journal article',
            authors: [
              'Salker M.S.',
              'Singh Y.',
              'Zeng N.',
              'Chen H.',
              'Zhang S.',
              'Umbach A.T.',
              'Fakhri H.',
              'Kohlhofer U.',
              'Quintanilla-Martinez L.',
              'Durairaj R.R.P.',
              'Barros F.S.V.',
              'Vrljicak P.',
              'Ott S.',
              'Brucker S.Y.',
              'Wallwiener D.',
              'Vrhovac Madunic I.',
              'Breljak D.',
              'Sabolic I.',
              'Koepsell H.',
              'Brosens J.J.',
              'Lang F.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '28974690',
              },
              {
                database: 'DOI',
                id: '10.1038/s41598-017-11674-3',
              },
            ],
            title:
              'Loss of Endometrial Sodium Glucose Cotransporter SGLT1 is Detrimental to Embryo Survival and Fetal Growth in Pregnancy.',
            publicationDate: '2017',
            journal: 'Sci. Rep.',
            firstPage: '12612',
            lastPage: '12612',
            volume: '7',
          },
          referencePositions: ['FUNCTION', 'TISSUE SPECIFICITY', 'INDUCTION'],
        },
        {
          referenceNumber: 12,
          citation: {
            id: '35077764',
            citationType: 'journal article',
            authors: ['Kamitori K.', 'Shirota M.', 'Fujiwara Y.'],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '35077764',
              },
              {
                database: 'DOI',
                id: '10.1016/j.jmb.2022.167464',
              },
            ],
            title:
              'Structural basis of the selective sugar transport in sodium-glucose cotransporters.',
            publicationDate: '2022',
            journal: 'J. Mol. Biol.',
            firstPage: '167464',
            lastPage: '167464',
            volume: '434',
          },
          referencePositions: [
            'FUNCTION',
            'TRANSPORTER ACTIVITY',
            'BIOPHYSICOCHEMICAL PROPERTIES',
            'MUTAGENESIS OF HIS-83; THR-287; TYR-290 AND LYS-321',
          ],
        },
        {
          referenceNumber: 13,
          citation: {
            id: '34880492',
            citationType: 'journal article',
            authors: [
              'Han L.',
              'Qu Q.',
              'Aydin D.',
              'Panova O.',
              'Robertson M.J.',
              'Xu Y.',
              'Dror R.O.',
              'Skiniotis G.',
              'Feng L.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '34880492',
              },
              {
                database: 'DOI',
                id: '10.1038/s41586-021-04211-w',
              },
            ],
            title:
              'Structure and mechanism of the SGLT family of glucose transporters.',
            publicationDate: '2022',
            journal: 'Nature',
            firstPage: '274',
            lastPage: '279',
            volume: '601',
          },
          referencePositions: [
            'STRUCTURE BY ELECTRON MICROSCOPY (3.15 ANGSTROMS) IN COMPLEX WITH CHOLESTEROL',
            'DISULFIDE BOND',
            'FUNCTION',
            'TRANSPORTER ACTIVITY',
            'ACTIVITY REGULATION',
            'DOMAIN',
            'MUTAGENESIS OF TRP-67; SER-77; HIS-83; ASP-204; THR-287; TRP-291; ASN-363; SER-396; GLN-451; LEU-452; ASP-454; GLN-457; THR-460; TRP-641; HIS-660 AND ALA-661',
          ],
        },
        {
          referenceNumber: 14,
          citation: {
            id: '2008213',
            citationType: 'journal article',
            authors: [
              'Turk E.',
              'Zabel B.',
              'Mundlos S.',
              'Dyer J.',
              'Wright E.M.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '2008213',
              },
              {
                database: 'DOI',
                id: '10.1038/350354a0',
              },
            ],
            title:
              'Glucose/galactose malabsorption caused by a defect in the Na+/glucose cotransporter.',
            publicationDate: '1991',
            journal: 'Nature',
            firstPage: '354',
            lastPage: '356',
            volume: '350',
          },
          referencePositions: ['VARIANT GGM ASN-28'],
        },
        {
          referenceNumber: 15,
          citation: {
            id: '8563765',
            citationType: 'journal article',
            authors: [
              'Martin M.G.',
              'Turk E.',
              'Lostao M.P.',
              'Kerner C.',
              'Wright E.M.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '8563765',
              },
              {
                database: 'DOI',
                id: '10.1038/ng0296-216',
              },
            ],
            title:
              'Defects in Na+/glucose cotransporter (SGLT1) trafficking and function cause glucose-galactose malabsorption.',
            publicationDate: '1996',
            journal: 'Nat. Genet.',
            firstPage: '216',
            lastPage: '220',
            volume: '12',
          },
          referencePositions: [
            'VARIANTS GGM ASN-28; GLY-28; SER-51; TRP-135; PRO-159; THR-166; 191-TYR--ALA-664 DEL; 254-LYS--ALA-664 DEL; LEU-276; TYR-292; ARG-295; SER-300; VAL-304; SER-369; 379-ARG--ALA-664 DEL; GLN-379; VAL-388; SER-405; THR-411; ARG-426; ASN-470; HIS-499 AND GLN-615',
            'FUNCTION',
            'TRANSPORTER ACTIVITY',
          ],
        },
        {
          referenceNumber: 16,
          citation: {
            id: '10036327',
            citationType: 'journal article',
            authors: [
              'Lam J.T.',
              'Martin M.G.',
              'Turk E.',
              'Hirayama B.A.',
              'Bosshard N.U.',
              'Steinmann B.',
              'Wright E.M.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '10036327',
              },
              {
                database: 'DOI',
                id: '10.1016/s0925-4439(98)00109-4',
              },
            ],
            title:
              'Missense mutations in SGLT1 cause glucose-galactose malabsorption by trafficking defects.',
            publicationDate: '1999',
            journal: 'Biochim. Biophys. Acta',
            firstPage: '297',
            lastPage: '303',
            volume: '1453',
          },
          referencePositions: ['VARIANTS GGM ARG-318 AND VAL-468'],
        },
        {
          referenceNumber: 17,
          citation: {
            id: '11406349',
            citationType: 'journal article',
            authors: [
              'Kasahara M.',
              'Maeda M.',
              'Hayashi S.',
              'Mori Y.',
              'Abe T.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '11406349',
              },
              {
                database: 'DOI',
                id: '10.1016/s0925-4439(01)00043-6',
              },
            ],
            title:
              'A missense mutation in the Na(+)/glucose cotransporter gene SGLT1 in a patient with congenital glucose-galactose malabsorption: normal trafficking but inactivation of the mutant protein.',
            publicationDate: '2001',
            journal: 'Biochim. Biophys. Acta',
            firstPage: '141',
            lastPage: '147',
            volume: '1536',
          },
          referencePositions: ['VARIANT GGM TRP-135'],
        },
      ],
      uniProtKBCrossReferences: [
        {
          database: 'EMBL',
          id: 'M24847',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAA60320.1',
            },
            {
              key: 'Status',
              value: '-',
            },
            {
              key: 'MoleculeType',
              value: 'mRNA',
            },
          ],
        },
        {
          database: 'EMBL',
          id: 'L29339',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAB59448.1',
            },
            {
              key: 'Status',
              value: '-',
            },
            {
              key: 'MoleculeType',
              value: 'Genomic_DNA',
            },
          ],
        },
        {
          database: 'EMBL',
          id: 'L29328',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAB59448.1',
            },
            {
              key: 'Status',
              value: 'JOINED',
            },
            {
              key: 'MoleculeType',
              value: 'Genomic_DNA',
            },
          ],
        },
        {
          database: 'EMBL',
          id: 'L29330',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAB59448.1',
            },
            {
              key: 'Status',
              value: 'JOINED',
            },
            {
              key: 'MoleculeType',
              value: 'Genomic_DNA',
            },
          ],
        },
        {
          database: 'EMBL',
          id: 'L29329',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAB59448.1',
            },
            {
              key: 'Status',
              value: 'JOINED',
            },
            {
              key: 'MoleculeType',
              value: 'Genomic_DNA',
            },
          ],
        },
        {
          database: 'EMBL',
          id: 'L29331',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAB59448.1',
            },
            {
              key: 'Status',
              value: 'JOINED',
            },
            {
              key: 'MoleculeType',
              value: 'Genomic_DNA',
            },
          ],
        },
        {
          database: 'EMBL',
          id: 'L29332',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAB59448.1',
            },
            {
              key: 'Status',
              value: 'JOINED',
            },
            {
              key: 'MoleculeType',
              value: 'Genomic_DNA',
            },
          ],
        },
        {
          database: 'EMBL',
          id: 'L29333',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAB59448.1',
            },
            {
              key: 'Status',
              value: 'JOINED',
            },
            {
              key: 'MoleculeType',
              value: 'Genomic_DNA',
            },
          ],
        },
        {
          database: 'EMBL',
          id: 'L29334',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAB59448.1',
            },
            {
              key: 'Status',
              value: 'JOINED',
            },
            {
              key: 'MoleculeType',
              value: 'Genomic_DNA',
            },
          ],
        },
        {
          database: 'EMBL',
          id: 'L29335',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAB59448.1',
            },
            {
              key: 'Status',
              value: 'JOINED',
            },
            {
              key: 'MoleculeType',
              value: 'Genomic_DNA',
            },
          ],
        },
        {
          database: 'EMBL',
          id: 'L29336',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAB59448.1',
            },
            {
              key: 'Status',
              value: 'JOINED',
            },
            {
              key: 'MoleculeType',
              value: 'Genomic_DNA',
            },
          ],
        },
        {
          database: 'EMBL',
          id: 'L29337',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAB59448.1',
            },
            {
              key: 'Status',
              value: 'JOINED',
            },
            {
              key: 'MoleculeType',
              value: 'Genomic_DNA',
            },
          ],
        },
        {
          database: 'EMBL',
          id: 'L29338',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAB59448.1',
            },
            {
              key: 'Status',
              value: 'JOINED',
            },
            {
              key: 'MoleculeType',
              value: 'Genomic_DNA',
            },
          ],
        },
        {
          database: 'EMBL',
          id: 'CR456579',
          properties: [
            {
              key: 'ProteinId',
              value: 'CAG30465.1',
            },
            {
              key: 'Status',
              value: '-',
            },
            {
              key: 'MoleculeType',
              value: 'mRNA',
            },
          ],
        },
        {
          database: 'EMBL',
          id: 'AK297665',
          properties: [
            {
              key: 'ProteinId',
              value: 'BAH12645.1',
            },
            {
              key: 'Status',
              value: '-',
            },
            {
              key: 'MoleculeType',
              value: 'mRNA',
            },
          ],
        },
        {
          database: 'EMBL',
          id: 'AK312948',
          properties: [
            {
              key: 'ProteinId',
              value: 'BAG35789.1',
            },
            {
              key: 'Status',
              value: '-',
            },
            {
              key: 'MoleculeType',
              value: 'mRNA',
            },
          ],
        },
        {
          database: 'EMBL',
          id: 'AK316184',
          properties: [
            {
              key: 'ProteinId',
              value: 'BAH14555.1',
            },
            {
              key: 'Status',
              value: '-',
            },
            {
              key: 'MoleculeType',
              value: 'mRNA',
            },
          ],
        },
        {
          database: 'EMBL',
          id: 'AL022321',
          properties: [
            {
              key: 'ProteinId',
              value: '-',
            },
            {
              key: 'Status',
              value: 'NOT_ANNOTATED_CDS',
            },
            {
              key: 'MoleculeType',
              value: 'Genomic_DNA',
            },
          ],
        },
        {
          database: 'EMBL',
          id: 'Z74021',
          properties: [
            {
              key: 'ProteinId',
              value: '-',
            },
            {
              key: 'Status',
              value: 'NOT_ANNOTATED_CDS',
            },
            {
              key: 'MoleculeType',
              value: 'Genomic_DNA',
            },
          ],
        },
        {
          database: 'EMBL',
          id: 'Z80998',
          properties: [
            {
              key: 'ProteinId',
              value: '-',
            },
            {
              key: 'Status',
              value: 'NOT_ANNOTATED_CDS',
            },
            {
              key: 'MoleculeType',
              value: 'Genomic_DNA',
            },
          ],
        },
        {
          database: 'EMBL',
          id: 'Z83839',
          properties: [
            {
              key: 'ProteinId',
              value: '-',
            },
            {
              key: 'Status',
              value: 'NOT_ANNOTATED_CDS',
            },
            {
              key: 'MoleculeType',
              value: 'Genomic_DNA',
            },
          ],
        },
        {
          database: 'EMBL',
          id: 'Z83849',
          properties: [
            {
              key: 'ProteinId',
              value: '-',
            },
            {
              key: 'Status',
              value: 'NOT_ANNOTATED_CDS',
            },
            {
              key: 'MoleculeType',
              value: 'Genomic_DNA',
            },
          ],
        },
        {
          database: 'EMBL',
          id: 'CH471095',
          properties: [
            {
              key: 'ProteinId',
              value: 'EAW60006.1',
            },
            {
              key: 'Status',
              value: '-',
            },
            {
              key: 'MoleculeType',
              value: 'Genomic_DNA',
            },
          ],
        },
        {
          database: 'CCDS',
          id: 'CCDS13902.1',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
          isoformId: 'P13866-1',
        },
        {
          database: 'CCDS',
          id: 'CCDS58805.1',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
          isoformId: 'P13866-2',
        },
        {
          database: 'PIR',
          id: 'A33545',
          properties: [
            {
              key: 'EntryName',
              value: 'A33545',
            },
          ],
        },
        {
          database: 'RefSeq',
          id: 'NP_000334.1',
          properties: [
            {
              key: 'NucleotideSequenceId',
              value: 'NM_000343.3',
            },
          ],
          isoformId: 'P13866-1',
        },
        {
          database: 'RefSeq',
          id: 'NP_001243243.1',
          properties: [
            {
              key: 'NucleotideSequenceId',
              value: 'NM_001256314.1',
            },
          ],
          isoformId: 'P13866-2',
        },
        {
          database: 'PDB',
          id: '7SL8',
          properties: [
            {
              key: 'Method',
              value: 'EM',
            },
            {
              key: 'Resolution',
              value: '3.40 A',
            },
            {
              key: 'Chains',
              value: 'A=1-664',
            },
          ],
        },
        {
          database: 'PDB',
          id: '7SLA',
          properties: [
            {
              key: 'Method',
              value: 'EM',
            },
            {
              key: 'Resolution',
              value: '3.15 A',
            },
            {
              key: 'Chains',
              value: 'A=1-664',
            },
          ],
        },
        {
          database: 'PDB',
          id: '7WMV',
          properties: [
            {
              key: 'Method',
              value: 'EM',
            },
            {
              key: 'Resolution',
              value: '3.20 A',
            },
            {
              key: 'Chains',
              value: 'A=1-664',
            },
          ],
        },
        {
          database: 'PDB',
          id: '7YNI',
          properties: [
            {
              key: 'Method',
              value: 'EM',
            },
            {
              key: 'Resolution',
              value: '3.50 A',
            },
            {
              key: 'Chains',
              value: 'A=1-664',
            },
          ],
        },
        {
          database: 'PDBsum',
          id: '7SL8',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'PDBsum',
          id: '7SLA',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'PDBsum',
          id: '7WMV',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'PDBsum',
          id: '7YNI',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'AlphaFoldDB',
          id: 'P13866',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'EMDB',
          id: 'EMD-25194',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'EMDB',
          id: 'EMD-25196',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'EMDB',
          id: 'EMD-32617',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'EMDB',
          id: 'EMD-33962',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'SMR',
          id: 'P13866',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'BioGRID',
          id: '112414',
          properties: [
            {
              key: 'Interactions',
              value: '29',
            },
          ],
        },
        {
          database: 'IntAct',
          id: 'P13866',
          properties: [
            {
              key: 'Interactions',
              value: '2',
            },
          ],
        },
        {
          database: 'STRING',
          id: '9606.ENSP00000266088',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'BindingDB',
          id: 'P13866',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'ChEMBL',
          id: 'CHEMBL4979',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'DrugBank',
          id: 'DB00766',
          properties: [
            {
              key: 'GenericName',
              value: 'Clavulanic acid',
            },
          ],
        },
        {
          database: 'DrugBank',
          id: 'DB01914',
          properties: [
            {
              key: 'GenericName',
              value: 'D-glucose',
            },
          ],
        },
        {
          database: 'DrugBank',
          id: 'DB09341',
          properties: [
            {
              key: 'GenericName',
              value: 'Dextrose, unspecified form',
            },
          ],
        },
        {
          database: 'DrugBank',
          id: 'DB05018',
          properties: [
            {
              key: 'GenericName',
              value: 'Migalastat',
            },
          ],
        },
        {
          database: 'DrugBank',
          id: 'DB12713',
          properties: [
            {
              key: 'GenericName',
              value: 'Sotagliflozin',
            },
          ],
        },
        {
          database: 'DrugCentral',
          id: 'P13866',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'GuidetoPHARMACOLOGY',
          id: '915',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'TCDB',
          id: '2.A.21.3.1',
          properties: [
            {
              key: 'FamilyName',
              value: 'the solute:sodium symporter (sss) family',
            },
          ],
        },
        {
          database: 'GlyCosmos',
          id: 'P13866',
          properties: [
            {
              key: 'glycosylation',
              value: '3 sites, 4 glycans',
            },
          ],
        },
        {
          database: 'GlyGen',
          id: 'P13866',
          properties: [
            {
              key: 'glycosylation',
              value: '5 sites, 6 O-linked glycans (4 sites)',
            },
          ],
        },
        {
          database: 'iPTMnet',
          id: 'P13866',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'PhosphoSitePlus',
          id: 'P13866',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'BioMuta',
          id: 'SLC5A1',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'DMDM',
          id: '127803',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'jPOST',
          id: 'P13866',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'MassIVE',
          id: 'P13866',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'PaxDb',
          id: '9606-ENSP00000266088',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'PeptideAtlas',
          id: 'P13866',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'ProteomicsDB',
          id: '52997',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
          isoformId: 'P13866-1',
        },
        {
          database: 'ProteomicsDB',
          id: '6623',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'Antibodypedia',
          id: '25191',
          properties: [
            {
              key: 'antibodies',
              value: '397 antibodies from 35 providers',
            },
          ],
        },
        {
          database: 'DNASU',
          id: '6523',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'Ensembl',
          id: 'ENST00000266088.9',
          properties: [
            {
              key: 'ProteinId',
              value: 'ENSP00000266088.4',
            },
            {
              key: 'GeneId',
              value: 'ENSG00000100170.10',
            },
          ],
          isoformId: 'P13866-1',
        },
        {
          database: 'Ensembl',
          id: 'ENST00000543737.2',
          properties: [
            {
              key: 'ProteinId',
              value: 'ENSP00000444898.1',
            },
            {
              key: 'GeneId',
              value: 'ENSG00000100170.10',
            },
          ],
          isoformId: 'P13866-2',
        },
        {
          database: 'GeneID',
          id: '6523',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'KEGG',
          id: 'hsa:6523',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'MANE-Select',
          id: 'ENST00000266088.9',
          properties: [
            {
              key: 'ProteinId',
              value: 'ENSP00000266088.4',
            },
            {
              key: 'RefSeqNucleotideId',
              value: 'NM_000343.4',
            },
            {
              key: 'RefSeqProteinId',
              value: 'NP_000334.1',
            },
          ],
        },
        {
          database: 'UCSC',
          id: 'uc003amc.4',
          properties: [
            {
              key: 'OrganismName',
              value: 'human',
            },
          ],
          isoformId: 'P13866-1',
        },
        {
          database: 'AGR',
          id: 'HGNC:11036',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'CTD',
          id: '6523',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'DisGeNET',
          id: '6523',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'GeneCards',
          id: 'SLC5A1',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'HGNC',
          id: 'HGNC:11036',
          properties: [
            {
              key: 'GeneName',
              value: 'SLC5A1',
            },
          ],
        },
        {
          database: 'HPA',
          id: 'ENSG00000100170',
          properties: [
            {
              key: 'ExpressionPatterns',
              value: 'Tissue enriched (intestine)',
            },
          ],
        },
        {
          database: 'MalaCards',
          id: 'SLC5A1',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'MIM',
          id: '182380',
          properties: [
            {
              key: 'Type',
              value: 'gene',
            },
          ],
        },
        {
          database: 'MIM',
          id: '606824',
          properties: [
            {
              key: 'Type',
              value: 'phenotype',
            },
          ],
        },
        {
          database: 'neXtProt',
          id: 'NX_P13866',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'OpenTargets',
          id: 'ENSG00000100170',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'Orphanet',
          id: '35710',
          properties: [
            {
              key: 'Disease',
              value: 'Glucose-galactose malabsorption',
            },
          ],
        },
        {
          database: 'PharmGKB',
          id: 'PA308',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'VEuPathDB',
          id: 'HostDB:ENSG00000100170',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'eggNOG',
          id: 'KOG2349',
          properties: [
            {
              key: 'ToxonomicScope',
              value: 'Eukaryota',
            },
          ],
        },
        {
          database: 'GeneTree',
          id: 'ENSGT00940000155844',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'HOGENOM',
          id: 'CLU_018808_9_2_1',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'InParanoid',
          id: 'P13866',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'OMA',
          id: 'PQMIHKF',
          properties: [
            {
              key: 'Fingerprint',
              value: '-',
            },
          ],
        },
        {
          database: 'OrthoDB',
          id: '74094at2759',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'PhylomeDB',
          id: 'P13866',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'TreeFam',
          id: 'TF352855',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'PathwayCommons',
          id: 'P13866',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'Reactome',
          id: 'R-HSA-189200',
          properties: [
            {
              key: 'PathwayName',
              value: 'Cellular hexose transport',
            },
          ],
        },
        {
          database: 'Reactome',
          id: 'R-HSA-5656364',
          properties: [
            {
              key: 'PathwayName',
              value:
                'Defective SLC5A1 causes congenital glucose/galactose malabsorption (GGM)',
            },
          ],
        },
        {
          database: 'Reactome',
          id: 'R-HSA-8981373',
          properties: [
            {
              key: 'PathwayName',
              value: 'Intestinal hexose absorption',
            },
          ],
        },
        {
          database: 'SignaLink',
          id: 'P13866',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'SIGNOR',
          id: 'P13866',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'BioGRID-ORCS',
          id: '6523',
          properties: [
            {
              key: 'hits',
              value: '14 hits in 1151 CRISPR screens',
            },
          ],
        },
        {
          database: 'ChiTaRS',
          id: 'SLC5A1',
          properties: [
            {
              key: 'OrganismName',
              value: 'human',
            },
          ],
        },
        {
          database: 'GeneWiki',
          id: 'SLC5A1',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'GenomeRNAi',
          id: '6523',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'Pharos',
          id: 'P13866',
          properties: [
            {
              key: 'DevelopmentLevel',
              value: 'Tclin',
            },
          ],
        },
        {
          database: 'PRO',
          id: 'PR:P13866',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'Proteomes',
          id: 'UP000005640',
          properties: [
            {
              key: 'Component',
              value: 'Chromosome 22',
            },
          ],
        },
        {
          database: 'RNAct',
          id: 'P13866',
          properties: [
            {
              key: 'moleculeType',
              value: 'Protein',
            },
          ],
        },
        {
          database: 'Bgee',
          id: 'ENSG00000100170',
          properties: [
            {
              key: 'ExpressionPatterns',
              value:
                'Expressed in jejunal mucosa and 116 other cell types or tissues',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0016324',
          properties: [
            {
              key: 'GoTerm',
              value: 'C:apical plasma membrane',
            },
            {
              key: 'GoEvidenceType',
              value: 'IDA:ARUK-UCL',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000314',
              source: 'PubMed',
              id: '12773314',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0031526',
          properties: [
            {
              key: 'GoTerm',
              value: 'C:brush border membrane',
            },
            {
              key: 'GoEvidenceType',
              value: 'ISS:ARUK-UCL',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0005769',
          properties: [
            {
              key: 'GoTerm',
              value: 'C:early endosome',
            },
            {
              key: 'GoEvidenceType',
              value: 'IDA:ARUK-UCL',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000314',
              source: 'PubMed',
              id: '12773314',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0070062',
          properties: [
            {
              key: 'GoTerm',
              value: 'C:extracellular exosome',
            },
            {
              key: 'GoEvidenceType',
              value: 'HDA:UniProtKB',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0007005',
              source: 'PubMed',
              id: '19056867',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0043229',
          properties: [
            {
              key: 'GoTerm',
              value: 'C:intracellular organelle',
            },
            {
              key: 'GoEvidenceType',
              value: 'ISS:ARUK-UCL',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0097708',
          properties: [
            {
              key: 'GoTerm',
              value: 'C:intracellular vesicle',
            },
            {
              key: 'GoEvidenceType',
              value: 'TAS:ARUK-UCL',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000304',
              source: 'PubMed',
              id: '14986005',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0048471',
          properties: [
            {
              key: 'GoTerm',
              value: 'C:perinuclear region of cytoplasm',
            },
            {
              key: 'GoEvidenceType',
              value: 'IDA:ARUK-UCL',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000314',
              source: 'PubMed',
              id: '12773314',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0005886',
          properties: [
            {
              key: 'GoTerm',
              value: 'C:plasma membrane',
            },
            {
              key: 'GoEvidenceType',
              value: 'IDA:ARUK-UCL',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000314',
              source: 'PubMed',
              id: '26945065',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0015151',
          properties: [
            {
              key: 'GoTerm',
              value: 'F:alpha-glucoside transmembrane transporter activity',
            },
            {
              key: 'GoEvidenceType',
              value: 'IDA:ARUK-UCL',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000314',
              source: 'PubMed',
              id: '20980548',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0055056',
          properties: [
            {
              key: 'GoTerm',
              value: 'F:D-glucose transmembrane transporter activity',
            },
            {
              key: 'GoEvidenceType',
              value: 'IDA:ARUK-UCL',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000314',
              source: 'PubMed',
              id: '20980548',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0015150',
          properties: [
            {
              key: 'GoTerm',
              value: 'F:fucose transmembrane transporter activity',
            },
            {
              key: 'GoEvidenceType',
              value: 'ISS:ARUK-UCL',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0005354',
          properties: [
            {
              key: 'GoTerm',
              value: 'F:galactose transmembrane transporter activity',
            },
            {
              key: 'GoEvidenceType',
              value: 'ISS:ARUK-UCL',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0015371',
          properties: [
            {
              key: 'GoTerm',
              value: 'F:galactose:sodium symporter activity',
            },
            {
              key: 'GoEvidenceType',
              value: 'IDA:UniProtKB',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000314',
              source: 'PubMed',
              id: '34880492',
            },
            {
              evidenceCode: 'ECO:0000314',
              source: 'PubMed',
              id: '35077764',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0005355',
          properties: [
            {
              key: 'GoTerm',
              value: 'F:glucose transmembrane transporter activity',
            },
            {
              key: 'GoEvidenceType',
              value: 'IDA:ARUK-UCL',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000314',
              source: 'PubMed',
              id: '26945065',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0005412',
          properties: [
            {
              key: 'GoTerm',
              value: 'F:glucose:sodium symporter activity',
            },
            {
              key: 'GoEvidenceType',
              value: 'IDA:UniProtKB',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000314',
              source: 'PubMed',
              id: '34880492',
            },
            {
              evidenceCode: 'ECO:0000314',
              source: 'PubMed',
              id: '35077764',
            },
            {
              evidenceCode: 'ECO:0000314',
              source: 'PubMed',
              id: '8836035',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0005367',
          properties: [
            {
              key: 'GoTerm',
              value: 'F:myo-inositol:sodium symporter activity',
            },
            {
              key: 'GoEvidenceType',
              value: 'ISS:ARUK-UCL',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0015146',
          properties: [
            {
              key: 'GoTerm',
              value: 'F:pentose transmembrane transporter activity',
            },
            {
              key: 'GoEvidenceType',
              value: 'ISS:ARUK-UCL',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0005372',
          properties: [
            {
              key: 'GoTerm',
              value: 'F:water transmembrane transporter activity',
            },
            {
              key: 'GoEvidenceType',
              value: 'IDA:UniProtKB',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000314',
              source: 'PubMed',
              id: '14695256',
            },
            {
              evidenceCode: 'ECO:0000314',
              source: 'PubMed',
              id: '34880492',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0000017',
          properties: [
            {
              key: 'GoTerm',
              value: 'P:alpha-glucoside transport',
            },
            {
              key: 'GoEvidenceType',
              value: 'IDA:ARUK-UCL',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000314',
              source: 'PubMed',
              id: '20980548',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0015756',
          properties: [
            {
              key: 'GoTerm',
              value: 'P:fucose transmembrane transport',
            },
            {
              key: 'GoEvidenceType',
              value: 'ISS:ARUK-UCL',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0015757',
          properties: [
            {
              key: 'GoTerm',
              value: 'P:galactose transmembrane transport',
            },
            {
              key: 'GoEvidenceType',
              value: 'ISS:ARUK-UCL',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0098708',
          properties: [
            {
              key: 'GoTerm',
              value: 'P:glucose import across plasma membrane',
            },
            {
              key: 'GoEvidenceType',
              value: 'IDA:ARUK-UCL',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000314',
              source: 'PubMed',
              id: '20980548',
            },
            {
              evidenceCode: 'ECO:0000314',
              source: 'PubMed',
              id: '26945065',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:1904659',
          properties: [
            {
              key: 'GoTerm',
              value: 'P:glucose transmembrane transport',
            },
            {
              key: 'GoEvidenceType',
              value: 'IDA:UniProtKB',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000314',
              source: 'PubMed',
              id: '8836035',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0001951',
          properties: [
            {
              key: 'GoTerm',
              value: 'P:intestinal D-glucose absorption',
            },
            {
              key: 'GoEvidenceType',
              value: 'ISS:UniProtKB',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0106001',
          properties: [
            {
              key: 'GoTerm',
              value: 'P:intestinal hexose absorption',
            },
            {
              key: 'GoEvidenceType',
              value: 'TAS:Reactome',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0015798',
          properties: [
            {
              key: 'GoTerm',
              value: 'P:myo-inositol transport',
            },
            {
              key: 'GoEvidenceType',
              value: 'ISS:ARUK-UCL',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0015750',
          properties: [
            {
              key: 'GoTerm',
              value: 'P:pentose transmembrane transport',
            },
            {
              key: 'GoEvidenceType',
              value: 'ISS:ARUK-UCL',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0035623',
          properties: [
            {
              key: 'GoTerm',
              value: 'P:renal glucose absorption',
            },
            {
              key: 'GoEvidenceType',
              value: 'ISS:UniProtKB',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0010035',
          properties: [
            {
              key: 'GoTerm',
              value: 'P:response to inorganic substance',
            },
            {
              key: 'GoEvidenceType',
              value: 'IDA:ARUK-UCL',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000314',
              source: 'PubMed',
              id: '10973981',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0098719',
          properties: [
            {
              key: 'GoTerm',
              value: 'P:sodium ion import across plasma membrane',
            },
            {
              key: 'GoEvidenceType',
              value: 'IDA:ARUK-UCL',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000314',
              source: 'PubMed',
              id: '20980548',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0006814',
          properties: [
            {
              key: 'GoTerm',
              value: 'P:sodium ion transport',
            },
            {
              key: 'GoEvidenceType',
              value: 'IBA:GO_Central',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0035377',
          properties: [
            {
              key: 'GoTerm',
              value: 'P:transepithelial water transport',
            },
            {
              key: 'GoEvidenceType',
              value: 'IDA:ARUK-UCL',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000314',
              source: 'PubMed',
              id: '26945065',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0150104',
          properties: [
            {
              key: 'GoTerm',
              value: 'P:transport across blood-brain barrier',
            },
            {
              key: 'GoEvidenceType',
              value: 'IGI:ARUK-UCL',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000316',
              source: 'PubMed',
              id: '23975336',
            },
          ],
        },
        {
          database: 'CDD',
          id: 'cd11486',
          properties: [
            {
              key: 'EntryName',
              value: 'SLC5sbd_SGLT1',
            },
            {
              key: 'MatchStatus',
              value: '1',
            },
          ],
        },
        {
          database: 'Gene3D',
          id: '1.20.1730.10',
          properties: [
            {
              key: 'EntryName',
              value: 'Sodium/glucose cotransporter',
            },
            {
              key: 'MatchStatus',
              value: '1',
            },
          ],
        },
        {
          database: 'InterPro',
          id: 'IPR038377',
          properties: [
            {
              key: 'EntryName',
              value: 'Na/Glc_symporter_sf',
            },
          ],
        },
        {
          database: 'InterPro',
          id: 'IPR001734',
          properties: [
            {
              key: 'EntryName',
              value: 'Na/solute_symporter',
            },
          ],
        },
        {
          database: 'InterPro',
          id: 'IPR018212',
          properties: [
            {
              key: 'EntryName',
              value: 'Na/solute_symporter_CS',
            },
          ],
        },
        {
          database: 'NCBIfam',
          id: 'TIGR00813',
          properties: [
            {
              key: 'EntryName',
              value: 'sss',
            },
            {
              key: 'MatchStatus',
              value: '1',
            },
          ],
        },
        {
          database: 'PANTHER',
          id: 'PTHR11819:SF151',
          properties: [
            {
              key: 'EntryName',
              value: 'SODIUM_GLUCOSE COTRANSPORTER 1',
            },
            {
              key: 'MatchStatus',
              value: '1',
            },
          ],
        },
        {
          database: 'PANTHER',
          id: 'PTHR11819',
          properties: [
            {
              key: 'EntryName',
              value: 'SOLUTE CARRIER FAMILY 5',
            },
            {
              key: 'MatchStatus',
              value: '1',
            },
          ],
        },
        {
          database: 'Pfam',
          id: 'PF00474',
          properties: [
            {
              key: 'EntryName',
              value: 'SSF',
            },
            {
              key: 'MatchStatus',
              value: '1',
            },
          ],
        },
        {
          database: 'PROSITE',
          id: 'PS00456',
          properties: [
            {
              key: 'EntryName',
              value: 'NA_SOLUT_SYMP_1',
            },
            {
              key: 'MatchStatus',
              value: '1',
            },
          ],
        },
        {
          database: 'PROSITE',
          id: 'PS00457',
          properties: [
            {
              key: 'EntryName',
              value: 'NA_SOLUT_SYMP_2',
            },
            {
              key: 'MatchStatus',
              value: '1',
            },
          ],
        },
        {
          database: 'PROSITE',
          id: 'PS50283',
          properties: [
            {
              key: 'EntryName',
              value: 'NA_SOLUT_SYMP_3',
            },
            {
              key: 'MatchStatus',
              value: '1',
            },
          ],
        },
      ],
      sequence: {
        value:
          'MDSSTWSPKTTAVTRPVETHELIRNAADISIIVIYFVVVMAVGLWAMFSTNRGTVGGFFLAGRSMVWWPIGASLFASNIGSGHFVGLAGTGAASGIAIGGFEWNALVLVVVLGWLFVPIYIKAGVVTMPEYLRKRFGGQRIQVYLSLLSLLLYIFTKISADIFSGAIFINLALGLNLYLAIFLLLAITALYTITGGLAAVIYTDTLQTVIMLVGSLILTGFAFHEVGGYDAFMEKYMKAIPTIVSDGNTTFQEKCYTPRADSFHIFRDPLTGDLPWPGFIFGMSILTLWYWCTDQVIVQRCLSAKNMSHVKGGCILCGYLKLMPMFIMVMPGMISRILYTEKIACVVPSECEKYCGTKVGCTNIAYPTLVVELMPNGLRGLMLSVMLASLMSSLTSIFNSASTLFTMDIYAKVRKRASEKELMIAGRLFILVLIGISIAWVPIVQSAQSGQLFDYIQSITSYLGPPIAAVFLLAIFWKRVNEPGAFWGLILGLLIGISRMITEFAYGTGSCMEPSNCPTIICGVHYLYFAIILFAISFITIVVISLLTKPIPDVHLYRLCWSLRNSKEERIDLDAEEENIQEGPKETIEIETQVPEKKKGIFRRAYDLFCGLEQHGAPKMTEEEEKAMKMKMTDTSEKPLWRTVLNVNGIILVTVAVFCHAYFA',
        length: 664,
        molWeight: 73498,
        crc64: '2B403376595EAB74',
        md5: '256EEDE687C32127248F2B0965A9BEA3',
      },
      extraAttributes: {
        countByCommentType: {
          FUNCTION: 1,
          'CATALYTIC ACTIVITY': 2,
          'ACTIVITY REGULATION': 1,
          'BIOPHYSICOCHEMICAL PROPERTIES': 1,
          INTERACTION: 1,
          'SUBCELLULAR LOCATION': 1,
          'ALTERNATIVE PRODUCTS': 2,
          'TISSUE SPECIFICITY': 1,
          INDUCTION: 1,
          DOMAIN: 1,
          PTM: 1,
          DISEASE: 1,
          SIMILARITY: 1,
        },
        countByFeatureType: {
          Chain: 1,
          'Topological domain': 14,
          Transmembrane: 13,
          Intramembrane: 1,
          'Binding site': 1,
          Site: 3,
          'Modified residue': 1,
          Glycosylation: 1,
          'Disulfide bond': 4,
          'Alternative sequence': 1,
          'Natural variant': 25,
          Mutagenesis: 23,
          'Sequence conflict': 1,
          Helix: 34,
          Turn: 11,
          'Beta strand': 7,
        },
        uniParcId: 'UPI00001359EA',
      },
    },
  ],
};
export default mock;
