import { Loader } from 'franklin-sites';
import { memo } from 'react';
import { useLocation } from 'react-router-dom';

import { Facets } from '../../../shared/components/results/Facets';
import useDataApiWithStale from '../../../shared/hooks/useDataApiWithStale';
import helper from '../../../shared/styles/helper.module.scss';
import { getParamsFromURL } from '../../../uniprotkb/utils/resultsUtils';
import apiUrls from '../../config/apiUrls';
import {
  uniRefMembersFacets,
  UniRefMembersResults,
} from '../../types/membersEndpoint';

const MembersFacet = memo<{ accession: string }>(({ accession }) => {
  const { search } = useLocation();
  const [{ selectedFacets }] = getParamsFromURL(search);

  const selectedFacetsStrings = selectedFacets.map(
    (facet) => `${facet.name}:${facet.value}`
  );
  const facetsURL = apiUrls.members(accession, false, {
    facets: uniRefMembersFacets,
    selectedFacets: selectedFacetsStrings,
    size: 0,
  });

  const { loading, data, isStale } =
    useDataApiWithStale<UniRefMembersResults>(facetsURL);

  if (loading && !data) {
    return <Loader />;
  }

  if (!data) {
    return null;
  }

  return (
    <Facets data={data.facets} className={isStale ? helper.stale : undefined} />
  );
});

export default MembersFacet;
