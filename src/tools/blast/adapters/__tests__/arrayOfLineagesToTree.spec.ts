import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

import arrayOfLineagesToTree from '../arrayOfLineagesToTree';

const readFile = promisify(fs.readFile);

let inputParams;
let inputParamsWithTaxons;
let sequence;

beforeAll(async () => {
  inputParams = await readFile(
    path.join(__dirname, '..', '__mocks__', 'input-params.xml'),
    'utf8'
  );
  inputParamsWithTaxons = await readFile(
    path.join(__dirname, '..', '__mocks__', 'input-params-with-taxons.xml'),
    'utf8'
  );
  sequence = await readFile(
    path.join(__dirname, '..', '__mocks__', 'input-sequence.fasta'),
    'utf8'
  );
});

describe('arrayOfLineagesToTree tests', () => {
  it('should handle empty array', () => {
    expect(arrayOfLineagesToTree([])).toBe(null);
  });

  it('should transform an array of lineages to a taxonomy tree', () => {
    expect(
      arrayOfLineagesToTree([
        ['Eukaryota', 'Metazoa', 'Chordata'],
        ['Eukaryota', 'Fungi', 'Dikarya'],
      ])
    ).toMatchSnapshot();
  });

  it('should handle mismatching lineage lengths', () => {
    expect(
      arrayOfLineagesToTree([
        ['Eukaryota', 'Metazoa', 'Chordata'],
        ['Eukaryota', 'Fungi', 'Dikarya'],
        ['Eukaryota', 'Fungi', 'Dikarya', 'Ascomycota', 'Saccharomycotina'],
      ])
    ).toMatchSnapshot();
  });
});
