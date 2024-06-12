import { SearchResults } from '../../../shared/types/results';
import { UniProtkbAPIModel } from '../../adapters/uniProtkbConverter';

// Source: uniprotkb/search?facets=reviewed%2Cmodel_organism%2Cproteins_with%2Cexistence%2Cannotation_score%2Clength&query=glucose&size=2
// Retrieved: 2024-06-10
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
          count: 14436,
        },
        {
          label: 'Unreviewed (TrEMBL)',
          value: 'false',
          count: 2973621,
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
          count: 1996,
        },
        {
          label: 'Human',
          value: '9606',
          count: 1888,
        },
        {
          label: 'A. thaliana',
          value: '3702',
          count: 1705,
        },
        {
          label: 'Mouse',
          value: '10090',
          count: 1548,
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
          count: 2470,
        },
        {
          label: 'Active site',
          value: '2',
          count: 572468,
        },
        {
          label: 'Activity regulation',
          value: '3',
          count: 38266,
        },
        {
          label: 'Allergen',
          value: '4',
          count: 24,
        },
        {
          label: 'Alternative products (isoforms)',
          value: '5',
          count: 1191,
        },
        {
          label: 'Alternative splicing',
          value: '6',
          count: 1117,
        },
        {
          label: 'Beta strand',
          value: '7',
          count: 1625,
        },
        {
          label: 'Binary interaction',
          value: '8',
          count: 1398,
        },
        {
          label: 'Binding site',
          value: '9',
          count: 586406,
        },
        {
          label: 'Biophysicochemical properties',
          value: '10',
          count: 1363,
        },
        {
          label: 'Biotechnological use',
          value: '11',
          count: 128,
        },
        {
          label: 'Catalytic activity',
          value: '13',
          count: 1189842,
        },
        {
          label: 'Chain',
          value: '14',
          count: 237413,
        },
        {
          label: 'Cofactors',
          value: '15',
          count: 714511,
        },
        {
          label: 'Coiled-coil',
          value: '16',
          count: 61889,
        },
        {
          label: 'Compositional bias',
          value: '17',
          count: 210815,
        },
        {
          label: 'Cross-link',
          value: '18',
          count: 538,
        },
        {
          label: 'Developmental stage',
          value: '19',
          count: 696,
        },
        {
          label: 'Disease',
          value: '20',
          count: 430,
        },
        {
          label: 'Disruption phenotype',
          value: '21',
          count: 1366,
        },
        {
          label: 'Disulfide bond',
          value: '22',
          count: 11207,
        },
        {
          label: 'DNA binding',
          value: '23',
          count: 1075,
        },
        {
          label: 'Domain',
          value: '24',
          count: 2204201,
        },
        {
          label: 'Function',
          value: '25',
          count: 658347,
        },
        {
          label: 'Glycosylation',
          value: '26',
          count: 2060,
        },
        {
          label: 'Helix',
          value: '27',
          count: 1712,
        },
        {
          label: 'Induction',
          value: '28',
          count: 2372,
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
          count: 312,
        },
        {
          label: 'Mass spectrometry',
          value: '32',
          count: 130,
        },
        {
          label: 'Modified residue',
          value: '34',
          count: 108737,
        },
        {
          label: 'Motif',
          value: '35',
          count: 15703,
        },
        {
          label: 'Mutagenesis',
          value: '36',
          count: 1433,
        },
        {
          label: 'Natural variant',
          value: '37',
          count: 891,
        },
        {
          label: 'Non-standard residue',
          value: '38',
          count: 31,
        },
        {
          label: 'Pathway',
          value: '40',
          count: 718409,
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
          count: 501,
        },
        {
          label: 'PTM comments',
          value: '45',
          count: 34526,
        },
        {
          label: 'Region',
          value: '46',
          count: 425462,
        },
        {
          label: 'Repeat',
          value: '47',
          count: 9041,
        },
        {
          label: 'RNA editing',
          value: '48',
          count: 2,
        },
        {
          label: 'Signal peptide',
          value: '49',
          count: 225206,
        },
        {
          label: 'Subcellular location',
          value: '50',
          count: 837565,
        },
        {
          label: 'Subunit structure',
          value: '51',
          count: 351827,
        },
        {
          label: 'Tissue specificity',
          value: '52',
          count: 2453,
        },
        {
          label: 'Topological domain',
          value: '53',
          count: 1255,
        },
        {
          label: 'Toxic dose',
          value: '54',
          count: 11,
        },
        {
          label: 'Transit peptide',
          value: '55',
          count: 374,
        },
        {
          label: 'Transmembrane',
          value: '56',
          count: 656003,
        },
        {
          label: 'Turn',
          value: '57',
          count: 1498,
        },
        {
          label: 'Zinc finger',
          value: '58',
          count: 356,
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
          count: 2138259,
        },
        {
          label: 'Predicted',
          value: '4',
          count: 820060,
        },
        {
          label: 'Transcript level',
          value: '2',
          count: 19813,
        },
        {
          label: 'Protein level',
          value: '1',
          count: 9905,
        },
        {
          label: 'Uncertain',
          value: '5',
          count: 20,
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
          count: 9160,
        },
        {
          value: '4',
          count: 59171,
        },
        {
          value: '3',
          count: 348814,
        },
        {
          value: '2',
          count: 1107815,
        },
        {
          value: '1',
          count: 1463097,
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
          count: 294290,
        },
        {
          label: '201 - 400',
          value: '[201 TO 400]',
          count: 1131920,
        },
        {
          label: '401 - 600',
          value: '[401 TO 600]',
          count: 1099866,
        },
        {
          label: '601 - 800',
          value: '[601 TO 800]',
          count: 276787,
        },
        {
          label: '>= 801',
          value: '[801 TO *]',
          count: 185194,
        },
      ],
    },
  ],
  results: [
    {
      entryType: 'UniProtKB reviewed (Swiss-Prot)',
      primaryAccession: 'P11413',
      secondaryAccessions: [
        'D3DWX9',
        'Q16000',
        'Q16765',
        'Q8IU70',
        'Q8IU88',
        'Q8IUA6',
        'Q96PQ2',
      ],
      uniProtkbId: 'G6PD_HUMAN',
      entryAudit: {
        firstPublicDate: '1989-10-01',
        lastAnnotationUpdateDate: '2024-05-29',
        lastSequenceUpdateDate: '2007-01-23',
        entryVersion: 271,
        sequenceVersion: 4,
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
            value: 'Glucose-6-phosphate 1-dehydrogenase',
          },
          shortNames: [
            {
              value: 'G6PD',
            },
          ],
          ecNumbers: [
            {
              evidences: [
                {
                  evidenceCode: 'ECO:0000269',
                  source: 'PubMed',
                  id: '15858258',
                },
                {
                  evidenceCode: 'ECO:0000269',
                  source: 'PubMed',
                  id: '24769394',
                },
                {
                  evidenceCode: 'ECO:0000269',
                  source: 'PubMed',
                  id: '743300',
                },
              ],
              value: '1.1.1.49',
            },
          ],
        },
      },
      genes: [
        {
          geneName: {
            value: 'G6PD',
          },
        },
      ],
      comments: [
        {
          texts: [
            {
              evidences: [
                {
                  evidenceCode: 'ECO:0000269',
                  source: 'PubMed',
                  id: '15858258',
                },
                {
                  evidenceCode: 'ECO:0000269',
                  source: 'PubMed',
                  id: '24769394',
                },
                {
                  evidenceCode: 'ECO:0000269',
                  source: 'PubMed',
                  id: '26479991',
                },
                {
                  evidenceCode: 'ECO:0000269',
                  source: 'PubMed',
                  id: '35122041',
                },
                {
                  evidenceCode: 'ECO:0000269',
                  source: 'PubMed',
                  id: '38066190',
                },
                {
                  evidenceCode: 'ECO:0000269',
                  source: 'PubMed',
                  id: '743300',
                },
              ],
              value:
                'Catalyzes the rate-limiting step of the oxidative pentose-phosphate pathway, which represents a route for the dissimilation of carbohydrates besides glycolysis. The main function of this enzyme is to provide reducing power (NADPH) and pentose phosphates for fatty acid and nucleic acid synthesis',
            },
          ],
          commentType: 'FUNCTION',
        },
        {
          commentType: 'CATALYTIC ACTIVITY',
          reaction: {
            name: 'D-glucose 6-phosphate + NADP(+) = 6-phospho-D-glucono-1,5-lactone + H(+) + NADPH',
            reactionCrossReferences: [
              {
                database: 'Rhea',
                id: 'RHEA:15841',
              },
              {
                database: 'ChEBI',
                id: 'CHEBI:15378',
              },
              {
                database: 'ChEBI',
                id: 'CHEBI:57783',
              },
              {
                database: 'ChEBI',
                id: 'CHEBI:57955',
              },
              {
                database: 'ChEBI',
                id: 'CHEBI:58349',
              },
              {
                database: 'ChEBI',
                id: 'CHEBI:61548',
              },
            ],
            ecNumber: '1.1.1.49',
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '15858258',
              },
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '24769394',
              },
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '26479991',
              },
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '35122041',
              },
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '38066190',
              },
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '743300',
              },
            ],
          },
          physiologicalReactions: [
            {
              directionType: 'left-to-right',
              reactionCrossReference: {
                database: 'Rhea',
                id: 'RHEA:15842',
              },
              evidences: [
                {
                  evidenceCode: 'ECO:0000269',
                  source: 'PubMed',
                  id: '26479991',
                },
              ],
            },
          ],
        },
        {
          commentType: 'BIOPHYSICOCHEMICAL PROPERTIES',
          kineticParameters: {
            michaelisConstants: [
              {
                constant: 7.07,
                unit: 'uM',
                substrate: 'NADP',
                evidences: [
                  {
                    evidenceCode: 'ECO:0000269',
                    source: 'PubMed',
                    id: '15858258',
                  },
                ],
              },
              {
                constant: 52,
                unit: 'uM',
                substrate: 'glucose 6-phosphate',
                evidences: [
                  {
                    evidenceCode: 'ECO:0000269',
                    source: 'PubMed',
                    id: '15858258',
                  },
                ],
              },
              {
                constant: 46.1,
                unit: 'uM',
                substrate: 'glucose 6-phosphate',
                evidences: [
                  {
                    evidenceCode: 'ECO:0000269',
                    source: 'PubMed',
                    id: '38066190',
                  },
                ],
              },
              {
                constant: 12.9,
                unit: 'uM',
                substrate: 'NADP',
                evidences: [
                  {
                    evidenceCode: 'ECO:0000269',
                    source: 'PubMed',
                    id: '38066190',
                  },
                ],
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
                  id: '15858258',
                },
                {
                  evidenceCode: 'ECO:0000269',
                  source: 'PubMed',
                  id: '24769394',
                },
                {
                  evidenceCode: 'ECO:0000269',
                  source: 'PubMed',
                  id: '26479991',
                },
                {
                  evidenceCode: 'ECO:0000269',
                  source: 'PubMed',
                  id: '743300',
                },
              ],
              value:
                'Carbohydrate degradation; pentose phosphate pathway; D-ribulose 5-phosphate from D-glucose 6-phosphate (oxidative stage): step 1/3',
            },
          ],
          commentType: 'PATHWAY',
        },
        {
          texts: [
            {
              evidences: [
                {
                  evidenceCode: 'ECO:0000269',
                  source: 'PubMed',
                  id: '10745013',
                },
                {
                  evidenceCode: 'ECO:0000269',
                  source: 'PubMed',
                  id: '15858258',
                },
                {
                  evidenceCode: 'ECO:0000269',
                  source: 'PubMed',
                  id: '24769394',
                },
                {
                  evidenceCode: 'ECO:0000269',
                  source: 'PubMed',
                  id: '35122041',
                },
                {
                  evidenceCode: 'ECO:0000269',
                  source: 'PubMed',
                  id: '38066190',
                },
              ],
              value:
                'Homotetramer; dimer of dimers (PubMed:10745013, PubMed:15858258, PubMed:24769394, PubMed:38066190). Interacts with SIRT2; the interaction is enhanced by H(2)O(2) treatment (PubMed:24769394). Forms a ternary complex with ALDOB and TP53; this interaction is direct. ALDOB stabilizes the complex inhibiting G6PD activity and keeping oxidative pentose phosphate metabolism in check',
            },
          ],
          commentType: 'SUBUNIT',
        },
        {
          commentType: 'INTERACTION',
          interactions: [
            {
              interactantOne: {
                uniProtKBAccession: 'P11413',
                intActId: 'EBI-4289891',
              },
              interactantTwo: {
                uniProtKBAccession: 'P11413',
                geneName: 'G6PD',
                intActId: 'EBI-4289891',
              },
              numberOfExperiments: 3,
              organismDiffer: false,
            },
            {
              interactantOne: {
                uniProtKBAccession: 'P11413',
                intActId: 'EBI-4289891',
              },
              interactantTwo: {
                uniProtKBAccession: 'P04792',
                geneName: 'HSPB1',
                intActId: 'EBI-352682',
              },
              numberOfExperiments: 2,
              organismDiffer: false,
            },
            {
              interactantOne: {
                uniProtKBAccession: 'P11413',
                intActId: 'EBI-4289891',
              },
              interactantTwo: {
                uniProtKBAccession: 'Q8IXJ6',
                geneName: 'SIRT2',
                intActId: 'EBI-477232',
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
                    id: '35122041',
                  },
                  {
                    evidenceCode: 'ECO:0000269',
                    source: 'PubMed',
                    id: '743300',
                  },
                ],
                value: 'Cytoplasm, cytosol',
                id: 'SL-0091',
              },
            },
            {
              location: {
                value: 'Membrane',
                id: 'SL-0162',
              },
              topology: {
                evidences: [
                  {
                    evidenceCode: 'ECO:0000269',
                    source: 'PubMed',
                    id: '743300',
                  },
                ],
                value: 'Peripheral membrane protein',
                id: 'SL-9903',
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
                value: 'Short',
              },
              isoformIds: ['P11413-1'],
              isoformSequenceStatus: 'Displayed',
            },
            {
              name: {
                value: 'Long',
              },
              isoformIds: ['P11413-2'],
              sequenceIds: ['VSP_001592'],
              isoformSequenceStatus: 'Described',
            },
            {
              name: {
                value: '3',
              },
              isoformIds: ['P11413-3'],
              sequenceIds: ['VSP_037802'],
              isoformSequenceStatus: 'Described',
            },
          ],
        },
        {
          texts: [
            {
              value:
                'Isoform Long is found in lymphoblasts, granulocytes and sperm',
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
                  id: '24769394',
                },
                {
                  evidenceCode: 'ECO:0000269',
                  source: 'PubMed',
                  id: '7857286',
                },
              ],
              value:
                'Acetylated by ELP3 at Lys-403; acetylation inhibits its homodimerization and enzyme activity. Deacetylated by SIRT2 at Lys-403; deacetylation stimulates its enzyme activity',
            },
          ],
          commentType: 'PTM',
        },
        {
          texts: [
            {
              value:
                'The sequence shown is that of variant B, the most common variant',
            },
          ],
          commentType: 'POLYMORPHISM',
        },
        {
          commentType: 'DISEASE',
          disease: {
            diseaseId:
              'Anemia, non-spherocytic hemolytic, due to G6PD deficiency',
            diseaseAccession: 'DI-01351',
            acronym: 'NSHA',
            description:
              'A disease characterized by G6PD deficiency, acute hemolytic anemia, fatigue, back pain, and jaundice. In most patients, the disease is triggered by an exogenous agent, such as some drugs, food, or infection. Increased unconjugated bilirubin, lactate dehydrogenase, and reticulocytosis are markers of the disorder. Although G6PD deficiency can be life-threatening, most patients are asymptomatic throughout their life.',
            diseaseCrossReference: {
              database: 'MIM',
              id: '300908',
            },
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '12524354',
              },
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '1303180',
              },
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '1303182',
              },
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '1536798',
              },
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '1611091',
              },
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '1889820',
              },
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '1945893',
              },
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '20007901',
              },
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '26479991',
              },
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '2836867',
              },
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '2912069',
              },
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '30988594',
              },
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '38066190',
              },
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '7858267',
              },
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '7959695',
              },
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '8193373',
              },
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '8490627',
              },
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '8533762',
              },
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '8733135',
              },
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '9452072',
              },
            ],
          },
          note: {
            texts: [
              {
                value:
                  'The disease is caused by variants affecting the gene represented in this entry. Deficiency of G6PD is associated with hemolytic anemia in two different situations. First, in areas in which malaria has been endemic, G6PD-deficiency alleles have reached high frequencies (1% to 50%) and deficient individuals, though essentially asymptomatic in the steady state, have a high risk of acute hemolytic attacks. Secondly, sporadic cases of G6PD deficiency occur at a very low frequencies, and they usually present a more severe phenotype. Several types of NSHA are recognized. Class-I variants are associated with severe NSHA; class-II have an activity <10% of normal; class-III have an activity of 10% to 60% of normal; class-IV have near normal activity',
              },
            ],
          },
        },
        {
          texts: [
            {
              value:
                'Binds two molecules of NADP. The first one is a cosubstrate (bound to the N-terminal domain), the second is bound to the C-terminal domain and functions as a structural element',
            },
          ],
          commentType: 'MISCELLANEOUS',
        },
        {
          texts: [
            {
              evidences: [
                {
                  evidenceCode: 'ECO:0000305',
                },
              ],
              value: 'Belongs to the glucose-6-phosphate dehydrogenase family',
            },
          ],
          commentType: 'SIMILARITY',
        },
        {
          commentType: 'SEQUENCE CAUTION',
          sequenceCautionType: 'Erroneous initiation',
          sequence: 'AAA63175.1',
          note: 'Truncated N-terminus.',
          evidences: [
            {
              evidenceCode: 'ECO:0000305',
            },
          ],
        },
        {
          commentType: 'WEB RESOURCE',
          resourceName: 'G6PDdb',
          resourceUrl: 'http://www.bioinf.org.uk/mutations/g6pd/',
          ftp: false,
          note: 'G6PD mutation database',
        },
      ],
      features: [
        {
          type: 'Initiator methionine',
          location: {
            start: {
              value: 1,
              modifier: 'EXACT',
            },
            end: {
              value: 1,
              modifier: 'EXACT',
            },
          },
          description: 'Removed',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '12665801',
            },
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '7857286',
            },
            {
              evidenceCode: 'ECO:0007744',
              source: 'PubMed',
              id: '19413330',
            },
            {
              evidenceCode: 'ECO:0007744',
              source: 'PubMed',
              id: '22223895',
            },
            {
              evidenceCode: 'ECO:0007744',
              source: 'PubMed',
              id: '22814378',
            },
          ],
        },
        {
          type: 'Chain',
          location: {
            start: {
              value: 2,
              modifier: 'EXACT',
            },
            end: {
              value: 515,
              modifier: 'EXACT',
            },
          },
          description: 'Glucose-6-phosphate 1-dehydrogenase',
          featureId: 'PRO_0000068083',
        },
        {
          type: 'Active site',
          location: {
            start: {
              value: 263,
              modifier: 'EXACT',
            },
            end: {
              value: 263,
              modifier: 'EXACT',
            },
          },
          description: 'Proton acceptor',
          evidences: [
            {
              evidenceCode: 'ECO:0000250',
              source: 'UniProtKB',
              id: 'P11411',
            },
          ],
        },
        {
          type: 'Binding site',
          location: {
            start: {
              value: 38,
              modifier: 'EXACT',
            },
            end: {
              value: 45,
              modifier: 'EXACT',
            },
          },
          description: '',
          featureCrossReferences: [
            {
              database: 'ChEBI',
              id: 'CHEBI:58349',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '10745013',
            },
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '15858258',
            },
            {
              evidenceCode: 'ECO:0007744',
              source: 'PDB',
              id: '1QKI',
            },
            {
              evidenceCode: 'ECO:0007744',
              source: 'PDB',
              id: '2BH9',
            },
          ],
          ligand: {
            name: 'NADP(+)',
            id: 'ChEBI:CHEBI:58349',
            label: '1',
          },
        },
        {
          type: 'Binding site',
          location: {
            start: {
              value: 72,
              modifier: 'EXACT',
            },
            end: {
              value: 72,
              modifier: 'EXACT',
            },
          },
          description: '',
          featureCrossReferences: [
            {
              database: 'ChEBI',
              id: 'CHEBI:58349',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '10745013',
            },
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '15858258',
            },
            {
              evidenceCode: 'ECO:0007744',
              source: 'PDB',
              id: '1QKI',
            },
            {
              evidenceCode: 'ECO:0007744',
              source: 'PDB',
              id: '2BH9',
            },
          ],
          ligand: {
            name: 'NADP(+)',
            id: 'ChEBI:CHEBI:58349',
            label: '1',
          },
        },
        {
          type: 'Binding site',
          location: {
            start: {
              value: 147,
              modifier: 'EXACT',
            },
            end: {
              value: 147,
              modifier: 'EXACT',
            },
          },
          description: '',
          featureCrossReferences: [
            {
              database: 'ChEBI',
              id: 'CHEBI:58349',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '10745013',
            },
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '15858258',
            },
            {
              evidenceCode: 'ECO:0007744',
              source: 'PDB',
              id: '1QKI',
            },
            {
              evidenceCode: 'ECO:0007744',
              source: 'PDB',
              id: '2BH9',
            },
          ],
          ligand: {
            name: 'NADP(+)',
            id: 'ChEBI:CHEBI:58349',
            label: '1',
          },
        },
        {
          type: 'Binding site',
          location: {
            start: {
              value: 171,
              modifier: 'EXACT',
            },
            end: {
              value: 171,
              modifier: 'EXACT',
            },
          },
          description: '',
          featureCrossReferences: [
            {
              database: 'ChEBI',
              id: 'CHEBI:58349',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '10745013',
            },
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '15858258',
            },
            {
              evidenceCode: 'ECO:0007744',
              source: 'PDB',
              id: '1QKI',
            },
            {
              evidenceCode: 'ECO:0007744',
              source: 'PDB',
              id: '2BH9',
            },
          ],
          ligand: {
            name: 'NADP(+)',
            id: 'ChEBI:CHEBI:58349',
            label: '1',
          },
        },
        {
          type: 'Binding site',
          location: {
            start: {
              value: 171,
              modifier: 'EXACT',
            },
            end: {
              value: 171,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '15858258',
            },
            {
              evidenceCode: 'ECO:0007744',
              source: 'PDB',
              id: '2BH9',
            },
          ],
          ligand: {
            name: 'substrate',
          },
        },
        {
          type: 'Binding site',
          location: {
            start: {
              value: 201,
              modifier: 'EXACT',
            },
            end: {
              value: 205,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '15858258',
            },
            {
              evidenceCode: 'ECO:0007744',
              source: 'PDB',
              id: '2BH9',
            },
          ],
          ligand: {
            name: 'substrate',
          },
        },
        {
          type: 'Binding site',
          location: {
            start: {
              value: 239,
              modifier: 'EXACT',
            },
            end: {
              value: 239,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '15858258',
            },
            {
              evidenceCode: 'ECO:0007744',
              source: 'PDB',
              id: '2BH9',
            },
          ],
          ligand: {
            name: 'substrate',
          },
        },
        {
          type: 'Binding site',
          location: {
            start: {
              value: 258,
              modifier: 'EXACT',
            },
            end: {
              value: 258,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '15858258',
            },
            {
              evidenceCode: 'ECO:0007744',
              source: 'PDB',
              id: '2BH9',
            },
          ],
          ligand: {
            name: 'substrate',
          },
        },
        {
          type: 'Binding site',
          location: {
            start: {
              value: 357,
              modifier: 'EXACT',
            },
            end: {
              value: 357,
              modifier: 'EXACT',
            },
          },
          description: '',
          featureCrossReferences: [
            {
              database: 'ChEBI',
              id: 'CHEBI:58349',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '10745013',
            },
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '15858258',
            },
            {
              evidenceCode: 'ECO:0007744',
              source: 'PDB',
              id: '1QKI',
            },
            {
              evidenceCode: 'ECO:0007744',
              source: 'PDB',
              id: '2BH9',
            },
          ],
          ligand: {
            name: 'NADP(+)',
            id: 'ChEBI:CHEBI:58349',
            label: '2',
          },
        },
        {
          type: 'Binding site',
          location: {
            start: {
              value: 360,
              modifier: 'EXACT',
            },
            end: {
              value: 360,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '15858258',
            },
            {
              evidenceCode: 'ECO:0007744',
              source: 'PDB',
              id: '2BHL',
            },
          ],
          ligand: {
            name: 'substrate',
          },
        },
        {
          type: 'Binding site',
          location: {
            start: {
              value: 365,
              modifier: 'EXACT',
            },
            end: {
              value: 365,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '15858258',
            },
            {
              evidenceCode: 'ECO:0007744',
              source: 'PDB',
              id: '2BHL',
            },
          ],
          ligand: {
            name: 'substrate',
          },
        },
        {
          type: 'Binding site',
          location: {
            start: {
              value: 366,
              modifier: 'EXACT',
            },
            end: {
              value: 366,
              modifier: 'EXACT',
            },
          },
          description: '',
          featureCrossReferences: [
            {
              database: 'ChEBI',
              id: 'CHEBI:58349',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '10745013',
            },
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '15858258',
            },
            {
              evidenceCode: 'ECO:0007744',
              source: 'PDB',
              id: '1QKI',
            },
            {
              evidenceCode: 'ECO:0007744',
              source: 'PDB',
              id: '2BH9',
            },
          ],
          ligand: {
            name: 'NADP(+)',
            id: 'ChEBI:CHEBI:58349',
            label: '2',
          },
        },
        {
          type: 'Binding site',
          location: {
            start: {
              value: 370,
              modifier: 'EXACT',
            },
            end: {
              value: 370,
              modifier: 'EXACT',
            },
          },
          description: '',
          featureCrossReferences: [
            {
              database: 'ChEBI',
              id: 'CHEBI:58349',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '10745013',
            },
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '15858258',
            },
            {
              evidenceCode: 'ECO:0007744',
              source: 'PDB',
              id: '1QKI',
            },
            {
              evidenceCode: 'ECO:0007744',
              source: 'PDB',
              id: '2BH9',
            },
          ],
          ligand: {
            name: 'NADP(+)',
            id: 'ChEBI:CHEBI:58349',
            label: '2',
          },
        },
        {
          type: 'Binding site',
          location: {
            start: {
              value: 393,
              modifier: 'EXACT',
            },
            end: {
              value: 393,
              modifier: 'EXACT',
            },
          },
          description: '',
          featureCrossReferences: [
            {
              database: 'ChEBI',
              id: 'CHEBI:58349',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '10745013',
            },
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '15858258',
            },
            {
              evidenceCode: 'ECO:0007744',
              source: 'PDB',
              id: '1QKI',
            },
            {
              evidenceCode: 'ECO:0007744',
              source: 'PDB',
              id: '2BH9',
            },
          ],
          ligand: {
            name: 'NADP(+)',
            id: 'ChEBI:CHEBI:58349',
            label: '2',
          },
        },
        {
          type: 'Binding site',
          location: {
            start: {
              value: 395,
              modifier: 'EXACT',
            },
            end: {
              value: 395,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '15858258',
            },
            {
              evidenceCode: 'ECO:0007744',
              source: 'PDB',
              id: '2BHL',
            },
          ],
          ligand: {
            name: 'substrate',
          },
        },
        {
          type: 'Binding site',
          location: {
            start: {
              value: 401,
              modifier: 'EXACT',
            },
            end: {
              value: 403,
              modifier: 'EXACT',
            },
          },
          description: '',
          featureCrossReferences: [
            {
              database: 'ChEBI',
              id: 'CHEBI:58349',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '10745013',
            },
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '15858258',
            },
            {
              evidenceCode: 'ECO:0007744',
              source: 'PDB',
              id: '1QKI',
            },
            {
              evidenceCode: 'ECO:0007744',
              source: 'PDB',
              id: '2BH9',
            },
          ],
          ligand: {
            name: 'NADP(+)',
            id: 'ChEBI:CHEBI:58349',
            label: '2',
          },
        },
        {
          type: 'Binding site',
          location: {
            start: {
              value: 421,
              modifier: 'EXACT',
            },
            end: {
              value: 423,
              modifier: 'EXACT',
            },
          },
          description: '',
          featureCrossReferences: [
            {
              database: 'ChEBI',
              id: 'CHEBI:58349',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '10745013',
            },
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '15858258',
            },
            {
              evidenceCode: 'ECO:0007744',
              source: 'PDB',
              id: '1QKI',
            },
            {
              evidenceCode: 'ECO:0007744',
              source: 'PDB',
              id: '2BH9',
            },
          ],
          ligand: {
            name: 'NADP(+)',
            id: 'ChEBI:CHEBI:58349',
            label: '2',
          },
        },
        {
          type: 'Binding site',
          location: {
            start: {
              value: 487,
              modifier: 'EXACT',
            },
            end: {
              value: 487,
              modifier: 'EXACT',
            },
          },
          description: '',
          featureCrossReferences: [
            {
              database: 'ChEBI',
              id: 'CHEBI:58349',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '10745013',
            },
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '15858258',
            },
            {
              evidenceCode: 'ECO:0007744',
              source: 'PDB',
              id: '1QKI',
            },
            {
              evidenceCode: 'ECO:0007744',
              source: 'PDB',
              id: '2BH9',
            },
          ],
          ligand: {
            name: 'NADP(+)',
            id: 'ChEBI:CHEBI:58349',
            label: '2',
          },
        },
        {
          type: 'Binding site',
          location: {
            start: {
              value: 503,
              modifier: 'EXACT',
            },
            end: {
              value: 503,
              modifier: 'EXACT',
            },
          },
          description: '',
          featureCrossReferences: [
            {
              database: 'ChEBI',
              id: 'CHEBI:58349',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '10745013',
            },
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '15858258',
            },
            {
              evidenceCode: 'ECO:0007744',
              source: 'PDB',
              id: '1QKI',
            },
            {
              evidenceCode: 'ECO:0007744',
              source: 'PDB',
              id: '2BH9',
            },
          ],
          ligand: {
            name: 'NADP(+)',
            id: 'ChEBI:CHEBI:58349',
            label: '2',
          },
        },
        {
          type: 'Binding site',
          location: {
            start: {
              value: 509,
              modifier: 'EXACT',
            },
            end: {
              value: 509,
              modifier: 'EXACT',
            },
          },
          description: '',
          featureCrossReferences: [
            {
              database: 'ChEBI',
              id: 'CHEBI:58349',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '10745013',
            },
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '15858258',
            },
            {
              evidenceCode: 'ECO:0007744',
              source: 'PDB',
              id: '1QKI',
            },
            {
              evidenceCode: 'ECO:0007744',
              source: 'PDB',
              id: '2BH9',
            },
          ],
          ligand: {
            name: 'NADP(+)',
            id: 'ChEBI:CHEBI:58349',
            label: '2',
          },
        },
        {
          type: 'Modified residue',
          location: {
            start: {
              value: 2,
              modifier: 'EXACT',
            },
            end: {
              value: 2,
              modifier: 'EXACT',
            },
          },
          description: 'N-acetylalanine',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '7857286',
            },
            {
              evidenceCode: 'ECO:0007744',
              source: 'PubMed',
              id: '19413330',
            },
            {
              evidenceCode: 'ECO:0007744',
              source: 'PubMed',
              id: '22223895',
            },
            {
              evidenceCode: 'ECO:0007744',
              source: 'PubMed',
              id: '22814378',
            },
          ],
        },
        {
          type: 'Modified residue',
          location: {
            start: {
              value: 8,
              modifier: 'EXACT',
            },
            end: {
              value: 8,
              modifier: 'EXACT',
            },
          },
          description: 'Phosphoserine',
          evidences: [
            {
              evidenceCode: 'ECO:0007744',
              source: 'PubMed',
              id: '23186163',
            },
          ],
        },
        {
          type: 'Modified residue',
          location: {
            start: {
              value: 10,
              modifier: 'EXACT',
            },
            end: {
              value: 10,
              modifier: 'EXACT',
            },
          },
          description: 'Phosphothreonine',
          evidences: [
            {
              evidenceCode: 'ECO:0007744',
              source: 'PubMed',
              id: '23186163',
            },
          ],
        },
        {
          type: 'Modified residue',
          location: {
            start: {
              value: 89,
              modifier: 'EXACT',
            },
            end: {
              value: 89,
              modifier: 'EXACT',
            },
          },
          description: 'N6-acetyllysine',
          evidences: [
            {
              evidenceCode: 'ECO:0007744',
              source: 'PubMed',
              id: '19608861',
            },
          ],
        },
        {
          type: 'Modified residue',
          location: {
            start: {
              value: 171,
              modifier: 'EXACT',
            },
            end: {
              value: 171,
              modifier: 'EXACT',
            },
          },
          description: 'N6-(2-hydroxyisobutyryl)lysine; alternate',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '29192674',
            },
          ],
        },
        {
          type: 'Modified residue',
          location: {
            start: {
              value: 171,
              modifier: 'EXACT',
            },
            end: {
              value: 171,
              modifier: 'EXACT',
            },
          },
          description: 'N6-acetyllysine; alternate',
          evidences: [
            {
              evidenceCode: 'ECO:0007744',
              source: 'PubMed',
              id: '19608861',
            },
          ],
        },
        {
          type: 'Modified residue',
          location: {
            start: {
              value: 403,
              modifier: 'EXACT',
            },
            end: {
              value: 403,
              modifier: 'EXACT',
            },
          },
          description: 'N6-acetyllysine',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '24769394',
            },
            {
              evidenceCode: 'ECO:0007744',
              source: 'PubMed',
              id: '19608861',
            },
          ],
        },
        {
          type: 'Modified residue',
          location: {
            start: {
              value: 432,
              modifier: 'EXACT',
            },
            end: {
              value: 432,
              modifier: 'EXACT',
            },
          },
          description: 'N6-acetyllysine',
          evidences: [
            {
              evidenceCode: 'ECO:0007744',
              source: 'PubMed',
              id: '19608861',
            },
          ],
        },
        {
          type: 'Modified residue',
          location: {
            start: {
              value: 497,
              modifier: 'EXACT',
            },
            end: {
              value: 497,
              modifier: 'EXACT',
            },
          },
          description: 'N6-acetyllysine',
          evidences: [
            {
              evidenceCode: 'ECO:0007744',
              source: 'PubMed',
              id: '19608861',
            },
          ],
        },
        {
          type: 'Modified residue',
          location: {
            start: {
              value: 503,
              modifier: 'EXACT',
            },
            end: {
              value: 503,
              modifier: 'EXACT',
            },
          },
          description: 'Phosphotyrosine',
          evidences: [
            {
              evidenceCode: 'ECO:0007744',
              source: 'PubMed',
              id: '23186163',
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
              value: 1,
              modifier: 'EXACT',
            },
          },
          description: 'in isoform 3',
          evidences: [
            {
              evidenceCode: 'ECO:0000303',
              source: 'PubMed',
              id: '8466644',
            },
          ],
          featureId: 'VSP_037802',
          alternativeSequence: {
            originalSequence: 'M',
            alternativeSequences: ['MGRRGSAPGNGRTLRGCERGGRRRRSADSVM'],
          },
        },
        {
          type: 'Alternative sequence',
          location: {
            start: {
              value: 257,
              modifier: 'EXACT',
            },
            end: {
              value: 257,
              modifier: 'EXACT',
            },
          },
          description: 'in isoform Long',
          evidences: [
            {
              evidenceCode: 'ECO:0000305',
            },
          ],
          featureId: 'VSP_001592',
          alternativeSequence: {
            originalSequence: 'R',
            alternativeSequences: [
              'RGPGRQGGSGSESCSLSLGSLVWGPHALEPGEQGGELRRALASSVPR',
            ],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 12,
              modifier: 'EXACT',
            },
            end: {
              value: 12,
              modifier: 'EXACT',
            },
          },
          description: 'in Sinnai',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '10627140',
            },
          ],
          featureId: 'VAR_002450',
          alternativeSequence: {
            originalSequence: 'V',
            alternativeSequences: ['L'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 32,
              modifier: 'EXACT',
            },
            end: {
              value: 32,
              modifier: 'EXACT',
            },
          },
          description:
            'in NSHA; Gahoe; class III; frequent in Chinese; dbSNP:rs137852340',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs137852340',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '1945893',
            },
          ],
          featureId: 'VAR_002451',
          alternativeSequence: {
            originalSequence: 'H',
            alternativeSequences: ['R'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 35,
              modifier: 'EXACT',
            },
            end: {
              value: 35,
              modifier: 'EXACT',
            },
          },
          description: 'in NSHA; Sunderland; class I',
          featureId: 'VAR_002452',
          alternativeSequence: {},
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 44,
              modifier: 'EXACT',
            },
            end: {
              value: 44,
              modifier: 'EXACT',
            },
          },
          description:
            'in NSHA; Orissa; class III; frequent in Indian tribal populations; dbSNP:rs78478128',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs78478128',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '8533762',
            },
          ],
          featureId: 'VAR_002453',
          alternativeSequence: {
            originalSequence: 'A',
            alternativeSequences: ['G'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 48,
              modifier: 'EXACT',
            },
            end: {
              value: 48,
              modifier: 'EXACT',
            },
          },
          description: 'in NSHA; Aures; class II; dbSNP:rs76645461',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs76645461',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '8490627',
            },
          ],
          featureId: 'VAR_002454',
          alternativeSequence: {
            originalSequence: 'I',
            alternativeSequences: ['T'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 58,
              modifier: 'EXACT',
            },
            end: {
              value: 58,
              modifier: 'EXACT',
            },
          },
          description: 'in NSHA; Metaponto; class III; dbSNP:rs137852315',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs137852315',
            },
          ],
          featureId: 'VAR_002455',
          alternativeSequence: {
            originalSequence: 'D',
            alternativeSequences: ['N'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 68,
              modifier: 'EXACT',
            },
            end: {
              value: 68,
              modifier: 'EXACT',
            },
          },
          description:
            'in NSHA; A(-) type I; class III; frequent in African population; dbSNP:rs1050828',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs1050828',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '12524354',
            },
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '1889820',
            },
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '2836867',
            },
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '8733135',
            },
          ],
          featureId: 'VAR_002456',
          alternativeSequence: {
            originalSequence: 'V',
            alternativeSequences: ['M'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 70,
              modifier: 'EXACT',
            },
            end: {
              value: 70,
              modifier: 'EXACT',
            },
          },
          description: 'in NSHA; Namoru; 4% activity; dbSNP:rs137852349',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs137852349',
            },
          ],
          featureId: 'VAR_002457',
          alternativeSequence: {
            originalSequence: 'Y',
            alternativeSequences: ['H'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 75,
              modifier: 'EXACT',
            },
            end: {
              value: 75,
              modifier: 'EXACT',
            },
          },
          description: 'in NSHA; Swansea; class I',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '7858267',
            },
          ],
          featureId: 'VAR_002458',
          alternativeSequence: {
            originalSequence: 'L',
            alternativeSequences: ['P'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 81,
              modifier: 'EXACT',
            },
            end: {
              value: 81,
              modifier: 'EXACT',
            },
          },
          description: 'in NSHA; Konan/Ube; class III; dbSNP:rs138687036',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs138687036',
            },
          ],
          featureId: 'VAR_002460',
          alternativeSequence: {
            originalSequence: 'R',
            alternativeSequences: ['C'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 81,
              modifier: 'EXACT',
            },
            end: {
              value: 81,
              modifier: 'EXACT',
            },
          },
          description: 'in NSHA; Lagosanto; class III; dbSNP:rs782308266',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs782308266',
            },
          ],
          featureId: 'VAR_002459',
          alternativeSequence: {
            originalSequence: 'R',
            alternativeSequences: ['H'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 106,
              modifier: 'EXACT',
            },
            end: {
              value: 106,
              modifier: 'EXACT',
            },
          },
          description: 'in NSHA; Vancouver; class I; dbSNP:rs267606835',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs267606835',
            },
          ],
          featureId: 'VAR_002461',
          alternativeSequence: {
            originalSequence: 'S',
            alternativeSequences: ['C'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 126,
              modifier: 'EXACT',
            },
            end: {
              value: 126,
              modifier: 'EXACT',
            },
          },
          description:
            'found in Santa Maria and Mount Sinai; associated with C-387 in Mount Sinai; class IV and class I; dbSNP:rs1050829',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs1050829',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '12524354',
            },
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '1889820',
            },
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '27535533',
            },
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '2836867',
            },
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '3446582',
            },
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '8733135',
            },
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '9452072',
            },
          ],
          featureId: 'VAR_002462',
          alternativeSequence: {
            originalSequence: 'N',
            alternativeSequences: ['D'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 128,
              modifier: 'EXACT',
            },
            end: {
              value: 128,
              modifier: 'EXACT',
            },
          },
          description: 'in NSHA; Vanua Lava; 4% activity; dbSNP:rs78365220',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs78365220',
            },
          ],
          featureId: 'VAR_002463',
          alternativeSequence: {
            originalSequence: 'L',
            alternativeSequences: ['P'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 131,
              modifier: 'EXACT',
            },
            end: {
              value: 131,
              modifier: 'EXACT',
            },
          },
          description: 'in Chinese-4; dbSNP:rs137852341',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs137852341',
            },
          ],
          featureId: 'VAR_002464',
          alternativeSequence: {
            originalSequence: 'G',
            alternativeSequences: ['V'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 156,
              modifier: 'EXACT',
            },
            end: {
              value: 156,
              modifier: 'EXACT',
            },
          },
          description: 'in NSHA; Ilesha; class III; dbSNP:rs137852313',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs137852313',
            },
          ],
          featureId: 'VAR_002465',
          alternativeSequence: {
            originalSequence: 'E',
            alternativeSequences: ['K'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 163,
              modifier: 'EXACT',
            },
            end: {
              value: 163,
              modifier: 'EXACT',
            },
          },
          description: 'in NSHA; Plymouth; class I',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '7858267',
            },
          ],
          featureId: 'VAR_002467',
          alternativeSequence: {
            originalSequence: 'G',
            alternativeSequences: ['D'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 163,
              modifier: 'EXACT',
            },
            end: {
              value: 163,
              modifier: 'EXACT',
            },
          },
          description:
            'in NSHA; Mahidol; class III; associated with reduced density of Plasmodium vivax but not Plasmodium falciparum in Southeast Asians; reduced activity; dbSNP:rs137852314',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs137852314',
            },
          ],
          featureId: 'VAR_002466',
          alternativeSequence: {
            originalSequence: 'G',
            alternativeSequences: ['S'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 165,
              modifier: 'EXACT',
            },
            end: {
              value: 165,
              modifier: 'EXACT',
            },
          },
          description: 'in NSHA; Chinese-3; class II; dbSNP:rs137852331',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs137852331',
            },
          ],
          featureId: 'VAR_002468',
          alternativeSequence: {
            originalSequence: 'N',
            alternativeSequences: ['D'],
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
          description: 'in NSHA; Naone; 1% activity',
          featureId: 'VAR_002469',
          alternativeSequence: {
            originalSequence: 'R',
            alternativeSequences: ['H'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 176,
              modifier: 'EXACT',
            },
            end: {
              value: 176,
              modifier: 'EXACT',
            },
          },
          description: 'in NSHA; Shinshu; class I',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '8193373',
            },
          ],
          featureId: 'VAR_002470',
          alternativeSequence: {
            originalSequence: 'D',
            alternativeSequences: ['G'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 181,
              modifier: 'EXACT',
            },
            end: {
              value: 181,
              modifier: 'EXACT',
            },
          },
          description: 'in NSHA; Santa Maria; class I; dbSNP:rs5030872',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs5030872',
            },
          ],
          featureId: 'VAR_002471',
          alternativeSequence: {
            originalSequence: 'D',
            alternativeSequences: ['V'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 182,
              modifier: 'EXACT',
            },
            end: {
              value: 182,
              modifier: 'EXACT',
            },
          },
          description: 'in NSHA; Vancouver; class I; dbSNP:rs267606836',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs267606836',
            },
          ],
          featureId: 'VAR_002472',
          alternativeSequence: {
            originalSequence: 'R',
            alternativeSequences: ['W'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 184,
              modifier: 'EXACT',
            },
            end: {
              value: 184,
              modifier: 'EXACT',
            },
          },
          description:
            'in Dindori; class II; 5% of activity; dbSNP:rs782315572',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs782315572',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'Reference',
              id: 'Ref.56',
            },
          ],
          featureId: 'VAR_081894',
          alternativeSequence: {
            originalSequence: 'S',
            alternativeSequences: ['F'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 188,
              modifier: 'EXACT',
            },
            end: {
              value: 188,
              modifier: 'EXACT',
            },
          },
          description:
            'in NSHA; Sassari/Cagliari; class II; frequent in the Mediterranean; dbSNP:rs5030868',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs5030868',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '2912069',
            },
          ],
          featureId: 'VAR_002473',
          alternativeSequence: {
            originalSequence: 'S',
            alternativeSequences: ['F'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 198,
              modifier: 'EXACT',
            },
            end: {
              value: 198,
              modifier: 'EXACT',
            },
          },
          description: 'in Coimbra; class II; dbSNP:rs137852330',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs137852330',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '18043863',
            },
          ],
          featureId: 'VAR_002474',
          alternativeSequence: {
            originalSequence: 'R',
            alternativeSequences: ['C'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 198,
              modifier: 'EXACT',
            },
            end: {
              value: 198,
              modifier: 'EXACT',
            },
          },
          description: 'in Nilgiris; class II; dbSNP:rs137852332',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs137852332',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '18043863',
            },
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '29333274',
            },
          ],
          featureId: 'VAR_081895',
          alternativeSequence: {
            originalSequence: 'R',
            alternativeSequences: ['H'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 198,
              modifier: 'EXACT',
            },
            end: {
              value: 198,
              modifier: 'EXACT',
            },
          },
          description: 'in NSHA; Santiago; class I; dbSNP:rs137852332',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs137852332',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '1611091',
            },
          ],
          featureId: 'VAR_002475',
          alternativeSequence: {
            originalSequence: 'R',
            alternativeSequences: ['P'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 198,
              modifier: 'EXACT',
            },
            end: {
              value: 198,
              modifier: 'EXACT',
            },
          },
          description:
            'in NSHA; Herlev; loss of glucose-6-phosphate dehydrogenase activity',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '26479991',
            },
          ],
          featureId: 'VAR_075555',
          alternativeSequence: {
            originalSequence: 'R',
            alternativeSequences: ['S'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 212,
              modifier: 'EXACT',
            },
            end: {
              value: 212,
              modifier: 'EXACT',
            },
          },
          description: 'in NSHA; Sibari; class III; dbSNP:rs782754619',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs782754619',
            },
          ],
          featureId: 'VAR_002476',
          alternativeSequence: {
            originalSequence: 'M',
            alternativeSequences: ['V'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 213,
              modifier: 'EXACT',
            },
            end: {
              value: 213,
              modifier: 'EXACT',
            },
          },
          description: 'in NSHA; Minnesota; class I; dbSNP:rs137852326',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs137852326',
            },
          ],
          featureId: 'VAR_002477',
          alternativeSequence: {
            originalSequence: 'V',
            alternativeSequences: ['L'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 216,
              modifier: 'EXACT',
            },
            end: {
              value: 216,
              modifier: 'EXACT',
            },
          },
          description: 'in NSHA; Harilaou; class I; dbSNP:rs137852319',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs137852319',
            },
          ],
          featureId: 'VAR_002478',
          alternativeSequence: {
            originalSequence: 'F',
            alternativeSequences: ['L'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 219,
              modifier: 'EXACT',
            },
            end: {
              value: 219,
              modifier: 'EXACT',
            },
          },
          description:
            'in NSHA; Meyer; class I; likely pathogenic; disrupts dimer formation; reduces catalytic activity; decreases protein stability; no impact on glucose-6-phosphate binding affinity',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '38066190',
            },
          ],
          featureId: 'VAR_088817',
          alternativeSequence: {
            originalSequence: 'R',
            alternativeSequences: ['G'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 227,
              modifier: 'EXACT',
            },
            end: {
              value: 227,
              modifier: 'EXACT',
            },
          },
          description: 'in NSHA; A- type 2; class III; dbSNP:rs137852328',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs137852328',
            },
          ],
          featureId: 'VAR_002480',
          alternativeSequence: {
            originalSequence: 'R',
            alternativeSequences: ['L'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 227,
              modifier: 'EXACT',
            },
            end: {
              value: 227,
              modifier: 'EXACT',
            },
          },
          description: 'in Mexico City; class III; dbSNP:rs137852328',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs137852328',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '1611091',
            },
          ],
          featureId: 'VAR_002479',
          alternativeSequence: {
            originalSequence: 'R',
            alternativeSequences: ['Q'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 242,
              modifier: 'EXACT',
            },
            end: {
              value: 243,
              modifier: 'EXACT',
            },
          },
          description: 'in NSHA; Stonybrook; class I',
          featureId: 'VAR_002481',
          alternativeSequence: {},
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 257,
              modifier: 'EXACT',
            },
            end: {
              value: 257,
              modifier: 'EXACT',
            },
          },
          description: 'in NSHA; Wayne; class I',
          featureId: 'VAR_002482',
          alternativeSequence: {
            originalSequence: 'R',
            alternativeSequences: ['G'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 274,
              modifier: 'EXACT',
            },
            end: {
              value: 274,
              modifier: 'EXACT',
            },
          },
          description: 'in NSHA; Corum; class I',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '7858267',
            },
          ],
          featureId: 'VAR_002483',
          alternativeSequence: {
            originalSequence: 'E',
            alternativeSequences: ['K'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 278,
              modifier: 'EXACT',
            },
            end: {
              value: 278,
              modifier: 'EXACT',
            },
          },
          description: 'in NSHA; Wexham; class I',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '7858267',
            },
          ],
          featureId: 'VAR_002484',
          alternativeSequence: {
            originalSequence: 'S',
            alternativeSequences: ['F'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 279,
              modifier: 'EXACT',
            },
            end: {
              value: 279,
              modifier: 'EXACT',
            },
          },
          description: 'in NSHA; Chinese-1; class II',
          featureId: 'VAR_002485',
          alternativeSequence: {
            originalSequence: 'T',
            alternativeSequences: ['S'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 282,
              modifier: 'EXACT',
            },
            end: {
              value: 282,
              modifier: 'EXACT',
            },
          },
          description: 'in NSHA; Seattle; class III; dbSNP:rs137852318',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs137852318',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '2912069',
            },
          ],
          featureId: 'VAR_002486',
          alternativeSequence: {
            originalSequence: 'D',
            alternativeSequences: ['H'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 285,
              modifier: 'EXACT',
            },
            end: {
              value: 285,
              modifier: 'EXACT',
            },
          },
          description: 'in NSHA; Montalbano; class III; dbSNP:rs74575103',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs74575103',
            },
          ],
          featureId: 'VAR_002487',
          alternativeSequence: {
            originalSequence: 'R',
            alternativeSequences: ['H'],
          },
        },
        {
          type: 'Natural variant',
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
          description: 'in NSHA; Viangchan/Jammu; class II; dbSNP:rs137852327',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs137852327',
            },
          ],
          featureId: 'VAR_002488',
          alternativeSequence: {
            originalSequence: 'V',
            alternativeSequences: ['M'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 317,
              modifier: 'EXACT',
            },
            end: {
              value: 317,
              modifier: 'EXACT',
            },
          },
          description: 'in NSHA; Kalyan/Kerala; class III; dbSNP:rs137852339',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs137852339',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '1303182',
            },
          ],
          featureId: 'VAR_002489',
          alternativeSequence: {
            originalSequence: 'E',
            alternativeSequences: ['K'],
          },
        },
        {
          type: 'Natural variant',
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
          description: 'in NSHA; Bhavnagar; decreased enzyme stability',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '30988594',
            },
          ],
          featureId: 'VAR_081896',
          alternativeSequence: {
            originalSequence: 'G',
            alternativeSequences: ['V'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 322,
              modifier: 'EXACT',
            },
            end: {
              value: 322,
              modifier: 'EXACT',
            },
          },
          description: 'in Rehovot; dbSNP:rs137852347',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs137852347',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '11112389',
            },
          ],
          featureId: 'VAR_020535',
          alternativeSequence: {
            originalSequence: 'Y',
            alternativeSequences: ['H'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 323,
              modifier: 'EXACT',
            },
            end: {
              value: 323,
              modifier: 'EXACT',
            },
          },
          description: 'in NSHA; A- type 3; class III; dbSNP:rs76723693',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs76723693',
            },
          ],
          featureId: 'VAR_002490',
          alternativeSequence: {
            originalSequence: 'L',
            alternativeSequences: ['P'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 335,
              modifier: 'EXACT',
            },
            end: {
              value: 335,
              modifier: 'EXACT',
            },
          },
          description: 'in NSHA; Chatham; class III; dbSNP:rs5030869',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs5030869',
            },
          ],
          featureId: 'VAR_002491',
          alternativeSequence: {
            originalSequence: 'A',
            alternativeSequences: ['T'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 342,
              modifier: 'EXACT',
            },
            end: {
              value: 342,
              modifier: 'EXACT',
            },
          },
          description: 'in Chinese-5; dbSNP:rs137852342',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs137852342',
            },
          ],
          featureId: 'VAR_002492',
          alternativeSequence: {
            originalSequence: 'L',
            alternativeSequences: ['F'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 353,
              modifier: 'EXACT',
            },
            end: {
              value: 353,
              modifier: 'EXACT',
            },
          },
          description: 'in Ierapetra; class II; dbSNP:rs137852333',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs137852333',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '1611091',
            },
          ],
          featureId: 'VAR_002493',
          alternativeSequence: {
            originalSequence: 'P',
            alternativeSequences: ['S'],
          },
        },
        {
          type: 'Natural variant',
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
          description: 'in NSHA; Loma Linda; class I; dbSNP:rs137852329',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs137852329',
            },
          ],
          featureId: 'VAR_002494',
          alternativeSequence: {
            originalSequence: 'N',
            alternativeSequences: ['K'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 385,
              modifier: 'EXACT',
            },
            end: {
              value: 385,
              modifier: 'EXACT',
            },
          },
          description: 'in NSHA; Tomah; class I; dbSNP:rs137852322',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs137852322',
            },
          ],
          featureId: 'VAR_002495',
          alternativeSequence: {
            originalSequence: 'C',
            alternativeSequences: ['R'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 386,
              modifier: 'EXACT',
            },
            end: {
              value: 386,
              modifier: 'EXACT',
            },
          },
          description: 'in NSHA; Iowa; class I; dbSNP:rs137852320',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs137852320',
            },
          ],
          featureId: 'VAR_002496',
          alternativeSequence: {
            originalSequence: 'K',
            alternativeSequences: ['E'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 387,
              modifier: 'EXACT',
            },
            end: {
              value: 387,
              modifier: 'EXACT',
            },
          },
          description:
            'in NSHA; Guadajalara and Mount Sinai; class I; dbSNP:rs137852334',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs137852334',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '1611091',
            },
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '9452072',
            },
          ],
          featureId: 'VAR_002498',
          alternativeSequence: {
            originalSequence: 'R',
            alternativeSequences: ['C'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 387,
              modifier: 'EXACT',
            },
            end: {
              value: 387,
              modifier: 'EXACT',
            },
          },
          description: 'in NSHA; Beverly Hills; class I; dbSNP:rs137852321',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs137852321',
            },
          ],
          featureId: 'VAR_002497',
          alternativeSequence: {
            originalSequence: 'R',
            alternativeSequences: ['H'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 393,
              modifier: 'EXACT',
            },
            end: {
              value: 393,
              modifier: 'EXACT',
            },
          },
          description: 'in NSHA; Nashville/Anaheim; class I; dbSNP:rs137852316',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs137852316',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '1536798',
            },
          ],
          featureId: 'VAR_002499',
          alternativeSequence: {
            originalSequence: 'R',
            alternativeSequences: ['H'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 394,
              modifier: 'EXACT',
            },
            end: {
              value: 394,
              modifier: 'EXACT',
            },
          },
          description: 'in NSHA; Alhambra; class I; dbSNP:rs137852335',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs137852335',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '1611091',
            },
          ],
          featureId: 'VAR_002500',
          alternativeSequence: {
            originalSequence: 'V',
            alternativeSequences: ['L'],
          },
        },
        {
          type: 'Natural variant',
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
          description: 'in NSHA; Bari; class I; dbSNP:rs1557229683',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs1557229683',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '7959695',
            },
          ],
          featureId: 'VAR_002501',
          alternativeSequence: {
            originalSequence: 'P',
            alternativeSequences: ['L'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 398,
              modifier: 'EXACT',
            },
            end: {
              value: 398,
              modifier: 'EXACT',
            },
          },
          description: 'in NSHA; Puerto Limon; class I; dbSNP:rs137852325',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs137852325',
            },
          ],
          featureId: 'VAR_002502',
          alternativeSequence: {
            originalSequence: 'E',
            alternativeSequences: ['K'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 410,
              modifier: 'EXACT',
            },
            end: {
              value: 410,
              modifier: 'EXACT',
            },
          },
          description: 'in NSHA; Riverside; class I; dbSNP:rs137852323',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs137852323',
            },
          ],
          featureId: 'VAR_002503',
          alternativeSequence: {
            originalSequence: 'G',
            alternativeSequences: ['C'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 410,
              modifier: 'EXACT',
            },
            end: {
              value: 410,
              modifier: 'EXACT',
            },
          },
          description: 'in NSHA; Japan; class I; dbSNP:rs137852336',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs137852336',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '1611091',
            },
          ],
          featureId: 'VAR_002504',
          alternativeSequence: {
            originalSequence: 'G',
            alternativeSequences: ['D'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 416,
              modifier: 'EXACT',
            },
            end: {
              value: 416,
              modifier: 'EXACT',
            },
          },
          description: 'in NSHA; Tokyo; class I',
          featureId: 'VAR_002505',
          alternativeSequence: {
            originalSequence: 'E',
            alternativeSequences: ['K'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 439,
              modifier: 'EXACT',
            },
            end: {
              value: 439,
              modifier: 'EXACT',
            },
          },
          description: 'in NSHA; Pawnee; class I; dbSNP:rs137852337',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs137852337',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '1611091',
            },
          ],
          featureId: 'VAR_002506',
          alternativeSequence: {
            originalSequence: 'R',
            alternativeSequences: ['P'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 440,
              modifier: 'EXACT',
            },
            end: {
              value: 440,
              modifier: 'EXACT',
            },
          },
          description: 'in NSHA; Telti/Kobe; class I; dbSNP:rs1557229599',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs1557229599',
            },
          ],
          featureId: 'VAR_002507',
          alternativeSequence: {
            originalSequence: 'L',
            alternativeSequences: ['F'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 447,
              modifier: 'EXACT',
            },
            end: {
              value: 447,
              modifier: 'EXACT',
            },
          },
          description: 'in NSHA; Santiago de Cuba; class I; dbSNP:rs137852317',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs137852317',
            },
          ],
          featureId: 'VAR_002508',
          alternativeSequence: {
            originalSequence: 'G',
            alternativeSequences: ['R'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 449,
              modifier: 'EXACT',
            },
            end: {
              value: 449,
              modifier: 'EXACT',
            },
          },
          description: 'in NSHA; Cassano; class II',
          featureId: 'VAR_002509',
          alternativeSequence: {
            originalSequence: 'Q',
            alternativeSequences: ['H'],
          },
        },
        {
          type: 'Natural variant',
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
          description:
            'in NSHA; Chinese-II/Maewo/Union; class II; <1% activity; dbSNP:rs398123546',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs398123546',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '1303180',
            },
          ],
          featureId: 'VAR_002510',
          alternativeSequence: {
            originalSequence: 'R',
            alternativeSequences: ['C'],
          },
        },
        {
          type: 'Natural variant',
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
          description: 'in NSHA; Andalus; class I; dbSNP:rs137852324',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs137852324',
            },
          ],
          featureId: 'VAR_002511',
          alternativeSequence: {
            originalSequence: 'R',
            alternativeSequences: ['H'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 459,
              modifier: 'EXACT',
            },
            end: {
              value: 459,
              modifier: 'EXACT',
            },
          },
          description:
            'in NSHA; Canton; class II; frequent in China; dbSNP:rs72554665',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs72554665',
            },
          ],
          featureId: 'VAR_002512',
          alternativeSequence: {
            originalSequence: 'R',
            alternativeSequences: ['L'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 459,
              modifier: 'EXACT',
            },
            end: {
              value: 459,
              modifier: 'EXACT',
            },
          },
          description: 'in NSHA; Cosenza; class II; dbSNP:rs72554665',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs72554665',
            },
          ],
          featureId: 'VAR_002513',
          alternativeSequence: {
            originalSequence: 'R',
            alternativeSequences: ['P'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 463,
              modifier: 'EXACT',
            },
            end: {
              value: 463,
              modifier: 'EXACT',
            },
          },
          description: 'in Kaiping; class II; dbSNP:rs72554664',
          featureCrossReferences: [
            {
              database: 'dbSNP',
              id: 'rs72554664',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'Reference',
              id: 'Ref.56',
            },
          ],
          featureId: 'VAR_002514',
          alternativeSequence: {
            originalSequence: 'R',
            alternativeSequences: ['H'],
          },
        },
        {
          type: 'Natural variant',
          location: {
            start: {
              value: 488,
              modifier: 'EXACT',
            },
            end: {
              value: 488,
              modifier: 'EXACT',
            },
          },
          description: 'in NSHA; Campinas; class I',
          featureId: 'VAR_002515',
          alternativeSequence: {
            originalSequence: 'G',
            alternativeSequences: ['V'],
          },
        },
        {
          type: 'Mutagenesis',
          location: {
            start: {
              value: 171,
              modifier: 'EXACT',
            },
            end: {
              value: 171,
              modifier: 'EXACT',
            },
          },
          description:
            'Inhibits catalytic activity. Does not impair dimerization.',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '24769394',
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
              value: 171,
              modifier: 'EXACT',
            },
            end: {
              value: 171,
              modifier: 'EXACT',
            },
          },
          description:
            'Inhibits catalytic activity. Does not impair dimerization.',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '24769394',
            },
          ],
          alternativeSequence: {
            originalSequence: 'K',
            alternativeSequences: ['R'],
          },
        },
        {
          type: 'Mutagenesis',
          location: {
            start: {
              value: 386,
              modifier: 'EXACT',
            },
            end: {
              value: 386,
              modifier: 'EXACT',
            },
          },
          description: 'Impairs dimerization and reduces catalytic activity.',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '24769394',
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
              value: 386,
              modifier: 'EXACT',
            },
            end: {
              value: 386,
              modifier: 'EXACT',
            },
          },
          description: 'Does not impair dimerization and catalytic activity.',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '24769394',
            },
          ],
          alternativeSequence: {
            originalSequence: 'K',
            alternativeSequences: ['R'],
          },
        },
        {
          type: 'Mutagenesis',
          location: {
            start: {
              value: 403,
              modifier: 'EXACT',
            },
            end: {
              value: 403,
              modifier: 'EXACT',
            },
          },
          description:
            'Impairs dimerization and reduces catalytic activity in cells under oxidative stress.',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '24769394',
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
              value: 403,
              modifier: 'EXACT',
            },
            end: {
              value: 403,
              modifier: 'EXACT',
            },
          },
          description: 'Does not impair dimerization and catalytic activity.',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '24769394',
            },
          ],
          alternativeSequence: {
            originalSequence: 'K',
            alternativeSequences: ['R'],
          },
        },
        {
          type: 'Sequence conflict',
          location: {
            start: {
              value: 11,
              modifier: 'EXACT',
            },
            end: {
              value: 11,
              modifier: 'EXACT',
            },
          },
          description: 'in Ref. 1; CAA27309, 2; AAA63175 and 3; AAA52500',
          evidences: [
            {
              evidenceCode: 'ECO:0000305',
            },
          ],
          alternativeSequence: {
            originalSequence: 'Q',
            alternativeSequences: ['H'],
          },
        },
        {
          type: 'Sequence conflict',
          location: {
            start: {
              value: 435,
              modifier: 'EXACT',
            },
            end: {
              value: 436,
              modifier: 'EXACT',
            },
          },
          description: 'in Ref. 15; AAA52499',
          evidences: [
            {
              evidenceCode: 'ECO:0000305',
            },
          ],
          alternativeSequence: {
            originalSequence: 'DA',
            alternativeSequences: ['EP'],
          },
        },
        {
          type: 'Beta strand',
          location: {
            start: {
              value: 32,
              modifier: 'EXACT',
            },
            end: {
              value: 37,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '6JYU',
            },
          ],
        },
        {
          type: 'Turn',
          location: {
            start: {
              value: 38,
              modifier: 'EXACT',
            },
            end: {
              value: 40,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '6JYU',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 42,
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
              id: '6JYU',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 48,
              modifier: 'EXACT',
            },
            end: {
              value: 57,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '6JYU',
            },
          ],
        },
        {
          type: 'Beta strand',
          location: {
            start: {
              value: 63,
              modifier: 'EXACT',
            },
            end: {
              value: 73,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '6JYU',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 77,
              modifier: 'EXACT',
            },
            end: {
              value: 84,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '6JYU',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 85,
              modifier: 'EXACT',
            },
            end: {
              value: 87,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '6JYU',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 92,
              modifier: 'EXACT',
            },
            end: {
              value: 94,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '6JYU',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 95,
              modifier: 'EXACT',
            },
            end: {
              value: 103,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '6JYU',
            },
          ],
        },
        {
          type: 'Beta strand',
          location: {
            start: {
              value: 105,
              modifier: 'EXACT',
            },
            end: {
              value: 109,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '6JYU',
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
              value: 126,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '6JYU',
            },
          ],
        },
        {
          type: 'Turn',
          location: {
            start: {
              value: 127,
              modifier: 'EXACT',
            },
            end: {
              value: 133,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '6JYU',
            },
          ],
        },
        {
          type: 'Beta strand',
          location: {
            start: {
              value: 135,
              modifier: 'EXACT',
            },
            end: {
              value: 140,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '6JYU',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 144,
              modifier: 'EXACT',
            },
            end: {
              value: 146,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '6JYU',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 147,
              modifier: 'EXACT',
            },
            end: {
              value: 157,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '6JYU',
            },
          ],
        },
        {
          type: 'Beta strand',
          location: {
            start: {
              value: 161,
              modifier: 'EXACT',
            },
            end: {
              value: 163,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '6JYU',
            },
          ],
        },
        {
          type: 'Beta strand',
          location: {
            start: {
              value: 165,
              modifier: 'EXACT',
            },
            end: {
              value: 169,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '6JYU',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 177,
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
              id: '6JYU',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 193,
              modifier: 'EXACT',
            },
            end: {
              value: 195,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '6JYU',
            },
          ],
        },
        {
          type: 'Beta strand',
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
              id: '6JYU',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 201,
              modifier: 'EXACT',
            },
            end: {
              value: 204,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '6JYU',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 206,
              modifier: 'EXACT',
            },
            end: {
              value: 216,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '6JYU',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 219,
              modifier: 'EXACT',
            },
            end: {
              value: 221,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '6JYU',
            },
          ],
        },
        {
          type: 'Beta strand',
          location: {
            start: {
              value: 222,
              modifier: 'EXACT',
            },
            end: {
              value: 226,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '2BHL',
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
              id: '6JYU',
            },
          ],
        },
        {
          type: 'Beta strand',
          location: {
            start: {
              value: 230,
              modifier: 'EXACT',
            },
            end: {
              value: 238,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '6JYU',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 247,
              modifier: 'EXACT',
            },
            end: {
              value: 250,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '6JYU',
            },
          ],
        },
        {
          type: 'Turn',
          location: {
            start: {
              value: 251,
              modifier: 'EXACT',
            },
            end: {
              value: 253,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '6JYU',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 254,
              modifier: 'EXACT',
            },
            end: {
              value: 258,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '6JYU',
            },
          ],
        },
        {
          type: 'Turn',
          location: {
            start: {
              value: 259,
              modifier: 'EXACT',
            },
            end: {
              value: 262,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '6JYU',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 263,
              modifier: 'EXACT',
            },
            end: {
              value: 272,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '6JYU',
            },
          ],
        },
        {
          type: 'Beta strand',
          location: {
            start: {
              value: 277,
              modifier: 'EXACT',
            },
            end: {
              value: 280,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '6JYU',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 281,
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
              id: '6JYU',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 300,
              modifier: 'EXACT',
            },
            end: {
              value: 302,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '6JYU',
            },
          ],
        },
        {
          type: 'Beta strand',
          location: {
            start: {
              value: 303,
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
              id: '6JYU',
            },
          ],
        },
        {
          type: 'Beta strand',
          location: {
            start: {
              value: 312,
              modifier: 'EXACT',
            },
            end: {
              value: 314,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SEH',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 316,
              modifier: 'EXACT',
            },
            end: {
              value: 319,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '6JYU',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 322,
              modifier: 'EXACT',
            },
            end: {
              value: 324,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '6JYU',
            },
          ],
        },
        {
          type: 'Beta strand',
          location: {
            start: {
              value: 326,
              modifier: 'EXACT',
            },
            end: {
              value: 328,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '2BHL',
            },
          ],
        },
        {
          type: 'Beta strand',
          location: {
            start: {
              value: 336,
              modifier: 'EXACT',
            },
            end: {
              value: 344,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '6JYU',
            },
          ],
        },
        {
          type: 'Turn',
          location: {
            start: {
              value: 347,
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
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '6JYU',
            },
          ],
        },
        {
          type: 'Beta strand',
          location: {
            start: {
              value: 353,
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
              id: '6JYU',
            },
          ],
        },
        {
          type: 'Beta strand',
          location: {
            start: {
              value: 366,
              modifier: 'EXACT',
            },
            end: {
              value: 373,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '6JYU',
            },
          ],
        },
        {
          type: 'Beta strand',
          location: {
            start: {
              value: 381,
              modifier: 'EXACT',
            },
            end: {
              value: 383,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '7SNF',
            },
          ],
        },
        {
          type: 'Beta strand',
          location: {
            start: {
              value: 389,
              modifier: 'EXACT',
            },
            end: {
              value: 397,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '6JYU',
            },
          ],
        },
        {
          type: 'Beta strand',
          location: {
            start: {
              value: 399,
              modifier: 'EXACT',
            },
            end: {
              value: 407,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '6JYU',
            },
          ],
        },
        {
          type: 'Beta strand',
          location: {
            start: {
              value: 409,
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
              id: '6JYU',
            },
          ],
        },
        {
          type: 'Beta strand',
          location: {
            start: {
              value: 414,
              modifier: 'EXACT',
            },
            end: {
              value: 423,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '6JYU',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 424,
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
              id: '6JYU',
            },
          ],
        },
        {
          type: 'Turn',
          location: {
            start: {
              value: 428,
              modifier: 'EXACT',
            },
            end: {
              value: 430,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '6JYU',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 436,
              modifier: 'EXACT',
            },
            end: {
              value: 446,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '6JYU',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 449,
              modifier: 'EXACT',
            },
            end: {
              value: 451,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '1QKI',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 455,
              modifier: 'EXACT',
            },
            end: {
              value: 475,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '6JYU',
            },
          ],
        },
        {
          type: 'Beta strand',
          location: {
            start: {
              value: 480,
              modifier: 'EXACT',
            },
            end: {
              value: 483,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '6JYU',
            },
          ],
        },
        {
          type: 'Beta strand',
          location: {
            start: {
              value: 486,
              modifier: 'EXACT',
            },
            end: {
              value: 488,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '2BH9',
            },
          ],
        },
        {
          type: 'Helix',
          location: {
            start: {
              value: 490,
              modifier: 'EXACT',
            },
            end: {
              value: 499,
              modifier: 'EXACT',
            },
          },
          description: '',
          evidences: [
            {
              evidenceCode: 'ECO:0007829',
              source: 'PDB',
              id: '6JYU',
            },
          ],
        },
        {
          type: 'Modified residue',
          location: {
            start: {
              value: 26,
              modifier: 'EXACT',
            },
            end: {
              value: 26,
              modifier: 'EXACT',
            },
            sequence: 'P11413-3',
          },
          description: 'Phosphoserine',
          evidences: [
            {
              evidenceCode: 'ECO:0007744',
              source: 'PubMed',
              id: '18669648',
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
          id: 'KW-0007',
          category: 'PTM',
          name: 'Acetylation',
        },
        {
          id: 'KW-0025',
          category: 'Coding sequence diversity',
          name: 'Alternative splicing',
        },
        {
          id: 'KW-0119',
          category: 'Biological process',
          name: 'Carbohydrate metabolism',
        },
        {
          id: 'KW-0963',
          category: 'Cellular component',
          name: 'Cytoplasm',
        },
        {
          id: 'KW-0903',
          category: 'Technical term',
          name: 'Direct protein sequencing',
        },
        {
          id: 'KW-0225',
          category: 'Disease',
          name: 'Disease variant',
        },
        {
          id: 'KW-0313',
          category: 'Biological process',
          name: 'Glucose metabolism',
        },
        {
          id: 'KW-0360',
          category: 'Disease',
          name: 'Hereditary hemolytic anemia',
        },
        {
          id: 'KW-0379',
          category: 'PTM',
          name: 'Hydroxylation',
        },
        {
          id: 'KW-0472',
          category: 'Cellular component',
          name: 'Membrane',
        },
        {
          id: 'KW-0521',
          category: 'Ligand',
          name: 'NADP',
        },
        {
          id: 'KW-0560',
          category: 'Molecular function',
          name: 'Oxidoreductase',
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
      ],
      references: [
        {
          referenceNumber: 1,
          citation: {
            id: '3515319',
            citationType: 'journal article',
            authors: [
              'Persico M.G.',
              'Viglietto G.',
              'Martini G.',
              'Toniolo D.',
              'Paonessa G.',
              'Moscatelli C.',
              'Dono R.',
              'Vulliamy T.J.',
              'Luzzatto L.',
              "D'Urso M.",
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '3515319',
              },
              {
                database: 'DOI',
                id: '10.1093/nar/14.6.2511',
              },
            ],
            title:
              "Isolation of human glucose-6-phosphate dehydrogenase (G6PD) cDNA clones: primary structure of the protein and unusual 5' non-coding region.",
            publicationDate: '1986',
            journal: 'Nucleic Acids Res.',
            firstPage: '2511',
            lastPage: '2522',
            volume: '14',
          },
          referencePositions: ['NUCLEOTIDE SEQUENCE [MRNA] (ISOFORM SHORT)'],
        },
        {
          referenceNumber: 2,
          citation: {
            id: '2428611',
            citationType: 'journal article',
            authors: [
              'Martini G.',
              'Toniolo D.',
              'Vulliamy T.',
              'Luzzatto L.',
              'Dono R.',
              'Viglietto G.',
              'Paonessa G.',
              "D'Urso M.",
              'Persico M.G.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '2428611',
              },
              {
                database: 'DOI',
                id: '10.1002/j.1460-2075.1986.tb04436.x',
              },
            ],
            title:
              'Structural analysis of the X-linked gene encoding human glucose 6-phosphate dehydrogenase.',
            publicationDate: '1986',
            journal: 'EMBO J.',
            firstPage: '1849',
            lastPage: '1855',
            volume: '5',
          },
          referencePositions: ['NUCLEOTIDE SEQUENCE [GENOMIC DNA]'],
        },
        {
          referenceNumber: 3,
          citation: {
            id: '2836867',
            citationType: 'journal article',
            authors: ['Hirono A.', 'Beutler E.'],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '2836867',
              },
              {
                database: 'DOI',
                id: '10.1073/pnas.85.11.3951',
              },
            ],
            title:
              'Molecular cloning and nucleotide sequence of cDNA for human glucose-6-phosphate dehydrogenase variant A(-).',
            publicationDate: '1988',
            journal: 'Proc. Natl. Acad. Sci. U.S.A.',
            firstPage: '3951',
            lastPage: '3954',
            volume: '85',
          },
          referencePositions: [
            'NUCLEOTIDE SEQUENCE [MRNA] (ISOFORM SHORT)',
            'PARTIAL NUCLEOTIDE SEQUENCE [MRNA] (ISOFORM LONG)',
            'VARIANT NSHA MET-68',
            'VARIANT ASP-126',
          ],
        },
        {
          referenceNumber: 4,
          citation: {
            id: '1889820',
            citationType: 'journal article',
            authors: [
              'Chen E.Y.',
              'Cheng A.',
              'Lee A.',
              'Kuang W.',
              'Hillier L.',
              'Green P.',
              'Schlessinger D.',
              'Ciccodicola A.',
              "D'Urso M.",
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '1889820',
              },
              {
                database: 'DOI',
                id: '10.1016/0888-7543(91)90465-q',
              },
            ],
            title:
              'Sequence of human glucose-6-phosphate dehydrogenase cloned in plasmids and a yeast artificial chromosome.',
            publicationDate: '1991',
            journal: 'Genomics',
            firstPage: '792',
            lastPage: '800',
            volume: '10',
          },
          referencePositions: [
            'NUCLEOTIDE SEQUENCE [GENOMIC DNA]',
            'VARIANT NSHA MET-68',
            'VARIANT ASP-126',
          ],
        },
        {
          referenceNumber: 5,
          citation: {
            id: '8733135',
            citationType: 'journal article',
            authors: [
              'Chen E.Y.',
              'Zollo M.',
              'Mazzarella R.A.',
              'Ciccodicola A.',
              'Chen C.-N.',
              'Zuo L.',
              'Heiner C.',
              'Burough F.W.',
              'Ripetto M.',
              'Schlessinger D.',
              "D'Urso M.",
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '8733135',
              },
              {
                database: 'DOI',
                id: '10.1093/hmg/5.5.659',
              },
            ],
            title:
              'Long-range sequence analysis in Xq28: thirteen known and six candidate genes in 219.4 kb of high GC DNA between the RCP/GCP and G6PD loci.',
            publicationDate: '1996',
            journal: 'Hum. Mol. Genet.',
            firstPage: '659',
            lastPage: '668',
            volume: '5',
          },
          referencePositions: [
            'NUCLEOTIDE SEQUENCE [GENOMIC DNA]',
            'VARIANT NSHA MET-68',
            'VARIANT ASP-126',
          ],
        },
        {
          referenceNumber: 6,
          citation: {
            id: '15772651',
            citationType: 'journal article',
            authors: [
              'Ross M.T.',
              'Grafham D.V.',
              'Coffey A.J.',
              'Scherer S.',
              'McLay K.',
              'Muzny D.',
              'Platzer M.',
              'Howell G.R.',
              'Burrows C.',
              'Bird C.P.',
              'Frankish A.',
              'Lovell F.L.',
              'Howe K.L.',
              'Ashurst J.L.',
              'Fulton R.S.',
              'Sudbrak R.',
              'Wen G.',
              'Jones M.C.',
              'Hurles M.E.',
              'Andrews T.D.',
              'Scott C.E.',
              'Searle S.',
              'Ramser J.',
              'Whittaker A.',
              'Deadman R.',
              'Carter N.P.',
              'Hunt S.E.',
              'Chen R.',
              'Cree A.',
              'Gunaratne P.',
              'Havlak P.',
              'Hodgson A.',
              'Metzker M.L.',
              'Richards S.',
              'Scott G.',
              'Steffen D.',
              'Sodergren E.',
              'Wheeler D.A.',
              'Worley K.C.',
              'Ainscough R.',
              'Ambrose K.D.',
              'Ansari-Lari M.A.',
              'Aradhya S.',
              'Ashwell R.I.',
              'Babbage A.K.',
              'Bagguley C.L.',
              'Ballabio A.',
              'Banerjee R.',
              'Barker G.E.',
              'Barlow K.F.',
              'Barrett I.P.',
              'Bates K.N.',
              'Beare D.M.',
              'Beasley H.',
              'Beasley O.',
              'Beck A.',
              'Bethel G.',
              'Blechschmidt K.',
              'Brady N.',
              'Bray-Allen S.',
              'Bridgeman A.M.',
              'Brown A.J.',
              'Brown M.J.',
              'Bonnin D.',
              'Bruford E.A.',
              'Buhay C.',
              'Burch P.',
              'Burford D.',
              'Burgess J.',
              'Burrill W.',
              'Burton J.',
              'Bye J.M.',
              'Carder C.',
              'Carrel L.',
              'Chako J.',
              'Chapman J.C.',
              'Chavez D.',
              'Chen E.',
              'Chen G.',
              'Chen Y.',
              'Chen Z.',
              'Chinault C.',
              'Ciccodicola A.',
              'Clark S.Y.',
              'Clarke G.',
              'Clee C.M.',
              'Clegg S.',
              'Clerc-Blankenburg K.',
              'Clifford K.',
              'Cobley V.',
              'Cole C.G.',
              'Conquer J.S.',
              'Corby N.',
              'Connor R.E.',
              'David R.',
              'Davies J.',
              'Davis C.',
              'Davis J.',
              'Delgado O.',
              'Deshazo D.',
              'Dhami P.',
              'Ding Y.',
              'Dinh H.',
              'Dodsworth S.',
              'Draper H.',
              'Dugan-Rocha S.',
              'Dunham A.',
              'Dunn M.',
              'Durbin K.J.',
              'Dutta I.',
              'Eades T.',
              'Ellwood M.',
              'Emery-Cohen A.',
              'Errington H.',
              'Evans K.L.',
              'Faulkner L.',
              'Francis F.',
              'Frankland J.',
              'Fraser A.E.',
              'Galgoczy P.',
              'Gilbert J.',
              'Gill R.',
              'Gloeckner G.',
              'Gregory S.G.',
              'Gribble S.',
              'Griffiths C.',
              'Grocock R.',
              'Gu Y.',
              'Gwilliam R.',
              'Hamilton C.',
              'Hart E.A.',
              'Hawes A.',
              'Heath P.D.',
              'Heitmann K.',
              'Hennig S.',
              'Hernandez J.',
              'Hinzmann B.',
              'Ho S.',
              'Hoffs M.',
              'Howden P.J.',
              'Huckle E.J.',
              'Hume J.',
              'Hunt P.J.',
              'Hunt A.R.',
              'Isherwood J.',
              'Jacob L.',
              'Johnson D.',
              'Jones S.',
              'de Jong P.J.',
              'Joseph S.S.',
              'Keenan S.',
              'Kelly S.',
              'Kershaw J.K.',
              'Khan Z.',
              'Kioschis P.',
              'Klages S.',
              'Knights A.J.',
              'Kosiura A.',
              'Kovar-Smith C.',
              'Laird G.K.',
              'Langford C.',
              'Lawlor S.',
              'Leversha M.',
              'Lewis L.',
              'Liu W.',
              'Lloyd C.',
              'Lloyd D.M.',
              'Loulseged H.',
              'Loveland J.E.',
              'Lovell J.D.',
              'Lozado R.',
              'Lu J.',
              'Lyne R.',
              'Ma J.',
              'Maheshwari M.',
              'Matthews L.H.',
              'McDowall J.',
              'McLaren S.',
              'McMurray A.',
              'Meidl P.',
              'Meitinger T.',
              'Milne S.',
              'Miner G.',
              'Mistry S.L.',
              'Morgan M.',
              'Morris S.',
              'Mueller I.',
              'Mullikin J.C.',
              'Nguyen N.',
              'Nordsiek G.',
              'Nyakatura G.',
              "O'dell C.N.",
              'Okwuonu G.',
              'Palmer S.',
              'Pandian R.',
              'Parker D.',
              'Parrish J.',
              'Pasternak S.',
              'Patel D.',
              'Pearce A.V.',
              'Pearson D.M.',
              'Pelan S.E.',
              'Perez L.',
              'Porter K.M.',
              'Ramsey Y.',
              'Reichwald K.',
              'Rhodes S.',
              'Ridler K.A.',
              'Schlessinger D.',
              'Schueler M.G.',
              'Sehra H.K.',
              'Shaw-Smith C.',
              'Shen H.',
              'Sheridan E.M.',
              'Shownkeen R.',
              'Skuce C.D.',
              'Smith M.L.',
              'Sotheran E.C.',
              'Steingruber H.E.',
              'Steward C.A.',
              'Storey R.',
              'Swann R.M.',
              'Swarbreck D.',
              'Tabor P.E.',
              'Taudien S.',
              'Taylor T.',
              'Teague B.',
              'Thomas K.',
              'Thorpe A.',
              'Timms K.',
              'Tracey A.',
              'Trevanion S.',
              'Tromans A.C.',
              "d'Urso M.",
              'Verduzco D.',
              'Villasana D.',
              'Waldron L.',
              'Wall M.',
              'Wang Q.',
              'Warren J.',
              'Warry G.L.',
              'Wei X.',
              'West A.',
              'Whitehead S.L.',
              'Whiteley M.N.',
              'Wilkinson J.E.',
              'Willey D.L.',
              'Williams G.',
              'Williams L.',
              'Williamson A.',
              'Williamson H.',
              'Wilming L.',
              'Woodmansey R.L.',
              'Wray P.W.',
              'Yen J.',
              'Zhang J.',
              'Zhou J.',
              'Zoghbi H.',
              'Zorilla S.',
              'Buck D.',
              'Reinhardt R.',
              'Poustka A.',
              'Rosenthal A.',
              'Lehrach H.',
              'Meindl A.',
              'Minx P.J.',
              'Hillier L.W.',
              'Willard H.F.',
              'Wilson R.K.',
              'Waterston R.H.',
              'Rice C.M.',
              'Vaudin M.',
              'Coulson A.',
              'Nelson D.L.',
              'Weinstock G.',
              'Sulston J.E.',
              'Durbin R.M.',
              'Hubbard T.',
              'Gibbs R.A.',
              'Beck S.',
              'Rogers J.',
              'Bentley D.R.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '15772651',
              },
              {
                database: 'DOI',
                id: '10.1038/nature03440',
              },
            ],
            title: 'The DNA sequence of the human X chromosome.',
            publicationDate: '2005',
            journal: 'Nature',
            firstPage: '325',
            lastPage: '337',
            volume: '434',
          },
          referencePositions: ['NUCLEOTIDE SEQUENCE [LARGE SCALE GENOMIC DNA]'],
        },
        {
          referenceNumber: 7,
          citation: {
            id: 'CI-5GBD0VIIJ7C63',
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
            publicationDate: 'SEP-2005',
            submissionDatabase: 'EMBL/GenBank/DDBJ databases',
          },
          referencePositions: ['NUCLEOTIDE SEQUENCE [LARGE SCALE GENOMIC DNA]'],
        },
        {
          referenceNumber: 8,
          citation: {
            id: '15489334',
            citationType: 'journal article',
            authoringGroup: ['The MGC Project Team'],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '15489334',
              },
              {
                database: 'DOI',
                id: '10.1101/gr.2596504',
              },
            ],
            title:
              'The status, quality, and expansion of the NIH full-length cDNA project: the Mammalian Gene Collection (MGC).',
            publicationDate: '2004',
            journal: 'Genome Res.',
            firstPage: '2121',
            lastPage: '2127',
            volume: '14',
          },
          referencePositions: [
            'NUCLEOTIDE SEQUENCE [LARGE SCALE MRNA] (ISOFORM SHORT)',
          ],
          referenceComments: [
            {
              value: 'Lung',
              type: 'TISSUE',
            },
          ],
        },
        {
          referenceNumber: 9,
          citation: {
            id: '2758468',
            citationType: 'journal article',
            authors: ['Kanno H.', 'Huang I.Y.', 'Kan Y.W.', 'Yoshida A.'],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '2758468',
              },
              {
                database: 'DOI',
                id: '10.1016/0092-8674(89)90440-6',
              },
            ],
            title:
              'Two structural genes on different chromosomes are required for encoding the major subunit of human red cell glucose-6-phosphate dehydrogenase.',
            publicationDate: '1989',
            journal: 'Cell',
            firstPage: '595',
            lastPage: '606',
            volume: '58',
          },
          referencePositions: ['NUCLEOTIDE SEQUENCE [MRNA] OF 1-71'],
        },
        {
          referenceNumber: 10,
          citation: {
            id: '8466644',
            citationType: 'journal article',
            authors: ['Kanno H.', 'Kondoh T.', 'Yoshida A.'],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '8466644',
              },
              {
                database: 'DOI',
                id: '10.1089/dna.1993.12.209',
              },
            ],
            title:
              "5' structure and expression of human glucose-6-phosphate dehydrogenase mRNA.",
            publicationDate: '1993',
            journal: 'DNA Cell Biol.',
            firstPage: '209',
            lastPage: '215',
            volume: '12',
          },
          referencePositions: [
            'NUCLEOTIDE SEQUENCE [MRNA] OF 1-71 (ISOFORM 3)',
          ],
        },
        {
          referenceNumber: 11,
          citation: {
            id: '1874446',
            citationType: 'journal article',
            authors: [
              'Toniolo D.',
              'Filippi M.',
              'Dono R.',
              'Lettieri T.',
              'Martini G.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '1874446',
              },
              {
                database: 'DOI',
                id: '10.1016/0378-1119(91)90078-p',
              },
            ],
            title:
              "The CpG island in the 5' region of the G6PD gene of man and mouse.",
            publicationDate: '1991',
            journal: 'Gene',
            firstPage: '197',
            lastPage: '203',
            volume: '102',
          },
          referencePositions: ['NUCLEOTIDE SEQUENCE [GENOMIC DNA] OF 1-15'],
        },
        {
          referenceNumber: 12,
          citation: {
            id: '12665801',
            citationType: 'journal article',
            authors: [
              'Gevaert K.',
              'Goethals M.',
              'Martens L.',
              'Van Damme J.',
              'Staes A.',
              'Thomas G.R.',
              'Vandekerckhove J.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '12665801',
              },
              {
                database: 'DOI',
                id: '10.1038/nbt810',
              },
            ],
            title:
              'Exploring proteomes and analyzing protein processing by mass spectrometric identification of sorted N-terminal peptides.',
            publicationDate: '2003',
            journal: 'Nat. Biotechnol.',
            firstPage: '566',
            lastPage: '569',
            volume: '21',
          },
          referencePositions: ['PROTEIN SEQUENCE OF 2-9'],
          referenceComments: [
            {
              value: 'Platelet',
              type: 'TISSUE',
            },
          ],
        },
        {
          referenceNumber: 13,
          citation: {
            id: '1945893',
            citationType: 'journal article',
            authors: [
              'Chao L.T.',
              'Du C.S.',
              'Louie E.',
              'Zuo L.',
              'Chen E.',
              'Lubin B.',
              'Chiu D.T.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '1945893',
              },
              {
                database: 'DOI',
                id: '10.1093/nar/19.21.6056',
              },
            ],
            title:
              'A to G substitution identified in exon 2 of the G6PD gene among G6PD deficient Chinese.',
            publicationDate: '1991',
            journal: 'Nucleic Acids Res.',
            firstPage: '6056',
            lastPage: '6056',
            volume: '19',
          },
          referencePositions: [
            'NUCLEOTIDE SEQUENCE [GENOMIC DNA] OF 30-34',
            'VARIANT NSHA ARG-32',
          ],
        },
        {
          referenceNumber: 14,
          citation: {
            id: '12524354',
            citationType: 'journal article',
            authors: ['Saunders M.A.', 'Hammer M.F.', 'Nachman M.W.'],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '12524354',
              },
              {
                database: 'DOI',
                id: '10.1093/genetics/162.4.1849',
              },
            ],
            title:
              'Nucleotide variability at G6pd and the signature of malarial selection in humans.',
            publicationDate: '2002',
            journal: 'Genetics',
            firstPage: '1849',
            lastPage: '1861',
            volume: '162',
          },
          referencePositions: [
            'NUCLEOTIDE SEQUENCE [GENOMIC DNA] OF 41-515 (ISOFORM SHORT)',
            'VARIANT NSHA MET-68',
            'VARIANT ASP-126',
          ],
        },
        {
          referenceNumber: 15,
          citation: {
            id: '3012556',
            citationType: 'journal article',
            authors: ['Takizawa T.', 'Huang I.-Y.', 'Ikuta T.', 'Yoshida A.'],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '3012556',
              },
              {
                database: 'DOI',
                id: '10.1073/pnas.83.12.4157',
              },
            ],
            title:
              'Human glucose-6-phosphate dehydrogenase: primary structure and cDNA cloning.',
            publicationDate: '1986',
            journal: 'Proc. Natl. Acad. Sci. U.S.A.',
            firstPage: '4157',
            lastPage: '4161',
            volume: '83',
          },
          referencePositions: [
            'NUCLEOTIDE SEQUENCE [MRNA] OF 154-515 (ISOFORM SHORT)',
          ],
        },
        {
          referenceNumber: 16,
          citation: {
            id: '3126064',
            citationType: 'journal article',
            authors: [
              'Camardella L.',
              'Caruso C.',
              'Rutigliano B.',
              'Romano M.',
              'di Prisco G.',
              'Descalzi-Cancedda F.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '3126064',
              },
              {
                database: 'DOI',
                id: '10.1111/j.1432-1033.1988.tb13815.x',
              },
            ],
            title:
              "Human erythrocyte glucose-6-phosphate dehydrogenase. Identification of a reactive lysyl residue labelled with pyridoxal 5'-phosphate.",
            publicationDate: '1988',
            journal: 'Eur. J. Biochem.',
            firstPage: '485',
            lastPage: '489',
            volume: '171',
          },
          referencePositions: ['PROTEIN SEQUENCE OF 199-215'],
        },
        {
          referenceNumber: 17,
          citation: {
            id: '6696761',
            citationType: 'journal article',
            authors: [
              'Descalzi-Cancedda F.',
              'Caruso C.',
              'Romano M.',
              'di Prisco G.',
              'Camardella L.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '6696761',
              },
              {
                database: 'DOI',
                id: '10.1016/0006-291x(84)91105-7',
              },
            ],
            title:
              'Amino acid sequence of the carboxy-terminal end of human erythrocyte glucose-6-phosphate dehydrogenase.',
            publicationDate: '1984',
            journal: 'Biochem. Biophys. Res. Commun.',
            firstPage: '332',
            lastPage: '338',
            volume: '118',
          },
          referencePositions: ['PROTEIN SEQUENCE OF 509-515'],
        },
        {
          referenceNumber: 18,
          citation: {
            id: '743300',
            citationType: 'journal article',
            authors: [
              'Benatti U.',
              'Morelli A.',
              'Frascio M.',
              'Melloni E.',
              'Salamino F.',
              'Sparatore B.',
              'Pontremoli S.',
              'De Flora A.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '743300',
              },
              {
                database: 'DOI',
                id: '10.1016/0006-291x(78)91147-6',
              },
            ],
            title:
              'Glucose 6-phosphate dehydrogenase activity in membranes of erythrocytes from normal individuals and subjects with Mediterranean G6PD deficiency.',
            publicationDate: '1978',
            journal: 'Biochem. Biophys. Res. Commun.',
            firstPage: '1318',
            lastPage: '1324',
            volume: '85',
          },
          referencePositions: [
            'FUNCTION',
            'CATALYTIC ACTIVITY',
            'PATHWAY',
            'SUBCELLULAR LOCATION',
          ],
        },
        {
          referenceNumber: 19,
          citation: {
            id: '2910917',
            citationType: 'journal article',
            authors: ['Hirono A.', 'Beutler E.'],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '2910917',
              },
              {
                database: 'DOI',
                id: '10.1172/jci113881',
              },
            ],
            title:
              'Alternative splicing of human glucose-6-phosphate dehydrogenase messenger RNA in different tissues.',
            publicationDate: '1989',
            journal: 'J. Clin. Invest.',
            firstPage: '343',
            lastPage: '346',
            volume: '83',
          },
          referencePositions: ['ALTERNATIVE SPLICING'],
        },
        {
          referenceNumber: 20,
          citation: {
            id: '7857286',
            citationType: 'journal article',
            authors: [
              'Camardella L.',
              'Damonte G.',
              'Carratore V.',
              'Benatti U.',
              'Tonetti M.',
              'Moneti G.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '7857286',
              },
              {
                database: 'DOI',
                id: '10.1006/bbrc.1995.1192',
              },
            ],
            title:
              'Glucose 6-phosphate dehydrogenase from human erythrocytes: identification of N-acetyl-alanine at the N-terminus of the mature protein.',
            publicationDate: '1995',
            journal: 'Biochem. Biophys. Res. Commun.',
            firstPage: '331',
            lastPage: '338',
            volume: '207',
          },
          referencePositions: [
            'ACETYLATION AT ALA-2',
            'IDENTIFICATION BY MASS SPECTROMETRY',
          ],
        },
        {
          referenceNumber: 21,
          citation: {
            id: '18669648',
            citationType: 'journal article',
            authors: [
              'Dephoure N.',
              'Zhou C.',
              'Villen J.',
              'Beausoleil S.A.',
              'Bakalarski C.E.',
              'Elledge S.J.',
              'Gygi S.P.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '18669648',
              },
              {
                database: 'DOI',
                id: '10.1073/pnas.0805139105',
              },
            ],
            title: 'A quantitative atlas of mitotic phosphorylation.',
            publicationDate: '2008',
            journal: 'Proc. Natl. Acad. Sci. U.S.A.',
            firstPage: '10762',
            lastPage: '10767',
            volume: '105',
          },
          referencePositions: [
            'PHOSPHORYLATION [LARGE SCALE ANALYSIS] AT SER-26 (ISOFORM 3)',
            'IDENTIFICATION BY MASS SPECTROMETRY [LARGE SCALE ANALYSIS]',
          ],
          referenceComments: [
            {
              value: 'Cervix carcinoma',
              type: 'TISSUE',
            },
          ],
        },
        {
          referenceNumber: 22,
          citation: {
            id: '19413330',
            citationType: 'journal article',
            authors: [
              'Gauci S.',
              'Helbig A.O.',
              'Slijper M.',
              'Krijgsveld J.',
              'Heck A.J.',
              'Mohammed S.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '19413330',
              },
              {
                database: 'DOI',
                id: '10.1021/ac9004309',
              },
            ],
            title:
              'Lys-N and trypsin cover complementary parts of the phosphoproteome in a refined SCX-based approach.',
            publicationDate: '2009',
            journal: 'Anal. Chem.',
            firstPage: '4493',
            lastPage: '4501',
            volume: '81',
          },
          referencePositions: [
            'ACETYLATION [LARGE SCALE ANALYSIS] AT ALA-2',
            'CLEAVAGE OF INITIATOR METHIONINE [LARGE SCALE ANALYSIS]',
            'IDENTIFICATION BY MASS SPECTROMETRY [LARGE SCALE ANALYSIS]',
          ],
        },
        {
          referenceNumber: 23,
          citation: {
            id: '19608861',
            citationType: 'journal article',
            authors: [
              'Choudhary C.',
              'Kumar C.',
              'Gnad F.',
              'Nielsen M.L.',
              'Rehman M.',
              'Walther T.C.',
              'Olsen J.V.',
              'Mann M.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '19608861',
              },
              {
                database: 'DOI',
                id: '10.1126/science.1175371',
              },
            ],
            title:
              'Lysine acetylation targets protein complexes and co-regulates major cellular functions.',
            publicationDate: '2009',
            journal: 'Science',
            firstPage: '834',
            lastPage: '840',
            volume: '325',
          },
          referencePositions: [
            'ACETYLATION [LARGE SCALE ANALYSIS] AT LYS-89; LYS-171; LYS-403; LYS-432 AND LYS-497',
            'IDENTIFICATION BY MASS SPECTROMETRY [LARGE SCALE ANALYSIS]',
          ],
        },
        {
          referenceNumber: 24,
          citation: {
            id: '21269460',
            citationType: 'journal article',
            authors: [
              'Burkard T.R.',
              'Planyavsky M.',
              'Kaupe I.',
              'Breitwieser F.P.',
              'Buerckstuemmer T.',
              'Bennett K.L.',
              'Superti-Furga G.',
              'Colinge J.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '21269460',
              },
              {
                database: 'DOI',
                id: '10.1186/1752-0509-5-17',
              },
            ],
            title: 'Initial characterization of the human central proteome.',
            publicationDate: '2011',
            journal: 'BMC Syst. Biol.',
            firstPage: '17',
            lastPage: '17',
            volume: '5',
          },
          referencePositions: [
            'IDENTIFICATION BY MASS SPECTROMETRY [LARGE SCALE ANALYSIS]',
          ],
        },
        {
          referenceNumber: 25,
          citation: {
            id: '22431005',
            citationType: 'journal article',
            authors: ['Stanton R.C.'],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '22431005',
              },
              {
                database: 'DOI',
                id: '10.1002/iub.1017',
              },
            ],
            title:
              'Glucose-6-phosphate dehydrogenase, NADPH, and cell survival.',
            publicationDate: '2012',
            journal: 'IUBMB Life',
            firstPage: '362',
            lastPage: '369',
            volume: '64',
          },
          referencePositions: ['REVIEW'],
        },
        {
          referenceNumber: 26,
          citation: {
            id: '22223895',
            citationType: 'journal article',
            authors: [
              'Bienvenut W.V.',
              'Sumpton D.',
              'Martinez A.',
              'Lilla S.',
              'Espagne C.',
              'Meinnel T.',
              'Giglione C.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '22223895',
              },
              {
                database: 'DOI',
                id: '10.1074/mcp.m111.015131',
              },
            ],
            title:
              'Comparative large-scale characterisation of plant vs. mammal proteins reveals similar and idiosyncratic N-alpha acetylation features.',
            publicationDate: '2012',
            journal: 'Mol. Cell. Proteomics',
            firstPage: 'M111.015131',
            lastPage: 'M111.015131',
            volume: '11',
          },
          referencePositions: [
            'ACETYLATION [LARGE SCALE ANALYSIS] AT ALA-2',
            'CLEAVAGE OF INITIATOR METHIONINE [LARGE SCALE ANALYSIS]',
            'IDENTIFICATION BY MASS SPECTROMETRY [LARGE SCALE ANALYSIS]',
          ],
        },
        {
          referenceNumber: 27,
          citation: {
            id: '22814378',
            citationType: 'journal article',
            authors: [
              'Van Damme P.',
              'Lasa M.',
              'Polevoda B.',
              'Gazquez C.',
              'Elosegui-Artola A.',
              'Kim D.S.',
              'De Juan-Pardo E.',
              'Demeyer K.',
              'Hole K.',
              'Larrea E.',
              'Timmerman E.',
              'Prieto J.',
              'Arnesen T.',
              'Sherman F.',
              'Gevaert K.',
              'Aldabe R.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '22814378',
              },
              {
                database: 'DOI',
                id: '10.1073/pnas.1210303109',
              },
            ],
            title:
              'N-terminal acetylome analyses and functional insights of the N-terminal acetyltransferase NatB.',
            publicationDate: '2012',
            journal: 'Proc. Natl. Acad. Sci. U.S.A.',
            firstPage: '12449',
            lastPage: '12454',
            volume: '109',
          },
          referencePositions: [
            'ACETYLATION [LARGE SCALE ANALYSIS] AT ALA-2',
            'CLEAVAGE OF INITIATOR METHIONINE [LARGE SCALE ANALYSIS]',
            'IDENTIFICATION BY MASS SPECTROMETRY [LARGE SCALE ANALYSIS]',
          ],
        },
        {
          referenceNumber: 28,
          citation: {
            id: '23186163',
            citationType: 'journal article',
            authors: [
              'Zhou H.',
              'Di Palma S.',
              'Preisinger C.',
              'Peng M.',
              'Polat A.N.',
              'Heck A.J.',
              'Mohammed S.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '23186163',
              },
              {
                database: 'DOI',
                id: '10.1021/pr300630k',
              },
            ],
            title:
              'Toward a comprehensive characterization of a human cancer cell phosphoproteome.',
            publicationDate: '2013',
            journal: 'J. Proteome Res.',
            firstPage: '260',
            lastPage: '271',
            volume: '12',
          },
          referencePositions: [
            'PHOSPHORYLATION [LARGE SCALE ANALYSIS] AT SER-8; THR-10 AND TYR-503',
            'IDENTIFICATION BY MASS SPECTROMETRY [LARGE SCALE ANALYSIS]',
          ],
          referenceComments: [
            {
              value: 'Erythroleukemia',
              type: 'TISSUE',
            },
          ],
        },
        {
          referenceNumber: 29,
          citation: {
            id: '24769394',
            citationType: 'journal article',
            authors: [
              'Wang Y.P.',
              'Zhou L.S.',
              'Zhao Y.Z.',
              'Wang S.W.',
              'Chen L.L.',
              'Liu L.X.',
              'Ling Z.Q.',
              'Hu F.J.',
              'Sun Y.P.',
              'Zhang J.Y.',
              'Yang C.',
              'Yang Y.',
              'Xiong Y.',
              'Guan K.L.',
              'Ye D.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '24769394',
              },
              {
                database: 'DOI',
                id: '10.1002/embj.201387224',
              },
            ],
            title:
              'Regulation of G6PD acetylation by KAT9/SIRT2 modulates NADPH homeostasis and cell survival during oxidative stress.',
            publicationDate: '2014',
            journal: 'EMBO J.',
            firstPage: '1304',
            lastPage: '1320',
            volume: '33',
          },
          referencePositions: [
            'FUNCTION',
            'CATALYTIC ACTIVITY',
            'PATHWAY',
            'ACETYLATION AT LYS-403 BY ELP3',
            'DEACETYLATION AT LYS-403 BY SIRT2',
            'INTERACTION WITH SIRT2',
            'MUTAGENESIS OF LYS-171; LYS-386 AND LYS-403',
            'SUBUNIT',
          ],
        },
        {
          referenceNumber: 30,
          citation: {
            id: '29192674',
            citationType: 'journal article',
            authors: [
              'Huang H.',
              'Luo Z.',
              'Qi S.',
              'Huang J.',
              'Xu P.',
              'Wang X.',
              'Gao L.',
              'Li F.',
              'Wang J.',
              'Zhao W.',
              'Gu W.',
              'Chen Z.',
              'Dai L.',
              'Dai J.',
              'Zhao Y.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '29192674',
              },
              {
                database: 'DOI',
                id: '10.1038/cr.2017.149',
              },
            ],
            title:
              'Landscape of the regulatory elements for lysine 2-hydroxyisobutyrylation pathway.',
            publicationDate: '2018',
            journal: 'Cell Res.',
            firstPage: '111',
            lastPage: '125',
            volume: '28',
          },
          referencePositions: ['HYDROXYBUTYRYLATION AT LYS-171'],
        },
        {
          referenceNumber: 31,
          citation: {
            id: '35122041',
            citationType: 'journal article',
            authors: [
              'Li M.',
              'He X.',
              'Guo W.',
              'Yu H.',
              'Zhang S.',
              'Wang N.',
              'Liu G.',
              'Sa R.',
              'Shen X.',
              'Jiang Y.',
              'Tang Y.',
              'Zhuo Y.',
              'Yin C.',
              'Tu Q.',
              'Li N.',
              'Nie X.',
              'Li Y.',
              'Hu Z.',
              'Zhu H.',
              'Ding J.',
              'Li Z.',
              'Liu T.',
              'Zhang F.',
              'Zhou H.',
              'Li S.',
              'Yue J.',
              'Yan Z.',
              'Cheng S.',
              'Tao Y.',
              'Yin H.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '35122041',
              },
              {
                database: 'DOI',
                id: '10.1038/s43018-020-0086-7',
              },
            ],
            title:
              'Aldolase B suppresses hepatocellular carcinogenesis by inhibiting G6PD and pentose phosphate pathways.',
            publicationDate: '2020',
            journal: 'Nat. Cancer',
            firstPage: '735',
            lastPage: '747',
            volume: '1',
          },
          referencePositions: [
            'FUNCTION',
            'CATALYTIC ACTIVITY',
            'SUBCELLULAR LOCATION',
            'INTERACTION WITH ALDOB AND TP53',
          ],
        },
        {
          referenceNumber: 32,
          citation: {
            id: '10745013',
            citationType: 'journal article',
            authors: ['Au S.W.', 'Gover S.', 'Lam V.M.', 'Adams M.J.'],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '10745013',
              },
              {
                database: 'DOI',
                id: '10.1016/s0969-2126(00)00104-0',
              },
            ],
            title:
              'Human glucose-6-phosphate dehydrogenase: the crystal structure reveals a structural NADP(+) molecule and provides insights into enzyme deficiency.',
            publicationDate: '2000',
            journal: 'Structure',
            firstPage: '293',
            lastPage: '303',
            volume: '8',
          },
          referencePositions: [
            'X-RAY CRYSTALLOGRAPHY (3.0 ANGSTROMS) OF VARIANT CANTON IN COMPLEX WITH NADP',
            'SUBUNIT',
          ],
        },
        {
          referenceNumber: 33,
          citation: {
            id: '8364584',
            citationType: 'journal article',
            authors: ['Vulliamy T.', 'Beutler E.', 'Luzzatto L.'],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '8364584',
              },
              {
                database: 'DOI',
                id: '10.1002/humu.1380020302',
              },
            ],
            title:
              'Variants of glucose-6-phosphate dehydrogenase are due to missense mutations spread throughout the coding region of the gene.',
            publicationDate: '1993',
            journal: 'Hum. Mutat.',
            firstPage: '159',
            lastPage: '167',
            volume: '2',
          },
          referencePositions: ['REVIEW ON VARIANTS'],
        },
        {
          referenceNumber: 34,
          citation: {
            id: '11857737',
            citationType: 'journal article',
            authors: ['Kwok C.J.', 'Martin A.C.', 'Au S.W.', 'Lam V.M.'],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '11857737',
              },
              {
                database: 'DOI',
                id: '10.1002/humu.10036',
              },
            ],
            title:
              'G6PDdb, an integrated database of glucose-6-phosphate dehydrogenase (G6PD) mutations.',
            publicationDate: '2002',
            journal: 'Hum. Mutat.',
            firstPage: '217',
            lastPage: '224',
            volume: '19',
          },
          referencePositions: ['REVIEW ON VARIANTS'],
        },
        {
          referenceNumber: 35,
          citation: {
            id: '15858258',
            citationType: 'journal article',
            authors: [
              'Kotaka M.',
              'Gover S.',
              'Vandeputte-Rutten L.',
              'Au S.W.',
              'Lam V.M.',
              'Adams M.J.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '15858258',
              },
              {
                database: 'DOI',
                id: '10.1107/s0907444905002350',
              },
            ],
            title:
              'Structural studies of glucose-6-phosphate and NADP+ binding to human glucose-6-phosphate dehydrogenase.',
            publicationDate: '2005',
            journal: 'Acta Crystallogr. D',
            firstPage: '495',
            lastPage: '504',
            volume: '61',
          },
          referencePositions: [
            'X-RAY CRYSTALLOGRAPHY (2.50 ANGSTROMS) OF 28-514 IN COMPLEX WITH NADP AND GLUCOSE 6-PHOSPHATE',
            'FUNCTION',
            'CATALYTIC ACTIVITY',
            'BIOPHYSICOCHEMICAL PROPERTIES',
            'SUBUNIT',
          ],
        },
        {
          referenceNumber: 36,
          citation: {
            id: '3446582',
            citationType: 'journal article',
            authors: ['Takizawa T.', 'Yoneyama Y.', 'Miwa S.', 'Yoshida A.'],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '3446582',
              },
              {
                database: 'DOI',
                id: '10.1016/0888-7543(87)90048-6',
              },
            ],
            title:
              'A single nucleotide base transition is the basis of the common human glucose-6-phosphate dehydrogenase variant A (+).',
            publicationDate: '1987',
            journal: 'Genomics',
            firstPage: '228',
            lastPage: '231',
            volume: '1',
          },
          referencePositions: ['VARIANT ASP-126'],
        },
        {
          referenceNumber: 37,
          citation: {
            id: '3393536',
            citationType: 'journal article',
            authors: [
              'Vulliamy T.J.',
              "D'Urso M.",
              'Battistuzzi G.',
              'Estrada M.',
              'Foulkes N.S.',
              'Martini G.',
              'Calabro V.',
              'Poggi V.',
              'Giordano R.',
              'Town M.',
              'Luzzatto L.',
              'Persico M.G.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '3393536',
              },
              {
                database: 'DOI',
                id: '10.1073/pnas.85.14.5171',
              },
            ],
            title:
              'Diverse point mutations in the human glucose-6-phosphate dehydrogenase gene cause enzyme deficiency and mild or severe hemolytic anemia.',
            publicationDate: '1988',
            journal: 'Proc. Natl. Acad. Sci. U.S.A.',
            firstPage: '5171',
            lastPage: '5175',
            volume: '85',
          },
          referencePositions: ['VARIANTS'],
        },
        {
          referenceNumber: 38,
          citation: {
            id: '2912069',
            citationType: 'journal article',
            authors: [
              'de Vita G.',
              'Alcalay M.',
              'Sampietro M.',
              'Cappelini M.D.',
              'Fiorelli G.',
              'Toniolo D.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '2912069',
              },
            ],
            title:
              'Two point mutations are responsible for G6PD polymorphism in Sardinia.',
            publicationDate: '1989',
            journal: 'Am. J. Hum. Genet.',
            firstPage: '233',
            lastPage: '240',
            volume: '44',
          },
          referencePositions: ['VARIANTS NSHA PHE-188 AND HIS-282'],
        },
        {
          referenceNumber: 39,
          citation: {
            id: '1611091',
            citationType: 'journal article',
            authors: [
              'Beutler E.',
              'Westwood B.',
              'Prchal J.T.',
              'Vaca C.S.',
              'Bartsocas C.S.',
              'Baronciani L.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '1611091',
              },
            ],
            title:
              'New glucose-6-phosphate dehydrogenase mutations from various ethnic groups.',
            publicationDate: '1992',
            journal: 'Blood',
            firstPage: '255',
            lastPage: '256',
            volume: '80',
          },
          referencePositions: [
            'VARIANTS NSHA PRO-198; CYS-387; LEU-394; ASP-410 AND PRO-439',
            'VARIANT MEXICO CITY GLN-227',
            'VARIANT IERAPETRA SER-353',
          ],
        },
        {
          referenceNumber: 40,
          citation: {
            id: '1536798',
            citationType: 'journal article',
            authors: [
              'Filosa S.',
              'Calabro V.',
              'Vallone D.',
              'Poggi V.',
              'Mason P.',
              'Pagnini D.',
              'Alfinito F.',
              'Rotoli B.',
              'Martini G.',
              'Luzzatto L.',
              'Battistuzzi G.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '1536798',
              },
              {
                database: 'DOI',
                id: '10.1111/j.1365-2141.1992.tb06409.x',
              },
            ],
            title:
              'Molecular basis of chronic non-spherocytic haemolytic anaemia: a new G6PD variant (393arg-to-his) with abnormal K(m) G6P and marked in vivo instability.',
            publicationDate: '1992',
            journal: 'Br. J. Haematol.',
            firstPage: '111',
            lastPage: '116',
            volume: '80',
          },
          referencePositions: ['VARIANT NSHA HIS-393'],
        },
        {
          referenceNumber: 41,
          citation: {
            id: '1303180',
            citationType: 'journal article',
            authors: ['Perng L.-I.', 'Chiou S.-S.', 'Liu T.-C.', 'Chang J.-G.'],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '1303180',
              },
              {
                database: 'DOI',
                id: '10.1093/hmg/1.3.205',
              },
            ],
            title:
              'A novel C to T substitution at nucleotide 1360 of cDNA which abolishes a natural Hha I site accounts for a new G6PD deficiency gene in Chinese.',
            publicationDate: '1992',
            journal: 'Hum. Mol. Genet.',
            firstPage: '205',
            lastPage: '205',
            volume: '1',
          },
          referencePositions: ['VARIANT NSHA CYS-454'],
        },
        {
          referenceNumber: 42,
          citation: {
            id: '1303182',
            citationType: 'journal article',
            authors: [
              'Ahluwalia A.',
              'Corcoran C.M.',
              'Vulliamy T.J.',
              'Ishwad C.S.',
              'Naidu J.M.',
              'Stevens D.J.',
              'Mason P.J.',
              'Luzzatto L.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '1303182',
              },
              {
                database: 'DOI',
                id: '10.1093/hmg/1.3.209',
              },
            ],
            title:
              'G6PD Kalyan and G6PD Kerala; two deficient variants in India caused by the same 317 Glu-->Lys mutation.',
            publicationDate: '1992',
            journal: 'Hum. Mol. Genet.',
            firstPage: '209',
            lastPage: '210',
            volume: '1',
          },
          referencePositions: ['VARIANT NSHA LYS-317'],
        },
        {
          referenceNumber: 43,
          citation: {
            id: '8490627',
            citationType: 'journal article',
            authors: [
              'Nafa K.',
              'Reghis A.',
              'Osmani N.',
              'Baghli L.',
              'Benabadji M.',
              'Kaplan J.-C.',
              'Vulliamy T.J.',
              'Luzzatto L.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '8490627',
              },
              {
                database: 'DOI',
                id: '10.1093/hmg/2.1.81',
              },
            ],
            title:
              'G6PD Aures: a new mutation (48 Ile-->Thr) causing mild G6PD deficiency is associated with favism.',
            publicationDate: '1993',
            journal: 'Hum. Mol. Genet.',
            firstPage: '81',
            lastPage: '82',
            volume: '2',
          },
          referencePositions: ['VARIANT NSHA THR-48'],
        },
        {
          referenceNumber: 44,
          citation: {
            id: '8193373',
            citationType: 'journal article',
            authors: [
              'Hirono A.',
              'Miwa S.',
              'Fujii H.',
              'Ishida F.',
              'Yamada K.',
              'Kubota K.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '8193373',
              },
            ],
            title:
              'Molecular study of eight Japanese cases of glucose-6-phosphate dehydrogenase deficiency by nonradioisotopic single-strand conformation polymorphism analysis.',
            publicationDate: '1994',
            journal: 'Blood',
            firstPage: '3363',
            lastPage: '3368',
            volume: '83',
          },
          referencePositions: ['VARIANT NSHA GLY-176'],
        },
        {
          referenceNumber: 45,
          citation: {
            id: '7959695',
            citationType: 'journal article',
            authors: [
              'Filosa S.',
              'Cai W.',
              'Galanello R.',
              'Cao A.',
              'de Mattia D.',
              'Schettini F.',
              'Martini G.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '7959695',
              },
              {
                database: 'DOI',
                id: '10.1007/bf00211027',
              },
            ],
            title:
              'A novel single-base mutation in the glucose 6-phosphate dehydrogenase gene is associated with chronic non-spherocytic haemolytic anaemia.',
            publicationDate: '1994',
            journal: 'Hum. Genet.',
            firstPage: '560',
            lastPage: '562',
            volume: '94',
          },
          referencePositions: ['VARIANT NSHA LEU-396'],
        },
        {
          referenceNumber: 46,
          citation: {
            id: '7825590',
            citationType: 'journal article',
            authors: [
              'Ganczakowski M.',
              'Town M.',
              'Bowden D.K.',
              'Vulliamy T.J.',
              'Kaneko A.',
              'Clegg J.B.',
              'Weatherall D.J.',
              'Luzzatto L.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '7825590',
              },
            ],
            title:
              'Multiple glucose 6-phosphate dehydrogenase-deficient variants correlate with malaria endemicity in the Vanuatu archipelago (southwestern Pacific).',
            publicationDate: '1995',
            journal: 'Am. J. Hum. Genet.',
            firstPage: '294',
            lastPage: '301',
            volume: '56',
          },
          referencePositions: ['VARIANTS NAMORU; VANUA LAVA; NAONE AND UNION'],
        },
        {
          referenceNumber: 47,
          citation: {
            id: '8533762',
            citationType: 'journal article',
            authors: [
              'Kaeda J.S.',
              'Chhotray G.P.',
              'Ranjit M.R.',
              'Bautista J.M.',
              'Reddy P.H.',
              'Stevens D.',
              'Naidu J.M.',
              'Britt R.P.',
              'Vulliamy T.J.',
              'Luzzatto L.',
              'Mason P.J.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '8533762',
              },
            ],
            title:
              'A new glucose-6-phosphate dehydrogenase variant, G6PD Orissa (44 Ala-->Gly), is the major polymorphic variant in tribal populations in India.',
            publicationDate: '1995',
            journal: 'Am. J. Hum. Genet.',
            firstPage: '1335',
            lastPage: '1341',
            volume: '57',
          },
          referencePositions: ['VARIANT NSHA GLY-44'],
        },
        {
          referenceNumber: 48,
          citation: {
            id: '7858267',
            citationType: 'journal article',
            authors: [
              'Mason P.J.',
              'Sonati M.F.',
              'Macdonald D.',
              'Lanza C.',
              'Busutil D.',
              'Town M.',
              'Corcoran C.M.',
              'Kaeda J.S.',
              'Stevens D.J.',
              'Al-Ismail S.',
              'Altay C.',
              'Hatton C.',
              'Lewis D.S.',
              'McMullin M.F.',
              'Meloni T.',
              'Paul B.',
              'Pippard M.',
              'Prentice A.G.',
              'Vulliamy T.J.',
              'Luzzatto L.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '7858267',
              },
            ],
            title:
              'New glucose-6-phosphate dehydrogenase mutations associated with chronic anemia.',
            publicationDate: '1995',
            journal: 'Blood',
            firstPage: '1377',
            lastPage: '1380',
            volume: '85',
          },
          referencePositions: [
            'VARIANTS NSHA PRO-75; ASP-163; LYS-274 AND PHE-278',
          ],
        },
        {
          referenceNumber: 49,
          citation: {
            id: '9452072',
            citationType: 'journal article',
            authors: ['Vlachos A.', 'Westwood B.', 'Lipton J.M.', 'Beutler E.'],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '9452072',
              },
              {
                database: 'DOI',
                id: '10.1002/humu.1380110151',
              },
            ],
            title:
              'G6PD Mount Sinai: a new severe hemolytic variant characterized by dual mutations at nucleotides 376G and 1159T (N126D).',
            publicationDate: '1998',
            journal: 'Hum. Mutat. Suppl.',
            firstPage: 'S154',
            lastPage: 'S155',
            volume: '1',
          },
          referencePositions: ['VARIANT NSHA CYS-387', 'VARIANT ASP-126'],
        },
        {
          referenceNumber: 50,
          citation: {
            id: '10627140',
            citationType: 'journal article',
            authors: [
              'Galanello R.',
              'Loi D.',
              'Sollaino C.',
              'Dessi S.',
              'Cao A.',
              'Melis M.A.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '10627140',
              },
            ],
            title:
              'A new glucose 6 phosphate dehydrogenase variant, G6PD Sinnai (34 G->T).',
            publicationDate: '1998',
            journal: 'Hum. Mutat.',
            firstPage: '72',
            lastPage: '73',
            volume: '12',
          },
          referencePositions: ['VARIANT SINNAI LEU-12'],
        },
        {
          referenceNumber: 51,
          citation: {
            id: '11112389',
            citationType: 'journal article',
            authors: [
              'Iancovici-Kidon M.',
              'Sthoeger D.',
              'Abrahamov A.',
              'Volach B.',
              'Beutler E.',
              'Gelbart T.',
              'Barak Y.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '11112389',
              },
              {
                database: 'DOI',
                id: '10.1006/bcmd.2000.0334',
              },
            ],
            title:
              "A new exon 9 glucose-6-phosphate dehydrogenase mutation (G6PD 'Rehovot') in a Jewish Ethiopian family with variable phenotypes.",
            publicationDate: '2000',
            journal: 'Blood Cells Mol. Dis.',
            firstPage: '567',
            lastPage: '571',
            volume: '26',
          },
          referencePositions: ['VARIANT REHOVOT HIS-322'],
        },
        {
          referenceNumber: 52,
          citation: {
            id: '18043863',
            citationType: 'journal article',
            authors: [
              'Chalvam R.',
              'Kedar P.S.',
              'Colah R.B.',
              'Ghosh K.',
              'Mukherjee M.B.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '18043863',
              },
              {
                database: 'DOI',
                id: '10.1007/s10038-007-0225-3',
              },
            ],
            title:
              'A novel R198H mutation in the glucose-6-phosphate dehydrogenase gene in the tribal groups of the Nilgiris in Southern India.',
            publicationDate: '2008',
            journal: 'J. Hum. Genet.',
            firstPage: '181',
            lastPage: '184',
            volume: '53',
          },
          referencePositions: [
            'VARIANT NILGIRIS HIS-198',
            'VARIANT COIMBRA CYS-198',
          ],
        },
        {
          referenceNumber: 53,
          citation: {
            id: '20007901',
            citationType: 'journal article',
            authors: [
              'Louicharoen C.',
              'Patin E.',
              'Paul R.',
              'Nuchprayoon I.',
              'Witoonpanich B.',
              'Peerapittayamongkol C.',
              'Casademont I.',
              'Sura T.',
              'Laird N.M.',
              'Singhasivanon P.',
              'Quintana-Murci L.',
              'Sakuntabhai A.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '20007901',
              },
              {
                database: 'DOI',
                id: '10.1126/science.1178849',
              },
            ],
            title:
              'Positively selected G6PD-Mahidol mutation reduces Plasmodium vivax density in Southeast Asians.',
            publicationDate: '2009',
            journal: 'Science',
            firstPage: '1546',
            lastPage: '1549',
            volume: '326',
          },
          referencePositions: [
            'ASSOCIATION OF VARIANT NSHA SER-163 WITH REDUCED DENSITY OF PLASMODIUM VIVAX',
          ],
        },
        {
          referenceNumber: 54,
          citation: {
            id: '26479991',
            citationType: 'journal article',
            authors: [
              'Warny M.',
              'Lausen B.',
              'Birgens H.',
              'Knabe N.',
              'Petersen J.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '26479991',
              },
              {
                database: 'DOI',
                id: '10.1097/mph.0000000000000435',
              },
            ],
            title:
              'Severe G6PD Deficiency Due to a New Missense Mutation in an Infant of Northern European Descent.',
            publicationDate: '2015',
            journal: 'J. Pediatr. Hematol. Oncol.',
            firstPage: 'E497',
            lastPage: 'E499',
            volume: '37',
          },
          referencePositions: [
            'VARIANT NSHA SER-198',
            'CHARACTERIZATION OF VARIANT NSHA SER-198',
            'FUNCTION',
            'CATALYTIC ACTIVITY',
          ],
        },
        {
          referenceNumber: 55,
          citation: {
            id: '27535533',
            citationType: 'journal article',
            authoringGroup: ['Exome Aggregation Consortium'],
            authors: [
              'Lek M.',
              'Karczewski K.J.',
              'Minikel E.V.',
              'Samocha K.E.',
              'Banks E.',
              'Fennell T.',
              "O'Donnell-Luria A.H.",
              'Ware J.S.',
              'Hill A.J.',
              'Cummings B.B.',
              'Tukiainen T.',
              'Birnbaum D.P.',
              'Kosmicki J.A.',
              'Duncan L.E.',
              'Estrada K.',
              'Zhao F.',
              'Zou J.',
              'Pierce-Hoffman E.',
              'Berghout J.',
              'Cooper D.N.',
              'Deflaux N.',
              'DePristo M.',
              'Do R.',
              'Flannick J.',
              'Fromer M.',
              'Gauthier L.',
              'Goldstein J.',
              'Gupta N.',
              'Howrigan D.',
              'Kiezun A.',
              'Kurki M.I.',
              'Moonshine A.L.',
              'Natarajan P.',
              'Orozco L.',
              'Peloso G.M.',
              'Poplin R.',
              'Rivas M.A.',
              'Ruano-Rubio V.',
              'Rose S.A.',
              'Ruderfer D.M.',
              'Shakir K.',
              'Stenson P.D.',
              'Stevens C.',
              'Thomas B.P.',
              'Tiao G.',
              'Tusie-Luna M.T.',
              'Weisburd B.',
              'Won H.H.',
              'Yu D.',
              'Altshuler D.M.',
              'Ardissino D.',
              'Boehnke M.',
              'Danesh J.',
              'Donnelly S.',
              'Elosua R.',
              'Florez J.C.',
              'Gabriel S.B.',
              'Getz G.',
              'Glatt S.J.',
              'Hultman C.M.',
              'Kathiresan S.',
              'Laakso M.',
              'McCarroll S.',
              'McCarthy M.I.',
              'McGovern D.',
              'McPherson R.',
              'Neale B.M.',
              'Palotie A.',
              'Purcell S.M.',
              'Saleheen D.',
              'Scharf J.M.',
              'Sklar P.',
              'Sullivan P.F.',
              'Tuomilehto J.',
              'Tsuang M.T.',
              'Watkins H.C.',
              'Wilson J.G.',
              'Daly M.J.',
              'MacArthur D.G.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '27535533',
              },
              {
                database: 'DOI',
                id: '10.1038/nature19057',
              },
            ],
            title:
              'Analysis of protein-coding genetic variation in 60,706 humans.',
            publicationDate: '2016',
            journal: 'Nature',
            firstPage: '285',
            lastPage: '291',
            volume: '536',
          },
          referencePositions: ['VARIANT ASP-126'],
        },
        {
          referenceNumber: 56,
          citation: {
            id: 'CI-1OF6HQJVGJ9D8',
            citationType: 'journal article',
            authors: [
              'Devendra R.',
              'Shanmugam R.',
              'Singh M.P.S.S.',
              'Vishwakarma C.P.',
              'Godbhole S.',
              'Singh N.',
              'Gupta V.',
              'Kedar P.',
              'Mukherjee M.B.',
            ],
            title:
              'Identification of a novel S184F mutation causing glucose-6-phosphate-dehydrogenase deficiency in a tribal family of Madhya Pradesh, Central India.',
            publicationDate: '2017',
            journal: 'Meta Gene',
            firstPage: '130',
            lastPage: '133',
            volume: '12',
          },
          referencePositions: [
            'VARIANT DINDORI PHE-184',
            'CHARACTERIZATION OF VARIANT DINDORI PHE-184',
            'VARIANT KAIPING HIS-463',
          ],
        },
        {
          referenceNumber: 57,
          citation: {
            id: '29333274',
            citationType: 'journal article',
            authors: ['Canu G.', 'Mazzuccato G.', 'Urbani A.', 'Minucci A.'],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '29333274',
              },
              {
                database: 'DOI',
                id: '10.1038/hgv.2017.57',
              },
            ],
            title:
              'Report of an Italian family carrying a typical Indian variant of the Nilgiris tribal groups resulting from a de novo occurrence.',
            publicationDate: '2018',
            journal: 'Hum. Genome Var.',
            firstPage: '17057',
            lastPage: '17057',
            volume: '5',
          },
          referencePositions: ['VARIANT NILGIRIS HIS-198'],
        },
        {
          referenceNumber: 58,
          citation: {
            id: '30988594',
            citationType: 'journal article',
            authors: [
              'Devendra R.',
              'Warang P.',
              'Gupta V.',
              'Chiddarwar A.',
              'Kedar P.',
              'Agarwal M.B.',
              'Mukherjee M.B.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '30988594',
              },
              {
                database: 'DOI',
                id: '10.1007/s12288-018-1049-3',
              },
            ],
            title:
              'A novel G6PD p.Gly321Val mutation causing severe hemolysis in an Indian infant.',
            publicationDate: '2019',
            journal: 'Indian J. Hematol. Blood Transfus.',
            firstPage: '399',
            lastPage: '401',
            volume: '35',
          },
          referencePositions: [
            'VARIANT NSHA VAL-321',
            'CHARACTERIZATION OF VARIANT NSHA VAL-321',
          ],
        },
        {
          referenceNumber: 59,
          citation: {
            id: '38066190',
            citationType: 'journal article',
            authors: [
              'Zgheib O.',
              'Chamchoy K.',
              'Nouspikel T.',
              'Blouin J.L.',
              'Cimasoni L.',
              'Quteineh L.',
              'Boonyuen U.',
            ],
            citationCrossReferences: [
              {
                database: 'PubMed',
                id: '38066190',
              },
              {
                database: 'DOI',
                id: '10.1038/s42003-023-05599-z',
              },
            ],
            title:
              'Substitution of arginine 219 by glycine compromises stability, dimerization, and catalytic activity in a G6PD mutant.',
            publicationDate: '2023',
            journal: 'Commun. Biol.',
            firstPage: '1245',
            lastPage: '1245',
            volume: '6',
          },
          referencePositions: [
            'VARIANT NSHA GLY-219',
            'CHARACTERIZATION OF VARIANT NSHA GLY-219',
            'FUNCTION',
            'CATALYTIC ACTIVITY',
            'BIOPHYSICOCHEMICAL PROPERTIES',
            'SUBUNIT',
          ],
        },
      ],
      uniProtKBCrossReferences: [
        {
          database: 'EMBL',
          id: 'X03674',
          properties: [
            {
              key: 'ProteinId',
              value: 'CAA27309.1',
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
          id: 'M65234',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAA63175.1',
            },
            {
              key: 'Status',
              value: 'ALT_INIT',
            },
            {
              key: 'MoleculeType',
              value: 'Genomic_DNA',
            },
          ],
        },
        {
          database: 'EMBL',
          id: 'M26749',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAA63175.1',
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
          id: 'M26750',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAA63175.1',
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
          id: 'M65225',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAA63175.1',
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
          id: 'M65226',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAA63175.1',
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
          id: 'M65227',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAA63175.1',
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
          id: 'M65228',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAA63175.1',
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
          id: 'M65229',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAA63175.1',
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
          id: 'M65230',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAA63175.1',
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
          id: 'M65231',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAA63175.1',
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
          id: 'M65233',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAA63175.1',
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
          id: 'M65232',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAA63175.1',
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
          id: 'M21248',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAA52500.1',
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
          id: 'M19866',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAA52501.1',
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
          id: 'X55448',
          properties: [
            {
              key: 'ProteinId',
              value: 'CAA39089.1',
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
          id: 'L44140',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAA92653.1',
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
          id: 'AF277315',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAL27011.1',
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
          id: 'CH471172',
          properties: [
            {
              key: 'ProteinId',
              value: 'EAW72682.1',
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
          id: 'CH471172',
          properties: [
            {
              key: 'ProteinId',
              value: 'EAW72686.1',
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
          id: 'BC000337',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAH00337.1',
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
          id: 'M27940',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAA52504.1',
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
          id: 'S58359',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAB26169.1',
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
          id: 'X53815',
          properties: [
            {
              key: 'ProteinId',
              value: 'CAA37811.1',
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
          id: 'S64462',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAB20299.1',
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
          id: 'AY158096',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAN76367.1',
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
          id: 'AY158097',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAN76368.1',
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
          id: 'AY158098',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAN76369.1',
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
          id: 'AY158099',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAN76370.1',
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
          id: 'AY158100',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAN76371.1',
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
          id: 'AY158101',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAN76372.1',
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
          id: 'AY158102',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAN76373.1',
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
          id: 'AY158103',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAN76374.1',
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
          id: 'AY158104',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAN76375.1',
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
          id: 'AY158105',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAN76376.1',
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
          id: 'AY158106',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAN76377.1',
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
          id: 'AY158107',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAN76378.1',
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
          id: 'AY158108',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAN76379.1',
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
          id: 'AY158109',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAN76380.1',
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
          id: 'AY158110',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAN76381.1',
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
          id: 'AY158111',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAN76382.1',
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
          id: 'AY158112',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAN76383.1',
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
          id: 'AY158113',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAN76384.1',
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
          id: 'AY158114',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAN76385.1',
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
          id: 'AY158115',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAN76386.1',
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
          id: 'AY158116',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAN76387.1',
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
          id: 'AY158117',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAN76388.1',
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
          id: 'AY158118',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAN76389.1',
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
          id: 'AY158119',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAN76390.1',
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
          id: 'AY158120',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAN76391.1',
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
          id: 'AY158121',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAN76392.1',
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
          id: 'AY158122',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAN76393.1',
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
          id: 'AY158123',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAN76394.1',
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
          id: 'AY158124',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAN76395.1',
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
          id: 'AY158125',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAN76396.1',
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
          id: 'AY158126',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAN76397.1',
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
          id: 'AY158127',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAN76398.1',
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
          id: 'AY158128',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAN76399.1',
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
          id: 'AY158129',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAN76400.1',
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
          id: 'AY158130',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAN76401.1',
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
          id: 'AY158131',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAN76402.1',
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
          id: 'AY158132',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAN76403.1',
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
          id: 'AY158133',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAN76404.1',
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
          id: 'AY158134',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAN76405.1',
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
          id: 'AY158135',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAN76406.1',
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
          id: 'AY158136',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAN76407.1',
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
          id: 'AY158137',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAN76408.1',
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
          id: 'AY158138',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAN76409.1',
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
          id: 'AY158139',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAN76410.1',
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
          id: 'AY158140',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAN76411.1',
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
          id: 'AY158141',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAN76412.1',
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
          id: 'AY158142',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAN76413.1',
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
          id: 'M12996',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAA52499.1',
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
          id: 'M23423',
          properties: [
            {
              key: 'ProteinId',
              value: 'AAB59390.1',
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
          id: 'CCDS44023.1',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
          isoformId: 'P11413-1',
        },
        {
          database: 'PIR',
          id: 'A40309',
          properties: [
            {
              key: 'EntryName',
              value: 'DEHUG6',
            },
          ],
        },
        {
          database: 'RefSeq',
          id: 'NP_000393.4',
          properties: [
            {
              key: 'NucleotideSequenceId',
              value: 'NM_000402.4',
            },
          ],
          isoformId: 'P11413-3',
        },
        {
          database: 'RefSeq',
          id: 'NP_001035810.1',
          properties: [
            {
              key: 'NucleotideSequenceId',
              value: 'NM_001042351.2',
            },
          ],
          isoformId: 'P11413-1',
        },
        {
          database: 'PDB',
          id: '1QKI',
          properties: [
            {
              key: 'Method',
              value: 'X-ray',
            },
            {
              key: 'Resolution',
              value: '3.00 A',
            },
            {
              key: 'Chains',
              value: 'A/B/C/D/E/F/G/H=2-515',
            },
          ],
        },
        {
          database: 'PDB',
          id: '2BH9',
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
              value: 'A=27-515',
            },
          ],
        },
        {
          database: 'PDB',
          id: '2BHL',
          properties: [
            {
              key: 'Method',
              value: 'X-ray',
            },
            {
              key: 'Resolution',
              value: '2.90 A',
            },
            {
              key: 'Chains',
              value: 'A/B=28-515',
            },
          ],
        },
        {
          database: 'PDB',
          id: '5UKW',
          properties: [
            {
              key: 'Method',
              value: 'X-ray',
            },
            {
              key: 'Resolution',
              value: '2.65 A',
            },
            {
              key: 'Chains',
              value: 'A=29-511',
            },
          ],
        },
        {
          database: 'PDB',
          id: '6E07',
          properties: [
            {
              key: 'Method',
              value: 'X-ray',
            },
            {
              key: 'Resolution',
              value: '2.60 A',
            },
            {
              key: 'Chains',
              value: 'B/C/F/L/N/Q/T/W=1-515',
            },
          ],
        },
        {
          database: 'PDB',
          id: '6E08',
          properties: [
            {
              key: 'Method',
              value: 'X-ray',
            },
            {
              key: 'Resolution',
              value: '1.90 A',
            },
            {
              key: 'Chains',
              value: 'L=1-515',
            },
          ],
        },
        {
          database: 'PDB',
          id: '6JYU',
          properties: [
            {
              key: 'Method',
              value: 'X-ray',
            },
            {
              key: 'Resolution',
              value: '1.89 A',
            },
            {
              key: 'Chains',
              value: 'A=29-513',
            },
          ],
        },
        {
          database: 'PDB',
          id: '6VA0',
          properties: [
            {
              key: 'Method',
              value: 'X-ray',
            },
            {
              key: 'Resolution',
              value: '3.10 A',
            },
            {
              key: 'Chains',
              value: 'A=1-515',
            },
          ],
        },
        {
          database: 'PDB',
          id: '6VA7',
          properties: [
            {
              key: 'Method',
              value: 'X-ray',
            },
            {
              key: 'Resolution',
              value: '3.07 A',
            },
            {
              key: 'Chains',
              value: 'A=1-515',
            },
          ],
        },
        {
          database: 'PDB',
          id: '6VA8',
          properties: [
            {
              key: 'Method',
              value: 'X-ray',
            },
            {
              key: 'Resolution',
              value: '3.95 A',
            },
            {
              key: 'Chains',
              value: 'A=1-515',
            },
          ],
        },
        {
          database: 'PDB',
          id: '6VA9',
          properties: [
            {
              key: 'Method',
              value: 'X-ray',
            },
            {
              key: 'Resolution',
              value: '3.95 A',
            },
            {
              key: 'Chains',
              value: 'A=1-515',
            },
          ],
        },
        {
          database: 'PDB',
          id: '6VAQ',
          properties: [
            {
              key: 'Method',
              value: 'X-ray',
            },
            {
              key: 'Resolution',
              value: '2.95 A',
            },
            {
              key: 'Chains',
              value: 'A=1-515',
            },
          ],
        },
        {
          database: 'PDB',
          id: '7SEH',
          properties: [
            {
              key: 'Method',
              value: 'X-ray',
            },
            {
              key: 'Resolution',
              value: '2.90 A',
            },
            {
              key: 'Chains',
              value: 'A/B=1-515',
            },
          ],
        },
        {
          database: 'PDB',
          id: '7SEI',
          properties: [
            {
              key: 'Method',
              value: 'X-ray',
            },
            {
              key: 'Resolution',
              value: '3.65 A',
            },
            {
              key: 'Chains',
              value: 'A=1-515',
            },
          ],
        },
        {
          database: 'PDB',
          id: '7SNF',
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
              value: 'A/B=1-515',
            },
          ],
        },
        {
          database: 'PDB',
          id: '7SNG',
          properties: [
            {
              key: 'Method',
              value: 'EM',
            },
            {
              key: 'Resolution',
              value: '2.80 A',
            },
            {
              key: 'Chains',
              value: 'A/B/C/D=1-515',
            },
          ],
        },
        {
          database: 'PDB',
          id: '7SNH',
          properties: [
            {
              key: 'Method',
              value: 'EM',
            },
            {
              key: 'Resolution',
              value: '2.20 A',
            },
            {
              key: 'Chains',
              value: 'A/B/C/D=1-515',
            },
          ],
        },
        {
          database: 'PDB',
          id: '7SNI',
          properties: [
            {
              key: 'Method',
              value: 'EM',
            },
            {
              key: 'Resolution',
              value: '2.50 A',
            },
            {
              key: 'Chains',
              value: 'A/B/C/D=1-515',
            },
          ],
        },
        {
          database: 'PDB',
          id: '7TOE',
          properties: [
            {
              key: 'Method',
              value: 'EM',
            },
            {
              key: 'Resolution',
              value: '3.00 A',
            },
            {
              key: 'Chains',
              value: 'A/B/C/D=1-515',
            },
          ],
        },
        {
          database: 'PDB',
          id: '7TOF',
          properties: [
            {
              key: 'Method',
              value: 'EM',
            },
            {
              key: 'Resolution',
              value: '3.70 A',
            },
            {
              key: 'Chains',
              value: 'A/B=1-515',
            },
          ],
        },
        {
          database: 'PDB',
          id: '7UAG',
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
              value: 'A/B=1-515',
            },
          ],
        },
        {
          database: 'PDB',
          id: '7UAL',
          properties: [
            {
              key: 'Method',
              value: 'EM',
            },
            {
              key: 'Resolution',
              value: '2.90 A',
            },
            {
              key: 'Chains',
              value: 'A/B/C/D=1-515',
            },
          ],
        },
        {
          database: 'PDB',
          id: '7UC2',
          properties: [
            {
              key: 'Method',
              value: 'EM',
            },
            {
              key: 'Resolution',
              value: '2.50 A',
            },
            {
              key: 'Chains',
              value: 'A/B/C/D=1-515',
            },
          ],
        },
        {
          database: 'PDB',
          id: '7ZVD',
          properties: [
            {
              key: 'Method',
              value: 'X-ray',
            },
            {
              key: 'Resolution',
              value: '2.46 A',
            },
            {
              key: 'Chains',
              value: 'N=28-511',
            },
          ],
        },
        {
          database: 'PDBsum',
          id: '1QKI',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'PDBsum',
          id: '2BH9',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'PDBsum',
          id: '2BHL',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'PDBsum',
          id: '5UKW',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'PDBsum',
          id: '6E07',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'PDBsum',
          id: '6E08',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'PDBsum',
          id: '6JYU',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'PDBsum',
          id: '6VA0',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'PDBsum',
          id: '6VA7',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'PDBsum',
          id: '6VA8',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'PDBsum',
          id: '6VA9',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'PDBsum',
          id: '6VAQ',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'PDBsum',
          id: '7SEH',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'PDBsum',
          id: '7SEI',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'PDBsum',
          id: '7SNF',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'PDBsum',
          id: '7SNG',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'PDBsum',
          id: '7SNH',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'PDBsum',
          id: '7SNI',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'PDBsum',
          id: '7TOE',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'PDBsum',
          id: '7TOF',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'PDBsum',
          id: '7UAG',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'PDBsum',
          id: '7UAL',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'PDBsum',
          id: '7UC2',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'PDBsum',
          id: '7ZVD',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'AlphaFoldDB',
          id: 'P11413',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'EMDB',
          id: 'EMD-25224',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'EMDB',
          id: 'EMD-25225',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'EMDB',
          id: 'EMD-25226',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'EMDB',
          id: 'EMD-25227',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'EMDB',
          id: 'EMD-26030',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'EMDB',
          id: 'EMD-26031',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'EMDB',
          id: 'EMD-26428',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'EMDB',
          id: 'EMD-26442',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'SASBDB',
          id: 'P11413',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'SMR',
          id: 'P11413',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'BioGRID',
          id: '108814',
          properties: [
            {
              key: 'Interactions',
              value: '197',
            },
          ],
        },
        {
          database: 'IntAct',
          id: 'P11413',
          properties: [
            {
              key: 'Interactions',
              value: '29',
            },
          ],
        },
        {
          database: 'MINT',
          id: 'P11413',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'STRING',
          id: '9606.ENSP00000377192',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'BindingDB',
          id: 'P11413',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'ChEMBL',
          id: 'CHEMBL5347',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'DrugBank',
          id: 'DB05107',
          properties: [
            {
              key: 'GenericName',
              value: '16-Bromoepiandrosterone',
            },
          ],
        },
        {
          database: 'DrugBank',
          id: 'DB11638',
          properties: [
            {
              key: 'GenericName',
              value: 'Artenimol',
            },
          ],
        },
        {
          database: 'DrugBank',
          id: 'DB03085',
          properties: [
            {
              key: 'GenericName',
              value: 'Glycolic acid',
            },
          ],
        },
        {
          database: 'DrugBank',
          id: 'DB03461',
          properties: [
            {
              key: 'GenericName',
              value: 'Nicotinamide adenine dinucleotide phosphate',
            },
          ],
        },
        {
          database: 'DrugCentral',
          id: 'P11413',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'GlyCosmos',
          id: 'P11413',
          properties: [
            {
              key: 'glycosylation',
              value: '1 site, 1 glycan',
            },
          ],
        },
        {
          database: 'GlyGen',
          id: 'P11413',
          properties: [
            {
              key: 'glycosylation',
              value: '1 site, 1 O-linked glycan (1 site)',
            },
          ],
        },
        {
          database: 'iPTMnet',
          id: 'P11413',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'MetOSite',
          id: 'P11413',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'PhosphoSitePlus',
          id: 'P11413',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'SwissPalm',
          id: 'P11413',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'BioMuta',
          id: 'G6PD',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'DMDM',
          id: '116242483',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'REPRODUCTION-2DPAGE',
          id: 'IPI00289800',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'CPTAC',
          id: 'CPTAC-204',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'CPTAC',
          id: 'CPTAC-205',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'CPTAC',
          id: 'CPTAC-2734',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'EPD',
          id: 'P11413',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'jPOST',
          id: 'P11413',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'MassIVE',
          id: 'P11413',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'MaxQB',
          id: 'P11413',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'PaxDb',
          id: '9606-ENSP00000377192',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'PeptideAtlas',
          id: 'P11413',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'ProteomicsDB',
          id: '52771',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
          isoformId: 'P11413-1',
        },
        {
          database: 'ProteomicsDB',
          id: '52772',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
          isoformId: 'P11413-2',
        },
        {
          database: 'ProteomicsDB',
          id: '52773',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
          isoformId: 'P11413-3',
        },
        {
          database: 'Pumba',
          id: 'P11413',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'Antibodypedia',
          id: '352',
          properties: [
            {
              key: 'antibodies',
              value: '796 antibodies from 40 providers',
            },
          ],
        },
        {
          database: 'DNASU',
          id: '2539',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'Ensembl',
          id: 'ENST00000369620.6',
          properties: [
            {
              key: 'ProteinId',
              value: 'ENSP00000358633.2',
            },
            {
              key: 'GeneId',
              value: 'ENSG00000160211.20',
            },
          ],
          isoformId: 'P11413-2',
        },
        {
          database: 'Ensembl',
          id: 'ENST00000393562.10',
          properties: [
            {
              key: 'ProteinId',
              value: 'ENSP00000377192.3',
            },
            {
              key: 'GeneId',
              value: 'ENSG00000160211.20',
            },
          ],
          isoformId: 'P11413-1',
        },
        {
          database: 'Ensembl',
          id: 'ENST00000393564.7',
          properties: [
            {
              key: 'ProteinId',
              value: 'ENSP00000377194.2',
            },
            {
              key: 'GeneId',
              value: 'ENSG00000160211.20',
            },
          ],
          isoformId: 'P11413-1',
        },
        {
          database: 'Ensembl',
          id: 'ENST00000696429.1',
          properties: [
            {
              key: 'ProteinId',
              value: 'ENSP00000512624.1',
            },
            {
              key: 'GeneId',
              value: 'ENSG00000160211.20',
            },
          ],
          isoformId: 'P11413-1',
        },
        {
          database: 'Ensembl',
          id: 'ENST00000696430.1',
          properties: [
            {
              key: 'ProteinId',
              value: 'ENSP00000512625.1',
            },
            {
              key: 'GeneId',
              value: 'ENSG00000160211.20',
            },
          ],
          isoformId: 'P11413-1',
        },
        {
          database: 'GeneID',
          id: '2539',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'KEGG',
          id: 'hsa:2539',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'MANE-Select',
          id: 'ENST00000393562.10',
          properties: [
            {
              key: 'ProteinId',
              value: 'ENSP00000377192.3',
            },
            {
              key: 'RefSeqNucleotideId',
              value: 'NM_001360016.2',
            },
            {
              key: 'RefSeqProteinId',
              value: 'NP_001346945.1',
            },
          ],
        },
        {
          database: 'UCSC',
          id: 'uc004flx.3',
          properties: [
            {
              key: 'OrganismName',
              value: 'human',
            },
          ],
          isoformId: 'P11413-1',
        },
        {
          database: 'AGR',
          id: 'HGNC:4057',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'CTD',
          id: '2539',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'DisGeNET',
          id: '2539',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'GeneCards',
          id: 'G6PD',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'HGNC',
          id: 'HGNC:4057',
          properties: [
            {
              key: 'GeneName',
              value: 'G6PD',
            },
          ],
        },
        {
          database: 'HPA',
          id: 'ENSG00000160211',
          properties: [
            {
              key: 'ExpressionPatterns',
              value: 'Low tissue specificity',
            },
          ],
        },
        {
          database: 'MalaCards',
          id: 'G6PD',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'MIM',
          id: '300908',
          properties: [
            {
              key: 'Type',
              value: 'phenotype',
            },
          ],
        },
        {
          database: 'MIM',
          id: '305900',
          properties: [
            {
              key: 'Type',
              value: 'gene',
            },
          ],
        },
        {
          database: 'neXtProt',
          id: 'NX_P11413',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'OpenTargets',
          id: 'ENSG00000160211',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'Orphanet',
          id: '466026',
          properties: [
            {
              key: 'Disease',
              value: 'Class I glucose-6-phosphate dehydrogenase deficiency',
            },
          ],
        },
        {
          database: 'Orphanet',
          id: '362',
          properties: [
            {
              key: 'Disease',
              value:
                'NON RARE IN EUROPE: Glucose-6-phosphate-dehydrogenase deficiency',
            },
          ],
        },
        {
          database: 'PharmGKB',
          id: 'PA28469',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'VEuPathDB',
          id: 'HostDB:ENSG00000160211',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'eggNOG',
          id: 'KOG0563',
          properties: [
            {
              key: 'ToxonomicScope',
              value: 'Eukaryota',
            },
          ],
        },
        {
          database: 'GeneTree',
          id: 'ENSGT00530000063435',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'HOGENOM',
          id: 'CLU_013524_2_3_1',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'InParanoid',
          id: 'P11413',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'OMA',
          id: 'ERAGYYE',
          properties: [
            {
              key: 'Fingerprint',
              value: '-',
            },
          ],
        },
        {
          database: 'OrthoDB',
          id: '989808at2759',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'PhylomeDB',
          id: 'P11413',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'TreeFam',
          id: 'TF300584',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'BioCyc',
          id: 'MetaCyc:HS08467-MONOMER',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'BRENDA',
          id: '1.1.1.49',
          properties: [
            {
              key: 'OrganismId',
              value: '2681',
            },
          ],
        },
        {
          database: 'PathwayCommons',
          id: 'P11413',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'Reactome',
          id: 'R-HSA-5628897',
          properties: [
            {
              key: 'PathwayName',
              value: 'TP53 Regulates Metabolic Genes',
            },
          ],
        },
        {
          database: 'Reactome',
          id: 'R-HSA-71336',
          properties: [
            {
              key: 'PathwayName',
              value: 'Pentose phosphate pathway',
            },
          ],
        },
        {
          database: 'Reactome',
          id: 'R-HSA-9818028',
          properties: [
            {
              key: 'PathwayName',
              value: 'NFE2L2 regulates pentose phosphate pathway genes',
            },
          ],
        },
        {
          database: 'SABIO-RK',
          id: 'P11413',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'SignaLink',
          id: 'P11413',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'SIGNOR',
          id: 'P11413',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'UniPathway',
          id: 'UPA00115',
          properties: [
            {
              key: 'RectionId',
              value: 'UER00408',
            },
          ],
        },
        {
          database: 'BioGRID-ORCS',
          id: '2539',
          properties: [
            {
              key: 'hits',
              value: '93 hits in 797 CRISPR screens',
            },
          ],
        },
        {
          database: 'ChiTaRS',
          id: 'G6PD',
          properties: [
            {
              key: 'OrganismName',
              value: 'human',
            },
          ],
        },
        {
          database: 'EvolutionaryTrace',
          id: 'P11413',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'GeneWiki',
          id: 'Glucose-6-phosphate_dehydrogenase',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'GenomeRNAi',
          id: '2539',
          properties: [
            {
              key: 'Description',
              value: '-',
            },
          ],
        },
        {
          database: 'Pharos',
          id: 'P11413',
          properties: [
            {
              key: 'DevelopmentLevel',
              value: 'Tchem',
            },
          ],
        },
        {
          database: 'PRO',
          id: 'PR:P11413',
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
              value: 'Chromosome X',
            },
          ],
        },
        {
          database: 'RNAct',
          id: 'P11413',
          properties: [
            {
              key: 'moleculeType',
              value: 'Protein',
            },
          ],
        },
        {
          database: 'Bgee',
          id: 'ENSG00000160211',
          properties: [
            {
              key: 'ExpressionPatterns',
              value:
                'Expressed in stromal cell of endometrium and 143 other cell types or tissues',
            },
          ],
        },
        {
          database: 'ExpressionAtlas',
          id: 'P11413',
          properties: [
            {
              key: 'ExpressionPatterns',
              value: 'baseline and differential',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0034451',
          properties: [
            {
              key: 'GoTerm',
              value: 'C:centriolar satellite',
            },
            {
              key: 'GoEvidenceType',
              value: 'IDA:HPA',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0005737',
          properties: [
            {
              key: 'GoTerm',
              value: 'C:cytoplasm',
            },
            {
              key: 'GoEvidenceType',
              value: 'IDA:LIFEdb',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0009898',
          properties: [
            {
              key: 'GoTerm',
              value: 'C:cytoplasmic side of plasma membrane',
            },
            {
              key: 'GoEvidenceType',
              value: 'IDA:BHF-UCL',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000314',
              source: 'PubMed',
              id: '743300',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0005829',
          properties: [
            {
              key: 'GoTerm',
              value: 'C:cytosol',
            },
            {
              key: 'GoEvidenceType',
              value: 'IDA:HPA',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000314',
              source: 'PubMed',
              id: '35122041',
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
            {
              evidenceCode: 'ECO:0007005',
              source: 'PubMed',
              id: '23533145',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0043231',
          properties: [
            {
              key: 'GoTerm',
              value: 'C:intracellular membrane-bounded organelle',
            },
            {
              key: 'GoEvidenceType',
              value: 'IDA:HPA',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0016020',
          properties: [
            {
              key: 'GoTerm',
              value: 'C:membrane',
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
              id: '19946888',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0005536',
          properties: [
            {
              key: 'GoTerm',
              value: 'F:glucose binding',
            },
            {
              key: 'GoEvidenceType',
              value: 'IDA:BHF-UCL',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000314',
              source: 'PubMed',
              id: '15858258',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0004345',
          properties: [
            {
              key: 'GoTerm',
              value: 'F:glucose-6-phosphate dehydrogenase activity',
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
              id: '15858258',
            },
            {
              evidenceCode: 'ECO:0000314',
              source: 'PubMed',
              id: '35122041',
            },
            {
              evidenceCode: 'ECO:0000314',
              source: 'PubMed',
              id: '38066190',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0042802',
          properties: [
            {
              key: 'GoTerm',
              value: 'F:identical protein binding',
            },
            {
              key: 'GoEvidenceType',
              value: 'IPI:IntAct',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000353',
              source: 'PubMed',
              id: '24769394',
            },
            {
              evidenceCode: 'ECO:0000353',
              source: 'PubMed',
              id: '25416956',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0050661',
          properties: [
            {
              key: 'GoTerm',
              value: 'F:NADP binding',
            },
            {
              key: 'GoEvidenceType',
              value: 'IDA:BHF-UCL',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000314',
              source: 'PubMed',
              id: '15858258',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0042803',
          properties: [
            {
              key: 'GoTerm',
              value: 'F:protein homodimerization activity',
            },
            {
              key: 'GoEvidenceType',
              value: 'IPI:UniProtKB',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000353',
              source: 'PubMed',
              id: '38066190',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0034599',
          properties: [
            {
              key: 'GoTerm',
              value: 'P:cellular response to oxidative stress',
            },
            {
              key: 'GoEvidenceType',
              value: 'IMP:BHF-UCL',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000315',
              source: 'PubMed',
              id: '17516514',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0006695',
          properties: [
            {
              key: 'GoTerm',
              value: 'P:cholesterol biosynthetic process',
            },
            {
              key: 'GoEvidenceType',
              value: 'IMP:BHF-UCL',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000315',
              source: 'PubMed',
              id: '12027950',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0043249',
          properties: [
            {
              key: 'GoTerm',
              value: 'P:erythrocyte maturation',
            },
            {
              key: 'GoEvidenceType',
              value: 'IMP:BHF-UCL',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000315',
              source: 'PubMed',
              id: '5643703',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0051156',
          properties: [
            {
              key: 'GoTerm',
              value: 'P:glucose 6-phosphate metabolic process',
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
              id: '15858258',
            },
            {
              evidenceCode: 'ECO:0000314',
              source: 'PubMed',
              id: '38066190',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0006006',
          properties: [
            {
              key: 'GoTerm',
              value: 'P:glucose metabolic process',
            },
            {
              key: 'GoEvidenceType',
              value: 'IBA:GO_Central',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0006749',
          properties: [
            {
              key: 'GoTerm',
              value: 'P:glutathione metabolic process',
            },
            {
              key: 'GoEvidenceType',
              value: 'IMP:BHF-UCL',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000315',
              source: 'PubMed',
              id: '17516514',
            },
            {
              evidenceCode: 'ECO:0000315',
              source: 'PubMed',
              id: '2420826',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0006629',
          properties: [
            {
              key: 'GoTerm',
              value: 'P:lipid metabolic process',
            },
            {
              key: 'GoEvidenceType',
              value: 'TAS:BHF-UCL',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000304',
              source: 'PubMed',
              id: '17361089',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0006739',
          properties: [
            {
              key: 'GoTerm',
              value: 'P:NADP metabolic process',
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
              id: '15858258',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0006740',
          properties: [
            {
              key: 'GoTerm',
              value: 'P:NADPH regeneration',
            },
            {
              key: 'GoEvidenceType',
              value: 'IMP:BHF-UCL',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000315',
              source: 'PubMed',
              id: '17516514',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0061052',
          properties: [
            {
              key: 'GoTerm',
              value:
                'P:negative regulation of cell growth involved in cardiac muscle cell development',
            },
            {
              key: 'GoEvidenceType',
              value: 'IEA:Ensembl',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0010734',
          properties: [
            {
              key: 'GoTerm',
              value: 'P:negative regulation of protein glutathionylation',
            },
            {
              key: 'GoEvidenceType',
              value: 'IMP:BHF-UCL',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000315',
              source: 'PubMed',
              id: '17516514',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:2000378',
          properties: [
            {
              key: 'GoTerm',
              value:
                'P:negative regulation of reactive oxygen species metabolic process',
            },
            {
              key: 'GoEvidenceType',
              value: 'IEA:Ensembl',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0019322',
          properties: [
            {
              key: 'GoTerm',
              value: 'P:pentose biosynthetic process',
            },
            {
              key: 'GoEvidenceType',
              value: 'IDA:BHF-UCL',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000314',
              source: 'PubMed',
              id: '5643703',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0006098',
          properties: [
            {
              key: 'GoTerm',
              value: 'P:pentose-phosphate shunt',
            },
            {
              key: 'GoEvidenceType',
              value: 'IDA:BHF-UCL',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000314',
              source: 'PubMed',
              id: '2297768',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0009051',
          properties: [
            {
              key: 'GoTerm',
              value: 'P:pentose-phosphate shunt, oxidative branch',
            },
            {
              key: 'GoEvidenceType',
              value: 'IMP:BHF-UCL',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000315',
              source: 'PubMed',
              id: '2420826',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:1904879',
          properties: [
            {
              key: 'GoTerm',
              value:
                'P:positive regulation of calcium ion transmembrane transport via high voltage-gated calcium channel',
            },
            {
              key: 'GoEvidenceType',
              value: 'IEA:Ensembl',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0043523',
          properties: [
            {
              key: 'GoTerm',
              value: 'P:regulation of neuron apoptotic process',
            },
            {
              key: 'GoEvidenceType',
              value: 'IEA:Ensembl',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0045471',
          properties: [
            {
              key: 'GoTerm',
              value: 'P:response to ethanol',
            },
            {
              key: 'GoEvidenceType',
              value: 'IEA:Ensembl',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0032094',
          properties: [
            {
              key: 'GoTerm',
              value: 'P:response to food',
            },
            {
              key: 'GoEvidenceType',
              value: 'IEA:Ensembl',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0010041',
          properties: [
            {
              key: 'GoTerm',
              value: 'P:response to iron(III) ion',
            },
            {
              key: 'GoEvidenceType',
              value: 'IEA:Ensembl',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0014070',
          properties: [
            {
              key: 'GoTerm',
              value: 'P:response to organic cyclic compound',
            },
            {
              key: 'GoEvidenceType',
              value: 'IEA:Ensembl',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0046390',
          properties: [
            {
              key: 'GoTerm',
              value: 'P:ribose phosphate biosynthetic process',
            },
            {
              key: 'GoEvidenceType',
              value: 'IMP:BHF-UCL',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0000315',
              source: 'PubMed',
              id: '2420826',
            },
          ],
        },
        {
          database: 'GO',
          id: 'GO:0021762',
          properties: [
            {
              key: 'GoTerm',
              value: 'P:substantia nigra development',
            },
            {
              key: 'GoEvidenceType',
              value: 'HEP:UniProtKB',
            },
          ],
          evidences: [
            {
              evidenceCode: 'ECO:0007007',
              source: 'PubMed',
              id: '22926577',
            },
          ],
        },
        {
          database: 'Gene3D',
          id: '3.40.50.720',
          properties: [
            {
              key: 'EntryName',
              value: 'NAD(P)-binding Rossmann-like Domain',
            },
            {
              key: 'MatchStatus',
              value: '1',
            },
          ],
        },
        {
          database: 'HAMAP',
          id: 'MF_00966',
          properties: [
            {
              key: 'EntryName',
              value: 'G6PD',
            },
            {
              key: 'MatchStatus',
              value: '1',
            },
          ],
        },
        {
          database: 'InterPro',
          id: 'IPR001282',
          properties: [
            {
              key: 'EntryName',
              value: 'G6P_DH',
            },
          ],
        },
        {
          database: 'InterPro',
          id: 'IPR019796',
          properties: [
            {
              key: 'EntryName',
              value: 'G6P_DH_AS',
            },
          ],
        },
        {
          database: 'InterPro',
          id: 'IPR022675',
          properties: [
            {
              key: 'EntryName',
              value: 'G6P_DH_C',
            },
          ],
        },
        {
          database: 'InterPro',
          id: 'IPR022674',
          properties: [
            {
              key: 'EntryName',
              value: 'G6P_DH_NAD-bd',
            },
          ],
        },
        {
          database: 'InterPro',
          id: 'IPR036291',
          properties: [
            {
              key: 'EntryName',
              value: 'NAD(P)-bd_dom_sf',
            },
          ],
        },
        {
          database: 'NCBIfam',
          id: 'TIGR00871',
          properties: [
            {
              key: 'EntryName',
              value: 'zwf',
            },
            {
              key: 'MatchStatus',
              value: '1',
            },
          ],
        },
        {
          database: 'PANTHER',
          id: 'PTHR23429:SF0',
          properties: [
            {
              key: 'EntryName',
              value: 'GLUCOSE-6-PHOSPHATE 1-DEHYDROGENASE',
            },
            {
              key: 'MatchStatus',
              value: '1',
            },
          ],
        },
        {
          database: 'PANTHER',
          id: 'PTHR23429',
          properties: [
            {
              key: 'EntryName',
              value: 'GLUCOSE-6-PHOSPHATE 1-DEHYDROGENASE G6PD',
            },
            {
              key: 'MatchStatus',
              value: '1',
            },
          ],
        },
        {
          database: 'Pfam',
          id: 'PF02781',
          properties: [
            {
              key: 'EntryName',
              value: 'G6PD_C',
            },
            {
              key: 'MatchStatus',
              value: '1',
            },
          ],
        },
        {
          database: 'Pfam',
          id: 'PF00479',
          properties: [
            {
              key: 'EntryName',
              value: 'G6PD_N',
            },
            {
              key: 'MatchStatus',
              value: '1',
            },
          ],
        },
        {
          database: 'PIRSF',
          id: 'PIRSF000110',
          properties: [
            {
              key: 'EntryName',
              value: 'G6PD',
            },
            {
              key: 'MatchStatus',
              value: '1',
            },
          ],
        },
        {
          database: 'PRINTS',
          id: 'PR00079',
          properties: [
            {
              key: 'EntryName',
              value: 'G6PDHDRGNASE',
            },
          ],
        },
        {
          database: 'SUPFAM',
          id: 'SSF55347',
          properties: [
            {
              key: 'EntryName',
              value:
                'Glyceraldehyde-3-phosphate dehydrogenase-like, C-terminal domain',
            },
            {
              key: 'MatchStatus',
              value: '1',
            },
          ],
        },
        {
          database: 'SUPFAM',
          id: 'SSF51735',
          properties: [
            {
              key: 'EntryName',
              value: 'NAD(P)-binding Rossmann-fold domains',
            },
            {
              key: 'MatchStatus',
              value: '1',
            },
          ],
        },
        {
          database: 'PROSITE',
          id: 'PS00069',
          properties: [
            {
              key: 'EntryName',
              value: 'G6P_DEHYDROGENASE',
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
          'MAEQVALSRTQVCGILREELFQGDAFHQSDTHIFIIMGASGDLAKKKIYPTIWWLFRDGLLPENTFIVGYARSRLTVADIRKQSEPFFKATPEEKLKLEDFFARNSYVAGQYDDAASYQRLNSHMNALHLGSQANRLFYLALPPTVYEAVTKNIHESCMSQIGWNRIIVEKPFGRDLQSSDRLSNHISSLFREDQIYRIDHYLGKEMVQNLMVLRFANRIFGPIWNRDNIACVILTFKEPFGTEGRGGYFDEFGIIRDVMQNHLLQMLCLVAMEKPASTNSDDVRDEKVKVLKCISEVQANNVVLGQYVGNPDGEGEATKGYLDDPTVPRGSTTATFAAVVLYVENERWDGVPFILRCGKALNERKAEVRLQFHDVAGDIFHQQCKRNELVIRVQPNEAVYTKMMTKKPGMFFNPEESELDLTYGNRYKNVKLPDAYERLILDVFCGSQMHFVRSDELREAWRIFTPLLHQIELEKPKPIPYIYGSRGPTEADELMKRVGFQYEGTYKWVNPHKL',
        length: 515,
        molWeight: 59257,
        crc64: 'F2B775340640A96F',
        md5: '0B9A27D919658D2052C83610A27C34FD',
      },
      extraAttributes: {
        countByCommentType: {
          FUNCTION: 1,
          'CATALYTIC ACTIVITY': 1,
          'BIOPHYSICOCHEMICAL PROPERTIES': 1,
          PATHWAY: 1,
          SUBUNIT: 1,
          INTERACTION: 3,
          'SUBCELLULAR LOCATION': 1,
          'ALTERNATIVE PRODUCTS': 3,
          'TISSUE SPECIFICITY': 1,
          PTM: 1,
          POLYMORPHISM: 1,
          DISEASE: 1,
          MISCELLANEOUS: 1,
          SIMILARITY: 1,
          'SEQUENCE CAUTION': 1,
          'WEB RESOURCE': 1,
        },
        countByFeatureType: {
          'Initiator methionine': 1,
          Chain: 1,
          'Active site': 1,
          'Binding site': 20,
          'Modified residue': 11,
          'Alternative sequence': 2,
          'Natural variant': 72,
          Mutagenesis: 6,
          'Sequence conflict': 2,
          'Beta strand': 23,
          Turn: 7,
          Helix: 26,
        },
        uniParcId: 'UPI0000061E0E',
      },
    },
    {
      entryType: 'UniProtKB reviewed (Swiss-Prot)',
      primaryAccession: 'P19926',
      uniProtkbId: 'AGP_ECOLI',
      entryAudit: {
        firstPublicDate: '1991-02-01',
        lastAnnotationUpdateDate: '2024-01-24',
        lastSequenceUpdateDate: '1991-02-01',
        entryVersion: 174,
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
              value: '13',
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
          id: 'GO:0016311',
          properties: [
            {
              key: 'GoTerm',
              value: 'P:dephosphorylation',
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
  ],
};
export default mock;
