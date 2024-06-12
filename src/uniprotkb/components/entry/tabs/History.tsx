import { Fragment, useMemo, ReactNode, useState, Suspense } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer-continued';
import {
  Button,
  Card,
  DataTable,
  DownloadIcon,
  Loader,
  Message,
  SlidingPanel,
} from 'franklin-sites';

import ErrorBoundary from '../../../../shared/components/error-component/ErrorBoundary';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
import EntryTypeIcon from '../../../../shared/components/entry/EntryTypeIcon';
import RemovedEntryPage, {
  DemergedEntryMessage,
  MergedEntryMessage,
} from '../../../../shared/components/error-pages/full-pages/RemovedEntryPage';

import useDataApi from '../../../../shared/hooks/useDataApi';
import useItemSelect from '../../../../shared/hooks/useItemSelect';
import { useMediumScreen } from '../../../../shared/hooks/useMatchMedia';

import lazy from '../../../../shared/utils/lazy';
import parseDate from '../../../../shared/utils/parseDate';
import listFormat from '../../../../shared/utils/listFormat';
import apiUrls from '../../../config/apiUrls/apiUrls';
import { getEntryPath } from '../../../../app/config/urls';
import { stringifyQuery } from '../../../../shared/utils/url';
import * as logging from '../../../../shared/utils/logging';

import { InactiveEntryReason } from '../../../adapters/uniProtkbConverter';
import { TabLocation } from '../../../types/entry';
import {
  UniSaveAccession,
  UniSaveEventType,
  UniSaveStatus,
  UniSaveVersion,
} from '../../../types/uniSave';
import { ColumnDescriptor } from '../../../../shared/hooks/useColumns';
import { Namespace } from '../../../../shared/types/namespaces';

import styles from './styles/history.module.scss';
import helper from '../../../../shared/styles/helper.module.scss';

const DownloadComponent = lazy(
  /* istanbul ignore next */
  () =>
    import(
      /* webpackChunkName: "download" */ '../../../../shared/components/download/Download'
    )
);

export const getOtherDiffs = (v1: number, v2: number, lastVersion = 0) =>
  (
    ((v1 >= v2 || !lastVersion) && []) || // Shouldn't be the case so return empty array
    (v2 - v1 === 1 && [
      // Consecutive versions
      [v1 - 1, v2 - 1],
      [v1 + 1, v2 + 1],
    ]) ||
    (v1 === 1 &&
      v2 === lastVersion && [
        // First and last version
        [v1, v1 + 1],
        [v2 - 1, v2],
      ]) ||
    (v2 === lastVersion && [
      // Last version and something else
      [v1 - 1, v1],
      [v2 - 1, v2],
    ]) ||
    (v1 === 1 && [
      // First version and something else
      [v1, v1 + 1],
      [v2, v2 + 1],
    ]) || [
      // Everything else
      [v1 - 1, v1],
      [v2, v2 + 1],
    ]
  ) // Only keep links that are within the bounds
    .filter(([w1, w2]) => w1 >= 1 && w2 <= lastVersion);

type UniSaveVersionWithEvents = UniSaveVersion & {
  events?: Record<UniSaveEventType, string[]>;
};

const EntryHistoryDiff = ({
  accession,
  version1,
  version2,
  view,
}: {
  accession: string;
  version1: number;
  version2: number;
  view: 'unified' | 'split';
}) => {
  // 2 different calls to improve cache hit when doing multiple comparisons
  const v1Data = useDataApi<UniSaveAccession>(
    apiUrls.unisave.entry(accession, {
      entryVersions: version1,
      format: 'json',
      includeContent: true,
    })
  );
  const v2Data = useDataApi<UniSaveAccession>(
    apiUrls.unisave.entry(accession, {
      entryVersions: version2,
      format: 'json',
      includeContent: true,
    })
  );

  if (v1Data.loading || v2Data.loading) {
    return (
      <Loader
        progress={
          v1Data.progress &&
          v2Data.progress &&
          v1Data.progress / 2 + v2Data.progress / 2
        }
      />
    );
  }

  if (v1Data.error || v2Data.error || !v1Data.data || !v2Data.data) {
    return (
      <ErrorHandler
        status={v1Data.error ? v1Data.status : v2Data.status}
        error={v1Data.error || v2Data.error}
      />
    );
  }

  return (
    <ReactDiffViewer
      oldValue={v1Data.data.results[0].content}
      newValue={v2Data.data.results[0].content}
      splitView={view === 'split'}
      compareMethod={DiffMethod.LINES}
    />
  );
};

const ListOfEntries = ({
  accessions,
  toHistory,
}: {
  accessions: string[];
  toHistory?: boolean;
}) => (
  <>
    {accessions.map((accession, index) => (
      <Fragment key={accession}>
        {listFormat(index, accessions)}
        <Link
          to={getEntryPath(
            Namespace.uniprotkb,
            accession,
            toHistory ? TabLocation.History : undefined
          )}
        >
          {accession}
        </Link>
      </Fragment>
    ))}
  </>
);

