import { FC } from 'react';
import {
  SwissProtIcon,
  TremblIcon,
  UniParcIcon,
  ReferenceProteomeIcon,
  CommunityAnnotationIcon,
} from 'franklin-sites';

import {
  EntryType,
  getEntryTypeFromString,
} from '../../../uniprotkb/adapters/uniProtkbConverter';

import './styles/entry-type-icon.scss';

export const EntryTypeIcon: FC<{
  entryType?: EntryType | string;
  entryAccession?: string;
  entryId?: string;
  title?: string;
}> = ({ entryType, entryAccession, entryId, title }) => {
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
  if (entryTypeToCheck === EntryType.ORCID) {
    return (
      <span
        className="entry-title__status icon--community-annotation"
        title={title || 'Community annotation'}
      >
        <CommunityAnnotationIcon />
      </span>
    );
  }
  return null;
};

export default EntryTypeIcon;
