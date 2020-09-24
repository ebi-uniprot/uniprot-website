import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { PageIntro } from 'franklin-sites';

import AdvancedSearch from './AdvancedSearch';

import '../../uniprotkb/components/search/styles/search-container.scss';

const Search: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <PageIntro title="Advanced search" />
      <AdvancedSearch />
    </>
  );
};

const AdvancedSearchContainer = withRouter(Search);

export default AdvancedSearchContainer;
