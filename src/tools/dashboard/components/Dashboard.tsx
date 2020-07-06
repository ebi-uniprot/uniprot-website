import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, PageIntro, ClockIcon, Message } from 'franklin-sites';

import Row from './Row';

import { Job } from '../../types/toolsJob';
import { ToolsState } from '../../state/toolsInitialState';

import ArtWork from '../../svg/no-blast-results.svg';

import './styles/Dashboard.scss';
import '../../../shared/components/error-pages/styles/error-pages.scss';
import { LocationToPath, Location } from '../../../app/config/urls';

const sortNewestFirst = (a: Job, b: Job) => b.timeCreated - a.timeCreated;

const Dashboard = () => {
  const jobs = (useSelector((state: ToolsState) =>
    Object.values(state.tools)
  ) as Job[]).sort(sortNewestFirst);
  // const tools: Array<Job> = [
  //   created,
  //   failedBeforeSubmission,
  //   failedAfterSubmission,
  //   finished,
  //   running,
  // ];

  const noResultsSubtitle = (
    <div>
      Try using <Link to={LocationToPath[Location.Blast]}>BLAST</Link>,{' '}
      <Link to={LocationToPath[Location.Align]}>Align</Link>,{' '}
      <Link to={LocationToPath[Location.IDMap]}>ID Mapping/Retrieve</Link> or{' '}
      <Link to={LocationToPath[Location.PeptideSearch]}>Peptide Search</Link> to
      begin
    </div>
  );

  return (
    <>
      <PageIntro title="Tool results" />
      {jobs && jobs.length > 0 ? (
        <>
          <p>
            Your tool analysis results from the last{' '}
            <ClockIcon height="1em" width="3ch" /> 7 days are listed below. For
            any tools still running, you can navigate away to other pages and
            will be notified once the job is finished.
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
              {jobs.map((job) => (
                <Row job={job} key={job.internalID} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="error-page-container">
          <ArtWork className="error-page-container__art-work" />
          <Message level="warning" subtitle={noResultsSubtitle} forFullPage>
            No results available. Your UniProt tool results will be shown here
          </Message>
        </div>
      )}
    </>
  );
};

export default Dashboard;
