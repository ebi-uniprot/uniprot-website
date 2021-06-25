import joinUrl from 'url-join';

const IntActBase = '//www.ebi.ac.uk/intact/';

const externalUrls: Record<string, (id: string | number) => string> = {
  QuickGO: (id) => `//www.ebi.ac.uk/QuickGO/term/${id}`,
  NCBI: (id) =>
    `https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?lvl=0&id=${id}`,
  ENA: (id) => `//www.ebi.ac.uk/ena/data/view/${id}`,
  ENABrowser: (id) => `//www.ebi.ac.uk/ena/browser/view/${id}`,
  // protein centric
  InterPro: (id) => `https://www.ebi.ac.uk/interpro/protein/${id}`,
  Pfam: (id) => `http://pfam.xfam.org/protein/${id}`,
  SMART: (id) => `https://smart.embl.de/smart/show_motifs.pl?ID=${id}`,
  PROSITE: (id) =>
    `https://prosite.expasy.org/cgi-bin/prosite/PSScan.cgi?seq=${id}&output=nice`,
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
  PfamEntry: (id) => `//pfam.xfam.org/family/${id}`,
  PROSITEEntry: (id) => `//prosite.expasy.org/${id}`,
  SFLDEntry: (id) => `http://sfld.rbvi.ucsf.edu/django/family/${id}/`,
  SMARTEntry: (id) =>
    `http://smart.embl-heidelberg.de/smart/do_annotation.pl?DOMAIN=${id}`,
  SUPFAMEntry: (id) =>
    `http://supfam.org/SUPERFAMILY/cgi-bin/scop.cgi?ipid=${id}`,
  TIGRFAMsEntry: (id) =>
    `http://www.jcvi.org/cgi-bin/tigrfams/HmmReportPage.cgi?acc=${id}`,
  InterProEntry: (id) => `https://www.ebi.ac.uk/interpro/entry/InterPro/${id}/`,
  // citations
  DOI: (id) => `https://dx.doi.org/${id}`,
  PubMed: (id) => `https://pubmed.ncbi.nlm.nih.gov/${id}`,
  EuropePMC: (id) => `//europepmc.org/article/MED/${id}`,
  CommunityCurationGet: (id) =>
    ` https://community.uniprot.org/bbsub/bbsubinfo.html?accession=${id}`,
  CommunityCurationAdd: (id) =>
    `https://community.uniprot.org/bbsub/bbsub.html?accession=${id}`,
};

export const getIntActQueryForAccessionUrl = (accession: string) =>
  joinUrl(
    IntActBase,
    'query',
    `(  idA:${accession} AND idB:${accession}  ) OR (  idA:${accession} AND idB:-  ) OR (  idA:- AND idB:${accession}  )`
  );

export const getIntActQueryUrl = (
  firstInteractor: string,
  secondInteractor: string
) =>
  joinUrl(IntActBase, 'query', `(${firstInteractor} AND ${secondInteractor})`);

export default externalUrls;
