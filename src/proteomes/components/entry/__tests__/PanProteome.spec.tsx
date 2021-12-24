import { screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import customRender from '../../../../shared/__test-helpers__/customRender';

import { PanProteome } from '../PanProteome';

const mock = new MockAdapter(axios);

describe('PanProteome', () => {
  it('should immediately render pan-proteome name if entry is pan proteome and with link', () => {
    const { asFragment } = customRender(
      <PanProteome
        panproteome="UP1"
        id="UP1"
        taxonomy={{ taxonId: 12345, scientificName: 'Some Name' }}
      />
    );
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByRole('link', { name: 'FASTA' })).toBeInTheDocument();
    expect(screen.getByText('Some Name')).toBeInTheDocument();
  });
  it('should request pan-proteome data if different to entry, temporarily display name from props and display pan-proteome name once loaded', async () => {
    mock.onGet().reply(200, {
      id: 'UP2',
      taxonomy: {
        scientificName: 'Another Name',
      },
    });
    customRender(
      <PanProteome
        panproteome="UP1"
        id="UP2"
        taxonomy={{ taxonId: 12345, scientificName: 'Some Name' }}
      />
    );
    let name = screen.getByText('Some Name');
    expect(name).toBeInTheDocument();
    name = await screen.findByText('Another Name');
    expect(name).toBeInTheDocument();
  });
  it('should request pan-proteome data if different to entry and display pan-proteome ID if scientific name not in response data', async () => {
    mock.onGet().reply(200, {
      id: 'UP2',
      taxonomy: {},
    });
    customRender(
      <PanProteome
        panproteome="UP1"
        id="UP2"
        taxonomy={{ taxonId: 12345, scientificName: 'Some Name' }}
      />
    );
    let name = screen.getByText('Some Name');
    expect(name).toBeInTheDocument();
    name = await screen.findByText('UP1');
    expect(name).toBeInTheDocument();
  });
});