const columns: ColumnDescriptor<UniSaveVersionWithEvents>[] = [
  {
    name: 'entry-version',
    label: (
      <>
        Entry
        <br />
        version
      </>
    ),
    render: (entry) => (
      <>
        {entry.entryVersion}&nbsp;
        {/* eslint-disable-next-line react/jsx-no-target-blank */}
        <a
          href={apiUrls.unisave.entry(entry.accession, {
            entryVersions: entry.entryVersion,
            format: 'txt',
          })}
          target="_blank"
        >
          (txt)
        </a>
      </>
    ),
  },
  {
    name: 'sequence-version',
    label: (
      <>
        Sequence
        <br />
        version
      </>
    ),
    render: (entry) => (
      <>
        {entry.sequenceVersion}&nbsp;
        {/* eslint-disable-next-line react/jsx-no-target-blank */}
        <a
          href={apiUrls.unisave.entry(entry.accession, {
            entryVersions: entry.entryVersion,
            format: 'fasta',
          })}
          target="_blank"
        >
          (fasta)
        </a>
      </>
    ),
  },
  {
    name: 'entry-name',
    label: 'Entry name',
    render: (entry) => entry.name,
  },
  {
    name: 'release-database',
    label: 'Database',
    render: (entry) => (
      <span className={helper['no-wrap']}>
        <EntryTypeIcon entryType={entry.database} />
        {entry.database}
      </span>
    ),
  },
  {
    name: 'release-number',
    label: (
      <>
        Release numbers
        <br />
        (Swiss-Prot/TrEMBL)
      </>
    ),
    render: (entry) => (
      <span className={helper['no-wrap']}>{entry.firstRelease}</span>
    ),
  },
  {
    name: 'release-data',
    label: 'Release date',
    render: (entry) => (
      <time
        dateTime={parseDate(entry.firstReleaseDate)?.toISOString()}
        className={helper['no-wrap']}
      >
        {entry.firstReleaseDate}
      </time>
    ),
  },
  {
    name: 'notes',
    label: 'Notes',
    render: (entry) => (
      <>
        {entry.events?.replacing && (
          <>
            Replaced:{' '}
            <ListOfEntries accessions={entry.events.replacing} toHistory />.
          </>
        )}
      </>
    ),
  },
];

const getIdKey = (entry: UniSaveVersionWithEvents) => `${entry.entryVersion}`;


type EntryHistoryListProps = {
  accession: string;
  uniparc?: string;
  reason?: InactiveEntryReason;
};

const EntryHistoryList = ({
  accession,
  uniparc,
  reason,
}: EntryHistoryListProps) => {
  const location = useLocation();
  const accessionData = useDataApi<UniSaveAccession>(
    apiUrls.unisave.entry(accession)
  );
  const statusData = useDataApi<UniSaveStatus>(
    apiUrls.unisave.status(accession)
  );

  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);

  const [selectedEntries, setSelectedItemFromEvent] = useItemSelect();

  const data = useMemo<UniSaveVersionWithEvents[]>(
    () =>
      (statusData.data
        ? accessionData.data?.results.map((version) => {
            const eventList =
              statusData.data?.events?.filter(
                (event) => event.release === version.firstRelease
              ) || [];

            const events: { [key in UniSaveEventType]?: string[] } = {};
            for (const event of eventList) {
              if (!events[event.eventType]) {
                events[event.eventType] = [];
              }
              // I've just checked above if it's not defined, I know it is now
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              events[event.eventType]!.push(event.targetAccession);
            }

            return {
              ...version,
              events: eventList.length ? events : undefined,
            };
          })
        : accessionData.data?.results) || [],
    [accessionData.data, statusData.data]
  );

  if (accessionData.loading) {
    return <Loader progress={accessionData.progress} />;
  }

  // Don't check accessionData.error!
  // Might return 404 when no history, not a bug, just a weird edge case we need
  // to take into account. Example: P50409
  // Don't check statusData.error either!
  // Might return 404 when no events in the data (most TrEMBL entries)
  // if (statusData.error || !data) {
  //   return (
  //     <ErrorHandler status={accessionData.status} error={statusData.error} />
  //   );
  // }

  const compareDisabled = selectedEntries.length !== 2;
  const pathname = getEntryPath(
    Namespace.uniprotkb,
    accession,
    TabLocation.History
  );
  const mergedEvents = statusData.data?.events?.filter(
    (e) => e.eventType === 'merged'
  );
  const deleteEvent = statusData.data?.events?.find(
    (e) => e.eventType === 'deleted'
  );

  // Sanity check
  {
    const unknownEvents = statusData.data?.events?.filter(
      (e) =>
        e.eventType !== 'merged' &&
        e.eventType !== 'deleted' &&
        e.eventType !== 'replacing'
    );
    if (unknownEvents?.length) {
      logging.warn('unknown events found', { extra: { data: unknownEvents } });
    }
  }

  let message: ReactNode;
  if (mergedEvents?.length) {
    if (mergedEvents.length === 1) {
      message = (
        <MergedEntryMessage
          accession={accession}
          uniparc={uniparc}
          mergedInto={mergedEvents[0].targetAccession}
          release={mergedEvents[0].release}
        />
      );
    } else {
      message = (
        <DemergedEntryMessage
          accession={accession}
          uniparc={uniparc}
          demergedTo={mergedEvents.map((e) => e.targetAccession)}
          release={mergedEvents[0].release}
        />
      );
    }
  } else if (reason) {
    message = (
      <RemovedEntryPage
        accession={accession}
        uniparc={uniparc}
        release={deleteEvent?.release}
        reason={reason}
      />
    );
  }

  return (
    <>
      {displayDownloadPanel && (
        <Suspense fallback={null}>
          <SlidingPanel
            title="Download"
            // Meaning, in basket mini view, slide from the right
            position="left"
            onClose={() => setDisplayDownloadPanel(false)}
            pathname={location.pathname}
          >
            <ErrorBoundary>
              <DownloadComponent
                selectedEntries={selectedEntries}
                totalNumberResults={data.length}
                onClose={() => setDisplayDownloadPanel(false)}
                namespace={Namespace.unisave}
                base={`/unisave/${accession}`}
              />
            </ErrorBoundary>
          </SlidingPanel>
        </Suspense>
      )}
      {message && (
        <Message level="info">
          <small>{message}</small>
        </Message>
      )}
      <div className="button-group">
        <Button
          variant="tertiary"
          element={Link}
          disabled={compareDisabled}
          to={{
            pathname,
            search: stringifyQuery({
              versions: compareDisabled
                ? undefined
                : Array.from(selectedEntries).sort((a, b) => +a - +b),
            }),
          }}
          title={
            compareDisabled ? 'Please select 2 versions to compare' : undefined
          }
        >
          Compare
        </Button>
        <Button
          variant="tertiary"
          onPointerOver={DownloadComponent.preload}
          onFocus={DownloadComponent.preload}
          onClick={() => setDisplayDownloadPanel((value) => !value)}
        >
          <DownloadIcon />
          Download
        </Button>
      </div>
      {data.length ? (
        <div className={helper['overflow-y-container']}>
          <DataTable
            columns={columns}
            data={data}
            getIdKey={getIdKey}
            density="compact"
            onSelectionChange={setSelectedItemFromEvent}
          />
        </div>
      ) : (
        'Sorry, there is no history information to show'
      )}
    </>
  );
};

