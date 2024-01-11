import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  Button,
  PageIntro,
  ClockIcon,
  ReSubmitIcon,
  FullViewIcon,
} from 'franklin-sites';
import { partition } from 'lodash-es';

import HTMLHead from '../../../shared/components/HTMLHead';
import Row from './Row';
import EmptyDashboard from './EmptyDashboard';
import DowntimeWarning from '../../components/DowntimeWarning';

import useToolsState from '../../../shared/hooks/useToolsState';
import useToolsDispatch from '../../../shared/hooks/useToolsDispatch';

import { pollJobs } from '../../state/toolsActions';

import { LocationToPath, Location } from '../../../app/config/urls';

import { Job } from '../../types/toolsJob';

import './styles/Dashboard.scss';
import { heuristic } from '../../state/utils/heuristic';

const EXPIRED_TIME = 1000 * 60 * 60 * 24 * 7; // 1 week

const sortNewestFirst = (a: Job, b: Job) => b.timeCreated - a.timeCreated;

const Dashboard = ({ onFullView }: { onFullView?: () => void }) => {
  const tools = useToolsState();
  const dispatch = useToolsDispatch();

  const [activeJobs, expiredJobs] = useMemo(() => {
    const jobs = Array.from(Object.values(tools ?? {})).sort(sortNewestFirst);
    const now = Date.now();
    return partition(jobs, (job) => now - job.timeCreated < EXPIRED_TIME);
  }, [tools]);

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        dispatch(pollJobs());
        heuristic.dashboardSpeedUpFactor = 4;
      } else {
        heuristic.dashboardSpeedUpFactor = 1;
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    heuristic.dashboardSpeedUpFactor = 4;
    onVisibilityChange();
    return () => {
      heuristic.dashboardSpeedUpFactor = 1;
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [dispatch]);

  const fullPageContent = onFullView ? null : (
    <>
      <HTMLHead title="Tool results">
        <meta name="robots" content="noindex" />
      </HTMLHead>
      <PageIntro title="Tool results" />
    </>
  );

  const hasJobs = Boolean(activeJobs.length || expiredJobs.length);

  if (!hasJobs) {
    return (
      <>
        {fullPageContent}
        <EmptyDashboard />
      </>
    );
  }

  return (
    <>
      {fullPageContent}
      <DowntimeWarning>Align and BLAST service</DowntimeWarning>
      <p>
        Your tool analysis results from the last{' '}
        <ClockIcon height="1em" width="3ch" /> 7 days are listed below. If you
        have tools jobs running, you can navigate away to other pages and you
        will be notified once the job is completed.
      </p>
      <div className="dashboard">
        <div className="dashboard__header">
          <Card>
            <span>Job type</span>
            <span>Name</span>
            <span>Created</span>
            <span>Status</span>
          </Card>
        </div>
        <div className="dashboard__body">
          {activeJobs.map((job) => (
            <Row job={job} key={job.internalID} />
          ))}
        </div>
        {expiredJobs.length ? (
          <>
            <br />
            <p>
              Your expired jobs are listed below. You can still resubmit
              them&nbsp;
              <ReSubmitIcon width="1em" />. These jobs will be deleted 14 days
              after their submission date, unless you save them by clicking the
              star icon ★.
            </p>
            <div className="dashboard__body">
              {expiredJobs.map((job) => (
                <Row job={job} key={job.internalID} hasExpired />
              ))}
            </div>
          </>
        ) : null}
      </div>
      {!fullPageContent && (
        // both classnames from Franklin
        <div className="button-group sliding-panel__button-row">
          <Button
            element={Link}
            variant="secondary"
            to={LocationToPath[Location.Dashboard]}
            onClick={onFullView}
          >
            <FullViewIcon height="1em" width="1em" />
            Full view
          </Button>
        </div>
      )}
    </>
  );
};

export default Dashboard;
