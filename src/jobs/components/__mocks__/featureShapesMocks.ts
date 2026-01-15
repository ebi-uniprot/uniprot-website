import { type Feature } from '@nightingale-elements/nightingale-track';

type T = {
  length: number;
  highlight: string;
  data: Feature[][];
};
const mock: T = {
  length: 751,
  highlight: '41:125',
  data: [
    [
      {
        accession: '1',
        start: 40,
        end: 40,
        shape: 'line',
        color: '#014371',
        locations: [
          {
            fragments: [
              {
                start: 40,
                end: 40,
              },
            ],
          },
        ],
      },
      {
        accession: '2',
        start: 41,
        end: 267,
        color: '#014371',
        locations: [
          {
            fragments: [
              {
                start: 41,
                end: 267,
              },
            ],
          },
        ],
      },
      {
        accession: '3',
        start: 268,
        end: 582,
        shape: 'line',
        color: '#014371',
        locations: [
          {
            fragments: [
              {
                start: 268,
                end: 582,
              },
            ],
          },
        ],
      },
    ],
    [
      {
        accession: '4',
        start: 0,
        end: 40,
        shape: 'line',
        color: '#014371',
      },
      {
        accession: '5',
        start: 41,
        end: 267,
        color: '#014371',
      },
      {
        accession: '6',
        start: 268,
        end: 751,
        shape: 'line',
        color: '#014371',
      },
    ],
  ],
};

export default mock;
