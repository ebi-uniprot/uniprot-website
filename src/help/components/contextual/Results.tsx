import { Link, RouteChildrenProps } from 'react-router-dom';
import { InfoList, Loader } from 'franklin-sites';
import qs from 'query-string';

import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import NoResultsPage from '../../../shared/components/error-pages/NoResultsPage';
import CleanHighlightMarkDown from '../results/CleanHighlightMarkDown';

import useDataApiWithStale from '../../../shared/hooks/useDataApiWithStale';

import { help as helpURL } from '../../../shared/config/apiUrls';

import { HelpSearchResponse } from '../../adapters/helpConverter';
import { Location, getLocationEntryPath } from '../../../app/config/urls';

const Results = ({ location }: RouteChildrenProps) => {
  const { query } = qs.parse(location.search);
  const { data, loading, error, status, progress } =
    useDataApiWithStale<HelpSearchResponse>(query && helpURL.search({ query }));

  const infoData = data?.results?.map(({ matches, title, id }) => {
    const titleMatch = matches?.title?.[0];
    const contentMatch = matches?.content?.[0];
    const to = getLocationEntryPath(Location.HelpEntry, id);
    return {
      title: (
        <Link to={to}>
          {titleMatch ? <CleanHighlightMarkDown md={titleMatch} /> : title}
        </Link>
      ),
      content: contentMatch ? (
        <CleanHighlightMarkDown md={contentMatch} />
      ) : (
        ' '
      ),
      to,
    };
  });

  if (error || (!loading && !data)) {
    return <ErrorHandler status={status} />;
  }

  if (!data) {
    return <Loader progress={progress} />;
  }

  if (infoData?.length && query) {
    return <InfoList infoData={infoData} />;
  }

  return <NoResultsPage />;
};

export default Results;
