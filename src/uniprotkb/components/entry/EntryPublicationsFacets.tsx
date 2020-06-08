import React from 'react';
import { Facets, Loader } from 'franklin-sites';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { SelectedFacet } from '../../types/resultsTypes';
import { getUniProtPublicationsQueryUrl } from '../../config/apiUrls';
import useDataApi from '../../../shared/hooks/useDataApi';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import { facetsAsString, getParamsFromURL } from '../../utils/resultsUtils';

const EntryPublicationsFacets: React.FC<{
  accession: string;
} & RouteComponentProps> = ({ accession, history, location }) => {
  const { search } = location;
  const { selectedFacets } = getParamsFromURL(search);
  const url = getUniProtPublicationsQueryUrl(accession, selectedFacets);
  const { loading, data, status, error } = useDataApi(url);

  const addFacet = (name: string, value: string) => {
    const facet: SelectedFacet = { name, value };
    history.push({
      pathname: `/uniprotkb/${accession}/publications`,
      search: facetsAsString([...selectedFacets.concat(facet)]),
    });
  };

  const removeFacet = (name: string, value: string) => {
    history.push({
      pathname: `/uniprotkb/${accession}/publications`,
      search: facetsAsString(
        selectedFacets.filter(
          selectedFacet =>
            !(selectedFacet.name === name && selectedFacet.value === value)
        )
      ),
    });
  };

  if (error) {
    return <ErrorHandler status={status} />;
  }

  if (loading || !data) {
    return <Loader />;
  }

  const { facets } = data;

  return (
    <Facets
      data={facets}
      addFacet={addFacet}
      removeFacet={removeFacet}
      selectedFacets={selectedFacets}
    />
  );
};

export default withRouter(EntryPublicationsFacets);
