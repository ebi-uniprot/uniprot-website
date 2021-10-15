import { UniProtkbAPIModel } from '../adapters/uniProtkbConverter';

// Source: /api/uniprotkb/P0DTR4
// Retrieved: 2021-10-15
const mock: UniProtkbAPIModel = {
  entryType: 'UniProtKB reviewed (Swiss-Prot)',
  primaryAccession: 'P0DTR4',
  uniProtkbId: 'ADAC_FLAPL',
  entryAudit: {
    firstPublicDate: '2019-11-13',
    lastAnnotationUpdateDate: '2021-06-02',
    lastSequenceUpdateDate: '2019-11-13',
    entryVersion: 7,
    sequenceVersion: 1,
  },
  annotationScore: 105.9,
  organism: {
    scientificName: 'Flavonifractor plautii',
    commonName: 'Fusobacterium plautii',
    taxonId: 292800,
    lineage: [
      'Bacteria',
      'Firmicutes',
      'Clostridia',
      'Eubacteriales',
      'Oscillospiraceae',
      'Flavonifractor',
    ],
  },
  proteinExistence: '1: Evidence at protein level',
  proteinDescription: {
    recommendedName: {
      fullName: {
        evidences: [
          {
            evidenceCode: 'ECO:0000303',
            source: 'PubMed',
            id: '31182795',
          },
        ],
        value: 'A type blood N-acetyl-alpha-D-galactosamine deacetylase',
      },
      ecNumbers: [
        {
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '31182795',
            },
          ],
          value: '3.5.1.-',
        },
      ],
    },
    alternativeNames: [
      {
        fullName: {
          evidences: [
            {
              evidenceCode: 'ECO:0000303',
              source: 'PubMed',
              id: '31182795',
            },
          ],
          value: 'CBM32',
        },
      },
      {
        fullName: {
          value: 'FpGalNAc deacetylase',
        },
        shortNames: [
          {
            evidences: [
              {
                evidenceCode: 'ECO:0000303',
                source: 'PubMed',
                id: '31182795',
              },
            ],
            value: 'FpGalNAcDeAc',
          },
        ],
      },
    ],
    flag: 'Precursor',
  },
  comments: [
    {
      texts: [
        {
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '31182795',
            },
          ],
          value:
            'One of an enzyme pair that work together to convert the A antigen to the H antigen of the O blood type, which together release galactosamine. Catalyzes the first step in the conversion, generating the substrate for the subsequent enzyme (FpGalNase, AC P0DTR5). Works on many different A antigen subtypes. Glu-90 probably activates a nucleophilic water molecule to start the deacetylation reaction',
        },
      ],
      commentType: 'FUNCTION',
    },
    {
      commentType: 'CATALYTIC ACTIVITY',
      reaction: {
        name: 'an N-acetyl-alpha-D-galactosaminyl-(1->3)-[alpha-L-fucosyl-(1->2)]-beta-D-galactosyl derivative + H2O = acetate + an alpha-D-galactosaminyl-(1->3)-[alpha-L-fucosyl-(1->2)]-beta-D-galactosyl derivative',
        reactionCrossReferences: [
          {
            database: 'Rhea',
            id: 'RHEA:14869',
          },
          {
            database: 'ChEBI',
            id: 'CHEBI:15377',
          },
          {
            database: 'ChEBI',
            id: 'CHEBI:30089',
          },
          {
            database: 'ChEBI',
            id: 'CHEBI:140559',
          },
          {
            database: 'ChEBI',
            id: 'CHEBI:144802',
          },
        ],
        evidences: [
          {
            evidenceCode: 'ECO:0000269',
            source: 'PubMed',
            id: '31182795',
          },
        ],
      },
    },
    {
      commentType: 'COFACTOR',
      cofactors: [
        {
          name: 'a divalent metal cation',
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '31182795',
            },
          ],
          cofactorCrossReference: {
            database: 'ChEBI',
            id: 'CHEBI:60240',
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
              id: '31182795',
            },
          ],
          value: 'Inhibited by EDTA',
        },
      ],
      commentType: 'ACTIVITY REGULATION',
    },
    {
      commentType: 'BIOPHYSICOCHEMICAL PROPERTIES',
      kineticParameters: {
        michaelisConstants: [
          {
            constant: 340,
            unit: 'uM',
            substrate: 'A antigen type 1 penta-MU',
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '31182795',
              },
            ],
          },
        ],
      },
      phDependence: {
        texts: [
          {
            evidences: [
              {
                evidenceCode: 'ECO:0000269',
                source: 'PubMed',
                id: '31182795',
              },
            ],
            value: 'Optimum pH is 8.0.',
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
              id: '31182795',
            },
          ],
          value:
            'The deacetylase domain is in the N-terminus, while the C-terminus has a CBM32-type carbohydrate-binding domain that is not required for activity on soluble substrates. The CBM32 domain binds preferentially to repeating N-acetyl lactosamine structures',
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
              id: '31182795',
            },
          ],
          value:
            '5 ug/ml of this enzyme pair converts A blood type to O blood type in an hour, and can be removed by centrifugation, showing the pair can be used for production of universal type donor blood',
        },
      ],
      commentType: 'BIOTECHNOLOGY',
    },
    {
      texts: [
        {
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '31182795',
            },
          ],
          value:
            'DNA was isolated from a male human fecal sample of AB+ blood type, the sequence was given to UniProtKB by the submitters',
        },
      ],
      commentType: 'MISCELLANEOUS',
    },
    {
      commentType: 'WEB RESOURCE',
      resourceName: 'Protein Spotlight',
      resourceUrl: 'https://web.expasy.org/spotlight/back_issues/220/',
      ftp: false,
      note: 'Dropping barriers - Issue 220 of December 2019',
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
          value: 27,
          modifier: 'EXACT',
        },
      },
      description: '',
      evidences: [
        {
          evidenceCode: 'ECO:0000255',
        },
      ],
    },
    {
      type: 'Chain',
      location: {
        start: {
          value: 28,
          modifier: 'EXACT',
        },
        end: {
          value: 772,
          modifier: 'EXACT',
        },
      },
      description: 'A type blood N-acetyl-alpha-D-galactosamine deacetylase',
      featureId: 'PRO_0000448571',
    },
    {
      type: 'Domain',
      location: {
        start: {
          value: 494,
          modifier: 'EXACT',
        },
        end: {
          value: 605,
          modifier: 'EXACT',
        },
      },
      description: 'F5/8 type C',
      evidences: [
        {
          evidenceCode: 'ECO:0000255',
          source: 'PROSITE-ProRule',
          id: 'PRU00081',
        },
      ],
    },
    {
      type: 'Region',
      location: {
        start: {
          value: 180,
          modifier: 'EXACT',
        },
        end: {
          value: 402,
          modifier: 'EXACT',
        },
      },
      description: 'Deacetylase activity',
      evidences: [
        {
          evidenceCode: 'ECO:0000269',
          source: 'PubMed',
          id: '31182795',
        },
      ],
    },
    {
      type: 'Region',
      location: {
        start: {
          value: 502,
          modifier: 'EXACT',
        },
        end: {
          value: 765,
          modifier: 'EXACT',
        },
      },
      description: 'CBM32 carbohydrate-binding domain',
      evidences: [
        {
          evidenceCode: 'ECO:0000269',
          source: 'PubMed',
          id: '31182795',
        },
      ],
    },
    {
      type: 'Region',
      location: {
        start: {
          value: 515,
          modifier: 'EXACT',
        },
        end: {
          value: 772,
          modifier: 'EXACT',
        },
      },
      description: 'Not required for activity on soluble substrates',
      evidences: [
        {
          evidenceCode: 'ECO:0000269',
          source: 'PubMed',
          id: '31182795',
        },
      ],
    },
    {
      type: 'Metal binding',
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
      description: 'Divalent metal cation',
      evidences: [
        {
          evidenceCode: 'ECO:0000269',
          source: 'PubMed',
          id: '31182795',
        },
        {
          evidenceCode: 'ECO:0007744',
          source: 'PDB',
          id: '6N1A',
        },
        {
          evidenceCode: 'ECO:0007744',
          source: 'PDB',
          id: '6N1B',
        },
      ],
    },
    {
      type: 'Metal binding',
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
      description: 'Divalent metal cation',
      evidences: [
        {
          evidenceCode: 'ECO:0000269',
          source: 'PubMed',
          id: '31182795',
        },
        {
          evidenceCode: 'ECO:0007744',
          source: 'PDB',
          id: '6N1A',
        },
        {
          evidenceCode: 'ECO:0007744',
          source: 'PDB',
          id: '6N1B',
        },
      ],
    },
    {
      type: 'Binding site',
      location: {
        start: {
          value: 87,
          modifier: 'EXACT',
        },
        end: {
          value: 87,
          modifier: 'EXACT',
        },
      },
      description: 'Substrate',
      evidences: [
        {
          evidenceCode: 'ECO:0000269',
          source: 'PubMed',
          id: '31182795',
        },
        {
          evidenceCode: 'ECO:0007744',
          source: 'PDB',
          id: '6N1B',
        },
      ],
    },
    {
      type: 'Binding site',
      location: {
        start: {
          value: 123,
          modifier: 'EXACT',
        },
        end: {
          value: 123,
          modifier: 'EXACT',
        },
      },
      description: 'Substrate',
      evidences: [
        {
          evidenceCode: 'ECO:0000269',
          source: 'PubMed',
          id: '31182795',
        },
        {
          evidenceCode: 'ECO:0007744',
          source: 'PDB',
          id: '6N1B',
        },
      ],
    },
    {
      type: 'Binding site',
      location: {
        start: {
          value: 236,
          modifier: 'EXACT',
        },
        end: {
          value: 236,
          modifier: 'EXACT',
        },
      },
      description: 'Substrate',
      evidences: [
        {
          evidenceCode: 'ECO:0000269',
          source: 'PubMed',
          id: '31182795',
        },
        {
          evidenceCode: 'ECO:0007744',
          source: 'PDB',
          id: '6N1B',
        },
      ],
    },
    {
      type: 'Mutagenesis',
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
      description: 'Loss of deacetylase activity.',
      evidences: [
        {
          evidenceCode: 'ECO:0000269',
          source: 'PubMed',
          id: '31182795',
        },
      ],
      alternativeSequence: {
        originalSequence: 'E',
        alternativeSequences: ['A', 'L'],
      },
    },
    {
      type: 'Mutagenesis',
      location: {
        start: {
          value: 125,
          modifier: 'EXACT',
        },
        end: {
          value: 125,
          modifier: 'EXACT',
        },
      },
      description: '5-fold reduction in deacetylase rate.',
      evidences: [
        {
          evidenceCode: 'ECO:0000269',
          source: 'PubMed',
          id: '31182795',
        },
      ],
      alternativeSequence: {
        originalSequence: 'C',
        alternativeSequences: ['A', 'S'],
      },
    },
    {
      type: 'Mutagenesis',
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
      description: 'Dramatic reduction in deacetylase rate.',
      evidences: [
        {
          evidenceCode: 'ECO:0000269',
          source: 'PubMed',
          id: '31182795',
        },
      ],
      alternativeSequence: {
        originalSequence: 'D',
        alternativeSequences: ['N'],
      },
    },
    {
      type: 'Mutagenesis',
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
      description: 'Very dramatic reduction in deacetylase rate.',
      evidences: [
        {
          evidenceCode: 'ECO:0000269',
          source: 'PubMed',
          id: '31182795',
        },
      ],
      alternativeSequence: {
        originalSequence: 'H',
        alternativeSequences: ['A', 'F'],
      },
    },
    {
      type: 'Mutagenesis',
      location: {
        start: {
          value: 341,
          modifier: 'EXACT',
        },
        end: {
          value: 341,
          modifier: 'EXACT',
        },
      },
      description: '3000-fold reduction in deacetylase rate.',
      evidences: [
        {
          evidenceCode: 'ECO:0000269',
          source: 'PubMed',
          id: '31182795',
        },
      ],
      alternativeSequence: {
        originalSequence: 'Y',
        alternativeSequences: ['F'],
      },
    },
  ],
  keywords: [
    {
      id: 'KW-0002',
      category: 'Technical term',
      name: '3D-structure',
    },
    {
      id: 'KW-0326',
      category: 'Molecular function',
      name: 'Glycosidase',
    },
    {
      id: 'KW-0378',
      category: 'Molecular function',
      name: 'Hydrolase',
    },
    {
      id: 'KW-0479',
      category: 'Ligand',
      name: 'Metal-binding',
    },
    {
      id: 'KW-0732',
      category: 'Domain',
      name: 'Signal',
    },
  ],
  references: [
    {
      citation: {
        id: '31182795',
        citationType: 'journal article',
        authors: [
          'Rahfeld P.',
          'Sim L.',
          'Moon H.',
          'Constantinescu I.',
          'Morgan-Lang C.',
          'Hallam S.J.',
          'Kizhakkedathu J.N.',
          'Withers S.G.',
        ],
        citationCrossReferences: [
          {
            database: 'PubMed',
            id: '31182795',
          },
          {
            database: 'DOI',
            id: '10.1038/s41564-019-0469-7',
          },
        ],
        title:
          'An enzymatic pathway in the human gut microbiome that converts A to universal O type blood.',
        publicationDate: '2019',
        journal: 'Nat. Microbiol.',
        firstPage: '0',
        lastPage: '0',
        volume: '0',
      },
      referencePositions: [
        'NUCLEOTIDE SEQUENCE [GENOMIC DNA]',
        'X-RAY CRYSTALLOGRAPHY (1.30 ANGSTROMS) OF 28-509 ALONE AND IN COMPLEX WITH SUBSTRATE ANALOG',
        'FUNCTION',
        'CATALYTIC ACTIVITY',
        'REACTION MECHANISM',
        'COFACTOR',
        'ACTIVITY REGULATION',
        'BIOPHYSICOCHEMICAL PROPERTIES',
        'DOMAIN',
        'BIOTECHNOLOGY',
        'BINDS CARBOHYDRATE',
        'MUTAGENESIS OF GLU-90; CYS-125; ASP-126; HIS-278 AND TYR-341',
      ],
    },
  ],
  uniProtKBCrossReferences: [
    {
      database: 'RefSeq',
      id: 'WP_009260926.1',
      properties: [
        {
          key: 'NucleotideSequenceId',
          value: 'NZ_WKPS01000046.1',
        },
      ],
    },
    {
      database: 'PDB',
      id: '6N1A',
      properties: [
        {
          key: 'Method',
          value: 'X-ray',
        },
        {
          key: 'Resolution',
          value: '1.60 A',
        },
        {
          key: 'Chains',
          value: 'A=28-509',
        },
      ],
    },
    {
      database: 'PDB',
      id: '6N1B',
      properties: [
        {
          key: 'Method',
          value: 'X-ray',
        },
        {
          key: 'Resolution',
          value: '1.30 A',
        },
        {
          key: 'Chains',
          value: 'A=28-509',
        },
      ],
    },
    {
      database: 'PDBsum',
      id: '6N1A',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
    },
    {
      database: 'PDBsum',
      id: '6N1B',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
    },
    {
      database: 'SMR',
      id: 'P0DTR4',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
    },
    {
      database: 'GeneID',
      id: '60838703',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0016798',
      properties: [
        {
          key: 'GoTerm',
          value: 'F:hydrolase activity, acting on glycosyl bonds',
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
      id: 'GO:0047157',
      properties: [
        {
          key: 'GoTerm',
          value: 'F:myelin-proteolipid O-palmitoyltransferase activity',
        },
        {
          key: 'GoEvidenceType',
          value: 'IEA:RHEA',
        },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0008152',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:metabolic process',
        },
        {
          key: 'GoEvidenceType',
          value: 'IEA:UniProtKB-KW',
        },
      ],
    },
    {
      database: 'Gene3D',
      id: '2.115.10.20',
      properties: [
        {
          key: 'EntryName',
          value: '-',
        },
        {
          key: 'MatchStatus',
          value: '1',
        },
      ],
    },
    {
      database: 'Gene3D',
      id: '2.60.120.260',
      properties: [
        {
          key: 'EntryName',
          value: '-',
        },
        {
          key: 'MatchStatus',
          value: '2',
        },
      ],
    },
    {
      database: 'InterPro',
      id: 'IPR003343',
      properties: [
        {
          key: 'EntryName',
          value: 'Big_2',
        },
      ],
    },
    {
      database: 'InterPro',
      id: 'IPR000421',
      properties: [
        {
          key: 'EntryName',
          value: 'FA58C',
        },
      ],
    },
    {
      database: 'InterPro',
      id: 'IPR008979',
      properties: [
        {
          key: 'EntryName',
          value: 'Galactose-bd-like_sf',
        },
      ],
    },
    {
      database: 'InterPro',
      id: 'IPR023296',
      properties: [
        {
          key: 'EntryName',
          value: 'Glyco_hydro_beta-prop_sf',
        },
      ],
    },
    {
      database: 'InterPro',
      id: 'IPR008964',
      properties: [
        {
          key: 'EntryName',
          value: 'Invasin/intimin_cell_adhesion',
        },
      ],
    },
    {
      database: 'InterPro',
      id: 'IPR036278',
      properties: [
        {
          key: 'EntryName',
          value: 'Sialidase_sf',
        },
      ],
    },
    {
      database: 'Pfam',
      id: 'PF02368',
      properties: [
        {
          key: 'EntryName',
          value: 'Big_2',
        },
        {
          key: 'MatchStatus',
          value: '1',
        },
      ],
    },
    {
      database: 'Pfam',
      id: 'PF00754',
      properties: [
        {
          key: 'EntryName',
          value: 'F5_F8_type_C',
        },
        {
          key: 'MatchStatus',
          value: '1',
        },
      ],
    },
    {
      database: 'SMART',
      id: 'SM00635',
      properties: [
        {
          key: 'EntryName',
          value: 'BID_2',
        },
        {
          key: 'MatchStatus',
          value: '1',
        },
      ],
    },
    {
      database: 'SUPFAM',
      id: 'SSF49373',
      properties: [
        {
          key: 'EntryName',
          value: 'SSF49373',
        },
        {
          key: 'MatchStatus',
          value: '1',
        },
      ],
    },
    {
      database: 'SUPFAM',
      id: 'SSF49785',
      properties: [
        {
          key: 'EntryName',
          value: 'SSF49785',
        },
        {
          key: 'MatchStatus',
          value: '1',
        },
      ],
    },
    {
      database: 'SUPFAM',
      id: 'SSF50939',
      properties: [
        {
          key: 'EntryName',
          value: 'SSF50939',
        },
        {
          key: 'MatchStatus',
          value: '1',
        },
      ],
    },
    {
      database: 'SUPFAM',
      id: 'SSF75005',
      properties: [
        {
          key: 'EntryName',
          value: 'SSF75005',
        },
        {
          key: 'MatchStatus',
          value: '1',
        },
      ],
    },
    {
      database: 'PROSITE',
      id: 'PS50022',
      properties: [
        {
          key: 'EntryName',
          value: 'FA58C_3',
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
      'MRNRRKAVSLLTGLLVTAQLFPTAALAADSSESALNKAPGYQDFPAYYSDSAHADDQVTHPDVVVLEEPWNGYRYWAVYTPNVMRISIYENPSIVASSDGVHWVEPEGLSNPIEPQPPSTRYHNCDADMVYNAEYDAMMAYWNWADDQGGGVGAEVRLRISYDGVHWGVPVTYDEMTRVWSKPTSDAERQVADGEDDFITAIASPDRYDMLSPTIVYDDFRDVFILWANNTGDVGYQNGQANFVEMRYSDDGITWGEPVRVNGFLGLDENGQQLAPWHQDVQYVPDLKEFVCISQCFAGRNPDGSVLHLTTSKDGVNWEQVGTKPLLSPGPDGSWDDFQIYRSSFYYEPGSSAGDGTMRVWYSALQKDTNNKMVADSSGNLTIQAKSEDDRIWRIGYAENSFVEMMRVLLDDPGYTTPALVSGNSLMLSAETTSLPTGDVMKLETSFAPVDTSDQVVKYTSSDPDVATVDEFGTITGVSVGSARIMAETREGLSDDLEIAVVENPYTLIPQSNMTATATSVYGGTTEGPASNVLDGNVRTIWHTNYAPKDELPQSITVSFDQPYTVGRFVYTPRQNGTNGIISEYELYAIHQDGSKDLVASGSDWALDAKDKTVSFAPVEAVGLELKAIAGAGGFGTAAELNVYAYGPIEPAPVYVPVDDRDASLVFTGAWNSDSNGSFYEGTARYTNEIGASVEFTFVGTAIRWYGQNDVNFGAAEVYVDGVLAGEVNVYGPAAAQQLLFEADGLAYGKHTIRIVCVSPVVDFDYFSYVGE',
    length: 772,
    molWeight: 84441,
    crc64: '55C1AD3F8018D0D7',
    md5: '039C552B925111332BC709163762F597',
  },
  extraAttributes: {
    countByCommentType: {
      FUNCTION: 1,
      'CATALYTIC ACTIVITY': 1,
      COFACTOR: 1,
      'ACTIVITY REGULATION': 1,
      'BIOPHYSICOCHEMICAL PROPERTIES': 1,
      DOMAIN: 1,
      BIOTECHNOLOGY: 1,
      MISCELLANEOUS: 1,
      'WEB RESOURCE': 1,
    },
    countByFeatureType: {
      Signal: 1,
      Chain: 1,
      Domain: 1,
      Region: 3,
      'Metal binding': 2,
      'Binding site': 3,
      Mutagenesis: 5,
    },
    uniParcId: 'UPI000246C4A6',
  },
};

export default mock;
