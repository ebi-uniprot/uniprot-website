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

export type FlatGenomicEntry = Omit<GenomicEntry, 'gnCoordinate'> & {
  gnCoordinate: GenomicCoordinate;
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

export type ExonMap = {
  proteinLocation: LocationWithStartEnd | LocationWithSinglePosition; // Swagger says optional, but apparently not
  genomeLocation: LocationWithStartEnd | LocationWithSinglePosition; // Swagger says optional, but apparently not
  id?: string;
};

// From Swagger
// type Location = {
//   begin?: Position;
//   end?: Position;
//   position?: Position;
//   sequence?: string;
// };
// It's either begin and end defined, or just position if only 1 amino acid...
// But that's only for proteins, for genome location it's always begin/end...
// Let's rewrite it below

interface BasicLocation {
  sequence?: string;
}
interface LocationWithStartEnd extends BasicLocation {
  begin: Position;
  end: Position;
  position?: never;
}
interface LocationWithSinglePosition extends BasicLocation {
  begin?: never;
  end?: never;
  position: Position;
}

type Position = {
  position: number; // Swagger says optional, but apparently not
  status?: string;
  evidence?: number[];
};
