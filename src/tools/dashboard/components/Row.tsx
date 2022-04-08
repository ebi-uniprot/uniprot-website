import {
  memo,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
  MouseEvent,
  KeyboardEvent,
  ChangeEvent,
} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Card,
  ReSubmitIcon,
  BinIcon,
  SpinnerIcon,
  EditIcon,
  WarningTriangleIcon,
  Bubble,
  Button,
} from 'franklin-sites';
import { LocationDescriptor } from 'history';

import { updateJob, deleteJob } from '../../state/toolsActions';

import { jobTypeToPath } from '../../../app/config/urls';

import { useReducedMotion } from '../../../shared/hooks/useMatchMedia';
import { useToolsDispatch } from '../../../shared/contexts/Tools';

import { getBEMClassName as bem, pluralise } from '../../../shared/utils/utils';
import parseDate from '../../../shared/utils/parseDate';
import * as logging from '../../../shared/utils/logging';

import { FailedJob, Job, FinishedJob } from '../../types/toolsJob';
import { Status } from '../../types/toolsStatuses';
import { JobTypes } from '../../types/toolsJobTypes';
import { LocationStateFromJobLink } from '../../hooks/useMarkJobAsSeen';

import './styles/Dashboard.scss';

const stopPropagation = (
  event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>
) => event.stopPropagation();

interface NameProps {
  id: Job['internalID'];
  children: Job['title'];
}

const Name = ({ children, id }: NameProps) => {
  const dispatch = useToolsDispatch();
  const [text, setText] = useState(children || '');

  const handleBlur = () => {
    const cleanedText = text.trim();
    if (cleanedText !== children) {
      dispatch(updateJob(id, { title: text }));
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
  const dispatch = useToolsDispatch();

  if (job.seen) {
    return null;
  }

  const markAsRead = () => {
    dispatch(updateJob(job.internalID, { seen: true }));
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

interface NiceStatusProps {
  job: Job;
  jobLink?: LocationDescriptor;
}

const NiceStatus = ({ job, jobLink }: NiceStatusProps) => {
  switch (job.status) {
    case Status.CREATED:
    case Status.RUNNING:
      return (
        <>
          Running <SpinnerIcon width="12" height="12" />
          <br />
          <span className="dashboard__body__notify_message">
            We will notify you when your results are ready
          </span>
        </>
      );
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
            </>
          )}
        </>
      );
    case Status.NOT_FOUND:
      return <>Job not found on the server</>;
    case Status.FINISHED: {
      if (!jobLink) {
        return null;
      }
      // either a BLAST or ID Mapping job could have those
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
        if (expectedHits !== undefined && actualHits !== expectedHits) {
          const hitText = pluralise('hit', actualHits);
          return (
            <>
              {actualHits === 0 ? (
                <span>Completed</span>
              ) : (
                // eslint-disable-next-line uniprot-website/use-config-location
                <Link to={jobLink}>Completed</Link>
              )}{' '}
              <span
                title={`${actualHits} ${hitText} results found instead of the requested ${expectedHits}`}
              >
                ({actualHits ? `${actualHits} ${hitText}` : 'no results found'})
              </span>
              <Seen job={job} />
            </>
          );
        }
      }
      return (
        <>
          {/* eslint-disable-next-line uniprot-website/use-config-location */}
          <Link to={jobLink}>Completed</Link>
          <Seen job={job} />
        </>
      );
    }
    default:
      logging.warn(`Job status not handled: ${job}`);
      return null;
  }
};

interface ActionsProps {
  job: Job;
  onDelete(): void;
}

const Actions = ({ job, onDelete }: ActionsProps) => {
  const history = useHistory();
  const dispatch = useToolsDispatch();

  return (
    <span className="dashboard__body__actions">
      <button
        type="button"
        title="keep this job"
        onClick={(event) => {
          event.stopPropagation();
          dispatch(updateJob(job.internalID, { saved: !job.saved }));
        }}
      >
        {job.saved ? '★' : '☆'}
      </button>
      <button
        type="button"
        title="resubmit this job"
        onClick={(event) => {
          event.stopPropagation();
          history.push(jobTypeToPath(job.type), { parameters: job.parameters });
        }}
      >
        <ReSubmitIcon />
      </button>
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
  const dispatch = useToolsDispatch();
  const reducedMotion = useReducedMotion();

  let jobLink: LocationDescriptor<LocationStateFromJobLink> | undefined;
  if ('remoteID' in job && job.status === Status.FINISHED && !hasExpired) {
    jobLink = {
      pathname: jobTypeToPath(job.type, job),
      state: { internalID: job.internalID },
    };
  }

  const handleDelete = () => {
    const { internalID } = job;
    if (reducedMotion || !(ref.current && 'animate' in ref.current)) {
      dispatch(deleteJob(internalID));
      return;
    }
    ref.current.animate(
      KeyframesForDelete,
      animationOptionsForDelete
    ).onfinish = () => dispatch(deleteJob(internalID));
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
    'data' in job && job.data && 'hits' in job.data && job.data.hits === 0;

  return (
    <Card
      to={noResults ? undefined : jobLink}
      ref={ref}
      className={bem({
        b: 'card',
        m: [
          (job.status === Status.FAILURE || job.status === Status.ERRORED) &&
            'failure',
          Boolean(hasExpired) && 'expired',
        ],
      })}
    >
      <span className="dashboard__body__type">{job.type}</span>
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
        <NiceStatus job={job} jobLink={jobLink} />
      </span>
      <span className="dashboard__body__actions">
        <Actions job={job} onDelete={handleDelete} />
      </span>
      <span className="dashboard__body__id">
        {'remoteID' in job && job.remoteID}
      </span>
    </Card>
  );
});

export default Row;
