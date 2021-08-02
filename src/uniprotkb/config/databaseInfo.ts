import { DatabaseInfo } from '../types/databaseRefs';

// TODO: there is an endpoint for that:
// https://wwwdev.ebi.ac.uk/uniprot/api/configure/uniprotkb/allDatabases
// JIRA: https://www.ebi.ac.uk/panda/jira/browse/TRM-24060

// Updated 2021-08-02

const databaseInfo: DatabaseInfo = [
  {
    name: 'EMBL',
    displayName: 'EMBL',
    category: 'SEQUENCE_DATABASES',
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
    implicit: false,
  },
  {
    name: 'GenBank',
    displayName: 'GenBank',
    category: 'SEQUENCE_DATABASES',
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
    category: 'SEQUENCE_DATABASES',
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
    category: 'SEQUENCE_DATABASES',
    uriLink:
      'https://www.ncbi.nlm.nih.gov/CCDS/CcdsBrowse.cgi?REQUEST=CCDS&GO=MainBrowse&DATA=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
    idMappingName: 'CCDS_ID',
  },
  {
    name: 'PIR',
    displayName: 'PIR',
    category: 'SEQUENCE_DATABASES',
    uriLink: 'https://proteininformationresource.org/cgi-bin/nbrfget?uid=%id',
    attributes: [
      {
        name: 'EntryName',
        xmlTag: 'entry name',
      },
    ],
    implicit: false,
    idMappingName: 'PIR_ID',
  },
  {
    name: 'RefSeq',
    displayName: 'RefSeq',
    category: 'SEQUENCE_DATABASES',
    uriLink: 'https://www.ncbi.nlm.nih.gov/protein/%id',
    attributes: [
      {
        name: 'NucleotideSequenceId',
        xmlTag: 'nucleotide sequence ID',
        uriLink: 'https://www.ncbi.nlm.nih.gov/nuccore/%necleotideId',
      },
    ],
    implicit: false,
    idMappingName: 'P_REFSEQ_AC',
  },
  {
    name: 'PDB',
    displayName: 'PDB',
    category: 'D3_STRUCTURE_DATABASES',
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
    implicit: false,
    idMappingName: 'PDB_ID',
  },
  {
    name: 'PDBsum',
    displayName: 'PDBsum',
    category: 'D3_STRUCTURE_DATABASES',
    uriLink: 'https://www.ebi.ac.uk/pdbsum/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'PCDDB',
    displayName: 'PCDDB',
    category: 'D3_STRUCTURE_DATABASES',
    uriLink: 'https://pcddb.cryst.bbk.ac.uk/uniprot/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'SASBDB',
    displayName: 'SASBDB',
    category: 'D3_STRUCTURE_DATABASES',
    uriLink: 'https://www.sasbdb.org/uniprot/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'BMRB',
    displayName: 'BMRB',
    category: 'D3_STRUCTURE_DATABASES',
    uriLink:
      'http://www.bmrb.wisc.edu/data_library/summary/protein.php?uniprot=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'ModBase',
    displayName: 'ModBase',
    category: 'D3_STRUCTURE_DATABASES',
    uriLink:
      'http://salilab.org/modbase-cgi/model_search.cgi?searchkw=name&kword=%accession',
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
    category: 'D3_STRUCTURE_DATABASES',
    uriLink: 'https://swissmodel.expasy.org/repository/uniprot/%id?csm=%src64',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'SWISS-MODEL-Workspace',
    displayName: 'SWISS-MODEL-Workspace',
    category: 'D3_STRUCTURE_DATABASES',
    uriLink:
      'http://salilab.org/modbase-cgi/model_search.cgi?searchkw=name&kword=%accession',
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
    category: 'D3_STRUCTURE_DATABASES',
    uriLink: 'https://pdbe-kb.org/proteins/%id',
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
    category: 'D3_STRUCTURE_DATABASES',
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
    category: 'D3_STRUCTURE_DATABASES',
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
    category: 'PROTEIN_PROTEIN_INTERACTION_DATABASES',
    uriLink: 'https://thebiogrid.org/%id',
    attributes: [
      {
        name: 'Interactions',
        xmlTag: 'interactions',
      },
    ],
    implicit: false,
    idMappingName: 'BIOGRID_ID',
  },
  {
    name: 'ComplexPortal',
    displayName: 'ComplexPortal',
    category: 'PROTEIN_PROTEIN_INTERACTION_DATABASES',
    uriLink: 'https://www.ebi.ac.uk/complexportal/complex/%id',
    attributes: [
      {
        name: 'EntryName',
        xmlTag: 'entry name',
      },
    ],
    implicit: false,
    idMappingName: 'COMPLEXPORTAL_ID',
  },
  {
    name: 'CORUM',
    displayName: 'CORUM',
    category: 'PROTEIN_PROTEIN_INTERACTION_DATABASES',
    uriLink: 'http://mips.helmholtz-muenchen.de/corum/#?uniprotID=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'DIP',
    displayName: 'DIP',
    category: 'PROTEIN_PROTEIN_INTERACTION_DATABASES',
    uriLink: 'https://dip.doe-mbi.ucla.edu/dip/Browse.cgi?ID=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
    idMappingName: 'DIP_ID',
  },
  {
    name: 'ELM',
    displayName: 'ELM',
    category: 'PROTEIN_PROTEIN_INTERACTION_DATABASES',
    uriLink: 'http://elm.eu.org/instances.html?q=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'IntAct',
    displayName: 'IntAct',
    category: 'PROTEIN_PROTEIN_INTERACTION_DATABASES',
    uriLink: 'https://www.ebi.ac.uk/intact/interactors/id:%id*',
    attributes: [
      {
        name: 'Interactions',
        xmlTag: 'interactions',
      },
    ],
    implicit: false,
  },
  {
    name: 'MINT',
    displayName: 'MINT',
    category: 'PROTEIN_PROTEIN_INTERACTION_DATABASES',
    uriLink: 'https://mint.bio.uniroma2.it/cgi-bin/protein.py?id=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'STRING',
    displayName: 'STRING',
    category: 'PROTEIN_PROTEIN_INTERACTION_DATABASES',
    uriLink: 'https://string-db.org/network/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
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
    implicit: false,
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
    implicit: false,
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
    implicit: false,
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
    implicit: false,
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
    implicit: false,
    idMappingName: 'SWISSLIPIDS_ID',
  },
  {
    name: 'Allergome',
    displayName: 'Allergome',
    category: 'PROTEIN_FAMILY_GROUP_DATABASES',
    uriLink: 'http://www.allergome.org/script/dettaglio.php?id_molecule=%id',
    attributes: [
      {
        name: 'AllergenName',
        xmlTag: 'allergen name',
      },
    ],
    implicit: false,
    idMappingName: 'ALLERGOME_ID',
  },
  {
    name: 'CAZy',
    displayName: 'CAZy',
    category: 'PROTEIN_FAMILY_GROUP_DATABASES',
    uriLink: 'http://www.cazy.org/fam/%id.html',
    attributes: [
      {
        name: 'FamilyName',
        xmlTag: 'family name',
      },
    ],
    implicit: false,
  },
  {
    name: 'ESTHER',
    displayName: 'ESTHER',
    category: 'PROTEIN_FAMILY_GROUP_DATABASES',
    uriLink:
      'http://bioweb.supagro.inra.fr/ESTHER/gene_locus?name=%id&class=Gene_locus',
    attributes: [
      {
        name: 'FamilyName',
        xmlTag: 'family name',
      },
    ],
    implicit: false,
    idMappingName: 'ESTHER_ID',
  },
  {
    name: 'IMGT_GENE-DB',
    displayName: 'IMGT_GENE-DB',
    category: 'PROTEIN_FAMILY_GROUP_DATABASES',
    uriLink:
      'http://www.imgt.org/IMGT_GENE-DB/GENElect?query=2+%id&species=Homo+sapiens',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'MEROPS',
    displayName: 'MEROPS',
    category: 'PROTEIN_FAMILY_GROUP_DATABASES',
    uriLink: 'https://www.ebi.ac.uk/merops/cgi-bin/pepsum?mid=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
    idMappingName: 'MEROPS_ID',
  },
  {
    name: 'MoonDB',
    displayName: 'MoonDB',
    category: 'PROTEIN_FAMILY_GROUP_DATABASES',
    uriLink: 'http://moondb.hb.univ-amu.fr/protein/%id',
    attributes: [
      {
        name: 'Type',
        xmlTag: 'type',
      },
    ],
    implicit: false,
  },
  {
    name: 'MoonProt',
    displayName: 'MoonProt',
    category: 'PROTEIN_FAMILY_GROUP_DATABASES',
    uriLink: 'http://www.moonlightingproteins.org/proteins/?q=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'CLAE',
    displayName: 'CLAE',
    category: 'PROTEIN_FAMILY_GROUP_DATABASES',
    uriLink: 'https://mycoclap.fungalgenomics.ca/mycoCLAP/clap/GeneView/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
    idMappingName: 'CLAE_ID',
  },
  {
    name: 'PeroxiBase',
    displayName: 'PeroxiBase',
    category: 'PROTEIN_FAMILY_GROUP_DATABASES',
    uriLink: 'http://peroxibase.toulouse.inra.fr/display_perox/view_perox/%id',
    attributes: [
      {
        name: 'EntryName',
        xmlTag: 'entry name',
      },
    ],
    implicit: false,
    idMappingName: 'PEROXIBASE_ID',
  },
  {
    name: 'REBASE',
    displayName: 'REBASE',
    category: 'PROTEIN_FAMILY_GROUP_DATABASES',
    uriLink: 'http://rebase.neb.com/rebase/enz/%id.html',
    attributes: [
      {
        name: 'EntryName',
        xmlTag: 'entry name',
      },
    ],
    implicit: false,
    idMappingName: 'REBASE_ID',
  },
  {
    name: 'TCDB',
    displayName: 'TCDB',
    category: 'PROTEIN_FAMILY_GROUP_DATABASES',
    uriLink: 'http://www.tcdb.org/search/result.php?tc=%id',
    attributes: [
      {
        name: 'FamilyName',
        xmlTag: 'family name',
      },
    ],
    implicit: false,
    idMappingName: 'TCDB_ID',
  },
  {
    name: 'UniLectin',
    displayName: 'UniLectin',
    category: 'PROTEIN_FAMILY_GROUP_DATABASES',
    uriLink: 'https://www.unilectin.eu/curated/protein/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'IDEAL',
    displayName: 'IDEAL',
    category: 'PROTEIN_FAMILY_GROUP_DATABASES',
    uriLink: 'http://idp1.force.cs.is.nagoya-u.ac.jp/IDEAL/ideal.php?id=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
    idMappingName: 'IDEAL_ID',
  },
  {
    name: 'GPCRDB',
    displayName: 'GPCRDB',
    category: 'PROTEIN_FAMILY_GROUP_DATABASES',
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
    category: 'PTM_DATABASES',
    uriLink:
      'http://digbio.missouri.edu/CarbonylDB/index.php/detail/protein/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'DEPOD',
    displayName: 'DEPOD',
    category: 'PTM_DATABASES',
    uriLink: 'http://depod.bioss.uni-freiburg.de/showp.php?AC=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'GlyConnect',
    displayName: 'GlyConnect',
    category: 'PTM_DATABASES',
    uriLink: 'https://glyconnect.expasy.org/browser/proteins/%id',
    attributes: [
      {
        name: 'glycosylation',
        xmlTag: 'glycosylation',
      },
    ],
    implicit: false,
    idMappingName: 'GLYCONNECT_ID',
  },
  {
    name: 'GlyGen',
    displayName: 'GlyGen',
    category: 'PTM_DATABASES',
    uriLink:
      'https://www.glygen.org/glycoprotein_detail.html?uniprot_canonical_ac=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'iPTMnet',
    displayName: 'iPTMnet',
    category: 'PTM_DATABASES',
    uriLink: 'http://research.bioinformatics.udel.edu/iptmnet/entry/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'PhosphoSitePlus',
    displayName: 'PhosphoSitePlus',
    category: 'PTM_DATABASES',
    uriLink: 'https://www.phosphosite.org/uniprotAccAction?id=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'SwissPalm',
    displayName: 'SwissPalm',
    category: 'PTM_DATABASES',
    uriLink: 'https://swisspalm.org/proteins/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'UniCarbKB',
    displayName: 'UniCarbKB',
    category: 'PTM_DATABASES',
    uriLink: 'http://www.unicarbkb.org/proteinsummary/%id/annotated',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'MetOSite',
    displayName: 'MetOSite',
    category: 'PTM_DATABASES',
    uriLink: 'https://metosite.uma.es/scan/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'BioMuta',
    displayName: 'BioMuta',
    category: 'POLYMORPHISM_AND_MUTATION_DATABASES',
    uriLink:
      'https://hive.biochemistry.gwu.edu/tools/biomuta/biomuta.php?gene=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
    idMappingName: 'BIOMUTA_ID',
  },
  {
    name: 'DMDM',
    displayName: 'DMDM',
    category: 'POLYMORPHISM_AND_MUTATION_DATABASES',
    uriLink:
      'http://bioinf.umbc.edu/dmdm/gene_prot_page.php?search_type=protein&id=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
    idMappingName: 'DMDM_ID',
  },
  {
    name: 'dbSNP',
    displayName: 'dbSNP',
    category: 'POLYMORPHISM_AND_MUTATION_DATABASES',
    uriLink: 'https://www.ncbi.nlm.nih.gov/SNP/snp_ref.cgi?type=rs&rs=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'COMPLUYEAST-2DPAGE',
    displayName: 'COMPLUYEAST-2DPAGE',
    category: 'D2_GEL_DATABASES',
    uriLink: 'http://compluyeast2dpage.dacya.ucm.es/cgi-bin/2d/2d.cgi?ac=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'DOSAC-COBS-2DPAGE',
    displayName: 'DOSAC-COBS-2DPAGE',
    category: 'D2_GEL_DATABASES',
    uriLink: 'http://www.dosac.unipa.it/cgi-bin/2d/2d.cgi?ac=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'OGP',
    displayName: 'OGP',
    category: 'D2_GEL_DATABASES',
    uriLink: 'http://usc_ogp_2ddatabase.cesga.es/cgi-bin/2d/2d.cgi?%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'REPRODUCTION-2DPAGE',
    displayName: 'REPRODUCTION-2DPAGE',
    category: 'D2_GEL_DATABASES',
    uriLink: 'http://reprod.njmu.edu.cn/cgi-bin/2d/2d.cgi?%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'SWISS-2DPAGE',
    displayName: 'SWISS-2DPAGE',
    category: 'D2_GEL_DATABASES',
    uriLink: 'https://world-2dpage.expasy.org/swiss-2dpage/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'UCD-2DPAGE',
    displayName: 'UCD-2DPAGE',
    category: 'D2_GEL_DATABASES',
    uriLink: 'http://proteomics-portal.ucd.ie/cgi-bin/2d/2d.cgi?%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'World-2DPAGE',
    displayName: 'World-2DPAGE',
    category: 'D2_GEL_DATABASES',
    uriLink: 'https://world-2dpage.expasy.org/repository/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
    idMappingName: 'WORLD_2DPAGE_ID',
  },
  {
    name: 'CPTAC',
    displayName: 'CPTAC',
    category: 'PROTEOMIC_DATABASES',
    uriLink: 'https://assays.cancer.gov/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
    idMappingName: 'CPTAC_ID',
  },
  {
    name: 'EPD',
    displayName: 'EPD',
    category: 'PROTEOMIC_DATABASES',
    uriLink: 'https://www.peptracker.com/epd/analytics/?protein_id=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'MaxQB',
    displayName: 'MaxQB',
    category: 'PROTEOMIC_DATABASES',
    uriLink: 'http://maxqb.biochem.mpg.de/mxdb/protein/show/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'PaxDb',
    displayName: 'PaxDb',
    category: 'PROTEOMIC_DATABASES',
    uriLink: 'https://pax-db.org/#!protein/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'PeptideAtlas',
    displayName: 'PeptideAtlas',
    category: 'PROTEOMIC_DATABASES',
    uriLink:
      'https://db.systemsbiology.net/sbeams/cgi/PeptideAtlas/Search?action=GO&search_key=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'PRIDE',
    displayName: 'PRIDE',
    category: 'PROTEOMIC_DATABASES',
    uriLink:
      'https://www.ebi.ac.uk/pride/searchSummary.do?queryTypeSelected=identification%20accession%20number&identificationAccessionNumber=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'ProMEX',
    displayName: 'ProMEX',
    category: 'PROTEOMIC_DATABASES',
    uriLink: 'http://promex.pph.univie.ac.at/promex/?ac=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'ProteomicsDB',
    displayName: 'ProteomicsDB',
    category: 'PROTEOMIC_DATABASES',
    uriLink:
      'https://www.proteomicsdb.org/proteomicsdb/#protein/proteinDetails/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
    idMappingName: 'PROTEOMICSDB_ID',
  },
  {
    name: 'TopDownProteomics',
    displayName: 'TopDownProteomics',
    category: 'PROTEOMIC_DATABASES',
    uriLink: 'http://repository.topdownproteomics.org/Proteoforms?query=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'jPOST',
    displayName: 'jPOST',
    category: 'PROTEOMIC_DATABASES',
    uriLink: 'https://globe.jpostdb.org/protein?id=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'MassIVE',
    displayName: 'MassIVE',
    category: 'PROTEOMIC_DATABASES',
    uriLink:
      'https://massive.ucsd.edu/ProteoSAFe/protein_explorer.jsp?libraries=2&protein_name=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'DNASU',
    displayName: 'DNASU',
    category: 'PROTOCOLS_AND_MATERIALS_DATABASES',
    uriLink: 'https://dnasu.org/DNASU/AdvancedSearchOptions.do?geneName=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
    idMappingName: 'DNASU_ID',
  },
  {
    name: 'Ensembl',
    displayName: 'Ensembl',
    category: 'GENOME_ANNOTATION_DATABASES',
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
    implicit: false,
    idMappingName: 'ENSEMBL_ID',
  },
  {
    name: 'EnsemblBacteria',
    displayName: 'EnsemblBacteria',
    category: 'GENOME_ANNOTATION_DATABASES',
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
    implicit: false,
  },
  {
    name: 'EnsemblFungi',
    displayName: 'EnsemblFungi',
    category: 'GENOME_ANNOTATION_DATABASES',
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
    implicit: false,
  },
  {
    name: 'EnsemblMetazoa',
    displayName: 'EnsemblMetazoa',
    category: 'GENOME_ANNOTATION_DATABASES',
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
    implicit: false,
  },
  {
    name: 'EnsemblPlants',
    displayName: 'EnsemblPlants',
    category: 'GENOME_ANNOTATION_DATABASES',
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
    implicit: false,
  },
  {
    name: 'EnsemblProtists',
    displayName: 'EnsemblProtists',
    category: 'GENOME_ANNOTATION_DATABASES',
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
    implicit: false,
  },
  {
    name: 'GeneDB',
    displayName: 'GeneDB',
    category: 'GENOME_ANNOTATION_DATABASES',
    uriLink: 'https://www.genedb.org/gene/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
    idMappingName: 'GENEDB_ID',
  },
  {
    name: 'GeneID',
    displayName: 'GeneID',
    category: 'GENOME_ANNOTATION_DATABASES',
    uriLink: 'https://www.ncbi.nlm.nih.gov/gene/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
    idMappingName: 'P_ENTREZGENEID',
  },
  {
    name: 'Gramene',
    displayName: 'Gramene',
    category: 'GENOME_ANNOTATION_DATABASES',
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
    implicit: false,
  },
  {
    name: 'KEGG',
    displayName: 'KEGG',
    category: 'GENOME_ANNOTATION_DATABASES',
    uriLink: 'https://www.genome.jp/dbget-bin/www_bget?%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
    idMappingName: 'KEGG_ID',
  },
  {
    name: 'PATRIC',
    displayName: 'PATRIC',
    category: 'GENOME_ANNOTATION_DATABASES',
    uriLink: 'https://www.patricbrc.org/view/Feature/%id',
    attributes: [
      {
        name: 'GeneDesignation',
        xmlTag: 'gene designation',
      },
    ],
    implicit: false,
    idMappingName: 'PATRIC_ID',
  },
  {
    name: 'UCSC',
    displayName: 'UCSC',
    category: 'GENOME_ANNOTATION_DATABASES',
    uriLink: 'https://genome.ucsc.edu/cgi-bin/hgLinkIn?resource=uniprot&id=%id',
    attributes: [
      {
        name: 'OrganismName',
        xmlTag: 'organism name',
      },
    ],
    implicit: false,
    idMappingName: 'UCSC_ID',
  },
  {
    name: 'VectorBase',
    displayName: 'VectorBase',
    category: 'GENOME_ANNOTATION_DATABASES',
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
    implicit: false,
  },
  {
    name: 'WBParaSite',
    displayName: 'WBParaSite',
    category: 'GENOME_ANNOTATION_DATABASES',
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
    implicit: false,
    idMappingName: 'WBPARASITE_ID',
  },
  {
    name: 'ArachnoServer',
    displayName: 'ArachnoServer',
    category: 'ORGANISM_SPECIFIC_DATABASES',
    uriLink: 'http://www.arachnoserver.org/toxincard.html?id=%id',
    attributes: [
      {
        name: 'ToxinName',
        xmlTag: 'toxin name',
      },
    ],
    implicit: false,
    idMappingName: 'ARACHNOSERVER_ID',
  },
  {
    name: 'Araport',
    displayName: 'Araport',
    category: 'ORGANISM_SPECIFIC_DATABASES',
    uriLink: 'https://apps.araport.org/thalemine/portal.do?externalids=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
    idMappingName: 'ARAPORT_ID',
  },
  {
    name: 'CGD',
    displayName: 'CGD',
    category: 'ORGANISM_SPECIFIC_DATABASES',
    uriLink: 'http://www.candidagenome.org/cgi-bin/locus.pl?dbid=%id',
    attributes: [
      {
        name: 'GeneName',
        xmlTag: 'gene designation',
      },
    ],
    implicit: false,
    idMappingName: 'CGD',
  },
  {
    name: 'ConoServer',
    displayName: 'ConoServer',
    category: 'ORGANISM_SPECIFIC_DATABASES',
    uriLink: 'http://www.conoserver.org/?page=card&table=protein&id=%id',
    attributes: [
      {
        name: 'ToxinName',
        xmlTag: 'toxin name',
      },
    ],
    implicit: false,
    idMappingName: 'CONOSERVER_ID',
  },
  {
    name: 'CTD',
    displayName: 'CTD',
    category: 'ORGANISM_SPECIFIC_DATABASES',
    uriLink: 'http://ctdbase.org/detail.go?type=gene&db=GENE&acc=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'dictyBase',
    displayName: 'dictyBase',
    category: 'ORGANISM_SPECIFIC_DATABASES',
    uriLink: 'http://dictybase.org/db/cgi-bin/gene_page.pl?primary_id=%id',
    attributes: [
      {
        name: 'GeneName',
        xmlTag: 'gene designation',
      },
    ],
    implicit: false,
    idMappingName: 'DICTYBASE_ID',
  },
  {
    name: 'DisGeNET',
    displayName: 'DisGeNET',
    category: 'ORGANISM_SPECIFIC_DATABASES',
    uriLink: 'http://disgenet.org/search?q=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'EchoBASE',
    displayName: 'EchoBASE',
    category: 'ORGANISM_SPECIFIC_DATABASES',
    uriLink: 'http://www.york.ac.uk/res/thomas/Gene.cfm?recordID=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
    idMappingName: 'ECHOBASE_ID',
  },
  {
    name: 'euHCVdb',
    displayName: 'euHCVdb',
    category: 'ORGANISM_SPECIFIC_DATABASES',
    uriLink: 'https://euhcvdb.ibcp.fr/euHCVdb/do/displayHCVEntry?primaryAC=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
    idMappingName: 'EUHCVDB_ID',
  },
  {
    name: 'VEuPathDB',
    displayName: 'VEuPathDB',
    category: 'ORGANISM_SPECIFIC_DATABASES',
    uriLink: 'https://www.veupathdb.org/gene/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
    idMappingName: 'VEUPATHDB_ID',
  },
  {
    name: 'FlyBase',
    displayName: 'FlyBase',
    category: 'ORGANISM_SPECIFIC_DATABASES',
    uriLink: 'http://flybase.org/reports/%id.html',
    attributes: [
      {
        name: 'GeneName',
        xmlTag: 'gene designation',
      },
    ],
    implicit: false,
    idMappingName: 'FLYBASE_ID',
  },
  {
    name: 'GeneCards',
    displayName: 'GeneCards',
    category: 'ORGANISM_SPECIFIC_DATABASES',
    uriLink: 'https://www.genecards.org/cgi-bin/carddisp.pl?gene=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
    idMappingName: 'GENECARDS_ID',
  },
  {
    name: 'GeneReviews',
    displayName: 'GeneReviews',
    category: 'ORGANISM_SPECIFIC_DATABASES',
    uriLink: 'https://www.ncbi.nlm.nih.gov/books/NBK1116/?term=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
    idMappingName: 'GENEREVIEWS_ID',
  },
  {
    name: 'HGNC',
    displayName: 'HGNC',
    category: 'ORGANISM_SPECIFIC_DATABASES',
    uriLink: 'https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/%id',
    attributes: [
      {
        name: 'GeneName',
        xmlTag: 'gene designation',
      },
    ],
    implicit: false,
    idMappingName: 'HGNC_ID',
  },
  {
    name: 'GenAtlas',
    displayName: 'GenAtlas',
    category: 'ORGANISM_SPECIFIC_DATABASES',
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
    category: 'ORGANISM_SPECIFIC_DATABASES',
    uriLink: 'http://www.proteinatlas.org/tissue_profile.php?antibody_id=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'LegioList',
    displayName: 'LegioList',
    category: 'ORGANISM_SPECIFIC_DATABASES',
    uriLink:
      'http://genolist.pasteur.fr/LegioList/genome.cgi?external_query+%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
    idMappingName: 'LEGIOLIST_ID',
  },
  {
    name: 'Leproma',
    displayName: 'Leproma',
    category: 'ORGANISM_SPECIFIC_DATABASES',
    uriLink: 'https://mycobrowser.epfl.ch/genes/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
    idMappingName: 'LEPROMA_ID',
  },
  {
    name: 'MaizeGDB',
    displayName: 'MaizeGDB',
    category: 'ORGANISM_SPECIFIC_DATABASES',
    uriLink: 'https://www.maizegdb.org/data_center/gene_product?id=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
    idMappingName: 'MAIZEGDB_ID',
  },
  {
    name: 'MalaCards',
    displayName: 'MalaCards',
    category: 'ORGANISM_SPECIFIC_DATABASES',
    uriLink: 'https://www.malacards.org/search/eliteGene/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'MGI',
    displayName: 'MGI',
    category: 'ORGANISM_SPECIFIC_DATABASES',
    uriLink: 'http://www.informatics.jax.org/marker/%id',
    attributes: [
      {
        name: 'GeneName',
        xmlTag: 'gene designation',
      },
    ],
    implicit: false,
    idMappingName: 'MGI_ID',
  },
  {
    name: 'MIM',
    displayName: 'MIM',
    category: 'ORGANISM_SPECIFIC_DATABASES',
    uriLink: 'https://www.omim.org/entry/%id',
    attributes: [
      {
        name: 'Type',
        xmlTag: 'type',
      },
    ],
    implicit: false,
    idMappingName: 'MIM_ID',
  },
  {
    name: 'NIAGADS',
    displayName: 'NIAGADS',
    category: 'ORGANISM_SPECIFIC_DATABASES',
    uriLink:
      'https://www.niagads.org/genomics/showRecord.do?name=GeneRecordClasses.GeneRecordClass&source_id=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'neXtProt',
    displayName: 'neXtProt',
    category: 'ORGANISM_SPECIFIC_DATABASES',
    uriLink: 'https://www.nextprot.org/entry/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
    idMappingName: 'NEXTPROT_ID',
  },
  {
    name: 'OpenTargets',
    displayName: 'OpenTargets',
    category: 'ORGANISM_SPECIFIC_DATABASES',
    uriLink: 'https://www.targetvalidation.org/target/%id/associations',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'Orphanet',
    displayName: 'Orphanet',
    category: 'ORGANISM_SPECIFIC_DATABASES',
    uriLink:
      'https://www.orpha.net/consor/cgi-bin/OC_Exp.php?Lng=GB&Expert=%id',
    attributes: [
      {
        name: 'Disease',
        xmlTag: 'disease',
      },
    ],
    implicit: false,
    idMappingName: 'ORPHANET_ID',
  },
  {
    name: 'PharmGKB',
    displayName: 'PharmGKB',
    category: 'ORGANISM_SPECIFIC_DATABASES',
    uriLink: 'https://www.pharmgkb.org/gene/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
    idMappingName: 'PHARMGKB_ID',
  },
  {
    name: 'PomBase',
    displayName: 'PomBase',
    category: 'ORGANISM_SPECIFIC_DATABASES',
    uriLink: 'https://www.pombase.org/spombe/result/%id',
    attributes: [
      {
        name: 'GeneName',
        xmlTag: 'gene designation',
      },
    ],
    implicit: false,
    idMappingName: 'POMBASE_ID',
  },
  {
    name: 'PseudoCAP',
    displayName: 'PseudoCAP',
    category: 'ORGANISM_SPECIFIC_DATABASES',
    uriLink: 'http://www.pseudomonas.com/feature/show?locus_tag=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
    idMappingName: 'PSEUDOCAP_ID',
  },
  {
    name: 'RGD',
    displayName: 'RGD',
    category: 'ORGANISM_SPECIFIC_DATABASES',
    uriLink: 'http://rgd.mcw.edu/tools/genes/genes_view.cgi?id=%id',
    attributes: [
      {
        name: 'GeneName',
        xmlTag: 'gene designation',
      },
    ],
    implicit: false,
    idMappingName: 'RGD_ID',
  },
  {
    name: 'SGD',
    displayName: 'SGD',
    category: 'ORGANISM_SPECIFIC_DATABASES',
    uriLink: 'https://www.yeastgenome.org/locus/%id',
    attributes: [
      {
        name: 'GeneName',
        xmlTag: 'gene designation',
      },
    ],
    implicit: false,
    idMappingName: 'SGD_ID',
  },
  {
    name: 'TAIR',
    displayName: 'TAIR',
    category: 'ORGANISM_SPECIFIC_DATABASES',
    uriLink: 'http://www.arabidopsis.org/servlets/TairObject?accession=%id',
    attributes: [
      {
        name: 'GeneName',
        xmlTag: 'gene designation',
      },
    ],
    implicit: false,
  },
  {
    name: 'TubercuList',
    displayName: 'TubercuList',
    category: 'ORGANISM_SPECIFIC_DATABASES',
    uriLink: 'https://mycobrowser.epfl.ch/genes/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
    idMappingName: 'TUBERCULIST_ID',
  },
  {
    name: 'VGNC',
    displayName: 'VGNC',
    category: 'ORGANISM_SPECIFIC_DATABASES',
    uriLink:
      'https://vertebrate.genenames.org/data/gene-symbol-report/#!/vgnc_id/%id',
    attributes: [
      {
        name: 'GeneName',
        xmlTag: 'gene designation',
      },
    ],
    implicit: false,
    idMappingName: 'VGNC_ID',
  },
  {
    name: 'WormBase',
    displayName: 'WormBase',
    category: 'ORGANISM_SPECIFIC_DATABASES',
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
    implicit: false,
    idMappingName: 'WORMBASE_ID',
  },
  {
    name: 'Xenbase',
    displayName: 'Xenbase',
    category: 'ORGANISM_SPECIFIC_DATABASES',
    uriLink:
      'http://www.xenbase.org/gene/showgene.do?method=display&geneId=%id',
    attributes: [
      {
        name: 'GeneName',
        xmlTag: 'gene designation',
      },
    ],
    implicit: false,
    idMappingName: 'XENBASE_ID',
  },
  {
    name: 'ZFIN',
    displayName: 'ZFIN',
    category: 'ORGANISM_SPECIFIC_DATABASES',
    uriLink: 'https://zfin.org/%id',
    attributes: [
      {
        name: 'GeneName',
        xmlTag: 'gene designation',
      },
    ],
    implicit: false,
    idMappingName: 'ZFIN_ID',
  },
  {
    name: 'PHI-base',
    displayName: 'PHI-base',
    category: 'ORGANISM_SPECIFIC_DATABASES',
    uriLink: 'http://www.phi-base.org/searchFacet.htm?queryTerm=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
    idMappingName: 'PHI_BASE_ID',
  },
  {
    name: 'HUGE',
    displayName: 'HUGE',
    category: 'ORGANISM_SPECIFIC_DATABASES',
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
    category: 'ORGANISM_SPECIFIC_DATABASES',
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
    category: 'PHYLOGENOMIC_DATABASES',
    uriLink:
      'http://eggnogdb.embl.de/#/app/results?seqid=%accession&target_nogs=%id',
    attributes: [
      {
        name: 'ToxonomicScope',
        xmlTag: 'taxonomic scope',
      },
    ],
    implicit: false,
    idMappingName: 'EGGNOG_ID',
  },
  {
    name: 'GeneTree',
    displayName: 'GeneTree',
    category: 'PHYLOGENOMIC_DATABASES',
    uriLink: 'http://www.ensemblgenomes.org/id-genetree/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
    idMappingName: 'GENETREE_ID',
  },
  {
    name: 'HOGENOM',
    displayName: 'HOGENOM',
    category: 'PHYLOGENOMIC_DATABASES',
    uriLink: 'http://doua.prabi.fr/cgi-bin/acnuc-ac2tree?query=%id&db=HOGENOM6',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
    idMappingName: 'HOGENOM_ID',
  },
  {
    name: 'InParanoid',
    displayName: 'InParanoid',
    category: 'PHYLOGENOMIC_DATABASES',
    uriLink: 'http://inparanoid.sbc.su.se/cgi-bin/gene_search.cgi?id=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'KO',
    displayName: 'KO',
    category: 'PHYLOGENOMIC_DATABASES',
    uriLink: 'https://www.genome.jp/dbget-bin/www_bget?ko:%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'OMA',
    displayName: 'OMA',
    category: 'PHYLOGENOMIC_DATABASES',
    uriLink: 'https://omabrowser.org/oma/group/%id',
    attributes: [
      {
        name: 'Fingerprint',
        xmlTag: 'fingerprint',
      },
    ],
    implicit: false,
    idMappingName: 'OMA_ID',
  },
  {
    name: 'OrthoDB',
    displayName: 'OrthoDB',
    category: 'PHYLOGENOMIC_DATABASES',
    uriLink: 'https://www.orthodb.org/?query=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
    idMappingName: 'ORTHODB_ID',
  },
  {
    name: 'PhylomeDB',
    displayName: 'PhylomeDB',
    category: 'PHYLOGENOMIC_DATABASES',
    uriLink: 'http://phylomedb.org/?q=search_tree&seqid=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'TreeFam',
    displayName: 'TreeFam',
    category: 'PHYLOGENOMIC_DATABASES',
    uriLink: 'http://www.treefam.org/family/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
    idMappingName: 'TREEFAM_ID',
  },
  {
    name: 'BioCyc',
    displayName: 'BioCyc',
    category: 'ENZYME_AND_PATHWAY_DATABASES',
    uriLink: 'https://biocyc.org/getid?id=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
    idMappingName: 'BIOCYC_ID',
  },
  {
    name: 'BRENDA',
    displayName: 'BRENDA',
    category: 'ENZYME_AND_PATHWAY_DATABASES',
    uriLink:
      'https://www.brenda-enzymes.org/enzyme.php?ecno=%id&UniProtAcc=%accession&OrganismID=%OrganismId',
    attributes: [
      {
        name: 'OrganismId',
        xmlTag: 'organism ID',
      },
    ],
    implicit: false,
  },
  {
    name: 'Reactome',
    displayName: 'Reactome',
    category: 'ENZYME_AND_PATHWAY_DATABASES',
    uriLink: 'https://www.reactome.org/PathwayBrowser/#%id&FLG=%accession',
    attributes: [
      {
        name: 'PathwayName',
        xmlTag: 'pathway name',
      },
    ],
    implicit: false,
    idMappingName: 'REACTOME_ID',
  },
  {
    name: 'SABIO-RK',
    displayName: 'SABIO-RK',
    category: 'ENZYME_AND_PATHWAY_DATABASES',
    uriLink: 'http://sabiork.h-its.org/newSearch?q=UniProtKB_AC:%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'SignaLink',
    displayName: 'SignaLink',
    category: 'ENZYME_AND_PATHWAY_DATABASES',
    uriLink: 'http://signalink.org/protein/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'SIGNOR',
    displayName: 'SIGNOR',
    category: 'ENZYME_AND_PATHWAY_DATABASES',
    uriLink: 'https://signor.uniroma2.it/relation_result.php?id=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'UniPathway',
    displayName: 'UniPathway',
    category: 'ENZYME_AND_PATHWAY_DATABASES',
    uriLink: '',
    attributes: [
      {
        name: 'RectionId',
        xmlTag: 'reaction ID',
      },
    ],
    implicit: false,
    idMappingName: 'UNIPATHWAY_ID',
  },
  {
    name: 'PlantReactome',
    displayName: 'PlantReactome',
    category: 'ENZYME_AND_PATHWAY_DATABASES',
    uriLink:
      'https://plantreactome.gramene.org/PathwayBrowser/#/%id&FLG=%accession',
    attributes: [
      {
        name: 'pathwayName',
        xmlTag: 'pathway name',
      },
    ],
    implicit: false,
    idMappingName: 'PLANT_REACTOME_ID',
  },
  {
    name: 'ENZYME',
    displayName: 'ENZYME',
    category: 'ENZYME_AND_PATHWAY_DATABASES',
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
    category: 'OTHER',
    uriLink:
      'http://chitars.md.biu.ac.il/bin/search.pl?searchtype=gene_name&searchstr=%id&%d=1',
    attributes: [
      {
        name: 'OrganismName',
        xmlTag: 'organism name',
      },
    ],
    implicit: false,
    idMappingName: 'CHITARS_ID',
  },
  {
    name: 'EvolutionaryTrace',
    displayName: 'EvolutionaryTrace',
    category: 'OTHER',
    uriLink:
      'http://mammoth.bcm.tmc.edu/cgi-bin/report_maker_ls/uniprotTraceServerResults.pl?identifier=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'GeneWiki',
    displayName: 'GeneWiki',
    category: 'OTHER',
    uriLink: 'https://en.wikipedia.org/wiki/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
    idMappingName: 'GENEWIKI_ID',
  },
  {
    name: 'GenomeRNAi',
    displayName: 'GenomeRNAi',
    category: 'OTHER',
    uriLink: 'http://genomernai.org/genedetails/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
    idMappingName: 'GENOMERNAI_ID',
  },
  {
    name: 'PRO',
    displayName: 'PRO',
    category: 'OTHER',
    uriLink: 'https://proconsortium.org/app/entry/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'SOURCE_MIM',
    displayName: 'SOURCE',
    category: 'OTHER',
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
    category: 'OTHER',
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
    category: 'GENE_EXPRESSION_DATABASES',
    uriLink: 'https://bgee.org/?page=gene&gene_id=%id',
    attributes: [
      {
        name: 'ExpressionPatterns',
        xmlTag: 'expression patterns',
      },
    ],
    implicit: false,
  },
  {
    name: 'CleanEx',
    displayName: 'CleanEx',
    category: 'GENE_EXPRESSION_DATABASES',
    uriLink:
      'https://cleanex.vital-it.ch/cgi-bin/get_doc?db=cleanex&format=nice&entry=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'CollecTF',
    displayName: 'CollecTF',
    category: 'GENE_EXPRESSION_DATABASES',
    uriLink: 'http://www.collectf.org/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
    idMappingName: 'COLLECTF_ID',
  },
  {
    name: 'ExpressionAtlas',
    displayName: 'ExpressionAtlas',
    category: 'GENE_EXPRESSION_DATABASES',
    uriLink: 'https://www.ebi.ac.uk/gxa/query?geneQuery=%id',
    attributes: [
      {
        name: 'ExpressionPatterns',
        xmlTag: 'expression patterns',
      },
    ],
    implicit: false,
  },
  {
    name: 'Genevisible',
    displayName: 'Genevisible',
    category: 'GENE_EXPRESSION_DATABASES',
    uriLink: 'https://genevisible.com/tissues/%OrganismId/UniProt/%id',
    attributes: [
      {
        name: 'OrganismId',
        xmlTag: 'organism ID',
      },
    ],
    implicit: false,
  },
  {
    name: 'CDD',
    displayName: 'CDD',
    category: 'FAMILY_AND_DOMAIN_DATABASES',
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
    implicit: false,
  },
  {
    name: 'Gene3D',
    displayName: 'Gene3D',
    category: 'FAMILY_AND_DOMAIN_DATABASES',
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
    implicit: false,
  },
  {
    name: 'HAMAP',
    displayName: 'HAMAP',
    category: 'FAMILY_AND_DOMAIN_DATABASES',
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
    implicit: false,
  },
  {
    name: 'InterPro',
    displayName: 'InterPro',
    category: 'FAMILY_AND_DOMAIN_DATABASES',
    uriLink: 'https://www.ebi.ac.uk/interpro/entry/%id',
    attributes: [
      {
        name: 'EntryName',
        xmlTag: 'entry name',
      },
    ],
    implicit: false,
  },
  {
    name: 'PANTHER',
    displayName: 'PANTHER',
    category: 'FAMILY_AND_DOMAIN_DATABASES',
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
    implicit: false,
  },
  {
    name: 'Pfam',
    displayName: 'Pfam',
    category: 'FAMILY_AND_DOMAIN_DATABASES',
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
    implicit: false,
  },
  {
    name: 'PIRSF',
    displayName: 'PIRSF',
    category: 'FAMILY_AND_DOMAIN_DATABASES',
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
    implicit: false,
  },
  {
    name: 'PRINTS',
    displayName: 'PRINTS',
    category: 'FAMILY_AND_DOMAIN_DATABASES',
    uriLink:
      'http://umber.sbs.man.ac.uk/cgi-bin/dbbrowser/sprint/searchprintss.cgi?display_opts=Prints&category=None&queryform=false&prints_accn=%id',
    attributes: [
      {
        name: 'EntryName',
        xmlTag: 'entry name',
      },
    ],
    implicit: false,
  },
  {
    name: 'ProDom',
    displayName: 'ProDom',
    category: 'FAMILY_AND_DOMAIN_DATABASES',
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
    implicit: false,
  },
  {
    name: 'SFLD',
    displayName: 'SFLD',
    category: 'FAMILY_AND_DOMAIN_DATABASES',
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
    implicit: false,
  },
  {
    name: 'SMART',
    displayName: 'SMART',
    category: 'FAMILY_AND_DOMAIN_DATABASES',
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
    implicit: false,
  },
  {
    name: 'SUPFAM',
    displayName: 'SUPFAM',
    category: 'FAMILY_AND_DOMAIN_DATABASES',
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
    implicit: false,
  },
  {
    name: 'TIGRFAMs',
    displayName: 'TIGRFAMs',
    category: 'FAMILY_AND_DOMAIN_DATABASES',
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
    implicit: false,
  },
  {
    name: 'PROSITE',
    displayName: 'PROSITE',
    category: 'FAMILY_AND_DOMAIN_DATABASES',
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
    implicit: false,
  },
  {
    name: 'DisProt',
    displayName: 'DisProt',
    category: 'FAMILY_AND_DOMAIN_DATABASES',
    uriLink: 'https://disprot.org/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
    idMappingName: 'DISPROT_ID',
  },
  {
    name: 'MobiDB',
    displayName: 'MobiDB',
    category: 'FAMILY_AND_DOMAIN_DATABASES',
    uriLink: 'http://mobidb.bio.unipd.it/entries/%accession',
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
    category: 'FAMILY_AND_DOMAIN_DATABASES',
    uriLink: 'http://www.protonet.cs.huji.ac.il/sp.php?prot=%accession',
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
    category: 'GENE_ONTOLOGY_DATABASES',
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
    implicit: false,
  },
  {
    name: 'Proteomes',
    displayName: 'Proteomes',
    category: 'PROTEOMES_DATABASES',
    uriLink: 'https://www.uniprot.org/proteomes/%id',
    attributes: [
      {
        name: 'Component',
        xmlTag: 'component',
      },
    ],
    implicit: false,
  },
  {
    name: 'PathwayCommons',
    displayName: 'PathwayCommons',
    category: 'ENZYME_AND_PATHWAY_DATABASES',
    uriLink: 'https://apps.pathwaycommons.org/search?q=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'Pharos',
    displayName: 'Pharos',
    category: 'OTHER',
    uriLink: 'https://pharos.nih.gov/targets/%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
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
    implicit: false,
  },
  {
    name: 'ABCD',
    displayName: 'ABCD',
    category: 'PROTOCOLS_AND_MATERIALS_DATABASES',
    uriLink: 'https://web.expasy.org/cgi-bin/abcd/search_abcd.pl?input=%id',
    attributes: [
      {
        name: 'Description',
        xmlTag: 'description',
      },
    ],
    implicit: false,
  },
  {
    name: 'Antibodypedia',
    displayName: 'Antibodypedia',
    category: 'PROTOCOLS_AND_MATERIALS_DATABASES',
    uriLink: 'https://www.antibodypedia.com/protein/%id',
    attributes: [
      {
        name: 'antibodies',
        xmlTag: 'antibodies',
      },
    ],
    implicit: false,
  },
  {
    name: 'CPTC',
    displayName: 'CPTC',
    category: 'PROTOCOLS_AND_MATERIALS_DATABASES',
    uriLink: 'https://antibodies.cancer.gov/uniprot/%id',
    attributes: [
      {
        name: 'antibodies',
        xmlTag: 'antibodies',
      },
    ],
    implicit: false,
  },
  {
    name: 'RNAct',
    displayName: 'RNAct',
    category: 'OTHER',
    uriLink: 'https://rnact.crg.eu/protein?query=%id',
    attributes: [
      {
        name: 'moleculeType',
        xmlTag: 'moleculeType',
      },
    ],
    implicit: false,
  },
  {
    name: 'BioGRID-ORCS',
    displayName: 'BioGRID-ORCS',
    category: 'OTHER',
    uriLink: 'ttps://orcs.thebiogrid.org/Gene/%id',
    attributes: [
      {
        name: 'hits',
        xmlTag: 'hits',
      },
    ],
    implicit: false,
  },
];

export default databaseInfo;
