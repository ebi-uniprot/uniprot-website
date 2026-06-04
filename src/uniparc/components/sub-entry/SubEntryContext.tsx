import cn from 'classnames';
import {
  InfoList,
  InformationIcon,
  Message,
  SuccessIcon,
} from 'franklin-sites';
import { generatePath, Link, Redirect } from 'react-router-dom';

import {
  getEntryPath,
  Location,
  LocationToPath,
} from '../../../app/config/urls';
import { Namespace } from '../../../shared/types/namespaces';
import { pickArticle } from '../../../shared/utils/utils';
import {
  type DeletedReason,
  type InactiveEntryReason,
} from '../../../uniprotkb/adapters/uniProtkbConverter';
import { TabLocation as UniprotkbTabLocation } from '../../../uniprotkb/types/entry';
import type { UniParcSubEntryUIModel } from '../../adapters/uniParcSubEntryConverter';
import styles from './styles/sub-entry-context.module.css';

const iconSize = '1.125em';

interface SubEntryContextProps {
  uniparcId: string;
  subEntry: UniParcSubEntryUIModel['subEntry'];
  // Whether the cross-referenced UniProtKB entry is currently active. Derived
  // from the entry's authoritative `entryType` (not the UniParc xref `active`
  // flag, which can lag behind UniProtKB).
  isUniProtKBActive: boolean;
  // Whether the UniProtKB accession was merged or demerged. Detected from the
  // unisave `merged` events upstream — see `SubEntry`.
  isUniProtKBMergedOrDemerged: boolean;
  uniProtKBInactiveReason?: InactiveEntryReason;
  canLoadAnnotations: boolean;
  annotationsLoading: boolean;
  hasAnnotations: boolean;
}

const getDeletedReasonText = (reason?: DeletedReason) => {
  switch (reason) {
    case 'Redundant proteome':
    case 'Excluded proteome':
      return `belongs to ${pickArticle(reason)}`;
    case 'Over-represented sequence':
    case 'Redundant sequence':
      return `is ${pickArticle(reason)}`;
    default:
      return 'is';
  }
};

const SubEntryContext = ({
  uniparcId,
  subEntry,
  isUniProtKBActive,
  isUniProtKBMergedOrDemerged,
  uniProtKBInactiveReason,
  canLoadAnnotations,
  annotationsLoading,
  hasAnnotations,
}: SubEntryContextProps) => {
  const { id: subEntryId, isUniprotkbEntry, active } = subEntry;

  if (!subEntryId) {
    return null;
  }

  // Redirect to UniParc entry if is an inactive external xref
  if (!isUniprotkbEntry && !active) {
    return (
      <Redirect
        to={{
          pathname: generatePath(LocationToPath[Location.UniParcEntry], {
            accession: uniparcId,
          }),
        }}
      />
    );
  }

  let contextInfo;

  const annotationStatus = canLoadAnnotations && (
    <div className={styles['annotation-status']}>
      {annotationsLoading ? (
        'Loading annotations'
      ) : hasAnnotations ? (
        <>
          <SuccessIcon
            className={cn(styles.icon, styles.success)}
            width={iconSize}
            height={iconSize}
          />
          Annotations loaded
        </>
      ) : (
        <>
          <InformationIcon
            className={cn(styles.icon, styles.info)}
            width={iconSize}
            height={iconSize}
          />
          No annotations available
        </>
      )}
    </div>
  );

  if (isUniprotkbEntry) {
    // Merged/demerged entries have meaningful UniProtKB history (the entries they
    // became), so send the user straight to the history tab. Checked before the
    // active case because a merged accession's entry lookup resolves to its
    // (active) merged-into entry.
    if (isUniProtKBMergedOrDemerged) {
      return (
        <Redirect
          to={{
            pathname: getEntryPath(
              Namespace.uniprotkb,
              subEntryId,
              UniprotkbTabLocation.History
            ),
          }}
        />
      );
    }

    // Active UniProtKB entries have a full UniProtKB page — send the user there.
    if (isUniProtKBActive) {
      return (
        <Redirect
          to={{
            pathname: generatePath(LocationToPath[Location.UniProtKBEntry], {
              accession: subEntryId,
            }),
          }}
        />
      );
    }

    const { deletedReason } = uniProtKBInactiveReason ?? {};

    // Deleted: redirecting to the UniProtKB entry page would just bounce straight
    // back here (it redirects obsolete entries to UniParc), so stay and explain
    // why, linking to the UniProtKB history.
    contextInfo = (
      <InfoList
        infoData={[
          {
            title: 'Status',
            content: (
              <div>
                Removed from UniProtKB because {subEntryId}{' '}
                {getDeletedReasonText(deletedReason)}{' '}
                <strong data-article-id="deleted_accessions">
                  {deletedReason?.toLocaleLowerCase() || 'deleted'}
                </strong>
                .{annotationStatus}
              </div>
            ),
          },
          {
            title: (
              <div>
                Available <br /> actions
              </div>
            ),
            content: (
              <div>
                <Link
                  to={{
                    pathname: getEntryPath(
                      Namespace.uniprotkb,
                      subEntryId,
                      UniprotkbTabLocation.History
                    ),
                  }}
                >
                  View history
                </Link>{' '}
                in UniProtKB
              </div>
            ),
          },
        ]}
      />
    );
  } else {
    contextInfo = (
      <InfoList
        infoData={[
          {
            title: 'Status',
            content: (
              <div>
                This is an active {subEntry.database} entry.{annotationStatus}
              </div>
            ),
          },
        ]}
      />
    );
  }

  return contextInfo && <Message level="info">{contextInfo}</Message>;
};

export default SubEntryContext;
