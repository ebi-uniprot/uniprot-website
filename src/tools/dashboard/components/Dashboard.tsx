import { useMemo } from 'react';
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

import { useToolsState } from '../../../shared/contexts/Tools';

import { LocationToPath, Location } from '../../../app/config/urls';

import { Job } from '../../types/toolsJob';

import './styles/Dashboard.scss';

const EXPIRED_TIME = 1000 * 60 * 60 * 24 * 7; // 1 week

const sortNewestFirst = (a: Job, b: Job) => b.timeCreated - a.timeCreated;

const Dashboard = ({ closePanel }: { closePanel?: () => void }) => {
  const tools = useToolsState();

  const [activeJobs, expiredJobs] = useMemo(() => {
    const jobs = Array.from(Object.values(tools)).sort(sortNewestFirst);
    const now = Date.now();
    return partition(jobs, (job) => now - job.timeCreated < EXPIRED_TIME);
  }, [tools]);

  const fullPageContent = closePanel ? null : (
    <>
      <HTMLHead title="Tool results" />
      <PageIntro title="Tool results" />
    </>
  );

  if (!(activeJobs.length || expiredJobs.length)) {
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
      <p>
        Your tool analysis results from the last{' '}
        <ClockIcon height="1em" width="3ch" /> 7 days are listed below. For any
        tools still running, you can navigate away to other pages and will be
        notified once the job is finished.
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
              Below your previous jobs that have now expired. You can still
              resubmit them &nbsp;
              <ReSubmitIcon width="1em" />. They will be completely deleted 14
              days after their initial submission, unless you save them ★.
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
            onClick={closePanel}
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
