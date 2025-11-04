import {
  Button,
  InfoList,
  InformationIcon,
  Message,
  SuccessIcon,
} from 'franklin-sites';
import { Link } from 'react-router-dom';

import { getEntryPath } from '../../../app/config/urls';
import { Namespace } from '../../../shared/types/namespaces';
import { TabLocation as UniprotkbTabLocation } from '../../../uniprotkb/types/entry';
import { UniSaveStatus } from '../../../uniprotkb/types/uniSave';
import { UniFireModel } from '../../adapters/uniParcSubEntryConverter';
import styles from './styles/sub-entry-context.module.scss';

const iconSize = '1.125em';

interface SubEntryContextProps {
  subEntryId: string;
  data: UniSaveStatus;
  uniFireData?: UniFireModel;
  runUniFire: boolean;
  setRunUniFire: React.Dispatch<React.SetStateAction<boolean>>;
}

const SubEntryContect = ({
  subEntryId,
  data,
  uniFireData,
  runUniFire,
  setRunUniFire,
}: SubEntryContextProps) => {
  if (!data?.events) {
    return null;
  }

  let events = data.events;

  if (events.length > 1 && events[0].eventType === 'merged') {
    const demergedEntries = events.map((event) => event.targetAccession);
    events = [{ ...events[0], targetAccession: demergedEntries.join(', ') }];
  }

  if (events.length > 1 && events[0].eventType === 'replacing') {
    const replacedEntries = events.map((event) => event.targetAccession);
    events = [{ ...events[0], targetAccession: replacedEntries.join(', ') }];
  }

  const contextInfo = events.map((event) => {
    const presentInUniprotkb =
      event.eventType === 'merged' || event.eventType === 'replacing';

    const infoData = [
      {
        title: 'Status',
        content: (
          <>
            <div className={styles['availability-content']}>
              <label
                className={
                  presentInUniprotkb
                    ? ''
                    : styles['availability-label-disabled']
                }
              >
                <input
                  type="checkbox"
                  checked={presentInUniprotkb}
                  readOnly
                  disabled={!presentInUniprotkb}
                />
                <span data-article-id="uniprotkb">UniProtKB</span>
              </label>
              <br />
              {event.eventType === 'deleted' && (
                <>
                  Removed from UniProtKB because {subEntryId} is{' '}
                  <strong data-article-id="deleted_accessions">
                    {event.deletedReason?.toLocaleLowerCase() || 'deleted'}
                  </strong>
                </>
              )}
              {(event.eventType === 'merged' ||
                event.eventType === 'replacing') && (
                <>
                  {subEntryId} is{' '}
                  {event.eventType === 'merged' &&
                    (event.targetAccession.split(', ').length > 1
                      ? 'demerged into '
                      : 'merged into ')}
                  {event.eventType === 'replacing' && 'replaced by '}
                  {event.targetAccession
                    .split(', ')
                    .map((targetAccession, index, array) => (
                      <span key={targetAccession}>
                        <Link
                          to={getEntryPath(
                            Namespace.uniprotkb,
                            targetAccession
                          )}
                        >
                          {targetAccession}
                        </Link>
                        {index < array.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                </>
              )}
            </div>
            <div className={styles['availability-content']}>
              <label>
                <input type="checkbox" checked readOnly />
                <span data-article-id="uniparc">UniParc</span>
              </label>
              <br />
              Current location, UniProt’s sequence archive
            </div>
          </>
        ),
      },
      {
        title: (
          <div>
            Available <br /> actions
          </div>
        ),
        content: event.eventType === 'deleted' && (
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
      {
        title: ' ',
        content: event.eventType === 'deleted' && (
          <div>
            <span>Generate additional annotations:</span>
            <br />
            As {subEntryId} is no longer in UniProtKB, its annotations have been
            removed. However, annotations may be generated on demand using
            automatic annotation rules.
            {!runUniFire && (
              <div className={styles['predictions-status']}>
                <Button
                  variant="primary"
                  onClick={() => setRunUniFire(true)}
                  className={styles['run-unifire-button']}
                  disabled={runUniFire}
                >
                  Generate annotations
                </Button>
              </div>
            )}
            {runUniFire && !uniFireData?.accession && (
              <div className={styles['predictions-status']}>
                <InformationIcon
                  className={styles['info-icon']}
                  width={iconSize}
                  height={iconSize}
                />
                No predictions generated
              </div>
            )}
            {runUniFire && uniFireData?.accession && (
              <div className={styles['predictions-status']}>
                <SuccessIcon
                  className={styles['success-icon']}
                  width={iconSize}
                  height={iconSize}
                />
                Predictions generated
              </div>
            )}
          </div>
        ),
      },
    ];

    return (
      <InfoList key={`${event.eventType}-${subEntryId}`} infoData={infoData} />
    );
  });

  return (
    contextInfo && (
      <Message level="info">
        <h4>
          Attention: You are currently viewing {subEntryId} within UniParc
        </h4>
        {contextInfo}
      </Message>
    )
  );
};

export default SubEntryContect;
