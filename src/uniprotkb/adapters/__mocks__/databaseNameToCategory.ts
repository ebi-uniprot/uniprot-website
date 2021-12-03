import { DatabaseCategory } from '../../types/databaseRefs';

const databaseNameToCategory: Map<string, DatabaseCategory> = new Map([
  ['EMBL', DatabaseCategory.SEQUENCE],
  ['GenBank', DatabaseCategory.SEQUENCE],
  ['DDBJ', DatabaseCategory.SEQUENCE],
  ['CCDS', DatabaseCategory.SEQUENCE],
  ['PIR', DatabaseCategory.SEQUENCE],
  ['RefSeq', DatabaseCategory.SEQUENCE],
  ['PDB', DatabaseCategory.STRUCTURE],
  ['PDBsum', DatabaseCategory.STRUCTURE],
  ['PCDDB', DatabaseCategory.STRUCTURE],
  ['SASBDB', DatabaseCategory.STRUCTURE],
  ['BMRB', DatabaseCategory.STRUCTURE],
  ['ModBase', DatabaseCategory.STRUCTURE],
  ['SMR', DatabaseCategory.STRUCTURE],
  ['SWISS-MODEL-Workspace', DatabaseCategory.STRUCTURE],
  ['PDBe-KB', DatabaseCategory.STRUCTURE],
  ['PDBj', DatabaseCategory.STRUCTURE],
  ['RCSB-PDB', DatabaseCategory.STRUCTURE],
  ['BioGRID', DatabaseCategory.INTERACTION],
  ['ComplexPortal', DatabaseCategory.INTERACTION],
  ['CORUM', DatabaseCategory.INTERACTION],
  ['DIP', DatabaseCategory.INTERACTION],
  ['ELM', DatabaseCategory.INTERACTION],
  ['IntAct', DatabaseCategory.INTERACTION],
  ['MINT', DatabaseCategory.INTERACTION],
  ['STRING', DatabaseCategory.INTERACTION],
  ['BindingDB', DatabaseCategory.CHEMISTRY],
  ['ChEMBL', DatabaseCategory.CHEMISTRY],
  ['DrugBank', DatabaseCategory.CHEMISTRY],
  ['GuidetoPHARMACOLOGY', DatabaseCategory.CHEMISTRY],
  ['SwissLipids', DatabaseCategory.CHEMISTRY],
  ['Allergome', DatabaseCategory.FAMILY],
  ['CAZy', DatabaseCategory.FAMILY],
  ['ESTHER', DatabaseCategory.FAMILY],
  ['IMGT_GENE-DB', DatabaseCategory.FAMILY],
  ['MEROPS', DatabaseCategory.FAMILY],
  ['MoonDB', DatabaseCategory.FAMILY],
  ['MoonProt', DatabaseCategory.FAMILY],
  ['CLAE', DatabaseCategory.FAMILY],
  ['PeroxiBase', DatabaseCategory.FAMILY],
  ['REBASE', DatabaseCategory.FAMILY],
  ['TCDB', DatabaseCategory.FAMILY],
  ['UniLectin', DatabaseCategory.FAMILY],
  ['GPCRDB', DatabaseCategory.FAMILY],
  ['CarbonylDB', DatabaseCategory.PTM],
  ['DEPOD', DatabaseCategory.PTM],
  ['GlyConnect', DatabaseCategory.PTM],
  ['GlyGen', DatabaseCategory.PTM],
  ['iPTMnet', DatabaseCategory.PTM],
  ['PhosphoSitePlus', DatabaseCategory.PTM],
  ['SwissPalm', DatabaseCategory.PTM],
  ['UniCarbKB', DatabaseCategory.PTM],
  ['MetOSite', DatabaseCategory.PTM],
  ['BioMuta', DatabaseCategory.GENETIC_VARIATION],
  ['DMDM', DatabaseCategory.GENETIC_VARIATION],
  ['dbSNP', DatabaseCategory.GENETIC_VARIATION],
  ['COMPLUYEAST-2DPAGE', DatabaseCategory.GEL],
  ['DOSAC-COBS-2DPAGE', DatabaseCategory.GEL],
  ['OGP', DatabaseCategory.GEL],
  ['REPRODUCTION-2DPAGE', DatabaseCategory.GEL],
  ['SWISS-2DPAGE', DatabaseCategory.GEL],
  ['UCD-2DPAGE', DatabaseCategory.GEL],
  ['World-2DPAGE', DatabaseCategory.GEL],
  ['CPTAC', DatabaseCategory.PROTEOMIC],
  ['EPD', DatabaseCategory.PROTEOMIC],
  ['MaxQB', DatabaseCategory.PROTEOMIC],
  ['PaxDb', DatabaseCategory.PROTEOMIC],
  ['PeptideAtlas', DatabaseCategory.PROTEOMIC],
  ['PRIDE', DatabaseCategory.PROTEOMIC],
  ['ProMEX', DatabaseCategory.PROTEOMIC],
  ['ProteomicsDB', DatabaseCategory.PROTEOMIC],
  ['TopDownProteomics', DatabaseCategory.PROTEOMIC],
  ['jPOST', DatabaseCategory.PROTEOMIC],
  ['MassIVE', DatabaseCategory.PROTEOMIC],
  ['DNASU', DatabaseCategory.PROTOCOL],
  ['Ensembl', DatabaseCategory.GENOME],
  ['EnsemblBacteria', DatabaseCategory.GENOME],
  ['EnsemblFungi', DatabaseCategory.GENOME],
  ['EnsemblMetazoa', DatabaseCategory.GENOME],
  ['EnsemblPlants', DatabaseCategory.GENOME],
  ['EnsemblProtists', DatabaseCategory.GENOME],
  ['GeneDB', DatabaseCategory.GENOME],
  ['GeneID', DatabaseCategory.GENOME],
  ['Gramene', DatabaseCategory.GENOME],
  ['KEGG', DatabaseCategory.GENOME],
  ['PATRIC', DatabaseCategory.GENOME],
  ['UCSC', DatabaseCategory.GENOME],
  ['VectorBase', DatabaseCategory.GENOME],
  ['WBParaSite', DatabaseCategory.GENOME],
  ['ArachnoServer', DatabaseCategory.ORGANISM],
  ['Araport', DatabaseCategory.ORGANISM],
  ['CGD', DatabaseCategory.ORGANISM],
  ['ConoServer', DatabaseCategory.ORGANISM],
  ['CTD', DatabaseCategory.ORGANISM],
  ['dictyBase', DatabaseCategory.ORGANISM],
  ['DisGeNET', DatabaseCategory.ORGANISM],
  ['EchoBASE', DatabaseCategory.ORGANISM],
  ['euHCVdb', DatabaseCategory.ORGANISM],
  ['VEuPathDB', DatabaseCategory.ORGANISM],
  ['FlyBase', DatabaseCategory.ORGANISM],
  ['GeneCards', DatabaseCategory.ORGANISM],
  ['GeneReviews', DatabaseCategory.ORGANISM],
  ['HGNC', DatabaseCategory.ORGANISM],
  ['GenAtlas', DatabaseCategory.ORGANISM],
  ['HPA', DatabaseCategory.ORGANISM],
  ['LegioList', DatabaseCategory.ORGANISM],
  ['Leproma', DatabaseCategory.ORGANISM],
  ['MaizeGDB', DatabaseCategory.ORGANISM],
  ['MalaCards', DatabaseCategory.ORGANISM],
  ['MGI', DatabaseCategory.ORGANISM],
  ['MIM', DatabaseCategory.ORGANISM],
  ['NIAGADS', DatabaseCategory.ORGANISM],
  ['neXtProt', DatabaseCategory.ORGANISM],
  ['OpenTargets', DatabaseCategory.ORGANISM],
  ['Orphanet', DatabaseCategory.ORGANISM],
  ['PharmGKB', DatabaseCategory.ORGANISM],
  ['PomBase', DatabaseCategory.ORGANISM],
  ['PseudoCAP', DatabaseCategory.ORGANISM],
  ['RGD', DatabaseCategory.ORGANISM],
  ['SGD', DatabaseCategory.ORGANISM],
  ['TAIR', DatabaseCategory.ORGANISM],
  ['TubercuList', DatabaseCategory.ORGANISM],
  ['VGNC', DatabaseCategory.ORGANISM],
  ['WormBase', DatabaseCategory.ORGANISM],
  ['Xenbase', DatabaseCategory.ORGANISM],
  ['ZFIN', DatabaseCategory.ORGANISM],
  ['HUGE', DatabaseCategory.ORGANISM],
  ['Rouge', DatabaseCategory.ORGANISM],
  ['eggNOG', DatabaseCategory.PHYLOGENOMIC],
  ['GeneTree', DatabaseCategory.PHYLOGENOMIC],
  ['HOGENOM', DatabaseCategory.PHYLOGENOMIC],
  ['InParanoid', DatabaseCategory.PHYLOGENOMIC],
  ['KO', DatabaseCategory.PHYLOGENOMIC],
  ['OMA', DatabaseCategory.PHYLOGENOMIC],
  ['OrthoDB', DatabaseCategory.PHYLOGENOMIC],
  ['PhylomeDB', DatabaseCategory.PHYLOGENOMIC],
  ['TreeFam', DatabaseCategory.PHYLOGENOMIC],
  ['BioCyc', DatabaseCategory.PATHWAY],
  ['BRENDA', DatabaseCategory.PATHWAY],
  ['Reactome', DatabaseCategory.PATHWAY],
  ['SABIO-RK', DatabaseCategory.PATHWAY],
  ['SignaLink', DatabaseCategory.PATHWAY],
  ['SIGNOR', DatabaseCategory.PATHWAY],
  ['UniPathway', DatabaseCategory.PATHWAY],
  ['PlantReactome', DatabaseCategory.PATHWAY],
  ['ENZYME', DatabaseCategory.PATHWAY],
  ['ChiTaRS', DatabaseCategory.MISCELLANEOUS],
  ['EvolutionaryTrace', DatabaseCategory.MISCELLANEOUS],
  ['GeneWiki', DatabaseCategory.MISCELLANEOUS],
  ['GenomeRNAi', DatabaseCategory.MISCELLANEOUS],
  ['PHI-base', DatabaseCategory.MISCELLANEOUS],
  ['PRO', DatabaseCategory.MISCELLANEOUS],
  ['SOURCE_MIM', DatabaseCategory.MISCELLANEOUS],
  ['SOURCE_MGI', DatabaseCategory.MISCELLANEOUS],
  ['Bgee', DatabaseCategory.EXPRESSION],
  ['CleanEx', DatabaseCategory.EXPRESSION],
  ['CollecTF', DatabaseCategory.EXPRESSION],
  ['ExpressionAtlas', DatabaseCategory.EXPRESSION],
  ['Genevisible', DatabaseCategory.EXPRESSION],
  ['CDD', DatabaseCategory.DOMAIN],
  ['Gene3D', DatabaseCategory.DOMAIN],
  ['HAMAP', DatabaseCategory.DOMAIN],
  ['IDEAL', DatabaseCategory.DOMAIN],
  ['InterPro', DatabaseCategory.DOMAIN],
  ['PANTHER', DatabaseCategory.DOMAIN],
  ['Pfam', DatabaseCategory.DOMAIN],
  ['PIRSF', DatabaseCategory.DOMAIN],
  ['PRINTS', DatabaseCategory.DOMAIN],
  ['ProDom', DatabaseCategory.DOMAIN],
  ['SFLD', DatabaseCategory.DOMAIN],
  ['SMART', DatabaseCategory.DOMAIN],
  ['SUPFAM', DatabaseCategory.DOMAIN],
  ['TIGRFAMs', DatabaseCategory.DOMAIN],
  ['PROSITE', DatabaseCategory.DOMAIN],
  ['DisProt', DatabaseCategory.DOMAIN],
  ['MobiDB', DatabaseCategory.DOMAIN],
  ['ProtoNet', DatabaseCategory.DOMAIN],
  ['GO', DatabaseCategory.GENE_ONTOLOGY],
  ['Proteomes', DatabaseCategory.PROTEOMES],
  ['PathwayCommons', DatabaseCategory.PATHWAY],
  ['Pharos', DatabaseCategory.MISCELLANEOUS],
  ['DrugCentral', DatabaseCategory.CHEMISTRY],
  ['ABCD', DatabaseCategory.PROTOCOL],
  ['Antibodypedia', DatabaseCategory.PROTOCOL],
  ['CPTC', DatabaseCategory.PROTOCOL],
  ['RNAct', DatabaseCategory.MISCELLANEOUS],
  ['BioGRID-ORCS', DatabaseCategory.MISCELLANEOUS],
]);

export default databaseNameToCategory;
