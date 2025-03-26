import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

import pim from '../pim';

const readFile = promisify(fs.readFile);

describe('pim', () => {
  describe('file with accession', () => {
    let file: string;

    beforeAll(async () => {
      file = await readFile(
        path.join(__dirname, '..', '__mocks__', 'pim1.txt'),
        'utf8'
      );
    });

    it('should parse correctly', () => {
      expect(pim(file)).toEqual([
        {
          name: 'sp|O76024|WFS1_HUMAN',
          accession: 'O76024',
          values: [100.0, 99.33, 99.89, 99.21, 99.1, 99.21],
        },
        {
          name: 'tr|K7AUQ0|K7AUQ0_PANTR',
          accession: 'K7AUQ0',
          values: [99.33, 100.0, 99.21, 99.44, 98.88, 98.76],
        },
        {
          name: 'tr|A0A669KAX3|A0A669KAX3_HUMAN',
          accession: 'A0A669KAX3',
          values: [99.89, 99.21, 100.0, 99.1, 98.99, 99.1],
        },
        {
          name: 'tr|A0A2R9BTC5|A0A2R9BTC5_PANPA',
          accession: 'A0A2R9BTC5',
          values: [99.21, 99.44, 99.1, 100.0, 98.76, 98.65],
        },
        {
          name: 'tr|G1RM32|G1RM32_NOMLE',
          accession: 'G1RM32',
          values: [99.1, 98.88, 98.99, 98.76, 100.0, 98.65],
        },
        {
          name: 'tr|G3QLR6|G3QLR6_GORGO',
          accession: 'G3QLR6',
          values: [99.21, 98.76, 99.1, 98.65, 98.65, 100.0],
        },
      ]);
    });
  });

  describe('file without accession', () => {
    let file: string;

    beforeAll(async () => {
      file = await readFile(
        path.join(__dirname, '..', '__mocks__', 'pim2.txt'),
        'utf8'
      );
    });

    it('should parse correctly', () => {
      expect(pim(file)).toEqual([
        {
          name: 'EMBOSS_001',
          values: [100.0, 80.0, 63.64],
        },
        {
          name: 'EMBOSS_002',
          values: [80.0, 100.0, 66.67],
        },
        {
          name: 'EMBOSS_003',
          values: [63.64, 66.67, 100.0],
        },
      ]);
    });
  });

  describe('file with NaNs', () => {
    let file: string;

    beforeAll(async () => {
      file = await readFile(
        path.join(__dirname, '..', '__mocks__', 'pim-with-nan.txt'),
        'utf8'
      );
    });

    it('should parse correctly', () => {
      const parsed = pim(file);

      expect(parsed[0].values[0]).not.toBeNaN();
      expect(parsed[16].values[9]).toBeNaN();
      expect(parsed[9].values[16]).toBeNaN();
    });
  });
});
