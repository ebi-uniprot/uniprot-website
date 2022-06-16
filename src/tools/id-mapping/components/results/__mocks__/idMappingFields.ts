import { IDMappingFormConfig } from '../../../types/idMappingFormConfig';

const mock = {
  groups: [
    {
      items: [
        {
          name: 'foo',
          uriLink: '/foo',
        },
        {
          name: 'bar',
          uriLink: '/bar',
        },
      ],
    },
    {
      items: [
        {
          name: 'baz',
          uriLink: '/baz',
        },
      ],
    },
  ],
} as IDMappingFormConfig;

export default mock;
