import { generatePath } from 'react-router-dom';

import { getEntryPath, Location, LocationToPath } from '../../app/config/urls';
import { Namespace } from '../../shared/types/namespaces';
import { processUrlTemplate } from '../../shared/utils/xrefs';
import { TabLocation } from '../types/entry';

type InternalSource =
  | 'ARBA'
  | 'Google'
  | 'HAMAP-Rule'
  | 'MobiDB-lite'
  | 'PIRNR'
  | 'PIRSR'
  | 'Proteomes'
  | 'PubMed'
  | 'RuleBase'
  | 'SAAS' // Obsolete?
  | 'SAM'
  | 'UniProtKB'
  | 'UniRule';

type ExternalSource =
  | 'Araport'
  | 'CGD'
  | 'dictyBase'
  | 'EcoGene'
  | 'EMBL'
  | 'Ensembl'
  | 'EnsemblBacteria'
  | 'EnsemblFungi'
  | 'EnsemblMetazoa'
  | 'EnsemblPlants'
  | 'EnsemblProtists'
  | 'EuropePMC'
  | 'FlyBase'
  | 'HGNC'
  | 'MGI'
  | 'MIM'
  | 'PDB'
  | 'PeptideAtlas'
  | 'Pfam'
  | 'PIR'
  | 'PomBase'
  | 'PRIDE'
  | 'PROSITE'
  | 'PROSITE-ProRule'
  | 'ProteomicsDB'
  | 'PTMeXchange'
  | 'Reference'
  | 'RefSeq'
  | 'RGD'
  | 'SGD'
  | 'SMART'
  | 'TubercuList'
  | 'VectorBase'
  | 'VGNC'
  | 'WBParaSite'
  | 'WormBase'
  | 'Xenbase'
  | 'ZFIN';

export type EvidenceSource = InternalSource | ExternalSource;

const internalEvidenceUrls: Record<InternalSource, (value: string) => string> =
  {
    ARBA: (value) => getEntryPath(Namespace.arba, value),
    Google: () =>
      generatePath(LocationToPath[Location.HelpEntry], {
        accession: 'ProtNLM',
      }),
    'HAMAP-Rule': (value) => getEntryPath(Namespace.unirule, value),
    'MobiDB-lite': () =>
      generatePath(LocationToPath[Location.HelpEntry], { accession: 'sam' }),
    PIRNR: (value) => getEntryPath(Namespace.unirule, value),
    PIRSR: (value) => getEntryPath(Namespace.unirule, value),
    Proteomes: (value) => getEntryPath(Namespace.proteomes, value),
    PubMed: (value) => getEntryPath(Namespace.citations, value),
    RuleBase: (value) => getEntryPath(Namespace.unirule, value),
    SAAS: (value) => getEntryPath(Namespace.unirule, value),
    SAM: () =>
      generatePath(LocationToPath[Location.HelpEntry], { accession: 'sam' }),
    UniProtKB: (value) =>
      getEntryPath(Namespace.uniprotkb, value, TabLocation.Entry),
    UniRule: (value) => getEntryPath(Namespace.unirule, value),
  };

const ensemblGenomeslUrl = 'https://www.ensemblgenomes.org/id/%value';
const proteomicsMappingReadmeUrl =
  'https://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/proteomics_mapping/README';
const proteomeXchangeUrl =
  'https://proteomecentral.proteomexchange.org/dataset/%value';

