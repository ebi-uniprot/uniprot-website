import React, {
  memo,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
  MouseEvent,
  KeyboardEvent,
  ChangeEvent,
  FC,
} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Card,
  ReSubmitIcon,
  BinIcon,
  SpinnerIcon,
  EditIcon,
  WarningTriangleIcon,
} from 'franklin-sites';

import { updateJob, deleteJob } from '../../state/toolsActions';

import { jobTypeToPath } from '../../../app/config/urls';

import { getBEMClassName as bem } from '../../../shared/utils/utils';

import { Job } from '../../types/toolsJob';
import { Status } from '../../types/toolsStatuses';

import './styles/Dashboard.scss';

const stopPropagation = (
  event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>
) => event.stopPropagation();

interface NameProps {
  id: Job['internalID'];
  children: Job['title'];
}

const Name: FC<NameProps> = ({ children, id }: NameProps) => {
  const dispatch = useDispatch();
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
      <EditIcon width="2ch" />
    </label>
  );
};

interface TimeProps {
  children: number;
}

const Time: FC<TimeProps> = ({ children }) => {
  const date = new Date(children);
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

interface NiceStatusProps {
  job: Job;
  jobLink?: string;
}

const NiceStatus: FC<NiceStatusProps> = ({ job, jobLink }) => {
  switch (job.status) {
    case Status.CREATED:
    case Status.RUNNING:
      return (
        <>
          Running <SpinnerIcon width="12" height="12" />
          <br />
          <span className="dashboard__body__notify_message">
            We&apos;ll notify you when it&apos;s done
          </span>
        </>
      );
    case Status.FAILURE:
    case Status.ERRORED:
      return (
        <>
          Failed
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
      const link = jobLink ? <Link to={jobLink}>Successful</Link> : null;
      if (
        // not a blast job, or
        !('data' in job && 'hits' in job.data && 'hits' in job.parameters) ||
        // same number of hits than queried
        job.data.hits === job.parameters.hits
      ) {
        return link;
      }
      const hitText = `hit${job.data.hits === 1 ? '' : 's'}`;
      return (
        <>
          {link}{' '}
          <span
            title={`${job.data.hits} ${hitText} results found instead of the requested ${job.parameters.hits}`}
          >
            ({job.data.hits} {hitText})
          </span>
        </>
      );
    }
    default:
      return null;
  }
};

interface ActionsProps {
  job: Job;
  onDelete(): void;
}

const Actions: FC<ActionsProps> = ({ job, onDelete }) => {
  const history = useHistory();
  const dispatch = useDispatch();

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
          const formPath = jobTypeToPath(job.type);
          if (formPath) {
            history.push(formPath, { parameters: job.parameters });
          }
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
  transform: ['translateX(0)', 'translateX(-2ch)', 'translateX(75%)'],
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

const Row: FC<RowProps> = memo(({ job, hasExpired }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const ref = useRef<HTMLElement>(null);
  const firstTime = useRef<boolean>(true);

  let jobLink: string | undefined;
  if ('remoteID' in job && job.status === Status.FINISHED && !hasExpired) {
    jobLink = `${jobTypeToPath(job.type)}/${job.remoteID}/overview`;
  }

  const handleClick = () => {
    if (!jobLink) {
      return;
    }
    history.push(jobLink);
  };

  const handleDelete = () => {
    if (!(ref.current && 'animate' in ref.current)) {
      dispatch(deleteJob(job.internalID));
      return;
    }
    ref.current.animate(
      KeyframesForDelete,
      animationOptionsForDelete
    ).onfinish = () => dispatch(deleteJob(job.internalID));
  };

  // if the state of the current location contains the parameters from this job,
  // it means we just arrived from a submission form page and this is the job
  // that was just added, animate it to have it visually represented as "new"
  useLayoutEffect(() => {
    if (!(ref.current && 'animate' in ref.current)) {
      return;
    }
    if (
      !(history.location?.state as CustomLocationState)?.parameters?.includes(
        job.parameters
      )
    ) {
      return;
    }
    ref.current.animate(keyframesForNew, animationOptionsForNew);
  }, [history, job.parameters]);

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

  return (
    <Card
      onClick={handleClick}
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
