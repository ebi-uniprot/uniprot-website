import joinUrl from 'url-join';

const IntActBase = '//www.ebi.ac.uk/intact/';
const externalUrls: Record<string, (id: string | number) => string> = {
  QuickGO: (id) => `//www.ebi.ac.uk/QuickGO/term/${id}`,
  QuickGOAnnotations: (id) =>
    `//www.ebi.ac.uk/QuickGO/annotations?geneProductId=${id}`,
  NCBI: (id) =>
    `https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?lvl=0&id=${id}`,
  NCBINucleotide: (id) => `https://www.ncbi.nlm.nih.gov/nuccore/${id}`,
  ENA: (id) => `//www.ebi.ac.uk/ena/data/view/${id}`,
  // protein centric
  InterPro: (id) => `https://www.ebi.ac.uk/interpro/protein/${id}`,
  Pfam: (id) =>
    `https://www.ebi.ac.uk/interpro/protein/UniProt/${id}/entry/pfam/`,
  SMART: (id) => `https://smart.embl.de/smart/show_motifs.pl?ID=${id}`,
  PROSITE: (id) =>
    `https://prosite.expasy.org/cgi-bin/prosite/PSScan.cgi?seq=${id}&output=nice`,
  // rule
  HAMAPRule: (id) => `//hamap.expasy.org/unirule/${id}`,
  ProRule: (id) => `//prosite.expasy.org/unirule/${id}`,
  // domain & families centric
  CDDEntry: (id) =>
    `//www.ncbi.nlm.nih.gov/Structure/cdd/cddsrv.cgi?uid=${id}}`,
  Gene3DEntry: (id) =>
    `http://www.cathdb.info/version/latest/superfamily/${`${id}`.replace(
      'G3DSA:',
      ''
    )}`,
  HAMAPEntry: (id) => `//hamap.expasy.org/signature/${id}`,
  PIRSFEntry: (id) =>
    `https://proteininformationresource.org/cgi-bin/ipcSF?id=${id}`,
  PRINTSEntry: (id) =>
    `http://www.bioinf.manchester.ac.uk/cgi-bin/dbbrowser/sprint/searchprintss.cgi?prints_accn=${id}&display_opts=Prints&category=None&queryform=false&regexpr=off`,
  PANTHEREntry: (id) =>
    `http://www.pantherdb.org/panther/family.do?clsAccession=${id}`,
  PfamEntry: (id) => `https://www.ebi.ac.uk/interpro/entry/pfam/${id}`,
  PROSITEEntry: (id) => `//prosite.expasy.org/${id}`,
  SFLDEntry: (id) => `http://sfld.rbvi.ucsf.edu/django/family/${id}/`,
  SMARTEntry: (id) =>
    `http://smart.embl-heidelberg.de/smart/do_annotation.pl?DOMAIN=${id}`,
  SUPFAMEntry: (id) =>
    `http://supfam.org/SUPERFAMILY/cgi-bin/scop.cgi?ipid=${id}`,
  TIGRFAMsEntry: (id) =>
    `http://www.jcvi.org/cgi-bin/tigrfams/HmmReportPage.cgi?acc=${id}`,
  InterProEntry: (id) => `https://www.ebi.ac.uk/interpro/entry/InterPro/${id}/`,
  InterProSearch: (searchTerm) =>
    `https://www.ebi.ac.uk/interpro/search/text/${searchTerm}`,
  // variants
  variant: (id) => `https://web.expasy.org/variant_pages/${id}.html`,
  dbSNP: (id) => `https://www.ncbi.nlm.nih.gov/snp/${id}`,
  // citations
  DOI: (id) => `https://dx.doi.org/${id}`,
  PubMed: (id) => `https://pubmed.ncbi.nlm.nih.gov/${id}`,
  EuropePMC: (id) => `//europepmc.org/article/MED/${id}`,
  CommunityCurationGet: (id) =>
    `https://community.uniprot.org/cgi-bin/bbsub_query?accession=${id}`,
  CommunityCurationAdd: (id) =>
    `https://community.uniprot.org/bbsub/bbsub.html?accession=${id}`,
  ENZYME: (id) => `https://enzyme.expasy.org/EC/${id}`,
  RheaSearch: (id) => `https://www.rhea-db.org/rhea?query=${id}`,
  RheaEntry: (id) => `https://www.rhea-db.org/rhea/${id}`,
  ChEBI: (id) => `https://www.ebi.ac.uk/chebi/searchId.do?chebiId=${id}`,
  EspacenetPatent: (id) =>
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
