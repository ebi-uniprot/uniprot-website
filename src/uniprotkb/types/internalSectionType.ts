export type InternalSectionType = {
  internalLines: {
    value: string;
    type: string;
  }[];
  evidenceLines: {
    evidence: string;
    createDate: string;
    curator: string;
  }[];
  sourceLines: { value: string }[];
};
