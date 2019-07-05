import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ResultsTable from '../ResultsTable';

configure({ adapter: new Adapter() });

let wrapper;
let props;

describe('ResultsTable component', () => {
  beforeEach(() => {
    props = {
      tableColumns: ['accession'],
      results: [{ accession: '1234' }, { accession: '5678' }],
      sort: { column: 'accession', direction: 'descend' },
    };
    wrapper = shallow(<ResultsTable {...props} />);
  });

  test('should render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
