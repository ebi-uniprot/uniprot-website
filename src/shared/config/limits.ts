// NOTE: update as needed if backend limitations change!

// Downloads
export const DOWNLOAD_SIZE_LIMIT = 10_000_000 as const;
export const DOWNLOAD_SIZE_LIMIT_ID_MAPPING_ENRICHED = 100_000 as const;
export const DOWNLOAD_SIZE_LIMIT_EMBEDDINGS = 1_000_000 as const;

// Tools
export const ALIGN_LIMIT = 50;
export const BLAST_LIMIT = 5;
export const ID_MAPPING_LIMIT = 100_000;
export const MAX_PEPTIDE_FACETS_OR_DOWNLOAD = 1_000;
// just because, no actual known limit
export const PEPTIDE_SEARCH_SEQ_MINIMUM_LENGTH = 7;
export const PEPTIDE_SEARCH_SEQUENCES_COUNT = 100;

// Feature viewer and variation viewer
export const VARIANT_COUNT_LIMIT = 2_000;
