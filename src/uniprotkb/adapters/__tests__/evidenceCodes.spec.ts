/**
 * @jest-environment node
 */
import { getEvidenceCodeData } from '../../config/evidenceCodes';

describe('Evidence codes', () => {
  beforeAll(() => {
    // eslint-disable-next-line no-console
    console.warn = jest.fn();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test('should get correct data', () => {
    const data = getEvidenceCodeData('ECO:007005');
    expect(data).toHaveProperty('label');
  });

  test('should return null', () => {
    const data = getEvidenceCodeData('ECO:000000');
    expect(data).toBeNull();
  });

  test('should also be null', () => {
    const data = getEvidenceCodeData('ABCD');
    expect(data).toBeNull();
  });
});
