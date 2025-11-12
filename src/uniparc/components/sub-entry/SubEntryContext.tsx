import {
  Button,
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
import { DeletedReason } from '../../../uniprotkb/adapters/uniProtkbConverter';
import { TabLocation as UniprotkbTabLocation } from '../../../uniprotkb/types/entry';
import { UniSaveStatus } from '../../../uniprotkb/types/uniSave';
import { UniFireModel } from '../../adapters/uniParcSubEntryConverter';
import styles from './styles/sub-entry-context.module.scss';

const iconSize = '1.125em';

interface SubEntryContextProps {
  subEntryId: string;
  data: UniSaveStatus;
  showUniFireOption: boolean;
  uniFireData?: UniFireModel;
  uniFireLoading?: boolean;
  runUniFire: boolean;
  setRunUniFire: React.Dispatch<React.SetStateAction<boolean>>;
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
  subEntryId,
  data,
  showUniFireOption,
  uniFireData,
  uniFireLoading,
  runUniFire,
  setRunUniFire,
}: SubEntryContextProps) => {
  if (
    !data?.events ||
    (data.events.length > 1 && data.events[0].eventType === 'replacing')
  ) {
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

  let events = data.events.filter((event) => event.eventType !== 'replacing');

  if (events.length > 1 && events[0].eventType === 'merged') {
    const demergedEntries = events.map((event) => event.targetAccession);
    events = [{ ...events[0], targetAccession: demergedEntries.join(', ') }];
  }

  const contextInfo = events.map((event) => {
    const presentInUniprotkb = event.eventType === 'merged';

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
              {event.eventType === 'deleted' && (
                <>
                  Removed from UniProtKB because {subEntryId}{' '}
                  {getDeletedReasonText(event.deletedReason)}{' '}
                  <strong data-article-id="deleted_accessions">
                    {event.deletedReason?.toLocaleLowerCase() || 'deleted'}
                  </strong>
                </>
              )}
              {event.eventType === 'merged' && (
                <>
                  {subEntryId} is{' '}
                  {event.eventType === 'merged' &&
                    (event.targetAccession.split(', ').length > 1
                      ? 'demerged into '
                      : 'merged into ')}
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
      {
        title: ' ',
        content: event.eventType === 'deleted' && showUniFireOption && (
          <div>
            <span>Generate additional annotations:</span>
            <br />
            As {subEntryId} is no longer in UniProtKB, its annotations have been
            removed. However, annotations may be generated on demand using
            automatic annotation rules.
            <div className={styles['predictions-status']}>
              {!runUniFire && (
                <Button
                  variant="primary"
                  onClick={() => setRunUniFire(true)}
                  className={styles['run-unifire-button']}
                  disabled={runUniFire}
                >
                  Generate annotations
                </Button>
              )}
              {runUniFire && uniFireLoading && (
                <Button
                  variant="primary"
                  className={styles['run-unifire-button']}
                  disabled={true}
                >
                  Generating annotations
                </Button>
              )}
              {runUniFire && !uniFireLoading && !uniFireData?.accession && (
                <>
                  <InformationIcon
                    className={styles['info-icon']}
                    width={iconSize}
                    height={iconSize}
                  />
                  No predictions generated
                </>
              )}
              {runUniFire && !uniFireLoading && uniFireData?.accession && (
                <>
                  <SuccessIcon
                    className={styles['success-icon']}
                    width={iconSize}
                    height={iconSize}
                  />
                  Predictions generated
                </>
              )}
            </div>
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

export default SubEntryContext;
