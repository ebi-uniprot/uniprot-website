export type UniSaveVersion = {
  accession: string;
  database: 'Swiss-Prot' | 'TrEMBL';
  entryVersion: number;
  firstRelease: string; // release version
  firstReleaseDate: string; // DD-MMM-YYYY
  lastRelease: string; // release version
  lastReleaseDate: string; // DD-MMM-YYYY
  name: string;
  sequenceVersion: number;
  content?: string;
};

export type UniSaveAccession = {
  results: UniSaveVersion[];
};

export type UniSaveEventType = 'replacing' | 'merged' | 'deleted';

export type UniSaveEvent = {
  targetAccession: string;
  eventType: UniSaveEventType;
  release: string;
};

export type UniSaveStatus = {
  accession: string;
  events?: UniSaveEvent[];
};

export type DiffEntry = {
  content: string;
  entryVersion: number;
};

export type UniSaveDiff = {
  accession: string;
  diffInfo: {
    diff: string;
    entry1: DiffEntry;
    entry2: DiffEntry;
  };
};
