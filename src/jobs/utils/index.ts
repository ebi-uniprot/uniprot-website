// Truncate label: Homo sapiens (Man/Human/HUMAN) [9606] --> Homo sapiens [9606]
export const truncateTaxonLabel = (label: string) =>
  label.replace(/ *\([^)]*\) */g, ' ');
