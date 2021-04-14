import { FC } from 'react';

import ResultsView from './ResultsView';
import ResultsFacets from './ResultsFacets';

import SideBarLayout from '../layouts/SideBarLayout';

import './styles/results-table.scss';

export enum ViewMode {
  TABLE,
  CARD,
}

const Results: FC = () => (
  <SideBarLayout sidebar={<ResultsFacets />}>
    <ResultsView />
  </SideBarLayout>
);

export default Results;
