const prefix = '//wwwdev.ebi.ac.uk/uniprot/api';

export default {
  // uniprotkb advanced search terms
  advanced_search_terms: `${prefix}/configure/uniprotkb/search_terms`,
  // Annotation evidence used by advanced search
  annotation_evidences: `${prefix}/configure/uniprotkb/annotation_evidences`,
  // Go evidences used by advanced go search
  // "itemType": "goterm",
  go_evidences: `${prefix}/configure/uniprotkb/go_evidences`,
  // Database cross references used by advanced search
  database_xefs: `${prefix}/configure/uniprotkb/databases`,
  // Database cross reference fields in result column configure
  // "itemType": "database",
  database_fields: `${prefix}/configure/uniprotkb/databasefields`,
  // All result fields except database cross reference fields
  results_fields: `${prefix}/configure/uniprotkb/resultfields`,
  // UniProtKB search
  uniprot_kb_search: `${prefix}/uniprotkb/search`,
};
