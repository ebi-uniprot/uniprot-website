import { KineticParameters } from '../../../../adapters/functionConverter';

const mock: { [key: string]: KineticParameters } = {
  data1: {
    maximumVelocities: [
      {
        velocity: 471,
        unit: 'nmol/h/mg',
        enzyme:
          'enzyme for ATPase activity (at 42 degrees Celsius, pH 8 and 2 M NaCl)',
        evidences: [
          {
            evidenceCode: 'ECO:0000269',
            source: 'PubMed',
            id: '24343376',
          },
        ],
      },
    ],
    michaelisConstants: [
      {
        constant: 438,
        unit: 'uM',
        substrate: 'ATP (at 42 degrees Celsius, pH 8 and 2 M NaCl)',
        evidences: [
          {
            evidenceCode: 'ECO:0000269',
            source: 'PubMed',
            id: '24343376',
          },
        ],
      },
    ],
  },
  data2: {
    michaelisConstants: [
      {
        constant: 0.38,
        unit: 'mM',
        substrate: 'glyoxal (at pH 7.4 and 37 degrees Celsius)',
        evidences: [
          {
            evidenceCode: 'ECO:0000269',
            source: 'PubMed',
            id: '26678554',
          },
        ],
      },
      {
        constant: 0.06,
        unit: 'mM',
        substrate: 'methylglyoxal (at pH 7.4 and 37 degrees Celsius)',
        evidences: [
          {
            evidenceCode: 'ECO:0000269',
            source: 'PubMed',
            id: '26678554',
          },
        ],
      },
    ],
    note: {
      texts: [
        {
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '26678554',
            },
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '26774339',
            },
          ],
          value:
            'kcat is 118.44 min(-1) and 20.80 min (-1) for glyoxalase activity with glyoxal (GO) and methylglyoxal (MGO) as substrate, respectively (at pH 7.4 and 37 degrees Celsius) (PubMed:26678554). The apparent kcat of MGO and GO degradation is 0.29 sec(-1), and 0.42 sec(-1), respectively (at 22 degrees Celsius) (PubMed:26774339).',
        },
      ],
    },
  },
  data3: {
    maximumVelocities: [
      {
        velocity: 200,
        unit: 'nmol/min/mg',
        enzyme: 'enzyme (below 1 mM arsenate)',
        evidences: [
          {
            evidenceCode: 'ECO:0000269',
            source: 'PubMed',
            id: '8003493',
          },
        ],
      },
    ],
    note: {
      texts: [
        {
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '10606519',
            },
          ],
          value:
            'kcat is 4.5 min(-1) with arsenate as substrate (at 2 uM arsenate) and kcat is 9.9 min(-1) with arsenate as substrate (at 10 mM arsenate) (PubMed:10606519).',
        },
      ],
    },
  },
};

export default mock;
