import cn from 'classnames';
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
import { type DeletedReason } from '../../../uniprotkb/adapters/uniProtkbConverter';
import { TabLocation as UniprotkbTabLocation } from '../../../uniprotkb/types/entry';
import { type UniSaveStatus } from '../../../uniprotkb/types/uniSave';
import { type UniFireModel } from '../../adapters/uniParcSubEntryConverter';
import styles from './styles/sub-entry-context.module.css';

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
  const events = data?.events?.filter((event) => event.eventType === 'deleted');

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

  const contextInfo = events.map((event) => {
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
            .{' '}
            {showUniFireOption ? (
              <>
                <span>
                  However, annotations may be generated on demand using
                  automatic annotation rules.
                </span>
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
                        className={cn(styles.icon, styles.info)}
                        width={iconSize}
                        height={iconSize}
                      />
                      No predictions generated
                    </>
                  )}
                  {runUniFire && !uniFireLoading && uniFireData?.accession && (
                    <>
                      <SuccessIcon
                        className={cn(styles.icon, styles.success)}
                        width={iconSize}
                        height={iconSize}
                      />
                      Predictions generated
                    </>
                  )}
                </div>
              </>
            ) : null}
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
      <InfoList key={`${event.eventType}-${subEntryId}`} infoData={infoData} />
    );
  });

  return contextInfo && <Message level="info">{contextInfo}</Message>;
};

export default SubEntryContext;
