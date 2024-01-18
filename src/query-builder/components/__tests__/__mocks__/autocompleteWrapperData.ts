import { apiPrefix } from '../../../../shared/config/apiUrls/apiPrefix';
import apiUrls from '../../../../shared/config/apiUrls/apiUrls';

const query = 'human';
const baseUrl = `${apiPrefix}/suggester?dict=taxonomy&query=?`;

export const mockSuggesterApi = {
  query,
  baseUrl,
  request: apiUrls.suggester.search(baseUrl, query),
  response: {
    query,
    dictionary: 'taxonomy',
    suggestions: [
      {
        value: 'Homo sapiens (Human)',
        id: '9606',
      },
      {
        value: 'Human rotavirus',
        id: '1906931',
      },
      {
        value: 'Human Bufavirus',
        id: '1903319',
      },
      {
        value: 'Human pegivirus',
        id: '1758225',
      },
      {
        value: 'Human echovirus',
        id: '1569923',
      },
      {
        value: 'Human cosavirus',
        id: '1233383',
      },
      {
        value: 'Human salivirus',
        id: '1548189',
      },
      {
        value: 'Human DNA virus',
        id: '1904876',
      },
      {
        value: 'Human bocavirus',
        id: '329641',
      },
      {
        value: 'Human orf virus',
        id: '240708',
      },
    ],
  },
};

export const preparedSuggestions = [
  {
    pathLabel: 'Homo sapiens (Human) [9606]',
    itemLabel: 'Homo sapiens (Human)',
    apiId: '9606',
    id: '9606',
  },
  {
    pathLabel: 'Human rotavirus [1906931]',
    itemLabel: 'Human rotavirus',
    apiId: '1906931',
    id: '1906931',
  },
  {
    pathLabel: 'Human Bufavirus [1903319]',
    itemLabel: 'Human Bufavirus',
    apiId: '1903319',
    id: '1903319',
  },
  {
    pathLabel: 'Human pegivirus [1758225]',
    itemLabel: 'Human pegivirus',
    apiId: '1758225',
    id: '1758225',
  },
  {
    pathLabel: 'Human echovirus [1569923]',
    itemLabel: 'Human echovirus',
    apiId: '1569923',
    id: '1569923',
  },
  {
    pathLabel: 'Human cosavirus [1233383]',
    itemLabel: 'Human cosavirus',
    apiId: '1233383',
    id: '1233383',
  },
  {
    pathLabel: 'Human salivirus [1548189]',
    itemLabel: 'Human salivirus',
    apiId: '1548189',
    id: '1548189',
  },
  {
    pathLabel: 'Human DNA virus [1904876]',
    itemLabel: 'Human DNA virus',
    apiId: '1904876',
    id: '1904876',
  },
  {
    pathLabel: 'Human bocavirus [329641]',
    itemLabel: 'Human bocavirus',
    apiId: '329641',
    id: '329641',
  },
  {
    pathLabel: 'Human orf virus [240708]',
    itemLabel: 'Human orf virus',
    apiId: '240708',
    id: '240708',
  },
];
