import { screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import customRender from '../../../../shared/__test-helpers__/customRender';

import XRefView, {
  getPropertyString,
  processUrlTemplate,
  getPropertyLinkAttributes,
  getDatabaseInfoAttribute,
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

  it(`should remove duplicate links`, () => {
    customRender(
      <XRefView xrefs={xrefs.duplicateLink} primaryAccession="P0A879" />
    );
    expect(screen.getAllByText(/BAA14793/)).toHaveLength(1);
  });
});

describe('processUrlTemplate', () => {
  it('should fill url', () => {
    expect(
      processUrlTemplate('https://endpoint/%id/param=%Param', {
        id: '12',
        Param: 'foo',
      })
    ).toEqual('https://endpoint/12/param=foo');
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

describe('getDatabaseInfoAttribute', () => {
  it('should find return database info attribute', () => {
    expect(
      getDatabaseInfoAttribute(
        [
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
        'GeneId'
      )
    ).toEqual({
      name: 'GeneId',
      uriLink: 'https://www.ensembl.org/id/%GeneId',
      xmlTag: 'gene ID',
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
