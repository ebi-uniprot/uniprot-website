export enum ContentType {
  fasta = 'text/plain; format=fasta',
  tsv = 'text/plain; format=tsv',
  excel = 'application/vnd.ms-excel',
  xml = 'application/xml',
  rdfXml = 'application/rdf+xml',
  text = 'text/plain; format=flatfile',
  gff = 'text/plain; format=gff',
  list = 'text/plain; format=list',
  json = 'application/json',
  obo = 'text/plain; format=obo',
  embeddings = 'application/x-hdf5',
  peff = 'text/x-peff',
  pdb = 'chemical/x-pdb',
  mmCIF = 'chemical/x-mmcif',
  binaryCIF = 'application/octet-stream; charset=binary',
  csv = 'text/csv',
}

export enum FileFormat {
  fasta = 'FASTA',
  fastaCanonical = 'FASTA (canonical)',
  fastaCanonicalIsoform = 'FASTA (canonical & isoform)',
  fastaRepresentative = 'FASTA (representative)',
  fastaSubsequence = 'FASTA (subsequence)',
  tsv = 'TSV',
  tsvIdMappingFromTo = 'TSV (from/to only)',
  excel = 'Excel',
  excelIdMappingFromTo = 'Excel (from/to only)',
  xml = 'XML',
  rdfXml = 'RDF/XML',
  text = 'Text',
  gff = 'GFF',
  list = 'List',
  json = 'JSON',
  jsonIdMappingFromTo = 'JSON (from/to only)',
  obo = 'OBO',
  embeddings = 'Embeddings',
  peff = 'PEFF',
  pdb = 'PDB', // AlphaFold coordinates
  mmCIF = 'mmCIF', // AlphaFold coordinates
  binaryCif = 'BinaryCIF', // AlphaFold coordinates
  csv = 'CSV', // AlphaMissense annotations
}
