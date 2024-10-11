import { DataDBModel } from '../../../entry/XRefsSection';

// Source: configure/uniparc/allDatabases
// Retrieved: 2024-07-25
const allDatabases: DataDBModel = [
  {
    name: 'EG_BACTERIA',
    displayName: 'EnsemblBacteria',
    alive: true,
    uriLink: 'https://www.ensemblgenomes.org/id/%id',
  },
  {
    name: 'EG_FUNGI',
    displayName: 'EnsemblFungi',
    alive: true,
    uriLink: 'https://www.ensemblgenomes.org/id/%id',
  },
  {
    name: 'EG_METAZOA',
    displayName: 'EnsemblMetazoa',
    alive: true,
    uriLink: 'https://www.ensemblgenomes.org/id/%id',
  },
  {
    name: 'EG_PLANTS',
    displayName: 'EnsemblPlants',
    alive: true,
    uriLink: 'https://www.ensemblgenomes.org/id/%id',
  },
  {
    name: 'EG_PROTISTS',
    displayName: 'EnsemblProtists',
    alive: true,
    uriLink: 'https://www.ensemblgenomes.org/id/%id',
  },
  {
    name: 'EMBL',
    displayName: 'EMBL',
    alive: true,
    uriLink: 'https://www.ebi.ac.uk/ena/browser/view/%id',
  },
  {
    name: 'EMBL_CON',
    displayName: 'EMBL_CON',
    alive: true,
    uriLink: 'https://www.ebi.ac.uk/ena/browser/view/%id',
  },
  {
    name: 'EMBL_TPA',
    displayName: 'EMBL_TPA',
    alive: false,
    uriLink: 'https://www.ebi.ac.uk/ena/browser/view/%id',
  },
  {
    name: 'EMBL_TSA',
    displayName: 'EMBL_TSA',
    alive: true,
    uriLink: 'https://www.ebi.ac.uk/ena/browser/view/%id',
  },
  {
    name: 'EMBLWGS',
    displayName: 'EMBLWGS',
    alive: true,
    uriLink: 'https://www.ebi.ac.uk/ena/browser/view/%id',
  },
  {
    name: 'ENSEMBL_VERTEBRATE',
    displayName: 'Ensembl',
    alive: true,
    uriLink: 'https://www.ensembl.org/id/%id',
  },
  {
    name: 'ENSEMBL_RAPID',
    displayName: 'EnsemblRapid',
    alive: true,
    uriLink: 'https://rapid.ensembl.org/id/%id',
  },
  {
    name: 'EPO',
    displayName: 'EPO',
    alive: true,
    uriLink: 'https://www.ebi.ac.uk/Tools/dbfetch/dbfetch?db=epo_prt&id=%id',
  },
  {
    name: 'FLYBASE',
    displayName: 'FlyBase',
    alive: true,
    uriLink: 'https://flybase.org/reports/%id.html',
  },
  {
    name: 'FUSION_GDB',
    displayName: 'FusionGDB',
    alive: true,
    uriLink:
      'https://compbio.uth.edu/FusionGDB2/gene_search_result.cgi?type=quick_search&quick_search=%id',
  },
  {
    name: 'H_INV',
    displayName: 'H-InvDB',
    alive: false,
    uriLink: '',
  },
  {
    name: 'IPI',
    displayName: 'IPI',
    alive: false,
    uriLink: '',
  },
  {
    name: 'JPO',
    displayName: 'JPO',
    alive: true,
    uriLink: 'https://www.ebi.ac.uk/Tools/dbfetch/dbfetch?db=jpo_prt&id=%id',
  },
  {
    name: 'KIPO',
    displayName: 'KIPO',
    alive: true,
    uriLink: 'https://www.ebi.ac.uk/Tools/dbfetch/dbfetch?db=kipo_prt&id=%id',
  },
  {
    name: 'PATRIC',
    displayName: 'PATRIC',
    alive: true,
    uriLink: 'https://www.patricbrc.org/view/Feature/%id',
  },
  {
    name: 'PDB',
    displayName: 'PDB',
    alive: true,
    uriLink: 'https://www.ebi.ac.uk/pdbe/entry/pdb/%id',
  },
  {
    name: 'PIR',
    displayName: 'PIR',
    alive: false,
    uriLink: '',
  },
  {
    name: 'PIRARC',
    displayName: 'PIRARC',
    alive: false,
    uriLink: '',
  },
  {
    name: 'PRF',
    displayName: 'PRF',
    alive: false,
    uriLink: 'http://www.prf.or.jp/cgi-bin/seqget.pl?id=%id',
  },
  {
    name: 'REFSEQ',
    displayName: 'RefSeq',
    alive: true,
    uriLink: 'https://www.ncbi.nlm.nih.gov/protein/%id',
  },
  {
    name: 'REMTREMBL',
    displayName: 'REMTREMBL',
    alive: false,
    uriLink: '',
  },
  {
    name: 'SEED',
    displayName: 'SEED',
    alive: true,
    uriLink:
      'https://pubseed.theseed.org/seedviewer.cgi?page=Annotation&feature=%id',
  },
  {
    name: 'SGD',
    displayName: 'SGD',
    alive: true,
    uriLink: 'https://www.yeastgenome.org/locus/%id',
  },
  {
    name: 'SWISSPROT',
    displayName: 'UniProtKB/Swiss-Prot',
    alive: true,
    uriLink: 'https://www.uniprot.org/uniprot/%id',
  },
  {
    name: 'SWISSPROT_VARSPLIC',
    displayName: 'UniProtKB/Swiss-Prot protein isoforms',
    alive: true,
    uriLink: 'https://www.uniprot.org/uniprot/%id',
  },
  {
    name: 'TAIR_ARABIDOPSIS',
    displayName: 'TAIR',
    alive: true,
    uriLink:
      'https://www.arabidopsis.org/servlets/TairObject?type=aa_sequence&name=%id',
  },
  {
    name: 'TREMBL',
    displayName: 'UniProtKB/TrEMBL',
    alive: true,
    uriLink: 'https://www.uniprot.org/uniprot/%id',
  },
  {
    name: 'TREMBLNEW',
    displayName: 'TREMBLNEW',
    alive: false,
    uriLink: '',
  },
  {
    name: 'TREMBL_VARSPLIC',
    displayName: 'TREMBL_VARSPLIC',
    alive: false,
    uriLink: '',
  },
  {
    name: 'TROME',
    displayName: 'TROME',
    alive: true,
    uriLink: '',
  },
  {
    name: 'UNIMES',
    displayName: 'UNIMES',
    alive: false,
    uriLink: '',
  },
  {
    name: 'USPTO',
    displayName: 'USPTO',
    alive: true,
    uriLink: 'https://www.ebi.ac.uk/Tools/dbfetch/dbfetch?db=uspto_prt&id=%id',
  },
  {
    name: 'VECTORBASE',
    displayName: 'VectorBase',
    alive: false,
    uriLink: '',
  },
  {
    name: 'VEGA',
    displayName: 'VEGA',
    alive: true,
    uriLink: 'https://vega.sanger.ac.uk/id/%id',
  },
  {
    name: 'WORMBASE_PARASITE',
    displayName: 'WBParaSite',
    alive: true,
    uriLink: 'https://parasite.wormbase.org/id/%id',
  },
  {
    name: 'WORMBASE',
    displayName: 'WormBase',
    alive: true,
    uriLink: 'https://wormbase.org/db/seq/protein?name=%id;class=CDS',
  },
];

export default allDatabases;
