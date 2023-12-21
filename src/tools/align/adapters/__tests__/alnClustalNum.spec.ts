import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import alnClustalNum from '../alnClustalNum';

const readFile = promisify(fs.readFile);

const readMock = (filename: string) =>
  readFile(path.join(__dirname, '..', '__mocks__', filename), 'utf8');

describe('alnClustalNum parser', () => {
  let wellFormed: string;
  let toy: string;
  let noHeader: string;
  let inconsitentColumnStart: string;
  let inconsitentNumberSequences: string;
  let specialChracters: string;

  beforeAll(async () => {
    wellFormed = await readMock('alg-clustal_num.txt');
    toy = await readMock('alg-clustal_num-toy.txt');
    noHeader = await readMock('alg-clustal_num-no-header.txt');
    inconsitentColumnStart = await readMock(
      'alg-clustal_num-inconsistent-column-start.txt'
    );
    inconsitentNumberSequences = await readMock(
      'alg-clustal_num-inconsistent-number-sequences.txt'
    );
    specialChracters = await readMock('alg-clustal_num-special-characters.txt');
  });

  it('should parse without error', () => {
    expect(() => alnClustalNum(wellFormed)).not.toThrow();
    expect(() => alnClustalNum(toy)).not.toThrow();
    expect(() => alnClustalNum(specialChracters)).not.toThrow();
  });

  it('should match snapshot', () => {
    expect(alnClustalNum(wellFormed)).toMatchSnapshot();
    expect(alnClustalNum(toy)).toMatchSnapshot();
  });

  it('should throw an error when no header is present', () => {
    expect(() => alnClustalNum(noHeader)).toThrow(
      new SyntaxError('No CLUSTAL header found in file')
    );
  });

  it('should throw an error when there are inconsistent sequence column starts', () => {
    expect(() => alnClustalNum(inconsitentColumnStart)).toThrow(
      /Inconsistent sequence column start/
    );
  });

  it('should throw an error when inconsistent number of sequences are present', () => {
    expect(() => alnClustalNum(inconsitentNumberSequences)).toThrow(
      /Inconsistent number of sequences in block/
    );
  });
});
