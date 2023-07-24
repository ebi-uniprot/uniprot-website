import joinUrl from 'url-join';

const IntActBase = '//www.ebi.ac.uk/intact/';
const externalUrls = {
  QuickGO: (id: string | number) => `//www.ebi.ac.uk/QuickGO/term/${id}`,
  QuickGOAnnotations: (id: string | number) =>
    `//www.ebi.ac.uk/QuickGO/annotations?geneProductId=${id}`,
  NCBI: (id: string | number) =>
    `https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?lvl=0&id=${id}`,
  NCBINucleotide: (id: string | number) =>
    `https://www.ncbi.nlm.nih.gov/nuccore/${id}`,
  ENA: (id: string | number) => `//www.ebi.ac.uk/ena/data/view/${id}`,
  ENABrowser: (id: string | number) => `//www.ebi.ac.uk/ena/browser/view/${id}`,
  // protein centric
  InterPro: (id: string | number) =>
    `https://www.ebi.ac.uk/interpro/protein/${id}`,
  Pfam: (id: string | number) =>
    `https://www.ebi.ac.uk/interpro/protein/UniProt/${id}/entry/pfam/`,
  SMART: (id: string | number) =>
    `https://smart.embl.de/smart/show_motifs.pl?ID=${id}`,
  PROSITE: (id: string | number) =>
    `https://prosite.expasy.org/cgi-bin/prosite/PSScan.cgi?seq=${id}&output=nice`,
  // rule
  HAMAPRule: (id: string | number) => `//hamap.expasy.org/unirule/${id}`,
  ProRule: (id: string | number) => `//prosite.expasy.org/unirule/${id}`,
  // domain & families centric
  CDDEntry: (id: string | number) =>
    `//www.ncbi.nlm.nih.gov/Structure/cdd/cddsrv.cgi?uid=${id}}`,
  Gene3DEntry: (id: string | number) =>
    `http://www.cathdb.info/version/latest/superfamily/${`${id}`.replace(
      'G3DSA:',
      ''
    )}`,
  HAMAPEntry: (id: string | number) => `//hamap.expasy.org/signature/${id}`,
  PIRSFEntry: (id: string | number) =>
    `https://proteininformationresource.org/cgi-bin/ipcSF?id=${id}`,
  PRINTSEntry: (id: string | number) =>
    `http://www.bioinf.manchester.ac.uk/cgi-bin/dbbrowser/sprint/searchprintss.cgi?prints_accn=${id}&display_opts=Prints&category=None&queryform=false&regexpr=off`,
  PANTHEREntry: (id: string | number) =>
    `http://www.pantherdb.org/panther/family.do?clsAccession=${id}`,
  PfamEntry: (id: string | number) =>
    `https://www.ebi.ac.uk/interpro/entry/pfam/${id}`,
  PROSITEEntry: (id: string | number) => `//prosite.expasy.org/${id}`,
  SFLDEntry: (id: string | number) =>
    `http://sfld.rbvi.ucsf.edu/django/family/${id}/`,
  SMARTEntry: (id: string | number) =>
    `http://smart.embl-heidelberg.de/smart/do_annotation.pl?DOMAIN=${id}`,
  SUPFAMEntry: (id: string | number) =>
    `http://supfam.org/SUPERFAMILY/cgi-bin/scop.cgi?ipid=${id}`,
  TIGRFAMsEntry: (id: string | number) =>
    `http://www.jcvi.org/cgi-bin/tigrfams/HmmReportPage.cgi?acc=${id}`,
  InterProEntry: (id: string | number) =>
    `https://www.ebi.ac.uk/interpro/entry/InterPro/${id}/`,
  InterProSearch: (searchTerm: string | number) =>
    `https://www.ebi.ac.uk/interpro/search/text/${searchTerm}`,
  // variation
  UniProt: (id: string | number) =>
    `https://web.expasy.org/variant_pages/${id}.html`,
  dbSNP: (id: string | number) => `https://www.ncbi.nlm.nih.gov/snp/${id}`,
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
  CommunityCurationGet: (id: string | number) =>
    `https://community.uniprot.org/cgi-bin/bbsub_query?accession=${id}`,
  CommunityCurationAdd: (id: string | number) =>
    `https://community.uniprot.org/bbsub/bbsub.html?accession=${id}`,
  ENZYME: (id: string | number) => `https://enzyme.expasy.org/EC/${id}`,
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
