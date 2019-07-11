import 'core-js/stable';
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HomePage from '../HomePage';

configure({ adapter: new Adapter() });

describe('HomePage component', () => {
  test('should render', () => {
    const component = shallow(<HomePage />);
    expect(component).toMatchSnapshot();
  });
});
