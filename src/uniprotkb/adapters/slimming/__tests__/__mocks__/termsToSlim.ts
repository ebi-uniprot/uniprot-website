import { GroupedGoTerms } from '../../../functionConverter';

const termsToSlim: GroupedGoTerms = new Map([
  [
    'Cellular Component',
    [
      {
        database: 'GO',
        id: 'GO:0070062',
        properties: {
          GoTerm: 'C:extracellular exosome',
          GoEvidenceType: 'HDA:UniProtKB',
        },
        evidences: [
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '19056867' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '19199708' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '23533145' },
        ],
        aspect: 'Cellular Component',
        termDescription: 'extracellular exosome',
      },
      {
        database: 'GO',
        id: 'GO:0005576',
        properties: {
          GoTerm: 'C:extracellular region',
          GoEvidenceType: 'TAS:Reactome',
        },
        aspect: 'Cellular Component',
        termDescription: 'extracellular region',
      },
      {
        database: 'GO',
        id: 'GO:0005887',
        properties: {
          GoTerm: 'C:integral component of plasma membrane',
          GoEvidenceType: 'TAS:ProtInc',
        },
        evidences: [
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '9325052' },
        ],
        aspect: 'Cellular Component',
        termDescription: 'integral component of plasma membrane',
      },
      {
        database: 'GO',
        id: 'GO:0005654',
        properties: { GoTerm: 'C:nucleoplasm', GoEvidenceType: 'IDA:HPA' },
        aspect: 'Cellular Component',
        termDescription: 'nucleoplasm',
      },
      {
        database: 'GO',
        id: 'GO:0005886',
        properties: {
          GoTerm: 'C:plasma membrane',
          GoEvidenceType: 'IDA:UniProtKB',
        },
        evidences: [
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '21068237' },
        ],
        aspect: 'Cellular Component',
        termDescription: 'plasma membrane',
      },
    ],
  ],
  [
    'Molecular Function',
    [
      {
        database: 'GO',
        id: 'GO:0005044',
        properties: {
          GoTerm: 'F:scavenger receptor activity',
          GoEvidenceType: 'IEA:InterPro',
        },
        aspect: 'Molecular Function',
        termDescription: 'scavenger receptor activity',
      },
      {
        database: 'GO',
        id: 'GO:0004252',
        properties: {
          GoTerm: 'F:serine-type endopeptidase activity',
          GoEvidenceType: 'IEA:InterPro',
        },
        aspect: 'Molecular Function',
        termDescription: 'serine-type endopeptidase activity',
      },
      {
        database: 'GO',
        id: 'GO:0008236',
        properties: {
          GoTerm: 'F:serine-type peptidase activity',
          GoEvidenceType: 'TAS:ProtInc',
        },
        evidences: [
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '9325052' },
        ],
        aspect: 'Molecular Function',
        termDescription: 'serine-type peptidase activity',
      },
    ],
  ],
  [
    'Biological Process',
    [
      {
        database: 'GO',
        id: 'GO:0046598',
        properties: {
          GoTerm: 'P:positive regulation of viral entry into host cell',
          GoEvidenceType: 'IDA:UniProtKB',
        },
        evidences: [
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '21068237' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '24227843' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '32404436' },
        ],
        aspect: 'Biological Process',
        termDescription: 'positive regulation of viral entry into host cell',
      },
      {
        database: 'GO',
        id: 'GO:0016540',
        properties: {
          GoTerm: 'P:protein autoprocessing',
          GoEvidenceType: 'IMP:UniProtKB',
        },
        evidences: [
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '21068237' },
        ],
        aspect: 'Biological Process',
        termDescription: 'protein autoprocessing',
      },
      {
        database: 'GO',
        id: 'GO:0006508',
        properties: {
          GoTerm: 'P:proteolysis',
          GoEvidenceType: 'IDA:UniProtKB',
        },
        evidences: [
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '21068237' },
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '24227843' },
        ],
        aspect: 'Biological Process',
        termDescription: 'proteolysis',
      },
    ],
  ],
]);

export default termsToSlim;
