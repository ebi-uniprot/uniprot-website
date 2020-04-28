import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import EntryPublicationsFacets from '../EntryPublicationsFacets';
import publicationsData from '../__mocks__/entryPublicationsData.json';

let component;
const setSelectedFacets = jest.fn();
const selectedFacets = [{ name: 'study_type', value: 'large_scale' }];

describe('EntryPublications tests', () => {
  beforeEach(() => {
    component = render(
      <Router>
        <EntryPublicationsFacets
          facets={publicationsData.facets}
          selectedFacets={selectedFacets}
          setSelectedFacets={setSelectedFacets}
        />
      </Router>
    );
  });

  it('should render', () => {
    const { asFragment } = component;
    expect(asFragment()).toMatchSnapshot();
  });

  it('should add facet', () => {
    const { getByText } = component;
    fireEvent.click(getByText(/Small/));
    expect(setSelectedFacets).toHaveBeenCalledTimes(1);
  });

  it('should remove facet', () => {
    const { getByText } = component;
    fireEvent.click(getByText(/Large/));
    expect(setSelectedFacets).toHaveBeenCalledTimes(2);
  });
});
