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
import { type DeletedReason } from '../../../uniprotkb/adapters/uniProtkbConverter';
import { TabLocation as UniprotkbTabLocation } from '../../../uniprotkb/types/entry';
import { type UniSaveStatus } from '../../../uniprotkb/types/uniSave';
import type { UniParcSubEntryUIModel } from '../../adapters/uniParcSubEntryConverter';
import styles from './styles/sub-entry-context.module.css';

const iconSize = '1.125em';

interface SubEntryContextProps {
  uniparcId: string;
  subEntry: UniParcSubEntryUIModel['subEntry'];
  data?: UniSaveStatus;
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
  data,
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

  const events = data?.events?.filter((event) => event.eventType === 'deleted');

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
    if (!events || events.length === 0) {
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

    contextInfo = events.map((event) => {
      const infoData = [
        {
          title: 'Status',
          content: (
            <div>
              Removed from UniProtKB because {subEntryId}{' '}
              {getDeletedReasonText(event.deletedReason)}{' '}
              <strong data-article-id="deleted_accessions">
                {event.deletedReason?.toLocaleLowerCase() || 'deleted'}
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
      ];

      return (
        <InfoList
          key={`${event.eventType}-${subEntryId}`}
          infoData={infoData}
        />
      );
    });
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
