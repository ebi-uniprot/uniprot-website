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
} from 'franklin-sites';

import { Job, FinishedJob } from '../../blast/types/blastJob';
import { Status } from '../../blast/types/blastStatuses';

import { updateJobTitle, deleteJob } from '../../state/toolsActions';

import { LocationToPath, Location } from '../../../app/config/urls';
import { getBEMClassName as bem } from '../../../shared/utils/utils';

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
      dispatch(updateJobTitle(id, text));
    }
  };

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  }, []);

  return (
    <>
      <input
        onClick={stopPropagation}
        onBlur={handleBlur}
        onChange={handleChange}
        autoComplete="off"
        type="text"
        value={text}
        aria-label="job name"
        maxLength={22}
      />
      <EditIcon width="2ch" />
    </>
  );
};

interface TimeProps {
  children: number;
}

const Time: FC<TimeProps> = ({ children }) => {
  const date = new Date(children);
  const YYYY = date.getFullYear();
  const MM = `${date.getMonth()}`.padStart(2, '0');
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
  children: Status;
  hits?: FinishedJob['data']['hits'];
  queriedHits: FinishedJob['parameters']['hits'];
  errorDescription?: string;
}

const NiceStatus: FC<NiceStatusProps> = ({
  children,
  hits,
  queriedHits,
  errorDescription,
}) => {
  switch (children) {
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
          <br />
          <span className="dashboard__body__notify_message">
            {errorDescription}
          </span>
        </>
      );
    case Status.FINISHED: {
      if (hits === queriedHits) return <>Successful</>;
      const hitText = `hit${hits === 1 ? '' : 's'}`;
      return (
        <>
          Successful{' '}
          <span
            title={`${hits} ${hitText} results found instead of the requested ${queriedHits}`}
          >
            ({hits} {hitText})
          </span>
        </>
      );
    }
    default:
      return null;
  }
};

interface ActionsProps {
  parameters: Job['parameters'];
  onDelete(): void;
}

const Actions: FC<ActionsProps> = ({ parameters, onDelete }) => {
  const history = useHistory();

  return (
    <span className="dashboard__body__actions">
      <button
        type="button"
        title="resubmit this job"
        onClick={(event) => {
          event.stopPropagation();
          history.push(LocationToPath[Location.Blast], { parameters });
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
}

interface CustomLocationState {
  parameters?: Job['parameters'];
}

const Row: FC<RowProps> = memo(({ job }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const ref = useRef<HTMLElement>(null);
  const firstTime = useRef<boolean>(true);

  let jobLink: string | undefined;
  if ('remoteID' in job) {
    jobLink = `${LocationToPath[Location.Blast]}/${job.remoteID}/overview`;
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
    if (
      job.parameters !==
        (history.location?.state as CustomLocationState)?.parameters ||
      !(ref.current && 'animate' in ref.current)
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
  // job.status = Status.FAILURE;
  return (
    <Card
      onClick={handleClick}
      ref={ref}
      className={bem({
        b: 'card',
        m:
          (job.status === Status.FAILURE || job.status === Status.ERRORED) &&
          'failure',
      })}
    >
      <span className="dashboard__body__name">
        <Name id={job.internalID}>{job.title}</Name>
      </span>
      <span className="dashboard__body__type">{job.type}</span>
      <span className="dashboard__body__time">
        {'timeSubmitted' in job && job.timeSubmitted && (
          <Time>{job.timeSubmitted}</Time>
        )}
      </span>
      <span className="dashboard__body__status">
        <NiceStatus
          hits={'data' in job ? job.data.hits : undefined}
          queriedHits={job.parameters.hits}
          errorDescription={
            'errorDescription' in job ? job.errorDescription : undefined
          }
        >
          {job.status}
        </NiceStatus>
      </span>
      <span className="dashboard__body__actions">
        <Actions parameters={job.parameters} onDelete={handleDelete} />
      </span>
      <span className="dashboard__body__id">
        {'remoteID' in job && jobLink && (
          <Link to={jobLink}>{job.remoteID}</Link>
        )}
      </span>
    </Card>
  );
});

export default Row;
