import './styles/Dashboard.scss';

import cn from 'classnames';
import {
  BinIcon,
  Bubble,
  Button,
  BytesNumber,
  Card,
  Chip,
  EditIcon,
  EllipsisReveal,
  ReSubmitIcon,
  SpinnerIcon,
  WarningTriangleIcon,
} from 'franklin-sites';
import { LocationDescriptor } from 'history';
import {
  ChangeEvent,
  KeyboardEvent,
  memo,
  MouseEvent,
  ReactNode,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Link, useHistory } from 'react-router-dom';

import {
  jobTypeToPath,
  Location,
  LocationToPath,
} from '../../../app/config/urls';
import { ContactLocationState } from '../../../contact/adapters/contactFormAdapter';
import apiUrls from '../../../shared/config/apiUrls/apiUrls';
import useDataApi from '../../../shared/hooks/useDataApi';
import { useReducedMotion } from '../../../shared/hooks/useMatchMedia';
import * as logging from '../../../shared/utils/logging';
import parseDate from '../../../shared/utils/parseDate';
import { pluralise } from '../../../shared/utils/utils';
import { dispatchJobs } from '../../../shared/workers/jobs/getSharedWorker';
import {
  deleteJob,
  updateJob,
} from '../../../shared/workers/jobs/state/toolsActions';
import {
  FailedJob,
  FinishedJob,
  Job,
} from '../../../shared/workers/jobs/types/toolsJob';
import { Status } from '../../../shared/workers/jobs/types/toolsStatuses';
import { databaseValueToName } from '../../blast/config/BlastFormData';
import { asyncDownloadUrlObjectCreator } from '../../config/urls';
import { LocationStateFromJobLink } from '../../hooks/useMarkJobAsSeen';
import { IDMappingFormConfig } from '../../id-mapping/types/idMappingFormConfig';
import { SelectedTaxon } from '../../types/toolsFormData';
import { FormParameters } from '../../types/toolsFormParameters';
import { JobTypes } from '../../types/toolsJobTypes';

const stopPropagation = (
  event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>
) => event.stopPropagation();

interface NameProps {
  id: Job['internalID'];
  children: Job['title'];
}

const Name = ({ children, id }: NameProps) => {
  const [text, setText] = useState(children || '');

  const handleBlur = () => {
    const cleanedText = text.trim();
    if (cleanedText !== children) {
      dispatchJobs(updateJob(id, { title: text }));
    }
  };

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  }, []);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <label onClick={stopPropagation} aria-label="job name">
      <input
        onBlur={handleBlur}
        onChange={handleChange}
        autoComplete="off"
        type="text"
        value={text}
        maxLength={100}
      />
      <EditIcon width="1em" height="2em" />
    </label>
  );
};

interface TimeProps {
  children: number;
}

const Time = ({ children }: TimeProps) => {
  const date = parseDate(children);
  if (!date) {
    return null;
  }
  const YYYY = date.getFullYear();
  // date.getMonth() starts at 0 for January
  const MM = `${date.getMonth() + 1}`.padStart(2, '0');
  const DD = `${date.getDate()}`.padStart(2, '0');
  const hh = `${date.getHours()}`.padStart(2, '0');
  const mm = `${date.getMinutes()}`.padStart(2, '0');
  return (
    <time dateTime={date.toISOString()}>
      {YYYY}-{MM}-{DD}
      <br />
      <span className="dashboard__body__hours">
        {hh}:{mm}
      </span>
    </time>
  );
};

const Seen = ({ job }: { job: FailedJob | FinishedJob<JobTypes> }) => {
  if (job.seen) {
    return null;
  }

  const markAsRead = () => {
    dispatchJobs(updateJob(job.internalID, { seen: true }));
  };

  return (
    <Button
      onClick={markAsRead}
      variant="tertiary"
      className="dashboard__body__bubble"
      title={`new job result (click to mark job as "seen")`}
    >
      <Bubble size="small" />
    </Button>
  );
};

const SpinningNotify = ({ children }: { children: ReactNode }) => (
  <>
    {children} <SpinnerIcon width="12" height="12" />
    <br />
    <span className="dashboard__body__notify_message">
      We will notify you when your results are ready
    </span>
  </>
);

interface NiceStatusProps {
  job: Job;
  jobLink?: LocationDescriptor;
  jobUrl?: string;
}

