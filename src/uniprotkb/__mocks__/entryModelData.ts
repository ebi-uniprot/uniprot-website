import { UniProtkbAPIModel } from '../adapters/uniProtkbConverter';

const mock: UniProtkbAPIModel = {
  entryType: 'UniProtKB reviewed (Swiss-Prot)',
  primaryAccession: 'P21802',
  secondaryAccessions: [
    'B4DFC2',
    'E7EVR6',
    'E9PCR0',
    'P18443',
    'Q01742',
    'Q12922',
    'Q14300',
    'Q14301',
    'Q14302',
    'Q14303',
    'Q14304',
    'Q14305',
    'Q14672',
    'Q14718',
    'Q14719',
    'Q1KHY5',
    'Q86YI4',
    'Q8IXC7',
    'Q96KL9',
    'Q96KM0',
    'Q96KM1',
    'Q96KM2',
    'Q9NZU2',
    'Q9NZU3',
    'Q9UD01',
    'Q9UD02',
    'Q9UIH3',
    'Q9UIH4',
    'Q9UIH5',
    'Q9UIH6',
    'Q9UIH7',
    'Q9UIH8',
    'Q9UM87',
    'Q9UMC6',
    'Q9UNS7',
    'Q9UQH7',
    'Q9UQH8',
    'Q9UQH9',
    'Q9UQI0',
  ],
  uniProtkbId: 'FGFR2_HUMAN',
  entryAudit: {
    firstPublicDate: '1991-05-01',
    lastAnnotationUpdateDate: '2021-04-07',
    lastSequenceUpdateDate: '1991-05-01',
    entryVersion: 259,
    sequenceVersion: 1,
  },
  annotationScore: 829.3,
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
      fullName: { value: 'Fibroblast growth factor receptor 2' },
      shortNames: [{ value: 'FGFR-2' }],
      ecNumbers: [
        {
          evidences: [
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '16844695' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '18056630' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '19410646' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '21454610' },
          ],
          value: '2.7.10.1',
        },
      ],
    },
    alternativeNames: [
      { fullName: { value: 'K-sam' }, shortNames: [{ value: 'KGFR' }] },
      { fullName: { value: 'Keratinocyte growth factor receptor' } },
    ],
    cdAntigenNames: [{ value: 'CD332' }],
    flag: 'Precursor',
  },
  genes: [
    {
      geneName: { value: 'FGFR2' },
      synonyms: [{ value: 'BEK' }, { value: 'KGFR' }, { value: 'KSAM' }],
    },
  ],
  comments: [
    {
      texts: [
        {
          evidences: [
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '12529371' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '15190072' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '15629145' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '16384934' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '16597617' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '17311277' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '17623664' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '18374639' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '19103595' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '19387476' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '19410646' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '21596750' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8663044' },
          ],
          value:
            'Tyrosine-protein kinase that acts as cell-surface receptor for fibroblast growth factors and plays an essential role in the regulation of cell proliferation, differentiation, migration and apoptosis, and in the regulation of embryonic development. Required for normal embryonic patterning, trophoblast function, limb bud development, lung morphogenesis, osteogenesis and skin development. Plays an essential role in the regulation of osteoblast differentiation, proliferation and apoptosis, and is required for normal skeleton development. Promotes cell proliferation in keratinocytes and immature osteoblasts, but promotes apoptosis in differentiated osteoblasts. Phosphorylates PLCG1, FRS2 and PAK4. Ligand binding leads to the activation of several signaling cascades. Activation of PLCG1 leads to the production of the cellular signaling molecules diacylglycerol and inositol 1,4,5-trisphosphate. Phosphorylation of FRS2 triggers recruitment of GRB2, GAB1, PIK3R1 and SOS1, and mediates activation of RAS, MAPK1/ERK2, MAPK3/ERK1 and the MAP kinase signaling pathway, as well as of the AKT1 signaling pathway. FGFR2 signaling is down-regulated by ubiquitination, internalization and degradation. Mutations that lead to constitutive kinase activation or impair normal FGFR2 maturation, internalization and degradation lead to aberrant signaling. Over-expressed FGFR2 promotes activation of STAT1',
        },
      ],
      commentType: 'FUNCTION',
    },
    {
      commentType: 'CATALYTIC ACTIVITY',
      reaction: {
        name:
          'ATP + L-tyrosyl-[protein] = ADP + H(+) + O-phospho-L-tyrosyl-[protein]',
        reactionCrossReferences: [
          { database: 'Rhea', id: 'RHEA:10596' },
          { database: 'Rhea', id: 'RHEA-COMP:10136' },
          { database: 'Rhea', id: 'RHEA-COMP:10137' },
          { database: 'ChEBI', id: 'CHEBI:15378' },
          { database: 'ChEBI', id: 'CHEBI:30616' },
          { database: 'ChEBI', id: 'CHEBI:46858' },
          { database: 'ChEBI', id: 'CHEBI:82620' },
          { database: 'ChEBI', id: 'CHEBI:456216' },
        ],
        ecNumber: '2.7.10.1',
        evidences: [
          {
            evidenceCode: 'ECO:0000255',
            source: 'PROSITE-ProRule',
            id: 'PRU10028',
          },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '16844695' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '18056630' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '19410646' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '21454610' },
        ],
      },
    },
    {
      texts: [
        {
          evidences: [
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '17803937' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '21454610' },
          ],
          value:
            'Present in an inactive conformation in the absence of bound ligand. Ligand binding leads to dimerization and activation by autophosphorylation on tyrosine residues. Inhibited by ARQ 523 and ARQ 069; these compounds maintain the kinase in an inactive conformation and inhibit autophosphorylation',
        },
      ],
      commentType: 'ACTIVITY REGULATION',
    },
    {
      texts: [
        {
          evidences: [
            { evidenceCode: 'ECO:0000250', source: 'UniProtKB', id: 'P21803' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10618369' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10830168' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11069186' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11390973' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '12529371' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '12591959' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '1309608' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '1400433' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '15190072' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '15629145' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '16384934' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '16597617' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '16844695' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '17623664' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '17803937' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '18056630' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '19060208' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '19103595' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '21454610' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8663044' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8961926' },
          ],
          value:
            'Monomer. Homodimer after ligand binding. Interacts predominantly with FGF1 and FGF2, but can also interact with FGF3, FGF4, FGF6, FGF7, FGF8, FGF9, FGF10, FGF17, FGF18 and FGF22 (in vitro). Ligand specificity is determined by tissue-specific expression of isoforms, and differences in the third Ig-like domain are crucial for ligand specificity. Isoform 1 has high affinity for FGF1 and FGF2, but low affinity for FGF7. Isoform 3 has high affinity for FGF1 and FGF7, and has much higher affinity for FGF7 than isoform 1 (in vitro). Affinity for fibroblast growth factors (FGFs) is increased by heparan sulfate glycosaminoglycans that function as coreceptors. Likewise, KLB increases the affinity for FGF19 and FGF21. Interacts with PLCG1, GRB2 and PAK4. Interacts with FLRT2 (By similarity)',
        },
      ],
      commentType: 'SUBUNIT',
    },
    {
      commentType: 'INTERACTION',
      interactions: [
        {
          interactantOne: {
            uniProtkbAccession: 'P21802',
            intActId: 'EBI-1028658',
          },
          interactantTwo: {
            uniProtkbAccession: 'P05230',
            geneName: 'FGF1',
            intActId: 'EBI-698068',
          },
          numberOfExperiments: 2,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtkbAccession: 'P21802',
            intActId: 'EBI-1028658',
          },
          interactantTwo: {
            uniProtkbAccession: 'P05230',
            geneName: 'FGF1',
            chainId: 'PRO_0000008908',
            intActId: 'EBI-6880860',
          },
          numberOfExperiments: 5,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtkbAccession: 'P21802',
            intActId: 'EBI-1028658',
          },
          interactantTwo: {
            uniProtkbAccession: 'O15520',
            geneName: 'FGF10',
            intActId: 'EBI-1035684',
          },
          numberOfExperiments: 2,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtkbAccession: 'P21802',
            intActId: 'EBI-1028658',
          },
          interactantTwo: {
            uniProtkbAccession: 'P09038',
            geneName: 'FGF2',
            intActId: 'EBI-977447',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtkbAccession: 'P21802',
            intActId: 'EBI-1028658',
          },
          interactantTwo: {
            uniProtkbAccession: 'P09038-2',
            geneName: 'FGF2',
            intActId: 'EBI-11122080',
          },
          numberOfExperiments: 2,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtkbAccession: 'P21802',
            intActId: 'EBI-1028658',
          },
          interactantTwo: {
            uniProtkbAccession: 'P62993',
            geneName: 'GRB2',
            intActId: 'EBI-401755',
          },
          numberOfExperiments: 5,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtkbAccession: 'P21802',
            intActId: 'EBI-1028658',
          },
          interactantTwo: {
            uniProtkbAccession: 'P03968',
            geneName: 'FGF1',
            intActId: 'EBI-6358090',
          },
          numberOfExperiments: 2,
          organismDiffer: true,
        },
        {
          interactantOne: {
            uniProtkbAccession: 'P21802-1',
            intActId: 'EBI-15489960',
          },
          interactantTwo: {
            uniProtkbAccession: 'P05230-1',
            geneName: 'FGF1',
            intActId: 'EBI-15489950',
          },
          numberOfExperiments: 2,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtkbAccession: 'P21802-1',
            intActId: 'EBI-15489960',
          },
          interactantTwo: {
            uniProtkbAccession: 'P09038',
            geneName: 'FGF2',
            intActId: 'EBI-977447',
          },
          numberOfExperiments: 2,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtkbAccession: 'P21802-1',
            intActId: 'EBI-15489960',
          },
          interactantTwo: {
            uniProtkbAccession: 'P21802-1',
            geneName: 'FGFR2',
            intActId: 'EBI-15489960',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtkbAccession: 'P21802-1',
            intActId: 'EBI-15489960',
          },
          interactantTwo: {
            uniProtkbAccession: 'P19174',
            geneName: 'PLCG1',
            intActId: 'EBI-79387',
          },
          numberOfExperiments: 9,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtkbAccession: 'P21802-3',
            intActId: 'EBI-6354683',
          },
          interactantTwo: {
            uniProtkbAccession: 'P21781',
            geneName: 'FGF7',
            intActId: 'EBI-3937699',
          },
          numberOfExperiments: 2,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtkbAccession: 'P21802-3',
            intActId: 'EBI-6354683',
          },
          interactantTwo: {
            uniProtkbAccession: 'P03968',
            geneName: 'FGF1',
            intActId: 'EBI-6358090',
          },
          numberOfExperiments: 2,
          organismDiffer: true,
        },
      ],
    },
    {
      commentType: 'SUBCELLULAR LOCATION',
      note: {
        texts: [
          {
            value:
              'Detected on osteoblast plasma membrane lipid rafts. After ligand binding, the activated receptor is rapidly internalized and degraded',
          },
        ],
      },
      subcellularLocations: [
        {
          location: { value: 'Cell membrane', id: 'SL-0039' },
          topology: {
            value: 'Single-pass type I membrane protein',
            id: 'SL-9905',
          },
        },
        { location: { value: 'Golgi apparatus', id: 'SL-0132' } },
        { location: { value: 'Cytoplasmic vesicle', id: 'SL-0088' } },
      ],
    },
    {
      commentType: 'SUBCELLULAR LOCATION',
      molecule: 'Isoform 1',
      note: {
        texts: [
          {
            value:
              'After ligand binding, the activated receptor is rapidly internalized and degraded',
          },
        ],
      },
      subcellularLocations: [
        {
          location: { value: 'Cell membrane', id: 'SL-0039' },
          topology: {
            value: 'Single-pass type I membrane protein',
            id: 'SL-9905',
          },
        },
      ],
    },
    {
      commentType: 'SUBCELLULAR LOCATION',
      molecule: 'Isoform 3',
      note: {
        texts: [
          {
            value:
              'After ligand binding, the activated receptor is rapidly internalized and degraded',
          },
        ],
      },
      subcellularLocations: [
        {
          location: { value: 'Cell membrane', id: 'SL-0039' },
          topology: {
            value: 'Single-pass type I membrane protein',
            id: 'SL-9905',
          },
        },
      ],
    },
    {
      commentType: 'SUBCELLULAR LOCATION',
      molecule: 'Isoform 8',
      subcellularLocations: [
        { location: { value: 'Secreted', id: 'SL-0243' } },
      ],
    },
    {
      commentType: 'SUBCELLULAR LOCATION',
      molecule: 'Isoform 13',
      subcellularLocations: [
        { location: { value: 'Secreted', id: 'SL-0243' } },
      ],
    },
    {
      commentType: 'ALTERNATIVE PRODUCTS',
      events: ['Alternative splicing'],
      isoforms: [
        {
          name: { value: '1' },
          synonyms: [{ value: 'BEK' }, { value: 'FGFR2IIIc' }],
          isoformIds: ['P21802-1'],
          isoformSequenceStatus: 'Displayed',
        },
        {
          name: { value: '2' },
          synonyms: [{ value: 'Short' }],
          isoformIds: ['P21802-2'],
          sequenceIds: ['VSP_002978'],
          isoformSequenceStatus: 'Described',
        },
        {
          name: { value: '3' },
          synonyms: [
            { value: 'BFR-1' },
            { value: 'FGFR2IIIb' },
            { value: 'KGFR' },
          ],
          isoformIds: ['P21802-3'],
          sequenceIds: ['VSP_002969', 'VSP_002970', 'VSP_002971', 'VSP_002972'],
          isoformSequenceStatus: 'Described',
        },
        {
          name: { value: '4' },
          synonyms: [{ value: 'K-sam' }],
          isoformIds: ['P21802-4'],
          sequenceIds: [
            'VSP_002964',
            'VSP_002969',
            'VSP_002970',
            'VSP_002971',
            'VSP_002972',
            'VSP_002975',
            'VSP_002976',
          ],
          isoformSequenceStatus: 'Described',
        },
        {
          name: { value: '5' },
          synonyms: [
            { value: 'K-sam-I' },
            { value: 'BEK' },
            { value: 'IgIIIc' },
          ],
          isoformIds: ['P21802-5'],
          sequenceIds: ['VSP_002975'],
          isoformSequenceStatus: 'Described',
        },
        {
          name: { value: '6' },
          synonyms: [{ value: 'K-sam-IIC2' }],
          isoformIds: ['P21802-6'],
          sequenceIds: ['VSP_002975', 'VSP_002984'],
          isoformSequenceStatus: 'Described',
        },
        {
          name: { value: '7' },
          synonyms: [{ value: 'K-sam-IIC3' }],
          isoformIds: ['P21802-8'],
          sequenceIds: ['VSP_002975', 'VSP_002978'],
          isoformSequenceStatus: 'Described',
        },
        {
          name: { value: '8' },
          synonyms: [{ value: 'K-sam-IV' }, { value: 'Soluble KGFR' }],
          isoformIds: ['P21802-14'],
          sequenceIds: ['VSP_002965', 'VSP_002966'],
          isoformSequenceStatus: 'Described',
        },
        {
          name: { value: '9' },
          synonyms: [{ value: 'K-sam-III' }],
          isoformIds: ['P21802-15'],
          sequenceIds: ['VSP_002968'],
          isoformSequenceStatus: 'Described',
        },
        {
          name: { value: '10' },
          synonyms: [{ value: 'TK14' }],
          isoformIds: ['P21802-16'],
          sequenceIds: ['VSP_002967', 'VSP_002975'],
          isoformSequenceStatus: 'Described',
        },
        {
          name: { value: '11' },
          isoformIds: ['P21802-17'],
          sequenceIds: [
            'VSP_002969',
            'VSP_002970',
            'VSP_002971',
            'VSP_002972',
            'VSP_002978',
          ],
          isoformSequenceStatus: 'Described',
        },
        {
          name: { value: '12' },
          synonyms: [
            { value: 'K-sam-IIC1' },
            { value: 'KGFR' },
            { value: 'IgIIIb' },
          ],
          isoformIds: ['P21802-18'],
          sequenceIds: [
            'VSP_002969',
            'VSP_002970',
            'VSP_002971',
            'VSP_002972',
            'VSP_002975',
          ],
          isoformSequenceStatus: 'Described',
        },
        {
          name: { value: '13' },
          synonyms: [{ value: 'Soluble KGFR' }],
          isoformIds: ['P21802-19'],
          sequenceIds: [
            'VSP_002969',
            'VSP_002970',
            'VSP_002971',
            'VSP_002972',
            'VSP_002973',
            'VSP_002974',
          ],
          isoformSequenceStatus: 'Described',
        },
        {
          name: { value: '14' },
          isoformIds: ['P21802-20'],
          sequenceIds: ['VSP_019608', 'VSP_019609'],
          isoformSequenceStatus: 'Described',
        },
        {
          name: { value: '15' },
          isoformIds: ['P21802-21'],
          sequenceIds: ['VSP_002964', 'VSP_041915'],
          isoformSequenceStatus: 'Described',
        },
        {
          name: { value: '16' },
          isoformIds: ['P21802-22'],
          sequenceIds: [
            'VSP_002964',
            'VSP_002969',
            'VSP_002970',
            'VSP_002971',
            'VSP_002972',
            'VSP_002978',
          ],
          isoformSequenceStatus: 'Described',
        },
        {
          name: { value: '17' },
          isoformIds: ['P21802-23'],
          sequenceIds: ['VSP_041914'],
          isoformSequenceStatus: 'Described',
        },
      ],
    },
    {
      texts: [
        {
          evidences: [
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '1309608' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '1400433' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8961926' },
          ],
          value:
            'The second and third Ig-like domains directly interact with fibroblast growth factors (FGF) and heparan sulfate proteoglycans. Alternative splicing events affecting the third Ig-like domain are crucial for ligand selectivity',
        },
      ],
      commentType: 'DOMAIN',
    },
    {
      texts: [
        {
          evidences: [
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '15629145' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '19060208' },
          ],
          value:
            'Autophosphorylated. Binding of FGF family members together with heparan sulfate proteoglycan or heparin promotes receptor dimerization and autophosphorylation on several tyrosine residues. Autophosphorylation occurs in trans between the two FGFR molecules present in the dimer. Phosphorylation at Tyr-769 is essential for interaction with PLCG1',
        },
      ],
      commentType: 'PTM',
    },
    {
      texts: [
        {
          evidences: [
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '16844695' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '17311277' },
          ],
          value:
            'N-glycosylated in the endoplasmic reticulum. The N-glycan chains undergo further maturation to an Endo H-resistant form in the Golgi apparatus',
        },
      ],
      commentType: 'PTM',
    },
    {
      texts: [
        {
          evidences: [
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '15190072' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '16844695' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '21596750' },
          ],
          value:
            'Ubiquitinated. FGFR2 is rapidly ubiquitinated after autophosphorylation, leading to internalization and degradation. Subject to degradation both in lysosomes and by the proteasome',
        },
      ],
      commentType: 'PTM',
    },
    {
      commentType: 'DISEASE',
      disease: {
        diseaseId: 'Crouzon syndrome',
        diseaseAccession: 'DI-00383',
        acronym: 'CS',
        description:
          'An autosomal dominant syndrome characterized by craniosynostosis, hypertelorism, exophthalmos and external strabismus, parrot-beaked nose, short upper lip, hypoplastic maxilla, and a relative mandibular prognathism.',
        diseaseCrossReference: { database: 'MIM', id: '123500' },
        evidences: [
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10574673' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11173845' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11380921' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11781872' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '17803937' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '7581378' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '7655462' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '7874170' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '7987400' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8528214' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8644708' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8946174' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8956050' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '9152842' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '9521581' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '9677057' },
          { evidenceCode: 'ECO:0000269', source: 'Reference', id: 'Ref.10' },
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
      commentType: 'DISEASE',
      disease: {
        diseaseId: 'Jackson-Weiss syndrome',
        diseaseAccession: 'DI-00602',
        acronym: 'JWS',
        description:
          'An autosomal dominant craniosynostosis syndrome characterized by craniofacial abnormalities and abnormality of the feet: broad great toes with medial deviation and tarsal-metatarsal coalescence.',
        diseaseCrossReference: { database: 'MIM', id: '123150' },
        evidences: [
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '7874170' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8528214' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8644708' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '9385368' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '9677057' },
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
      commentType: 'DISEASE',
      disease: {
        diseaseId: 'Apert syndrome',
        diseaseAccession: 'DI-00131',
        acronym: 'APRS',
        description:
          'A syndrome characterized by facio-cranio-synostosis, osseous and membranous syndactyly of the four extremities, and midface hypoplasia. The craniosynostosis is bicoronal and results in acrocephaly of brachysphenocephalic type. Syndactyly of the fingers and toes may be total (mitten hands and sock feet) or partial affecting the second, third, and fourth digits. Intellectual deficit is frequent and often severe, usually being associated with cerebral malformations.',
        diseaseCrossReference: { database: 'MIM', id: '101200' },
        evidences: [
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11390973' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11781872' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '15190072' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '7668257' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '7719344' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '9002682' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '9452027' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '9677057' },
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
      commentType: 'DISEASE',
      disease: {
        diseaseId: 'Pfeiffer syndrome',
        diseaseAccession: 'DI-00924',
        acronym: 'PS',
        description:
          'A syndrome characterized by the association of craniosynostosis, broad and deviated thumbs and big toes, and partial syndactyly of the fingers and toes. Three subtypes are known: mild autosomal dominant form (type 1); cloverleaf skull, elbow ankylosis, early death, sporadic (type 2); craniosynostosis, early demise, sporadic (type 3).',
        diseaseCrossReference: { database: 'MIM', id: '101600' },
        evidences: [
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10394936' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10945669' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11173845' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11781872' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '16844695' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '17803937' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '7719333' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '7719345' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8644708' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '9002682' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '9150725' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '9693549' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '9719378' },
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
      commentType: 'DISEASE',
      disease: {
        diseaseId: 'Beare-Stevenson cutis gyrata syndrome',
        diseaseAccession: 'DI-01270',
        acronym: 'BSTVS',
        description:
          'An autosomal dominant disease characterized by craniofacial anomalies, particularly craniosynostosis, and ear defects, cutis gyrata, acanthosis nigricans, anogenital anomalies, skin tags, and prominent umbilical stump. The skin furrows have a corrugated appearance and are widespread. Cutis gyrata variably affects the scalp, forehead, face, preauricular area, neck, trunk, hands, and feet.',
        diseaseCrossReference: { database: 'MIM', id: '123790' },
        evidences: [
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '12000365' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8696350' },
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
      commentType: 'DISEASE',
      disease: {
        diseaseId: 'Familial scaphocephaly syndrome',
        diseaseAccession: 'DI-00498',
        acronym: 'FSPC',
        description:
          'An autosomal dominant craniosynostosis syndrome characterized by scaphocephaly, macrocephaly, hypertelorism, maxillary retrusion, and mild intellectual disability. Scaphocephaly is the most common of the craniosynostosis conditions and is characterized by a long, narrow head. It is due to premature fusion of the sagittal suture or from external deformation.',
        diseaseCrossReference: { database: 'MIM', id: '609579' },
        evidences: [
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '16061565' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '17803937' },
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
      commentType: 'DISEASE',
      disease: {
        diseaseId: 'Lacrimo-auriculo-dento-digital syndrome',
        diseaseAccession: 'DI-00627',
        acronym: 'LADDS',
        description:
          'An autosomal dominant ectodermal dysplasia, a heterogeneous group of disorders due to abnormal development of two or more ectodermal structures. Lacrimo-auriculo-dento-digital syndrome is characterized by aplastic/hypoplastic lacrimal and salivary glands and ducts, cup-shaped ears, hearing loss, hypodontia and enamel hypoplasia, and distal limb segments anomalies. In addition to these cardinal features, facial dysmorphism, malformations of the kidney and respiratory system and abnormal genitalia have been reported. Craniosynostosis and severe syndactyly are not observed.',
        diseaseCrossReference: { database: 'MIM', id: '149730' },
        evidences: [
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '16501574' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '18056630' },
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
      commentType: 'DISEASE',
      disease: {
        diseaseId:
          'Antley-Bixler syndrome, without genital anomalies or disordered steroidogenesis',
        diseaseAccession: 'DI-00125',
        acronym: 'ABS2',
        description:
          'A rare syndrome characterized by craniosynostosis, radiohumeral synostosis present from the perinatal period, midface hypoplasia, choanal stenosis or atresia, femoral bowing and multiple joint contractures. Arachnodactyly and/or camptodactyly have also been reported.',
        diseaseCrossReference: { database: 'MIM', id: '207410' },
        evidences: [
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10633130' },
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
      commentType: 'DISEASE',
      disease: {
        diseaseId: 'Bent bone dysplasia syndrome',
        diseaseAccession: 'DI-03429',
        acronym: 'BBDS',
        description:
          'A perinatal lethal skeletal dysplasia characterized by poor mineralization of the calvarium, craniosynostosis, dysmorphic facial features, prenatal teeth, hypoplastic pubis and clavicles, osteopenia, and bent long bones. Dysmorphic facial features included low-set ears, hypertelorism, midface hypoplasia, prematurely erupted fetal teeth, and micrognathia.',
        diseaseCrossReference: { database: 'MIM', id: '614592' },
        evidences: [
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '22387015' },
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
      commentType: 'DISEASE',
      disease: {
        diseaseId: 'Saethre-Chotzen syndrome',
        diseaseAccession: 'DI-01006',
        acronym: 'SCS',
        description:
          'A craniosynostosis syndrome characterized by coronal synostosis, brachycephaly, low frontal hairline, facial asymmetry, hypertelorism, broad halluces, and clinodactyly.',
        diseaseCrossReference: { database: 'MIM', id: '101400' },
        evidences: [
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '9585583' },
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
              evidenceCode: 'ECO:0000255',
              source: 'PROSITE-ProRule',
              id: 'PRU00159',
            },
          ],
          value:
            'Belongs to the protein kinase superfamily. Tyr protein kinase family. Fibroblast growth factor receptor subfamily',
        },
      ],
      commentType: 'SIMILARITY',
    },
    {
      commentType: 'SEQUENCE CAUTION',
      sequenceCautionType: 'Miscellaneous discrepancy',
      sequence: 'BAA89296.1',
      note:
        'Contaminating sequence. Somatic variant that appeared in a cancer cell line as a result of genome instability.',
      evidences: [
        { evidenceCode: 'ECO:0000305', source: 'PubMed', id: '10626794' },
      ],
    },
    {
      commentType: 'SEQUENCE CAUTION',
      sequenceCautionType: 'Miscellaneous discrepancy',
      sequence: 'BAA89297.1',
      note:
        'Contaminating sequence. Somatic variant that appeared in a cancer cell line as a result of genome instability.',
      evidences: [
        { evidenceCode: 'ECO:0000305', source: 'PubMed', id: '10626794' },
      ],
    },
    {
      commentType: 'SEQUENCE CAUTION',
      sequenceCautionType: 'Miscellaneous discrepancy',
      sequence: 'BAA89298.1',
      note:
        'Contaminating sequence. Somatic variant that appeared in a cancer cell line as a result of genome instability.',
      evidences: [
        { evidenceCode: 'ECO:0000305', source: 'PubMed', id: '10626794' },
      ],
    },
    {
      commentType: 'SEQUENCE CAUTION',
      sequenceCautionType: 'Miscellaneous discrepancy',
      sequence: 'BAA89299.1',
      note:
        'Contaminating sequence. Somatic variant that appeared in a cancer cell line as a result of genome instability.',
      evidences: [
        { evidenceCode: 'ECO:0000305', source: 'PubMed', id: '10626794' },
      ],
    },
    {
      commentType: 'SEQUENCE CAUTION',
      sequenceCautionType: 'Miscellaneous discrepancy',
      sequence: 'BAA89300.1',
      note:
        'Contaminating sequence. Somatic variant that appeared in a cancer cell line as a result of genome instability.',
      evidences: [
        { evidenceCode: 'ECO:0000305', source: 'PubMed', id: '10626794' },
      ],
    },
    {
      commentType: 'SEQUENCE CAUTION',
      sequenceCautionType: 'Miscellaneous discrepancy',
      sequence: 'BAA89301.1',
      note:
        'Contaminating sequence. Somatic variant that appeared in a cancer cell line as a result of genome instability.',
      evidences: [
        { evidenceCode: 'ECO:0000305', source: 'PubMed', id: '10626794' },
      ],
    },
    {
      commentType: 'SEQUENCE CAUTION',
      sequenceCautionType: 'Erroneous initiation',
      sequence: 'BAG57383.1',
      note: 'Extended N-terminus.',
      evidences: [{ evidenceCode: 'ECO:0000305' }],
    },
    {
      commentType: 'WEB RESOURCE',
      resourceName:
        'Atlas of Genetics and Cytogenetics in Oncology and Haematology',
      resourceUrl:
        'http://atlasgeneticsoncology.org/Genes/FGFR2ID40570ch10q26.html',
      ftp: false,
    },
    {
      commentType: 'WEB RESOURCE',
      resourceName: 'NIEHS-SNPs',
      resourceUrl: 'http://egp.gs.washington.edu/data/fgfr2/',
      ftp: false,
    },
  ],
  features: [
    {
      type: 'Signal',
      location: {
        start: { value: 1, modifier: 'EXACT' },
        end: { value: 21, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0000255' }],
    },
    {
      type: 'Chain',
      location: {
        start: { value: 22, modifier: 'EXACT' },
        end: { value: 821, modifier: 'EXACT' },
      },
      description: 'Fibroblast growth factor receptor 2',
      featureId: 'PRO_0000016783',
    },
    {
      type: 'Topological domain',
      location: {
        start: { value: 22, modifier: 'EXACT' },
        end: { value: 377, modifier: 'EXACT' },
      },
      description: 'Extracellular',
      evidences: [{ evidenceCode: 'ECO:0000255' }],
    },
    {
      type: 'Transmembrane',
      location: {
        start: { value: 378, modifier: 'EXACT' },
        end: { value: 398, modifier: 'EXACT' },
      },
      description: 'Helical',
      evidences: [{ evidenceCode: 'ECO:0000255' }],
    },
    {
      type: 'Topological domain',
      location: {
        start: { value: 399, modifier: 'EXACT' },
        end: { value: 821, modifier: 'EXACT' },
      },
      description: 'Cytoplasmic',
      evidences: [{ evidenceCode: 'ECO:0000255' }],
    },
    {
      type: 'Domain',
      location: {
        start: { value: 25, modifier: 'EXACT' },
        end: { value: 125, modifier: 'EXACT' },
      },
      description: 'Ig-like C2-type 1',
    },
    {
      type: 'Domain',
      location: {
        start: { value: 154, modifier: 'EXACT' },
        end: { value: 247, modifier: 'EXACT' },
      },
      description: 'Ig-like C2-type 2',
    },
    {
      type: 'Domain',
      location: {
        start: { value: 256, modifier: 'EXACT' },
        end: { value: 358, modifier: 'EXACT' },
      },
      description: 'Ig-like C2-type 3',
    },
    {
      type: 'Domain',
      location: {
        start: { value: 481, modifier: 'EXACT' },
        end: { value: 770, modifier: 'EXACT' },
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
        start: { value: 487, modifier: 'EXACT' },
        end: { value: 495, modifier: 'EXACT' },
      },
      description: 'ATP',
      evidences: [
        {
          evidenceCode: 'ECO:0000255',
          source: 'PROSITE-ProRule',
          id: 'PRU00159',
        },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '19060208' },
      ],
    },
    {
      type: 'Nucleotide binding',
      location: {
        start: { value: 565, modifier: 'EXACT' },
        end: { value: 567, modifier: 'EXACT' },
      },
      description: 'ATP',
      evidences: [
        {
          evidenceCode: 'ECO:0000255',
          source: 'PROSITE-ProRule',
          id: 'PRU00159',
        },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '19060208' },
      ],
    },
    {
      type: 'Region',
      location: {
        start: { value: 161, modifier: 'EXACT' },
        end: { value: 178, modifier: 'EXACT' },
      },
      description: 'Heparin-binding',
    },
    {
      type: 'Active site',
      location: {
        start: { value: 626, modifier: 'EXACT' },
        end: { value: 626, modifier: 'EXACT' },
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
          id: 'PRU10028',
        },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '19060208' },
      ],
    },
    {
      type: 'Binding site',
      location: {
        start: { value: 517, modifier: 'EXACT' },
        end: { value: 517, modifier: 'EXACT' },
      },
      description: 'ATP',
      evidences: [
        {
          evidenceCode: 'ECO:0000255',
          source: 'PROSITE-ProRule',
          id: 'PRU00159',
        },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '19060208' },
      ],
    },
    {
      type: 'Binding site',
      location: {
        start: { value: 571, modifier: 'EXACT' },
        end: { value: 571, modifier: 'EXACT' },
      },
      description: 'ATP',
      evidences: [
        {
          evidenceCode: 'ECO:0000255',
          source: 'PROSITE-ProRule',
          id: 'PRU00159',
        },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '19060208' },
      ],
    },
    {
      type: 'Modified residue',
      location: {
        start: { value: 466, modifier: 'EXACT' },
        end: { value: 466, modifier: 'EXACT' },
      },
      description: 'Phosphotyrosine; by autocatalysis',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '19060208' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '19410646' },
      ],
    },
    {
      type: 'Modified residue',
      location: {
        start: { value: 586, modifier: 'EXACT' },
        end: { value: 586, modifier: 'EXACT' },
      },
      description: 'Phosphotyrosine; by autocatalysis',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '17803937' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '19060208' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '19410646' },
      ],
    },
    {
      type: 'Modified residue',
      location: {
        start: { value: 588, modifier: 'EXACT' },
        end: { value: 588, modifier: 'EXACT' },
      },
      description: 'Phosphotyrosine; by autocatalysis',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '19060208' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '19410646' },
      ],
    },
    {
      type: 'Modified residue',
      location: {
        start: { value: 656, modifier: 'EXACT' },
        end: { value: 656, modifier: 'EXACT' },
      },
      description: 'Phosphotyrosine; by autocatalysis',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '17803937' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '19060208' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '19410646' },
      ],
    },
    {
      type: 'Modified residue',
      location: {
        start: { value: 657, modifier: 'EXACT' },
        end: { value: 657, modifier: 'EXACT' },
      },
      description: 'Phosphotyrosine; by autocatalysis',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '17803937' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '19060208' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '19410646' },
      ],
    },
    {
      type: 'Modified residue',
      location: {
        start: { value: 769, modifier: 'EXACT' },
        end: { value: 769, modifier: 'EXACT' },
      },
      description: 'Phosphotyrosine; by autocatalysis',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '15629145' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '19060208' },
      ],
    },
    {
      type: 'Modified residue',
      location: {
        start: { value: 780, modifier: 'EXACT' },
        end: { value: 780, modifier: 'EXACT' },
      },
      description: 'Phosphoserine',
      evidences: [
        { evidenceCode: 'ECO:0007744', source: 'PubMed', id: '24275569' },
      ],
    },
    {
      type: 'Glycosylation',
      location: {
        start: { value: 83, modifier: 'EXACT' },
        end: { value: 83, modifier: 'EXACT' },
      },
      description: 'N-linked (GlcNAc...) asparagine',
      evidences: [{ evidenceCode: 'ECO:0000255' }],
      featureId: '',
    },
    {
      type: 'Glycosylation',
      location: {
        start: { value: 123, modifier: 'EXACT' },
        end: { value: 123, modifier: 'EXACT' },
      },
      description: 'N-linked (GlcNAc...) asparagine',
      evidences: [{ evidenceCode: 'ECO:0000255' }],
      featureId: '',
    },
    {
      type: 'Glycosylation',
      location: {
        start: { value: 228, modifier: 'EXACT' },
        end: { value: 228, modifier: 'EXACT' },
      },
      description: 'N-linked (GlcNAc...) asparagine',
      evidences: [{ evidenceCode: 'ECO:0000255' }],
      featureId: '',
    },
    {
      type: 'Glycosylation',
      location: {
        start: { value: 241, modifier: 'EXACT' },
        end: { value: 241, modifier: 'EXACT' },
      },
      description: 'N-linked (GlcNAc...) asparagine',
      evidences: [{ evidenceCode: 'ECO:0000255' }],
      featureId: '',
    },
    {
      type: 'Glycosylation',
      location: {
        start: { value: 265, modifier: 'EXACT' },
        end: { value: 265, modifier: 'EXACT' },
      },
      description: 'N-linked (GlcNAc...) asparagine',
      evidences: [{ evidenceCode: 'ECO:0000255' }],
      featureId: '',
    },
    {
      type: 'Glycosylation',
      location: {
        start: { value: 297, modifier: 'EXACT' },
        end: { value: 297, modifier: 'EXACT' },
      },
      description: 'N-linked (GlcNAc...) asparagine',
      evidences: [{ evidenceCode: 'ECO:0000255' }],
      featureId: '',
    },
    {
      type: 'Glycosylation',
      location: {
        start: { value: 318, modifier: 'EXACT' },
        end: { value: 318, modifier: 'EXACT' },
      },
      description: 'N-linked (GlcNAc...) asparagine',
      evidences: [{ evidenceCode: 'ECO:0000255' }],
      featureId: '',
    },
    {
      type: 'Glycosylation',
      location: {
        start: { value: 331, modifier: 'EXACT' },
        end: { value: 331, modifier: 'EXACT' },
      },
      description: 'N-linked (GlcNAc...) asparagine',
      evidences: [{ evidenceCode: 'ECO:0000255' }],
      featureId: '',
    },
    {
      type: 'Disulfide bond',
      location: {
        start: { value: 62, modifier: 'EXACT' },
        end: { value: 107, modifier: 'EXACT' },
      },
      description: '',
      evidences: [
        {
          evidenceCode: 'ECO:0000255',
          source: 'PROSITE-ProRule',
          id: 'PRU00114',
        },
      ],
    },
    {
      type: 'Disulfide bond',
      location: {
        start: { value: 179, modifier: 'EXACT' },
        end: { value: 231, modifier: 'EXACT' },
      },
      description: '',
      evidences: [
        {
          evidenceCode: 'ECO:0000255',
          source: 'PROSITE-ProRule',
          id: 'PRU00114',
        },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '16384934' },
      ],
    },
    {
      type: 'Disulfide bond',
      location: {
        start: { value: 278, modifier: 'EXACT' },
        end: { value: 342, modifier: 'EXACT' },
      },
      description: '',
      evidences: [
        {
          evidenceCode: 'ECO:0000255',
          source: 'PROSITE-ProRule',
          id: 'PRU00114',
        },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '16384934' },
      ],
    },
    {
      type: 'Alternative sequence',
      location: {
        start: { value: 37, modifier: 'EXACT' },
        end: { value: 152, modifier: 'EXACT' },
      },
      description: 'in isoform 14',
      evidences: [
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '15489334' },
      ],
      featureId: 'VSP_019608',
      alternativeSequence: {
        originalSequence:
          'EPPTKYQISQPEVYVAAPGESLEVRCLLKDAAVISWTKDGVHLGPNNRTVLIGEYLQIKGATPRDSGLYACTASRTVDSETWYFMVNVTDAISSGDDEDDTDGAEDFVSENSNNKR',
        alternativeSequences: ['G'],
      },
    },
    {
      type: 'Alternative sequence',
      location: {
        start: { value: 37, modifier: 'EXACT' },
        end: { value: 125, modifier: 'EXACT' },
      },
      description: 'in isoform 4, isoform 15 and isoform 16',
      evidences: [
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '14702039' },
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '2377625' },
      ],
      featureId: 'VSP_002964',
      alternativeSequence: {},
    },
    {
      type: 'Alternative sequence',
      location: {
        start: { value: 250, modifier: 'EXACT' },
        end: { value: 361, modifier: 'EXACT' },
      },
      description: 'in isoform 17',
      evidences: [
        { evidenceCode: 'ECO:0000303', source: 'Reference', id: 'Ref.14' },
      ],
      featureId: 'VSP_041914',
      alternativeSequence: {},
    },
    {
      type: 'Alternative sequence',
      location: {
        start: { value: 250, modifier: 'EXACT' },
        end: { value: 254, modifier: 'EXACT' },
      },
      description: 'in isoform 8',
      evidences: [
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '1313574' },
      ],
      featureId: 'VSP_002965',
      alternativeSequence: {
        originalSequence: 'ERSPH',
        alternativeSequences: ['GSQGL'],
      },
    },
    {
      type: 'Alternative sequence',
      location: {
        start: { value: 255, modifier: 'EXACT' },
        end: { value: 821, modifier: 'EXACT' },
      },
      description: 'in isoform 8',
      evidences: [
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '1313574' },
      ],
      featureId: 'VSP_002966',
      alternativeSequence: {},
    },
    {
      type: 'Alternative sequence',
      location: {
        start: { value: 313, modifier: 'EXACT' },
        end: { value: 313, modifier: 'EXACT' },
      },
      description: 'in isoform 10',
      evidences: [
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '2172978' },
      ],
      featureId: 'VSP_002967',
      alternativeSequence: {
        originalSequence: 'K',
        alternativeSequences: ['KVTK'],
      },
    },
    {
      type: 'Alternative sequence',
      location: {
        start: { value: 314, modifier: 'EXACT' },
        end: { value: 429, modifier: 'EXACT' },
      },
      description: 'in isoform 9',
      evidences: [
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '1313574' },
      ],
      featureId: 'VSP_002968',
      alternativeSequence: {},
    },
    {
      type: 'Alternative sequence',
      location: {
        start: { value: 314, modifier: 'EXACT' },
        end: { value: 330, modifier: 'EXACT' },
      },
      description:
        'in isoform 3, isoform 4, isoform 11, isoform 12, isoform 13 and isoform 16',
      evidences: [
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '10626794' },
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '1309608' },
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '1400433' },
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '1647213' },
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '2377625' },
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '7866434' },
      ],
      featureId: 'VSP_002969',
      alternativeSequence: {
        originalSequence: 'AAGVNTTDKEIEVLYIR',
        alternativeSequences: ['HSGINSSNAEVLALF'],
      },
    },
    {
      type: 'Alternative sequence',
      location: {
        start: { value: 334, modifier: 'EXACT' },
        end: { value: 335, modifier: 'EXACT' },
      },
      description:
        'in isoform 3, isoform 4, isoform 11, isoform 12, isoform 13 and isoform 16',
      evidences: [
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '10626794' },
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '1309608' },
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '1400433' },
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '1647213' },
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '2377625' },
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '7866434' },
      ],
      featureId: 'VSP_002970',
      alternativeSequence: {
        originalSequence: 'FE',
        alternativeSequences: ['EA'],
      },
    },
    {
      type: 'Alternative sequence',
      location: {
        start: { value: 341, modifier: 'EXACT' },
        end: { value: 353, modifier: 'EXACT' },
      },
      description:
        'in isoform 3, isoform 4, isoform 11, isoform 12, isoform 13 and isoform 16',
      evidences: [
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '10626794' },
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '1309608' },
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '1400433' },
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '1647213' },
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '2377625' },
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '7866434' },
      ],
      featureId: 'VSP_002971',
      alternativeSequence: {
        originalSequence: 'TCLAGNSIGISFH',
        alternativeSequences: ['ICKVSNYIGQANQ'],
      },
    },
    {
      type: 'Alternative sequence',
      location: {
        start: { value: 361, modifier: 'EXACT' },
        end: { value: 361, modifier: 'EXACT' },
      },
      description:
        'in isoform 3, isoform 4, isoform 11, isoform 12, isoform 13 and isoform 16',
      evidences: [
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '10626794' },
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '1309608' },
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '1400433' },
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '1647213' },
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '2377625' },
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '7866434' },
      ],
      featureId: 'VSP_002972',
      alternativeSequence: {
        originalSequence: 'P',
        alternativeSequences: ['PKQQ'],
      },
    },
    {
      type: 'Alternative sequence',
      location: {
        start: { value: 362, modifier: 'EXACT' },
        end: { value: 365, modifier: 'EXACT' },
      },
      description: 'in isoform 13',
      evidences: [
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '1309608' },
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '7866434' },
      ],
      featureId: 'VSP_002973',
      alternativeSequence: {
        originalSequence: 'APGR',
        alternativeSequences: ['GRRC'],
      },
    },
    {
      type: 'Alternative sequence',
      location: {
        start: { value: 366, modifier: 'EXACT' },
        end: { value: 821, modifier: 'EXACT' },
      },
      description: 'in isoform 13',
      evidences: [
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '1309608' },
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '7866434' },
      ],
      featureId: 'VSP_002974',
      alternativeSequence: {},
    },
    {
      type: 'Alternative sequence',
      location: {
        start: { value: 428, modifier: 'EXACT' },
        end: { value: 429, modifier: 'EXACT' },
      },
      description:
        'in isoform 4, isoform 5, isoform 6, isoform 7, isoform 10 and isoform 12',
      evidences: [
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '1313574' },
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '2172978' },
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '2377625' },
      ],
      featureId: 'VSP_002975',
      alternativeSequence: {},
    },
    {
      type: 'Alternative sequence',
      location: {
        start: { value: 429, modifier: 'EXACT' },
        end: { value: 430, modifier: 'EXACT' },
      },
      description: 'in isoform 14',
      evidences: [
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '15489334' },
      ],
      featureId: 'VSP_019609',
      alternativeSequence: {},
    },
    {
      type: 'Alternative sequence',
      location: {
        start: { value: 761, modifier: 'EXACT' },
        end: { value: 821, modifier: 'EXACT' },
      },
      description: 'in isoform 4',
      evidences: [
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '2377625' },
      ],
      featureId: 'VSP_002976',
      alternativeSequence: {
        originalSequence:
          'LTLTTNEEYLDLSQPLEQYSPSYPDTRSSCSSGDDSVFSPDPMPYEPCLPQYPHINGSVKT',
        alternativeSequences: ['PPNPSLMSIFRK'],
      },
    },
    {
      type: 'Alternative sequence',
      location: {
        start: { value: 768, modifier: 'EXACT' },
        end: { value: 821, modifier: 'EXACT' },
      },
      description: 'in isoform 2, isoform 7, isoform 11 and isoform 16',
      evidences: [
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '1647213' },
      ],
      featureId: 'VSP_002978',
      alternativeSequence: {
        originalSequence:
          'EYLDLSQPLEQYSPSYPDTRSSCSSGDDSVFSPDPMPYEPCLPQYPHINGSVKT',
        alternativeSequences: ['I'],
      },
    },
    {
      type: 'Alternative sequence',
      location: {
        start: { value: 769, modifier: 'EXACT' },
        end: { value: 821, modifier: 'EXACT' },
      },
      description: 'in isoform 15',
      evidences: [
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '14702039' },
      ],
      featureId: 'VSP_041915',
      alternativeSequence: {
        originalSequence:
          'YLDLSQPLEQYSPSYPDTRSSCSSGDDSVFSPDPMPYEPCLPQYPHINGSVKT',
        alternativeSequences: ['EKKVSGAVDCHKPPCNPSHLPCVLAVDQ'],
      },
    },
    {
      type: 'Alternative sequence',
      location: {
        start: { value: 778, modifier: 'EXACT' },
        end: { value: 821, modifier: 'EXACT' },
      },
      description: 'in isoform 6',
      evidences: [{ evidenceCode: 'ECO:0000305' }],
      featureId: 'VSP_002984',
      alternativeSequence: {
        originalSequence: 'QYSPSYPDTRSSCSSGDDSVFSPDPMPYEPCLPQYPHINGSVKT',
        alternativeSequences: ['PYSPCYPDPR'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 6, modifier: 'EXACT' },
        end: { value: 6, modifier: 'EXACT' },
      },
      description: 'in dbSNP:rs3750819',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'Reference', id: 'Ref.15' },
      ],
      featureId: 'VAR_017258',
      alternativeSequence: {
        originalSequence: 'R',
        alternativeSequences: ['P'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 57, modifier: 'EXACT' },
        end: { value: 57, modifier: 'EXACT' },
      },
      description: 'in dbSNP:rs56226109',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '17344846' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '26429889' },
      ],
      featureId: 'VAR_042204',
      alternativeSequence: {
        originalSequence: 'S',
        alternativeSequences: ['L'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 105, modifier: 'EXACT' },
        end: { value: 105, modifier: 'EXACT' },
      },
      description: 'in CS; dbSNP:rs1434545235',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11781872' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8946174' },
      ],
      featureId: 'VAR_004112',
      alternativeSequence: {
        originalSequence: 'Y',
        alternativeSequences: ['C'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 172, modifier: 'EXACT' },
        end: { value: 172, modifier: 'EXACT' },
      },
      description: 'in PS; requires 2 nucleotide substitutions',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11781872' },
      ],
      featureId: 'VAR_017259',
      alternativeSequence: {
        originalSequence: 'A',
        alternativeSequences: ['F'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 186, modifier: 'EXACT' },
        end: { value: 186, modifier: 'EXACT' },
      },
      description: 'in dbSNP:rs755793',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11781872' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '17344846' },
        { evidenceCode: 'ECO:0000269', source: 'Reference', id: 'Ref.15' },
      ],
      featureId: 'VAR_017260',
      alternativeSequence: {
        originalSequence: 'M',
        alternativeSequences: ['T'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 203, modifier: 'EXACT' },
        end: { value: 203, modifier: 'EXACT' },
      },
      description:
        'in breast cancer samples; infiltrating ductal carcinoma; somatic mutation',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '16959974' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '17344846' },
      ],
      featureId: 'VAR_036380',
      alternativeSequence: {
        originalSequence: 'R',
        alternativeSequences: ['C'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 252, modifier: 'EXACT' },
        end: { value: 253, modifier: 'EXACT' },
      },
      description: 'in PS; dbSNP:rs281865420',
      featureId: 'VAR_004116',
      alternativeSequence: {
        originalSequence: 'SP',
        alternativeSequences: ['FS'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 252, modifier: 'EXACT' },
        end: { value: 252, modifier: 'EXACT' },
      },
      description:
        'in APRS; requires 2 nucleotide substitutions; dbSNP:rs121918498',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '9002682' },
      ],
      featureId: 'VAR_004114',
      alternativeSequence: {
        originalSequence: 'S',
        alternativeSequences: ['F'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 252, modifier: 'EXACT' },
        end: { value: 252, modifier: 'EXACT' },
      },
      description: 'in dbSNP:rs79184941',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '9002682' },
      ],
      featureId: 'VAR_004113',
      alternativeSequence: {
        originalSequence: 'S',
        alternativeSequences: ['L'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 252, modifier: 'EXACT' },
        end: { value: 252, modifier: 'EXACT' },
      },
      description: 'in APRS and PS; common mutation; dbSNP:rs79184941',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11781872' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '15190072' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '7668257' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '7719344' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '9452027' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '9677057' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '9719378' },
      ],
      featureId: 'VAR_004115',
      alternativeSequence: {
        originalSequence: 'S',
        alternativeSequences: ['W'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 253, modifier: 'EXACT' },
        end: { value: 253, modifier: 'EXACT' },
      },
      description: 'in APRS; common mutation; dbSNP:rs77543610',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11781872' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '7668257' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '7719344' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '9452027' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '9677057' },
      ],
      featureId: 'VAR_004117',
      alternativeSequence: {
        originalSequence: 'P',
        alternativeSequences: ['R'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 263, modifier: 'EXACT' },
        end: { value: 263, modifier: 'EXACT' },
      },
      description: 'in CS; dbSNP:rs779326224',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11173845' },
      ],
      featureId: 'VAR_017261',
      alternativeSequence: {
        originalSequence: 'P',
        alternativeSequences: ['L'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 267, modifier: 'EXACT' },
        end: { value: 267, modifier: 'EXACT' },
      },
      description: 'in CS; dbSNP:rs121918505',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11781872' },
      ],
      featureId: 'VAR_004118',
      alternativeSequence: {
        originalSequence: 'S',
        alternativeSequences: ['P'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 268, modifier: 'EXACT' },
        end: { value: 268, modifier: 'EXACT' },
      },
      description: 'in CS',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8644708' },
      ],
      featureId: 'VAR_004119',
      alternativeSequence: {
        originalSequence: 'T',
        alternativeSequences: ['TG'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 269, modifier: 'EXACT' },
        end: { value: 270, modifier: 'EXACT' },
      },
      description: 'in SCS',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '9585583' },
      ],
      featureId: 'VAR_075856',
      alternativeSequence: {},
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 272, modifier: 'EXACT' },
        end: { value: 272, modifier: 'EXACT' },
      },
      description: 'in an ovarian serous carcinoma sample; somatic mutation',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '17344846' },
      ],
      featureId: 'VAR_042205',
      alternativeSequence: {
        originalSequence: 'G',
        alternativeSequences: ['V'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 273, modifier: 'EXACT' },
        end: { value: 273, modifier: 'EXACT' },
      },
      description: 'in PS; type 2; dbSNP:rs121918503',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10945669' },
      ],
      featureId: 'VAR_017262',
      alternativeSequence: {},
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 276, modifier: 'EXACT' },
        end: { value: 276, modifier: 'EXACT' },
      },
      description: 'in CS; dbSNP:rs1057519036',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11173845' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11781872' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '9521581' },
      ],
      featureId: 'VAR_004120',
      alternativeSequence: {
        originalSequence: 'F',
        alternativeSequences: ['V'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 278, modifier: 'EXACT' },
        end: { value: 278, modifier: 'EXACT' },
      },
      description:
        'in CS, JWS and PS; forms disulfide-linked dimers with constitutive kinase activity, is retained in an intracellular compartment and not detected at the cell surface; dbSNP:rs776587763',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11173845' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11781872' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '16844695' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8644708' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '9677057' },
      ],
      featureId: 'VAR_004121',
      alternativeSequence: {
        originalSequence: 'C',
        alternativeSequences: ['F'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 278, modifier: 'EXACT' },
        end: { value: 278, modifier: 'EXACT' },
      },
      description: 'in CS; dbSNP:rs776587763',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11173845' },
      ],
      featureId: 'VAR_017263',
      alternativeSequence: {
        originalSequence: 'C',
        alternativeSequences: ['Y'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 281, modifier: 'EXACT' },
        end: { value: 281, modifier: 'EXACT' },
      },
      description: 'in CS; dbSNP:rs1057519038',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11380921' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11781872' },
      ],
      featureId: 'VAR_017264',
      alternativeSequence: {
        originalSequence: 'Y',
        alternativeSequences: ['C'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 283, modifier: 'EXACT' },
        end: { value: 283, modifier: 'EXACT' },
      },
      description: 'in a lung squamous cell carcinoma sample; somatic mutation',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '17344846' },
      ],
      featureId: 'VAR_042206',
      alternativeSequence: {
        originalSequence: 'D',
        alternativeSequences: ['N'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 287, modifier: 'EXACT' },
        end: { value: 289, modifier: 'EXACT' },
      },
      description: 'in CS',
      featureId: 'VAR_004122',
      alternativeSequence: {},
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 288, modifier: 'EXACT' },
        end: { value: 288, modifier: 'EXACT' },
      },
      description: 'in CS',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11173845' },
      ],
      featureId: 'VAR_017265',
      alternativeSequence: {
        originalSequence: 'I',
        alternativeSequences: ['S'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 289, modifier: 'EXACT' },
        end: { value: 289, modifier: 'EXACT' },
      },
      description: 'in CS and JWS; dbSNP:rs121918497',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11173845' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11380921' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11781872' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '7581378' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8644708' },
      ],
      featureId: 'VAR_004123',
      alternativeSequence: {
        originalSequence: 'Q',
        alternativeSequences: ['P'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 290, modifier: 'EXACT' },
        end: { value: 290, modifier: 'EXACT' },
      },
      description:
        'in PS; severe; also in a lung squamous cell carcinoma sample; somatic mutation; dbSNP:rs121918499',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11781872' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '17344846' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '9150725' },
      ],
      featureId: 'VAR_004124',
      alternativeSequence: {
        originalSequence: 'W',
        alternativeSequences: ['C'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 290, modifier: 'EXACT' },
        end: { value: 290, modifier: 'EXACT' },
      },
      description: 'in CS; dbSNP:rs121918501',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8528214' },
      ],
      featureId: 'VAR_017266',
      alternativeSequence: {
        originalSequence: 'W',
        alternativeSequences: ['G'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 290, modifier: 'EXACT' },
        end: { value: 290, modifier: 'EXACT' },
      },
      description: 'in CS; dbSNP:rs121918501',
      featureId: 'VAR_004125',
      alternativeSequence: {
        originalSequence: 'W',
        alternativeSequences: ['R'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 292, modifier: 'EXACT' },
        end: { value: 292, modifier: 'EXACT' },
      },
      description: 'in CS; dbSNP:rs121918500',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '9152842' },
      ],
      featureId: 'VAR_004126',
      alternativeSequence: {
        originalSequence: 'K',
        alternativeSequences: ['E'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 301, modifier: 'EXACT' },
        end: { value: 301, modifier: 'EXACT' },
      },
      description: 'in CS; dbSNP:rs1554930684',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '9521581' },
      ],
      featureId: 'VAR_004127',
      alternativeSequence: {
        originalSequence: 'Y',
        alternativeSequences: ['C'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 314, modifier: 'EXACT' },
        end: { value: 314, modifier: 'EXACT' },
      },
      description: 'in craniosynostosis; dbSNP:rs1358919643',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '9521581' },
      ],
      featureId: 'VAR_004128',
      alternativeSequence: {
        originalSequence: 'A',
        alternativeSequences: ['S'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 315, modifier: 'EXACT' },
        end: { value: 315, modifier: 'EXACT' },
      },
      description:
        'in a non-syndromic craniosynostosis patient with abnormal intrauterine history; confers predisposition to craniosynostosis; dbSNP:rs121918504',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10951518' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11781872' },
      ],
      featureId: 'VAR_017267',
      alternativeSequence: {
        originalSequence: 'A',
        alternativeSequences: ['S'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 321, modifier: 'EXACT' },
        end: { value: 321, modifier: 'EXACT' },
      },
      description: 'in PS; dbSNP:rs121918510',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '7719333' },
      ],
      featureId: 'VAR_004129',
      alternativeSequence: {
        originalSequence: 'D',
        alternativeSequences: ['A'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 328, modifier: 'EXACT' },
        end: { value: 328, modifier: 'EXACT' },
      },
      description: 'in CS; dbSNP:rs121918493',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '7874170' },
      ],
      featureId: 'VAR_004130',
      alternativeSequence: {
        originalSequence: 'Y',
        alternativeSequences: ['C'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 331, modifier: 'EXACT' },
        end: { value: 331, modifier: 'EXACT' },
      },
      description: 'in CS',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8956050' },
      ],
      featureId: 'VAR_004131',
      alternativeSequence: {
        originalSequence: 'N',
        alternativeSequences: ['I'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 337, modifier: 'EXACT' },
        end: { value: 337, modifier: 'EXACT' },
      },
      description: 'in CS',
      featureId: 'VAR_004132',
      alternativeSequence: {
        originalSequence: 'A',
        alternativeSequences: ['ANA'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 337, modifier: 'EXACT' },
        end: { value: 337, modifier: 'EXACT' },
      },
      description: 'in CS; dbSNP:rs387906676',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '9677057' },
      ],
      featureId: 'VAR_017268',
      alternativeSequence: {
        originalSequence: 'A',
        alternativeSequences: ['P'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 338, modifier: 'EXACT' },
        end: { value: 338, modifier: 'EXACT' },
      },
      description: 'in CS; dbSNP:rs1057519044',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8946174' },
      ],
      featureId: 'VAR_004133',
      alternativeSequence: {
        originalSequence: 'G',
        alternativeSequences: ['E'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 338, modifier: 'EXACT' },
        end: { value: 338, modifier: 'EXACT' },
      },
      description: 'in CS; dbSNP:rs1057519043',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11781872' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '7581378' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '9677057' },
      ],
      featureId: 'VAR_015011',
      alternativeSequence: {
        originalSequence: 'G',
        alternativeSequences: ['R'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 340, modifier: 'EXACT' },
        end: { value: 340, modifier: 'EXACT' },
      },
      description: 'in PS; dbSNP:rs1554928884',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10394936' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11781872' },
      ],
      featureId: 'VAR_017269',
      alternativeSequence: {
        originalSequence: 'Y',
        alternativeSequences: ['C'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 340, modifier: 'EXACT' },
        end: { value: 340, modifier: 'EXACT' },
      },
      description: 'in CS; dbSNP:rs121918489',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11781872' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '7987400' },
      ],
      featureId: 'VAR_004134',
      alternativeSequence: {
        originalSequence: 'Y',
        alternativeSequences: ['H'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 341, modifier: 'EXACT' },
        end: { value: 341, modifier: 'EXACT' },
      },
      description: 'in PS and CS; dbSNP:rs121918495',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11173845' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11781872' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '7719345' },
      ],
      featureId: 'VAR_004135',
      alternativeSequence: {
        originalSequence: 'T',
        alternativeSequences: ['P'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 342, modifier: 'EXACT' },
        end: { value: 342, modifier: 'EXACT' },
      },
      description: 'in CS; dbSNP:rs121918487',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11781872' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8644708' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '9677057' },
      ],
      featureId: 'VAR_004136',
      alternativeSequence: {
        originalSequence: 'C',
        alternativeSequences: ['F'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 342, modifier: 'EXACT' },
        end: { value: 342, modifier: 'EXACT' },
      },
      description: 'in PS; dbSNP:rs121918488',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10394936' },
      ],
      featureId: 'VAR_017270',
      alternativeSequence: {
        originalSequence: 'C',
        alternativeSequences: ['G'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 342, modifier: 'EXACT' },
        end: { value: 342, modifier: 'EXACT' },
      },
      description: 'in CS, JWS, PS and ABS2; dbSNP:rs121918488',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10633130' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11173845' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11380921' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11781872' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '7719345' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '7987400' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8528214' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8644708' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '9677057' },
      ],
      featureId: 'VAR_004137',
      alternativeSequence: {
        originalSequence: 'C',
        alternativeSequences: ['R'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 342, modifier: 'EXACT' },
        end: { value: 342, modifier: 'EXACT' },
      },
      description: 'in CS, JWS, PS and ABS2; dbSNP:rs121918488',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10633130' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11173845' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11781872' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '7581378' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '7987400' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8644708' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '9385368' },
        { evidenceCode: 'ECO:0000269', source: 'Reference', id: 'Ref.10' },
      ],
      featureId: 'VAR_004138',
      alternativeSequence: {
        originalSequence: 'C',
        alternativeSequences: ['S'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 342, modifier: 'EXACT' },
        end: { value: 342, modifier: 'EXACT' },
      },
      description: 'in CS; dbSNP:rs121918496',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11173845' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11781872' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8528214' },
      ],
      featureId: 'VAR_017271',
      alternativeSequence: {
        originalSequence: 'C',
        alternativeSequences: ['W'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 342, modifier: 'EXACT' },
        end: { value: 342, modifier: 'EXACT' },
      },
      description: 'in CS and PS; dbSNP:rs121918487',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11173845' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11380921' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11781872' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '7581378' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '7719345' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '7987400' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8644708' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '9677057' },
      ],
      featureId: 'VAR_004139',
      alternativeSequence: {
        originalSequence: 'C',
        alternativeSequences: ['Y'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 344, modifier: 'EXACT' },
        end: { value: 344, modifier: 'EXACT' },
      },
      description: 'in CS and JWS; dbSNP:rs121918492',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '7581378' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '7874170' },
      ],
      featureId: 'VAR_004140',
      alternativeSequence: {
        originalSequence: 'A',
        alternativeSequences: ['G'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 344, modifier: 'EXACT' },
        end: { value: 344, modifier: 'EXACT' },
      },
      description: 'in CS and PS',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8644708' },
      ],
      featureId: 'VAR_004141',
      alternativeSequence: {
        originalSequence: 'A',
        alternativeSequences: ['P'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 347, modifier: 'EXACT' },
        end: { value: 347, modifier: 'EXACT' },
      },
      description: 'in CS; dbSNP:rs121918494',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11781872' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '7874170' },
      ],
      featureId: 'VAR_004142',
      alternativeSequence: {
        originalSequence: 'S',
        alternativeSequences: ['C'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 351, modifier: 'EXACT' },
        end: { value: 351, modifier: 'EXACT' },
      },
      description: 'in CS, PS and ABS2; dbSNP:rs121918502',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10633130' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8946174' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '9693549' },
      ],
      featureId: 'VAR_004143',
      alternativeSequence: {
        originalSequence: 'S',
        alternativeSequences: ['C'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 354, modifier: 'EXACT' },
        end: { value: 354, modifier: 'EXACT' },
      },
      description: 'in CS; dbSNP:rs121918490',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11173845' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11781872' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '7581378' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '7987400' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8528214' },
      ],
      featureId: 'VAR_004144',
      alternativeSequence: {
        originalSequence: 'S',
        alternativeSequences: ['C'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 354, modifier: 'EXACT' },
        end: { value: 354, modifier: 'EXACT' },
      },
      description: 'in CS',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11173845' },
      ],
      featureId: 'VAR_017272',
      alternativeSequence: {
        originalSequence: 'S',
        alternativeSequences: ['Y'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 356, modifier: 'EXACT' },
        end: { value: 358, modifier: 'EXACT' },
      },
      description: 'in CS',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8956050' },
      ],
      featureId: 'VAR_004145',
      alternativeSequence: {},
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 359, modifier: 'EXACT' },
        end: { value: 359, modifier: 'EXACT' },
      },
      description: 'in CS and PS',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11173845' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8644708' },
      ],
      featureId: 'VAR_004146',
      alternativeSequence: {
        originalSequence: 'V',
        alternativeSequences: ['F'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 362, modifier: 'EXACT' },
        end: { value: 362, modifier: 'EXACT' },
      },
      description: 'in CS',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10574673' },
      ],
      featureId: 'VAR_017273',
      alternativeSequence: {
        originalSequence: 'A',
        alternativeSequences: ['S'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 372, modifier: 'EXACT' },
        end: { value: 372, modifier: 'EXACT' },
      },
      description: 'in BSTVS; dbSNP:rs121913477',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8696350' },
      ],
      featureId: 'VAR_017274',
      alternativeSequence: {
        originalSequence: 'S',
        alternativeSequences: ['C'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 375, modifier: 'EXACT' },
        end: { value: 375, modifier: 'EXACT' },
      },
      description: 'in PS and BSTVS; dbSNP:rs121913478',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11781872' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '12000365' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8696350' },
      ],
      featureId: 'VAR_017275',
      alternativeSequence: {
        originalSequence: 'Y',
        alternativeSequences: ['C'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 381, modifier: 'EXACT' },
        end: { value: 381, modifier: 'EXACT' },
      },
      description: 'in BBDS; dbSNP:rs387906678',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '22387015' },
      ],
      featureId: 'VAR_067977',
      alternativeSequence: {
        originalSequence: 'Y',
        alternativeSequences: ['D'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 384, modifier: 'EXACT' },
        end: { value: 384, modifier: 'EXACT' },
      },
      description: 'in CS; dbSNP:rs1554927408',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8946174' },
      ],
      featureId: 'VAR_004147',
      alternativeSequence: {
        originalSequence: 'G',
        alternativeSequences: ['R'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 391, modifier: 'EXACT' },
        end: { value: 391, modifier: 'EXACT' },
      },
      description:
        "in BBDS; the mutation selectively reduces plasma-membrane levels of the protein and markedly diminishes the receptor's responsiveness to extracellular FGF; dbSNP:rs387906677",
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '22387015' },
      ],
      featureId: 'VAR_067978',
      alternativeSequence: {
        originalSequence: 'M',
        alternativeSequences: ['R'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 526, modifier: 'EXACT' },
        end: { value: 526, modifier: 'EXACT' },
      },
      description: 'in FSPC; constitutive kinase activity; dbSNP:rs121918507',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '16061565' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '17803937' },
      ],
      featureId: 'VAR_023788',
      alternativeSequence: {
        originalSequence: 'K',
        alternativeSequences: ['E'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 549, modifier: 'EXACT' },
        end: { value: 549, modifier: 'EXACT' },
      },
      description: 'in CS; constitutive kinase activity; dbSNP:rs1057519045',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11781872' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '17803937' },
      ],
      featureId: 'VAR_017276',
      alternativeSequence: {
        originalSequence: 'N',
        alternativeSequences: ['H'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 565, modifier: 'EXACT' },
        end: { value: 565, modifier: 'EXACT' },
      },
      description: 'in PS; constitutive kinase activity; dbSNP:rs121918506',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11781872' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '17803937' },
      ],
      featureId: 'VAR_017277',
      alternativeSequence: {
        originalSequence: 'E',
        alternativeSequences: ['G'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 612, modifier: 'EXACT' },
        end: { value: 612, modifier: 'EXACT' },
      },
      description: 'in a lung adenocarcinoma sample; somatic mutation',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '17344846' },
      ],
      featureId: 'VAR_046071',
      alternativeSequence: {
        originalSequence: 'R',
        alternativeSequences: ['T'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 613, modifier: 'EXACT' },
        end: { value: 613, modifier: 'EXACT' },
      },
      description: '',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10626794' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '1309608' },
      ],
      featureId: 'VAR_015012',
      alternativeSequence: {
        originalSequence: 'G',
        alternativeSequences: ['R'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 628, modifier: 'EXACT' },
        end: { value: 628, modifier: 'EXACT' },
      },
      description:
        'in LADDS; strongly reduced kinase activity; dbSNP:rs121918509',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '16501574' },
      ],
      featureId: 'VAR_029884',
      alternativeSequence: {
        originalSequence: 'A',
        alternativeSequences: ['T'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 641, modifier: 'EXACT' },
        end: { value: 641, modifier: 'EXACT' },
      },
      description: 'in PS; constitutive kinase activity; dbSNP:rs1057519047',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11781872' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '17803937' },
      ],
      featureId: 'VAR_017278',
      alternativeSequence: {
        originalSequence: 'K',
        alternativeSequences: ['R'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 648, modifier: 'EXACT' },
        end: { value: 648, modifier: 'EXACT' },
      },
      description: 'in LADDS; dbSNP:rs121918508',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '16501574' },
      ],
      featureId: 'VAR_029885',
      alternativeSequence: {
        originalSequence: 'A',
        alternativeSequences: ['T'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 649, modifier: 'EXACT' },
        end: { value: 650, modifier: 'EXACT' },
      },
      description: 'in LADDS',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '16501574' },
      ],
      featureId: 'VAR_029886',
      alternativeSequence: {
        originalSequence: 'RD',
        alternativeSequences: ['S'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 659, modifier: 'EXACT' },
        end: { value: 659, modifier: 'EXACT' },
      },
      description: 'in craniosynostosis; constitutive kinase activity',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11781872' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '17803937' },
      ],
      featureId: 'VAR_017279',
      alternativeSequence: {
        originalSequence: 'K',
        alternativeSequences: ['N'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 663, modifier: 'EXACT' },
        end: { value: 663, modifier: 'EXACT' },
      },
      description: 'in PS',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11781872' },
      ],
      featureId: 'VAR_017280',
      alternativeSequence: {
        originalSequence: 'G',
        alternativeSequences: ['E'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 678, modifier: 'EXACT' },
        end: { value: 678, modifier: 'EXACT' },
      },
      description: 'in CS',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11781872' },
      ],
      featureId: 'VAR_017281',
      alternativeSequence: {
        originalSequence: 'R',
        alternativeSequences: ['G'],
      },
    },
    {
      type: 'Mutagenesis',
      location: {
        start: { value: 265, modifier: 'EXACT' },
        end: { value: 265, modifier: 'EXACT' },
      },
      description:
        'Reduced N-glycosylation. Reduced expression at the cell surface.',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '16844695' },
      ],
      alternativeSequence: {
        originalSequence: 'N',
        alternativeSequences: ['Q'],
      },
    },
    {
      type: 'Mutagenesis',
      location: {
        start: { value: 549, modifier: 'EXACT' },
        end: { value: 549, modifier: 'EXACT' },
      },
      description: 'Constitutive kinase activity.',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '17803937' },
      ],
      alternativeSequence: {
        originalSequence: 'N',
        alternativeSequences: ['T'],
      },
    },
    {
      type: 'Mutagenesis',
      location: {
        start: { value: 565, modifier: 'EXACT' },
        end: { value: 565, modifier: 'EXACT' },
      },
      description: 'Constitutive kinase activity.',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '17803937' },
      ],
      alternativeSequence: {
        originalSequence: 'E',
        alternativeSequences: ['A'],
      },
    },
    {
      type: 'Mutagenesis',
      location: {
        start: { value: 656, modifier: 'EXACT' },
        end: { value: 657, modifier: 'EXACT' },
      },
      description: 'Loss of kinase activity.',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '16844695' },
      ],
      alternativeSequence: {},
    },
    {
      type: 'Mutagenesis',
      location: {
        start: { value: 769, modifier: 'EXACT' },
        end: { value: 769, modifier: 'EXACT' },
      },
      description:
        'Increases fibroblast proliferation. Decreases phosphorylation of PLCG1 and FRS2. Decreases activation of MAP kinases.',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '15629145' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '19103595' },
      ],
      alternativeSequence: {
        originalSequence: 'Y',
        alternativeSequences: ['F'],
      },
    },
    {
      type: 'Sequence conflict',
      location: {
        start: { value: 246, modifier: 'EXACT' },
        end: { value: 246, modifier: 'EXACT' },
      },
      description: 'in Ref. 16; BAG57383',
      evidences: [{ evidenceCode: 'ECO:0000305' }],
      alternativeSequence: {
        originalSequence: 'L',
        alternativeSequences: ['P'],
      },
    },
    {
      type: 'Sequence conflict',
      location: {
        start: { value: 310, modifier: 'EXACT' },
        end: { value: 310, modifier: 'EXACT' },
      },
      description: 'in Ref. 16; BAG57383',
      evidences: [{ evidenceCode: 'ECO:0000305' }],
      alternativeSequence: {
        originalSequence: 'K',
        alternativeSequences: ['N'],
      },
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 152, modifier: 'EXACT' },
        end: { value: 157, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '3CAF' }],
    },
    {
      type: 'Turn',
      location: {
        start: { value: 159, modifier: 'EXACT' },
        end: { value: 162, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '3CAF' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 166, modifier: 'EXACT' },
        end: { value: 170, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '3CAF' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 175, modifier: 'EXACT' },
        end: { value: 178, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '3CAF' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 181, modifier: 'EXACT' },
        end: { value: 185, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '3CAF' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 188, modifier: 'EXACT' },
        end: { value: 193, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '3CAF' }],
    },
    {
      type: 'Helix',
      location: {
        start: { value: 200, modifier: 'EXACT' },
        end: { value: 202, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '3CAF' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 203, modifier: 'EXACT' },
        end: { value: 205, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '4WV1' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 208, modifier: 'EXACT' },
        end: { value: 210, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '3CAF' }],
    },
    {
      type: 'Helix',
      location: {
        start: { value: 211, modifier: 'EXACT' },
        end: { value: 213, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '3CAF' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 215, modifier: 'EXACT' },
        end: { value: 218, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '3CAF' }],
    },
    {
      type: 'Helix',
      location: {
        start: { value: 223, modifier: 'EXACT' },
        end: { value: 225, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '3CAF' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 227, modifier: 'EXACT' },
        end: { value: 235, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '3CAF' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 238, modifier: 'EXACT' },
        end: { value: 249, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '3CAF' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 266, modifier: 'EXACT' },
        end: { value: 269, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '3OJM' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 274, modifier: 'EXACT' },
        end: { value: 277, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '3OJM' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 287, modifier: 'EXACT' },
        end: { value: 293, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '3OJM' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 296, modifier: 'EXACT' },
        end: { value: 298, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '3OJ2' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 299, modifier: 'EXACT' },
        end: { value: 301, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '3OJM' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 303, modifier: 'EXACT' },
        end: { value: 305, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '1IIL' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 309, modifier: 'EXACT' },
        end: { value: 314, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '3OJM' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 315, modifier: 'EXACT' },
        end: { value: 319, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '2FDB' }],
    },
    {
      type: 'Helix',
      location: {
        start: { value: 321, modifier: 'EXACT' },
        end: { value: 323, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '1IIL' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 324, modifier: 'EXACT' },
        end: { value: 327, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '3OJM' }],
    },
    {
      type: 'Helix',
      location: {
        start: { value: 334, modifier: 'EXACT' },
        end: { value: 336, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '3OJM' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 338, modifier: 'EXACT' },
        end: { value: 346, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '3OJM' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 349, modifier: 'EXACT' },
        end: { value: 360, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '3OJM' }],
    },
    {
      type: 'Turn',
      location: {
        start: { value: 463, modifier: 'EXACT' },
        end: { value: 465, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '5UI0' }],
    },
    {
      type: 'Turn',
      location: {
        start: { value: 472, modifier: 'EXACT' },
        end: { value: 474, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '2PVF' }],
    },
    {
      type: 'Helix',
      location: {
        start: { value: 478, modifier: 'EXACT' },
        end: { value: 480, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '2PVF' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 481, modifier: 'EXACT' },
        end: { value: 489, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '2PVF' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 494, modifier: 'EXACT' },
        end: { value: 500, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '2PVF' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 504, modifier: 'EXACT' },
        end: { value: 506, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '3CLY' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 513, modifier: 'EXACT' },
        end: { value: 518, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '2PVF' }],
    },
    {
      type: 'Helix',
      location: {
        start: { value: 525, modifier: 'EXACT' },
        end: { value: 541, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '2PVF' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 550, modifier: 'EXACT' },
        end: { value: 554, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '2PVF' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 556, modifier: 'EXACT' },
        end: { value: 558, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '2PVF' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 561, modifier: 'EXACT' },
        end: { value: 565, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '2PVF' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 568, modifier: 'EXACT' },
        end: { value: 571, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '1OEC' }],
    },
    {
      type: 'Helix',
      location: {
        start: { value: 572, modifier: 'EXACT' },
        end: { value: 577, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '2PVF' }],
    },
    {
      type: 'Turn',
      location: {
        start: { value: 585, modifier: 'EXACT' },
        end: { value: 588, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '4J99' }],
    },
    {
      type: 'Helix',
      location: {
        start: { value: 594, modifier: 'EXACT' },
        end: { value: 596, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '5UI0' }],
    },
    {
      type: 'Helix',
      location: {
        start: { value: 600, modifier: 'EXACT' },
        end: { value: 619, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '2PVF' }],
    },
    {
      type: 'Helix',
      location: {
        start: { value: 629, modifier: 'EXACT' },
        end: { value: 631, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '2PVF' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 632, modifier: 'EXACT' },
        end: { value: 634, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '2PVF' }],
    },
    {
      type: 'Turn',
      location: {
        start: { value: 636, modifier: 'EXACT' },
        end: { value: 638, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '2PVY' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 640, modifier: 'EXACT' },
        end: { value: 642, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '2PVF' }],
    },
    {
      type: 'Helix',
      location: {
        start: { value: 645, modifier: 'EXACT' },
        end: { value: 647, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '5UGL' }],
    },
    {
      type: 'Turn',
      location: {
        start: { value: 652, modifier: 'EXACT' },
        end: { value: 654, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '2PVF' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 655, modifier: 'EXACT' },
        end: { value: 658, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '2PVF' }],
    },
    {
      type: 'Turn',
      location: {
        start: { value: 659, modifier: 'EXACT' },
        end: { value: 662, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '2PZR' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 664, modifier: 'EXACT' },
        end: { value: 666, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '5UI0' }],
    },
    {
      type: 'Helix',
      location: {
        start: { value: 667, modifier: 'EXACT' },
        end: { value: 669, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '2PVF' }],
    },
    {
      type: 'Helix',
      location: {
        start: { value: 672, modifier: 'EXACT' },
        end: { value: 677, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '2PVF' }],
    },
    {
      type: 'Helix',
      location: {
        start: { value: 682, modifier: 'EXACT' },
        end: { value: 697, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '2PVF' }],
    },
    {
      type: 'Helix',
      location: {
        start: { value: 709, modifier: 'EXACT' },
        end: { value: 718, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '2PVF' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 726, modifier: 'EXACT' },
        end: { value: 728, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '2PZ5' }],
    },
    {
      type: 'Helix',
      location: {
        start: { value: 730, modifier: 'EXACT' },
        end: { value: 739, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '2PVF' }],
    },
    {
      type: 'Helix',
      location: {
        start: { value: 744, modifier: 'EXACT' },
        end: { value: 746, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '2PVF' }],
    },
    {
      type: 'Helix',
      location: {
        start: { value: 750, modifier: 'EXACT' },
        end: { value: 764, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '2PVF' }],
    },
    {
      type: 'Sequence conflict',
      location: {
        start: { value: 315, modifier: 'EXACT' },
        end: { value: 315, modifier: 'EXACT' },
        sequence: 'P21802-16',
      },
      description: 'in Ref. 2; AAA61188',
      evidences: [{ evidenceCode: 'ECO:0000305' }],
      alternativeSequence: {
        originalSequence: 'T',
        alternativeSequences: ['L'],
      },
    },
  ],
  keywords: [
    { id: 'KW-0002', category: 'Technical term', name: '3D-structure' },
    {
      id: 'KW-0025',
      category: 'Coding sequence diversity',
      name: 'Alternative splicing',
    },
    { id: 'KW-0053', category: 'Biological process', name: 'Apoptosis' },
    { id: 'KW-0067', category: 'Ligand', name: 'ATP-binding' },
    { id: 'KW-1003', category: 'Cellular component', name: 'Cell membrane' },
    { id: 'KW-0989', category: 'Disease', name: 'Craniosynostosis' },
    {
      id: 'KW-0968',
      category: 'Cellular component',
      name: 'Cytoplasmic vesicle',
    },
    { id: 'KW-0225', category: 'Disease', name: 'Disease variant' },
    { id: 'KW-1015', category: 'PTM', name: 'Disulfide bond' },
    { id: 'KW-0038', category: 'Disease', name: 'Ectodermal dysplasia' },
    { id: 'KW-0325', category: 'PTM', name: 'Glycoprotein' },
    { id: 'KW-0333', category: 'Cellular component', name: 'Golgi apparatus' },
    { id: 'KW-0358', category: 'Molecular function', name: 'Heparin-binding' },
    { id: 'KW-0393', category: 'Domain', name: 'Immunoglobulin domain' },
    { id: 'KW-0418', category: 'Molecular function', name: 'Kinase' },
    {
      id: 'KW-0953',
      category: 'Disease',
      name: 'Lacrimo-auriculo-dento-digital syndrome',
    },
    { id: 'KW-0472', category: 'Cellular component', name: 'Membrane' },
    { id: 'KW-0991', category: 'Disease', name: 'Mental retardation' },
    { id: 'KW-0547', category: 'Ligand', name: 'Nucleotide-binding' },
    { id: 'KW-0597', category: 'PTM', name: 'Phosphoprotein' },
    { id: 'KW-0656', category: 'Disease', name: 'Proto-oncogene' },
    { id: 'KW-0675', category: 'Molecular function', name: 'Receptor' },
    { id: 'KW-1185', category: 'Technical term', name: 'Reference proteome' },
    { id: 'KW-0677', category: 'Domain', name: 'Repeat' },
    { id: 'KW-0964', category: 'Cellular component', name: 'Secreted' },
    { id: 'KW-0732', category: 'Domain', name: 'Signal' },
    { id: 'KW-0808', category: 'Molecular function', name: 'Transferase' },
    { id: 'KW-0812', category: 'Domain', name: 'Transmembrane' },
    { id: 'KW-1133', category: 'Domain', name: 'Transmembrane helix' },
    {
      id: 'KW-0829',
      category: 'Molecular function',
      name: 'Tyrosine-protein kinase',
    },
    { id: 'KW-0832', category: 'PTM', name: 'Ubl conjugation' },
  ],
  references: [
    {
      citation: {
        id: '1697263',
        citationType: 'journal article',
        authors: [
          'Dionne C.A.',
          'Crumley G.R.',
          'Bellot F.',
          'Kaplow J.M.',
          'Searfoss G.',
          'Ruta M.',
          'Burgess W.H.',
          'Jaye M.',
          'Schlessinger J.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '1697263' },
          { database: 'DOI', id: '10.1002/j.1460-2075.1990.tb07454.x' },
        ],
        title:
          'Cloning and expression of two distinct high-affinity receptors cross-reacting with acidic and basic fibroblast growth factors.',
        publicationDate: '1990',
        journal: 'EMBO J.',
        firstPage: '2685',
        lastPage: '2692',
        volume: '9',
      },
      referencePositions: ['NUCLEOTIDE SEQUENCE [MRNA] (ISOFORM 1)'],
      referenceComments: [{ value: 'Neonatal brain stem', type: 'TISSUE' }],
    },
    {
      citation: {
        id: '2172978',
        citationType: 'journal article',
        authors: [
          'Houssaint E.',
          'Blanquet P.R.',
          'Champion-Arnaud P.',
          'Gesnel M.-C.',
          'Torriglia A.',
          'Courtois Y.',
          'Breathnach R.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '2172978' },
          { database: 'DOI', id: '10.1073/pnas.87.20.8180' },
        ],
        title:
          'Related fibroblast growth factor receptor genes exist in the human genome.',
        publicationDate: '1990',
        journal: 'Proc. Natl. Acad. Sci. U.S.A.',
        firstPage: '8180',
        lastPage: '8184',
        volume: '87',
      },
      referencePositions: ['NUCLEOTIDE SEQUENCE [MRNA] (ISOFORM 10)'],
    },
    {
      citation: {
        id: '1647213',
        citationType: 'journal article',
        authors: [
          'Seno M.',
          'Sasada R.',
          'Watanabe T.',
          'Ishimaru K.',
          'Igarashi K.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '1647213' },
          { database: 'DOI', id: '10.1016/0167-4781(91)90015-e' },
        ],
        title: 'Two cDNAs encoding novel human FGF receptor.',
        publicationDate: '1991',
        journal: 'Biochim. Biophys. Acta',
        firstPage: '244',
        lastPage: '246',
        volume: '1089',
      },
      referencePositions: ['NUCLEOTIDE SEQUENCE [MRNA] (ISOFORM 11)'],
    },
    {
      citation: {
        id: '2377625',
        citationType: 'journal article',
        authors: [
          'Hattori Y.',
          'Odagiri H.',
          'Nakatani H.',
          'Miyagawa K.',
          'Naito K.',
          'Sakamoto H.',
          'Katoh O.',
          'Yoshida T.',
          'Sugimura T.',
          'Terada M.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '2377625' },
          { database: 'DOI', id: '10.1073/pnas.87.15.5983' },
        ],
        title:
          'K-sam, an amplified gene in stomach cancer, is a member of the heparin-binding growth factor receptor genes.',
        publicationDate: '1990',
        journal: 'Proc. Natl. Acad. Sci. U.S.A.',
        firstPage: '5983',
        lastPage: '5987',
        volume: '87',
      },
      referencePositions: ['NUCLEOTIDE SEQUENCE [MRNA] (ISOFORM 4)'],
      referenceComments: [{ value: 'Stomach cancer', type: 'TISSUE' }],
    },
    {
      citation: {
        id: '1313574',
        citationType: 'journal article',
        authors: [
          'Katoh M.',
          'Hattori Y.',
          'Sasaki H.',
          'Tanaka M.',
          'Sugano K.',
          'Yazaki Y.',
          'Sugimura T.',
          'Terada M.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '1313574' },
          { database: 'DOI', id: '10.1073/pnas.89.7.2960' },
        ],
        title:
          'K-sam gene encodes secreted as well as transmembrane receptor tyrosine kinase.',
        publicationDate: '1992',
        journal: 'Proc. Natl. Acad. Sci. U.S.A.',
        firstPage: '2960',
        lastPage: '2964',
        volume: '89',
      },
      referencePositions: [
        'NUCLEOTIDE SEQUENCE [MRNA] (ISOFORMS 5; 8; 9 AND 16)',
      ],
    },
    {
      citation: {
        id: '1400433',
        citationType: 'journal article',
        authors: ['Dell K.R.', 'Williams L.T.'],
        citationCrossReferences: [{ database: 'PubMed', id: '1400433' }],
        title:
          'A novel form of fibroblast growth factor receptor 2. Alternative splicing of the third immunoglobulin-like domain confers ligand binding specificity.',
        publicationDate: '1992',
        journal: 'J. Biol. Chem.',
        firstPage: '21225',
        lastPage: '21229',
        volume: '267',
      },
      referencePositions: [
        'NUCLEOTIDE SEQUENCE [MRNA] (ISOFORMS 3 AND 16)',
        'DOMAIN',
        'SUBUNIT',
      ],
      referenceComments: [{ value: 'Placenta', type: 'TISSUE' }],
    },
    {
      citation: {
        id: '1309608',
        citationType: 'journal article',
        authors: [
          'Miki T.',
          'Bottaro D.P.',
          'Fleming T.P.',
          'Smith C.L.',
          'Burgess W.H.',
          'Chan A.M.-L.',
          'Aaronson S.A.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '1309608' },
          { database: 'DOI', id: '10.1073/pnas.89.1.246' },
        ],
        title:
          'Determination of ligand-binding specificity by alternative splicing: two distinct growth factor receptors encoded by a single gene.',
        publicationDate: '1992',
        journal: 'Proc. Natl. Acad. Sci. U.S.A.',
        firstPage: '246',
        lastPage: '250',
        volume: '89',
      },
      referencePositions: [
        'NUCLEOTIDE SEQUENCE [MRNA] (ISOFORMS 3; 13 AND 16)',
        'SUBUNIT',
        'DOMAIN',
        'VARIANT ARG-613',
      ],
      referenceComments: [{ value: 'Mammary gland', type: 'TISSUE' }],
    },
    {
      citation: {
        id: '7866434',
        citationType: 'journal article',
        authors: [
          'Wilson S.E.',
          'Weng J.',
          'Chwang E.L.',
          'Gollahon L.',
          'Leitch A.M.',
          'Shay J.W.',
        ],
        citationCrossReferences: [{ database: 'PubMed', id: '7866434' }],
        title:
          'Hepatocyte growth factor (HGF), keratinocyte growth factor (KGF), and their receptors in human breast cells and tissues: alternative receptors.',
        publicationDate: '1994',
        journal: 'Cell. Mol. Biol. Res.',
        firstPage: '337',
        lastPage: '350',
        volume: '40',
      },
      referencePositions: ['NUCLEOTIDE SEQUENCE [MRNA] (ISOFORM 13)'],
      referenceComments: [
        { value: 'Cornea', type: 'TISSUE' },
        { value: 'Mammary gland', type: 'TISSUE' },
      ],
    },
    {
      citation: {
        id: 'CI-6EPRJ6MFFS5LC',
        citationType: 'journal article',
        authors: [
          'Wilson S.E.',
          'Weng J.',
          'Chwang E.L.',
          'Gollahon L.',
          'Leitch A.M.',
          'Shay J.W.',
        ],
        publicationDate: '1994',
        journal: 'Cell. Mol. Biol. Res.',
        firstPage: '707',
        lastPage: '707',
        volume: '40',
      },
      referencePositions: ['ERRATUM OF PUBMED:7866434'],
    },
    {
      citation: {
        id: 'CI-5QVV4M6LRJTB',
        citationType: 'submission',
        authors: ['Steinberger D.', 'Mueller U.'],
        publicationDate: 'APR-1996',
        submissionDatabase: 'EMBL/GenBank/DDBJ databases',
      },
      referencePositions: [
        'NUCLEOTIDE SEQUENCE [MRNA] (ISOFORM 1)',
        'VARIANT CS SER-342',
      ],
      referenceComments: [{ value: 'Blood', type: 'TISSUE' }],
    },
    {
      citation: {
        id: '10626794',
        citationType: 'journal article',
        authors: [
          'Ueda T.',
          'Sasaki H.',
          'Kuwahara Y.',
          'Nezu M.',
          'Shibuya T.',
          'Sakamoto H.',
          'Ishii H.',
          'Yanagihara K.',
          'Mafune K.',
          'Makuuchi M.',
          'Terada M.',
        ],
        citationCrossReferences: [{ database: 'PubMed', id: '10626794' }],
        title:
          'Deletion of the carboxyl-terminal exons of K-sam/FGFR2 by short homology-mediated recombination, generating preferential expression of specific messenger RNAs.',
        publicationDate: '1999',
        journal: 'Cancer Res.',
        firstPage: '6080',
        lastPage: '6086',
        volume: '59',
      },
      referencePositions: ['NUCLEOTIDE SEQUENCE [MRNA]', 'VARIANT ARG-613'],
    },
    {
      citation: {
        id: '11856867',
        citationType: 'journal article',
        authors: [
          'Ingersoll R.G.',
          'Paznekas W.A.',
          'Tran A.K.',
          'Scott A.F.',
          'Jiang G.',
          'Jabs E.W.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '11856867' },
          { database: 'DOI', id: '10.1159/000048802' },
        ],
        title:
          'Fibroblast growth factor receptor 2 (FGFR2): genomic sequence and variations.',
        publicationDate: '2001',
        journal: 'Cytogenet. Cell Genet.',
        firstPage: '121',
        lastPage: '126',
        volume: '94',
      },
      referencePositions: [
        'NUCLEOTIDE SEQUENCE [GENOMIC DNA] (ISOFORMS 5; 6; 7; 8 AND 12)',
      ],
    },
    {
      citation: {
        id: 'CI-9U7UVTITC6TE5',
        citationType: 'submission',
        authors: ['Lind D.L.', 'Cox D.R.'],
        title:
          'Sequence and polymorphisms in fibroblast growth factor receptor 2 (FGFR2) gene in humans.',
        publicationDate: 'FEB-2002',
        submissionDatabase: 'EMBL/GenBank/DDBJ databases',
      },
      referencePositions: ['NUCLEOTIDE SEQUENCE [GENOMIC DNA] (ISOFORM 3)'],
    },
    {
      citation: {
        id: 'CI-DDT2KGKK848MB',
        citationType: 'submission',
        authors: ['Jang J.'],
        title: 'Identification of a novel variant of FGFR2.',
        publicationDate: 'APR-2002',
        submissionDatabase: 'EMBL/GenBank/DDBJ databases',
      },
      referencePositions: ['NUCLEOTIDE SEQUENCE [MRNA] (ISOFORM 17)'],
    },
    {
      citation: {
        id: 'CI-DIALJ9DN38ENM',
        citationType: 'submission',
        authoringGroup: ['NIEHS SNPs program'],
        publicationDate: 'APR-2006',
        submissionDatabase: 'EMBL/GenBank/DDBJ databases',
      },
      referencePositions: [
        'NUCLEOTIDE SEQUENCE [GENOMIC DNA]',
        'VARIANTS PRO-6 AND THR-186',
      ],
    },
    {
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
          { database: 'PubMed', id: '14702039' },
          { database: 'DOI', id: '10.1038/ng1285' },
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
        'NUCLEOTIDE SEQUENCE [LARGE SCALE MRNA] (ISOFORM 15)',
      ],
      referenceComments: [{ value: 'Cerebellum', type: 'TISSUE' }],
    },
    {
      citation: {
        id: '15164054',
        citationType: 'journal article',
        authors: [
          'Deloukas P.',
          'Earthrowl M.E.',
          'Grafham D.V.',
          'Rubenfield M.',
          'French L.',
          'Steward C.A.',
          'Sims S.K.',
          'Jones M.C.',
          'Searle S.',
          'Scott C.',
          'Howe K.',
          'Hunt S.E.',
          'Andrews T.D.',
          'Gilbert J.G.R.',
          'Swarbreck D.',
          'Ashurst J.L.',
          'Taylor A.',
          'Battles J.',
          'Bird C.P.',
          'Ainscough R.',
          'Almeida J.P.',
          'Ashwell R.I.S.',
          'Ambrose K.D.',
          'Babbage A.K.',
          'Bagguley C.L.',
          'Bailey J.',
          'Banerjee R.',
          'Bates K.',
          'Beasley H.',
          'Bray-Allen S.',
          'Brown A.J.',
          'Brown J.Y.',
          'Burford D.C.',
          'Burrill W.',
          'Burton J.',
          'Cahill P.',
          'Camire D.',
          'Carter N.P.',
          'Chapman J.C.',
          'Clark S.Y.',
          'Clarke G.',
          'Clee C.M.',
          'Clegg S.',
          'Corby N.',
          'Coulson A.',
          'Dhami P.',
          'Dutta I.',
          'Dunn M.',
          'Faulkner L.',
          'Frankish A.',
          'Frankland J.A.',
          'Garner P.',
          'Garnett J.',
          'Gribble S.',
          'Griffiths C.',
          'Grocock R.',
          'Gustafson E.',
          'Hammond S.',
          'Harley J.L.',
          'Hart E.',
          'Heath P.D.',
          'Ho T.P.',
          'Hopkins B.',
          'Horne J.',
          'Howden P.J.',
          'Huckle E.',
          'Hynds C.',
          'Johnson C.',
          'Johnson D.',
          'Kana A.',
          'Kay M.',
          'Kimberley A.M.',
          'Kershaw J.K.',
          'Kokkinaki M.',
          'Laird G.K.',
          'Lawlor S.',
          'Lee H.M.',
          'Leongamornlert D.A.',
          'Laird G.',
          'Lloyd C.',
          'Lloyd D.M.',
          'Loveland J.',
          'Lovell J.',
          'McLaren S.',
          'McLay K.E.',
          'McMurray A.',
          'Mashreghi-Mohammadi M.',
          'Matthews L.',
          'Milne S.',
          'Nickerson T.',
          'Nguyen M.',
          'Overton-Larty E.',
          'Palmer S.A.',
          'Pearce A.V.',
          'Peck A.I.',
          'Pelan S.',
          'Phillimore B.',
          'Porter K.',
          'Rice C.M.',
          'Rogosin A.',
          'Ross M.T.',
          'Sarafidou T.',
          'Sehra H.K.',
          'Shownkeen R.',
          'Skuce C.D.',
          'Smith M.',
          'Standring L.',
          'Sycamore N.',
          'Tester J.',
          'Thorpe A.',
          'Torcasso W.',
          'Tracey A.',
          'Tromans A.',
          'Tsolas J.',
          'Wall M.',
          'Walsh J.',
          'Wang H.',
          'Weinstock K.',
          'West A.P.',
          'Willey D.L.',
          'Whitehead S.L.',
          'Wilming L.',
          'Wray P.W.',
          'Young L.',
          'Chen Y.',
          'Lovering R.C.',
          'Moschonas N.K.',
          'Siebert R.',
          'Fechtel K.',
          'Bentley D.',
          'Durbin R.M.',
          'Hubbard T.',
          'Doucette-Stamm L.',
          'Beck S.',
          'Smith D.R.',
          'Rogers J.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '15164054' },
          { database: 'DOI', id: '10.1038/nature02462' },
        ],
        title:
          'The DNA sequence and comparative analysis of human chromosome 10.',
        publicationDate: '2004',
        journal: 'Nature',
        firstPage: '375',
        lastPage: '381',
        volume: '429',
      },
      referencePositions: ['NUCLEOTIDE SEQUENCE [LARGE SCALE GENOMIC DNA]'],
    },
    {
      citation: {
        id: '15489334',
        citationType: 'journal article',
        authoringGroup: ['The MGC Project Team'],
        citationCrossReferences: [
          { database: 'PubMed', id: '15489334' },
          { database: 'DOI', id: '10.1101/gr.2596504' },
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
        'NUCLEOTIDE SEQUENCE [LARGE SCALE MRNA] (ISOFORM 14)',
      ],
      referenceComments: [{ value: 'Brain', type: 'TISSUE' }],
    },
    {
      citation: {
        id: '10712195',
        citationType: 'journal article',
        authors: [
          'Glaser R.L.',
          'Jiang W.',
          'Boyadjiev S.A.',
          'Tran A.K.',
          'Zachary A.A.',
          'Van Maldergem L.',
          'Johnson D.',
          'Walsh S.',
          'Oldridge M.',
          'Wall S.A.',
          'Wilkie A.O.M.',
          'Jabs E.W.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '10712195' },
          { database: 'DOI', id: '10.1086/302831' },
        ],
        title:
          'Paternal origin of FGFR2 mutations in sporadic cases of Crouzon syndrome and Pfeiffer syndrome.',
        publicationDate: '2000',
        journal: 'Am. J. Hum. Genet.',
        firstPage: '768',
        lastPage: '777',
        volume: '66',
      },
      referencePositions: ['NUCLEOTIDE SEQUENCE [GENOMIC DNA] OF 314-427'],
    },
    {
      citation: {
        id: '10196476',
        citationType: 'journal article',
        authors: ['Zhang Y.', 'Gorry M.C.', 'Post J.C.', 'Ehrlich G.D.'],
        citationCrossReferences: [
          { database: 'PubMed', id: '10196476' },
          { database: 'DOI', id: '10.1016/s0378-1119(99)00047-5' },
        ],
        title:
          'Genomic organization of the human fibroblast growth factor receptor 2 (FGFR2) gene and comparative analysis of the human FGFR gene family.',
        publicationDate: '1999',
        journal: 'Gene',
        firstPage: '69',
        lastPage: '79',
        volume: '230',
      },
      referencePositions: [
        'NUCLEOTIDE SEQUENCE [GENOMIC DNA] OF 1-209; 212-767 AND 771-821 (ISOFORMS 5; 8 AND 12)',
      ],
    },
    {
      citation: {
        id: '7668257',
        citationType: 'journal article',
        authors: [
          'Park W.-J.',
          'Theda C.',
          'Maestri N.E.',
          'Meyers G.A.',
          'Fryburg J.S.',
          'Dufresne C.',
          'Cohen M.M. Jr.',
          'Jabs E.W.',
        ],
        citationCrossReferences: [{ database: 'PubMed', id: '7668257' }],
        title:
          'Analysis of phenotypic features and FGFR2 mutations in Apert syndrome.',
        publicationDate: '1995',
        journal: 'Am. J. Hum. Genet.',
        firstPage: '321',
        lastPage: '328',
        volume: '57',
      },
      referencePositions: [
        'NUCLEOTIDE SEQUENCE [GENOMIC DNA] OF 249-313',
        'VARIANTS APRS TRP-252 AND ARG-253',
      ],
    },
    {
      citation: {
        id: '8676562',
        citationType: 'journal article',
        authors: [
          'Wada C.',
          'Ishigaki M.',
          'Toyo-oka Y.',
          'Yamabe H.',
          'Ohnuki Y.',
          'Takada F.',
          'Yamazaki Y.',
          'Ohtani H.',
        ],
        citationCrossReferences: [{ database: 'PubMed', id: '8676562' }],
        title:
          'Nucleotide sequences at intron 6 and exon 7 junction of fibroblast growth factor receptor 2 and rapid mutational analysis in Apert syndrome.',
        publicationDate: '1996',
        journal: 'Rinsho Byori',
        firstPage: '435',
        lastPage: '438',
        volume: '44',
      },
      referencePositions: ['NUCLEOTIDE SEQUENCE [GENOMIC DNA] OF 251-259'],
    },
    {
      citation: {
        id: '8673103',
        citationType: 'journal article',
        authors: [
          'Moloney D.M.',
          'Slaney S.F.',
          'Oldridge M.',
          'Wall S.A.',
          'Sahlin P.',
          'Stenman G.',
          'Wilkie A.O.M.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '8673103' },
          { database: 'DOI', id: '10.1038/ng0596-48' },
        ],
        title: 'Exclusive paternal origin of new mutations in Apert syndrome.',
        publicationDate: '1996',
        journal: 'Nat. Genet.',
        firstPage: '48',
        lastPage: '53',
        volume: '13',
      },
      referencePositions: ['NUCLEOTIDE SEQUENCE [GENOMIC DNA] OF 251-318'],
    },
    {
      citation: {
        id: '7581378',
        citationType: 'journal article',
        authors: [
          'Gorry M.C.',
          'Preston R.A.',
          'White G.J.',
          'Zhang Y.',
          'Singhal V.K.',
          'Losken H.W.',
          'Parker M.G.',
          'Nwokoro N.A.',
          'Post J.C.',
          'Ehrlich G.D.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '7581378' },
          { database: 'DOI', id: '10.1093/hmg/4.8.1387' },
        ],
        title:
          'Crouzon syndrome: mutations in two spliceoforms of FGFR2 and a common point mutation shared with Jackson-Weiss syndrome.',
        publicationDate: '1995',
        journal: 'Hum. Mol. Genet.',
        firstPage: '1387',
        lastPage: '1390',
        volume: '4',
      },
      referencePositions: [
        'NUCLEOTIDE SEQUENCE [GENOMIC DNA] OF 263-361',
        'VARIANTS CS PRO-289; ARG-338; SER-342; TYR-342; GLY-344 AND CYS-354',
      ],
    },
    {
      citation: {
        id: '8961926',
        citationType: 'journal article',
        authors: ['Gray T.E.', 'Eisenstein M.', 'Yayon A.', 'Givol D.'],
        citationCrossReferences: [
          { database: 'PubMed', id: '8961926' },
          { database: 'DOI', id: '10.1021/bi961942c' },
        ],
        title:
          'Asparagine-344 is a key residue for ligand binding in keratinocyte growth factor receptor.',
        publicationDate: '1996',
        journal: 'Biochemistry',
        firstPage: '15640',
        lastPage: '15645',
        volume: '35',
      },
      referencePositions: ['FUNCTION (ISOFORM 3)', 'SUBUNIT', 'DOMAIN'],
    },
    {
      citation: {
        id: '8663044',
        citationType: 'journal article',
        authors: [
          'Ornitz D.M.',
          'Xu J.',
          'Colvin J.S.',
          'McEwen D.G.',
          'MacArthur C.A.',
          'Coulier F.',
          'Gao G.',
          'Goldfarb M.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '8663044' },
          { database: 'DOI', id: '10.1074/jbc.271.25.15292' },
        ],
        title: 'Receptor specificity of the fibroblast growth factor family.',
        publicationDate: '1996',
        journal: 'J. Biol. Chem.',
        firstPage: '15292',
        lastPage: '15297',
        volume: '271',
      },
      referencePositions: [
        'INTERACTION WITH FGF1; FGF2; FGF3; FGF4; FGF6; FGF7 AND FGF9',
        'FUNCTION IN CELL PROLIFERATION',
      ],
    },
    {
      citation: {
        id: '9585583',
        citationType: 'journal article',
        authors: [
          'Paznekas W.A.',
          'Cunningham M.L.',
          'Howard T.D.',
          'Korf B.R.',
          'Lipson M.H.',
          'Grix A.W.',
          'Feingold M.',
          'Goldberg R.',
          'Borochowitz Z.',
          'Aleck K.',
          'Mulliken J.',
          'Yin M.',
          'Jabs E.W.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '9585583' },
          { database: 'DOI', id: '10.1086/301855' },
        ],
        title:
          'Genetic heterogeneity of Saethre-Chotzen syndrome, due to TWIST and FGFR mutations.',
        publicationDate: '1998',
        journal: 'Am. J. Hum. Genet.',
        firstPage: '1370',
        lastPage: '1380',
        volume: '62',
      },
      referencePositions: [
        'INVOLVEMENT IN SCS',
        'VARIANT SCS 269-VAL-VAL-270 DEL',
      ],
    },
    {
      citation: {
        id: '12529371',
        citationType: 'journal article',
        authors: ['Lu Y.', 'Pan Z.-Z.', 'Devaux Y.', 'Ray P.'],
        citationCrossReferences: [
          { database: 'PubMed', id: '12529371' },
          { database: 'DOI', id: '10.1074/jbc.m205875200' },
        ],
        title:
          'p21-activated protein kinase 4 (PAK4) interacts with the keratinocyte growth factor receptor and participates in keratinocyte growth factor-mediated inhibition of oxidant-induced cell death.',
        publicationDate: '2003',
        journal: 'J. Biol. Chem.',
        firstPage: '10374',
        lastPage: '10380',
        volume: '278',
      },
      referencePositions: [
        'FUNCTION IN PHOSPHORYLATION OF PAK4; REGULATION OF CELL PROLIFERATION AND APOPTOSIS',
        'INTERACTION WITH GRB2 AND PAK4',
      ],
    },
    {
      citation: {
        id: '15190072',
        citationType: 'journal article',
        authors: [
          'Kaabeche K.',
          'Lemonnier J.',
          'Le Mee S.',
          'Caverzasio J.',
          'Marie P.J.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '15190072' },
          { database: 'DOI', id: '10.1074/jbc.m402469200' },
        ],
        title:
          'Cbl-mediated degradation of Lyn and Fyn induced by constitutive fibroblast growth factor receptor-2 activation supports osteoblast differentiation.',
        publicationDate: '2004',
        journal: 'J. Biol. Chem.',
        firstPage: '36259',
        lastPage: '36267',
        volume: '279',
      },
      referencePositions: [
        'FUNCTION IN OSTEOBLAST DIFFERENTIATION AND IN PHOSPHORYLATION OF CBL',
        'INTERACTION WITH CBL',
        'UBIQUITINATION',
        'CHARACTERIZATION OF VARIANT APRS TRP-252',
      ],
    },
    {
      citation: {
        id: '15629145',
        citationType: 'journal article',
        authors: [
          'Ceridono M.',
          'Belleudi F.',
          'Ceccarelli S.',
          'Torrisi M.R.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '15629145' },
          { database: 'DOI', id: '10.1016/j.bbrc.2004.12.031' },
        ],
        title:
          'Tyrosine 769 of the keratinocyte growth factor receptor is required for receptor signaling but not endocytosis.',
        publicationDate: '2005',
        journal: 'Biochem. Biophys. Res. Commun.',
        firstPage: '523',
        lastPage: '532',
        volume: '327',
      },
      referencePositions: [
        'FUNCTION IN CELL PROLIFERATION AND ACTIVATION OF SIGNALING PATHWAYS',
        'MUTAGENESIS OF TYR-769',
        'PHOSPHORYLATION AT TYR-769',
        'INTERACTION WITH PLCG1',
      ],
    },
    {
      citation: {
        id: '16597617',
        citationType: 'journal article',
        authors: [
          'Zhang X.',
          'Ibrahimi O.A.',
          'Olsen S.K.',
          'Umemori H.',
          'Mohammadi M.',
          'Ornitz D.M.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '16597617' },
          { database: 'DOI', id: '10.1074/jbc.m601252200' },
        ],
        title:
          'Receptor specificity of the fibroblast growth factor family. The complete mammalian FGF family.',
        publicationDate: '2006',
        journal: 'J. Biol. Chem.',
        firstPage: '15694',
        lastPage: '15700',
        volume: '281',
      },
      referencePositions: [
        'INTERACTION WITH FGF1; FGF7; FGF8; FGF9; FGF10; FGF19; FGF21; FGF22 AND FGF23',
        'FUNCTION IN STIMULATION OF CELL PROLIFERATION',
      ],
    },
    {
      citation: {
        id: '16844695',
        citationType: 'journal article',
        authors: [
          'Hatch N.E.',
          'Hudson M.',
          'Seto M.L.',
          'Cunningham M.L.',
          'Bothwell M.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '16844695' },
          { database: 'DOI', id: '10.1074/jbc.m600448200' },
        ],
        title:
          'Intracellular retention, degradation, and signaling of glycosylation-deficient FGFR2 and craniosynostosis syndrome-associated FGFR2C278F.',
        publicationDate: '2006',
        journal: 'J. Biol. Chem.',
        firstPage: '27292',
        lastPage: '27305',
        volume: '281',
      },
      referencePositions: [
        'FUNCTION IN PHOSPHORYLATION OF PLCG1 (ISOFORM 1)',
        'CATALYTIC ACTIVITY',
        'AUTOPHOSPHORYLATION',
        'GLYCOSYLATION',
        'INTERACTION WITH PLCG1',
        'SUBCELLULAR LOCATION',
        'MUTAGENESIS OF ASN-265 AND 656-TYR-TYR-657',
        'UBIQUITINATION',
        'CHARACTERIZATION OF VARIANT PS PHE-278',
      ],
    },
    {
      citation: {
        id: '17623664',
        citationType: 'journal article',
        authors: [
          'Kurosu H.',
          'Choi M.',
          'Ogawa Y.',
          'Dickson A.S.',
          'Goetz R.',
          'Eliseenkova A.V.',
          'Mohammadi M.',
          'Rosenblatt K.P.',
          'Kliewer S.A.',
          'Kuro-o M.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '17623664' },
          { database: 'DOI', id: '10.1074/jbc.m704165200' },
        ],
        title:
          'Tissue-specific expression of betaKlotho and fibroblast growth factor (FGF) receptor isoforms determines metabolic activity of FGF19 and FGF21.',
        publicationDate: '2007',
        journal: 'J. Biol. Chem.',
        firstPage: '26687',
        lastPage: '26695',
        volume: '282',
      },
      referencePositions: [
        'INTERACTION WITH FGF19; FGF21 AND KLB',
        'FUNCTION IN PHOSPHORYLATION OF FRS2 AND ACTIVATION OF MAP KINASES',
      ],
    },
    {
      citation: {
        id: '17311277',
        citationType: 'journal article',
        authors: ['Citores L.', 'Bai L.', 'Sorensen V.', 'Olsnes S.'],
        citationCrossReferences: [
          { database: 'PubMed', id: '17311277' },
          { database: 'DOI', id: '10.1002/jcp.21014' },
        ],
        title:
          'Fibroblast growth factor receptor-induced phosphorylation of STAT1 at the Golgi apparatus without translocation to the nucleus.',
        publicationDate: '2007',
        journal: 'J. Cell. Physiol.',
        firstPage: '148',
        lastPage: '156',
        volume: '212',
      },
      referencePositions: [
        'FUNCTION IN STAT1 PHOSPHORYLATION',
        'GLYCOSYLATION',
        'SUBCELLULAR LOCATION',
        'PHOSPHORYLATION',
      ],
    },
    {
      citation: {
        id: '18374639',
        citationType: 'journal article',
        authors: [
          'Dufour C.',
          'Guenou H.',
          'Kaabeche K.',
          'Bouvard D.',
          'Sanjay A.',
          'Marie P.J.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '18374639' },
          { database: 'DOI', id: '10.1016/j.bone.2008.02.009' },
        ],
        title:
          'FGFR2-Cbl interaction in lipid rafts triggers attenuation of PI3K/Akt signaling and osteoblast survival.',
        publicationDate: '2008',
        journal: 'Bone',
        firstPage: '1032',
        lastPage: '1039',
        volume: '42',
      },
      referencePositions: ['FUNCTION', 'SUBCELLULAR LOCATION'],
    },
    {
      citation: {
        id: '19410646',
        citationType: 'journal article',
        authors: [
          'Luo Y.',
          'Yang C.',
          'Jin C.',
          'Xie R.',
          'Wang F.',
          'McKeehan W.L.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '19410646' },
          { database: 'DOI', id: '10.1016/j.cellsig.2009.04.004' },
        ],
        title: 'Novel phosphotyrosine targets of FGFR2IIIb signaling.',
        publicationDate: '2009',
        journal: 'Cell. Signal.',
        firstPage: '1370',
        lastPage: '1378',
        volume: '21',
      },
      referencePositions: [
        'FUNCTION AS FGF7 RECEPTOR AND IN PHOSPHORYLATION OF PLCG1 AND FRS2',
        'CATALYTIC ACTIVITY',
        'PHOSPHORYLATION AT TYR-466; TYR-586; TYR-588; TYR-656 AND TYR-657',
        'IDENTIFICATION BY MASS SPECTROMETRY',
      ],
    },
    {
      citation: {
        id: '19103595',
        citationType: 'journal article',
        authors: [
          'Cha J.Y.',
          'Maddileti S.',
          'Mitin N.',
          'Harden T.K.',
          'Der C.J.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '19103595' },
          { database: 'DOI', id: '10.1074/jbc.m803998200' },
        ],
        title:
          'Aberrant receptor internalization and enhanced FRS2-dependent signaling contribute to the transforming activity of the fibroblast growth factor receptor 2 IIIb C3 isoform.',
        publicationDate: '2009',
        journal: 'J. Biol. Chem.',
        firstPage: '6227',
        lastPage: '6240',
        volume: '284',
      },
      referencePositions: [
        'FUNCTION IN FIBROBLAST PROLIFERATION; ACTIVATION OF MAP KINASES AND PHOSPHORYLATION OF PLCG1 AND FRS2',
        'INTERACTION WITH PLCG1 AND FRS2',
        'SUBCELLULAR LOCATION',
        'MUTAGENESIS OF TYR-769',
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
          { database: 'PubMed', id: '19369195' },
          { database: 'DOI', id: '10.1074/mcp.m800588-mcp200' },
        ],
        title: 'Large-scale proteomics analysis of the human kinome.',
        publicationDate: '2009',
        journal: 'Mol. Cell. Proteomics',
        firstPage: '1751',
        lastPage: '1764',
        volume: '8',
      },
      referencePositions: [
        'IDENTIFICATION BY MASS SPECTROMETRY [LARGE SCALE ANALYSIS]',
      ],
    },
    {
      citation: {
        id: '21596750',
        citationType: 'journal article',
        authors: ['Severe N.', 'Miraoui H.', 'Marie P.J.'],
        citationCrossReferences: [
          { database: 'PubMed', id: '21596750' },
          { database: 'DOI', id: '10.1074/jbc.m110.197525' },
        ],
        title:
          'The Casitas B lineage lymphoma (Cbl) mutant G306E enhances osteogenic differentiation in human mesenchymal stromal cells in part by decreased Cbl-mediated platelet-derived growth factor receptor alpha and fibroblast growth factor receptor 2 ubiquitination.',
        publicationDate: '2011',
        journal: 'J. Biol. Chem.',
        firstPage: '24443',
        lastPage: '24450',
        volume: '286',
      },
      referencePositions: ['FUNCTION', 'UBIQUITINATION'],
    },
    {
      citation: {
        id: '15863030',
        citationType: 'journal article',
        authors: ['Eswarakumar V.P.', 'Lax I.', 'Schlessinger J.'],
        citationCrossReferences: [
          { database: 'PubMed', id: '15863030' },
          { database: 'DOI', id: '10.1016/j.cytogfr.2005.01.001' },
        ],
        title: 'Cellular signaling by fibroblast growth factor receptors.',
        publicationDate: '2005',
        journal: 'Cytokine Growth Factor Rev.',
        firstPage: '139',
        lastPage: '149',
        volume: '16',
      },
      referencePositions: [
        'REVIEW ON LIGAND SPECIFICITY',
        'ALTERNATIVE SPLICING',
        'SIGNALING',
      ],
    },
    {
      citation: {
        id: '19387476',
        citationType: 'journal article',
        authors: ['Katoh M.'],
        citationCrossReferences: [
          { database: 'PubMed', id: '19387476' },
          { database: 'DOI', id: '10.1038/jid.2009.97' },
        ],
        title:
          'FGFR2 abnormalities underlie a spectrum of bone, skin, and cancer pathologies.',
        publicationDate: '2009',
        journal: 'J. Invest. Dermatol.',
        firstPage: '1861',
        lastPage: '1867',
        volume: '129',
      },
      referencePositions: [
        'REVIEW ON LIGAND SPECIFICITY',
        'ALTERNATIVE SPLICING',
        'SIGNALING',
        'ROLE IN DISEASE',
      ],
    },
    {
      citation: {
        id: '20094046',
        citationType: 'journal article',
        authors: ['Turner N.', 'Grose R.'],
        citationCrossReferences: [
          { database: 'PubMed', id: '20094046' },
          { database: 'DOI', id: '10.1038/nrc2780' },
        ],
        title:
          'Fibroblast growth factor signalling: from development to cancer.',
        publicationDate: '2010',
        journal: 'Nat. Rev. Cancer',
        firstPage: '116',
        lastPage: '129',
        volume: '10',
      },
      referencePositions: ['REVIEW ON FUNCTION IN FGF SIGNALING'],
    },
    {
      citation: {
        id: '24275569',
        citationType: 'journal article',
        authors: [
          'Bian Y.',
          'Song C.',
          'Cheng K.',
          'Dong M.',
          'Wang F.',
          'Huang J.',
          'Sun D.',
          'Wang L.',
          'Ye M.',
          'Zou H.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '24275569' },
          { database: 'DOI', id: '10.1016/j.jprot.2013.11.014' },
        ],
        title:
          'An enzyme assisted RP-RPLC approach for in-depth analysis of human liver phosphoproteome.',
        publicationDate: '2014',
        journal: 'J. Proteomics',
        firstPage: '253',
        lastPage: '262',
        volume: '96',
      },
      referencePositions: [
        'PHOSPHORYLATION [LARGE SCALE ANALYSIS] AT SER-780',
        'IDENTIFICATION BY MASS SPECTROMETRY [LARGE SCALE ANALYSIS]',
      ],
      referenceComments: [{ value: 'Liver', type: 'TISSUE' }],
    },
    {
      citation: {
        id: '10830168',
        citationType: 'journal article',
        authors: [
          'Plotnikov A.N.',
          'Hubbard S.R.',
          'Schlessinger J.',
          'Mohammadi M.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '10830168' },
          { database: 'DOI', id: '10.1016/s0092-8674(00)80851-x' },
        ],
        title:
          'Crystal structures of two FGF-FGFR complexes reveal the determinants of ligand-receptor specificity.',
        publicationDate: '2000',
        journal: 'Cell',
        firstPage: '413',
        lastPage: '424',
        volume: '101',
      },
      referencePositions: [
        'X-RAY CRYSTALLOGRAPHY (2.8 ANGSTROMS) OF 147-366 IN COMPLEX WITH FGF2',
      ],
    },
    {
      citation: {
        id: '11069186',
        citationType: 'journal article',
        authors: [
          'Pellegrini L.',
          'Burke D.F.',
          'von Delft F.',
          'Mulloy B.',
          'Blundell T.L.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '11069186' },
          { database: 'DOI', id: '10.1038/35039551' },
        ],
        title:
          'Crystal structure of fibroblast growth factor receptor ectodomain bound to ligand and heparin.',
        publicationDate: '2000',
        journal: 'Nature',
        firstPage: '1029',
        lastPage: '1034',
        volume: '407',
      },
      referencePositions: [
        'X-RAY CRYSTALLOGRAPHY (2.4 ANGSTROMS) OF 148-366 IN COMPLEX WITH FGF1 AND HEPARIN',
        'INTERACTION WITH FGF1 AND HEPARIN',
      ],
    },
    {
      citation: {
        id: '10618369',
        citationType: 'journal article',
        authors: ['Stauber D.J.', 'DiGabriele A.D.', 'Hendrickson W.A.'],
        citationCrossReferences: [
          { database: 'PubMed', id: '10618369' },
          { database: 'DOI', id: '10.1073/pnas.97.1.49' },
        ],
        title:
          'Structural interactions of fibroblast growth factor receptor with its ligands.',
        publicationDate: '2000',
        journal: 'Proc. Natl. Acad. Sci. U.S.A.',
        firstPage: '49',
        lastPage: '54',
        volume: '97',
      },
      referencePositions: [
        'X-RAY CRYSTALLOGRAPHY (2.4 ANGSTROMS) OF 147-362 IN COMPLEX WITH FGF1',
      ],
    },
    {
      citation: {
        id: '11390973',
        citationType: 'journal article',
        authors: [
          'Ibrahimi O.A.',
          'Eliseenkova A.V.',
          'Plotnikov A.N.',
          'Yu K.',
          'Ornitz D.M.',
          'Mohammadi M.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '11390973' },
          { database: 'DOI', id: '10.1073/pnas.121183798' },
        ],
        title:
          'Structural basis for fibroblast growth factor receptor 2 activation in Apert syndrome.',
        publicationDate: '2001',
        journal: 'Proc. Natl. Acad. Sci. U.S.A.',
        firstPage: '7182',
        lastPage: '7187',
        volume: '98',
      },
      referencePositions: [
        'X-RAY CRYSTALLOGRAPHY (2.7 ANGSTROMS) OF 147-366 OF VARIANTS APRS TRP-252 AND ARG-253 IN COMPLEX WITH FGF2',
      ],
    },
    {
      citation: {
        id: '12591959',
        citationType: 'journal article',
        authors: [
          'Yeh B.K.',
          'Igarashi M.',
          'Eliseenkova A.V.',
          'Plotnikov A.N.',
          'Sher I.',
          'Ron D.',
          'Aaronson S.A.',
          'Mohammadi M.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '12591959' },
          { database: 'DOI', id: '10.1073/pnas.0436500100' },
        ],
        title:
          'Structural basis by which alternative splicing confers specificity in fibroblast growth factor receptors.',
        publicationDate: '2003',
        journal: 'Proc. Natl. Acad. Sci. U.S.A.',
        firstPage: '2266',
        lastPage: '2271',
        volume: '100',
      },
      referencePositions: [
        'X-RAY CRYSTALLOGRAPHY (2.9 ANGSTROMS) OF 140-371 IN COMPLEX WITH FGF10',
      ],
    },
    {
      citation: {
        id: '16384934',
        citationType: 'journal article',
        authors: [
          'Olsen S.K.',
          'Li J.Y.H.',
          'Bromleigh C.',
          'Eliseenkova A.V.',
          'Ibrahimi O.A.',
          'Lao Z.',
          'Zhang F.',
          'Linhardt R.J.',
          'Joyner A.L.',
          'Mohammadi M.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '16384934' },
          { database: 'DOI', id: '10.1101/gad.1365406' },
        ],
        title:
          'Structural basis by which alternative splicing modulates the organizer activity of FGF8 in the brain.',
        publicationDate: '2006',
        journal: 'Genes Dev.',
        firstPage: '185',
        lastPage: '198',
        volume: '20',
      },
      referencePositions: [
        'X-RAY CRYSTALLOGRAPHY (2.28 ANGSTROMS) OF 149-368 IN COMPLEX WITH FGF8',
        'FUNCTION AS FGF8 RECEPTOR',
        'INTERACTION WITH FGF8',
        'DISULFIDE BONDS',
      ],
    },
    {
      citation: {
        id: '17803937',
        citationType: 'journal article',
        authors: [
          'Chen H.',
          'Ma J.',
          'Li W.',
          'Eliseenkova A.V.',
          'Xu C.',
          'Neubert T.A.',
          'Miller W.T.',
          'Mohammadi M.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '17803937' },
          { database: 'DOI', id: '10.1016/j.molcel.2007.06.028' },
        ],
        title:
          'A molecular brake in the kinase hinge region regulates the activity of receptor tyrosine kinases.',
        publicationDate: '2007',
        journal: 'Mol. Cell',
        firstPage: '717',
        lastPage: '730',
        volume: '27',
      },
      referencePositions: [
        'X-RAY CRYSTALLOGRAPHY (1.80 ANGSTROMS) OF 458-778 IN COMPLEX WITH ATP ANALOG; PEPTIDE SUBSTRATE AND MAGNESIUM',
        'ACTIVITY REGULATION',
        'PHOSPHORYLATION AT TYR-586; TYR-656 AND TYR-657',
        'MUTAGENESIS OF ASN-549 AND GLU-565',
        'CHARACTERIZATION OF VARIANT FSPC GLU-526',
        'CHARACTERIZATION OF VARIANT CS HIS-549',
        'CHARACTERIZATION OF VARIANTS PS GLY-565 AND ARG-641',
        'CHARACTERIZATION OF VARIANT CRANIOSYNOSTOSIS ASN-659',
      ],
    },
    {
      citation: {
        id: '18056630',
        citationType: 'journal article',
        authors: [
          'Lew E.D.',
          'Bae J.H.',
          'Rohmann E.',
          'Wollnik B.',
          'Schlessinger J.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '18056630' },
          { database: 'DOI', id: '10.1073/pnas.0709905104' },
        ],
        title:
          'Structural basis for reduced FGFR2 activity in LADD syndrome: Implications for FGFR autoinhibition and activation.',
        publicationDate: '2007',
        journal: 'Proc. Natl. Acad. Sci. U.S.A.',
        firstPage: '19802',
        lastPage: '19807',
        volume: '104',
      },
      referencePositions: [
        'X-RAY CRYSTALLOGRAPHY (1.80 ANGSTROMS) OF 458-766 OF VARIANT LADDS THR-628 IN COMPLEX WITH ATP ANALOG',
        'CATALYTIC ACTIVITY',
        'SUBUNIT',
        'AUTOPHOSPHORYLATION',
      ],
    },
    {
      citation: {
        id: '19060208',
        citationType: 'journal article',
        authors: [
          'Chen H.',
          'Xu C.F.',
          'Ma J.',
          'Eliseenkova A.V.',
          'Li W.',
          'Pollock P.M.',
          'Pitteloud N.',
          'Miller W.T.',
          'Neubert T.A.',
          'Mohammadi M.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '19060208' },
          { database: 'DOI', id: '10.1073/pnas.0807752105' },
        ],
        title:
          'A crystallographic snapshot of tyrosine trans-phosphorylation in action.',
        publicationDate: '2008',
        journal: 'Proc. Natl. Acad. Sci. U.S.A.',
        firstPage: '19660',
        lastPage: '19665',
        volume: '105',
      },
      referencePositions: [
        'X-RAY CRYSTALLOGRAPHY (2.00 ANGSTROMS) OF 458-778 IN COMPLEX WITH ATP',
        'ACTIVE SITE',
        'IDENTIFICATION BY MASS SPECTROMETRY',
        'AUTOPHOSPHORYLATION',
        'PHOSPHORYLATION AT TYR-466; TYR-586; TYR-588; TYR-656; TYR-657 AND TYR-769',
      ],
    },
    {
      citation: {
        id: '21454610',
        citationType: 'journal article',
        authors: [
          'Eathiraj S.',
          'Palma R.',
          'Hirschi M.',
          'Volckova E.',
          'Nakuci E.',
          'Castro J.',
          'Chen C.R.',
          'Chan T.C.',
          'France D.S.',
          'Ashwell M.A.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '21454610' },
          { database: 'DOI', id: '10.1074/jbc.m110.213736' },
        ],
        title:
          'A novel mode of protein kinase inhibition exploiting hydrophobic motifs of autoinhibited kinases: discovery of ATP-independent inhibitors of fibroblast growth factor receptor.',
        publicationDate: '2011',
        journal: 'J. Biol. Chem.',
        firstPage: '20677',
        lastPage: '20687',
        volume: '286',
      },
      referencePositions: [
        'X-RAY CRYSTALLOGRAPHY (2.10 ANGSTROMS) OF 458-768 IN COMPLEX WITH INHIBITOR',
        'CATALYTIC ACTIVITY',
        'AUTOPHOSPHORYLATION',
        'ACTIVITY REGULATION',
      ],
    },
    {
      citation: {
        id: '7987400',
        citationType: 'journal article',
        authors: [
          'Reardon W.',
          'Winter R.M.',
          'Rutland P.',
          'Pulleyn L.J.',
          'Jones B.M.',
          'Malcolm S.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '7987400' },
          { database: 'DOI', id: '10.1038/ng0994-98' },
        ],
        title:
          'Mutations in the fibroblast growth factor receptor 2 gene cause Crouzon syndrome.',
        publicationDate: '1994',
        journal: 'Nat. Genet.',
        firstPage: '98',
        lastPage: '103',
        volume: '8',
      },
      referencePositions: [
        'VARIANTS CS HIS-340; ARG-342; SER-342; TYR-342 AND CYS-354',
      ],
    },
    {
      citation: {
        id: '7874170',
        citationType: 'journal article',
        authors: [
          'Jabs E.W.',
          'Li X.',
          'Scott A.F.',
          'Meyers G.A.',
          'Chen W.',
          'Eccles M.',
          'Mao J.',
          'Charnas L.R.',
          'Jackson C.E.',
          'Jaye M.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '7874170' },
          { database: 'DOI', id: '10.1038/ng1194-275' },
        ],
        title:
          'Jackson-Weiss and Crouzon syndromes are allelic with mutations in fibroblast growth factor receptor 2.',
        publicationDate: '1994',
        journal: 'Nat. Genet.',
        firstPage: '275',
        lastPage: '279',
        volume: '8',
      },
      referencePositions: [
        'VARIANTS CS CYS-328 AND CYS-347',
        'VARIANT JWS GLY-344',
      ],
    },
    {
      citation: {
        id: '7655462',
        citationType: 'journal article',
        authors: [
          'Oldridge M.',
          'Wilkie A.O.M.',
          'Slaney S.F.',
          'Poole M.D.',
          'Pulleyn L.J.',
          'Rutland P.',
          'Hockley A.D.',
          'Wake M.J.C.',
          'Goldin J.H.',
          'Winter R.M.',
          'Reardon W.',
          'Malcolm S.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '7655462' },
          { database: 'DOI', id: '10.1093/hmg/4.6.1077' },
        ],
        title:
          'Mutations in the third immunoglobulin domain of the fibroblast growth factor receptor-2 gene in Crouzon syndrome.',
        publicationDate: '1995',
        journal: 'Hum. Mol. Genet.',
        firstPage: '1077',
        lastPage: '1082',
        volume: '4',
      },
      referencePositions: ['VARIANTS CS'],
    },
    {
      citation: {
        id: '8528214',
        citationType: 'journal article',
        authors: [
          'Park W.-J.',
          'Meyers G.A.',
          'Li X.',
          'Theda C.',
          'Day D.',
          'Orlow S.J.',
          'Jones M.C.',
          'Jabs E.W.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '8528214' },
          { database: 'DOI', id: '10.1093/hmg/4.7.1229' },
        ],
        title:
          'Novel FGFR2 mutations in Crouzon and Jackson-Weiss syndromes show allelic heterogeneity and phenotypic variability.',
        publicationDate: '1995',
        journal: 'Hum. Mol. Genet.',
        firstPage: '1229',
        lastPage: '1233',
        volume: '4',
      },
      referencePositions: [
        'VARIANTS CS GLY-290; TRP-342 AND CYS-354',
        'VARIANT JWS ARG-342',
      ],
    },
    {
      citation: {
        id: '7719333',
        citationType: 'journal article',
        authors: [
          'Lajeunie E.',
          'Wei M.H.',
          'Bonaventure J.',
          'Munnich A.',
          'le Merrer M.',
          'Renier D.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '7719333' },
          { database: 'DOI', id: '10.1038/ng0295-108' },
        ],
        title: 'FGFR2 mutations in Pfeiffer syndrome.',
        publicationDate: '1995',
        journal: 'Nat. Genet.',
        firstPage: '108',
        lastPage: '108',
        volume: '9',
      },
      referencePositions: ['VARIANT PS ALA-321'],
    },
    {
      citation: {
        id: '7719344',
        citationType: 'journal article',
        authors: [
          'Wilkie A.O.M.',
          'Slaney S.F.',
          'Oldridge M.',
          'Poole M.D.',
          'Ashworth G.J.',
          'Hockley A.D.',
          'Hayward R.D.',
          'David D.J.',
          'Pulleyn L.J.',
          'Rutland P.',
          'Malcolm S.',
          'Winter R.M.',
          'Reardon W.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '7719344' },
          { database: 'DOI', id: '10.1038/ng0295-165' },
        ],
        title:
          'Apert syndrome results from localized mutations of FGFR2 and is allelic with Crouzon syndrome.',
        publicationDate: '1995',
        journal: 'Nat. Genet.',
        firstPage: '165',
        lastPage: '172',
        volume: '9',
      },
      referencePositions: ['VARIANTS APRS TRP-252 AND ARG-253'],
    },
    {
      citation: {
        id: '7719345',
        citationType: 'journal article',
        authors: [
          'Rutland P.',
          'Pulleyn L.J.',
          'Reardon W.',
          'Baraister M.',
          'Hayward R.',
          'Jones B.M.',
          'Malcolm S.',
          'Winter R.M.',
          'Oldridge M.',
          'Slaney S.F.',
          'Poole M.D.',
          'Wilkie A.O.M.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '7719345' },
          { database: 'DOI', id: '10.1038/ng0295-173' },
        ],
        title:
          'Identical mutations in the FGFR2 gene cause both Pfeiffer and Crouzon syndrome phenotypes.',
        publicationDate: '1995',
        journal: 'Nat. Genet.',
        firstPage: '173',
        lastPage: '176',
        volume: '9',
      },
      referencePositions: ['VARIANTS PS PRO-341; ARG-342 AND TYR-342'],
    },
    {
      citation: {
        id: '8644708',
        citationType: 'journal article',
        authors: [
          'Meyers G.A.',
          'Day D.',
          'Goldberg R.',
          'Daentl D.L.',
          'Przylepa K.A.',
          'Abrams L.J.',
          'Graham J.M. Jr.',
          'Feingold M.',
          'Moeschler J.B.',
          'Rawnsley E.',
          'Scott A.F.',
          'Jabs E.W.',
        ],
        citationCrossReferences: [{ database: 'PubMed', id: '8644708' }],
        title:
          'FGFR2 exon IIIa and IIIc mutations in Crouzon, Jackson-Weiss, and Pfeiffer syndromes: evidence for missense changes, insertions, and a deletion due to alternative RNA splicing.',
        publicationDate: '1996',
        journal: 'Am. J. Hum. Genet.',
        firstPage: '491',
        lastPage: '498',
        volume: '58',
      },
      referencePositions: [
        'VARIANTS CS GLY-268 INS; PHE-342 AND TYR-342',
        'VARIANTS PS PHE-278; ARG-342; SER-342; PRO-344 AND PHE-359',
        'VARIANT JWS PRO-289',
      ],
    },
    {
      citation: {
        id: '8946174',
        citationType: 'journal article',
        authors: [
          'Pulleyn L.J.',
          'Reardon W.',
          'Wilkes D.',
          'Rutland P.',
          'Jones B.M.',
          'Hayward R.',
          'Hall C.M.',
          'Brueton L.',
          'Chun N.',
          'Lammer E.',
          'Malcolm S.',
          'Winter R.M.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '8946174' },
          { database: 'DOI', id: '10.1159/000472215' },
        ],
        title:
          'Spectrum of craniosynostosis phenotypes associated with novel mutations at the fibroblast growth factor receptor 2 locus.',
        publicationDate: '1996',
        journal: 'Eur. J. Hum. Genet.',
        firstPage: '283',
        lastPage: '291',
        volume: '4',
      },
      referencePositions: ['VARIANTS CS CYS-105; GLU-338; CYS-351 AND ARG-384'],
    },
    {
      citation: {
        id: '8956050',
        citationType: 'journal article',
        authors: ['Steinberger D.', 'Mulliken J.B.', 'Mueller U.'],
        citationCrossReferences: [
          { database: 'PubMed', id: '8956050' },
          {
            database: 'DOI',
            id: '10.1002/(sici)1098-1004(1996)8:4<386::aid-humu18>3.0.co;2-z',
          },
        ],
        title:
          'Crouzon syndrome: previously unrecognized deletion, duplication, and point mutation within FGFR2 gene.',
        publicationDate: '1996',
        journal: 'Hum. Mutat.',
        firstPage: '386',
        lastPage: '390',
        volume: '8',
      },
      referencePositions: [
        'VARIANTS CS ILE-331; ASN-ALA-337 INS AND 356-TRP--THR-358 DEL',
      ],
    },
    {
      citation: {
        id: '8696350',
        citationType: 'journal article',
        authors: [
          'Przylepa K.A.',
          'Paznekas W.A.',
          'Zhang M.',
          'Golabi M.',
          'Bias W.',
          'Bamshad M.J.',
          'Carey J.C.',
          'Hall B.D.',
          'Stevenson R.',
          'Orlow S.J.',
          'Cohen M.M. Jr.',
          'Jabs E.W.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '8696350' },
          { database: 'DOI', id: '10.1038/ng0896-492' },
        ],
        title:
          'Fibroblast growth factor receptor 2 mutations in Beare-Stevenson cutis gyrata syndrome.',
        publicationDate: '1996',
        journal: 'Nat. Genet.',
        firstPage: '492',
        lastPage: '494',
        volume: '13',
      },
      referencePositions: ['VARIANTS BSTVS CYS-372 AND CYS-375'],
    },
    {
      citation: {
        id: '9150725',
        citationType: 'journal article',
        authors: [
          'Tartaglia M.',
          'Valeri S.',
          'Velardi F.',
          'di Rocco C.',
          'Battaglia P.A.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '9150725' },
          { database: 'DOI', id: '10.1007/s004390050413' },
        ],
        title:
          'Trp290Cys mutation in exon IIIa of the fibroblast growth factor receptor 2 (FGFR2) gene is associated with Pfeiffer syndrome.',
        publicationDate: '1997',
        journal: 'Hum. Genet.',
        firstPage: '602',
        lastPage: '606',
        volume: '99',
      },
      referencePositions: ['VARIANT PS CYS-290'],
    },
    {
      citation: {
        id: '9385368',
        citationType: 'journal article',
        authors: [
          'Tartaglia M.',
          'Di Rocco C.',
          'Lajeunie E.',
          'Valeri S.',
          'Velardi F.',
          'Battaglia P.A.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '9385368' },
          { database: 'DOI', id: '10.1007/s004390050584' },
        ],
        title:
          'Jackson-Weiss syndrome: identification of two novel FGFR2 missense mutations shared with Crouzon and Pfeiffer craniosynostotic disorders.',
        publicationDate: '1997',
        journal: 'Hum. Genet.',
        firstPage: '47',
        lastPage: '50',
        volume: '101',
      },
      referencePositions: ['VARIANT JWS SER-342'],
    },
    {
      citation: {
        id: '9002682',
        citationType: 'journal article',
        authors: [
          'Oldridge M.',
          'Lunt P.W.',
          'Zackai E.H.',
          'McDonald-Mcginn D.M.',
          'Muenke M.',
          'Moloney D.M.',
          'Twigg S.R.F.',
          'Heath J.K.',
          'Howard T.D.',
          'Hoganson G.',
          'Gagnon D.M.',
          'Jabs E.W.',
          'Wilkie A.O.M.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '9002682' },
          { database: 'DOI', id: '10.1093/hmg/6.1.137' },
        ],
        title:
          'Genotype-phenotype correlation for nucleotide substitutions in the IgII-IgIII linker of FGFR2.',
        publicationDate: '1997',
        journal: 'Hum. Mol. Genet.',
        firstPage: '137',
        lastPage: '143',
        volume: '6',
      },
      referencePositions: [
        'VARIANT LEU-252',
        'VARIANT APRS PHE-252',
        'VARIANT PS 252-PHE-SER-253',
      ],
    },
    {
      citation: {
        id: '9152842',
        citationType: 'journal article',
        authors: [
          'Steinberger D.',
          'Collmann H.',
          'Schmalenberger B.',
          'Mueller U.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '9152842' },
          { database: 'DOI', id: '10.1136/jmg.34.5.420' },
        ],
        title:
          'A novel mutation (a886g) in exon 5 of FGFR2 in members of a family with Crouzon phenotype and plagiocephaly.',
        publicationDate: '1997',
        journal: 'J. Med. Genet.',
        firstPage: '420',
        lastPage: '422',
        volume: '34',
      },
      referencePositions: ['VARIANT CS GLU-292'],
    },
    {
      citation: {
        id: '9677057',
        citationType: 'journal article',
        authors: [
          'Passos-Bueno M.R.',
          'Sertie A.L.',
          'Richieri-Costa A.',
          'Alonso L.G.',
          'Zatz M.',
          'Alonso N.',
          'Brunoni D.',
          'Ribeiro S.F.M.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '9677057' },
          {
            database: 'DOI',
            id:
              '10.1002/(sici)1096-8628(19980707)78:3<237::aid-ajmg5>3.0.co;2-m',
          },
        ],
        title:
          'Description of a new mutation and characterization of FGFR1, FGFR2, and FGFR3 mutations among Brazilian patients with syndromic craniosynostoses.',
        publicationDate: '1998',
        journal: 'Am. J. Med. Genet.',
        firstPage: '237',
        lastPage: '241',
        volume: '78',
      },
      referencePositions: [
        'VARIANTS CS PHE-278; PRO-337; ARG-338; ARG-342; PHE-342 AND TYR-342',
        'VARIANTS APRS TRP-252 AND ARG-253',
        'VARIANT JWS PHE-278',
      ],
    },
    {
      citation: {
        id: '9521581',
        citationType: 'journal article',
        authors: ['Steinberger D.', 'Vriend G.', 'Mulliken J.B.', 'Mueller U.'],
        citationCrossReferences: [
          { database: 'PubMed', id: '9521581' },
          { database: 'DOI', id: '10.1007/s004390050668' },
        ],
        title:
          'The mutations in FGFR2-associated craniosynostoses are clustered in five structural elements of immunoglobulin-like domain III of the receptor.',
        publicationDate: '1998',
        journal: 'Hum. Genet.',
        firstPage: '145',
        lastPage: '150',
        volume: '102',
      },
      referencePositions: [
        'VARIANTS CS VAL-276 AND CYS-301',
        'VARIANT CRANIOSYNOSTOSIS SER-314',
      ],
    },
    {
      citation: {
        id: '9452027',
        citationType: 'journal article',
        authors: [
          'Tsai F.-J.',
          'Hwu W.-L.',
          'Lin S.-P.',
          'Chang J.-G.',
          'Wang T.-R.',
          'Tsai C.-H.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '9452027' },
          { database: 'DOI', id: '10.1002/humu.1380110106' },
        ],
        title:
          'Two common mutations 934C to G and 937C to G of fibroblast growth factor receptor 2 (FGFR2) gene in Chinese patients with Apert syndrome.',
        publicationDate: '1998',
        journal: 'Hum. Mutat. Suppl.',
        firstPage: 'S18',
        lastPage: 'S19',
        volume: '1',
      },
      referencePositions: ['VARIANTS APRS TRP-252 AND ARG-253'],
    },
    {
      citation: {
        id: '9693549',
        citationType: 'journal article',
        authors: [
          'Mathijssen I.M.',
          'Vaandrager J.M.',
          'Hoogeboom A.J.',
          'Hesseling-Janssen A.L.W.',
          'van den Ouweland A.M.W.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '9693549' },
          { database: 'DOI', id: '10.1097/00001665-199805000-00004' },
        ],
        title:
          "Pfeiffer's syndrome resulting from an S351C mutation in the fibroblast growth factor receptor-2 gene.",
        publicationDate: '1998',
        journal: 'J. Craniofac. Surg.',
        firstPage: '207',
        lastPage: '209',
        volume: '9',
      },
      referencePositions: ['VARIANT PS CYS-351'],
    },
    {
      citation: {
        id: '9719378',
        citationType: 'journal article',
        authors: [
          'Passos-Bueno M.R.',
          'Richieri-Costa A.',
          'Sertie A.L.',
          'Kneppers A.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '9719378' },
          { database: 'DOI', id: '10.1136/jmg.35.8.677' },
        ],
        title:
          'Presence of the Apert canonical S252W FGFR2 mutation in a patient without severe syndactyly.',
        publicationDate: '1998',
        journal: 'J. Med. Genet.',
        firstPage: '677',
        lastPage: '679',
        volume: '35',
      },
      referencePositions: ['VARIANT PS TRP-252'],
    },
    {
      citation: {
        id: '10574673',
        citationType: 'journal article',
        authors: [
          'Everett E.T.',
          'Britto D.A.',
          'Ward R.E.',
          'Hartsfield J.K. Jr.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '10574673' },
          {
            database: 'DOI',
            id: '10.1597/1545-1569_1999_036_0533_anfgmi_2.3.co_2',
          },
        ],
        title:
          'A novel FGFR2 gene mutation in Crouzon syndrome associated with apparent nonpenetrance.',
        publicationDate: '1999',
        journal: 'Cleft Palate Craniofac. J.',
        firstPage: '533',
        lastPage: '541',
        volume: '36',
      },
      referencePositions: ['VARIANT CS SER-362'],
    },
    {
      citation: {
        id: '10394936',
        citationType: 'journal article',
        authors: ['Cornejo-Roldan L.R.', 'Roessler E.', 'Muenke M.'],
        citationCrossReferences: [
          { database: 'PubMed', id: '10394936' },
          { database: 'DOI', id: '10.1007/s004390050979' },
        ],
        title:
          'Analysis of the mutational spectrum of the FGFR2 gene in Pfeiffer syndrome.',
        publicationDate: '1999',
        journal: 'Hum. Genet.',
        firstPage: '425',
        lastPage: '431',
        volume: '104',
      },
      referencePositions: ['VARIANTS PS CYS-340 AND GLY-342'],
    },
    {
      citation: {
        id: '10945669',
        citationType: 'journal article',
        authors: [
          'Priolo M.',
          'Lerone M.',
          'Baffico M.',
          'Baldi M.',
          'Ravazzolo R.',
          'Cama A.',
          'Capra V.',
          'Silengo M.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '10945669' },
          { database: 'DOI', id: '10.1034/j.1399-0004.2000.580116.x' },
        ],
        title:
          'Pfeiffer syndrome type 2 associated with a single amino acid deletion in the FGFR2 gene.',
        publicationDate: '2000',
        journal: 'Clin. Genet.',
        firstPage: '81',
        lastPage: '83',
        volume: '58',
      },
      referencePositions: ['VARIANT PS ASP-273 DEL'],
    },
    {
      citation: {
        id: '11173845',
        citationType: 'journal article',
        authors: [
          'Kress W.',
          'Collmann H.',
          'Buesse M.',
          'Halliger-Keller B.',
          'Mueller C.R.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '11173845' },
          { database: 'DOI', id: '10.1159/000056833' },
        ],
        title:
          'Clustering of FGFR2 gene mutations in patients with Pfeiffer and Crouzon syndromes (FGFR2-associated craniosynostoses).',
        publicationDate: '2000',
        journal: 'Cytogenet. Cell Genet.',
        firstPage: '134',
        lastPage: '137',
        volume: '91',
      },
      referencePositions: [
        'VARIANTS CS/PS ARG-342 AND TYR-342',
        'VARIANTS CS LEU-263; VAL-276; PHE-278; TYR-278; SER-288; PRO-289; PRO-341; TRP-342; CYS-354; TYR-354 AND PHE-359',
        'VARIANT PS SER-342',
      ],
    },
    {
      citation: {
        id: '10951518',
        citationType: 'journal article',
        authors: ['Johnson D.', 'Wall S.A.', 'Mann S.', 'Wilkie A.O.M.'],
        citationCrossReferences: [
          { database: 'PubMed', id: '10951518' },
          { database: 'DOI', id: '10.1038/sj.ejhg.5200499' },
        ],
        title:
          'A novel mutation, Ala315Ser, in FGFR2: a gene-environment interaction leading to craniosynostosis?',
        publicationDate: '2000',
        journal: 'Eur. J. Hum. Genet.',
        firstPage: '571',
        lastPage: '577',
        volume: '8',
      },
      referencePositions: ['VARIANT SER-315'],
    },
    {
      citation: {
        id: '10633130',
        citationType: 'journal article',
        authors: [
          'Reardon W.',
          'Smith A.',
          'Honour J.W.',
          'Hindmarsh P.',
          'Das D.',
          'Rumsby G.',
          'Nelson I.',
          'Malcolm S.',
          'Ades L.',
          'Sillence D.',
          'Kumar D.',
          'DeLozier-Blanchet C.',
          'McKee S.',
          'Kelly T.',
          'McKeehan W.L.',
          'Baraitser M.',
          'Winter R.M.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '10633130' },
          { database: 'DOI', id: '10.1136/jmg.37.1.26' },
        ],
        title:
          'Evidence for digenic inheritance in some cases of Antley-Bixler syndrome?',
        publicationDate: '2000',
        journal: 'J. Med. Genet.',
        firstPage: '26',
        lastPage: '32',
        volume: '37',
      },
      referencePositions: ['VARIANTS ABS2 ARG-342; SER-342 AND CYS-351'],
    },
    {
      citation: {
        id: '11380921',
        citationType: 'journal article',
        authors: [
          'Tsai F.-J.',
          'Yang C.-F.',
          'Wu J.-Y.',
          'Tsai C.-H.',
          'Lee C.-C.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '11380921' },
          { database: 'DOI', id: '10.1046/j.1442-200x.2001.01392.x' },
        ],
        title:
          'Mutation analysis of Crouzon syndrome and identification of one novel mutation in Taiwanese patients.',
        publicationDate: '2001',
        journal: 'Pediatr. Int.',
        firstPage: '263',
        lastPage: '266',
        volume: '43',
      },
      referencePositions: ['VARIANTS CS CYS-281; PRO-289; ARG-342 AND TYR-342'],
    },
    {
      citation: {
        id: '11781872',
        citationType: 'journal article',
        authors: [
          'Kan S.-H.',
          'Elanko N.',
          'Johnson D.',
          'Cornejo-Roldan L.R.',
          'Cook J.',
          'Reich E.W.',
          'Tomkins S.',
          'Verloes A.',
          'Twigg S.R.F.',
          'Rannan-Eliya S.',
          'McDonald-McGinn D.M.',
          'Zackai E.H.',
          'Wall S.A.',
          'Muenke M.',
          'Wilkie A.O.M.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '11781872' },
          { database: 'DOI', id: '10.1086/338758' },
        ],
        title:
          'Genomic screening of fibroblast growth-factor receptor 2 reveals a wide spectrum of mutations in patients with syndromic craniosynostosis.',
        publicationDate: '2002',
        journal: 'Am. J. Hum. Genet.',
        firstPage: '472',
        lastPage: '486',
        volume: '70',
      },
      referencePositions: [
        'VARIANTS CS CYS-105; PRO-267; VAL-276; CYS-281; PRO-289; ARG-338; HIS-340; PHE-342; TRP-342; CYS-347; CYS-354; HIS-549 AND GLY-678',
        'VARIANTS PS PHE-172; 252-PHE-SER-253; CYS-290; CYS-340; PRO-341; ARG-342; SER-342; CYS-375; GLY-565; ARG-641 AND GLU-663',
        'VARIANTS APRS TRP-252 AND ARG-253',
        'VARIANTS CS/PS PHE-278 AND TYR-342',
        'VARIANT CRANIOSYNOSTOSIS ASN-659',
        'VARIANTS THR-186 AND SER-315',
      ],
    },
    {
      citation: {
        id: '12000365',
        citationType: 'journal article',
        authors: [
          'Wang T.-J.',
          'Huang C.-B.',
          'Tsai F.-J.',
          'Wu J.-Y.',
          'Lai R.-B.',
          'Hsiao M.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '12000365' },
          { database: 'DOI', id: '10.1034/j.1399-0004.2002.610309.x' },
        ],
        title:
          'Mutation in the FGFR2 gene in a Taiwanese patient with Beare-Stevenson cutis gyrata syndrome.',
        publicationDate: '2002',
        journal: 'Clin. Genet.',
        firstPage: '218',
        lastPage: '221',
        volume: '61',
      },
      referencePositions: ['VARIANT BSTVS CYS-375'],
    },
    {
      citation: {
        id: '16061565',
        citationType: 'journal article',
        authors: [
          'McGillivray G.',
          'Savarirayan R.',
          'Cox T.C.',
          'Stojkoski C.',
          'McNeil R.',
          'Bankier A.',
          'Bateman J.F.',
          'Roscioli T.',
          'Gardner R.J.M.',
          'Lamande S.R.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '16061565' },
          { database: 'DOI', id: '10.1136/jmg.2004.027888' },
        ],
        title:
          'Familial scaphocephaly syndrome caused by a novel mutation in the FGFR2 tyrosine kinase domain.',
        publicationDate: '2005',
        journal: 'J. Med. Genet.',
        firstPage: '656',
        lastPage: '662',
        volume: '42',
      },
      referencePositions: ['VARIANT FSPC GLU-526'],
    },
    {
      citation: {
        id: '16501574',
        citationType: 'journal article',
        authors: [
          'Rohmann E.',
          'Brunner H.G.',
          'Kayserili H.',
          'Uyguner O.',
          'Nuernberg G.',
          'Lew E.D.',
          'Dobbie A.',
          'Eswarakumar V.P.',
          'Uzumcu A.',
          'Ulubil-Emeroglu M.',
          'Leroy J.G.',
          'Li Y.',
          'Becker C.',
          'Lehnerdt K.',
          'Cremers C.W.R.J.',
          'Yueksel-Apak M.',
          'Nuernberg P.',
          'Kubisch C.',
          'Schlessinger J.',
          'van Bokhoven H.',
          'Wollnik B.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '16501574' },
          { database: 'DOI', id: '10.1038/ng1757' },
        ],
        title:
          'Mutations in different components of FGF signaling in LADD syndrome.',
        publicationDate: '2006',
        journal: 'Nat. Genet.',
        firstPage: '414',
        lastPage: '417',
        volume: '38',
      },
      referencePositions: [
        'VARIANTS LADDS THR-628; THR-648 AND 649-ARG-ASP-650 DELINS SER',
      ],
    },
    {
      citation: {
        id: '16959974',
        citationType: 'journal article',
        authors: [
          'Sjoeblom T.',
          'Jones S.',
          'Wood L.D.',
          'Parsons D.W.',
          'Lin J.',
          'Barber T.D.',
          'Mandelker D.',
          'Leary R.J.',
          'Ptak J.',
          'Silliman N.',
          'Szabo S.',
          'Buckhaults P.',
          'Farrell C.',
          'Meeh P.',
          'Markowitz S.D.',
          'Willis J.',
          'Dawson D.',
          'Willson J.K.V.',
          'Gazdar A.F.',
          'Hartigan J.',
          'Wu L.',
          'Liu C.',
          'Parmigiani G.',
          'Park B.H.',
          'Bachman K.E.',
          'Papadopoulos N.',
          'Vogelstein B.',
          'Kinzler K.W.',
          'Velculescu V.E.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '16959974' },
          { database: 'DOI', id: '10.1126/science.1133427' },
        ],
        title:
          'The consensus coding sequences of human breast and colorectal cancers.',
        publicationDate: '2006',
        journal: 'Science',
        firstPage: '268',
        lastPage: '274',
        volume: '314',
      },
      referencePositions: ['VARIANT [LARGE SCALE ANALYSIS] CYS-203'],
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
          { database: 'PubMed', id: '17344846' },
          { database: 'DOI', id: '10.1038/nature05610' },
        ],
        title: 'Patterns of somatic mutation in human cancer genomes.',
        publicationDate: '2007',
        journal: 'Nature',
        firstPage: '153',
        lastPage: '158',
        volume: '446',
      },
      referencePositions: [
        'VARIANTS [LARGE SCALE ANALYSIS] LEU-57; THR-186; CYS-203; VAL-272; ASN-283; CYS-290 AND THR-612',
      ],
    },
    {
      citation: {
        id: '22387015',
        citationType: 'journal article',
        authors: [
          'Merrill A.E.',
          'Sarukhanov A.',
          'Krejci P.',
          'Idoni B.',
          'Camacho N.',
          'Estrada K.D.',
          'Lyons K.M.',
          'Deixler H.',
          'Robinson H.',
          'Chitayat D.',
          'Curry C.J.',
          'Lachman R.S.',
          'Wilcox W.R.',
          'Krakow D.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '22387015' },
          { database: 'DOI', id: '10.1016/j.ajhg.2012.02.005' },
        ],
        title:
          'Bent bone dysplasia-FGFR2 type, a distinct skeletal disorder, has deficient canonical FGF signaling.',
        publicationDate: '2012',
        journal: 'Am. J. Hum. Genet.',
        firstPage: '550',
        lastPage: '557',
        volume: '90',
      },
      referencePositions: [
        'VARIANTS BBDS ASP-381 AND ARG-391',
        'CHARACTERIZATION OF VARIANT BBDS ARG-391',
      ],
    },
    {
      citation: {
        id: '26429889',
        citationType: 'journal article',
        authors: [
          'Perles Z.',
          'Moon S.',
          'Ta-Shma A.',
          'Yaacov B.',
          'Francescatto L.',
          'Edvardson S.',
          'Rein A.J.',
          'Elpeleg O.',
          'Katsanis N.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '26429889' },
          { database: 'DOI', id: '10.1136/jmedgenet-2015-103336' },
        ],
        title:
          'A human laterality disorder caused by a homozygous deleterious mutation in MMP21.',
        publicationDate: '2015',
        journal: 'J. Med. Genet.',
        firstPage: '840',
        lastPage: '847',
        volume: '52',
      },
      referencePositions: ['VARIANT LEU-57'],
    },
  ],
  uniProtKBCrossReferences: [
    {
      database: 'EMBL',
      id: 'X52832',
      properties: [
        { key: 'ProteinId', value: 'CAA37014.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'mRNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M55614',
      properties: [
        { key: 'ProteinId', value: 'AAA61188.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'mRNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'X56191',
      properties: [
        { key: 'ProteinId', value: 'CAA39654.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'mRNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M35718',
      properties: [
        { key: 'ProteinId', value: 'AAA36152.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'mRNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M87770',
      properties: [
        { key: 'ProteinId', value: 'AAA59470.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'mRNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M87771',
      properties: [
        { key: 'ProteinId', value: 'AAA59471.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'mRNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M87772',
      properties: [
        { key: 'ProteinId', value: 'AAA59472.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'mRNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M97193',
      properties: [
        { key: 'ProteinId', value: 'AAA52449.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'mRNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'U11814',
      properties: [
        { key: 'ProteinId', value: 'AAA68514.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'mRNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M80634',
      properties: [
        { key: 'ProteinId', value: 'AAA36147.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'mRNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'Z71929',
      properties: [
        { key: 'ProteinId', value: 'CAA96492.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'mRNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AB030073',
      properties: [
        { key: 'ProteinId', value: 'BAA89296.1' },
        { key: 'Status', value: 'ALT_SEQ' },
        { key: 'MoleculeType', value: 'mRNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AB030074',
      properties: [
        { key: 'ProteinId', value: 'BAA89297.1' },
        { key: 'Status', value: 'ALT_SEQ' },
        { key: 'MoleculeType', value: 'mRNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AB030075',
      properties: [
        { key: 'ProteinId', value: 'BAA89298.1' },
        { key: 'Status', value: 'ALT_SEQ' },
        { key: 'MoleculeType', value: 'mRNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AB030076',
      properties: [
        { key: 'ProteinId', value: 'BAA89299.1' },
        { key: 'Status', value: 'ALT_SEQ' },
        { key: 'MoleculeType', value: 'mRNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AB030077',
      properties: [
        { key: 'ProteinId', value: 'BAA89300.1' },
        { key: 'Status', value: 'ALT_SEQ' },
        { key: 'MoleculeType', value: 'mRNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AB030078',
      properties: [
        { key: 'ProteinId', value: 'BAA89301.1' },
        { key: 'Status', value: 'ALT_SEQ' },
        { key: 'MoleculeType', value: 'mRNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AF360695',
      properties: [
        { key: 'ProteinId', value: 'AAK94205.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AF410480',
      properties: [
        { key: 'ProteinId', value: 'AAK94205.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AF360695',
      properties: [
        { key: 'ProteinId', value: 'AAK94206.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AF410480',
      properties: [
        { key: 'ProteinId', value: 'AAK94206.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AF360695',
      properties: [
        { key: 'ProteinId', value: 'AAK94207.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AF410480',
      properties: [
        { key: 'ProteinId', value: 'AAK94207.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AF360695',
      properties: [
        { key: 'ProteinId', value: 'AAK94208.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AF410480',
      properties: [
        { key: 'ProteinId', value: 'AAK94208.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AF360695',
      properties: [
        { key: 'ProteinId', value: 'AAK94209.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AF410480',
      properties: [
        { key: 'ProteinId', value: 'AAK94209.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AF487553',
      properties: [
        { key: 'ProteinId', value: 'AAM74056.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AB084153',
      properties: [
        { key: 'ProteinId', value: 'BAC45037.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'mRNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'DQ493927',
      properties: [
        { key: 'ProteinId', value: 'ABE96832.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AK294026',
      properties: [
        { key: 'ProteinId', value: 'BAG57383.1' },
        { key: 'Status', value: 'ALT_INIT' },
        { key: 'MoleculeType', value: 'mRNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AC009988',
      properties: [
        { key: 'ProteinId', value: '-' },
        { key: 'Status', value: 'NOT_ANNOTATED_CDS' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'BC039243',
      properties: [
        { key: 'ProteinId', value: 'AAH39243.2' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'mRNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AF169399',
      properties: [
        { key: 'ProteinId', value: 'AAF43273.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AF169399',
      properties: [
        { key: 'ProteinId', value: 'AAF43274.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AF097353',
      properties: [
        { key: 'ProteinId', value: 'AAD31560.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AF097341',
      properties: [
        { key: 'ProteinId', value: 'AAD31560.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AF097342',
      properties: [
        { key: 'ProteinId', value: 'AAD31560.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AF097343',
      properties: [
        { key: 'ProteinId', value: 'AAD31560.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AF097345',
      properties: [
        { key: 'ProteinId', value: 'AAD31560.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AF097346',
      properties: [
        { key: 'ProteinId', value: 'AAD31560.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AF097347',
      properties: [
        { key: 'ProteinId', value: 'AAD31560.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AF097348',
      properties: [
        { key: 'ProteinId', value: 'AAD31560.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AF097349',
      properties: [
        { key: 'ProteinId', value: 'AAD31560.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AF097350',
      properties: [
        { key: 'ProteinId', value: 'AAD31560.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AF097351',
      properties: [
        { key: 'ProteinId', value: 'AAD31560.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AF097352',
      properties: [
        { key: 'ProteinId', value: 'AAD31560.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AF097353',
      properties: [
        { key: 'ProteinId', value: 'AAD31561.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AF097341',
      properties: [
        { key: 'ProteinId', value: 'AAD31561.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AF097342',
      properties: [
        { key: 'ProteinId', value: 'AAD31561.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AF097344',
      properties: [
        { key: 'ProteinId', value: 'AAD31561.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AF097345',
      properties: [
        { key: 'ProteinId', value: 'AAD31561.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AF097346',
      properties: [
        { key: 'ProteinId', value: 'AAD31561.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AF097347',
      properties: [
        { key: 'ProteinId', value: 'AAD31561.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AF097348',
      properties: [
        { key: 'ProteinId', value: 'AAD31561.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AF097349',
      properties: [
        { key: 'ProteinId', value: 'AAD31561.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AF097350',
      properties: [
        { key: 'ProteinId', value: 'AAD31561.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AF097351',
      properties: [
        { key: 'ProteinId', value: 'AAD31561.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AF097352',
      properties: [
        { key: 'ProteinId', value: 'AAD31561.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AF097340',
      properties: [
        { key: 'ProteinId', value: 'AAD31562.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AF097337',
      properties: [
        { key: 'ProteinId', value: 'AAD31562.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AF097338',
      properties: [
        { key: 'ProteinId', value: 'AAD31562.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AF097339',
      properties: [
        { key: 'ProteinId', value: 'AAD31562.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AF097354',
      properties: [
        { key: 'ProteinId', value: 'AAD31565.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AF097341',
      properties: [
        { key: 'ProteinId', value: 'AAD31567.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'S82438',
      properties: [
        { key: 'ProteinId', value: 'AAD14392.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'Y17131',
      properties: [
        { key: 'ProteinId', value: 'CAA76643.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'L49237',
      properties: [
        { key: 'ProteinId', value: 'AAC41933.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'L49242',
      properties: [
        { key: 'ProteinId', value: 'AAC41934.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'L49238',
      properties: [
        { key: 'ProteinId', value: 'AAC41935.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'L49239',
      properties: [
        { key: 'ProteinId', value: 'AAC41936.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'L49240',
      properties: [
        { key: 'ProteinId', value: 'AAC41937.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'L49241',
      properties: [
        { key: 'ProteinId', value: 'AAC41938.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'CCDS',
      id: 'CCDS31298.1',
      properties: [{ key: 'Description', value: '-' }],
      isoformId: 'P21802-1',
    },
    {
      database: 'CCDS',
      id: 'CCDS44485.1',
      properties: [{ key: 'Description', value: '-' }],
      isoformId: 'P21802-20',
    },
    {
      database: 'CCDS',
      id: 'CCDS44486.1',
      properties: [{ key: 'Description', value: '-' }],
      isoformId: 'P21802-23',
    },
    {
      database: 'CCDS',
      id: 'CCDS44487.1',
      properties: [{ key: 'Description', value: '-' }],
      isoformId: 'P21802-15',
    },
    {
      database: 'CCDS',
      id: 'CCDS44488.1',
      properties: [{ key: 'Description', value: '-' }],
      isoformId: 'P21802-22',
    },
    {
      database: 'CCDS',
      id: 'CCDS44489.1',
      properties: [{ key: 'Description', value: '-' }],
      isoformId: 'P21802-17',
    },
    {
      database: 'CCDS',
      id: 'CCDS53584.1',
      properties: [{ key: 'Description', value: '-' }],
      isoformId: 'P21802-21',
    },
    {
      database: 'CCDS',
      id: 'CCDS7620.2',
      properties: [{ key: 'Description', value: '-' }],
      isoformId: 'P21802-3',
    },
    {
      database: 'CCDS',
      id: 'CCDS81515.1',
      properties: [{ key: 'Description', value: '-' }],
      isoformId: 'P21802-5',
    },
    {
      database: 'PIR',
      id: 'A35969',
      properties: [{ key: 'EntryName', value: 'A35969' }],
    },
    {
      database: 'PIR',
      id: 'A42691',
      properties: [{ key: 'EntryName', value: 'TVHUF2' }],
    },
    {
      database: 'PIR',
      id: 'A45081',
      properties: [{ key: 'EntryName', value: 'A45081' }],
    },
    {
      database: 'PIR',
      id: 'C42691',
      properties: [{ key: 'EntryName', value: 'C42691' }],
    },
    {
      database: 'PIR',
      id: 'S16236',
      properties: [{ key: 'EntryName', value: 'S16236' }],
    },
    {
      database: 'RefSeq',
      id: 'NP_000132.3',
      properties: [{ key: 'NucleotideSequenceId', value: 'NM_000141.4' }],
      isoformId: 'P21802-1',
    },
    {
      database: 'RefSeq',
      id: 'NP_001138385.1',
      properties: [{ key: 'NucleotideSequenceId', value: 'NM_001144913.1' }],
      isoformId: 'P21802-17',
    },
    {
      database: 'RefSeq',
      id: 'NP_001138386.1',
      properties: [{ key: 'NucleotideSequenceId', value: 'NM_001144914.1' }],
      isoformId: 'P21802-23',
    },
    {
      database: 'RefSeq',
      id: 'NP_001138387.1',
      properties: [{ key: 'NucleotideSequenceId', value: 'NM_001144915.1' }],
      isoformId: 'P21802-21',
    },
    {
      database: 'RefSeq',
      id: 'NP_001138388.1',
      properties: [{ key: 'NucleotideSequenceId', value: 'NM_001144916.1' }],
    },
    {
      database: 'RefSeq',
      id: 'NP_001138389.1',
      properties: [{ key: 'NucleotideSequenceId', value: 'NM_001144917.1' }],
      isoformId: 'P21802-15',
    },
    {
      database: 'RefSeq',
      id: 'NP_001138390.1',
      properties: [{ key: 'NucleotideSequenceId', value: 'NM_001144918.1' }],
      isoformId: 'P21802-20',
    },
    {
      database: 'RefSeq',
      id: 'NP_001138391.1',
      properties: [{ key: 'NucleotideSequenceId', value: 'NM_001144919.1' }],
      isoformId: 'P21802-22',
    },
    {
      database: 'RefSeq',
      id: 'NP_001307583.1',
      properties: [{ key: 'NucleotideSequenceId', value: 'NM_001320654.1' }],
    },
    {
      database: 'RefSeq',
      id: 'NP_001307587.1',
      properties: [{ key: 'NucleotideSequenceId', value: 'NM_001320658.1' }],
      isoformId: 'P21802-5',
    },
    {
      database: 'RefSeq',
      id: 'NP_075259.4',
      properties: [{ key: 'NucleotideSequenceId', value: 'NM_022970.3' }],
      isoformId: 'P21802-3',
    },
    {
      database: 'RefSeq',
      id: 'NP_075418.1',
      properties: [{ key: 'NucleotideSequenceId', value: 'NM_023029.2' }],
    },
    {
      database: 'PDB',
      id: '1DJS',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.40 A' },
        { key: 'Chains', value: 'A=153-362' },
      ],
    },
    {
      database: 'PDB',
      id: '1E0O',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.80 A' },
        { key: 'Chains', value: 'B/D=148-366' },
      ],
    },
    {
      database: 'PDB',
      id: '1EV2',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.20 A' },
        { key: 'Chains', value: 'E/F/G/H=147-366' },
      ],
    },
    {
      database: 'PDB',
      id: '1GJO',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.40 A' },
        { key: 'Chains', value: 'A=456-768' },
      ],
    },
    {
      database: 'PDB',
      id: '1II4',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.70 A' },
        { key: 'Chains', value: 'E/F/G/H=147-366' },
      ],
    },
    {
      database: 'PDB',
      id: '1IIL',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.30 A' },
        { key: 'Chains', value: 'E/F/G/H=147-366' },
      ],
    },
    {
      database: 'PDB',
      id: '1NUN',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.90 A' },
        { key: 'Chains', value: 'B=140-368' },
      ],
    },
    {
      database: 'PDB',
      id: '1OEC',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.40 A' },
        { key: 'Chains', value: 'A=456-768' },
      ],
    },
    {
      database: 'PDB',
      id: '1WVZ',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A=147-249' },
      ],
    },
    {
      database: 'PDB',
      id: '2FDB',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.28 A' },
        { key: 'Chains', value: 'P/R=149-368' },
      ],
    },
    {
      database: 'PDB',
      id: '2PSQ',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.40 A' },
        { key: 'Chains', value: 'A/B=413-768' },
      ],
    },
    {
      database: 'PDB',
      id: '2PVF',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '1.80 A' },
        { key: 'Chains', value: 'A=458-778, B=764-778' },
      ],
    },
    {
      database: 'PDB',
      id: '2PVY',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.20 A' },
        { key: 'Chains', value: 'A/B/C/D=458-768' },
      ],
    },
    {
      database: 'PDB',
      id: '2PWL',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.40 A' },
        { key: 'Chains', value: 'A/B=458-768' },
      ],
    },
    {
      database: 'PDB',
      id: '2PY3',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.30 A' },
        { key: 'Chains', value: 'A/B=458-768' },
      ],
    },
    {
      database: 'PDB',
      id: '2PZ5',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.40 A' },
        { key: 'Chains', value: 'A/B=458-768' },
      ],
    },
    {
      database: 'PDB',
      id: '2PZP',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.40 A' },
        { key: 'Chains', value: 'A/B=458-768' },
      ],
    },
    {
      database: 'PDB',
      id: '2PZR',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '3.00 A' },
        { key: 'Chains', value: 'A/B=458-768' },
      ],
    },
    {
      database: 'PDB',
      id: '2Q0B',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.90 A' },
        { key: 'Chains', value: 'A/B=458-768' },
      ],
    },
    {
      database: 'PDB',
      id: '3B2T',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '1.80 A' },
        { key: 'Chains', value: 'A/B=458-766' },
      ],
    },
    {
      database: 'PDB',
      id: '3CAF',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '1.96 A' },
        { key: 'Chains', value: 'A=150-249' },
      ],
    },
    {
      database: 'PDB',
      id: '3CLY',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.00 A' },
        { key: 'Chains', value: 'A=458-778' },
      ],
    },
    {
      database: 'PDB',
      id: '3CU1',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.60 A' },
        { key: 'Chains', value: 'A/C=150-249' },
      ],
    },
    {
      database: 'PDB',
      id: '3DAR',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.20 A' },
        { key: 'Chains', value: 'A/B=146-249' },
      ],
    },
    {
      database: 'PDB',
      id: '3EUU',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.34 A' },
        { key: 'Chains', value: 'A/B=150-249' },
      ],
    },
    {
      database: 'PDB',
      id: '3OJ2',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.20 A' },
        { key: 'Chains', value: 'C/D=140-313' },
      ],
    },
    {
      database: 'PDB',
      id: '3OJM',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.10 A' },
        { key: 'Chains', value: 'B=140-313' },
      ],
    },
    {
      database: 'PDB',
      id: '3RI1',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.10 A' },
        { key: 'Chains', value: 'A/B=458-768' },
      ],
    },
    {
      database: 'PDB',
      id: '4J23',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '3.88 A' },
        { key: 'Chains', value: 'A=147-366' },
      ],
    },
    {
      database: 'PDB',
      id: '4J95',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.38 A' },
        { key: 'Chains', value: 'A/B/C/D=458-768' },
      ],
    },
    {
      database: 'PDB',
      id: '4J96',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.30 A' },
        { key: 'Chains', value: 'A/B=458-768' },
      ],
    },
    {
      database: 'PDB',
      id: '4J97',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.55 A' },
        { key: 'Chains', value: 'A/B/C/D=458-768' },
      ],
    },
    {
      database: 'PDB',
      id: '4J98',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.31 A' },
        { key: 'Chains', value: 'A/B=458-768' },
      ],
    },
    {
      database: 'PDB',
      id: '4J99',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '1.85 A' },
        { key: 'Chains', value: 'A/B/C/D=458-768' },
      ],
    },
    {
      database: 'PDB',
      id: '4WV1',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.36 A' },
        { key: 'Chains', value: 'C/F=153-251' },
      ],
    },
    {
      database: 'PDB',
      id: '5EG3',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.61 A' },
        { key: 'Chains', value: 'A=458-778' },
      ],
    },
    {
      database: 'PDB',
      id: '5UGL',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '1.86 A' },
        { key: 'Chains', value: 'A/B=458-768' },
      ],
    },
    {
      database: 'PDB',
      id: '5UGX',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.35 A' },
        { key: 'Chains', value: 'A/B=458-768' },
      ],
    },
    {
      database: 'PDB',
      id: '5UHN',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.91 A' },
        { key: 'Chains', value: 'A/B=458-768' },
      ],
    },
    {
      database: 'PDB',
      id: '5UI0',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.05 A' },
        { key: 'Chains', value: 'A/B=458-768' },
      ],
    },
    {
      database: 'PDB',
      id: '6AGX',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.95 A' },
        { key: 'Chains', value: 'A/B/C/D=467-764' },
      ],
    },
    {
      database: 'PDB',
      id: '6LVK',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.29 A' },
        { key: 'Chains', value: 'A/B=459-768' },
      ],
    },
    {
      database: 'PDB',
      id: '6LVL',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.98 A' },
        { key: 'Chains', value: 'A/B=459-768' },
      ],
    },
    {
      database: 'PDB',
      id: '6V6Q',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.46 A' },
        { key: 'Chains', value: 'A/B/C/D=413-821' },
      ],
    },
    {
      database: 'PDBsum',
      id: '1DJS',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '1E0O',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '1EV2',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '1GJO',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '1II4',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '1IIL',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '1NUN',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '1OEC',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '1WVZ',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '2FDB',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '2PSQ',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '2PVF',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '2PVY',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '2PWL',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '2PY3',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '2PZ5',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '2PZP',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '2PZR',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '2Q0B',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '3B2T',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '3CAF',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '3CLY',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '3CU1',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '3DAR',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '3EUU',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '3OJ2',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '3OJM',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '3RI1',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '4J23',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '4J95',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '4J96',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '4J97',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '4J98',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '4J99',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '4WV1',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '5EG3',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '5UGL',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '5UGX',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '5UHN',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '5UI0',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '6AGX',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '6LVK',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '6LVL',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '6V6Q',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'BMRB',
      id: 'P21802',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'SMR',
      id: 'P21802',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'BioGRID',
      id: '108554',
      properties: [{ key: 'Interactions', value: '104' }],
    },
    {
      database: 'CORUM',
      id: 'P21802',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'DIP',
      id: 'DIP-3788N',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'IntAct',
      id: 'P21802',
      properties: [{ key: 'Interactions', value: '89' }],
    },
    {
      database: 'MINT',
      id: 'P21802',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'STRING',
      id: '9606.ENSP00000410294',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'BindingDB',
      id: 'P21802',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'ChEMBL',
      id: 'CHEMBL4142',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'DrugBank',
      id: 'DB02058',
      properties: [
        {
          key: 'GenericName',
          value: '3-[4-(1-formylpiperazin-4-yl)-benzylidenyl]-2-indolinone',
        },
      ],
    },
    {
      database: 'DrugBank',
      id: 'DB02491',
      properties: [
        {
          key: 'GenericName',
          value:
            '4-[4-(1-Amino-1-Methylethyl)Phenyl]-5-Chloro-N-[4-(2-Morpholin-4-Ylethyl)Phenyl]Pyrimidin-2-Amine',
        },
      ],
    },
    {
      database: 'DrugBank',
      id: 'DB12147',
      properties: [{ key: 'GenericName', value: 'Erdafitinib' }],
    },
    {
      database: 'DrugBank',
      id: 'DB10770',
      properties: [
        { key: 'GenericName', value: 'Foreskin fibroblast (neonatal)' },
      ],
    },
    {
      database: 'DrugBank',
      id: 'DB10772',
      properties: [
        { key: 'GenericName', value: 'Foreskin keratinocyte (neonatal)' },
      ],
    },
    {
      database: 'DrugBank',
      id: 'DB12010',
      properties: [{ key: 'GenericName', value: 'Fostamatinib' }],
    },
    {
      database: 'DrugBank',
      id: 'DB01109',
      properties: [{ key: 'GenericName', value: 'Heparin' }],
    },
    {
      database: 'DrugBank',
      id: 'DB09078',
      properties: [{ key: 'GenericName', value: 'Lenvatinib' }],
    },
    {
      database: 'DrugBank',
      id: 'DB09079',
      properties: [{ key: 'GenericName', value: 'Nintedanib' }],
    },
    {
      database: 'DrugBank',
      id: 'DB00039',
      properties: [{ key: 'GenericName', value: 'Palifermin' }],
    },
    {
      database: 'DrugBank',
      id: 'DB15102',
      properties: [{ key: 'GenericName', value: 'Pemigatinib' }],
    },
    {
      database: 'DrugBank',
      id: 'DB08901',
      properties: [{ key: 'GenericName', value: 'Ponatinib' }],
    },
    {
      database: 'DrugBank',
      id: 'DB15822',
      properties: [{ key: 'GenericName', value: 'Pralsetinib' }],
    },
    {
      database: 'DrugBank',
      id: 'DB08896',
      properties: [{ key: 'GenericName', value: 'Regorafenib' }],
    },
    {
      database: 'DrugBank',
      id: 'DB15685',
      properties: [{ key: 'GenericName', value: 'Selpercatinib' }],
    },
    {
      database: 'DrugBank',
      id: 'DB01901',
      properties: [{ key: 'GenericName', value: 'Sucrosofate' }],
    },
    {
      database: 'DrugBank',
      id: 'DB01041',
      properties: [{ key: 'GenericName', value: 'Thalidomide' }],
    },
    {
      database: 'DrugCentral',
      id: 'P21802',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'GuidetoPHARMACOLOGY',
      id: '1809',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'GlyConnect',
      id: '1997',
      properties: [
        { key: 'glycosylation', value: '1 N-Linked glycan (1 site)' },
      ],
    },
    {
      database: 'GlyGen',
      id: 'P21802',
      properties: [
        { key: 'Description', value: '9 sites, 1 O-linked glycan (1 site)' },
      ],
    },
    {
      database: 'iPTMnet',
      id: 'P21802',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PhosphoSitePlus',
      id: 'P21802',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'BioMuta',
      id: 'FGFR2',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'DMDM',
      id: '120049',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'jPOST',
      id: 'P21802',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'MassIVE',
      id: 'P21802',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PaxDb',
      id: 'P21802',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PeptideAtlas',
      id: 'P21802',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PRIDE',
      id: 'P21802',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'ProteomicsDB',
      id: '53905',
      properties: [{ key: 'Description', value: '-' }],
      isoformId: 'P21802-1',
    },
    {
      database: 'ProteomicsDB',
      id: '53910',
      properties: [{ key: 'Description', value: '-' }],
      isoformId: 'P21802-14',
    },
    {
      database: 'ProteomicsDB',
      id: '53911',
      properties: [{ key: 'Description', value: '-' }],
      isoformId: 'P21802-15',
    },
    {
      database: 'ProteomicsDB',
      id: '53912',
      properties: [{ key: 'Description', value: '-' }],
      isoformId: 'P21802-16',
    },
    {
      database: 'ProteomicsDB',
      id: '53913',
      properties: [{ key: 'Description', value: '-' }],
      isoformId: 'P21802-17',
    },
    {
      database: 'ProteomicsDB',
      id: '53914',
      properties: [{ key: 'Description', value: '-' }],
      isoformId: 'P21802-18',
    },
    {
      database: 'ProteomicsDB',
      id: '53915',
      properties: [{ key: 'Description', value: '-' }],
      isoformId: 'P21802-19',
    },
    {
      database: 'ProteomicsDB',
      id: '53916',
      properties: [{ key: 'Description', value: '-' }],
      isoformId: 'P21802-2',
    },
    {
      database: 'ProteomicsDB',
      id: '53917',
      properties: [{ key: 'Description', value: '-' }],
      isoformId: 'P21802-20',
    },
    {
      database: 'ProteomicsDB',
      id: '53918',
      properties: [{ key: 'Description', value: '-' }],
      isoformId: 'P21802-21',
    },
    {
      database: 'ProteomicsDB',
      id: '53919',
      properties: [{ key: 'Description', value: '-' }],
      isoformId: 'P21802-22',
    },
    {
      database: 'ProteomicsDB',
      id: '53920',
      properties: [{ key: 'Description', value: '-' }],
      isoformId: 'P21802-23',
    },
    {
      database: 'ProteomicsDB',
      id: '53921',
      properties: [{ key: 'Description', value: '-' }],
      isoformId: 'P21802-3',
    },
    {
      database: 'ProteomicsDB',
      id: '53922',
      properties: [{ key: 'Description', value: '-' }],
      isoformId: 'P21802-4',
    },
    {
      database: 'ProteomicsDB',
      id: '53923',
      properties: [{ key: 'Description', value: '-' }],
      isoformId: 'P21802-5',
    },
    {
      database: 'ProteomicsDB',
      id: '53924',
      properties: [{ key: 'Description', value: '-' }],
      isoformId: 'P21802-6',
    },
    {
      database: 'ProteomicsDB',
      id: '53926',
      properties: [{ key: 'Description', value: '-' }],
      isoformId: 'P21802-8',
    },
    {
      database: 'TopDownProteomics',
      id: 'P21802-8',
      properties: [{ key: 'Description', value: '-' }],
      isoformId: 'P21802-8',
    },
    {
      database: 'ABCD',
      id: 'P21802',
      properties: [{ key: 'Description', value: '5 sequenced antibodies' }],
    },
    {
      database: 'Antibodypedia',
      id: '4393',
      properties: [{ key: 'antibodies', value: '1265 antibodies' }],
    },
    {
      database: 'Ensembl',
      id: 'ENST00000346997',
      properties: [
        { key: 'ProteinId', value: 'ENSP00000263451' },
        { key: 'GeneId', value: 'ENSG00000066468' },
      ],
      isoformId: 'P21802-5',
    },
    {
      database: 'Ensembl',
      id: 'ENST00000356226',
      properties: [
        { key: 'ProteinId', value: 'ENSP00000348559' },
        { key: 'GeneId', value: 'ENSG00000066468' },
      ],
      isoformId: 'P21802-20',
    },
    {
      database: 'Ensembl',
      id: 'ENST00000357555',
      properties: [
        { key: 'ProteinId', value: 'ENSP00000350166' },
        { key: 'GeneId', value: 'ENSG00000066468' },
      ],
      isoformId: 'P21802-21',
    },
    {
      database: 'Ensembl',
      id: 'ENST00000358487',
      properties: [
        { key: 'ProteinId', value: 'ENSP00000351276' },
        { key: 'GeneId', value: 'ENSG00000066468' },
      ],
      isoformId: 'P21802-1',
    },
    {
      database: 'Ensembl',
      id: 'ENST00000359354',
      properties: [
        { key: 'ProteinId', value: 'ENSP00000352309' },
        { key: 'GeneId', value: 'ENSG00000066468' },
      ],
      isoformId: 'P21802-14',
    },
    {
      database: 'Ensembl',
      id: 'ENST00000360144',
      properties: [
        { key: 'ProteinId', value: 'ENSP00000353262' },
        { key: 'GeneId', value: 'ENSG00000066468' },
      ],
      isoformId: 'P21802-22',
    },
    {
      database: 'Ensembl',
      id: 'ENST00000369056',
      properties: [
        { key: 'ProteinId', value: 'ENSP00000358052' },
        { key: 'GeneId', value: 'ENSG00000066468' },
      ],
      isoformId: 'P21802-17',
    },
    {
      database: 'Ensembl',
      id: 'ENST00000369060',
      properties: [
        { key: 'ProteinId', value: 'ENSP00000358056' },
        { key: 'GeneId', value: 'ENSG00000066468' },
      ],
      isoformId: 'P21802-15',
    },
    {
      database: 'Ensembl',
      id: 'ENST00000369061',
      properties: [
        { key: 'ProteinId', value: 'ENSP00000358057' },
        { key: 'GeneId', value: 'ENSG00000066468' },
      ],
      isoformId: 'P21802-23',
    },
    {
      database: 'Ensembl',
      id: 'ENST00000457416',
      properties: [
        { key: 'ProteinId', value: 'ENSP00000410294' },
        { key: 'GeneId', value: 'ENSG00000066468' },
      ],
      isoformId: 'P21802-3',
    },
    {
      database: 'GeneID',
      id: '2263',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'KEGG',
      id: 'hsa:2263',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'UCSC',
      id: 'uc010qtl.3',
      properties: [{ key: 'OrganismName', value: 'human' }],
      isoformId: 'P21802-1',
    },
    {
      database: 'CTD',
      id: '2263',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'DisGeNET',
      id: '2263',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'GeneCards',
      id: 'FGFR2',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'GeneReviews',
      id: 'FGFR2',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'HGNC',
      id: 'HGNC:3689',
      properties: [{ key: 'GeneName', value: 'FGFR2' }],
    },
    {
      database: 'HPA',
      id: 'ENSG00000066468',
      properties: [{ key: 'Description', value: 'Tissue enhanced (brain)' }],
    },
    {
      database: 'MalaCards',
      id: 'FGFR2',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'MIM',
      id: '101200',
      properties: [{ key: 'Type', value: 'phenotype' }],
    },
    {
      database: 'MIM',
      id: '101400',
      properties: [{ key: 'Type', value: 'phenotype' }],
    },
    {
      database: 'MIM',
      id: '101600',
      properties: [{ key: 'Type', value: 'phenotype' }],
    },
    {
      database: 'MIM',
      id: '123150',
      properties: [{ key: 'Type', value: 'phenotype' }],
    },
    {
      database: 'MIM',
      id: '123500',
      properties: [{ key: 'Type', value: 'phenotype' }],
    },
    {
      database: 'MIM',
      id: '123790',
      properties: [{ key: 'Type', value: 'phenotype' }],
    },
    {
      database: 'MIM',
      id: '149730',
      properties: [{ key: 'Type', value: 'phenotype' }],
    },
    {
      database: 'MIM',
      id: '176943',
      properties: [{ key: 'Type', value: 'gene' }],
    },
    {
      database: 'MIM',
      id: '207410',
      properties: [{ key: 'Type', value: 'phenotype' }],
    },
    {
      database: 'MIM',
      id: '609579',
      properties: [{ key: 'Type', value: 'phenotype' }],
    },
    {
      database: 'MIM',
      id: '614592',
      properties: [{ key: 'Type', value: 'phenotype' }],
    },
    {
      database: 'neXtProt',
      id: 'NX_P21802',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'OpenTargets',
      id: 'ENSG00000066468',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'Orphanet',
      id: '83',
      properties: [{ key: 'Disease', value: 'Antley-Bixler syndrome' }],
    },
    {
      database: 'Orphanet',
      id: '87',
      properties: [{ key: 'Disease', value: 'Apert syndrome' }],
    },
    {
      database: 'Orphanet',
      id: '207',
      properties: [{ key: 'Disease', value: 'Crouzon disease' }],
    },
    {
      database: 'Orphanet',
      id: '1555',
      properties: [
        {
          key: 'Disease',
          value: 'Cutis gyrata-acanthosis nigricans-craniosynostosis syndrome',
        },
      ],
    },
    {
      database: 'Orphanet',
      id: '168624',
      properties: [
        {
          key: 'Disease',
          value: 'Familial scaphocephaly syndrome, McGillivray type',
        },
      ],
    },
    {
      database: 'Orphanet',
      id: '313855',
      properties: [
        { key: 'Disease', value: 'FGFR2-related bent bone dysplasia' },
      ],
    },
    {
      database: 'Orphanet',
      id: '1540',
      properties: [{ key: 'Disease', value: 'Jackson-Weiss syndrome' }],
    },
    {
      database: 'Orphanet',
      id: '2363',
      properties: [
        { key: 'Disease', value: 'Lacrimoauriculodentodigital syndrome' },
      ],
    },
    {
      database: 'Orphanet',
      id: '93258',
      properties: [{ key: 'Disease', value: 'Pfeiffer syndrome type 1' }],
    },
    {
      database: 'Orphanet',
      id: '93259',
      properties: [{ key: 'Disease', value: 'Pfeiffer syndrome type 2' }],
    },
    {
      database: 'Orphanet',
      id: '93260',
      properties: [{ key: 'Disease', value: 'Pfeiffer syndrome type 3' }],
    },
    {
      database: 'Orphanet',
      id: '794',
      properties: [{ key: 'Disease', value: 'Saethre-Chotzen syndrome' }],
    },
    {
      database: 'PharmGKB',
      id: 'PA28128',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'VEuPathDB',
      id: 'HostDB:ENSG00000066468.20',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'eggNOG',
      id: 'KOG0200',
      properties: [{ key: 'ToxonomicScope', value: 'Eukaryota' }],
    },
    {
      database: 'GeneTree',
      id: 'ENSGT00940000155447',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'HOGENOM',
      id: 'CLU_000288_74_2_1',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'InParanoid',
      id: 'P21802',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'OMA',
      id: 'HIEKNGS',
      properties: [{ key: 'Fingerprint', value: '-' }],
    },
    {
      database: 'OrthoDB',
      id: '543832at2759',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PhylomeDB',
      id: 'P21802',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'TreeFam',
      id: 'TF316307',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'BRENDA',
      id: '2.7.10.1',
      properties: [{ key: 'OrganismId', value: '2681' }],
    },
    {
      database: 'PathwayCommons',
      id: 'P21802',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'Reactome',
      id: 'R-HSA-109704',
      properties: [{ key: 'PathwayName', value: 'PI3K Cascade' }],
    },
    {
      database: 'Reactome',
      id: 'R-HSA-1257604',
      properties: [
        { key: 'PathwayName', value: 'PIP3 activates AKT signaling' },
      ],
    },
    {
      database: 'Reactome',
      id: 'R-HSA-190375',
      properties: [
        { key: 'PathwayName', value: 'FGFR2c ligand binding and activation' },
      ],
    },
    {
      database: 'Reactome',
      id: 'R-HSA-190377',
      properties: [
        { key: 'PathwayName', value: 'FGFR2b ligand binding and activation' },
      ],
    },
    {
      database: 'Reactome',
      id: 'R-HSA-2023837',
      properties: [
        {
          key: 'PathwayName',
          value: 'Signaling by FGFR2 amplification mutants',
        },
      ],
    },
    {
      database: 'Reactome',
      id: 'R-HSA-2033519',
      properties: [
        { key: 'PathwayName', value: 'Activated point mutants of FGFR2' },
      ],
    },
    {
      database: 'Reactome',
      id: 'R-HSA-2219530',
      properties: [
        {
          key: 'PathwayName',
          value: 'Constitutive Signaling by Aberrant PI3K in Cancer',
        },
      ],
    },
    {
      database: 'Reactome',
      id: 'R-HSA-5654221',
      properties: [
        {
          key: 'PathwayName',
          value: 'Phospholipase C-mediated cascade, FGFR2',
        },
      ],
    },
    {
      database: 'Reactome',
      id: 'R-HSA-5654695',
      properties: [{ key: 'PathwayName', value: 'PI-3K cascade:FGFR2' }],
    },
    {
      database: 'Reactome',
      id: 'R-HSA-5654699',
      properties: [{ key: 'PathwayName', value: 'SHC-mediated cascade:FGFR2' }],
    },
    {
      database: 'Reactome',
      id: 'R-HSA-5654700',
      properties: [
        { key: 'PathwayName', value: 'FRS-mediated FGFR2 signaling' },
      ],
    },
    {
      database: 'Reactome',
      id: 'R-HSA-5654727',
      properties: [
        { key: 'PathwayName', value: 'Negative regulation of FGFR2 signaling' },
      ],
    },
    {
      database: 'Reactome',
      id: 'R-HSA-5655253',
      properties: [
        { key: 'PathwayName', value: 'Signaling by FGFR2 in disease' },
      ],
    },
    {
      database: 'Reactome',
      id: 'R-HSA-5673001',
      properties: [{ key: 'PathwayName', value: 'RAF/MAP kinase cascade' }],
    },
    {
      database: 'Reactome',
      id: 'R-HSA-6811558',
      properties: [
        {
          key: 'PathwayName',
          value: 'PI5P, PP2A and IER3 Regulate PI3K/AKT Signaling',
        },
      ],
    },
    {
      database: 'Reactome',
      id: 'R-HSA-8851708',
      properties: [{ key: 'PathwayName', value: 'Signaling by FGFR2 IIIa TM' }],
    },
    {
      database: 'Reactome',
      id: 'R-HSA-8853333',
      properties: [{ key: 'PathwayName', value: 'Signaling by FGFR2 fusions' }],
    },
    {
      database: 'SignaLink',
      id: 'P21802',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'SIGNOR',
      id: 'P21802',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'BioGRID-ORCS',
      id: '2263',
      properties: [{ key: 'hits', value: '17 hits in 1012 CRISPR screens' }],
    },
    {
      database: 'ChiTaRS',
      id: 'FGFR2',
      properties: [{ key: 'OrganismName', value: 'human' }],
    },
    {
      database: 'EvolutionaryTrace',
      id: 'P21802',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'GeneWiki',
      id: 'Fibroblast_growth_factor_receptor_2',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'GenomeRNAi',
      id: '2263',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'Pharos',
      id: 'P21802',
      properties: [{ key: 'Description', value: 'Tclin' }],
    },
    {
      database: 'PRO',
      id: 'PR:P21802',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'Proteomes',
      id: 'UP000005640',
      properties: [{ key: 'Component', value: 'Chromosome 10' }],
    },
    {
      database: 'RNAct',
      id: 'P21802',
      properties: [{ key: 'moleculeType', value: 'protein' }],
    },
    {
      database: 'Bgee',
      id: 'ENSG00000066468',
      properties: [
        {
          key: 'ExpressionPatterns',
          value:
            'Expressed in C1 segment of cervical spinal cord and 235 other tissues',
        },
      ],
    },
    {
      database: 'ExpressionAtlas',
      id: 'P21802',
      properties: [
        { key: 'ExpressionPatterns', value: 'baseline and differential' },
      ],
    },
    {
      database: 'Genevisible',
      id: 'P21802',
      properties: [{ key: 'OrganismId', value: 'HS' }],
    },
    {
      database: 'GO',
      id: 'GO:0005938',
      properties: [
        { key: 'GoTerm', value: 'C:cell cortex' },
        { key: 'GoEvidenceType', value: 'IDA:UniProtKB' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '17471512' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0009986',
      properties: [
        { key: 'GoTerm', value: 'C:cell surface' },
        { key: 'GoEvidenceType', value: 'IDA:UniProtKB' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '16597614' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0005737',
      properties: [
        { key: 'GoTerm', value: 'C:cytoplasm' },
        { key: 'GoEvidenceType', value: 'IDA:UniProtKB' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '16597614' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '17471512' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0031410',
      properties: [
        { key: 'GoTerm', value: 'C:cytoplasmic vesicle' },
        { key: 'GoEvidenceType', value: 'IEA:UniProtKB-KW' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0060076',
      properties: [
        { key: 'GoTerm', value: 'C:excitatory synapse' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0005576',
      properties: [
        { key: 'GoTerm', value: 'C:extracellular region' },
        { key: 'GoEvidenceType', value: 'IEA:UniProtKB-SubCell' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0005794',
      properties: [
        { key: 'GoTerm', value: 'C:Golgi apparatus' },
        { key: 'GoEvidenceType', value: 'IEA:UniProtKB-SubCell' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0016021',
      properties: [
        { key: 'GoTerm', value: 'C:integral component of membrane' },
        { key: 'GoEvidenceType', value: 'NAS:UniProtKB' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '1697263' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0005887',
      properties: [
        { key: 'GoTerm', value: 'C:integral component of plasma membrane' },
        { key: 'GoEvidenceType', value: 'IDA:UniProtKB' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '15629145' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '16844695' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0016020',
      properties: [
        { key: 'GoTerm', value: 'C:membrane' },
        { key: 'GoEvidenceType', value: 'NAS:UniProtKB' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8676562' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0005634',
      properties: [
        { key: 'GoTerm', value: 'C:nucleus' },
        { key: 'GoEvidenceType', value: 'IDA:UniProtKB' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '16597614' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '17471512' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0005886',
      properties: [
        { key: 'GoTerm', value: 'C:plasma membrane' },
        { key: 'GoEvidenceType', value: 'TAS:Reactome' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0043235',
      properties: [
        { key: 'GoTerm', value: 'C:receptor complex' },
        { key: 'GoEvidenceType', value: 'IBA:GO_Central' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '21873635' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0005524',
      properties: [
        { key: 'GoTerm', value: 'F:ATP binding' },
        { key: 'GoEvidenceType', value: 'IEA:UniProtKB-KW' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0017134',
      properties: [
        { key: 'GoTerm', value: 'F:fibroblast growth factor binding' },
        { key: 'GoEvidenceType', value: 'IDA:UniProtKB' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8663044' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0005007',
      properties: [
        {
          key: 'GoTerm',
          value: 'F:fibroblast growth factor-activated receptor activity',
        },
        { key: 'GoEvidenceType', value: 'IDA:UniProtKB' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '15629145' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8663044' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0008201',
      properties: [
        { key: 'GoTerm', value: 'F:heparin binding' },
        { key: 'GoEvidenceType', value: 'IEA:UniProtKB-KW' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0042802',
      properties: [
        { key: 'GoTerm', value: 'F:identical protein binding' },
        { key: 'GoEvidenceType', value: 'IPI:IntAct' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0042803',
      properties: [
        { key: 'GoTerm', value: 'F:protein homodimerization activity' },
        { key: 'GoEvidenceType', value: 'IPI:UniProtKB' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '16844695' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0004713',
      properties: [
        { key: 'GoTerm', value: 'F:protein tyrosine kinase activity' },
        { key: 'GoEvidenceType', value: 'NAS:UniProtKB' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '1697263' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0004714',
      properties: [
        {
          key: 'GoTerm',
          value: 'F:transmembrane receptor protein tyrosine kinase activity',
        },
        { key: 'GoEvidenceType', value: 'IBA:GO_Central' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '21873635' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0001525',
      properties: [
        { key: 'GoTerm', value: 'P:angiogenesis' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0009887',
      properties: [
        { key: 'GoTerm', value: 'P:animal organ morphogenesis' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0006915',
      properties: [
        { key: 'GoTerm', value: 'P:apoptotic process' },
        { key: 'GoEvidenceType', value: 'IEA:UniProtKB-KW' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0007409',
      properties: [
        { key: 'GoTerm', value: 'P:axonogenesis' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0060348',
      properties: [
        { key: 'GoTerm', value: 'P:bone development' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0030282',
      properties: [
        { key: 'GoTerm', value: 'P:bone mineralization' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0060349',
      properties: [
        { key: 'GoTerm', value: 'P:bone morphogenesis' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0060667',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:branch elongation involved in salivary gland morphogenesis',
        },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0060670',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:branching involved in labyrinthine layer morphogenesis',
        },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0060442',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:branching involved in prostate gland morphogenesis',
        },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0060445',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:branching involved in salivary gland morphogenesis',
        },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0048755',
      properties: [
        { key: 'GoTerm', value: 'P:branching morphogenesis of a nerve' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0060449',
      properties: [
        { key: 'GoTerm', value: 'P:bud elongation involved in lung branching' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0045165',
      properties: [
        { key: 'GoTerm', value: 'P:cell fate commitment' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0007267',
      properties: [
        { key: 'GoTerm', value: 'P:cell-cell signaling' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0071300',
      properties: [
        { key: 'GoTerm', value: 'P:cellular response to retinoic acid' },
        { key: 'GoEvidenceType', value: 'IEA:Ensembl' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0071560',
      properties: [
        {
          key: 'GoTerm',
          value:
            'P:cellular response to transforming growth factor beta stimulus',
        },
        { key: 'GoEvidenceType', value: 'IEA:Ensembl' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0048565',
      properties: [
        { key: 'GoTerm', value: 'P:digestive tract development' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0048701',
      properties: [
        { key: 'GoTerm', value: 'P:embryonic cranial skeleton morphogenesis' },
        { key: 'GoEvidenceType', value: 'IMP:BHF-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '7874170' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '7987400' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0048557',
      properties: [
        { key: 'GoTerm', value: 'P:embryonic digestive tract morphogenesis' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0048568',
      properties: [
        { key: 'GoTerm', value: 'P:embryonic organ development' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0048562',
      properties: [
        { key: 'GoTerm', value: 'P:embryonic organ morphogenesis' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0009880',
      properties: [
        { key: 'GoTerm', value: 'P:embryonic pattern specification' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0003416',
      properties: [
        { key: 'GoTerm', value: 'P:endochondral bone growth' },
        { key: 'GoEvidenceType', value: 'IEA:Ensembl' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0048730',
      properties: [
        { key: 'GoTerm', value: 'P:epidermis morphogenesis' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0030855',
      properties: [
        { key: 'GoTerm', value: 'P:epithelial cell differentiation' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0060664',
      properties: [
        {
          key: 'GoTerm',
          value:
            'P:epithelial cell proliferation involved in salivary gland morphogenesis',
        },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0001837',
      properties: [
        { key: 'GoTerm', value: 'P:epithelial to mesenchymal transition' },
        { key: 'GoEvidenceType', value: 'IEA:Ensembl' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0008543',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:fibroblast growth factor receptor signaling pathway',
        },
        { key: 'GoEvidenceType', value: 'IDA:UniProtKB' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '15629145' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8663044' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0035603',
      properties: [
        {
          key: 'GoTerm',
          value:
            'P:fibroblast growth factor receptor signaling pathway involved in hemopoiesis',
        },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0060595',
      properties: [
        {
          key: 'GoTerm',
          value:
            'P:fibroblast growth factor receptor signaling pathway involved in mammary gland specification',
        },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0035602',
      properties: [
        {
          key: 'GoTerm',
          value:
            'P:fibroblast growth factor receptor signaling pathway involved in negative regulation of apoptotic process in bone marrow cell',
        },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0035607',
      properties: [
        {
          key: 'GoTerm',
          value:
            'P:fibroblast growth factor receptor signaling pathway involved in orbitofrontal cortex development',
        },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0035604',
      properties: [
        {
          key: 'GoTerm',
          value:
            'P:fibroblast growth factor receptor signaling pathway involved in positive regulation of cell proliferation in bone marrow',
        },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0022612',
      properties: [
        { key: 'GoTerm', value: 'P:gland morphogenesis' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0031069',
      properties: [
        { key: 'GoTerm', value: 'P:hair follicle morphogenesis' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0001701',
      properties: [
        { key: 'GoTerm', value: 'P:in utero embryonic development' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0042472',
      properties: [
        { key: 'GoTerm', value: 'P:inner ear morphogenesis' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0032808',
      properties: [
        { key: 'GoTerm', value: 'P:lacrimal gland development' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0060601',
      properties: [
        { key: 'GoTerm', value: 'P:lateral sprouting from an epithelium' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0060174',
      properties: [
        { key: 'GoTerm', value: 'P:limb bud formation' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0048286',
      properties: [
        { key: 'GoTerm', value: 'P:lung alveolus development' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0030324',
      properties: [
        { key: 'GoTerm', value: 'P:lung development' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0060463',
      properties: [
        { key: 'GoTerm', value: 'P:lung lobe morphogenesis' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0060484',
      properties: [
        { key: 'GoTerm', value: 'P:lung-associated mesenchyme development' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0060615',
      properties: [
        { key: 'GoTerm', value: 'P:mammary gland bud formation' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0000165',
      properties: [
        { key: 'GoTerm', value: 'P:MAPK cascade' },
        { key: 'GoEvidenceType', value: 'TAS:Reactome' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0003149',
      properties: [
        { key: 'GoTerm', value: 'P:membranous septum morphogenesis' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0048762',
      properties: [
        { key: 'GoTerm', value: 'P:mesenchymal cell differentiation' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0060915',
      properties: [
        {
          key: 'GoTerm',
          value:
            'P:mesenchymal cell differentiation involved in lung development',
        },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0060916',
      properties: [
        {
          key: 'GoTerm',
          value:
            'P:mesenchymal cell proliferation involved in lung development',
        },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0048333',
      properties: [
        { key: 'GoTerm', value: 'P:mesodermal cell differentiation' },
        { key: 'GoEvidenceType', value: 'IEA:Ensembl' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0030901',
      properties: [
        { key: 'GoTerm', value: 'P:midbrain development' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0016331',
      properties: [
        { key: 'GoTerm', value: 'P:morphogenesis of embryonic epithelium' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0007275',
      properties: [
        { key: 'GoTerm', value: 'P:multicellular organism development' },
        { key: 'GoEvidenceType', value: 'IBA:GO_Central' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '21873635' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0010839',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:negative regulation of keratinocyte proliferation',
        },
        { key: 'GoEvidenceType', value: 'IMP:BHF-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '21412257' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0000122',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:negative regulation of transcription by RNA polymerase II',
        },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0042476',
      properties: [
        { key: 'GoTerm', value: 'P:odontogenesis' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0021769',
      properties: [
        { key: 'GoTerm', value: 'P:orbitofrontal cortex development' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0035265',
      properties: [
        { key: 'GoTerm', value: 'P:organ growth' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0030916',
      properties: [
        { key: 'GoTerm', value: 'P:otic vesicle formation' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0003148',
      properties: [
        { key: 'GoTerm', value: 'P:outflow tract septum morphogenesis' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0018108',
      properties: [
        { key: 'GoTerm', value: 'P:peptidyl-tyrosine phosphorylation' },
        { key: 'GoEvidenceType', value: 'IDA:UniProtKB' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '15629145' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '16844695' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0090263',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:positive regulation of canonical Wnt signaling pathway',
        },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0060045',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:positive regulation of cardiac muscle cell proliferation',
        },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0045787',
      properties: [
        { key: 'GoTerm', value: 'P:positive regulation of cell cycle' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0051781',
      properties: [
        { key: 'GoTerm', value: 'P:positive regulation of cell division' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
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
        { key: 'GoEvidenceType', value: 'IDA:UniProtKB' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8663044' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0050679',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:positive regulation of epithelial cell proliferation',
        },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0060501',
      properties: [
        {
          key: 'GoTerm',
          value:
            'P:positive regulation of epithelial cell proliferation involved in lung morphogenesis',
        },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0070374',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:positive regulation of ERK1 and ERK2 cascade',
        },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0033674',
      properties: [
        { key: 'GoTerm', value: 'P:positive regulation of kinase activity' },
        { key: 'GoEvidenceType', value: 'IBA:GO_Central' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '21873635' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0043410',
      properties: [
        { key: 'GoTerm', value: 'P:positive regulation of MAPK cascade' },
        { key: 'GoEvidenceType', value: 'IMP:UniProtKB' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '15629145' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0002053',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:positive regulation of mesenchymal cell proliferation',
        },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0010518',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:positive regulation of phospholipase activity',
        },
        { key: 'GoEvidenceType', value: 'IMP:UniProtKB' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '16844695' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0051897',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:positive regulation of protein kinase B signaling',
        },
        { key: 'GoEvidenceType', value: 'TAS:Reactome' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0048661',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:positive regulation of smooth muscle cell proliferation',
        },
        { key: 'GoEvidenceType', value: 'IEA:Ensembl' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0045944',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:positive regulation of transcription by RNA polymerase II',
        },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0030177',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:positive regulation of Wnt signaling pathway',
        },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0009791',
      properties: [
        { key: 'GoTerm', value: 'P:post-embryonic development' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0060527',
      properties: [
        {
          key: 'GoTerm',
          value:
            'P:prostate epithelial cord arborization involved in prostate glandular acinus morphogenesis',
        },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0060523',
      properties: [
        { key: 'GoTerm', value: 'P:prostate epithelial cord elongation' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0060512',
      properties: [
        { key: 'GoTerm', value: 'P:prostate gland morphogenesis' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0046777',
      properties: [
        { key: 'GoTerm', value: 'P:protein autophosphorylation' },
        { key: 'GoEvidenceType', value: 'IDA:UniProtKB' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '15629145' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0021860',
      properties: [
        { key: 'GoTerm', value: 'P:pyramidal neuron development' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0070372',
      properties: [
        { key: 'GoTerm', value: 'P:regulation of ERK1 and ERK2 cascade' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0060688',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:regulation of morphogenesis of a branching structure',
        },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0045667',
      properties: [
        { key: 'GoTerm', value: 'P:regulation of osteoblast differentiation' },
        { key: 'GoEvidenceType', value: 'TAS:UniProtKB' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '15190072' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0033688',
      properties: [
        { key: 'GoTerm', value: 'P:regulation of osteoblast proliferation' },
        { key: 'GoEvidenceType', value: 'TAS:UniProtKB' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '15190072' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0051150',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:regulation of smooth muscle cell differentiation',
        },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0008589',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:regulation of smoothened signaling pathway',
        },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0048608',
      properties: [
        { key: 'GoTerm', value: 'P:reproductive structure development' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0045471',
      properties: [
        { key: 'GoTerm', value: 'P:response to ethanol' },
        { key: 'GoEvidenceType', value: 'IEA:Ensembl' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0032496',
      properties: [
        { key: 'GoTerm', value: 'P:response to lipopolysaccharide' },
        { key: 'GoEvidenceType', value: 'IEA:Ensembl' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0048705',
      properties: [
        { key: 'GoTerm', value: 'P:skeletal system morphogenesis' },
        { key: 'GoEvidenceType', value: 'TAS:UniProtKB' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '15190072' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0060529',
      properties: [
        {
          key: 'GoTerm',
          value:
            'P:squamous basal epithelial stem cell differentiation involved in prostate gland acinus development',
        },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0007169',
      properties: [
        {
          key: 'GoTerm',
          value:
            'P:transmembrane receptor protein tyrosine kinase signaling pathway',
        },
        { key: 'GoEvidenceType', value: 'IBA:GO_Central' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '21873635' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0001657',
      properties: [
        { key: 'GoTerm', value: 'P:ureteric bud development' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0055010',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:ventricular cardiac muscle tissue morphogenesis',
        },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0021847',
      properties: [
        { key: 'GoTerm', value: 'P:ventricular zone neuroblast division' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0042060',
      properties: [
        { key: 'GoTerm', value: 'P:wound healing' },
        { key: 'GoEvidenceType', value: 'IEA:Ensembl' },
      ],
    },
    {
      database: 'Gene3D',
      id: '2.60.40.10',
      properties: [
        { key: 'EntryName', value: '-' },
        { key: 'MatchStatus', value: '3' },
      ],
    },
    {
      database: 'IDEAL',
      id: 'IID00546',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'InterPro',
      id: 'IPR016248',
      properties: [{ key: 'EntryName', value: 'FGF_rcpt_fam' }],
    },
    {
      database: 'InterPro',
      id: 'IPR041159',
      properties: [{ key: 'EntryName', value: 'FGFR_TM' }],
    },
    {
      database: 'InterPro',
      id: 'IPR007110',
      properties: [{ key: 'EntryName', value: 'Ig-like_dom' }],
    },
    {
      database: 'InterPro',
      id: 'IPR036179',
      properties: [{ key: 'EntryName', value: 'Ig-like_dom_sf' }],
    },
    {
      database: 'InterPro',
      id: 'IPR013783',
      properties: [{ key: 'EntryName', value: 'Ig-like_fold' }],
    },
    {
      database: 'InterPro',
      id: 'IPR013098',
      properties: [{ key: 'EntryName', value: 'Ig_I-set' }],
    },
    {
      database: 'InterPro',
      id: 'IPR003599',
      properties: [{ key: 'EntryName', value: 'Ig_sub' }],
    },
    {
      database: 'InterPro',
      id: 'IPR003598',
      properties: [{ key: 'EntryName', value: 'Ig_sub2' }],
    },
    {
      database: 'InterPro',
      id: 'IPR011009',
      properties: [{ key: 'EntryName', value: 'Kinase-like_dom_sf' }],
    },
    {
      database: 'InterPro',
      id: 'IPR000719',
      properties: [{ key: 'EntryName', value: 'Prot_kinase_dom' }],
    },
    {
      database: 'InterPro',
      id: 'IPR017441',
      properties: [{ key: 'EntryName', value: 'Protein_kinase_ATP_BS' }],
    },
    {
      database: 'InterPro',
      id: 'IPR001245',
      properties: [{ key: 'EntryName', value: 'Ser-Thr/Tyr_kinase_cat_dom' }],
    },
    {
      database: 'InterPro',
      id: 'IPR008266',
      properties: [{ key: 'EntryName', value: 'Tyr_kinase_AS' }],
    },
    {
      database: 'InterPro',
      id: 'IPR020635',
      properties: [{ key: 'EntryName', value: 'Tyr_kinase_cat_dom' }],
    },
    {
      database: 'Pfam',
      id: 'PF18123',
      properties: [
        { key: 'EntryName', value: 'FGFR3_TM' },
        { key: 'MatchStatus', value: '1' },
      ],
    },
    {
      database: 'Pfam',
      id: 'PF07679',
      properties: [
        { key: 'EntryName', value: 'I-set' },
        { key: 'MatchStatus', value: '2' },
      ],
    },
    {
      database: 'Pfam',
      id: 'PF07714',
      properties: [
        { key: 'EntryName', value: 'PK_Tyr_Ser-Thr' },
        { key: 'MatchStatus', value: '1' },
      ],
    },
    {
      database: 'PIRSF',
      id: 'PIRSF000628',
      properties: [
        { key: 'EntryName', value: 'FGFR' },
        { key: 'MatchStatus', value: '1' },
      ],
    },
    {
      database: 'PRINTS',
      id: 'PR00109',
      properties: [{ key: 'EntryName', value: 'TYRKINASE' }],
    },
    {
      database: 'SMART',
      id: 'SM00409',
      properties: [
        { key: 'EntryName', value: 'IG' },
        { key: 'MatchStatus', value: '3' },
      ],
    },
    {
      database: 'SMART',
      id: 'SM00408',
      properties: [
        { key: 'EntryName', value: 'IGc2' },
        { key: 'MatchStatus', value: '3' },
      ],
    },
    {
      database: 'SMART',
      id: 'SM00219',
      properties: [
        { key: 'EntryName', value: 'TyrKc' },
        { key: 'MatchStatus', value: '1' },
      ],
    },
    {
      database: 'SUPFAM',
      id: 'SSF48726',
      properties: [
        { key: 'EntryName', value: 'SSF48726' },
        { key: 'MatchStatus', value: '3' },
      ],
    },
    {
      database: 'SUPFAM',
      id: 'SSF56112',
      properties: [
        { key: 'EntryName', value: 'SSF56112' },
        { key: 'MatchStatus', value: '1' },
      ],
    },
    {
      database: 'PROSITE',
      id: 'PS50835',
      properties: [
        { key: 'EntryName', value: 'IG_LIKE' },
        { key: 'MatchStatus', value: '3' },
      ],
    },
    {
      database: 'PROSITE',
      id: 'PS00107',
      properties: [
        { key: 'EntryName', value: 'PROTEIN_KINASE_ATP' },
        { key: 'MatchStatus', value: '1' },
      ],
    },
    {
      database: 'PROSITE',
      id: 'PS50011',
      properties: [
        { key: 'EntryName', value: 'PROTEIN_KINASE_DOM' },
        { key: 'MatchStatus', value: '1' },
      ],
    },
    {
      database: 'PROSITE',
      id: 'PS00109',
      properties: [
        { key: 'EntryName', value: 'PROTEIN_KINASE_TYR' },
        { key: 'MatchStatus', value: '1' },
      ],
    },
  ],
  sequence: {
    value:
      'MVSWGRFICLVVVTMATLSLARPSFSLVEDTTLEPEEPPTKYQISQPEVYVAAPGESLEVRCLLKDAAVISWTKDGVHLGPNNRTVLIGEYLQIKGATPRDSGLYACTASRTVDSETWYFMVNVTDAISSGDDEDDTDGAEDFVSENSNNKRAPYWTNTEKMEKRLHAVPAANTVKFRCPAGGNPMPTMRWLKNGKEFKQEHRIGGYKVRNQHWSLIMESVVPSDKGNYTCVVENEYGSINHTYHLDVVERSPHRPILQAGLPANASTVVGGDVEFVCKVYSDAQPHIQWIKHVEKNGSKYGPDGLPYLKVLKAAGVNTTDKEIEVLYIRNVTFEDAGEYTCLAGNSIGISFHSAWLTVLPAPGREKEITASPDYLEIAIYCIGVFLIACMVVTVILCRMKNTTKKPDFSSQPAVHKLTKRIPLRRQVTVSAESSSSMNSNTPLVRITTRLSSTADTPMLAGVSEYELPEDPKWEFPRDKLTLGKPLGEGCFGQVVMAEAVGIDKDKPKEAVTVAVKMLKDDATEKDLSDLVSEMEMMKMIGKHKNIINLLGACTQDGPLYVIVEYASKGNLREYLRARRPPGMEYSYDINRVPEEQMTFKDLVSCTYQLARGMEYLASQKCIHRDLAARNVLVTENNVMKIADFGLARDINNIDYYKKTTNGRLPVKWMAPEALFDRVYTHQSDVWSFGVLMWEIFTLGGSPYPGIPVEELFKLLKEGHRMDKPANCTNELYMMMRDCWHAVPSQRPTFKQLVEDLDRILTLTTNEEYLDLSQPLEQYSPSYPDTRSSCSSGDDSVFSPDPMPYEPCLPQYPHINGSVKT',
    length: 821,
    molWeight: 92025,
    crc64: '6CD5001C960ED82F',
    md5: '8278583234A3EDA2A192D8BB50E1FAB8',
  },
  extraAttributes: {
    countByCommentType: {
      FUNCTION: 1,
      'CATALYTIC ACTIVITY': 1,
      'ACTIVITY REGULATION': 1,
      SUBUNIT: 1,
      INTERACTION: 13,
      'SUBCELLULAR LOCATION': 5,
      'ALTERNATIVE PRODUCTS': 17,
      DOMAIN: 1,
      PTM: 3,
      DISEASE: 10,
      SIMILARITY: 1,
      'SEQUENCE CAUTION': 7,
      'WEB RESOURCE': 2,
    },
    countByFeatureType: {
      Signal: 1,
      Chain: 1,
      'Topological domain': 2,
      Transmembrane: 1,
      Domain: 4,
      'Nucleotide binding': 2,
      Region: 1,
      'Active site': 1,
      'Binding site': 2,
      'Modified residue': 7,
      Glycosylation: 8,
      'Disulfide bond': 3,
      'Alternative sequence': 19,
      'Natural variant': 74,
      Mutagenesis: 5,
      'Sequence conflict': 3,
      'Beta strand': 34,
      Turn: 7,
      Helix: 19,
    },
    uniParcId: 'UPI000012A72A',
  },
};

export default mock;
