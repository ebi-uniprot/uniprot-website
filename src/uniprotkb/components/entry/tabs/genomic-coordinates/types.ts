export type GenomicEntry = {
  accession: string;
  name: string;
  taxid: number; // Swagger says optional, but apparently not
  sequence: string;
  /**
   * @deprecated shouldn't use this from this endpoint
   */
  protein: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  /**
   * @deprecated shouldn't use this from this endpoint
   */
  gene?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  gnCoordinate?: Array<GenomicCoordinate>;
};

export type GenomicCoordinate = {
  genomicLocation: GenomicLocation;
  /**
   * @deprecated shouldn't use this from this endpoint
   */
  feature?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  // Sometimes not from Ensembl
  ensemblGeneId?: string;
  // Sometimes not from Ensembl
  ensemblTranscriptId?: string;
  // Sometimes not from Ensembl
  ensemblTranslationId?: string;
};

export type GenomicLocation = {
  exon: Array<ExonMap>;
  chromosome?: string;
  start: number; // Swagger says optional, but apparently not
  end: number; // Swagger says optional, but apparently not
  reverseStrand?: boolean;
};

type ExonMap = {
  proteinLocation: Location; // Swagger says optional, but apparently not
  genomeLocation: Location; // Swagger says optional, but apparently not
  id?: string;
};

type Location = {
  begin: Position; // Swagger says optional, but apparently not
  end: Position; // Swagger says optional, but apparently not
  position?: Position; // ?
  sequence?: string;
};

type Position = {
  position: number; // Swagger says optional, but apparently not
  status?: string;
  evidence?: number[];
};