const NiceStatus = ({ job, jobLink, jobUrl }: NiceStatusProps) => {
  switch (job.status) {
    case Status.CREATED:
      return <SpinningNotify>Created</SpinningNotify>;
    case Status.NEW:
    case Status.QUEUED:
      return <SpinningNotify>Queued</SpinningNotify>;
    case Status.RUNNING:
      if (job.type === JobTypes.ASYNC_DOWNLOAD) {
        return (
          <SpinningNotify>
            {job.progress
              ? `Writing entries to file (${job.progress}%)`
              : 'Retrieving entries'}
          </SpinningNotify>
        );
      }
      return <SpinningNotify>Running</SpinningNotify>;
    case Status.FAILURE:
    case Status.ERRORED:
      return (
        <>
          Failed <Seen job={job} />
          {'errorDescription' in job && (
            <>
              <br />
              <span className="dashboard__body__notify_message">
                {job.errorDescription}
              </span>
              <div className="dashboard__body__contact_link">
                For further inquiry, please{' '}
                <Link<ContactLocationState>
                  to={(location) => ({
                    pathname: LocationToPath[Location.ContactGeneric],
                    state: {
                      referrer: location,
                      formValues: {
                        subject: `Failed ${job.type} job`,
                        context: `*** Job error ***
${job.errorDescription}

${
  job.remoteID
    ? `*** Job ID *** 
${job.remoteID}`
    : `*** Input *** 
${Object.entries(job.parameters)
  .map(
    ([key, value]) =>
      `${key}: ${typeof value === 'object' ? JSON.stringify(value) : value}`
  )
  .join(',\n')}`
}
`,
                      },
                    },
                  })}
                  title="Contact"
                >
                  contact us
                </Link>
              </div>
            </>
          )}
        </>
      );
    case Status.NOT_FOUND:
      return <>Job not found on the server</>;
    case Status.FINISHED: {
      if (jobUrl) {
        // Async download
        const fileSizeBytes =
          ('data' in job &&
            job.data &&
            'fileSizeBytes' in job.data &&
            job.data.fileSizeBytes) ||
          0;
        return (
          <>
            {fileSizeBytes ? (
              <a href={jobUrl} target="_blank" rel="noreferrer">
                Completed
              </a>
            ) : (
              'Completed'
            )}
            <br />
            <span className="dashboard__body__notify_message">
              <BytesNumber>{fileSizeBytes}</BytesNumber> file generated
            </span>
          </>
        );
      }
      if (jobLink) {
        // either a BLAST, ID Mapping, or Peptide Search job could have those
        if ('data' in job && job.data && 'hits' in job.data) {
          const actualHits = job.data.hits;
          let expectedHits: number | undefined;
          if ('hits' in job.parameters) {
            // BLAST-specific
            expectedHits = job.parameters.hits;
          }
          if ('ids' in job.parameters) {
            // ID Mapping-specific
            expectedHits = job.parameters.ids.length;
          }
          if (
            (expectedHits !== undefined && actualHits !== expectedHits) ||
            actualHits === 0
          ) {
            const hitText = pluralise('hit', actualHits);
            return (
              <>
                {actualHits === 0 && job.type !== JobTypes.ID_MAPPING ? (
                  <span>Completed</span>
                ) : (
                  <Link to={jobLink}>Completed</Link>
                )}{' '}
                <span
                  title={`${actualHits} ${hitText} found${
                    expectedHits
                      ? ` instead of the requested ${expectedHits}`
                      : ''
                  }`}
                >
                  (
                  {actualHits ? `${actualHits} ${hitText}` : 'no results found'}
                  )
                </span>
                <Seen job={job} />
              </>
            );
          }
        }
        return (
          <>
            <Link to={jobLink}>Completed</Link>
            <Seen job={job} />
          </>
        );
      }
      return null;
    }
    default:
      logging.warn(`Job status not handled: ${JSON.stringify(job)}`);
      return null;
  }
};

interface JobSpecificParametersProps {
  job: Job;
}

const taxonsWithEllipsisReveal = (taxIDs: SelectedTaxon[]) => {
  const [visibleID, ...hiddenIDs] = taxIDs;

  return (
    <span>
      Selected taxonomy: {visibleID.label}
      {hiddenIDs.length ? (
        <EllipsisReveal>
          {', '}
          {hiddenIDs.map((taxon) => taxon.label).join(', ')}
        </EllipsisReveal>
      ) : null}
    </span>
  );
};

