import {
  SwissProtIcon,
  TremblIcon,
  UniParcIcon,
  ReferenceProteomeIcon,
  RedundantProteomeIcon,
  ObsoleteIcon,
  CommunityAnnotationIcon,
  ComputerMappedIcon,
} from 'franklin-sites';

import './styles/entry-type-icon.scss';

export enum EntryType {
  REVIEWED,
  UNREVIEWED,
  INACTIVE,
  UNIPARC,
  REFERENCE_PROTEOME,
  REDUNDANT_PROTEOME,
  EXCLUDED_PROTEOME,
  OTHER_PROTEOME,
  COMMUNITY_ANNOTATION,
  COMPUTATIONAL_ANNOTATION,
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
  if (entryTypeString.match(/ORCID$|community/gi)) {
    return EntryType.COMMUNITY_ANNOTATION;
  }
  if (entryTypeString.match(/Reference|Representative/gi)) {
    return EntryType.REFERENCE_PROTEOME;
  }
  if (entryTypeString.match(/Redundant/gi)) {
    return EntryType.REDUNDANT_PROTEOME;
  }
  if (entryTypeString.match(/Excluded/gi)) {
    return EntryType.EXCLUDED_PROTEOME;
  }
  if (entryTypeString.match(/Other\sproteome/gi)) {
    return EntryType.OTHER_PROTEOME;
  }
  if (entryTypeString.match(/Computational/gi)) {
    return EntryType.COMPUTATIONAL_ANNOTATION;
  }

  return undefined;
};

type EntryTypeIconProps = {
  entryType?: EntryType | string;
  entryAccession?: string;
  entryId?: string;
  title?: string;
};

export const EntryTypeIcon = ({
  entryType,
  entryAccession,
  entryId,
  title,
}: EntryTypeIconProps) => {
  let entryTypeToCheck = entryType;
  if (typeof entryType === 'string') {
    entryTypeToCheck = getEntryTypeFromString(entryType);
  }
  if (!entryTypeToCheck && entryAccession && entryId) {
    entryTypeToCheck = entryId.startsWith(`${entryAccession}_`)
      ? EntryType.UNREVIEWED
      : EntryType.REVIEWED;
  }

  if (entryTypeToCheck === EntryType.REVIEWED) {
    return (
      <span
        className="entry-title__status icon--reviewed"
        title={title || 'This marks a reviewed UniProtKB entry'}
      >
        <SwissProtIcon />
      </span>
    );
  }
  if (entryTypeToCheck === EntryType.UNREVIEWED) {
    return (
      <span
        className="entry-title__status icon--unreviewed"
        title={title || 'This marks an unreviewed UniProtKB entry'}
      >
        <TremblIcon />
      </span>
    );
  }
  if (entryTypeToCheck === EntryType.UNIPARC) {
    return (
      <span
        className="entry-title__status icon--uniparc"
        title={title || 'This marks a UniParc entry'}
      >
        <UniParcIcon />
      </span>
    );
  }
  if (entryTypeToCheck === EntryType.REFERENCE_PROTEOME) {
    return (
      <span
        className="entry-title__status icon--reference-proteome"
        title={title || 'This marks a reference Proteome entry'}
      >
        <ReferenceProteomeIcon />
      </span>
    );
  }
  if (entryTypeToCheck === EntryType.REDUNDANT_PROTEOME) {
    return (
      <span
        className="entry-title__status icon--redundant-excluded-proteome"
        title={title || 'This marks a redundant Proteome entry'}
      >
        <RedundantProteomeIcon />
      </span>
    );
  }
  if (entryTypeToCheck === EntryType.EXCLUDED_PROTEOME) {
    return (
      <span
        className="entry-title__status icon--redundant-excluded-proteome"
        title={title || 'This marks an excluded Proteome entry'}
      >
        <ObsoleteIcon />
      </span>
    );
  }
  if (entryTypeToCheck === EntryType.COMMUNITY_ANNOTATION) {
    return (
      <span
        className="entry-title__status icon--community-annotation"
        title={title || 'Community annotation'}
      >
        <CommunityAnnotationIcon />
      </span>
    );
  }
  if (entryTypeToCheck === EntryType.COMPUTATIONAL_ANNOTATION) {
    return (
      <span
        className="entry-title__status icon--computational-annotation"
        title={title || 'Computational annotation'}
      >
        <ComputerMappedIcon />
      </span>
    );
  }
  return null;
};

export default EntryTypeIcon;
