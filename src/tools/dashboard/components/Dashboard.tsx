import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Card,
  PageIntro,
  ClockIcon,
  Message,
  ReSubmitIcon,
} from 'franklin-sites';
import { partition } from 'lodash-es';

import Row from './Row';

import { LocationToPath, Location } from '../../../app/config/urls';

import { RootState } from '../../../app/state/rootInitialState';
import { Job } from '../../types/toolsJob';

import ArtWork from '../../svg/no-blast-results.svg';

import './styles/Dashboard.scss';
import '../../../shared/components/error-pages/styles/error-pages.scss';

const EXPIRED_TIME = 1000 * 60 * 60 * 24 * 7; // 1 week

const sortNewestFirst = (a: Job, b: Job) => b.timeCreated - a.timeCreated;

const Dashboard = () => {
  const jobs = useSelector<RootState, Job[]>((state) =>
    Object.values(state.tools)
  ).sort(sortNewestFirst);

  if (!jobs.length) {
    const noResultsSubtitle = (
      <div>
        Try using <Link to={LocationToPath[Location.Blast]}>BLAST</Link>,{' '}
        <Link to={LocationToPath[Location.Align]}>Align</Link>,{' '}
        <Link to={LocationToPath[Location.IDMap]}>ID Mapping/Retrieve</Link> or{' '}
        <Link to={LocationToPath[Location.PeptideSearch]}>Peptide Search</Link>{' '}
        to begin
      </div>
    );
    return (
      <>
        <PageIntro title="Tool results" />
        <div className="error-page-container">
          <ArtWork className="error-page-container__art-work" />
          <Message level="warning" subtitle={noResultsSubtitle} forFullPage>
            No results available. Your UniProt tool results will be shown here
          </Message>
        </div>
      </>
    );
  }

  const now = Date.now();
  const [activeJobs, expiredJobs] = partition(
    jobs,
    (job) => now - job.timeCreated < EXPIRED_TIME
  );

  return (
    <>
      <PageIntro title="Tool results" />
      <p>
        Your tool analysis results from the last{' '}
        <ClockIcon height="1em" width="3ch" /> 7 days are listed below. For any
        tools still running, you can navigate away to other pages and will be
        notified once the job is finished.
      </p>
      <div className="dashboard">
        <div className="dashboard__header">
          <Card>
            <span>Name</span>
            <span>Job type</span>
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
    </>
  );
};

export default Dashboard;
