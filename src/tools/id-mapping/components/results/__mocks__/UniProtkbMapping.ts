// https://wwwdev.ebi.ac.uk/uniprot/beta/api/idmapping/uniprotkb/results/ab5431b5409eb60e734faa13614e80e51acc3ea9?facets=reviewed%2Cmodel_organism%2Cproteins_with%2Cexistence%2Cannotation_score%2Clength&query=&size=0
const mappingResults = {
  facets: [
    {
      label: 'Status',
      name: 'reviewed',
      allowMultipleSelection: false,
      values: [
        {
          label: 'Reviewed (Swiss-Prot)',
          value: 'true',
          count: 4,
        },
      ],
    },
    {
      label: 'Model organisms',
      name: 'model_organism',
      allowMultipleSelection: true,
      values: [
        {
          value: 'Human',
          count: 1,
        },
        {
          value: 'Mouse',
          count: 1,
        },
        {
          value: 'S. cerevisiae',
          count: 1,
        },
      ],
    },
    {
      label: 'Proteins with',
      name: 'proteins_with',
      allowMultipleSelection: true,
      values: [
        {
          label: 'Active site',
          value: 'act_site',
          count: 4,
        },
        {
          label: 'Binding site',
          value: 'binding',
          count: 4,
        },
        {
          label: 'Catalytic activity',
          value: 'catalytic_activity',
          count: 4,
        },
        {
          label: 'Chain',
          value: 'chain',
          count: 4,
        },
        {
          label: 'Cofactors',
          value: 'cofactor',
          count: 4,
        },
        {
          label: 'Domain',
          value: 'domain',
          count: 4,
        },
        {
          label: 'Function',
          value: 'function',
          count: 4,
        },
        {
          label: 'Nucleotide binding',
          value: 'np_bind',
          count: 4,
        },
        {
          label: 'Subunit structure',
          value: 'subunit',
          count: 4,
        },
        {
          label: '3D structure',
          value: '3dstructure',
          count: 2,
        },
        {
          label: 'Alternative products(isoforms)',
          value: 'alternative_products',
          count: 2,
        },
        {
          label: 'Cross-link',
          value: 'crosslnk',
          count: 2,
        },
        {
          label: 'Binary interaction',
          value: 'interaction',
          count: 2,
        },
        {
          label: 'Modified residue',
          value: 'mod_res',
          count: 2,
        },
        {
          label: 'Subcellular location',
          value: 'subcellular_location',
          count: 2,
        },
        {
          label: 'Compositional bias',
          value: 'compbias',
          count: 1,
        },
        {
          label: 'Helix',
          value: 'helix',
          count: 1,
        },
        {
          label: 'Beta strand',
          value: 'strand',
          count: 1,
        },
        {
          label: 'Turn',
          value: 'turn',
          count: 1,
        },
        {
          label: 'Alternative splicing',
          value: 'var_seq',
          count: 1,
        },
        {
          label: 'Natural variant',
          value: 'variant',
          count: 1,
        },
      ],
    },
    {
      label: 'Protein Existence',
      name: 'existence',
      allowMultipleSelection: true,
      values: [
        {
          label: 'Protein level',
          value: 'PROTEIN_LEVEL',
          count: 4,
        },
      ],
    },
    {
      label: 'Annotation Score',
      name: 'annotation_score',
      allowMultipleSelection: true,
      values: [
        {
          value: '5',
          count: 4,
        },
      ],
    },
    {
      label: 'Sequence length',
      name: 'length',
      allowMultipleSelection: true,
      values: [
        {
          label: '401 - 600',
          value: '[401 TO 600]',
          count: 3,
        },
        {
          label: '>= 801',
          value: '[801 TO *]',
          count: 1,
        },
      ],
    },
  ],
  results: [
    {
      from: 'Q9Z0H0',
      to: {
        entryType: 'UniProtKB reviewed (Swiss-Prot)',
        primaryAccession: 'Q9Z0H0',
        secondaryAccessions: ['Q9WUV1', 'Q9Z2Y7'],
        uniProtkbId: 'CDC7_MOUSE',
        entryAudit: {
          firstPublicDate: '2001-01-11',
          lastAnnotationUpdateDate: '2021-04-07',
          lastSequenceUpdateDate: '2011-07-27',
          entryVersion: 164,
          sequenceVersion: 2,
        },
        annotationScore: 5,
        organism: {
          scientificName: 'Mus musculus',
          commonName: 'Mouse',
          taxonId: 10090,
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
            'Glires',
            'Rodentia',
            'Myomorpha',
            'Muroidea',
            'Muridae',
            'Murinae',
            'Mus',
            'Mus',
          ],
        },
        proteinExistence: '1: Evidence at protein level',
        proteinDescription: {
          recommendedName: {
            fullName: {
              value: 'Cell division cycle 7-related protein kinase',
            },
            shortNames: [
              {
                value: 'CDC7-related kinase',
              },
              {
                value: 'muCdc7',
              },
            ],
            ecNumbers: [
              {
                value: '2.7.11.1',
              },
            ],
          },
        },
        genes: [
          {
            geneName: {
              value: 'Cdc7',
            },
            synonyms: [
              {
                value: 'Cdc7l1',
              },
            ],
          },
        ],
        comments: [
          {
            texts: [
              {
                value:
                  'Seems to phosphorylate critical substrates that regulate the G1/S phase transition and/or DNA replication. Can phosphorylate MCM2 and MCM3',
              },
            ],
            commentType: 'FUNCTION',
          },
          {
            commentType: 'CATALYTIC ACTIVITY',
            reaction: {
              name: 'ATP + L-seryl-[protein] = ADP + H(+) + O-phospho-L-seryl-[protein]',
              reactionCrossReferences: [
                {
                  database: 'Rhea',
                  id: 'RHEA:17989',
                },
                {
                  database: 'Rhea',
                  id: 'RHEA-COMP:9863',
                },
                {
                  database: 'Rhea',
                  id: 'RHEA-COMP:11604',
                },
                {
                  database: 'ChEBI',
                  id: 'CHEBI:15378',
                },
                {
                  database: 'ChEBI',
                  id: 'CHEBI:29999',
                },
                {
                  database: 'ChEBI',
                  id: 'CHEBI:30616',
                },
                {
                  database: 'ChEBI',
                  id: 'CHEBI:83421',
                },
                {
                  database: 'ChEBI',
                  id: 'CHEBI:456216',
                },
              ],
              ecNumber: '2.7.11.1',
            },
          },
          {
            commentType: 'CATALYTIC ACTIVITY',
            reaction: {
              name: 'ATP + L-threonyl-[protein] = ADP + H(+) + O-phospho-L-threonyl-[protein]',
              reactionCrossReferences: [
                {
                  database: 'Rhea',
                  id: 'RHEA:46608',
                },
                {
                  database: 'Rhea',
                  id: 'RHEA-COMP:11060',
                },
                {
                  database: 'Rhea',
                  id: 'RHEA-COMP:11605',
                },
                {
                  database: 'ChEBI',
                  id: 'CHEBI:15378',
                },
                {
                  database: 'ChEBI',
                  id: 'CHEBI:30013',
                },
                {
                  database: 'ChEBI',
                  id: 'CHEBI:30616',
                },
                {
                  database: 'ChEBI',
                  id: 'CHEBI:61977',
                },
                {
                  database: 'ChEBI',
                  id: 'CHEBI:456216',
                },
              ],
              ecNumber: '2.7.11.1',
            },
          },
          {
            commentType: 'COFACTOR',
            cofactors: [
              {
                name: 'Mg(2+)',
                evidences: [
                  {
                    evidenceCode: 'ECO:0000250',
                  },
                ],
                cofactorCrossReference: {
                  database: 'ChEBI',
                  id: 'CHEBI:18420',
                },
              },
            ],
          },
          {
            texts: [
              {
                value:
                  'Forms a complex with either DBF4/DBF4A or DBF4B, leading to the activation of the kinase activity',
              },
            ],
            commentType: 'SUBUNIT',
          },
          {
            commentType: 'SUBCELLULAR LOCATION',
            subcellularLocations: [
              {
                location: {
                  evidences: [
                    {
                      evidenceCode: 'ECO:0000250',
                    },
                  ],
                  value: 'Nucleus',
                  id: 'SL-0191',
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
                isoformIds: ['Q9Z0H0-1'],
                isoformSequenceStatus: 'Displayed',
              },
              {
                name: {
                  value: '2',
                },
                isoformIds: ['Q9Z0H0-2'],
                sequenceIds: ['VSP_004864'],
                isoformSequenceStatus: 'Described',
              },
            ],
            note: {
              texts: [
                {
                  value: 'Additional isoforms seem to exist.',
                },
              ],
            },
          },
          {
            texts: [
              {
                evidences: [
                  {
                    evidenceCode: 'ECO:0000255',
                    source: 'PROSITE-ProRule',
                    id: 'PRU00159',
                  },
                ],
                value:
                  'Belongs to the protein kinase superfamily. Ser/Thr protein kinase family. CDC7 subfamily',
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
                value: 564,
                modifier: 'EXACT',
              },
            },
            description: 'Cell division cycle 7-related protein kinase',
            featureId: 'PRO_0000085764',
          },
          {
            type: 'Domain',
            location: {
              start: {
                value: 52,
                modifier: 'EXACT',
              },
              end: {
                value: 564,
                modifier: 'EXACT',
              },
            },
            description: 'Protein kinase',
            evidences: [
              {
                evidenceCode: 'ECO:0000255',
                source: 'PROSITE-ProRule',
                id: 'PRU00159',
              },
            ],
          },
          {
            type: 'Nucleotide binding',
            location: {
              start: {
                value: 58,
                modifier: 'EXACT',
              },
              end: {
                value: 66,
                modifier: 'EXACT',
              },
            },
            description: 'ATP',
            evidences: [
              {
                evidenceCode: 'ECO:0000255',
                source: 'PROSITE-ProRule',
                id: 'PRU00159',
              },
            ],
          },
          {
            type: 'Active site',
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
            description: 'Proton acceptor',
            evidences: [
              {
                evidenceCode: 'ECO:0000255',
                source: 'PROSITE-ProRule',
                id: 'PRU00159',
              },
              {
                evidenceCode: 'ECO:0000255',
                source: 'PROSITE-ProRule',
                id: 'PRU10027',
              },
            ],
          },
          {
            type: 'Binding site',
            location: {
              start: {
                value: 84,
                modifier: 'EXACT',
              },
              end: {
                value: 84,
                modifier: 'EXACT',
              },
            },
            description: 'ATP',
            evidences: [
              {
                evidenceCode: 'ECO:0000255',
                source: 'PROSITE-ProRule',
                id: 'PRU00159',
              },
            ],
          },
          {
            type: 'Modified residue',
            location: {
              start: {
                value: 21,
                modifier: 'EXACT',
              },
              end: {
                value: 21,
                modifier: 'EXACT',
              },
            },
            description: 'Phosphoserine',
            evidences: [
              {
                evidenceCode: 'ECO:0000250',
                source: 'UniProtKB',
                id: 'O00311',
              },
            ],
          },
          {
            type: 'Cross-link',
            location: {
              start: {
                value: 260,
                modifier: 'EXACT',
              },
              end: {
                value: 260,
                modifier: 'EXACT',
              },
            },
            description:
              'Glycyl lysine isopeptide (Lys-Gly) (interchain with G-Cter in SUMO2)',
            evidences: [
              {
                evidenceCode: 'ECO:0000250',
                source: 'UniProtKB',
                id: 'O00311',
              },
            ],
          },
          {
            type: 'Alternative sequence',
            location: {
              start: {
                value: 267,
                modifier: 'EXACT',
              },
              end: {
                value: 298,
                modifier: 'EXACT',
              },
            },
            description: 'in isoform 2',
            evidences: [
              {
                evidenceCode: 'ECO:0000303',
                source: 'PubMed',
                id: '9722556',
              },
            ],
            featureId: 'VSP_004864',
            alternativeSequence: {},
          },
          {
            type: 'Sequence conflict',
            location: {
              start: {
                value: 38,
                modifier: 'EXACT',
              },
              end: {
                value: 38,
                modifier: 'EXACT',
              },
            },
            description: 'in Ref. 1; BAA34347/BAA33881/BAA33880',
            evidences: [
              {
                evidenceCode: 'ECO:0000305',
              },
            ],
            alternativeSequence: {
              originalSequence: 'I',
              alternativeSequences: ['F'],
            },
          },
          {
            type: 'Sequence conflict',
            location: {
              start: {
                value: 42,
                modifier: 'EXACT',
              },
              end: {
                value: 42,
                modifier: 'EXACT',
              },
            },
            description: 'in Ref. 1; BAA34347/BAA33881/BAA33880',
            evidences: [
              {
                evidenceCode: 'ECO:0000305',
              },
            ],
            alternativeSequence: {
              originalSequence: 'C',
              alternativeSequences: ['G'],
            },
          },
          {
            type: 'Sequence conflict',
            location: {
              start: {
                value: 52,
                modifier: 'EXACT',
              },
              end: {
                value: 52,
                modifier: 'EXACT',
              },
            },
            description: 'in Ref. 1; BAA34347/BAA33881/BAA33880',
            evidences: [
              {
                evidenceCode: 'ECO:0000305',
              },
            ],
            alternativeSequence: {
              originalSequence: 'F',
              alternativeSequences: ['S'],
            },
          },
          {
            type: 'Sequence conflict',
            location: {
              start: {
                value: 348,
                modifier: 'EXACT',
              },
              end: {
                value: 348,
                modifier: 'EXACT',
              },
            },
            description: 'in Ref. 1; BAA34347/BAA33881/BAA33880',
            evidences: [
              {
                evidenceCode: 'ECO:0000305',
              },
            ],
            alternativeSequence: {
              originalSequence: 'D',
              alternativeSequences: ['N'],
            },
          },
          {
            type: 'Sequence conflict',
            location: {
              start: {
                value: 516,
                modifier: 'EXACT',
              },
              end: {
                value: 516,
                modifier: 'EXACT',
              },
            },
            description: 'in Ref. 1; BAA34347/BAA33881/BAA33880',
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
            type: 'Sequence conflict',
            location: {
              start: {
                value: 557,
                modifier: 'EXACT',
              },
              end: {
                value: 557,
                modifier: 'EXACT',
              },
            },
            description: 'in Ref. 1; BAA34347/BAA33881/BAA33880',
            evidences: [
              {
                evidenceCode: 'ECO:0000305',
              },
            ],
            alternativeSequence: {
              originalSequence: 'A',
              alternativeSequences: ['V'],
            },
          },
        ],
        keywords: [
          {
            id: 'KW-0025',
            category: 'Coding sequence diversity',
            name: 'Alternative splicing',
          },
          {
            id: 'KW-0067',
            category: 'Ligand',
            name: 'ATP-binding',
          },
          {
            id: 'KW-0131',
            category: 'Biological process',
            name: 'Cell cycle',
          },
          {
            id: 'KW-0132',
            category: 'Biological process',
            name: 'Cell division',
          },
          {
            id: 'KW-1017',
            category: 'PTM',
            name: 'Isopeptide bond',
          },
          {
            id: 'KW-0418',
            category: 'Molecular function',
            name: 'Kinase',
          },
          {
            id: 'KW-0460',
            category: 'Ligand',
            name: 'Magnesium',
          },
          {
            id: 'KW-0479',
            category: 'Ligand',
            name: 'Metal-binding',
          },
          {
            id: 'KW-0547',
            category: 'Ligand',
            name: 'Nucleotide-binding',
          },
          {
            id: 'KW-0539',
            category: 'Cellular component',
            name: 'Nucleus',
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
            id: 'KW-0723',
            category: 'Molecular function',
            name: 'Serine/threonine-protein kinase',
          },
          {
            id: 'KW-0808',
            category: 'Molecular function',
            name: 'Transferase',
          },
          {
            id: 'KW-0832',
            category: 'PTM',
            name: 'Ubl conjugation',
          },
        ],
        references: [
          {
            citation: {
              id: '9722556',
              citationType: 'journal article',
              authors: [
                'Kim J.',
                'Sato N.',
                'Yamada M.',
                'Arai K.',
                'Masai H.',
              ],
              citationCrossReferences: [
                {
                  database: 'PubMed',
                  id: '9722556',
                },
                {
                  database: 'DOI',
                  id: '10.1074/jbc.273.36.23248',
                },
              ],
              title:
                'Growth regulation of the expression of mouse cDNA and gene encoding a serine/threonine kinase related to Saccharomyces cerevisiae CDC7 essential for G1/S transition. Structure, chromosomal localization, and expression of mouse gene for s. cerevisiae Cdc7-related kinase.',
              publicationDate: '1998',
              journal: 'J. Biol. Chem.',
              firstPage: '23248',
              lastPage: '23257',
              volume: '273',
            },
            referencePositions: [
              'NUCLEOTIDE SEQUENCE [GENOMIC DNA / MRNA] (ISOFORMS 1 AND 2)',
            ],
            referenceComments: [
              {
                value: 'Liver',
                type: 'TISSUE',
              },
            ],
          },
          {
            citation: {
              id: '10199953',
              citationType: 'journal article',
              authors: [
                'Faul T.',
                'Staib C.',
                'Nanda I.',
                'Schmid M.',
                'Grummt F.',
              ],
              citationCrossReferences: [
                {
                  database: 'PubMed',
                  id: '10199953',
                },
                {
                  database: 'DOI',
                  id: '10.1007/s004120050348',
                },
              ],
              title:
                'Identification and characterization of mouse homologue to yeast Cdc7 protein and chromosomal localization of the cognate mouse gene Cdc7l.',
              publicationDate: '1999',
              journal: 'Chromosoma',
              firstPage: '26',
              lastPage: '31',
              volume: '108',
            },
            referencePositions: ['NUCLEOTIDE SEQUENCE [MRNA] (ISOFORM 1)'],
          },
          {
            citation: {
              id: '16141072',
              citationType: 'journal article',
              authors: [
                'Carninci P.',
                'Kasukawa T.',
                'Katayama S.',
                'Gough J.',
                'Frith M.C.',
                'Maeda N.',
                'Oyama R.',
                'Ravasi T.',
                'Lenhard B.',
                'Wells C.',
                'Kodzius R.',
                'Shimokawa K.',
                'Bajic V.B.',
                'Brenner S.E.',
                'Batalov S.',
                'Forrest A.R.',
                'Zavolan M.',
                'Davis M.J.',
                'Wilming L.G.',
                'Aidinis V.',
                'Allen J.E.',
                'Ambesi-Impiombato A.',
                'Apweiler R.',
                'Aturaliya R.N.',
                'Bailey T.L.',
                'Bansal M.',
                'Baxter L.',
                'Beisel K.W.',
                'Bersano T.',
                'Bono H.',
                'Chalk A.M.',
                'Chiu K.P.',
                'Choudhary V.',
                'Christoffels A.',
                'Clutterbuck D.R.',
                'Crowe M.L.',
                'Dalla E.',
                'Dalrymple B.P.',
                'de Bono B.',
                'Della Gatta G.',
                'di Bernardo D.',
                'Down T.',
                'Engstrom P.',
                'Fagiolini M.',
                'Faulkner G.',
                'Fletcher C.F.',
                'Fukushima T.',
                'Furuno M.',
                'Futaki S.',
                'Gariboldi M.',
                'Georgii-Hemming P.',
                'Gingeras T.R.',
                'Gojobori T.',
                'Green R.E.',
                'Gustincich S.',
                'Harbers M.',
                'Hayashi Y.',
                'Hensch T.K.',
                'Hirokawa N.',
                'Hill D.',
                'Huminiecki L.',
                'Iacono M.',
                'Ikeo K.',
                'Iwama A.',
                'Ishikawa T.',
                'Jakt M.',
                'Kanapin A.',
                'Katoh M.',
                'Kawasawa Y.',
                'Kelso J.',
                'Kitamura H.',
                'Kitano H.',
                'Kollias G.',
                'Krishnan S.P.',
                'Kruger A.',
                'Kummerfeld S.K.',
                'Kurochkin I.V.',
                'Lareau L.F.',
                'Lazarevic D.',
                'Lipovich L.',
                'Liu J.',
                'Liuni S.',
                'McWilliam S.',
                'Madan Babu M.',
                'Madera M.',
                'Marchionni L.',
                'Matsuda H.',
                'Matsuzawa S.',
                'Miki H.',
                'Mignone F.',
                'Miyake S.',
                'Morris K.',
                'Mottagui-Tabar S.',
                'Mulder N.',
                'Nakano N.',
                'Nakauchi H.',
                'Ng P.',
                'Nilsson R.',
                'Nishiguchi S.',
                'Nishikawa S.',
                'Nori F.',
                'Ohara O.',
                'Okazaki Y.',
                'Orlando V.',
                'Pang K.C.',
                'Pavan W.J.',
                'Pavesi G.',
                'Pesole G.',
                'Petrovsky N.',
                'Piazza S.',
                'Reed J.',
                'Reid J.F.',
                'Ring B.Z.',
                'Ringwald M.',
                'Rost B.',
                'Ruan Y.',
                'Salzberg S.L.',
                'Sandelin A.',
                'Schneider C.',
                'Schoenbach C.',
                'Sekiguchi K.',
                'Semple C.A.',
                'Seno S.',
                'Sessa L.',
                'Sheng Y.',
                'Shibata Y.',
                'Shimada H.',
                'Shimada K.',
                'Silva D.',
                'Sinclair B.',
                'Sperling S.',
                'Stupka E.',
                'Sugiura K.',
                'Sultana R.',
                'Takenaka Y.',
                'Taki K.',
                'Tammoja K.',
                'Tan S.L.',
                'Tang S.',
                'Taylor M.S.',
                'Tegner J.',
                'Teichmann S.A.',
                'Ueda H.R.',
                'van Nimwegen E.',
                'Verardo R.',
                'Wei C.L.',
                'Yagi K.',
                'Yamanishi H.',
                'Zabarovsky E.',
                'Zhu S.',
                'Zimmer A.',
                'Hide W.',
                'Bult C.',
                'Grimmond S.M.',
                'Teasdale R.D.',
                'Liu E.T.',
                'Brusic V.',
                'Quackenbush J.',
                'Wahlestedt C.',
                'Mattick J.S.',
                'Hume D.A.',
                'Kai C.',
                'Sasaki D.',
                'Tomaru Y.',
                'Fukuda S.',
                'Kanamori-Katayama M.',
                'Suzuki M.',
                'Aoki J.',
                'Arakawa T.',
                'Iida J.',
                'Imamura K.',
                'Itoh M.',
                'Kato T.',
                'Kawaji H.',
                'Kawagashira N.',
                'Kawashima T.',
                'Kojima M.',
                'Kondo S.',
                'Konno H.',
                'Nakano K.',
                'Ninomiya N.',
                'Nishio T.',
                'Okada M.',
                'Plessy C.',
                'Shibata K.',
                'Shiraki T.',
                'Suzuki S.',
                'Tagami M.',
                'Waki K.',
                'Watahiki A.',
                'Okamura-Oho Y.',
                'Suzuki H.',
                'Kawai J.',
                'Hayashizaki Y.',
              ],
              citationCrossReferences: [
                {
                  database: 'PubMed',
                  id: '16141072',
                },
                {
                  database: 'DOI',
                  id: '10.1126/science.1112014',
                },
              ],
              title: 'The transcriptional landscape of the mammalian genome.',
              publicationDate: '2005',
              journal: 'Science',
              firstPage: '1559',
              lastPage: '1563',
              volume: '309',
            },
            referencePositions: [
              'NUCLEOTIDE SEQUENCE [LARGE SCALE MRNA] (ISOFORM 1)',
            ],
            referenceComments: [
              {
                value: 'C57BL/6J',
                type: 'STRAIN',
              },
              {
                value: 'Placenta',
                type: 'TISSUE',
              },
            ],
          },
          {
            citation: {
              id: 'CI-70VOB8UOSDVQL',
              citationType: 'submission',
              authors: [
                'Mural R.J.',
                'Adams M.D.',
                'Myers E.W.',
                'Smith H.O.',
                'Venter J.C.',
              ],
              publicationDate: 'SEP-2005',
              submissionDatabase: 'EMBL/GenBank/DDBJ databases',
            },
            referencePositions: [
              'NUCLEOTIDE SEQUENCE [LARGE SCALE GENOMIC DNA]',
            ],
          },
          {
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
              'NUCLEOTIDE SEQUENCE [LARGE SCALE MRNA] (ISOFORM 1)',
            ],
            referenceComments: [
              {
                value: 'C57BL/6J',
                type: 'STRAIN',
              },
              {
                value: 'Eye',
                type: 'TISSUE',
              },
            ],
          },
          {
            citation: {
              id: '10517317',
              citationType: 'journal article',
              authors: [
                'Lepke M.',
                'Puetter V.',
                'Staib C.',
                'Kneissl M.',
                'Berger C.',
                'Hoehn K.',
                'Nanda I.',
                'Schmid M.',
                'Grummt F.',
              ],
              citationCrossReferences: [
                {
                  database: 'PubMed',
                  id: '10517317',
                },
                {
                  database: 'DOI',
                  id: '10.1007/s004380051078',
                },
              ],
              title:
                'Identification, characterization and chromosomal localization of the cognate human and murine DBF4 genes.',
              publicationDate: '1999',
              journal: 'Mol. Gen. Genet.',
              firstPage: '220',
              lastPage: '229',
              volume: '262',
            },
            referencePositions: ['INTERACTION WITH DBF4'],
            referenceComments: [
              {
                value: 'C57BL/6J',
                type: 'STRAIN',
              },
              {
                value: 'Egg',
                type: 'TISSUE',
              },
              {
                value: 'Embryo',
                type: 'TISSUE',
              },
            ],
          },
        ],
        uniProtKBCrossReferences: [
          {
            database: 'EMBL',
            id: 'AB019388',
            properties: [
              {
                key: 'ProteinId',
                value: 'BAA34347.1',
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
            id: 'AB018575',
            properties: [
              {
                key: 'ProteinId',
                value: 'BAA33881.1',
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
            id: 'AB018574',
            properties: [
              {
                key: 'ProteinId',
                value: 'BAA33880.1',
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
            id: 'AJ007661',
            properties: [
              {
                key: 'ProteinId',
                value: 'CAB40539.1',
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
            id: 'AK145921',
            properties: [
              {
                key: 'ProteinId',
                value: 'BAE26752.1',
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
            id: 'CH466529',
            properties: [
              {
                key: 'ProteinId',
                value: 'EDL20174.1',
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
            id: 'BC072666',
            properties: [
              {
                key: 'ProteinId',
                value: 'AAH72666.1',
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
            database: 'CCDS',
            id: 'CCDS19498.1',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
            isoformId: 'Q9Z0H0-1',
          },
          {
            database: 'CCDS',
            id: 'CCDS71628.1',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
            isoformId: 'Q9Z0H0-2',
          },
          {
            database: 'RefSeq',
            id: 'NP_001258495.1',
            properties: [
              {
                key: 'NucleotideSequenceId',
                value: 'NM_001271566.1',
              },
            ],
            isoformId: 'Q9Z0H0-1',
          },
          {
            database: 'RefSeq',
            id: 'NP_001258496.1',
            properties: [
              {
                key: 'NucleotideSequenceId',
                value: 'NM_001271567.1',
              },
            ],
            isoformId: 'Q9Z0H0-2',
          },
          {
            database: 'RefSeq',
            id: 'NP_001258497.1',
            properties: [
              {
                key: 'NucleotideSequenceId',
                value: 'NM_001271568.1',
              },
            ],
          },
          {
            database: 'RefSeq',
            id: 'NP_033993.2',
            properties: [
              {
                key: 'NucleotideSequenceId',
                value: 'NM_009863.3',
              },
            ],
            isoformId: 'Q9Z0H0-1',
          },
          {
            database: 'BioGRID',
            id: '198629',
            properties: [
              {
                key: 'Interactions',
                value: '5',
              },
            ],
          },
          {
            database: 'STRING',
            id: '10090.ENSMUSP00000031221',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'iPTMnet',
            id: 'Q9Z0H0',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'PhosphoSitePlus',
            id: 'Q9Z0H0',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'EPD',
            id: 'Q9Z0H0',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'PaxDb',
            id: 'Q9Z0H0',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'PRIDE',
            id: 'Q9Z0H0',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'ProteomicsDB',
            id: '281514',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
            isoformId: 'Q9Z0H0-1',
          },
          {
            database: 'ProteomicsDB',
            id: '281515',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
            isoformId: 'Q9Z0H0-2',
          },
          {
            database: 'Antibodypedia',
            id: '3628',
            properties: [
              {
                key: 'antibodies',
                value: '309 antibodies',
              },
            ],
          },
          {
            database: 'Ensembl',
            id: 'ENSMUST00000031221',
            properties: [
              {
                key: 'ProteinId',
                value: 'ENSMUSP00000031221',
              },
              {
                key: 'GeneId',
                value: 'ENSMUSG00000029283',
              },
            ],
            isoformId: 'Q9Z0H0-1',
          },
          {
            database: 'Ensembl',
            id: 'ENSMUST00000117196',
            properties: [
              {
                key: 'ProteinId',
                value: 'ENSMUSP00000112392',
              },
              {
                key: 'GeneId',
                value: 'ENSMUSG00000029283',
              },
            ],
            isoformId: 'Q9Z0H0-2',
          },
          {
            database: 'Ensembl',
            id: 'ENSMUST00000118261',
            properties: [
              {
                key: 'ProteinId',
                value: 'ENSMUSP00000113385',
              },
              {
                key: 'GeneId',
                value: 'ENSMUSG00000029283',
              },
            ],
            isoformId: 'Q9Z0H0-1',
          },
          {
            database: 'GeneID',
            id: '12545',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'KEGG',
            id: 'mmu:12545',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'UCSC',
            id: 'uc008ylw.2',
            properties: [
              {
                key: 'OrganismName',
                value: 'mouse',
              },
            ],
            isoformId: 'Q9Z0H0-1',
          },
          {
            database: 'UCSC',
            id: 'uc008ylx.2',
            properties: [
              {
                key: 'OrganismName',
                value: 'mouse',
              },
            ],
            isoformId: 'Q9Z0H0-2',
          },
          {
            database: 'CTD',
            id: '8317',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'MGI',
            id: 'MGI:1309511',
            properties: [
              {
                key: 'GeneName',
                value: 'Cdc7',
              },
            ],
          },
          {
            database: 'eggNOG',
            id: 'KOG1167',
            properties: [
              {
                key: 'ToxonomicScope',
                value: 'Eukaryota',
              },
            ],
          },
          {
            database: 'GeneTree',
            id: 'ENSGT00550000075011',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'HOGENOM',
            id: 'CLU_000288_118_1_1',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'InParanoid',
            id: 'Q9Z0H0',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'OMA',
            id: 'GLLHGCV',
            properties: [
              {
                key: 'Fingerprint',
                value: '-',
              },
            ],
          },
          {
            database: 'OrthoDB',
            id: '1361975at2759',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'TreeFam',
            id: 'TF101052',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'BRENDA',
            id: '2.7.11.1',
            properties: [
              {
                key: 'OrganismId',
                value: '3474',
              },
            ],
          },
          {
            database: 'Reactome',
            id: 'R-MMU-176187',
            properties: [
              {
                key: 'PathwayName',
                value: 'Activation of ATR in response to replication stress',
              },
            ],
          },
          {
            database: 'Reactome',
            id: 'R-MMU-68962',
            properties: [
              {
                key: 'PathwayName',
                value: 'Activation of the pre-replicative complex',
              },
            ],
          },
          {
            database: 'BioGRID-ORCS',
            id: '12545',
            properties: [
              {
                key: 'hits',
                value: '16 hits in 55 CRISPR screens',
              },
            ],
          },
          {
            database: 'PRO',
            id: 'PR:Q9Z0H0',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'Proteomes',
            id: 'UP000000589',
            properties: [
              {
                key: 'Component',
                value: 'Chromosome 5',
              },
            ],
          },
          {
            database: 'RNAct',
            id: 'Q9Z0H0',
            properties: [
              {
                key: 'moleculeType',
                value: 'protein',
              },
            ],
          },
          {
            database: 'Bgee',
            id: 'ENSMUSG00000029283',
            properties: [
              {
                key: 'ExpressionPatterns',
                value: 'Expressed in vestibular organ and 271 other tissues',
              },
            ],
          },
          {
            database: 'Genevisible',
            id: 'Q9Z0H0',
            properties: [
              {
                key: 'OrganismId',
                value: 'MM',
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
                value: 'ISO:MGI',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0045171',
            properties: [
              {
                key: 'GoTerm',
                value: 'C:intercellular bridge',
              },
              {
                key: 'GoEvidenceType',
                value: 'ISO:MGI',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0072686',
            properties: [
              {
                key: 'GoTerm',
                value: 'C:mitotic spindle',
              },
              {
                key: 'GoEvidenceType',
                value: 'ISO:MGI',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0005654',
            properties: [
              {
                key: 'GoTerm',
                value: 'C:nucleoplasm',
              },
              {
                key: 'GoEvidenceType',
                value: 'ISO:MGI',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0005634',
            properties: [
              {
                key: 'GoTerm',
                value: 'C:nucleus',
              },
              {
                key: 'GoEvidenceType',
                value: 'ISO:MGI',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0005524',
            properties: [
              {
                key: 'GoTerm',
                value: 'F:ATP binding',
              },
              {
                key: 'GoEvidenceType',
                value: 'IEA:UniProtKB-KW',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0016301',
            properties: [
              {
                key: 'GoTerm',
                value: 'F:kinase activity',
              },
              {
                key: 'GoEvidenceType',
                value: 'ISO:MGI',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0046872',
            properties: [
              {
                key: 'GoTerm',
                value: 'F:metal ion binding',
              },
              {
                key: 'GoEvidenceType',
                value: 'IEA:UniProtKB-KW',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0004672',
            properties: [
              {
                key: 'GoTerm',
                value: 'F:protein kinase activity',
              },
              {
                key: 'GoEvidenceType',
                value: 'ISO:MGI',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0106310',
            properties: [
              {
                key: 'GoTerm',
                value: 'F:protein serine kinase activity',
              },
              {
                key: 'GoEvidenceType',
                value: 'IEA:UniProtKB-EC',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0004674',
            properties: [
              {
                key: 'GoTerm',
                value: 'F:protein serine/threonine kinase activity',
              },
              {
                key: 'GoEvidenceType',
                value: 'IBA:GO_Central',
              },
            ],
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '21873635',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0106311',
            properties: [
              {
                key: 'GoTerm',
                value: 'F:protein threonine kinase activity',
              },
              {
                key: 'GoEvidenceType',
                value: 'IEA:UniProtKB-EC',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0044770',
            properties: [
              {
                key: 'GoTerm',
                value: 'P:cell cycle phase transition',
              },
              {
                key: 'GoEvidenceType',
                value: 'ISO:MGI',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0051301',
            properties: [
              {
                key: 'GoTerm',
                value: 'P:cell division',
              },
              {
                key: 'GoEvidenceType',
                value: 'IEA:UniProtKB-KW',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0000727',
            properties: [
              {
                key: 'GoTerm',
                value:
                  'P:double-strand break repair via break-induced replication',
              },
              {
                key: 'GoEvidenceType',
                value: 'IBA:GO_Central',
              },
            ],
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '21873635',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0018105',
            properties: [
              {
                key: 'GoTerm',
                value: 'P:peptidyl-serine phosphorylation',
              },
              {
                key: 'GoEvidenceType',
                value: 'IBA:GO_Central',
              },
            ],
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '21873635',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0008284',
            properties: [
              {
                key: 'GoTerm',
                value: 'P:positive regulation of cell population proliferation',
              },
              {
                key: 'GoEvidenceType',
                value: 'ISO:MGI',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0010971',
            properties: [
              {
                key: 'GoTerm',
                value:
                  'P:positive regulation of G2/M transition of mitotic cell cycle',
              },
              {
                key: 'GoEvidenceType',
                value: 'ISO:MGI',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0010571',
            properties: [
              {
                key: 'GoTerm',
                value:
                  'P:positive regulation of nuclear cell cycle DNA replication',
              },
              {
                key: 'GoEvidenceType',
                value: 'ISO:MGI',
              },
            ],
          },
          {
            database: 'InterPro',
            id: 'IPR011009',
            properties: [
              {
                key: 'EntryName',
                value: 'Kinase-like_dom_sf',
              },
            ],
          },
          {
            database: 'InterPro',
            id: 'IPR000719',
            properties: [
              {
                key: 'EntryName',
                value: 'Prot_kinase_dom',
              },
            ],
          },
          {
            database: 'InterPro',
            id: 'IPR017441',
            properties: [
              {
                key: 'EntryName',
                value: 'Protein_kinase_ATP_BS',
              },
            ],
          },
          {
            database: 'InterPro',
            id: 'IPR008271',
            properties: [
              {
                key: 'EntryName',
                value: 'Ser/Thr_kinase_AS',
              },
            ],
          },
          {
            database: 'Pfam',
            id: 'PF00069',
            properties: [
              {
                key: 'EntryName',
                value: 'Pkinase',
              },
              {
                key: 'MatchStatus',
                value: '2',
              },
            ],
          },
          {
            database: 'SMART',
            id: 'SM00220',
            properties: [
              {
                key: 'EntryName',
                value: 'S_TKc',
              },
              {
                key: 'MatchStatus',
                value: '1',
              },
            ],
          },
          {
            database: 'SUPFAM',
            id: 'SSF56112',
            properties: [
              {
                key: 'EntryName',
                value: 'SSF56112',
              },
              {
                key: 'MatchStatus',
                value: '1',
              },
            ],
          },
          {
            database: 'PROSITE',
            id: 'PS00107',
            properties: [
              {
                key: 'EntryName',
                value: 'PROTEIN_KINASE_ATP',
              },
              {
                key: 'MatchStatus',
                value: '1',
              },
            ],
          },
          {
            database: 'PROSITE',
            id: 'PS50011',
            properties: [
              {
                key: 'EntryName',
                value: 'PROTEIN_KINASE_DOM',
              },
              {
                key: 'MatchStatus',
                value: '1',
              },
            ],
          },
          {
            database: 'PROSITE',
            id: 'PS00108',
            properties: [
              {
                key: 'EntryName',
                value: 'PROTEIN_KINASE_ST',
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
            'MEEPMAFSSLRGSDRCPADDSLKKYEQSVKLSGIKRDIEELCEAVPQLVNVFKIKDKIGEGTFSSVYLATAQLQEGHEEKIALKHLIPTSHPMRIAAELQCLTVAGGQDNVMGLKYCFRKNDHVVIAMPYLEHESFLDILNSLSFQEVREYMYNLFVALKRIHQFGIVHRDVKPSNFLYNRRLKKYALVDFGLAQGTRDTKIELLKFVQSEAQQEDCSRNKYHGVVGHKGLLSRPAPKTVDQQCTPKTSVKRSYTQVHIKQGKDGKERSVGLSVQRSVFGERNFNIHSSISHESPAEKLIKQSKTVDIISRKLATKKTAISTKAMNSVMRETARSCPAVLTCDCYGSDRVCSVCLSRRQQVAPRAGTPGFRAPEVLTKCPDQTTAIDMWSAGVIFLSLLSGRYPFYKASDDLTALAQIMTIRGSRETIQAAKAFGKSVLCSKEVPAQDLRALCERLRGLDSTTPRSASGPPGNASYDPAASKNTDHKASRVQAAQAQHSEDSLYKRDNDGYWSHPKDCTSNSEGWDSVPDEAYDLLDKLLDLNPASRITAEAALLHAFFKDMCS',
          length: 564,
          molWeight: 62770,
          crc64: '82BD6617F70FB240',
          md5: 'CE7B784D4AD2C6A4592104C239D9870B',
        },
        extraAttributes: {
          countByCommentType: {
            FUNCTION: 1,
            'CATALYTIC ACTIVITY': 2,
            COFACTOR: 1,
            SUBUNIT: 1,
            'SUBCELLULAR LOCATION': 1,
            'ALTERNATIVE PRODUCTS': 2,
            SIMILARITY: 1,
          },
          countByFeatureType: {
            Chain: 1,
            Domain: 1,
            'Nucleotide binding': 1,
            'Active site': 1,
            'Binding site': 1,
            'Modified residue': 1,
            'Cross-link': 1,
            'Alternative sequence': 1,
            'Sequence conflict': 6,
          },
          uniParcId: 'UPI0000023170',
        },
      },
    },
    {
      from: 'O00311',
      to: {
        entryType: 'UniProtKB reviewed (Swiss-Prot)',
        primaryAccession: 'O00311',
        secondaryAccessions: ['D3DT31', 'O00558', 'Q5T5U5'],
        uniProtkbId: 'CDC7_HUMAN',
        entryAudit: {
          firstPublicDate: '2001-01-11',
          lastAnnotationUpdateDate: '2021-04-07',
          lastSequenceUpdateDate: '1997-07-01',
          entryVersion: 204,
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
              value: 'Cell division cycle 7-related protein kinase',
            },
            shortNames: [
              {
                value: 'CDC7-related kinase',
              },
              {
                value: 'HsCdc7',
              },
              {
                value: 'huCdc7',
              },
            ],
            ecNumbers: [
              {
                value: '2.7.11.1',
              },
            ],
          },
        },
        genes: [
          {
            geneName: {
              value: 'CDC7',
            },
            synonyms: [
              {
                value: 'CDC7L1',
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
                    evidenceCode: 'ECO:0000269',
                    source: 'PubMed',
                    id: '12065429',
                  },
                ],
                value:
                  'Seems to phosphorylate critical substrates that regulate the G1/S phase transition and/or DNA replication. Can phosphorylate MCM2 and MCM3',
              },
            ],
            commentType: 'FUNCTION',
          },
          {
            commentType: 'CATALYTIC ACTIVITY',
            reaction: {
              name: 'ATP + L-seryl-[protein] = ADP + H(+) + O-phospho-L-seryl-[protein]',
              reactionCrossReferences: [
                {
                  database: 'Rhea',
                  id: 'RHEA:17989',
                },
                {
                  database: 'Rhea',
                  id: 'RHEA-COMP:9863',
                },
                {
                  database: 'Rhea',
                  id: 'RHEA-COMP:11604',
                },
                {
                  database: 'ChEBI',
                  id: 'CHEBI:15378',
                },
                {
                  database: 'ChEBI',
                  id: 'CHEBI:29999',
                },
                {
                  database: 'ChEBI',
                  id: 'CHEBI:30616',
                },
                {
                  database: 'ChEBI',
                  id: 'CHEBI:83421',
                },
                {
                  database: 'ChEBI',
                  id: 'CHEBI:456216',
                },
              ],
              ecNumber: '2.7.11.1',
            },
          },
          {
            commentType: 'CATALYTIC ACTIVITY',
            reaction: {
              name: 'ATP + L-threonyl-[protein] = ADP + H(+) + O-phospho-L-threonyl-[protein]',
              reactionCrossReferences: [
                {
                  database: 'Rhea',
                  id: 'RHEA:46608',
                },
                {
                  database: 'Rhea',
                  id: 'RHEA-COMP:11060',
                },
                {
                  database: 'Rhea',
                  id: 'RHEA-COMP:11605',
                },
                {
                  database: 'ChEBI',
                  id: 'CHEBI:15378',
                },
                {
                  database: 'ChEBI',
                  id: 'CHEBI:30013',
                },
                {
                  database: 'ChEBI',
                  id: 'CHEBI:30616',
                },
                {
                  database: 'ChEBI',
                  id: 'CHEBI:61977',
                },
                {
                  database: 'ChEBI',
                  id: 'CHEBI:456216',
                },
              ],
              ecNumber: '2.7.11.1',
            },
          },
          {
            commentType: 'COFACTOR',
            cofactors: [
              {
                name: 'Mg(2+)',
                cofactorCrossReference: {
                  database: 'ChEBI',
                  id: 'CHEBI:18420',
                },
              },
            ],
          },
          {
            texts: [
              {
                value:
                  'Forms a complex with either DBF4/DBF4A or DBF4B, leading to the activation of the kinase activity',
              },
            ],
            commentType: 'SUBUNIT',
          },
          {
            commentType: 'INTERACTION',
            interactions: [
              {
                interactantOne: {
                  uniProtKBAccession: 'O00311',
                  intActId: 'EBI-374980',
                },
                interactantTwo: {
                  uniProtKBAccession: 'Q8N9N5-2',
                  geneName: 'BANP',
                  intActId: 'EBI-11524452',
                },
                numberOfExperiments: 3,
                organismDiffer: false,
              },
              {
                interactantOne: {
                  uniProtKBAccession: 'O00311',
                  intActId: 'EBI-374980',
                },
                interactantTwo: {
                  uniProtKBAccession: 'Q13137',
                  geneName: 'CALCOCO2',
                  intActId: 'EBI-739580',
                },
                numberOfExperiments: 3,
                organismDiffer: false,
              },
              {
                interactantOne: {
                  uniProtKBAccession: 'O00311',
                  intActId: 'EBI-374980',
                },
                interactantTwo: {
                  uniProtKBAccession: 'Q9UBU7',
                  geneName: 'DBF4',
                  intActId: 'EBI-372690',
                },
                numberOfExperiments: 7,
                organismDiffer: false,
              },
              {
                interactantOne: {
                  uniProtKBAccession: 'O00311',
                  intActId: 'EBI-374980',
                },
                interactantTwo: {
                  uniProtKBAccession: 'Q9UBU7-1',
                  geneName: 'DBF4',
                  intActId: 'EBI-16017435',
                },
                numberOfExperiments: 3,
                organismDiffer: false,
              },
              {
                interactantOne: {
                  uniProtKBAccession: 'O00311',
                  intActId: 'EBI-374980',
                },
                interactantTwo: {
                  uniProtKBAccession: 'P51114-2',
                  geneName: 'FXR1',
                  intActId: 'EBI-11022345',
                },
                numberOfExperiments: 3,
                organismDiffer: false,
              },
              {
                interactantOne: {
                  uniProtKBAccession: 'O00311',
                  intActId: 'EBI-374980',
                },
                interactantTwo: {
                  uniProtKBAccession: 'Q9UKD1',
                  geneName: 'GMEB2',
                  intActId: 'EBI-948296',
                },
                numberOfExperiments: 3,
                organismDiffer: false,
              },
              {
                interactantOne: {
                  uniProtKBAccession: 'O00311',
                  intActId: 'EBI-374980',
                },
                interactantTwo: {
                  uniProtKBAccession: 'Q08379',
                  geneName: 'GOLGA2',
                  intActId: 'EBI-618309',
                },
                numberOfExperiments: 3,
                organismDiffer: false,
              },
              {
                interactantOne: {
                  uniProtKBAccession: 'O00311',
                  intActId: 'EBI-374980',
                },
                interactantTwo: {
                  uniProtKBAccession: 'Q9NYA3',
                  geneName: 'GOLGA6A',
                  intActId: 'EBI-11163335',
                },
                numberOfExperiments: 3,
                organismDiffer: false,
              },
              {
                interactantOne: {
                  uniProtKBAccession: 'O00311',
                  intActId: 'EBI-374980',
                },
                interactantTwo: {
                  uniProtKBAccession: 'Q6NT76',
                  geneName: 'HMBOX1',
                  intActId: 'EBI-2549423',
                },
                numberOfExperiments: 3,
                organismDiffer: false,
              },
              {
                interactantOne: {
                  uniProtKBAccession: 'O00311',
                  intActId: 'EBI-374980',
                },
                interactantTwo: {
                  uniProtKBAccession: 'P42858',
                  geneName: 'HTT',
                  intActId: 'EBI-466029',
                },
                numberOfExperiments: 3,
                organismDiffer: false,
              },
              {
                interactantOne: {
                  uniProtKBAccession: 'O00311',
                  intActId: 'EBI-374980',
                },
                interactantTwo: {
                  uniProtKBAccession: 'Q13422-7',
                  geneName: 'IKZF1',
                  intActId: 'EBI-11522367',
                },
                numberOfExperiments: 3,
                organismDiffer: false,
              },
              {
                interactantOne: {
                  uniProtKBAccession: 'O00311',
                  intActId: 'EBI-374980',
                },
                interactantTwo: {
                  uniProtKBAccession: 'Q9UKT9',
                  geneName: 'IKZF3',
                  intActId: 'EBI-747204',
                },
                numberOfExperiments: 3,
                organismDiffer: false,
              },
              {
                interactantOne: {
                  uniProtKBAccession: 'O00311',
                  intActId: 'EBI-374980',
                },
                interactantTwo: {
                  uniProtKBAccession: 'Q9H2S9',
                  geneName: 'IKZF4',
                  intActId: 'EBI-1640423',
                },
                numberOfExperiments: 3,
                organismDiffer: false,
              },
              {
                interactantOne: {
                  uniProtKBAccession: 'O00311',
                  intActId: 'EBI-374980',
                },
                interactantTwo: {
                  uniProtKBAccession: 'Q9Y250',
                  geneName: 'LZTS1',
                  intActId: 'EBI-1216080',
                },
                numberOfExperiments: 3,
                organismDiffer: false,
              },
              {
                interactantOne: {
                  uniProtKBAccession: 'O00311',
                  intActId: 'EBI-374980',
                },
                interactantTwo: {
                  uniProtKBAccession: 'Q9BTE3',
                  geneName: 'MCMBP',
                  intActId: 'EBI-749378',
                },
                numberOfExperiments: 2,
                organismDiffer: false,
              },
              {
                interactantOne: {
                  uniProtKBAccession: 'O00311',
                  intActId: 'EBI-374980',
                },
                interactantTwo: {
                  uniProtKBAccession: 'Q6FHY5',
                  geneName: 'MEOX2',
                  intActId: 'EBI-16439278',
                },
                numberOfExperiments: 3,
                organismDiffer: false,
              },
              {
                interactantOne: {
                  uniProtKBAccession: 'O00311',
                  intActId: 'EBI-374980',
                },
                interactantTwo: {
                  uniProtKBAccession: 'Q5JR59-3',
                  geneName: 'MTUS2',
                  intActId: 'EBI-11522433',
                },
                numberOfExperiments: 3,
                organismDiffer: false,
              },
              {
                interactantOne: {
                  uniProtKBAccession: 'O00311',
                  intActId: 'EBI-374980',
                },
                interactantTwo: {
                  uniProtKBAccession: 'Q14140',
                  geneName: 'SERTAD2',
                  intActId: 'EBI-2822051',
                },
                numberOfExperiments: 3,
                organismDiffer: false,
              },
              {
                interactantOne: {
                  uniProtKBAccession: 'O00311',
                  intActId: 'EBI-374980',
                },
                interactantTwo: {
                  uniProtKBAccession: 'O75886',
                  geneName: 'STAM2',
                  intActId: 'EBI-373258',
                },
                numberOfExperiments: 3,
                organismDiffer: false,
              },
              {
                interactantOne: {
                  uniProtKBAccession: 'O00311',
                  intActId: 'EBI-374980',
                },
                interactantTwo: {
                  uniProtKBAccession: 'P55061',
                  geneName: 'TMBIM6',
                  intActId: 'EBI-1045825',
                },
                numberOfExperiments: 3,
                organismDiffer: false,
              },
              {
                interactantOne: {
                  uniProtKBAccession: 'O00311',
                  intActId: 'EBI-374980',
                },
                interactantTwo: {
                  uniProtKBAccession: 'P14373',
                  geneName: 'TRIM27',
                  intActId: 'EBI-719493',
                },
                numberOfExperiments: 3,
                organismDiffer: false,
              },
              {
                interactantOne: {
                  uniProtKBAccession: 'O00311',
                  intActId: 'EBI-374980',
                },
                interactantTwo: {
                  uniProtKBAccession: 'O94972',
                  geneName: 'TRIM37',
                  intActId: 'EBI-741602',
                },
                numberOfExperiments: 3,
                organismDiffer: false,
              },
              {
                interactantOne: {
                  uniProtKBAccession: 'O00311',
                  intActId: 'EBI-374980',
                },
                interactantTwo: {
                  uniProtKBAccession: 'Q2TAA8',
                  geneName: 'TSNAXIP1',
                  intActId: 'EBI-6872498',
                },
                numberOfExperiments: 3,
                organismDiffer: false,
              },
              {
                interactantOne: {
                  uniProtKBAccession: 'O00311',
                  intActId: 'EBI-374980',
                },
                interactantTwo: {
                  uniProtKBAccession: 'P0CW01',
                  geneName: 'TSPY10',
                  intActId: 'EBI-19697726',
                },
                numberOfExperiments: 3,
                organismDiffer: false,
              },
              {
                interactantOne: {
                  uniProtKBAccession: 'O00311',
                  intActId: 'EBI-374980',
                },
                interactantTwo: {
                  uniProtKBAccession: 'Q9Y6T4',
                  geneName: 'WUGSC:H_DJ0726N20.gs.b',
                  intActId: 'EBI-12369705',
                },
                numberOfExperiments: 3,
                organismDiffer: false,
              },
              {
                interactantOne: {
                  uniProtKBAccession: 'O00311',
                  intActId: 'EBI-374980',
                },
                interactantTwo: {
                  uniProtKBAccession: 'Q96DT7-3',
                  geneName: 'ZBTB10',
                  intActId: 'EBI-12017160',
                },
                numberOfExperiments: 3,
                organismDiffer: false,
              },
              {
                interactantOne: {
                  uniProtKBAccession: 'O00311',
                  intActId: 'EBI-374980',
                },
                interactantTwo: {
                  uniProtKBAccession: 'Q9HCK0',
                  geneName: 'ZBTB26',
                  intActId: 'EBI-3918996',
                },
                numberOfExperiments: 3,
                organismDiffer: false,
              },
              {
                interactantOne: {
                  uniProtKBAccession: 'O00311',
                  intActId: 'EBI-374980',
                },
                interactantTwo: {
                  uniProtKBAccession: 'Q8NAP8',
                  geneName: 'ZBTB8B',
                  intActId: 'EBI-17494306',
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
                  value: 'Nucleus',
                  id: 'SL-0191',
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
                isoformIds: ['O00311-1'],
                isoformSequenceStatus: 'Displayed',
              },
            ],
            note: {
              texts: [
                {
                  value: 'A number of isoforms may be produced.',
                },
              ],
            },
          },
          {
            texts: [
              {
                evidences: [
                  {
                    evidenceCode: 'ECO:0000255',
                    source: 'PROSITE-ProRule',
                    id: 'PRU00159',
                  },
                ],
                value:
                  'Belongs to the protein kinase superfamily. Ser/Thr protein kinase family. CDC7 subfamily',
              },
            ],
            commentType: 'SIMILARITY',
          },
          {
            commentType: 'WEB RESOURCE',
            resourceName: 'NIEHS-SNPs',
            resourceUrl: 'http://egp.gs.washington.edu/data/cdc7/',
            ftp: false,
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
                value: 574,
                modifier: 'EXACT',
              },
            },
            description: 'Cell division cycle 7-related protein kinase',
            featureId: 'PRO_0000085763',
          },
          {
            type: 'Domain',
            location: {
              start: {
                value: 58,
                modifier: 'EXACT',
              },
              end: {
                value: 574,
                modifier: 'EXACT',
              },
            },
            description: 'Protein kinase',
            evidences: [
              {
                evidenceCode: 'ECO:0000255',
                source: 'PROSITE-ProRule',
                id: 'PRU00159',
              },
            ],
          },
          {
            type: 'Nucleotide binding',
            location: {
              start: {
                value: 64,
                modifier: 'EXACT',
              },
              end: {
                value: 72,
                modifier: 'EXACT',
              },
            },
            description: 'ATP',
            evidences: [
              {
                evidenceCode: 'ECO:0000255',
                source: 'PROSITE-ProRule',
                id: 'PRU00159',
              },
            ],
          },
          {
            type: 'Active site',
            location: {
              start: {
                value: 177,
                modifier: 'EXACT',
              },
              end: {
                value: 177,
                modifier: 'EXACT',
              },
            },
            description: 'Proton acceptor',
            evidences: [
              {
                evidenceCode: 'ECO:0000255',
                source: 'PROSITE-ProRule',
                id: 'PRU00159',
              },
              {
                evidenceCode: 'ECO:0000255',
                source: 'PROSITE-ProRule',
                id: 'PRU10027',
              },
            ],
          },
          {
            type: 'Binding site',
            location: {
              start: {
                value: 90,
                modifier: 'EXACT',
              },
              end: {
                value: 90,
                modifier: 'EXACT',
              },
            },
            description: 'ATP',
            evidences: [
              {
                evidenceCode: 'ECO:0000255',
                source: 'PROSITE-ProRule',
                id: 'PRU00159',
              },
            ],
          },
          {
            type: 'Modified residue',
            location: {
              start: {
                value: 27,
                modifier: 'EXACT',
              },
              end: {
                value: 27,
                modifier: 'EXACT',
              },
            },
            description: 'Phosphoserine',
            evidences: [
              {
                evidenceCode: 'ECO:0007744',
                source: 'PubMed',
                id: '19369195',
              },
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
                value: 503,
                modifier: 'EXACT',
              },
              end: {
                value: 503,
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
            type: 'Cross-link',
            location: {
              start: {
                value: 268,
                modifier: 'EXACT',
              },
              end: {
                value: 268,
                modifier: 'EXACT',
              },
            },
            description:
              'Glycyl lysine isopeptide (Lys-Gly) (interchain with G-Cter in SUMO2)',
            evidences: [
              {
                evidenceCode: 'ECO:0007744',
                source: 'PubMed',
                id: '28112733',
              },
            ],
          },
          {
            type: 'Natural variant',
            location: {
              start: {
                value: 23,
                modifier: 'EXACT',
              },
              end: {
                value: 23,
                modifier: 'EXACT',
              },
            },
            description: 'in dbSNP:rs13447459',
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'Reference',
                id: 'Ref.4',
              },
            ],
            featureId: 'VAR_019255',
            alternativeSequence: {
              originalSequence: 'Q',
              alternativeSequences: ['P'],
            },
          },
          {
            type: 'Natural variant',
            location: {
              start: {
                value: 99,
                modifier: 'EXACT',
              },
              end: {
                value: 99,
                modifier: 'EXACT',
              },
            },
            description: 'in dbSNP:rs13447492',
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'Reference',
                id: 'Ref.4',
              },
            ],
            featureId: 'VAR_019256',
            alternativeSequence: {
              originalSequence: 'I',
              alternativeSequences: ['V'],
            },
          },
          {
            type: 'Natural variant',
            location: {
              start: {
                value: 112,
                modifier: 'EXACT',
              },
              end: {
                value: 112,
                modifier: 'EXACT',
              },
            },
            description: 'in dbSNP:rs13447493',
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'Reference',
                id: 'Ref.4',
              },
            ],
            featureId: 'VAR_019257',
            alternativeSequence: {
              originalSequence: 'G',
              alternativeSequences: ['W'],
            },
          },
          {
            type: 'Natural variant',
            location: {
              start: {
                value: 162,
                modifier: 'EXACT',
              },
              end: {
                value: 162,
                modifier: 'EXACT',
              },
            },
            description: 'in dbSNP:rs13447503',
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '17344846',
              },
              {
                evidenceCode: 'ECO:0000269',
                source: 'Reference',
                id: 'Ref.4',
              },
            ],
            featureId: 'VAR_019258',
            alternativeSequence: {
              originalSequence: 'F',
              alternativeSequences: ['L'],
            },
          },
          {
            type: 'Natural variant',
            location: {
              start: {
                value: 208,
                modifier: 'EXACT',
              },
              end: {
                value: 208,
                modifier: 'EXACT',
              },
            },
            description: 'in dbSNP:rs34979509',
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '17344846',
              },
            ],
            featureId: 'VAR_040403',
            alternativeSequence: {
              originalSequence: 'I',
              alternativeSequences: ['M'],
            },
          },
          {
            type: 'Natural variant',
            location: {
              start: {
                value: 209,
                modifier: 'EXACT',
              },
              end: {
                value: 209,
                modifier: 'EXACT',
              },
            },
            description: 'in dbSNP:rs56327502',
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '17344846',
              },
            ],
            featureId: 'VAR_040404',
            alternativeSequence: {
              originalSequence: 'E',
              alternativeSequences: ['D'],
            },
          },
          {
            type: 'Natural variant',
            location: {
              start: {
                value: 441,
                modifier: 'EXACT',
              },
              end: {
                value: 441,
                modifier: 'EXACT',
              },
            },
            description: 'in dbSNP:rs13447539',
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '17344846',
              },
              {
                evidenceCode: 'ECO:0000269',
                source: 'Reference',
                id: 'Ref.4',
              },
            ],
            featureId: 'VAR_019259',
            alternativeSequence: {
              originalSequence: 'K',
              alternativeSequences: ['R'],
            },
          },
          {
            type: 'Natural variant',
            location: {
              start: {
                value: 472,
                modifier: 'EXACT',
              },
              end: {
                value: 472,
                modifier: 'EXACT',
              },
            },
            description: 'in dbSNP:rs56381770',
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '17344846',
              },
            ],
            featureId: 'VAR_040405',
            alternativeSequence: {
              originalSequence: 'T',
              alternativeSequences: ['I'],
            },
          },
          {
            type: 'Natural variant',
            location: {
              start: {
                value: 498,
                modifier: 'EXACT',
              },
              end: {
                value: 498,
                modifier: 'EXACT',
              },
            },
            description: 'in dbSNP:rs35055915',
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '17344846',
              },
            ],
            featureId: 'VAR_040406',
            alternativeSequence: {
              originalSequence: 'S',
              alternativeSequences: ['A'],
            },
          },
          {
            type: 'Sequence conflict',
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
            description: 'in Ref. 3; AAB97512',
            evidences: [
              {
                evidenceCode: 'ECO:0000305',
              },
            ],
            alternativeSequence: {
              originalSequence: 'L',
              alternativeSequences: ['V'],
            },
          },
          {
            type: 'Helix',
            location: {
              start: {
                value: 39,
                modifier: 'EXACT',
              },
              end: {
                value: 50,
                modifier: 'EXACT',
              },
            },
            description: '',
            evidences: [
              {
                evidenceCode: 'ECO:0007744',
                source: 'PDB',
                id: '6YA6',
              },
            ],
          },
          {
            type: 'Helix',
            location: {
              start: {
                value: 52,
                modifier: 'EXACT',
              },
              end: {
                value: 56,
                modifier: 'EXACT',
              },
            },
            description: '',
            evidences: [
              {
                evidenceCode: 'ECO:0007744',
                source: 'PDB',
                id: '6YA6',
              },
            ],
          },
          {
            type: 'Beta strand',
            location: {
              start: {
                value: 59,
                modifier: 'EXACT',
              },
              end: {
                value: 66,
                modifier: 'EXACT',
              },
            },
            description: '',
            evidences: [
              {
                evidenceCode: 'ECO:0007744',
                source: 'PDB',
                id: '6YA6',
              },
            ],
          },
          {
            type: 'Beta strand',
            location: {
              start: {
                value: 68,
                modifier: 'EXACT',
              },
              end: {
                value: 79,
                modifier: 'EXACT',
              },
            },
            description: '',
            evidences: [
              {
                evidenceCode: 'ECO:0007744',
                source: 'PDB',
                id: '6YA6',
              },
            ],
          },
          {
            type: 'Beta strand',
            location: {
              start: {
                value: 84,
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
                evidenceCode: 'ECO:0007744',
                source: 'PDB',
                id: '6YA6',
              },
            ],
          },
          {
            type: 'Helix',
            location: {
              start: {
                value: 98,
                modifier: 'EXACT',
              },
              end: {
                value: 110,
                modifier: 'EXACT',
              },
            },
            description: '',
            evidences: [
              {
                evidenceCode: 'ECO:0007744',
                source: 'PDB',
                id: '6YA6',
              },
            ],
          },
          {
            type: 'Beta strand',
            location: {
              start: {
                value: 121,
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
                evidenceCode: 'ECO:0007744',
                source: 'PDB',
                id: '6YA6',
              },
            ],
          },
          {
            type: 'Beta strand',
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
                evidenceCode: 'ECO:0007744',
                source: 'PDB',
                id: '6YA6',
              },
            ],
          },
          {
            type: 'Helix',
            location: {
              start: {
                value: 142,
                modifier: 'EXACT',
              },
              end: {
                value: 145,
                modifier: 'EXACT',
              },
            },
            description: '',
            evidences: [
              {
                evidenceCode: 'ECO:0007744',
                source: 'PDB',
                id: '6YA6',
              },
            ],
          },
          {
            type: 'Turn',
            location: {
              start: {
                value: 146,
                modifier: 'EXACT',
              },
              end: {
                value: 148,
                modifier: 'EXACT',
              },
            },
            description: '',
            evidences: [
              {
                evidenceCode: 'ECO:0007744',
                source: 'PDB',
                id: '6YA7',
              },
            ],
          },
          {
            type: 'Helix',
            location: {
              start: {
                value: 151,
                modifier: 'EXACT',
              },
              end: {
                value: 170,
                modifier: 'EXACT',
              },
            },
            description: '',
            evidences: [
              {
                evidenceCode: 'ECO:0007744',
                source: 'PDB',
                id: '6YA6',
              },
            ],
          },
          {
            type: 'Helix',
            location: {
              start: {
                value: 180,
                modifier: 'EXACT',
              },
              end: {
                value: 182,
                modifier: 'EXACT',
              },
            },
            description: '',
            evidences: [
              {
                evidenceCode: 'ECO:0007744',
                source: 'PDB',
                id: '6YA6',
              },
            ],
          },
          {
            type: 'Beta strand',
            location: {
              start: {
                value: 183,
                modifier: 'EXACT',
              },
              end: {
                value: 186,
                modifier: 'EXACT',
              },
            },
            description: '',
            evidences: [
              {
                evidenceCode: 'ECO:0007744',
                source: 'PDB',
                id: '6YA6',
              },
            ],
          },
          {
            type: 'Turn',
            location: {
              start: {
                value: 187,
                modifier: 'EXACT',
              },
              end: {
                value: 190,
                modifier: 'EXACT',
              },
            },
            description: '',
            evidences: [
              {
                evidenceCode: 'ECO:0007744',
                source: 'PDB',
                id: '6YA6',
              },
            ],
          },
          {
            type: 'Beta strand',
            location: {
              start: {
                value: 191,
                modifier: 'EXACT',
              },
              end: {
                value: 194,
                modifier: 'EXACT',
              },
            },
            description: '',
            evidences: [
              {
                evidenceCode: 'ECO:0007744',
                source: 'PDB',
                id: '6YA6',
              },
            ],
          },
          {
            type: 'Helix',
            location: {
              start: {
                value: 209,
                modifier: 'EXACT',
              },
              end: {
                value: 213,
                modifier: 'EXACT',
              },
            },
            description: '',
            evidences: [
              {
                evidenceCode: 'ECO:0007744',
                source: 'PDB',
                id: '6YA6',
              },
            ],
          },
          {
            type: 'Beta strand',
            location: {
              start: {
                value: 214,
                modifier: 'EXACT',
              },
              end: {
                value: 217,
                modifier: 'EXACT',
              },
            },
            description: '',
            evidences: [
              {
                evidenceCode: 'ECO:0007744',
                source: 'PDB',
                id: '6YA7',
              },
            ],
          },
          {
            type: 'Turn',
            location: {
              start: {
                value: 352,
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
                evidenceCode: 'ECO:0007744',
                source: 'PDB',
                id: '6YA6',
              },
            ],
          },
          {
            type: 'Beta strand',
            location: {
              start: {
                value: 356,
                modifier: 'EXACT',
              },
              end: {
                value: 359,
                modifier: 'EXACT',
              },
            },
            description: '',
            evidences: [
              {
                evidenceCode: 'ECO:0007744',
                source: 'PDB',
                id: '6YA6',
              },
            ],
          },
          {
            type: 'Helix',
            location: {
              start: {
                value: 361,
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
                evidenceCode: 'ECO:0007744',
                source: 'PDB',
                id: '6YA6',
              },
            ],
          },
          {
            type: 'Helix',
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
                evidenceCode: 'ECO:0007744',
                source: 'PDB',
                id: '6YA8',
              },
            ],
          },
          {
            type: 'Helix',
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
                evidenceCode: 'ECO:0007744',
                source: 'PDB',
                id: '6YA6',
              },
            ],
          },
          {
            type: 'Helix',
            location: {
              start: {
                value: 394,
                modifier: 'EXACT',
              },
              end: {
                value: 409,
                modifier: 'EXACT',
              },
            },
            description: '',
            evidences: [
              {
                evidenceCode: 'ECO:0007744',
                source: 'PDB',
                id: '6YA6',
              },
            ],
          },
          {
            type: 'Beta strand',
            location: {
              start: {
                value: 412,
                modifier: 'EXACT',
              },
              end: {
                value: 414,
                modifier: 'EXACT',
              },
            },
            description: '',
            evidences: [
              {
                evidenceCode: 'ECO:0007744',
                source: 'PDB',
                id: '6YA6',
              },
            ],
          },
          {
            type: 'Helix',
            location: {
              start: {
                value: 420,
                modifier: 'EXACT',
              },
              end: {
                value: 431,
                modifier: 'EXACT',
              },
            },
            description: '',
            evidences: [
              {
                evidenceCode: 'ECO:0007744',
                source: 'PDB',
                id: '6YA6',
              },
            ],
          },
          {
            type: 'Helix',
            location: {
              start: {
                value: 433,
                modifier: 'EXACT',
              },
              end: {
                value: 442,
                modifier: 'EXACT',
              },
            },
            description: '',
            evidences: [
              {
                evidenceCode: 'ECO:0007744',
                source: 'PDB',
                id: '6YA6',
              },
            ],
          },
          {
            type: 'Beta strand',
            location: {
              start: {
                value: 445,
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
                evidenceCode: 'ECO:0007744',
                source: 'PDB',
                id: '6YA6',
              },
            ],
          },
          {
            type: 'Helix',
            location: {
              start: {
                value: 458,
                modifier: 'EXACT',
              },
              end: {
                value: 466,
                modifier: 'EXACT',
              },
            },
            description: '',
            evidences: [
              {
                evidenceCode: 'ECO:0007744',
                source: 'PDB',
                id: '6YA6',
              },
            ],
          },
          {
            type: 'Helix',
            location: {
              start: {
                value: 534,
                modifier: 'EXACT',
              },
              end: {
                value: 537,
                modifier: 'EXACT',
              },
            },
            description: '',
            evidences: [
              {
                evidenceCode: 'ECO:0007744',
                source: 'PDB',
                id: '6YA7',
              },
            ],
          },
          {
            type: 'Helix',
            location: {
              start: {
                value: 540,
                modifier: 'EXACT',
              },
              end: {
                value: 549,
                modifier: 'EXACT',
              },
            },
            description: '',
            evidences: [
              {
                evidenceCode: 'ECO:0007744',
                source: 'PDB',
                id: '6YA6',
              },
            ],
          },
          {
            type: 'Turn',
            location: {
              start: {
                value: 554,
                modifier: 'EXACT',
              },
              end: {
                value: 556,
                modifier: 'EXACT',
              },
            },
            description: '',
            evidences: [
              {
                evidenceCode: 'ECO:0007744',
                source: 'PDB',
                id: '6YA6',
              },
            ],
          },
          {
            type: 'Helix',
            location: {
              start: {
                value: 560,
                modifier: 'EXACT',
              },
              end: {
                value: 563,
                modifier: 'EXACT',
              },
            },
            description: '',
            evidences: [
              {
                evidenceCode: 'ECO:0007744',
                source: 'PDB',
                id: '6YA6',
              },
            ],
          },
          {
            type: 'Helix',
            location: {
              start: {
                value: 567,
                modifier: 'EXACT',
              },
              end: {
                value: 569,
                modifier: 'EXACT',
              },
            },
            description: '',
            evidences: [
              {
                evidenceCode: 'ECO:0007744',
                source: 'PDB',
                id: '6YA6',
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
            id: 'KW-0067',
            category: 'Ligand',
            name: 'ATP-binding',
          },
          {
            id: 'KW-0131',
            category: 'Biological process',
            name: 'Cell cycle',
          },
          {
            id: 'KW-0132',
            category: 'Biological process',
            name: 'Cell division',
          },
          {
            id: 'KW-1017',
            category: 'PTM',
            name: 'Isopeptide bond',
          },
          {
            id: 'KW-0418',
            category: 'Molecular function',
            name: 'Kinase',
          },
          {
            id: 'KW-0460',
            category: 'Ligand',
            name: 'Magnesium',
          },
          {
            id: 'KW-0479',
            category: 'Ligand',
            name: 'Metal-binding',
          },
          {
            id: 'KW-0547',
            category: 'Ligand',
            name: 'Nucleotide-binding',
          },
          {
            id: 'KW-0539',
            category: 'Cellular component',
            name: 'Nucleus',
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
            id: 'KW-0723',
            category: 'Molecular function',
            name: 'Serine/threonine-protein kinase',
          },
          {
            id: 'KW-0808',
            category: 'Molecular function',
            name: 'Transferase',
          },
          {
            id: 'KW-0832',
            category: 'PTM',
            name: 'Ubl conjugation',
          },
        ],
        references: [
          {
            citation: {
              id: '9250678',
              citationType: 'journal article',
              authors: ['Sato N.', 'Arai K.', 'Masai H.'],
              citationCrossReferences: [
                {
                  database: 'PubMed',
                  id: '9250678',
                },
                {
                  database: 'DOI',
                  id: '10.1093/emboj/16.14.4340',
                },
              ],
              title:
                'Human and Xenopus cDNAs encoding budding yeast Cdc7-related kinases: in vitro phosphorylation of MCM subunits by a putative human homologue of Cdc7.',
              publicationDate: '1997',
              journal: 'EMBO J.',
              firstPage: '4340',
              lastPage: '4351',
              volume: '16',
            },
            referencePositions: ['NUCLEOTIDE SEQUENCE [MRNA]'],
            referenceComments: [
              {
                value: 'Liver',
                type: 'TISSUE',
              },
              {
                value: 'Testis',
                type: 'TISSUE',
              },
            ],
          },
          {
            citation: {
              id: '9573348',
              citationType: 'journal article',
              authors: [
                'Hess G.F.',
                'Drong R.F.',
                'Weiland K.L.',
                'Slightom J.L.',
                'Sclafani R.A.',
                'Hollingsworth R.E.',
              ],
              citationCrossReferences: [
                {
                  database: 'PubMed',
                  id: '9573348',
                },
                {
                  database: 'DOI',
                  id: '10.1016/s0378-1119(98)00094-8',
                },
              ],
              title:
                'A human homolog of the yeast CDC7 gene is overexpressed in some tumors and transformed cell lines.',
              publicationDate: '1998',
              journal: 'Gene',
              firstPage: '133',
              lastPage: '140',
              volume: '211',
            },
            referencePositions: ['NUCLEOTIDE SEQUENCE [MRNA]'],
          },
          {
            citation: {
              id: '9405610',
              citationType: 'journal article',
              authors: ['Jiang W.', 'Hunter T.'],
              citationCrossReferences: [
                {
                  database: 'PubMed',
                  id: '9405610',
                },
                {
                  database: 'DOI',
                  id: '10.1073/pnas.94.26.14320',
                },
              ],
              title:
                'Identification and characterization of a human protein kinase related to budding yeast Cdc7p.',
              publicationDate: '1997',
              journal: 'Proc. Natl. Acad. Sci. U.S.A.',
              firstPage: '14320',
              lastPage: '14325',
              volume: '94',
            },
            referencePositions: [
              'NUCLEOTIDE SEQUENCE [MRNA]',
              'CHARACTERIZATION',
            ],
          },
          {
            citation: {
              id: 'CI-86ALJBSIEO59V',
              citationType: 'submission',
              authoringGroup: ['NIEHS SNPs program'],
              publicationDate: 'MAR-2004',
              submissionDatabase: 'EMBL/GenBank/DDBJ databases',
            },
            referencePositions: [
              'NUCLEOTIDE SEQUENCE [GENOMIC DNA]',
              'VARIANTS PRO-23; VAL-99; TRP-112; LEU-162 AND ARG-441',
            ],
          },
          {
            citation: {
              id: '16710414',
              citationType: 'journal article',
              authors: [
                'Gregory S.G.',
                'Barlow K.F.',
                'McLay K.E.',
                'Kaul R.',
                'Swarbreck D.',
                'Dunham A.',
                'Scott C.E.',
                'Howe K.L.',
                'Woodfine K.',
                'Spencer C.C.A.',
                'Jones M.C.',
                'Gillson C.',
                'Searle S.',
                'Zhou Y.',
                'Kokocinski F.',
                'McDonald L.',
                'Evans R.',
                'Phillips K.',
                'Atkinson A.',
                'Cooper R.',
                'Jones C.',
                'Hall R.E.',
                'Andrews T.D.',
                'Lloyd C.',
                'Ainscough R.',
                'Almeida J.P.',
                'Ambrose K.D.',
                'Anderson F.',
                'Andrew R.W.',
                'Ashwell R.I.S.',
                'Aubin K.',
                'Babbage A.K.',
                'Bagguley C.L.',
                'Bailey J.',
                'Beasley H.',
                'Bethel G.',
                'Bird C.P.',
                'Bray-Allen S.',
                'Brown J.Y.',
                'Brown A.J.',
                'Buckley D.',
                'Burton J.',
                'Bye J.',
                'Carder C.',
                'Chapman J.C.',
                'Clark S.Y.',
                'Clarke G.',
                'Clee C.',
                'Cobley V.',
                'Collier R.E.',
                'Corby N.',
                'Coville G.J.',
                'Davies J.',
                'Deadman R.',
                'Dunn M.',
                'Earthrowl M.',
                'Ellington A.G.',
                'Errington H.',
                'Frankish A.',
                'Frankland J.',
                'French L.',
                'Garner P.',
                'Garnett J.',
                'Gay L.',
                'Ghori M.R.J.',
                'Gibson R.',
                'Gilby L.M.',
                'Gillett W.',
                'Glithero R.J.',
                'Grafham D.V.',
                'Griffiths C.',
                'Griffiths-Jones S.',
                'Grocock R.',
                'Hammond S.',
                'Harrison E.S.I.',
                'Hart E.',
                'Haugen E.',
                'Heath P.D.',
                'Holmes S.',
                'Holt K.',
                'Howden P.J.',
                'Hunt A.R.',
                'Hunt S.E.',
                'Hunter G.',
                'Isherwood J.',
                'James R.',
                'Johnson C.',
                'Johnson D.',
                'Joy A.',
                'Kay M.',
                'Kershaw J.K.',
                'Kibukawa M.',
                'Kimberley A.M.',
                'King A.',
                'Knights A.J.',
                'Lad H.',
                'Laird G.',
                'Lawlor S.',
                'Leongamornlert D.A.',
                'Lloyd D.M.',
                'Loveland J.',
                'Lovell J.',
                'Lush M.J.',
                'Lyne R.',
                'Martin S.',
                'Mashreghi-Mohammadi M.',
                'Matthews L.',
                'Matthews N.S.W.',
                'McLaren S.',
                'Milne S.',
                'Mistry S.',
                'Moore M.J.F.',
                'Nickerson T.',
                "O'Dell C.N.",
                'Oliver K.',
                'Palmeiri A.',
                'Palmer S.A.',
                'Parker A.',
                'Patel D.',
                'Pearce A.V.',
                'Peck A.I.',
                'Pelan S.',
                'Phelps K.',
                'Phillimore B.J.',
                'Plumb R.',
                'Rajan J.',
                'Raymond C.',
                'Rouse G.',
                'Saenphimmachak C.',
                'Sehra H.K.',
                'Sheridan E.',
                'Shownkeen R.',
                'Sims S.',
                'Skuce C.D.',
                'Smith M.',
                'Steward C.',
                'Subramanian S.',
                'Sycamore N.',
                'Tracey A.',
                'Tromans A.',
                'Van Helmond Z.',
                'Wall M.',
                'Wallis J.M.',
                'White S.',
                'Whitehead S.L.',
                'Wilkinson J.E.',
                'Willey D.L.',
                'Williams H.',
                'Wilming L.',
                'Wray P.W.',
                'Wu Z.',
                'Coulson A.',
                'Vaudin M.',
                'Sulston J.E.',
                'Durbin R.M.',
                'Hubbard T.',
                'Wooster R.',
                'Dunham I.',
                'Carter N.P.',
                'McVean G.',
                'Ross M.T.',
                'Harrow J.',
                'Olson M.V.',
                'Beck S.',
                'Rogers J.',
                'Bentley D.R.',
              ],
              citationCrossReferences: [
                {
                  database: 'PubMed',
                  id: '16710414',
                },
                {
                  database: 'DOI',
                  id: '10.1038/nature04727',
                },
              ],
              title:
                'The DNA sequence and biological annotation of human chromosome 1.',
              publicationDate: '2006',
              journal: 'Nature',
              firstPage: '315',
              lastPage: '321',
              volume: '441',
            },
            referencePositions: [
              'NUCLEOTIDE SEQUENCE [LARGE SCALE GENOMIC DNA]',
            ],
          },
          {
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
            referencePositions: [
              'NUCLEOTIDE SEQUENCE [LARGE SCALE GENOMIC DNA]',
            ],
          },
          {
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
            referencePositions: ['NUCLEOTIDE SEQUENCE [LARGE SCALE MRNA]'],
          },
          {
            citation: {
              id: '10373557',
              citationType: 'journal article',
              authors: [
                'Kumagai H.',
                'Sato N.',
                'Yamada M.',
                'Mahony D.',
                'Seghezzi W.',
                'Lees E.',
                'Arai K.',
                'Masai H.',
              ],
              citationCrossReferences: [
                {
                  database: 'PubMed',
                  id: '10373557',
                },
                {
                  database: 'DOI',
                  id: '10.1128/mcb.19.7.5083',
                },
              ],
              title:
                'A novel growth- and cell cycle-regulated protein, ASK, activates human Cdc7-related kinase and is essential for G1/S transition in mammalian cells.',
              publicationDate: '1999',
              journal: 'Mol. Cell. Biol.',
              firstPage: '5083',
              lastPage: '5095',
              volume: '19',
            },
            referencePositions: ['INTERACTION WITH DBF4'],
          },
          {
            citation: {
              id: '12065429',
              citationType: 'journal article',
              authors: [
                'Montagnoli A.',
                'Bosotti R.',
                'Villa F.',
                'Rialland M.',
                'Brotherton D.',
                'Mercurio C.',
                'Berthelsen J.',
                'Santocanale C.',
              ],
              citationCrossReferences: [
                {
                  database: 'PubMed',
                  id: '12065429',
                },
                {
                  database: 'DOI',
                  id: '10.1093/emboj/cdf290',
                },
              ],
              title: 'Drf1, a novel regulatory subunit for human Cdc7 kinase.',
              publicationDate: '2002',
              journal: 'EMBO J.',
              firstPage: '3171',
              lastPage: '3181',
              volume: '21',
            },
            referencePositions: ['FUNCTION', 'INTERACTION WITH DBF4B'],
          },
          {
            citation: {
              id: '15668232',
              citationType: 'journal article',
              authors: [
                'Yoshizawa-Sugata N.',
                'Ishii A.',
                'Taniyama C.',
                'Matsui E.',
                'Arai K.',
                'Masai H.',
              ],
              citationCrossReferences: [
                {
                  database: 'PubMed',
                  id: '15668232',
                },
                {
                  database: 'DOI',
                  id: '10.1074/jbc.m411653200',
                },
              ],
              title:
                'A second human Dbf4/ASK-related protein, Drf1/ASKL1, is required for efficient progression of S and M phases.',
              publicationDate: '2005',
              journal: 'J. Biol. Chem.',
              firstPage: '13062',
              lastPage: '13070',
              volume: '280',
            },
            referencePositions: ['INTERACTION WITH DBF4B'],
          },
          {
            citation: {
              id: '17062569',
              citationType: 'journal article',
              authors: [
                'Tenca P.',
                'Brotherton D.',
                'Montagnoli A.',
                'Rainoldi S.',
                'Albanese C.',
                'Santocanale C.',
              ],
              citationCrossReferences: [
                {
                  database: 'PubMed',
                  id: '17062569',
                },
                {
                  database: 'DOI',
                  id: '10.1074/jbc.m604457200',
                },
              ],
              title:
                'Cdc7 is an active kinase in human cancer cells undergoing replication stress.',
              publicationDate: '2007',
              journal: 'J. Biol. Chem.',
              firstPage: '208',
              lastPage: '215',
              volume: '282',
            },
            referencePositions: ['INTERACTION WITH DBF4 AND DBF4B'],
          },
          {
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
              'IDENTIFICATION BY MASS SPECTROMETRY [LARGE SCALE ANALYSIS]',
            ],
          },
          {
            citation: {
              id: '19369195',
              citationType: 'journal article',
              authors: [
                'Oppermann F.S.',
                'Gnad F.',
                'Olsen J.V.',
                'Hornberger R.',
                'Greff Z.',
                'Keri G.',
                'Mann M.',
                'Daub H.',
              ],
              citationCrossReferences: [
                {
                  database: 'PubMed',
                  id: '19369195',
                },
                {
                  database: 'DOI',
                  id: '10.1074/mcp.m800588-mcp200',
                },
              ],
              title: 'Large-scale proteomics analysis of the human kinome.',
              publicationDate: '2009',
              journal: 'Mol. Cell. Proteomics',
              firstPage: '1751',
              lastPage: '1764',
              volume: '8',
            },
            referencePositions: [
              'PHOSPHORYLATION [LARGE SCALE ANALYSIS] AT SER-27',
              'IDENTIFICATION BY MASS SPECTROMETRY [LARGE SCALE ANALYSIS]',
            ],
          },
          {
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
              'PHOSPHORYLATION [LARGE SCALE ANALYSIS] AT SER-27 AND THR-503',
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
            citation: {
              id: '28112733',
              citationType: 'journal article',
              authors: [
                'Hendriks I.A.',
                'Lyon D.',
                'Young C.',
                'Jensen L.J.',
                'Vertegaal A.C.',
                'Nielsen M.L.',
              ],
              citationCrossReferences: [
                {
                  database: 'PubMed',
                  id: '28112733',
                },
                {
                  database: 'DOI',
                  id: '10.1038/nsmb.3366',
                },
              ],
              title:
                'Site-specific mapping of the human SUMO proteome reveals co-modification with phosphorylation.',
              publicationDate: '2017',
              journal: 'Nat. Struct. Mol. Biol.',
              firstPage: '325',
              lastPage: '336',
              volume: '24',
            },
            referencePositions: [
              'SUMOYLATION [LARGE SCALE ANALYSIS] AT LYS-268',
              'IDENTIFICATION BY MASS SPECTROMETRY [LARGE SCALE ANALYSIS]',
            ],
          },
          {
            citation: {
              id: '17344846',
              citationType: 'journal article',
              authors: [
                'Greenman C.',
                'Stephens P.',
                'Smith R.',
                'Dalgliesh G.L.',
                'Hunter C.',
                'Bignell G.',
                'Davies H.',
                'Teague J.',
                'Butler A.',
                'Stevens C.',
                'Edkins S.',
                "O'Meara S.",
                'Vastrik I.',
                'Schmidt E.E.',
                'Avis T.',
                'Barthorpe S.',
                'Bhamra G.',
                'Buck G.',
                'Choudhury B.',
                'Clements J.',
                'Cole J.',
                'Dicks E.',
                'Forbes S.',
                'Gray K.',
                'Halliday K.',
                'Harrison R.',
                'Hills K.',
                'Hinton J.',
                'Jenkinson A.',
                'Jones D.',
                'Menzies A.',
                'Mironenko T.',
                'Perry J.',
                'Raine K.',
                'Richardson D.',
                'Shepherd R.',
                'Small A.',
                'Tofts C.',
                'Varian J.',
                'Webb T.',
                'West S.',
                'Widaa S.',
                'Yates A.',
                'Cahill D.P.',
                'Louis D.N.',
                'Goldstraw P.',
                'Nicholson A.G.',
                'Brasseur F.',
                'Looijenga L.',
                'Weber B.L.',
                'Chiew Y.-E.',
                'DeFazio A.',
                'Greaves M.F.',
                'Green A.R.',
                'Campbell P.',
                'Birney E.',
                'Easton D.F.',
                'Chenevix-Trench G.',
                'Tan M.-H.',
                'Khoo S.K.',
                'Teh B.T.',
                'Yuen S.T.',
                'Leung S.Y.',
                'Wooster R.',
                'Futreal P.A.',
                'Stratton M.R.',
              ],
              citationCrossReferences: [
                {
                  database: 'PubMed',
                  id: '17344846',
                },
                {
                  database: 'DOI',
                  id: '10.1038/nature05610',
                },
              ],
              title: 'Patterns of somatic mutation in human cancer genomes.',
              publicationDate: '2007',
              journal: 'Nature',
              firstPage: '153',
              lastPage: '158',
              volume: '446',
            },
            referencePositions: [
              'VARIANTS [LARGE SCALE ANALYSIS] LEU-162; MET-208; ASP-209; ARG-441; ILE-472 AND ALA-498',
            ],
          },
        ],
        uniProtKBCrossReferences: [
          {
            database: 'EMBL',
            id: 'AB003698',
            properties: [
              {
                key: 'ProteinId',
                value: 'BAA19962.1',
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
            id: 'AF015592',
            properties: [
              {
                key: 'ProteinId',
                value: 'AAC52080.1',
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
            id: 'AF005209',
            properties: [
              {
                key: 'ProteinId',
                value: 'AAB97512.1',
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
            id: 'AY585721',
            properties: [
              {
                key: 'ProteinId',
                value: 'AAS79323.1',
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
            id: 'AL355871',
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
            id: 'CH471097',
            properties: [
              {
                key: 'ProteinId',
                value: 'EAW73114.1',
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
            id: 'CH471097',
            properties: [
              {
                key: 'ProteinId',
                value: 'EAW73115.1',
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
            id: 'BC110526',
            properties: [
              {
                key: 'ProteinId',
                value: 'AAI10527.1',
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
            id: 'BC110527',
            properties: [
              {
                key: 'ProteinId',
                value: 'AAI10528.1',
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
            id: 'BC111044',
            properties: [
              {
                key: 'ProteinId',
                value: 'AAI11045.1',
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
            database: 'CCDS',
            id: 'CCDS734.1',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
            isoformId: 'O00311-1',
          },
          {
            database: 'RefSeq',
            id: 'NP_001127891.1',
            properties: [
              {
                key: 'NucleotideSequenceId',
                value: 'NM_001134419.1',
              },
            ],
            isoformId: 'O00311-1',
          },
          {
            database: 'RefSeq',
            id: 'NP_001127892.1',
            properties: [
              {
                key: 'NucleotideSequenceId',
                value: 'NM_001134420.1',
              },
            ],
            isoformId: 'O00311-1',
          },
          {
            database: 'RefSeq',
            id: 'NP_003494.1',
            properties: [
              {
                key: 'NucleotideSequenceId',
                value: 'NM_003503.3',
              },
            ],
            isoformId: 'O00311-1',
          },
          {
            database: 'RefSeq',
            id: 'XP_005271298.1',
            properties: [
              {
                key: 'NucleotideSequenceId',
                value: 'XM_005271241.2',
              },
            ],
            isoformId: 'O00311-1',
          },
          {
            database: 'PDB',
            id: '4F99',
            properties: [
              {
                key: 'Method',
                value: 'X-ray',
              },
              {
                key: 'Resolution',
                value: '2.33 A',
              },
              {
                key: 'Chains',
                value: 'A=37-574',
              },
            ],
          },
          {
            database: 'PDB',
            id: '4F9A',
            properties: [
              {
                key: 'Method',
                value: 'X-ray',
              },
              {
                key: 'Resolution',
                value: '2.17 A',
              },
              {
                key: 'Chains',
                value: 'A/C=37-574',
              },
            ],
          },
          {
            database: 'PDB',
            id: '4F9B',
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
                value: 'A/C=37-574',
              },
            ],
          },
          {
            database: 'PDB',
            id: '4F9C',
            properties: [
              {
                key: 'Method',
                value: 'X-ray',
              },
              {
                key: 'Resolution',
                value: '2.08 A',
              },
              {
                key: 'Chains',
                value: 'A=37-574',
              },
            ],
          },
          {
            database: 'PDB',
            id: '5UWQ',
            properties: [
              {
                key: 'Method',
                value: 'X-ray',
              },
              {
                key: 'Resolution',
                value: '2.28 A',
              },
              {
                key: 'Chains',
                value: 'D=456-473',
              },
            ],
          },
          {
            database: 'PDB',
            id: '5UWR',
            properties: [
              {
                key: 'Method',
                value: 'X-ray',
              },
              {
                key: 'Resolution',
                value: '2.24 A',
              },
              {
                key: 'Chains',
                value: 'D=456-478',
              },
            ],
          },
          {
            database: 'PDB',
            id: '6YA6',
            properties: [
              {
                key: 'Method',
                value: 'X-ray',
              },
              {
                key: 'Resolution',
                value: '1.44 A',
              },
              {
                key: 'Chains',
                value: 'A=37-467, A=534-574',
              },
            ],
          },
          {
            database: 'PDB',
            id: '6YA7',
            properties: [
              {
                key: 'Method',
                value: 'X-ray',
              },
              {
                key: 'Resolution',
                value: '1.67 A',
              },
              {
                key: 'Chains',
                value: 'A=37-466, A=534-574',
              },
            ],
          },
          {
            database: 'PDB',
            id: '6YA8',
            properties: [
              {
                key: 'Method',
                value: 'X-ray',
              },
              {
                key: 'Resolution',
                value: '1.79 A',
              },
              {
                key: 'Chains',
                value: 'A=37-467, A=534-574',
              },
            ],
          },
          {
            database: 'PDBsum',
            id: '4F99',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'PDBsum',
            id: '4F9A',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'PDBsum',
            id: '4F9B',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'PDBsum',
            id: '4F9C',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'PDBsum',
            id: '5UWQ',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'PDBsum',
            id: '5UWR',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'PDBsum',
            id: '6YA6',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'PDBsum',
            id: '6YA7',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'PDBsum',
            id: '6YA8',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'SMR',
            id: 'O00311',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'BioGRID',
            id: '113914',
            properties: [
              {
                key: 'Interactions',
                value: '75',
              },
            ],
          },
          {
            database: 'CORUM',
            id: 'O00311',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'DIP',
            id: 'DIP-31728N',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'IntAct',
            id: 'O00311',
            properties: [
              {
                key: 'Interactions',
                value: '46',
              },
            ],
          },
          {
            database: 'MINT',
            id: 'O00311',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'STRING',
            id: '9606.ENSP00000393139',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'BindingDB',
            id: 'O00311',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'ChEMBL',
            id: 'CHEMBL5443',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'GuidetoPHARMACOLOGY',
            id: '1960',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'iPTMnet',
            id: 'O00311',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'PhosphoSitePlus',
            id: 'O00311',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'BioMuta',
            id: 'CDC7',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'EPD',
            id: 'O00311',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'jPOST',
            id: 'O00311',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'MassIVE',
            id: 'O00311',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'MaxQB',
            id: 'O00311',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'PaxDb',
            id: 'O00311',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'PeptideAtlas',
            id: 'O00311',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'PRIDE',
            id: 'O00311',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'ProteomicsDB',
            id: '47836',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
            isoformId: 'O00311-1',
          },
          {
            database: 'Antibodypedia',
            id: '3628',
            properties: [
              {
                key: 'antibodies',
                value: '309 antibodies',
              },
            ],
          },
          {
            database: 'DNASU',
            id: '8317',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'Ensembl',
            id: 'ENST00000234626',
            properties: [
              {
                key: 'ProteinId',
                value: 'ENSP00000234626',
              },
              {
                key: 'GeneId',
                value: 'ENSG00000097046',
              },
            ],
            isoformId: 'O00311-1',
          },
          {
            database: 'Ensembl',
            id: 'ENST00000428239',
            properties: [
              {
                key: 'ProteinId',
                value: 'ENSP00000393139',
              },
              {
                key: 'GeneId',
                value: 'ENSG00000097046',
              },
            ],
            isoformId: 'O00311-1',
          },
          {
            database: 'GeneID',
            id: '8317',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'KEGG',
            id: 'hsa:8317',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'UCSC',
            id: 'uc001doe.4',
            properties: [
              {
                key: 'OrganismName',
                value: 'human',
              },
            ],
            isoformId: 'O00311-1',
          },
          {
            database: 'CTD',
            id: '8317',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'DisGeNET',
            id: '8317',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'GeneCards',
            id: 'CDC7',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'HGNC',
            id: 'HGNC:1745',
            properties: [
              {
                key: 'GeneName',
                value: 'CDC7',
              },
            ],
          },
          {
            database: 'HPA',
            id: 'ENSG00000097046',
            properties: [
              {
                key: 'Description',
                value: 'Low tissue specificity',
              },
            ],
          },
          {
            database: 'MIM',
            id: '603311',
            properties: [
              {
                key: 'Type',
                value: 'gene',
              },
            ],
          },
          {
            database: 'neXtProt',
            id: 'NX_O00311',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'OpenTargets',
            id: 'ENSG00000097046',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'PharmGKB',
            id: 'PA26272',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'VEuPathDB',
            id: 'HostDB:ENSG00000097046.12',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'eggNOG',
            id: 'KOG1167',
            properties: [
              {
                key: 'ToxonomicScope',
                value: 'Eukaryota',
              },
            ],
          },
          {
            database: 'GeneTree',
            id: 'ENSGT00550000075011',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'HOGENOM',
            id: 'CLU_000288_118_1_1',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'InParanoid',
            id: 'O00311',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'OMA',
            id: 'GLLHGCV',
            properties: [
              {
                key: 'Fingerprint',
                value: '-',
              },
            ],
          },
          {
            database: 'OrthoDB',
            id: '1318335at2759',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'PhylomeDB',
            id: 'O00311',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'TreeFam',
            id: 'TF101052',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'BRENDA',
            id: '2.7.11.1',
            properties: [
              {
                key: 'OrganismId',
                value: '2681',
              },
            ],
          },
          {
            database: 'PathwayCommons',
            id: 'O00311',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'Reactome',
            id: 'R-HSA-176187',
            properties: [
              {
                key: 'PathwayName',
                value: 'Activation of ATR in response to replication stress',
              },
            ],
          },
          {
            database: 'Reactome',
            id: 'R-HSA-68962',
            properties: [
              {
                key: 'PathwayName',
                value: 'Activation of the pre-replicative complex',
              },
            ],
          },
          {
            database: 'Reactome',
            id: 'R-HSA-8953750',
            properties: [
              {
                key: 'PathwayName',
                value: 'Transcriptional Regulation by E2F6',
              },
            ],
          },
          {
            database: 'SignaLink',
            id: 'O00311',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'SIGNOR',
            id: 'O00311',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'BioGRID-ORCS',
            id: '8317',
            properties: [
              {
                key: 'hits',
                value: '805 hits in 1033 CRISPR screens',
              },
            ],
          },
          {
            database: 'ChiTaRS',
            id: 'CDC7',
            properties: [
              {
                key: 'OrganismName',
                value: 'human',
              },
            ],
          },
          {
            database: 'GeneWiki',
            id: 'Cell_division_cycle_7-related_protein_kinase',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'GenomeRNAi',
            id: '8317',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'Pharos',
            id: 'O00311',
            properties: [
              {
                key: 'Description',
                value: 'Tchem',
              },
            ],
          },
          {
            database: 'PRO',
            id: 'PR:O00311',
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
                value: 'Chromosome 1',
              },
            ],
          },
          {
            database: 'RNAct',
            id: 'O00311',
            properties: [
              {
                key: 'moleculeType',
                value: 'protein',
              },
            ],
          },
          {
            database: 'Bgee',
            id: 'ENSG00000097046',
            properties: [
              {
                key: 'ExpressionPatterns',
                value: 'Expressed in secondary oocyte and 180 other tissues',
              },
            ],
          },
          {
            database: 'ExpressionAtlas',
            id: 'O00311',
            properties: [
              {
                key: 'ExpressionPatterns',
                value: 'baseline and differential',
              },
            ],
          },
          {
            database: 'Genevisible',
            id: 'O00311',
            properties: [
              {
                key: 'OrganismId',
                value: 'HS',
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
                value: 'IDA:HGNC-UCL',
              },
            ],
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '9250678',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0045171',
            properties: [
              {
                key: 'GoTerm',
                value: 'C:intercellular bridge',
              },
              {
                key: 'GoEvidenceType',
                value: 'IDA:HPA',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0072686',
            properties: [
              {
                key: 'GoTerm',
                value: 'C:mitotic spindle',
              },
              {
                key: 'GoEvidenceType',
                value: 'IDA:HPA',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0005654',
            properties: [
              {
                key: 'GoTerm',
                value: 'C:nucleoplasm',
              },
              {
                key: 'GoEvidenceType',
                value: 'IDA:HPA',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0005634',
            properties: [
              {
                key: 'GoTerm',
                value: 'C:nucleus',
              },
              {
                key: 'GoEvidenceType',
                value: 'IDA:HGNC-UCL',
              },
            ],
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '9250678',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0005524',
            properties: [
              {
                key: 'GoTerm',
                value: 'F:ATP binding',
              },
              {
                key: 'GoEvidenceType',
                value: 'IEA:UniProtKB-KW',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0016301',
            properties: [
              {
                key: 'GoTerm',
                value: 'F:kinase activity',
              },
              {
                key: 'GoEvidenceType',
                value: 'IDA:HGNC-UCL',
              },
            ],
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '9250678',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0046872',
            properties: [
              {
                key: 'GoTerm',
                value: 'F:metal ion binding',
              },
              {
                key: 'GoEvidenceType',
                value: 'IEA:UniProtKB-KW',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0004672',
            properties: [
              {
                key: 'GoTerm',
                value: 'F:protein kinase activity',
              },
              {
                key: 'GoEvidenceType',
                value: 'IMP:UniProtKB',
              },
            ],
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '12065429',
              },
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '15668232',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0106310',
            properties: [
              {
                key: 'GoTerm',
                value: 'F:protein serine kinase activity',
              },
              {
                key: 'GoEvidenceType',
                value: 'IEA:UniProtKB-EC',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0004674',
            properties: [
              {
                key: 'GoTerm',
                value: 'F:protein serine/threonine kinase activity',
              },
              {
                key: 'GoEvidenceType',
                value: 'IBA:GO_Central',
              },
            ],
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '21873635',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0106311',
            properties: [
              {
                key: 'GoTerm',
                value: 'F:protein threonine kinase activity',
              },
              {
                key: 'GoEvidenceType',
                value: 'IEA:UniProtKB-EC',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0044770',
            properties: [
              {
                key: 'GoTerm',
                value: 'P:cell cycle phase transition',
              },
              {
                key: 'GoEvidenceType',
                value: 'IMP:BHF-UCL',
              },
            ],
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '17102137',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0051301',
            properties: [
              {
                key: 'GoTerm',
                value: 'P:cell division',
              },
              {
                key: 'GoEvidenceType',
                value: 'IEA:UniProtKB-KW',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0006260',
            properties: [
              {
                key: 'GoTerm',
                value: 'P:DNA replication',
              },
              {
                key: 'GoEvidenceType',
                value: 'TAS:Reactome',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0006270',
            properties: [
              {
                key: 'GoTerm',
                value: 'P:DNA replication initiation',
              },
              {
                key: 'GoEvidenceType',
                value: 'TAS:Reactome',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0000727',
            properties: [
              {
                key: 'GoTerm',
                value:
                  'P:double-strand break repair via break-induced replication',
              },
              {
                key: 'GoEvidenceType',
                value: 'IBA:GO_Central',
              },
            ],
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '21873635',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0000082',
            properties: [
              {
                key: 'GoTerm',
                value: 'P:G1/S transition of mitotic cell cycle',
              },
              {
                key: 'GoEvidenceType',
                value: 'TAS:ProtInc',
              },
            ],
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '9405610',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0070317',
            properties: [
              {
                key: 'GoTerm',
                value: 'P:negative regulation of G0 to G1 transition',
              },
              {
                key: 'GoEvidenceType',
                value: 'TAS:Reactome',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0018105',
            properties: [
              {
                key: 'GoTerm',
                value: 'P:peptidyl-serine phosphorylation',
              },
              {
                key: 'GoEvidenceType',
                value: 'IBA:GO_Central',
              },
            ],
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '21873635',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0008284',
            properties: [
              {
                key: 'GoTerm',
                value: 'P:positive regulation of cell population proliferation',
              },
              {
                key: 'GoEvidenceType',
                value: 'IMP:HGNC-UCL',
              },
            ],
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '17102137',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0010971',
            properties: [
              {
                key: 'GoTerm',
                value:
                  'P:positive regulation of G2/M transition of mitotic cell cycle',
              },
              {
                key: 'GoEvidenceType',
                value: 'IMP:UniProtKB',
              },
            ],
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '15668232',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0010571',
            properties: [
              {
                key: 'GoTerm',
                value:
                  'P:positive regulation of nuclear cell cycle DNA replication',
              },
              {
                key: 'GoEvidenceType',
                value: 'IMP:UniProtKB',
              },
            ],
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '15668232',
              },
            ],
          },
          {
            database: 'InterPro',
            id: 'IPR011009',
            properties: [
              {
                key: 'EntryName',
                value: 'Kinase-like_dom_sf',
              },
            ],
          },
          {
            database: 'InterPro',
            id: 'IPR000719',
            properties: [
              {
                key: 'EntryName',
                value: 'Prot_kinase_dom',
              },
            ],
          },
          {
            database: 'InterPro',
            id: 'IPR017441',
            properties: [
              {
                key: 'EntryName',
                value: 'Protein_kinase_ATP_BS',
              },
            ],
          },
          {
            database: 'InterPro',
            id: 'IPR008271',
            properties: [
              {
                key: 'EntryName',
                value: 'Ser/Thr_kinase_AS',
              },
            ],
          },
          {
            database: 'Pfam',
            id: 'PF00069',
            properties: [
              {
                key: 'EntryName',
                value: 'Pkinase',
              },
              {
                key: 'MatchStatus',
                value: '2',
              },
            ],
          },
          {
            database: 'SMART',
            id: 'SM00220',
            properties: [
              {
                key: 'EntryName',
                value: 'S_TKc',
              },
              {
                key: 'MatchStatus',
                value: '1',
              },
            ],
          },
          {
            database: 'SUPFAM',
            id: 'SSF56112',
            properties: [
              {
                key: 'EntryName',
                value: 'SSF56112',
              },
              {
                key: 'MatchStatus',
                value: '1',
              },
            ],
          },
          {
            database: 'PROSITE',
            id: 'PS00107',
            properties: [
              {
                key: 'EntryName',
                value: 'PROTEIN_KINASE_ATP',
              },
              {
                key: 'MatchStatus',
                value: '1',
              },
            ],
          },
          {
            database: 'PROSITE',
            id: 'PS50011',
            properties: [
              {
                key: 'EntryName',
                value: 'PROTEIN_KINASE_DOM',
              },
              {
                key: 'MatchStatus',
                value: '1',
              },
            ],
          },
          {
            database: 'PROSITE',
            id: 'PS00108',
            properties: [
              {
                key: 'EntryName',
                value: 'PROTEIN_KINASE_ST',
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
            'MEASLGIQMDEPMAFSPQRDRFQAEGSLKKNEQNFKLAGVKKDIEKLYEAVPQLSNVFKIEDKIGEGTFSSVYLATAQLQVGPEEKIALKHLIPTSHPIRIAAELQCLTVAGGQDNVMGVKYCFRKNDHVVIAMPYLEHESFLDILNSLSFQEVREYMLNLFKALKRIHQFGIVHRDVKPSNFLYNRRLKKYALVDFGLAQGTHDTKIELLKFVQSEAQQERCSQNKSHIITGNKIPLSGPVPKELDQQSTTKASVKRPYTNAQIQIKQGKDGKEGSVGLSVQRSVFGERNFNIHSSISHESPAVKLMKQSKTVDVLSRKLATKKKAISTKVMNSAVMRKTASSCPASLTCDCYATDKVCSICLSRRQQVAPRAGTPGFRAPEVLTKCPNQTTAIDMWSAGVIFLSLLSGRYPFYKASDDLTALAQIMTIRGSRETIQAAKTFGKSILCSKEVPAQDLRKLCERLRGMDSSTPKLTSDIQGHASHQPAISEKTDHKASCLVQTPPGQYSGNSFKKGDSNSCEHCFDEYNTNLEGWNEVPDEAYDLLDKLLDLNPASRITAEEALLHPFFKDMSL',
          length: 574,
          molWeight: 63888,
          crc64: '90D549BEE20AE583',
          md5: 'C8AEF912151560FBEBC249127ED7F721',
        },
        extraAttributes: {
          countByCommentType: {
            FUNCTION: 1,
            'CATALYTIC ACTIVITY': 2,
            COFACTOR: 1,
            SUBUNIT: 1,
            INTERACTION: 28,
            'SUBCELLULAR LOCATION': 1,
            'ALTERNATIVE PRODUCTS': 1,
            SIMILARITY: 1,
            'WEB RESOURCE': 1,
          },
          countByFeatureType: {
            Chain: 1,
            Domain: 1,
            'Nucleotide binding': 1,
            'Active site': 1,
            'Binding site': 1,
            'Modified residue': 2,
            'Cross-link': 1,
            'Natural variant': 9,
            'Sequence conflict': 1,
            Helix: 18,
            'Beta strand': 11,
            Turn: 4,
          },
          uniParcId: 'UPI0000127400',
        },
      },
    },
    {
      from: 'P06243',
      to: {
        entryType: 'UniProtKB reviewed (Swiss-Prot)',
        primaryAccession: 'P06243',
        secondaryAccessions: ['D6VRX3'],
        uniProtkbId: 'CDC7_YEAST',
        entryAudit: {
          firstPublicDate: '1988-01-01',
          lastAnnotationUpdateDate: '2021-02-10',
          lastSequenceUpdateDate: '1995-11-01',
          entryVersion: 197,
          sequenceVersion: 2,
        },
        annotationScore: 5,
        organism: {
          scientificName:
            'Saccharomyces cerevisiae (strain ATCC 204508 / S288c)',
          commonName: "Baker's yeast",
          taxonId: 559292,
          lineage: [
            'Eukaryota',
            'Fungi',
            'Dikarya',
            'Ascomycota',
            'Saccharomycotina',
            'Saccharomycetes',
            'Saccharomycetales',
            'Saccharomycetaceae',
            'Saccharomyces',
          ],
        },
        proteinExistence: '1: Evidence at protein level',
        proteinDescription: {
          recommendedName: {
            fullName: {
              value: 'Cell division control protein 7',
            },
            ecNumbers: [
              {
                value: '2.7.11.1',
              },
            ],
          },
        },
        genes: [
          {
            geneName: {
              value: 'CDC7',
            },
            synonyms: [
              {
                value: 'OAF2',
              },
            ],
            orderedLocusNames: [
              {
                value: 'YDL017W',
              },
            ],
            orfNames: [
              {
                value: 'D2855',
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
                    evidenceCode: 'ECO:0000269',
                    source: 'PubMed',
                    id: '1865880',
                  },
                ],
                value:
                  'Serine/threonine-protein kinase. Needed for the initiation of DNA synthesis during mitosis as well as for synaptonemal complex formation and commitment to recombination during meiosis. Required for HTA1-HTB1 locus transcription repression',
              },
            ],
            commentType: 'FUNCTION',
          },
          {
            commentType: 'CATALYTIC ACTIVITY',
            reaction: {
              name: 'ATP + L-seryl-[protein] = ADP + H(+) + O-phospho-L-seryl-[protein]',
              reactionCrossReferences: [
                {
                  database: 'Rhea',
                  id: 'RHEA:17989',
                },
                {
                  database: 'Rhea',
                  id: 'RHEA-COMP:9863',
                },
                {
                  database: 'Rhea',
                  id: 'RHEA-COMP:11604',
                },
                {
                  database: 'ChEBI',
                  id: 'CHEBI:15378',
                },
                {
                  database: 'ChEBI',
                  id: 'CHEBI:29999',
                },
                {
                  database: 'ChEBI',
                  id: 'CHEBI:30616',
                },
                {
                  database: 'ChEBI',
                  id: 'CHEBI:83421',
                },
                {
                  database: 'ChEBI',
                  id: 'CHEBI:456216',
                },
              ],
              ecNumber: '2.7.11.1',
            },
          },
          {
            commentType: 'CATALYTIC ACTIVITY',
            reaction: {
              name: 'ATP + L-threonyl-[protein] = ADP + H(+) + O-phospho-L-threonyl-[protein]',
              reactionCrossReferences: [
                {
                  database: 'Rhea',
                  id: 'RHEA:46608',
                },
                {
                  database: 'Rhea',
                  id: 'RHEA-COMP:11060',
                },
                {
                  database: 'Rhea',
                  id: 'RHEA-COMP:11605',
                },
                {
                  database: 'ChEBI',
                  id: 'CHEBI:15378',
                },
                {
                  database: 'ChEBI',
                  id: 'CHEBI:30013',
                },
                {
                  database: 'ChEBI',
                  id: 'CHEBI:30616',
                },
                {
                  database: 'ChEBI',
                  id: 'CHEBI:61977',
                },
                {
                  database: 'ChEBI',
                  id: 'CHEBI:456216',
                },
              ],
              ecNumber: '2.7.11.1',
            },
          },
          {
            commentType: 'COFACTOR',
            cofactors: [
              {
                name: 'Mg(2+)',
                evidences: [
                  {
                    evidenceCode: 'ECO:0000250',
                  },
                ],
                cofactorCrossReference: {
                  database: 'ChEBI',
                  id: 'CHEBI:18420',
                },
              },
            ],
          },
          {
            texts: [
              {
                value: 'Associates with DBF4 and ORC2',
              },
            ],
            commentType: 'SUBUNIT',
          },
          {
            commentType: 'INTERACTION',
            interactions: [
              {
                interactantOne: {
                  uniProtKBAccession: 'P06243',
                  intActId: 'EBI-4451',
                },
                interactantTwo: {
                  uniProtKBAccession: 'P32562',
                  geneName: 'CDC5',
                  intActId: 'EBI-4440',
                },
                numberOfExperiments: 11,
                organismDiffer: false,
              },
              {
                interactantOne: {
                  uniProtKBAccession: 'P06243',
                  intActId: 'EBI-4451',
                },
                interactantTwo: {
                  uniProtKBAccession: 'P06243',
                  geneName: 'CDC7',
                  intActId: 'EBI-4451',
                },
                numberOfExperiments: 3,
                organismDiffer: false,
              },
              {
                interactantOne: {
                  uniProtKBAccession: 'P06243',
                  intActId: 'EBI-4451',
                },
                interactantTwo: {
                  uniProtKBAccession: 'P32325',
                  geneName: 'DBF4',
                  intActId: 'EBI-5575',
                },
                numberOfExperiments: 8,
                organismDiffer: false,
              },
              {
                interactantOne: {
                  uniProtKBAccession: 'P06243',
                  intActId: 'EBI-4451',
                },
                interactantTwo: {
                  uniProtKBAccession: 'Q04087',
                  geneName: 'LRS4',
                  intActId: 'EBI-32189',
                },
                numberOfExperiments: 5,
                organismDiffer: false,
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
                    id: '14562106',
                  },
                ],
                value:
                  'Present with 1600 molecules/cell in log phase SD medium',
              },
            ],
            commentType: 'MISCELLANEOUS',
          },
          {
            texts: [
              {
                evidences: [
                  {
                    evidenceCode: 'ECO:0000255',
                    source: 'PROSITE-ProRule',
                    id: 'PRU00159',
                  },
                ],
                value:
                  'Belongs to the protein kinase superfamily. Ser/Thr protein kinase family. CDC7 subfamily',
              },
            ],
            commentType: 'SIMILARITY',
          },
          {
            commentType: 'SEQUENCE CAUTION',
            sequenceCautionType: 'Erroneous initiation',
            sequence: 'CAA32370.1',
            evidences: [
              {
                evidenceCode: 'ECO:0000305',
              },
            ],
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
                value: 507,
                modifier: 'EXACT',
              },
            },
            description: 'Cell division control protein 7',
            featureId: 'PRO_0000085766',
          },
          {
            type: 'Domain',
            location: {
              start: {
                value: 33,
                modifier: 'EXACT',
              },
              end: {
                value: 469,
                modifier: 'EXACT',
              },
            },
            description: 'Protein kinase',
            evidences: [
              {
                evidenceCode: 'ECO:0000255',
                source: 'PROSITE-ProRule',
                id: 'PRU00159',
              },
            ],
          },
          {
            type: 'Nucleotide binding',
            location: {
              start: {
                value: 39,
                modifier: 'EXACT',
              },
              end: {
                value: 47,
                modifier: 'EXACT',
              },
            },
            description: 'ATP',
            evidences: [
              {
                evidenceCode: 'ECO:0000255',
                source: 'PROSITE-ProRule',
                id: 'PRU00159',
              },
            ],
          },
          {
            type: 'Active site',
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
            description: 'Proton acceptor',
            evidences: [
              {
                evidenceCode: 'ECO:0000255',
                source: 'PROSITE-ProRule',
                id: 'PRU00159',
              },
              {
                evidenceCode: 'ECO:0000255',
                source: 'PROSITE-ProRule',
                id: 'PRU10027',
              },
            ],
          },
          {
            type: 'Binding site',
            location: {
              start: {
                value: 76,
                modifier: 'EXACT',
              },
              end: {
                value: 76,
                modifier: 'EXACT',
              },
            },
            description: 'ATP',
            evidences: [
              {
                evidenceCode: 'ECO:0000255',
                source: 'PROSITE-ProRule',
                id: 'PRU00159',
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
            id: 'KW-0067',
            category: 'Ligand',
            name: 'ATP-binding',
          },
          {
            id: 'KW-0131',
            category: 'Biological process',
            name: 'Cell cycle',
          },
          {
            id: 'KW-0132',
            category: 'Biological process',
            name: 'Cell division',
          },
          {
            id: 'KW-0418',
            category: 'Molecular function',
            name: 'Kinase',
          },
          {
            id: 'KW-0460',
            category: 'Ligand',
            name: 'Magnesium',
          },
          {
            id: 'KW-0469',
            category: 'Biological process',
            name: 'Meiosis',
          },
          {
            id: 'KW-0479',
            category: 'Ligand',
            name: 'Metal-binding',
          },
          {
            id: 'KW-0498',
            category: 'Biological process',
            name: 'Mitosis',
          },
          {
            id: 'KW-0547',
            category: 'Ligand',
            name: 'Nucleotide-binding',
          },
          {
            id: 'KW-1185',
            category: 'Technical term',
            name: 'Reference proteome',
          },
          {
            id: 'KW-0723',
            category: 'Molecular function',
            name: 'Serine/threonine-protein kinase',
          },
          {
            id: 'KW-0808',
            category: 'Molecular function',
            name: 'Transferase',
          },
        ],
        references: [
          {
            citation: {
              id: '3537706',
              citationType: 'journal article',
              authors: [
                'Patterson M.',
                'Sclafani R.A.',
                'Fangman W.L.',
                'Rosamond J.',
              ],
              citationCrossReferences: [
                {
                  database: 'PubMed',
                  id: '3537706',
                },
                {
                  database: 'DOI',
                  id: '10.1128/mcb.6.5.1590',
                },
              ],
              title:
                'Molecular characterization of cell cycle gene CDC7 from Saccharomyces cerevisiae.',
              publicationDate: '1986',
              journal: 'Mol. Cell. Biol.',
              firstPage: '1590',
              lastPage: '1598',
              volume: '6',
            },
            referencePositions: ['NUCLEOTIDE SEQUENCE [GENOMIC DNA]'],
          },
          {
            citation: {
              id: '9169867',
              citationType: 'journal article',
              authors: [
                'Jacq C.',
                'Alt-Moerbe J.',
                'Andre B.',
                'Arnold W.',
                'Bahr A.',
                'Ballesta J.P.G.',
                'Bargues M.',
                'Baron L.',
                'Becker A.',
                'Biteau N.',
                'Bloecker H.',
                'Blugeon C.',
                'Boskovic J.',
                'Brandt P.',
                'Brueckner M.',
                'Buitrago M.J.',
                'Coster F.',
                'Delaveau T.',
                'del Rey F.',
                'Dujon B.',
                'Eide L.G.',
                'Garcia-Cantalejo J.M.',
                'Goffeau A.',
                'Gomez-Peris A.',
                'Granotier C.',
                'Hanemann V.',
                'Hankeln T.',
                'Hoheisel J.D.',
                'Jaeger W.',
                'Jimenez A.',
                'Jonniaux J.-L.',
                'Kraemer C.',
                'Kuester H.',
                'Laamanen P.',
                'Legros Y.',
                'Louis E.J.',
                'Moeller-Rieker S.',
                'Monnet A.',
                'Moro M.',
                'Mueller-Auer S.',
                'Nussbaumer B.',
                'Paricio N.',
                'Paulin L.',
                'Perea J.',
                'Perez-Alonso M.',
                'Perez-Ortin J.E.',
                'Pohl T.M.',
                'Prydz H.',
                'Purnelle B.',
                'Rasmussen S.W.',
                'Remacha M.A.',
                'Revuelta J.L.',
                'Rieger M.',
                'Salom D.',
                'Saluz H.P.',
                'Saiz J.E.',
                'Saren A.-M.',
                'Schaefer M.',
                'Scharfe M.',
                'Schmidt E.R.',
                'Schneider C.',
                'Scholler P.',
                'Schwarz S.',
                'Soler-Mira A.',
                'Urrestarazu L.A.',
                'Verhasselt P.',
                'Vissers S.',
                'Voet M.',
                'Volckaert G.',
                'Wagner G.',
                'Wambutt R.',
                'Wedler E.',
                'Wedler H.',
                'Woelfl S.',
                'Harris D.E.',
                'Bowman S.',
                'Brown D.',
                'Churcher C.M.',
                'Connor R.',
                'Dedman K.',
                'Gentles S.',
                'Hamlin N.',
                'Hunt S.',
                'Jones L.',
                'McDonald S.',
                'Murphy L.D.',
                'Niblett D.',
                'Odell C.',
                'Oliver K.',
                'Rajandream M.A.',
                'Richards C.',
                'Shore L.',
                'Walsh S.V.',
                'Barrell B.G.',
                'Dietrich F.S.',
                'Mulligan J.T.',
                'Allen E.',
                'Araujo R.',
                'Aviles E.',
                'Berno A.',
                'Carpenter J.',
                'Chen E.',
                'Cherry J.M.',
                'Chung E.',
                'Duncan M.',
                'Hunicke-Smith S.',
                'Hyman R.W.',
                'Komp C.',
                'Lashkari D.',
                'Lew H.',
                'Lin D.',
                'Mosedale D.',
                'Nakahara K.',
                'Namath A.',
                'Oefner P.',
                'Oh C.',
                'Petel F.X.',
                'Roberts D.',
                'Schramm S.',
                'Schroeder M.',
                'Shogren T.',
                'Shroff N.',
                'Winant A.',
                'Yelton M.A.',
                'Botstein D.',
                'Davis R.W.',
                'Johnston M.',
                'Andrews S.',
                'Brinkman R.',
                'Cooper J.',
                'Ding H.',
                'Du Z.',
                'Favello A.',
                'Fulton L.',
                'Gattung S.',
                'Greco T.',
                'Hallsworth K.',
                'Hawkins J.',
                'Hillier L.W.',
                'Jier M.',
                'Johnson D.',
                'Johnston L.',
                'Kirsten J.',
                'Kucaba T.',
                'Langston Y.',
                'Latreille P.',
                'Le T.',
                'Mardis E.',
                'Menezes S.',
                'Miller N.',
                'Nhan M.',
                'Pauley A.',
                'Peluso D.',
                'Rifkin L.',
                'Riles L.',
                'Taich A.',
                'Trevaskis E.',
                'Vignati D.',
                'Wilcox L.',
                'Wohldman P.',
                'Vaudin M.',
                'Wilson R.',
                'Waterston R.',
                'Albermann K.',
                'Hani J.',
                'Heumann K.',
                'Kleine K.',
                'Mewes H.-W.',
                'Zollner A.',
                'Zaccaria P.',
              ],
              citationCrossReferences: [
                {
                  database: 'PubMed',
                  id: '9169867',
                },
              ],
              title:
                'The nucleotide sequence of Saccharomyces cerevisiae chromosome IV.',
              publicationDate: '1997',
              journal: 'Nature',
              firstPage: '75',
              lastPage: '78',
              volume: '387',
            },
            referencePositions: [
              'NUCLEOTIDE SEQUENCE [LARGE SCALE GENOMIC DNA]',
            ],
            referenceComments: [
              {
                value: 'ATCC 204508 / S288c',
                type: 'STRAIN',
              },
            ],
          },
          {
            citation: {
              id: '24374639',
              citationType: 'journal article',
              authors: [
                'Engel S.R.',
                'Dietrich F.S.',
                'Fisk D.G.',
                'Binkley G.',
                'Balakrishnan R.',
                'Costanzo M.C.',
                'Dwight S.S.',
                'Hitz B.C.',
                'Karra K.',
                'Nash R.S.',
                'Weng S.',
                'Wong E.D.',
                'Lloyd P.',
                'Skrzypek M.S.',
                'Miyasato S.R.',
                'Simison M.',
                'Cherry J.M.',
              ],
              citationCrossReferences: [
                {
                  database: 'PubMed',
                  id: '24374639',
                },
                {
                  database: 'DOI',
                  id: '10.1534/g3.113.008995',
                },
              ],
              title:
                'The reference genome sequence of Saccharomyces cerevisiae: Then and now.',
              publicationDate: '2014',
              journal: 'G3 (Bethesda)',
              firstPage: '389',
              lastPage: '398',
              volume: '4',
            },
            referencePositions: ['GENOME REANNOTATION'],
            referenceComments: [
              {
                value: 'ATCC 204508 / S288c',
                type: 'STRAIN',
              },
            ],
          },
          {
            citation: {
              id: '2850010',
              citationType: 'journal article',
              authors: ['Bahman M.', 'Buck V.', 'White A.', 'Rosamond J.'],
              citationCrossReferences: [
                {
                  database: 'PubMed',
                  id: '2850010',
                },
                {
                  database: 'DOI',
                  id: '10.1016/0167-4781(88)90104-2',
                },
              ],
              title:
                'Characterisation of the CDC7 gene product of Saccharomyces cerevisiae as a protein kinase needed for the initiation of mitotic DNA synthesis.',
              publicationDate: '1988',
              journal: 'Biochim. Biophys. Acta',
              firstPage: '335',
              lastPage: '343',
              volume: '951',
            },
            referencePositions: ['NUCLEOTIDE SEQUENCE [GENOMIC DNA] OF 1-138'],
          },
          {
            citation: {
              id: '2668893',
              citationType: 'journal article',
              authors: ['Ham J.', 'Moore D.', 'Rosamond J.', 'Johnston I.R.'],
              citationCrossReferences: [
                {
                  database: 'PubMed',
                  id: '2668893',
                },
                {
                  database: 'DOI',
                  id: '10.1093/nar/17.14.5781',
                },
              ],
              title:
                'Transcriptional analysis of the CDC7 protein kinase gene of Saccharomyces cerevisiae.',
              publicationDate: '1989',
              journal: 'Nucleic Acids Res.',
              firstPage: '5781',
              lastPage: '5792',
              volume: '17',
            },
            referencePositions: ['NUCLEOTIDE SEQUENCE [GENOMIC DNA] OF 1-27'],
            referenceComments: [
              {
                value: 'ATCC 204508 / S288c',
                type: 'STRAIN',
              },
            ],
          },
          {
            citation: {
              id: '1865880',
              citationType: 'journal article',
              authors: ['Buck V.', 'Rosamond J.'],
              citationCrossReferences: [
                {
                  database: 'PubMed',
                  id: '1865880',
                },
                {
                  database: 'DOI',
                  id: '10.1007/bf00273937',
                },
              ],
              title:
                'CDC7 protein kinase activity is required for mitosis and meiosis in Saccharomyces cerevisiae.',
              publicationDate: '1991',
              journal: 'Mol. Gen. Genet.',
              firstPage: '452',
              lastPage: '457',
              volume: '227',
            },
            referencePositions: ['FUNCTION'],
          },
          {
            citation: {
              id: '14562106',
              citationType: 'journal article',
              authors: [
                'Ghaemmaghami S.',
                'Huh W.-K.',
                'Bower K.',
                'Howson R.W.',
                'Belle A.',
                'Dephoure N.',
                "O'Shea E.K.",
                'Weissman J.S.',
              ],
              citationCrossReferences: [
                {
                  database: 'PubMed',
                  id: '14562106',
                },
                {
                  database: 'DOI',
                  id: '10.1038/nature02046',
                },
              ],
              title: 'Global analysis of protein expression in yeast.',
              publicationDate: '2003',
              journal: 'Nature',
              firstPage: '737',
              lastPage: '741',
              volume: '425',
            },
            referencePositions: [
              'LEVEL OF PROTEIN EXPRESSION [LARGE SCALE ANALYSIS]',
            ],
          },
          {
            citation: {
              id: '18407956',
              citationType: 'journal article',
              authors: [
                'Albuquerque C.P.',
                'Smolka M.B.',
                'Payne S.H.',
                'Bafna V.',
                'Eng J.',
                'Zhou H.',
              ],
              citationCrossReferences: [
                {
                  database: 'PubMed',
                  id: '18407956',
                },
                {
                  database: 'DOI',
                  id: '10.1074/mcp.m700468-mcp200',
                },
              ],
              title:
                'A multidimensional chromatography technology for in-depth phosphoproteome analysis.',
              publicationDate: '2008',
              journal: 'Mol. Cell. Proteomics',
              firstPage: '1389',
              lastPage: '1396',
              volume: '7',
            },
            referencePositions: [
              'IDENTIFICATION BY MASS SPECTROMETRY [LARGE SCALE ANALYSIS]',
            ],
          },
        ],
        uniProtKBCrossReferences: [
          {
            database: 'EMBL',
            id: 'M12624',
            properties: [
              {
                key: 'ProteinId',
                value: 'AAA34485.1',
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
            id: 'Z48432',
            properties: [
              {
                key: 'ProteinId',
                value: 'CAA88342.1',
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
            id: 'Z74065',
            properties: [
              {
                key: 'ProteinId',
                value: 'CAA98574.1',
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
            id: 'X14164',
            properties: [
              {
                key: 'ProteinId',
                value: 'CAA32369.1',
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
            id: 'X14164',
            properties: [
              {
                key: 'ProteinId',
                value: 'CAA32370.1',
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
            id: 'X15362',
            properties: [
              {
                key: 'ProteinId',
                value: 'CAA33420.1',
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
            id: 'BK006938',
            properties: [
              {
                key: 'ProteinId',
                value: 'DAA11833.1',
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
            id: 'A25228',
            properties: [
              {
                key: 'EntryName',
                value: 'A25228',
              },
            ],
          },
          {
            database: 'RefSeq',
            id: 'NP_010267.3',
            properties: [
              {
                key: 'NucleotideSequenceId',
                value: 'NM_001180076.3',
              },
            ],
          },
          {
            database: 'PDB',
            id: '5T2S',
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
                value: 'B/D=480-491',
              },
            ],
          },
          {
            database: 'PDBsum',
            id: '5T2S',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'SMR',
            id: 'P06243',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'BioGRID',
            id: '32038',
            properties: [
              {
                key: 'Interactions',
                value: '458',
              },
            ],
          },
          {
            database: 'ComplexPortal',
            id: 'CPX-867',
            properties: [
              {
                key: 'EntryName',
                value: 'DBF4-dependent CDC7 kinase complex',
              },
            ],
          },
          {
            database: 'DIP',
            id: 'DIP-1235N',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'IntAct',
            id: 'P06243',
            properties: [
              {
                key: 'Interactions',
                value: '79',
              },
            ],
          },
          {
            database: 'MINT',
            id: 'P06243',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'STRING',
            id: '4932.YDL017W',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'MoonDB',
            id: 'P06243',
            properties: [
              {
                key: 'Type',
                value: 'Predicted',
              },
            ],
          },
          {
            database: 'iPTMnet',
            id: 'P06243',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'MaxQB',
            id: 'P06243',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'PaxDb',
            id: 'P06243',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'PRIDE',
            id: 'P06243',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'EnsemblFungi',
            id: 'YDL017W_mRNA',
            properties: [
              {
                key: 'ProteinId',
                value: 'YDL017W',
              },
              {
                key: 'GeneId',
                value: 'YDL017W',
              },
            ],
          },
          {
            database: 'GeneID',
            id: '851545',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'KEGG',
            id: 'sce:YDL017W',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'SGD',
            id: 'S000002175',
            properties: [
              {
                key: 'GeneName',
                value: 'CDC7',
              },
            ],
          },
          {
            database: 'VEuPathDB',
            id: 'FungiDB:YDL017W',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'eggNOG',
            id: 'KOG1167',
            properties: [
              {
                key: 'ToxonomicScope',
                value: 'Eukaryota',
              },
            ],
          },
          {
            database: 'GeneTree',
            id: 'ENSGT00550000075011',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'HOGENOM',
            id: 'CLU_000288_118_2_1',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'InParanoid',
            id: 'P06243',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'OMA',
            id: 'YPHEEFR',
            properties: [
              {
                key: 'Fingerprint',
                value: '-',
              },
            ],
          },
          {
            database: 'BRENDA',
            id: '2.7.11.1',
            properties: [
              {
                key: 'OrganismId',
                value: '984',
              },
            ],
          },
          {
            database: 'Reactome',
            id: 'R-SCE-68962',
            properties: [
              {
                key: 'PathwayName',
                value: 'Activation of the pre-replicative complex',
              },
            ],
          },
          {
            database: 'PRO',
            id: 'PR:P06243',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'Proteomes',
            id: 'UP000002311',
            properties: [
              {
                key: 'Component',
                value: 'Chromosome IV',
              },
            ],
          },
          {
            database: 'RNAct',
            id: 'P06243',
            properties: [
              {
                key: 'moleculeType',
                value: 'protein',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0000775',
            properties: [
              {
                key: 'GoTerm',
                value: 'C:chromosome, centromeric region',
              },
              {
                key: 'GoEvidenceType',
                value: 'IDA:SGD',
              },
            ],
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '23746350',
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
                value: 'IBA:GO_Central',
              },
            ],
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '21873635',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0031431',
            properties: [
              {
                key: 'GoTerm',
                value: 'C:Dbf4-dependent protein kinase complex',
              },
              {
                key: 'GoEvidenceType',
                value: 'IDA:SGD',
              },
            ],
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '19692334',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0005634',
            properties: [
              {
                key: 'GoTerm',
                value: 'C:nucleus',
              },
              {
                key: 'GoEvidenceType',
                value: 'IDA:SGD',
              },
            ],
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '2023904',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0005524',
            properties: [
              {
                key: 'GoTerm',
                value: 'F:ATP binding',
              },
              {
                key: 'GoEvidenceType',
                value: 'IEA:UniProtKB-KW',
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
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '9790600',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0046872',
            properties: [
              {
                key: 'GoTerm',
                value: 'F:metal ion binding',
              },
              {
                key: 'GoEvidenceType',
                value: 'IEA:UniProtKB-KW',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0106310',
            properties: [
              {
                key: 'GoTerm',
                value: 'F:protein serine kinase activity',
              },
              {
                key: 'GoEvidenceType',
                value: 'IEA:UniProtKB-EC',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0004674',
            properties: [
              {
                key: 'GoTerm',
                value: 'F:protein serine/threonine kinase activity',
              },
              {
                key: 'GoEvidenceType',
                value: 'IDA:SGD',
              },
            ],
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '10508166',
              },
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '10805723',
              },
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '18245450',
              },
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '19692334',
              },
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '23314252',
              },
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '25602519',
              },
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '9407029',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0106311',
            properties: [
              {
                key: 'GoTerm',
                value: 'F:protein threonine kinase activity',
              },
              {
                key: 'GoEvidenceType',
                value: 'IEA:UniProtKB-EC',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0051301',
            properties: [
              {
                key: 'GoTerm',
                value: 'P:cell division',
              },
              {
                key: 'GoEvidenceType',
                value: 'IEA:UniProtKB-KW',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0034629',
            properties: [
              {
                key: 'GoTerm',
                value: 'P:cellular protein-containing complex localization',
              },
              {
                key: 'GoEvidenceType',
                value: 'IMP:SGD',
              },
            ],
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '19013276',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0006270',
            properties: [
              {
                key: 'GoTerm',
                value: 'P:DNA replication initiation',
              },
              {
                key: 'GoEvidenceType',
                value: 'IMP:SGD',
              },
            ],
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '9472018',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0000727',
            properties: [
              {
                key: 'GoTerm',
                value:
                  'P:double-strand break repair via break-induced replication',
              },
              {
                key: 'GoEvidenceType',
                value: 'IMP:SGD',
              },
            ],
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '20516198',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0033314',
            properties: [
              {
                key: 'GoTerm',
                value: 'P:mitotic DNA replication checkpoint',
              },
              {
                key: 'GoEvidenceType',
                value: 'IGI:SGD',
              },
            ],
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '18372119',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:1902977',
            properties: [
              {
                key: 'GoTerm',
                value:
                  'P:mitotic DNA replication preinitiation complex assembly',
              },
              {
                key: 'GoEvidenceType',
                value: 'IDA:SGD',
              },
            ],
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '21729781',
              },
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '26338774',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0001100',
            properties: [
              {
                key: 'GoTerm',
                value: 'P:negative regulation of exit from mitosis',
              },
              {
                key: 'GoEvidenceType',
                value: 'IPI:SGD',
              },
            ],
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '19478884',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0018105',
            properties: [
              {
                key: 'GoTerm',
                value: 'P:peptidyl-serine phosphorylation',
              },
              {
                key: 'GoEvidenceType',
                value: 'IDA:SGD',
              },
            ],
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '18245450',
              },
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '19692334',
              },
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '23314252',
              },
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '25602519',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0018107',
            properties: [
              {
                key: 'GoTerm',
                value: 'P:peptidyl-threonine phosphorylation',
              },
              {
                key: 'GoEvidenceType',
                value: 'IMP:SGD',
              },
            ],
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '22106412',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0060903',
            properties: [
              {
                key: 'GoTerm',
                value: 'P:positive regulation of meiosis I',
              },
              {
                key: 'GoEvidenceType',
                value: 'IGI:SGD',
              },
            ],
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '18245451',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:1905263',
            properties: [
              {
                key: 'GoTerm',
                value:
                  'P:positive regulation of meiotic DNA double-strand break formation involved in reciprocal meiotic recombination',
              },
              {
                key: 'GoEvidenceType',
                value: 'IMP:SGD',
              },
            ],
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '18245450',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:1904968',
            properties: [
              {
                key: 'GoTerm',
                value:
                  'P:positive regulation of monopolar spindle attachment to meiosis I kinetochore',
              },
              {
                key: 'GoEvidenceType',
                value: 'IMP:SGD',
              },
            ],
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '19013276',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0031334',
            properties: [
              {
                key: 'GoTerm',
                value:
                  'P:positive regulation of protein-containing complex assembly',
              },
              {
                key: 'GoEvidenceType',
                value: 'IDA:SGD',
              },
            ],
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '26912723',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0010673',
            properties: [
              {
                key: 'GoTerm',
                value:
                  'P:positive regulation of transcription from RNA polymerase II promoter involved in meiotic cell cycle',
              },
              {
                key: 'GoEvidenceType',
                value: 'IMP:SGD',
              },
            ],
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '22106412',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0006279',
            properties: [
              {
                key: 'GoTerm',
                value: 'P:premeiotic DNA replication',
              },
              {
                key: 'GoEvidenceType',
                value: 'IMP:SGD',
              },
            ],
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '16319063',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0046777',
            properties: [
              {
                key: 'GoTerm',
                value: 'P:protein autophosphorylation',
              },
              {
                key: 'GoEvidenceType',
                value: 'IDA:SGD',
              },
            ],
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '10508166',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0006468',
            properties: [
              {
                key: 'GoTerm',
                value: 'P:protein phosphorylation',
              },
              {
                key: 'GoEvidenceType',
                value: 'IDA:SGD',
              },
            ],
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '10508166',
              },
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '10805723',
              },
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '25602519',
              },
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '9407029',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0031938',
            properties: [
              {
                key: 'GoTerm',
                value: 'P:regulation of chromatin silencing at telomere',
              },
              {
                key: 'GoEvidenceType',
                value: 'IMP:SGD',
              },
            ],
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '16980387',
              },
            ],
          },
          {
            database: 'InterPro',
            id: 'IPR011009',
            properties: [
              {
                key: 'EntryName',
                value: 'Kinase-like_dom_sf',
              },
            ],
          },
          {
            database: 'InterPro',
            id: 'IPR000719',
            properties: [
              {
                key: 'EntryName',
                value: 'Prot_kinase_dom',
              },
            ],
          },
          {
            database: 'InterPro',
            id: 'IPR008271',
            properties: [
              {
                key: 'EntryName',
                value: 'Ser/Thr_kinase_AS',
              },
            ],
          },
          {
            database: 'Pfam',
            id: 'PF00069',
            properties: [
              {
                key: 'EntryName',
                value: 'Pkinase',
              },
              {
                key: 'MatchStatus',
                value: '2',
              },
            ],
          },
          {
            database: 'SMART',
            id: 'SM00220',
            properties: [
              {
                key: 'EntryName',
                value: 'S_TKc',
              },
              {
                key: 'MatchStatus',
                value: '1',
              },
            ],
          },
          {
            database: 'SUPFAM',
            id: 'SSF56112',
            properties: [
              {
                key: 'EntryName',
                value: 'SSF56112',
              },
              {
                key: 'MatchStatus',
                value: '1',
              },
            ],
          },
          {
            database: 'PROSITE',
            id: 'PS50011',
            properties: [
              {
                key: 'EntryName',
                value: 'PROTEIN_KINASE_DOM',
              },
              {
                key: 'MatchStatus',
                value: '1',
              },
            ],
          },
          {
            database: 'PROSITE',
            id: 'PS00108',
            properties: [
              {
                key: 'EntryName',
                value: 'PROTEIN_KINASE_ST',
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
            'MTSKTKNIDDIPPEIKEEMIQLYHDLPGIENEYKLIDKIGEGTFSSVYKAKDITGKITKKFASHFWNYGSNYVALKKIYVTSSPQRIYNELNLLYIMTGSSRVAPLCDAKRVRDQVIAVLPYYPHEEFRTFYRDLPIKGIKKYIWELLRALKFVHSKGIIHRDIKPTNFLFNLELGRGVLVDFGLAEAQMDYKSMISSQNDYDNYANTNHDGGYSMRNHEQFCPCIMRNQYSPNSHNQTPPMVTIQNGKVVHLNNVNGVDLTKGYPKNETRRIKRANRAGTRGFRAPEVLMKCGAQSTKIDIWSVGVILLSLLGRRFPMFQSLDDADSLLELCTIFGWKELRKCAALHGLGFEASGLIWDKPNGYSNGLKEFVYDLLNKECTIGTFPEYSVAFETFGFLQQELHDRMSIEPQLPDPKTNMDAVDAYELKKYQEEIWSDHYWCFQVLEQCFEMDPQKRSSAEDLLKTPFFNELNENTYLLDGESTDEDDVVSSSEADLLDKDVLLISE',
          length: 507,
          molWeight: 58320,
          crc64: 'B74BA9144D0EC39F',
          md5: 'D22BB14A89EE7CF078F458CA1998076D',
        },
        extraAttributes: {
          countByCommentType: {
            FUNCTION: 1,
            'CATALYTIC ACTIVITY': 2,
            COFACTOR: 1,
            SUBUNIT: 1,
            INTERACTION: 4,
            MISCELLANEOUS: 1,
            SIMILARITY: 1,
            'SEQUENCE CAUTION': 1,
          },
          countByFeatureType: {
            Chain: 1,
            Domain: 1,
            'Nucleotide binding': 1,
            'Active site': 1,
            'Binding site': 1,
          },
          uniParcId: 'UPI000012725A',
        },
      },
    },
    {
      from: 'P41892',
      to: {
        entryType: 'UniProtKB reviewed (Swiss-Prot)',
        primaryAccession: 'P41892',
        uniProtkbId: 'CDC7_SCHPO',
        entryAudit: {
          firstPublicDate: '1995-11-01',
          lastAnnotationUpdateDate: '2021-04-07',
          lastSequenceUpdateDate: '1995-11-01',
          entryVersion: 154,
          sequenceVersion: 1,
        },
        annotationScore: 5,
        organism: {
          scientificName: 'Schizosaccharomyces pombe (strain 972 / ATCC 24843)',
          commonName: 'Fission yeast',
          taxonId: 284812,
          lineage: [
            'Eukaryota',
            'Fungi',
            'Dikarya',
            'Ascomycota',
            'Taphrinomycotina',
            'Schizosaccharomycetes',
            'Schizosaccharomycetales',
            'Schizosaccharomycetaceae',
            'Schizosaccharomyces',
          ],
        },
        proteinExistence: '1: Evidence at protein level',
        proteinDescription: {
          recommendedName: {
            fullName: {
              value: 'Cell division control protein 7',
            },
            ecNumbers: [
              {
                value: '2.7.11.1',
              },
            ],
          },
        },
        genes: [
          {
            geneName: {
              value: 'cdc7',
            },
            orfNames: [
              {
                value: 'SPBC21.06c',
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
                    evidenceCode: 'ECO:0000269',
                    source: 'PubMed',
                    id: '8039497',
                  },
                ],
                value:
                  'Protein kinase essential for cell division. Plays a key role in initiation of septum formation and cytokinesis',
              },
            ],
            commentType: 'FUNCTION',
          },
          {
            commentType: 'CATALYTIC ACTIVITY',
            reaction: {
              name: 'ATP + L-seryl-[protein] = ADP + H(+) + O-phospho-L-seryl-[protein]',
              reactionCrossReferences: [
                {
                  database: 'Rhea',
                  id: 'RHEA:17989',
                },
                {
                  database: 'Rhea',
                  id: 'RHEA-COMP:9863',
                },
                {
                  database: 'Rhea',
                  id: 'RHEA-COMP:11604',
                },
                {
                  database: 'ChEBI',
                  id: 'CHEBI:15378',
                },
                {
                  database: 'ChEBI',
                  id: 'CHEBI:29999',
                },
                {
                  database: 'ChEBI',
                  id: 'CHEBI:30616',
                },
                {
                  database: 'ChEBI',
                  id: 'CHEBI:83421',
                },
                {
                  database: 'ChEBI',
                  id: 'CHEBI:456216',
                },
              ],
              ecNumber: '2.7.11.1',
            },
          },
          {
            commentType: 'CATALYTIC ACTIVITY',
            reaction: {
              name: 'ATP + L-threonyl-[protein] = ADP + H(+) + O-phospho-L-threonyl-[protein]',
              reactionCrossReferences: [
                {
                  database: 'Rhea',
                  id: 'RHEA:46608',
                },
                {
                  database: 'Rhea',
                  id: 'RHEA-COMP:11060',
                },
                {
                  database: 'Rhea',
                  id: 'RHEA-COMP:11605',
                },
                {
                  database: 'ChEBI',
                  id: 'CHEBI:15378',
                },
                {
                  database: 'ChEBI',
                  id: 'CHEBI:30013',
                },
                {
                  database: 'ChEBI',
                  id: 'CHEBI:30616',
                },
                {
                  database: 'ChEBI',
                  id: 'CHEBI:61977',
                },
                {
                  database: 'ChEBI',
                  id: 'CHEBI:456216',
                },
              ],
              ecNumber: '2.7.11.1',
            },
          },
          {
            commentType: 'COFACTOR',
            cofactors: [
              {
                name: 'Mg(2+)',
                cofactorCrossReference: {
                  database: 'ChEBI',
                  id: 'CHEBI:18420',
                },
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
                    id: '9203579',
                  },
                ],
                value: 'Interacts with spg1. Seems to interact with cdc11',
              },
            ],
            commentType: 'SUBUNIT',
          },
          {
            texts: [
              {
                evidences: [
                  {
                    evidenceCode: 'ECO:0000255',
                    source: 'PROSITE-ProRule',
                    id: 'PRU00159',
                  },
                ],
                value:
                  'Belongs to the protein kinase superfamily. Ser/Thr protein kinase family. CDC7 subfamily',
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
                value: 1062,
                modifier: 'EXACT',
              },
            },
            description: 'Cell division control protein 7',
            featureId: 'PRO_0000085765',
          },
          {
            type: 'Domain',
            location: {
              start: {
                value: 9,
                modifier: 'EXACT',
              },
              end: {
                value: 259,
                modifier: 'EXACT',
              },
            },
            description: 'Protein kinase',
            evidences: [
              {
                evidenceCode: 'ECO:0000255',
                source: 'PROSITE-ProRule',
                id: 'PRU00159',
              },
            ],
          },
          {
            type: 'Nucleotide binding',
            location: {
              start: {
                value: 15,
                modifier: 'EXACT',
              },
              end: {
                value: 23,
                modifier: 'EXACT',
              },
            },
            description: 'ATP',
            evidences: [
              {
                evidenceCode: 'ECO:0000255',
                source: 'PROSITE-ProRule',
                id: 'PRU00159',
              },
            ],
          },
          {
            type: 'Compositional bias',
            location: {
              start: {
                value: 483,
                modifier: 'EXACT',
              },
              end: {
                value: 490,
                modifier: 'EXACT',
              },
            },
            description: 'Asp/Glu-rich (acidic)',
          },
          {
            type: 'Active site',
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
            description: 'Proton acceptor',
            evidences: [
              {
                evidenceCode: 'ECO:0000255',
                source: 'PROSITE-ProRule',
                id: 'PRU00159',
              },
              {
                evidenceCode: 'ECO:0000255',
                source: 'PROSITE-ProRule',
                id: 'PRU10027',
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
                value: 38,
                modifier: 'EXACT',
              },
            },
            description: 'ATP',
            evidences: [
              {
                evidenceCode: 'ECO:0000255',
                source: 'PROSITE-ProRule',
                id: 'PRU00159',
              },
            ],
          },
        ],
        keywords: [
          {
            id: 'KW-0067',
            category: 'Ligand',
            name: 'ATP-binding',
          },
          {
            id: 'KW-0131',
            category: 'Biological process',
            name: 'Cell cycle',
          },
          {
            id: 'KW-0132',
            category: 'Biological process',
            name: 'Cell division',
          },
          {
            id: 'KW-0418',
            category: 'Molecular function',
            name: 'Kinase',
          },
          {
            id: 'KW-0460',
            category: 'Ligand',
            name: 'Magnesium',
          },
          {
            id: 'KW-0479',
            category: 'Ligand',
            name: 'Metal-binding',
          },
          {
            id: 'KW-0547',
            category: 'Ligand',
            name: 'Nucleotide-binding',
          },
          {
            id: 'KW-1185',
            category: 'Technical term',
            name: 'Reference proteome',
          },
          {
            id: 'KW-0723',
            category: 'Molecular function',
            name: 'Serine/threonine-protein kinase',
          },
          {
            id: 'KW-0808',
            category: 'Molecular function',
            name: 'Transferase',
          },
        ],
        references: [
          {
            citation: {
              id: '8039497',
              citationType: 'journal article',
              authors: ['Fankhauser C.', 'Simanis V.'],
              citationCrossReferences: [
                {
                  database: 'PubMed',
                  id: '8039497',
                },
                {
                  database: 'DOI',
                  id: '10.1002/j.1460-2075.1994.tb06600.x',
                },
              ],
              title:
                'The cdc7 protein kinase is a dosage dependent regulator of septum formation in fission yeast.',
              publicationDate: '1994',
              journal: 'EMBO J.',
              firstPage: '3011',
              lastPage: '3019',
              volume: '13',
            },
            referencePositions: [
              'NUCLEOTIDE SEQUENCE [GENOMIC DNA]',
              'FUNCTION',
            ],
            referenceComments: [
              {
                value: '972 / ATCC 24843',
                type: 'STRAIN',
              },
            ],
          },
          {
            citation: {
              id: '11859360',
              citationType: 'journal article',
              authors: [
                'Wood V.',
                'Gwilliam R.',
                'Rajandream M.A.',
                'Lyne M.H.',
                'Lyne R.',
                'Stewart A.',
                'Sgouros J.G.',
                'Peat N.',
                'Hayles J.',
                'Baker S.G.',
                'Basham D.',
                'Bowman S.',
                'Brooks K.',
                'Brown D.',
                'Brown S.',
                'Chillingworth T.',
                'Churcher C.M.',
                'Collins M.',
                'Connor R.',
                'Cronin A.',
                'Davis P.',
                'Feltwell T.',
                'Fraser A.',
                'Gentles S.',
                'Goble A.',
                'Hamlin N.',
                'Harris D.E.',
                'Hidalgo J.',
                'Hodgson G.',
                'Holroyd S.',
                'Hornsby T.',
                'Howarth S.',
                'Huckle E.J.',
                'Hunt S.',
                'Jagels K.',
                'James K.D.',
                'Jones L.',
                'Jones M.',
                'Leather S.',
                'McDonald S.',
                'McLean J.',
                'Mooney P.',
                'Moule S.',
                'Mungall K.L.',
                'Murphy L.D.',
                'Niblett D.',
                'Odell C.',
                'Oliver K.',
                "O'Neil S.",
                'Pearson D.',
                'Quail M.A.',
                'Rabbinowitsch E.',
                'Rutherford K.M.',
                'Rutter S.',
                'Saunders D.',
                'Seeger K.',
                'Sharp S.',
                'Skelton J.',
                'Simmonds M.N.',
                'Squares R.',
                'Squares S.',
                'Stevens K.',
                'Taylor K.',
                'Taylor R.G.',
                'Tivey A.',
                'Walsh S.V.',
                'Warren T.',
                'Whitehead S.',
                'Woodward J.R.',
                'Volckaert G.',
                'Aert R.',
                'Robben J.',
                'Grymonprez B.',
                'Weltjens I.',
                'Vanstreels E.',
                'Rieger M.',
                'Schaefer M.',
                'Mueller-Auer S.',
                'Gabel C.',
                'Fuchs M.',
                'Duesterhoeft A.',
                'Fritzc C.',
                'Holzer E.',
                'Moestl D.',
                'Hilbert H.',
                'Borzym K.',
                'Langer I.',
                'Beck A.',
                'Lehrach H.',
                'Reinhardt R.',
                'Pohl T.M.',
                'Eger P.',
                'Zimmermann W.',
                'Wedler H.',
                'Wambutt R.',
                'Purnelle B.',
                'Goffeau A.',
                'Cadieu E.',
                'Dreano S.',
                'Gloux S.',
                'Lelaure V.',
                'Mottier S.',
                'Galibert F.',
                'Aves S.J.',
                'Xiang Z.',
                'Hunt C.',
                'Moore K.',
                'Hurst S.M.',
                'Lucas M.',
                'Rochet M.',
                'Gaillardin C.',
                'Tallada V.A.',
                'Garzon A.',
                'Thode G.',
                'Daga R.R.',
                'Cruzado L.',
                'Jimenez J.',
                'Sanchez M.',
                'del Rey F.',
                'Benito J.',
                'Dominguez A.',
                'Revuelta J.L.',
                'Moreno S.',
                'Armstrong J.',
                'Forsburg S.L.',
                'Cerutti L.',
                'Lowe T.',
                'McCombie W.R.',
                'Paulsen I.',
                'Potashkin J.',
                'Shpakovski G.V.',
                'Ussery D.',
                'Barrell B.G.',
                'Nurse P.',
              ],
              citationCrossReferences: [
                {
                  database: 'PubMed',
                  id: '11859360',
                },
                {
                  database: 'DOI',
                  id: '10.1038/nature724',
                },
              ],
              title: 'The genome sequence of Schizosaccharomyces pombe.',
              publicationDate: '2002',
              journal: 'Nature',
              firstPage: '871',
              lastPage: '880',
              volume: '415',
            },
            referencePositions: [
              'NUCLEOTIDE SEQUENCE [LARGE SCALE GENOMIC DNA]',
            ],
            referenceComments: [
              {
                value: '972 / ATCC 24843',
                type: 'STRAIN',
              },
            ],
          },
          {
            citation: {
              id: '9203579',
              citationType: 'journal article',
              authors: [
                'Schmidt S.',
                'Sohrmann M.',
                'Hofmann K.',
                'Woollard A.',
                'Simanis V.',
              ],
              citationCrossReferences: [
                {
                  database: 'PubMed',
                  id: '9203579',
                },
                {
                  database: 'DOI',
                  id: '10.1101/gad.11.12.1519',
                },
              ],
              title:
                'The Spg1p GTPase is an essential, dosage-dependent inducer of septum formation in Schizosaccharomyces pombe.',
              publicationDate: '1997',
              journal: 'Genes Dev.',
              firstPage: '1519',
              lastPage: '1534',
              volume: '11',
            },
            referencePositions: ['INTERACTION WITH SPG1'],
          },
        ],
        uniProtKBCrossReferences: [
          {
            database: 'EMBL',
            id: 'X78799',
            properties: [
              {
                key: 'ProteinId',
                value: 'CAA55382.1',
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
            id: 'CU329671',
            properties: [
              {
                key: 'ProteinId',
                value: 'CAB36886.1',
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
            id: 'S46367',
            properties: [
              {
                key: 'EntryName',
                value: 'S46367',
              },
            ],
          },
          {
            database: 'RefSeq',
            id: 'NP_596340.1',
            properties: [
              {
                key: 'NucleotideSequenceId',
                value: 'NM_001022261.2',
              },
            ],
          },
          {
            database: 'BioGRID',
            id: '277185',
            properties: [
              {
                key: 'Interactions',
                value: '47',
              },
            ],
          },
          {
            database: 'STRING',
            id: '4896.SPBC21.06c.1',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'iPTMnet',
            id: 'P41892',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'MaxQB',
            id: 'P41892',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'PaxDb',
            id: 'P41892',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'PRIDE',
            id: 'P41892',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'EnsemblFungi',
            id: 'SPBC21.06c.1',
            properties: [
              {
                key: 'ProteinId',
                value: 'SPBC21.06c.1:pep',
              },
              {
                key: 'GeneId',
                value: 'SPBC21.06c',
              },
            ],
          },
          {
            database: 'GeneID',
            id: '2540660',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'KEGG',
            id: 'spo:SPBC21.06c',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'PomBase',
            id: 'SPBC21.06c',
            properties: [
              {
                key: 'GeneName',
                value: 'cdc7',
              },
            ],
          },
          {
            database: 'VEuPathDB',
            id: 'FungiDB:SPBC21.06c',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'eggNOG',
            id: 'KOG0198',
            properties: [
              {
                key: 'ToxonomicScope',
                value: 'Eukaryota',
              },
            ],
          },
          {
            database: 'HOGENOM',
            id: 'CLU_001872_2_1_1',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'InParanoid',
            id: 'P41892',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'OMA',
            id: 'KLLRHPW',
            properties: [
              {
                key: 'Fingerprint',
                value: '-',
              },
            ],
          },
          {
            database: 'PhylomeDB',
            id: 'P41892',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'BRENDA',
            id: '2.7.11.24',
            properties: [
              {
                key: 'OrganismId',
                value: '5613',
              },
            ],
          },
          {
            database: 'BRENDA',
            id: '2.7.12.2',
            properties: [
              {
                key: 'OrganismId',
                value: '5613',
              },
            ],
          },
          {
            database: 'PRO',
            id: 'PR:P41892',
            properties: [
              {
                key: 'Description',
                value: '-',
              },
            ],
          },
          {
            database: 'Proteomes',
            id: 'UP000002485',
            properties: [
              {
                key: 'Component',
                value: 'Chromosome II',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0044732',
            properties: [
              {
                key: 'GoTerm',
                value: 'C:mitotic spindle pole body',
              },
              {
                key: 'GoEvidenceType',
                value: 'IDA:PomBase',
              },
            ],
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '9420333',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0071958',
            properties: [
              {
                key: 'GoTerm',
                value: 'C:new mitotic spindle pole body',
              },
              {
                key: 'GoEvidenceType',
                value: 'IDA:PomBase',
              },
            ],
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '16325501',
              },
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '19942852',
              },
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '22119525',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0005634',
            properties: [
              {
                key: 'GoTerm',
                value: 'C:nucleus',
              },
              {
                key: 'GoEvidenceType',
                value: 'HDA:PomBase',
              },
            ],
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '16823372',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0005524',
            properties: [
              {
                key: 'GoTerm',
                value: 'F:ATP binding',
              },
              {
                key: 'GoEvidenceType',
                value: 'IEA:UniProtKB-KW',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0046872',
            properties: [
              {
                key: 'GoTerm',
                value: 'F:metal ion binding',
              },
              {
                key: 'GoEvidenceType',
                value: 'IEA:UniProtKB-KW',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0106310',
            properties: [
              {
                key: 'GoTerm',
                value: 'F:protein serine kinase activity',
              },
              {
                key: 'GoEvidenceType',
                value: 'IEA:UniProtKB-EC',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0004674',
            properties: [
              {
                key: 'GoTerm',
                value: 'F:protein serine/threonine kinase activity',
              },
              {
                key: 'GoEvidenceType',
                value: 'IDA:PomBase',
              },
            ],
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '12546793',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0106311',
            properties: [
              {
                key: 'GoTerm',
                value: 'F:protein threonine kinase activity',
              },
              {
                key: 'GoEvidenceType',
                value: 'IEA:UniProtKB-EC',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0007049',
            properties: [
              {
                key: 'GoTerm',
                value: 'P:cell cycle',
              },
              {
                key: 'GoEvidenceType',
                value: 'IEA:UniProtKB-KW',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0051301',
            properties: [
              {
                key: 'GoTerm',
                value: 'P:cell division',
              },
              {
                key: 'GoEvidenceType',
                value: 'IEA:UniProtKB-KW',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0140281',
            properties: [
              {
                key: 'GoTerm',
                value:
                  'P:positive regulation of mitotic division septum assembly',
              },
              {
                key: 'GoEvidenceType',
                value: 'IMP:PomBase',
              },
            ],
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '8039497',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:1902542',
            properties: [
              {
                key: 'GoTerm',
                value:
                  'P:regulation of protein localization to mitotic spindle pole body',
              },
              {
                key: 'GoEvidenceType',
                value: 'IMP:PomBase',
              },
            ],
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '16096637',
              },
            ],
          },
          {
            database: 'GO',
            id: 'GO:0031028',
            properties: [
              {
                key: 'GoTerm',
                value: 'P:septation initiation signaling',
              },
              {
                key: 'GoEvidenceType',
                value: 'IGI:PomBase',
              },
            ],
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '12546793',
              },
            ],
          },
          {
            database: 'InterPro',
            id: 'IPR016024',
            properties: [
              {
                key: 'EntryName',
                value: 'ARM-type_fold',
              },
            ],
          },
          {
            database: 'InterPro',
            id: 'IPR011009',
            properties: [
              {
                key: 'EntryName',
                value: 'Kinase-like_dom_sf',
              },
            ],
          },
          {
            database: 'InterPro',
            id: 'IPR000719',
            properties: [
              {
                key: 'EntryName',
                value: 'Prot_kinase_dom',
              },
            ],
          },
          {
            database: 'InterPro',
            id: 'IPR017441',
            properties: [
              {
                key: 'EntryName',
                value: 'Protein_kinase_ATP_BS',
              },
            ],
          },
          {
            database: 'InterPro',
            id: 'IPR008271',
            properties: [
              {
                key: 'EntryName',
                value: 'Ser/Thr_kinase_AS',
              },
            ],
          },
          {
            database: 'Pfam',
            id: 'PF00069',
            properties: [
              {
                key: 'EntryName',
                value: 'Pkinase',
              },
              {
                key: 'MatchStatus',
                value: '1',
              },
            ],
          },
          {
            database: 'SMART',
            id: 'SM00220',
            properties: [
              {
                key: 'EntryName',
                value: 'S_TKc',
              },
              {
                key: 'MatchStatus',
                value: '1',
              },
            ],
          },
          {
            database: 'SUPFAM',
            id: 'SSF48371',
            properties: [
              {
                key: 'EntryName',
                value: 'SSF48371',
              },
              {
                key: 'MatchStatus',
                value: '1',
              },
            ],
          },
          {
            database: 'SUPFAM',
            id: 'SSF56112',
            properties: [
              {
                key: 'EntryName',
                value: 'SSF56112',
              },
              {
                key: 'MatchStatus',
                value: '1',
              },
            ],
          },
          {
            database: 'PROSITE',
            id: 'PS00107',
            properties: [
              {
                key: 'EntryName',
                value: 'PROTEIN_KINASE_ATP',
              },
              {
                key: 'MatchStatus',
                value: '1',
              },
            ],
          },
          {
            database: 'PROSITE',
            id: 'PS50011',
            properties: [
              {
                key: 'EntryName',
                value: 'PROTEIN_KINASE_DOM',
              },
              {
                key: 'MatchStatus',
                value: '1',
              },
            ],
          },
          {
            database: 'PROSITE',
            id: 'PS00108',
            properties: [
              {
                key: 'EntryName',
                value: 'PROTEIN_KINASE_ST',
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
            'MHNIQASSITLGDCLGKGAFGAVYRGLNIKNGETVAVKKVKLSKMLKSDLSVIKMEIDLLKNLDHPNIVKYRGSYQTNDSLCIILEYCENGSLRSICKNFGKIPENLVALYTFQVLQGLLYLHNQGVIHRDIKGANILTTKDGTIKLADFGVATKINALEDHSVVGSPYWMAPEVIELVGATTASDIWSVGCTVIELLDGNPPYYDLDPTSALFRMVKDEHPPLPSNISSAAKSFLMQCFQKDPNLRIKTRKLLKHPWVIMNQTSSKFSDAIDEVQKYNERVKESTLTAIIEPTSNRINPTLHSGRQSSYHMPESPKTPIAESPDHDNWDNEFQGTLKISDDVLKKSEHFMDFCSNFKGKNNSSSITSSPSKSRHAFNSDQISESNNFNASPLSTPLKAQFDPSKPALNRSIDHQKTPQHKRYLSTEFKENIPDGIEKFVETPRDSEFTDIFPTSSIKVQGLRKETGLGTLVLNKCYGSWNNEENEDGEESDIFDSIETNLENLDIENNIALDKRTHLASLLSSLLGSLRDKNIGSKDTTVSQIASILSEDLSLKREIIQAHGILPLLETLREIKTPDVQLLLLKLINTVAFDDHTTLQKVCFAGGLPLMLSFSNREHSFEFRYESAIFIQQMYRTSALTLQMFLSSNGLNSLLLFIKEDYGTNRDFVFVGVEGIWKLLRQQDYIPKNDICTMVVNDSLEPLTKAMLKALATDDDSSRMSLTRICEILLALSQADNYVKESLLCESALRRILRILLYLPHSDMAITLQFFKQLSMVPSSLSLLRKVHIIPLLTHILGDSKIEKGRKEIRSEALAALFNVCKLDKKSQEEAVISGAIPLLQEVIIKDRLFKEFALPILLALPQAGPVSRIYLWQNKCLDFFLSLLSDLNWQSAVFDTIASWLQFELREVQRVLAEKRNVQLVLKVFCISQSASSNRMLDTLGRVCQISPRLAASYGQPIIFQKFKEKLTHKGTKPIVVLNIFQIMKSMCEASSQSVAYIAHCGLPDVVANLNQTSDSVLVKELAKDLLKYLKVPQGPINEHKSPISKPHMPPPRWQPKQPLTQ',
          length: 1062,
          molWeight: 119291,
          crc64: '04459AD60C0E2EDD',
          md5: '8928AE435DC4AE567A76D27A10A702B5',
        },
        extraAttributes: {
          countByCommentType: {
            FUNCTION: 1,
            'CATALYTIC ACTIVITY': 2,
            COFACTOR: 1,
            SUBUNIT: 1,
            SIMILARITY: 1,
          },
          countByFeatureType: {
            Chain: 1,
            Domain: 1,
            'Nucleotide binding': 1,
            'Compositional bias': 1,
            'Active site': 1,
            'Binding site': 1,
          },
          uniParcId: 'UPI0000127259',
        },
      },
    },
  ],
};

export default mappingResults;
