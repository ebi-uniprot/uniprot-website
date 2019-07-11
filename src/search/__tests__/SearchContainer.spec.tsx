import React from 'react';
import 'core-js/stable';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Search } from '../SearchContainer';

configure({ adapter: new Adapter() });

let wrapper;
let props;

describe('Search shallow components', () => {
  beforeEach(() => {
    props = {
      dispatchCopyQueryClausesToSearch: jest.fn(),
      location: {
        search: '',
      },
      history: {
        push: jest.fn(),
        replace: jest.fn(),
      },
    };
    wrapper = shallow(<Search {...props} />);
  });

  test('should render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
