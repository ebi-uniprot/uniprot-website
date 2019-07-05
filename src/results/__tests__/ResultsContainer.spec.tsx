import React from 'react';
import '@babel/polyfill';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Results } from '../ResultsContainer';
import { Namespace } from '../../search/types/searchTypes';

configure({ adapter: new Adapter() });

let wrapper;
let props;

const facetString = 'f1:v1,f2:v2';
const facetArray = [{ name: 'f1', value: 'v1' }, { name: 'f2', value: 'v2' }];

describe('Results component', () => {
  beforeEach(() => {
    props = {
      tableColumns: [],
      results: [],
      isFetching: false,
      namespace: Namespace.uniprotkb,
      dispatchFetchBatchOfResultsIfNeeded: jest.fn(),
      dispatchClearResults: jest.fn(),
      dispatchReset: jest.fn(),
      location: {
        search: '',
      },
      history: {
        push: jest.fn(),
        replace: jest.fn(),
      },
    };
    wrapper = shallow(<Results {...props} />);
  });

  test('should call to get results', () => {
    expect(props.dispatchFetchBatchOfResultsIfNeeded).toHaveBeenCalled();
  });

  test('should update if query changes', () => {
    wrapper.setProps({ location: { search: 'query=cdc8' } });
    expect(props.dispatchFetchBatchOfResultsIfNeeded).toHaveBeenCalledTimes(2);
  });

  test('should get the facets as a string', () => {
    expect(wrapper.instance().facetsAsString(facetArray)).toBe(
      `&facets=${facetString}`
    );
  });

  test('should get the facets as an array', () => {
    expect(wrapper.instance().facetsAsArray(facetString)).toEqual(facetArray);
  });

  test('should add facet', () => {
    wrapper.instance().addFacet('blah', 'blah');
    expect(props.history.push).toHaveBeenCalledWith({
      pathname: '/uniprotkb',
      search: 'query=&facets=blah:blah',
    });
  });

  test('should remove a facet', () => {
    wrapper.setProps({
      location: { search: 'query=cdc8&facets=blah:blah,blah2:blah2' },
    });
    wrapper.instance().removeFacet('blah', 'blah');
    expect(props.history.push).toHaveBeenCalledWith({
      pathname: '/uniprotkb',
      search: 'query=cdc8&facets=blah2:blah2',
    });
  });

  test('should remove last facet', () => {
    wrapper.setProps({ location: { search: 'query=cdc8&facets=blah:blah' } });
    wrapper.instance().removeFacet('blah', 'blah');
    expect(props.history.push).toHaveBeenCalledWith({
      pathname: '/uniprotkb',
      search: 'query=cdc8',
    });
  });

  test('should sort column', () => {
    wrapper.setProps({ location: { search: 'query=cdc8&sort=accession' } });
    wrapper.instance().updateColumnSort('name');
    expect(props.history.push).toHaveBeenCalledWith({
      pathname: '/uniprotkb',
      search: 'query=cdc8&sort=name',
    });
  });

  test('should set different sort direction', () => {
    wrapper.setProps({
      location: { search: 'query=cdc8&sort=accession' },
    });
    wrapper.instance().updateColumnSort('accession');
    expect(props.history.push).toHaveBeenCalledWith({
      pathname: '/uniprotkb',
      search: 'query=cdc8&sort=accession&dir=ascend',
    });
  });

  test('should update sort direction', () => {
    wrapper.setProps({
      location: { search: 'query=cdc8&sort=accession&dir=ascend' },
    });
    wrapper.instance().updateColumnSort('accession');
    expect(props.history.push).toHaveBeenCalledWith({
      pathname: '/uniprotkb',
      search: 'query=cdc8&sort=accession&dir=descend',
    });
  });

  test('should handle row selection', () => {
    wrapper.instance().handleRowSelect('2');
    wrapper.instance().handleRowSelect('6');
    expect(wrapper.state().selectedRows).toEqual({ 2: true, 6: true });
  });

  test('should handle row deselection', () => {
    wrapper.instance().handleRowSelect('2');
    wrapper.instance().handleRowSelect('2');
    expect(wrapper.state().selectedRows).toEqual({});
  });

  test('should dispatch reset on unmount', () => {
    wrapper.unmount();
    expect(props.dispatchReset).toBeCalled();
  });
});