const JobSpecificParamaters = ({ job }: JobSpecificParametersProps) => {
  const { data: idMappingFields } = useDataApi<IDMappingFormConfig>(
    job.type === JobTypes.ID_MAPPING
      ? apiUrls.configure.idMappingFields
      : undefined
  );

  const idMappingDBToDisplayName: Record<string, string> = useMemo(
    () =>
      idMappingFields
        ? Object.fromEntries(
            idMappingFields.groups.flatMap(({ items }) =>
              items.map((item) => [item.name, item.displayName])
            )
          )
        : {},
    [idMappingFields]
  );

  switch (job.type) {
    case JobTypes.BLAST: {
      const { database, taxIDs } =
        job.parameters as FormParameters[JobTypes.BLAST];

      return (
        <>
          <span>Target database: {databaseValueToName(database)}</span>
          {taxIDs?.length ? taxonsWithEllipsisReveal(taxIDs) : null}
        </>
      );
    }
    case JobTypes.ID_MAPPING: {
      const { from, to, taxId } =
        job.parameters as FormParameters[JobTypes.ID_MAPPING];

      return (
        <>
          <span>Source database: {idMappingDBToDisplayName[from] || from}</span>
          <span>Target database: {idMappingDBToDisplayName[to] || to}</span>
          {taxId?.label && <span>Selected taxonomy: {taxId.label}</span>}
        </>
      );
    }
    case JobTypes.PEPTIDE_SEARCH: {
      const { spOnly, taxIds } =
        job.parameters as FormParameters[JobTypes.PEPTIDE_SEARCH];

      return (
        <>
          {spOnly && spOnly === 'on' && (
            <span>Target database: UniProtKB/Swiss-Prot</span>
          )}
          {taxIds?.length ? taxonsWithEllipsisReveal(taxIds) : null}
        </>
      );
    }
    // Include format info for async download
    // case JobTypes.ASYNC_DOWNLOAD:
    default:
      return null;
  }
};
interface ActionsProps {
  job: Job;
  onDelete(): void;
}

const Actions = ({ job, onDelete }: ActionsProps) => {
  const history = useHistory();

  return (
    <span className="dashboard__body__actions">
      <button
        type="button"
        title="keep this job"
        onClick={(event) => {
          event.stopPropagation();
          dispatchJobs(updateJob(job.internalID, { saved: !job.saved }));
        }}
      >
        {job.saved ? '★' : '☆'}
      </button>
      {job.type !== JobTypes.ASYNC_DOWNLOAD && (
        <button
          type="button"
          title="resubmit this job"
          onClick={(event) => {
            event.stopPropagation();
            history.push(jobTypeToPath(job.type), {
              parameters: { ...job.parameters, name: job.title },
            });
          }}
        >
          <ReSubmitIcon />
        </button>
      )}
      <button
        type="button"
        title="delete this job"
        onClick={(event) => {
          event.stopPropagation();
          onDelete();
        }}
      >
        <BinIcon />
      </button>
    </span>
  );
};

const KeyframesForDelete = {
  opacity: [1, 1, 0],
  transform: ['scale(1)', 'scale(1.05)', 'scale(0)'],
};

const animationOptionsForDelete: KeyframeAnimationOptions = {
  duration: 500,
  delay: 100,
  easing: 'ease-out',
  fill: 'both',
};

const keyframesForNew = {
  opacity: [0, 1],
  transform: ['scale(0.8)', 'scale(1.05)', 'scale(1)'],
};
const animationOptionsForNew: KeyframeAnimationOptions = {
  duration: 500,
  easing: 'ease-in-out',
  fill: 'both',
};
const keyframesForStatusUpdate = {
  opacity: [1, 0.5, 1, 0.5, 1],
};
const animationOptionsForStatusUpdate: KeyframeAnimationOptions = {
  duration: 1000,
  fill: 'both',
};

interface RowProps {
  job: Job;
  hasExpired?: boolean;
}

interface CustomLocationState {
  parameters?: Job['parameters'][];
}

