type Name = {
  value: string;
};

type ProteinName = {
  fullName: Name;
  shortNames?: Name[];
};

export type APISequenceData = {
  entryType:
    | 'UniProtKB reviewed (Swiss-Prot)'
    | 'UniProtKB unreviewed (TrEMBL)';
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
  proteinExistence: string;
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
