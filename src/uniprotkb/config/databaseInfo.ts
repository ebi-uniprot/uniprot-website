import { DatabaseInfo } from '../types/databaseRefs';

// NOTE: UniPathway is a special database in that it is no longer operating due to lack of funding at SIB but we want to keep
// showing it for when it is up and running again. Until then it will have no uriLink.

// TODO: Switch over to using the allDatabases endpoint as directed in JIRA: https://www.ebi.ac.uk/panda/jira/browse/TRM-24060
// Source: /configure/uniprotkb/allDatabases
// Retrieved: 2021-11-29
const databaseInfo: DatabaseInfo = [
  {
    name: 'EMBL',
    displayName: 'EMBL',
    category: 'SEQ',
    uriLink: 'https://www.ebi.ac.uk/ena/data/view/%id',
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
    uriLink: 'http://getentry.ddbj.nig.ac.jp/getentry/dad/%id',
    attributes: [
      {
        name: 'ProteinId',
        xmlTag: 'protein sequence ID',
        uriLink: 'http://getentry.ddbj.nig.ac.jp/getentry/na/%ProteinId',
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
    idMappingName: 'CCDS_ID',
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
    idMappingName: 'PIR_ID',
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
        uriLink: 'https://www.ncbi.nlm.nih.gov/nuccore/%necleotideId',
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
    idMappingName: 'PDB_ID',
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
    uriLink:
      'http://www.bmrb.wisc.edu/data_library/summary/protein.php?uniprot=%id',
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
      'http://salilab.org/modbase-cgi/model_search.cgi?searchkw=name&kword=%primaryAccession',
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
    uriLink:
      'http://salilab.org/modbase-cgi/model_search.cgi?searchkw=name&kword=%primaryAccession',
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
    idMappingName: 'BIOGRID_ID',
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
    idMappingName: 'COMPLEXPORTAL_ID',
  },
  {
    name: 'CORUM',
    displayName: 'CORUM',
    category: 'PPI',
    uriLink: 'http://mips.helmholtz-muenchen.de/corum/#?uniprotID=%id',
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
    idMappingName: 'DIP_ID',
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
    uriLink: 'https://www.ebi.ac.uk/intact/interactors/id:%id*',
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
    idMappingName: 'STRING_ID',
  },
  {
    name: 'BindingDB',
    displayName: 'BindingDB',
    category: 'CHEMISTRY',
    uriLink: 'http://www.bindingdb.org/uniprot/%id',
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
    uriLink: 'https://www.ebi.ac.uk/chembldb/target/inspect/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    idMappingName: 'CHEMBL_ID',
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
    idMappingName: 'DRUGBANK_ID',
  },
  {
    name: 'GuidetoPHARMACOLOGY',
    displayName: 'GuidetoPHARMACOLOGY',
    category: 'CHEMISTRY',
    uriLink:
      'http://www.guidetopharmacology.org/GRAC/ObjectDisplayForward?objectId=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    idMappingName: 'GUIDETOPHARMACOLOGY_ID',
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
    idMappingName: 'SWISSLIPIDS_ID',
  },
  {
    name: 'Allergome',
    displayName: 'Allergome',
    category: 'PFAM',
    uriLink: 'http://www.allergome.org/script/dettaglio.php?id_molecule=%id',
    attributes: [
      {
        name: 'AllergenName',
        xmlTag: 'allergen name',
      },
    ],
    idMappingName: 'ALLERGOME_ID',
  },
  {
    name: 'CAZy',
    displayName: 'CAZy',
    category: 'PFAM',
    uriLink: 'http://www.cazy.org/fam/%id.html',
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
      'http://bioweb.supagro.inra.fr/ESTHER/gene_locus?name=%id&class=Gene_locus',
    attributes: [
      {
        name: 'FamilyName',
        xmlTag: 'family name',
      },
    ],
    idMappingName: 'ESTHER_ID',
  },
  {
    name: 'IMGT_GENE-DB',
    displayName: 'IMGT_GENE-DB',
    category: 'PFAM',
    uriLink:
      'http://www.imgt.org/IMGT_GENE-DB/GENElect?query=2+%id&species=Homo+sapiens',
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
    idMappingName: 'MEROPS_ID',
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
    name: 'CLAE',
    displayName: 'CLAE',
    category: 'PFAM',
    uriLink: 'https://mycoclap.fungalgenomics.ca/mycoCLAP/clap/GeneView/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    idMappingName: 'CLAE_ID',
  },
  {
    name: 'PeroxiBase',
    displayName: 'PeroxiBase',
    category: 'PFAM',
    uriLink: 'http://peroxibase.toulouse.inra.fr/display_perox/view_perox/%id',
    attributes: [
      {
        name: 'EntryName',
        xmlTag: 'entry name',
      },
    ],
    idMappingName: 'PEROXIBASE_ID',
  },
  {
    name: 'REBASE',
    displayName: 'REBASE',
    category: 'PFAM',
    uriLink: 'http://rebase.neb.com/rebase/enz/%id.html',
    attributes: [
      {
        name: 'EntryName',
        xmlTag: 'entry name',
      },
    ],
    idMappingName: 'REBASE_ID',
  },
  {
    name: 'TCDB',
    displayName: 'TCDB',
    category: 'PFAM',
    uriLink: 'http://www.tcdb.org/search/result.php?tc=%id',
    attributes: [
      {
        name: 'FamilyName',
        xmlTag: 'family name',
      },
    ],
    idMappingName: 'TCDB_ID',
  },
  {
    name: 'UniLectin',
    displayName: 'UniLectin',
    category: 'PFAM',
    uriLink: 'https://www.unilectin.eu/curated/protein/%id',
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
    uriLink: 'https://gpcrdb.org/protein/%uniprotId/',
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
      'http://digbio.missouri.edu/CarbonylDB/index.php/detail/protein/%id',
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
    uriLink: 'http://depod.bioss.uni-freiburg.de/showp.php?AC=%id',
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
    idMappingName: 'GLYCONNECT_ID',
  },
  {
    name: 'GlyGen',
    displayName: 'GlyGen',
    category: 'PTM',
    uriLink:
      'https://www.glygen.org/glycoprotein_detail.html?uniprot_canonical_ac=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'iPTMnet',
    displayName: 'iPTMnet',
    category: 'PTM',
    uriLink: 'http://research.bioinformatics.udel.edu/iptmnet/entry/%id',
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
    uriLink: 'http://www.unicarbkb.org/proteinsummary/%id/annotated',
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
    idMappingName: 'BIOMUTA_ID',
  },
  {
    name: 'DMDM',
    displayName: 'DMDM',
    category: 'GVD',
    uriLink:
      'http://bioinf.umbc.edu/dmdm/gene_prot_page.php?search_type=protein&id=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    idMappingName: 'DMDM_ID',
  },
  {
    name: 'dbSNP',
    displayName: 'dbSNP',
    category: 'GVD',
    uriLink: 'https://www.ncbi.nlm.nih.gov/SNP/snp_ref.cgi?type=rs&rs=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'COMPLUYEAST-2DPAGE',
    displayName: 'COMPLUYEAST-2DPAGE',
    category: '2DG',
    uriLink: 'http://compluyeast2dpage.dacya.ucm.es/cgi-bin/2d/2d.cgi?ac=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'DOSAC-COBS-2DPAGE',
    displayName: 'DOSAC-COBS-2DPAGE',
    category: '2DG',
    uriLink: 'http://www.dosac.unipa.it/cgi-bin/2d/2d.cgi?ac=%id',
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
    name: 'SWISS-2DPAGE',
    displayName: 'SWISS-2DPAGE',
    category: '2DG',
    uriLink: 'https://world-2dpage.expasy.org/swiss-2dpage/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'UCD-2DPAGE',
    displayName: 'UCD-2DPAGE',
    category: '2DG',
    uriLink: 'http://proteomics-portal.ucd.ie/cgi-bin/2d/2d.cgi?%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'World-2DPAGE',
    displayName: 'World-2DPAGE',
    category: '2DG',
    uriLink: 'https://world-2dpage.expasy.org/repository/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    idMappingName: 'WORLD_2DPAGE_ID',
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
    idMappingName: 'CPTAC_ID',
  },
  {
    name: 'EPD',
    displayName: 'EPD',
    category: 'PROTEOMIC',
    uriLink: 'https://www.peptracker.com/epd/analytics/?protein_id=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'MaxQB',
    displayName: 'MaxQB',
    category: 'PROTEOMIC',
    uriLink: 'http://maxqb.biochem.mpg.de/mxdb/protein/show/%id',
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
    uriLink: 'https://pax-db.org/#!protein/%id',
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
    uriLink:
      'https://www.ebi.ac.uk/pride/searchSummary.do?queryTypeSelected=identification%20accession%20number&identificationAccessionNumber=%id',
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
    idMappingName: 'PROTEOMICSDB_ID',
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
    idMappingName: 'DNASU_ID',
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
    idMappingName: 'ENSEMBL_ID',
  },
  {
    name: 'EnsemblBacteria',
    displayName: 'EnsemblBacteria',
    category: 'GMA',
    uriLink: 'http://www.ensemblgenomes.org/id/%id',
    attributes: [
      {
        name: 'ProteinId',
        xmlTag: 'protein sequence ID',
        uriLink: 'http://www.ensemblgenomes.org/id/%ProteinId',
      },
      {
        name: 'GeneId',
        xmlTag: 'gene ID',
        uriLink: 'http://www.ensemblgenomes.org/id/%GeneId',
      },
    ],
  },
  {
    name: 'EnsemblFungi',
    displayName: 'EnsemblFungi',
    category: 'GMA',
    uriLink: 'http://www.ensemblgenomes.org/id/%id',
    attributes: [
      {
        name: 'ProteinId',
        xmlTag: 'protein sequence ID',
        uriLink: 'http://www.ensemblgenomes.org/id/%ProteinId',
      },
      {
        name: 'GeneId',
        xmlTag: 'gene ID',
        uriLink: 'http://www.ensemblgenomes.org/id/%GeneId',
      },
    ],
  },
  {
    name: 'EnsemblMetazoa',
    displayName: 'EnsemblMetazoa',
    category: 'GMA',
    uriLink: 'http://www.ensemblgenomes.org/id/%id',
    attributes: [
      {
        name: 'ProteinId',
        xmlTag: 'protein sequence ID',
        uriLink: 'http://www.ensemblgenomes.org/id/%ProteinId',
      },
      {
        name: 'GeneId',
        xmlTag: 'gene ID',
        uriLink: 'http://www.ensemblgenomes.org/id/%GeneId',
      },
    ],
  },
  {
    name: 'EnsemblPlants',
    displayName: 'EnsemblPlants',
    category: 'GMA',
    uriLink: 'http://www.ensemblgenomes.org/id/%id',
    attributes: [
      {
        name: 'ProteinId',
        xmlTag: 'protein sequence ID',
        uriLink: 'http://www.ensemblgenomes.org/id/%ProteinId',
      },
      {
        name: 'GeneId',
        xmlTag: 'gene ID',
        uriLink: 'http://www.ensemblgenomes.org/id/%GeneId',
      },
    ],
  },
  {
    name: 'EnsemblProtists',
    displayName: 'EnsemblProtists',
    category: 'GMA',
    uriLink: 'http://www.ensemblgenomes.org/id/%id',
    attributes: [
      {
        name: 'ProteinId',
        xmlTag: 'protein sequence ID',
        uriLink: 'http://www.ensemblgenomes.org/id/%ProteinId',
      },
      {
        name: 'GeneId',
        xmlTag: 'gene ID',
        uriLink: 'http://www.ensemblgenomes.org/id/%GeneId',
      },
    ],
  },
  {
    name: 'GeneDB',
    displayName: 'GeneDB',
    category: 'GMA',
    uriLink: 'https://www.genedb.org/gene/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    idMappingName: 'GENEDB_ID',
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
    idMappingName: 'P_ENTREZGENEID',
  },
  {
    name: 'Gramene',
    displayName: 'Gramene',
    category: 'GMA',
    uriLink: 'http://ensembl.gramene.org/id/%id',
    attributes: [
      {
        name: 'ProteinId',
        xmlTag: 'protein sequence ID',
        uriLink: 'http://ensembl.gramene.org/id/%ProteinId',
      },
      {
        name: 'GeneId',
        xmlTag: 'gene ID',
        uriLink: 'http://ensembl.gramene.org/id/%GeneId',
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
    idMappingName: 'KEGG_ID',
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
    idMappingName: 'PATRIC_ID',
  },
  {
    name: 'UCSC',
    displayName: 'UCSC',
    category: 'GMA',
    uriLink: 'https://genome.ucsc.edu/cgi-bin/hgLinkIn?resource=uniprot&id=%id',
    attributes: [
      {
        name: 'OrganismName',
        xmlTag: 'organism name',
      },
    ],
    idMappingName: 'UCSC_ID',
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
    idMappingName: 'WBPARASITE_ID',
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
    idMappingName: 'ARACHNOSERVER_ID',
  },
  {
    name: 'Araport',
    displayName: 'Araport',
    category: 'ORG',
    uriLink: 'https://apps.araport.org/thalemine/portal.do?externalids=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    idMappingName: 'ARAPORT_ID',
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
    idMappingName: 'CGD',
  },
  {
    name: 'ConoServer',
    displayName: 'ConoServer',
    category: 'ORG',
    uriLink: 'http://www.conoserver.org/?page=card&table=protein&id=%id',
    attributes: [
      {
        name: 'ToxinName',
        xmlTag: 'toxin name',
      },
    ],
    idMappingName: 'CONOSERVER_ID',
  },
  {
    name: 'CTD',
    displayName: 'CTD',
    category: 'ORG',
    uriLink: 'http://ctdbase.org/detail.go?type=gene&db=GENE&acc=%id',
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
    idMappingName: 'DICTYBASE_ID',
  },
  {
    name: 'DisGeNET',
    displayName: 'DisGeNET',
    category: 'ORG',
    uriLink: 'http://disgenet.org/search?q=%id',
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
    uriLink: 'http://www.york.ac.uk/res/thomas/Gene.cfm?recordID=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    idMappingName: 'ECHOBASE_ID',
  },
  {
    name: 'euHCVdb',
    displayName: 'euHCVdb',
    category: 'ORG',
    uriLink: 'https://euhcvdb.ibcp.fr/euHCVdb/do/displayHCVEntry?primaryAC=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    idMappingName: 'EUHCVDB_ID',
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
    idMappingName: 'VEUPATHDB_ID',
  },
  {
    name: 'FlyBase',
    displayName: 'FlyBase',
    category: 'ORG',
    uriLink: 'http://flybase.org/reports/%id.html',
    attributes: [
      {
        name: 'GeneName',
        xmlTag: 'gene designation',
      },
    ],
    idMappingName: 'FLYBASE_ID',
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
    idMappingName: 'GENECARDS_ID',
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
    idMappingName: 'GENEREVIEWS_ID',
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
    idMappingName: 'HGNC_ID',
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
    name: 'HPA',
    displayName: 'HPA',
    category: 'ORG',
    uriLink: 'http://www.proteinatlas.org/tissue_profile.php?antibody_id=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
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
    idMappingName: 'LEGIOLIST_ID',
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
    idMappingName: 'LEPROMA_ID',
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
    idMappingName: 'MAIZEGDB_ID',
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
    uriLink: 'http://www.informatics.jax.org/marker/%id',
    attributes: [
      {
        name: 'GeneName',
        xmlTag: 'gene designation',
      },
    ],
    idMappingName: 'MGI_ID',
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
    idMappingName: 'MIM_ID',
  },
  {
    name: 'NIAGADS',
    displayName: 'NIAGADS',
    category: 'ORG',
    uriLink:
      'https://www.niagads.org/genomics/showRecord.do?name=GeneRecordClasses.GeneRecordClass&source_id=%id',
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
    idMappingName: 'NEXTPROT_ID',
  },
  {
    name: 'OpenTargets',
    displayName: 'OpenTargets',
    category: 'ORG',
    uriLink: 'https://www.targetvalidation.org/target/%id/associations',
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
    idMappingName: 'ORPHANET_ID',
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
    idMappingName: 'PHARMGKB_ID',
  },
  {
    name: 'PomBase',
    displayName: 'PomBase',
    category: 'ORG',
    uriLink: 'https://www.pombase.org/spombe/result/%id',
    attributes: [
      {
        name: 'GeneName',
        xmlTag: 'gene designation',
      },
    ],
    idMappingName: 'POMBASE_ID',
  },
  {
    name: 'PseudoCAP',
    displayName: 'PseudoCAP',
    category: 'ORG',
    uriLink: 'http://www.pseudomonas.com/feature/show?locus_tag=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    idMappingName: 'PSEUDOCAP_ID',
  },
  {
    name: 'RGD',
    displayName: 'RGD',
    category: 'ORG',
    uriLink: 'http://rgd.mcw.edu/tools/genes/genes_view.cgi?id=%id',
    attributes: [
      {
        name: 'GeneName',
        xmlTag: 'gene designation',
      },
    ],
    idMappingName: 'RGD_ID',
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
    idMappingName: 'SGD_ID',
  },
  {
    name: 'TAIR',
    displayName: 'TAIR',
    category: 'ORG',
    uriLink: 'http://www.arabidopsis.org/servlets/TairObject?accession=%id',
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
    idMappingName: 'TUBERCULIST_ID',
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
    idMappingName: 'VGNC_ID',
  },
  {
    name: 'WormBase',
    displayName: 'WormBase',
    category: 'ORG',
    uriLink: 'https://wormbase.org/species/c_elegans/cds/%id',
    attributes: [
      {
        name: 'ProteinId',
        xmlTag: 'protein sequence ID',
        uriLink:
          'http://www.wormbase.org/db/seq/protein?name=%ProteinId;class=Protein',
      },
      {
        name: 'GeneId',
        xmlTag: 'gene ID',
        uriLink: 'http://www.wormbase.org/db/gene/gene?name=%GeneId;class=Gene',
      },
      {
        name: 'GeneName',
        xmlTag: 'gene designation',
      },
    ],
    idMappingName: 'WORMBASE_ID',
  },
  {
    name: 'Xenbase',
    displayName: 'Xenbase',
    category: 'ORG',
    uriLink:
      'http://www.xenbase.org/gene/showgene.do?method=display&geneId=%id',
    attributes: [
      {
        name: 'GeneName',
        xmlTag: 'gene designation',
      },
    ],
    idMappingName: 'XENBASE_ID',
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
    idMappingName: 'ZFIN_ID',
  },
  {
    name: 'HUGE',
    displayName: 'HUGE',
    category: 'ORG',
    uriLink: 'http://www.kazusa.or.jp/huge/gfpage/%gene',
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
    uriLink: 'http://www.kazusa.or.jp/rouge/gfpage/%gene',
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
    idMappingName: 'EGGNOG_ID',
  },
  {
    name: 'GeneTree',
    displayName: 'GeneTree',
    category: 'PLG',
    uriLink: 'http://www.ensemblgenomes.org/id-genetree/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    idMappingName: 'GENETREE_ID',
  },
  {
    name: 'HOGENOM',
    displayName: 'HOGENOM',
    category: 'PLG',
    uriLink: 'http://doua.prabi.fr/cgi-bin/acnuc-ac2tree?query=%id&db=HOGENOM6',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    idMappingName: 'HOGENOM_ID',
  },
  {
    name: 'InParanoid',
    displayName: 'InParanoid',
    category: 'PLG',
    uriLink: 'http://inparanoid.sbc.su.se/cgi-bin/gene_search.cgi?id=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'KO',
    displayName: 'KO',
    category: 'PLG',
    uriLink: 'https://www.genome.jp/dbget-bin/www_bget?ko:%id',
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
    uriLink: 'https://omabrowser.org/oma/group/%id',
    attributes: [
      {
        name: 'Fingerprint',
        xmlTag: 'fingerprint',
      },
    ],
    idMappingName: 'OMA_ID',
  },
  {
    name: 'OrthoDB',
    displayName: 'OrthoDB',
    category: 'PLG',
    uriLink: 'https://www.orthodb.org/?query=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    idMappingName: 'ORTHODB_ID',
  },
  {
    name: 'PhylomeDB',
    displayName: 'PhylomeDB',
    category: 'PLG',
    uriLink: 'http://phylomedb.org/?q=search_tree&seqid=%id',
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
    idMappingName: 'TREEFAM_ID',
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
    idMappingName: 'BIOCYC_ID',
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
    idMappingName: 'REACTOME_ID',
  },
  {
    name: 'SABIO-RK',
    displayName: 'SABIO-RK',
    category: 'EAP',
    uriLink: 'http://sabiork.h-its.org/newSearch?q=UniProtKB_AC:%id',
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
    idMappingName: 'UNIPATHWAY_ID',
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
    idMappingName: 'PLANT_REACTOME_ID',
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
    uriLink:
      'http://chitars.md.biu.ac.il/bin/search.pl?searchtype=gene_name&searchstr=%id&%d=1',
    attributes: [
      {
        name: 'OrganismName',
        xmlTag: 'organism name',
      },
    ],
    idMappingName: 'CHITARS_ID',
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
    idMappingName: 'GENEWIKI_ID',
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
    idMappingName: 'GENOMERNAI_ID',
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
    idMappingName: 'PHI_BASE_ID',
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
    uriLink: 'https://bgee.org/?page=gene&gene_id=%id',
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
    idMappingName: 'COLLECTF_ID',
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
    name: 'Genevisible',
    displayName: 'Genevisible',
    category: 'GEP',
    uriLink: 'https://genevisible.com/tissues/%OrganismId/UniProt/%id',
    attributes: [
      {
        name: 'OrganismId',
        xmlTag: 'organism ID',
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
    name: 'Gene3D',
    displayName: 'Gene3D',
    category: 'FMD',
    uriLink: 'http://www.cathdb.info/superfamily/%id',
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
    uriLink: 'http://idp1.force.cs.is.nagoya-u.ac.jp/IDEAL/ideal.php?id=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    idMappingName: 'IDEAL_ID',
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
    uriLink: 'http://www.pantherdb.org/panther/family.do?clsAccession=%id',
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
    uriLink: 'http://pfam.xfam.org/family/%id',
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
    uriLink:
      'http://umber.sbs.man.ac.uk/cgi-bin/dbbrowser/sprint/searchprintss.cgi?display_opts=Prints&category=None&queryform=false&prints_accn=%id',
    attributes: [
      {
        name: 'EntryName',
        xmlTag: 'entry name',
      },
    ],
  },
  {
    name: 'ProDom',
    displayName: 'ProDom',
    category: 'FMD',
    uriLink:
      'http://prodom.prabi.fr/prodom/current/cgi-bin/request.pl?question=SPTR&query=%id',
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
    name: 'SFLD',
    displayName: 'SFLD',
    category: 'FMD',
    uriLink: 'http://sfld.rbvi.ucsf.edu/django/lookup/%id',
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
    uriLink: 'http://smart.embl.de/smart/do_annotation.pl?DOMAIN=%id',
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
    uriLink: 'http://supfam.org/SUPERFAMILY/cgi-bin/scop.cgi?ipid=%id',
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
    name: 'TIGRFAMs',
    displayName: 'TIGRFAMs',
    category: 'FMD',
    uriLink: 'http://tigrfams.jcvi.org/cgi-bin/HmmReportPage.cgi?acc=%id',
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
    idMappingName: 'DISPROT_ID',
  },
  {
    name: 'MobiDB',
    displayName: 'MobiDB',
    category: 'FMD',
    uriLink: 'http://mobidb.bio.unipd.it/entries/%primaryAccession',
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
    name: 'ProtoNet',
    displayName: 'ProtoNet',
    category: 'FMD',
    uriLink: 'http://www.protonet.cs.huji.ac.il/sp.php?prot=%primaryAccession',
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
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'DrugCentral',
    displayName: 'DrugCentral',
    category: 'CHEMISTRY',
    uriLink: 'http://drugcentral.org/target/%id',
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
        name: 'Description',
        xmlTag: 'description',
      },
    ],
  },
  {
    name: 'Antibodypedia',
    displayName: 'Antibodypedia',
    category: 'PAM',
    uriLink: 'https://www.antibodypedia.com/protein/%id',
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
    uriLink: 'https://rnact.crg.eu/protein?query=%id',
    attributes: [
      {
        name: 'moleculeType',
        xmlTag: 'moleculeType',
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
];

export default databaseInfo;
