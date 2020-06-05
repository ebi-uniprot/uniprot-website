import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Loader, PageIntro } from 'franklin-sites';

import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';

import useDataApi from '../../../shared/hooks/useDataApi';

import { Location, LocationToPath } from '../../../app/config/urls';
import blastUrls from '../config/blastUrls';
import SingleColumnLayout from '../../../shared/components/layouts/SingleColumnLayout';
import BlastResultTable from './BlastResultTable';

type Match = {
  params: {
    id: string;
  };
};

const BlastResult = () => {
  const match = useRouteMatch(LocationToPath[Location.BlastResult]) as Match;
  const { loading, data, error, status } = useDataApi(
    blastUrls.resultUrl(match.params.id)
  );

  if (loading) return <Loader />;

  if (error) return <ErrorHandler status={status} />;

  return (
    <SingleColumnLayout>
      <PageIntro title="BLAST Results" />
      <p>Blast results for {match.params.id}</p>
      <BlastResultTable data={data} />
    </SingleColumnLayout>
  );
};

export default BlastResult;
