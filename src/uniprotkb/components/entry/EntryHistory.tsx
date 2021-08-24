import { Fragment, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, DataTable, Loader } from 'franklin-sites';

import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import EntryTypeIcon from '../../../shared/components/entry/EntryTypeIcon';

import useDataApi from '../../../shared/hooks/useDataApi';

import parseDate from '../../../shared/utils/parseDate';
import listFormat from '../../../shared/utils/listFormat';
import { unisave } from '../../../shared/config/apiUrls';
import { getEntryPath } from '../../../app/config/urls';

import { UniProtkbUIModel } from '../../adapters/uniProtkbConverter';
import {
  UniSaveAccession,
  UniSaveEvent,
  UniSaveEventType,
  UniSaveStatus,
  UniSaveVersion,
} from '../../types/uniSave';
import { ColumnDescriptor } from '../../../shared/hooks/useColumns';
import { Namespace } from '../../../shared/types/namespaces';

import helper from '../../../shared/styles/helper.module.scss';

type EntryHistoryProps = {
  transformedData: UniProtkbUIModel;
};

type UniSaveVersionWithEvents = UniSaveVersion & {
  events?: Record<UniSaveEventType, string[]>;
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
          to={
            // eslint-disable-next-line uniprot-website/use-config-location
            getEntryPath(Namespace.uniprotkb, accession) +
            (toHistory ? '/history' : '')
          }
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
    label: 'Entry version',
    render: (entry) => entry.entryVersion,
  },
  {
    name: 'sequence-version',
    label: 'Sequence version',
    render: (entry) => entry.sequenceVersion,
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

const EntryHistoryLinks = ({ transformedData }: EntryHistoryProps) => {
  const accessionData = useDataApi<UniSaveAccession>(
    unisave.accession(transformedData.primaryAccession)
  );
  const statusData = useDataApi<UniSaveStatus>(
    unisave.status(transformedData.primaryAccession)
  );

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

  const data = useMemo<UniSaveVersionWithEvents[] | undefined>(() => {
    console.log(accessionData.data, statusData.data);
    return statusData.data
      ? accessionData.data?.results.map((version) => {
          const eventList =
            statusData.data?.events.filter(
              (event) => event.release === version.firstRelease
            ) || [];

          const events: Record<UniSaveEvent['eventType'], string[]> = {};
          for (const event of eventList) {
            if (!events[event.eventType]) {
              events[event.eventType] = [];
            }
            events[event.eventType].push(event.targetAccession);
          }

          return {
            ...version,
            events: eventList.length ? events : undefined,
          };
        })
      : accessionData.data?.results;
  }, [accessionData.data, statusData.data]);

  if (accessionData.loading) {
    return <Loader progress={accessionData.progress} />;
  }

  if (accessionData.error || !data) {
    return <ErrorHandler status={accessionData.status} />;
  }

  return (
    <Card header={<h2>Entry history</h2>}>
      <div className="button-group">
        <Button
          variant="tertiary"
          element={selected.length === 2 ? 'button' : Link}
          disabled={selected.length !== 2}
          to={selected.length === 2 ? '#' : undefined}
        >
          Compare
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={data}
        getIdKey={getIdKey}
        density="compact"
        selected={selected}
        onSelectRow={handleSelectRow}
      />
    </Card>
  );
};

export default EntryHistoryLinks;
