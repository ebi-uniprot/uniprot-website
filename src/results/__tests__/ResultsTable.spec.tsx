import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ResultsTable from '../ResultsTable';
import { ViewMode } from '../state/resultsInitialState';

configure({ adapter: new Adapter() });

describe('ResultsTable component', () => {
  test('should render table', () => {
    const props = {
      viewMode: ViewMode.TABLE,
      tableColumns: ['accession'],
      selectedRows: {},
      results: [{ accession: '1234' }, { accession: '5678' }],
      sort: { column: 'accession', direction: 'descend' },
      handleRowSelect: jest.fn(),
      handleHeaderClick: jest.fn(),
      handleLoadMoreRows: jest.fn(),
      totalNumberResults: 2,
      sortColumn: null,
      sortDirection: null,
    };
    const wrapper = shallow(<ResultsTable {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should render cards', () => {
    const props = {
      viewMode: ViewMode.CARD,
      tableColumns: ['accession'],
      selectedRows: {},
      results: [{ accession: '1234' }, { accession: '5678' }],
      sort: { column: 'accession', direction: 'descend' },
      handleRowSelect: jest.fn(),
      handleHeaderClick: jest.fn(),
      handleLoadMoreRows: jest.fn(),
      totalNumberResults: 2,
      sortColumn: null,
      sortDirection: null,
    };
    const wrapper = shallow(<ResultsTable {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
