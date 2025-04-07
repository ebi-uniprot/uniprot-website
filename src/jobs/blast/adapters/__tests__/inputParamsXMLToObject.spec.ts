import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

import inputParamsXMLToObject from '../inputParamsXMLToObject';

const readFile = promisify(fs.readFile);

let inputParams: string;
let inputParamsWithTaxons: string;
let sequence: string;

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

describe('inputParamsXMLToObject tests', () => {
  it('should transform an XML string of input params to an object', () => {
    expect(inputParamsXMLToObject(inputParams, sequence)).toMatchSnapshot();
  });

  it('should transform an XML string of input params with taxons to an object', () => {
    expect(
      inputParamsXMLToObject(inputParamsWithTaxons, sequence)
    ).toMatchSnapshot();
  });
});
