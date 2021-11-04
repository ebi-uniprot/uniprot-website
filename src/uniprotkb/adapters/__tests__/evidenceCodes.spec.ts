/**
 * @jest-environment node
 */
import {
  getEcoNumberFromGoEvidenceType,
  getEcoNumberFromString,
  getEvidenceCodeData,
} from '../../config/evidenceCodes';
import { GoEvidenceType } from '../../types/modelTypes';

beforeAll(() => {
  // eslint-disable-next-line no-console
  console.warn = jest.fn();
});

afterAll(() => {
  jest.clearAllMocks();
});
describe('getEvidenceCodeData', () => {
  it('should get correct data', () => {
    const data = getEvidenceCodeData(7005);
    expect(data).toHaveProperty('label');
  });

  it('should return null', () => {
    const data = getEvidenceCodeData(0);
    expect(data).toBeNull();
  });
});

describe('getEcoNumberFromString', () => {
  it('should get correct data', () => {
    expect(getEcoNumberFromString('ECO:0000001')).toEqual(1);
  });

  it('should return null', () => {
    expect(getEcoNumberFromString('ECO0000001')).toEqual(null);
  });
});

describe('getEcoNumberFromGoEvidenceType', () => {
  it('should get correct data', () => {
    expect(getEcoNumberFromGoEvidenceType('IMP:ARUK-UCL')).toEqual(315);
  });

  it('should return null', () => {
    const malformed = 'IMPARUK-UCL' as GoEvidenceType;
    expect(getEcoNumberFromGoEvidenceType(malformed)).toEqual(null);
  });
});
