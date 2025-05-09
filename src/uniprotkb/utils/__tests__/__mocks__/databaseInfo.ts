import { DatabaseInfo } from '../../../types/databaseRefs';

// NOTE: UniPathway is a special database in that it is no longer operating due
// to lack of funding at SIB but we want to keep showing it for when it is up
// and running again. Until then it will have no uriLink.

// TODO: update when TRM-29539 is fixed and deployed
// Source: configure/uniprotkb/allDatabases
// Retrieved: 2025-04-22
const databaseInfo: DatabaseInfo = [
  {
    name: 'EMBL',
    displayName: 'EMBL',
    category: 'SEQ',
    uriLink: 'https://www.ebi.ac.uk/ena/browser/view/%id',
    attributes: [
      {
        name: 'ProteinId',
        xmlTag: 'protein sequence ID',
        uriLink: 'https://www.ebi.ac.uk/ena/data/view/%ProteinId',
      },
      {
        name: 'Status',
        xmlTag: 'status',
      },
      {
        name: 'MoleculeType',
        xmlTag: 'molecule type',
      },
    ],
  },
  {
    name: 'GenBank',
    displayName: 'GenBank',
    category: 'SEQ',
    uriLink: 'https://www.ncbi.nlm.nih.gov/protein/%id',
    attributes: [
      {
        name: 'ProteinId',
        xmlTag: 'protein sequence ID',
        uriLink: 'https://www.ncbi.nlm.nih.gov/nuccore/%ProteinId',
      },
      {
        name: 'Status',
        xmlTag: 'status',
      },
      {
        name: 'MoleculeType',
        xmlTag: 'molecule type',
      },
    ],
    implicit: true,
    linkedReason: 'DR:EMBL',
  },
  {
    name: 'DDBJ',
    displayName: 'DDBJ',
    category: 'SEQ',
    uriLink: 'https://getentry.ddbj.nig.ac.jp/search/get_entry?accnumber=%id',
    attributes: [
      {
        name: 'ProteinId',
        xmlTag: 'protein sequence ID',
        uriLink: 'https://getentry.ddbj.nig.ac.jp/getentry/na/%ProteinId',
      },
      {
        name: 'Status',
        xmlTag: 'status',
      },
      {
        name: 'MoleculeType',
        xmlTag: 'molecule type',
      },
    ],
    implicit: true,
    linkedReason: 'DR:EMBL',
  },
  {
    name: 'CCDS',
    displayName: 'CCDS',
    category: 'SEQ',
    uriLink:
      'https://www.ncbi.nlm.nih.gov/CCDS/CcdsBrowse.cgi?REQUEST=CCDS&GO=MainBrowse&DATA=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'PIR',
    displayName: 'PIR',
    category: 'SEQ',
    uriLink: 'https://proteininformationresource.org/cgi-bin/nbrfget?uid=%id',
    attributes: [
      {
        name: 'EntryName',
        xmlTag: 'entry name',
      },
    ],
  },
  {
    name: 'RefSeq',
    displayName: 'RefSeq',
    category: 'SEQ',
    uriLink: 'https://www.ncbi.nlm.nih.gov/protein/%id',
    attributes: [
      {
        name: 'NucleotideSequenceId',
        xmlTag: 'nucleotide sequence ID',
        uriLink: 'https://www.ncbi.nlm.nih.gov/nuccore/%NucleotideSequenceId',
      },
    ],
  },
  {
    name: 'PDB',
    displayName: 'PDB',
    category: '3DS',
    uriLink: 'https://www.ebi.ac.uk/pdbe-srv/view/entry/%id',
    attributes: [
      {
        name: 'Method',
        xmlTag: 'method',
      },
      {
        name: 'Resolution',
        xmlTag: 'resolution',
      },
      {
        name: 'Chains',
        xmlTag: 'chains',
      },
    ],
  },
  {
    name: 'PDBsum',
    displayName: 'PDBsum',
    category: '3DS',
    uriLink: 'https://www.ebi.ac.uk/pdbsum/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'PCDDB',
    displayName: 'PCDDB',
    category: '3DS',
    uriLink: 'https://pcddb.cryst.bbk.ac.uk/uniprot/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'SASBDB',
    displayName: 'SASBDB',
    category: '3DS',
    uriLink: 'https://www.sasbdb.org/uniprot/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'BMRB',
    displayName: 'BMRB',
    category: '3DS',
    uriLink: 'https://bmrb.io/data_library/summary/protein.php?uniprot=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'ModBase',
    displayName: 'ModBase',
    category: '3DS',
    uriLink:
      'https://salilab.org/modbase-cgi/model_search.cgi?searchkw=name&kword=%primaryAccession',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: true,
    linkedReason: 'All UniProtKB entries',
  },
  {
    name: 'SMR',
    displayName: 'SMR',
    category: '3DS',
    uriLink: 'https://swissmodel.expasy.org/repository/uniprot/%id?csm=%crc64',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'SWISS-MODEL-Workspace',
    displayName: 'SWISS-MODEL-Workspace',
    category: '3DS',
    uriLink: 'https://swissmodel.expasy.org/interactive/?ac=%primaryAccession',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: true,
    linkedReason: 'DR:SMR<1',
  },
  {
    name: 'PDBe-KB',
    displayName: 'PDBe-KB',
    category: '3DS',
    uriLink: 'https://pdbe-kb.org/proteins/%primaryAccession',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: true,
    linkedReason: 'DR: PDB',
  },
  {
    name: 'PDBj',
    displayName: 'PDBj',
    category: '3DS',
    uriLink: 'https://pdbj.org/mine/summary/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: true,
    linkedReason: 'DR: PDB',
  },
  {
    name: 'RCSB-PDB',
    displayName: 'RCSB PDB',
    category: '3DS',
    uriLink: 'https://www.rcsb.org/structure/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: true,
    linkedReason: 'DR: PDB',
  },
  {
    name: 'BioGRID',
    displayName: 'BioGRID',
    category: 'PPI',
    uriLink: 'https://thebiogrid.org/%id',
    attributes: [
      {
        name: 'Interactions',
        xmlTag: 'interactions',
      },
    ],
  },
  {
    name: 'ComplexPortal',
    displayName: 'ComplexPortal',
    category: 'PPI',
    uriLink: 'https://www.ebi.ac.uk/complexportal/complex/%id',
    attributes: [
      {
        name: 'EntryName',
        xmlTag: 'entry name',
      },
    ],
  },
  {
    name: 'CORUM',
    displayName: 'CORUM',
    category: 'PPI',
    uriLink: 'https://mips.helmholtz-muenchen.de/corum/#?uniprotID=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'DIP',
    displayName: 'DIP',
    category: 'PPI',
    uriLink: 'https://dip.doe-mbi.ucla.edu/dip/Browse.cgi?ID=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'ELM',
    displayName: 'ELM',
    category: 'PPI',
    uriLink: 'http://elm.eu.org/instances.html?q=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'IntAct',
    displayName: 'IntAct',
    category: 'PPI',
    uriLink:
      'https://www.ebi.ac.uk/intact/search?query=id:%primaryAccession*#interactor',
    attributes: [
      {
        name: 'Interactions',
        xmlTag: 'interactions',
      },
    ],
  },
  {
    name: 'MINT',
    displayName: 'MINT',
    category: 'PPI',
    uriLink: 'https://mint.bio.uniroma2.it/cgi-bin/protein.py?id=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'STRING',
    displayName: 'STRING',
    category: 'PPI',
    uriLink: 'https://string-db.org/network/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'BindingDB',
    displayName: 'BindingDB',
    category: 'CHEMISTRY',
    uriLink: 'https://www.bindingdb.org/uniprot/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'ChEMBL',
    displayName: 'ChEMBL',
    category: 'CHEMISTRY',
    uriLink: 'https://www.ebi.ac.uk/chembl/target_report_card/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'DrugBank',
    displayName: 'DrugBank',
    category: 'CHEMISTRY',
    uriLink: 'https://www.drugbank.ca/drugs/%id',
    attributes: [
      {
        name: 'GenericName',
        xmlTag: 'generic name',
      },
    ],
  },
  {
    name: 'GuidetoPHARMACOLOGY',
    displayName: 'GuidetoPHARMACOLOGY',
    category: 'CHEMISTRY',
    uriLink:
      'https://www.guidetopharmacology.org/GRAC/ObjectDisplayForward?objectId=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'SwissLipids',
    displayName: 'SwissLipids',
    category: 'CHEMISTRY',
    uriLink: 'https://www.swisslipids.org/#/entity/%id/',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'Allergome',
    displayName: 'Allergome',
    category: 'PFAM',
    uriLink: 'https://www.allergome.org/script/dettaglio.php?id_molecule=%id',
    attributes: [
      {
        name: 'AllergenName',
        xmlTag: 'allergen name',
      },
    ],
  },
  {
    name: 'CAZy',
    displayName: 'CAZy',
    category: 'PFAM',
    uriLink: 'https://www.cazy.org/%id.html',
    attributes: [
      {
        name: 'FamilyName',
        xmlTag: 'family name',
      },
    ],
  },
  {
    name: 'ESTHER',
    displayName: 'ESTHER',
    category: 'PFAM',
    uriLink:
      'https://bioweb.supagro.inra.fr/ESTHER/gene_locus?name=%id&class=Gene_locus',
    attributes: [
      {
        name: 'FamilyName',
        xmlTag: 'family name',
      },
    ],
  },
  {
    name: 'IMGT_GENE-DB',
    displayName: 'IMGT_GENE-DB',
    category: 'PFAM',
    uriLink:
      'https://www.imgt.org/IMGT_GENE-DB/GENElect?query=2+%id&species=Homo+sapiens',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'MEROPS',
    displayName: 'MEROPS',
    category: 'PFAM',
    uriLink: 'https://www.ebi.ac.uk/merops/cgi-bin/pepsum?mid=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'MoonDB',
    displayName: 'MoonDB',
    category: 'PFAM',
    uriLink: 'http://moondb.hb.univ-amu.fr/protein/%id',
    attributes: [
      {
        name: 'Type',
        xmlTag: 'type',
      },
    ],
  },
  {
    name: 'MoonProt',
    displayName: 'MoonProt',
    category: 'PFAM',
    uriLink: 'http://www.moonlightingproteins.org/proteins/?q=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'PeroxiBase',
    displayName: 'PeroxiBase',
    category: 'PFAM',
    uriLink: 'https://peroxibase.toulouse.inra.fr/display_perox/view_perox/%id',
    attributes: [
      {
        name: 'EntryName',
        xmlTag: 'entry name',
      },
    ],
  },
  {
    name: 'REBASE',
    displayName: 'REBASE',
    category: 'PFAM',
    uriLink: 'https://rebase.neb.com/rebase/enz/%id.html',
    attributes: [
      {
        name: 'EntryName',
        xmlTag: 'entry name',
      },
    ],
  },
  {
    name: 'TCDB',
    displayName: 'TCDB',
    category: 'PFAM',
    uriLink: 'https://www.tcdb.org/search/result.php?tc=%id',
    attributes: [
      {
        name: 'FamilyName',
        xmlTag: 'family name',
      },
    ],
  },
  {
    name: 'UniLectin',
    displayName: 'UniLectin',
    category: 'PFAM',
    uriLink:
      'https://unilectin.unige.ch/unilectin3D/display_lectin?uniprot=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'GPCRDB',
    displayName: 'GPCRDB',
    category: 'PFAM',
    uriLink: 'https://gpcrdb.org/protein/%primaryAccession/',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: true,
    linkedReason: 'CC:SIMILARITY: Belongs to the G-protein coupled receptor',
  },
  {
    name: 'CarbonylDB',
    displayName: 'CarbonylDB',
    category: 'PTM',
    uriLink:
      'https://carbonyldb.missouri.edu/CarbonylDB/index.php/detail/protein/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'DEPOD',
    displayName: 'DEPOD',
    category: 'PTM',
    uriLink: 'https://depod.bioss.uni-freiburg.de/showp.php?name=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'GlyConnect',
    displayName: 'GlyConnect',
    category: 'PTM',
    uriLink: 'https://glyconnect.expasy.org/browser/proteins/%id',
    attributes: [
      {
        name: 'glycosylation',
        xmlTag: 'glycosylation',
      },
    ],
  },
  {
    name: 'GlyCosmos',
    displayName: 'GlyCosmos',
    category: 'PTM',
    uriLink: 'https://glycosmos.org/glycoproteins/show/uniprot/%id',
    attributes: [
      {
        name: 'glycosylation',
        xmlTag: 'glycosylation',
      },
    ],
  },
  {
    name: 'GlyGen',
    displayName: 'GlyGen',
    category: 'PTM',
    uriLink: 'https://glygen.org/protein/%id#Glycosylation',
    attributes: [
      {
        name: 'glycosylation',
        xmlTag: 'glycosylation',
      },
    ],
  },
  {
    name: 'iPTMnet',
    displayName: 'iPTMnet',
    category: 'PTM',
    uriLink: 'https://research.bioinformatics.udel.edu/iptmnet/entry/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'PhosphoSitePlus',
    displayName: 'PhosphoSitePlus',
    category: 'PTM',
    uriLink: 'https://www.phosphosite.org/uniprotAccAction?id=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'SwissPalm',
    displayName: 'SwissPalm',
    category: 'PTM',
    uriLink: 'https://swisspalm.org/proteins/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'UniCarbKB',
    displayName: 'UniCarbKB',
    category: 'PTM',
    uriLink: 'https://www.unicarbkb.org/proteinsummary/%id/annotated',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'MetOSite',
    displayName: 'MetOSite',
    category: 'PTM',
    uriLink: 'https://metosite.uma.es/scan/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'BioMuta',
    displayName: 'BioMuta',
    category: 'GVD',
    uriLink:
      'https://hive.biochemistry.gwu.edu/tools/biomuta/biomuta.php?gene=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'DMDM',
    displayName: 'DMDM',
    category: 'GVD',
    uriLink:
      'https://bioinf.umbc.edu/dmdm/gene_prot_page.php?search_type=protein&id=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'dbSNP',
    displayName: 'dbSNP',
    category: 'GVD',
    uriLink: 'https://www.ncbi.nlm.nih.gov/snp/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'OGP',
    displayName: 'OGP',
    category: '2DG',
    uriLink: 'http://usc_ogp_2ddatabase.cesga.es/cgi-bin/2d/2d.cgi?%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'REPRODUCTION-2DPAGE',
    displayName: 'REPRODUCTION-2DPAGE',
    category: '2DG',
    uriLink: 'http://reprod.njmu.edu.cn/cgi-bin/2d/2d.cgi?%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'CPTAC',
    displayName: 'CPTAC',
    category: 'PROTEOMIC',
    uriLink: 'https://assays.cancer.gov/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'PaxDb',
    displayName: 'PaxDb',
    category: 'PROTEOMIC',
    uriLink: 'https://pax-db.org/uniprot_redirect/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'PeptideAtlas',
    displayName: 'PeptideAtlas',
    category: 'PROTEOMIC',
    uriLink:
      'https://db.systemsbiology.net/sbeams/cgi/PeptideAtlas/Search?action=GO&search_key=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'PRIDE',
    displayName: 'PRIDE',
    category: 'PROTEOMIC',
    uriLink: 'https://www.ebi.ac.uk/pride/peptidome/peptidesearch?keyword=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'ProMEX',
    displayName: 'ProMEX',
    category: 'PROTEOMIC',
    uriLink: 'http://promex.pph.univie.ac.at/promex/?ac=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'ProteomicsDB',
    displayName: 'ProteomicsDB',
    category: 'PROTEOMIC',
    uriLink:
      'https://www.proteomicsdb.org/proteomicsdb/#protein/proteinDetails/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'Pumba',
    displayName: 'Pumba',
    category: 'PROTEOMIC',
    uriLink: 'https://pumba.dcsr.unil.ch/lanes/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'TopDownProteomics',
    displayName: 'TopDownProteomics',
    category: 'PROTEOMIC',
    uriLink: 'http://repository.topdownproteomics.org/Proteoforms?query=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'jPOST',
    displayName: 'jPOST',
    category: 'PROTEOMIC',
    uriLink: 'https://globe.jpostdb.org/protein?id=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'MassIVE',
    displayName: 'MassIVE',
    category: 'PROTEOMIC',
    uriLink:
      'https://massive.ucsd.edu/ProteoSAFe/protein_explorer.jsp?libraries=2&protein_name=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'DNASU',
    displayName: 'DNASU',
    category: 'PAM',
    uriLink: 'https://dnasu.org/DNASU/AdvancedSearchOptions.do?geneName=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'Ensembl',
    displayName: 'Ensembl',
    category: 'GMA',
    uriLink: 'https://www.ensembl.org/id/%id',
    attributes: [
      {
        name: 'ProteinId',
        xmlTag: 'protein sequence ID',
        uriLink: 'https://www.ensembl.org/id/%ProteinId',
      },
      {
        name: 'GeneId',
        xmlTag: 'gene ID',
        uriLink: 'https://www.ensembl.org/id/%GeneId',
      },
    ],
  },
  {
    name: 'EnsemblBacteria',
    displayName: 'EnsemblBacteria',
    category: 'GMA',
    uriLink: 'https://www.ensemblgenomes.org/id/%id',
    attributes: [
      {
        name: 'ProteinId',
        xmlTag: 'protein sequence ID',
        uriLink: 'https://www.ensemblgenomes.org/id/%ProteinId',
      },
      {
        name: 'GeneId',
        xmlTag: 'gene ID',
        uriLink: 'https://www.ensemblgenomes.org/id/%GeneId',
      },
    ],
  },
  {
    name: 'EnsemblFungi',
    displayName: 'EnsemblFungi',
    category: 'GMA',
    uriLink: 'https://www.ensemblgenomes.org/id/%id',
    attributes: [
      {
        name: 'ProteinId',
        xmlTag: 'protein sequence ID',
        uriLink: 'https://www.ensemblgenomes.org/id/%ProteinId',
      },
      {
        name: 'GeneId',
        xmlTag: 'gene ID',
        uriLink: 'https://www.ensemblgenomes.org/id/%GeneId',
      },
    ],
  },
  {
    name: 'EnsemblMetazoa',
    displayName: 'EnsemblMetazoa',
    category: 'GMA',
    uriLink: 'https://www.ensemblgenomes.org/id/%id',
    attributes: [
      {
        name: 'ProteinId',
        xmlTag: 'protein sequence ID',
        uriLink: 'https://www.ensemblgenomes.org/id/%ProteinId',
      },
      {
        name: 'GeneId',
        xmlTag: 'gene ID',
        uriLink: 'https://www.ensemblgenomes.org/id/%GeneId',
      },
    ],
  },
  {
    name: 'EnsemblPlants',
    displayName: 'EnsemblPlants',
    category: 'GMA',
    uriLink: 'https://www.ensemblgenomes.org/id/%id',
    attributes: [
      {
        name: 'ProteinId',
        xmlTag: 'protein sequence ID',
        uriLink: 'https://www.ensemblgenomes.org/id/%ProteinId',
      },
      {
        name: 'GeneId',
        xmlTag: 'gene ID',
        uriLink: 'https://www.ensemblgenomes.org/id/%GeneId',
      },
    ],
  },
  {
    name: 'EnsemblProtists',
    displayName: 'EnsemblProtists',
    category: 'GMA',
    uriLink: 'https://www.ensemblgenomes.org/id/%id',
    attributes: [
      {
        name: 'ProteinId',
        xmlTag: 'protein sequence ID',
        uriLink: 'https://www.ensemblgenomes.org/id/%ProteinId',
      },
      {
        name: 'GeneId',
        xmlTag: 'gene ID',
        uriLink: 'https://www.ensemblgenomes.org/id/%GeneId',
      },
    ],
  },
  {
    name: 'GeneID',
    displayName: 'GeneID',
    category: 'GMA',
    uriLink: 'https://www.ncbi.nlm.nih.gov/gene/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'Gramene',
    displayName: 'Gramene',
    category: 'GMA',
    uriLink: 'https://ensembl.gramene.org/id/%id',
    attributes: [
      {
        name: 'ProteinId',
        xmlTag: 'protein sequence ID',
        uriLink: 'https://ensembl.gramene.org/id/%ProteinId',
      },
      {
        name: 'GeneId',
        xmlTag: 'gene ID',
        uriLink: 'https://ensembl.gramene.org/id/%GeneId',
      },
    ],
  },
  {
    name: 'KEGG',
    displayName: 'KEGG',
    category: 'GMA',
    uriLink: 'https://www.genome.jp/dbget-bin/www_bget?%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'MANE-Select',
    displayName: 'MANE-Select',
    category: 'GMA',
    uriLink: 'https://www.ensembl.org/id/%id',
    attributes: [
      {
        name: 'ProteinId',
        xmlTag: 'protein sequence ID',
        uriLink: 'https://www.ensembl.org/id/%ProteinId',
      },
      {
        name: 'RefSeqNucleotideId',
        xmlTag: 'RefSeq nucleotide sequence ID',
        uriLink: 'https://www.ncbi.nlm.nih.gov/nuccore/%RefSeqNucleotideId',
      },
      {
        name: 'RefSeqProteinId',
        xmlTag: 'RefSeq protein sequence ID',
        uriLink: 'https://www.ncbi.nlm.nih.gov/protein/%RefSeqProteinId',
      },
    ],
  },
  {
    name: 'PATRIC',
    displayName: 'PATRIC',
    category: 'GMA',
    uriLink: 'https://www.patricbrc.org/view/Feature/%id',
    attributes: [
      {
        name: 'GeneDesignation',
        xmlTag: 'gene designation',
      },
    ],
  },
  {
    name: 'UCSC',
    displayName: 'UCSC',
    category: 'GMA',
    uriLink:
      'https://genome.ucsc.edu/cgi-bin/hgLinkIn?resource=uniprot&id=%primaryAccession',
    attributes: [
      {
        name: 'OrganismName',
        xmlTag: 'organism name',
      },
    ],
  },
  {
    name: 'VectorBase',
    displayName: 'VectorBase',
    category: 'GMA',
    uriLink: 'https://www.vectorbase.org/id/%id',
    attributes: [
      {
        name: 'ProteinId',
        xmlTag: 'protein sequence ID',
        uriLink: 'https://www.vectorbase.org/id/%ProteinId',
      },
      {
        name: 'GeneId',
        xmlTag: 'gene ID',
        uriLink: 'https://www.vectorbase.org/id/%GeneId',
      },
    ],
  },
  {
    name: 'WBParaSite',
    displayName: 'WBParaSite',
    category: 'GMA',
    uriLink: 'https://parasite.wormbase.org/id/%id',
    attributes: [
      {
        name: 'ProteinId',
        xmlTag: 'protein sequence ID',
        uriLink: 'https://parasite.wormbase.org/id/%ProteinId',
      },
      {
        name: 'GeneId',
        xmlTag: 'gene ID',
        uriLink: 'https://parasite.wormbase.org/id/%GeneId',
      },
    ],
  },
  {
    name: 'ArachnoServer',
    displayName: 'ArachnoServer',
    category: 'ORG',
    uriLink: 'http://www.arachnoserver.org/toxincard.html?id=%id',
    attributes: [
      {
        name: 'ToxinName',
        xmlTag: 'toxin name',
      },
    ],
  },
  {
    name: 'Araport',
    displayName: 'Araport',
    category: 'ORG',
    uriLink: 'https://bar.utoronto.ca/thalemine/portal.do?externalids=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'CGD',
    displayName: 'CGD',
    category: 'ORG',
    uriLink: 'http://www.candidagenome.org/cgi-bin/locus.pl?dbid=%id',
    attributes: [
      {
        name: 'GeneName',
        xmlTag: 'gene designation',
      },
    ],
  },
  {
    name: 'ConoServer',
    displayName: 'ConoServer',
    category: 'ORG',
    uriLink: 'https://www.conoserver.org/?page=card&table=protein&id=%id',
    attributes: [
      {
        name: 'ToxinName',
        xmlTag: 'toxin name',
      },
    ],
  },
  {
    name: 'CTD',
    displayName: 'CTD',
    category: 'ORG',
    uriLink: 'https://ctdbase.org/detail.go?type=gene&db=GENE&acc=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'dictyBase',
    displayName: 'dictyBase',
    category: 'ORG',
    uriLink: 'http://dictybase.org/db/cgi-bin/gene_page.pl?primary_id=%id',
    attributes: [
      {
        name: 'GeneName',
        xmlTag: 'gene designation',
      },
    ],
  },
  {
    name: 'DisGeNET',
    displayName: 'DisGeNET',
    category: 'ORG',
    uriLink:
      'https://www.disgenet.com/search?view=GENES&idents=%id&source=ALL&tab=GDA',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'EchoBASE',
    displayName: 'EchoBASE',
    category: 'ORG',
    uriLink: 'https://www.york.ac.uk/res/thomas/Gene.cfm?recordID=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'euHCVdb',
    displayName: 'euHCVdb',
    category: 'ORG',
    uriLink:
      'https://euhcvdb.lyon.inserm.fr/euHCVdb/do/displayHCVEntry?primaryAC=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'VEuPathDB',
    displayName: 'VEuPathDB',
    category: 'ORG',
    uriLink: 'https://www.veupathdb.org/gene/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'FlyBase',
    displayName: 'FlyBase',
    category: 'ORG',
    uriLink: 'https://flybase.org/reports/%id.html',
    attributes: [
      {
        name: 'GeneName',
        xmlTag: 'gene designation',
      },
    ],
  },
  {
    name: 'GeneCards',
    displayName: 'GeneCards',
    category: 'ORG',
    uriLink: 'https://www.genecards.org/cgi-bin/carddisp.pl?gene=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'GeneReviews',
    displayName: 'GeneReviews',
    category: 'ORG',
    uriLink: 'https://www.ncbi.nlm.nih.gov/books/NBK1116/?term=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'HGNC',
    displayName: 'HGNC',
    category: 'ORG',
    uriLink: 'https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/%id',
    attributes: [
      {
        name: 'GeneName',
        xmlTag: 'gene designation',
      },
    ],
  },
  {
    name: 'AGR',
    displayName: 'AGR',
    category: 'ORG',
    uriLink: 'https://alliancegenome.org/gene/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'GenAtlas',
    displayName: 'GenAtlas',
    category: 'ORG',
    uriLink:
      'http://genatlas.medecine.univ-paris5.fr/fiche.php?symbol=%GeneName',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: true,
    linkedReason: 'DR:HGNC',
  },
  {
    name: 'ClinGen',
    displayName: 'ClinGen',
    category: 'GVD',
    uriLink: 'https://search.clinicalgenome.org/kb/genes/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: true,
    linkedReason: 'DR:HGNC',
  },
  {
    name: 'GenCC',
    displayName: 'GenCC',
    category: 'GVD',
    uriLink: 'https://search.thegencc.org/genes/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: true,
    linkedReason: 'DR:HGNC',
  },
  {
    name: 'HPA',
    displayName: 'HPA',
    category: 'ORG',
    uriLink: 'https://www.proteinatlas.org/%id',
    attributes: [
      {
        name: 'ExpressionPatterns',
        xmlTag: 'expression patterns',
      },
    ],
  },
  {
    name: 'LegioList',
    displayName: 'LegioList',
    category: 'ORG',
    uriLink:
      'http://genolist.pasteur.fr/LegioList/genome.cgi?external_query+%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'Leproma',
    displayName: 'Leproma',
    category: 'ORG',
    uriLink: 'https://mycobrowser.epfl.ch/genes/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'MaizeGDB',
    displayName: 'MaizeGDB',
    category: 'ORG',
    uriLink: 'https://www.maizegdb.org/data_center/gene_product?id=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'MalaCards',
    displayName: 'MalaCards',
    category: 'ORG',
    uriLink: 'https://www.malacards.org/search/eliteGene/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'MGI',
    displayName: 'MGI',
    category: 'ORG',
    uriLink: 'https://www.informatics.jax.org/marker/%id',
    attributes: [
      {
        name: 'GeneName',
        xmlTag: 'gene designation',
      },
    ],
  },
  {
    name: 'MIM',
    displayName: 'MIM',
    category: 'ORG',
    uriLink: 'https://www.omim.org/entry/%id',
    attributes: [
      {
        name: 'Type',
        xmlTag: 'type',
      },
    ],
  },
  {
    name: 'NIAGADS',
    displayName: 'NIAGADS',
    category: 'ORG',
    uriLink: 'https://www.niagads.org/genomics/app/record/gene/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'neXtProt',
    displayName: 'neXtProt',
    category: 'ORG',
    uriLink: 'https://www.nextprot.org/entry/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'OpenTargets',
    displayName: 'OpenTargets',
    category: 'ORG',
    uriLink: 'https://platform.opentargets.org/target/%id/associations',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'Orphanet',
    displayName: 'Orphanet',
    category: 'ORG',
    uriLink:
      'https://www.orpha.net/consor/cgi-bin/OC_Exp.php?Lng=GB&Expert=%id',
    attributes: [
      {
        name: 'Disease',
        xmlTag: 'disease',
      },
    ],
  },
  {
    name: 'PharmGKB',
    displayName: 'PharmGKB',
    category: 'ORG',
    uriLink: 'https://www.pharmgkb.org/gene/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'PomBase',
    displayName: 'PomBase',
    category: 'ORG',
    uriLink: 'https://www.pombase.org/gene/%id',
    attributes: [
      {
        name: 'GeneName',
        xmlTag: 'gene designation',
      },
    ],
  },
  {
    name: 'PseudoCAP',
    displayName: 'PseudoCAP',
    category: 'ORG',
    uriLink: 'https://www.pseudomonas.com/feature/show?locus_tag=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'RGD',
    displayName: 'RGD',
    category: 'ORG',
    uriLink: 'https://rgd.mcw.edu/rgdweb/report/gene/main.html?id=%id',
    attributes: [
      {
        name: 'GeneName',
        xmlTag: 'gene designation',
      },
    ],
  },
  {
    name: 'SGD',
    displayName: 'SGD',
    category: 'ORG',
    uriLink: 'https://www.yeastgenome.org/locus/%id',
    attributes: [
      {
        name: 'GeneName',
        xmlTag: 'gene designation',
      },
    ],
  },
  {
    name: 'TAIR',
    displayName: 'TAIR',
    category: 'ORG',
    uriLink:
      'https://www.arabidopsis.org/servlets/TairObject?type=locus&name=%id',
    attributes: [
      {
        name: 'GeneName',
        xmlTag: 'gene designation',
      },
    ],
  },
  {
    name: 'TubercuList',
    displayName: 'TubercuList',
    category: 'ORG',
    uriLink: 'https://mycobrowser.epfl.ch/genes/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'VGNC',
    displayName: 'VGNC',
    category: 'ORG',
    uriLink:
      'https://vertebrate.genenames.org/data/gene-symbol-report/#!/vgnc_id/%id',
    attributes: [
      {
        name: 'GeneName',
        xmlTag: 'gene designation',
      },
    ],
  },
  {
    name: 'WormBase',
    displayName: 'WormBase',
    category: 'ORG',
    uriLink: 'https://wormbase.org/db/seq/protein?name=%id;class=CDS ',
    attributes: [
      {
        name: 'ProteinId',
        xmlTag: 'protein sequence ID',
        uriLink:
          'https://www.wormbase.org/db/seq/protein?name=%ProteinId;class=Protein',
      },
      {
        name: 'GeneId',
        xmlTag: 'gene ID',
        uriLink:
          'https://www.wormbase.org/db/gene/gene?name=%GeneId;class=Gene',
      },
      {
        name: 'GeneName',
        xmlTag: 'gene designation',
      },
    ],
  },
  {
    name: 'Xenbase',
    displayName: 'Xenbase',
    category: 'ORG',
    uriLink:
      'https://www.xenbase.org/gene/showgene.do?method=display&geneId=%id',
    attributes: [
      {
        name: 'GeneName',
        xmlTag: 'gene designation',
      },
    ],
  },
  {
    name: 'ZFIN',
    displayName: 'ZFIN',
    category: 'ORG',
    uriLink: 'https://zfin.org/%id',
    attributes: [
      {
        name: 'GeneName',
        xmlTag: 'gene designation',
      },
    ],
  },
  {
    name: 'HUGE',
    displayName: 'HUGE',
    category: 'ORG',
    uriLink: 'https://www.kazusa.or.jp/huge/gfpage/%gene',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: true,
    linkedReason: 'GN:KIAAnnnn, Human Entries, can be multiple',
  },
  {
    name: 'Rouge',
    displayName: 'Rouge',
    category: 'ORG',
    uriLink: 'https://www.kazusa.or.jp/rouge/gfpage/%gene',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: true,
    linkedReason: 'GN:KIAAnnnn, Mouse Entries, can be multiple',
  },
  {
    name: 'eggNOG',
    displayName: 'eggNOG',
    category: 'PLG',
    uriLink:
      'http://eggnogdb.embl.de/#/app/results?seqid=%primaryAccession&target_nogs=%id',
    attributes: [
      {
        name: 'ToxonomicScope',
        xmlTag: 'taxonomic scope',
      },
    ],
  },
  {
    name: 'GeneTree',
    displayName: 'GeneTree',
    category: 'PLG',
    uriLink: 'https://www.ensemblgenomes.org/id-genetree/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'HOGENOM',
    displayName: 'HOGENOM',
    category: 'PLG',
    uriLink:
      'http://hogenom.univ-lyon1.fr/query_sequence?seq=%primaryAccession',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'InParanoid',
    displayName: 'InParanoid',
    category: 'PLG',
    uriLink: 'https://inparanoidb.sbc.su.se/orthologs/%id&1/',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'OMA',
    displayName: 'OMA',
    category: 'PLG',
    uriLink: 'https://omabrowser.org/oma/group/%primaryAccession',
    attributes: [
      {
        name: 'Fingerprint',
        xmlTag: 'fingerprint',
      },
    ],
  },
  {
    name: 'OrthoDB',
    displayName: 'OrthoDB',
    category: 'PLG',
    uriLink: 'https://www.orthodb.org/?gene=%primaryAccession',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'PhylomeDB',
    displayName: 'PhylomeDB',
    category: 'PLG',
    uriLink: 'https://phylomedb.org/search_phylome/?seqid=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'TreeFam',
    displayName: 'TreeFam',
    category: 'PLG',
    uriLink: 'http://www.treefam.org/family/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'BioCyc',
    displayName: 'BioCyc',
    category: 'EAP',
    uriLink: 'https://biocyc.org/getid?id=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'BRENDA',
    displayName: 'BRENDA',
    category: 'EAP',
    uriLink:
      'https://www.brenda-enzymes.org/enzyme.php?ecno=%id&UniProtAcc=%primaryAccession&OrganismID=%OrganismId',
    attributes: [
      {
        name: 'OrganismId',
        xmlTag: 'organism ID',
      },
    ],
  },
  {
    name: 'Reactome',
    displayName: 'Reactome',
    category: 'EAP',
    uriLink:
      'https://www.reactome.org/PathwayBrowser/#%id&FLG=%primaryAccession',
    attributes: [
      {
        name: 'PathwayName',
        xmlTag: 'pathway name',
      },
    ],
  },
  {
    name: 'SABIO-RK',
    displayName: 'SABIO-RK',
    category: 'EAP',
    uriLink: 'https://sabiork.h-its.org/newSearch?q=UniProtKB_AC:%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'SignaLink',
    displayName: 'SignaLink',
    category: 'EAP',
    uriLink: 'http://signalink.org/protein/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'SIGNOR',
    displayName: 'SIGNOR',
    category: 'EAP',
    uriLink: 'https://signor.uniroma2.it/relation_result.php?id=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'UniPathway',
    displayName: 'UniPathway',
    category: 'EAP',
    attributes: [
      {
        name: 'RectionId',
        xmlTag: 'reaction ID',
      },
    ],
  },
  {
    name: 'PlantReactome',
    displayName: 'PlantReactome',
    category: 'EAP',
    uriLink:
      'https://plantreactome.gramene.org/PathwayBrowser/#/%id&FLG=%primaryAccession',
    attributes: [
      {
        name: 'pathwayName',
        xmlTag: 'pathway name',
      },
    ],
  },
  {
    name: 'ENZYME',
    displayName: 'ENZYME',
    category: 'EAP',
    uriLink: 'https://enzyme.expasy.org/EC/%ec',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: true,
    linkedReason: 'DE:EC',
  },
  {
    name: 'ChiTaRS',
    displayName: 'ChiTaRS',
    category: 'MISC',
    uriLink: 'http://biosrv.org/chmb/search?GEN=%id',
    attributes: [
      {
        name: 'OrganismName',
        xmlTag: 'organism name',
      },
    ],
  },
  {
    name: 'EvolutionaryTrace',
    displayName: 'EvolutionaryTrace',
    category: 'MISC',
    uriLink:
      'http://mammoth.bcm.tmc.edu/cgi-bin/report_maker_ls/uniprotTraceServerResults.pl?identifier=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'GeneWiki',
    displayName: 'GeneWiki',
    category: 'MISC',
    uriLink: 'https://en.wikipedia.org/wiki/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'GenomeRNAi',
    displayName: 'GenomeRNAi',
    category: 'MISC',
    uriLink: 'http://genomernai.org/genedetails/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'PHI-base',
    displayName: 'PHI-base',
    category: 'MISC',
    uriLink: 'http://www.phi-base.org/searchFacet.htm?queryTerm=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'PRO',
    displayName: 'PRO',
    category: 'MISC',
    uriLink: 'https://proconsortium.org/app/entry/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'SOURCE_MIM',
    displayName: 'SOURCE',
    category: 'MISC',
    uriLink:
      'https://puma.princeton.edu/cgi-bin/source/sourceResult?criteria=%GeneName&choice=Gene&option=Symbol&organism=Hs',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: true,
    linkedReason: 'DR:MIM',
  },
  {
    name: 'SOURCE_MGI',
    displayName: 'SOURCE',
    category: 'MISC',
    uriLink:
      'https://puma.princeton.edu/cgi-bin/source/sourceResult?criteria=%GeneName&choice=Gene&option=Symbol&organism=Mm',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: true,
    linkedReason: 'DR:MGI',
  },
  {
    name: 'Bgee',
    displayName: 'Bgee',
    category: 'GEP',
    uriLink: 'https://www.bgee.org/gene/%id',
    attributes: [
      {
        name: 'ExpressionPatterns',
        xmlTag: 'expression patterns',
      },
    ],
  },
  {
    name: 'CleanEx',
    displayName: 'CleanEx',
    category: 'GEP',
    uriLink:
      'https://cleanex.vital-it.ch/cgi-bin/get_doc?db=cleanex&format=nice&entry=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'CollecTF',
    displayName: 'CollecTF',
    category: 'GEP',
    uriLink: 'http://www.collectf.org/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'ExpressionAtlas',
    displayName: 'ExpressionAtlas',
    category: 'GEP',
    uriLink: 'https://www.ebi.ac.uk/gxa/query?geneQuery=%id',
    attributes: [
      {
        name: 'ExpressionPatterns',
        xmlTag: 'expression patterns',
      },
    ],
  },
  {
    name: 'AntiFam',
    displayName: 'AntiFam',
    category: 'FMD',
    uriLink: 'https://www.ebi.ac.uk/interpro/entry/antifam/%id',
    attributes: [
      {
        name: 'EntryName',
        xmlTag: 'entry name',
      },
    ],
  },
  {
    name: 'CDD',
    displayName: 'CDD',
    category: 'FMD',
    uriLink: 'https://www.ncbi.nlm.nih.gov/Structure/cdd/cddsrv.cgi?uid=%id',
    attributes: [
      {
        name: 'EntryName',
        xmlTag: 'entry name',
      },
      {
        name: 'MatchStatus',
        xmlTag: 'match status',
      },
    ],
  },
  {
    name: 'FunFam',
    displayName: 'FunFam',
    category: 'FMD',
    uriLink: 'https://www.cathdb.info/version/latest/funfam/%id',
    attributes: [
      {
        name: 'EntryName',
        xmlTag: 'entry name',
      },
      {
        name: 'MatchStatus',
        xmlTag: 'match status',
      },
    ],
  },
  {
    name: 'Gene3D',
    displayName: 'Gene3D',
    category: 'FMD',
    uriLink: 'https://www.cathdb.info/superfamily/%id',
    attributes: [
      {
        name: 'EntryName',
        xmlTag: 'entry name',
      },
      {
        name: 'MatchStatus',
        xmlTag: 'match status',
      },
    ],
  },
  {
    name: 'HAMAP',
    displayName: 'HAMAP',
    category: 'FMD',
    uriLink: 'https://hamap.expasy.org/signature/%id',
    attributes: [
      {
        name: 'EntryName',
        xmlTag: 'entry name',
      },
      {
        name: 'MatchStatus',
        xmlTag: 'match status',
      },
    ],
  },
  {
    name: 'IDEAL',
    displayName: 'IDEAL',
    category: 'FMD',
    uriLink: 'https://www.ideal-db.org/ideal.php?id=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'InterPro',
    displayName: 'InterPro',
    category: 'FMD',
    uriLink: 'https://www.ebi.ac.uk/interpro/entry/%id',
    attributes: [
      {
        name: 'EntryName',
        xmlTag: 'entry name',
      },
    ],
  },
  {
    name: 'PANTHER',
    displayName: 'PANTHER',
    category: 'FMD',
    uriLink: 'https://www.pantherdb.org/panther/family.do?clsAccession=%id',
    attributes: [
      {
        name: 'EntryName',
        xmlTag: 'entry name',
      },
      {
        name: 'MatchStatus',
        xmlTag: 'match status',
      },
    ],
  },
  {
    name: 'Pfam',
    displayName: 'Pfam',
    category: 'FMD',
    uriLink: 'https://www.ebi.ac.uk/interpro/entry/pfam/%id',
    attributes: [
      {
        name: 'EntryName',
        xmlTag: 'entry name',
      },
      {
        name: 'MatchStatus',
        xmlTag: 'match status',
      },
    ],
  },
  {
    name: 'PIRSF',
    displayName: 'PIRSF',
    category: 'FMD',
    uriLink: 'https://proteininformationresource.org/cgi-bin/ipcSF?id=%id',
    attributes: [
      {
        name: 'EntryName',
        xmlTag: 'entry name',
      },
      {
        name: 'MatchStatus',
        xmlTag: 'match status',
      },
    ],
  },
  {
    name: 'PRINTS',
    displayName: 'PRINTS',
    category: 'FMD',
    uriLink: 'https://www.ebi.ac.uk/interpro/entry/prints/%id',
    attributes: [
      {
        name: 'EntryName',
        xmlTag: 'entry name',
      },
    ],
  },
  {
    name: 'SFLD',
    displayName: 'SFLD',
    category: 'FMD',
    uriLink: 'https://www.ebi.ac.uk/interpro/entry/sfld/%id',
    attributes: [
      {
        name: 'EntryName',
        xmlTag: 'entry name',
      },
      {
        name: 'MatchStatus',
        xmlTag: 'match status',
      },
    ],
  },
  {
    name: 'SMART',
    displayName: 'SMART',
    category: 'FMD',
    uriLink: 'https://smart.embl.de/smart/do_annotation.pl?DOMAIN=%id',
    attributes: [
      {
        name: 'EntryName',
        xmlTag: 'entry name',
      },
      {
        name: 'MatchStatus',
        xmlTag: 'match status',
      },
    ],
  },
  {
    name: 'SUPFAM',
    displayName: 'SUPFAM',
    category: 'FMD',
    uriLink: 'https://supfam.org/SUPERFAMILY/cgi-bin/scop.cgi?ipid=%id',
    attributes: [
      {
        name: 'EntryName',
        xmlTag: 'entry name',
      },
      {
        name: 'MatchStatus',
        xmlTag: 'match status',
      },
    ],
  },
  {
    name: 'NCBIfam',
    displayName: 'NCBIfam',
    category: 'FMD',
    uriLink:
      'https://www.ncbi.nlm.nih.gov/genome/annotation_prok/evidence/%id/',
    attributes: [
      {
        name: 'EntryName',
        xmlTag: 'entry name',
      },
      {
        name: 'MatchStatus',
        xmlTag: 'match status',
      },
    ],
  },
  {
    name: 'PROSITE',
    displayName: 'PROSITE',
    category: 'FMD',
    uriLink: 'https://prosite.expasy.org/doc/%id',
    attributes: [
      {
        name: 'EntryName',
        xmlTag: 'entry name',
      },
      {
        name: 'MatchStatus',
        xmlTag: 'match status',
      },
    ],
  },
  {
    name: 'DisProt',
    displayName: 'DisProt',
    category: 'FMD',
    uriLink: 'https://disprot.org/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'MobiDB',
    displayName: 'MobiDB',
    category: 'FMD',
    uriLink: 'https://mobidb.bio.unipd.it/entries/%primaryAccession',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: true,
    linkedReason: 'All UniProtKB entries',
  },
  {
    name: 'GO',
    displayName: 'GO',
    category: 'OTG',
    uriLink: 'https://www.ebi.ac.uk/QuickGO/term/%id',
    attributes: [
      {
        name: 'GoTerm',
        xmlTag: 'term',
      },
      {
        name: 'GoEvidenceType',
        xmlTag: 'evidence',
      },
      {
        name: 'Project',
        xmlTag: 'project',
      },
    ],
  },
  {
    name: 'Proteomes',
    displayName: 'Proteomes',
    category: 'PRM',
    uriLink: 'https://www.uniprot.org/proteomes/%id',
    attributes: [
      {
        name: 'Component',
        xmlTag: 'component',
      },
    ],
  },
  {
    name: 'PathwayCommons',
    displayName: 'PathwayCommons',
    category: 'EAP',
    uriLink: 'https://apps.pathwaycommons.org/search?q=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'Pharos',
    displayName: 'Pharos',
    category: 'MISC',
    uriLink: 'https://pharos.nih.gov/targets/%id',
    attributes: [
      {
        name: 'DevelopmentLevel',
        xmlTag: 'development level',
      },
    ],
  },
  {
    name: 'DrugCentral',
    displayName: 'DrugCentral',
    category: 'CHEMISTRY',
    uriLink: 'https://drugcentral.org/target/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'ABCD',
    displayName: 'ABCD',
    category: 'PAM',
    uriLink: 'https://web.expasy.org/cgi-bin/abcd/search_abcd.pl?input=%id',
    attributes: [
      {
        name: 'antibodies',
        xmlTag: 'antibodies',
      },
    ],
  },
  {
    name: 'Antibodypedia',
    displayName: 'Antibodypedia',
    category: 'PAM',
    uriLink: 'https://antibodypedia.com/gene/%id',
    attributes: [
      {
        name: 'antibodies',
        xmlTag: 'antibodies',
      },
    ],
  },
  {
    name: 'CPTC',
    displayName: 'CPTC',
    category: 'PAM',
    uriLink: 'https://antibodies.cancer.gov/uniprot/%id',
    attributes: [
      {
        name: 'antibodies',
        xmlTag: 'antibodies',
      },
    ],
  },
  {
    name: 'RNAct',
    displayName: 'RNAct',
    category: 'MISC',
    uriLink: ' https://rnact.tartaglialab.com/protein?query=%id',
    attributes: [
      {
        name: 'moleculeType',
        xmlTag: 'molecule type',
      },
    ],
  },
  {
    name: 'BioGRID-ORCS',
    displayName: 'BioGRID-ORCS',
    category: 'MISC',
    uriLink: 'https://orcs.thebiogrid.org/Gene/%id',
    attributes: [
      {
        name: 'hits',
        xmlTag: 'hits',
      },
    ],
  },
  {
    name: 'AlphaFoldDB',
    displayName: 'AlphaFoldDB',
    category: '3DS',
    uriLink: 'https://alphafold.ebi.ac.uk/entry/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'eMIND',
    displayName: 'eMIND',
    category: 'MISC',
    uriLink:
      'https://research.bioinformatics.udel.edu/itextmine/integrate/doc/emind/medline/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'PGenN',
    displayName: 'PGenN',
    category: 'MISC',
    uriLink:
      'https://research.bioinformatics.udel.edu/itextmine/pgenn/doc/pgenn/medline/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'Alzforum',
    displayName: 'Alzforum',
    category: 'GVD',
    uriLink: 'https://www.alzforum.org/node/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'GeneRIF',
    displayName: 'GeneRIF',
    category: 'SEQ',
    uriLink:
      'https://www.ncbi.nlm.nih.gov/gene?Db=gene&Cmd=DetailsSearch&Term=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'IC4R',
    displayName: 'IC4R',
    category: 'ORG',
    uriLink: 'https://ngdc.cncb.ac.cn/ic4r/osGene/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'ORCID',
    displayName: 'ORCID',
    category: 'MISC',
    uriLink: 'https://orcid.org/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'PubTator',
    displayName: 'PubTator',
    category: 'MISC',
    uriLink: 'https://www.ncbi.nlm.nih.gov/research/pubtator/?query=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'EMDB',
    displayName: 'EMDB',
    category: '3DS',
    uriLink: 'https://www.ebi.ac.uk/emdb/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'JaponicusDB',
    displayName: 'JaponicusDB',
    category: 'ORG',
    uriLink: 'https://www.japonicusdb.org/gene/%id',
    attributes: [
      {
        name: 'GeneDesignation',
        xmlTag: 'gene designation',
      },
    ],
  },
  {
    name: 'CD-CODE',
    displayName: 'CD-CODE',
    category: 'MISC',
    uriLink: 'https://cd-code.org/condensate/%id',
    attributes: [
      {
        name: 'EntryName',
        xmlTag: 'entry name',
      },
    ],
  },
  {
    name: 'STRENDA-DB',
    displayName: 'STRENDA-DB',
    category: 'EAP',
    uriLink:
      'https://beilstein-strenda-db.org/strenda/public/doiQuery.xhtml?doi=10.22011/strenda_db.%id',
    attributes: [
      {
        name: 'ExperimentDescription',
        xmlTag: 'experiment description',
      },
    ],
  },
  {
    name: 'YCharOS',
    displayName: 'YCharOS',
    category: 'PAM',
    uriLink:
      'https://f1000research.com/gateways/ycharos?selectedDomain=&n0=text&o0=&v0=%id',
    attributes: [
      {
        name: 'antibodies',
        xmlTag: 'antibodies',
      },
    ],
  },
];

export default databaseInfo;