const evidenceUrls: Record<ExternalSource, string> = {
  Araport: 'https://apps.araport.org/thalemine/portal.do?externalids=%value',
  CGD: 'http://www.candidagenome.org/cgi-bin/locus.pl?dbid=%value',
  dictyBase: 'http://dictybase.org/gene/%value',
  EcoGene: 'http://www.ecogene.org/geneInfo.php?eg_id=%value',
  EMBL: 'https://www.ebi.ac.uk/ena/data/view/%value',
  Ensembl: 'https://www.ensembl.org/id/%value',
  EnsemblBacteria: ensemblGenomeslUrl,
  EnsemblFungi: ensemblGenomeslUrl,
  EnsemblMetazoa: ensemblGenomeslUrl,
  EnsemblPlants: ensemblGenomeslUrl,
  EnsemblProtists: ensemblGenomeslUrl,
  EuropePMC: 'https://europepmc.org/abstract/MED/%value',
  FlyBase: 'http://flybase.org/reports/%value.html',
  HGNC: 'https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/%value',
  MGI: 'http://www.informatics.jax.org/marker/%value',
  MIM: 'http://www.omim.org/entry/%value',
  PDB: 'https://www.ebi.ac.uk/pdbe-srv/view/entry/%value',
  PeptideAtlas: proteomicsMappingReadmeUrl,
  Pfam: 'http://pfam.xfam.org/family/%value',
  PIR: 'http://pir.georgetown.edu/cgi-bin/nbrfget?uid=%value',
  PomBase: 'https://www.pombase.org/spombe/result/%value',
  PRIDE: proteomeXchangeUrl, // PTM specific, use ProteomeXchange consortium site
  PTMeXchange: proteomeXchangeUrl, // PTM specific, use ProteomeXchange consortium site
  PROSITE: 'https://prosite.expasy.org/doc/%value',
  'PROSITE-ProRule': 'https://prosite.expasy.org/unirule/%value',
  ProteomicsDB: proteomicsMappingReadmeUrl,
  Reference: '',
  RefSeq: 'https://www.ncbi.nlm.nih.gov/protein/%value',
  RGD: 'http://rgd.mcw.edu/tools/genes/genes_view.cgi?id=%value',
  SGD: 'https://www.yeastgenome.org/locus/%value',
  SMART: 'http://smart.embl.de/smart/do_annotation.pl?DOMAIN=%value',
  TubercuList: 'https://mycobrowser.epfl.ch/genes/%value',
  VectorBase: 'https://www.vectorbase.org/id/%value',
  VGNC: 'https://vertebrate.genenames.org/data/gene-symbol-report/#!/vgnc_id/%value',
  WBParaSite: 'http://parasite.wormbase.org/id/%value',
  WormBase: 'https://wormbase.org/species/c_elegans/cds/%value',
  Xenbase:
    'http://www.xenbase.org/gene/showgene.do?method=display&geneId=%value',
  ZFIN: 'http://zfin.org/cgi-bin/webdriver?MIval=aa-markerview.apg&OID=%value',
};

export const formatEvidenceContent = (id: string, source?: string) => {
  if (id.match(/^ARBA[0-9]{8}/)) {
    return `ARBA: ${id}`;
  }
  if (id.match(/^MF_[0-9]{5}/)) {
    return `UniRule HAMAP-Rule: ${id}`;
  }
  if (id.match(/^RU[0-9]{6}/)) {
    return `UniRule RuleBase: ${id}`;
  }
  if (id.match(/^PIRNR[0-9]+/)) {
    return `UniRule PIRNR: ${id}`;
  }
  if (id.match(/^PIRSR[0-9]+(\\-[0-9]+)?/)) {
    return `UniRule PIRSR: ${id}`;
  }
  if (id.match(/^PRU[0-9]{5}/)) {
    return `UniRule PROSITE-ProRule: ${id}`;
  }
  // regexp generated from https://www.ebi.ac.uk/pride/markdownpage/submitdatapage "PXDxxxxxx"
  if (id.match(/^PXD\d{6}/)) {
    return `ProteomeXchange: ${id}`;
  }
  return `${source}: ${id}`;
};

export const getEvidenceLink = (
  source: string,
  value: string
): { url?: string | null; isInternal: boolean } => {
  // source could be any string
  if (source in internalEvidenceUrls) {
    // source is a known internal source
    const url = internalEvidenceUrls[source as InternalSource](value);
    return { url, isInternal: true };
  }
  return {
    url: processUrlTemplate(evidenceUrls[source as ExternalSource], {
      value,
    }),
    isInternal: false,
  };
};
