export const nameToQueryKingdoms = new Map<string, string>([
  ['Archaea', '(taxonomy_id:2157)'],
  ['Eukaryota', '(taxonomy_id:2759)'],
  ['Viruses', '(taxonomy_id:10239)'],
  ['Bacteria', '(taxonomy_id:2)'],
  ['Other', '((taxonomy_id:2787854) OR (taxonomy_id:2787823))'],
]);

export const nameToQueryEukaryota = new Map<string, string>([
  ['Fungi', '(taxonomy_id:4751)'],
  ['Insecta', '(taxonomy_id:50557)'],
  ['Other Mammalia', '(taxonomy_id:)'], // TODO
  ['Homo', '(taxonomy_id:9605)'],
  ['Nematoda', '(taxonomy_id:6231)'],
  ['Viridiplantae', '(taxonomy_id:33090)'],
  ['Other', '(taxonomy_id:)'], // TODO
  ['Other Vertebrata', '(taxonomy_id:)'], // TODO
]);
