export type UniSaveVersion = {
  accession: string;
  database: string; // 'Swiss-Prot' | 'TrEMBL';
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

export type UniSaveEventType = 'replacing';

export type UniSaveEvent = {
  targetAccession: string;
  eventType: UniSaveEventType;
  release: string;
};

export type UniSaveStatus = {
  accession: string;
  events: UniSaveEvent[];
};