const EntryHistory = ({
  accession,
  lastVersion,
  uniparc,
  reason,
}: {
  accession: string;
  lastVersion?: number;
  uniparc?: string;
  reason?: InactiveEntryReason;
}) => {
  const sp = new URLSearchParams(useLocation().search);
  const rawVersions = sp.get('versions');
  const rawView = sp.get('view');

  const defaultView = useMediumScreen() ? 'unified' : 'split';

  const title = <h2>Entry history</h2>;

  const versions = rawVersions?.split(',').map((v) => +v);
  const view = (rawView || defaultView) as 'split' | 'unified';

  if (versions?.length === 2) {
    const v1 = versions[0] || 0;
    const v2 = versions[1] || 0;
    const min = Math.min(v1, v2);
    const max = Math.max(v1, v2);

    const otherDiffs = getOtherDiffs(min, max, lastVersion);

    return (
      <Card
        header={
          <>
            {title}
            <h3 className="small">
              Comparing version {min} to version {max}
            </h3>
          </>
        }
        className="wider-tab-content"
      >
        <div className="button-group">
          <Button
            variant="tertiary"
            element={Link}
            to={getEntryPath(
              Namespace.uniprotkb,
              accession,
              TabLocation.History
            )}
          >
            Back to overview
          </Button>
          <Button
            variant="tertiary"
            element={Link}
            to={{
              pathname: getEntryPath(
                Namespace.uniprotkb,
                accession,
                TabLocation.History
              ),
              search: new URLSearchParams({
                versions: `${min},${max}`,
                view: view === 'unified' ? 'split' : 'unified',
              }).toString(),
            }}
            replace
          >
            Display in {view === 'unified' ? 'split' : 'unified'} view
          </Button>
          {otherDiffs.length && (
            <span className={styles['other-diffs']}>
              <span>Jump to</span>
              <ul className="no-bullet">
                {otherDiffs.map(([w1, w2]) => (
                  <li key={`${w1}:${w2}`}>
                    <Link
                      to={{
                        pathname: getEntryPath(
                          Namespace.uniprotkb,
                          accession,
                          TabLocation.History
                        ),
                        search: stringifyQuery({
                          versions: [w1, w2],
                        }),
                      }}
                    >
                      v{w1}:v{w2}
                    </Link>
                  </li>
                ))}
              </ul>
            </span>
          )}
        </div>
        <EntryHistoryDiff
          accession={accession}
          version1={min}
          version2={max}
          view={view}
        />
      </Card>
    );
  }
  return (
    <Card header={title} className="wider-tab-content">
      <EntryHistoryList
        accession={accession}
        uniparc={uniparc}
        reason={reason}
      />
    </Card>
  );
};

export default EntryHistory;
