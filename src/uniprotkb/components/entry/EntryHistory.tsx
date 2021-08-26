import { Fragment, useMemo, useState, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer';
import { Button, Card, CodeBlock, DataTable, Loader } from 'franklin-sites';
import qs from 'query-string';

import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import EntryTypeIcon from '../../../shared/components/entry/EntryTypeIcon';
import {
  DeletedEntryMessage,
  DemergedEntryMessage,
  MergedEntryMessage,
} from '../../../shared/components/error-pages/ObsoleteEntryPage';

import useDataApi from '../../../shared/hooks/useDataApi';

import parseDate from '../../../shared/utils/parseDate';
import listFormat from '../../../shared/utils/listFormat';
import { unisave } from '../../../shared/config/apiUrls';
import { getEntryPath } from '../../../app/config/urls';

import { TabLocation } from './Entry';
import {
  UniSaveAccession,
  UniSaveEventType,
  UniSaveStatus,
  UniSaveVersion,
} from '../../types/uniSave';
import { ColumnDescriptor } from '../../../shared/hooks/useColumns';
import { Namespace } from '../../../shared/types/namespaces';

import helper from '../../../shared/styles/helper.module.scss';

type UniSaveVersionWithEvents = UniSaveVersion & {
  events?: Record<UniSaveEventType, string[]>;
};

export const EntryHistoryDiff = ({
  accession,
  version1,
  version2,
}: {
  accession: string;
  version1: number;
  version2: number;
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
      splitView={false}
      compareMethod={DiffMethod.WORDS}
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
        <Link
          to={{
            pathname: getEntryPath(
              Namespace.uniprotkb,
              entry.accession,
              TabLocation.History
            ),
            search: `version=${entry.entryVersion}`,
          }}
        >
          (txt)
        </Link>
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
        <a
          href={unisave.accession(entry.accession, {
            entryVersions: entry.entryVersion,
            format: 'fasta',
            download: true,
          })}
          download={`${entry.accession}.${entry.sequenceVersion}.fasta`}
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
    label: 'Release number',
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

  const [version1, setVersion1] = useState<string | null>(null);
  const [version2, setVersion2] = useState<string | null>(null);

  const handleSelectRow = (rowID: string) => {
    if (version1 === rowID) {
      // if 1 set, and clicked
      // move 2 -> 1, unset 2
      setVersion1(version2);
      setVersion2(null);
    } else if (version2 === rowID) {
      // if 2 set, and clicked
      // unset 2
      setVersion2(null);
    } else if (version2) {
      // if row clicked is not set, but 2 is set
      // move 2 -> 1, set 2
      setVersion1(version2);
      setVersion2(rowID);
    } else if (version1) {
      // if row clicked is not set, but 1 is set and 2 isn't
      // set 2
      setVersion2(rowID);
    } else {
      // if row clicked is not set, but 1 and 2 are not set
      // set 1
      setVersion1(rowID);
    }
  };

  const selected = useMemo(
    () =>
      [version1, version2].filter((value: string | null): value is string =>
        Boolean(value)
      ),
    [version1, version2]
  );

  const data = useMemo<UniSaveVersionWithEvents[]>(
    () =>
      (statusData.data
        ? accessionData.data?.results.map((version) => {
            const eventList =
              statusData.data?.events.filter(
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

  const compareDisabled = selected.length !== 2;
  const pathname = getEntryPath(
    Namespace.uniprotkb,
    accession,
    TabLocation.History
  );
  const mergedEvents = statusData.data?.events.filter(
    (e) => e.eventType === 'merged'
  );
  const deleteEvent = statusData.data?.events.find(
    (e) => e.eventType === 'deleted'
  );

  // Sanity check
  {
    const unknownEvents = statusData.data?.events.filter(
      (e) =>
        e.eventType !== 'merged' &&
        e.eventType !== 'deleted' &&
        e.eventType !== 'replacing'
    );
    if (unknownEvents?.length) {
      // eslint-disable-next-line no-console
      console.warn('unknown events found:', unknownEvents);
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
      {message}
      <div className="button-group">
        <Button
          variant="tertiary"
          element={Link}
          disabled={compareDisabled}
          to={{
            pathname,
            search: compareDisabled
              ? undefined
              : `version=${
                  selected[0] < selected[1] ? selected[0] : selected[1]
                }&version=${
                  selected[0] < selected[1] ? selected[1] : selected[0]
                }`,
          }}
          title={
            compareDisabled ? 'Please select 2 versions to compare' : undefined
          }
        >
          Compare
        </Button>
      </div>
      {data.length ? (
        <DataTable
          columns={columns}
          data={data}
          getIdKey={getIdKey}
          density="compact"
          selected={selected}
          onSelectRow={handleSelectRow}
        />
      ) : (
        'Sorry, there is no history information to show'
      )}
    </>
  );
};

const EntryHistory = ({ accession }: { accession: string }) => {
  const { version } = qs.parse(useLocation().search, { parseNumbers: true });

  const title = <h2>Entry history</h2>;

  const backToOverview = (
    <div className="button-group">
      <Button
        variant="tertiary"
        element={Link}
        to={getEntryPath(Namespace.uniprotkb, accession, TabLocation.History)}
      >
        Back to overview
      </Button>
    </div>
  );

  if (version && Array.isArray(version) && version.length === 2) {
    const min = Math.min(+version[0], +version[1]);
    const max = Math.max(+version[0], +version[1]);
    const pathname = getEntryPath(
      Namespace.uniprotkb,
      accession,
      TabLocation.History
    );
    return (
      <Card
        header={
          <>
            {title}
            <span>
              {'Comparing version '}
              <Link to={{ pathname, search: `version=${min}` }}>{min}</Link>
              {' to version '}
              <Link to={{ pathname, search: `version=${max}` }}>{max}</Link>
            </span>
          </>
        }
      >
        {backToOverview}
        <EntryHistoryDiff accession={accession} version1={min} version2={max} />
      </Card>
    );
  }
  if (typeof version === 'number') {
    return (
      <Card
        header={
          <>
            {title}
            <span>Viewing version {version}</span>
          </>
        }
      >
        {backToOverview}
        <EntryHistoryView accession={accession} version={version} />
      </Card>
    );
  }
  return (
    <Card header={title}>
      <EntryHistoryList accession={accession} />
    </Card>
  );
};

export default EntryHistory;
