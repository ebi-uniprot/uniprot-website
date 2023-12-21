import { Fragment, useMemo, ReactNode, useState, Suspense } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer';
import {
  Button,
  Card,
  CodeBlock,
  DataTable,
  DownloadIcon,
  Loader,
  Message,
  SlidingPanel,
} from 'franklin-sites';

import ErrorBoundary from '../../../../shared/components/error-component/ErrorBoundary';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
import EntryTypeIcon from '../../../../shared/components/entry/EntryTypeIcon';
import {
  DeletedEntryMessage,
  DemergedEntryMessage,
  MergedEntryMessage,
} from '../../../../shared/components/error-pages/ObsoleteEntryPage';

import useDataApi from '../../../../shared/hooks/useDataApi';
import useItemSelect from '../../../../shared/hooks/useItemSelect';
import { useMediumScreen } from '../../../../shared/hooks/useMatchMedia';

import lazy from '../../../../shared/utils/lazy';
import parseDate from '../../../../shared/utils/parseDate';
import listFormat from '../../../../shared/utils/listFormat';
import { unisave } from '../../../../shared/config/apiUrls';
import { getEntryPath } from '../../../../app/config/urls';
import * as logging from '../../../../shared/utils/logging';

import { TabLocation } from '../../../types/entry';
import {
  UniSaveAccession,
  UniSaveEventType,
  UniSaveStatus,
  UniSaveVersion,
} from '../../../types/uniSave';
import { ColumnDescriptor } from '../../../../shared/hooks/useColumns';
import { Namespace } from '../../../../shared/types/namespaces';

import helper from '../../../../shared/styles/helper.module.scss';

const DownloadComponent = lazy(
  /* istanbul ignore next */
  () =>
    import(
      /* webpackChunkName: "download" */ '../../../../shared/components/download/Download'
    )
);

type UniSaveVersionWithEvents = UniSaveVersion & {
  events?: Record<UniSaveEventType, string[]>;
};

export const EntryHistoryDiff = ({
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
    unisave.accession(accession, {
      entryVersions: version1,
      format: 'json',
      includeContent: true,
    })
  );
  const v2Data = useDataApi<UniSaveAccession>(
    unisave.accession(accession, {
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
      <ErrorHandler status={v1Data.error ? v1Data.status : v2Data.status} />
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

export const EntryHistoryView = ({
  accession,
  version,
}: {
  accession: string;
  version: number;
}) => {
  const { data, loading, error, progress, status } = useDataApi<string>(
    unisave.accession(accession, { entryVersions: version, format: 'txt' })
  );

  if (loading) {
    return <Loader progress={progress} />;
  }

  if (error || !data) {
    return <ErrorHandler status={status} />;
  }

  return <CodeBlock lightMode>{data}</CodeBlock>;
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
          href={unisave.accession(entry.accession, {
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
          href={unisave.accession(entry.accession, {
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

export const EntryHistoryList = ({ accession }: { accession: string }) => {
  const accessionData = useDataApi<UniSaveAccession>(
    unisave.accession(accession)
  );
  const statusData = useDataApi<UniSaveStatus>(unisave.status(accession));

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
  //   return <ErrorHandler status={accessionData.status} />;
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
          mergedInto={mergedEvents[0].targetAccession}
          release={mergedEvents[0].release}
        />
      );
    } else {
      message = (
        <DemergedEntryMessage
          accession={accession}
          demergedTo={mergedEvents.map((e) => e.targetAccession)}
          release={mergedEvents[0].release}
          inHistory
        />
      );
    }
  } else if (deleteEvent) {
    message = (
      <DeletedEntryMessage
        accession={accession}
        release={deleteEvent.release}
        inHistory
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
            search: compareDisabled
              ? undefined
              : `versions=${Array.from(selectedEntries).sort(
                  (a, b) => +a - +b
                )}`,
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

const EntryHistory = ({ accession }: { accession: string }) => {
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
    return (
      <Card
        header={
          <>
            {title}
            <span>
              Comparing version {min} to version {max}
            </span>
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
      <EntryHistoryList accession={accession} />
    </Card>
  );
};

export default EntryHistory;
