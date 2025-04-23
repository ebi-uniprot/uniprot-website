import joinUrl from 'url-join';

import { FileFormat } from '../types/resultsDownload';
import { stringifyUrl } from '../utils/url';
import { fileFormatToUrlParameter } from './resultsDownload';

const IntActBase = '//www.ebi.ac.uk/intact/';
const externalUrls = {
  AlphaFoldPrediction: (id: string) =>
    `https://alphafold.ebi.ac.uk/api/prediction/${id}`,
  QuickGOAnnotations: (id: string | number) =>
    `//www.ebi.ac.uk/QuickGO/annotations?geneProductId=${id}`,
  NCBI: (id: string | number) =>
    `https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?lvl=0&id=${id}`,
  // protein centric
  InterPro: (id: string | number) =>
    `https://www.ebi.ac.uk/interpro/protein/${id}`,
  Pfam: (id: string | number) =>
    `https://www.ebi.ac.uk/interpro/protein/UniProt/${id}/entry/pfam/`,
  SMART: (id: string | number) =>
    `https://smart.embl.de/smart/show_motifs.pl?ID=${id}`,
  PROSITE: (id: string | number) =>
    `https://prosite.expasy.org/cgi-bin/prosite/PSScan.cgi?seq=${id}&output=nice`,
  ComplexViewer: (id: string) =>
    `https://www.ebi.ac.uk/intact/complex-ws/export/${id}`,
  ComplexPortal: (id: string) =>
    `https://www.ebi.ac.uk/complexportal/complex/${id}`,
  // GO-CAM
  GeneOntologyModels: (id: string) =>
    `https://api.geneontology.org/api/gp/UniProtKB:${id}/models`,
  GeneOntologyModelInfo: (id: string) =>
    `https://api.geneontology.org/api/go-cam/gomodel:${id}`,
  GeneOntologyUniprotCuratedModels:
    'https://geneontology.cloud/browse/g:UniProt',
  NoctuaAlliancePathwayPreview: (id: string) =>
    `http://noctua.geneontology.org/workbench/noctua-alliance-pathway-preview/?model_id=${id}`,
  // rule
  HAMAPRule: (id: string | number) => `//hamap.expasy.org/unirule/${id}`,
  ProRule: (id: string | number) => `//prosite.expasy.org/unirule/${id}`,
  // domain & families centric
  Gene3DEntry: (id: string | number) =>
    `http://www.cathdb.info/version/latest/superfamily/${`${id}`.replace(
      'G3DSA:',
      ''
    )}`,
  Funfam: (id: string) =>
    `http://www.cathdb.info/version/latest/funfam/${`${id}`.replace(
      'G3DSA:',
      ''
    )}`,
  InterProEntry: (id: string | number) =>
    `https://www.ebi.ac.uk/interpro/entry/InterPro/${id}/`,
  InterProSearch: (searchTerm: string | number) =>
    `https://www.ebi.ac.uk/interpro/search/text/${searchTerm}`,
  InterProRepresentativeDomains: (
    id: string,
    format: FileFormat.json | FileFormat.tsv = FileFormat.json
  ) =>
    stringifyUrl(
      `https://www.ebi.ac.uk/interpro/api/entry/all/protein/uniprot/${id}`,
      {
        type: 'domain',
        page_size: 100, // eslint-disable-line camelcase
        format: fileFormatToUrlParameter[format],
      }
    ),
  // variation
  UniProt: (id: string | number) =>
    `https://web.expasy.org/variant_pages/${id}.html`,
  EnsemblVariation: (id: string | number) =>
    `http://www.ensembl.org/Homo_sapiens/Variation/Explore?v=${id}`,
  EnsemblComponent: (taxid: string | number, id: string | number) =>
    `https://www.ensembl.org/${taxid}/Location/Chromosome?r=${id}`,
  ProtVar: (id: string | number) =>
    `https://www.ebi.ac.uk/ProtVar/query?search=${id}`,
  // citations
  DOI: (id: string | number) => `https://dx.doi.org/${id}`,
  PubMed: (id: string | number) => `https://pubmed.ncbi.nlm.nih.gov/${id}`,
  EuropePMC: (id: string | number) => `//europepmc.org/article/MED/${id}`,
  CommunityCurationGetByAccession: (id: string) =>
    `https://community.uniprot.org/cgi-bin/bbsub_query?accession=${id}`,
  CommunityCurationGetByAccessionAndPmid: (accession: string, pmid: string) =>
    joinUrl(
      `https://community.uniprot.org/bbsub/bbsubinfo.html?accession=${accession}&pmid=${pmid}`
    ),
  CommunityCurationAdd: (id: string | number) =>
    `https://community.uniprot.org/bbsub/bbsub.html?accession=${id}`,
  RheaSearch: (id: string | number) =>
    `https://www.rhea-db.org/rhea?query=${id}`,
  RheaEntry: (id: string | number) => `https://www.rhea-db.org/rhea/${id}`,
  ChEBI: (id: string | number) =>
    `https://www.ebi.ac.uk/chebi/searchId.do?chebiId=${id}`,
  EspacenetPatent: (id: string | number) =>
    `https://worldwide.espacenet.com/textdoc?DB=EPODOC&IDX=${id}`,
};

export const getIntActQueryUrl = (
  firstInteractor: string,
  secondInteractor: string,
  accession?: string
) => {
  const base = joinUrl(IntActBase, 'search');
  if (accession && firstInteractor === secondInteractor) {
    return `${base}?query=(idA:${accession} AND idB:${accession}) OR (idA:${accession} AND idB:"-") OR (idA:"-" AND idB:${accession})#interactor`;
  }
  return `${base}?query=(id:${firstInteractor} AND id:${secondInteractor})#interactor`;
};

export default externalUrls;
