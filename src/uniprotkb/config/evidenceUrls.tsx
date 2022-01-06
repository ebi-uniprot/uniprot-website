import { ExternalLink } from 'franklin-sites';
import { Link } from 'react-router-dom';

import { getEntryPath } from '../../app/config/urls';
import { Namespace } from '../../shared/types/namespaces';
import { processUrlTemplate } from '../components/protein-data-views/XRefView';

type InternalSource =
  | 'HAMAP-Rule'
  | 'PIRNR'
  | 'PIRSR'
  | 'Proteomes'
  | 'PubMed'
  | 'SAM'
  | 'MobiDB-lite'
  | 'RuleBase'
  | 'SAAS' // Obsolete?
  | 'ARBA'
  | 'UniRule'
  | 'UniProtKB';

type ExternalSource =
  | 'Araport'
  | 'CGD'
  | 'EMBL'
  | 'EPD'
  | 'Ensembl'
  | 'EnsemblBacteria'
  | 'EnsemblFungi'
  | 'EnsemblMetazoa'
  | 'EnsemblPlants'
  | 'EnsemblProtists'
  | 'FlyBase'
  | 'HGNC'
  | 'MGI'
  | 'MaxQB'
  | 'PDB'
  | 'PIR'
  | 'PROSITE'
  | 'PROSITE-ProRule'
  | 'PeptideAtlas'
  | 'Pfam'
  | 'PomBase'
  | 'RGD'
  | 'RefSeq'
  | 'SGD'
  | 'SMART'
  | 'VGNC'
  | 'VectorBase'
  | 'WBParaSite'
  | 'WormBase'
  | 'Xenbase'
  | 'ZFIN'
  | 'Reference'
  | 'dictyBase'
  | 'MIM'
  | 'EcoGene'
  | 'TubercuList'
  | 'ProteomicsDB'
  | 'EuropePMC';

export type EvidenceSource = InternalSource | ExternalSource;

const internalEvidenceUrls: Record<InternalSource, (value: string) => string> =
  {
    'HAMAP-Rule': (value) => getEntryPath(Namespace.unirule, value),
    PIRNR: (value) => getEntryPath(Namespace.unirule, value),
    PIRSR: (value) => getEntryPath(Namespace.unirule, value),
    Proteomes: (value) => getEntryPath(Namespace.proteomes, value),
    PubMed: (value) => getEntryPath(Namespace.citations, value),
    SAM: () => 'https://www.uniprot.org/help/sam',
    RuleBase: (value) => getEntryPath(Namespace.unirule, value),
    SAAS: (value) => getEntryPath(Namespace.unirule, value),
    ARBA: (value) => getEntryPath(Namespace.arba, value),
    UniRule: (value) => getEntryPath(Namespace.unirule, value),
    UniProtKB: (value) => getEntryPath(Namespace.uniprotkb, value),
    'MobiDB-lite': () => 'https://www.uniprot.org/help/MobiDB-lite',
  };

const evidenceUrls: Record<ExternalSource, string> = {
  Araport: 'https://apps.araport.org/thalemine/portal.do?externalids=%value',
  CGD: 'http://www.candidagenome.org/cgi-bin/locus.pl?dbid=%value',
  EMBL: 'https://www.ebi.ac.uk/ena/data/view/%value',
  EPD: 'ftp://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/proteomics_mapping/README',
  Ensembl: 'https://www.ensembl.org/id/%value',
  EnsemblBacteria: 'http://www.ensemblgenomes.org/id/%value',
  EnsemblFungi: 'http://www.ensemblgenomes.org/id/%value',
  EnsemblMetazoa: 'http://www.ensemblgenomes.org/id/%value',
  EnsemblPlants: 'http://www.ensemblgenomes.org/id/%value',
  EnsemblProtists: 'http://www.ensemblgenomes.org/id/%value',
  FlyBase: 'http://flybase.org/reports/%value.html',
  HGNC: 'https://www.genenames.org/cgi-bin/gene_symbol_report?hgnc_id=%value',
  MGI: 'http://www.informatics.jax.org/marker/%value',
  MaxQB:
    'ftp://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/proteomics_mapping/README',
  PDB: 'https://www.ebi.ac.uk/pdbe-srv/view/entry/%value',
  PIR: 'http://pir.georgetown.edu/cgi-bin/nbrfget?uid=%value',
  PROSITE: 'https://prosite.expasy.org/doc/%value',
  'PROSITE-ProRule': 'https://prosite.expasy.org/unirule/%value',
  PeptideAtlas:
    'ftp://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/proteomics_mapping/README',
  Pfam: 'http://pfam.xfam.org/family/%value',
  PomBase: 'https://www.pombase.org/spombe/result/%value',
  RGD: 'http://rgd.mcw.edu/tools/genes/genes_view.cgi?id=%value',
  RefSeq: 'https://www.ncbi.nlm.nih.gov/protein/%value',
  SGD: 'https://www.yeastgenome.org/locus/%value',
  SMART: 'http://smart.embl.de/smart/do_annotation.pl?DOMAIN=%value',
  VGNC: 'https://vertebrate.genenames.org/data/gene-symbol-report/#!/vgnc_id/%value',
  VectorBase: 'https://www.vectorbase.org/id/%value',
  WBParaSite: 'http://parasite.wormbase.org/id/%value',
  WormBase: 'https://wormbase.org/species/c_elegans/cds/%value',
  Xenbase:
    'http://www.xenbase.org/gene/showgene.do?method=display&geneId=%value',
  ZFIN: 'http://zfin.org/cgi-bin/webdriver?MIval=aa-markerview.apg&OID=%value',
  Reference: '',
  dictyBase: 'http://dictybase.org/gene/%value',
  MIM: 'http://www.omim.org/entry/%value',
  EcoGene: 'http://www.ecogene.org/geneInfo.php?eg_id=%value',
  TubercuList: 'https://mycobrowser.epfl.ch/genes/%value',
  ProteomicsDB:
    'ftp://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/proteomics_mapping/README',
  EuropePMC: 'https://europepmc.org/abstract/MED/%value',
};

export const formatEvidenceContent = (id: string) => {
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
  return id;
};

export const getEvidenceLink = (source: EvidenceSource, value: string) => {
  if (Object.keys(internalEvidenceUrls).includes(source)) {
    const url = internalEvidenceUrls[source as InternalSource](value);
    return { url, isInternal: true };
  }
  if (Object.keys(evidenceUrls).includes(source)) {
    const url = processUrlTemplate(evidenceUrls[source as ExternalSource], {
      value,
    });
    return { url, isInternal: false };
  }
  return { url: null, isInternal: false };
};

const EvidenceLink = ({
  source,
  value,
  className,
}: {
  source: EvidenceSource;
  value?: string;
  className?: string;
}) => {
  if (!value) {
    return null;
  }

  const { url, isInternal } = getEvidenceLink(source, value);

  if (!url) {
    return <>{formatEvidenceContent(value)}</>;
  }

  return isInternal ? (
    // eslint-disable-next-line uniprot-website/use-config-location
    <Link to={url} className={className}>
      {formatEvidenceContent(value)}
    </Link>
  ) : (
    <ExternalLink url={url} className={className}>
      {formatEvidenceContent(value)}
    </ExternalLink>
  );
};

export default EvidenceLink;
