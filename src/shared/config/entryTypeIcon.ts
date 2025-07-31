export enum EntryType {
  REVIEWED,
  UNREVIEWED,
  INACTIVE,
  UNIPARC,
  REFERENCE_PROTEOME,
  COMMUNITY_CURATED,
}

export const getEntryTypeFromString = (entryTypeString?: string) => {
  if (!entryTypeString) {
    return undefined;
  }
  if (entryTypeString.match(/Inactive/gi)) {
    return EntryType.INACTIVE;
  }
  if (entryTypeString.match(/UniParc/i)) {
    return EntryType.UNIPARC;
  }
  if (entryTypeString.match(/TrEMBL|unreviewed|^tr\|$|^tr$/gi)) {
    return EntryType.UNREVIEWED;
  }
  if (entryTypeString.match(/Swiss-Prot|reviewed|^sp\|$|^sp$/gi)) {
    return EntryType.REVIEWED;
  }
  if (entryTypeString.match(/ORCID$/gi)) {
    return EntryType.COMMUNITY_CURATED;
  }
  if (entryTypeString.match(/Reference|Representative/gi)) {
    return EntryType.REFERENCE_PROTEOME;
  }
  return undefined;
};
