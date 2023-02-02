import { Bubble } from 'franklin-sites';

import { getBEMClassName as bem } from '../../utils/utils';

import {
  ColumnSelectTab,
  SelectedColumn,
} from '../../../uniprotkb/types/resultsTypes';

type TabTitleProps = {
  tabId: ColumnSelectTab;
  columns: SelectedColumn[];
};

const TabTitle = ({ tabId, columns }: TabTitleProps) => (
  <div
    className={bem({
      b: 'column-select',
      e: 'tab-title',
    })}
  >
    {tabId}
    <Bubble
      size="small"
      className={bem({
        b: 'column-select',
        e: ['tab-title', 'count'],
        m: columns.length ? 'visible' : 'hidden',
      })}
    >
      {columns.length}
    </Bubble>
  </div>
);

export default TabTitle;
