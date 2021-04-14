import { FC } from 'react';

import ResultsData from './ResultsData';
import ResultsFacets from './ResultsFacets';

import SideBarLayout from '../layouts/SideBarLayout';

import './styles/results-table.scss';

const Results: FC = () => (
  <SideBarLayout sidebar={<ResultsFacets />}>
    <ResultsData />
  </SideBarLayout>
);

export default Results;
