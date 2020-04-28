import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { v1 } from 'uuid';
import { render } from '@testing-library/react';
import EntryPublications from '../EntryPublications';
import publicationsData from '../__mocks__/entryPublicationsData.json';

let component;

describe('EntryPublications tests', () => {
  beforeEach(() => {
    component = render(
      <Router>
        <EntryPublications
          accession="P05067"
          data={publicationsData.results.map(publication => ({
            ...publication,
            id: v1(),
          }))}
          total={2388}
          handleLoadMoreItems={jest.fn()}
        />
      </Router>
    );
  });

  it('should render', () => {
    const { asFragment } = component;
    expect(asFragment()).toMatchSnapshot();
  });
});