const Row = memo(({ job, hasExpired }: RowProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const firstTime = useRef<boolean>(true);

  const history = useHistory<CustomLocationState | undefined>();
  const reducedMotion = useReducedMotion();

  // For async download
  let jobUrl: string | undefined;
  // For everything else
  let jobLink: LocationDescriptor<LocationStateFromJobLink> | undefined;
  if ('remoteID' in job && job.status === Status.FINISHED && !hasExpired) {
    if (job.type === JobTypes.ASYNC_DOWNLOAD) {
      const urlConfig = asyncDownloadUrlObjectCreator(
        (job.parameters as FormParameters[JobTypes.ASYNC_DOWNLOAD]).namespace
      );
      jobUrl = urlConfig.resultUrl(job.remoteID);
    } else {
      jobLink = {
        pathname: jobTypeToPath(job.type, job),
        state: { internalID: job.internalID },
      };
    }
  }

  const handleDelete = () => {
    const { internalID } = job;
    if (reducedMotion || !(ref.current && 'animate' in ref.current)) {
      dispatchJobs(deleteJob(internalID));
      return;
    }
    ref.current.animate(
      KeyframesForDelete,
      animationOptionsForDelete
    ).onfinish = () => dispatchJobs(deleteJob(internalID));
  };

  // if the state of the current location contains the parameters from this job,
  // it means we just arrived from a submission form page and this is the job
  // that was just added, animate it to have it visually represented as "new"
  useLayoutEffect(() => {
    if (!(ref.current && 'animate' in ref.current)) {
      return;
    }
    if (!history.location?.state?.parameters?.includes?.(job.parameters)) {
      return;
    }
    ref.current.animate(
      // use flash of opacity if prefers reduced motion, otherwise zoom in/out
      reducedMotion ? keyframesForStatusUpdate : keyframesForNew,
      animationOptionsForNew
    );
  }, [history, job.parameters, reducedMotion]);

  // if the status of the current job changes, make it "flash"
  useLayoutEffect(() => {
    if (!(ref.current && 'animate' in ref.current)) {
      return;
    }
    if (firstTime.current) {
      firstTime.current = false;
      return;
    }
    ref.current.animate(
      keyframesForStatusUpdate,
      animationOptionsForStatusUpdate
    );
  }, [job.status]);

  const noResults =
    'data' in job &&
    job.data &&
    'hits' in job.data &&
    job.data.hits === 0 &&
    job.type !== JobTypes.ID_MAPPING;

  let jobIdNode;
  if ('remoteID' in job) {
    jobIdNode = job.remoteID;
    if (!noResults) {
      if (jobUrl) {
        // Async download
        jobIdNode = (
          <a href={jobUrl} target="_blank" rel="noreferrer">
            {job.remoteID}
          </a>
        );
      }
      if (jobLink) {
        jobIdNode = <Link to={jobLink}>{job.remoteID}</Link>;
      }
    }
  } else if (!hasExpired) {
    if (job.status === Status.CREATED) {
      jobIdNode = <em>The server has not accepted this job yet</em>;
    } else {
      jobIdNode = <em>The server had an issue accepting this job</em>;
    }
  }

  return (
    <Card
      ref={ref}
      className={cn(
        'card',
        (job.status === Status.FAILURE || job.status === Status.ERRORED) &&
          'card--failure',
        hasExpired && 'card--expired'
      )}
    >
      <span className="dashboard__body__type">
        {job.type}
        {job.type === JobTypes.ASYNC_DOWNLOAD && <Chip>beta</Chip>}
      </span>
      <span className="dashboard__body__name">
        <Name id={job.internalID}>{job.title}</Name>
      </span>
      <span
        className="dashboard__body__time"
        title={
          hasExpired
            ? 'This job has expired and its data is no longer available'
            : undefined
        }
      >
        {'timeSubmitted' in job && job.timeSubmitted && (
          <>
            <Time>{job.timeSubmitted}</Time>
            {hasExpired && <WarningTriangleIcon width="1em" />}
          </>
        )}
      </span>
      <span className="dashboard__body__status">
        <NiceStatus job={job} jobLink={jobLink} jobUrl={jobUrl} />
      </span>
      <span className="dashboard__body__actions">
        <Actions job={job} onDelete={handleDelete} />
      </span>
      <span className="dashboard__body__id">{jobIdNode}</span>
      <span className="dashboard__body__parameters">
        <JobSpecificParamaters job={job} />
      </span>
    </Card>
  );
});

export default Row;
