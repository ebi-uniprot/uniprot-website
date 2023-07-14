export type GenomicEntry = {
  accession: string;
  name: string;
  taxid?: number;
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
  ensemblGeneId?: string;
  ensemblTranscriptId?: string;
  ensemblTranslationId?: string;
};

type GenomicLocation = {
  exon: Array<ExonMap>;
  chromosome?: string;
  start?: number;
  end?: number;
  reverseStrand?: boolean;
};

type ExonMap = {
  proteinLocation?: Location;
  genomeLocation?: Location;
  id?: string;
};

type Location = {
  begin?: Position;
  end?: Position;
  position?: Position;
  sequence?: string;
};

type Position = {
  position?: number;
  status?: string;
  evidence?: number[];
};
