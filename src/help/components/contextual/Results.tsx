import { Link, RouteChildrenProps } from 'react-router-dom';
import { InfoList } from 'franklin-sites';
import qs from 'query-string';

import CleanHighlightMarkDown from '../results/CleanHighlightMarkDown';

import useDataApiWithStale from '../../../shared/hooks/useDataApiWithStale';

import { help as helpURL } from '../../../shared/config/apiUrls';

import { HelpSearchResponse } from '../../adapters/helpConverter';
import { Location, getLocationEntryPath } from '../../../app/config/urls';

const Results = ({ location }: RouteChildrenProps) => {
  const { query } = qs.parse(location.search);
  const dataObject = useDataApiWithStale<HelpSearchResponse>(
    query && helpURL.search({ query })
  );

  const allArticles = dataObject?.data?.results;
  const infoData = allArticles?.map(({ matches, title, id }) => {
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

  if (!!allArticles?.length && !!infoData?.length && query) {
    return <InfoList infoData={infoData} />;
  }

  return null;
};

export default Results;
