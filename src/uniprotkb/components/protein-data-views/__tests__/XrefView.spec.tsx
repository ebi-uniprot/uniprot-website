import { render } from '@testing-library/react';

import XRefView, {
  getPropertyString,
  processUrlTemplate,
  getPropertyLink,
  getDatabaseInfoAttribute,
} from '../XRefView';

import { XrefUIModel } from '../../../utils/xrefUtils';
import { PropertyKey } from '../../../types/modelTypes';

import xrefUIData from './__mocks__/xrefUIData.json';

describe('XRefView', () => {
  test(`should render section`, () => {
    const xrefs = xrefUIData as XrefUIModel[];
    const { asFragment } = render(
      <XRefView xrefs={xrefs} primaryAccession="P01234" />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('processUrlTemplate', () => {
  test('should fill url', () => {
    expect(
      processUrlTemplate('https://endpoint/%id/param=%Param', {
        id: '12',
        Param: 'foo',
      })
    ).toEqual('https://endpoint/12/param=foo');
  });
});

describe('getPropertyLink', () => {
  test('should create snapshot', () => {
    const databaseInfoPoint = {
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
    const { asFragment } = render(
      getPropertyLink(databaseInfoPoint, property, xref)
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('getDatabaseInfoAttribute', () => {
  test('should find return database info attribute', () => {
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
  test('should return empty string', () => {
    const propertyString = getPropertyString(PropertyKey.Status, '-');
    expect(propertyString).toEqual('');
  });
  test('should append value', () => {
    const propertyString = getPropertyString(
      PropertyKey.PathwayName,
      'Amyloid fiber formation'
    );
    expect(propertyString).toEqual('Amyloid fiber formation');
  });
  test('should append value and "hit"', () => {
    const propertyString = getPropertyString(PropertyKey.MatchStatus, '1');
    expect(propertyString).toEqual(' 1 hit');
  });
  test('should append value and "hits"', () => {
    const propertyString = getPropertyString(PropertyKey.MatchStatus, '2');
    expect(propertyString).toEqual(' 2 hits');
  });
  test('should if empty string if key is MatchStatus but value <= 0', () => {
    const propertyString = getPropertyString(PropertyKey.MatchStatus, '0');
    expect(propertyString).toEqual('');
  });
  test('should append value and "interactors"', () => {
    const propertyString = getPropertyString(PropertyKey.Interactions, '2');
    expect(propertyString).toEqual(' 2 interactors');
  });
});
