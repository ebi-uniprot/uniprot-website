import { generatePath } from 'react-router-dom';

import { getEntryPath, LocationToPath, Location } from '../../app/config/urls';
import { processUrlTemplate } from '../../shared/utils/xrefs';

import { Namespace } from '../../shared/types/namespaces';

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
  | 'EPD'
  | 'EuropePMC'
  | 'FlyBase'
  | 'HGNC'
  | 'MaxQB'
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
    UniProtKB: (value) => getEntryPath(Namespace.uniprotkb, value),
    UniRule: (value) => getEntryPath(Namespace.unirule, value),
  };

export const evidenceUrls: Record<ExternalSource, string> = {
  Araport: 'https://apps.araport.org/thalemine/portal.do?externalids=%value',
  CGD: 'http://www.candidagenome.org/cgi-bin/locus.pl?dbid=%value',
  dictyBase: 'http://dictybase.org/gene/%value',
  EcoGene: 'http://www.ecogene.org/geneInfo.php?eg_id=%value',
  EMBL: 'https://www.ebi.ac.uk/ena/data/view/%value',
  Ensembl: 'https://www.ensembl.org/id/%value',
  EnsemblBacteria: 'http://www.ensemblgenomes.org/id/%value',
  EnsemblFungi: 'http://www.ensemblgenomes.org/id/%value',
  EnsemblMetazoa: 'http://www.ensemblgenomes.org/id/%value',
  EnsemblPlants: 'http://www.ensemblgenomes.org/id/%value',
  EnsemblProtists: 'http://www.ensemblgenomes.org/id/%value',
  EPD: 'ftp://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/proteomics_mapping/README',
  EuropePMC: 'https://europepmc.org/abstract/MED/%value',
  FlyBase: 'http://flybase.org/reports/%value.html',
  HGNC: 'https://www.genenames.org/cgi-bin/gene_symbol_report?hgnc_id=%value',
  MaxQB:
    'ftp://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/proteomics_mapping/README',
  MGI: 'http://www.informatics.jax.org/marker/%value',
  MIM: 'http://www.omim.org/entry/%value',
  PDB: 'https://www.ebi.ac.uk/pdbe-srv/view/entry/%value',
  PeptideAtlas:
    'ftp://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/proteomics_mapping/README',
  Pfam: 'http://pfam.xfam.org/family/%value',
  PIR: 'http://pir.georgetown.edu/cgi-bin/nbrfget?uid=%value',
  PomBase: 'https://www.pombase.org/spombe/result/%value',
  PRIDE: 'https://www.ebi.ac.uk/pride/archive/projects/%value',
  PROSITE: 'https://prosite.expasy.org/doc/%value',
  'PROSITE-ProRule': 'https://prosite.expasy.org/unirule/%value',
  ProteomicsDB:
    'ftp://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/proteomics_mapping/README',
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
    return `PRIDE: ${id}`;
  }
  return `${source}: ${id}`;
};

export const getEvidenceLink = (
  source: string,
  value: string
): { url?: string; isInternal: boolean } => {
  // source could be any string
  if (source in internalEvidenceUrls) {
    // source is a known internal source
    const url = internalEvidenceUrls[source as InternalSource](value);
    return { url, isInternal: true };
  }
  if (source in evidenceUrls) {
    // source is a known external source
    const url = processUrlTemplate(evidenceUrls[source as ExternalSource], {
      value,
    });
    return { url, isInternal: false };
  }
  // source is an unregistered external source
  return { isInternal: false };
};
