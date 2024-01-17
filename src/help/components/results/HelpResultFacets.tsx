import { FC, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { help as helpURL } from '../../../shared/config/apiUrls';
import ResultsFacets from '../../../shared/components/results/ResultsFacets';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';

import useDataApiWithStale from '../../../shared/hooks/useDataApiWithStale';

import { HelpSearchResponse } from '../../types/apiModel';

const HelpResultFacets: FC = () => {
  const { search } = useLocation();

  const parsed = Object.fromEntries(new URLSearchParams(search));

  const dataObject = useDataApiWithStale<HelpSearchResponse>(
    helpURL.search({
      ...parsed,
      queryFacets: parsed.facets,
      facets: 'category',
    })
  );

  const fallBackAppliedFacets = useMemo(() => {
    const sp = new URLSearchParams(search);
    const facets = sp.get('facets');
    const facetValues = facets || '';
    return {
      loading: false,
      data: facetValues
        ? {
            facets: [
              {
                label: 'Category',
                name: 'category',
                allowMultipleSelection: true,
                values: facetValues.split(',').map((value) => ({
                  value: value.replace('category:', ''),
                  count: 0,
                })),
              },
            ],
          }
        : undefined,
    };
  }, [search]);

  const { status, error } = dataObject;

  if (error) {
    return <ErrorHandler status={status} />;
  }

  return (
    <ResultsFacets
      dataApiObject={
        dataObject.data?.facets ? dataObject : fallBackAppliedFacets
      }
    />
  );
};

export default HelpResultFacets;
