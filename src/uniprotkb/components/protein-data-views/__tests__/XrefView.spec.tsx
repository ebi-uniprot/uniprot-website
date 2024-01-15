import { screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import customRender from '../../../../shared/__test-helpers__/customRender';

import XRefView, {
  getPropertyString,
  getPropertyLinkAttributes,
} from '../XRefView';

import { PropertyKey } from '../../../types/modelTypes';
import { DatabaseInfoPoint } from '../../../types/databaseRefs';

import xrefs from './__mocks__/xrefUIData';
import databaseInfo from '../../../utils/__tests__/__mocks__/databaseInfo';

const mock = new MockAdapter(axios);
mock.onGet(/\/configure\/uniprotkb\/allDatabases/).reply(200, databaseInfo);

describe('XRefView', () => {
  it(`should render section`, () => {
    const { asFragment } = customRender(
      <XRefView xrefs={xrefs.standard} primaryAccession="P01234" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  // TODO: remove skip when TRM-29539 is fixed
  it.skip(`should remove duplicate links`, () => {
    customRender(
      <XRefView xrefs={xrefs.duplicateLink} primaryAccession="P0A879" />
    );
    expect(screen.getAllByText(/BAA14793/)).toHaveLength(1);
  });
});

describe('getPropertyLinkAttributes', () => {
  it('should create snapshot', () => {
    const databaseInfoPoint: DatabaseInfoPoint = {
      name: 'Ensembl eukaryotic genome annotation project',
      displayName: 'Ensembl',
      category: 'GMA',
      uriLink: 'https://www.ensembl.org/id/%id',
      attributes: [
        {
          name: 'ProteinId',
          xmlTag: 'protein sequence ID',
          uriLink: 'https://www.ensembl.org/id/%ProteinId',
        },
        {
          name: 'GeneId',
          xmlTag: 'gene ID',
          uriLink: 'https://www.ensembl.org/id/%GeneId',
        },
      ],
    };
    const property = PropertyKey.GeneId;
    const xref = {
      database: 'Ensembl',
      id: 'ENST00000440126',
      properties: {
        ProteinId: 'ENSP00000387483',
        GeneId: 'ENSG00000142192',
      },
      isoformId: 'P05067-11',
    };
    expect(
      getPropertyLinkAttributes(databaseInfoPoint, property, xref)
    ).toEqual({
      text: 'ENSG00000142192',
      url: 'https://www.ensembl.org/id/ENSG00000142192',
    });
  });
});

describe('getPropertyString', () => {
  it('should return empty string', () => {
    const propertyString = getPropertyString(PropertyKey.Status, '-');
    expect(propertyString).toEqual('');
  });

  it('should append value', () => {
    const propertyString = getPropertyString(
      PropertyKey.PathwayName,
      'Amyloid fiber formation'
    );
    expect(propertyString).toEqual('Amyloid fiber formation');
  });

  it('should append value and "hit"', () => {
    const propertyString = getPropertyString(PropertyKey.MatchStatus, '1');
    expect(propertyString).toEqual('1 hit');
  });

  it('should append value and "hits"', () => {
    const propertyString = getPropertyString(PropertyKey.MatchStatus, '2');
    expect(propertyString).toEqual('2 hits');
  });

  it('should if empty string if key is MatchStatus but value <= 0', () => {
    const propertyString = getPropertyString(PropertyKey.MatchStatus, '0');
    expect(propertyString).toEqual('');
  });

  it('should append value and "interactors"', () => {
    const propertyString = getPropertyString(PropertyKey.Interactions, '2');
    expect(propertyString).toEqual('2 interactors');
  });
});
