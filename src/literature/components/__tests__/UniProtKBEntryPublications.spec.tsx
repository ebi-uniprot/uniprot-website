import React from 'react';
import renderWithRedux from '../../../__testHelpers__/renderWithRedux';
import UniProtKBEntryPublications from '../UniProtKBEntryPublications';
import entryData from '../../../model/__mocks__/entryModelData.json';
import entryInitialState from '../../../entry/state/entryInitialState';

describe('UniProtKBEntryPublications', () => {
  it('Should render', () => {
    const { asFragment } = renderWithRedux(
      <UniProtKBEntryPublications pubmedIds={['12345']} />,
      {
        initialState: {
          entry: { ...entryInitialState, accession: 'P05067', data: entryData },
        },
      }
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
