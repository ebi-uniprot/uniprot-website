import { type GoXref } from '../adapters/subcellularLocationConverter';

const mock: GoXref[] = [
  {
    database: 'GO',
    id: 'GO:0005576',
    properties: {
      GoTerm: 'C:extracellular region',
      GoEvidenceType: 'TAS:Reactome',
    },
  },
  {
    database: 'GO',
    id: 'GO:0005615',
    properties: {
      GoTerm: 'C:extracellular space',
      GoEvidenceType: 'IBA:GO_Central',
    },
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
    id: 'GO:0006956',
    properties: {
      GoTerm: 'P:complement activation',
      GoEvidenceType: 'TAS:Reactome',
    },
  },
  {
    database: 'GO',
    id: 'GO:0006958',
    properties: {
      GoTerm: 'P:complement activation, classical pathway',
      GoEvidenceType: 'TAS:Reactome',
    },
  },
  {
    database: 'GO',
    id: 'GO:0038095',
    properties: {
      GoTerm: 'P:Fc-epsilon receptor signaling pathway',
      GoEvidenceType: 'TAS:Reactome',
    },
  },
  {
    database: 'GO',
    id: 'GO:0038096',
    properties: {
      GoTerm: 'P:Fc-gamma receptor signaling pathway involved in phagocytosis',
      GoEvidenceType: 'TAS:Reactome',
    },
  },
  {
    database: 'GO',
    id: 'GO:0006955',
    properties: {
      GoTerm: 'P:immune response',
      GoEvidenceType: 'IBA:GO_Central',
    },
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
    id: 'GO:0050900',
    properties: {
      GoTerm: 'P:leukocyte migration',
      GoEvidenceType: 'TAS:Reactome',
    },
  },
  {
    database: 'GO',
    id: 'GO:0002862',
    properties: {
      GoTerm:
        'P:negative regulation of inflammatory response to antigenic stimulus',
      GoEvidenceType: 'TAS:Reactome',
    },
  },
  {
    database: 'GO',
    id: 'GO:0008228',
    properties: {
      GoTerm: 'P:opsonization',
      GoEvidenceType: 'TAS:Reactome',
    },
  },
  {
    database: 'GO',
    id: 'GO:0018149',
    properties: {
      GoTerm: 'P:peptide cross-linking',
      GoEvidenceType: 'TAS:Reactome',
    },
  },
  {
    database: 'GO',
    id: 'GO:0006898',
    properties: {
      GoTerm: 'P:receptor-mediated endocytosis',
      GoEvidenceType: 'TAS:Reactome',
    },
  },
  {
    database: 'GO',
    id: 'GO:0030449',
    properties: {
      GoTerm: 'P:regulation of complement activation',
      GoEvidenceType: 'TAS:Reactome',
    },
  },
  {
    database: 'GO',
    id: 'GO:0050776',
    properties: {
      GoTerm: 'P:regulation of immune response',
      GoEvidenceType: 'TAS:Reactome',
    },
  },
];

export default mock;
