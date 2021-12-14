import { getAspectGroupedGoTerms } from '../../../functionConverter';
import { convertXrefProperties } from '../../../uniProtkbConverter';

// Source: curl -s https://rest.uniprot.org/beta/uniprotkb/O15393.json | jq '.uniProtKBCrossReferences' > xrefs.json
// Retrieved: 2021-11-25

const uniprotkbGroupedGoTerms = getAspectGroupedGoTerms(
  convertXrefProperties([
    {
      database: 'EMBL',
      id: 'U75329',
      properties: [
        {
          key: 'ProteinId',
          value: 'AAC51784.1',
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
      id: 'AF123453',
      properties: [
        {
          key: 'ProteinId',
          value: 'AAD37117.1',
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
      id: 'AF270487',
      properties: [
        {
          key: 'ProteinId',
          value: 'AAK29280.1',
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
      id: 'AK291813',
      properties: [
        {
          key: 'ProteinId',
          value: 'BAF84502.1',
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
      id: 'AK296860',
      properties: [
        {
          key: 'ProteinId',
          value: 'BAH12445.1',
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
      id: 'AK313338',
      properties: [
        {
          key: 'ProteinId',
          value: 'BAG36142.1',
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
      id: 'AK222784',
      properties: [
        {
          key: 'ProteinId',
          value: 'BAD96504.1',
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
      id: 'AP001610',
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
      id: 'CH471079',
      properties: [
        {
          key: 'ProteinId',
          value: 'EAX09597.1',
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
      id: 'CH471079',
      properties: [
        {
          key: 'ProteinId',
          value: 'EAX09598.1',
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
      id: 'BC051839',
      properties: [
        {
          key: 'ProteinId',
          value: 'AAH51839.1',
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
      id: 'CCDS33564.1',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
      isoformId: 'O15393-1',
    },
    {
      database: 'CCDS',
      id: 'CCDS54486.1',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
      isoformId: 'O15393-2',
    },
    {
      database: 'RefSeq',
      id: 'NP_001128571.1',
      properties: [
        {
          key: 'NucleotideSequenceId',
          value: 'NM_001135099.1',
        },
      ],
      isoformId: 'O15393-2',
    },
    {
      database: 'RefSeq',
      id: 'NP_005647.3',
      properties: [
        {
          key: 'NucleotideSequenceId',
          value: 'NM_005656.3',
        },
      ],
      isoformId: 'O15393-1',
    },
    {
      database: 'RefSeq',
      id: 'XP_011528033.1',
      properties: [
        {
          key: 'NucleotideSequenceId',
          value: 'XM_011529731.2',
        },
      ],
    },
    {
      database: 'PDB',
      id: '7MEQ',
      properties: [
        {
          key: 'Method',
          value: 'X-ray',
        },
        {
          key: 'Resolution',
          value: '1.95 A',
        },
        {
          key: 'Chains',
          value: 'A=109-492',
        },
      ],
    },
    {
      database: 'PDBsum',
      id: '7MEQ',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
    },
    {
      database: 'SMR',
      id: 'O15393',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
    },
    {
      database: 'BioGRID',
      id: '112968',
      properties: [
        {
          key: 'Interactions',
          value: '65',
        },
      ],
    },
    {
      database: 'IntAct',
      id: 'O15393',
      properties: [
        {
          key: 'Interactions',
          value: '61',
        },
      ],
    },
    {
      database: 'STRING',
      id: '9606.ENSP00000381588',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
    },
    {
      database: 'BindingDB',
      id: 'O15393',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
    },
    {
      database: 'ChEMBL',
      id: 'CHEMBL1795140',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
    },
    {
      database: 'DrugBank',
      id: 'DB13729',
      properties: [
        {
          key: 'GenericName',
          value: 'Camostat',
        },
      ],
    },
    {
      database: 'GuidetoPHARMACOLOGY',
      id: '2421',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
    },
    {
      database: 'MEROPS',
      id: 'S01.247',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
    },
    {
      database: 'TCDB',
      id: '8.A.131.1.6',
      properties: [
        {
          key: 'FamilyName',
          value: 'the transmembrane protease serine 3 (tmprss3) family',
        },
      ],
    },
    {
      database: 'GlyConnect',
      id: '1848',
      properties: [
        {
          key: 'glycosylation',
          value: '4 N-Linked glycans (2 sites)',
        },
      ],
    },
    {
      database: 'GlyGen',
      id: 'O15393',
      properties: [
        {
          key: 'Description',
          value: '2 sites, 4 N-linked glycans (2 sites)',
        },
      ],
    },
    {
      database: 'iPTMnet',
      id: 'O15393',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
    },
    {
      database: 'PhosphoSitePlus',
      id: 'O15393',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
    },
    {
      database: 'SwissPalm',
      id: 'O15393',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
    },
    {
      database: 'BioMuta',
      id: 'TMPRSS2',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
    },
    {
      database: 'jPOST',
      id: 'O15393',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
    },
    {
      database: 'MassIVE',
      id: 'O15393',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
    },
    {
      database: 'MaxQB',
      id: 'O15393',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
    },
    {
      database: 'PaxDb',
      id: 'O15393',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
    },
    {
      database: 'PeptideAtlas',
      id: 'O15393',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
    },
    {
      database: 'PRIDE',
      id: 'O15393',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
    },
    {
      database: 'ProteomicsDB',
      id: '31938',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
    },
    {
      database: 'ProteomicsDB',
      id: '48634',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
      isoformId: 'O15393-1',
    },
    {
      database: 'ABCD',
      id: 'O15393',
      properties: [
        {
          key: 'Description',
          value: '1 sequenced antibody',
        },
      ],
    },
    {
      database: 'Antibodypedia',
      id: '2685',
      properties: [
        {
          key: 'antibodies',
          value: '303 antibodies',
        },
      ],
    },
    {
      database: 'DNASU',
      id: '7113',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
    },
    {
      database: 'Ensembl',
      id: 'ENST00000332149',
      properties: [
        {
          key: 'ProteinId',
          value: 'ENSP00000330330',
        },
        {
          key: 'GeneId',
          value: 'ENSG00000184012',
        },
      ],
      isoformId: 'O15393-1',
    },
    {
      database: 'Ensembl',
      id: 'ENST00000398585',
      properties: [
        {
          key: 'ProteinId',
          value: 'ENSP00000381588',
        },
        {
          key: 'GeneId',
          value: 'ENSG00000184012',
        },
      ],
      isoformId: 'O15393-2',
    },
    {
      database: 'Ensembl',
      id: 'ENST00000454499',
      properties: [
        {
          key: 'ProteinId',
          value: 'ENSP00000389006',
        },
        {
          key: 'GeneId',
          value: 'ENSG00000184012',
        },
      ],
      isoformId: 'O15393-1',
    },
    {
      database: 'Ensembl',
      id: 'ENST00000458356',
      properties: [
        {
          key: 'ProteinId',
          value: 'ENSP00000391216',
        },
        {
          key: 'GeneId',
          value: 'ENSG00000184012',
        },
      ],
      isoformId: 'O15393-1',
    },
    {
      database: 'Ensembl',
      id: 'ENST00000676973',
      properties: [
        {
          key: 'ProteinId',
          value: 'ENSP00000504705',
        },
        {
          key: 'GeneId',
          value: 'ENSG00000184012',
        },
      ],
      isoformId: 'O15393-1',
    },
    {
      database: 'Ensembl',
      id: 'ENST00000678348',
      properties: [
        {
          key: 'ProteinId',
          value: 'ENSP00000503556',
        },
        {
          key: 'GeneId',
          value: 'ENSG00000184012',
        },
      ],
      isoformId: 'O15393-1',
    },
    {
      database: 'Ensembl',
      id: 'ENST00000679054',
      properties: [
        {
          key: 'ProteinId',
          value: 'ENSP00000502928',
        },
        {
          key: 'GeneId',
          value: 'ENSG00000184012',
        },
      ],
      isoformId: 'O15393-1',
    },
    {
      database: 'GeneID',
      id: '7113',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
    },
    {
      database: 'KEGG',
      id: 'hsa:7113',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
    },
    {
      database: 'UCSC',
      id: 'uc002yzj.4',
      properties: [
        {
          key: 'OrganismName',
          value: 'human',
        },
      ],
      isoformId: 'O15393-1',
    },
    {
      database: 'CTD',
      id: '7113',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
    },
    {
      database: 'DisGeNET',
      id: '7113',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
    },
    {
      database: 'GeneCards',
      id: 'TMPRSS2',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
    },
    {
      database: 'HGNC',
      id: 'HGNC:11876',
      properties: [
        {
          key: 'GeneName',
          value: 'TMPRSS2',
        },
      ],
    },
    {
      database: 'HPA',
      id: 'ENSG00000184012',
      properties: [
        {
          key: 'Description',
          value: 'Tissue enhanced (intestine, pancreas, prostate)',
        },
      ],
    },
    {
      database: 'MIM',
      id: '602060',
      properties: [
        {
          key: 'Type',
          value: 'gene',
        },
      ],
    },
    {
      database: 'neXtProt',
      id: 'NX_O15393',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
    },
    {
      database: 'OpenTargets',
      id: 'ENSG00000184012',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
    },
    {
      database: 'PharmGKB',
      id: 'PA36577',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
    },
    {
      database: 'VEuPathDB',
      id: 'HostDB:ENSG00000184012',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
    },
    {
      database: 'eggNOG',
      id: 'KOG3627',
      properties: [
        {
          key: 'ToxonomicScope',
          value: 'Eukaryota',
        },
      ],
    },
    {
      database: 'GeneTree',
      id: 'ENSGT00940000155207',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
    },
    {
      database: 'InParanoid',
      id: 'O15393',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
    },
    {
      database: 'OMA',
      id: 'YQPESLY',
      properties: [
        {
          key: 'Fingerprint',
          value: '-',
        },
      ],
    },
    {
      database: 'OrthoDB',
      id: '1314811at2759',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
    },
    {
      database: 'PhylomeDB',
      id: 'O15393',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
    },
    {
      database: 'TreeFam',
      id: 'TF351678',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
    },
    {
      database: 'BRENDA',
      id: '3.4.21.B60',
      properties: [
        {
          key: 'OrganismId',
          value: '2681',
        },
      ],
    },
    {
      database: 'PathwayCommons',
      id: 'O15393',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
    },
    {
      database: 'Reactome',
      id: 'R-HSA-9678110',
      properties: [
        {
          key: 'PathwayName',
          value: 'Attachment and Entry',
        },
      ],
    },
    {
      database: 'Reactome',
      id: 'R-HSA-9694614',
      properties: [
        {
          key: 'PathwayName',
          value: 'Attachment and Entry',
        },
      ],
    },
    {
      database: 'SABIO-RK',
      id: 'O15393',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
    },
    {
      database: 'SIGNOR',
      id: 'O15393',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
    },
    {
      database: 'BioGRID-ORCS',
      id: '7113',
      properties: [
        {
          key: 'hits',
          value: '3 hits in 1009 CRISPR screens',
        },
      ],
    },
    {
      database: 'ChiTaRS',
      id: 'TMPRSS2',
      properties: [
        {
          key: 'OrganismName',
          value: 'human',
        },
      ],
    },
    {
      database: 'GeneWiki',
      id: 'TMPRSS2',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
    },
    {
      database: 'GenomeRNAi',
      id: '7113',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
    },
    {
      database: 'Pharos',
      id: 'O15393',
      properties: [
        {
          key: 'Description',
          value: 'Tchem',
        },
      ],
    },
    {
      database: 'PRO',
      id: 'PR:O15393',
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
          value: 'Chromosome 21',
        },
      ],
    },
    {
      database: 'RNAct',
      id: 'O15393',
      properties: [
        {
          key: 'moleculeType',
          value: 'protein',
        },
      ],
    },
    {
      database: 'Bgee',
      id: 'ENSG00000184012',
      properties: [
        {
          key: 'ExpressionPatterns',
          value: 'Expressed in prostate gland and 167 other tissues',
        },
      ],
    },
    {
      database: 'ExpressionAtlas',
      id: 'O15393',
      properties: [
        {
          key: 'ExpressionPatterns',
          value: 'baseline and differential',
        },
      ],
    },
    {
      database: 'Genevisible',
      id: 'O15393',
      properties: [
        {
          key: 'OrganismId',
          value: 'HS',
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
          evidenceCode: 'ECO:0000269',
          source: 'PubMed',
          id: '19056867',
        },
        {
          evidenceCode: 'ECO:0000269',
          source: 'PubMed',
          id: '19199708',
        },
        {
          evidenceCode: 'ECO:0000269',
          source: 'PubMed',
          id: '23533145',
        },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0005576',
      properties: [
        {
          key: 'GoTerm',
          value: 'C:extracellular region',
        },
        {
          key: 'GoEvidenceType',
          value: 'TAS:Reactome',
        },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0005887',
      properties: [
        {
          key: 'GoTerm',
          value: 'C:integral component of plasma membrane',
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
          id: '9325052',
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
      id: 'GO:0005886',
      properties: [
        {
          key: 'GoTerm',
          value: 'C:plasma membrane',
        },
        {
          key: 'GoEvidenceType',
          value: 'IDA:UniProtKB',
        },
      ],
      evidences: [
        {
          evidenceCode: 'ECO:0000269',
          source: 'PubMed',
          id: '21068237',
        },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0005044',
      properties: [
        {
          key: 'GoTerm',
          value: 'F:scavenger receptor activity',
        },
        {
          key: 'GoEvidenceType',
          value: 'IEA:InterPro',
        },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0004252',
      properties: [
        {
          key: 'GoTerm',
          value: 'F:serine-type endopeptidase activity',
        },
        {
          key: 'GoEvidenceType',
          value: 'TAS:Reactome',
        },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0008236',
      properties: [
        {
          key: 'GoTerm',
          value: 'F:serine-type peptidase activity',
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
          id: '9325052',
        },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0046598',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:positive regulation of viral entry into host cell',
        },
        {
          key: 'GoEvidenceType',
          value: 'IDA:UniProtKB',
        },
      ],
      evidences: [
        {
          evidenceCode: 'ECO:0000269',
          source: 'PubMed',
          id: '21068237',
        },
        {
          evidenceCode: 'ECO:0000269',
          source: 'PubMed',
          id: '24227843',
        },
        {
          evidenceCode: 'ECO:0000269',
          source: 'PubMed',
          id: '32404436',
        },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0016540',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:protein autoprocessing',
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
          id: '21068237',
        },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0006508',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:proteolysis',
        },
        {
          key: 'GoEvidenceType',
          value: 'IDA:UniProtKB',
        },
      ],
      evidences: [
        {
          evidenceCode: 'ECO:0000269',
          source: 'PubMed',
          id: '21068237',
        },
        {
          evidenceCode: 'ECO:0000269',
          source: 'PubMed',
          id: '24227843',
        },
      ],
    },
    {
      database: 'CDD',
      id: 'cd00112',
      properties: [
        {
          key: 'EntryName',
          value: 'LDLa',
        },
        {
          key: 'MatchStatus',
          value: '1',
        },
      ],
    },
    {
      database: 'CDD',
      id: 'cd00190',
      properties: [
        {
          key: 'EntryName',
          value: 'Tryp_SPc',
        },
        {
          key: 'MatchStatus',
          value: '1',
        },
      ],
    },
    {
      database: 'Gene3D',
      id: '2.40.10.10',
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
      id: '3.10.250.10',
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
      id: '4.10.400.10',
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
      database: 'InterPro',
      id: 'IPR036055',
      properties: [
        {
          key: 'EntryName',
          value: 'LDL_receptor-like_sf',
        },
      ],
    },
    {
      database: 'InterPro',
      id: 'IPR023415',
      properties: [
        {
          key: 'EntryName',
          value: 'LDLR_class-A_CS',
        },
      ],
    },
    {
      database: 'InterPro',
      id: 'IPR002172',
      properties: [
        {
          key: 'EntryName',
          value: 'LDrepeatLR_classA_rpt',
        },
      ],
    },
    {
      database: 'InterPro',
      id: 'IPR009003',
      properties: [
        {
          key: 'EntryName',
          value: 'Peptidase_S1_PA',
        },
      ],
    },
    {
      database: 'InterPro',
      id: 'IPR043504',
      properties: [
        {
          key: 'EntryName',
          value: 'Peptidase_S1_PA_chymotrypsin',
        },
      ],
    },
    {
      database: 'InterPro',
      id: 'IPR001314',
      properties: [
        {
          key: 'EntryName',
          value: 'Peptidase_S1A',
        },
      ],
    },
    {
      database: 'InterPro',
      id: 'IPR001190',
      properties: [
        {
          key: 'EntryName',
          value: 'SRCR',
        },
      ],
    },
    {
      database: 'InterPro',
      id: 'IPR017448',
      properties: [
        {
          key: 'EntryName',
          value: 'SRCR-like_dom',
        },
      ],
    },
    {
      database: 'InterPro',
      id: 'IPR036772',
      properties: [
        {
          key: 'EntryName',
          value: 'SRCR-like_dom_sf',
        },
      ],
    },
    {
      database: 'InterPro',
      id: 'IPR001254',
      properties: [
        {
          key: 'EntryName',
          value: 'Trypsin_dom',
        },
      ],
    },
    {
      database: 'InterPro',
      id: 'IPR018114',
      properties: [
        {
          key: 'EntryName',
          value: 'TRYPSIN_HIS',
        },
      ],
    },
    {
      database: 'InterPro',
      id: 'IPR033116',
      properties: [
        {
          key: 'EntryName',
          value: 'TRYPSIN_SER',
        },
      ],
    },
    {
      database: 'Pfam',
      id: 'PF15494',
      properties: [
        {
          key: 'EntryName',
          value: 'SRCR_2',
        },
        {
          key: 'MatchStatus',
          value: '1',
        },
      ],
    },
    {
      database: 'Pfam',
      id: 'PF00089',
      properties: [
        {
          key: 'EntryName',
          value: 'Trypsin',
        },
        {
          key: 'MatchStatus',
          value: '1',
        },
      ],
    },
    {
      database: 'PRINTS',
      id: 'PR00722',
      properties: [
        {
          key: 'EntryName',
          value: 'CHYMOTRYPSIN',
        },
      ],
    },
    {
      database: 'SMART',
      id: 'SM00192',
      properties: [
        {
          key: 'EntryName',
          value: 'LDLa',
        },
        {
          key: 'MatchStatus',
          value: '1',
        },
      ],
    },
    {
      database: 'SMART',
      id: 'SM00202',
      properties: [
        {
          key: 'EntryName',
          value: 'SR',
        },
        {
          key: 'MatchStatus',
          value: '1',
        },
      ],
    },
    {
      database: 'SMART',
      id: 'SM00020',
      properties: [
        {
          key: 'EntryName',
          value: 'Tryp_SPc',
        },
        {
          key: 'MatchStatus',
          value: '1',
        },
      ],
    },
    {
      database: 'SUPFAM',
      id: 'SSF50494',
      properties: [
        {
          key: 'EntryName',
          value: 'SSF50494',
        },
        {
          key: 'MatchStatus',
          value: '1',
        },
      ],
    },
    {
      database: 'SUPFAM',
      id: 'SSF56487',
      properties: [
        {
          key: 'EntryName',
          value: 'SSF56487',
        },
        {
          key: 'MatchStatus',
          value: '1',
        },
      ],
    },
    {
      database: 'SUPFAM',
      id: 'SSF57424',
      properties: [
        {
          key: 'EntryName',
          value: 'SSF57424',
        },
        {
          key: 'MatchStatus',
          value: '1',
        },
      ],
    },
    {
      database: 'PROSITE',
      id: 'PS01209',
      properties: [
        {
          key: 'EntryName',
          value: 'LDLRA_1',
        },
        {
          key: 'MatchStatus',
          value: '1',
        },
      ],
    },
    {
      database: 'PROSITE',
      id: 'PS50068',
      properties: [
        {
          key: 'EntryName',
          value: 'LDLRA_2',
        },
        {
          key: 'MatchStatus',
          value: '1',
        },
      ],
    },
    {
      database: 'PROSITE',
      id: 'PS50287',
      properties: [
        {
          key: 'EntryName',
          value: 'SRCR_2',
        },
        {
          key: 'MatchStatus',
          value: '1',
        },
      ],
    },
    {
      database: 'PROSITE',
      id: 'PS50240',
      properties: [
        {
          key: 'EntryName',
          value: 'TRYPSIN_DOM',
        },
        {
          key: 'MatchStatus',
          value: '1',
        },
      ],
    },
    {
      database: 'PROSITE',
      id: 'PS00134',
      properties: [
        {
          key: 'EntryName',
          value: 'TRYPSIN_HIS',
        },
        {
          key: 'MatchStatus',
          value: '1',
        },
      ],
    },
    {
      database: 'PROSITE',
      id: 'PS00135',
      properties: [
        {
          key: 'EntryName',
          value: 'TRYPSIN_SER',
        },
        {
          key: 'MatchStatus',
          value: '1',
        },
      ],
    },
  ])
);
export default uniprotkbGroupedGoTerms;
