import { UniProtkbAPIModel } from '../../adapters/uniProtkbConverter';

const mock: UniProtkbAPIModel = {
  entryType: 'UniProtKB reviewed (Swiss-Prot)',
  primaryAccession: 'P05067',
  secondaryAccessions: [
    'B2R5V1',
    'B4DII8',
    'D3DSD1',
    'D3DSD2',
    'D3DSD3',
    'P09000',
    'P78438',
    'Q13764',
    'Q13778',
    'Q13793',
    'Q16011',
    'Q16014',
    'Q16019',
    'Q16020',
    'Q6GSC0',
    'Q8WZ99',
    'Q9BT38',
    'Q9UC33',
    'Q9UCA9',
    'Q9UCB6',
    'Q9UCC8',
    'Q9UCD1',
    'Q9UQ58',
  ],
  uniProtkbId: 'A4_HUMAN',
  entryAudit: {
    firstPublicDate: '1987-08-13',
    lastAnnotationUpdateDate: '2021-04-07',
    lastSequenceUpdateDate: '1991-11-01',
    entryVersion: 296,
    sequenceVersion: 3,
  },
  annotationScore: 2845.2,
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
        evidences: [{ evidenceCode: 'ECO:0000305' }],
        value: 'Amyloid-beta precursor protein',
      },
      shortNames: [
        { evidences: [{ evidenceCode: 'ECO:0000305' }], value: 'APP' },
      ],
    },
    alternativeNames: [
      { fullName: { value: 'ABPP' } },
      { fullName: { value: 'APPI' } },
      { fullName: { value: 'Alzheimer disease amyloid protein' } },
      {
        fullName: {
          evidences: [{ evidenceCode: 'ECO:0000305' }],
          value: 'Amyloid precursor protein',
        },
      },
      { fullName: { value: 'Amyloid-beta A4 protein' } },
      {
        fullName: { value: 'Cerebral vascular amyloid peptide' },
        shortNames: [{ value: 'CVAP' }],
      },
      { fullName: { value: 'PreA4' } },
      {
        fullName: { value: 'Protease nexin-II' },
        shortNames: [{ value: 'PN-II' }],
      },
    ],
    contains: [
      { recommendedName: { fullName: { value: 'N-APP' } } },
      {
        recommendedName: {
          fullName: {
            evidences: [
              { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '10656250' },
            ],
            value: 'Soluble APP-alpha',
          },
          shortNames: [
            {
              evidences: [
                {
                  evidenceCode: 'ECO:0000303',
                  source: 'PubMed',
                  id: '10656250',
                },
              ],
              value: 'S-APP-alpha',
            },
          ],
        },
      },
      {
        recommendedName: {
          fullName: {
            evidences: [
              { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '10656250' },
            ],
            value: 'Soluble APP-beta',
          },
          shortNames: [
            {
              evidences: [
                {
                  evidenceCode: 'ECO:0000303',
                  source: 'PubMed',
                  id: '10656250',
                },
              ],
              value: 'S-APP-beta',
            },
          ],
        },
      },
      {
        recommendedName: { fullName: { value: 'C99' } },
        alternativeNames: [
          {
            fullName: {
              evidences: [
                {
                  evidenceCode: 'ECO:0000303',
                  source: 'PubMed',
                  id: '10656250',
                },
              ],
              value: 'Beta-secretase C-terminal fragment',
            },
            shortNames: [
              {
                evidences: [
                  {
                    evidenceCode: 'ECO:0000303',
                    source: 'PubMed',
                    id: '10656250',
                  },
                ],
                value: 'Beta-CTF',
              },
            ],
          },
        ],
      },
      {
        recommendedName: {
          fullName: {
            evidences: [
              { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '8886002' },
            ],
            value: 'Amyloid-beta protein 42',
          },
          shortNames: [{ value: 'Abeta42' }],
        },
        alternativeNames: [{ fullName: { value: 'Beta-APP42' } }],
      },
      {
        recommendedName: {
          fullName: {
            evidences: [
              { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '8886002' },
            ],
            value: 'Amyloid-beta protein 40',
          },
          shortNames: [{ value: 'Abeta40' }],
        },
        alternativeNames: [{ fullName: { value: 'Beta-APP40' } }],
      },
      {
        recommendedName: { fullName: { value: 'C83' } },
        alternativeNames: [
          {
            fullName: {
              evidences: [
                {
                  evidenceCode: 'ECO:0000303',
                  source: 'PubMed',
                  id: '10656250',
                },
              ],
              value: 'Alpha-secretase C-terminal fragment',
            },
            shortNames: [
              {
                evidences: [
                  {
                    evidenceCode: 'ECO:0000303',
                    source: 'PubMed',
                    id: '10656250',
                  },
                ],
                value: 'Alpha-CTF',
              },
            ],
          },
        ],
      },
      { recommendedName: { fullName: { value: 'P3(42)' } } },
      { recommendedName: { fullName: { value: 'P3(40)' } } },
      { recommendedName: { fullName: { value: 'C80' } } },
      {
        recommendedName: {
          fullName: { value: 'Gamma-secretase C-terminal fragment 59' },
        },
        alternativeNames: [
          {
            fullName: { value: 'Amyloid intracellular domain 59' },
            shortNames: [{ value: 'AICD-59' }, { value: 'AID(59)' }],
          },
          { fullName: { value: 'Gamma-CTF(59)' } },
        ],
      },
      {
        recommendedName: {
          fullName: { value: 'Gamma-secretase C-terminal fragment 57' },
        },
        alternativeNames: [
          {
            fullName: { value: 'Amyloid intracellular domain 57' },
            shortNames: [{ value: 'AICD-57' }, { value: 'AID(57)' }],
          },
          { fullName: { value: 'Gamma-CTF(57)' } },
        ],
      },
      {
        recommendedName: {
          fullName: { value: 'Gamma-secretase C-terminal fragment 50' },
        },
        alternativeNames: [
          {
            fullName: { value: 'Amyloid intracellular domain 50' },
            shortNames: [{ value: 'AICD-50' }, { value: 'AID(50)' }],
          },
          { fullName: { value: 'Gamma-CTF(50)' } },
        ],
      },
      { recommendedName: { fullName: { value: 'C31' } } },
    ],
    flag: 'Precursor',
  },
  genes: [
    {
      geneName: {
        evidences: [
          { evidenceCode: 'ECO:0000312', source: 'HGNC', id: 'HGNC:620' },
        ],
        value: 'APP',
      },
      synonyms: [{ value: 'A4' }, { value: 'AD1' }],
    },
  ],
  comments: [
    {
      texts: [
        {
          evidences: [
            { evidenceCode: 'ECO:0000250' },
            { evidenceCode: 'ECO:0000250', source: 'UniProtKB', id: 'P12023' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '17062754' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '23011729' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '25122912' },
          ],
          value:
            'Functions as a cell surface receptor and performs physiological functions on the surface of neurons relevant to neurite growth, neuronal adhesion and axonogenesis. Interaction between APP molecules on neighboring cells promotes synaptogenesis (PubMed:25122912). Involved in cell mobility and transcription regulation through protein-protein interactions. Can promote transcription activation through binding to APBB1-KAT5 and inhibits Notch signaling through interaction with Numb. Couples to apoptosis-inducing pathways such as those mediated by G(O) and JIP. Inhibits G(o) alpha ATPase activity (By similarity). Acts as a kinesin I membrane receptor, mediating the axonal transport of beta-secretase and presenilin 1 (By similarity). By acting as a kinesin I membrane receptor, plays a role in axonal anterograde transport of cargo towards synapes in axons (PubMed:17062754, PubMed:23011729). Involved in copper homeostasis/oxidative stress through copper ion reduction. In vitro, copper-metallated APP induces neuronal death directly or is potentiated through Cu(2+)-mediated low-density lipoprotein oxidation. Can regulate neurite outgrowth through binding to components of the extracellular matrix such as heparin and collagen I and IV. The splice isoforms that contain the BPTI domain possess protease inhibitor activity. Induces a AGER-dependent pathway that involves activation of p38 MAPK, resulting in internalization of amyloid-beta peptide and leading to mitochondrial dysfunction in cultured cortical neurons. Provides Cu(2+) ions for GPC1 which are required for release of nitric oxide (NO) and subsequent degradation of the heparan sulfate chains on GPC1',
        },
      ],
      commentType: 'FUNCTION',
    },
    {
      texts: [
        {
          value:
            'Amyloid-beta peptides are lipophilic metal chelators with metal-reducing activity. Bind transient metals such as copper, zinc and iron. In vitro, can reduce Cu(2+) and Fe(3+) to Cu(+) and Fe(2+), respectively. Amyloid-beta protein 42 is a more effective reductant than amyloid-beta protein 40. Amyloid-beta peptides bind to lipoproteins and apolipoproteins E and J in the CSF and to HDL particles in plasma, inhibiting metal-catalyzed oxidation of lipoproteins. APP42-beta may activate mononuclear phagocytes in the brain and elicit inflammatory responses. Promotes both tau aggregation and TPK II-mediated phosphorylation. Interaction with overexpressed HADH2 leads to oxidative stress and neurotoxicity. Also binds GPC1 in lipid rafts',
        },
      ],
      commentType: 'FUNCTION',
    },
    {
      texts: [
        {
          evidences: [{ evidenceCode: 'ECO:0000250' }],
          value:
            'Appicans elicit adhesion of neural cells to the extracellular matrix and may regulate neurite outgrowth in the brain',
        },
      ],
      commentType: 'FUNCTION',
    },
    {
      texts: [
        {
          value:
            'The gamma-CTF peptides as well as the caspase-cleaved peptides, including C31, are potent enhancers of neuronal apoptosis',
        },
      ],
      commentType: 'FUNCTION',
    },
    {
      texts: [
        {
          value:
            'N-APP binds TNFRSF21 triggering caspase activation and degeneration of both neuronal cell bodies (via caspase-3) and axons (via caspase-6)',
        },
      ],
      commentType: 'FUNCTION',
    },
    {
      texts: [
        {
          evidences: [
            { evidenceCode: 'ECO:0000250', source: 'UniProtKB', id: 'P08592' },
            { evidenceCode: 'ECO:0000250', source: 'UniProtKB', id: 'P12023' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10681545' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10816430' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11238726' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11278849' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11438549' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11517218' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11544248' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11689470' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11724784' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11877420' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11943163' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '15347684' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '16174740' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '16407538' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '17051221' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '17855360' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '17895381' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '18468999' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '19225519' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '19366692' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '19901339' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '20212142' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '20811458' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '22457725' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '23011729' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '24336208' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '24523320' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '25122912' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '25168729' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '28720718' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '30630874' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8446172' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8626687' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8855266' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8887653' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '9300481' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '9338779' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '9843960' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '9890987' },
          ],
          value:
            'Binds, via its C-terminus, to the PID domain of several cytoplasmic proteins, including APBB family members, the APBA family, MAPK8IP1, SHC1 and, NUMB and DAB1 (By similarity). Binding to DAB1 inhibits its serine phosphorylation (By similarity). Interacts (via NPXY motif) with DAB2 (via PID domain); the interaction is impaired by tyrosine phosphorylation of the NPXY motif. Also interacts with GPCR-like protein BPP, APPBP1, IB1, KNS2 (via its TPR domains), APPBP2 (via BaSS) and DDB1. In vitro, it binds MAPT via the MT-binding domains (By similarity). Associates with microtubules in the presence of ATP and in a kinesin-dependent manner (By similarity). Interacts, through a C-terminal domain, with GNAO1. Amyloid-beta protein 42 binds CHRNA7 in hippocampal neurons. Amyloid-beta associates with HADH2. Soluble APP binds, via its N-terminal head, to FBLN1. Interacts with CPEB1 and AGER (By similarity). Interacts with ANKS1B and TNFRSF21. Interacts with ITM2B. Interacts with ITM2C. Interacts with IDE. Can form homodimers; dimerization is enhanced in the presence of Cu(2+) ions (PubMed:25122912). Can form homodimers; this is promoted by heparin binding. Amyloid-beta protein 40 interacts with S100A9. CTF-alpha product of APP interacts with GSAP. Isoform APP695 interacts with SORL1 (via N-terminal ectodomain); this interaction retains APP in the trans-Golgi network and reduces processing into soluble APP-alpha and amyloid-beta peptides (PubMed:16174740, PubMed:16407538, PubMed:17855360, PubMed:24523320). The C99 fragment also interacts with SORL1 (PubMed:16407538). Isoform APP751 interacts with SORL1 (PubMed:16174740). Isoform APP770 interacts with SORL1 (PubMed:16174740). Interacts with PLD3. Interacts with VDAC1 (PubMed:25168729). Interacts with NSG1; could regulate APP processing (By similarity). Amyloid-beta protein 42 interacts with FPR2 (PubMed:11689470). Interacts with SYT7 (By similarity). Interacts (via transmembrane region) with PSEN1; the interaction is direct (PubMed:30630874). Interacts with LRRK2 (PubMed:28720718). Interacts (via cytoplasmic domain) with KIF5B (PubMed:23011729)',
        },
      ],
      commentType: 'SUBUNIT',
    },
    {
      commentType: 'INTERACTION',
      interactions: [
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q9NY61',
            geneName: 'AATF',
            intActId: 'EBI-372428',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P16112',
            geneName: 'ACAN',
            intActId: 'EBI-9076211',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P60709',
            geneName: 'ACTB',
            intActId: 'EBI-353944',
          },
          numberOfExperiments: 8,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P61158',
            geneName: 'ACTR3',
            intActId: 'EBI-351428',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'O14672',
            geneName: 'ADAM10',
            intActId: 'EBI-1536151',
          },
          numberOfExperiments: 7,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'A0AVL1',
            geneName: 'ADAM9',
            intActId: 'EBI-25935864',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P18509',
            geneName: 'ADCYAP1',
            intActId: 'EBI-8588930',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P41586-2',
            geneName: 'ADCYAP1R1',
            intActId: 'EBI-17241711',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q15109',
            geneName: 'AGER',
            intActId: 'EBI-1646426',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q13155',
            geneName: 'AIMP2',
            intActId: 'EBI-745226',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P63010-2',
            geneName: 'AP2B1',
            intActId: 'EBI-11529439',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q02410',
            geneName: 'APBA1',
            intActId: 'EBI-368690',
          },
          numberOfExperiments: 4,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q99767',
            geneName: 'APBA2',
            intActId: 'EBI-81711',
          },
          numberOfExperiments: 2,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'O96018',
            geneName: 'APBA3',
            intActId: 'EBI-6115839',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'O00213',
            geneName: 'APBB1',
            intActId: 'EBI-81694',
          },
          numberOfExperiments: 7,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'O00213-2',
            geneName: 'APBB1',
            intActId: 'EBI-13307975',
          },
          numberOfExperiments: 6,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q92870',
            geneName: 'APBB2',
            intActId: 'EBI-79277',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q92870-2',
            geneName: 'APBB2',
            intActId: 'EBI-21535880',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'O95704',
            geneName: 'APBB3',
            intActId: 'EBI-286427',
          },
          numberOfExperiments: 5,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P02743',
            geneName: 'APCS',
            intActId: 'EBI-2115799',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q96BI3',
            geneName: 'APH1A',
            intActId: 'EBI-2606935',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q8WW43',
            geneName: 'APH1B',
            intActId: 'EBI-2606497',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q06481-5',
            geneName: 'APLP2',
            intActId: 'EBI-25646567',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P02647',
            geneName: 'APOA1',
            intActId: 'EBI-701692',
          },
          numberOfExperiments: 8,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P05067',
            geneName: 'APP',
            intActId: 'EBI-77613',
          },
          numberOfExperiments: 107,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q92624',
            geneName: 'APPBP2',
            intActId: 'EBI-743771',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q6P4J0',
            geneName: 'ARD1A',
            intActId: 'EBI-10252815',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P61204',
            geneName: 'ARF3',
            intActId: 'EBI-641535',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q0P5N6',
            geneName: 'ARL16',
            intActId: 'EBI-10186132',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P56211',
            geneName: 'ARPP19',
            intActId: 'EBI-5773880',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P05026',
            geneName: 'ATP1B1',
            intActId: 'EBI-714630',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P54253',
            geneName: 'ATXN1',
            intActId: 'EBI-930964',
          },
          numberOfExperiments: 8,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P56817',
            geneName: 'BACE1',
            intActId: 'EBI-2433139',
          },
          numberOfExperiments: 11,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q9Y5Z0',
            geneName: 'BACE2',
            intActId: 'EBI-11282723',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q92934',
            geneName: 'BAD',
            intActId: 'EBI-700771',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P46379-2',
            geneName: 'BAG6',
            intActId: 'EBI-10988864',
          },
          numberOfExperiments: 5,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q96GW7',
            geneName: 'BCAN',
            intActId: 'EBI-2690445',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P51572',
            geneName: 'BCAP31',
            intActId: 'EBI-77683',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P10415',
            geneName: 'BCL2',
            intActId: 'EBI-77694',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P23560-2',
            geneName: 'BDNF',
            intActId: 'EBI-12275524',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'O15392',
            geneName: 'BIRC5',
            intActId: 'EBI-518823',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q13867',
            geneName: 'BLMH',
            intActId: 'EBI-718504',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P35613',
            geneName: 'BSG',
            intActId: 'EBI-750709',
          },
          numberOfExperiments: 2,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q8IU99',
            geneName: 'CALHM1',
            intActId: 'EBI-1790341',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P0DP25',
            geneName: 'CALM3',
            intActId: 'EBI-397435',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P27797',
            geneName: 'CALR',
            intActId: 'EBI-1049597',
          },
          numberOfExperiments: 5,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'O43852-3',
            geneName: 'CALU',
            intActId: 'EBI-11536607',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q9UQM7',
            geneName: 'CAMK2A',
            intActId: 'EBI-1383687',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P27824-2',
            geneName: 'CANX',
            intActId: 'EBI-25890990',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P07384',
            geneName: 'CAPN1',
            intActId: 'EBI-1542113',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P29466-3',
            geneName: 'CASP1',
            intActId: 'EBI-12248206',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P42574',
            geneName: 'CASP3',
            intActId: 'EBI-524064',
          },
          numberOfExperiments: 4,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q14790',
            geneName: 'CASP8',
            intActId: 'EBI-78060',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q03135',
            geneName: 'CAV1',
            intActId: 'EBI-603614',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P83916',
            geneName: 'CBX1',
            intActId: 'EBI-78129',
          },
          numberOfExperiments: 6,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P40227',
            geneName: 'CCT6A',
            intActId: 'EBI-356687',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P16671',
            geneName: 'CD36',
            intActId: 'EBI-2808214',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q08722-3',
            geneName: 'CD47',
            intActId: 'EBI-17263290',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P06493',
            geneName: 'CDK1',
            intActId: 'EBI-444308',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q00535',
            geneName: 'CDK5',
            intActId: 'EBI-1041567',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P42773',
            geneName: 'CDKN2C',
            intActId: 'EBI-711290',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P43681',
            geneName: 'CHRNA4',
            intActId: 'EBI-7132379',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P36544',
            geneName: 'CHRNA7',
            intActId: 'EBI-79333',
          },
          numberOfExperiments: 4,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q16740',
            geneName: 'CLPP',
            intActId: 'EBI-1056029',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'O94985-2',
            geneName: 'CLSTN1',
            intActId: 'EBI-16041593',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q8IUW6',
            geneName: 'CLSTN3',
            intActId: 'EBI-25832219',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P10909',
            geneName: 'CLU',
            intActId: 'EBI-1104674',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P26441',
            geneName: 'CNTF',
            intActId: 'EBI-1050897',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q02246',
            geneName: 'CNTN2',
            intActId: 'EBI-4397248',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q8NE08',
            geneName: 'COL25A1',
            intActId: 'EBI-25836642',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q96A83-2',
            geneName: 'COL26A1',
            intActId: 'EBI-21553822',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P29400-2',
            geneName: 'COL4A5',
            intActId: 'EBI-12211159',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q14031',
            geneName: 'COL4A6',
            intActId: 'EBI-2432407',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P31146',
            geneName: 'CORO1A',
            intActId: 'EBI-1046676',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P20674',
            geneName: 'COX5A',
            intActId: 'EBI-715032',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P15086',
            geneName: 'CPB1',
            intActId: 'EBI-25936844',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P02511',
            geneName: 'CRYAB',
            intActId: 'EBI-739060',
          },
          numberOfExperiments: 7,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P48730',
            geneName: 'CSNK1D',
            intActId: 'EBI-751621',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P48730-2',
            geneName: 'CSNK1D',
            intActId: 'EBI-9087876',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P68400',
            geneName: 'CSNK2A1',
            intActId: 'EBI-347804',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P01034',
            geneName: 'CST3',
            intActId: 'EBI-948622',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P49711',
            geneName: 'CTCF',
            intActId: 'EBI-932887',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P07339',
            geneName: 'CTSD',
            intActId: 'EBI-2115097',
          },
          numberOfExperiments: 2,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P99999',
            geneName: 'CYCS',
            intActId: 'EBI-446479',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'O75553-4',
            geneName: 'DAB1',
            intActId: 'EBI-21246842',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P98082',
            geneName: 'DAB2',
            intActId: 'EBI-1171238',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q14203-5',
            geneName: 'DCTN1',
            intActId: 'EBI-25840379',
          },
          numberOfExperiments: 5,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q13561',
            geneName: 'DCTN2',
            intActId: 'EBI-715074',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q6I9W9',
            geneName: 'DKFZP586N0721',
            intActId: 'EBI-25927172',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'O14645',
            geneName: 'DNALI1',
            intActId: 'EBI-395638',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q01658',
            geneName: 'DR1',
            intActId: 'EBI-750300',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P21917',
            geneName: 'DRD4',
            intActId: 'EBI-8592297',
          },
          numberOfExperiments: 6,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q16828',
            geneName: 'DUSP6',
            intActId: 'EBI-746870',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q92997',
            geneName: 'DVL3',
            intActId: 'EBI-739789',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'O14576-2',
            geneName: 'DYNC1I1',
            intActId: 'EBI-25840445',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'O14576-5',
            geneName: 'DYNC1I1',
            intActId: 'EBI-25936079',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q01094',
            geneName: 'E2F1',
            intActId: 'EBI-448924',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q3B7T1',
            geneName: 'EDRF1',
            intActId: 'EBI-2870947',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P20042',
            geneName: 'EIF2S2',
            intActId: 'EBI-711977',
          },
          numberOfExperiments: 6,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P19419',
            geneName: 'ELK1',
            intActId: 'EBI-726632',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P11171-2',
            geneName: 'EPB41',
            intActId: 'EBI-10197451',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P11171-7',
            geneName: 'EPB41',
            intActId: 'EBI-25852354',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q9BS26',
            geneName: 'ERP44',
            intActId: 'EBI-541644',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P00748',
            geneName: 'F12',
            intActId: 'EBI-6378830',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P00734',
            geneName: 'F2',
            intActId: 'EBI-297094',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P23142-4',
            geneName: 'FBLN1',
            intActId: 'EBI-11956479',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q92915',
            geneName: 'FGF14',
            intActId: 'EBI-10489272',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P62942',
            geneName: 'FKBP1A',
            intActId: 'EBI-1027571',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P21333-2',
            geneName: 'FLNA',
            intActId: 'EBI-9641086',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'O75955',
            geneName: 'FLOT1',
            intActId: 'EBI-603643',
          },
          numberOfExperiments: 5,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q9BTI6',
            geneName: 'FLOT2',
            intActId: 'EBI-23703366',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P01100',
            geneName: 'FOS',
            intActId: 'EBI-852851',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P25090',
            geneName: 'FPR2',
            intActId: 'EBI-17291771',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P09958',
            geneName: 'FURIN',
            intActId: 'EBI-1056807',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P06241',
            geneName: 'FYN',
            intActId: 'EBI-515315',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P04406',
            geneName: 'GAPDH',
            intActId: 'EBI-354056',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q9UJY5-4',
            geneName: 'GGA1',
            intActId: 'EBI-12108696',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q05586',
            geneName: 'GRIN1',
            intActId: 'EBI-998542',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P25098',
            geneName: 'GRK2',
            intActId: 'EBI-3904795',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P43250',
            geneName: 'GRK6',
            intActId: 'EBI-722747',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P43250-2',
            geneName: 'GRK6',
            intActId: 'EBI-6428342',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'A4D1B5',
            geneName: 'GSAP',
            intActId: 'EBI-15875313',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P49841-2',
            geneName: 'GSK3B',
            intActId: 'EBI-15870655',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q03013',
            geneName: 'GSTM4',
            intActId: 'EBI-713363',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q00403',
            geneName: 'GTF2B',
            intActId: 'EBI-389564',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q9Y5Q9',
            geneName: 'GTF3C3',
            intActId: 'EBI-1054873',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P09429',
            geneName: 'HMGB1',
            intActId: 'EBI-389432',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P30519',
            geneName: 'HMOX2',
            intActId: 'EBI-712096',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q9UJC3',
            geneName: 'HOOK1',
            intActId: 'EBI-746704',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q99714',
            geneName: 'HSD17B10',
            intActId: 'EBI-79964',
          },
          numberOfExperiments: 7,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q99714-2',
            geneName: 'HSD17B10',
            intActId: 'EBI-25939412',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P07900',
            geneName: 'HSP90AA1',
            intActId: 'EBI-296047',
          },
          numberOfExperiments: 5,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P14625',
            geneName: 'HSP90B1',
            intActId: 'EBI-359129',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P11021',
            geneName: 'HSPA5',
            intActId: 'EBI-354921',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P11142',
            geneName: 'HSPA8',
            intActId: 'EBI-351896',
          },
          numberOfExperiments: 8,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P04792',
            geneName: 'HSPB1',
            intActId: 'EBI-352682',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q16082',
            geneName: 'HSPB2',
            intActId: 'EBI-739395',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P10809',
            geneName: 'HSPD1',
            intActId: 'EBI-352528',
          },
          numberOfExperiments: 6,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P42858',
            geneName: 'HTT',
            intActId: 'EBI-466029',
          },
          numberOfExperiments: 6,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q9UMF0',
            geneName: 'ICAM5',
            intActId: 'EBI-6398041',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P14735',
            geneName: 'IDE',
            intActId: 'EBI-2556886',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q16352',
            geneName: 'INA',
            intActId: 'EBI-366258',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q6DN90-2',
            geneName: 'IQSEC1',
            intActId: 'EBI-21911304',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P05556',
            geneName: 'ITGB1',
            intActId: 'EBI-703066',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q9Y287',
            geneName: 'ITM2B',
            intActId: 'EBI-2866431',
          },
          numberOfExperiments: 4,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P05412',
            geneName: 'JUN',
            intActId: 'EBI-852823',
          },
          numberOfExperiments: 5,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P17535',
            geneName: 'JUND',
            intActId: 'EBI-2682803',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q92993',
            geneName: 'KAT5',
            intActId: 'EBI-399080',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q92993-2',
            geneName: 'KAT5',
            intActId: 'EBI-20795332',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q13303',
            geneName: 'KCNAB2',
            intActId: 'EBI-948729',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q9Y2W7',
            geneName: 'KCNIP3',
            intActId: 'EBI-751501',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'O60333-2',
            geneName: 'KIF1B',
            intActId: 'EBI-10975473',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q07866-2',
            geneName: 'KLC1',
            intActId: 'EBI-11979975',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'O14901',
            geneName: 'KLF11',
            intActId: 'EBI-948266',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q92876',
            geneName: 'KLK6',
            intActId: 'EBI-2432309',
          },
          numberOfExperiments: 4,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P01116-2',
            geneName: 'KRAS',
            intActId: 'EBI-367427',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q16363-3',
            geneName: 'LAMA4',
            intActId: 'EBI-17719490',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q9BYZ2',
            geneName: 'LDHAL6B',
            intActId: 'EBI-1108377',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q96FE5',
            geneName: 'LINGO1',
            intActId: 'EBI-719955',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q07954-2',
            geneName: 'LRP1',
            intActId: 'EBI-25833471',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q9NZR2',
            geneName: 'LRP1B',
            intActId: 'EBI-1642131',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P30533',
            geneName: 'LRPAP1',
            intActId: 'EBI-715927',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P42704',
            geneName: 'LRPPRC',
            intActId: 'EBI-1050853',
          },
          numberOfExperiments: 8,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P07948',
            geneName: 'LYN',
            intActId: 'EBI-79452',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q9GZQ8',
            geneName: 'MAP1LC3B',
            intActId: 'EBI-373144',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P36507',
            geneName: 'MAP2K2',
            intActId: 'EBI-1056930',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P28482',
            geneName: 'MAPK1',
            intActId: 'EBI-959949',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P53778',
            geneName: 'MAPK12',
            intActId: 'EBI-602406',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P10636',
            geneName: 'MAPT',
            intActId: 'EBI-366182',
          },
          numberOfExperiments: 8,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q9P0L2',
            geneName: 'MARK1',
            intActId: 'EBI-968587',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q6IPE9',
            geneName: 'MARK4',
            intActId: 'EBI-10250211',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q96L34',
            geneName: 'MARK4',
            intActId: 'EBI-302319',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q00266',
            geneName: 'MAT1A',
            intActId: 'EBI-967087',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P02686-2',
            geneName: 'MBP',
            intActId: 'EBI-12159027',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q93074',
            geneName: 'MED12',
            intActId: 'EBI-394357',
          },
          numberOfExperiments: 2,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q8TDB4',
            geneName: 'MGARP',
            intActId: 'EBI-4397720',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'O94851',
            geneName: 'MICAL2',
            intActId: 'EBI-2804835',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'A4FUJ8',
            geneName: 'MKL1',
            intActId: 'EBI-21250407',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P08473',
            geneName: 'MME',
            intActId: 'EBI-353759',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P08253',
            geneName: 'MMP2',
            intActId: 'EBI-1033518',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q99547',
            geneName: 'MPHOSPH6',
            intActId: 'EBI-373187',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q8N594',
            geneName: 'MPND',
            intActId: 'EBI-2512452',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P41227',
            geneName: 'NAA10',
            intActId: 'EBI-747693',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q13765',
            geneName: 'NACA',
            intActId: 'EBI-712216',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q13564',
            geneName: 'NAE1',
            intActId: 'EBI-718631',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P41271-2',
            geneName: 'NBL1',
            intActId: 'EBI-12135485',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P19404',
            geneName: 'NDUFV2',
            intActId: 'EBI-713665',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'O76041',
            geneName: 'NEBL',
            intActId: 'EBI-2880203',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P12036',
            geneName: 'NEFH',
            intActId: 'EBI-2880271',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'I6L9F6',
            geneName: 'NEFL',
            intActId: 'EBI-10178578',
          },
          numberOfExperiments: 6,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P21359',
            geneName: 'NF1',
            intActId: 'EBI-1172917',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P01138',
            geneName: 'NGF',
            intActId: 'EBI-1028250',
          },
          numberOfExperiments: 9,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P08138',
            geneName: 'NGFR',
            intActId: 'EBI-1387782',
          },
          numberOfExperiments: 2,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q6IAD4',
            geneName: 'NOTCH1',
            intActId: 'EBI-25860267',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q99466',
            geneName: 'NOTCH4',
            intActId: 'EBI-7970822',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P43354',
            geneName: 'NR4A2',
            intActId: 'EBI-2681738',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q6PK61',
            geneName: 'NRG1',
            intActId: 'EBI-25938844',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q02818',
            geneName: 'NUCB1',
            intActId: 'EBI-2622179',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P49757-8',
            geneName: 'NUMB',
            intActId: 'EBI-25937715',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P04181',
            geneName: 'OAT',
            intActId: 'EBI-721662',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q96FW1',
            geneName: 'OTUB1',
            intActId: 'EBI-1058491',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P11940',
            geneName: 'PABPC1',
            intActId: 'EBI-81531',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'O96013-2',
            geneName: 'PAK4',
            intActId: 'EBI-21659863',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q99497',
            geneName: 'PARK7',
            intActId: 'EBI-1164361',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q6ZW49',
            geneName: 'PAXIP1',
            intActId: 'EBI-743225',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P61457',
            geneName: 'PCBD1',
            intActId: 'EBI-740475',
          },
          numberOfExperiments: 2,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P16234-2',
            geneName: 'PDGFRA',
            intActId: 'EBI-13380852',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P09619',
            geneName: 'PDGFRB',
            intActId: 'EBI-641237',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P30101',
            geneName: 'PDIA3',
            intActId: 'EBI-979862',
          },
          numberOfExperiments: 6,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q15084',
            geneName: 'PDIA6',
            intActId: 'EBI-1043087',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q15118',
            geneName: 'PDK1',
            intActId: 'EBI-7016221',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q13113',
            geneName: 'PDZK1IP1',
            intActId: 'EBI-716063',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P18669',
            geneName: 'PGAM1',
            intActId: 'EBI-717905',
          },
          numberOfExperiments: 4,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q8WUB8-2',
            geneName: 'PHF10',
            intActId: 'EBI-10276329',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q8N2W9',
            geneName: 'PIAS4',
            intActId: 'EBI-473160',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P42338',
            geneName: 'PIK3CB',
            intActId: 'EBI-2609540',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P48736',
            geneName: 'PIK3CG',
            intActId: 'EBI-1030384',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P27986-2',
            geneName: 'PIK3R1',
            intActId: 'EBI-9090282',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q13526',
            geneName: 'PIN1',
            intActId: 'EBI-714158',
          },
          numberOfExperiments: 4,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q9BXM7',
            geneName: 'PINK1',
            intActId: 'EBI-2846068',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q16512',
            geneName: 'PKN1',
            intActId: 'EBI-602382',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P00749',
            geneName: 'PLAU',
            intActId: 'EBI-3905042',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q13393',
            geneName: 'PLD1',
            intActId: 'EBI-2827556',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'O14939',
            geneName: 'PLD2',
            intActId: 'EBI-1053996',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P53350',
            geneName: 'PLK1',
            intActId: 'EBI-476768',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'O14494',
            geneName: 'PLPP1',
            intActId: 'EBI-2865290',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'O15162',
            geneName: 'PLSCR1',
            intActId: 'EBI-740019',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q8WVK1',
            geneName: 'PLSCR1',
            intActId: 'EBI-10238872',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'D3DTS7',
            geneName: 'PMP22',
            intActId: 'EBI-25882629',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P00491',
            geneName: 'PNP',
            intActId: 'EBI-712238',
          },
          numberOfExperiments: 9,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P62937',
            geneName: 'PPIA',
            intActId: 'EBI-437708',
          },
          numberOfExperiments: 4,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P62136',
            geneName: 'PPP1CA',
            intActId: 'EBI-357253',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P41236',
            geneName: 'PPP1R2',
            intActId: 'EBI-1056517',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P67775',
            geneName: 'PPP2CA',
            intActId: 'EBI-712311',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P63151',
            geneName: 'PPP2R2A',
            intActId: 'EBI-1048931',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q00005',
            geneName: 'PPP2R2B',
            intActId: 'EBI-1052159',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q15172',
            geneName: 'PPP2R5A',
            intActId: 'EBI-641666',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P48454',
            geneName: 'PPP3CC',
            intActId: 'EBI-2827192',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P17612',
            geneName: 'PRKACA',
            intActId: 'EBI-476586',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P22694',
            geneName: 'PRKACB',
            intActId: 'EBI-2679622',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P22694-8',
            geneName: 'PRKACB',
            intActId: 'EBI-25937151',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P22612',
            geneName: 'PRKACG',
            intActId: 'EBI-3907086',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q9UGJ0-3',
            geneName: 'PRKAG2',
            intActId: 'EBI-25939641',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q05655',
            geneName: 'PRKCD',
            intActId: 'EBI-704279',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q02156',
            geneName: 'PRKCE',
            intActId: 'EBI-706254',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'O60260-5',
            geneName: 'PRKN',
            intActId: 'EBI-21251460',
          },
          numberOfExperiments: 5,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P04156',
            geneName: 'PRNP',
            intActId: 'EBI-977302',
          },
          numberOfExperiments: 6,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P60891',
            geneName: 'PRPS1',
            intActId: 'EBI-749195',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P07602',
            geneName: 'PSAP',
            intActId: 'EBI-716699',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P49768',
            geneName: 'PSEN1',
            intActId: 'EBI-297277',
          },
          numberOfExperiments: 6,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P49768-2',
            geneName: 'PSEN1',
            intActId: 'EBI-11047108',
          },
          numberOfExperiments: 6,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P49810',
            geneName: 'PSEN2',
            intActId: 'EBI-2010251',
          },
          numberOfExperiments: 4,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q9NZ42',
            geneName: 'PSENEN',
            intActId: 'EBI-998468',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P28062-2',
            geneName: 'PSMB8',
            intActId: 'EBI-372312',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P17980',
            geneName: 'PSMC3',
            intActId: 'EBI-359720',
          },
          numberOfExperiments: 6,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q14289',
            geneName: 'PTK2B',
            intActId: 'EBI-298640',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P20340-2',
            geneName: 'RAB6A',
            intActId: 'EBI-8840191',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P63000',
            geneName: 'RAC1',
            intActId: 'EBI-413628',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P04049',
            geneName: 'RAF1',
            intActId: 'EBI-365996',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q96S59',
            geneName: 'RANBP9',
            intActId: 'EBI-636085',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q9Y272',
            geneName: 'RASD1',
            intActId: 'EBI-740818',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P61586',
            geneName: 'RHOA',
            intActId: 'EBI-446668',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q9Y3C5',
            geneName: 'RNF11',
            intActId: 'EBI-396669',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q6ZNA4-2',
            geneName: 'RNF111',
            intActId: 'EBI-21535400',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q9ULX5',
            geneName: 'RNF112',
            intActId: 'EBI-25829984',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'O75116',
            geneName: 'ROCK2',
            intActId: 'EBI-366288',
          },
          numberOfExperiments: 6,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P46779',
            geneName: 'RPL28',
            intActId: 'EBI-366357',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q15349',
            geneName: 'RPS6KA2',
            intActId: 'EBI-1384149',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P23443-4',
            geneName: 'RPS6KB1',
            intActId: 'EBI-25882353',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P04271',
            geneName: 'S100B',
            intActId: 'EBI-458391',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P21673',
            geneName: 'SAT1',
            intActId: 'EBI-711613',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q6AZY7-2',
            geneName: 'SCARA3',
            intActId: 'EBI-21598366',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q8WTV0',
            geneName: 'SCARB1',
            intActId: 'EBI-78657',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P18827',
            geneName: 'SDC1',
            intActId: 'EBI-2855248',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q15019-3',
            geneName: 'SEPTIN2',
            intActId: 'EBI-11525407',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'O43236',
            geneName: 'SEPTIN4',
            intActId: 'EBI-1047513',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q99719',
            geneName: 'SEPTIN5',
            intActId: 'EBI-373345',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q92599-3',
            geneName: 'SEPTIN8',
            intActId: 'EBI-25891137',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P01011',
            geneName: 'SERPINA3',
            intActId: 'EBI-296557',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P29353',
            geneName: 'SHC1',
            intActId: 'EBI-78835',
          },
          numberOfExperiments: 5,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q92529',
            geneName: 'SHC3',
            intActId: 'EBI-79084',
          },
          numberOfExperiments: 5,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q8IUQ4-2',
            geneName: 'SIAH1',
            intActId: 'EBI-11522811',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q7Z2H8',
            geneName: 'SLC36A1',
            intActId: 'EBI-9978258',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q9NP59',
            geneName: 'SLC40A1',
            intActId: 'EBI-725153',
          },
          numberOfExperiments: 5,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P84022',
            geneName: 'SMAD3',
            intActId: 'EBI-347161',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q13485',
            geneName: 'SMAD4',
            intActId: 'EBI-347263',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P37840',
            geneName: 'SNCA',
            intActId: 'EBI-985879',
          },
          numberOfExperiments: 6,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q16143',
            geneName: 'SNCB',
            intActId: 'EBI-727106',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q15036',
            geneName: 'SNX17',
            intActId: 'EBI-1752620',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'O60749',
            geneName: 'SNX2',
            intActId: 'EBI-1046690',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q8WV41',
            geneName: 'SNX33',
            intActId: 'EBI-2481535',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q9UNH7',
            geneName: 'SNX6',
            intActId: 'EBI-949294',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q92673',
            geneName: 'SORL1',
            intActId: 'EBI-1171329',
          },
          numberOfExperiments: 5,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q99932-2',
            geneName: 'SPAG8',
            intActId: 'EBI-11959123',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P11277',
            geneName: 'SPTB',
            intActId: 'EBI-514908',
          },
          numberOfExperiments: 6,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q13501',
            geneName: 'SQSTM1',
            intActId: 'EBI-307104',
          },
          numberOfExperiments: 6,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P61278',
            geneName: 'SST',
            intActId: 'EBI-20823968',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P32745',
            geneName: 'SSTR3',
            intActId: 'EBI-6266935',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P40763-2',
            geneName: 'STAT3',
            intActId: 'EBI-10692009',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q8IWL8',
            geneName: 'STH',
            intActId: 'EBI-12843506',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'O14662-5',
            geneName: 'STX16',
            intActId: 'EBI-9089968',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q13190-4',
            geneName: 'STX5',
            intActId: 'EBI-25938350',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'O43752',
            geneName: 'STX6',
            intActId: 'EBI-2695795',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P61764',
            geneName: 'STXBP1',
            intActId: 'EBI-960169',
          },
          numberOfExperiments: 7,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q9Y5B9',
            geneName: 'SUPT16H',
            intActId: 'EBI-1046849',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P43405',
            geneName: 'SYK',
            intActId: 'EBI-78302',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P43405-2',
            geneName: 'SYK',
            intActId: 'EBI-25892332',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P08247',
            geneName: 'SYP',
            intActId: 'EBI-9071725',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q13148',
            geneName: 'TARDBP',
            intActId: 'EBI-372899',
          },
          numberOfExperiments: 6,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P20226',
            geneName: 'TBP',
            intActId: 'EBI-355371',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q16650',
            geneName: 'TBR1',
            intActId: 'EBI-1047158',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'O43680',
            geneName: 'TCF21',
            intActId: 'EBI-723267',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P01137',
            geneName: 'TGFB1',
            intActId: 'EBI-779636',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P61812',
            geneName: 'TGFB2',
            intActId: 'EBI-779581',
          },
          numberOfExperiments: 7,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q15583',
            geneName: 'TGIF1',
            intActId: 'EBI-714215',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q15583-2',
            geneName: 'TGIF1',
            intActId: 'EBI-12691451',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P04216',
            geneName: 'THY1',
            intActId: 'EBI-9071715',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P04183',
            geneName: 'TK1',
            intActId: 'EBI-712550',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q9BX74',
            geneName: 'TM2D1',
            intActId: 'EBI-25832057',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P49755',
            geneName: 'TMED10',
            intActId: 'EBI-998422',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q9BTD3',
            geneName: 'TMEM121',
            intActId: 'EBI-12155101',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P62328',
            geneName: 'TMSB4X',
            intActId: 'EBI-712598',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P01375',
            geneName: 'TNF',
            intActId: 'EBI-359977',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'O43508',
            geneName: 'TNFSF12',
            intActId: 'EBI-6932080',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'O75888-3',
            geneName: 'TNFSF13',
            intActId: 'EBI-12856452',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q96GM8',
            geneName: 'TOE1',
            intActId: 'EBI-717460',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'O14656',
            geneName: 'TOR1A',
            intActId: 'EBI-524257',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'O14656-2',
            geneName: 'TOR1A',
            intActId: 'EBI-25847109',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q05BL1',
            geneName: 'TP53BP2',
            intActId: 'EBI-11952721',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q13625',
            geneName: 'TP53BP2',
            intActId: 'EBI-77642',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q9C026',
            geneName: 'TRIM9',
            intActId: 'EBI-720828',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q15714-2',
            geneName: 'TSC22D1',
            intActId: 'EBI-12034704',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P02766',
            geneName: 'TTR',
            intActId: 'EBI-711909',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q71U36',
            geneName: 'TUBA1A',
            intActId: 'EBI-302552',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P68363',
            geneName: 'TUBA1B',
            intActId: 'EBI-487083',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P68366',
            geneName: 'TUBA4A',
            intActId: 'EBI-351772',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P07437',
            geneName: 'TUBB',
            intActId: 'EBI-350864',
          },
          numberOfExperiments: 5,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q8TBC4',
            geneName: 'UBA3',
            intActId: 'EBI-717567',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P0CG47',
            geneName: 'UBB',
            intActId: 'EBI-413034',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P62837',
            geneName: 'UBE2D2',
            intActId: 'EBI-347677',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q9UMX0',
            geneName: 'UBQLN1',
            intActId: 'EBI-741480',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P09936',
            geneName: 'UCHL1',
            intActId: 'EBI-714860',
          },
          numberOfExperiments: 5,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P13051-2',
            geneName: 'UNG',
            intActId: 'EBI-25834258',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'O75604-3',
            geneName: 'USP2',
            intActId: 'EBI-10696113',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q9BVJ6',
            geneName: 'UTP14A',
            intActId: 'EBI-473284',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q9H270',
            geneName: 'VPS11',
            intActId: 'EBI-373380',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q8N0S8',
            geneName: 'VPS29',
            intActId: 'EBI-25892084',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q96AX1',
            geneName: 'VPS33A',
            intActId: 'EBI-2527283',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q96QK1',
            geneName: 'VPS35',
            intActId: 'EBI-1054634',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q9GZS3',
            geneName: 'WDR61',
            intActId: 'EBI-358545',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'O76024',
            geneName: 'WFS1',
            intActId: 'EBI-720609',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'O00744',
            geneName: 'WNT10B',
            intActId: 'EBI-21797207',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P19544-6',
            geneName: 'WT1',
            intActId: 'EBI-11745701',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P31946',
            geneName: 'YWHAB',
            intActId: 'EBI-359815',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P17028',
            geneName: 'ZNF24',
            intActId: 'EBI-707773',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q8N895',
            geneName: 'ZNF366',
            intActId: 'EBI-2813661',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q8NHT4',
            intActId: 'EBI-25939025',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'O35431',
            geneName: 'Apba2',
            intActId: 'EBI-2028211',
          },
          numberOfExperiments: 5,
          organismDiffer: true,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'P15253',
            geneName: 'CALR',
            intActId: 'EBI-9005200',
          },
          numberOfExperiments: 3,
          organismDiffer: true,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q8BGY9',
            geneName: 'Slc5a7',
            intActId: 'EBI-2010752',
          },
          numberOfExperiments: 2,
          organismDiffer: true,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067',
            intActId: 'EBI-77613',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q306T3',
            intActId: 'EBI-8294101',
          },
          numberOfExperiments: 3,
          organismDiffer: true,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067-2',
            intActId: 'EBI-17264467',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q9H7C9',
            geneName: 'AAMDC',
            intActId: 'EBI-10308705',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067-2',
            intActId: 'EBI-17264467',
          },
          interactantTwo: {
            uniProtKBAccession: 'P63010-2',
            geneName: 'AP2B1',
            intActId: 'EBI-11529439',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067-2',
            intActId: 'EBI-17264467',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q0P5N6',
            geneName: 'ARL16',
            intActId: 'EBI-10186132',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067-2',
            intActId: 'EBI-17264467',
          },
          interactantTwo: {
            uniProtKBAccession: 'O15392',
            geneName: 'BIRC5',
            intActId: 'EBI-518823',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067-2',
            intActId: 'EBI-17264467',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q9UHY8',
            geneName: 'FEZ2',
            intActId: 'EBI-396453',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067-2',
            intActId: 'EBI-17264467',
          },
          interactantTwo: {
            uniProtKBAccession: 'P06241-3',
            geneName: 'FYN',
            intActId: 'EBI-10691738',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067-2',
            intActId: 'EBI-17264467',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q12891',
            geneName: 'HYAL2',
            intActId: 'EBI-2806068',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067-2',
            intActId: 'EBI-17264467',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q6DN90-2',
            geneName: 'IQSEC1',
            intActId: 'EBI-21911304',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067-2',
            intActId: 'EBI-17264467',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q9BYQ4',
            geneName: 'KRTAP9-2',
            intActId: 'EBI-1044640',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067-2',
            intActId: 'EBI-17264467',
          },
          interactantTwo: {
            uniProtKBAccession: 'O95447',
            geneName: 'LCA5L',
            intActId: 'EBI-8473670',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067-2',
            intActId: 'EBI-17264467',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q9BYZ2',
            geneName: 'LDHAL6B',
            intActId: 'EBI-1108377',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067-2',
            intActId: 'EBI-17264467',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q8TDB4',
            geneName: 'MGARP',
            intActId: 'EBI-4397720',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067-2',
            intActId: 'EBI-17264467',
          },
          interactantTwo: {
            uniProtKBAccession: 'A4FUJ8',
            geneName: 'MKL1',
            intActId: 'EBI-21250407',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067-2',
            intActId: 'EBI-17264467',
          },
          interactantTwo: {
            uniProtKBAccession: 'P15941-11',
            geneName: 'MUC1',
            intActId: 'EBI-17263240',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067-2',
            intActId: 'EBI-17264467',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q13113',
            geneName: 'PDZK1IP1',
            intActId: 'EBI-716063',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067-2',
            intActId: 'EBI-17264467',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q6ZNA4-2',
            geneName: 'RNF111',
            intActId: 'EBI-21535400',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067-2',
            intActId: 'EBI-17264467',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q9ULX5',
            geneName: 'RNF112',
            intActId: 'EBI-25829984',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067-2',
            intActId: 'EBI-17264467',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q2NKQ1-4',
            geneName: 'SGSM1',
            intActId: 'EBI-10182463',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067-2',
            intActId: 'EBI-17264467',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q8IUQ4-2',
            geneName: 'SIAH1',
            intActId: 'EBI-11522811',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067-2',
            intActId: 'EBI-17264467',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q99932-2',
            geneName: 'SPAG8',
            intActId: 'EBI-11959123',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067-2',
            intActId: 'EBI-17264467',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q8IUW3',
            geneName: 'SPATA2L',
            intActId: 'EBI-2510414',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067-2',
            intActId: 'EBI-17264467',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q13148',
            geneName: 'TARDBP',
            intActId: 'EBI-372899',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067-2',
            intActId: 'EBI-17264467',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q16650',
            geneName: 'TBR1',
            intActId: 'EBI-1047158',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067-2',
            intActId: 'EBI-17264467',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q5HYA8',
            geneName: 'TMEM67',
            intActId: 'EBI-11334880',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067-2',
            intActId: 'EBI-17264467',
          },
          interactantTwo: {
            uniProtKBAccession: 'P09936',
            geneName: 'UCHL1',
            intActId: 'EBI-714860',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067-2',
            intActId: 'EBI-17264467',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q9GZS3',
            geneName: 'WDR61',
            intActId: 'EBI-358545',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067-4',
            intActId: 'EBI-302641',
          },
          interactantTwo: {
            uniProtKBAccession: 'O00213',
            geneName: 'APBB1',
            intActId: 'EBI-81694',
          },
          numberOfExperiments: 5,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067-4',
            intActId: 'EBI-302641',
          },
          interactantTwo: {
            uniProtKBAccession: 'P51693',
            geneName: 'APLP1',
            intActId: 'EBI-74648',
          },
          numberOfExperiments: 2,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067-4',
            intActId: 'EBI-302641',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q06481',
            geneName: 'APLP2',
            intActId: 'EBI-79306',
          },
          numberOfExperiments: 2,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067-4',
            intActId: 'EBI-302641',
          },
          interactantTwo: {
            uniProtKBAccession: 'P05067-4',
            geneName: 'APP',
            intActId: 'EBI-302641',
          },
          numberOfExperiments: 8,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067-4',
            intActId: 'EBI-302641',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q13867',
            geneName: 'BLMH',
            intActId: 'EBI-718504',
          },
          numberOfExperiments: 2,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067-4',
            intActId: 'EBI-302641',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q9NZU0',
            geneName: 'FLRT3',
            intActId: 'EBI-1057092',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067-4',
            intActId: 'EBI-302641',
          },
          interactantTwo: {
            uniProtKBAccession: 'P46089',
            geneName: 'GPR3',
            intActId: 'EBI-3909653',
          },
          numberOfExperiments: 2,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067-4',
            intActId: 'EBI-302641',
          },
          interactantTwo: {
            uniProtKBAccession: 'O43736',
            geneName: 'ITM2A',
            intActId: 'EBI-2431769',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067-4',
            intActId: 'EBI-302641',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q68DU8',
            geneName: 'KCTD16',
            intActId: 'EBI-20768174',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067-4',
            intActId: 'EBI-302641',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q96FE5',
            geneName: 'LINGO1',
            intActId: 'EBI-719955',
          },
          numberOfExperiments: 2,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067-4',
            intActId: 'EBI-302641',
          },
          interactantTwo: {
            uniProtKBAccession: 'P04629',
            geneName: 'NTRK1',
            intActId: 'EBI-1028226',
          },
          numberOfExperiments: 7,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067-4',
            intActId: 'EBI-302641',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q13526',
            geneName: 'PIN1',
            intActId: 'EBI-714158',
          },
          numberOfExperiments: 2,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067-4',
            intActId: 'EBI-302641',
          },
          interactantTwo: {
            uniProtKBAccession: 'P60201',
            geneName: 'PLP1',
            intActId: 'EBI-8653150',
          },
          numberOfExperiments: 5,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067-4',
            intActId: 'EBI-302641',
          },
          interactantTwo: {
            uniProtKBAccession: 'P04156',
            geneName: 'PRNP',
            intActId: 'EBI-977302',
          },
          numberOfExperiments: 2,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067-4',
            intActId: 'EBI-302641',
          },
          interactantTwo: {
            uniProtKBAccession: 'P49768',
            geneName: 'PSEN1',
            intActId: 'EBI-297277',
          },
          numberOfExperiments: 4,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067-4',
            intActId: 'EBI-302641',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q92673',
            geneName: 'SORL1',
            intActId: 'EBI-1171329',
          },
          numberOfExperiments: 8,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067-4',
            intActId: 'EBI-302641',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q99523',
            geneName: 'SORT1',
            chainId: 'PRO_0000033163',
            intActId: 'EBI-21467118',
          },
          numberOfExperiments: 4,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067-4',
            intActId: 'EBI-302641',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q9HCB6',
            geneName: 'SPON1',
            intActId: 'EBI-2431846',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067-4',
            intActId: 'EBI-302641',
          },
          interactantTwo: {
            uniProtKBAccession: 'O95793',
            geneName: 'STAU1',
            intActId: 'EBI-358174',
          },
          numberOfExperiments: 2,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067-4',
            intActId: 'EBI-302641',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q8VEK0',
            geneName: 'Tmem30a',
            intActId: 'EBI-8381028',
          },
          numberOfExperiments: 6,
          organismDiffer: true,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067-8',
            intActId: 'EBI-302661',
          },
          interactantTwo: {
            uniProtKBAccession: 'P17677',
            geneName: 'GAP43',
            intActId: 'EBI-1267511',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067-8',
            intActId: 'EBI-302661',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q9NSC5',
            geneName: 'HOMER3',
            intActId: 'EBI-748420',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P05067-8',
            intActId: 'EBI-302661',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q9Y287',
            geneName: 'ITM2B',
            intActId: 'EBI-2866431',
          },
          numberOfExperiments: 4,
          organismDiffer: false,
        },
        {
          interactantOne: {
            chainId: 'PRO_0000000089',
            intActId: 'EBI-20829246',
          },
          interactantTwo: {
            uniProtKBAccession: 'O95631',
            geneName: 'NTN1',
            intActId: 'EBI-2678626',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            chainId: 'PRO_0000000090',
            intActId: 'EBI-21194918',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q9UIK5',
            geneName: 'TMEFF2',
            intActId: 'EBI-11423693',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            chainId: 'PRO_0000000091',
            intActId: 'EBI-3894543',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q92673',
            geneName: 'SORL1',
            intActId: 'EBI-1171329',
          },
          numberOfExperiments: 4,
          organismDiffer: false,
        },
        {
          interactantOne: {
            chainId: 'PRO_0000000091',
            intActId: 'EBI-3894543',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q8K3H7',
            geneName: 'CALR',
            intActId: 'EBI-9005068',
          },
          numberOfExperiments: 2,
          organismDiffer: true,
        },
        {
          interactantOne: {
            chainId: 'PRO_0000000091',
            intActId: 'EBI-3894543',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q8VEK0',
            geneName: 'Tmem30a',
            intActId: 'EBI-8381028',
          },
          numberOfExperiments: 3,
          organismDiffer: true,
        },
        {
          interactantOne: { chainId: 'PRO_0000000092', intActId: 'EBI-821758' },
          interactantTwo: {
            uniProtKBAccession: 'P05067',
            geneName: 'APP',
            chainId: 'PRO_0000000092',
            intActId: 'EBI-821758',
          },
          numberOfExperiments: 75,
          organismDiffer: false,
        },
        {
          interactantOne: { chainId: 'PRO_0000000092', intActId: 'EBI-821758' },
          interactantTwo: {
            uniProtKBAccession: 'P48047',
            geneName: 'ATP5PO',
            intActId: 'EBI-355815',
          },
          numberOfExperiments: 2,
          organismDiffer: false,
        },
        {
          interactantOne: { chainId: 'PRO_0000000092', intActId: 'EBI-821758' },
          interactantTwo: {
            uniProtKBAccession: 'P36544',
            geneName: 'CHRNA7',
            intActId: 'EBI-79333',
          },
          numberOfExperiments: 7,
          organismDiffer: false,
        },
        {
          interactantOne: { chainId: 'PRO_0000000092', intActId: 'EBI-821758' },
          interactantTwo: {
            uniProtKBAccession: 'P10909-5',
            geneName: 'CLU',
            intActId: 'EBI-10961636',
          },
          numberOfExperiments: 2,
          organismDiffer: false,
        },
        {
          interactantOne: { chainId: 'PRO_0000000092', intActId: 'EBI-821758' },
          interactantTwo: {
            uniProtKBAccession: 'P39060',
            geneName: 'COL18A1',
            chainId: 'PRO_0000005794',
            intActId: 'EBI-2566375',
          },
          numberOfExperiments: 2,
          organismDiffer: false,
        },
        {
          interactantOne: { chainId: 'PRO_0000000092', intActId: 'EBI-821758' },
          interactantTwo: {
            uniProtKBAccession: 'O00230',
            geneName: 'CORT',
            chainId: 'PRO_0000033156',
            intActId: 'EBI-20824092',
          },
          numberOfExperiments: 4,
          organismDiffer: false,
        },
        {
          interactantOne: { chainId: 'PRO_0000000092', intActId: 'EBI-821758' },
          interactantTwo: {
            uniProtKBAccession: 'Q99714',
            geneName: 'HSD17B10',
            intActId: 'EBI-79964',
          },
          numberOfExperiments: 2,
          organismDiffer: false,
        },
        {
          interactantOne: { chainId: 'PRO_0000000092', intActId: 'EBI-821758' },
          interactantTwo: {
            uniProtKBAccession: 'Q8N423',
            geneName: 'LILRB2',
            intActId: 'EBI-2816428',
          },
          numberOfExperiments: 7,
          organismDiffer: false,
        },
        {
          interactantOne: { chainId: 'PRO_0000000092', intActId: 'EBI-821758' },
          interactantTwo: {
            uniProtKBAccession: 'P10636',
            geneName: 'MAPT',
            intActId: 'EBI-366182',
          },
          numberOfExperiments: 5,
          organismDiffer: false,
        },
        {
          interactantOne: { chainId: 'PRO_0000000092', intActId: 'EBI-821758' },
          interactantTwo: {
            uniProtKBAccession: 'P08253',
            geneName: 'MMP2',
            intActId: 'EBI-1033518',
          },
          numberOfExperiments: 4,
          organismDiffer: false,
        },
        {
          interactantOne: { chainId: 'PRO_0000000092', intActId: 'EBI-821758' },
          interactantTwo: {
            uniProtKBAccession: 'Q9NZV6',
            geneName: 'MSRB1',
            intActId: 'EBI-12330065',
          },
          numberOfExperiments: 4,
          organismDiffer: false,
        },
        {
          interactantOne: { chainId: 'PRO_0000000092', intActId: 'EBI-821758' },
          interactantTwo: {
            uniProtKBAccession: 'P03897',
            geneName: 'MT-ND3',
            intActId: 'EBI-1246249',
          },
          numberOfExperiments: 2,
          organismDiffer: false,
        },
        {
          interactantOne: { chainId: 'PRO_0000000092', intActId: 'EBI-821758' },
          interactantTwo: {
            uniProtKBAccession: 'Q8IVG9',
            geneName: 'MT-RNR2',
            intActId: 'EBI-8643752',
          },
          numberOfExperiments: 4,
          organismDiffer: false,
        },
        {
          interactantOne: { chainId: 'PRO_0000000092', intActId: 'EBI-821758' },
          interactantTwo: {
            uniProtKBAccession: 'O95631',
            geneName: 'NTN1',
            intActId: 'EBI-2678626',
          },
          numberOfExperiments: 6,
          organismDiffer: false,
        },
        {
          interactantOne: { chainId: 'PRO_0000000092', intActId: 'EBI-821758' },
          interactantTwo: {
            uniProtKBAccession: 'Q15113',
            geneName: 'PCOLCE',
            intActId: 'EBI-8869614',
          },
          numberOfExperiments: 4,
          organismDiffer: false,
        },
        {
          interactantOne: { chainId: 'PRO_0000000092', intActId: 'EBI-821758' },
          interactantTwo: {
            uniProtKBAccession: 'Q08752',
            geneName: 'PPID',
            intActId: 'EBI-716596',
          },
          numberOfExperiments: 4,
          organismDiffer: false,
        },
        {
          interactantOne: { chainId: 'PRO_0000000092', intActId: 'EBI-821758' },
          interactantTwo: {
            uniProtKBAccession: 'P30405',
            geneName: 'PPIF',
            intActId: 'EBI-5544229',
          },
          numberOfExperiments: 2,
          organismDiffer: false,
        },
        {
          interactantOne: { chainId: 'PRO_0000000092', intActId: 'EBI-821758' },
          interactantTwo: {
            uniProtKBAccession: 'P04156',
            geneName: 'PRNP',
            intActId: 'EBI-977302',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: { chainId: 'PRO_0000000092', intActId: 'EBI-821758' },
          interactantTwo: {
            uniProtKBAccession: 'P11686-1',
            geneName: 'SFTPC',
            intActId: 'EBI-16143688',
          },
          numberOfExperiments: 5,
          organismDiffer: false,
        },
        {
          interactantOne: { chainId: 'PRO_0000000092', intActId: 'EBI-821758' },
          interactantTwo: {
            uniProtKBAccession: 'P61278',
            geneName: 'SST',
            chainId: 'PRO_0000033088',
            intActId: 'EBI-20824010',
          },
          numberOfExperiments: 4,
          organismDiffer: false,
        },
        {
          interactantOne: { chainId: 'PRO_0000000092', intActId: 'EBI-821758' },
          interactantTwo: {
            uniProtKBAccession: 'P21980',
            geneName: 'TGM2',
            intActId: 'EBI-727668',
          },
          numberOfExperiments: 2,
          organismDiffer: false,
        },
        {
          interactantOne: { chainId: 'PRO_0000000092', intActId: 'EBI-821758' },
          interactantTwo: {
            uniProtKBAccession: 'O95411',
            geneName: 'TIAF1',
            intActId: 'EBI-302378',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: { chainId: 'PRO_0000000092', intActId: 'EBI-821758' },
          interactantTwo: {
            uniProtKBAccession: 'O60602',
            geneName: 'TLR5',
            intActId: 'EBI-3505951',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: { chainId: 'PRO_0000000092', intActId: 'EBI-821758' },
          interactantTwo: {
            uniProtKBAccession: 'Q9NZC2',
            geneName: 'TREM2',
            intActId: 'EBI-14036387',
          },
          numberOfExperiments: 4,
          organismDiffer: false,
        },
        {
          interactantOne: { chainId: 'PRO_0000000092', intActId: 'EBI-821758' },
          interactantTwo: {
            uniProtKBAccession: 'P02766',
            geneName: 'TTR',
            intActId: 'EBI-711909',
          },
          numberOfExperiments: 2,
          organismDiffer: false,
        },
        {
          interactantOne: { chainId: 'PRO_0000000092', intActId: 'EBI-821758' },
          interactantTwo: {
            uniProtKBAccession: 'P15253',
            geneName: 'CALR',
            intActId: 'EBI-9005200',
          },
          numberOfExperiments: 2,
          organismDiffer: true,
        },
        {
          interactantOne: { chainId: 'PRO_0000000092', intActId: 'EBI-821758' },
          interactantTwo: {
            uniProtKBAccession: 'Q05941',
            geneName: 'Chrna7',
            intActId: 'EBI-79422',
          },
          numberOfExperiments: 3,
          organismDiffer: true,
        },
        {
          interactantOne: { chainId: 'PRO_0000000092', intActId: 'EBI-821758' },
          interactantTwo: {
            uniProtKBAccession: 'P97484',
            geneName: 'Lilrb3',
            intActId: 'EBI-15728641',
          },
          numberOfExperiments: 8,
          organismDiffer: true,
        },
        {
          interactantOne: { chainId: 'PRO_0000000092', intActId: 'EBI-821758' },
          interactantTwo: {
            uniProtKBAccession: 'Q99NH8',
            geneName: 'Trem2',
            intActId: 'EBI-15982016',
          },
          numberOfExperiments: 2,
          organismDiffer: true,
        },
        {
          interactantOne: {
            chainId: 'PRO_0000000093',
            intActId: 'EBI-2431589',
          },
          interactantTwo: {
            uniProtKBAccession: 'P02649',
            geneName: 'APOE',
            intActId: 'EBI-1222467',
          },
          numberOfExperiments: 4,
          organismDiffer: false,
        },
        {
          interactantOne: {
            chainId: 'PRO_0000000093',
            intActId: 'EBI-2431589',
          },
          interactantTwo: {
            uniProtKBAccession: 'P05067',
            geneName: 'APP',
            chainId: 'PRO_0000000093',
            intActId: 'EBI-2431589',
          },
          numberOfExperiments: 29,
          organismDiffer: false,
        },
        {
          interactantOne: {
            chainId: 'PRO_0000000093',
            intActId: 'EBI-2431589',
          },
          interactantTwo: {
            uniProtKBAccession: 'P10909',
            geneName: 'CLU',
            intActId: 'EBI-1104674',
          },
          numberOfExperiments: 4,
          organismDiffer: false,
        },
        {
          interactantOne: {
            chainId: 'PRO_0000000093',
            intActId: 'EBI-2431589',
          },
          interactantTwo: {
            uniProtKBAccession: 'P49840',
            geneName: 'GSK3A',
            intActId: 'EBI-1044067',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            chainId: 'PRO_0000000093',
            intActId: 'EBI-2431589',
          },
          interactantTwo: {
            uniProtKBAccession: 'P49841',
            geneName: 'GSK3B',
            intActId: 'EBI-373586',
          },
          numberOfExperiments: 2,
          organismDiffer: false,
        },
        {
          interactantOne: {
            chainId: 'PRO_0000000093',
            intActId: 'EBI-2431589',
          },
          interactantTwo: {
            uniProtKBAccession: 'P14735-1',
            geneName: 'IDE',
            intActId: 'EBI-15607031',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            chainId: 'PRO_0000000093',
            intActId: 'EBI-2431589',
          },
          interactantTwo: {
            uniProtKBAccession: 'P08253',
            geneName: 'MMP2',
            intActId: 'EBI-1033518',
          },
          numberOfExperiments: 2,
          organismDiffer: false,
        },
        {
          interactantOne: {
            chainId: 'PRO_0000000093',
            intActId: 'EBI-2431589',
          },
          interactantTwo: {
            uniProtKBAccession: 'P08138',
            geneName: 'NGFR',
            intActId: 'EBI-1387782',
          },
          numberOfExperiments: 2,
          organismDiffer: false,
        },
        {
          interactantOne: {
            chainId: 'PRO_0000000093',
            intActId: 'EBI-2431589',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q5JRX3-1',
            geneName: 'PITRM1',
            intActId: 'EBI-16109799',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            chainId: 'PRO_0000000093',
            intActId: 'EBI-2431589',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q08752',
            geneName: 'PPID',
            intActId: 'EBI-716596',
          },
          numberOfExperiments: 2,
          organismDiffer: false,
        },
        {
          interactantOne: {
            chainId: 'PRO_0000000093',
            intActId: 'EBI-2431589',
          },
          interactantTwo: {
            uniProtKBAccession: 'Q92673',
            geneName: 'SORL1',
            intActId: 'EBI-1171329',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            chainId: 'PRO_0000000093',
            intActId: 'EBI-2431589',
          },
          interactantTwo: {
            uniProtKBAccession: 'O60602',
            geneName: 'TLR5',
            intActId: 'EBI-3505951',
          },
          numberOfExperiments: 3,
          organismDiffer: false,
        },
        {
          interactantOne: {
            chainId: 'PRO_0000000093',
            intActId: 'EBI-2431589',
          },
          interactantTwo: {
            uniProtKBAccession: 'P31696',
            geneName: 'AGRN',
            intActId: 'EBI-457650',
          },
          numberOfExperiments: 3,
          organismDiffer: true,
        },
        {
          interactantOne: {
            chainId: 'PRO_0000000093',
            intActId: 'EBI-2431589',
          },
          interactantTwo: {
            uniProtKBAccession: 'P15253',
            geneName: 'CALR',
            intActId: 'EBI-9005200',
          },
          numberOfExperiments: 2,
          organismDiffer: true,
        },
        {
          interactantOne: {
            chainId: 'PRO_0000000093',
            intActId: 'EBI-2431589',
          },
          interactantTwo: {
            uniProtKBAccession: 'P07174',
            geneName: 'Ngfr',
            intActId: 'EBI-1038810',
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
            evidences: [
              { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10341243' },
              { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '20580937' },
            ],
            value:
              'Cell surface protein that rapidly becomes internalized via clathrin-coated pits. Only a minor proportion is present at the cell membrane; most of the protein is present in intracellular vesicles (PubMed:20580937). During maturation, the immature APP (N-glycosylated in the endoplasmic reticulum) moves to the Golgi complex where complete maturation occurs (O-glycosylated and sulfated). After alpha-secretase cleavage, soluble APP is released into the extracellular space and the C-terminal is internalized to endosomes and lysosomes. Some APP accumulates in secretory transport vesicles leaving the late Golgi compartment and returns to the cell surface. APP sorts to the basolateral surface in epithelial cells. During neuronal differentiation, the Thr-743 phosphorylated form is located mainly in growth cones, moderately in neurites and sparingly in the cell body (PubMed:10341243). Casein kinase phosphorylation can occur either at the cell surface or within a post-Golgi compartment. Associates with GPC1 in perinuclear compartments. Colocalizes with SORL1 in a vesicular pattern in cytoplasm and perinuclear regions',
          },
        ],
      },
      subcellularLocations: [
        {
          location: {
            evidences: [
              { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10383380' },
              { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '20580937' },
              { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '2649245' },
              { evidenceCode: 'ECO:0000305', source: 'PubMed', id: '25122912' },
            ],
            value: 'Cell membrane',
            id: 'SL-0039',
          },
          topology: {
            evidences: [
              { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '30630874' },
              { evidenceCode: 'ECO:0000305', source: 'PubMed', id: '10383380' },
              { evidenceCode: 'ECO:0000305', source: 'PubMed', id: '25122912' },
            ],
            value: 'Single-pass type I membrane protein',
            id: 'SL-9905',
          },
        },
        {
          location: {
            evidences: [
              { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '2900137' },
              { evidenceCode: 'ECO:0000305', source: 'PubMed', id: '22584060' },
            ],
            value: 'Membrane',
            id: 'SL-0162',
          },
          topology: {
            evidences: [
              { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '2900137' },
              { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '30630874' },
              { evidenceCode: 'ECO:0000305', source: 'PubMed', id: '22584060' },
            ],
            value: 'Single-pass type I membrane protein',
            id: 'SL-9905',
          },
        },
        {
          location: {
            evidences: [
              { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10341243' },
            ],
            value: 'Perikaryon',
            id: 'SL-0197',
          },
        },
        {
          location: {
            evidences: [
              { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10341243' },
            ],
            value: 'Cell projection, growth cone',
            id: 'SL-0288',
          },
        },
        {
          location: {
            evidences: [
              { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '20580937' },
            ],
            value: 'Membrane, clathrin-coated pit',
            id: 'SL-0069',
          },
        },
        {
          location: {
            evidences: [
              { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '20580937' },
            ],
            value: 'Early endosome',
            id: 'SL-0094',
          },
        },
        {
          location: {
            evidences: [
              { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '20580937' },
              { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '25122912' },
            ],
            value: 'Cytoplasmic vesicle',
            id: 'SL-0088',
          },
        },
      ],
    },
    {
      commentType: 'SUBCELLULAR LOCATION',
      molecule: 'Soluble APP-beta',
      subcellularLocations: [
        {
          location: {
            evidences: [
              { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10656250' },
              { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '2649245' },
            ],
            value: 'Secreted',
            id: 'SL-0243',
          },
        },
      ],
    },
    {
      commentType: 'SUBCELLULAR LOCATION',
      molecule: 'Amyloid-beta protein 42',
      note: {
        texts: [
          {
            evidences: [
              { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11689470' },
            ],
            value:
              'Associates with FPR2 at the cell surface and the complex is then rapidly internalized',
          },
        ],
      },
      subcellularLocations: [
        { location: { value: 'Cell surface', id: 'SL-0310' } },
      ],
    },
    {
      commentType: 'SUBCELLULAR LOCATION',
      molecule: 'Gamma-secretase C-terminal fragment 59',
      note: {
        texts: [
          {
            evidences: [
              {
                evidenceCode: 'ECO:0000250',
                source: 'UniProtKB',
                id: 'P12023',
              },
              { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11544248' },
            ],
            value:
              'Located to both the cytoplasm and nuclei of neurons. It can be translocated to the nucleus through association with APBB1 (Fe65) (PubMed:11544248). In dopaminergic neurons, the phosphorylated Thr-743 form is localized to the nucleus (By similarity)',
          },
        ],
      },
      subcellularLocations: [
        {
          location: {
            evidences: [
              { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11544248' },
            ],
            value: 'Nucleus',
            id: 'SL-0191',
          },
        },
        {
          location: {
            evidences: [
              { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11544248' },
            ],
            value: 'Cytoplasm',
            id: 'SL-0086',
          },
        },
      ],
    },
    {
      commentType: 'ALTERNATIVE PRODUCTS',
      events: ['Alternative splicing'],
      isoforms: [
        {
          name: { value: 'APP770' },
          synonyms: [{ value: 'PreA4 770' }],
          isoformIds: ['P05067-1'],
          isoformSequenceStatus: 'Displayed',
        },
        {
          name: { value: 'APP305' },
          isoformIds: ['P05067-2'],
          sequenceIds: ['VSP_000005', 'VSP_000006'],
          isoformSequenceStatus: 'Described',
        },
        {
          name: { value: 'L-APP677' },
          isoformIds: ['P05067-3'],
          sequenceIds: ['VSP_000002', 'VSP_000004', 'VSP_000009'],
          isoformSequenceStatus: 'Described',
        },
        {
          name: { value: 'APP695' },
          synonyms: [{ value: 'PreA4 695' }],
          isoformIds: ['P05067-4'],
          sequenceIds: ['VSP_000002', 'VSP_000004'],
          isoformSequenceStatus: 'Described',
        },
        {
          name: { value: 'L-APP696' },
          isoformIds: ['P05067-5'],
          sequenceIds: ['VSP_000002', 'VSP_000003', 'VSP_000009'],
          isoformSequenceStatus: 'Described',
        },
        {
          name: { value: 'APP714' },
          isoformIds: ['P05067-6'],
          sequenceIds: ['VSP_000002', 'VSP_000003'],
          isoformSequenceStatus: 'Described',
        },
        {
          name: { value: 'L-APP733' },
          isoformIds: ['P05067-7'],
          sequenceIds: ['VSP_000007', 'VSP_000008', 'VSP_000009'],
          isoformSequenceStatus: 'Described',
        },
        {
          name: { value: 'APP751' },
          synonyms: [{ value: 'PreA4 751' }],
          isoformIds: ['P05067-8'],
          sequenceIds: ['VSP_000007', 'VSP_000008'],
          isoformSequenceStatus: 'Described',
        },
        {
          name: { value: 'L-APP752' },
          isoformIds: ['P05067-9'],
          sequenceIds: ['VSP_000009'],
          isoformSequenceStatus: 'Described',
        },
        {
          name: { value: 'APP639' },
          isoformIds: ['P05067-10'],
          sequenceIds: ['VSP_009116', 'VSP_009117', 'VSP_009118'],
          isoformSequenceStatus: 'Described',
        },
        {
          name: { value: '11' },
          isoformIds: ['P05067-11'],
          sequenceIds: ['VSP_045446', 'VSP_045447'],
          isoformSequenceStatus: 'Described',
        },
      ],
      note: {
        texts: [
          {
            value:
              'Additional isoforms seem to exist. Experimental confirmation may be lacking for some isoforms.',
          },
        ],
      },
    },
    {
      texts: [
        {
          evidences: [
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '12859342' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '1406936' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '2649245' },
          ],
          value:
            'Expressed in the brain and in cerebrospinal fluid (at protein level) (PubMed:2649245). Expressed in all fetal tissues examined with highest levels in brain, kidney, heart and spleen. Weak expression in liver. In adult brain, highest expression found in the frontal lobe of the cortex and in the anterior perisylvian cortex-opercular gyri. Moderate expression in the cerebellar cortex, the posterior perisylvian cortex-opercular gyri and the temporal associated cortex. Weak expression found in the striate, extra-striate and motor cortices. Expressed in cerebrospinal fluid, and plasma. Isoform APP695 is the predominant form in neuronal tissue, isoform APP751 and isoform APP770 are widely expressed in non-neuronal cells. Isoform APP751 is the most abundant form in T-lymphocytes. Appican is expressed in astrocytes',
        },
      ],
      commentType: 'TISSUE SPECIFICITY',
    },
    {
      texts: [{ value: 'Increased levels during neuronal differentiation' }],
      commentType: 'INDUCTION',
    },
    {
      texts: [
        {
          evidences: [
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '30630874' },
          ],
          value:
            'The transmembrane helix undergoes a conformation change and unravels partially when bound to PSEN1, facilitating cleavage by PSEN1',
        },
      ],
      commentType: 'DOMAIN',
    },
    {
      texts: [
        {
          evidences: [
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '9843960' },
          ],
          value:
            'The basolateral sorting signal (BaSS) is required for sorting of membrane proteins to the basolateral surface of epithelial cells',
        },
      ],
      commentType: 'DOMAIN',
    },
    {
      texts: [
        {
          evidences: [
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '25122912' },
          ],
          value:
            'The GFLD subdomain binds Cu(2+) ions; this promotes homodimerization',
        },
      ],
      commentType: 'DOMAIN',
    },
    {
      texts: [
        {
          evidences: [
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10383380' },
          ],
          value:
            'The NPXY sequence motif found in many tyrosine-phosphorylated proteins is required for the specific binding of the PID domain. However, additional amino acids either N- or C-terminal to the NPXY motif are often required for complete interaction. The PID domain-containing proteins which bind APP require the YENPTY motif for full interaction. These interactions are independent of phosphorylation on the terminal tyrosine residue. The YENPXY site is also involved in clathrin-mediated endocytosis',
        },
      ],
      commentType: 'DOMAIN',
    },
    {
      texts: [
        {
          evidences: [
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '26898943' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '28570778' },
          ],
          value:
            'The C-terminal region can bind zinc ions; this favors dimerization and formation of higher oligomers',
        },
      ],
      commentType: 'DOMAIN',
    },
    {
      texts: [
        {
          evidences: [
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '2649245' },
          ],
          value:
            'The OX-2 motif shows some similarity to a region in the N-terminus of CD200/MOX2',
        },
      ],
      commentType: 'DOMAIN',
    },
    {
      texts: [
        {
          evidences: [
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10656250' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '30630874' },
          ],
          value:
            'Proteolytically processed under normal cellular conditions. Cleavage either by alpha-secretase, beta-secretase or theta-secretase leads to generation and extracellular release of soluble APP peptides, S-APP-alpha and S-APP-beta, and the retention of corresponding membrane-anchored C-terminal fragments, C80, C83 and C99. Subsequent processing of C80 and C83 by gamma-secretase yields P3 peptides. This is the major secretory pathway and is non-amyloidogenic. Alternatively, presenilin/nicastrin-mediated gamma-secretase processing of C99 releases the amyloid-beta proteins, amyloid-beta protein 40 and amyloid-beta protein 42, major components of amyloid plaques, and the cytotoxic C-terminal fragments, gamma-CTF(50), gamma-CTF(57) and gamma-CTF(59). PSEN1 cleavage is more efficient with C83 than with C99 as substrate (in vitro) (PubMed:30630874). Many other minor amyloid-beta peptides, amyloid-beta 1-X peptides, are found in cerebral spinal fluid (CSF) including the amyloid-beta X-15 peptides, produced from the cleavage by alpha-secretase and all terminating at Gln-686',
        },
      ],
      commentType: 'PTM',
    },
    {
      texts: [
        {
          evidences: [
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10319819' },
          ],
          value:
            'Proteolytically cleaved by caspases during neuronal apoptosis. Cleavage at Asp-739 by either CASP6, CASP8 or CASP9 results in the production of the neurotoxic C31 peptide and the increased production of amyloid-beta peptides',
        },
      ],
      commentType: 'PTM',
    },
    {
      texts: [
        {
          evidences: [
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '16335952' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '21712440' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '22576872' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '2649245' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '2900137' },
          ],
          value:
            'N-glycosylated (PubMed:2900137). N- and O-glycosylated (PubMed:2649245). O-glycosylation on Ser and Thr residues with core 1 or possibly core 8 glycans. Partial tyrosine glycosylation (Tyr-681) is found on some minor, short amyloid-beta peptides (amyloid-beta 1-15, 1-16, 1-17, 1-18, 1-19 and 1-20) but not found on amyloid-beta protein 38, amyloid-beta protein 40 nor on amyloid-beta protein 42. Modification on a tyrosine is unusual and is more prevelant in AD patients. Glycans had Neu5AcHex(Neu5Ac)HexNAc-O-Tyr, Neu5AcNeu5AcHex(Neu5Ac)HexNAc-O-Tyr and O-AcNeu5AcNeu5AcHex(Neu5Ac)HexNAc-O-Tyr structures, where O-Ac is O-acetylation of Neu5Ac. Neu5AcNeu5Ac is most likely Neu5Ac 2,8Neu5Ac linked. O-glycosylations in the vicinity of the cleavage sites may influence the proteolytic processing. Appicans are L-APP isoforms with O-linked chondroitin sulfate',
        },
      ],
      commentType: 'PTM',
    },
    {
      texts: [
        {
          evidences: [
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10341243' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11146006' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11517218' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11877420' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '28720718' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8131745' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8999878' },
          ],
          value:
            'Phosphorylation in the C-terminal on tyrosine, threonine and serine residues is neuron-specific (PubMed:10341243). Phosphorylation can affect APP processing, neuronal differentiation and interaction with other proteins (PubMed:10341243). Phosphorylated on Thr-743 in neuronal cells by Cdc5 kinase and Mapk10, in dividing cells by Cdc2 kinase in a cell-cycle dependent manner with maximal levels at the G2/M phase and, in vitro, by GSK-3-beta (PubMed:8131745, PubMed:11146006). The Thr-743 phosphorylated form causes a conformational change which reduces binding of Fe65 family members (PubMed:11517218). In dopaminergic (DA) neurons, phosphorylation on Thr-743 by LRKK2 promotes the production and the nuclear translocation of the APP intracellular domain (AICD) which induces DA neuron apoptosis (PubMed:28720718). Phosphorylation on Tyr-757 is required for SHC binding (PubMed:11877420). Phosphorylated in the extracellular domain by casein kinases on both soluble and membrane-bound APP. This phosphorylation is inhibited by heparin (PubMed:8999878)',
        },
      ],
      commentType: 'PTM',
    },
    {
      texts: [
        {
          value:
            'Extracellular binding and reduction of copper, results in a corresponding oxidation of Cys-144 and Cys-158, and the formation of a disulfide bond. In vitro, the APP-Cu(+) complex in the presence of hydrogen peroxide results in an increased production of amyloid-beta-containing peptides',
        },
      ],
      commentType: 'PTM',
    },
    {
      texts: [
        {
          value:
            'Trophic-factor deprivation triggers the cleavage of surface APP by beta-secretase to release sAPP-beta which is further cleaved to release an N-terminal fragment of APP (N-APP)',
        },
      ],
      commentType: 'PTM',
    },
    {
      texts: [
        {
          evidences: [
            { evidenceCode: 'ECO:0000250', source: 'UniProtKB', id: 'P12023' },
          ],
          value: 'Amyloid-beta peptides are degraded by IDE',
        },
      ],
      commentType: 'PTM',
    },
    {
      texts: [
        {
          evidences: [
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '2649245' },
          ],
          value: 'Sulfated on tyrosine residues',
        },
      ],
      commentType: 'PTM',
    },
    {
      commentType: 'MASS SPECTROMETRY',
      molecule: 'Gamma-secretase C-terminal fragment 59',
      method: 'MALDI',
      molWeight: 6461.6,
      molWeightError: 0.0,
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '12214090' },
      ],
    },
    {
      commentType: 'MASS SPECTROMETRY',
      molecule: 'Gamma-secretase C-terminal fragment 57',
      method: 'MALDI',
      molWeight: 6451.6,
      molWeightError: 0.0,
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '12214090' },
      ],
    },
    {
      commentType: 'DISEASE',
      disease: {
        diseaseId: 'Alzheimer disease 1',
        diseaseAccession: 'DI-00085',
        acronym: 'AD1',
        description:
          'A familial early-onset form of Alzheimer disease. It can be associated with cerebral amyloid angiopathy. Alzheimer disease is a neurodegenerative disorder characterized by progressive dementia, loss of cognitive abilities, and deposition of fibrillar amyloid proteins as intraneuronal neurofibrillary tangles, extracellular amyloid plaques and vascular amyloid deposits. The major constituents of these plaques are neurotoxic amyloid-beta protein 40 and amyloid-beta protein 42, that are produced by the proteolysis of the transmembrane APP protein. The cytotoxic C-terminal fragments (CTFs) and the caspase-cleaved products, such as C31, are also implicated in neuronal death.',
        diseaseCrossReference: { database: 'MIM', id: '104300' },
        evidences: [
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10097173' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10631141' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10656250' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10665499' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10677483' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10867787' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11063718' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11311152' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11528419' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '12034808' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '1302033' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '1303239' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '1303275' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '1415269' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '1465129' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '15201367' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '15365148' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '15668448' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '1671712' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '1678058' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '1908231' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '1925564' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '1944558' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8267572' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8290042' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8476439' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8577393' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8886002' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '9328472' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '9754958' },
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
        diseaseId: 'Cerebral amyloid angiopathy, APP-related',
        diseaseAccession: 'DI-00097',
        acronym: 'CAA-APP',
        description:
          'A hereditary localized amyloidosis due to amyloid-beta A4 peptide(s) deposition in the cerebral vessels. The principal clinical characteristics are recurrent cerebral and cerebellar hemorrhages, recurrent strokes, cerebral ischemia, cerebral infarction, and progressive mental deterioration. Patients develop cerebral hemorrhage because of the severe cerebral amyloid angiopathy. Parenchymal amyloid deposits are rare and largely in the form of pre-amyloid lesions or diffuse plaque-like structures. They are Congo red negative and lack the dense amyloid cores commonly present in Alzheimer disease. Some affected individuals manifest progressive aphasic dementia, leukoencephalopathy, and occipital calcifications.',
        diseaseCrossReference: { database: 'MIM', id: '605714' },
        evidences: [
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11409420' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '12654973' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '16178030' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '20697050' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '2111584' },
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
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '26898943' },
            { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '28570778' },
          ],
          value:
            'Chelation of metal ions, notably copper, iron and zinc, can induce histidine-bridging between amyloid-beta molecules resulting in amyloid-beta-metal aggregates. The affinity for copper is much higher than for other transient metals and is increased under acidic conditions. Extracellular zinc-binding increases binding of heparin to APP and inhibits collagen-binding',
        },
      ],
      commentType: 'MISCELLANEOUS',
    },
    {
      texts: [{ value: 'A major isoform' }],
      commentType: 'MISCELLANEOUS',
      molecule: 'Isoform APP770',
    },
    {
      texts: [
        {
          evidences: [{ evidenceCode: 'ECO:0000305' }],
          value: 'The L-isoforms are referred to as appicans',
        },
      ],
      commentType: 'MISCELLANEOUS',
      molecule: 'Isoform L-APP677',
    },
    {
      texts: [
        {
          evidences: [{ evidenceCode: 'ECO:0000305' }],
          value: 'A major isoform',
        },
      ],
      commentType: 'MISCELLANEOUS',
      molecule: 'Isoform APP695',
    },
    {
      texts: [
        {
          evidences: [{ evidenceCode: 'ECO:0000305' }],
          value: 'The L-isoforms are referred to as appicans',
        },
      ],
      commentType: 'MISCELLANEOUS',
      molecule: 'Isoform L-APP696',
    },
    {
      texts: [
        {
          evidences: [{ evidenceCode: 'ECO:0000305' }],
          value: 'The L-isoforms are referred to as appicans',
        },
      ],
      commentType: 'MISCELLANEOUS',
      molecule: 'Isoform L-APP733',
    },
    {
      texts: [
        {
          evidences: [{ evidenceCode: 'ECO:0000305' }],
          value: 'A major isoform',
        },
      ],
      commentType: 'MISCELLANEOUS',
      molecule: 'Isoform APP751',
    },
    {
      texts: [
        {
          evidences: [
            {
              evidenceCode: 'ECO:0000255',
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
      commentType: 'SEQUENCE CAUTION',
      sequenceCautionType: 'Miscellaneous discrepancy',
      sequence: 'AAA58727.1',
      note: 'Contamination by an Alu repeat.',
      evidences: [{ evidenceCode: 'ECO:0000305' }],
    },
    {
      commentType: 'WEB RESOURCE',
      resourceName: 'Alzforum',
      resourceUrl:
        'https://www.alzforum.org/mutations/search?genes%255B%255D=348',
      ftp: false,
      note: 'APP mutations',
    },
    {
      commentType: 'WEB RESOURCE',
      resourceName: 'AD mutations',
      resourceUrl: 'https://uantwerpen.vib.be/CMTMutations',
      ftp: false,
    },
    {
      commentType: 'WEB RESOURCE',
      resourceName: 'NIEHS-SNPs',
      resourceUrl: 'http://egp.gs.washington.edu/data/app/',
      ftp: false,
    },
    {
      commentType: 'WEB RESOURCE',
      resourceName: 'Wikipedia',
      resourceUrl: 'https://en.wikipedia.org/wiki/Amyloid_beta',
      ftp: false,
      note: 'Amyloid beta entry',
    },
  ],
  features: [
    {
      type: 'Signal',
      location: {
        start: { value: 1, modifier: 'EXACT' },
        end: { value: 17, modifier: 'EXACT' },
      },
      description: '',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '12665801' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '2900137' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '3597385' },
      ],
    },
    {
      type: 'Chain',
      location: {
        start: { value: 18, modifier: 'EXACT' },
        end: { value: 770, modifier: 'EXACT' },
      },
      description: 'Amyloid-beta precursor protein',
      featureId: 'PRO_0000000088',
    },
    {
      type: 'Chain',
      location: {
        start: { value: 18, modifier: 'EXACT' },
        end: { value: 687, modifier: 'EXACT' },
      },
      description: 'Soluble APP-alpha',
      featureId: 'PRO_0000000089',
    },
    {
      type: 'Chain',
      location: {
        start: { value: 18, modifier: 'EXACT' },
        end: { value: 671, modifier: 'EXACT' },
      },
      description: 'Soluble APP-beta',
      featureId: 'PRO_0000000090',
    },
    {
      type: 'Chain',
      location: {
        start: { value: 18, modifier: 'EXACT' },
        end: { value: 286, modifier: 'EXACT' },
      },
      description: 'N-APP',
      featureId: 'PRO_0000381966',
    },
    {
      type: 'Chain',
      location: {
        start: { value: 672, modifier: 'EXACT' },
        end: { value: 770, modifier: 'EXACT' },
      },
      description: 'C99',
      featureId: 'PRO_0000000091',
    },
    {
      type: 'Chain',
      location: {
        start: { value: 672, modifier: 'EXACT' },
        end: { value: 713, modifier: 'EXACT' },
      },
      description: 'Amyloid-beta protein 42',
      featureId: 'PRO_0000000092',
    },
    {
      type: 'Chain',
      location: {
        start: { value: 672, modifier: 'EXACT' },
        end: { value: 711, modifier: 'EXACT' },
      },
      description: 'Amyloid-beta protein 40',
      featureId: 'PRO_0000000093',
    },
    {
      type: 'Chain',
      location: {
        start: { value: 688, modifier: 'EXACT' },
        end: { value: 770, modifier: 'EXACT' },
      },
      description: 'C83',
      featureId: 'PRO_0000000094',
    },
    {
      type: 'Peptide',
      location: {
        start: { value: 688, modifier: 'EXACT' },
        end: { value: 713, modifier: 'EXACT' },
      },
      description: 'P3(42)',
      featureId: 'PRO_0000000095',
    },
    {
      type: 'Peptide',
      location: {
        start: { value: 688, modifier: 'EXACT' },
        end: { value: 711, modifier: 'EXACT' },
      },
      description: 'P3(40)',
      featureId: 'PRO_0000000096',
    },
    {
      type: 'Chain',
      location: {
        start: { value: 691, modifier: 'EXACT' },
        end: { value: 770, modifier: 'EXACT' },
      },
      description: 'C80',
      featureId: 'PRO_0000384574',
    },
    {
      type: 'Chain',
      location: {
        start: { value: 712, modifier: 'EXACT' },
        end: { value: 770, modifier: 'EXACT' },
      },
      description: 'Gamma-secretase C-terminal fragment 59',
      featureId: 'PRO_0000000097',
    },
    {
      type: 'Chain',
      location: {
        start: { value: 714, modifier: 'EXACT' },
        end: { value: 770, modifier: 'EXACT' },
      },
      description: 'Gamma-secretase C-terminal fragment 57',
      featureId: 'PRO_0000000098',
    },
    {
      type: 'Chain',
      location: {
        start: { value: 721, modifier: 'EXACT' },
        end: { value: 770, modifier: 'EXACT' },
      },
      description: 'Gamma-secretase C-terminal fragment 50',
      evidences: [{ evidenceCode: 'ECO:0000250' }],
      featureId: 'PRO_0000000099',
    },
    {
      type: 'Chain',
      location: {
        start: { value: 740, modifier: 'EXACT' },
        end: { value: 770, modifier: 'EXACT' },
      },
      description: 'C31',
      featureId: 'PRO_0000000100',
    },
    {
      type: 'Topological domain',
      location: {
        start: { value: 18, modifier: 'EXACT' },
        end: { value: 701, modifier: 'EXACT' },
      },
      description: 'Extracellular',
      evidences: [{ evidenceCode: 'ECO:0000305' }],
    },
    {
      type: 'Transmembrane',
      location: {
        start: { value: 702, modifier: 'EXACT' },
        end: { value: 722, modifier: 'EXACT' },
      },
      description: 'Helical',
      evidences: [
        { evidenceCode: 'ECO:0000305', source: 'PubMed', id: '22584060' },
        { evidenceCode: 'ECO:0000305', source: 'PubMed', id: '22654059' },
        { evidenceCode: 'ECO:0000305', source: 'PubMed', id: '30630874' },
      ],
    },
    {
      type: 'Topological domain',
      location: {
        start: { value: 723, modifier: 'EXACT' },
        end: { value: 770, modifier: 'EXACT' },
      },
      description: 'Cytoplasmic',
      evidences: [{ evidenceCode: 'ECO:0000305' }],
    },
    {
      type: 'Domain',
      location: {
        start: { value: 28, modifier: 'EXACT' },
        end: { value: 189, modifier: 'EXACT' },
      },
      description: 'E1',
      evidences: [
        {
          evidenceCode: 'ECO:0000255',
          source: 'PROSITE-ProRule',
          id: 'PRU01217',
        },
      ],
    },
    {
      type: 'Domain',
      location: {
        start: { value: 291, modifier: 'EXACT' },
        end: { value: 341, modifier: 'EXACT' },
      },
      description: 'BPTI/Kunitz inhibitor',
      evidences: [
        {
          evidenceCode: 'ECO:0000255',
          source: 'PROSITE-ProRule',
          id: 'PRU00031',
        },
      ],
    },
    {
      type: 'Domain',
      location: {
        start: { value: 374, modifier: 'EXACT' },
        end: { value: 565, modifier: 'EXACT' },
      },
      description: 'E2',
      evidences: [
        {
          evidenceCode: 'ECO:0000255',
          source: 'PROSITE-ProRule',
          id: 'PRU01218',
        },
      ],
    },
    {
      type: 'Region',
      location: {
        start: { value: 28, modifier: 'EXACT' },
        end: { value: 123, modifier: 'EXACT' },
      },
      description: 'GFLD subdomain',
      evidences: [
        {
          evidenceCode: 'ECO:0000255',
          source: 'PROSITE-ProRule',
          id: 'PRU01217',
        },
      ],
    },
    {
      type: 'Region',
      location: {
        start: { value: 96, modifier: 'EXACT' },
        end: { value: 110, modifier: 'EXACT' },
      },
      description: 'Heparin-binding',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8158260' },
      ],
    },
    {
      type: 'Region',
      location: {
        start: { value: 131, modifier: 'EXACT' },
        end: { value: 189, modifier: 'EXACT' },
      },
      description: 'CuBD subdomain',
      evidences: [
        {
          evidenceCode: 'ECO:0000255',
          source: 'PROSITE-ProRule',
          id: 'PRU01217',
        },
      ],
    },
    {
      type: 'Region',
      location: {
        start: { value: 181, modifier: 'EXACT' },
        end: { value: 188, modifier: 'EXACT' },
      },
      description: 'Zinc-binding',
    },
    {
      type: 'Region',
      location: {
        start: { value: 391, modifier: 'EXACT' },
        end: { value: 423, modifier: 'EXACT' },
      },
      description: 'Heparin-binding',
    },
    {
      type: 'Region',
      location: {
        start: { value: 491, modifier: 'EXACT' },
        end: { value: 522, modifier: 'EXACT' },
      },
      description: 'Heparin-binding',
    },
    {
      type: 'Region',
      location: {
        start: { value: 523, modifier: 'EXACT' },
        end: { value: 540, modifier: 'EXACT' },
      },
      description: 'Collagen-binding',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8576160' },
      ],
    },
    {
      type: 'Region',
      location: {
        start: { value: 695, modifier: 'EXACT' },
        end: { value: 722, modifier: 'EXACT' },
      },
      description: 'Interaction with PSEN1',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '30630874' },
      ],
    },
    {
      type: 'Region',
      location: {
        start: { value: 732, modifier: 'EXACT' },
        end: { value: 751, modifier: 'EXACT' },
      },
      description: 'Interaction with G(o)-alpha',
    },
    {
      type: 'Region',
      location: {
        start: { value: 756, modifier: 'EXACT' },
        end: { value: 770, modifier: 'EXACT' },
      },
      description:
        'Required for the interaction with KIF5B and for anterograde transport in axons',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '17062754' },
      ],
    },
    {
      type: 'Motif',
      location: {
        start: { value: 344, modifier: 'EXACT' },
        end: { value: 365, modifier: 'EXACT' },
      },
      description: 'OX-2',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '2649245' },
      ],
    },
    {
      type: 'Motif',
      location: {
        start: { value: 724, modifier: 'EXACT' },
        end: { value: 734, modifier: 'EXACT' },
      },
      description: 'Basolateral sorting signal',
    },
    {
      type: 'Motif',
      location: {
        start: { value: 757, modifier: 'EXACT' },
        end: { value: 762, modifier: 'EXACT' },
      },
      description: 'YENPXY motif; contains endocytosis signal',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10383380' },
      ],
    },
    {
      type: 'Compositional bias',
      location: {
        start: { value: 230, modifier: 'EXACT' },
        end: { value: 260, modifier: 'EXACT' },
      },
      description: 'Asp/Glu-rich (acidic)',
    },
    {
      type: 'Compositional bias',
      location: {
        start: { value: 274, modifier: 'EXACT' },
        end: { value: 280, modifier: 'EXACT' },
      },
      description: 'Poly-Thr',
    },
    {
      type: 'Metal binding',
      location: {
        start: { value: 147, modifier: 'EXACT' },
        end: { value: 147, modifier: 'EXACT' },
      },
      description: 'Copper 1',
      evidences: [
        {
          evidenceCode: 'ECO:0000255',
          source: 'PROSITE-ProRule',
          id: 'PRU01217',
        },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '17239395' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '25122912' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '2FK1' },
      ],
    },
    {
      type: 'Metal binding',
      location: {
        start: { value: 151, modifier: 'EXACT' },
        end: { value: 151, modifier: 'EXACT' },
      },
      description: 'Copper 1',
      evidences: [
        {
          evidenceCode: 'ECO:0000255',
          source: 'PROSITE-ProRule',
          id: 'PRU01217',
        },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '17239395' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '25122912' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '2FK1' },
      ],
    },
    {
      type: 'Metal binding',
      location: {
        start: { value: 168, modifier: 'EXACT' },
        end: { value: 168, modifier: 'EXACT' },
      },
      description: 'Copper 1',
      evidences: [
        {
          evidenceCode: 'ECO:0000255',
          source: 'PROSITE-ProRule',
          id: 'PRU01217',
        },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '17239395' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '2FK1' },
      ],
    },
    {
      type: 'Metal binding',
      location: {
        start: { value: 677, modifier: 'EXACT' },
        end: { value: 677, modifier: 'EXACT' },
      },
      description: 'Copper or zinc 2',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11274207' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '26898943' },
      ],
    },
    {
      type: 'Metal binding',
      location: {
        start: { value: 681, modifier: 'EXACT' },
        end: { value: 681, modifier: 'EXACT' },
      },
      description: 'Copper or zinc 2',
      evidences: [
        { evidenceCode: 'ECO:0000305', source: 'PubMed', id: '10413512' },
        { evidenceCode: 'ECO:0000305', source: 'PubMed', id: '11274207' },
      ],
    },
    {
      type: 'Metal binding',
      location: {
        start: { value: 684, modifier: 'EXACT' },
        end: { value: 684, modifier: 'EXACT' },
      },
      description: 'Copper or zinc 2',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10413512' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11274207' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '26898943' },
      ],
    },
    {
      type: 'Metal binding',
      location: {
        start: { value: 685, modifier: 'EXACT' },
        end: { value: 685, modifier: 'EXACT' },
      },
      description: 'Copper or zinc 2',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11274207' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '26898943' },
      ],
    },
    {
      type: 'Site',
      location: {
        start: { value: 170, modifier: 'EXACT' },
        end: { value: 170, modifier: 'EXACT' },
      },
      description: 'Required for Cu(2+) reduction',
      evidences: [
        {
          evidenceCode: 'ECO:0000255',
          source: 'PROSITE-ProRule',
          id: 'PRU01217',
        },
      ],
    },
    {
      type: 'Site',
      location: {
        start: { value: 197, modifier: 'EXACT' },
        end: { value: 198, modifier: 'EXACT' },
      },
      description: 'Cleavage; by caspases',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10319819' },
      ],
    },
    {
      type: 'Site',
      location: {
        start: { value: 219, modifier: 'EXACT' },
        end: { value: 220, modifier: 'EXACT' },
      },
      description: 'Cleavage; by caspases',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10319819' },
      ],
    },
    {
      type: 'Site',
      location: {
        start: { value: 301, modifier: 'EXACT' },
        end: { value: 302, modifier: 'EXACT' },
      },
      description: 'Reactive bond',
    },
    {
      type: 'Site',
      location: {
        start: { value: 671, modifier: 'EXACT' },
        end: { value: 672, modifier: 'EXACT' },
      },
      description: 'Cleavage; by beta-secretase',
      evidences: [
        { evidenceCode: 'ECO:0000305', source: 'PubMed', id: '11851430' },
      ],
    },
    {
      type: 'Site',
      location: {
        start: { value: 672, modifier: 'EXACT' },
        end: { value: 673, modifier: 'EXACT' },
      },
      description:
        'Cleavage; by caspase-6; when associated with variant 670-N-L-671',
    },
    {
      type: 'Site',
      location: {
        start: { value: 687, modifier: 'EXACT' },
        end: { value: 688, modifier: 'EXACT' },
      },
      description: 'Cleavage; by alpha-secretase',
      evidences: [
        { evidenceCode: 'ECO:0000305', source: 'PubMed', id: '11851430' },
      ],
    },
    {
      type: 'Site',
      location: {
        start: { value: 690, modifier: 'EXACT' },
        end: { value: 691, modifier: 'EXACT' },
      },
      description: 'Cleavage; by theta-secretase',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '16816112' },
      ],
    },
    {
      type: 'Site',
      location: {
        start: { value: 704, modifier: 'EXACT' },
        end: { value: 704, modifier: 'EXACT' },
      },
      description: 'Implicated in free radical propagation',
      evidences: [{ evidenceCode: 'ECO:0000250' }],
    },
    {
      type: 'Site',
      location: {
        start: { value: 706, modifier: 'EXACT' },
        end: { value: 706, modifier: 'EXACT' },
      },
      description: 'Susceptible to oxidation',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10535332' },
      ],
    },
    {
      type: 'Site',
      location: {
        start: { value: 711, modifier: 'EXACT' },
        end: { value: 712, modifier: 'EXACT' },
      },
      description: 'Cleavage; by gamma-secretase; site 1',
      evidences: [
        { evidenceCode: 'ECO:0000305', source: 'PubMed', id: '11851430' },
      ],
    },
    {
      type: 'Site',
      location: {
        start: { value: 713, modifier: 'EXACT' },
        end: { value: 714, modifier: 'EXACT' },
      },
      description: 'Cleavage; by gamma-secretase; site 2',
      evidences: [
        { evidenceCode: 'ECO:0000305', source: 'PubMed', id: '11851430' },
      ],
    },
    {
      type: 'Site',
      location: {
        start: { value: 720, modifier: 'EXACT' },
        end: { value: 721, modifier: 'EXACT' },
      },
      description: 'Cleavage; by gamma-secretase; site 3',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11851430' },
        { evidenceCode: 'ECO:0000305', source: 'PubMed', id: '30630874' },
      ],
    },
    {
      type: 'Site',
      location: {
        start: { value: 739, modifier: 'EXACT' },
        end: { value: 740, modifier: 'EXACT' },
      },
      description: 'Cleavage; by caspase-6, caspase-8 or caspase-9',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10319819' },
      ],
    },
    {
      type: 'Modified residue',
      location: {
        start: { value: 198, modifier: 'EXACT' },
        end: { value: 198, modifier: 'EXACT' },
      },
      description: 'Phosphoserine; by CK2',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8999878' },
      ],
    },
    {
      type: 'Modified residue',
      location: {
        start: { value: 206, modifier: 'EXACT' },
        end: { value: 206, modifier: 'EXACT' },
      },
      description: 'Phosphoserine; by CK1',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8999878' },
      ],
    },
    {
      type: 'Modified residue',
      location: {
        start: { value: 217, modifier: 'EXACT' },
        end: { value: 217, modifier: 'EXACT' },
      },
      description: 'Sulfotyrosine',
      evidences: [{ evidenceCode: 'ECO:0000255' }],
    },
    {
      type: 'Modified residue',
      location: {
        start: { value: 262, modifier: 'EXACT' },
        end: { value: 262, modifier: 'EXACT' },
      },
      description: 'Sulfotyrosine',
      evidences: [{ evidenceCode: 'ECO:0000255' }],
    },
    {
      type: 'Modified residue',
      location: {
        start: { value: 336, modifier: 'EXACT' },
        end: { value: 336, modifier: 'EXACT' },
      },
      description: 'Sulfotyrosine',
      evidences: [{ evidenceCode: 'ECO:0000255' }],
    },
    {
      type: 'Modified residue',
      location: {
        start: { value: 441, modifier: 'EXACT' },
        end: { value: 441, modifier: 'EXACT' },
      },
      description: 'Phosphoserine; by FAM20C',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '26091039' },
      ],
    },
    {
      type: 'Modified residue',
      location: {
        start: { value: 497, modifier: 'EXACT' },
        end: { value: 497, modifier: 'EXACT' },
      },
      description: 'Phosphotyrosine',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '26091039' },
      ],
    },
    {
      type: 'Modified residue',
      location: {
        start: { value: 729, modifier: 'EXACT' },
        end: { value: 729, modifier: 'EXACT' },
      },
      description: 'Phosphothreonine',
      evidences: [
        { evidenceCode: 'ECO:0000250', source: 'UniProtKB', id: 'P08592' },
      ],
    },
    {
      type: 'Modified residue',
      location: {
        start: { value: 730, modifier: 'EXACT' },
        end: { value: 730, modifier: 'EXACT' },
      },
      description: 'Phosphoserine; by APP-kinase I',
      evidences: [
        { evidenceCode: 'ECO:0000250', source: 'UniProtKB', id: 'P08592' },
      ],
    },
    {
      type: 'Modified residue',
      location: {
        start: { value: 743, modifier: 'EXACT' },
        end: { value: 743, modifier: 'EXACT' },
      },
      description: 'Phosphothreonine; by CDK5 and MAPK10',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '28720718' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8131745' },
        { evidenceCode: 'ECO:0007744', source: 'PubMed', id: '24275569' },
      ],
    },
    {
      type: 'Modified residue',
      location: {
        start: { value: 757, modifier: 'EXACT' },
        end: { value: 757, modifier: 'EXACT' },
      },
      description: 'Phosphotyrosine',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11877420' },
      ],
    },
    {
      type: 'Glycosylation',
      location: {
        start: { value: 542, modifier: 'EXACT' },
        end: { value: 542, modifier: 'EXACT' },
      },
      description: 'N-linked (GlcNAc...) asparagine',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '16335952' },
      ],
      featureId: '',
    },
    {
      type: 'Glycosylation',
      location: {
        start: { value: 571, modifier: 'EXACT' },
        end: { value: 571, modifier: 'EXACT' },
      },
      description: 'N-linked (GlcNAc...) asparagine',
      evidences: [{ evidenceCode: 'ECO:0000305' }],
      featureId: '',
    },
    {
      type: 'Glycosylation',
      location: {
        start: { value: 633, modifier: 'EXACT' },
        end: { value: 633, modifier: 'EXACT' },
      },
      description: 'O-linked (GalNAc...) threonine; partial',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '21712440' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '22576872' },
      ],
      featureId: '',
    },
    {
      type: 'Glycosylation',
      location: {
        start: { value: 651, modifier: 'EXACT' },
        end: { value: 651, modifier: 'EXACT' },
      },
      description: 'O-linked (GalNAc...) threonine; partial',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '21712440' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '22576872' },
      ],
      featureId: '',
    },
    {
      type: 'Glycosylation',
      location: {
        start: { value: 652, modifier: 'EXACT' },
        end: { value: 652, modifier: 'EXACT' },
      },
      description: 'O-linked (GalNAc...) threonine; partial',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '21712440' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '22576872' },
      ],
      featureId: '',
    },
    {
      type: 'Glycosylation',
      location: {
        start: { value: 656, modifier: 'EXACT' },
        end: { value: 656, modifier: 'EXACT' },
      },
      description:
        'O-linked (Xyl...) (chondroitin sulfate) serine; in L-APP isoforms',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '21712440' },
      ],
      featureId: '',
    },
    {
      type: 'Glycosylation',
      location: {
        start: { value: 659, modifier: 'EXACT' },
        end: { value: 659, modifier: 'EXACT' },
      },
      description: 'O-linked (HexNAc...) threonine; partial',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '22576872' },
      ],
      featureId: '',
    },
    {
      type: 'Glycosylation',
      location: {
        start: { value: 663, modifier: 'EXACT' },
        end: { value: 663, modifier: 'EXACT' },
      },
      description: 'O-linked (GalNAc...) threonine; partial',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '22576872' },
        { evidenceCode: 'ECO:0000305', source: 'PubMed', id: '21712440' },
      ],
      featureId: '',
    },
    {
      type: 'Glycosylation',
      location: {
        start: { value: 667, modifier: 'EXACT' },
        end: { value: 667, modifier: 'EXACT' },
      },
      description: 'O-linked (GalNAc...) serine; partial',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '22576872' },
        { evidenceCode: 'ECO:0000305', source: 'PubMed', id: '21712440' },
      ],
      featureId: '',
    },
    {
      type: 'Glycosylation',
      location: {
        start: { value: 681, modifier: 'EXACT' },
        end: { value: 681, modifier: 'EXACT' },
      },
      description: 'O-linked (HexNAc...) tyrosine; partial',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '22576872' },
      ],
      featureId: '',
    },
    {
      type: 'Disulfide bond',
      location: {
        start: { value: 38, modifier: 'EXACT' },
        end: { value: 62, modifier: 'EXACT' },
      },
      description: '',
      evidences: [
        {
          evidenceCode: 'ECO:0000255',
          source: 'PROSITE-ProRule',
          id: 'PRU01217',
        },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '1MWP' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '3KTM' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '4JFN' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '4PQD' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '4PWQ' },
      ],
    },
    {
      type: 'Disulfide bond',
      location: {
        start: { value: 73, modifier: 'EXACT' },
        end: { value: 117, modifier: 'EXACT' },
      },
      description: '',
      evidences: [
        {
          evidenceCode: 'ECO:0000255',
          source: 'PROSITE-ProRule',
          id: 'PRU01217',
        },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '1MWP' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '3KTM' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '4JFN' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '4PQD' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '4PWQ' },
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
          evidenceCode: 'ECO:0000255',
          source: 'PROSITE-ProRule',
          id: 'PRU01217',
        },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '1MWP' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '3KTM' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '4PQD' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '4PWQ' },
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
          evidenceCode: 'ECO:0000255',
          source: 'PROSITE-ProRule',
          id: 'PRU01217',
        },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '12611883' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '17239395' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '17909280' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '1OWT' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '2FJZ' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '2FK1' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '2FK2' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '2FK3' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '2FKL' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '2FMA' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '3KTM' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '4PWQ' },
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
          evidenceCode: 'ECO:0000255',
          source: 'PROSITE-ProRule',
          id: 'PRU01217',
        },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '12611883' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '17239395' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '17909280' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '1OWT' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '2FJZ' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '2FK1' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '2FK2' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '2FK3' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '2FKL' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '2FMA' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '3KTM' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '4PWQ' },
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
          evidenceCode: 'ECO:0000255',
          source: 'PROSITE-ProRule',
          id: 'PRU01217',
        },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '12611883' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '17239395' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '17909280' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '1OWT' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '2FJZ' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '2FK1' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '2FK2' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '2FK3' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '2FKL' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '2FMA' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '3KTM' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '4PWQ' },
      ],
    },
    {
      type: 'Disulfide bond',
      location: {
        start: { value: 291, modifier: 'EXACT' },
        end: { value: 341, modifier: 'EXACT' },
      },
      description: '',
      evidences: [
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '1AAP' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '1BRC' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '1CA0' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '1TAW' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '1ZJD' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '3L33' },
      ],
    },
    {
      type: 'Disulfide bond',
      location: {
        start: { value: 300, modifier: 'EXACT' },
        end: { value: 324, modifier: 'EXACT' },
      },
      description: '',
      evidences: [
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '1AAP' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '1BRC' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '1CA0' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '1TAW' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '1ZJD' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '3L33' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '5C67' },
      ],
    },
    {
      type: 'Disulfide bond',
      location: {
        start: { value: 316, modifier: 'EXACT' },
        end: { value: 337, modifier: 'EXACT' },
      },
      description: '',
      evidences: [
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '1AAP' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '1BRC' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '1CA0' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '1TAW' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '1ZJD' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '3L33' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '5C67' },
      ],
    },
    {
      type: 'Cross-link',
      location: {
        start: { value: 763, modifier: 'EXACT' },
        end: { value: 763, modifier: 'EXACT' },
      },
      description:
        'Glycyl lysine isopeptide (Lys-Gly) (interchain with G-Cter in ubiquitin)',
      evidences: [
        { evidenceCode: 'ECO:0000250', source: 'UniProtKB', id: 'P08592' },
      ],
    },
    {
      type: 'Alternative sequence',
      location: {
        start: { value: 1, modifier: 'EXACT' },
        end: { value: 19, modifier: 'EXACT' },
      },
      description: 'in isoform 11',
      evidences: [
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '14702039' },
      ],
      featureId: 'VSP_045446',
      alternativeSequence: {
        originalSequence: 'MLPGLALLLLAAWTARALE',
        alternativeSequences: ['MDQLEDLLVLFINY'],
      },
    },
    {
      type: 'Alternative sequence',
      location: {
        start: { value: 19, modifier: 'EXACT' },
        end: { value: 74, modifier: 'EXACT' },
      },
      description: 'in isoform APP639',
      evidences: [
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '12859342' },
      ],
      featureId: 'VSP_009116',
      alternativeSequence: {},
    },
    {
      type: 'Alternative sequence',
      location: {
        start: { value: 289, modifier: 'EXACT' },
        end: { value: 363, modifier: 'EXACT' },
      },
      description: 'in isoform APP639',
      evidences: [
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '12859342' },
      ],
      featureId: 'VSP_009117',
      alternativeSequence: {},
    },
    {
      type: 'Alternative sequence',
      location: {
        start: { value: 289, modifier: 'EXACT' },
        end: { value: 289, modifier: 'EXACT' },
      },
      description:
        'in isoform APP695, isoform L-APP696, isoform L-APP677 and isoform APP714',
      evidences: [
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '2881207' },
      ],
      featureId: 'VSP_000002',
      alternativeSequence: {
        originalSequence: 'E',
        alternativeSequences: ['V'],
      },
    },
    {
      type: 'Alternative sequence',
      location: {
        start: { value: 290, modifier: 'EXACT' },
        end: { value: 364, modifier: 'EXACT' },
      },
      description: 'in isoform APP695 and isoform L-APP677',
      evidences: [
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '2881207' },
      ],
      featureId: 'VSP_000004',
      alternativeSequence: {},
    },
    {
      type: 'Alternative sequence',
      location: {
        start: { value: 290, modifier: 'EXACT' },
        end: { value: 345, modifier: 'EXACT' },
      },
      description: 'in isoform L-APP696 and isoform APP714',
      evidences: [{ evidenceCode: 'ECO:0000305' }],
      featureId: 'VSP_000003',
      alternativeSequence: {},
    },
    {
      type: 'Alternative sequence',
      location: {
        start: { value: 290, modifier: 'EXACT' },
        end: { value: 305, modifier: 'EXACT' },
      },
      description: 'in isoform APP305',
      evidences: [
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '15489334' },
      ],
      featureId: 'VSP_000005',
      alternativeSequence: {
        originalSequence: 'VCSEQAETGPCRAMIS',
        alternativeSequences: ['KWYKEVHSGQARWLML'],
      },
    },
    {
      type: 'Alternative sequence',
      location: {
        start: { value: 306, modifier: 'EXACT' },
        end: { value: 770, modifier: 'EXACT' },
      },
      description: 'in isoform APP305',
      evidences: [
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '15489334' },
      ],
      featureId: 'VSP_000006',
      alternativeSequence: {},
    },
    {
      type: 'Alternative sequence',
      location: {
        start: { value: 345, modifier: 'EXACT' },
        end: { value: 364, modifier: 'EXACT' },
      },
      description: 'in isoform 11',
      evidences: [
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '14702039' },
      ],
      featureId: 'VSP_045447',
      alternativeSequence: {
        originalSequence: 'MSQSLLKTTQEPLARDPVKL',
        alternativeSequences: ['I'],
      },
    },
    {
      type: 'Alternative sequence',
      location: {
        start: { value: 345, modifier: 'EXACT' },
        end: { value: 345, modifier: 'EXACT' },
      },
      description: 'in isoform L-APP733 and isoform APP751',
      evidences: [
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '15489334' },
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '1587857' },
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '2893289' },
      ],
      featureId: 'VSP_000007',
      alternativeSequence: {
        originalSequence: 'M',
        alternativeSequences: ['I'],
      },
    },
    {
      type: 'Alternative sequence',
      location: {
        start: { value: 346, modifier: 'EXACT' },
        end: { value: 364, modifier: 'EXACT' },
      },
      description: 'in isoform L-APP733 and isoform APP751',
      evidences: [
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '15489334' },
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '1587857' },
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '2893289' },
      ],
      featureId: 'VSP_000008',
      alternativeSequence: {},
    },
    {
      type: 'Alternative sequence',
      location: {
        start: { value: 364, modifier: 'EXACT' },
        end: { value: 364, modifier: 'EXACT' },
      },
      description: 'in isoform APP639',
      evidences: [
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '12859342' },
      ],
      featureId: 'VSP_009118',
      alternativeSequence: {
        originalSequence: 'L',
        alternativeSequences: ['V'],
      },
    },
    {
      type: 'Alternative sequence',
      location: {
        start: { value: 637, modifier: 'EXACT' },
        end: { value: 654, modifier: 'EXACT' },
      },
      description:
        'in isoform L-APP677, isoform L-APP696, isoform L-APP733 and isoform L-APP752',
      evidences: [
        { evidenceCode: 'ECO:0000303', source: 'PubMed', id: '1587857' },
      ],
      featureId: 'VSP_000009',
      alternativeSequence: {},
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 501, modifier: 'EXACT' },
        end: { value: 501, modifier: 'EXACT' },
      },
      description: 'in dbSNP:rs45588932',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'Reference', id: 'Ref.10' },
      ],
      featureId: 'VAR_022315',
      alternativeSequence: {
        originalSequence: 'E',
        alternativeSequences: ['K'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 665, modifier: 'EXACT' },
        end: { value: 665, modifier: 'EXACT' },
      },
      description:
        'in a patient with late onset Alzheimer disease; dbSNP:rs63750363',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8154870' },
      ],
      featureId: 'VAR_010107',
      alternativeSequence: {
        originalSequence: 'E',
        alternativeSequences: ['D'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 670, modifier: 'EXACT' },
        end: { value: 671, modifier: 'EXACT' },
      },
      description:
        'in AD1; Swedish mutation; highly increases hydrolysis by BACE1 and amyloid-beta proteins production; dbSNP:rs281865161',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10656250' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10677483' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '1302033' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '1465129' },
      ],
      featureId: 'VAR_000015',
      alternativeSequence: {
        originalSequence: 'KM',
        alternativeSequences: ['NL'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 678, modifier: 'EXACT' },
        end: { value: 678, modifier: 'EXACT' },
      },
      description: 'in AD1; dbSNP:rs63750064',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '15201367' },
      ],
      featureId: 'VAR_044424',
      alternativeSequence: {
        originalSequence: 'D',
        alternativeSequences: ['N'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 692, modifier: 'EXACT' },
        end: { value: 692, modifier: 'EXACT' },
      },
      description:
        'in AD1; Flemish mutation; increases the solubility of processed amyloid-beta peptides and increases the stability of peptide oligomers; dbSNP:rs63750671',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11311152' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '1303239' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '9754958' },
      ],
      featureId: 'VAR_000016',
      alternativeSequence: {
        originalSequence: 'A',
        alternativeSequences: ['G'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 693, modifier: 'EXACT' },
        end: { value: 693, modifier: 'EXACT' },
      },
      description: 'in AD1; dbSNP:rs63751039',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11528419' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '1415269' },
      ],
      featureId: 'VAR_014215',
      alternativeSequence: {
        originalSequence: 'E',
        alternativeSequences: ['G'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 693, modifier: 'EXACT' },
        end: { value: 693, modifier: 'EXACT' },
      },
      description: 'in CAA-APP; Italian type; dbSNP:rs63750579',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '20697050' },
      ],
      featureId: 'VAR_014216',
      alternativeSequence: {
        originalSequence: 'E',
        alternativeSequences: ['K'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 693, modifier: 'EXACT' },
        end: { value: 693, modifier: 'EXACT' },
      },
      description: 'in CAA-APP; Dutch type; dbSNP:rs63750579',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '2111584' },
      ],
      featureId: 'VAR_000017',
      alternativeSequence: {
        originalSequence: 'E',
        alternativeSequences: ['Q'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 694, modifier: 'EXACT' },
        end: { value: 694, modifier: 'EXACT' },
      },
      description: 'in CAA-APP; Iowa type; dbSNP:rs63749810',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11409420' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '12654973' },
      ],
      featureId: 'VAR_014217',
      alternativeSequence: {
        originalSequence: 'D',
        alternativeSequences: ['N'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 705, modifier: 'EXACT' },
        end: { value: 705, modifier: 'EXACT' },
      },
      description: 'in CAA-APP; Italian type; dbSNP:rs63750921',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '16178030' },
      ],
      featureId: 'VAR_032276',
      alternativeSequence: {
        originalSequence: 'L',
        alternativeSequences: ['V'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 713, modifier: 'EXACT' },
        end: { value: 713, modifier: 'EXACT' },
      },
      description: 'in AD1; dbSNP:rs63750066',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '1303275' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '15365148' },
      ],
      featureId: 'VAR_000019',
      alternativeSequence: {
        originalSequence: 'A',
        alternativeSequences: ['T'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 713, modifier: 'EXACT' },
        end: { value: 713, modifier: 'EXACT' },
      },
      description:
        'in one chronic schizophrenia patient; unknown pathological significance; dbSNP:rs1800557',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '1307241' },
      ],
      featureId: 'VAR_000018',
      alternativeSequence: {
        originalSequence: 'A',
        alternativeSequences: ['V'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 714, modifier: 'EXACT' },
        end: { value: 714, modifier: 'EXACT' },
      },
      description: 'in AD1; dbSNP:rs63750643',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '12034808' },
      ],
      featureId: 'VAR_032277',
      alternativeSequence: {
        originalSequence: 'T',
        alternativeSequences: ['A'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 714, modifier: 'EXACT' },
        end: { value: 714, modifier: 'EXACT' },
      },
      description:
        'in AD1; increased amyloid-beta protein 42/40 ratio; dbSNP:rs63750973',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11063718' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '15668448' },
      ],
      featureId: 'VAR_014218',
      alternativeSequence: {
        originalSequence: 'T',
        alternativeSequences: ['I'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 715, modifier: 'EXACT' },
        end: { value: 715, modifier: 'EXACT' },
      },
      description:
        'in AD1; decreased amyloid-beta protein 40/total amyloid-beta; dbSNP:rs63750734',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10097173' },
      ],
      featureId: 'VAR_010108',
      alternativeSequence: {
        originalSequence: 'V',
        alternativeSequences: ['M'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 716, modifier: 'EXACT' },
        end: { value: 716, modifier: 'EXACT' },
      },
      description: 'in AD1; dbSNP:rs63750399',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '9328472' },
      ],
      featureId: 'VAR_000020',
      alternativeSequence: {
        originalSequence: 'I',
        alternativeSequences: ['V'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 717, modifier: 'EXACT' },
        end: { value: 717, modifier: 'EXACT' },
      },
      description:
        'in AD1; increased amyloid-beta protein 42/40 ratio; dbSNP:rs63750264',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '1925564' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8267572' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8290042' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8476439' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8886002' },
      ],
      featureId: 'VAR_000023',
      alternativeSequence: {
        originalSequence: 'V',
        alternativeSequences: ['F'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 717, modifier: 'EXACT' },
        end: { value: 717, modifier: 'EXACT' },
      },
      description:
        'in AD1; increased amyloid-beta protein 42/40 ratio; dbSNP:rs63749964',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '1944558' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8476439' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8886002' },
      ],
      featureId: 'VAR_000022',
      alternativeSequence: {
        originalSequence: 'V',
        alternativeSequences: ['G'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 717, modifier: 'EXACT' },
        end: { value: 717, modifier: 'EXACT' },
      },
      description:
        'in AD1; increased amyloid-beta protein 42/40 ratio; dbSNP:rs63750264',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10631141' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11063718' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '1671712' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '1678058' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '1908231' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8267572' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8476439' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8577393' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8886002' },
      ],
      featureId: 'VAR_000021',
      alternativeSequence: {
        originalSequence: 'V',
        alternativeSequences: ['I'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 717, modifier: 'EXACT' },
        end: { value: 717, modifier: 'EXACT' },
      },
      description: 'in AD1; dbSNP:rs63750264',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10867787' },
      ],
      featureId: 'VAR_014219',
      alternativeSequence: {
        originalSequence: 'V',
        alternativeSequences: ['L'],
      },
    },
    {
      type: 'Natural variant',
      location: {
        start: { value: 723, modifier: 'EXACT' },
        end: { value: 723, modifier: 'EXACT' },
      },
      description: 'in AD1; dbSNP:rs63751122',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10665499' },
      ],
      featureId: 'VAR_010109',
      alternativeSequence: {
        originalSequence: 'L',
        alternativeSequences: ['P'],
      },
    },
    {
      type: 'Mutagenesis',
      location: {
        start: { value: 99, modifier: 'EXACT' },
        end: { value: 102, modifier: 'EXACT' },
      },
      description: 'Reduced heparin-binding.',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8158260' },
      ],
      alternativeSequence: {
        originalSequence: 'KRGR',
        alternativeSequences: ['NQGG'],
      },
    },
    {
      type: 'Mutagenesis',
      location: {
        start: { value: 108, modifier: 'EXACT' },
        end: { value: 108, modifier: 'EXACT' },
      },
      description:
        'Loss of the copper binding site in the GFLD subdomain; when associated with A-110.',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '25122912' },
      ],
      alternativeSequence: {
        originalSequence: 'H',
        alternativeSequences: ['A'],
      },
    },
    {
      type: 'Mutagenesis',
      location: {
        start: { value: 110, modifier: 'EXACT' },
        end: { value: 110, modifier: 'EXACT' },
      },
      description:
        'Loss of the copper binding site in the GFLD subdomain; when associated with A-108.',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '25122912' },
      ],
      alternativeSequence: {
        originalSequence: 'H',
        alternativeSequences: ['A'],
      },
    },
    {
      type: 'Mutagenesis',
      location: {
        start: { value: 137, modifier: 'EXACT' },
        end: { value: 137, modifier: 'EXACT' },
      },
      description: 'Binds copper. Forms dimer.',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '7913895' },
      ],
      alternativeSequence: {
        originalSequence: 'H',
        alternativeSequences: ['N'],
      },
    },
    {
      type: 'Mutagenesis',
      location: {
        start: { value: 141, modifier: 'EXACT' },
        end: { value: 141, modifier: 'EXACT' },
      },
      description: 'Binds copper. Forms dimer.',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '7913895' },
      ],
      alternativeSequence: {
        originalSequence: 'M',
        alternativeSequences: ['T'],
      },
    },
    {
      type: 'Mutagenesis',
      location: {
        start: { value: 144, modifier: 'EXACT' },
        end: { value: 144, modifier: 'EXACT' },
      },
      description:
        'Binds copper. No dimer formation. No copper reducing activity.',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10461923' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '7913895' },
      ],
      alternativeSequence: {
        originalSequence: 'C',
        alternativeSequences: ['S'],
      },
    },
    {
      type: 'Mutagenesis',
      location: {
        start: { value: 147, modifier: 'EXACT' },
        end: { value: 149, modifier: 'EXACT' },
      },
      description: '50% decrease in copper reducing activity.',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10461923' },
      ],
      alternativeSequence: {
        originalSequence: 'HLH',
        alternativeSequences: ['ALA'],
      },
    },
    {
      type: 'Mutagenesis',
      location: {
        start: { value: 147, modifier: 'EXACT' },
        end: { value: 147, modifier: 'EXACT' },
      },
      description: 'Loss of a copper binding site; when associated with A-151.',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '25122912' },
      ],
      alternativeSequence: {
        originalSequence: 'H',
        alternativeSequences: ['A'],
      },
    },
    {
      type: 'Mutagenesis',
      location: {
        start: { value: 147, modifier: 'EXACT' },
        end: { value: 147, modifier: 'EXACT' },
      },
      description: 'Some decrease in copper reducing activity.',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11784781' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '7913895' },
      ],
      alternativeSequence: {
        originalSequence: 'H',
        alternativeSequences: ['A'],
      },
    },
    {
      type: 'Mutagenesis',
      location: {
        start: { value: 147, modifier: 'EXACT' },
        end: { value: 147, modifier: 'EXACT' },
      },
      description: 'Binds copper. Forms dimer.',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11784781' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '7913895' },
      ],
      alternativeSequence: {
        originalSequence: 'H',
        alternativeSequences: ['N'],
      },
    },
    {
      type: 'Mutagenesis',
      location: {
        start: { value: 147, modifier: 'EXACT' },
        end: { value: 147, modifier: 'EXACT' },
      },
      description:
        'Greatly reduced copper-mediated low-density lipoprotein oxidation.',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11784781' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '7913895' },
      ],
      alternativeSequence: {
        originalSequence: 'H',
        alternativeSequences: ['Y'],
      },
    },
    {
      type: 'Mutagenesis',
      location: {
        start: { value: 151, modifier: 'EXACT' },
        end: { value: 151, modifier: 'EXACT' },
      },
      description: 'Loss of a copper binding site; when associated with A-147.',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '25122912' },
      ],
      alternativeSequence: {
        originalSequence: 'H',
        alternativeSequences: ['A'],
      },
    },
    {
      type: 'Mutagenesis',
      location: {
        start: { value: 151, modifier: 'EXACT' },
        end: { value: 151, modifier: 'EXACT' },
      },
      description:
        'Greatly reduced copper-mediated low-density lipoprotein oxidation.',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11784781' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '7913895' },
      ],
      alternativeSequence: {
        originalSequence: 'H',
        alternativeSequences: ['K'],
      },
    },
    {
      type: 'Mutagenesis',
      location: {
        start: { value: 151, modifier: 'EXACT' },
        end: { value: 151, modifier: 'EXACT' },
      },
      description: 'Binds copper. Forms dimer.',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11784781' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '7913895' },
      ],
      alternativeSequence: {
        originalSequence: 'H',
        alternativeSequences: ['N'],
      },
    },
    {
      type: 'Mutagenesis',
      location: {
        start: { value: 198, modifier: 'EXACT' },
        end: { value: 198, modifier: 'EXACT' },
      },
      description: 'Greatly reduced casein kinase phosphorylation.',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10806211' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8999878' },
      ],
      alternativeSequence: {
        originalSequence: 'S',
        alternativeSequences: ['A'],
      },
    },
    {
      type: 'Mutagenesis',
      location: {
        start: { value: 206, modifier: 'EXACT' },
        end: { value: 206, modifier: 'EXACT' },
      },
      description: 'Reduced casein kinase phosphorylation.',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10806211' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8999878' },
      ],
      alternativeSequence: {
        originalSequence: 'S',
        alternativeSequences: ['A'],
      },
    },
    {
      type: 'Mutagenesis',
      location: {
        start: { value: 499, modifier: 'EXACT' },
        end: { value: 499, modifier: 'EXACT' },
      },
      description: 'Reduced affinity for heparin; when associated with A-503.',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '15304215' },
      ],
      alternativeSequence: {
        originalSequence: 'R',
        alternativeSequences: ['A'],
      },
    },
    {
      type: 'Mutagenesis',
      location: {
        start: { value: 503, modifier: 'EXACT' },
        end: { value: 503, modifier: 'EXACT' },
      },
      description: 'Reduced affinity for heparin; when associated with A-499.',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '15304215' },
      ],
      alternativeSequence: {
        originalSequence: 'K',
        alternativeSequences: ['A'],
      },
    },
    {
      type: 'Mutagenesis',
      location: {
        start: { value: 656, modifier: 'EXACT' },
        end: { value: 656, modifier: 'EXACT' },
      },
      description: 'Abolishes chondroitin sulfate binding in L-APP733 isoform.',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '7737970' },
      ],
      alternativeSequence: {
        originalSequence: 'S',
        alternativeSequences: ['A'],
      },
    },
    {
      type: 'Mutagenesis',
      location: {
        start: { value: 676, modifier: 'EXACT' },
        end: { value: 676, modifier: 'EXACT' },
      },
      description: '60-70% zinc-induced amyloid-beta protein 28 aggregation.',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10413512' },
      ],
      alternativeSequence: {
        originalSequence: 'R',
        alternativeSequences: ['G'],
      },
    },
    {
      type: 'Mutagenesis',
      location: {
        start: { value: 681, modifier: 'EXACT' },
        end: { value: 681, modifier: 'EXACT' },
      },
      description: '60-70% zinc-induced amyloid-beta protein 28 aggregation.',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10413512' },
      ],
      alternativeSequence: {
        originalSequence: 'Y',
        alternativeSequences: ['F'],
      },
    },
    {
      type: 'Mutagenesis',
      location: {
        start: { value: 684, modifier: 'EXACT' },
        end: { value: 684, modifier: 'EXACT' },
      },
      description: 'Only 23% zinc-induced amyloid-beta protein 28 aggregation.',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10413512' },
      ],
      alternativeSequence: {
        originalSequence: 'H',
        alternativeSequences: ['R'],
      },
    },
    {
      type: 'Mutagenesis',
      location: {
        start: { value: 695, modifier: 'EXACT' },
        end: { value: 695, modifier: 'EXACT' },
      },
      description:
        'Causes formation of an artifactual disulfide bond with PSEN1.',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '30630874' },
      ],
      alternativeSequence: {
        originalSequence: 'V',
        alternativeSequences: ['C'],
      },
    },
    {
      type: 'Mutagenesis',
      location: {
        start: { value: 704, modifier: 'EXACT' },
        end: { value: 704, modifier: 'EXACT' },
      },
      description: 'Reduced protein oxidation. No hippocampal neuron toxicity.',
      alternativeSequence: {
        originalSequence: 'G',
        alternativeSequences: ['V'],
      },
    },
    {
      type: 'Mutagenesis',
      location: {
        start: { value: 706, modifier: 'EXACT' },
        end: { value: 706, modifier: 'EXACT' },
      },
      description: 'Reduced lipid peroxidation inhibition.',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10535332' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '9168929' },
      ],
      alternativeSequence: {
        originalSequence: 'M',
        alternativeSequences: ['L'],
      },
    },
    {
      type: 'Mutagenesis',
      location: {
        start: { value: 706, modifier: 'EXACT' },
        end: { value: 706, modifier: 'EXACT' },
      },
      description:
        'No free radical production. No hippocampal neuron toxicity.',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10535332' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '9168929' },
      ],
      alternativeSequence: {
        originalSequence: 'M',
        alternativeSequences: ['V'],
      },
    },
    {
      type: 'Mutagenesis',
      location: {
        start: { value: 717, modifier: 'EXACT' },
        end: { value: 717, modifier: 'EXACT' },
      },
      description:
        'Unchanged amyloid-beta protein 42/total amyloid-beta ratio.',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11063718' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8886002' },
      ],
      alternativeSequence: {
        originalSequence: 'V',
        alternativeSequences: ['C', 'S'],
      },
    },
    {
      type: 'Mutagenesis',
      location: {
        start: { value: 717, modifier: 'EXACT' },
        end: { value: 717, modifier: 'EXACT' },
      },
      description:
        'Decreased amyloid-beta protein 42/total amyloid-beta ratio.',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11063718' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8886002' },
      ],
      alternativeSequence: {
        originalSequence: 'V',
        alternativeSequences: ['K'],
      },
    },
    {
      type: 'Mutagenesis',
      location: {
        start: { value: 717, modifier: 'EXACT' },
        end: { value: 717, modifier: 'EXACT' },
      },
      description:
        'Increased amyloid-beta protein 42/40 ratio. No change in apoptosis after caspase cleavage.',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11063718' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8886002' },
      ],
      alternativeSequence: {
        originalSequence: 'V',
        alternativeSequences: ['M'],
      },
    },
    {
      type: 'Mutagenesis',
      location: {
        start: { value: 728, modifier: 'EXACT' },
        end: { value: 728, modifier: 'EXACT' },
      },
      description:
        'No effect on APBA1 nor APBB1 binding. Greatly reduces the binding to APPBP2. APP internalization unchanged. No change in amyloid-beta protein 42 secretion.',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10383380' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8887653' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '9843960' },
      ],
      alternativeSequence: {
        originalSequence: 'Y',
        alternativeSequences: ['A'],
      },
    },
    {
      type: 'Mutagenesis',
      location: {
        start: { value: 739, modifier: 'EXACT' },
        end: { value: 739, modifier: 'EXACT' },
      },
      description: 'No cleavage by caspases during apoptosis.',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10319819' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10742146' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '12214090' },
      ],
      alternativeSequence: {
        originalSequence: 'D',
        alternativeSequences: ['A'],
      },
    },
    {
      type: 'Mutagenesis',
      location: {
        start: { value: 739, modifier: 'EXACT' },
        end: { value: 739, modifier: 'EXACT' },
      },
      description: 'No effect on FADD-induced apoptosis.',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10319819' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10742146' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '12214090' },
      ],
      alternativeSequence: {
        originalSequence: 'D',
        alternativeSequences: ['N'],
      },
    },
    {
      type: 'Mutagenesis',
      location: {
        start: { value: 743, modifier: 'EXACT' },
        end: { value: 743, modifier: 'EXACT' },
      },
      description:
        'Greatly reduces the binding to SHC1 and APBB family members; no effect on NGF-stimulated neurite extension. Loss of phosphorylation by LRRK2.',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10341243' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11146006' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11517218' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11877420' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '28720718' },
      ],
      alternativeSequence: {
        originalSequence: 'T',
        alternativeSequences: ['A'],
      },
    },
    {
      type: 'Mutagenesis',
      location: {
        start: { value: 743, modifier: 'EXACT' },
        end: { value: 743, modifier: 'EXACT' },
      },
      description:
        'Reduced NGF-stimulated neurite extension. No effect on APP maturation.',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10341243' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11146006' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11517218' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11877420' },
      ],
      alternativeSequence: {
        originalSequence: 'T',
        alternativeSequences: ['E'],
      },
    },
    {
      type: 'Mutagenesis',
      location: {
        start: { value: 756, modifier: 'EXACT' },
        end: { value: 756, modifier: 'EXACT' },
      },
      description:
        'APP internalization unchanged. No change in amyloid-beta protein 42 secretion.',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10383380' },
      ],
      alternativeSequence: {
        originalSequence: 'G',
        alternativeSequences: ['A'],
      },
    },
    {
      type: 'Mutagenesis',
      location: {
        start: { value: 757, modifier: 'EXACT' },
        end: { value: 762, modifier: 'EXACT' },
      },
      description: 'No effect on C99 interaction with SORL1.',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '16407538' },
      ],
      alternativeSequence: {
        originalSequence: 'YENPTY',
        alternativeSequences: ['AENPTA'],
      },
    },
    {
      type: 'Mutagenesis',
      location: {
        start: { value: 757, modifier: 'EXACT' },
        end: { value: 757, modifier: 'EXACT' },
      },
      description:
        'Little APP internalization. Reduced amyloid-beta protein 42 secretion.',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10383380' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11724784' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11877420' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8887653' },
      ],
      alternativeSequence: {
        originalSequence: 'Y',
        alternativeSequences: ['A'],
      },
    },
    {
      type: 'Mutagenesis',
      location: {
        start: { value: 757, modifier: 'EXACT' },
        end: { value: 757, modifier: 'EXACT' },
      },
      description:
        'Loss of binding to MAPK8IP1, APBA1, APBB1, APPBP2 and SHC1.',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10383380' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11724784' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11877420' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8887653' },
      ],
      alternativeSequence: {
        originalSequence: 'Y',
        alternativeSequences: ['G'],
      },
    },
    {
      type: 'Mutagenesis',
      location: {
        start: { value: 759, modifier: 'EXACT' },
        end: { value: 759, modifier: 'EXACT' },
      },
      description:
        'No binding to APBA1, no effect on APBB1 binding. Little APP internalization. Reduced amyloid-beta protein 42 secretion.',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10383380' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8887653' },
      ],
      alternativeSequence: {
        originalSequence: 'N',
        alternativeSequences: ['A'],
      },
    },
    {
      type: 'Mutagenesis',
      location: {
        start: { value: 760, modifier: 'EXACT' },
        end: { value: 760, modifier: 'EXACT' },
      },
      description:
        'Little APP internalization. Reduced amyloid-beta protein 42 secretion.',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10383380' },
      ],
      alternativeSequence: {
        originalSequence: 'P',
        alternativeSequences: ['A'],
      },
    },
    {
      type: 'Mutagenesis',
      location: {
        start: { value: 762, modifier: 'EXACT' },
        end: { value: 762, modifier: 'EXACT' },
      },
      description:
        'Loss of binding to APBA1 and APBB1. APP internalization unchanged. No change in amyloid-beta protein 42 secretion.',
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10383380' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '8887653' },
      ],
      alternativeSequence: {
        originalSequence: 'Y',
        alternativeSequences: ['A'],
      },
    },
    {
      type: 'Sequence conflict',
      location: {
        start: { value: 15, modifier: 'EXACT' },
        end: { value: 16, modifier: 'EXACT' },
      },
      description: 'in Ref. 3; CAA31830',
      evidences: [{ evidenceCode: 'ECO:0000305' }],
      alternativeSequence: {
        originalSequence: 'AR',
        alternativeSequences: ['VW'],
      },
    },
    {
      type: 'Sequence conflict',
      location: {
        start: { value: 647, modifier: 'EXACT' },
        end: { value: 647, modifier: 'EXACT' },
      },
      description: 'in Ref. 36; AAA51722',
      evidences: [{ evidenceCode: 'ECO:0000305' }],
      alternativeSequence: {
        originalSequence: 'D',
        alternativeSequences: ['E'],
      },
    },
    {
      type: 'Sequence conflict',
      location: {
        start: { value: 724, modifier: 'EXACT' },
        end: { value: 724, modifier: 'EXACT' },
      },
      description: 'in Ref. 23; AAB26263/AAB26264',
      evidences: [{ evidenceCode: 'ECO:0000305' }],
      alternativeSequence: {},
    },
    {
      type: 'Sequence conflict',
      location: {
        start: { value: 731, modifier: 'EXACT' },
        end: { value: 731, modifier: 'EXACT' },
      },
      description: 'in Ref. 23; AAB26263/AAB26264/AAB26265',
      evidences: [{ evidenceCode: 'ECO:0000305' }],
      alternativeSequence: {
        originalSequence: 'I',
        alternativeSequences: ['N'],
      },
    },
    {
      type: 'Sequence conflict',
      location: {
        start: { value: 757, modifier: 'EXACT' },
        end: { value: 757, modifier: 'EXACT' },
      },
      description: 'in Ref. 31; AAA35540',
      evidences: [{ evidenceCode: 'ECO:0000305' }],
      alternativeSequence: {
        originalSequence: 'Y',
        alternativeSequences: ['S'],
      },
    },
    {
      type: 'Helix',
      location: {
        start: { value: 26, modifier: 'EXACT' },
        end: { value: 28, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '4PQD' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 33, modifier: 'EXACT' },
        end: { value: 35, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '4PQD' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 43, modifier: 'EXACT' },
        end: { value: 45, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '4PQD' }],
    },
    {
      type: 'Turn',
      location: {
        start: { value: 47, modifier: 'EXACT' },
        end: { value: 49, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '4PQD' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 52, modifier: 'EXACT' },
        end: { value: 54, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '4PQD' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 56, modifier: 'EXACT' },
        end: { value: 58, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '4PWQ' }],
    },
    {
      type: 'Helix',
      location: {
        start: { value: 66, modifier: 'EXACT' },
        end: { value: 76, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '4PQD' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 82, modifier: 'EXACT' },
        end: { value: 87, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '4PQD' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 92, modifier: 'EXACT' },
        end: { value: 94, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '4PQD' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 97, modifier: 'EXACT' },
        end: { value: 99, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '4PQD' }],
    },
    {
      type: 'Turn',
      location: {
        start: { value: 100, modifier: 'EXACT' },
        end: { value: 102, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '4PQD' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 103, modifier: 'EXACT' },
        end: { value: 106, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '4PQD' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 110, modifier: 'EXACT' },
        end: { value: 112, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '4PQD' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 115, modifier: 'EXACT' },
        end: { value: 119, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '4PQD' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 134, modifier: 'EXACT' },
        end: { value: 139, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '2FMA' }],
    },
    {
      type: 'Helix',
      location: {
        start: { value: 147, modifier: 'EXACT' },
        end: { value: 160, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '2FMA' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 163, modifier: 'EXACT' },
        end: { value: 174, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '2FMA' }],
    },
    {
      type: 'Turn',
      location: {
        start: { value: 175, modifier: 'EXACT' },
        end: { value: 177, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '2FMA' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 178, modifier: 'EXACT' },
        end: { value: 188, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '2FMA' }],
    },
    {
      type: 'Helix',
      location: {
        start: { value: 288, modifier: 'EXACT' },
        end: { value: 292, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '1AAP' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 299, modifier: 'EXACT' },
        end: { value: 301, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '1AAP' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 304, modifier: 'EXACT' },
        end: { value: 310, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '1AAP' }],
    },
    {
      type: 'Turn',
      location: {
        start: { value: 311, modifier: 'EXACT' },
        end: { value: 314, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '1AAP' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 315, modifier: 'EXACT' },
        end: { value: 321, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '1AAP' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 323, modifier: 'EXACT' },
        end: { value: 325, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '1AAP' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 331, modifier: 'EXACT' },
        end: { value: 333, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '1AAP' }],
    },
    {
      type: 'Helix',
      location: {
        start: { value: 334, modifier: 'EXACT' },
        end: { value: 341, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '1AAP' }],
    },
    {
      type: 'Helix',
      location: {
        start: { value: 374, modifier: 'EXACT' },
        end: { value: 380, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '3NYL' }],
    },
    {
      type: 'Helix',
      location: {
        start: { value: 389, modifier: 'EXACT' },
        end: { value: 418, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '3UMH' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 421, modifier: 'EXACT' },
        end: { value: 423, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '3UMH' }],
    },
    {
      type: 'Helix',
      location: {
        start: { value: 425, modifier: 'EXACT' },
        end: { value: 480, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '3UMH' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 482, modifier: 'EXACT' },
        end: { value: 484, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '3NYJ' }],
    },
    {
      type: 'Helix',
      location: {
        start: { value: 487, modifier: 'EXACT' },
        end: { value: 518, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '3UMH' }],
    },
    {
      type: 'Helix',
      location: {
        start: { value: 520, modifier: 'EXACT' },
        end: { value: 546, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '3UMH' }],
    },
    {
      type: 'Helix',
      location: {
        start: { value: 547, modifier: 'EXACT' },
        end: { value: 550, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '3UMH' }],
    },
    {
      type: 'Helix',
      location: {
        start: { value: 552, modifier: 'EXACT' },
        end: { value: 566, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '3UMH' }],
    },
    {
      type: 'Helix',
      location: {
        start: { value: 615, modifier: 'EXACT' },
        end: { value: 618, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '5BUO' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 620, modifier: 'EXACT' },
        end: { value: 622, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '5BUO' }],
    },
    {
      type: 'Helix',
      location: {
        start: { value: 673, modifier: 'EXACT' },
        end: { value: 675, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '4OJF' }],
    },
    {
      type: 'Turn',
      location: {
        start: { value: 677, modifier: 'EXACT' },
        end: { value: 680, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '5MYO' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 683, modifier: 'EXACT' },
        end: { value: 685, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '1BA4' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 688, modifier: 'EXACT' },
        end: { value: 691, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '6O4J' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 692, modifier: 'EXACT' },
        end: { value: 694, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '4MVI' }],
    },
    {
      type: 'Turn',
      location: {
        start: { value: 695, modifier: 'EXACT' },
        end: { value: 698, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '4MVI' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 701, modifier: 'EXACT' },
        end: { value: 703, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '3PZZ' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 707, modifier: 'EXACT' },
        end: { value: 712, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '2Y3K' }],
    },
    {
      type: 'Helix',
      location: {
        start: { value: 713, modifier: 'EXACT' },
        end: { value: 715, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '6IYC' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 721, modifier: 'EXACT' },
        end: { value: 725, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '6IYC' }],
    },
    {
      type: 'Helix',
      location: {
        start: { value: 744, modifier: 'EXACT' },
        end: { value: 754, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '3DXE' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 756, modifier: 'EXACT' },
        end: { value: 758, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '6ITU' }],
    },
    {
      type: 'Beta strand',
      location: {
        start: { value: 763, modifier: 'EXACT' },
        end: { value: 765, modifier: 'EXACT' },
      },
      description: '',
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '3L81' }],
    },
  ],
  keywords: [
    { id: 'KW-0002', category: 'Technical term', name: '3D-structure' },
    {
      id: 'KW-0025',
      category: 'Coding sequence diversity',
      name: 'Alternative splicing',
    },
    { id: 'KW-0026', category: 'Disease', name: 'Alzheimer disease' },
    { id: 'KW-0034', category: 'Cellular component', name: 'Amyloid' },
    { id: 'KW-1008', category: 'Disease', name: 'Amyloidosis' },
    { id: 'KW-0053', category: 'Biological process', name: 'Apoptosis' },
    { id: 'KW-0130', category: 'Biological process', name: 'Cell adhesion' },
    { id: 'KW-1003', category: 'Cellular component', name: 'Cell membrane' },
    { id: 'KW-0966', category: 'Cellular component', name: 'Cell projection' },
    { id: 'KW-0168', category: 'Cellular component', name: 'Coated pit' },
    { id: 'KW-0186', category: 'Ligand', name: 'Copper' },
    { id: 'KW-0963', category: 'Cellular component', name: 'Cytoplasm' },
    {
      id: 'KW-0968',
      category: 'Cellular component',
      name: 'Cytoplasmic vesicle',
    },
    {
      id: 'KW-0903',
      category: 'Technical term',
      name: 'Direct protein sequencing',
    },
    { id: 'KW-0225', category: 'Disease', name: 'Disease variant' },
    { id: 'KW-1015', category: 'PTM', name: 'Disulfide bond' },
    { id: 'KW-0254', category: 'Biological process', name: 'Endocytosis' },
    { id: 'KW-0967', category: 'Cellular component', name: 'Endosome' },
    { id: 'KW-0325', category: 'PTM', name: 'Glycoprotein' },
    { id: 'KW-0358', category: 'Molecular function', name: 'Heparin-binding' },
    { id: 'KW-0408', category: 'Ligand', name: 'Iron' },
    { id: 'KW-1017', category: 'PTM', name: 'Isopeptide bond' },
    { id: 'KW-0472', category: 'Cellular component', name: 'Membrane' },
    { id: 'KW-0479', category: 'Ligand', name: 'Metal-binding' },
    { id: 'KW-0523', category: 'Disease', name: 'Neurodegeneration' },
    {
      id: 'KW-0914',
      category: 'Biological process',
      name: 'Notch signaling pathway',
    },
    { id: 'KW-0539', category: 'Cellular component', name: 'Nucleus' },
    { id: 'KW-0558', category: 'PTM', name: 'Oxidation' },
    { id: 'KW-0597', category: 'PTM', name: 'Phosphoprotein' },
    {
      id: 'KW-0646',
      category: 'Molecular function',
      name: 'Protease inhibitor',
    },
    { id: 'KW-0654', category: 'PTM', name: 'Proteoglycan' },
    { id: 'KW-1185', category: 'Technical term', name: 'Reference proteome' },
    { id: 'KW-0964', category: 'Cellular component', name: 'Secreted' },
    {
      id: 'KW-0722',
      category: 'Molecular function',
      name: 'Serine protease inhibitor',
    },
    { id: 'KW-0732', category: 'Domain', name: 'Signal' },
    { id: 'KW-0765', category: 'PTM', name: 'Sulfation' },
    { id: 'KW-0812', category: 'Domain', name: 'Transmembrane' },
    { id: 'KW-1133', category: 'Domain', name: 'Transmembrane helix' },
    { id: 'KW-0832', category: 'PTM', name: 'Ubl conjugation' },
    { id: 'KW-0862', category: 'Ligand', name: 'Zinc' },
  ],
  references: [
    {
      citation: {
        id: '2881207',
        citationType: 'journal article',
        authors: [
          'Kang J.',
          'Lemaire H.-G.',
          'Unterbeck A.',
          'Salbaum J.M.',
          'Masters C.L.',
          'Grzeschik K.-H.',
          'Multhaup G.',
          'Beyreuther K.',
          'Mueller-Hill B.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '2881207' },
          { database: 'DOI', id: '10.1038/325733a0' },
        ],
        title:
          "The precursor of Alzheimer's disease amyloid A4 protein resembles a cell-surface receptor.",
        publicationDate: '1987',
        journal: 'Nature',
        firstPage: '733',
        lastPage: '736',
        volume: '325',
      },
      referencePositions: ['NUCLEOTIDE SEQUENCE [MRNA] (ISOFORM APP695)'],
      referenceComments: [{ value: 'Brain', type: 'TISSUE' }],
    },
    {
      citation: {
        id: '2893289',
        citationType: 'journal article',
        authors: [
          'Ponte P.',
          'Gonzalez-Dewhitt P.',
          'Schilling J.',
          'Miller J.',
          'Hsu D.',
          'Greenberg B.',
          'Davis K.',
          'Wallace W.',
          'Lieberburg I.',
          'Fuller F.',
          'Cordell B.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '2893289' },
          { database: 'DOI', id: '10.1038/331525a0' },
        ],
        title:
          'A new A4 amyloid mRNA contains a domain homologous to serine proteinase inhibitors.',
        publicationDate: '1988',
        journal: 'Nature',
        firstPage: '525',
        lastPage: '527',
        volume: '331',
      },
      referencePositions: ['NUCLEOTIDE SEQUENCE [MRNA] (ISOFORM APP751)'],
      referenceComments: [{ value: 'Brain', type: 'TISSUE' }],
    },
    {
      citation: {
        id: '2783775',
        citationType: 'journal article',
        authors: [
          'Lemaire H.-G.',
          'Salbaum J.M.',
          'Multhaup G.',
          'Kang J.',
          'Bayney R.M.',
          'Unterbeck A.',
          'Beyreuther K.',
          'Mueller-Hill B.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '2783775' },
          { database: 'DOI', id: '10.1093/nar/17.2.517' },
        ],
        title:
          "The PreA4(695) precursor protein of Alzheimer's disease A4 amyloid is encoded by 16 exons.",
        publicationDate: '1989',
        journal: 'Nucleic Acids Res.',
        firstPage: '517',
        lastPage: '522',
        volume: '17',
      },
      referencePositions: [
        'NUCLEOTIDE SEQUENCE [GENOMIC DNA] (ISOFORM APP695)',
      ],
    },
    {
      citation: {
        id: '2110105',
        citationType: 'journal article',
        authors: [
          'Yoshikai S.',
          'Sasaki H.',
          'Doh-ura K.',
          'Furuya H.',
          'Sakaki Y.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '2110105' },
          { database: 'DOI', id: '10.1016/0378-1119(90)90310-n' },
        ],
        title:
          'Genomic organization of the human amyloid beta-protein precursor gene.',
        publicationDate: '1990',
        journal: 'Gene',
        firstPage: '257',
        lastPage: '263',
        volume: '87',
      },
      referencePositions: [
        'NUCLEOTIDE SEQUENCE [GENOMIC DNA] (ISOFORM APP770)',
      ],
    },
    {
      citation: {
        id: '1908403',
        citationType: 'journal article',
        authors: [
          'Yoshikai S.',
          'Sasaki H.',
          'Doh-ura K.',
          'Furuya H.',
          'Sakaki Y.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '1908403' },
          { database: 'DOI', id: '10.1016/0378-1119(91)90093-q' },
        ],
        publicationDate: '1991',
        journal: 'Gene',
        firstPage: '291',
        lastPage: '292',
        volume: '102',
      },
      referencePositions: ['ERRATUM OF PUBMED:2110105'],
    },
    {
      citation: {
        id: '1587857',
        citationType: 'journal article',
        authors: [
          'Koenig G.',
          'Moenning U.',
          'Czech C.',
          'Prior R.',
          'Banati R.',
          'Schreiter-Gasser U.',
          'Bauer J.',
          'Masters C.L.',
          'Beyreuther K.',
        ],
        citationCrossReferences: [{ database: 'PubMed', id: '1587857' }],
        title:
          'Identification and differential expression of a novel alternative splice isoform of the beta A4 amyloid precursor protein (APP) mRNA in leukocytes and brain microglial cells.',
        publicationDate: '1992',
        journal: 'J. Biol. Chem.',
        firstPage: '10804',
        lastPage: '10809',
        volume: '267',
      },
      referencePositions: ['NUCLEOTIDE SEQUENCE [MRNA] (ISOFORM L-APP733)'],
      referenceComments: [{ value: 'Leukocyte', type: 'TISSUE' }],
    },
    {
      citation: {
        id: '9108164',
        citationType: 'journal article',
        authors: [
          'Hattori M.',
          'Tsukahara F.',
          'Furuhata Y.',
          'Tanahashi H.',
          'Hirose M.',
          'Saito M.',
          'Tsukuni S.',
          'Sakaki Y.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '9108164' },
          { database: 'DOI', id: '10.1093/nar/25.9.1802' },
        ],
        title:
          'A novel method for making nested deletions and its application for sequencing of a 300 kb region of human APP locus.',
        publicationDate: '1997',
        journal: 'Nucleic Acids Res.',
        firstPage: '1802',
        lastPage: '1808',
        volume: '25',
      },
      referencePositions: [
        'NUCLEOTIDE SEQUENCE [GENOMIC DNA] (ISOFORM APP770)',
      ],
    },
    {
      citation: {
        id: '12859342',
        citationType: 'journal article',
        authors: [
          'Tang K.',
          'Wang C.',
          'Shen C.',
          'Sheng S.',
          'Ravid R.',
          'Jing N.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '12859342' },
          { database: 'DOI', id: '10.1046/j.1460-9568.2003.02731.x' },
        ],
        title:
          'Identification of a novel alternative splicing isoform of human amyloid precursor protein gene, APP639.',
        publicationDate: '2003',
        journal: 'Eur. J. Neurosci.',
        firstPage: '102',
        lastPage: '108',
        volume: '18',
      },
      referencePositions: [
        'NUCLEOTIDE SEQUENCE [MRNA] (ISOFORM APP639)',
        'TISSUE SPECIFICITY',
      ],
      referenceComments: [{ value: 'Brain', type: 'TISSUE' }],
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
        'NUCLEOTIDE SEQUENCE [LARGE SCALE MRNA] (ISOFORMS APP770 AND 11)',
      ],
      referenceComments: [
        { value: 'Cerebellum', type: 'TISSUE' },
        { value: 'Hippocampus', type: 'TISSUE' },
      ],
    },
    {
      citation: {
        id: 'CI-7CAL69OST03DI',
        citationType: 'submission',
        authoringGroup: ['NIEHS SNPs program'],
        publicationDate: 'FEB-2005',
        submissionDatabase: 'EMBL/GenBank/DDBJ databases',
      },
      referencePositions: [
        'NUCLEOTIDE SEQUENCE [GENOMIC DNA]',
        'VARIANT LYS-501',
      ],
    },
    {
      citation: {
        id: '10830953',
        citationType: 'journal article',
        authors: [
          'Hattori M.',
          'Fujiyama A.',
          'Taylor T.D.',
          'Watanabe H.',
          'Yada T.',
          'Park H.-S.',
          'Toyoda A.',
          'Ishii K.',
          'Totoki Y.',
          'Choi D.-K.',
          'Groner Y.',
          'Soeda E.',
          'Ohki M.',
          'Takagi T.',
          'Sakaki Y.',
          'Taudien S.',
          'Blechschmidt K.',
          'Polley A.',
          'Menzel U.',
          'Delabar J.',
          'Kumpf K.',
          'Lehmann R.',
          'Patterson D.',
          'Reichwald K.',
          'Rump A.',
          'Schillhabel M.',
          'Schudy A.',
          'Zimmermann W.',
          'Rosenthal A.',
          'Kudoh J.',
          'Shibuya K.',
          'Kawasaki K.',
          'Asakawa S.',
          'Shintani A.',
          'Sasaki T.',
          'Nagamine K.',
          'Mitsuyama S.',
          'Antonarakis S.E.',
          'Minoshima S.',
          'Shimizu N.',
          'Nordsiek G.',
          'Hornischer K.',
          'Brandt P.',
          'Scharfe M.',
          'Schoen O.',
          'Desario A.',
          'Reichelt J.',
          'Kauer G.',
          'Bloecker H.',
          'Ramser J.',
          'Beck A.',
          'Klages S.',
          'Hennig S.',
          'Riesselmann L.',
          'Dagand E.',
          'Wehrmeyer S.',
          'Borzym K.',
          'Gardiner K.',
          'Nizetic D.',
          'Francis F.',
          'Lehrach H.',
          'Reinhardt R.',
          'Yaspo M.-L.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '10830953' },
          { database: 'DOI', id: '10.1038/35012518' },
        ],
        title: 'The DNA sequence of human chromosome 21.',
        publicationDate: '2000',
        journal: 'Nature',
        firstPage: '311',
        lastPage: '319',
        volume: '405',
      },
      referencePositions: ['NUCLEOTIDE SEQUENCE [LARGE SCALE GENOMIC DNA]'],
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
        'NUCLEOTIDE SEQUENCE [LARGE SCALE MRNA] (ISOFORMS APP305 AND APP751)',
      ],
      referenceComments: [
        { value: 'Eye', type: 'TISSUE' },
        { value: 'Pancreas', type: 'TISSUE' },
      ],
    },
    {
      citation: {
        id: '3140222',
        citationType: 'journal article',
        authors: ['Schon E.A.', 'Mita S.', 'Sadlock J.', 'Herbert J.'],
        citationCrossReferences: [
          { database: 'PubMed', id: '3140222' },
          { database: 'DOI', id: '10.1093/nar/16.19.9351' },
        ],
        title:
          'A cDNA specifying the human amyloid beta precursor protein (ABPP) encodes a 95-kDa polypeptide.',
        publicationDate: '1988',
        journal: 'Nucleic Acids Res.',
        firstPage: '9351',
        lastPage: '9351',
        volume: '16',
      },
      referencePositions: ['NUCLEOTIDE SEQUENCE [MRNA] OF 1-10'],
      referenceComments: [{ value: 'Liver', type: 'TISSUE' }],
    },
    {
      citation: {
        id: 'CI-5TR5E0BV47JE8',
        citationType: 'journal article',
        authors: ['Schon E.A.', 'Mita S.', 'Sadlock J.', 'Herbert J.'],
        publicationDate: '1988',
        journal: 'Nucleic Acids Res.',
        firstPage: '11402',
        lastPage: '11402',
        volume: '16',
      },
      referencePositions: ['ERRATUM OF PUBMED:3140222', 'SEQUENCE REVISION'],
    },
    {
      citation: {
        id: '2538123',
        citationType: 'journal article',
        authors: ['La Fauci G.', 'Lahiri D.K.', 'Salton S.R.', 'Robakis N.K.'],
        citationCrossReferences: [
          { database: 'PubMed', id: '2538123' },
          { database: 'DOI', id: '10.1016/0006-291x(89)92437-6' },
        ],
        title:
          "Characterization of the 5'-end region and the first two exons of the beta-protein precursor gene.",
        publicationDate: '1989',
        journal: 'Biochem. Biophys. Res. Commun.',
        firstPage: '297',
        lastPage: '304',
        volume: '159',
      },
      referencePositions: ['NUCLEOTIDE SEQUENCE [GENOMIC DNA] OF 1-75'],
    },
    {
      citation: {
        id: '3597385',
        citationType: 'journal article',
        authors: ['van Nostrand W.E.', 'Cunningham D.D.'],
        citationCrossReferences: [{ database: 'PubMed', id: '3597385' }],
        title: 'Purification of protease nexin II from human fibroblasts.',
        publicationDate: '1987',
        journal: 'J. Biol. Chem.',
        firstPage: '8508',
        lastPage: '8514',
        volume: '262',
      },
      referencePositions: ['PROTEIN SEQUENCE OF 18-50'],
      referenceComments: [{ value: 'Fibroblast', type: 'TISSUE' }],
    },
    {
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
          { database: 'PubMed', id: '12665801' },
          { database: 'DOI', id: '10.1038/nbt810' },
        ],
        title:
          'Exploring proteomes and analyzing protein processing by mass spectrometric identification of sorted N-terminal peptides.',
        publicationDate: '2003',
        journal: 'Nat. Biotechnol.',
        firstPage: '566',
        lastPage: '569',
        volume: '21',
      },
      referencePositions: ['PROTEIN SEQUENCE OF 18-40'],
      referenceComments: [{ value: 'Platelet', type: 'TISSUE' }],
    },
    {
      citation: {
        id: '2893290',
        citationType: 'journal article',
        authors: [
          'Tanzi R.E.',
          'McClatchey A.I.',
          'Lamperti E.D.',
          'Villa-Komaroff L.',
          'Gusella J.F.',
          'Neve R.L.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '2893290' },
          { database: 'DOI', id: '10.1038/331528a0' },
        ],
        title:
          "Protease inhibitor domain encoded by an amyloid protein precursor mRNA associated with Alzheimer's disease.",
        publicationDate: '1988',
        journal: 'Nature',
        firstPage: '528',
        lastPage: '530',
        volume: '331',
      },
      referencePositions: ['NUCLEOTIDE SEQUENCE [MRNA] OF 286-366'],
    },
    {
      citation: {
        id: '2893291',
        citationType: 'journal article',
        authors: [
          'Kitaguchi N.',
          'Takahashi Y.',
          'Tokushima Y.',
          'Shiojiri S.',
          'Ito H.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '2893291' },
          { database: 'DOI', id: '10.1038/331530a0' },
        ],
        title:
          "Novel precursor of Alzheimer's disease amyloid protein shows protease inhibitory activity.",
        publicationDate: '1988',
        journal: 'Nature',
        firstPage: '530',
        lastPage: '532',
        volume: '331',
      },
      referencePositions: ['NUCLEOTIDE SEQUENCE [MRNA] OF 287-367'],
    },
    {
      citation: {
        id: '2893379',
        citationType: 'journal article',
        authors: [
          'Zain S.B.',
          'Salim M.',
          'Chou W.G.',
          'Sajdel-Sulkowska E.M.',
          'Majocha R.E.',
          'Marotta C.A.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '2893379' },
          { database: 'DOI', id: '10.1073/pnas.85.3.929' },
        ],
        title:
          'Molecular cloning of amyloid cDNA derived from mRNA of the Alzheimer disease brain: coding and noncoding regions of the fetal precursor mRNA are expressed in the cortex.',
        publicationDate: '1988',
        journal: 'Proc. Natl. Acad. Sci. U.S.A.',
        firstPage: '929',
        lastPage: '933',
        volume: '85',
      },
      referencePositions: ['NUCLEOTIDE SEQUENCE [MRNA] OF 507-770'],
      referenceComments: [{ value: 'Brain cortex', type: 'TISSUE' }],
    },
    {
      citation: {
        id: '8576160',
        citationType: 'journal article',
        authors: ['Beher D.', 'Hesse L.', 'Masters C.L.', 'Multhaup G.'],
        citationCrossReferences: [
          { database: 'PubMed', id: '8576160' },
          { database: 'DOI', id: '10.1074/jbc.271.3.1613' },
        ],
        title:
          'Regulation of amyloid protein precursor (APP) binding to collagen and mapping of the binding sites on APP and collagen type I.',
        publicationDate: '1996',
        journal: 'J. Biol. Chem.',
        firstPage: '1613',
        lastPage: '1620',
        volume: '271',
      },
      referencePositions: [
        'PROTEIN SEQUENCE OF 523-555',
        'DOMAIN COLLAGEN-BINDING',
      ],
    },
    {
      citation: {
        id: '8476439',
        citationType: 'journal article',
        authors: ['Denman R.B.', 'Rosenzcwaig R.', 'Miller D.L.'],
        citationCrossReferences: [
          { database: 'PubMed', id: '8476439' },
          { database: 'DOI', id: '10.1006/bbrc.1993.1386' },
        ],
        title:
          'A system for studying the effect(s) of familial Alzheimer disease mutations on the processing of the beta-amyloid peptide precursor.',
        publicationDate: '1993',
        journal: 'Biochem. Biophys. Res. Commun.',
        firstPage: '96',
        lastPage: '103',
        volume: '192',
      },
      referencePositions: [
        'NUCLEOTIDE SEQUENCE [MRNA] OF 655-737',
        'VARIANTS AD1 GLY-717; ILE-717 AND PHE-717',
      ],
    },
    {
      citation: {
        id: '2675837',
        citationType: 'journal article',
        authors: [
          'Johnstone E.M.',
          'Chaney M.O.',
          'Moore R.E.',
          'Ward K.E.',
          'Norris F.H.',
          'Little S.P.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '2675837' },
          { database: 'DOI', id: '10.1016/0006-291x(89)91112-1' },
        ],
        title:
          "Alzheimer's disease amyloid peptide is encoded by two exons and shows similarity to soybean trypsin inhibitor.",
        publicationDate: '1989',
        journal: 'Biochem. Biophys. Res. Commun.',
        firstPage: '1248',
        lastPage: '1255',
        volume: '163',
      },
      referencePositions: ['NUCLEOTIDE SEQUENCE [GENOMIC DNA] OF 656-737'],
    },
    {
      citation: {
        id: '15201367',
        citationType: 'journal article',
        authors: [
          'Wakutani Y.',
          'Watanabe K.',
          'Adachi Y.',
          'Wada-Isoe K.',
          'Urakami K.',
          'Ninomiya H.',
          'Saido T.C.',
          'Hashimoto T.',
          'Iwatsubo T.',
          'Nakashima K.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '15201367' },
          { database: 'DOI', id: '10.1136/jnnp.2003.010611' },
        ],
        title:
          "Novel amyloid precursor protein gene missense mutation (D678N) in probable familial Alzheimer's disease.",
        publicationDate: '2004',
        journal: 'J. Neurol. Neurosurg. Psych.',
        firstPage: '1039',
        lastPage: '1042',
        volume: '75',
      },
      referencePositions: [
        'NUCLEOTIDE SEQUENCE [MRNA] OF 672-723',
        'VARIANT AD1 ASN-678',
      ],
    },
    {
      citation: {
        id: '3312495',
        citationType: 'journal article',
        authors: [
          'Pardridge W.M.',
          'Vinters H.V.',
          'Yang J.',
          'Eisenberg J.',
          'Choi T.B.',
          'Tourtellotte W.W.',
          'Huebner V.',
          'Shively J.E.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '3312495' },
          { database: 'DOI', id: '10.1111/j.1471-4159.1987.tb01005.x' },
        ],
        title:
          "Amyloid angiopathy of Alzheimer's disease: amino acid composition and partial sequence of a 4,200-dalton peptide isolated from cortical microvessels.",
        publicationDate: '1987',
        journal: 'J. Neurochem.',
        firstPage: '1394',
        lastPage: '1401',
        volume: '49',
      },
      referencePositions: ['PROTEIN SEQUENCE OF 672-681'],
      referenceComments: [{ value: 'Brain cortex', type: 'TISSUE' }],
    },
    {
      citation: {
        id: '1406936',
        citationType: 'journal article',
        authors: [
          'Seubert P.',
          'Vigo-Pelfrey C.',
          'Esch F.',
          'Lee M.',
          'Dovey H.',
          'Davis D.',
          'Sinha S.',
          'Schlossmacher M.',
          'Whaley J.',
          'Swindlehurst C.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '1406936' },
          { database: 'DOI', id: '10.1038/359325a0' },
        ],
        title:
          "Isolation and quantification of soluble Alzheimer's beta-peptide from biological fluids.",
        publicationDate: '1992',
        journal: 'Nature',
        firstPage: '325',
        lastPage: '327',
        volume: '359',
      },
      referencePositions: ['PROTEIN SEQUENCE OF 672-704', 'TISSUE SPECIFICITY'],
    },
    {
      citation: {
        id: '8229004',
        citationType: 'journal article',
        authors: [
          'Vigo-Pelfrey C.',
          'Lee D.',
          'Keim P.',
          'Lieberburg I.',
          'Schenk D.B.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '8229004' },
          { database: 'DOI', id: '10.1111/j.1471-4159.1993.tb09841.x' },
        ],
        title:
          'Characterization of beta-amyloid peptide from human cerebrospinal fluid.',
        publicationDate: '1993',
        journal: 'J. Neurochem.',
        firstPage: '1965',
        lastPage: '1968',
        volume: '61',
      },
      referencePositions: ['PROTEIN SEQUENCE OF 672-701'],
      referenceComments: [{ value: 'Cerebrospinal fluid', type: 'TISSUE' }],
    },
    {
      citation: {
        id: '8248178',
        citationType: 'journal article',
        authors: [
          'Roher A.E.',
          'Lowenson J.D.',
          'Clarke S.',
          'Woods A.S.',
          'Cotter R.J.',
          'Gowing E.',
          'Ball M.J.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '8248178' },
          { database: 'DOI', id: '10.1073/pnas.90.22.10836' },
        ],
        title:
          'Beta-amyloid-(1-42) is a major component of cerebrovascular amyloid deposits: implications for the pathology of Alzheimer disease.',
        publicationDate: '1993',
        journal: 'Proc. Natl. Acad. Sci. U.S.A.',
        firstPage: '10836',
        lastPage: '10840',
        volume: '90',
      },
      referencePositions: ['PROTEIN SEQUENCE OF 672-713'],
      referenceComments: [{ value: 'Blood vessel', type: 'TISSUE' }],
    },
    {
      citation: {
        id: '8109908',
        citationType: 'journal article',
        authors: [
          'Wisniewski T.',
          'Lalowski M.',
          'Levy E.',
          'Marques M.R.F.',
          'Frangione B.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '8109908' },
          { database: 'DOI', id: '10.1002/ana.410350223' },
        ],
        title:
          "The amino acid sequence of neuritic plaque amyloid from a familial Alzheimer's disease patient.",
        publicationDate: '1994',
        journal: 'Ann. Neurol.',
        firstPage: '245',
        lastPage: '246',
        volume: '35',
      },
      referencePositions: ['PROTEIN SEQUENCE OF 672-701 AND 707-713'],
    },
    {
      citation: {
        id: '3810169',
        citationType: 'journal article',
        authors: [
          'Goldgaber D.',
          'Lerman M.I.',
          'McBride O.W.',
          'Saffiotti U.',
          'Gajdusek D.C.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '3810169' },
          { database: 'DOI', id: '10.1126/science.3810169' },
        ],
        title:
          "Characterization and chromosomal localization of a cDNA encoding brain amyloid of Alzheimer's disease.",
        publicationDate: '1987',
        journal: 'Science',
        firstPage: '877',
        lastPage: '880',
        volume: '235',
      },
      referencePositions: ['NUCLEOTIDE SEQUENCE [MRNA] OF 674-770'],
      referenceComments: [{ value: 'Brain', type: 'TISSUE' }],
    },
    {
      citation: {
        id: '2949367',
        citationType: 'journal article',
        authors: [
          'Tanzi R.E.',
          'Gusella J.F.',
          'Watkins P.C.',
          'Bruns G.A.',
          'St George-Hyslop P.H.',
          'Van Keuren M.L.',
          'Patterson D.',
          'Pagan S.',
          'Kurnit D.M.',
          'Neve R.L.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '2949367' },
          { database: 'DOI', id: '10.1126/science.2949367' },
        ],
        title:
          'Amyloid beta protein gene: cDNA, mRNA distribution, and genetic linkage near the Alzheimer locus.',
        publicationDate: '1987',
        journal: 'Science',
        firstPage: '880',
        lastPage: '884',
        volume: '235',
      },
      referencePositions: ['NUCLEOTIDE SEQUENCE [MRNA] OF 674-703'],
      referenceComments: [{ value: 'Fetal brain', type: 'TISSUE' }],
    },
    {
      citation: {
        id: '22576872',
        citationType: 'journal article',
        authors: [
          'Brinkmalm G.',
          'Portelius E.',
          'Ohrfelt A.',
          'Mattsson N.',
          'Persson R.',
          'Gustavsson M.K.',
          'Vite C.H.',
          'Gobom J.',
          'Mansson J.E.',
          'Nilsson J.',
          'Halim A.',
          'Larson G.',
          'Ruetschi U.',
          'Zetterberg H.',
          'Blennow K.',
          'Brinkmalm A.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '22576872' },
          { database: 'DOI', id: '10.1002/jms.2987' },
        ],
        title:
          'An online nano-LC-ESI-FTICR-MS method for comprehensive characterization of endogenous fragments from amyloid beta and amyloid precursor protein in human and cat cerebrospinal fluid.',
        publicationDate: '2012',
        journal: 'J. Mass Spectrom.',
        firstPage: '591',
        lastPage: '603',
        volume: '47',
      },
      referencePositions: [
        'PROTEIN SEQUENCE OF 609-713',
        'GLYCOSYLATION AT THR-633; THR-651; THR-652; THR-659; THR-663; SER-667 AND TYR-681',
      ],
      referenceComments: [{ value: 'Cerebrospinal fluid', type: 'TISSUE' }],
    },
    {
      citation: {
        id: '16816112',
        citationType: 'journal article',
        authors: ['Sun X.', 'He G.', 'Song W.'],
        citationCrossReferences: [
          { database: 'PubMed', id: '16816112' },
          { database: 'DOI', id: '10.1096/fj.05-5632com' },
        ],
        title:
          "BACE2, as a novel APP theta-secretase, is not responsible for the pathogenesis of Alzheimer's disease in Down syndrome.",
        publicationDate: '2006',
        journal: 'FASEB J.',
        firstPage: '1369',
        lastPage: '1376',
        volume: '20',
      },
      referencePositions: [
        'PROTEIN SEQUENCE OF 691-698',
        'PROTEOLYTIC CLEAVAGE AT PHE-690 BY THETA-SECRETASE',
      ],
    },
    {
      citation: {
        id: '2569763',
        citationType: 'journal article',
        authors: ['de Sauvage F.', 'Octave J.-N.'],
        citationCrossReferences: [
          { database: 'PubMed', id: '2569763' },
          { database: 'DOI', id: '10.1126/science.2569763' },
        ],
        title:
          'A novel mRNA of the A4 amyloid precursor gene coding for a possibly secreted protein.',
        publicationDate: '1989',
        journal: 'Science',
        firstPage: '651',
        lastPage: '653',
        volume: '245',
      },
      referencePositions: [
        'PARTIAL NUCLEOTIDE SEQUENCE [MRNA] (ISOFORM APP751)',
      ],
      referenceComments: [{ value: 'Brain', type: 'TISSUE' }],
    },
    {
      citation: {
        id: '3035574',
        citationType: 'journal article',
        authors: [
          'Robakis N.K.',
          'Ramakrishna N.',
          'Wolfe G.',
          'Wisniewski H.M.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '3035574' },
          { database: 'DOI', id: '10.1073/pnas.84.12.4190' },
        ],
        title:
          'Molecular cloning and characterization of a cDNA encoding the cerebrovascular and the neuritic plaque amyloid peptides.',
        publicationDate: '1987',
        journal: 'Proc. Natl. Acad. Sci. U.S.A.',
        firstPage: '4190',
        lastPage: '4194',
        volume: '84',
      },
      referencePositions: [
        'PARTIAL NUCLEOTIDE SEQUENCE [MRNA] (ISOFORM APP695)',
      ],
      referenceComments: [{ value: 'Brain', type: 'TISSUE' }],
    },
    {
      citation: {
        id: '2900137',
        citationType: 'journal article',
        authors: [
          'Dyrks T.',
          'Weidemann A.',
          'Multhaup G.',
          'Salbaum J.M.',
          'Lemaire H.-G.',
          'Kang J.',
          'Mueller-Hill B.',
          'Masters C.L.',
          'Beyreuther K.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '2900137' },
          { database: 'DOI', id: '10.1002/j.1460-2075.1988.tb02900.x' },
        ],
        title:
          "Identification, transmembrane orientation and biogenesis of the amyloid A4 precursor of Alzheimer's disease.",
        publicationDate: '1988',
        journal: 'EMBO J.',
        firstPage: '949',
        lastPage: '957',
        volume: '7',
      },
      referencePositions: [
        'SUBCELLULAR LOCATION',
        'SIGNAL SEQUENCE CLEAVAGE SITE',
        'TOPOLOGY',
      ],
    },
    {
      citation: {
        id: '2649245',
        citationType: 'journal article',
        authors: [
          'Weidemann A.',
          'Koenig G.',
          'Bunke D.',
          'Fischer P.',
          'Salbaum J.M.',
          'Masters C.L.',
          'Beyreuther K.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '2649245' },
          { database: 'DOI', id: '10.1016/0092-8674(89)90177-3' },
        ],
        title:
          "Identification, biogenesis, and localization of precursors of Alzheimer's disease A4 amyloid protein.",
        publicationDate: '1989',
        journal: 'Cell',
        firstPage: '115',
        lastPage: '126',
        volume: '57',
      },
      referencePositions: [
        'SUBCELLULAR LOCATION',
        'TISSUE SPECIFICITY',
        'GLYCOSYLATION',
        'SULFATION',
        'OX-2 MOTIF',
      ],
    },
    {
      citation: {
        id: '2506449',
        citationType: 'journal article',
        authors: [
          'Oltersdorf T.',
          'Fritz L.C.',
          'Schenk D.B.',
          'Lieberburg I.',
          'Johnson-Wood K.L.',
          'Beattie E.C.',
          'Ward P.J.',
          'Blacher R.W.',
          'Dovey H.F.',
          'Sinha S.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '2506449' },
          { database: 'DOI', id: '10.1038/341144a0' },
        ],
        title:
          "The secreted form of the Alzheimer's amyloid precursor protein with the Kunitz domain is protease nexin-II.",
        publicationDate: '1989',
        journal: 'Nature',
        firstPage: '144',
        lastPage: '147',
        volume: '341',
      },
      referencePositions: ['IDENTITY OF APP WITH NEXIN-II'],
    },
    {
      citation: {
        id: '1969731',
        citationType: 'journal article',
        authors: [
          'Kido H.',
          'Fukutomi A.',
          'Schilling J.',
          'Wang Y.',
          'Cordell B.',
          'Katunuma N.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '1969731' },
          { database: 'DOI', id: '10.1016/0006-291x(90)92084-d' },
        ],
        title:
          "Protease-specificity of Kunitz inhibitor domain of Alzheimer's disease amyloid protein precursor.",
        publicationDate: '1990',
        journal: 'Biochem. Biophys. Res. Commun.',
        firstPage: '716',
        lastPage: '721',
        volume: '167',
      },
      referencePositions: ['PROTEASE-SPECIFICITY OF INHIBITOR DOMAIN'],
    },
    {
      citation: {
        id: '8344894',
        citationType: 'journal article',
        authors: [
          'Bush A.I.',
          'Multhaup G.',
          'Moir R.D.',
          'Williamson T.G.',
          'Small D.H.',
          'Rumble B.',
          'Pollwein P.',
          'Beyreuther K.',
          'Masters C.L.',
        ],
        citationCrossReferences: [{ database: 'PubMed', id: '8344894' }],
        title:
          "A novel zinc(II) binding site modulates the function of the beta A4 amyloid protein precursor of Alzheimer's disease.",
        publicationDate: '1993',
        journal: 'J. Biol. Chem.',
        firstPage: '16109',
        lastPage: '16112',
        volume: '268',
      },
      referencePositions: ['EXTRACELLULAR ZINC-BINDING DOMAIN'],
    },
    {
      citation: {
        id: '8446172',
        citationType: 'journal article',
        authors: [
          'Nishimoto I.',
          'Okamoto T.',
          'Matsuura Y.',
          'Takahashi S.',
          'Okamoto T.',
          'Murayama Y.',
          'Ogata E.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '8446172' },
          { database: 'DOI', id: '10.1038/362075a0' },
        ],
        title:
          'Alzheimer amyloid protein precursor complexes with brain GTP-binding protein G(o).',
        publicationDate: '1993',
        journal: 'Nature',
        firstPage: '75',
        lastPage: '79',
        volume: '362',
      },
      referencePositions: ['INTERACTION WITH G(O)'],
    },
    {
      citation: {
        id: '8131745',
        citationType: 'journal article',
        authors: [
          'Suzuki T.',
          'Oishi M.',
          'Marshak D.R.',
          'Czernik A.J.',
          'Nairn A.C.',
          'Greengard P.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '8131745' },
          { database: 'DOI', id: '10.1002/j.1460-2075.1994.tb06360.x' },
        ],
        title:
          'Cell cycle-dependent regulation of the phosphorylation and metabolism of the Alzheimer amyloid precursor protein.',
        publicationDate: '1994',
        journal: 'EMBO J.',
        firstPage: '1114',
        lastPage: '1122',
        volume: '13',
      },
      referencePositions: ['PHOSPHORYLATION AT THR-743'],
    },
    {
      citation: {
        id: '7913895',
        citationType: 'journal article',
        authors: ['Hesse L.', 'Beher D.', 'Masters C.L.', 'Multhaup G.'],
        citationCrossReferences: [
          { database: 'PubMed', id: '7913895' },
          { database: 'DOI', id: '10.1016/0014-5793(94)00658-x' },
        ],
        title: 'The beta A4 amyloid precursor protein binding to copper.',
        publicationDate: '1994',
        journal: 'FEBS Lett.',
        firstPage: '109',
        lastPage: '116',
        volume: '349',
      },
      referencePositions: [
        'EXTRACELLULAR COPPER-BINDING DOMAIN',
        'MUTAGENESIS OF HIS-137; MET-141; CYS-144; HIS-147 AND HIS-151',
      ],
    },
    {
      citation: {
        id: '8158260',
        citationType: 'journal article',
        authors: [
          'Small D.H.',
          'Nurcombe V.',
          'Reed G.',
          'Clarris H.',
          'Moir R.',
          'Beyreuther K.',
          'Masters C.L.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '8158260' },
          { database: 'DOI', id: '10.1523/jneurosci.14-04-02117.1994' },
        ],
        title:
          "A heparin-binding domain in the amyloid protein precursor of Alzheimer's disease is involved in the regulation of neurite outgrowth.",
        publicationDate: '1994',
        journal: 'J. Neurosci.',
        firstPage: '2117',
        lastPage: '2127',
        volume: '14',
      },
      referencePositions: [
        'N-TERMINAL HEPARIN-BINDING DOMAIN',
        'MUTAGENESIS OF 99-LYS--ARG-102',
      ],
    },
    {
      citation: {
        id: '7737970',
        citationType: 'journal article',
        authors: [
          'Pangalos M.N.',
          'Efthimiopoulos S.',
          'Shioi J.',
          'Robakis N.K.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '7737970' },
          { database: 'DOI', id: '10.1074/jbc.270.18.10388' },
        ],
        title:
          'The chondroitin sulfate attachment site of appican is formed by splicing out exon 15 of the amyloid precursor gene.',
        publicationDate: '1995',
        journal: 'J. Biol. Chem.',
        firstPage: '10388',
        lastPage: '10391',
        volume: '270',
      },
      referencePositions: [
        'CHARACTERIZATION OF L-APP733',
        'MUTAGENESIS OF SER-656',
      ],
    },
    {
      citation: {
        id: '8626687',
        citationType: 'journal article',
        authors: ['Chow N.', 'Korenberg J.R.', 'Chen X.-N.', 'Neve R.L.'],
        citationCrossReferences: [
          { database: 'PubMed', id: '8626687' },
          { database: 'DOI', id: '10.1074/jbc.271.19.11339' },
        ],
        title:
          'APP-BP1, a novel protein that binds to the carboxyl-terminal region of the amyloid precursor protein.',
        publicationDate: '1996',
        journal: 'J. Biol. Chem.',
        firstPage: '11339',
        lastPage: '11346',
        volume: '271',
      },
      referencePositions: ['INTERACTION WITH APP-BP1'],
    },
    {
      citation: {
        id: '8887653',
        citationType: 'journal article',
        authors: ['Borg J.-P.', 'Ooi J.', 'Levy E.', 'Margolis B.'],
        citationCrossReferences: [
          { database: 'PubMed', id: '8887653' },
          { database: 'DOI', id: '10.1128/mcb.16.11.6229' },
        ],
        title:
          'The phosphotyrosine interaction domains of X11 and FE65 bind to distinct sites on the YENPTY motif of amyloid precursor protein.',
        publicationDate: '1996',
        journal: 'Mol. Cell. Biol.',
        firstPage: '6229',
        lastPage: '6241',
        volume: '16',
      },
      referencePositions: [
        'INTERACTION WITH APBA1 AND APBB1',
        'MUTAGENESIS OF TYR-728; TYR-757; ASN-759 AND TYR-762',
      ],
    },
    {
      citation: {
        id: '8855266',
        citationType: 'journal article',
        authors: ['Guenette S.Y.', 'Chen J.', 'Jondro P.D.', 'Tanzi R.E.'],
        citationCrossReferences: [
          { database: 'PubMed', id: '8855266' },
          { database: 'DOI', id: '10.1073/pnas.93.20.10832' },
        ],
        title:
          'Association of a novel human FE65-like protein with the cytoplasmic domain of the amyloid-beta precursor protein.',
        publicationDate: '1996',
        journal: 'Proc. Natl. Acad. Sci. U.S.A.',
        firstPage: '10832',
        lastPage: '10837',
        volume: '93',
      },
      referencePositions: ['INTERACTION WITH APBB2'],
    },
    {
      citation: {
        id: '9168929',
        citationType: 'journal article',
        authors: ['Walter M.F.', 'Mason P.E.', 'Mason R.P.'],
        citationCrossReferences: [
          { database: 'PubMed', id: '9168929' },
          { database: 'DOI', id: '10.1006/bbrc.1997.6547' },
        ],
        title:
          "Alzheimer's disease amyloid beta peptide 25-35 inhibits lipid peroxidation as a result of its membrane interactions.",
        publicationDate: '1997',
        journal: 'Biochem. Biophys. Res. Commun.',
        firstPage: '760',
        lastPage: '764',
        volume: '233',
      },
      referencePositions: [
        'FUNCTION OF AMYLOID-BETA PEPTIDE AS LIPID PEROXIDATION INHIBITOR',
        'MUTAGENESIS OF MET-706',
      ],
    },
    {
      citation: {
        id: '9357988',
        citationType: 'journal article',
        authors: [
          'Mok S.S.',
          'Sberna G.',
          'Heffernan D.',
          'Cappai R.',
          'Galatis D.',
          'Clarris H.J.',
          'Sawyer W.H.',
          'Beyreuther K.',
          'Masters C.L.',
          'Small D.H.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '9357988' },
          { database: 'DOI', id: '10.1016/s0014-5793(97)01146-0' },
        ],
        title:
          "Expression and analysis of heparin-binding regions of the amyloid precursor protein of Alzheimer's disease.",
        publicationDate: '1997',
        journal: 'FEBS Lett.',
        firstPage: '303',
        lastPage: '307',
        volume: '415',
      },
      referencePositions: ['HEPARIN-BINDING DOMAINS'],
    },
    {
      citation: {
        id: '9338779',
        citationType: 'journal article',
        authors: [
          'Yan S.D.',
          'Fu J.',
          'Soto C.',
          'Chen X.',
          'Zhu H.',
          'Al-Mohanna F.',
          'Collinson K.',
          'Zhu A.',
          'Stern E.',
          'Saido T.',
          'Tohyama M.',
          'Ogawa S.',
          'Roher A.',
          'Stern D.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '9338779' },
          { database: 'DOI', id: '10.1038/39522' },
        ],
        title:
          "An intracellular protein that binds amyloid-beta peptide and mediates neurotoxicity in Alzheimer's disease.",
        publicationDate: '1997',
        journal: 'Nature',
        firstPage: '689',
        lastPage: '695',
        volume: '389',
      },
      referencePositions: ['INTERACTION OF AMYLOID-BETA PEPTIDE WITH HADH2'],
      referenceComments: [{ value: 'Brain', type: 'TISSUE' }],
    },
    {
      citation: {
        id: '9585534',
        citationType: 'journal article',
        authors: [
          'Multhaup G.',
          'Ruppert T.',
          'Schlicksupp A.',
          'Hesse L.',
          'Bill E.',
          'Pipkorn R.',
          'Masters C.L.',
          'Beyreuther K.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '9585534' },
          { database: 'DOI', id: '10.1021/bi980022m' },
        ],
        title:
          'Copper-binding amyloid precursor protein undergoes a site-specific fragmentation in the reduction of hydrogen peroxide.',
        publicationDate: '1998',
        journal: 'Biochemistry',
        firstPage: '7224',
        lastPage: '7230',
        volume: '37',
      },
      referencePositions: ['COPPER-BINDING', 'DISULFIDE BOND FORMATION'],
    },
    {
      citation: {
        id: '9843960',
        citationType: 'journal article',
        authors: ['Zheng P.', 'Eastman J.', 'Vande Pol S.', 'Pimplikar S.W.'],
        citationCrossReferences: [
          { database: 'PubMed', id: '9843960' },
          { database: 'DOI', id: '10.1073/pnas.95.25.14745' },
        ],
        title:
          'PAT1, a microtubule-interacting protein, recognizes the basolateral sorting signal of amyloid precursor protein.',
        publicationDate: '1998',
        journal: 'Proc. Natl. Acad. Sci. U.S.A.',
        firstPage: '14745',
        lastPage: '14750',
        volume: '95',
      },
      referencePositions: [
        'INTERACTION WITH APPBP2',
        'MUTAGENESIS OF TYR-728',
        'DOMAIN',
      ],
    },
    {
      citation: {
        id: '10413512',
        citationType: 'journal article',
        authors: ['Liu S.T.', 'Howlett G.', 'Barrow C.J.'],
        citationCrossReferences: [
          { database: 'PubMed', id: '10413512' },
          { database: 'DOI', id: '10.1021/bi990205o' },
        ],
        title:
          "Histidine-13 is a crucial residue in the zinc ion-induced aggregation of the A beta peptide of Alzheimer's disease.",
        publicationDate: '1999',
        journal: 'Biochemistry',
        firstPage: '9373',
        lastPage: '9378',
        volume: '38',
      },
      referencePositions: [
        'AMYLOID-BETA ZINC-BINDING',
        'MUTAGENESIS OF ARG-676; TYR-681 AND HIS-684',
      ],
    },
    {
      citation: {
        id: '10319819',
        citationType: 'journal article',
        authors: [
          'Gervais F.G.',
          'Xu D.',
          'Robertson G.S.',
          'Vaillancourt J.P.',
          'Zhu Y.',
          'Huang J.',
          'LeBlanc A.',
          'Smith D.',
          'Rigby M.',
          'Shearman M.S.',
          'Clarke E.E.',
          'Zheng H.',
          'van der Ploeg L.H.T.',
          'Ruffolo S.C.',
          'Thornberry N.A.',
          'Xanthoudakis S.',
          'Zamboni R.J.',
          'Roy S.',
          'Nicholson D.W.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '10319819' },
          { database: 'DOI', id: '10.1016/s0092-8674(00)80748-5' },
        ],
        title:
          "Involvement of caspases in proteolytic cleavage of Alzheimer's amyloid-beta precursor protein and amyloidogenic A beta peptide formation.",
        publicationDate: '1999',
        journal: 'Cell',
        firstPage: '395',
        lastPage: '406',
        volume: '97',
      },
      referencePositions: [
        'PROTEOLYTIC CLEAVAGE AT ASP-197; ASP-219 AND ASP-739 BY CASPASES',
        'MUTAGENESIS OF ASP-739',
      ],
    },
    {
      citation: {
        id: '10535332',
        citationType: 'journal article',
        authors: [
          'Varadarajan S.',
          'Yatin S.',
          'Kanski J.',
          'Jahanshahi F.',
          'Butterfield D.A.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '10535332' },
          { database: 'DOI', id: '10.1016/s0361-9230(99)00093-3' },
        ],
        title:
          'Methionine residue 35 is important in amyloid beta-peptide-associated free radical oxidative stress.',
        publicationDate: '1999',
        journal: 'Brain Res. Bull.',
        firstPage: '133',
        lastPage: '141',
        volume: '50',
      },
      referencePositions: [
        'IMPORTANCE OF MET-706 IN FREE RADICAL OXIDATIVE STRESS',
        'MUTAGENESIS OF MET-706',
      ],
    },
    {
      citation: {
        id: '10341243',
        citationType: 'journal article',
        authors: [
          'Ando K.',
          'Oishi M.',
          'Takeda S.',
          'Iijima K.',
          'Isohara T.',
          'Nairn A.C.',
          'Kirino Y.',
          'Greengard P.',
          'Suzuki T.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '10341243' },
          { database: 'DOI', id: '10.1523/jneurosci.19-11-04421.1999' },
        ],
        title:
          "Role of phosphorylation of Alzheimer's amyloid precursor protein during neuronal differentiation.",
        publicationDate: '1999',
        journal: 'J. Neurosci.',
        firstPage: '4421',
        lastPage: '4427',
        volume: '19',
      },
      referencePositions: [
        'SUBCELLULAR LOCATION',
        'PHOSPHORYLATION',
        'MUTAGENESIS OF THR-743',
      ],
    },
    {
      citation: {
        id: '9890987',
        citationType: 'journal article',
        authors: [
          'Tomita S.',
          'Ozaki T.',
          'Taru H.',
          'Oguchi S.',
          'Takeda S.',
          'Yagi Y.',
          'Sakiyama S.',
          'Kirino Y.',
          'Suzuki T.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '9890987' },
          { database: 'DOI', id: '10.1074/jbc.274.4.2243' },
        ],
        title:
          "Interaction of a neuron-specific protein containing PDZ domains with Alzheimer's amyloid precursor protein.",
        publicationDate: '1999',
        journal: 'J. Biol. Chem.',
        firstPage: '2243',
        lastPage: '2254',
        volume: '274',
      },
      referencePositions: ['INTERACTION WITH APBA2'],
    },
    {
      citation: {
        id: '10383380',
        citationType: 'journal article',
        authors: [
          'Perez R.G.',
          'Soriano S.',
          'Hayes J.D.',
          'Ostaszewski B.',
          'Xia W.',
          'Selkoe D.J.',
          'Chen X.',
          'Stokin G.B.',
          'Koo E.H.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '10383380' },
          { database: 'DOI', id: '10.1074/jbc.274.27.18851' },
        ],
        title:
          'Mutagenesis identifies new signals for beta-amyloid precursor protein endocytosis, turnover, and the generation of secreted fragments, including Abeta42.',
        publicationDate: '1999',
        journal: 'J. Biol. Chem.',
        firstPage: '18851',
        lastPage: '18856',
        volume: '274',
      },
      referencePositions: [
        'SUBCELLULAR LOCATION',
        'ENDOCYTOSIS SIGNAL',
        'MUTAGENESIS OF TYR-728; GLY-756; TYR-757; ASN-759; PRO-760 AND TYR-762',
      ],
    },
    {
      citation: {
        id: '10461923',
        citationType: 'journal article',
        authors: [
          'Ruiz F.H.',
          'Gonzalez M.',
          'Bodini M.',
          'Opazo C.',
          'Inestrosa N.C.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '10461923' },
          { database: 'DOI', id: '10.1046/j.1471-4159.1999.0731288.x' },
        ],
        title:
          'Cysteine 144 is a key residue in the copper reduction by the beta-amyloid precursor protein.',
        publicationDate: '1999',
        journal: 'J. Neurochem.',
        firstPage: '1288',
        lastPage: '1292',
        volume: '73',
      },
      referencePositions: [
        'IMPORTANCE OF CYS-144 IN COPPER REDUCTION',
        'MUTAGENESIS OF CYS-144 AND 147-HIS--HIS-149',
      ],
    },
    {
      citation: {
        id: '10656250',
        citationType: 'journal article',
        authors: [
          'Hussain I.',
          'Powell D.J.',
          'Howlett D.R.',
          'Tew D.G.',
          'Meek T.D.',
          'Chapman C.',
          'Gloger I.S.',
          'Murphy K.E.',
          'Southan C.D.',
          'Ryan D.M.',
          'Smith T.S.',
          'Simmons D.L.',
          'Walsh F.S.',
          'Dingwall C.',
          'Christie G.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '10656250' },
          { database: 'DOI', id: '10.1006/mcne.1999.0811' },
        ],
        title:
          'Identification of a novel aspartic proteinase (Asp 2) as beta-secretase.',
        publicationDate: '1999',
        journal: 'Mol. Cell. Neurosci.',
        firstPage: '419',
        lastPage: '427',
        volume: '14',
      },
      referencePositions: [
        'CLEAVAGE BY BACE1',
        'SUBCELLULAR LOCATION (SOLUBLE APP-BETA)',
        'CHARACTERIZATION OF VARIANT AD1 670-LYS-MET-671 DELINS ASN-LEU',
      ],
    },
    {
      citation: {
        id: '10816430',
        citationType: 'journal article',
        authors: [
          'Tokuda T.',
          'Calero M.',
          'Matsubara E.',
          'Vidal R.',
          'Kumar A.',
          'Permanne B.',
          'Zlokovic B.',
          'Smith J.D.',
          'Ladu M.J.',
          'Rostagno A.',
          'Frangione B.',
          'Ghiso J.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '10816430' },
          { database: 'DOI', id: '10.1042/bj3480359' },
        ],
        title:
          "Lipidation of apolipoprotein E influences its isoform-specific interaction with Alzheimer's amyloid beta peptides.",
        publicationDate: '2000',
        journal: 'Biochem. J.',
        firstPage: '359',
        lastPage: '365',
        volume: '348',
      },
      referencePositions: ['INTERACTION OF AMYLOID-BETA WITH APOE'],
    },
    {
      citation: {
        id: '10681545',
        citationType: 'journal article',
        authors: [
          'Wang H.-Y.',
          'Lee D.H.S.',
          "D'Andrea M.R.",
          'Peterson P.A.',
          'Shank R.P.',
          'Reitz A.B.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '10681545' },
          { database: 'DOI', id: '10.1074/jbc.275.8.5626' },
        ],
        title:
          "Beta-amyloid(1-42) binds to alpha7 nicotinic acetylcholine receptor with high affinity. Implications for Alzheimer's disease pathology.",
        publicationDate: '2000',
        journal: 'J. Biol. Chem.',
        firstPage: '5626',
        lastPage: '5632',
        volume: '275',
      },
      referencePositions: ['INTERACTION OF APP42-BETA WITH CHRNA7'],
    },
    {
      citation: {
        id: '12214090',
        citationType: 'journal article',
        authors: [
          'Passer B.',
          'Pellegrini L.',
          'Russo C.',
          'Siegel R.M.',
          'Lenardo M.J.',
          'Schettini G.',
          'Bachmann M.',
          'Tabaton M.',
          "D'Adamio L.",
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '12214090' },
          { database: 'DOI', id: '10.3233/jad-2000-23-408' },
        ],
        title:
          "Generation of an apoptotic intracellular peptide by gamma-secretase cleavage of Alzheimer's amyloid beta protein precursor.",
        publicationDate: '2000',
        journal: 'J. Alzheimers Dis.',
        firstPage: '289',
        lastPage: '301',
        volume: '2',
      },
      referencePositions: [
        'IDENTIFICATION OF GAMMA-CTFS BY MASS SPECTROMETRY',
        'MUTAGENESIS OF ASP-739',
        'PROTEOLYTIC CLEAVAGE',
      ],
    },
    {
      citation: {
        id: '11775062',
        citationType: 'journal article',
        authors: ['Kontush A.'],
        citationCrossReferences: [
          { database: 'PubMed', id: '11775062' },
          { database: 'DOI', id: '10.1023/a:1012629603390' },
        ],
        title:
          "Alzheimer's amyloid-beta as a preventive antioxidant for brain lipoproteins.",
        publicationDate: '2001',
        journal: 'Cell. Mol. Neurobiol.',
        firstPage: '299',
        lastPage: '315',
        volume: '21',
      },
      referencePositions: ['REVIEW ON FUNCTION OF AMYLOID-BETA AS ANTIOXIDANT'],
    },
    {
      citation: {
        id: '11689470',
        citationType: 'journal article',
        authors: [
          'Yazawa H.',
          'Yu Z.-X.',
          'Takeda K.',
          'Le Y.',
          'Gong W.',
          'Ferrans V.J.',
          'Oppenheim J.J.',
          'Li C.C.H.',
          'Wang J.M.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '11689470' },
          { database: 'DOI', id: '10.1096/fj.01-0251com' },
        ],
        title:
          'Beta amyloid peptide (Abeta42) is internalized via the G-protein-coupled receptor FPRL1 and forms fibrillar aggregates in macrophages.',
        publicationDate: '2001',
        journal: 'FASEB J.',
        firstPage: '2454',
        lastPage: '2462',
        volume: '15',
      },
      referencePositions: [
        'INTERACTION WITH FPR2 (AMYLOID-BETA PROTEIN 42)',
        'SUBCELLULAR LOCATION (AMYLOID-BETA PROTEIN 42)',
      ],
    },
    {
      citation: {
        id: '11278849',
        citationType: 'journal article',
        authors: [
          'Kajkowski E.M.',
          'Lo C.F.',
          'Ning X.',
          'Walker S.',
          'Sofia H.J.',
          'Wang W.',
          'Edris W.',
          'Chanda P.',
          'Wagner E.',
          'Vile S.',
          'Ryan K.',
          'McHendry-Rinde B.',
          'Smith S.C.',
          'Wood A.',
          'Rhodes K.J.',
          'Kennedy J.D.',
          'Bard J.',
          'Jacobsen J.S.',
          'Ozenberger B.A.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '11278849' },
          { database: 'DOI', id: '10.1074/jbc.m011161200' },
        ],
        title:
          'Beta-amyloid peptide-induced apoptosis regulated by a novel protein containing a G protein activation module.',
        publicationDate: '2001',
        journal: 'J. Biol. Chem.',
        firstPage: '18748',
        lastPage: '18756',
        volume: '276',
      },
      referencePositions: ['INTERACTION WITH BBP'],
    },
    {
      citation: {
        id: '11274207',
        citationType: 'journal article',
        authors: [
          'Curtain C.C.',
          'Ali F.',
          'Volitakis I.',
          'Cherny R.A.',
          'Norton R.S.',
          'Beyreuther K.',
          'Barrow C.J.',
          'Masters C.L.',
          'Bush A.I.',
          'Barnham K.J.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '11274207' },
          { database: 'DOI', id: '10.1074/jbc.m100175200' },
        ],
        title:
          "Alzheimer's disease amyloid-beta binds copper and zinc to generate an allosterically ordered structure containing superoxide dismutase-like subunits.",
        publicationDate: '2001',
        journal: 'J. Biol. Chem.',
        firstPage: '20466',
        lastPage: '20473',
        volume: '276',
      },
      referencePositions: ['AMYLOID-BETA COPPER AND ZINC-BINDING SITES'],
    },
    {
      citation: {
        id: '11438549',
        citationType: 'journal article',
        authors: [
          'Scheuermann S.',
          'Hambsch B.',
          'Hesse L.',
          'Stumm J.',
          'Schmidt C.',
          'Beher D.',
          'Bayer T.A.',
          'Beyreuther K.',
          'Multhaup G.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '11438549' },
          { database: 'DOI', id: '10.1074/jbc.m105410200' },
        ],
        title:
          "Homodimerization of amyloid precursor protein and its implication in the amyloidogenic pathway of Alzheimer's disease.",
        publicationDate: '2001',
        journal: 'J. Biol. Chem.',
        firstPage: '33923',
        lastPage: '33929',
        volume: '276',
      },
      referencePositions: ['SUBUNIT'],
    },
    {
      citation: {
        id: '11544248',
        citationType: 'journal article',
        authors: [
          'Kimberly W.T.',
          'Zheng J.B.',
          'Guenette S.Y.',
          'Selkoe D.J.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '11544248' },
          { database: 'DOI', id: '10.1074/jbc.c100447200' },
        ],
        title:
          'The intracellular domain of the beta-amyloid precursor protein is stabilized by Fe65 and translocates to the nucleus in a notch-like manner.',
        publicationDate: '2001',
        journal: 'J. Biol. Chem.',
        firstPage: '40288',
        lastPage: '40292',
        volume: '276',
      },
      referencePositions: [
        'INTERACTION WITH APBB1',
        'FUNCTION',
        'SUBCELLULAR LOCATION (GAMMA-SECRETASE C-TERMINAL FRAGMENT 59)',
      ],
    },
    {
      citation: {
        id: '11238726',
        citationType: 'journal article',
        authors: ['Ohsawa I.', 'Takamura C.', 'Kohsaka S.'],
        citationCrossReferences: [
          { database: 'PubMed', id: '11238726' },
          { database: 'DOI', id: '10.1046/j.1471-4159.2001.00144.x' },
        ],
        title:
          'Fibulin-1 binds the amino-terminal head of beta-amyloid precursor protein and modulates its physiological function.',
        publicationDate: '2001',
        journal: 'J. Neurochem.',
        firstPage: '1411',
        lastPage: '1420',
        volume: '76',
      },
      referencePositions: ['INTERACTION WITH FBLN1'],
    },
    {
      citation: {
        id: '11943163',
        citationType: 'journal article',
        authors: [
          'Rank K.B.',
          'Pauley A.M.',
          'Bhattacharya K.',
          'Wang Z.',
          'Evans D.B.',
          'Fleck T.J.',
          'Johnston J.A.',
          'Sharma S.K.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '11943163' },
          { database: 'DOI', id: '10.1016/s0014-5793(02)02376-1' },
        ],
        title:
          'Direct interaction of soluble human recombinant tau protein with Abeta 1-42 results in tau aggregation and hyperphosphorylation by tau protein kinase II.',
        publicationDate: '2002',
        journal: 'FEBS Lett.',
        firstPage: '263',
        lastPage: '268',
        volume: '514',
      },
      referencePositions: ['INTERACTION WITH MAPT', 'FUNCTION'],
    },
    {
      citation: {
        id: '11724784',
        citationType: 'journal article',
        authors: [
          'Scheinfeld M.H.',
          'Roncarati R.',
          'Vito P.',
          'Lopez P.A.',
          'Abdallah M.',
          "D'Adamio L.",
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '11724784' },
          { database: 'DOI', id: '10.1074/jbc.m108357200' },
        ],
        title:
          "Jun NH2-terminal kinase (JNK) interacting protein 1 (JIP1) binds the cytoplasmic domain of the Alzheimer's beta-amyloid precursor protein (APP).",
        publicationDate: '2002',
        journal: 'J. Biol. Chem.',
        firstPage: '3767',
        lastPage: '3775',
        volume: '277',
      },
      referencePositions: [
        'INTERACTION WITH MAPK8IP1',
        'MUTAGENESIS OF TYR-757',
      ],
    },
    {
      citation: {
        id: '11784781',
        citationType: 'journal article',
        authors: [
          'White A.R.',
          'Multhaup G.',
          'Galatis D.',
          'McKinstry W.J.',
          'Parker M.W.',
          'Pipkorn R.',
          'Beyreuther K.',
          'Masters C.L.',
          'Cappai R.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '11784781' },
          { database: 'DOI', id: '10.1523/jneurosci.22-02-00365.2002' },
        ],
        title:
          "Contrasting species-dependent modulation of copper-mediated neurotoxicity by the Alzheimer's disease amyloid precursor protein.",
        publicationDate: '2002',
        journal: 'J. Neurosci.',
        firstPage: '365',
        lastPage: '376',
        volume: '22',
      },
      referencePositions: [
        'COPPER-MEDIATED LIPID PEROXIDATION',
        'MUTAGENESIS OF HIS-147 AND HIS-151',
      ],
    },
    {
      citation: {
        id: '12032279',
        citationType: 'journal article',
        authors: ['Bush A.I.', 'Tanzi R.E.'],
        citationCrossReferences: [
          { database: 'PubMed', id: '12032279' },
          { database: 'DOI', id: '10.1073/pnas.122249699' },
        ],
        title: "The galvanization of beta-amyloid in Alzheimer's disease.",
        publicationDate: '2002',
        journal: 'Proc. Natl. Acad. Sci. U.S.A.',
        firstPage: '7317',
        lastPage: '7319',
        volume: '99',
      },
      referencePositions: ['REVIEW ON ZINC-BINDING'],
    },
    {
      citation: {
        id: '8999878',
        citationType: 'journal article',
        authors: [
          'Walter J.',
          'Capell A.',
          'Hung A.Y.',
          'Langen H.',
          'Schnoelzer M.',
          'Thinakaran G.',
          'Sisodia S.S.',
          'Selkoe D.J.',
          'Haass C.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '8999878' },
          { database: 'DOI', id: '10.1074/jbc.272.3.1896' },
        ],
        title:
          'Ectodomain phosphorylation of beta-amyloid precursor protein at two distinct cellular locations.',
        publicationDate: '1997',
        journal: 'J. Biol. Chem.',
        firstPage: '1896',
        lastPage: '1903',
        volume: '272',
      },
      referencePositions: [
        'PHOSPHORYLATION AT SER-198 AND SER-206 BY CASEIN KINASES',
        'MUTAGENESIS OF SER-198 AND SER-206',
      ],
    },
    {
      citation: {
        id: '10806211',
        citationType: 'journal article',
        authors: ['Walter J.', 'Schindzielorz A.', 'Hartung B.', 'Haass C.'],
        citationCrossReferences: [
          { database: 'PubMed', id: '10806211' },
          { database: 'DOI', id: '10.1074/jbc.m002850200' },
        ],
        title:
          'Phosphorylation of the beta-amyloid precursor protein at the cell surface by ectocasein kinases 1 and 2.',
        publicationDate: '2000',
        journal: 'J. Biol. Chem.',
        firstPage: '23523',
        lastPage: '23529',
        volume: '275',
      },
      referencePositions: [
        'CHARACTERIZATION OF CASEIN KINASE PHOSPHORYLATION',
        'MUTAGENESIS OF SER-198 AND SER-206',
      ],
    },
    {
      citation: {
        id: '10742146',
        citationType: 'journal article',
        authors: [
          'Lu D.C.',
          'Rabizadeh S.',
          'Chandra S.',
          'Shayya R.F.',
          'Ellerby L.M.',
          'Ye X.',
          'Salvesen G.S.',
          'Koo E.H.',
          'Bredesen D.E.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '10742146' },
          { database: 'DOI', id: '10.1038/74656' },
        ],
        title:
          'A second cytotoxic proteolytic peptide derived from amyloid beta-protein precursor.',
        publicationDate: '2000',
        journal: 'Nat. Med.',
        firstPage: '397',
        lastPage: '404',
        volume: '6',
      },
      referencePositions: [
        'PROTEOLYTIC CLEAVAGE BY CASPASES',
        'MUTAGENESIS OF ASP-739',
      ],
    },
    {
      citation: {
        id: '11517218',
        citationType: 'journal article',
        authors: [
          'Ando K.',
          'Iijima K.',
          'Elliott J.I.',
          'Kirino Y.',
          'Suzuki T.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '11517218' },
          { database: 'DOI', id: '10.1074/jbc.m104059200' },
        ],
        title:
          'Phosphorylation-dependent regulation of the interaction of amyloid precursor protein with Fe65 affects the production of beta-amyloid.',
        publicationDate: '2001',
        journal: 'J. Biol. Chem.',
        firstPage: '40353',
        lastPage: '40361',
        volume: '276',
      },
      referencePositions: [
        'PHOSPHORYLATION',
        'INTERACTION WITH APBB1',
        'MUTAGENESIS OF THR-743',
      ],
    },
    {
      citation: {
        id: '11146006',
        citationType: 'journal article',
        authors: [
          'Standen C.L.',
          'Brownlees J.',
          'Grierson A.J.',
          'Kesavapany S.',
          'Lau K.-F.',
          'McLoughlin D.M.',
          'Miller C.C.J.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '11146006' },
          { database: 'DOI', id: '10.1046/j.1471-4159.2001.00102.x' },
        ],
        title:
          "Phosphorylation of thr(668) in the cytoplasmic domain of the Alzheimer's disease amyloid precursor protein by stress-activated protein kinase 1b (Jun N-terminal kinase-3).",
        publicationDate: '2001',
        journal: 'J. Neurochem.',
        firstPage: '316',
        lastPage: '320',
        volume: '76',
      },
      referencePositions: [
        'PHOSPHORYLATION BY MAPK10',
        'MUTAGENESIS OF THR-743',
      ],
    },
    {
      citation: {
        id: '11851430',
        citationType: 'journal article',
        authors: [
          'Weidemann A.',
          'Eggert S.',
          'Reinhard F.B.M.',
          'Vogel M.',
          'Paliga K.',
          'Baier G.',
          'Masters C.L.',
          'Beyreuther K.',
          'Evin G.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '11851430' },
          { database: 'DOI', id: '10.1021/bi015794o' },
        ],
        title:
          'A novel epsilon-cleavage within the transmembrane domain of the Alzheimer amyloid precursor protein demonstrates homology with Notch processing.',
        publicationDate: '2002',
        journal: 'Biochemistry',
        firstPage: '2825',
        lastPage: '2835',
        volume: '41',
      },
      referencePositions: [
        'PROTEOLYTIC CLEAVAGE AT MET-671; LYS-687; VAL-711; ALA-713 AND LEU-720',
      ],
    },
    {
      citation: {
        id: '11877420',
        citationType: 'journal article',
        authors: [
          'Tarr P.E.',
          'Roncarati R.',
          'Pelicci G.',
          'Pelicci P.G.',
          "D'Adamio L.",
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '11877420' },
          { database: 'DOI', id: '10.1074/jbc.m110286200' },
        ],
        title:
          'Tyrosine phosphorylation of the beta-amyloid precursor protein cytoplasmic tail promotes interaction with Shc.',
        publicationDate: '2002',
        journal: 'J. Biol. Chem.',
        firstPage: '16798',
        lastPage: '16804',
        volume: '277',
      },
      referencePositions: [
        'PHOSPHORYLATION AT TYR-757',
        'INTERACTION WITH SHC1',
        'MUTAGENESIS OF THR-743 AND TYR-757',
      ],
    },
    {
      citation: {
        id: '12142279',
        citationType: 'journal article',
        authors: ['Annaert W.', 'De Strooper B.'],
        citationCrossReferences: [
          { database: 'PubMed', id: '12142279' },
          { database: 'DOI', id: '10.1146/annurev.cellbio.18.020402.142302' },
        ],
        title: "A cell biological perspective on Alzheimer's disease.",
        publicationDate: '2002',
        journal: 'Annu. Rev. Cell Dev. Biol.',
        firstPage: '25',
        lastPage: '51',
        volume: '18',
      },
      referencePositions: ['REVIEW'],
    },
    {
      citation: {
        id: '15084524',
        citationType: 'journal article',
        authors: [
          'Watanabe N.',
          'Araki W.',
          'Chui D.H.',
          'Makifuchi T.',
          'Ihara Y.',
          'Tabira T.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '15084524' },
          { database: 'DOI', id: '10.1096/fj.03-1040fje' },
        ],
        title:
          "Glypican-1 as an Abeta binding HSPG in the human brain: its localization in DIG domains and possible roles in the pathogenesis of Alzheimer's disease.",
        publicationDate: '2004',
        journal: 'FASEB J.',
        firstPage: '1013',
        lastPage: '1015',
        volume: '18',
      },
      referencePositions: [
        'SUBCELLULAR LOCATION',
        'ASSOCIATION OF AMYLOID FIBRILS WITH GCP1',
      ],
    },
    {
      citation: {
        id: '15347684',
        citationType: 'journal article',
        authors: ['Ghersi E.', 'Noviello C.', "D'Adamio L."],
        citationCrossReferences: [
          { database: 'PubMed', id: '15347684' },
          { database: 'DOI', id: '10.1074/jbc.m405329200' },
        ],
        title:
          'Amyloid-beta protein precursor (AbetaPP) intracellular domain-associated protein-1 proteins bind to AbetaPP and modulate its processing in an isoform-specific manner.',
        publicationDate: '2004',
        journal: 'J. Biol. Chem.',
        firstPage: '49105',
        lastPage: '49112',
        volume: '279',
      },
      referencePositions: ['INTERACTION WITH ANKS1B'],
    },
    {
      citation: {
        id: '16335952',
        citationType: 'journal article',
        authors: [
          'Liu T.',
          'Qian W.-J.',
          'Gritsenko M.A.',
          'Camp D.G. II',
          'Monroe M.E.',
          'Moore R.J.',
          'Smith R.D.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '16335952' },
          { database: 'DOI', id: '10.1021/pr0502065' },
        ],
        title:
          'Human plasma N-glycoproteome analysis by immunoaffinity subtraction, hydrazide chemistry, and mass spectrometry.',
        publicationDate: '2005',
        journal: 'J. Proteome Res.',
        firstPage: '2070',
        lastPage: '2080',
        volume: '4',
      },
      referencePositions: ['GLYCOSYLATION [LARGE SCALE ANALYSIS] AT ASN-542'],
      referenceComments: [{ value: 'Plasma', type: 'TISSUE' }],
    },
    {
      citation: {
        id: '16174740',
        citationType: 'journal article',
        authors: [
          'Andersen O.M.',
          'Reiche J.',
          'Schmidt V.',
          'Gotthardt M.',
          'Spoelgen R.',
          'Behlke J.',
          'von Arnim C.A.',
          'Breiderhoff T.',
          'Jansen P.',
          'Wu X.',
          'Bales K.R.',
          'Cappai R.',
          'Masters C.L.',
          'Gliemann J.',
          'Mufson E.J.',
          'Hyman B.T.',
          'Paul S.M.',
          'Nykjaer A.',
          'Willnow T.E.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '16174740' },
          { database: 'DOI', id: '10.1073/pnas.0503689102' },
        ],
        title:
          'Neuronal sorting protein-related receptor sorLA/LR11 regulates processing of the amyloid precursor protein.',
        publicationDate: '2005',
        journal: 'Proc. Natl. Acad. Sci. U.S.A.',
        firstPage: '13461',
        lastPage: '13466',
        volume: '102',
      },
      referencePositions: ['INTERACTION WITH SORL1', 'SUBCELLULAR LOCATION'],
    },
    {
      citation: {
        id: '16407538',
        citationType: 'journal article',
        authors: [
          'Spoelgen R.',
          'von Arnim C.A.',
          'Thomas A.V.',
          'Peltan I.D.',
          'Koker M.',
          'Deng A.',
          'Irizarry M.C.',
          'Andersen O.M.',
          'Willnow T.E.',
          'Hyman B.T.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '16407538' },
          { database: 'DOI', id: '10.1523/jneurosci.3882-05.2006' },
        ],
        title:
          'Interaction of the cytosolic domains of sorLA/LR11 with the amyloid precursor protein (APP) and beta-secretase beta-site APP-cleaving enzyme.',
        publicationDate: '2006',
        journal: 'J. Neurosci.',
        firstPage: '418',
        lastPage: '428',
        volume: '26',
      },
      referencePositions: [
        'INTERACTION WITH SORL1',
        'MUTAGENESIS OF 757-TYR--TYR-762',
      ],
    },
    {
      citation: {
        id: '17062754',
        citationType: 'journal article',
        authors: [
          'Satpute-Krishnan P.',
          'DeGiorgis J.A.',
          'Conley M.P.',
          'Jang M.',
          'Bearer E.L.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '17062754' },
          { database: 'DOI', id: '10.1073/pnas.0607527103' },
        ],
        title:
          'A peptide zipcode sufficient for anterograde transport within amyloid precursor protein.',
        publicationDate: '2006',
        journal: 'Proc. Natl. Acad. Sci. U.S.A.',
        firstPage: '16532',
        lastPage: '16537',
        volume: '103',
      },
      referencePositions: ['FUNCTION'],
    },
    {
      citation: {
        id: '17855360',
        citationType: 'journal article',
        authors: [
          'Schmidt V.',
          'Sporbert A.',
          'Rohe M.',
          'Reimer T.',
          'Rehm A.',
          'Andersen O.M.',
          'Willnow T.E.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '17855360' },
          { database: 'DOI', id: '10.1074/jbc.m705073200' },
        ],
        title:
          'SorLA/LR11 regulates processing of amyloid precursor protein via interaction with adaptors GGA and PACS-1.',
        publicationDate: '2007',
        journal: 'J. Biol. Chem.',
        firstPage: '32956',
        lastPage: '32964',
        volume: '282',
      },
      referencePositions: ['INTERACTION WITH SORL1'],
    },
    {
      citation: {
        id: '18468999',
        citationType: 'journal article',
        authors: ['Nakaya T.', 'Kawai T.', 'Suzuki T.'],
        citationCrossReferences: [
          { database: 'PubMed', id: '18468999' },
          { database: 'DOI', id: '10.1074/jbc.m801827200' },
        ],
        title:
          'Regulation of FE65 nuclear translocation and function by amyloid beta-protein precursor in osmotically stressed cells.',
        publicationDate: '2008',
        journal: 'J. Biol. Chem.',
        firstPage: '19119',
        lastPage: '19131',
        volume: '283',
      },
      referencePositions: ['INTERACTION WITH APBB1'],
    },
    {
      citation: {
        id: '19366692',
        citationType: 'journal article',
        authors: ['Matsuda S.', 'Matsuda Y.', "D'Adamio L."],
        citationCrossReferences: [
          { database: 'PubMed', id: '19366692' },
          { database: 'DOI', id: '10.1074/jbc.m109.006403' },
        ],
        title:
          'BRI3 inhibits amyloid precursor protein processing in a mechanistically distinct manner from its homologue dementia gene BRI2.',
        publicationDate: '2009',
        journal: 'J. Biol. Chem.',
        firstPage: '15815',
        lastPage: '15825',
        volume: '284',
      },
      referencePositions: ['INTERACTION WITH ITM2C'],
    },
    {
      citation: {
        id: '19225519',
        citationType: 'journal article',
        authors: [
          'Nikolaev A.',
          'McLaughlin T.',
          "O'Leary D.D.M.",
          'Tessier-Lavigne M.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '19225519' },
          { database: 'DOI', id: '10.1038/nature07767' },
        ],
        title:
          'APP binds DR6 to trigger axon pruning and neuron death via distinct caspases.',
        publicationDate: '2009',
        journal: 'Nature',
        firstPage: '981',
        lastPage: '989',
        volume: '457',
      },
      referencePositions: [
        'FUNCTION',
        'PROTEOLYTIC CLEAVAGE',
        'INTERACTION WITH TNFRSF21',
      ],
    },
    {
      citation: {
        id: '19901339',
        citationType: 'journal article',
        authors: [
          'Takuma K.',
          'Fang F.',
          'Zhang W.',
          'Yan S.',
          'Fukuzaki E.',
          'Du H.',
          'Sosunov A.',
          'McKhann G.',
          'Funatsu Y.',
          'Nakamichi N.',
          'Nagai T.',
          'Mizoguchi H.',
          'Ibi D.',
          'Hori O.',
          'Ogawa S.',
          'Stern D.M.',
          'Yamada K.',
          'Yan S.S.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '19901339' },
          { database: 'DOI', id: '10.1073/pnas.0905686106' },
        ],
        title:
          'RAGE-mediated signaling contributes to intraneuronal transport of amyloid-{beta} and neuronal dysfunction.',
        publicationDate: '2009',
        journal: 'Proc. Natl. Acad. Sci. U.S.A.',
        firstPage: '20021',
        lastPage: '20026',
        volume: '106',
      },
      referencePositions: ['FUNCTION', 'INTERACTION WITH AGER'],
    },
    {
      citation: {
        id: '20580937',
        citationType: 'journal article',
        authors: [
          'Cossec J.C.',
          'Simon A.',
          'Marquer C.',
          'Moldrich R.X.',
          'Leterrier C.',
          'Rossier J.',
          'Duyckaerts C.',
          'Lenkei Z.',
          'Potier M.C.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '20580937' },
          { database: 'DOI', id: '10.1016/j.bbalip.2010.05.010' },
        ],
        title:
          'Clathrin-dependent APP endocytosis and Abeta secretion are highly sensitive to the level of plasma membrane cholesterol.',
        publicationDate: '2010',
        journal: 'Biochim. Biophys. Acta',
        firstPage: '846',
        lastPage: '852',
        volume: '1801',
      },
      referencePositions: ['SUBCELLULAR LOCATION'],
    },
    {
      citation: {
        id: '20811458',
        citationType: 'journal article',
        authors: [
          'He G.',
          'Luo W.',
          'Li P.',
          'Remmers C.',
          'Netzer W.J.',
          'Hendrick J.',
          'Bettayeb K.',
          'Flajolet M.',
          'Gorelick F.',
          'Wennogle L.P.',
          'Greengard P.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '20811458' },
          { database: 'DOI', id: '10.1038/nature09325' },
        ],
        title:
          "Gamma-secretase activating protein is a therapeutic target for Alzheimer's disease.",
        publicationDate: '2010',
        journal: 'Nature',
        firstPage: '95',
        lastPage: '98',
        volume: '467',
      },
      referencePositions: ['INTERACTION WITH GSAP'],
    },
    {
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
          { database: 'PubMed', id: '21269460' },
          { database: 'DOI', id: '10.1186/1752-0509-5-17' },
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
      citation: {
        id: '21712440',
        citationType: 'journal article',
        authors: [
          'Halim A.',
          'Brinkmalm G.',
          'Ruetschi U.',
          'Westman-Brinkmalm A.',
          'Portelius E.',
          'Zetterberg H.',
          'Blennow K.',
          'Larson G.',
          'Nilsson J.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '21712440' },
          { database: 'DOI', id: '10.1073/pnas.1102664108' },
        ],
        title:
          'Site-specific characterization of threonine, serine, and tyrosine glycosylations of amyloid precursor protein/amyloid beta-peptides in human cerebrospinal fluid.',
        publicationDate: '2011',
        journal: 'Proc. Natl. Acad. Sci. U.S.A.',
        firstPage: '11848',
        lastPage: '11853',
        volume: '108',
      },
      referencePositions: [
        'GLYCOSYLATION AT THR-633; THR-651; THR-652; SER-656; THR-663 AND SER-667 PROTEOLYTIC PROCESSING',
        'STRUCTURE OF CARBOHYDRATES',
        'IDENTIFICATION BY MASS SPECTROMETRY',
      ],
    },
    {
      citation: {
        id: '23011729',
        citationType: 'journal article',
        authors: [
          'Seamster P.E.',
          'Loewenberg M.',
          'Pascal J.',
          'Chauviere A.',
          'Gonzales A.',
          'Cristini V.',
          'Bearer E.L.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '23011729' },
          { database: 'DOI', id: '10.1088/1478-3975/9/5/055005' },
        ],
        title:
          'Quantitative measurements and modeling of cargo-motor interactions during fast transport in the living axon.',
        publicationDate: '2012',
        journal: 'Phys. Biol.',
        firstPage: '055005',
        lastPage: '055005',
        volume: '9',
      },
      referencePositions: ['FUNCTION', 'INTERACTION WITH KIF5B'],
    },
    {
      citation: {
        id: '22457725',
        citationType: 'journal article',
        authors: ['Zhang C.', 'Liu Y.', 'Gilthorpe J.', 'van der Maarel J.R.'],
        citationCrossReferences: [
          { database: 'PubMed', id: '22457725' },
          { database: 'DOI', id: '10.1371/journal.pone.0032953' },
        ],
        title:
          'MRP14 (S100A9) protein interacts with Alzheimer beta-amyloid peptide and induces its fibrillization.',
        publicationDate: '2012',
        journal: 'PLoS ONE',
        firstPage: 'E32953',
        lastPage: 'E32953',
        volume: '7',
      },
      referencePositions: ['INTERACTION WITH S100A9'],
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
        'PHOSPHORYLATION [LARGE SCALE ANALYSIS] AT THR-743',
        'IDENTIFICATION BY MASS SPECTROMETRY [LARGE SCALE ANALYSIS]',
      ],
      referenceComments: [{ value: 'Liver', type: 'TISSUE' }],
    },
    {
      citation: {
        id: '24336208',
        citationType: 'journal article',
        authoringGroup: ['UK Brain Expression Consortium'],
        authors: [
          'Cruchaga C.',
          'Karch C.M.',
          'Jin S.C.',
          'Benitez B.A.',
          'Cai Y.',
          'Guerreiro R.',
          'Harari O.',
          'Norton J.',
          'Budde J.',
          'Bertelsen S.',
          'Jeng A.T.',
          'Cooper B.',
          'Skorupa T.',
          'Carrell D.',
          'Levitch D.',
          'Hsu S.',
          'Choi J.',
          'Ryten M.',
          'Hardy J.',
          'Ryten M.',
          'Trabzuni D.',
          'Weale M.E.',
          'Ramasamy A.',
          'Smith C.',
          'Sassi C.',
          'Bras J.',
          'Gibbs J.R.',
          'Hernandez D.G.',
          'Lupton M.K.',
          'Powell J.',
          'Forabosco P.',
          'Ridge P.G.',
          'Corcoran C.D.',
          'Tschanz J.T.',
          'Norton M.C.',
          'Munger R.G.',
          'Schmutz C.',
          'Leary M.',
          'Demirci F.Y.',
          'Bamne M.N.',
          'Wang X.',
          'Lopez O.L.',
          'Ganguli M.',
          'Medway C.',
          'Turton J.',
          'Lord J.',
          'Braae A.',
          'Barber I.',
          'Brown K.',
          'Passmore P.',
          'Craig D.',
          'Johnston J.',
          'McGuinness B.',
          'Todd S.',
          'Heun R.',
          'Kolsch H.',
          'Kehoe P.G.',
          'Hooper N.M.',
          'Vardy E.R.',
          'Mann D.M.',
          'Pickering-Brown S.',
          'Brown K.',
          'Kalsheker N.',
          'Lowe J.',
          'Morgan K.',
          'David Smith A.',
          'Wilcock G.',
          'Warden D.',
          'Holmes C.',
          'Pastor P.',
          'Lorenzo-Betancor O.',
          'Brkanac Z.',
          'Scott E.',
          'Topol E.',
          'Morgan K.',
          'Rogaeva E.',
          'Singleton A.B.',
          'Hardy J.',
          'Kamboh M.I.',
          'St George-Hyslop P.',
          'Cairns N.',
          'Morris J.C.',
          'Kauwe J.S.',
          'Goate A.M.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '24336208' },
          { database: 'DOI', id: '10.1038/nature12825' },
        ],
        title:
          "Rare coding variants in the phospholipase D3 gene confer risk for Alzheimer's disease.",
        publicationDate: '2014',
        journal: 'Nature',
        firstPage: '550',
        lastPage: '554',
        volume: '505',
      },
      referencePositions: ['INTERACTION WITH PLD3'],
    },
    {
      citation: {
        id: '25168729',
        citationType: 'journal article',
        authors: [
          'Fernandez-Echevarria C.',
          'Diaz M.',
          'Ferrer I.',
          'Canerina-Amaro A.',
          'Marin R.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '25168729' },
          { database: 'DOI', id: '10.1016/j.neuroscience.2014.07.079' },
        ],
        title:
          "Abeta promotes VDAC1 channel dephosphorylation in neuronal lipid rafts. Relevance to the mechanisms of neurotoxicity in Alzheimer's disease.",
        publicationDate: '2014',
        journal: 'Neuroscience',
        firstPage: '354',
        lastPage: '366',
        volume: '278',
      },
      referencePositions: ['INTERACTION WITH VDAC1'],
    },
    {
      citation: {
        id: '24523320',
        citationType: 'journal article',
        authors: [
          'Caglayan S.',
          'Takagi-Niidome S.',
          'Liao F.',
          'Carlo A.S.',
          'Schmidt V.',
          'Burgert T.',
          'Kitago Y.',
          'Fuechtbauer E.M.',
          'Fuechtbauer A.',
          'Holtzman D.M.',
          'Takagi J.',
          'Willnow T.E.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '24523320' },
          { database: 'DOI', id: '10.1126/scitranslmed.3007747' },
        ],
        title:
          "Lysosomal sorting of amyloid-beta by the SORLA receptor is impaired by a familial Alzheimer's disease mutation.",
        publicationDate: '2014',
        journal: 'Sci. Transl. Med.',
        firstPage: '223RA20',
        lastPage: '223RA20',
        volume: '6',
      },
      referencePositions: ['INTERACTION WITH SORL1'],
    },
    {
      citation: {
        id: '26091039',
        citationType: 'journal article',
        authors: [
          'Tagliabracci V.S.',
          'Wiley S.E.',
          'Guo X.',
          'Kinch L.N.',
          'Durrant E.',
          'Wen J.',
          'Xiao J.',
          'Cui J.',
          'Nguyen K.B.',
          'Engel J.L.',
          'Coon J.J.',
          'Grishin N.',
          'Pinna L.A.',
          'Pagliarini D.J.',
          'Dixon J.E.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '26091039' },
          { database: 'DOI', id: '10.1016/j.cell.2015.05.028' },
        ],
        title:
          'A single kinase generates the majority of the secreted phosphoproteome.',
        publicationDate: '2015',
        journal: 'Cell',
        firstPage: '1619',
        lastPage: '1632',
        volume: '161',
      },
      referencePositions: ['PHOSPHORYLATION AT SER-441 AND TYR-497'],
    },
    {
      citation: {
        id: '28720718',
        citationType: 'journal article',
        authors: [
          'Chen Z.C.',
          'Zhang W.',
          'Chua L.L.',
          'Chai C.',
          'Li R.',
          'Lin L.',
          'Cao Z.',
          'Angeles D.C.',
          'Stanton L.W.',
          'Peng J.H.',
          'Zhou Z.D.',
          'Lim K.L.',
          'Zeng L.',
          'Tan E.K.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '28720718' },
          { database: 'DOI', id: '10.1126/scisignal.aam6790' },
        ],
        title:
          "Phosphorylation of amyloid precursor protein by mutant LRRK2 promotes AICD activity and neurotoxicity in Parkinson's disease.",
        publicationDate: '2017',
        journal: 'Sci. Signal.',
        firstPage: '0',
        lastPage: '0',
        volume: '10',
      },
      referencePositions: [
        'INTERACTION WITH LRRK2',
        'PHOSPHORYLATION AT THR-743',
        'MUTAGENESIS OF THR-743',
      ],
    },
    {
      citation: {
        id: '2125487',
        citationType: 'journal article',
        authors: [
          'Hynes T.R.',
          'Randal M.',
          'Kennedy L.A.',
          'Eigenbrot C.',
          'Kossiakof A.A.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '2125487' },
          { database: 'DOI', id: '10.1021/bi00495a002' },
        ],
        title:
          "X-ray crystal structure of the protease inhibitor domain of Alzheimer's amyloid beta-protein precursor.",
        publicationDate: '1990',
        journal: 'Biochemistry',
        firstPage: '10018',
        lastPage: '10022',
        volume: '29',
      },
      referencePositions: ['X-RAY CRYSTALLOGRAPHY (1.5 ANGSTROMS) OF 287-344'],
    },
    {
      citation: {
        id: '1718421',
        citationType: 'journal article',
        authors: [
          'Heald S.L.',
          'Tilton R.F. Jr.',
          'Hammond L.S.',
          'Lee A.',
          'Bayney R.M.',
          'Kamarck M.E.',
          'Ramabhadran T.V.',
          'Dreyer R.N.',
          'Davis G.',
          'Unterbeck A.',
          'Tamburini P.P.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '1718421' },
          { database: 'DOI', id: '10.1021/bi00107a015' },
        ],
        title:
          "Sequential NMR resonance assignment and structure determination of the Kunitz-type inhibitor domain of the Alzheimer's beta-amyloid precursor protein.",
        publicationDate: '1991',
        journal: 'Biochemistry',
        firstPage: '10467',
        lastPage: '10478',
        volume: '30',
      },
      referencePositions: ['STRUCTURE BY NMR OF 289-344'],
    },
    {
      citation: {
        id: '7516706',
        citationType: 'journal article',
        authors: [
          'Talafous J.',
          'Marcinowski K.J.',
          'Klopman G.',
          'Zagorski M.G.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '7516706' },
          { database: 'DOI', id: '10.1021/bi00191a006' },
        ],
        title:
          'Solution structure of residues 1-28 of the amyloid beta-peptide.',
        publicationDate: '1994',
        journal: 'Biochemistry',
        firstPage: '7788',
        lastPage: '7796',
        volume: '33',
      },
      referencePositions: ['STRUCTURE BY NMR OF 672-699'],
    },
    {
      citation: {
        id: '7588758',
        citationType: 'journal article',
        authors: [
          'Sticht H.',
          'Bayer P.',
          'Willbold D.',
          'Dames S.',
          'Hilbich C.',
          'Beyreuther K.',
          'Frank R.W.',
          'Rosch P.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '7588758' },
          { database: 'DOI', id: '10.1111/j.1432-1033.1995.293_1.x' },
        ],
        title: "Structure of amyloid A4-(1-40)-peptide of Alzheimer's disease.",
        publicationDate: '1995',
        journal: 'Eur. J. Biochem.',
        firstPage: '293',
        lastPage: '298',
        volume: '233',
      },
      referencePositions: ['STRUCTURE BY NMR OF 672-711'],
    },
    {
      citation: {
        id: '8973180',
        citationType: 'journal article',
        authors: [
          'Kohno T.',
          'Kobayashi K.',
          'Maeda T.',
          'Sato K.',
          'Takashima A.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '8973180' },
          { database: 'DOI', id: '10.1021/bi961598j' },
        ],
        title:
          'Three-dimensional structures of the amyloid beta peptide (25-35) in membrane-mimicking environment.',
        publicationDate: '1996',
        journal: 'Biochemistry',
        firstPage: '16094',
        lastPage: '16104',
        volume: '35',
      },
      referencePositions: ['STRUCTURE BY NMR OF 696-706'],
    },
    {
      citation: {
        id: '9300481',
        citationType: 'journal article',
        authors: [
          'Scheidig A.J.',
          'Hynes T.R.',
          'Pelletier L.A.',
          'Wells J.A.',
          'Kossiakoff A.A.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '9300481' },
          { database: 'DOI', id: '10.1002/pro.5560060902' },
        ],
        title:
          "Crystal structures of bovine chymotrypsin and trypsin complexed to the inhibitor domain of Alzheimer's amyloid beta-protein precursor (APPI) and basic pancreatic trypsin inhibitor (BPTI): engineering of inhibitors with altered specificities.",
        publicationDate: '1997',
        journal: 'Protein Sci.',
        firstPage: '1806',
        lastPage: '1824',
        volume: '6',
      },
      referencePositions: [
        'X-RAY CRYSTALLOGRAPHY (1.8 ANGSTROMS) OF KUNITZ DOMAIN IN COMPLEX WITH CHYMOTRYPSIN; TRYPSIN AND BASIC PANCREATIC TRYPSIN INHIBITOR',
      ],
    },
    {
      citation: {
        id: '9693002',
        citationType: 'journal article',
        authors: [
          'Coles M.',
          'Bicknell W.',
          'Watson A.A.',
          'Fairlie D.P.',
          'Craik D.J.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '9693002' },
          { database: 'DOI', id: '10.1021/bi972979f' },
        ],
        title:
          'Solution structure of amyloid beta-peptide(1-40) in a water-micelle environment. Is the membrane-spanning domain where we think it is?',
        publicationDate: '1998',
        journal: 'Biochemistry',
        firstPage: '11064',
        lastPage: '11077',
        volume: '37',
      },
      referencePositions: ['STRUCTURE BY NMR OF 672-711'],
    },
    {
      citation: {
        id: '10201399',
        citationType: 'journal article',
        authors: [
          'Rossjohn J.',
          'Cappai R.',
          'Feil S.C.',
          'Henry A.',
          'McKinstry W.J.',
          'Galatis D.',
          'Hesse L.',
          'Multhaup G.',
          'Beyreuther K.',
          'Masters C.L.',
          'Parker M.W.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '10201399' },
          { database: 'DOI', id: '10.1038/7562' },
        ],
        title:
          'Crystal structure of the N-terminal, growth factor-like domain of Alzheimer amyloid precursor protein.',
        publicationDate: '1999',
        journal: 'Nat. Struct. Biol.',
        firstPage: '327',
        lastPage: '331',
        volume: '6',
      },
      referencePositions: ['X-RAY CRYSTALLOGRAPHY (1.8 ANGSTROMS) OF 28-123'],
    },
    {
      citation: {
        id: '10821838',
        citationType: 'journal article',
        authors: [
          'Miravalle L.',
          'Tokuda T.',
          'Chiarle R.',
          'Giaccone G.',
          'Bugiani O.',
          'Tagliavini F.',
          'Frangione B.',
          'Ghiso J.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '10821838' },
          { database: 'DOI', id: '10.1074/jbc.m003154200' },
        ],
        title:
          "Substitutions at codon 22 of Alzheimer's Abeta peptide induce diverse conformational changes and apoptotic effects in human cerebral endothelial cells.",
        publicationDate: '2000',
        journal: 'J. Biol. Chem.',
        firstPage: '27110',
        lastPage: '27116',
        volume: '275',
      },
      referencePositions: ['STRUCTURE OF CAA-APP VARIANTS'],
    },
    {
      citation: {
        id: '10940221',
        citationType: 'journal article',
        authors: [
          'Zhang S.',
          'Iwata K.',
          'Lachenmann M.J.',
          'Peng J.W.',
          'Li S.',
          'Stimson E.R.',
          'Lu Y.',
          'Felix A.M.',
          'Maggio J.E.',
          'Lee J.P.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '10940221' },
          { database: 'DOI', id: '10.1006/jsbi.2000.4288' },
        ],
        title:
          "The Alzheimer's peptide a beta adopts a collapsed coil structure in water.",
        publicationDate: '2000',
        journal: 'J. Struct. Biol.',
        firstPage: '130',
        lastPage: '141',
        volume: '130',
      },
      referencePositions: ['STRUCTURE BY NMR OF 681-706'],
    },
    {
      citation: {
        id: '10940222',
        citationType: 'journal article',
        authors: ['Poulsen S.-A.', 'Watson A.A.', 'Craik D.J.'],
        citationCrossReferences: [
          { database: 'PubMed', id: '10940222' },
          { database: 'DOI', id: '10.1006/jsbi.2000.4267' },
        ],
        title:
          'Solution structures in aqueous SDS micelles of two amyloid beta peptides of Abeta(1-28) mutated at the alpha-secretase cleavage site.',
        publicationDate: '2000',
        journal: 'J. Struct. Biol.',
        firstPage: '142',
        lastPage: '152',
        volume: '130',
      },
      referencePositions: ['STRUCTURE BY NMR OF 672-699'],
    },
    {
      citation: {
        id: '12611883',
        citationType: 'journal article',
        authors: [
          'Barnham K.J.',
          'McKinstry W.J.',
          'Multhaup G.',
          'Galatis D.',
          'Morton C.J.',
          'Curtain C.C.',
          'Williamson N.A.',
          'White A.R.',
          'Hinds M.G.',
          'Norton R.S.',
          'Beyreuther K.',
          'Masters C.L.',
          'Parker M.W.',
          'Cappai R.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '12611883' },
          { database: 'DOI', id: '10.1074/jbc.m300629200' },
        ],
        title:
          "Structure of the Alzheimer's disease amyloid precursor protein copper binding domain. A regulator of neuronal copper homeostasis.",
        publicationDate: '2003',
        journal: 'J. Biol. Chem.',
        firstPage: '17401',
        lastPage: '17407',
        volume: '278',
      },
      referencePositions: [
        'STRUCTURE BY NMR OF 124-189',
        'DISULFIDE BONDS',
        'COPPER-BINDING SITES',
      ],
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '1OWT' }],
    },
    {
      citation: {
        id: '15304215',
        citationType: 'journal article',
        authors: ['Wang Y.', 'Ha Y.'],
        citationCrossReferences: [
          { database: 'PubMed', id: '15304215' },
          { database: 'DOI', id: '10.1016/j.molcel.2004.06.037' },
        ],
        title:
          'The X-ray structure of an antiparallel dimer of the human amyloid precursor protein E2 domain.',
        publicationDate: '2004',
        journal: 'Mol. Cell',
        firstPage: '343',
        lastPage: '353',
        volume: '15',
      },
      referencePositions: [
        'X-RAY CRYSTALLOGRAPHY (2.8 ANGSTROMS) OF 346-551',
        'PARTIAL PROTEIN SEQUENCE',
        'MUTAGENESIS OF ARG-499 AND LYS-503',
        'IDENTIFICATION BY MASS SPECTROMETRY',
      ],
    },
    {
      citation: {
        id: '17051221',
        citationType: 'journal article',
        authors: ['Shen Y.', 'Joachimiak A.', 'Rosner M.R.', 'Tang W.-J.'],
        citationCrossReferences: [
          { database: 'PubMed', id: '17051221' },
          { database: 'DOI', id: '10.1038/nature05143' },
        ],
        title:
          'Structures of human insulin-degrading enzyme reveal a new substrate recognition mechanism.',
        publicationDate: '2006',
        journal: 'Nature',
        firstPage: '870',
        lastPage: '874',
        volume: '443',
      },
      referencePositions: [
        'X-RAY CRYSTALLOGRAPHY (2.1 ANGSTROMS) OF 672-711 IN COMPLEX WITH IDE',
      ],
    },
    {
      citation: {
        id: '17909280',
        citationType: 'journal article',
        authors: ['Kong G.K.', 'Adams J.J.', 'Cappai R.', 'Parker M.W.'],
        citationCrossReferences: [
          { database: 'PubMed', id: '17909280' },
          { database: 'DOI', id: '10.1107/s1744309107041139' },
        ],
        title:
          "Structure of Alzheimer's disease amyloid precursor protein copper-binding domain at atomic resolution.",
        publicationDate: '2007',
        journal: 'Acta Crystallogr. F',
        firstPage: '819',
        lastPage: '824',
        volume: '63',
      },
      referencePositions: [
        'X-RAY CRYSTALLOGRAPHY (0.85 ANGSTROMS) OF 133-189',
        'DISULFIDE BONDS',
      ],
    },
    {
      citation: {
        id: '17239395',
        citationType: 'journal article',
        authors: [
          'Kong G.K.',
          'Adams J.J.',
          'Harris H.H.',
          'Boas J.F.',
          'Curtain C.C.',
          'Galatis D.',
          'Masters C.L.',
          'Barnham K.J.',
          'McKinstry W.J.',
          'Cappai R.',
          'Parker M.W.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '17239395' },
          { database: 'DOI', id: '10.1016/j.jmb.2006.12.041' },
        ],
        title:
          "Structural studies of the Alzheimer's amyloid precursor protein copper-binding domain reveal how it binds copper ions.",
        publicationDate: '2007',
        journal: 'J. Mol. Biol.',
        firstPage: '148',
        lastPage: '161',
        volume: '367',
      },
      referencePositions: [
        'X-RAY CRYSTALLOGRAPHY (1.6 ANGSTROMS) OF 133-189 IN COMPLEXES WITH COPPER IONS',
        'DISULFIDE BONDS',
      ],
      evidences: [
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '2FJZ' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '2FK1' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '2FK2' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '2FK3' },
        { evidenceCode: 'ECO:0007744', source: 'PDB', id: '2FKL' },
      ],
    },
    {
      citation: {
        id: '17895381',
        citationType: 'journal article',
        authors: [
          'Gardberg A.S.',
          'Dice L.T.',
          'Ou S.',
          'Rich R.L.',
          'Helmbrecht E.',
          'Ko J.',
          'Wetzel R.',
          'Myszka D.G.',
          'Patterson P.H.',
          'Dealwis C.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '17895381' },
          { database: 'DOI', id: '10.1073/pnas.0705888104' },
        ],
        title:
          "Molecular basis for passive immunotherapy of Alzheimer's disease.",
        publicationDate: '2007',
        journal: 'Proc. Natl. Acad. Sci. U.S.A.',
        firstPage: '15659',
        lastPage: '15664',
        volume: '104',
      },
      referencePositions: [
        'X-RAY CRYSTALLOGRAPHY (1.65 ANGSTROMS) OF 672-679 IN COMPLEX WITH IGG',
      ],
    },
    {
      citation: {
        id: '19923222',
        citationType: 'journal article',
        authors: [
          'Basi G.S.',
          'Feinberg H.',
          'Oshidari F.',
          'Anderson J.',
          'Barbour R.',
          'Baker J.',
          'Comery T.A.',
          'Diep L.',
          'Gill D.',
          'Johnson-Wood K.',
          'Goel A.',
          'Grantcharova K.',
          'Lee M.',
          'Li J.',
          'Partridge A.',
          'Griswold-Prenner I.',
          'Piot N.',
          'Walker D.',
          'Widom A.',
          'Pangalos M.N.',
          'Seubert P.',
          'Jacobsen J.S.',
          'Schenk D.',
          'Weis W.I.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '19923222' },
          { database: 'DOI', id: '10.1074/jbc.m109.045187' },
        ],
        title:
          'Structural correlates of antibodies associated with acute reversal of amyloid beta-related behavioral deficits in a mouse model of Alzheimer disease.',
        publicationDate: '2010',
        journal: 'J. Biol. Chem.',
        firstPage: '3417',
        lastPage: '3427',
        volume: '285',
      },
      referencePositions: [
        'X-RAY CRYSTALLOGRAPHY (2.15 ANGSTROMS) OF 672-678 IN COMPLEXES WITH ANTIBODY FAB FRAGMENTS',
      ],
    },
    {
      citation: {
        id: '20212142',
        citationType: 'journal article',
        authors: [
          'Dahms S.O.',
          'Hoefgen S.',
          'Roeser D.',
          'Schlott B.',
          'Guhrs K.H.',
          'Than M.E.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '20212142' },
          { database: 'DOI', id: '10.1073/pnas.0911326107' },
        ],
        title:
          'Structure and biochemical analysis of the heparin-induced E1 dimer of the amyloid precursor protein.',
        publicationDate: '2010',
        journal: 'Proc. Natl. Acad. Sci. U.S.A.',
        firstPage: '5381',
        lastPage: '5386',
        volume: '107',
      },
      referencePositions: [
        'X-RAY CRYSTALLOGRAPHY (2.7 ANGSTROMS) OF 18-190',
        'PARTIAL PROTEIN SEQUENCE',
        'SUBUNIT',
        'DISULFIDE BONDS',
        'IDENTIFICATION BY MASS SPECTROMETRY',
      ],
    },
    {
      citation: {
        id: '22584060',
        citationType: 'journal article',
        authors: [
          'Nadezhdin K.D.',
          'Bocharova O.V.',
          'Bocharov E.V.',
          'Arseniev A.S.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '22584060' },
          { database: 'DOI', id: '10.1016/j.febslet.2012.04.062' },
        ],
        title:
          'Dimeric structure of transmembrane domain of amyloid precursor protein in micellar environment.',
        publicationDate: '2012',
        journal: 'FEBS Lett.',
        firstPage: '1687',
        lastPage: '1692',
        volume: '586',
      },
      referencePositions: [
        'STRUCTURE BY NMR OF 686-726',
        'SUBCELLULAR LOCATION',
      ],
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '2LOH' }],
    },
    {
      citation: {
        id: '22654059',
        citationType: 'journal article',
        authors: [
          'Barrett P.J.',
          'Song Y.',
          'Van Horn W.D.',
          'Hustedt E.J.',
          'Schafer J.M.',
          'Hadziselimovic A.',
          'Beel A.J.',
          'Sanders C.R.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '22654059' },
          { database: 'DOI', id: '10.1126/science.1219988' },
        ],
        title:
          'The amyloid precursor protein has a flexible transmembrane domain and binds cholesterol.',
        publicationDate: '2012',
        journal: 'Science',
        firstPage: '1168',
        lastPage: '1171',
        volume: '336',
      },
      referencePositions: [
        'STRUCTURE BY NMR OF 671-770',
        'SUBCELLULAR LOCATION',
      ],
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '2LP1' }],
    },
    {
      citation: {
        id: '25122912',
        citationType: 'journal article',
        authors: [
          'Baumkotter F.',
          'Schmidt N.',
          'Vargas C.',
          'Schilling S.',
          'Weber R.',
          'Wagner K.',
          'Fiedler S.',
          'Klug W.',
          'Radzimanowski J.',
          'Nickolaus S.',
          'Keller S.',
          'Eggert S.',
          'Wild K.',
          'Kins S.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '25122912' },
          { database: 'DOI', id: '10.1523/jneurosci.0180-14.2014' },
        ],
        title:
          'Amyloid precursor protein dimerization and synaptogenic function depend on copper binding to the growth factor-like domain.',
        publicationDate: '2014',
        journal: 'J. Neurosci.',
        firstPage: '11159',
        lastPage: '11172',
        volume: '34',
      },
      referencePositions: [
        'X-RAY CRYSTALLOGRAPHY (1.75 ANGSTROMS) OF 23-185 IN COMPLEX WITH COPPER',
        'FUNCTION',
        'SUBUNIT',
        'SUBCELLULAR LOCATION',
        'DOMAIN',
        'DISULFIDE BONDS',
        'MUTAGENESIS OF HIS-108; HIS-110; HIS-147 AND HIS-151',
      ],
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '4JFN' }],
    },
    {
      citation: {
        id: '26898943',
        citationType: 'journal article',
        authors: [
          'Istrate A.N.',
          'Kozin S.A.',
          'Zhokhov S.S.',
          'Mantsyzov A.B.',
          'Kechko O.I.',
          'Pastore A.',
          'Makarov A.A.',
          'Polshakov V.I.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '26898943' },
          { database: 'DOI', id: '10.1038/srep21734' },
        ],
        title:
          "Interplay of histidine residues of the Alzheimer's disease Abeta peptide governs its Zn-induced oligomerization.",
        publicationDate: '2016',
        journal: 'Sci. Rep.',
        firstPage: '21734',
        lastPage: '21734',
        volume: '6',
      },
      referencePositions: [
        'STRUCTURE BY NMR OF 672-687',
        'ZINC-BINDING SITES',
        'DOMAIN',
      ],
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '2MGT' }],
    },
    {
      citation: {
        id: '28570778',
        citationType: 'journal article',
        authors: [
          'Polshakov V.I.',
          'Mantsyzov A.B.',
          'Kozin S.A.',
          'Adzhubei A.A.',
          'Zhokhov S.S.',
          'van Beek W.',
          'Kulikova A.A.',
          'Indeykina M.I.',
          'Mitkevich V.A.',
          'Makarov A.A.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '28570778' },
          { database: 'DOI', id: '10.1002/anie.201704615' },
        ],
        title:
          "A Binuclear Zinc Interaction Fold Discovered in the Homodimer of Alzheimer's Amyloid-beta Fragment with Taiwanese Mutation D7H.",
        publicationDate: '2017',
        journal: 'Angew. Chem. Int. Ed. Engl.',
        firstPage: '11734',
        lastPage: '11739',
        volume: '56',
      },
      referencePositions: ['STRUCTURE BY NMR OF 672-681', 'DOMAIN'],
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '5LFY' }],
    },
    {
      citation: {
        id: '28882996',
        citationType: 'journal article',
        authors: [
          'Gremer L.',
          'Scholzel D.',
          'Schenk C.',
          'Reinartz E.',
          'Labahn J.',
          'Ravelli R.B.G.',
          'Tusche M.',
          'Lopez-Iglesias C.',
          'Hoyer W.',
          'Heise H.',
          'Willbold D.',
          'Schroder G.F.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '28882996' },
          { database: 'DOI', id: '10.1126/science.aao2825' },
        ],
        title:
          'Fibril structure of amyloid-beta(1-42) by cryo-electron microscopy.',
        publicationDate: '2017',
        journal: 'Science',
        firstPage: '116',
        lastPage: '119',
        volume: '358',
      },
      referencePositions: [
        'STRUCTURE BY ELECTRON MICROSCOPY (4.00 ANGSTROMS) OF 672-713',
      ],
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '5OQV' }],
    },
    {
      citation: {
        id: '29282295',
        citationType: 'journal article',
        authors: [
          'Krotee P.',
          'Griner S.L.',
          'Sawaya M.R.',
          'Cascio D.',
          'Rodriguez J.A.',
          'Shi D.',
          'Philipp S.',
          'Murray K.',
          'Saelices L.',
          'Lee J.',
          'Seidler P.',
          'Glabe C.G.',
          'Jiang L.',
          'Gonen T.',
          'Eisenberg D.S.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '29282295' },
          { database: 'DOI', id: '10.1074/jbc.m117.806109' },
        ],
        title:
          'Common fibrillar spines of amyloid-beta and human islet amyloid polypeptide revealed by microelectron diffraction and structure-based inhibitors.',
        publicationDate: '2018',
        journal: 'J. Biol. Chem.',
        firstPage: '2888',
        lastPage: '2902',
        volume: '293',
      },
      referencePositions: [
        'STRUCTURE BY ELECTRON MICROSCOPY (1.42 ANGSTROMS) OF 695-705',
      ],
      evidences: [{ evidenceCode: 'ECO:0007744', source: 'PDB', id: '5VOS' }],
    },
    {
      citation: {
        id: '30630874',
        citationType: 'journal article',
        authors: [
          'Zhou R.',
          'Yang G.',
          'Guo X.',
          'Zhou Q.',
          'Lei J.',
          'Shi Y.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '30630874' },
          { database: 'DOI', id: '10.1126/science.aaw0930' },
        ],
        title:
          'Recognition of the amyloid precursor protein by human gamma-secretase.',
        publicationDate: '2019',
        journal: 'Science',
        firstPage: '0',
        lastPage: '0',
        volume: '0',
      },
      referencePositions: [
        'STRUCTURE BY ELECTRON MICROSCOPY (2.60 ANGSTROMS) OF 688-770 IN COMPLEX WITH GAMMA-SECRETASE',
        'INTERACTION WITH PSEN1',
        'SUBUNIT',
        'PROTEOLYTIC CLEAVAGE BY PSEN1',
        'TOPOLOGY',
        'MUTAGENESIS OF VAL-695',
      ],
    },
    {
      citation: {
        id: '1363811',
        citationType: 'journal article',
        authors: ['Hardy J.'],
        citationCrossReferences: [
          { database: 'PubMed', id: '1363811' },
          { database: 'DOI', id: '10.1038/ng0792-233' },
        ],
        title: 'Framing beta-amyloid.',
        publicationDate: '1992',
        journal: 'Nat. Genet.',
        firstPage: '233',
        lastPage: '234',
        volume: '1',
      },
      referencePositions: ['REVIEW ON VARIANTS'],
    },
    {
      citation: {
        id: '2111584',
        citationType: 'journal article',
        authors: [
          'Levy E.',
          'Carman M.D.',
          'Fernandez-Madrid I.J.',
          'Power M.D.',
          'Lieberburg I.',
          'van Duinen S.G.',
          'Bots G.T.A.M.',
          'Luyendijk W.',
          'Frangione B.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '2111584' },
          { database: 'DOI', id: '10.1126/science.2111584' },
        ],
        title:
          "Mutation of the Alzheimer's disease amyloid gene in hereditary cerebral hemorrhage, Dutch type.",
        publicationDate: '1990',
        journal: 'Science',
        firstPage: '1124',
        lastPage: '1126',
        volume: '248',
      },
      referencePositions: ['VARIANT CAA-APP GLN-693'],
    },
    {
      citation: {
        id: '1671712',
        citationType: 'journal article',
        authors: [
          'Goate A.',
          'Chartier-Harlin M.-C.',
          'Mullan M.',
          'Brown J.',
          'Crawford F.',
          'Fidani L.',
          'Giuffra L.',
          'Haynes A.',
          'Irving N.',
          'James L.',
          'Mant R.',
          'Newton P.',
          'Rooke K.',
          'Roques P.',
          'Talbot C.',
          'Pericak-Vance M.',
          'Roses A.D.',
          'Williamson R.',
          'Rossor M.',
          'Owen M.',
          'Hardy J.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '1671712' },
          { database: 'DOI', id: '10.1038/349704a0' },
        ],
        title:
          "Segregation of a missense mutation in the amyloid precursor protein gene with familial Alzheimer's disease.",
        publicationDate: '1991',
        journal: 'Nature',
        firstPage: '704',
        lastPage: '706',
        volume: '349',
      },
      referencePositions: ['VARIANT AD1 ILE-717'],
    },
    {
      citation: {
        id: '1908231',
        citationType: 'journal article',
        authors: [
          'Yoshioka K.',
          'Miki T.',
          'Katsuya T.',
          'Ogihara T.',
          'Sakaki Y.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '1908231' },
          { database: 'DOI', id: '10.1016/0006-291x(91)91011-z' },
        ],
        title:
          "The 717Val-->Ile substitution in amyloid precursor protein is associated with familial Alzheimer's disease regardless of ethnic groups.",
        publicationDate: '1991',
        journal: 'Biochem. Biophys. Res. Commun.',
        firstPage: '1141',
        lastPage: '1146',
        volume: '178',
      },
      referencePositions: ['VARIANT AD1 ILE-717'],
    },
    {
      citation: {
        id: '1678058',
        citationType: 'journal article',
        authors: [
          'Naruse S.',
          'Igarashi S.',
          'Kobayashi H.',
          'Aoki K.',
          'Inuzuka T.',
          'Kaneko K.',
          'Shimizu T.',
          'Iihara K.',
          'Kojima T.',
          'Miyatake T.',
          'Tsuji S.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '1678058' },
          { database: 'DOI', id: '10.1016/0140-6736(91)91612-x' },
        ],
        title:
          "Mis-sense mutation Val->Ile in exon 17 of amyloid precursor protein gene in Japanese familial Alzheimer's disease.",
        publicationDate: '1991',
        journal: 'Lancet',
        firstPage: '978',
        lastPage: '979',
        volume: '337',
      },
      referencePositions: ['VARIANT AD1 ILE-717'],
    },
    {
      citation: {
        id: '1944558',
        citationType: 'journal article',
        authors: [
          'Chartier-Harlin M.-C.',
          'Crawford F.',
          'Houlden H.',
          'Warren A.',
          'Hughes D.',
          'Fidani L.',
          'Goate A.',
          'Rossor M.',
          'Roques P.',
          'Hardy J.',
          'Mullan M.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '1944558' },
          { database: 'DOI', id: '10.1038/353844a0' },
        ],
        title:
          "Early-onset Alzheimer's disease caused by mutations at codon 717 of the beta-amyloid precursor protein gene.",
        publicationDate: '1991',
        journal: 'Nature',
        firstPage: '844',
        lastPage: '846',
        volume: '353',
      },
      referencePositions: ['VARIANT AD1 GLY-717'],
    },
    {
      citation: {
        id: '1925564',
        citationType: 'journal article',
        authors: ['Murrell J.R.', 'Farlow M.', 'Ghetti B.', 'Benson M.D.'],
        citationCrossReferences: [
          { database: 'PubMed', id: '1925564' },
          { database: 'DOI', id: '10.1126/science.1925564' },
        ],
        title:
          "A mutation in the amyloid precursor protein associated with hereditary Alzheimer's disease.",
        publicationDate: '1991',
        journal: 'Science',
        firstPage: '97',
        lastPage: '99',
        volume: '254',
      },
      referencePositions: ['VARIANT AD1 PHE-717'],
    },
    {
      citation: {
        id: '1415269',
        citationType: 'journal article',
        authors: [
          'Kamino K.',
          'Orr H.T.',
          'Payami H.',
          'Wijsman E.M.',
          'Alonso M.E.',
          'Pulst S.M.',
          'Anderson L.',
          "O'Dahl S.",
          'Nemens E.',
          'White J.A.',
          'Sadovnick A.D.',
          'Ball M.J.',
          'Kaye J.',
          'Warren A.',
          'McInnis M.G.',
          'Antonarakis S.E.',
          'Korenberg J.R.',
          'Sharma V.',
          'Kukull W.',
          'Larson E.',
          'Heston L.L.',
          'Martin G.M.',
          'Bird T.D.',
          'Schellenberg G.D.',
        ],
        citationCrossReferences: [{ database: 'PubMed', id: '1415269' }],
        title:
          'Linkage and mutational analysis of familial Alzheimer disease kindreds for the APP gene region.',
        publicationDate: '1992',
        journal: 'Am. J. Hum. Genet.',
        firstPage: '998',
        lastPage: '1014',
        volume: '51',
      },
      referencePositions: ['VARIANT AD1 GLY-693'],
    },
    {
      citation: {
        id: '1303239',
        citationType: 'journal article',
        authors: [
          'Hendriks L.',
          'van Duijn C.M.',
          'Cras P.',
          'Cruts M.',
          'Van Hul W.',
          'van Harskamp F.',
          'Warren A.',
          'McInnis M.G.',
          'Antonarakis S.E.',
          'Martin J.J.',
          'Hofman A.',
          'Van Broeckhoven C.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '1303239' },
          { database: 'DOI', id: '10.1038/ng0692-218' },
        ],
        title:
          'Presenile dementia and cerebral haemorrhage linked to a mutation at codon 692 of the beta-amyloid precursor protein gene.',
        publicationDate: '1992',
        journal: 'Nat. Genet.',
        firstPage: '218',
        lastPage: '221',
        volume: '1',
      },
      referencePositions: ['VARIANT AD1 GLY-692'],
    },
    {
      citation: {
        id: '1302033',
        citationType: 'journal article',
        authors: [
          'Mullan M.',
          'Crawford F.',
          'Axelman K.',
          'Houlden H.',
          'Lilius L.',
          'Winblad B.',
          'Lannfelt L.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '1302033' },
          { database: 'DOI', id: '10.1038/ng0892-345' },
        ],
        title:
          "A pathogenic mutation for probable Alzheimer's disease in the APP gene at the N-terminus of beta-amyloid.",
        publicationDate: '1992',
        journal: 'Nat. Genet.',
        firstPage: '345',
        lastPage: '347',
        volume: '1',
      },
      referencePositions: ['VARIANT AD1 670-LYS-MET-671 DELINS ASN-LEU'],
    },
    {
      citation: {
        id: '1465129',
        citationType: 'journal article',
        authors: [
          'Citron M.',
          'Oltersdorf T.',
          'Haass C.',
          'McConlogue L.',
          'Hung A.Y.',
          'Seubert P.',
          'Vigo-Pelfrey C.',
          'Lieberburg I.',
          'Selkoe D.J.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '1465129' },
          { database: 'DOI', id: '10.1038/360672a0' },
        ],
        title:
          "Mutation of the beta-amyloid precursor protein in familial Alzheimer's disease increases beta-protein production.",
        publicationDate: '1992',
        journal: 'Nature',
        firstPage: '672',
        lastPage: '674',
        volume: '360',
      },
      referencePositions: [
        'CHARACTERIZATION OF VARIANT AD1 670-LYS-MET-671 DELINS ASN-LEU',
      ],
    },
    {
      citation: {
        id: '1307241',
        citationType: 'journal article',
        authors: [
          'Jones C.T.',
          'Morris S.',
          'Yates C.M.',
          'Moffoot A.',
          'Sharpe C.',
          'Brock D.J.H.',
          'St Clair D.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '1307241' },
          { database: 'DOI', id: '10.1038/ng0792-306' },
        ],
        title:
          'Mutation in codon 713 of the beta amyloid precursor protein gene presenting with schizophrenia.',
        publicationDate: '1992',
        journal: 'Nat. Genet.',
        firstPage: '306',
        lastPage: '309',
        volume: '1',
      },
      referencePositions: ['VARIANT VAL-713'],
    },
    {
      citation: {
        id: '1303275',
        citationType: 'journal article',
        authors: [
          'Carter D.A.',
          'Desmarais E.',
          'Bellis M.',
          'Campion D.',
          'Clerget-Darpoux F.',
          'Brice A.',
          'Agid Y.',
          'Jaillard-Serradt A.',
          'Mallet J.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '1303275' },
          { database: 'DOI', id: '10.1038/ng1292-255' },
        ],
        title: 'More missense in amyloid gene.',
        publicationDate: '1992',
        journal: 'Nat. Genet.',
        firstPage: '255',
        lastPage: '256',
        volume: '2',
      },
      referencePositions: ['VARIANT AD1 THR-713'],
    },
    {
      citation: {
        id: '8267572',
        citationType: 'journal article',
        authors: [
          'Liepnieks J.J.',
          'Ghetti B.',
          'Farlow M.',
          'Roses A.D.',
          'Benson M.D.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '8267572' },
          { database: 'DOI', id: '10.1006/bbrc.1993.2491' },
        ],
        title:
          "Characterization of amyloid fibril beta-peptide in familial Alzheimer's disease with APP717 mutations.",
        publicationDate: '1993',
        journal: 'Biochem. Biophys. Res. Commun.',
        firstPage: '386',
        lastPage: '392',
        volume: '197',
      },
      referencePositions: ['VARIANTS AD1 ILE-717 AND PHE-717'],
    },
    {
      citation: {
        id: '8154870',
        citationType: 'journal article',
        authors: [
          'Peacock M.L.',
          'Murman D.L.',
          'Sima A.A.F.',
          'Warren J.T. Jr.',
          'Roses A.D.',
          'Fink J.K.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '8154870' },
          { database: 'DOI', id: '10.1002/ana.410350410' },
        ],
        title:
          "Novel amyloid precursor protein gene mutation (codon 665Asp) in a patient with late-onset Alzheimer's disease.",
        publicationDate: '1994',
        journal: 'Ann. Neurol.',
        firstPage: '432',
        lastPage: '438',
        volume: '35',
      },
      referencePositions: ['VARIANT ASP-665'],
    },
    {
      citation: {
        id: '8290042',
        citationType: 'journal article',
        authors: [
          'Farlow M.',
          'Murrell J.',
          'Ghetti B.',
          'Unverzagt F.',
          'Zeldenrust S.',
          'Benson M.D.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '8290042' },
          { database: 'DOI', id: '10.1212/wnl.44.1.105' },
        ],
        title:
          "Clinical characteristics in a kindred with early-onset Alzheimer's disease and their linkage to a G-->T change at position 2149 of the amyloid precursor protein gene.",
        publicationDate: '1994',
        journal: 'Neurology',
        firstPage: '105',
        lastPage: '111',
        volume: '44',
      },
      referencePositions: ['VARIANT AD1 PHE-717'],
    },
    {
      citation: {
        id: '8577393',
        citationType: 'journal article',
        authors: [
          'Brooks W.S.',
          'Martins R.N.',
          'De Voecht J.',
          'Nicholson G.A.',
          'Schofield P.R.',
          'Kwok J.B.J.',
          'Fisher C.',
          'Yeung L.U.',
          'Van Broeckhoven C.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '8577393' },
          { database: 'DOI', id: '10.1016/0304-3940(95)12046-7' },
        ],
        title:
          "A mutation in codon 717 of the amyloid precursor protein gene in an Australian family with Alzheimer's disease.",
        publicationDate: '1995',
        journal: 'Neurosci. Lett.',
        firstPage: '183',
        lastPage: '186',
        volume: '199',
      },
      referencePositions: ['VARIANT AD1 ILE-717'],
    },
    {
      citation: {
        id: '8886002',
        citationType: 'journal article',
        authors: [
          'Maruyama K.',
          'Tomita T.',
          'Shinozaki K.',
          'Kume H.',
          'Asada H.',
          'Saido T.C.',
          'Ishiura S.',
          'Iwatsubo T.',
          'Obata K.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '8886002' },
          { database: 'DOI', id: '10.1006/bbrc.1996.1577' },
        ],
        title:
          "Familial Alzheimer's disease-linked mutations at Val717 of amyloid precursor protein are specific for the increased secretion of A beta 42(43).",
        publicationDate: '1996',
        journal: 'Biochem. Biophys. Res. Commun.',
        firstPage: '730',
        lastPage: '735',
        volume: '227',
      },
      referencePositions: [
        'CHARACTERIZATION OF VARIANTS AD1 GLY-717; ILE-717 AND PHE-717',
      ],
    },
    {
      citation: {
        id: '9328472',
        citationType: 'journal article',
        authors: [
          'Eckman C.B.',
          'Mehta N.D.',
          'Crook R.',
          'Perez-Tur J.',
          'Prihar G.',
          'Pfeiffer E.',
          'Graff-Radford N.',
          'Hinder P.',
          'Yager D.',
          'Zenk B.',
          'Refolo L.M.',
          'Prada C.M.',
          'Younkin S.G.',
          'Hutton M.',
          'Hardy J.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '9328472' },
          { database: 'DOI', id: '10.1093/hmg/6.12.2087' },
        ],
        title:
          'A new pathogenic mutation in the APP gene (I716V) increases the relative proportion of A beta 42(43).',
        publicationDate: '1997',
        journal: 'Hum. Mol. Genet.',
        firstPage: '2087',
        lastPage: '2089',
        volume: '6',
      },
      referencePositions: ['VARIANT AD1 VAL-716'],
    },
    {
      citation: {
        id: '9754958',
        citationType: 'journal article',
        authors: [
          'Cras P.',
          'van Harskamp F.',
          'Hendriks L.',
          'Ceuterick C.',
          'van Duijn C.M.',
          'Stefanko S.Z.',
          'Hofman A.',
          'Kros J.M.',
          'Van Broeckhoven C.',
          'Martin J.J.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '9754958' },
          { database: 'DOI', id: '10.1007/s004010050892' },
        ],
        title:
          'Presenile Alzheimer dementia characterized by amyloid angiopathy and large amyloid core type senile plaques in the APP 692Ala-->Gly mutation.',
        publicationDate: '1998',
        journal: 'Acta Neuropathol.',
        firstPage: '253',
        lastPage: '260',
        volume: '96',
      },
      referencePositions: [
        'VARIANT AD1 GLY-692',
        'CHARACTERIZATION OF PHENOTYPE',
      ],
    },
    {
      citation: {
        id: '10097173',
        citationType: 'journal article',
        authors: [
          'Ancolio K.',
          'Dumanchin C.',
          'Barelli H.',
          'Warter J.-M.',
          'Brice A.',
          'Campion D.',
          'Frebourg T.',
          'Checler F.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '10097173' },
          { database: 'DOI', id: '10.1073/pnas.96.7.4119' },
        ],
        title:
          "Unusual phenotypic alteration of beta amyloid precursor protein (betaAPP) maturation by a new Val-715 --> Met betaAPP-770 mutation responsible for probable early-onset Alzheimer's disease.",
        publicationDate: '1999',
        journal: 'Proc. Natl. Acad. Sci. U.S.A.',
        firstPage: '4119',
        lastPage: '4124',
        volume: '96',
      },
      referencePositions: [
        'VARIANT AD1 MET-715',
        'CHARACTERIZATION OF VARIANT AD1 MET-715',
      ],
    },
    {
      citation: {
        id: '10631141',
        citationType: 'journal article',
        authors: [
          'Finckh U.',
          'Mueller-Thomsen T.',
          'Mann U.',
          'Eggers C.',
          'Marksteiner J.',
          'Meins W.',
          'Binetti G.',
          'Alberici A.',
          'Hock C.',
          'Nitsch R.M.',
          'Gal A.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '10631141' },
          { database: 'DOI', id: '10.1086/302702' },
        ],
        title:
          'High prevalence of pathogenic mutations in patients with early-onset dementia detected by sequence analyses of four different genes.',
        publicationDate: '2000',
        journal: 'Am. J. Hum. Genet.',
        firstPage: '110',
        lastPage: '117',
        volume: '66',
      },
      referencePositions: ['VARIANT AD1 ILE-717'],
    },
    {
      citation: {
        id: '10665499',
        citationType: 'journal article',
        authors: [
          'Kwok J.B.J.',
          'Li Q.X.',
          'Hallupp M.',
          'Whyte S.',
          'Ames D.',
          'Beyreuther K.',
          'Masters C.L.',
          'Schofield P.R.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '10665499' },
          {
            database: 'DOI',
            id: '10.1002/1531-8249(200002)47:2<249::aid-ana18>3.0.co;2-8',
          },
        ],
        title:
          'Novel Leu723Pro amyloid precursor protein mutation increases amyloid beta42(43) peptide levels and induces apoptosis.',
        publicationDate: '2000',
        journal: 'Ann. Neurol.',
        firstPage: '249',
        lastPage: '253',
        volume: '47',
      },
      referencePositions: ['VARIANT AD1 PRO-723'],
    },
    {
      citation: {
        id: '10867787',
        citationType: 'journal article',
        authors: [
          'Murrell J.R.',
          'Hake A.M.',
          'Quaid K.A.',
          'Farlow M.R.',
          'Ghetti B.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '10867787' },
          { database: 'DOI', id: '10.1001/archneur.57.6.885' },
        ],
        title:
          'Early-onset Alzheimer disease caused by a new mutation (V717L) in the amyloid precursor protein gene.',
        publicationDate: '2000',
        journal: 'Arch. Neurol.',
        firstPage: '885',
        lastPage: '887',
        volume: '57',
      },
      referencePositions: ['VARIANT AD1 LEU-717'],
    },
    {
      citation: {
        id: '11063718',
        citationType: 'journal article',
        authors: [
          'Kumar-Singh S.',
          'De Jonghe C.',
          'Cruts M.',
          'Kleinert R.',
          'Wang R.',
          'Mercken M.',
          'De Strooper B.',
          'Vanderstichele H.',
          'Loefgren A.',
          'Vanderhoeven I.',
          'Backhovens H.',
          'Vanmechelen E.',
          'Kroisel P.M.',
          'Van Broeckhoven C.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '11063718' },
          { database: 'DOI', id: '10.1093/hmg/9.18.2589' },
        ],
        title:
          "Nonfibrillar diffuse amyloid deposition due to a gamma(42)-secretase site mutation points to an essential role for N-truncated A beta(42) in Alzheimer's disease.",
        publicationDate: '2000',
        journal: 'Hum. Mol. Genet.',
        firstPage: '2589',
        lastPage: '2598',
        volume: '9',
      },
      referencePositions: [
        'VARIANT AD1 ILE-714',
        'CHARACTERIZATION OF VARIANTS AD1 ILE-714 AND ILE-717',
      ],
    },
    {
      citation: {
        id: '10677483',
        citationType: 'journal article',
        authors: [
          'Lin X.',
          'Koelsch G.',
          'Wu S.',
          'Downs D.',
          'Dashti A.',
          'Tang J.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '10677483' },
          { database: 'DOI', id: '10.1073/pnas.97.4.1456' },
        ],
        title:
          'Human aspartic protease memapsin 2 cleaves the beta-secretase site of beta-amyloid precursor protein.',
        publicationDate: '2000',
        journal: 'Proc. Natl. Acad. Sci. U.S.A.',
        firstPage: '1456',
        lastPage: '1460',
        volume: '97',
      },
      referencePositions: [
        'CHARACTERIZATION OF VARIANT AD1 670-LYS-MET-671 DELINS ASN-LEU',
      ],
    },
    {
      citation: {
        id: '11409420',
        citationType: 'journal article',
        authors: [
          'Grabowski T.J.',
          'Cho H.S.',
          'Vonsattel J.P.G.',
          'Rebeck G.W.',
          'Greenberg S.M.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '11409420' },
          { database: 'DOI', id: '10.1002/ana.1009' },
        ],
        title:
          'Novel amyloid precursor protein mutation in an Iowa family with dementia and severe cerebral amyloid angiopathy.',
        publicationDate: '2001',
        journal: 'Ann. Neurol.',
        firstPage: '697',
        lastPage: '705',
        volume: '49',
      },
      referencePositions: ['VARIANT CAA-APP ASN-694'],
    },
    {
      citation: {
        id: '11311152',
        citationType: 'journal article',
        authors: [
          'Walsh D.M.',
          'Hartley D.M.',
          'Condron M.M.',
          'Selkoe D.J.',
          'Teplow D.B.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '11311152' },
          { database: 'DOI', id: '10.1042/bj3550869' },
        ],
        title:
          "In vitro studies of amyloid beta-protein fibril assembly and toxicity provide clues to the aetiology of Flemish variant (Ala692-->Gly) Alzheimer's disease.",
        publicationDate: '2001',
        journal: 'Biochem. J.',
        firstPage: '869',
        lastPage: '877',
        volume: '355',
      },
      referencePositions: ['CHARACTERIZATION OF VARIANT AD1 GLY-692'],
    },
    {
      citation: {
        id: '11528419',
        citationType: 'journal article',
        authors: [
          'Nilsberth C.',
          'Westlind-Danielsson A.',
          'Eckman C.B.',
          'Condron M.M.',
          'Axelman K.',
          'Forsell C.',
          'Stenh C.',
          'Luthman J.',
          'Teplow D.B.',
          'Younkin S.G.',
          'Naeslund J.',
          'Lannfelt L.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '11528419' },
          { database: 'DOI', id: '10.1038/nn0901-887' },
        ],
        title:
          "The 'Arctic' APP mutation (E693G) causes Alzheimer's disease by enhanced Abeta protofibril formation.",
        publicationDate: '2001',
        journal: 'Nat. Neurosci.',
        firstPage: '887',
        lastPage: '893',
        volume: '4',
      },
      referencePositions: ['VARIANT AD1 GLY-693'],
    },
    {
      citation: {
        id: '12034808',
        citationType: 'journal article',
        authors: [
          'Pasalar P.',
          'Najmabadi H.',
          'Noorian A.R.',
          'Moghimi B.',
          'Jannati A.',
          'Soltanzadeh A.',
          'Krefft T.',
          'Crook R.',
          'Hardy J.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '12034808' },
          { database: 'DOI', id: '10.1212/wnl.58.10.1574' },
        ],
        title:
          "An Iranian family with Alzheimer's disease caused by a novel APP mutation (Thr714Ala).",
        publicationDate: '2002',
        journal: 'Neurology',
        firstPage: '1574',
        lastPage: '1575',
        volume: '58',
      },
      referencePositions: ['VARIANT AD1 ALA-714'],
    },
    {
      citation: {
        id: '12654973',
        citationType: 'journal article',
        authors: [
          'Greenberg S.M.',
          'Shin Y.',
          'Grabowski T.J.',
          'Cooper G.E.',
          'Rebeck G.W.',
          'Iglesias S.',
          'Chapon F.',
          'Tournier-Lasserve E.',
          'Baron J.-C.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '12654973' },
          { database: 'DOI', id: '10.1212/01.wnl.0000050140.10044.a8' },
        ],
        title:
          'Hemorrhagic stroke associated with the Iowa amyloid precursor protein mutation.',
        publicationDate: '2003',
        journal: 'Neurology',
        firstPage: '1020',
        lastPage: '1022',
        volume: '60',
      },
      referencePositions: ['VARIANT CAA-APP ASN-694'],
    },
    {
      citation: {
        id: '15365148',
        citationType: 'journal article',
        authors: [
          'Rossi G.',
          'Giaccone G.',
          'Maletta R.',
          'Morbin M.',
          'Capobianco R.',
          'Mangieri M.',
          'Giovagnoli A.R.',
          'Bizzi A.',
          'Tomaino C.',
          'Perri M.',
          'Di Natale M.',
          'Tagliavini F.',
          'Bugiani O.',
          'Bruni A.C.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '15365148' },
          { database: 'DOI', id: '10.1212/01.wnl.0000137048.80666.86' },
        ],
        title:
          'A family with Alzheimer disease and strokes associated with A713T mutation of the APP gene.',
        publicationDate: '2004',
        journal: 'Neurology',
        firstPage: '910',
        lastPage: '912',
        volume: '63',
      },
      referencePositions: ['VARIANT AD1 THR-713'],
    },
    {
      citation: {
        id: '16178030',
        citationType: 'journal article',
        authors: [
          'Obici L.',
          'Demarchi A.',
          'de Rosa G.',
          'Bellotti V.',
          'Marciano S.',
          'Donadei S.',
          'Arbustini E.',
          'Palladini G.',
          'Diegoli M.',
          'Genovese E.',
          'Ferrari G.',
          'Coverlizza S.',
          'Merlini G.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '16178030' },
          { database: 'DOI', id: '10.1002/ana.20571' },
        ],
        title:
          'A novel AbetaPP mutation exclusively associated with cerebral amyloid angiopathy.',
        publicationDate: '2005',
        journal: 'Ann. Neurol.',
        firstPage: '639',
        lastPage: '644',
        volume: '58',
      },
      referencePositions: ['VARIANT CAA-APP VAL-705'],
    },
    {
      citation: {
        id: '15668448',
        citationType: 'journal article',
        authors: [
          'Edwards-Lee T.',
          'Ringman J.M.',
          'Chung J.',
          'Werner J.',
          'Morgan A.',
          'St George-Hyslop P.H.',
          'Thompson P.',
          'Dutton R.',
          'Mlikotic A.',
          'Rogaeva E.',
          'Hardy J.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '15668448' },
          { database: 'DOI', id: '10.1212/01.wnl.0000149761.70566.3e' },
        ],
        title:
          'An African American family with early-onset Alzheimer disease and an APP (T714I) mutation.',
        publicationDate: '2005',
        journal: 'Neurology',
        firstPage: '377',
        lastPage: '379',
        volume: '64',
      },
      referencePositions: ['VARIANT AD1 ILE-714'],
    },
    {
      citation: {
        id: '20697050',
        citationType: 'journal article',
        authors: [
          'Bugiani O.',
          'Giaccone G.',
          'Rossi G.',
          'Mangieri M.',
          'Capobianco R.',
          'Morbin M.',
          'Mazzoleni G.',
          'Cupidi C.',
          'Marcon G.',
          'Giovagnoli A.',
          'Bizzi A.',
          'Di Fede G.',
          'Puoti G.',
          'Carella F.',
          'Salmaggi A.',
          'Romorini A.',
          'Patruno G.M.',
          'Magoni M.',
          'Padovani A.',
          'Tagliavini F.',
        ],
        citationCrossReferences: [
          { database: 'PubMed', id: '20697050' },
          { database: 'DOI', id: '10.1001/archneurol.2010.178' },
        ],
        title:
          'Hereditary cerebral hemorrhage with amyloidosis associated with the E693K mutation of APP.',
        publicationDate: '2010',
        journal: 'Arch. Neurol.',
        firstPage: '987',
        lastPage: '995',
        volume: '67',
      },
      referencePositions: ['VARIANT CAA-APP LYS-693'],
    },
  ],
  uniProtKBCrossReferences: [
    {
      database: 'EMBL',
      id: 'Y00264',
      properties: [
        { key: 'ProteinId', value: 'CAA68374.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'mRNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'X13466',
      properties: [
        { key: 'ProteinId', value: 'CAA31830.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'X13467',
      properties: [
        { key: 'ProteinId', value: 'CAA31830.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'X13468',
      properties: [
        { key: 'ProteinId', value: 'CAA31830.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'X13469',
      properties: [
        { key: 'ProteinId', value: 'CAA31830.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'X13470',
      properties: [
        { key: 'ProteinId', value: 'CAA31830.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'X13471',
      properties: [
        { key: 'ProteinId', value: 'CAA31830.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'X13472',
      properties: [
        { key: 'ProteinId', value: 'CAA31830.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'X13473',
      properties: [
        { key: 'ProteinId', value: 'CAA31830.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'X13474',
      properties: [
        { key: 'ProteinId', value: 'CAA31830.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'X13475',
      properties: [
        { key: 'ProteinId', value: 'CAA31830.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'X13476',
      properties: [
        { key: 'ProteinId', value: 'CAA31830.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'X13477',
      properties: [
        { key: 'ProteinId', value: 'CAA31830.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'X13478',
      properties: [
        { key: 'ProteinId', value: 'CAA31830.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'X13479',
      properties: [
        { key: 'ProteinId', value: 'CAA31830.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'X13487',
      properties: [
        { key: 'ProteinId', value: 'CAA31830.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'X13488',
      properties: [
        { key: 'ProteinId', value: 'CAA31830.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'X06989',
      properties: [
        { key: 'ProteinId', value: 'CAA30050.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'mRNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M33112',
      properties: [
        { key: 'ProteinId', value: 'AAB59502.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M34862',
      properties: [
        { key: 'ProteinId', value: 'AAB59502.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M34863',
      properties: [
        { key: 'ProteinId', value: 'AAB59502.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M34864',
      properties: [
        { key: 'ProteinId', value: 'AAB59502.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M34865',
      properties: [
        { key: 'ProteinId', value: 'AAB59502.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M34866',
      properties: [
        { key: 'ProteinId', value: 'AAB59502.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M34867',
      properties: [
        { key: 'ProteinId', value: 'AAB59502.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M34868',
      properties: [
        { key: 'ProteinId', value: 'AAB59502.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M34869',
      properties: [
        { key: 'ProteinId', value: 'AAB59502.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M34870',
      properties: [
        { key: 'ProteinId', value: 'AAB59502.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M34871',
      properties: [
        { key: 'ProteinId', value: 'AAB59502.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M34872',
      properties: [
        { key: 'ProteinId', value: 'AAB59502.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M34873',
      properties: [
        { key: 'ProteinId', value: 'AAB59502.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M34874',
      properties: [
        { key: 'ProteinId', value: 'AAB59502.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M34876',
      properties: [
        { key: 'ProteinId', value: 'AAB59502.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M34877',
      properties: [
        { key: 'ProteinId', value: 'AAB59502.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M34878',
      properties: [
        { key: 'ProteinId', value: 'AAB59502.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M34879',
      properties: [
        { key: 'ProteinId', value: 'AAB59502.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M34875',
      properties: [
        { key: 'ProteinId', value: 'AAB59501.1' },
        { key: 'Status', value: 'ALT_TERM' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M34862',
      properties: [
        { key: 'ProteinId', value: 'AAB59501.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M34863',
      properties: [
        { key: 'ProteinId', value: 'AAB59501.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M34864',
      properties: [
        { key: 'ProteinId', value: 'AAB59501.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M34865',
      properties: [
        { key: 'ProteinId', value: 'AAB59501.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M34866',
      properties: [
        { key: 'ProteinId', value: 'AAB59501.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M34867',
      properties: [
        { key: 'ProteinId', value: 'AAB59501.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M34868',
      properties: [
        { key: 'ProteinId', value: 'AAB59501.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M34869',
      properties: [
        { key: 'ProteinId', value: 'AAB59501.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M34870',
      properties: [
        { key: 'ProteinId', value: 'AAB59501.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M34871',
      properties: [
        { key: 'ProteinId', value: 'AAB59501.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M34872',
      properties: [
        { key: 'ProteinId', value: 'AAB59501.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M34873',
      properties: [
        { key: 'ProteinId', value: 'AAB59501.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'D87675',
      properties: [
        { key: 'ProteinId', value: 'BAA22264.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AK312326',
      properties: [
        { key: 'ProteinId', value: 'BAG35248.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'mRNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AK295621',
      properties: [
        { key: 'ProteinId', value: 'BAG58500.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'mRNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AY919674',
      properties: [
        { key: 'ProteinId', value: 'AAW82435.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AP001439',
      properties: [
        { key: 'ProteinId', value: '-' },
        { key: 'Status', value: 'NOT_ANNOTATED_CDS' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AP001440',
      properties: [
        { key: 'ProteinId', value: '-' },
        { key: 'Status', value: 'NOT_ANNOTATED_CDS' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AP001441',
      properties: [
        { key: 'ProteinId', value: '-' },
        { key: 'Status', value: 'NOT_ANNOTATED_CDS' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AP001442',
      properties: [
        { key: 'ProteinId', value: '-' },
        { key: 'Status', value: 'NOT_ANNOTATED_CDS' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AP001443',
      properties: [
        { key: 'ProteinId', value: '-' },
        { key: 'Status', value: 'NOT_ANNOTATED_CDS' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'CH471079',
      properties: [
        { key: 'ProteinId', value: 'EAX09958.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'CH471079',
      properties: [
        { key: 'ProteinId', value: 'EAX09959.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'CH471079',
      properties: [
        { key: 'ProteinId', value: 'EAX09960.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'CH471079',
      properties: [
        { key: 'ProteinId', value: 'EAX09961.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'CH471079',
      properties: [
        { key: 'ProteinId', value: 'EAX09963.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'CH471079',
      properties: [
        { key: 'ProteinId', value: 'EAX09965.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'BC004369',
      properties: [
        { key: 'ProteinId', value: 'AAH04369.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'mRNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'BC065529',
      properties: [
        { key: 'ProteinId', value: 'AAH65529.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'mRNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M35675',
      properties: [
        { key: 'ProteinId', value: 'AAA60163.1' },
        { key: 'Status', value: 'ALT_SEQ' },
        { key: 'MoleculeType', value: 'mRNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M24547',
      properties: [
        { key: 'ProteinId', value: 'AAC13654.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M24546',
      properties: [
        { key: 'ProteinId', value: 'AAC13654.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M28373',
      properties: [
        { key: 'ProteinId', value: 'AAA58727.1' },
        { key: 'Status', value: 'ALT_SEQ' },
        { key: 'MoleculeType', value: 'mRNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'X06982',
      properties: [
        { key: 'ProteinId', value: 'CAA30042.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'mRNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'X06981',
      properties: [
        { key: 'ProteinId', value: 'CAA30041.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'mRNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M18734',
      properties: [
        { key: 'ProteinId', value: 'AAA51726.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'mRNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M29270',
      properties: [
        { key: 'ProteinId', value: 'AAA51768.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M29269',
      properties: [
        { key: 'ProteinId', value: 'AAA51768.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AB066441',
      properties: [
        { key: 'ProteinId', value: 'BAB71958.2' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'mRNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M15533',
      properties: [
        { key: 'ProteinId', value: 'AAA35540.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'mRNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M15532',
      properties: [
        { key: 'ProteinId', value: 'AAA51564.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'mRNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M37896',
      properties: [
        { key: 'ProteinId', value: 'AAA51727.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M37895',
      properties: [
        { key: 'ProteinId', value: 'AAA51727.1' },
        { key: 'Status', value: 'JOINED' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'S45136',
      properties: [
        { key: 'ProteinId', value: 'AAB23646.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'S60317',
      properties: [
        { key: 'ProteinId', value: 'AAC60601.2' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'Genomic_DNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'AF282245',
      properties: [
        { key: 'ProteinId', value: 'AAQ14327.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'mRNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'S60721',
      properties: [
        { key: 'ProteinId', value: 'AAB26263.2' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'mRNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'S61380',
      properties: [
        { key: 'ProteinId', value: 'AAB26264.2' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'mRNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'S61383',
      properties: [
        { key: 'ProteinId', value: 'AAB26265.2' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'mRNA' },
      ],
    },
    {
      database: 'EMBL',
      id: 'M16765',
      properties: [
        { key: 'ProteinId', value: 'AAA51722.1' },
        { key: 'Status', value: '-' },
        { key: 'MoleculeType', value: 'mRNA' },
      ],
    },
    {
      database: 'CCDS',
      id: 'CCDS13576.1',
      properties: [{ key: 'Description', value: '-' }],
      isoformId: 'P05067-1',
    },
    {
      database: 'CCDS',
      id: 'CCDS13577.1',
      properties: [{ key: 'Description', value: '-' }],
      isoformId: 'P05067-4',
    },
    {
      database: 'CCDS',
      id: 'CCDS33523.1',
      properties: [{ key: 'Description', value: '-' }],
      isoformId: 'P05067-8',
    },
    {
      database: 'CCDS',
      id: 'CCDS46638.1',
      properties: [{ key: 'Description', value: '-' }],
      isoformId: 'P05067-10',
    },
    {
      database: 'CCDS',
      id: 'CCDS56212.1',
      properties: [{ key: 'Description', value: '-' }],
      isoformId: 'P05067-11',
    },
    {
      database: 'CCDS',
      id: 'CCDS56213.1',
      properties: [{ key: 'Description', value: '-' }],
      isoformId: 'P05067-9',
    },
    {
      database: 'PIR',
      id: 'S01442',
      properties: [{ key: 'EntryName', value: 'S01442' }],
    },
    {
      database: 'PIR',
      id: 'S02260',
      properties: [{ key: 'EntryName', value: 'QRHUA4' }],
    },
    {
      database: 'RefSeq',
      id: 'NP_000475.1',
      properties: [{ key: 'NucleotideSequenceId', value: 'NM_000484.3' }],
      isoformId: 'P05067-1',
    },
    {
      database: 'RefSeq',
      id: 'NP_001129488.1',
      properties: [{ key: 'NucleotideSequenceId', value: 'NM_001136016.3' }],
      isoformId: 'P05067-11',
    },
    {
      database: 'RefSeq',
      id: 'NP_001129601.1',
      properties: [{ key: 'NucleotideSequenceId', value: 'NM_001136129.2' }],
      isoformId: 'P05067-10',
    },
    {
      database: 'RefSeq',
      id: 'NP_001129602.1',
      properties: [{ key: 'NucleotideSequenceId', value: 'NM_001136130.2' }],
    },
    {
      database: 'RefSeq',
      id: 'NP_001129603.1',
      properties: [{ key: 'NucleotideSequenceId', value: 'NM_001136131.2' }],
    },
    {
      database: 'RefSeq',
      id: 'NP_001191230.1',
      properties: [{ key: 'NucleotideSequenceId', value: 'NM_001204301.1' }],
      isoformId: 'P05067-9',
    },
    {
      database: 'RefSeq',
      id: 'NP_001191231.1',
      properties: [{ key: 'NucleotideSequenceId', value: 'NM_001204302.1' }],
      isoformId: 'P05067-7',
    },
    {
      database: 'RefSeq',
      id: 'NP_001191232.1',
      properties: [{ key: 'NucleotideSequenceId', value: 'NM_001204303.1' }],
      isoformId: 'P05067-3',
    },
    {
      database: 'RefSeq',
      id: 'NP_958816.1',
      properties: [{ key: 'NucleotideSequenceId', value: 'NM_201413.2' }],
      isoformId: 'P05067-8',
    },
    {
      database: 'RefSeq',
      id: 'NP_958817.1',
      properties: [{ key: 'NucleotideSequenceId', value: 'NM_201414.2' }],
      isoformId: 'P05067-4',
    },
    {
      database: 'PDB',
      id: '1AAP',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '1.50 A' },
        { key: 'Chains', value: 'A/B=287-344' },
      ],
    },
    {
      database: 'PDB',
      id: '1AMB',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A=672-699' },
      ],
    },
    {
      database: 'PDB',
      id: '1AMC',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A=672-699' },
      ],
    },
    {
      database: 'PDB',
      id: '1AML',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A=672-711' },
      ],
    },
    {
      database: 'PDB',
      id: '1BA4',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A=672-711' },
      ],
    },
    {
      database: 'PDB',
      id: '1BA6',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A=672-711' },
      ],
    },
    {
      database: 'PDB',
      id: '1BJB',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A=672-699' },
      ],
    },
    {
      database: 'PDB',
      id: '1BJC',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A=672-699' },
      ],
    },
    {
      database: 'PDB',
      id: '1BRC',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.50 A' },
        { key: 'Chains', value: 'I=287-342' },
      ],
    },
    {
      database: 'PDB',
      id: '1CA0',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.10 A' },
        { key: 'Chains', value: 'D/I=289-342' },
      ],
    },
    {
      database: 'PDB',
      id: '1HZ3',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A=681-706' },
      ],
    },
    {
      database: 'PDB',
      id: '1IYT',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A=672-713' },
      ],
    },
    {
      database: 'PDB',
      id: '1MWP',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '1.80 A' },
        { key: 'Chains', value: 'A=28-123' },
      ],
    },
    {
      database: 'PDB',
      id: '1OWT',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A=124-189' },
      ],
    },
    {
      database: 'PDB',
      id: '1QCM',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A=696-706' },
      ],
    },
    {
      database: 'PDB',
      id: '1QWP',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A=696-706' },
      ],
    },
    {
      database: 'PDB',
      id: '1QXC',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A=696-706' },
      ],
    },
    {
      database: 'PDB',
      id: '1QYT',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A=696-706' },
      ],
    },
    {
      database: 'PDB',
      id: '1TAW',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '1.80 A' },
        { key: 'Chains', value: 'B=287-344' },
      ],
    },
    {
      database: 'PDB',
      id: '1TKN',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A=460-569' },
      ],
    },
    {
      database: 'PDB',
      id: '1UO7',
      properties: [
        { key: 'Method', value: 'Model' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A=672-713' },
      ],
    },
    {
      database: 'PDB',
      id: '1UO8',
      properties: [
        { key: 'Method', value: 'Model' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A=672-713' },
      ],
    },
    {
      database: 'PDB',
      id: '1UOA',
      properties: [
        { key: 'Method', value: 'Model' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A=672-713' },
      ],
    },
    {
      database: 'PDB',
      id: '1UOI',
      properties: [
        { key: 'Method', value: 'Model' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A=672-713' },
      ],
    },
    {
      database: 'PDB',
      id: '1X11',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.50 A' },
        { key: 'Chains', value: 'C/D=754-766' },
      ],
    },
    {
      database: 'PDB',
      id: '1Z0Q',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A=672-713' },
      ],
    },
    {
      database: 'PDB',
      id: '1ZE7',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A=672-687' },
      ],
    },
    {
      database: 'PDB',
      id: '1ZE9',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A=672-687' },
      ],
    },
    {
      database: 'PDB',
      id: '1ZJD',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.60 A' },
        { key: 'Chains', value: 'B=289-344' },
      ],
    },
    {
      database: 'PDB',
      id: '2BEG',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A/B/C/D/E=672-713' },
      ],
    },
    {
      database: 'PDB',
      id: '2BOM',
      properties: [
        { key: 'Method', value: 'Model' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A/B=681-713' },
      ],
    },
    {
      database: 'PDB',
      id: '2BP4',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A=672-687' },
      ],
    },
    {
      database: 'PDB',
      id: '2FJZ',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '1.61 A' },
        { key: 'Chains', value: 'A=133-189' },
      ],
    },
    {
      database: 'PDB',
      id: '2FK1',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '1.60 A' },
        { key: 'Chains', value: 'A=133-189' },
      ],
    },
    {
      database: 'PDB',
      id: '2FK2',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '1.65 A' },
        { key: 'Chains', value: 'A=133-189' },
      ],
    },
    {
      database: 'PDB',
      id: '2FK3',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.40 A' },
        { key: 'Chains', value: 'A/B/C/D/E/F/G/H=133-189' },
      ],
    },
    {
      database: 'PDB',
      id: '2FKL',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.50 A' },
        { key: 'Chains', value: 'A/B=124-189' },
      ],
    },
    {
      database: 'PDB',
      id: '2FMA',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '0.85 A' },
        { key: 'Chains', value: 'A=133-189' },
      ],
    },
    {
      database: 'PDB',
      id: '2G47',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.10 A' },
        { key: 'Chains', value: 'C/D=672-711' },
      ],
    },
    {
      database: 'PDB',
      id: '2IPU',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '1.65 A' },
        { key: 'Chains', value: 'P/Q=672-679' },
      ],
    },
    {
      database: 'PDB',
      id: '2LFM',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A=672-711' },
      ],
    },
    {
      database: 'PDB',
      id: '2LLM',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A=686-726' },
      ],
    },
    {
      database: 'PDB',
      id: '2LMN',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A/B/C/D/E/F/G/H/I/J/K/L=672-711' },
      ],
    },
    {
      database: 'PDB',
      id: '2LMO',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A/B/C/D/E/F/G/H/I/J/K/L=672-711' },
      ],
    },
    {
      database: 'PDB',
      id: '2LMP',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A/B/C/D/E/F/G/H/I/J/K/L/M/N/O/P/Q/R=672-711' },
      ],
    },
    {
      database: 'PDB',
      id: '2LMQ',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A/B/C/D/E/F/G/H/I/J/K/L/M/N/O/P/Q/R=672-711' },
      ],
    },
    {
      database: 'PDB',
      id: '2LNQ',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A/B/C/D/E/F/G/H=672-711' },
      ],
    },
    {
      database: 'PDB',
      id: '2LOH',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A/B=686-726' },
      ],
    },
    {
      database: 'PDB',
      id: '2LP1',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A=671-770' },
      ],
    },
    {
      database: 'PDB',
      id: '2LZ3',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A/B=699-726' },
      ],
    },
    {
      database: 'PDB',
      id: '2LZ4',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A/B=699-726' },
      ],
    },
    {
      database: 'PDB',
      id: '2M4J',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A/B/C/D/E/F/G/H/I=672-711' },
      ],
    },
    {
      database: 'PDB',
      id: '2M9R',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A=672-711' },
      ],
    },
    {
      database: 'PDB',
      id: '2M9S',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A=672-711' },
      ],
    },
    {
      database: 'PDB',
      id: '2MGT',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A/B=672-687' },
      ],
    },
    {
      database: 'PDB',
      id: '2MJ1',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A=688-705' },
      ],
    },
    {
      database: 'PDB',
      id: '2MPZ',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        {
          key: 'Chains',
          value:
            'A/B/C/D/E/F/G/H/I/J/K/L/M/N/O/P/Q/R/S/T/U/V/W/X/Y/Z/a=686-711',
        },
      ],
    },
    {
      database: 'PDB',
      id: '2MVX',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A/B/C/D/E/F/G/H/I/J=672-711' },
      ],
    },
    {
      database: 'PDB',
      id: '2MXU',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A/B/C/D/E/F/G/H/I/J/K/L=672-713' },
      ],
    },
    {
      database: 'PDB',
      id: '2NAO',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A/B/C/D/E/F=672-713' },
      ],
    },
    {
      database: 'PDB',
      id: '2OTK',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'C=672-711' },
      ],
    },
    {
      database: 'PDB',
      id: '2R0W',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.50 A' },
        { key: 'Chains', value: 'Q=672-679' },
      ],
    },
    {
      database: 'PDB',
      id: '2WK3',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.59 A' },
        { key: 'Chains', value: 'C/D=672-713' },
      ],
    },
    {
      database: 'PDB',
      id: '2Y29',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.30 A' },
        { key: 'Chains', value: 'A=687-692' },
      ],
    },
    {
      database: 'PDB',
      id: '2Y2A',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '1.91 A' },
        { key: 'Chains', value: 'A=687-692' },
      ],
    },
    {
      database: 'PDB',
      id: '2Y3J',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '1.99 A' },
        { key: 'Chains', value: 'A/B/C/D/E/F/G/H=701-706' },
      ],
    },
    {
      database: 'PDB',
      id: '2Y3K',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '1.90 A' },
        { key: 'Chains', value: 'A/B/C/D/E/F/G/H=706-713' },
      ],
    },
    {
      database: 'PDB',
      id: '2Y3L',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.10 A' },
        { key: 'Chains', value: 'A/B/C/G=706-713' },
      ],
    },
    {
      database: 'PDB',
      id: '3AYU',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.00 A' },
        { key: 'Chains', value: 'B=586-595' },
      ],
    },
    {
      database: 'PDB',
      id: '3BAE',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '1.59 A' },
        { key: 'Chains', value: 'A=672-699' },
      ],
    },
    {
      database: 'PDB',
      id: '3BKJ',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '1.59 A' },
        { key: 'Chains', value: 'A=672-687' },
      ],
    },
    {
      database: 'PDB',
      id: '3DXC',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.10 A' },
        { key: 'Chains', value: 'B/D=739-770' },
      ],
    },
    {
      database: 'PDB',
      id: '3DXD',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.20 A' },
        { key: 'Chains', value: 'B/D=739-770' },
      ],
    },
    {
      database: 'PDB',
      id: '3DXE',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.00 A' },
        { key: 'Chains', value: 'B/D=739-770' },
      ],
    },
    {
      database: 'PDB',
      id: '3GCI',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.04 A' },
        { key: 'Chains', value: 'P=707-713' },
      ],
    },
    {
      database: 'PDB',
      id: '3IFL',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '1.50 A' },
        { key: 'Chains', value: 'P=672-678' },
      ],
    },
    {
      database: 'PDB',
      id: '3IFN',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '1.50 A' },
        { key: 'Chains', value: 'P=672-711' },
      ],
    },
    {
      database: 'PDB',
      id: '3IFO',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.15 A' },
        { key: 'Chains', value: 'P/Q=672-678' },
      ],
    },
    {
      database: 'PDB',
      id: '3IFP',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.95 A' },
        { key: 'Chains', value: 'P/Q/R/S=672-678' },
      ],
    },
    {
      database: 'PDB',
      id: '3JQ5',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.03 A' },
        { key: 'Chains', value: 'B=672-679' },
      ],
    },
    {
      database: 'PDB',
      id: '3JQL',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '1.20 A' },
        { key: 'Chains', value: 'B=687-692' },
      ],
    },
    {
      database: 'PDB',
      id: '3JTI',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '1.80 A' },
        { key: 'Chains', value: 'B=699-706' },
      ],
    },
    {
      database: 'PDB',
      id: '3KTM',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.70 A' },
        { key: 'Chains', value: 'A/B/C/D/E/F/G/H=18-190' },
      ],
    },
    {
      database: 'PDB',
      id: '3L33',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.48 A' },
        { key: 'Chains', value: 'E/F/G/H=290-341' },
      ],
    },
    {
      database: 'PDB',
      id: '3L81',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '1.60 A' },
        { key: 'Chains', value: 'B=761-767' },
      ],
    },
    {
      database: 'PDB',
      id: '3MOQ',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.05 A' },
        { key: 'Chains', value: 'A/B/C/D=689-712' },
      ],
    },
    {
      database: 'PDB',
      id: '3MXC',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.00 A' },
        { key: 'Chains', value: 'L=754-762' },
      ],
    },
    {
      database: 'PDB',
      id: '3MXY',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.30 A' },
        { key: 'Chains', value: 'L=754-762' },
      ],
    },
    {
      database: 'PDB',
      id: '3NYJ',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '3.20 A' },
        { key: 'Chains', value: 'A=365-567' },
      ],
    },
    {
      database: 'PDB',
      id: '3NYL',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.80 A' },
        { key: 'Chains', value: 'A=365-570' },
      ],
    },
    {
      database: 'PDB',
      id: '3OVJ',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '1.80 A' },
        { key: 'Chains', value: 'A/B/C/D=687-692' },
      ],
    },
    {
      database: 'PDB',
      id: '3OW9',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '1.80 A' },
        { key: 'Chains', value: 'A/B=687-692' },
      ],
    },
    {
      database: 'PDB',
      id: '3PZZ',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '1.29 A' },
        { key: 'Chains', value: 'A/B=700-705' },
      ],
    },
    {
      database: 'PDB',
      id: '3Q2X',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '1.45 A' },
        { key: 'Chains', value: 'A=698-703' },
      ],
    },
    {
      database: 'PDB',
      id: '3SV1',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '3.30 A' },
        { key: 'Chains', value: 'D/E/F=754-767' },
      ],
    },
    {
      database: 'PDB',
      id: '3U0T',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.50 A' },
        { key: 'Chains', value: 'E/F=701-711' },
      ],
    },
    {
      database: 'PDB',
      id: '3UMH',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.00 A' },
        { key: 'Chains', value: 'A=370-575' },
      ],
    },
    {
      database: 'PDB',
      id: '3UMI',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.40 A' },
        { key: 'Chains', value: 'A=370-575' },
      ],
    },
    {
      database: 'PDB',
      id: '3UMK',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.60 A' },
        { key: 'Chains', value: 'A=370-575' },
      ],
    },
    {
      database: 'PDB',
      id: '4HIX',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.20 A' },
        { key: 'Chains', value: 'A=672-699' },
      ],
    },
    {
      database: 'PDB',
      id: '4JFN',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '1.75 A' },
        { key: 'Chains', value: 'A=23-185' },
      ],
    },
    {
      database: 'PDB',
      id: '4M1C',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '3.50 A' },
        { key: 'Chains', value: 'G/H=672-711' },
      ],
    },
    {
      database: 'PDB',
      id: '4MDR',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '1.85 A' },
        { key: 'Chains', value: 'B=758-767' },
      ],
    },
    {
      database: 'PDB',
      id: '4MVI',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '1.70 A' },
        { key: 'Chains', value: 'B=672-711' },
      ],
    },
    {
      database: 'PDB',
      id: '4MVK',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '1.50 A' },
        { key: 'Chains', value: 'B=689-694' },
      ],
    },
    {
      database: 'PDB',
      id: '4MVL',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.30 A' },
        { key: 'Chains', value: 'E/F/G/H=672-711' },
      ],
    },
    {
      database: 'PDB',
      id: '4NGE',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.70 A' },
        { key: 'Chains', value: 'B/E=672-711' },
      ],
    },
    {
      database: 'PDB',
      id: '4OJF',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.00 A' },
        { key: 'Chains', value: 'A=672-679' },
      ],
    },
    {
      database: 'PDB',
      id: '4ONF',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.00 A' },
        { key: 'Chains', value: 'P=672-678' },
      ],
    },
    {
      database: 'PDB',
      id: '4ONG',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.20 A' },
        { key: 'Chains', value: 'P=672-711' },
      ],
    },
    {
      database: 'PDB',
      id: '4PQD',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '1.33 A' },
        { key: 'Chains', value: 'A=22-126' },
      ],
    },
    {
      database: 'PDB',
      id: '4PWQ',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '1.40 A' },
        { key: 'Chains', value: 'A/B=18-190' },
      ],
    },
    {
      database: 'PDB',
      id: '4XXD',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.41 A' },
        { key: 'Chains', value: 'C/F=683-699' },
      ],
    },
    {
      database: 'PDB',
      id: '5AEF',
      properties: [
        { key: 'Method', value: 'EM' },
        { key: 'Resolution', value: '5.00 A' },
        { key: 'Chains', value: 'A/B=686-713' },
      ],
    },
    {
      database: 'PDB',
      id: '5AM8',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '1.90 A' },
        { key: 'Chains', value: 'P/Q/R/S=675-681' },
      ],
    },
    {
      database: 'PDB',
      id: '5AMB',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '1.55 A' },
        { key: 'Chains', value: 'P/Q=706-713' },
      ],
    },
    {
      database: 'PDB',
      id: '5BUO',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.31 A' },
        { key: 'Chains', value: 'A/B=370-710' },
      ],
    },
    {
      database: 'PDB',
      id: '5C67',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '1.83 A' },
        { key: 'Chains', value: 'C/E=294-344' },
      ],
    },
    {
      database: 'PDB',
      id: '5CSZ',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '1.80 A' },
        { key: 'Chains', value: 'D/E=672-682' },
      ],
    },
    {
      database: 'PDB',
      id: '5HOW',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.29 A' },
        { key: 'Chains', value: 'A/B/C/D/E/F=688-705' },
      ],
    },
    {
      database: 'PDB',
      id: '5HOX',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '1.90 A' },
        { key: 'Chains', value: 'A/B/C/D/E/F=688-707' },
      ],
    },
    {
      database: 'PDB',
      id: '5HOY',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.29 A' },
        { key: 'Chains', value: 'A/B/C/D/E/F=688-707' },
      ],
    },
    {
      database: 'PDB',
      id: '5KK3',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A/B/C/D/E/F/G/H/I/J/K/L/M/N/O/P/Q/R=672-713' },
      ],
    },
    {
      database: 'PDB',
      id: '5LFY',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A/B=672-681' },
      ],
    },
    {
      database: 'PDB',
      id: '5LV0',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.70 A' },
        { key: 'Chains', value: 'C/D=706-711' },
      ],
    },
    {
      database: 'PDB',
      id: '5MY4',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.21 A' },
        { key: 'Chains', value: 'C=674-683' },
      ],
    },
    {
      database: 'PDB',
      id: '5MYO',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '1.59 A' },
        { key: 'Chains', value: 'E=674-683' },
      ],
    },
    {
      database: 'PDB',
      id: '5MYX',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '1.49 A' },
        { key: 'Chains', value: 'E/F=674-689' },
      ],
    },
    {
      database: 'PDB',
      id: '5ONP',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '1.34 A' },
        { key: 'Chains', value: 'B=700-704' },
      ],
    },
    {
      database: 'PDB',
      id: '5ONQ',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '1.17 A' },
        { key: 'Chains', value: 'B=700-704' },
      ],
    },
    {
      database: 'PDB',
      id: '5OQV',
      properties: [
        { key: 'Method', value: 'EM' },
        { key: 'Resolution', value: '4.00 A' },
        { key: 'Chains', value: 'A/B/C/D/E/F/G/H/I=672-713' },
      ],
    },
    {
      database: 'PDB',
      id: '5TXD',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '1.45 A' },
        { key: 'Chains', value: 'Z=698-703' },
      ],
    },
    {
      database: 'PDB',
      id: '5VOS',
      properties: [
        { key: 'Method', value: 'EM' },
        { key: 'Resolution', value: '1.42 A' },
        { key: 'Chains', value: 'A=695-705' },
      ],
    },
    {
      database: 'PDB',
      id: '5VZY',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.32 A' },
        { key: 'Chains', value: 'A=682-696' },
      ],
    },
    {
      database: 'PDB',
      id: '5W3P',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '1.92 A' },
        { key: 'Chains', value: 'P=672-687' },
      ],
    },
    {
      database: 'PDB',
      id: '6CO3',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.38 A' },
        { key: 'Chains', value: 'Q=672-682' },
      ],
    },
    {
      database: 'PDB',
      id: '6GFI',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.30 A' },
        { key: 'Chains', value: 'C/E=294-346' },
      ],
    },
    {
      database: 'PDB',
      id: '6ITU',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.17 A' },
        { key: 'Chains', value: 'B=755-766' },
      ],
    },
    {
      database: 'PDB',
      id: '6IYC',
      properties: [
        { key: 'Method', value: 'EM' },
        { key: 'Resolution', value: '2.60 A' },
        { key: 'Chains', value: 'E=688-770' },
      ],
    },
    {
      database: 'PDB',
      id: '6NB9',
      properties: [
        { key: 'Method', value: 'EM' },
        { key: 'Resolution', value: '1.05 A' },
        { key: 'Chains', value: 'A=691-705' },
      ],
    },
    {
      database: 'PDB',
      id: '6O4J',
      properties: [
        { key: 'Method', value: 'EM' },
        { key: 'Resolution', value: '1.40 A' },
        { key: 'Chains', value: 'A/B=687-697' },
      ],
    },
    {
      database: 'PDB',
      id: '6OC9',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A/B/C/D/E/F/G/H/I/J=672-711' },
      ],
    },
    {
      database: 'PDB',
      id: '6OIZ',
      properties: [
        { key: 'Method', value: 'EM' },
        { key: 'Resolution', value: '1.10 A' },
        { key: 'Chains', value: 'A=691-705' },
      ],
    },
    {
      database: 'PDB',
      id: '6RHY',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A/B/C/D=672-713' },
      ],
    },
    {
      database: 'PDB',
      id: '6SHS',
      properties: [
        { key: 'Method', value: 'EM' },
        { key: 'Resolution', value: '4.40 A' },
        { key: 'Chains', value: 'A/B/C/D/E/F/G/H/I/J/K/L=672-711' },
      ],
    },
    {
      database: 'PDB',
      id: '6SZF',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A=672-713' },
      ],
    },
    {
      database: 'PDB',
      id: '6TI5',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A/B/C/D/E/F/G/H/I/J/K/L/M/N/O/P=672-711' },
      ],
    },
    {
      database: 'PDB',
      id: '6TI6',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        {
          key: 'Chains',
          value: 'A/C/E/G/I/K/M/O=672-711, B/D/F/H/J/L/N/P=672-713',
        },
      ],
    },
    {
      database: 'PDB',
      id: '6TI7',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        {
          key: 'Chains',
          value: 'A/C/E/G/J/L/N/P=672-711, B/D/F/H/I/K/M/O=672-713',
        },
      ],
    },
    {
      database: 'PDB',
      id: '6W0O',
      properties: [
        { key: 'Method', value: 'Other' },
        { key: 'Resolution', value: '2.77 A' },
        { key: 'Chains', value: '1/2/3/4/5/6=672-711' },
      ],
    },
    {
      database: 'PDB',
      id: '6WXM',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.30 A' },
        { key: 'Chains', value: 'A/B/C/D/E/F/G/H/I/J/K=685-706' },
      ],
    },
    {
      database: 'PDB',
      id: '6YHF',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A=697-726' },
      ],
    },
    {
      database: 'PDB',
      id: '6YHI',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A=697-726' },
      ],
    },
    {
      database: 'PDB',
      id: '6YHO',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A=697-726' },
      ],
    },
    {
      database: 'PDB',
      id: '6YHP',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A=697-726' },
      ],
    },
    {
      database: 'PDB',
      id: '6YHX',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A=697-726' },
      ],
    },
    {
      database: 'PDB',
      id: '7B3J',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A=672-726' },
      ],
    },
    {
      database: 'PDB',
      id: '7B3K',
      properties: [
        { key: 'Method', value: 'NMR' },
        { key: 'Resolution', value: '-' },
        { key: 'Chains', value: 'A=672-726' },
      ],
    },
    {
      database: 'PDB',
      id: '7JXN',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.00 A' },
        { key: 'Chains', value: 'A/B/C/D=686-706' },
      ],
    },
    {
      database: 'PDB',
      id: '7JXO',
      properties: [
        { key: 'Method', value: 'X-ray' },
        { key: 'Resolution', value: '2.81 A' },
        { key: 'Chains', value: 'A/B/C=686-706' },
      ],
    },
    {
      database: 'PDBsum',
      id: '1AAP',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '1AMB',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '1AMC',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '1AML',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '1BA4',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '1BA6',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '1BJB',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '1BJC',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '1BRC',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '1CA0',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '1HZ3',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '1IYT',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '1MWP',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '1OWT',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '1QCM',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '1QWP',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '1QXC',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '1QYT',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '1TAW',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '1TKN',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '1UO7',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '1UO8',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '1UOA',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '1UOI',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '1X11',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '1Z0Q',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '1ZE7',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '1ZE9',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '1ZJD',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '2BEG',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '2BOM',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '2BP4',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '2FJZ',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '2FK1',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '2FK2',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '2FK3',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '2FKL',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '2FMA',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '2G47',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '2IPU',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '2LFM',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '2LLM',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '2LMN',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '2LMO',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '2LMP',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '2LMQ',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '2LNQ',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '2LOH',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '2LP1',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '2LZ3',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '2LZ4',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '2M4J',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '2M9R',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '2M9S',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '2MGT',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '2MJ1',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '2MPZ',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '2MVX',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '2MXU',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '2NAO',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '2OTK',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '2R0W',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '2WK3',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '2Y29',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '2Y2A',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '2Y3J',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '2Y3K',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '2Y3L',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '3AYU',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '3BAE',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '3BKJ',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '3DXC',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '3DXD',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '3DXE',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '3GCI',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '3IFL',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '3IFN',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '3IFO',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '3IFP',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '3JQ5',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '3JQL',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '3JTI',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '3KTM',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '3L33',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '3L81',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '3MOQ',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '3MXC',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '3MXY',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '3NYJ',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '3NYL',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '3OVJ',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '3OW9',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '3PZZ',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '3Q2X',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '3SV1',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '3U0T',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '3UMH',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '3UMI',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '3UMK',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '4HIX',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '4JFN',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '4M1C',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '4MDR',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '4MVI',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '4MVK',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '4MVL',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '4NGE',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '4OJF',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '4ONF',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '4ONG',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '4PQD',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '4PWQ',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '4XXD',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '5AEF',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '5AM8',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '5AMB',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '5BUO',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '5C67',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '5CSZ',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '5HOW',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '5HOX',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '5HOY',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '5KK3',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '5LFY',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '5LV0',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '5MY4',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '5MYO',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '5MYX',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '5ONP',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '5ONQ',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '5OQV',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '5TXD',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '5VOS',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '5VZY',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '5W3P',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '6CO3',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '6GFI',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '6ITU',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '6IYC',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '6NB9',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '6O4J',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '6OC9',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '6OIZ',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '6RHY',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '6SHS',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '6SZF',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '6TI5',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '6TI6',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '6TI7',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '6W0O',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '6WXM',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '6YHF',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '6YHI',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '6YHO',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '6YHP',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '6YHX',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '7B3J',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '7B3K',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '7JXN',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PDBsum',
      id: '7JXO',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'BMRB',
      id: 'P05067',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PCDDB',
      id: 'P05067',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'SMR',
      id: 'P05067',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'BioGRID',
      id: '106848',
      properties: [{ key: 'Interactions', value: '2234' }],
    },
    {
      database: 'ComplexPortal',
      id: 'CPX-1062',
      properties: [
        { key: 'EntryName', value: 'Amyloid-beta protein 40/42 complex' },
      ],
    },
    {
      database: 'ComplexPortal',
      id: 'CPX-1069',
      properties: [
        { key: 'EntryName', value: 'Amyloid-beta protein 40 complex' },
      ],
    },
    {
      database: 'ComplexPortal',
      id: 'CPX-1070',
      properties: [
        { key: 'EntryName', value: 'Amyloid-beta protein 42 complex' },
      ],
    },
    {
      database: 'ComplexPortal',
      id: 'CPX-1120',
      properties: [
        {
          key: 'EntryName',
          value: 'Amyloid-beta protein 40/42 oligomeric complex',
        },
      ],
    },
    {
      database: 'ComplexPortal',
      id: 'CPX-1134',
      properties: [
        {
          key: 'EntryName',
          value: 'Amyloid-beta protein 42 oligomeric complex',
        },
      ],
    },
    {
      database: 'ComplexPortal',
      id: 'CPX-1180',
      properties: [
        {
          key: 'EntryName',
          value: 'Amyloid-beta protein 40 oligomeric complex',
        },
      ],
    },
    {
      database: 'CORUM',
      id: 'P05067',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'DIP',
      id: 'DIP-574N',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'ELM',
      id: 'P05067',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'IntAct',
      id: 'P05067',
      properties: [{ key: 'Interactions', value: '856' }],
    },
    {
      database: 'MINT',
      id: 'P05067',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'STRING',
      id: '9606.ENSP00000284981',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'BindingDB',
      id: 'P05067',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'ChEMBL',
      id: 'CHEMBL2487',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'DrugBank',
      id: 'DB01370',
      properties: [{ key: 'GenericName', value: 'Aluminium' }],
    },
    {
      database: 'DrugBank',
      id: 'DB14517',
      properties: [{ key: 'GenericName', value: 'Aluminium phosphate' }],
    },
    {
      database: 'DrugBank',
      id: 'DB14518',
      properties: [{ key: 'GenericName', value: 'Aluminum acetate' }],
    },
    {
      database: 'DrugBank',
      id: 'DB05150',
      properties: [{ key: 'GenericName', value: 'CAD106' }],
    },
    {
      database: 'DrugBank',
      id: 'DB09130',
      properties: [{ key: 'GenericName', value: 'Copper' }],
    },
    {
      database: 'DrugBank',
      id: 'DB00746',
      properties: [{ key: 'GenericName', value: 'Deferoxamine' }],
    },
    {
      database: 'DrugBank',
      id: 'DB06782',
      properties: [{ key: 'GenericName', value: 'Dimercaprol' }],
    },
    {
      database: 'DrugBank',
      id: 'DB05938',
      properties: [{ key: 'GenericName', value: 'Edonerpic' }],
    },
    {
      database: 'DrugBank',
      id: 'DB09148',
      properties: [{ key: 'GenericName', value: 'Florbetaben (18F)' }],
    },
    {
      database: 'DrugBank',
      id: 'DB09149',
      properties: [{ key: 'GenericName', value: 'Florbetapir (18F)' }],
    },
    {
      database: 'DrugBank',
      id: 'DB09151',
      properties: [{ key: 'GenericName', value: 'Flutemetamol (18F)' }],
    },
    {
      database: 'DrugBank',
      id: 'DB02235',
      properties: [{ key: 'GenericName', value: 'L-methionine (R)-S-oxide' }],
    },
    {
      database: 'DrugBank',
      id: 'DB05846',
      properties: [{ key: 'GenericName', value: 'Mito-4509' }],
    },
    {
      database: 'DrugBank',
      id: 'DB04892',
      properties: [{ key: 'GenericName', value: 'Phenserine' }],
    },
    {
      database: 'DrugBank',
      id: 'DB02709',
      properties: [{ key: 'GenericName', value: 'Resveratrol' }],
    },
    {
      database: 'DrugBank',
      id: 'DB05088',
      properties: [{ key: 'GenericName', value: 'Tetrathiomolybdate' }],
    },
    {
      database: 'DrugBank',
      id: 'DB03754',
      properties: [{ key: 'GenericName', value: 'Tromethamine' }],
    },
    {
      database: 'DrugBank',
      id: 'DB01593',
      properties: [{ key: 'GenericName', value: 'Zinc' }],
    },
    {
      database: 'DrugBank',
      id: 'DB14487',
      properties: [{ key: 'GenericName', value: 'Zinc acetate' }],
    },
    {
      database: 'DrugBank',
      id: 'DB14533',
      properties: [{ key: 'GenericName', value: 'Zinc chloride' }],
    },
    {
      database: 'DrugBank',
      id: 'DB14548',
      properties: [
        { key: 'GenericName', value: 'Zinc sulfate, unspecified form' },
      ],
    },
    {
      database: 'DrugCentral',
      id: 'P05067',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'MEROPS',
      id: 'I02.015',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'TCDB',
      id: '1.C.50.1.2',
      properties: [
        {
          key: 'FamilyName',
          value: 'the amyloid Beta-protein peptide (aBetapp) family',
        },
      ],
    },
    {
      database: 'GlyConnect',
      id: '49',
      properties: [{ key: 'glycosylation', value: '2 N-Linked glycans' }],
    },
    {
      database: 'GlyGen',
      id: 'P05067',
      properties: [
        { key: 'Description', value: '16 sites, 4 O-linked glycans (7 sites)' },
      ],
    },
    {
      database: 'iPTMnet',
      id: 'P05067',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'MetOSite',
      id: 'P05067',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PhosphoSitePlus',
      id: 'P05067',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'SwissPalm',
      id: 'P05067',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'BioMuta',
      id: 'APP',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'DMDM',
      id: '112927',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'SWISS-2DPAGE',
      id: 'P05067',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'EPD',
      id: 'P05067',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'jPOST',
      id: 'P05067',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'MassIVE',
      id: 'P05067',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'MaxQB',
      id: 'P05067',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PaxDb',
      id: 'P05067',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PeptideAtlas',
      id: 'P05067',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PRIDE',
      id: 'P05067',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'ProteomicsDB',
      id: '4307',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'ProteomicsDB',
      id: '51774',
      properties: [{ key: 'Description', value: '-' }],
      isoformId: 'P05067-1',
    },
    {
      database: 'ProteomicsDB',
      id: '51775',
      properties: [{ key: 'Description', value: '-' }],
      isoformId: 'P05067-10',
    },
    {
      database: 'ProteomicsDB',
      id: '51776',
      properties: [{ key: 'Description', value: '-' }],
      isoformId: 'P05067-2',
    },
    {
      database: 'ProteomicsDB',
      id: '51777',
      properties: [{ key: 'Description', value: '-' }],
      isoformId: 'P05067-3',
    },
    {
      database: 'ProteomicsDB',
      id: '51778',
      properties: [{ key: 'Description', value: '-' }],
      isoformId: 'P05067-4',
    },
    {
      database: 'ProteomicsDB',
      id: '51779',
      properties: [{ key: 'Description', value: '-' }],
      isoformId: 'P05067-5',
    },
    {
      database: 'ProteomicsDB',
      id: '51780',
      properties: [{ key: 'Description', value: '-' }],
      isoformId: 'P05067-6',
    },
    {
      database: 'ProteomicsDB',
      id: '51781',
      properties: [{ key: 'Description', value: '-' }],
      isoformId: 'P05067-7',
    },
    {
      database: 'ProteomicsDB',
      id: '51782',
      properties: [{ key: 'Description', value: '-' }],
      isoformId: 'P05067-8',
    },
    {
      database: 'ProteomicsDB',
      id: '51783',
      properties: [{ key: 'Description', value: '-' }],
      isoformId: 'P05067-9',
    },
    {
      database: 'ABCD',
      id: 'P05067',
      properties: [{ key: 'Description', value: '41 sequenced antibodies' }],
    },
    {
      database: 'Antibodypedia',
      id: '668',
      properties: [{ key: 'antibodies', value: '4156 antibodies' }],
    },
    {
      database: 'DNASU',
      id: '351',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'Ensembl',
      id: 'ENST00000346798',
      properties: [
        { key: 'ProteinId', value: 'ENSP00000284981' },
        { key: 'GeneId', value: 'ENSG00000142192' },
      ],
      isoformId: 'P05067-1',
    },
    {
      database: 'Ensembl',
      id: 'ENST00000348990',
      properties: [
        { key: 'ProteinId', value: 'ENSP00000345463' },
        { key: 'GeneId', value: 'ENSG00000142192' },
      ],
      isoformId: 'P05067-4',
    },
    {
      database: 'Ensembl',
      id: 'ENST00000354192',
      properties: [
        { key: 'ProteinId', value: 'ENSP00000346129' },
        { key: 'GeneId', value: 'ENSG00000142192' },
      ],
      isoformId: 'P05067-10',
    },
    {
      database: 'Ensembl',
      id: 'ENST00000357903',
      properties: [
        { key: 'ProteinId', value: 'ENSP00000350578' },
        { key: 'GeneId', value: 'ENSG00000142192' },
      ],
      isoformId: 'P05067-8',
    },
    {
      database: 'Ensembl',
      id: 'ENST00000358918',
      properties: [
        { key: 'ProteinId', value: 'ENSP00000351796' },
        { key: 'GeneId', value: 'ENSG00000142192' },
      ],
      isoformId: 'P05067-9',
    },
    {
      database: 'Ensembl',
      id: 'ENST00000440126',
      properties: [
        { key: 'ProteinId', value: 'ENSP00000387483' },
        { key: 'GeneId', value: 'ENSG00000142192' },
      ],
      isoformId: 'P05067-11',
    },
    {
      database: 'GeneID',
      id: '351',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'KEGG',
      id: 'hsa:351',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'UCSC',
      id: 'uc002ylz.4',
      properties: [{ key: 'OrganismName', value: 'human' }],
      isoformId: 'P05067-1',
    },
    {
      database: 'CTD',
      id: '351',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'DisGeNET',
      id: '351',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'GeneCards',
      id: 'APP',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'HGNC',
      id: 'HGNC:620',
      properties: [{ key: 'GeneName', value: 'APP' }],
    },
    {
      database: 'HPA',
      id: 'ENSG00000142192',
      properties: [{ key: 'Description', value: 'Low tissue specificity' }],
    },
    {
      database: 'MalaCards',
      id: 'APP',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'MIM',
      id: '104300',
      properties: [{ key: 'Type', value: 'phenotype' }],
    },
    {
      database: 'MIM',
      id: '104760',
      properties: [{ key: 'Type', value: 'gene' }],
    },
    {
      database: 'MIM',
      id: '605714',
      properties: [{ key: 'Type', value: 'phenotype' }],
    },
    {
      database: 'neXtProt',
      id: 'NX_P05067',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'NIAGADS',
      id: 'ENSG00000142192',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'OpenTargets',
      id: 'ENSG00000142192',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'Orphanet',
      id: '324723',
      properties: [{ key: 'Disease', value: 'ABeta amyloidosis, Arctic type' }],
    },
    {
      database: 'Orphanet',
      id: '100006',
      properties: [{ key: 'Disease', value: 'ABeta amyloidosis, Dutch type' }],
    },
    {
      database: 'Orphanet',
      id: '324708',
      properties: [{ key: 'Disease', value: 'ABeta amyloidosis, Iowa type' }],
    },
    {
      database: 'Orphanet',
      id: '324713',
      properties: [
        { key: 'Disease', value: 'ABeta amyloidosis, Italian type' },
      ],
    },
    {
      database: 'Orphanet',
      id: '324718',
      properties: [{ key: 'Disease', value: 'ABetaA21G amyloidosis' }],
    },
    {
      database: 'Orphanet',
      id: '324703',
      properties: [{ key: 'Disease', value: 'ABetaL34V amyloidosis' }],
    },
    {
      database: 'Orphanet',
      id: '1020',
      properties: [
        {
          key: 'Disease',
          value: 'Early-onset autosomal dominant Alzheimer disease',
        },
      ],
    },
    {
      database: 'PharmGKB',
      id: 'PA24910',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'VEuPathDB',
      id: 'HostDB:ENSG00000142192.20',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'eggNOG',
      id: 'KOG3540',
      properties: [{ key: 'ToxonomicScope', value: 'Eukaryota' }],
    },
    {
      database: 'GeneTree',
      id: 'ENSGT00530000063252',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'InParanoid',
      id: 'P05067',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'OMA',
      id: 'WSELEDR',
      properties: [{ key: 'Fingerprint', value: '-' }],
    },
    {
      database: 'PhylomeDB',
      id: 'P05067',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'TreeFam',
      id: 'TF317274',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'BioCyc',
      id: 'MetaCyc:ENSG00000142192-MONOMER',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'PathwayCommons',
      id: 'P05067',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'Reactome',
      id: 'R-HSA-114608',
      properties: [{ key: 'PathwayName', value: 'Platelet degranulation' }],
    },
    {
      database: 'Reactome',
      id: 'R-HSA-3000178',
      properties: [{ key: 'PathwayName', value: 'ECM proteoglycans' }],
    },
    {
      database: 'Reactome',
      id: 'R-HSA-381426',
      properties: [
        {
          key: 'PathwayName',
          value:
            'Regulation of Insulin-like Growth Factor (IGF) transport and uptake by Insulin-like Growth Factor Binding Proteins (IGFBPs)',
        },
      ],
    },
    {
      database: 'Reactome',
      id: 'R-HSA-416476',
      properties: [
        { key: 'PathwayName', value: 'G alpha (q) signalling events' },
      ],
    },
    {
      database: 'Reactome',
      id: 'R-HSA-418594',
      properties: [
        { key: 'PathwayName', value: 'G alpha (i) signalling events' },
      ],
    },
    {
      database: 'Reactome',
      id: 'R-HSA-432720',
      properties: [
        { key: 'PathwayName', value: 'Lysosome Vesicle Biogenesis' },
      ],
    },
    {
      database: 'Reactome',
      id: 'R-HSA-444473',
      properties: [
        {
          key: 'PathwayName',
          value:
            'Formyl peptide receptors bind formyl peptides and many other ligands',
        },
      ],
    },
    {
      database: 'Reactome',
      id: 'R-HSA-445989',
      properties: [
        {
          key: 'PathwayName',
          value:
            'TAK1 activates NFkB by phosphorylation and activation of IKKs complex',
        },
      ],
    },
    {
      database: 'Reactome',
      id: 'R-HSA-844456',
      properties: [{ key: 'PathwayName', value: 'The NLRP3 inflammasome' }],
    },
    {
      database: 'Reactome',
      id: 'R-HSA-879415',
      properties: [
        {
          key: 'PathwayName',
          value: 'Advanced glycosylation endproduct receptor signaling',
        },
      ],
    },
    {
      database: 'Reactome',
      id: 'R-HSA-8862803',
      properties: [
        {
          key: 'PathwayName',
          value:
            "Deregulated CDK5 triggers multiple neurodegenerative pathways in Alzheimer's disease models",
        },
      ],
    },
    {
      database: 'Reactome',
      id: 'R-HSA-8957275',
      properties: [
        {
          key: 'PathwayName',
          value: 'Post-translational protein phosphorylation',
        },
      ],
    },
    {
      database: 'Reactome',
      id: 'R-HSA-933542',
      properties: [
        { key: 'PathwayName', value: 'TRAF6 mediated NF-kB activation' },
      ],
    },
    {
      database: 'Reactome',
      id: 'R-HSA-9609523',
      properties: [
        {
          key: 'PathwayName',
          value:
            'Insertion of tail-anchored proteins into the endoplasmic reticulum membrane',
        },
      ],
    },
    {
      database: 'Reactome',
      id: 'R-HSA-9660826',
      properties: [
        {
          key: 'PathwayName',
          value: 'Purinergic signaling in leishmaniasis infection',
        },
      ],
    },
    {
      database: 'Reactome',
      id: 'R-HSA-977225',
      properties: [{ key: 'PathwayName', value: 'Amyloid fiber formation' }],
    },
    {
      database: 'SABIO-RK',
      id: 'P05067',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'SIGNOR',
      id: 'P05067',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'BioGRID-ORCS',
      id: '351',
      properties: [{ key: 'hits', value: '7 hits in 995 CRISPR screens' }],
    },
    {
      database: 'ChiTaRS',
      id: 'APP',
      properties: [{ key: 'OrganismName', value: 'human' }],
    },
    {
      database: 'EvolutionaryTrace',
      id: 'P05067',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'GeneWiki',
      id: 'Amyloid_precursor_protein',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'GenomeRNAi',
      id: '351',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'Pharos',
      id: 'P05067',
      properties: [{ key: 'Description', value: 'Tchem' }],
    },
    {
      database: 'PRO',
      id: 'PR:P05067',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'Proteomes',
      id: 'UP000005640',
      properties: [{ key: 'Component', value: 'Chromosome 21' }],
    },
    {
      database: 'RNAct',
      id: 'P05067',
      properties: [{ key: 'moleculeType', value: 'protein' }],
    },
    {
      database: 'Bgee',
      id: 'ENSG00000142192',
      properties: [
        {
          key: 'ExpressionPatterns',
          value: 'Expressed in frontal cortex and 252 other tissues',
        },
      ],
    },
    {
      database: 'ExpressionAtlas',
      id: 'P05067',
      properties: [
        { key: 'ExpressionPatterns', value: 'baseline and differential' },
      ],
    },
    {
      database: 'Genevisible',
      id: 'P05067',
      properties: [{ key: 'OrganismId', value: 'HS' }],
    },
    {
      database: 'GO',
      id: 'GO:0106003',
      properties: [
        { key: 'GoTerm', value: 'C:amyloid-beta complex' },
        { key: 'GoEvidenceType', value: 'IMP:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0045177',
      properties: [
        { key: 'GoTerm', value: 'C:apical part of cell' },
        { key: 'GoEvidenceType', value: 'IEA:Ensembl' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0097449',
      properties: [
        { key: 'GoTerm', value: 'C:astrocyte projection' },
        { key: 'GoEvidenceType', value: 'IEA:Ensembl' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0030424',
      properties: [
        { key: 'GoTerm', value: 'C:axon' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
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
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '18353773' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '7593229' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0005911',
      properties: [
        { key: 'GoTerm', value: 'C:cell-cell junction' },
        { key: 'GoEvidenceType', value: 'IEA:Ensembl' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0035253',
      properties: [
        { key: 'GoTerm', value: 'C:ciliary rootlet' },
        { key: 'GoEvidenceType', value: 'IEA:Ensembl' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0005905',
      properties: [
        { key: 'GoTerm', value: 'C:clathrin-coated pit' },
        { key: 'GoEvidenceType', value: 'IEA:UniProtKB-SubCell' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0030134',
      properties: [
        {
          key: 'GoTerm',
          value: 'C:COPII-coated ER to Golgi transport vesicle',
        },
        { key: 'GoEvidenceType', value: 'IEA:Ensembl' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0005737',
      properties: [
        { key: 'GoTerm', value: 'C:cytoplasm' },
        { key: 'GoEvidenceType', value: 'IDA:ARUK-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '18509662' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0005829',
      properties: [
        { key: 'GoTerm', value: 'C:cytosol' },
        { key: 'GoEvidenceType', value: 'TAS:Reactome' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0043198',
      properties: [
        { key: 'GoTerm', value: 'C:dendritic shaft' },
        { key: 'GoEvidenceType', value: 'IDA:MGI' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11988176' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0043197',
      properties: [
        { key: 'GoTerm', value: 'C:dendritic spine' },
        { key: 'GoEvidenceType', value: 'IDA:MGI' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11988176' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0005769',
      properties: [
        { key: 'GoTerm', value: 'C:early endosome' },
        { key: 'GoEvidenceType', value: 'IDA:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0005788',
      properties: [
        { key: 'GoTerm', value: 'C:endoplasmic reticulum lumen' },
        { key: 'GoEvidenceType', value: 'TAS:Reactome' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0005768',
      properties: [
        { key: 'GoTerm', value: 'C:endosome' },
        { key: 'GoEvidenceType', value: 'IDA:UniProtKB' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '18353773' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0031904',
      properties: [
        { key: 'GoTerm', value: 'C:endosome lumen' },
        { key: 'GoEvidenceType', value: 'TAS:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0070381',
      properties: [
        {
          key: 'GoTerm',
          value: 'C:endosome to plasma membrane transport vesicle',
        },
        { key: 'GoEvidenceType', value: 'IDA:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0070062',
      properties: [
        { key: 'GoTerm', value: 'C:extracellular exosome' },
        { key: 'GoEvidenceType', value: 'HDA:UniProtKB' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '19199708' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0005576',
      properties: [
        { key: 'GoTerm', value: 'C:extracellular region' },
        { key: 'GoEvidenceType', value: 'TAS:Reactome' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0005615',
      properties: [
        { key: 'GoTerm', value: 'C:extracellular space' },
        { key: 'GoEvidenceType', value: 'IDA:ARUK-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '23921129' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0005794',
      properties: [
        { key: 'GoTerm', value: 'C:Golgi apparatus' },
        { key: 'GoEvidenceType', value: 'IDA:UniProtKB' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '20427278' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0005796',
      properties: [
        { key: 'GoTerm', value: 'C:Golgi lumen' },
        { key: 'GoEvidenceType', value: 'TAS:Reactome' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0005798',
      properties: [
        { key: 'GoTerm', value: 'C:Golgi-associated vesicle' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:1990812',
      properties: [
        { key: 'GoTerm', value: 'C:growth cone filopodium' },
        { key: 'GoEvidenceType', value: 'IEA:Ensembl' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:1990761',
      properties: [
        { key: 'GoTerm', value: 'C:growth cone lamellipodium' },
        { key: 'GoEvidenceType', value: 'IEA:Ensembl' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0034364',
      properties: [
        { key: 'GoTerm', value: 'C:high-density lipoprotein particle' },
        { key: 'GoEvidenceType', value: 'IDA:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0016021',
      properties: [
        { key: 'GoTerm', value: 'C:integral component of membrane' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0005887',
      properties: [
        { key: 'GoTerm', value: 'C:integral component of plasma membrane' },
        { key: 'GoEvidenceType', value: 'TAS:ProtInc' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10806211' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0034363',
      properties: [
        { key: 'GoTerm', value: 'C:intermediate-density lipoprotein particle' },
        { key: 'GoEvidenceType', value: 'IDA:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:1990777',
      properties: [
        { key: 'GoTerm', value: 'C:lipoprotein particle' },
        { key: 'GoEvidenceType', value: 'IDA:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0044304',
      properties: [
        { key: 'GoTerm', value: 'C:main axon' },
        { key: 'GoEvidenceType', value: 'IEA:Ensembl' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0016020',
      properties: [
        { key: 'GoTerm', value: 'C:membrane' },
        { key: 'GoEvidenceType', value: 'IDA:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0045121',
      properties: [
        { key: 'GoTerm', value: 'C:membrane raft' },
        { key: 'GoEvidenceType', value: 'IDA:ParkinsonsUK-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '24499793' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0005739',
      properties: [
        { key: 'GoTerm', value: 'C:mitochondrion' },
        { key: 'GoEvidenceType', value: 'IDA:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0031594',
      properties: [
        { key: 'GoTerm', value: 'C:neuromuscular junction' },
        { key: 'GoEvidenceType', value: 'IEA:Ensembl' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0005641',
      properties: [
        { key: 'GoTerm', value: 'C:nuclear envelope lumen' },
        {
          key: 'GoEvidenceType',
          value: 'IDA:Alzheimers_University_of_Toronto',
        },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '21989385' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0005634',
      properties: [
        { key: 'GoTerm', value: 'C:nucleus' },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0043204',
      properties: [
        { key: 'GoTerm', value: 'C:perikaryon' },
        { key: 'GoEvidenceType', value: 'IEA:UniProtKB-SubCell' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0048471',
      properties: [
        { key: 'GoTerm', value: 'C:perinuclear region of cytoplasm' },
        { key: 'GoEvidenceType', value: 'IDA:UniProtKB' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '20427278' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0005886',
      properties: [
        { key: 'GoTerm', value: 'C:plasma membrane' },
        { key: 'GoEvidenceType', value: 'IDA:ARUK-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '20427278' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '28164773' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '28855300' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0031093',
      properties: [
        { key: 'GoTerm', value: 'C:platelet alpha granule lumen' },
        { key: 'GoEvidenceType', value: 'TAS:Reactome' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0048786',
      properties: [
        { key: 'GoTerm', value: 'C:presynaptic active zone' },
        { key: 'GoEvidenceType', value: 'IEA:Ensembl' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0032991',
      properties: [
        { key: 'GoTerm', value: 'C:protein-containing complex' },
        { key: 'GoEvidenceType', value: 'IDA:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0043235',
      properties: [
        { key: 'GoTerm', value: 'C:receptor complex' },
        { key: 'GoEvidenceType', value: 'IDA:MGI' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '23382219' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0055037',
      properties: [
        { key: 'GoTerm', value: 'C:recycling endosome' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0005791',
      properties: [
        { key: 'GoTerm', value: 'C:rough endoplasmic reticulum' },
        { key: 'GoEvidenceType', value: 'IEA:Ensembl' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0005790',
      properties: [
        { key: 'GoTerm', value: 'C:smooth endoplasmic reticulum' },
        { key: 'GoEvidenceType', value: 'IEA:GOC' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0051233',
      properties: [
        { key: 'GoTerm', value: 'C:spindle midzone' },
        { key: 'GoEvidenceType', value: 'IEA:Ensembl' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0045202',
      properties: [
        { key: 'GoTerm', value: 'C:synapse' },
        { key: 'GoEvidenceType', value: 'IDA:MGI' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11988176' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0008021',
      properties: [
        { key: 'GoTerm', value: 'C:synaptic vesicle' },
        { key: 'GoEvidenceType', value: 'IEA:Ensembl' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0032588',
      properties: [
        { key: 'GoTerm', value: 'C:trans-Golgi network membrane' },
        { key: 'GoEvidenceType', value: 'TAS:Reactome' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0030549',
      properties: [
        { key: 'GoTerm', value: 'F:acetylcholine receptor activator activity' },
        { key: 'GoEvidenceType', value: 'TAS:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0033130',
      properties: [
        { key: 'GoTerm', value: 'F:acetylcholine receptor binding' },
        { key: 'GoEvidenceType', value: 'IPI:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0097645',
      properties: [
        { key: 'GoTerm', value: 'F:amylin binding' },
        { key: 'GoEvidenceType', value: 'TAS:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0034185',
      properties: [
        { key: 'GoTerm', value: 'F:apolipoprotein binding' },
        { key: 'GoEvidenceType', value: 'IPI:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0051087',
      properties: [
        { key: 'GoTerm', value: 'F:chaperone binding' },
        { key: 'GoEvidenceType', value: 'IPI:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0042056',
      properties: [
        { key: 'GoTerm', value: 'F:chemoattractant activity' },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0003682',
      properties: [
        { key: 'GoTerm', value: 'F:chromatin binding' },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0003677',
      properties: [
        { key: 'GoTerm', value: 'F:DNA binding' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0019899',
      properties: [
        { key: 'GoTerm', value: 'F:enzyme binding' },
        { key: 'GoEvidenceType', value: 'IPI:ARUK-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '17112471' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '24499793' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0046875',
      properties: [
        { key: 'GoTerm', value: 'F:ephrin receptor binding' },
        { key: 'GoEvidenceType', value: 'IPI:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0005109',
      properties: [
        { key: 'GoTerm', value: 'F:frizzled binding' },
        { key: 'GoEvidenceType', value: 'IPI:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0001664',
      properties: [
        { key: 'GoTerm', value: 'F:G protein-coupled receptor binding' },
        { key: 'GoEvidenceType', value: 'IPI:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0070851',
      properties: [
        { key: 'GoTerm', value: 'F:growth factor receptor binding' },
        { key: 'GoEvidenceType', value: 'IEA:Ensembl' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:1904399',
      properties: [
        { key: 'GoTerm', value: 'F:heparan sulfate binding' },
        { key: 'GoEvidenceType', value: 'TAS:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0043395',
      properties: [
        { key: 'GoTerm', value: 'F:heparan sulfate proteoglycan binding' },
        { key: 'GoEvidenceType', value: 'IMP:ARUK-UCL' },
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
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '16286452' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '18805418' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '19549187' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '19754881' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '20573181' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '20818335' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '21113149' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '21205198' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '21320494' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '21527912' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '22200570' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '22584060' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '23103738' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '23353684' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '23416305' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '23551356' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '23603391' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '23907009' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '24065130' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '24720730' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '28882996' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0005158',
      properties: [
        { key: 'GoTerm', value: 'F:insulin receptor binding' },
        { key: 'GoEvidenceType', value: 'IPI:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0005178',
      properties: [
        { key: 'GoTerm', value: 'F:integrin binding' },
        { key: 'GoEvidenceType', value: 'IDA:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0050750',
      properties: [
        {
          key: 'GoTerm',
          value: 'F:low-density lipoprotein particle receptor binding',
        },
        { key: 'GoEvidenceType', value: 'ISS:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0016504',
      properties: [
        { key: 'GoTerm', value: 'F:peptidase activator activity' },
        { key: 'GoEvidenceType', value: 'IEA:Ensembl' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0046983',
      properties: [
        { key: 'GoTerm', value: 'F:protein dimerization activity' },
        { key: 'GoEvidenceType', value: 'IDA:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0046982',
      properties: [
        { key: 'GoTerm', value: 'F:protein heterodimerization activity' },
        { key: 'GoEvidenceType', value: 'IPI:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0042803',
      properties: [
        { key: 'GoTerm', value: 'F:protein homodimerization activity' },
        { key: 'GoEvidenceType', value: 'IDA:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0051425',
      properties: [
        { key: 'GoTerm', value: 'F:PTB domain binding' },
        { key: 'GoEvidenceType', value: 'IPI:BHF-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '12805363' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0050786',
      properties: [
        { key: 'GoTerm', value: 'F:RAGE receptor binding' },
        { key: 'GoEvidenceType', value: 'IPI:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0000978',
      properties: [
        {
          key: 'GoTerm',
          value:
            'F:RNA polymerase II cis-regulatory region sequence-specific DNA binding',
        },
        { key: 'GoEvidenceType', value: 'IEA:Ensembl' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0004867',
      properties: [
        {
          key: 'GoTerm',
          value: 'F:serine-type endopeptidase inhibitor activity',
        },
        { key: 'GoEvidenceType', value: 'IDA:UniProtKB' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '10652580' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0030546',
      properties: [
        { key: 'GoTerm', value: 'F:signaling receptor activator activity' },
        { key: 'GoEvidenceType', value: 'IDA:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0005102',
      properties: [
        { key: 'GoTerm', value: 'F:signaling receptor binding' },
        { key: 'GoEvidenceType', value: 'IPI:ARUK-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '19849849' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0046914',
      properties: [
        { key: 'GoTerm', value: 'F:transition metal ion binding' },
        { key: 'GoEvidenceType', value: 'IEA:InterPro' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0000187',
      properties: [
        { key: 'GoTerm', value: 'P:activation of MAPK activity' },
        { key: 'GoEvidenceType', value: 'ISS:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0000185',
      properties: [
        { key: 'GoTerm', value: 'P:activation of MAPKKK activity' },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0007189',
      properties: [
        {
          key: 'GoTerm',
          value:
            'P:adenylate cyclase-activating G protein-coupled receptor signaling pathway',
        },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0007193',
      properties: [
        {
          key: 'GoTerm',
          value:
            'P:adenylate cyclase-inhibiting G protein-coupled receptor signaling pathway',
        },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0008344',
      properties: [
        { key: 'GoTerm', value: 'P:adult locomotory behavior' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:1990000',
      properties: [
        { key: 'GoTerm', value: 'P:amyloid fibril formation' },
        { key: 'GoEvidenceType', value: 'IMP:ParkinsonsUK-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '25620700' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0019731',
      properties: [
        { key: 'GoTerm', value: 'P:antibacterial humoral response' },
        { key: 'GoEvidenceType', value: 'IDA:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0019732',
      properties: [
        { key: 'GoTerm', value: 'P:antifungal humoral response' },
        { key: 'GoEvidenceType', value: 'IMP:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0061844',
      properties: [
        {
          key: 'GoTerm',
          value:
            'P:antimicrobial humoral immune response mediated by antimicrobial peptide',
        },
        { key: 'GoEvidenceType', value: 'IMP:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0008306',
      properties: [
        { key: 'GoTerm', value: 'P:associative learning' },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0048143',
      properties: [
        { key: 'GoTerm', value: 'P:astrocyte activation' },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '15457210' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '20445063' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0002265',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:astrocyte activation involved in immune response',
        },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '23152628' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0008088',
      properties: [
        { key: 'GoTerm', value: 'P:axo-dendritic transport' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0016199',
      properties: [
        { key: 'GoTerm', value: 'P:axon midline choice point recognition' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
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
      id: 'GO:0019722',
      properties: [
        { key: 'GoTerm', value: 'P:calcium-mediated signaling' },
        { key: 'GoEvidenceType', value: 'IDA:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0007155',
      properties: [
        { key: 'GoTerm', value: 'P:cell adhesion' },
        { key: 'GoEvidenceType', value: 'IEA:UniProtKB-KW' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0006878',
      properties: [
        { key: 'GoTerm', value: 'P:cellular copper ion homeostasis' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0009987',
      properties: [
        { key: 'GoTerm', value: 'P:cellular process' },
        { key: 'GoEvidenceType', value: 'IMP:ParkinsonsUK-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '25620700' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0044267',
      properties: [
        { key: 'GoTerm', value: 'P:cellular protein metabolic process' },
        { key: 'GoEvidenceType', value: 'TAS:Reactome' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:1904646',
      properties: [
        { key: 'GoTerm', value: 'P:cellular response to amyloid-beta' },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '23152628' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0071320',
      properties: [
        { key: 'GoTerm', value: 'P:cellular response to cAMP' },
        { key: 'GoEvidenceType', value: 'IEA:Ensembl' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0071280',
      properties: [
        { key: 'GoTerm', value: 'P:cellular response to copper ion' },
        { key: 'GoEvidenceType', value: 'IEA:Ensembl' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0071287',
      properties: [
        { key: 'GoTerm', value: 'P:cellular response to manganese ion' },
        { key: 'GoEvidenceType', value: 'IEA:Ensembl' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:1990090',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:cellular response to nerve growth factor stimulus',
        },
        { key: 'GoEvidenceType', value: 'IEA:Ensembl' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0071874',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:cellular response to norepinephrine stimulus',
        },
        { key: 'GoEvidenceType', value: 'IEA:Ensembl' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0008203',
      properties: [
        { key: 'GoTerm', value: 'P:cholesterol metabolic process' },
        { key: 'GoEvidenceType', value: 'IEA:Ensembl' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0050890',
      properties: [
        { key: 'GoTerm', value: 'P:cognition' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0048669',
      properties: [
        { key: 'GoTerm', value: 'P:collateral sprouting in absence of injury' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0050829',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:defense response to Gram-negative bacterium',
        },
        { key: 'GoEvidenceType', value: 'IDA:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0050830',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:defense response to Gram-positive bacterium',
        },
        { key: 'GoEvidenceType', value: 'IDA:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0016358',
      properties: [
        { key: 'GoTerm', value: 'P:dendrite development' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0006897',
      properties: [
        { key: 'GoTerm', value: 'P:endocytosis' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0030198',
      properties: [
        { key: 'GoTerm', value: 'P:extracellular matrix organization' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0030900',
      properties: [
        { key: 'GoTerm', value: 'P:forebrain development' },
        { key: 'GoEvidenceType', value: 'IEA:Ensembl' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0007186',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:G protein-coupled receptor signaling pathway',
        },
        { key: 'GoEvidenceType', value: 'IDA:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0045087',
      properties: [
        { key: 'GoTerm', value: 'P:innate immune response' },
        { key: 'GoEvidenceType', value: 'IMP:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0035235',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:ionotropic glutamate receptor signaling pathway',
        },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0007612',
      properties: [
        { key: 'GoTerm', value: 'P:learning' },
        { key: 'GoEvidenceType', value: 'IMP:ARUK-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11140684' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0007611',
      properties: [
        { key: 'GoTerm', value: 'P:learning or memory' },
        { key: 'GoEvidenceType', value: 'IMP:ARUK-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11880515' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '15457210' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0042157',
      properties: [
        { key: 'GoTerm', value: 'P:lipoprotein metabolic process' },
        { key: 'GoEvidenceType', value: 'IC:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0007626',
      properties: [
        { key: 'GoTerm', value: 'P:locomotory behavior' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0007617',
      properties: [
        { key: 'GoTerm', value: 'P:mating behavior' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0007613',
      properties: [
        { key: 'GoTerm', value: 'P:memory' },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0014005',
      properties: [
        { key: 'GoTerm', value: 'P:microglia development' },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '22198949' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0001774',
      properties: [
        { key: 'GoTerm', value: 'P:microglial cell activation' },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '15457210' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '22406537' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0090647',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:modulation of age-related behavioral decline',
        },
        { key: 'GoEvidenceType', value: 'IMP:ARUK-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11140684' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11880515' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '15457210' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0098815',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:modulation of excitatory postsynaptic potential',
        },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '20974225' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0006378',
      properties: [
        { key: 'GoTerm', value: 'P:mRNA polyadenylation' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:1903523',
      properties: [
        { key: 'GoTerm', value: 'P:negative regulation of blood circulation' },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0090090',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:negative regulation of canonical Wnt signaling pathway',
        },
        { key: 'GoEvidenceType', value: 'IDA:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0008285',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:negative regulation of cell population proliferation',
        },
        { key: 'GoEvidenceType', value: 'IDA:UniProtKB' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '22944668' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0010629',
      properties: [
        { key: 'GoTerm', value: 'P:negative regulation of gene expression' },
        { key: 'GoEvidenceType', value: 'IDA:ARUK-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '22198949' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '27853422' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '28008308' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '29061364' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:1900272',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:negative regulation of long-term synaptic potentiation',
        },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '15457210' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '16636059' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0010823',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:negative regulation of mitochondrion organization',
        },
        { key: 'GoEvidenceType', value: 'TAS:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:1901215',
      properties: [
        { key: 'GoTerm', value: 'P:negative regulation of neuron death' },
        { key: 'GoEvidenceType', value: 'IDA:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0045665',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:negative regulation of neuron differentiation',
        },
        { key: 'GoEvidenceType', value: 'IEA:Ensembl' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:1902894',
      properties: [
        {
          key: 'GoTerm',
          value:
            'P:negative regulation of pri-miRNA transcription by RNA polymerase II',
        },
        { key: 'GoEvidenceType', value: 'IDA:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:1900181',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:negative regulation of protein localization to nucleus',
        },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
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
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0050885',
      properties: [
        { key: 'GoTerm', value: 'P:neuromuscular process controlling balance' },
        { key: 'GoEvidenceType', value: 'IEA:Ensembl' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0051402',
      properties: [
        { key: 'GoTerm', value: 'P:neuron apoptotic process' },
        { key: 'GoEvidenceType', value: 'IMP:UniProtKB' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '19225519' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0031175',
      properties: [
        { key: 'GoTerm', value: 'P:neuron projection development' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:1990535',
      properties: [
        { key: 'GoTerm', value: 'P:neuron projection maintenance' },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '20445063' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0016322',
      properties: [
        { key: 'GoTerm', value: 'P:neuron remodeling' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0007219',
      properties: [
        { key: 'GoTerm', value: 'P:Notch signaling pathway' },
        { key: 'GoEvidenceType', value: 'IEA:UniProtKB-KW' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0002576',
      properties: [
        { key: 'GoTerm', value: 'P:platelet degranulation' },
        { key: 'GoEvidenceType', value: 'TAS:Reactome' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0061903',
      properties: [
        {
          key: 'GoTerm',
          value:
            'P:positive regulation of 1-phosphatidylinositol-3-kinase activity',
        },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:1905908',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:positive regulation of amyloid fibril formation',
        },
        { key: 'GoEvidenceType', value: 'IMP:ARUK-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '19660551' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0043065',
      properties: [
        { key: 'GoTerm', value: 'P:positive regulation of apoptotic process' },
        { key: 'GoEvidenceType', value: 'IDA:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:1902961',
      properties: [
        {
          key: 'GoTerm',
          value:
            'P:positive regulation of aspartic-type endopeptidase activity involved in amyloid precursor protein catabolic process',
        },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0050867',
      properties: [
        { key: 'GoTerm', value: 'P:positive regulation of cell activation' },
        { key: 'GoEvidenceType', value: 'NAS:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:1905893',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:positive regulation of cellular response to thapsigargin',
        },
        { key: 'GoEvidenceType', value: 'IDA:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:1905896',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:positive regulation of cellular response to tunicamycin',
        },
        { key: 'GoEvidenceType', value: 'IDA:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0032722',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:positive regulation of chemokine production',
        },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '22406537' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0043280',
      properties: [
        {
          key: 'GoTerm',
          value:
            'P:positive regulation of cysteine-type endopeptidase activity involved in apoptotic process',
        },
        { key: 'GoEvidenceType', value: 'IDA:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0007204',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:positive regulation of cytosolic calcium ion concentration',
        },
        { key: 'GoEvidenceType', value: 'NAS:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0051091',
      properties: [
        {
          key: 'GoTerm',
          value:
            'P:positive regulation of DNA-binding transcription factor activity',
        },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '23921129' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:1904472',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:positive regulation of endothelin production',
        },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
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
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '15457210' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:2000463',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:positive regulation of excitatory postsynaptic potential',
        },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:1904022',
      properties: [
        {
          key: 'GoTerm',
          value:
            'P:positive regulation of G protein-coupled receptor internalization',
        },
        { key: 'GoEvidenceType', value: 'IDA:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0045745',
      properties: [
        {
          key: 'GoTerm',
          value:
            'P:positive regulation of G protein-coupled receptor signaling pathway',
        },
        { key: 'GoEvidenceType', value: 'IDA:ARUK-UCL' },
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
        { key: 'GoEvidenceType', value: 'IEA:Ensembl' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0010628',
      properties: [
        { key: 'GoTerm', value: 'P:positive regulation of gene expression' },
        { key: 'GoEvidenceType', value: 'IDA:ARUK-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '15457210' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '23164821' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0045821',
      properties: [
        { key: 'GoTerm', value: 'P:positive regulation of glycolytic process' },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '29061364' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0035066',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:positive regulation of histone acetylation',
        },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0050729',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:positive regulation of inflammatory response',
        },
        { key: 'GoEvidenceType', value: 'IMP:ARUK-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '29961672' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0032729',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:positive regulation of interferon-gamma production',
        },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0032731',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:positive regulation of interleukin-1 beta production',
        },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '22406537' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0032755',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:positive regulation of interleukin-6 production',
        },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '22406537' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0046330',
      properties: [
        { key: 'GoTerm', value: 'P:positive regulation of JNK cascade' },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '23921129' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:1900273',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:positive regulation of long-term synaptic potentiation',
        },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '20974225' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0043410',
      properties: [
        { key: 'GoTerm', value: 'P:positive regulation of MAPK cascade' },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0051044',
      properties: [
        {
          key: 'GoTerm',
          value:
            'P:positive regulation of membrane protein ectodomain proteolysis',
        },
        { key: 'GoEvidenceType', value: 'IDA:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0045931',
      properties: [
        { key: 'GoTerm', value: 'P:positive regulation of mitotic cell cycle' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0090026',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:positive regulation of monocyte chemotaxis',
        },
        { key: 'GoEvidenceType', value: 'IDA:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0043525',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:positive regulation of neuron apoptotic process',
        },
        { key: 'GoEvidenceType', value: 'IDA:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:1901216',
      properties: [
        { key: 'GoTerm', value: 'P:positive regulation of neuron death' },
        { key: 'GoEvidenceType', value: 'IDA:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0045666',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:positive regulation of neuron differentiation',
        },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0051092',
      properties: [
        {
          key: 'GoTerm',
          value:
            'P:positive regulation of NF-kappaB transcription factor activity',
        },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '15457210' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:1901224',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:positive regulation of NIK/NF-kappaB signaling',
        },
        { key: 'GoEvidenceType', value: 'IDA:ARUK-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '29961672' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0045429',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:positive regulation of nitric oxide biosynthetic process',
        },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:1903223',
      properties: [
        {
          key: 'GoTerm',
          value:
            'P:positive regulation of oxidative stress-induced neuron death',
        },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0033138',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:positive regulation of peptidyl-serine phosphorylation',
        },
        { key: 'GoEvidenceType', value: 'IMP:ARUK-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '19660551' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0010800',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:positive regulation of peptidyl-threonine phosphorylation',
        },
        { key: 'GoEvidenceType', value: 'IMP:ARUK-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '19660551' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0042327',
      properties: [
        { key: 'GoTerm', value: 'P:positive regulation of phosphorylation' },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '25707991' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0032092',
      properties: [
        { key: 'GoTerm', value: 'P:positive regulation of protein binding' },
        { key: 'GoEvidenceType', value: 'IDA:ARUK-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '24052308' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:1904591',
      properties: [
        { key: 'GoTerm', value: 'P:positive regulation of protein import' },
        { key: 'GoEvidenceType', value: 'IDA:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0010739',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:positive regulation of protein kinase A signaling',
        },
        { key: 'GoEvidenceType', value: 'NAS:ARUK-UCL' },
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
        { key: 'GoEvidenceType', value: 'NAS:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0051247',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:positive regulation of protein metabolic process',
        },
        { key: 'GoEvidenceType', value: 'IMP:ARUK-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11404397' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0001934',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:positive regulation of protein phosphorylation',
        },
        { key: 'GoEvidenceType', value: 'IDA:ARUK-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '11404397' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0061098',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:positive regulation of protein tyrosine kinase activity',
        },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:1900122',
      properties: [
        { key: 'GoTerm', value: 'P:positive regulation of receptor binding' },
        { key: 'GoEvidenceType', value: 'IDA:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:1905898',
      properties: [
        {
          key: 'GoTerm',
          value:
            'P:positive regulation of response to endoplasmic reticulum stress',
        },
        { key: 'GoEvidenceType', value: 'IDA:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0032930',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:positive regulation of superoxide anion generation',
        },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:2000406',
      properties: [
        { key: 'GoTerm', value: 'P:positive regulation of T cell migration' },
        { key: 'GoEvidenceType', value: 'IMP:ARUK-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '19660551' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:1902949',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:positive regulation of tau-protein kinase activity',
        },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
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
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '23921129' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0032760',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:positive regulation of tumor necrosis factor production',
        },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '22198949' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '22406537' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '29061364' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0006892',
      properties: [
        { key: 'GoTerm', value: 'P:post-Golgi vesicle-mediated transport' },
        { key: 'GoEvidenceType', value: 'TAS:Reactome' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0043687',
      properties: [
        { key: 'GoTerm', value: 'P:post-translational protein modification' },
        { key: 'GoEvidenceType', value: 'TAS:Reactome' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0051260',
      properties: [
        { key: 'GoTerm', value: 'P:protein homooligomerization' },
        { key: 'GoEvidenceType', value: 'IDA:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0045048',
      properties: [
        { key: 'GoTerm', value: 'P:protein insertion into ER membrane' },
        { key: 'GoEvidenceType', value: 'TAS:Reactome' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0006468',
      properties: [
        { key: 'GoTerm', value: 'P:protein phosphorylation' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0051262',
      properties: [
        { key: 'GoTerm', value: 'P:protein tetramerization' },
        { key: 'GoEvidenceType', value: 'IMP:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0070206',
      properties: [
        { key: 'GoTerm', value: 'P:protein trimerization' },
        { key: 'GoEvidenceType', value: 'IMP:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0035590',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:purinergic nucleotide receptor signaling pathway',
        },
        { key: 'GoEvidenceType', value: 'TAS:Reactome' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:1903048',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:regulation of acetylcholine-gated cation channel activity',
        },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:1905906',
      properties: [
        { key: 'GoTerm', value: 'P:regulation of amyloid fibril formation' },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:1900221',
      properties: [
        { key: 'GoTerm', value: 'P:regulation of amyloid-beta clearance' },
        { key: 'GoEvidenceType', value: 'IMP:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:1902950',
      properties: [
        { key: 'GoTerm', value: 'P:regulation of dendritic spine maintenance' },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0007176',
      properties: [
        {
          key: 'GoTerm',
          value:
            'P:regulation of epidermal growth factor-activated receptor activity',
        },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0010468',
      properties: [
        { key: 'GoTerm', value: 'P:regulation of gene expression' },
        { key: 'GoEvidenceType', value: 'IMP:ARUK-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '29274751' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0048169',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:regulation of long-term neuronal synaptic plasticity',
        },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '23921129' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0040014',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:regulation of multicellular organism growth',
        },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:2000310',
      properties: [
        { key: 'GoTerm', value: 'P:regulation of NMDA receptor activity' },
        { key: 'GoEvidenceType', value: 'TAS:ARUK-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '17360908' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0050730',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:regulation of peptidyl-tyrosine phosphorylation',
        },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '21857966' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:1905606',
      properties: [
        { key: 'GoTerm', value: 'P:regulation of presynapse assembly' },
        { key: 'GoEvidenceType', value: 'IDA:SynGO' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '19726636' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:1905945',
      properties: [
        { key: 'GoTerm', value: 'P:regulation of response to calcium ion' },
        { key: 'GoEvidenceType', value: 'ISS:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0150003',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:regulation of spontaneous synaptic transmission',
        },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '15457210' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0050803',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:regulation of synapse structure or activity',
        },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0034121',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:regulation of toll-like receptor signaling pathway',
        },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0006357',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:regulation of transcription by RNA polymerase II',
        },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0006417',
      properties: [
        { key: 'GoTerm', value: 'P:regulation of translation' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0030111',
      properties: [
        { key: 'GoTerm', value: 'P:regulation of Wnt signaling pathway' },
        { key: 'GoEvidenceType', value: 'IC:ARUK-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '21857966' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0070555',
      properties: [
        { key: 'GoTerm', value: 'P:response to interleukin-1' },
        { key: 'GoEvidenceType', value: 'ISS:ARUK-UCL' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0010288',
      properties: [
        { key: 'GoTerm', value: 'P:response to lead ion' },
        { key: 'GoEvidenceType', value: 'IEA:Ensembl' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0006979',
      properties: [
        { key: 'GoTerm', value: 'P:response to oxidative stress' },
        { key: 'GoEvidenceType', value: 'IEA:Ensembl' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0001878',
      properties: [
        { key: 'GoTerm', value: 'P:response to yeast' },
        { key: 'GoEvidenceType', value: 'IMP:UniProtKB' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0051563',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:smooth endoplasmic reticulum calcium ion homeostasis',
        },
        { key: 'GoEvidenceType', value: 'IEA:Ensembl' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0001967',
      properties: [
        { key: 'GoTerm', value: 'P:suckling behavior' },
        { key: 'GoEvidenceType', value: 'IEA:Ensembl' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0050808',
      properties: [
        { key: 'GoTerm', value: 'P:synapse organization' },
        { key: 'GoEvidenceType', value: 'IGI:ARUK-UCL' },
      ],
      evidences: [
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '19587288' },
        { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '24012003' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0051124',
      properties: [
        { key: 'GoTerm', value: 'P:synaptic growth at neuromuscular junction' },
        { key: 'GoEvidenceType', value: 'IEA:Ensembl' },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0008542',
      properties: [
        { key: 'GoTerm', value: 'P:visual learning' },
        { key: 'GoEvidenceType', value: 'ISS:UniProtKB' },
      ],
    },
    {
      database: 'CDD',
      id: 'cd00109',
      properties: [
        { key: 'EntryName', value: 'KU' },
        { key: 'MatchStatus', value: '1' },
      ],
    },
    {
      database: 'DisProt',
      id: 'DP01280',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'Gene3D',
      id: '1.20.120.770',
      properties: [
        { key: 'EntryName', value: '-' },
        { key: 'MatchStatus', value: '1' },
      ],
    },
    {
      database: 'Gene3D',
      id: '2.30.29.30',
      properties: [
        { key: 'EntryName', value: '-' },
        { key: 'MatchStatus', value: '1' },
      ],
    },
    {
      database: 'Gene3D',
      id: '3.30.1490.140',
      properties: [
        { key: 'EntryName', value: '-' },
        { key: 'MatchStatus', value: '1' },
      ],
    },
    {
      database: 'Gene3D',
      id: '3.90.570.10',
      properties: [
        { key: 'EntryName', value: '-' },
        { key: 'MatchStatus', value: '1' },
      ],
    },
    {
      database: 'Gene3D',
      id: '4.10.230.10',
      properties: [
        { key: 'EntryName', value: '-' },
        { key: 'MatchStatus', value: '1' },
      ],
    },
    {
      database: 'Gene3D',
      id: '4.10.410.10',
      properties: [
        { key: 'EntryName', value: '-' },
        { key: 'MatchStatus', value: '1' },
      ],
    },
    {
      database: 'IDEAL',
      id: 'IID00294',
      properties: [{ key: 'Description', value: '-' }],
    },
    {
      database: 'InterPro',
      id: 'IPR036669',
      properties: [{ key: 'EntryName', value: 'Amyloid_Cu-bd_sf' }],
    },
    {
      database: 'InterPro',
      id: 'IPR008155',
      properties: [{ key: 'EntryName', value: 'Amyloid_glyco' }],
    },
    {
      database: 'InterPro',
      id: 'IPR013803',
      properties: [{ key: 'EntryName', value: 'Amyloid_glyco_Abeta' }],
    },
    {
      database: 'InterPro',
      id: 'IPR037071',
      properties: [{ key: 'EntryName', value: 'Amyloid_glyco_Abeta_sf' }],
    },
    {
      database: 'InterPro',
      id: 'IPR011178',
      properties: [{ key: 'EntryName', value: 'Amyloid_glyco_Cu-bd' }],
    },
    {
      database: 'InterPro',
      id: 'IPR024329',
      properties: [{ key: 'EntryName', value: 'Amyloid_glyco_E2_domain' }],
    },
    {
      database: 'InterPro',
      id: 'IPR008154',
      properties: [{ key: 'EntryName', value: 'Amyloid_glyco_extra' }],
    },
    {
      database: 'InterPro',
      id: 'IPR015849',
      properties: [{ key: 'EntryName', value: 'Amyloid_glyco_heparin-bd' }],
    },
    {
      database: 'InterPro',
      id: 'IPR036454',
      properties: [{ key: 'EntryName', value: 'Amyloid_glyco_heparin-bd_sf' }],
    },
    {
      database: 'InterPro',
      id: 'IPR019745',
      properties: [{ key: 'EntryName', value: 'Amyloid_glyco_intracell_CS' }],
    },
    {
      database: 'InterPro',
      id: 'IPR028866',
      properties: [{ key: 'EntryName', value: 'APP' }],
    },
    {
      database: 'InterPro',
      id: 'IPR019543',
      properties: [{ key: 'EntryName', value: 'APP_amyloid_C' }],
    },
    {
      database: 'InterPro',
      id: 'IPR019744',
      properties: [{ key: 'EntryName', value: 'APP_CUBD_CS' }],
    },
    {
      database: 'InterPro',
      id: 'IPR036176',
      properties: [{ key: 'EntryName', value: 'E2_sf' }],
    },
    {
      database: 'InterPro',
      id: 'IPR002223',
      properties: [{ key: 'EntryName', value: 'Kunitz_BPTI' }],
    },
    {
      database: 'InterPro',
      id: 'IPR036880',
      properties: [{ key: 'EntryName', value: 'Kunitz_BPTI_sf' }],
    },
    {
      database: 'InterPro',
      id: 'IPR011993',
      properties: [{ key: 'EntryName', value: 'PH-like_dom_sf' }],
    },
    {
      database: 'InterPro',
      id: 'IPR020901',
      properties: [{ key: 'EntryName', value: 'Prtase_inh_Kunz-CS' }],
    },
    {
      database: 'PANTHER',
      id: 'PTHR23103',
      properties: [
        { key: 'EntryName', value: 'PTHR23103' },
        { key: 'MatchStatus', value: '1' },
      ],
    },
    {
      database: 'PANTHER',
      id: 'PTHR23103:SF7',
      properties: [
        { key: 'EntryName', value: 'PTHR23103:SF7' },
        { key: 'MatchStatus', value: '1' },
      ],
    },
    {
      database: 'Pfam',
      id: 'PF10515',
      properties: [
        { key: 'EntryName', value: 'APP_amyloid' },
        { key: 'MatchStatus', value: '1' },
      ],
    },
    {
      database: 'Pfam',
      id: 'PF12924',
      properties: [
        { key: 'EntryName', value: 'APP_Cu_bd' },
        { key: 'MatchStatus', value: '1' },
      ],
    },
    {
      database: 'Pfam',
      id: 'PF12925',
      properties: [
        { key: 'EntryName', value: 'APP_E2' },
        { key: 'MatchStatus', value: '1' },
      ],
    },
    {
      database: 'Pfam',
      id: 'PF02177',
      properties: [
        { key: 'EntryName', value: 'APP_N' },
        { key: 'MatchStatus', value: '1' },
      ],
    },
    {
      database: 'Pfam',
      id: 'PF03494',
      properties: [
        { key: 'EntryName', value: 'Beta-APP' },
        { key: 'MatchStatus', value: '1' },
      ],
    },
    {
      database: 'Pfam',
      id: 'PF00014',
      properties: [
        { key: 'EntryName', value: 'Kunitz_BPTI' },
        { key: 'MatchStatus', value: '1' },
      ],
    },
    {
      database: 'PRINTS',
      id: 'PR00203',
      properties: [{ key: 'EntryName', value: 'AMYLOIDA4' }],
    },
    {
      database: 'PRINTS',
      id: 'PR00759',
      properties: [{ key: 'EntryName', value: 'BASICPTASE' }],
    },
    {
      database: 'PRINTS',
      id: 'PR00204',
      properties: [{ key: 'EntryName', value: 'BETAAMYLOID' }],
    },
    {
      database: 'SMART',
      id: 'SM00006',
      properties: [
        { key: 'EntryName', value: 'A4_EXTRA' },
        { key: 'MatchStatus', value: '1' },
      ],
    },
    {
      database: 'SMART',
      id: 'SM00131',
      properties: [
        { key: 'EntryName', value: 'KU' },
        { key: 'MatchStatus', value: '1' },
      ],
    },
    {
      database: 'SUPFAM',
      id: 'SSF109843',
      properties: [
        { key: 'EntryName', value: 'SSF109843' },
        { key: 'MatchStatus', value: '1' },
      ],
    },
    {
      database: 'SUPFAM',
      id: 'SSF56491',
      properties: [
        { key: 'EntryName', value: 'SSF56491' },
        { key: 'MatchStatus', value: '1' },
      ],
    },
    {
      database: 'SUPFAM',
      id: 'SSF57362',
      properties: [
        { key: 'EntryName', value: 'SSF57362' },
        { key: 'MatchStatus', value: '1' },
      ],
    },
    {
      database: 'SUPFAM',
      id: 'SSF89811',
      properties: [
        { key: 'EntryName', value: 'SSF89811' },
        { key: 'MatchStatus', value: '1' },
      ],
    },
    {
      database: 'PROSITE',
      id: 'PS00319',
      properties: [
        { key: 'EntryName', value: 'APP_CUBD' },
        { key: 'MatchStatus', value: '1' },
      ],
    },
    {
      database: 'PROSITE',
      id: 'PS51869',
      properties: [
        { key: 'EntryName', value: 'APP_E1' },
        { key: 'MatchStatus', value: '1' },
      ],
    },
    {
      database: 'PROSITE',
      id: 'PS51870',
      properties: [
        { key: 'EntryName', value: 'APP_E2' },
        { key: 'MatchStatus', value: '1' },
      ],
    },
    {
      database: 'PROSITE',
      id: 'PS00320',
      properties: [
        { key: 'EntryName', value: 'APP_INTRA' },
        { key: 'MatchStatus', value: '1' },
      ],
    },
    {
      database: 'PROSITE',
      id: 'PS00280',
      properties: [
        { key: 'EntryName', value: 'BPTI_KUNITZ_1' },
        { key: 'MatchStatus', value: '1' },
      ],
    },
    {
      database: 'PROSITE',
      id: 'PS50279',
      properties: [
        { key: 'EntryName', value: 'BPTI_KUNITZ_2' },
        { key: 'MatchStatus', value: '1' },
      ],
    },
  ],
  sequence: {
    value:
      'MLPGLALLLLAAWTARALEVPTDGNAGLLAEPQIAMFCGRLNMHMNVQNGKWDSDPSGTKTCIDTKEGILQYCQEVYPELQITNVVEANQPVTIQNWCKRGRKQCKTHPHFVIPYRCLVGEFVSDALLVPDKCKFLHQERMDVCETHLHWHTVAKETCSEKSTNLHDYGMLLPCGIDKFRGVEFVCCPLAEESDNVDSADAEEDDSDVWWGGADTDYADGSEDKVVEVAEEEEVAEVEEEEADDDEDDEDGDEVEEEAEEPYEEATERTTSIATTTTTTTESVEEVVREVCSEQAETGPCRAMISRWYFDVTEGKCAPFFYGGCGGNRNNFDTEEYCMAVCGSAMSQSLLKTTQEPLARDPVKLPTTAASTPDAVDKYLETPGDENEHAHFQKAKERLEAKHRERMSQVMREWEEAERQAKNLPKADKKAVIQHFQEKVESLEQEAANERQQLVETHMARVEAMLNDRRRLALENYITALQAVPPRPRHVFNMLKKYVRAEQKDRQHTLKHFEHVRMVDPKKAAQIRSQVMTHLRVIYERMNQSLSLLYNVPAVAEEIQDEVDELLQKEQNYSDDVLANMISEPRISYGNDALMPSLTETKTTVELLPVNGEFSLDDLQPWHSFGADSVPANTENEVEPVDARPAADRGLTTRPGSGLTNIKTEEISEVKMDAEFRHDSGYEVHHQKLVFFAEDVGSNKGAIIGLMVGGVVIATVIVITLVMLKKKQYTSIHHGVVEVDAAVTPEERHLSKMQQNGYENPTYKFFEQMQN',
    length: 770,
    molWeight: 86943,
    crc64: 'A12EE761403740F5',
    md5: '7DD43312CD29A262ACDC0517230BC5CA',
  },
  extraAttributes: {
    countByCommentType: {
      FUNCTION: 5,
      SUBUNIT: 1,
      INTERACTION: 459,
      'SUBCELLULAR LOCATION': 4,
      'ALTERNATIVE PRODUCTS': 11,
      'TISSUE SPECIFICITY': 1,
      INDUCTION: 1,
      DOMAIN: 6,
      PTM: 8,
      'MASS SPECTROMETRY': 2,
      DISEASE: 2,
      MISCELLANEOUS: 7,
      SIMILARITY: 1,
      'SEQUENCE CAUTION': 1,
      'WEB RESOURCE': 4,
    },
    countByFeatureType: {
      Signal: 1,
      Chain: 13,
      Peptide: 2,
      'Topological domain': 2,
      Transmembrane: 1,
      Domain: 3,
      Region: 10,
      Motif: 3,
      'Compositional bias': 2,
      'Metal binding': 7,
      Site: 14,
      'Modified residue': 11,
      Glycosylation: 10,
      'Disulfide bond': 9,
      'Cross-link': 1,
      'Alternative sequence': 13,
      'Natural variant': 21,
      Mutagenesis: 41,
      'Sequence conflict': 5,
      Helix: 16,
      'Beta strand': 29,
      Turn: 6,
    },
    uniParcId: 'UPI000002DB1C',
  },
};

export default mock;
