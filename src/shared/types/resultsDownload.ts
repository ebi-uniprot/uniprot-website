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
}

export enum FileFormat {
  fasta = 'FASTA',
  fastaCanonical = 'FASTA (canonical)',
  fastaCanonicalIsoform = 'FASTA (canonical & isoform)',
  fastaRepresentative = 'FASTA (representative)',
  fastaSubsequence = 'FASTA (subsequence)',
  tsv = 'TSV',
  excel = 'Excel',
  xml = 'XML',
  rdfXml = 'RDF/XML',
  text = 'Text',
  gff = 'GFF',
  list = 'List',
  json = 'JSON',
  obo = 'OBO',
}
