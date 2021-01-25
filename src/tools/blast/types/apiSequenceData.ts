type Name = {
  value: string;
};

type ProteinName = {
  fullName: Name;
  shortNames?: Name[];
};

export enum ProteinExistence {
  ProteinLevel = '1. Experimental evidence at protein level',
  TranscriptLevel = '2. Experimental evidence at transcript level',
  Inferred = '3. Protein inferred from homology',
  Predicted = '4. Protein predicted',
  Uncertain = '5. Protein uncertain',
}

export type APISequenceData = {
  entryType: string;
  primaryAccession: string;
  uniProtkbId: string;
  entryAudit: {
    sequenceVersion: number;
  };
  organism: {
    scientificName: string;
    commonName: string;
    taxonId: number;
    lineage: string[];
  };
  proteinExistence: ProteinExistence;
  proteinDescription: {
    recommendedName: ProteinName;
    alternativeNames: ProteinName[];
  };
  genes: {
    geneName: Name;
    synonyms: Name[];
  }[];
  sequence: {
    value: string;
    length: number;
    molWeight: number;
    crc64: string;
    md5: string;
  };
};
